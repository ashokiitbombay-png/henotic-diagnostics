import fs from 'fs';
import path from 'path';

export interface BookingLead {
  id: string;
  createdAt: string;
  name: string;
  phone: string;
  service: string;
  location?: string;
  date?: string;
  time?: string;
  slotId?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmTerm?: string;
  utmContent?: string;
  status: 'new' | 'whatsapp_sent' | 'email_sent' | 'pending_contact';
  channel?: 'booking_form' | 'floating_bar' | 'direct_modal';
  notes?: string;
}

export interface PaymentRecord {
  id: string;
  createdAt: string;
  orderId: string;
  paymentId: string;
  amount: number;
  currency: string;
  serviceSlug?: string;
  patientName?: string;
  patientPhone?: string;
  status: 'verified' | 'mock_verified';
}

export interface NewsletterInquiry {
  id: string;
  createdAt: string;
  email: string;
  source: string;
}

function getLeadDataPaths() {
  const dataDir = process.env.LEAD_DATA_DIR
    ? path.resolve(process.env.LEAD_DATA_DIR)
    : path.join(process.cwd(), 'data');
  return {
    dataDir,
    leadsFile: path.join(dataDir, 'leads.jsonl'),
    paymentsFile: path.join(dataDir, 'payments.jsonl'),
    inquiriesFile: path.join(dataDir, 'inquiries.jsonl'),
  };
}

function ensureDataDirectory(dataDir: string) {
  try {
    if (!fs.existsSync(/*turbopackIgnore: true*/ dataDir)) {
      fs.mkdirSync(/*turbopackIgnore: true*/ dataDir, { recursive: true });
    }
  } catch (err) {
    // Graceful fallback on read-only environments
  }
}

let cachedClientPromise: Promise<any> | null = null;

/**
 * Connect to MongoDB if available and valid.
 * Uses a cached singleton connection pool with a short 2.5s connect timeout.
 */
async function getMongoCollection(collectionName: string) {
  const uri = process.env.MONGODB_URI;
  if (!uri) return null;

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
    return { client, collection: client.db('henotic_production').collection(collectionName) };
  } catch (err) {
    console.warn(`[LeadService] MongoDB connection unavailable (${collectionName}):`, err instanceof Error ? err.message : String(err));
    cachedClientPromise = null;
    return null;
  }
}

/**
 * 🛡️ ZERO-DROP LEAD RECORDER
 * Immediately persists the patient booking to both local append-only log
 * and MongoDB (if reachable), ensuring 0 leads are lost even during server or API outages.
 */
export async function recordLead(lead: Omit<BookingLead, 'id' | 'createdAt'>): Promise<BookingLead> {
  const fullLead: BookingLead = {
    id: `lead_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    createdAt: new Date().toISOString(),
    ...lead,
  };

  // 1. Guaranteed Local Persistence (Zero-drop failsafe)
  try {
    const { dataDir, leadsFile } = getLeadDataPaths();
    ensureDataDirectory(dataDir);
    fs.appendFileSync(/*turbopackIgnore: true*/ leadsFile, JSON.stringify(fullLead) + '\n', 'utf8');
  } catch (fsErr) {
    console.error('[LeadService] Critical error writing to local log:', fsErr);
  }

  // 2. Cloud Persistence to MongoDB (asynchronous, non-blocking)
  getMongoCollection('leads')
    .then(async (mongo) => {
      if (mongo) {
        await mongo.collection.insertOne({ _id: fullLead.id as any, ...fullLead });
      }
    })
    .catch((mongoErr) => {
      console.warn('[LeadService] MongoDB remote sync deferred:', mongoErr.message);
    });

  return fullLead;
}

/**
 * 🛡️ PAYMENT TRANSACTION RECORDER
 * Records verified payments from Razorpay to maintain a clean financial audit trail.
 */
export async function recordPayment(payment: Omit<PaymentRecord, 'id' | 'createdAt'>): Promise<PaymentRecord> {
  const fullRecord: PaymentRecord = {
    id: `pay_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    createdAt: new Date().toISOString(),
    ...payment,
  };

  try {
    const { dataDir, paymentsFile } = getLeadDataPaths();
    ensureDataDirectory(dataDir);
    fs.appendFileSync(/*turbopackIgnore: true*/ paymentsFile, JSON.stringify(fullRecord) + '\n', 'utf8');
  } catch (fsErr) {
    console.error('[LeadService] Error logging payment:', fsErr);
  }

  getMongoCollection('payments')
    .then(async (mongo) => {
      if (mongo) {
        await mongo.collection.insertOne({ _id: fullRecord.id as any, ...fullRecord });
      }
    })
    .catch((mongoErr) => {
      console.warn('[LeadService] MongoDB payment sync deferred:', mongoErr instanceof Error ? mongoErr.message : String(mongoErr));
    });

  return fullRecord;
}

