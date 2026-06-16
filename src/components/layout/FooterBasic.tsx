import Link from "next/link";
import { MapPin, Phone, Mail, Clock, ChevronRight } from "lucide-react";

/* --- BULLETPROOF INLINE BRAND ICONS --- */
const FacebookIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
);
const TwitterIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
);
const InstagramIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
);
const LinkedinIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
);

export default function FooterBasic() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-950 text-slate-300 pt-20 pb-10 text-sm relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5 pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          <div className="space-y-6">
            <h4 className="text-white font-bold text-lg tracking-wide uppercase">HENOTIC DIAGNOSTICS</h4>
            <p className="text-slate-500 leading-relaxed">
              NABL Accredited & ISO Certified. Bringing the world's most advanced imaging and pathology technology to your neighborhood.
            </p>
            <div className="flex gap-4">
              <a href="#" className="bg-slate-900 p-2 rounded-full hover:bg-blue-600 hover:text-white transition-all duration-300"><FacebookIcon size={18} /></a>
              <a href="#" className="bg-slate-900 p-2 rounded-full hover:bg-blue-400 hover:text-white transition-all duration-300"><TwitterIcon size={18} /></a>
              <a href="#" className="bg-slate-900 p-2 rounded-full hover:bg-pink-600 hover:text-white transition-all duration-300"><InstagramIcon size={18} /></a>
              <a href="#" className="bg-slate-900 p-2 rounded-full hover:bg-blue-700 hover:text-white transition-all duration-300"><LinkedinIcon size={18} /></a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold uppercase tracking-widest mb-6 border-b border-slate-800 pb-2 inline-block">Quick Links</h4>
            <ul className="space-y-3">
              {['Home', 'About Us', 'Contact', 'Book Appointment'].map((item) => (
                <li key={item}>
                  <Link href="/" className="flex items-center gap-2 hover:text-blue-400 transition-colors group">
                    <ChevronRight size={14} className="text-slate-600 group-hover:text-blue-400" /> {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold uppercase tracking-widest mb-6 border-b border-slate-800 pb-2 inline-block">Key Services</h4>
            <ul className="space-y-3">
              {['MRI Scan (3T)', 'CT Scan (128 Slice)', 'PET-CT Scan', 'DEXA Bone Scan', 'Full Body Checkup'].map((item) => (
                <li key={item}>
                  <Link href="/services" className="flex items-center gap-2 hover:text-blue-400 transition-colors group">
                    <ChevronRight size={14} className="text-slate-600 group-hover:text-blue-400" /> {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold uppercase tracking-widest mb-6 border-b border-slate-800 pb-2 inline-block">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="shrink-0 text-blue-500 mt-1" size={18} />
                <span>Shop No. 12, Crystal Plaza, Sector 7, Kharghar, Navi Mumbai, 410210</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="shrink-0 text-blue-500" size={18} />
                <a href="tel:08879327184" className="hover:text-white transition">08879327184</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="shrink-0 text-blue-500" size={18} />
                <a href="mailto:info@henotic.com" className="hover:text-white transition">info@henotic.com</a>
              </li>
              <li className="flex items-center gap-3 text-xs font-bold text-yellow-500 bg-yellow-500/10 p-2 rounded border border-yellow-500/20">
                <Clock size={16} /> Open 24x7 for Emergencies
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-900 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <p>© {currentYear} Henotic Diagnostics. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-white transition">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}