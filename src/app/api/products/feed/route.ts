import { NextResponse } from 'next/server';
import { SERVICE_PRICING } from '@/config/pricing';

export async function GET() {
  const products = SERVICE_PRICING.map((item) => ({
    id: item.serviceSlug,
    title: item.serviceName,
    description: `${item.serviceName} at Henotic Diagnostics — NABL & ISO accredited diagnostic center in Navi Mumbai`,
    link: `https://www.henoticdiagnostics.com/services/${item.serviceSlug}`,
    price: {
      value: item.henoticPrice.toString(),
      currency: 'INR',
    },
    availability: 'in_stock',
    condition: 'new',
    brand: 'Henotic Diagnostics',
    google_product_category: 'Health > Health Care',
    custom_labels: [item.category],
    image_link:
      'https://storage.googleapis.com/wp-media-henoticbucket/Reception%20Area/henotic-diagnostics-mri-scan-panvel.webp',
  }));

  return NextResponse.json(
    { products },
    {
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=86400',
      },
    }
  );
}
