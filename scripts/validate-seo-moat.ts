/**
 * SEO Moat Validation Script
 * Tests all 3 components: Sitemap, Middleware, JSON-LD Schemas
 * Run against a deployed URL or local dev server
 */

const BASE = process.argv[2] || 'http://localhost:3000';

interface TestResult {
  name: string;
  status: 'PASS' | 'FAIL' | 'WARN';
  details: string;
  latencyMs?: number;
}

const results: TestResult[] = [];

async function timedFetch(url: string, opts?: RequestInit): Promise<{ res: Response; ms: number }> {
  const start = performance.now();
  const res = await fetch(url, opts);
  const ms = Math.round(performance.now() - start);
  return { res, ms };
}

// ── 1. SITEMAP INDEX ──────────────────────────────────────────────────────
async function testSitemapIndex() {
  try {
    const { res, ms } = await timedFetch(`${BASE}/sitemap.xml`);
    const body = await res.text();

    if (res.status !== 200) {
      results.push({ name: 'Sitemap Index HTTP', status: 'FAIL', details: `Status ${res.status}`, latencyMs: ms });
      return;
    }

    results.push({ name: 'Sitemap Index HTTP', status: 'PASS', details: `200 OK`, latencyMs: ms });

    // Check Content-Type
    const ct = res.headers.get('content-type') || '';
    results.push({
      name: 'Sitemap Index Content-Type',
      status: ct.includes('xml') ? 'PASS' : 'FAIL',
      details: ct
    });

    // Check Cache-Control
    const cc = res.headers.get('cache-control') || '';
    results.push({
      name: 'Sitemap Index Cache-Control',
      status: cc.includes('s-maxage') ? 'PASS' : 'WARN',
      details: cc
    });

    // Count chunks
    const chunkMatches = body.match(/<sitemap>/g);
    const chunkCount = chunkMatches?.length || 0;
    results.push({
      name: 'Sitemap Chunk Count',
      status: chunkCount > 0 ? 'PASS' : 'FAIL',
      details: `${chunkCount} chunks found`
    });

    // Validate XML structure
    results.push({
      name: 'Sitemap Index XML Valid',
      status: body.includes('<?xml') && body.includes('<sitemapindex') && body.includes('</sitemapindex>') ? 'PASS' : 'FAIL',
      details: body.includes('<sitemapindex') ? 'Valid XML structure' : 'Missing sitemapindex tag'
    });

    // Test first chunk
    if (chunkCount > 0) {
      const { res: chunkRes, ms: chunkMs } = await timedFetch(`${BASE}/sitemap/0.xml`);
      const chunkBody = await chunkRes.text();
      const urlCount = (chunkBody.match(/<url>/g) || []).length;

      results.push({
        name: 'Sitemap Chunk 0 HTTP',
        status: chunkRes.status === 200 ? 'PASS' : 'FAIL',
        details: `Status ${chunkRes.status}, ${urlCount} URLs`,
        latencyMs: chunkMs
      });

      results.push({
        name: 'Sitemap Chunk URL Count',
        status: urlCount > 0 && urlCount <= 40000 ? 'PASS' : 'FAIL',
        details: `${urlCount} URLs (max 40,000)`
      });

      // Verify URL structure
      const hasHomepage = chunkBody.includes('<loc>https://www.henoticdiagnostics.com/</loc>');
      results.push({
        name: 'Sitemap Homepage URL',
        status: hasHomepage ? 'PASS' : 'WARN',
        details: hasHomepage ? 'Homepage found in chunk 0' : 'Homepage not in chunk 0'
      });
    }

    // Performance check
    results.push({
      name: 'Sitemap Index Latency',
      status: ms < 5000 ? 'PASS' : 'WARN',
      details: `${ms}ms (threshold: <5000ms)`,
      latencyMs: ms
    });

  } catch (err: any) {
    results.push({ name: 'Sitemap Index', status: 'FAIL', details: `Error: ${err.message}` });
  }
}

