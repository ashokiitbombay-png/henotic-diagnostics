export default function FacilityShowcase() {
  return (
    <section className="relative h-[500px] md:h-[600px] flex items-center shadow-2xl z-20">
      <img src="https://storage.googleapis.com/wp-media-henoticbucket/2026/01/d05e7950-mri-scan-in-panvel-whole-body-brain-spine-mri.webp" alt="Henotic Diagnostics Corporate Facility" className="absolute inset-0 w-full h-full object-cover fixed-bg" style={{ backgroundAttachment: 'fixed' }} />
      <div className="absolute inset-0 bg-slate-950/70 backdrop-blur-[2px]"></div>
      
      <div className="container mx-auto px-4 md:px-8 max-w-7xl relative z-10 grid lg:grid-cols-2">
         <div className="bg-white/10 backdrop-blur-2xl border border-white/20 p-10 md:p-12 rounded-[3rem] text-white shadow-2xl">
            <h3 className="text-4xl font-extrabold mb-4 drop-shadow-md">State-of-the-Art Facility</h3>
            <p className="text-lg text-slate-200 mb-8 font-medium leading-relaxed">Our corporate headquarters spans 15,000 sq. ft., designed to provide a hospital-grade environment with the comfort and hygiene of a premium outpatient center.</p>
            <ul className="space-y-4 font-bold text-white/90">
              <li className="flex items-center gap-4 bg-white/5 p-3 rounded-xl border border-white/10"><span className="w-3 h-3 bg-pink-400 rounded-full shadow-[0_0_10px_#f472b6]"></span> Dedicated MRI & CT Suites</li>
              <li className="flex items-center gap-4 bg-white/5 p-3 rounded-xl border border-white/10"><span className="w-3 h-3 bg-pink-400 rounded-full shadow-[0_0_10px_#f472b6]"></span> Automated Pathology Labs</li>
              <li className="flex items-center gap-4 bg-white/5 p-3 rounded-xl border border-white/10"><span className="w-3 h-3 bg-pink-400 rounded-full shadow-[0_0_10px_#f472b6]"></span> Premium Patient Lounges</li>
            </ul>
         </div>
      </div>
    </section>
  );
}