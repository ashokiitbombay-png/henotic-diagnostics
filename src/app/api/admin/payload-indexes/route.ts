import { NextRequest, NextResponse } from 'next/server';
import { timingSafeCompare } from '@/lib/webhook/security';
import { PAYLOAD_INDEXES } from '@/lib/payload/indexes';

export const dynamic = 'force-dynamic';

const NO_STORE_HEADERS = {
  'Cache-Control': 'no-store, no-cache, must-revalidate, private',
};

/**
 * Admin API Endpoint: Payload CMS MongoDB Index Creation
 * 
 * Secure endpoint to create or update MongoDB indexes for Payload CMS collections
 * directly within the production Vercel server environment where MONGODB_URI is available.
 * 
 * POST /api/admin/payload-indexes
 * Headers: Authorization: Bearer <ADMIN_TASK_TOKEN> or x-admin-token: <ADMIN_TASK_TOKEN>
 */
export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization') || '';
    const adminHeader = request.headers.get('x-admin-token') || '';
    let secret = adminHeader || authHeader.replace(/^Bearer\s+/i, '');

    if (!secret) {
      try {
        const body = await request.json();
        secret = body.secret || '';
      } catch {
        // body not json
      }
    }

    const expectedSecret = process.env.ADMIN_TASK_TOKEN || process.env.REVALIDATION_SECRET;
    if (!expectedSecret || !secret || !timingSafeCompare(secret, expectedSecret)) {
      return NextResponse.json({ message: 'Invalid secret token' }, { status: 401, headers: NO_STORE_HEADERS });
    }

    const MONGODB_URI = process.env.MONGODB_URI;
    if (!MONGODB_URI) {
      return NextResponse.json({ message: 'MONGODB_URI environment variable is missing' }, { status: 400, headers: NO_STORE_HEADERS });
    }

    // Dynamic import mongodb driver
    const mongodb = await import('mongodb');
    const client = new mongodb.MongoClient(MONGODB_URI);
    await client.connect();

    const db = client.db();
    const results: Array<{ collection: string; indexName: string; status: 'created' | 'already_exists' | 'error'; message?: string }> = [];

    for (const collectionDef of PAYLOAD_INDEXES) {
      const collection = db.collection(collectionDef.collection);
      
      // Get existing indexes
      const existingIndexes = await collection.indexes().catch(() => []);
      const existingNames = new Set(existingIndexes.map(idx => idx.name));

      for (const indexDef of collectionDef.indexes) {
        if (existingNames.has(indexDef.name)) {
          results.push({
            collection: collectionDef.collection,
            indexName: indexDef.name,
            status: 'already_exists',
          });
          continue;
        }

        try {
          await collection.createIndex(indexDef.key, {
            name: indexDef.name,
            unique: indexDef.unique ?? false,
            sparse: indexDef.sparse ?? false,
            background: indexDef.background,
          });
          results.push({
            collection: collectionDef.collection,
            indexName: indexDef.name,
            status: 'created',
          });
        } catch (err: unknown) {
          const message = err instanceof Error ? err.message : String(err);
          results.push({
            collection: collectionDef.collection,
            indexName: indexDef.name,
            status: 'error',
            message,
          });
        }
      }
    }

    await client.close();

    const createdCount = results.filter(r => r.status === 'created').length;
    const existingCount = results.filter(r => r.status === 'already_exists').length;
    const errorCount = results.filter(r => r.status === 'error').length;

    return NextResponse.json({
      success: errorCount === 0,
      summary: {
        created: createdCount,
        alreadyExists: existingCount,
        errors: errorCount,
        total: results.length,
      },
      results,
    }, { headers: NO_STORE_HEADERS });
  } catch (error: unknown) {
    console.error('[Admin] Index creation error:', error);
    return NextResponse.json({ message: 'Failed to create indexes' }, { status: 500, headers: NO_STORE_HEADERS });
  }
}
