import { CheckCircle } from "lucide-react";

export default function MedicalTechnology() {
  return (
    <section className="py-24 bg-slate-50 border-y border-slate-200">
      <div className="container mx-auto px-4 md:px-8 max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-pink-500 rounded-3xl rotate-3 opacity-20 group-hover:rotate-6 transition-transform duration-500 blur-lg"></div>
            <img width="800" height="800" src="https://storage.googleapis.com/wp-media-henoticbucket/2026/01/1a401b0d-henotic-diagnostics-mri-scan-ct-scan-pet-scan-dopa-scan-dtpa-scan.webp" alt="Siemens MRI Machine" className="relative rounded-3xl shadow-2xl z-10 w-full border-4 border-white" fetchPriority="high" decoding="sync" />
            <div className="absolute -bottom-6 -right-6 bg-white/80 backdrop-blur-xl p-6 rounded-3xl shadow-xl border border-white/50 z-20 hidden md:block">
              <div className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-pink-500 mb-1">3 Tesla</div>
              <div className="text-xs font-extrabold text-slate-700 uppercase tracking-widest">Silent Scan Tech</div>
            </div>
          </div>

          <div>
            <span className="inline-block py-1.5 px-4 rounded-full bg-blue-100 text-blue-800 font-bold text-xs tracking-widest uppercase mb-6 shadow-sm border border-blue-200">Infrastructure</span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-6 leading-tight">Powered by Global<br/>Technology Leaders</h2>
            <p className="text-slate-600 text-lg leading-relaxed mb-8 font-medium">We partner with GE, Siemens, and Philips to bring hospital-grade imaging to an outpatient setting. Our machines are calibrated daily for maximum precision.</p>
            <div className="space-y-4">
              {[ "128-Slice CT for Cardiac & Neuro Imaging", "3T Digital MRI with Ambient Experience", "Fully Automated Roche Immunology Analyzers", "Voluson E10 4D Ultrasound for Fetal Medicine" ].map((item, i) => (
                <div key={i} className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                  <CheckCircle className="text-blue-500 flex-shrink-0" size={24} />
                  <span className="font-extrabold text-slate-700">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}