import React from 'react';
import SchemaMarkup from '@/components/seo/SchemaMarkup';

export default function ServiceLocationTemplate({ service, region, location, content }: any) {
  const formattedService = service.replace(/-/g, ' ');
  const formattedLocation = location.replace(/-/g, ' ');

  return (
    <main className="max-w-7xl mx-auto px-4 md:px-8 py-12">
      <SchemaMarkup service={formattedService} location={formattedLocation} />
      
      {/* Content Container with requested Custom Gradient Background */}
      <article className="bg-content-gradient p-8 md:p-12 rounded-[20px] shadow-xl border border-white/50 w-full">
        <header className="mb-10 text-center border-b border-gray-200 pb-8">
          <h1 className="text-4xl md:text-5xl font-extrabold capitalize text-blue-900 mb-4">
            {formattedService} in {formattedLocation}, {region.replace(/-/g, ' ')}
          </h1>
          <p className="text-gray-600 text-lg md:text-xl font-medium">
            Accurate and fast diagnostic services near you.
          </p>
        </header>

        <div className="prose prose-lg prose-blue mx-auto max-w-4xl w-full">
          {content ? (
             <div dangerouslySetInnerHTML={{ __html: content?.content || '' }} />
          ) : (
            <div className="text-center py-10 text-gray-500 italic">
              Loading dynamic content from WordPress...
            </div>
          )}
        </div>
      </article>
    </main>
  );
}