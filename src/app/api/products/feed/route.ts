import { GMC_PRODUCTS } from '@/config/gmc-products';
import { NextResponse } from 'next/server';

// Helper to escape XML special characters
function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export async function GET() {
  const baseUrl = 'https://www.henoticdiagnostics.com';

  const items = GMC_PRODUCTS.map(product => `
    <item>
      <g:id>${escapeXml(product.id)}</g:id>
      <title>${escapeXml(product.title)}</title>
      <description>${escapeXml(product.description)}</description>
      <link>${baseUrl}/gmc/${product.slug}</link>
      <g:image_link>${escapeXml(product.imageUrl)}</g:image_link>
      <g:availability>${product.availability}</g:availability>
      <g:price>${product.mrp.toFixed(2)} ${product.currency}</g:price>
      <g:sale_price>${product.price.toFixed(2)} ${product.currency}</g:sale_price>
      <g:condition>${product.condition}</g:condition>
      <g:brand>${escapeXml(product.brand)}</g:brand>
      <g:google_product_category>491</g:google_product_category>
      <g:product_type>Health &amp; Beauty &gt; Health Care &gt; ${escapeXml(product.category)}</g:product_type>
      <g:identifier_exists>false</g:identifier_exists>
      <g:excluded_destination>Display_ads</g:excluded_destination>
      <g:excluded_destination>Local_inventory_ads</g:excluded_destination>
      <g:excluded_destination>Free_local_listings</g:excluded_destination>
      <g:custom_label_0>${escapeXml(product.category)}</g:custom_label_0>
      <g:custom_label_1>Navi Mumbai</g:custom_label_1>
      <g:custom_label_2>NABL Accredited</g:custom_label_2>
      <g:custom_label_3>Diagnostic Service</g:custom_label_3>
    </item>`).join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss xmlns:g="http://base.google.com/ns/1.0" version="2.0">
  <channel>
    <title>Henotic Diagnostics — Medical Diagnostic Services</title>
    <link>${baseUrl}</link>
    <description>Premium medical diagnostic services at Henotic Diagnostics, Navi Mumbai. NABL &amp; ISO accredited.</description>
${items}
  </channel>
</rss>`;

  return new NextResponse(xml, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400',
    },
  });
}