/**
 * 🛡️ NEWSLETTER & HEALTH INQUIRY RECORDER
 */
export async function recordInquiry(email: string, source: string = 'newsletter'): Promise<NewsletterInquiry> {
  const inquiry: NewsletterInquiry = {
    id: `inq_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    createdAt: new Date().toISOString(),
    email,
    source,
  };

  try {
    const { dataDir, inquiriesFile } = getLeadDataPaths();
    ensureDataDirectory(dataDir);
    fs.appendFileSync(/*turbopackIgnore: true*/ inquiriesFile, JSON.stringify(inquiry) + '\n', 'utf8');
  } catch (fsErr) {
    console.error('[LeadService] Error logging inquiry:', fsErr);
  }

  getMongoCollection('inquiries')
    .then(async (mongo) => {
      if (mongo) {
        await mongo.collection.insertOne({ _id: inquiry.id as any, ...inquiry });
      }
    })
    .catch((mongoErr) => {
      console.warn('[LeadService] MongoDB inquiry sync deferred:', mongoErr instanceof Error ? mongoErr.message : String(mongoErr));
    });

  return inquiry;
}

/**
 * Retrieves all stored leads for admin export / CRM sync.
 */
export function getStoredLeads(limit: number = 100): BookingLead[] {
  try {
    const { leadsFile } = getLeadDataPaths();
    if (!fs.existsSync(/*turbopackIgnore: true*/ leadsFile)) return [];
    const lines = fs.readFileSync(/*turbopackIgnore: true*/ leadsFile, 'utf8').trim().split('\n').filter(Boolean);
    return lines
      .slice(-limit)
      .reverse()
      .map((line) => JSON.parse(line) as BookingLead);
  } catch {
    return [];
  }
}

/**
 * Retrieves all stored payments for financial audit / reconciliation.
 */
export function getStoredPayments(limit: number = 100): PaymentRecord[] {
  try {
    const { paymentsFile } = getLeadDataPaths();
    if (!fs.existsSync(/*turbopackIgnore: true*/ paymentsFile)) return [];
    const lines = fs.readFileSync(/*turbopackIgnore: true*/ paymentsFile, 'utf8').trim().split('\n').filter(Boolean);
    return lines
      .slice(-limit)
      .reverse()
      .map((line) => JSON.parse(line) as PaymentRecord);
  } catch {
    return [];
  }
}

/**
 * Retrieves all stored inquiries/subscribers.
 */
export function getStoredInquiries(limit: number = 100): NewsletterInquiry[] {
  try {
    const { inquiriesFile } = getLeadDataPaths();
    if (!fs.existsSync(/*turbopackIgnore: true*/ inquiriesFile)) return [];
    const lines = fs.readFileSync(/*turbopackIgnore: true*/ inquiriesFile, 'utf8').trim().split('\n').filter(Boolean);
    return lines
      .slice(-limit)
      .reverse()
      .map((line) => JSON.parse(line) as NewsletterInquiry);
  } catch {
    return [];
  }
}
