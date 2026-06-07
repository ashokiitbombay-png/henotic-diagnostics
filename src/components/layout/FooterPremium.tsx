import Link from "next/link";
import { MapPin, Phone, Clock, ExternalLink, FileText } from "lucide-react";

/* --- BULLETPROOF INLINE BRAND ICONS --- */
const FacebookIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
);
const InstagramIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
);

export default function FooterPremium() {
  return (
    <footer className="relative text-white font-sans pt-24 pb-32 lg:pb-16" style={{ background: "linear-gradient(90deg, #16bffd 0%, #cb3066 100%)", transform: "translateZ(0)" }}>
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay pointer-events-none"></div>
      <div className="container mx-auto px-4 lg:px-8 relative z-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 mb-16 border-b border-white/20 pb-16 items-start">
          <div className="space-y-10">
            <Link href="/" className="inline-block group relative z-50">
              <div className="relative p-6 rounded-3xl bg-white/10 border border-white/20 shadow-2xl backdrop-blur-md">
                 <img width="800" height="800" loading="lazy" decoding="async" src="https://storage.googleapis.com/wp-media-henoticbucket/2026/01/6d8a7750-henotic_diagnostics_logo_gedg88_e_background_removal_f_png-scaled.webp" alt="Henotic Diagnostics" className="w-72 lg:w-96 h-auto object-contain drop-shadow-[0_10px_30px_rgba(0,0,0,0.6)] relative z-50" />
              </div>
            </Link>
            <div className="flex gap-4">
              <div className="bg-white/10 p-2 rounded-full"><FacebookIcon size={20} /></div>
              <div className="bg-white/10 p-2 rounded-full"><InstagramIcon size={20} /></div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}