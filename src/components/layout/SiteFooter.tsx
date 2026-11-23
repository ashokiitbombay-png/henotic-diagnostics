"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { siteConfig } from "@/config/site";
import { routesConfig } from "@/config/routes";

const NewsletterSignup = dynamic(() => import('@/components/ui/NewsletterSignup'), { ssr: false });

const PAYMENTS = [
  { name: "Paytm", url: "https://cdn.henoticdiagnostics.com/2026/01/4cc15576-paytm-banking-henotic-diagnostics.webp" },
  { name: "GPay", url: "https://cdn.henoticdiagnostics.com/2026/01/22f37b85-google-pay-payment-transfer-henotic-diagnostics.webp" },
  { name: "BHIM", url: "https://cdn.henoticdiagnostics.com/2026/01/9ee511bb-bhim-upi-transfer-banking-henotic-diagnostics.webp" },
  { name: "Amex", url: "https://cdn.henoticdiagnostics.com/2026/01/8982a1eb-american-experss-payment-transfer-henotic-diagnostics.webp" },
  { name: "Amazon", url: "https://cdn.henoticdiagnostics.com/2026/01/57673992-amazon-pay-payment-transfer-henotic-diagnostics.webp" },
  { name: "Cards", url: "https://cdn.henoticdiagnostics.com/2026/01/d412e583-all-debitcards-creditcards-payment-transfer-henotic-diagnostics.webp" },
  { name: "Visa", url: "https://cdn.henoticdiagnostics.com/2026/01/7ecc0645-visa-payment-transfer-henotic-diagnostics.webp" },
  { name: "Paypal", url: "https://cdn.henoticdiagnostics.com/2026/01/3ffff106-paypal-banking-henotic-diagnostics.webp" },
];

