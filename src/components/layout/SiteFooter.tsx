import Link from "next/link";
import { 
  MapPin, Phone, Mail, Clock, ExternalLink, 
  FileText, Globe, Navigation, ArrowUpRight 
} from "lucide-react";

/* --- BULLETPROOF INLINE BRAND ICONS --- */
const FacebookIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
);
const InstagramIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
);
const TwitterIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
);
const LinkedinIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
);
const YoutubeIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.94 2C5.12 19.54 12 19.54 12 19.54s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z"/><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/></svg>
);
const GithubIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>
);

export default function SiteFooter() {
  return (
    <footer 
      className="relative text-white font-sans pt-24 pb-32 lg:pb-16 overflow-hidden bg-header-footer-gradient shadow-[0_-10px_20px_rgba(0,0,0,0.05)]"
    >
      <div className="container mx-auto px-4 lg:px-8 max-w-7xl w-full relative z-20">
        
        {/* ================= SECTION 1: NAP, MAP & BRAND ================= */}
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 mb-16 border-b border-white/20 pb-16 items-stretch">
          
          {/* BRAND & NAP (Left Column - Spans 5) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <Link href="/" className="inline-block group relative z-50 w-max">
              <div className="relative p-6 rounded-3xl bg-white/10 border border-white/20 shadow-2xl backdrop-blur-md transition-transform duration-500 hover:scale-[1.02]">
                 <img 
                   src="https://storage.googleapis.com/wp-media-henoticbucket/2026/01/6d8a7750-henotic_diagnostics_logo_gedg88_e_background_removal_f_png-scaled.webp" 
                   alt="Henotic Diagnostics" 
                   className="w-64 lg:w-80 h-auto object-contain drop-shadow-[0_10px_30px_rgba(0,0,0,0.6)] relative z-50"
                 />
              </div>
            </Link>
            
            <div className="bg-white/10 p-8 rounded-3xl border border-white/20 backdrop-blur-md shadow-xl relative z-20 flex-grow">
               <h4 className="text-white font-bold mb-6 flex items-center gap-2 uppercase tracking-widest text-xs border-b border-white/20 pb-4">
                 <MapPin size={16} className="text-white" /> Headquarters & Flagship Center
               </h4>
               
               <address className="text-white/90 text-sm leading-relaxed mb-6 pl-4 border-l-2 border-white/40 not-italic">
                 <strong className="text-lg text-white block mb-2">Henotic Diagnostics</strong>
                 Second floor, Millennium Empire, Business Park,<br/>
                 Plot No 47, D Mart Rd, Sector 15, Kharghar,<br/>
                 Panvel, Navi Mumbai, Maharashtra 410210
               </address>

               <div className="flex flex-col gap-3 text-sm font-semibold">
                 <a href="tel:08879327184" className="flex items-center justify-between text-white hover:text-white transition bg-white/10 p-4 rounded-xl hover:bg-white/20 border border-white/10 shadow-inner">
                   <span className="flex items-center gap-3"><Phone size={18} /> 08879327184</span>
                   <ArrowUpRight size={16} className="opacity-50" />
                 </a>
                 <div className="flex items-center gap-3 text-white p-3 bg-black/10 rounded-xl border border-black/5">
                   <Clock size={18} className="text-green-300" /> Open 24 Hours • 365 Days
                 </div>
               </div>
            </div>
          </div>

          {/* GOOGLE MAP & GBP PROFILE (Right Column - Spans 7) */}
          <div className="lg:col-span-7 flex flex-col gap-6 h-full relative z-20">
             <div className="flex flex-col sm:flex-row gap-4 bg-white/10 p-4 rounded-3xl border border-white/20 backdrop-blur-md shadow-xl">
                <img 
                  src="https://lh3.googleusercontent.com/p/AF1QipNNi77McpTFT3ksGjloBcqV3he235QDZfbaYiCv=s1360-w1360-h1020-rw" 
                  alt="Henotic Diagnostics Facility" 
                  className="w-full sm:w-32 h-32 object-cover rounded-2xl shadow-md border border-white/20"
                fetchPriority="high" />
                <div className="flex flex-col justify-center">
                  <h5 className="font-bold text-lg mb-1">Highly Rated on Google</h5>
                  <p className="text-xs text-white/80 mb-3 max-w-sm">Experience world-class diagnostic imaging and pathology in Navi Mumbai.</p>
                  <div className="flex gap-2">
                    <a href="https://share.google/yRA62stKchzN8uOVe" target="_blank" rel="noreferrer" className="text-xs bg-white text-blue-900 px-3 py-1.5 rounded-lg font-bold hover:bg-gray-100 transition shadow-md flex items-center gap-1">
                      <Globe size={12}/> View Profile
                    </a>
                    <a href="https://share.google/IcBtvtVjwozCBFMPp" target="_blank" rel="noreferrer" className="text-xs bg-black/20 text-white px-3 py-1.5 rounded-lg font-bold border border-white/20 hover:bg-black/30 transition flex items-center gap-1">
                      Reviews
                    </a>
                  </div>
                </div>
             </div>

             <div className="flex-grow bg-white/10 p-2 rounded-3xl border border-white/20 w-full shadow-2xl relative group overflow-hidden backdrop-blur-sm min-h-[250px]">
               <iframe 
                 src="https://maps.google.com/maps?q=19.04313094481506,73.07794905888657&z=15&output=embed"
                 width="100%" 
                 height="100%" 
                 style={{ border: 0 }} 
                 allowFullScreen 
                 loading="lazy" 
                 referrerPolicy="no-referrer-when-downgrade"
                 className="rounded-2xl w-full h-full opacity-90 group-hover:opacity-100 transition-opacity duration-500 grayscale group-hover:grayscale-0"
               ></iframe>
               <div className="absolute inset-0 pointer-events-none rounded-2xl ring-1 ring-inset ring-white/20"></div>
               <a href="https://maps.google.com/?cid=11779150789147957572" target="_blank" rel="noreferrer" className="absolute bottom-4 left-4 bg-black/70 backdrop-blur-md text-white text-xs font-bold px-4 py-2 rounded-full border border-white/20 shadow-xl flex items-center gap-2 hover:bg-black transition">
                 <Navigation size={14} className="text-blue-400" /> Get Directions
               </a>
            </div>
          </div>
        </div>

        {/* ================= SECTION 2: ARCHITECTURE LINKS ================= */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16 relative z-20">
          <div>
            <h4 className="font-extrabold uppercase tracking-widest text-xs mb-6 border-b border-white/20 pb-3 text-white/90 drop-shadow-sm">Core Diagnostics</h4>
            <ul className="flex flex-col gap-3 text-sm font-semibold text-white/90">
              <li><Link href="/services/mri-scan" className="hover:text-white hover:translate-x-1 transition-all duration-200 block">MRI Scan (3T)</Link></li>
              <li><Link href="/services/ct-scan" className="hover:text-white hover:translate-x-1 transition-all duration-200 block">CT Scan (128 Slice)</Link></li>
              <li><Link href="/services/pet-scan" className="hover:text-white hover:translate-x-1 transition-all duration-200 block">PET-CT Scan</Link></li>
              <li><Link href="/services/ultrasound" className="hover:text-white hover:translate-x-1 transition-all duration-200 block">Ultrasound / USG</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-extrabold uppercase tracking-widest text-xs mb-6 border-b border-white/20 pb-3 text-white/90 drop-shadow-sm">Pathology</h4>
            <ul className="flex flex-col gap-3 text-sm font-semibold text-white/90">
              <li><Link href="/services/blood-test" className="hover:text-white hover:translate-x-1 transition-all duration-200 block">Blood Tests</Link></li>
              <li><Link href="/services/full-body-check-up" className="hover:text-white hover:translate-x-1 transition-all duration-200 block">Full Body Checkups</Link></li>
              <li><Link href="/services" className="hover:text-white hover:translate-x-1 transition-all duration-200 block">Specialized Profiles</Link></li>
              <li><a href="https://www.henoticdiagnostics.com/" target="_blank" rel="noreferrer" className="hover:text-white hover:translate-x-1 transition-all duration-200 flex items-center gap-1">Corporate Site <ExternalLink size={12}/></a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-extrabold uppercase tracking-widest text-xs mb-6 border-b border-white/20 pb-3 text-white/90 drop-shadow-sm">Web Presence</h4>
            <ul className="flex flex-col gap-3 text-sm font-semibold text-white/90">
              <li><a href="https://medium.com/@henoticdiagnostics" target="_blank" rel="noreferrer" className="hover:text-white hover:translate-x-1 transition-all duration-200 flex items-center gap-2"><FileText size={14}/> Medium Blog</a></li>
              <li><a href="https://www.reddit.com/user/Top_Pen3672/" target="_blank" rel="noreferrer" className="hover:text-white hover:translate-x-1 transition-all duration-200 flex items-center gap-2"><Globe size={14}/> Reddit Community</a></li>
              <li><a href="https://www.tumblr.com/henotichealthcare" target="_blank" rel="noreferrer" className="hover:text-white hover:translate-x-1 transition-all duration-200 flex items-center gap-2"><Globe size={14}/> Tumblr Updates</a></li>
              <li><a href="https://www.peeptown.com/medical-diagnostic-imaging-center/henoticdiagnostics" target="_blank" rel="noreferrer" className="hover:text-white hover:translate-x-1 transition-all duration-200 flex items-center gap-2"><Globe size={14}/> Peeptown</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-extrabold uppercase tracking-widest text-xs mb-6 border-b border-white/20 pb-3 text-white/90 drop-shadow-sm">Development</h4>
            <ul className="flex flex-col gap-3 text-sm font-semibold text-white/90">
              <li><a href="https://github.com/ashokiitbombay-png/headless-henotics" target="_blank" rel="noreferrer" className="hover:text-white hover:translate-x-1 transition-all duration-200 flex items-center gap-2"><GithubIcon size={14}/> Open Source</a></li>
              <li><Link href="/sitemap.xml" className="hover:text-white hover:translate-x-1 transition-all duration-200 flex items-center gap-2"><FileText size={14}/> XML Sitemap</Link></li>
              <li><a href="mailto:info@henoticdiagnostics.com" className="hover:text-white hover:translate-x-1 transition-all duration-200 flex items-center gap-2"><Mail size={14}/> Support Email</a></li>
            </ul>
          </div>
        </div>

        {/* ================= SECTION 3: PAYMENTS ================= */}
        <div className="mb-12 relative z-20 bg-black/5 p-8 rounded-3xl border border-white/10 backdrop-blur-sm">
           <p className="text-center text-[10px] font-bold text-white/90 uppercase tracking-[0.2em] mb-6">Secure Payment Partners</p>
           <div className="flex flex-wrap justify-center gap-4">
              {[
                { name: "Paytm", url: "https://storage.googleapis.com/wp-media-henoticbucket/2026/01/4cc15576-paytm-banking-henotic-diagnostics.webp" },
                { name: "GPay", url: "https://storage.googleapis.com/wp-media-henoticbucket/2026/01/22f37b85-google-pay-payment-transfer-henotic-diagnostics.webp" },
                { name: "BHIM", url: "https://storage.googleapis.com/wp-media-henoticbucket/2026/01/9ee511bb-bhim-upi-transfer-banking-henotic-diagnostics.webp" },
                { name: "Amex", url: "https://storage.googleapis.com/wp-media-henoticbucket/2026/01/8982a1eb-american-experss-payment-transfer-henotic-diagnostics.webp" },
                { name: "Amazon", url: "https://storage.googleapis.com/wp-media-henoticbucket/2026/01/57673992-amazon-pay-payment-transfer-henotic-diagnostics.webp" },
                { name: "Cards", url: "https://storage.googleapis.com/wp-media-henoticbucket/2026/01/d412e583-all-debitcards-creditcards-payment-transfer-henotic-diagnostics.webp" },
                { name: "Visa", url: "https://storage.googleapis.com/wp-media-henoticbucket/2026/01/7ecc0645-visa-payment-transfer-henotic-diagnostics.webp" },
                { name: "Paypal", url: "https://storage.googleapis.com/wp-media-henoticbucket/2026/01/3ffff106-paypal-banking-henotic-diagnostics.webp" }
              ].map((pay, i) => (
                <div key={i} className="bg-white rounded-xl w-20 h-12 md:w-28 md:h-14 flex items-center justify-center shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 px-2">
                  <img src={pay.url} alt={pay.name} className="h-5 md:h-7 w-auto object-contain" />
                </div>
              ))}
           </div>
        </div>

        {/* ================= SECTION 4: SOCIALS & COPYRIGHT ================= */}
        <div className="border-t border-white/30 pt-8 flex flex-col md:flex-row justify-between items-center gap-6 relative z-20">
           <div className="text-[10px] font-bold text-white tracking-[0.2em] uppercase text-center md:text-left drop-shadow-sm">
             © {new Date().getFullYear()} Henotic Diagnostics. All Rights Reserved.
           </div>
           
           {/* REPLACED WITH BULLETPROOF ICONS */}
           <div className="flex flex-wrap justify-center gap-3">
              <a href="https://www.facebook.com/henoticdiagnostics2019/" target="_blank" rel="noreferrer" className="w-10 h-10 bg-white/10 border border-white/20 rounded-xl flex items-center justify-center hover:bg-white hover:text-blue-600 hover:-translate-y-1 shadow-lg text-white transition-all">
                <FacebookIcon size={18} />
              </a>
              <a href="https://www.instagram.com/henoticdiagnostics2019/" target="_blank" rel="noreferrer" className="w-10 h-10 bg-white/10 border border-white/20 rounded-xl flex items-center justify-center hover:bg-white hover:text-pink-600 hover:-translate-y-1 shadow-lg text-white transition-all">
                <InstagramIcon size={18} />
              </a>
              <a href="https://x.com/henoticservices" target="_blank" rel="noreferrer" className="w-10 h-10 bg-white/10 border border-white/20 rounded-xl flex items-center justify-center hover:bg-white hover:text-black hover:-translate-y-1 shadow-lg text-white transition-all">
                <TwitterIcon size={18} />
              </a>
              <a href="https://www.linkedin.com/company/14610097/admin/page-posts/published/" target="_blank" rel="noreferrer" className="w-10 h-10 bg-white/10 border border-white/20 rounded-xl flex items-center justify-center hover:bg-white hover:text-blue-700 hover:-translate-y-1 shadow-lg text-white transition-all">
                <LinkedinIcon size={18} />
              </a>
              <a href="https://www.youtube.com/@HenoticDiagnostics" target="_blank" rel="noreferrer" className="w-10 h-10 bg-white/10 border border-white/20 rounded-xl flex items-center justify-center hover:bg-white hover:text-red-600 hover:-translate-y-1 shadow-lg text-white transition-all">
                <YoutubeIcon size={18} />
              </a>
              <a href="https://in.pinterest.com/henoticdiagnostics2019/" target="_blank" rel="noreferrer" className="w-10 h-10 bg-white/10 border border-white/20 rounded-xl flex items-center justify-center hover:bg-white hover:text-red-500 hover:-translate-y-1 shadow-lg text-white transition-all font-bold text-lg font-serif">
                P
              </a>
           </div>

           <div className="flex gap-6 text-[10px] font-bold text-white tracking-widest uppercase drop-shadow-sm">
              <Link href="/privacy" className="hover:text-white/70 transition-colors">Privacy</Link>
              <Link href="/terms" className="hover:text-white/70 transition-colors">Terms</Link>
           </div>
        </div>
      </div>

      {/* --- PREMIUM FLOATING WIDGETS --- */}
      <div className="fixed bottom-6 right-6 z-[9999] flex flex-col gap-4 items-end pointer-events-none">
        <a href="https://wa.me/918879327184" target="_blank" rel="noreferrer" className="group relative transition-transform hover:scale-110 duration-300 pointer-events-auto" aria-label="Chat on WhatsApp">
          <div className="absolute inset-0 bg-green-500 blur-xl opacity-0 group-hover:opacity-60 rounded-full transition-opacity duration-300"></div>
          <img src="https://storage.googleapis.com/wp-media-henoticbucket/2026/01/c65e4696-whatsapp.webp" alt="WhatsApp" className="w-14 h-14 md:w-16 md:h-16 drop-shadow-2xl relative z-10" />
        </a>
        <a href="tel:08879327184" className="group relative transition-transform hover:scale-110 duration-300 pointer-events-auto" aria-label="Call Now">
          <div className="absolute inset-0 bg-blue-500 blur-xl opacity-0 group-hover:opacity-60 rounded-full transition-opacity duration-300"></div>
          <img src="https://storage.googleapis.com/wp-media-henoticbucket/2026/01/0f754a41-call-now.webp" alt="Call Now" className="w-14 h-14 md:w-16 md:h-16 drop-shadow-2xl animate-[pulse_2s_infinite] hover:animate-none relative z-10" />
        </a>
      </div>
    </footer>
  );
}