import fs from 'fs';
import path from 'path';
import type { AppointmentReminder } from '@/config/reminders';

/** Maximum number of reminders retained in the persistent disk store. FIFO eviction when exceeded. */
const MAX_REMINDERS_STORE_SIZE = 1000;

function getRemindersFilePath(): { dataDir: string; filePath: string } {
  const dataDir = process.env.LEAD_DATA_DIR
    ? path.resolve(process.env.LEAD_DATA_DIR)
    : path.join(process.cwd(), 'data');
  return {
    dataDir,
    filePath: path.join(dataDir, 'reminders.json'),
  };
}

function readRemindersFromDisk(): AppointmentReminder[] {
  const { filePath } = getRemindersFilePath();
  if (!fs.existsSync(/*turbopackIgnore: true*/ filePath)) return [];

  try {
    const raw = fs.readFileSync(/*turbopackIgnore: true*/ filePath, 'utf8').trim();
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as AppointmentReminder[]) : [];
  } catch (err) {
    console.warn(
      '[ReminderStore] Failed to parse persistent reminders file:',
      err instanceof Error ? err.message : String(err)
    );
    return [];
  }
}

function writeRemindersToDisk(reminders: AppointmentReminder[]): void {
  const { dataDir, filePath } = getRemindersFilePath();
  const bounded =
    reminders.length > MAX_REMINDERS_STORE_SIZE
      ? reminders.slice(reminders.length - MAX_REMINDERS_STORE_SIZE)
      : reminders;

  fs.mkdirSync(/*turbopackIgnore: true*/ dataDir, { recursive: true });
  const tmpPath = `${filePath}.${process.pid}.${Date.now()}.${Math.random().toString(36).slice(2, 7)}.tmp`;
  fs.writeFileSync(/*turbopackIgnore: true*/ tmpPath, JSON.stringify(bounded, null, 2) + '\n', 'utf8');
  fs.renameSync(/*turbopackIgnore: true*/ tmpPath, /*turbopackIgnore: true*/ filePath);
}

let cachedClientPromise: Promise<any> | null = null;
let cachedMongoUri: string | null = null;

/**
 * Connect to MongoDB if configured. Uses a singleton connection pool with short timeouts
 * so unreachable DB instances degrade immediately to the disk store.
 */
async function getMongoCollection(collectionName: string) {
  const uri = process.env.MONGODB_URI;
  if (!uri) return null;

  if (uri !== cachedMongoUri) {
    cachedClientPromise = null;
    cachedMongoUri = uri;
  }

  try {
    if (!cachedClientPromise) {
      const { MongoClient } = await import('mongodb');
      const client = new MongoClient(uri, {
        connectTimeoutMS: 2500,
        serverSelectionTimeoutMS: 2500,
      });
      cachedClientPromise = client.connect();
    }
    const client = await cachedClientPromise;
    return {
      client,
      collection: client.db('henotic_production').collection(collectionName),
    };
  } catch (err) {
    console.warn(
      `[ReminderStore] MongoDB connection unavailable (${collectionName}):`,
      err instanceof Error ? err.message : String(err)
    );
    cachedClientPromise = null;
    return null;
  }
}

/**
 * List persisted appointment reminders, optionally filtered by `appointmentDate` (`YYYY-MM-DD`).
 * Reads from MongoDB when available, falling back to the shared disk JSON store.
 */
export async function listReminders(dateFilter?: string): Promise<AppointmentReminder[]> {
  try {
    const mongo = await getMongoCollection('reminders');
    if (mongo) {
      const query = dateFilter ? { appointmentDate: dateFilter } : {};
      const docs = await mongo.collection
        .find(query, { projection: { _id: 0 } })
        .sort({ createdAt: 1 })
        .toArray();
      if (docs.length > 0) {
        return docs as unknown as AppointmentReminder[];
      }
    }
  } catch (err) {
    console.warn(
      '[ReminderStore] MongoDB list failed, falling back to disk:',
      err instanceof Error ? err.message : String(err)
    );
  }

  const reminders = readRemindersFromDisk();
  if (dateFilter) {
    return reminders.filter((r) => r.appointmentDate === dateFilter);
  }
  return reminders;
}

/**
 * Persist a new appointment reminder atomically to disk (zero-drop across PM2 workers/restarts)
 * and mirror it to MongoDB when configured.
 */
export async function createReminderRecord(
  reminder: AppointmentReminder
): Promise<AppointmentReminder> {
  const reminders = readRemindersFromDisk();
  reminders.push(reminder);
  writeRemindersToDisk(reminders);

  try {
    const mongo = await getMongoCollection('reminders');
    if (mongo) {
      await mongo.collection.updateOne(
        { id: reminder.id },
        { $set: reminder, $setOnInsert: { _id: reminder.id as any } },
        { upsert: true }
      );
    }
  } catch (err) {
    console.warn(
      '[ReminderStore] MongoDB insert deferred (preserved on disk):',
      err instanceof Error ? err.message : String(err)
    );
  }

  return reminder;
}

/**
 * Look up a single reminder by ID from MongoDB when available, falling back to disk.
 */
export async function getReminderById(id: string): Promise<AppointmentReminder | null> {
  try {
    const mongo = await getMongoCollection('reminders');
    if (mongo) {
      const doc = await mongo.collection.findOne({ id }, { projection: { _id: 0 } });
      if (doc) return doc as unknown as AppointmentReminder;
    }
  } catch (err) {
    console.warn(
      '[ReminderStore] MongoDB lookup failed, falling back to disk:',
      err instanceof Error ? err.message : String(err)
    );
  }

  const reminders = readRemindersFromDisk();
  return reminders.find((r) => r.id === id) ?? null;
}

/**
 * Update a reminder's lifecycle status atomically on disk and in MongoDB when configured.
 * Returns the updated reminder, or null if no matching reminder exists.
 */
export async function updateReminderStatus(
  id: string,
  status: AppointmentReminder['status']
): Promise<AppointmentReminder | null> {
  const reminders = readRemindersFromDisk();
  const idx = reminders.findIndex((r) => r.id === id);
  let updated: AppointmentReminder | null = null;

  if (idx !== -1) {
    updated = { ...reminders[idx], status };
    reminders[idx] = updated;
    writeRemindersToDisk(reminders);
  }

  try {
    const mongo = await getMongoCollection('reminders');
    if (mongo) {
      const mongoDoc = await mongo.collection.findOneAndUpdate(
        { id },
        { $set: { status } },
        { returnDocument: 'after', projection: { _id: 0 } }
      );
      if (mongoDoc && !updated) {
        updated = mongoDoc as unknown as AppointmentReminder;
      }
    }
  } catch (err) {
    console.warn(
      '[ReminderStore] MongoDB status update deferred (updated on disk):',
      err instanceof Error ? err.message : String(err)
    );
  }

  return updated;
}