export default function SiteFooter() {
  return (
    <footer className="relative text-white font-sans py-12 lg:py-16 overflow-hidden bg-header-footer-gradient">
      <div className="container mx-auto px-4 lg:px-8 max-w-7xl relative z-20">
        {/* SECTION 1: NAP, MAP & BRAND */}
        <div className="grid lg:grid-cols-12 gap-6 lg:gap-12 mb-10 border-b border-white/20 pb-10">
          <div className="lg:col-span-5 flex flex-col gap-5">
            <Link href={routesConfig.home} className="inline-block w-max">
              <div className="sf-box">
                <img
                  src={siteConfig.logoUrl}
                  alt={siteConfig.name}
                  width={320}
                  height={80}
                  loading="lazy"
                  className="w-64 lg:w-72 h-auto object-contain"
                />
              </div>
            </Link>

            <div className="sf-box flex-grow">
              <h4 className="sf-h">Headquarters &amp; Flagship Center</h4>

              <address className="text-white/90 text-sm leading-relaxed mb-5 pl-4 border-l-2 border-white/40 not-italic">
                <strong className="text-lg text-white block mb-1.5">{siteConfig.name}</strong>
                Second floor, Millennium Empire, Business Park,<br />
                Plot No 47, D Mart Rd, Sector 15, Kharghar,<br />
                Panvel, Navi Mumbai, Maharashtra 410210
              </address>

              <div className="flex flex-col gap-2.5 text-sm font-semibold">
                <a
                  href={siteConfig.contact.phonePrimaryRaw}
                  className="flex items-center justify-between text-white bg-white/10 p-3.5 rounded-xl hover:bg-white/20"
                >
                  <span>Call {siteConfig.contact.phonePrimary}</span>
                  <span aria-hidden="true">↗</span>
                </a>
                <div className="text-white p-3 bg-black/10 rounded-xl">
                  24×7 Open • 365 Days
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 flex flex-col gap-5">
            <div className="flex flex-col sm:flex-row gap-4 bg-white/10 p-4 rounded-3xl border border-white/20">
              <img
                width={128}
                height={128}
                src="https://cdn.henoticdiagnostics.com/Front%20Office/henotic-diagnostics-name-plate.webp"
                alt="Henotic Diagnostics Facility"
                className="w-full sm:w-32 h-32 object-cover rounded-2xl"
                loading="lazy"
              />
              <div className="flex flex-col justify-center">
                <h5 className="font-bold text-lg mb-1">Highly Rated on Google</h5>
                <p className="text-xs text-white/80 mb-3 max-w-sm">
                  Experience world-class diagnostic imaging and pathology in Navi Mumbai.
                </p>
                <div className="flex gap-2">
                  <a
                    href="https://share.google/yRA62stKchzN8uOVe"
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs bg-white text-blue-900 px-3 py-1.5 rounded-lg font-bold"
                  >
                    View Profile
                  </a>
                  <a
                    href="https://share.google/IcBtvtVjwozCBFMPp"
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs bg-black/20 text-white px-3 py-1.5 rounded-lg font-bold border border-white/20"
                  >
                    Reviews
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-white/10 p-2 rounded-3xl border border-white/20 relative overflow-hidden h-[220px] sm:h-[250px]">
              <iframe
                title="Henotic Diagnostics Google Map Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3771.4687576643887!2d73.07795039999999!3d19.043116999999995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c3812919666b%3A0xa377f33beeed1944!2sHenotic%20Diagnostics!5e0!3m2!1sen!2sin!4v1786048629791!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="rounded-2xl w-full h-full"
              />
              <a
                href="https://maps.app.goo.gl/Ex2RG9afjvuEJp7y5"
                target="_blank"
                rel="noreferrer"
                className="absolute bottom-4 left-4 bg-black/80 text-white text-xs font-bold px-4 py-2 rounded-full"
              >
                Directions →
              </a>
            </div>
          </div>
        </div>

        {/* SECTION 2: ARCHITECTURE LINKS */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8 mb-8 lg:mb-12">
          <div>
            <h4 className="sf-h">
              Core Diagnostics
            </h4>
            <ul className="sf-list flex flex-col gap-2.5 text-sm font-semibold text-white/90">
              <li><Link href={routesConfig.getServiceUrl("mri-scan")}>MRI Scan (3T)</Link></li>
              <li><Link href={routesConfig.getServiceUrl("ct-scan")}>CT Scan (128 Slice)</Link></li>
              <li><Link href={routesConfig.getServiceUrl("pet-ct")}>PET-CT Scan</Link></li>
              <li><Link href={routesConfig.getServiceUrl("ultrasound")}>Ultrasound / USG</Link></li>
              <li><Link href="/pricing" className="text-emerald-300 font-bold">Test Pricing &amp; Cost Estimator</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="sf-h">
              Pathology
            </h4>
            <ul className="sf-list flex flex-col gap-2.5 text-sm font-semibold text-white/90">
              <li><Link href={routesConfig.getServiceUrl("blood-test")}>Blood Tests</Link></li>
              <li><Link href={routesConfig.getServiceUrl("full-body-check-up")}>Full Body Checkups</Link></li>
              <li><Link href={routesConfig.services}>Specialized Profiles</Link></li>
              <li><a href={siteConfig.url} target="_blank" rel="noreferrer">Corporate Site ↗</a></li>
            </ul>
          </div>
          <div>
            <h4 className="sf-h">
              Web Presence
            </h4>
            <ul className="sf-list flex flex-col gap-2.5 text-sm font-semibold text-white/90">
              <li><a href="https://medium.com/@henoticdiagnostics" target="_blank" rel="noreferrer">Medium Blog</a></li>
              <li><a href="https://www.reddit.com/user/Top_Pen3672/" target="_blank" rel="noreferrer">Reddit Community</a></li>
              <li><a href="https://www.tumblr.com/henotichealthcare" target="_blank" rel="noreferrer">Tumblr Updates</a></li>
              <li><a href="https://www.peeptown.com/medical-diagnostic-imaging-center/henoticdiagnostics" target="_blank" rel="noreferrer">Peeptown</a></li>
            </ul>
          </div>
          <div>
            <h4 className="sf-h">
              Sitemap &amp; Dev
            </h4>
            <ul className="sf-list flex flex-col gap-2.5 text-sm font-semibold text-white/90">
              <li><Link href="/locations">Geographical Directory</Link></li>
              <li><Link href="/city">City Hubs</Link></li>
              <li><Link href="/sitemap">HTML Sitemap</Link></li>
              <li><a href="/sitemap.xml">XML Sitemap</a></li>
              <li><a href="/api/products/feed">Product Feed</a></li>
              <li><a href="/robots.txt">Robots.txt</a></li>
              <li><a href="https://github.com/ashokiitbombay-png/headless-henotics" target="_blank" rel="noreferrer">Open Source</a></li>
              <li><a href={`mailto:${siteConfig.contact.email}`}>Support Email</a></li>
            </ul>
          </div>
        </div>

        {/* SECTION 3: PAYMENTS */}
        <div className="mb-8 bg-black/5 p-6 rounded-3xl border border-white/10">
          <p className="text-center text-[10px] font-bold text-white/90 uppercase tracking-[0.2em] mb-5">
            Secure Payment Partners
          </p>
          <div className="flex flex-wrap justify-center gap-3.5">
            {PAYMENTS.map((pay) => (
              <div key={pay.name} className="sf-pay">
                <img
                  width={72}
                  height={28}
                  src={pay.url}
                  alt={pay.name}
                  loading="lazy"
                  className="h-5 md:h-7 w-auto object-contain"
                />
              </div>
            ))}
          </div>
        </div>

        {/* SECTION 4: PATIENT POLICIES BOX */}
        <div className="mb-8 bg-white/5 border border-white/10 rounded-3xl p-6">
          <h5 className="text-xs font-black text-white/90 uppercase tracking-[0.25em] mb-3.5 text-center md:text-left">
            Patient Care &amp; Legal Policies
          </h5>
          <div className="sf-pol flex flex-wrap justify-center md:justify-start gap-x-5 gap-y-2.5 text-xs md:text-sm font-semibold text-white/80">
            <Link href={routesConfig.privacy}>Privacy Policy</Link>
            <Link href={routesConfig.terms}>Terms of Service</Link>
            <Link href="/cancellation-policy">Cancellation Policy</Link>
            <Link href="/delivery-policy">Delivery Policy</Link>
            <Link href="/disclaimers">Disclaimers</Link>
            <Link href="/grievance-policy">Grievance Redressal</Link>
            <Link href="/medical-disclaimer">Medical Disclaimer</Link>
            <Link href="/refund-returns">Refund &amp; Returns</Link>
            <Link href="/refund-policy">Refund Policy</Link>
            <Link href="/return-policy">Return Policy</Link>
          </div>
        </div>

        {/* SECTION 5: SOCIAL MEDIA */}
        <div className="mb-8 border-t border-white/20 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col md:flex-row items-center gap-4">
            <span className="text-xs font-black text-white/95 uppercase tracking-[0.25em]">
              Social Media Pages
            </span>
            <div className="flex flex-wrap justify-center gap-3">
              <a aria-label="Facebook" href={siteConfig.socials.facebook} target="_blank" rel="noreferrer" className="sf-soc hover:text-blue-600 font-bold text-xs">
                f
              </a>
              <a aria-label="Instagram" href={siteConfig.socials.instagram} target="_blank" rel="noreferrer" className="sf-soc hover:text-pink-600 font-bold text-xs">
                IG
              </a>
              <a aria-label="X Twitter" href={siteConfig.socials.twitter} target="_blank" rel="noreferrer" className="sf-soc hover:text-black font-bold text-xs">
                X
              </a>
              <a aria-label="LinkedIn" href={siteConfig.socials.linkedin} target="_blank" rel="noreferrer" className="sf-soc hover:text-blue-700 font-bold text-xs">
                in
              </a>
              <a aria-label="YouTube" href={siteConfig.socials.youtube} target="_blank" rel="noreferrer" className="sf-soc hover:text-red-600 font-bold text-xs">
                YT
              </a>
              <a aria-label="Pinterest" href={siteConfig.socials.pinterest} target="_blank" rel="noreferrer" className="sf-soc hover:text-red-500 font-bold text-base font-serif">
                P
              </a>
            </div>
          </div>
          <div className="text-[10px] font-bold text-white/60 tracking-widest uppercase hidden md:block">
            ISO 9001:2015 Certified Center
          </div>
        </div>

        {/* NEWSLETTER SIGNUP */}
        <div className="mb-8 border-t border-white/20 pt-8">
          <div className="max-w-md mx-auto md:mx-0">
            <h4 className="font-extrabold uppercase tracking-widest text-xs mb-3 text-white/90">
              Stay Updated
            </h4>
            <p className="text-xs font-medium text-white/60 mb-4">
              Subscribe to our newsletter for health tips, diagnostic insights, and exclusive offers.
            </p>
            <NewsletterSignup variant="compact" />
          </div>
        </div>

        {/* SECTION 6: COPYRIGHT */}
        <div className="border-t border-white/20 pt-6 text-center text-[11px] font-bold text-white/90 tracking-[0.25em] uppercase select-none">
          © <span suppressHydrationWarning>{new Date().getFullYear()}</span> Henotic Diagnostics. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}
