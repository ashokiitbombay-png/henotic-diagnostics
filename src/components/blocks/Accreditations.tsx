import React from "react";
import { CheckCircle, ShieldCheck } from "lucide-react";

export default function Accreditations() {
  return (
    <section id="accreditations" className="w-full py-24 px-4 md:px-8 bg-slate-50 relative overflow-hidden">
      {/* Decorative background glow */}
      <div className="absolute top-1/3 left-0 w-[500px] h-[500px] bg-blue-200/20 rounded-full filter blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-1/3 right-0 w-[500px] h-[500px] bg-pink-200/20 rounded-full filter blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-[#E55D87] font-extrabold tracking-widest text-sm uppercase mb-3 drop-shadow-sm">Our Credentials</h2>
          <h3 className="text-4xl md:text-5xl font-extrabold text-blue-950 mb-6 drop-shadow-sm">
            Accredited Quality & Global Standards
          </h3>
          <p className="text-slate-600 max-w-2xl mx-auto text-lg font-medium leading-relaxed">
            Henotic Diagnostics stands among the elite laboratories globally, holding supreme quality accreditations ensuring 100% accurate results.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { 
              title: "CAP Accredited", 
              sub: "College of American Pathologists", 
              desc: "Achieving CAP accreditation places us among an exclusive group globally. The 'Gold Standard' in pathology.", 
              img: "https://storage.googleapis.com/wp-media-henoticbucket/2025/12/6980ef5c-cap-accredited-lab-henotic-diagnostics.webp", 
              certificateUrl: "https://storage.googleapis.com/wp-media-henoticbucket/Certificates/Certificates_henotic-diagnostics-cap-certified.webp",
              grad: "from-blue-600 to-cyan-400", 
              tag: "Global Gold Standard" 
            },
            { 
              title: "NABL Accredited", 
              sub: "ISO 15189:2012 Certified", 
              desc: "Verifies strict adherence to ISO standards, ensuring every test result is precise, reproducible, and technically valid.", 
              img: "https://storage.googleapis.com/wp-media-henoticbucket/2025/12/67415d7c-nabl-accrediated-lab-henotic-diagnostics.webp", 
              certificateUrl: "https://storage.googleapis.com/wp-media-henoticbucket/Certificates/Certificates_henotic-diagnostics-nabl-certified.webp",
              grad: "from-yellow-500 to-orange-400", 
              tag: "Technical Competence" 
            },
            { 
              title: "ISO Certified", 
              sub: "ISO 9001:2015 Standard", 
              desc: "Demonstrates strict compliance with international quality management systems, ensuring operational reliability, diagnostic precision, and patient safety.", 
              useIcon: true,
              certificateUrl: "https://storage.googleapis.com/wp-media-henoticbucket/Certificates/Certificates_henotic-diagnostics-iso-certified.webp",
              grad: "from-indigo-600 to-violet-500", 
              tag: "Standardized Accuracy" 
            }
          ].map((item, i) => (
            <article 
              key={i} 
              className="group relative bg-white rounded-[2.5rem] p-8 md:p-10 border border-slate-100 flex flex-col items-center text-center shadow-[0_20px_50px_rgba(0,0,0,0.04)] hover:shadow-[0_40px_80px_rgba(37,99,235,0.08),0_20px_40px_rgba(223,137,181,0.06)] hover:-translate-y-4 transition-all duration-500 ease-out cursor-pointer"
              style={{
                transformStyle: 'preserve-3d',
                perspective: '1000px'
              }}
            >
              {/* Colored top border accent */}
              <div className={`absolute top-0 left-0 w-full h-2 bg-gradient-to-r ${item.grad} rounded-t-[2.5rem]`}></div>
              
              {/* Accreditation Logo Badge */}
              <div className="relative w-28 h-28 mb-6 flex items-center justify-center">
                <div className={`absolute inset-0 bg-gradient-to-tr ${item.grad} opacity-0 group-hover:opacity-10 blur-2xl rounded-full transition duration-700`}></div>
                {item.useIcon ? (
                  <div className={`w-20 h-20 rounded-2xl bg-gradient-to-tr ${item.grad} p-[2px] shadow-md group-hover:scale-110 transition-transform duration-500`}>
                    <div className="w-full h-full bg-white rounded-[14px] flex items-center justify-center">
                      <ShieldCheck size={40} className="text-indigo-600" />
                    </div>
                  </div>
                ) : (
                  <img 
                    width="112" 
                    height="112" 
                    src={item.img} 
                    alt={item.title} 
                    className="relative z-10 w-full h-full object-contain drop-shadow-md transition-transform duration-500 group-hover:scale-110" 
                    loading="lazy" 
                  />
                )}
              </div>

              {/* Title & Subtitle */}
              <h4 className="text-2xl font-black text-blue-950 mb-2">{item.title}</h4>
              <h5 className="text-[10px] font-extrabold text-slate-500 uppercase tracking-widest mb-4">{item.sub}</h5>
              
              {/* Description */}
              <p className="text-slate-600 leading-relaxed text-sm mb-6 font-medium">{item.desc}</p>
              
              {/* Authentic Certificate Frame */}
              <div className="w-full aspect-[1.4/1] relative rounded-2xl overflow-hidden border border-slate-200/50 bg-slate-50 mb-8 shadow-[inset_0_2px_8px_rgba(0,0,0,0.03),0_10px_20px_rgba(0,0,0,0.04)] group-hover:translate-z-8 transition-all duration-500">
                <img 
                  src={item.certificateUrl} 
                  alt={`${item.title} Certificate`}
                  className="w-full h-full object-contain p-3 transition-transform duration-750 group-hover:scale-105"
                  loading="lazy"
                />
              </div>

              {/* Tag / Quality Stamp */}
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