// ── 2. MIDDLEWARE BOT DETECTION ───────────────────────────────────────────
async function testMiddleware() {
  // Test 1: Normal browser request should pass
  try {
    const { res, ms } = await timedFetch(`${BASE}/services/mri-scan`, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Accept': 'text/html,application/xhtml+xml',
        'Accept-Language': 'en-US,en;q=0.9',
      }
    });
    results.push({
      name: 'Middleware: Normal Browser',
      status: res.status === 200 ? 'PASS' : 'FAIL',
      details: `Status ${res.status}`,
      latencyMs: ms
    });
  } catch (err: any) {
    results.push({ name: 'Middleware: Normal Browser', status: 'FAIL', details: err.message });
  }

  // Test 2: Googlebot should pass
  try {
    const { res, ms } = await timedFetch(`${BASE}/services/ct-scan`, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)',
        'Accept': '*/*',
      }
    });
    results.push({
      name: 'Middleware: Googlebot Whitelist',
      status: res.status === 200 ? 'PASS' : 'FAIL',
      details: `Status ${res.status} (should be 200)`,
      latencyMs: ms
    });
  } catch (err: any) {
    results.push({ name: 'Middleware: Googlebot', status: 'FAIL', details: err.message });
  }

  // Test 3: Python scraper should be blocked
  try {
    const { res, ms } = await timedFetch(`${BASE}/services/blood-test`, {
      headers: {
        'User-Agent': 'python-requests/2.28.0',
      }
    });
    results.push({
      name: 'Middleware: Block python-requests',
      status: res.status === 403 ? 'PASS' : 'WARN',
      details: `Status ${res.status} (expected 403)`,
      latencyMs: ms
    });
  } catch (err: any) {
    results.push({ name: 'Middleware: Block Scraper', status: 'FAIL', details: err.message });
  }

  // Test 4: No User-Agent should be blocked
  try {
    const { res, ms } = await timedFetch(`${BASE}/services/ultrasound`, {
      headers: {
        'User-Agent': '',
      }
    });
    results.push({
      name: 'Middleware: Block Empty UA',
      status: res.status === 403 ? 'PASS' : 'WARN',
      details: `Status ${res.status} (expected 403)`,
      latencyMs: ms
    });
  } catch (err: any) {
    results.push({ name: 'Middleware: Empty UA', status: 'FAIL', details: err.message });
  }

  // Test 5: Honeypot trap
  try {
    const { res, ms } = await timedFetch(`${BASE}/services/_trap/test`, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Accept': 'text/html',
        'Accept-Language': 'en-US',
      }
    });
    results.push({
      name: 'Middleware: Honeypot Trap',
      status: res.status === 403 ? 'PASS' : 'WARN',
      details: `Status ${res.status} (expected 403)`,
      latencyMs: ms
    });
  } catch (err: any) {
    results.push({ name: 'Middleware: Honeypot', status: 'FAIL', details: err.message });
  }

  // Test 6: Security headers present
  try {
    const { res } = await timedFetch(`${BASE}/`, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
        'Accept': 'text/html',
        'Accept-Language': 'en',
      }
    });
    const xCTO = res.headers.get('x-content-type-options');
    const xFO = res.headers.get('x-frame-options');
    results.push({
      name: 'Middleware: Security Headers',
      status: xCTO === 'nosniff' && xFO === 'DENY' ? 'PASS' : 'WARN',
      details: `X-Content-Type-Options: ${xCTO}, X-Frame-Options: ${xFO}`
    });
  } catch (err: any) {
    results.push({ name: 'Middleware: Security Headers', status: 'FAIL', details: err.message });
  }
}

