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
      <g:google_product_category>${escapeXml(product.googleProductCategory)}</g:google_product_category>
      <g:product_type>Health &amp; Beauty &gt; Health Care &gt; Medical Test Kits &gt; Home Sample Collection Test Kit</g:product_type>
      <g:identifier_exists>false</g:identifier_exists>

      <!-- Personalized Advertising Exclusion (Healthcare Compliance) -->
      <g:excluded_destination>Personalized_ads</g:excluded_destination>
      <g:excluded_destination>Display_ads</g:excluded_destination>
      <g:excluded_destination>Local_inventory_ads</g:excluded_destination>
      <g:excluded_destination>Free_local_listings</g:excluded_destination>

      <!-- Shipping: Home Sample Collection & Digital Report Delivery -->
      <g:shipping>
        <g:country>IN</g:country>
        <g:service>Home Sample Kit Delivery</g:service>
        <g:price>0.00 INR</g:price>
      </g:shipping>

      <!-- Return Policy for Physical Test Kits -->
      <g:return_policy_label>medical-test-kits</g:return_policy_label>

      <!-- Product Highlights (Trust Signals & Policy Compliance) -->
      <g:product_highlight>Home Sample Collection Available</g:product_highlight>
      <g:product_highlight>NABL Accredited Laboratory Analysis</g:product_highlight>
      <g:product_highlight>ISO Certified Diagnostic Center</g:product_highlight>
      <g:product_highlight>Same-Day Digital Reports Included</g:product_highlight>

      <!-- Custom Labels (GMC Policy Alignment) -->
      <g:custom_label_0>${escapeXml(product.category)}</g:custom_label_0>
      <g:custom_label_1>Navi Mumbai</g:custom_label_1>
      <g:custom_label_2>NABL Accredited</g:custom_label_2>
      <g:custom_label_3>Home Sample Collection Test Kit</g:custom_label_3>
      <g:custom_label_4>Medical Test Kit</g:custom_label_4>
    </item>`).join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss xmlns:g="http://base.google.com/ns/1.0" version="2.0">
  <channel>
    <title>Henotic Diagnostics — Medical Test Kits &amp; Home Sample Collection</title>
    <link>${baseUrl}</link>
    <description>NABL &amp; ISO accredited medical diagnostic test kits, home sample collection kits, pathology test kits, and certified diagnostic report packages in Navi Mumbai.</description>
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
