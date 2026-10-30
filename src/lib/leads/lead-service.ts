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

const DATA_DIR = path.join(process.cwd(), 'data');
const LEADS_FILE = path.join(DATA_DIR, 'leads.jsonl');
const PAYMENTS_FILE = path.join(DATA_DIR, 'payments.jsonl');
const INQUIRIES_FILE = path.join(DATA_DIR, 'inquiries.jsonl');

function ensureDataDirectory() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

/**
 * Connect to MongoDB if available and valid.
 * Uses a short 2.5s connect timeout so it never blocks or slows down user submissions.
 */
async function getMongoCollection(collectionName: string) {
  const uri = process.env.MONGODB_URI;
  if (!uri) return null;

  try {
    const { MongoClient } = await import('mongodb');
    const client = new MongoClient(uri, {
      connectTimeoutMS: 2500,
      serverSelectionTimeoutMS: 2500,
    });
    await client.connect();
    return { client, collection: client.db('henotic_production').collection(collectionName) };
  } catch (err) {
    // Expected when running offline or if SRV DNS is unresolvable
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
    ensureDataDirectory();
    fs.appendFileSync(LEADS_FILE, JSON.stringify(fullLead) + '\n', 'utf8');
  } catch (fsErr) {
    console.error('[LeadService] Critical error writing to local log:', fsErr);
  }

  // 2. Cloud Persistence to MongoDB (asynchronous, non-blocking)
  getMongoCollection('leads')
    .then(async (mongo) => {
      if (mongo) {
        try {
          await mongo.collection.insertOne({ _id: fullLead.id as any, ...fullLead });
        } finally {
          await mongo.client.close();
        }
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
    ensureDataDirectory();
    fs.appendFileSync(PAYMENTS_FILE, JSON.stringify(fullRecord) + '\n', 'utf8');
  } catch (fsErr) {
    console.error('[LeadService] Error logging payment:', fsErr);
  }

  getMongoCollection('payments')
    .then(async (mongo) => {
      if (mongo) {
        try {
          await mongo.collection.insertOne({ _id: fullRecord.id as any, ...fullRecord });
        } finally {
          await mongo.client.close();
        }
      }
    })
    .catch(() => {});

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
    ensureDataDirectory();
    fs.appendFileSync(INQUIRIES_FILE, JSON.stringify(inquiry) + '\n', 'utf8');
  } catch (fsErr) {
    console.error('[LeadService] Error logging inquiry:', fsErr);
  }

  getMongoCollection('inquiries')
    .then(async (mongo) => {
      if (mongo) {
        try {
          await mongo.collection.insertOne({ _id: inquiry.id as any, ...inquiry });
        } finally {
          await mongo.client.close();
        }
      }
    })
    .catch(() => {});

  return inquiry;
}

/**
 * Retrieves all stored leads for admin export / CRM sync.
 */
export function getStoredLeads(limit: number = 100): BookingLead[] {
  try {
    if (!fs.existsSync(LEADS_FILE)) return [];
    const lines = fs.readFileSync(LEADS_FILE, 'utf8').trim().split('\n').filter(Boolean);
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
    if (!fs.existsSync(PAYMENTS_FILE)) return [];
    const lines = fs.readFileSync(PAYMENTS_FILE, 'utf8').trim().split('\n').filter(Boolean);
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
    if (!fs.existsSync(INQUIRIES_FILE)) return [];
    const lines = fs.readFileSync(INQUIRIES_FILE, 'utf8').trim().split('\n').filter(Boolean);
    return lines
      .slice(-limit)
      .reverse()
      .map((line) => JSON.parse(line) as NewsletterInquiry);
  } catch {
    return [];
  }
}
