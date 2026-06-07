import React from "react";
import { CheckCircle } from "lucide-react";

export default function Accreditations() {
  return (
    <section id="accreditations" className="w-full py-24 px-4 md:px-8 bg-slate-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-[#E55D87] font-extrabold tracking-widest text-sm uppercase mb-3 drop-shadow-sm">Our Credentials</h2>
          <h3 className="text-4xl md:text-5xl font-extrabold text-blue-950 mb-6 drop-shadow-sm">Benchmarks of Excellence</h3>
          <p className="text-slate-600 max-w-2xl mx-auto text-lg font-medium leading-relaxed">
            Henotic Diagnostics stands among the elite laboratories globally, holding supreme quality accreditations ensuring 100% accurate results.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { title: "CAP Accredited", sub: "College of American Pathologists", desc: "Achieving CAP accreditation places us among an exclusive group globally. The 'Gold Standard' in pathology.", img: "https://storage.googleapis.com/wp-media-henoticbucket/2025/12/6980ef5c-cap-accredited-lab-henotic-diagnostics.webp", grad: "from-blue-600 to-cyan-400", tag: "Global Gold Standard" },
            { title: "NABL Accredited", sub: "ISO 15189:2012 Certified", desc: "Verifies strict adherence to ISO standards, ensuring every test result is precise, reproducible, and technically valid.", img: "https://storage.googleapis.com/wp-media-henoticbucket/2025/12/67415d7c-nabl-accrediated-lab-henotic-diagnostics.webp", grad: "from-yellow-500 to-orange-400", tag: "Technical Competence" },
            { title: "CDC Certified", sub: "LSP - CRMLN Program", desc: "Testing protocols align with United States federal standards for precision and bias control in chronic diseases.", img: "https://storage.googleapis.com/wp-media-henoticbucket/2025/12/1e590b8f-cdc-accrediated-lab-henotic-diagnostics.webp", grad: "from-indigo-600 to-violet-500", tag: "Standardized Accuracy" }
          ].map((item, i) => (
            <article key={i} className="group relative bg-white rounded-[2.5rem] p-8 md:p-10 border border-slate-100 flex flex-col items-center text-center shadow-[0_15px_30px_-10px_rgba(0,0,0,0.05)] transition-all duration-500 hover:-translate-y-3 hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)]">
              <div className={`absolute top-0 left-0 w-full h-2 bg-gradient-to-r ${item.grad} rounded-t-[2.5rem]`}></div>
              <div className="relative w-32 h-32 mb-8 flex items-center justify-center">
                <div className={`absolute inset-0 bg-gradient-to-tr ${item.grad} opacity-0 group-hover:opacity-10 blur-2xl rounded-full transition duration-700`}></div>
                <img decoding="async" src={item.img} alt={item.title} className="relative z-10 w-full h-full object-contain drop-shadow-md transition-transform duration-500 group-hover:scale-110" fetchPriority="high" />
              </div>
              <h4 className="text-2xl font-black text-blue-950 mb-2">{item.title}</h4>
              <h5 className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-6">{item.sub}</h5>
              <p className="text-slate-600 leading-relaxed text-sm mb-8 font-medium">{item.desc}</p>
              <div className="mt-auto pt-6 border-t border-slate-100 w-full">
                <span className="text-blue-700 font-extrabold text-xs uppercase tracking-widest flex items-center justify-center gap-2">
                  {item.tag} <CheckCircle size={16} className="text-[#E55D87]" />
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}