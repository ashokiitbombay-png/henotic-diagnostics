"use client";
import React, { useState } from 'react';
import { Maximize2, X } from 'lucide-react';
import { CERTIFICATES_DATA, CertificateData } from '@/config/health-packages';

export default function AccreditationsSection() {
  const [selectedCertModal, setSelectedCertModal] = useState<CertificateData | null>(null);

  return (
    <>
      <section aria-label="Accreditations and Certifications" className="bg-white/80 backdrop-blur-md rounded-3xl border border-white/60 p-6 sm:p-8 shadow-sm">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <span className="text-xs font-bold uppercase tracking-wider text-purple-700 bg-purple-50 px-3 py-1 rounded-full border border-purple-100">
            Gold Standard Quality Assurance
          </span>
          <h3 className="text-2xl sm:text-3xl font-black text-gray-950 mt-2">
            Certificates & Accreditations
          </h3>
          <p className="text-xs sm:text-sm text-gray-600 mt-1">
            Verified clinical adherence to international ISO, NABL, and CAP laboratory governance frameworks.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {CERTIFICATES_DATA.map((cert) => (
            <div 
              key={cert.id}
              className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow"
            >
              <div>
                <div className="h-16 flex items-center justify-center mb-4 p-2 bg-gray-50 rounded-xl">
                  <img 
                    src={cert.logo} 
                    alt={`${cert.name} Accreditation Seal`} 
                    className="max-h-12 w-auto object-contain"
                    loading="lazy"
                  />
                </div>
                <h4 className="font-bold text-sm text-gray-900 text-center">{cert.name}</h4>
                <p className="text-[11px] font-medium text-gray-400 text-center mt-0.5">{cert.authority}</p>
                <p className="text-xs text-gray-600 mt-3 text-center leading-relaxed">
                  {cert.desc}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setSelectedCertModal(cert)}
                  className="w-full py-2 px-3 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-800 text-xs font-bold transition flex items-center justify-center gap-1.5"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                  <span>View Official Certificate</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Certificate Lightbox Modal */}
      {selectedCertModal && (
        <div 
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
          onClick={() => setSelectedCertModal(null)}
        >
          <div 
            className="relative max-w-2xl w-full bg-white rounded-3xl p-5 shadow-2xl border border-gray-100 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setSelectedCertModal(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 transition"
              aria-label="Close certificate modal"
            >
              <X className="w-5 h-5" />
            </button>
            <h4 className="text-lg font-black text-gray-900 mb-1">{selectedCertModal.name}</h4>
            <p className="text-xs text-gray-500 mb-4">{selectedCertModal.authority}</p>
            <div className="rounded-2xl overflow-hidden bg-gray-50 p-2 border border-gray-200 flex items-center justify-center">
              <img 
                src={selectedCertModal.certImage} 
                alt={`${selectedCertModal.name} Official Accreditation`}
                className="max-h-[500px] w-auto object-contain rounded-xl"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
