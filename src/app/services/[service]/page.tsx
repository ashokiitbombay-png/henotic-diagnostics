import DynamicBreadcrumbs from '@/components/seo/DynamicBreadcrumbs';
import React from "react";
import { getClient } from "@/lib/apollo-client";
import { gql } from "@apollo/client";
import Link from "next/link";
import { ArrowLeft, Calendar } from "lucide-react";

export const revalidate = 0; 

// UPGRADED: Using the exact Custom Post Type query verified from your WordPress backend
const GET_SERVICE_CONTENT = gql`
  query GetServiceContent($slug: ID!) {
    service(id: $slug, idType: SLUG) {
      title
      content
    }
  }
`;

export default async function ServicePage({ params }: { params: Promise<{ service: string }> }) {
  const resolvedParams = await params;
  const client = getClient();
  let wpContent: any = null;
  let wpTitle: string = resolvedParams.service.replace(/-/g, ' ');

  try {
    const { data } = await client.query<any>({
      query: GET_SERVICE_CONTENT,
      variables: { slug: resolvedParams.service },
      fetchPolicy: "no-cache", 
    });
    
    // Extracting data directly from the "service" object as per your GraphQL schema
    if (data?.service) {
      wpContent = data.service.content;
      wpTitle = data.service.title || wpTitle;
    }
  } catch (error) {
    console.error("Failed to fetch WordPress content:", error);
  }

  return (
    <main className="min-h-screen bg-slate-50 font-sans mt-[80px] py-12">
      {/* 🚀 DYNAMIC SEO BREADCRUMBS */}
      <DynamicBreadcrumbs />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <Link href="/services" className="inline-flex items-center gap-2 text-blue-600 font-bold hover:text-blue-800 transition-colors mb-8">
          <ArrowLeft size={18} /> Back to All Services
        </Link>

        <div className="bg-white rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-slate-200 overflow-hidden">
          
          {/* Header Section */}
          <div className="bg-gradient-to-r from-blue-950 to-blue-900 p-8 md:p-12 text-white relative overflow-hidden">
             <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-50"></div>
             <div className="absolute bottom-[-10%] left-[-10%] w-48 h-48 bg-[#E55D87] rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
             <h1 className="text-3xl md:text-5xl font-extrabold relative z-10 capitalize tracking-tight drop-shadow-md">
               {wpTitle}
             </h1>
          </div>

          {/* WordPress Content Render Area */}
          <div className="p-8 md:p-12">
            {wpContent ? (
              <div 
                className="wp-content-wrapper text-slate-700 font-medium leading-relaxed space-y-6"
                dangerouslySetInnerHTML={{ __html: wpContent }} 
              />
            ) : (
              <div className="py-16 text-center border-2 border-dashed border-slate-200 rounded-3xl bg-slate-50">
                <div className="w-16 h-16 bg-slate-200 text-slate-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
                </div>
                <h3 className="text-xl font-bold text-slate-600 mb-2">Connecting to Backend...</h3>
                <p className="text-slate-500 max-w-md mx-auto">
                  No content found for <strong>{resolvedParams.service}</strong>. Please ensure the page is published in WordPress and WPGraphQL is active.
                </p>
              </div>
            )}
          </div>

          {/* Call to Action */}
          <div className="bg-slate-50 p-8 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <h4 className="text-lg font-extrabold text-slate-900">Ready to book your {wpTitle}?</h4>
              <p className="text-slate-600 font-medium text-sm">Get priority booking through our secure portal.</p>
            </div>
            <Link href="/contact#booking" className="flex items-center gap-2 bg-[#16a34a] hover:bg-[#15803d] text-white font-extrabold py-4 px-8 rounded-2xl transition-all shadow-md hover:shadow-lg w-full sm:w-auto justify-center hover:-translate-y-1 text-lg">
              <Calendar size={20} /> Book Appointment
            </Link>
          </div>

        </div>
      </div>

      {/* Global CSS for WordPress HTML Formatting */}
      <style dangerouslySetInnerHTML={{__html: `
        .wp-content-wrapper h2 { font-size: 2rem; font-weight: 800; color: #0f172a; margin-top: 2.5rem; margin-bottom: 1rem; line-height: 1.2; }
        .wp-content-wrapper h3 { font-size: 1.5rem; font-weight: 800; color: #1e293b; margin-top: 2rem; margin-bottom: 0.75rem; }
        .wp-content-wrapper p { margin-bottom: 1.25rem; font-size: 1.125rem; }
        .wp-content-wrapper ul, .wp-content-wrapper ol { padding-left: 0; margin-bottom: 1.5rem; }
        .wp-content-wrapper ul li, .wp-content-wrapper ol li { position: relative; padding-left: 1.5rem; margin-bottom: 0.75rem; font-size: 1.125rem; }
        .wp-content-wrapper ul li::before { content: '✓'; position: absolute; left: 0; color: #2563eb; font-weight: bold; }
        .wp-content-wrapper ol { list-style-type: decimal; padding-left: 1.5rem; }
        .wp-content-wrapper a { color: #2563eb; font-weight: 800; text-decoration: underline; text-underline-offset: 4px; }
        .wp-content-wrapper img { border-radius: 1.5rem; box-shadow: 0 10px 25px -5px rgba(0,0,0,0.1); margin: 2rem 0; width: 100%; height: auto; }
        .wp-content-wrapper hr { margin: 3rem 0; border-color: #e2e8f0; }
      `}} />
    </main>
  );
}