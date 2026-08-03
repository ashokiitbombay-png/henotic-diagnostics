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
      <g:product_type>Health &amp; Beauty &gt; Health Care Services &gt; ${escapeXml(product.category)}</g:product_type>
      <g:identifier_exists>false</g:identifier_exists>

      <!-- Personalized Advertising Exclusion (Healthcare Compliance) -->
      <g:excluded_destination>Personalized_ads</g:excluded_destination>
      <g:excluded_destination>Display_ads</g:excluded_destination>
      <g:excluded_destination>Local_inventory_ads</g:excluded_destination>
      <g:excluded_destination>Free_local_listings</g:excluded_destination>

      <!-- Shipping: In-center service, digital report delivery -->
      <g:shipping>
        <g:country>IN</g:country>
        <g:service>Report Delivery</g:service>
        <g:price>0.00 INR</g:price>
      </g:shipping>

      <!-- Return Policy -->
      <g:return_policy_label>diagnostic-services</g:return_policy_label>

      <!-- Product Highlights (Trust Signals) -->
      <g:product_highlight>NABL Accredited Laboratory</g:product_highlight>
      <g:product_highlight>ISO Certified Diagnostic Center</g:product_highlight>
      <g:product_highlight>Same-Day Digital Reports</g:product_highlight>
      <g:product_highlight>Expert Radiologist Review Included</g:product_highlight>

      <!-- Custom Labels -->
      <g:custom_label_0>${escapeXml(product.category)}</g:custom_label_0>
      <g:custom_label_1>Navi Mumbai</g:custom_label_1>
      <g:custom_label_2>NABL Accredited</g:custom_label_2>
      <g:custom_label_3>Diagnostic Service</g:custom_label_3>
      <g:custom_label_4>Healthcare Service</g:custom_label_4>
    </item>`).join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss xmlns:g="http://base.google.com/ns/1.0" version="2.0">
  <channel>
    <title>Henotic Diagnostics — Medical Diagnostic Services</title>
    <link>${baseUrl}</link>
    <description>NABL and ISO accredited medical diagnostic center in Navi Mumbai offering MRI, CT, PET-CT, ultrasound, pathology, and cardiology services.</description>
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
