import { NextRequest, NextResponse } from 'next/server';
import { timingSafeCompare } from '@/lib/webhook/security';
import { PAYLOAD_INDEXES } from '@/lib/payload/indexes';

/**
 * Admin API Endpoint: Payload CMS MongoDB Index Creation
 * 
 * Secure endpoint to create or update MongoDB indexes for Payload CMS collections
 * directly within the production Vercel server environment where MONGODB_URI is available.
 * 
 * POST /api/admin/payload-indexes
 * Body: { "secret": "<REVALIDATION_SECRET>" }
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { secret } = body;

    const expectedSecret = process.env.REVALIDATION_SECRET;
    if (!expectedSecret || !secret || !timingSafeCompare(secret, expectedSecret)) {
      return NextResponse.json({ message: 'Invalid secret token' }, { status: 401 });
    }

    const MONGODB_URI = process.env.MONGODB_URI;
    if (!MONGODB_URI) {
      return NextResponse.json({ message: 'MONGODB_URI environment variable is missing' }, { status: 400 });
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
    });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : String(error);
    console.error('[Admin] Index creation error:', error);
    return NextResponse.json({ message: 'Failed to create indexes', error: msg }, { status: 500 });
  }
}