// ── 3. JSON-LD SCHEMA VALIDATION ──────────────────────────────────────────
async function testJsonLdSchemas() {
  // Test service page JSON-LD
  try {
    const { res, ms } = await timedFetch(`${BASE}/services/mri-scan`, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
        'Accept': 'text/html',
        'Accept-Language': 'en',
      }
    });
    const html = await res.text();

    // Count JSON-LD script tags
    const jsonLdBlocks = html.match(/<script type="application\/ld\+json">/g) || [];
    results.push({
      name: 'Schema: Service Page JSON-LD Count',
      status: jsonLdBlocks.length >= 3 ? 'PASS' : 'WARN',
      details: `${jsonLdBlocks.length} JSON-LD blocks found (expected ≥3: WebPage, Procedure, MedicalTest)`,
      latencyMs: ms
    });

    // Check for DiagnosticProcedure
    results.push({
      name: 'Schema: DiagnosticProcedure',
      status: html.includes('"DiagnosticProcedure"') ? 'PASS' : 'FAIL',
      details: html.includes('"DiagnosticProcedure"') ? 'Found' : 'Missing'
    });

    // Check for MedicalWebPage
    results.push({
      name: 'Schema: MedicalWebPage',
      status: html.includes('"MedicalWebPage"') ? 'PASS' : 'FAIL',
      details: html.includes('"MedicalWebPage"') ? 'Found' : 'Missing'
    });

    // Check for MedicalTest / ImagingTest / PathologyTest
    const hasMedicalTest = html.includes('"MedicalTest"') || html.includes('"ImagingTest"') || html.includes('"PathologyTest"');
    results.push({
      name: 'Schema: MedicalTest Type',
      status: hasMedicalTest ? 'PASS' : 'WARN',
      details: hasMedicalTest ? 'Found MedicalTest variant' : 'Missing (new schema may not be injected yet)'
    });

    // Check for BreadcrumbList
    results.push({
      name: 'Schema: BreadcrumbList',
      status: html.includes('"BreadcrumbList"') ? 'PASS' : 'FAIL',
      details: html.includes('"BreadcrumbList"') ? 'Found' : 'Missing'
    });

    // Performance
    results.push({
      name: 'Schema: Service Page Latency',
      status: ms < 3000 ? 'PASS' : 'WARN',
      details: `${ms}ms`,
      latencyMs: ms
    });

  } catch (err: any) {
    results.push({ name: 'Schema: Service Page', status: 'FAIL', details: err.message });
  }

  // Test hyper-local PSEO page for MedicalClinic schema
  try {
    const { res, ms } = await timedFetch(`${BASE}/services/mri-scan/navi-mumbai/kharghar`, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
        'Accept': 'text/html',
        'Accept-Language': 'en',
      }
    });
    const html = await res.text();

    results.push({
      name: 'Schema: MedicalClinic (Hyper-Local)',
      status: html.includes('"MedicalClinic"') ? 'PASS' : 'WARN',
      details: html.includes('"MedicalClinic"') ? 'Found per-location MedicalClinic' : 'Missing (may need deployment)',
      latencyMs: ms
    });

    results.push({
      name: 'Schema: Hyper-Local Page Latency',
      status: ms < 3000 ? 'PASS' : 'WARN',
      details: `${ms}ms`,
      latencyMs: ms
    });

  } catch (err: any) {
    results.push({ name: 'Schema: Hyper-Local', status: 'FAIL', details: err.message });
  }
}

// ── MAIN ──────────────────────────────────────────────────────────────────
async function main() {
  console.log(`\n🏥 SEO MOAT VALIDATION — ${BASE}`);
  console.log('═'.repeat(70));

  await testSitemapIndex();
  await testMiddleware();
  await testJsonLdSchemas();

  // Print results
  console.log('\n' + '─'.repeat(70));
  console.log('RESULTS:');
  console.log('─'.repeat(70));

  let pass = 0, fail = 0, warn = 0;

  for (const r of results) {
    const icon = r.status === 'PASS' ? '✅' : r.status === 'FAIL' ? '❌' : '⚠️';
    const latency = r.latencyMs ? ` [${r.latencyMs}ms]` : '';
    console.log(`${icon} ${r.name}: ${r.details}${latency}`);
    if (r.status === 'PASS') pass++;
    else if (r.status === 'FAIL') fail++;
    else warn++;
  }

  console.log('\n' + '─'.repeat(70));
  console.log(`SUMMARY: ${pass} PASS | ${fail} FAIL | ${warn} WARN`);

  // Performance summary
  const latencies = results.filter(r => r.latencyMs).map(r => r.latencyMs!);
  if (latencies.length > 0) {
    const avg = Math.round(latencies.reduce((a, b) => a + b, 0) / latencies.length);
    const max = Math.max(...latencies);
    console.log(`LATENCY: avg=${avg}ms, max=${max}ms`);
  }

  console.log('═'.repeat(70));

  if (fail > 0) {
    process.exit(1);
  }
}

main().catch(console.error);
