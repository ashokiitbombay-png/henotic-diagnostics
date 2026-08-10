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

  const items = GMC_PRODUCTS.map(product => {
    const fullRichDescription = `${product.description}

[PRE-REQUISITES]: ${product.prerequisites}
[FASTING GUIDELINES]: ${product.fastingGuidelines}
[REPORTING TIME]: ${product.reportingTime}
[APPOINTMENT BOOKING PROCESS]: ${product.bookingProcess}`;

    return `
    <item>
      <g:id>${escapeXml(product.id)}</g:id>
      <title>${escapeXml(product.title)}</title>
      <description>${escapeXml(fullRichDescription)}</description>
      <content:encoded><![CDATA[
        <article>
          <h2>${escapeXml(product.title)}</h2>
          <p><strong>Overview:</strong> ${escapeXml(product.description)}</p>
          <section>
            <h3>📋 Pre-Requisites &amp; Patient Preparation</h3>
            <p>${escapeXml(product.prerequisites)}</p>
          </section>
          <section>
            <h3>🍽️ Fasting Guidelines</h3>
            <p>${escapeXml(product.fastingGuidelines)}</p>
          </section>
          <section>
            <h3>⏱️ Reporting Timeframe &amp; Delivery</h3>
            <p>${escapeXml(product.reportingTime)}</p>
          </section>
          <section>
            <h3>📅 Instant Online Appointment Booking Process</h3>
            <p>${escapeXml(product.bookingProcess)}</p>
          </section>
        </article>
      ]]></content:encoded>
      <link>${baseUrl}/gmc/${product.slug}</link>
      <g:image_link>${escapeXml(product.imageUrl)}</g:image_link>
      <g:availability>${product.availability}</g:availability>
      <g:price>${product.mrp.toFixed(2)} ${product.currency}</g:price>
      <g:sale_price>${product.price.toFixed(2)} ${product.currency}</g:sale_price>
      <g:condition>${product.condition}</g:condition>
      <g:brand>${escapeXml(product.brand)}</g:brand>
      <g:google_product_category>${escapeXml(product.googleProductCategory)}</g:google_product_category>
      <g:product_type>Medical Diagnostics &gt; Health Care &gt; Diagnostic Testing &gt; ${escapeXml(product.category)}</g:product_type>
      <g:identifier_exists>false</g:identifier_exists>

      <!-- Structured Product Details for Search Engines & LLM Parsing -->
      <g:product_detail>
        <g:section_name>Clinical Preparation</g:section_name>
        <g:attribute_name>Prerequisites</g:attribute_name>
        <g:attribute_value>${escapeXml(product.prerequisites)}</g:attribute_value>
      </g:product_detail>
      <g:product_detail>
        <g:section_name>Clinical Preparation</g:section_name>
        <g:attribute_name>Fasting Guidelines</g:attribute_name>
        <g:attribute_value>${escapeXml(product.fastingGuidelines)}</g:attribute_value>
      </g:product_detail>
      <g:product_detail>
        <g:section_name>Report Delivery</g:section_name>
        <g:attribute_name>Reporting Time</g:attribute_name>
        <g:attribute_value>${escapeXml(product.reportingTime)}</g:attribute_value>
      </g:product_detail>
      <g:product_detail>
        <g:section_name>Booking Engine</g:section_name>
        <g:attribute_name>Booking Process</g:attribute_name>
        <g:attribute_value>${escapeXml(product.bookingProcess)}</g:attribute_value>
      </g:product_detail>

      <!-- Custom High-Authority Tags for AEO / GEO / LLM Crawlers -->
      <henotic:prerequisites>${escapeXml(product.prerequisites)}</henotic:prerequisites>
      <henotic:fasting_guidelines>${escapeXml(product.fastingGuidelines)}</henotic:fasting_guidelines>
      <henotic:reporting_time>${escapeXml(product.reportingTime)}</henotic:reporting_time>
      <henotic:booking_process>${escapeXml(product.bookingProcess)}</henotic:booking_process>
      <henotic:aeo_summary>${escapeXml(product.title)} - ${escapeXml(product.reportingTime)}</henotic:aeo_summary>
      <henotic:geo_location>Navi Mumbai, Mumbai, Thane, Maharashtra, India</henotic:geo_location>
      <henotic:accreditation>NABL Accredited, ISO 9001:2015 Certified</henotic:accreditation>

      <!-- Shipping: Doorstep Home Sample Pickup & Digital Delivery -->
      <g:shipping>
        <g:country>IN</g:country>
        <g:service>Home Sample Pickup &amp; Digital Report</g:service>
        <g:price>0.00 INR</g:price>
      </g:shipping>

      <!-- Return Policy -->
      <g:return_policy_label>medical-diagnostic-packages</g:return_policy_label>

      <!-- High Intent Highlights for Search & AI Ranking -->
      <g:product_highlight>Pre-Requisites: ${escapeXml(product.prerequisites.slice(0, 140))}</g:product_highlight>
      <g:product_highlight>Fasting Rules: ${escapeXml(product.fastingGuidelines.slice(0, 140))}</g:product_highlight>
      <g:product_highlight>Reporting: ${escapeXml(product.reportingTime.slice(0, 140))}</g:product_highlight>
      <g:product_highlight>NABL Accredited Laboratory &amp; ISO Certified Center</g:product_highlight>
      <g:product_highlight>Instant Booking Voucher &amp; WhatsApp PDF Delivery</g:product_highlight>

      <!-- Custom Labels for Search & Social Feed Segmentation -->
      <g:custom_label_0>${escapeXml(product.category)}</g:custom_label_0>
      <g:custom_label_1>Navi Mumbai &amp; Mumbai</g:custom_label_1>
      <g:custom_label_2>NABL &amp; ISO Accredited</g:custom_label_2>
      <g:custom_label_3>${escapeXml(product.serviceSlug)}</g:custom_label_3>
      <g:custom_label_4>Fast 2-6Hr Reporting</g:custom_label_4>
    </item>`;
  }).join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss xmlns:g="http://base.google.com/ns/1.0" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:henotic="https://www.henoticdiagnostics.com/ns/1.0" version="2.0">
  <channel>
    <title>Henotic Diagnostics — High-Authority Medical Diagnostic Feed (AEO, SEO, GEO, LLMO)</title>
    <link>${baseUrl}</link>
    <description>NABL &amp; ISO accredited medical diagnostic packages, 3.0T MRI, 128-Slice CT, 18FDG PET-CT, 4D Ultrasound, Pathology blood test kits, home sample collection, and instant WhatsApp report delivery across Navi Mumbai, Thane &amp; Mumbai.</description>
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
