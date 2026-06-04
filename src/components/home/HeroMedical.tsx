import Link from "next/link";
import { ChevronRight, ShieldCheck } from "lucide-react";

export default function HeroMedical() {
  return (
    <section className="relative w-full h-[85vh] min-h-[600px] overflow-hidden flex items-center bg-slate-900 mt-[80px]">
      <div className="absolute inset-0 z-0">
        <img 
          src="https://storage.googleapis.com/wp-media-henoticbucket/2026/01/0c37a66f-laboratory-henotic-diagnostics-ct-scan-dexa-bone-scan-mri-scan-sonography-ultrasound-pet-scan-dopa-scan-kharghar-navi-mumbai.webp" 
          alt="Advanced Laboratory" 
          className="w-full h-full object-cover object-center opacity-40 scale-105 animate-[pulse_20s_infinite]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/80 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent"></div>
      </div>

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="max-w-4xl">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-400/30 text-blue-200 text-xs font-bold uppercase tracking-widest mb-8 backdrop-blur-md shadow-lg">
            <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></span>
            World-Class Healthcare
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white mb-6 leading-tight tracking-tight drop-shadow-2xl">
            Uncompromising <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-white to-pink-300">
              Precision & Quality
            </span>
          </h1>
          <p className="text-lg md:text-xl text-slate-200 mb-10 max-w-2xl leading-relaxed font-medium border-l-4 border-pink-500 pl-6 backdrop-blur-sm bg-black/10 py-2 rounded-r-xl">
            At Henotic Diagnostics, accuracy isn't just a goal; it is our promise. We adhere to the most rigorous global standards to ensure your health is in safe hands.
          </p>
          <div className="flex flex-col sm:flex-row gap-5">
            <Link href="#packages" className="btn-grad text-white px-8 py-4 font-bold shadow-[0_10px_30px_rgba(229,93,135,0.4)] flex items-center justify-center gap-2">
              Explore Packages <ChevronRight size={20} />
            </Link>
            <Link href="#accreditations" className="flex items-center justify-center gap-3 bg-white/10 border border-white/20 hover:bg-white/20 text-white px-8 py-4 rounded-full font-bold transition-all backdrop-blur-md shadow-lg">
              <ShieldCheck size={20} className="text-blue-300" /> View Accreditations
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}