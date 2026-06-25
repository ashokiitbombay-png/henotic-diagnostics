import React from 'react';
import { 
  MapPin, Phone, Clock, ExternalLink, 
  Building2, Activity, Microscope, PhoneCall, Globe,
  ShieldCheck, HeartPulse
} from 'lucide-react';

interface Center {
  name: string;
  subtitle: string;
  type: 'flagship' | 'imaging' | 'pathology' | 'cardiology';
  address: string;
  phone: string;
  hours: string;
  gbpUrl: string;
  mapsUrl: string;
  embedUrl: string;
  services: string[];
  regionGroup: 'navi-mumbai' | 'mumbai';
}

const centersData: Center[] = [
  // 1. KHARGHAR MAIN CENTER (Always present as Flagship Hub)
  {
    name: "Henotic Diagnostics - Kharghar",
    subtitle: "Main Flagship & Corporate Booking Hub",
    type: "flagship",
    address: "Second floor, Millennium Empire, Business Park, Plot No 47, D Mart Rd, Sector 15, Kharghar, Navi Mumbai, Maharashtra 410210",
    phone: "08879327184",
    hours: "Open 24 hours",
    gbpUrl: "https://share.google/cfhShzzofe7LmgiPN",
    mapsUrl: "https://maps.google.com/?cid=11779150789147957572",
    embedUrl: "https://maps.google.com/maps?q=19.04313094481506,73.07794905888657&z=15&output=embed",
    services: ["blood-test", "ultrasound", "pet-scan", "mri-scan", "ct-scan", "2d-echo", "ecg", "tmt"],
    regionGroup: "navi-mumbai"
  },
  // 2. TURBHE CENTER
  {
    name: "Henotic Diagnostics - Turbhe",
    subtitle: "Pathology & Laboratory Hub",
    type: "pathology",
    address: "RPT House, Turbhe Village Rd, Sector 24, Turbhe, Navi Mumbai, Maharashtra 400703",
    phone: "022 4045 0000",
    hours: "Open 24 hours",
    gbpUrl: "https://share.google/sDKfcWxJSfRRL30Tw",
    mapsUrl: "https://maps.app.goo.gl/sEtxnwGHVtFuojEz5",
    embedUrl: "https://maps.google.com/maps?q=RPT%20House,%20Sector%2024,%20Turbhe,%20Navi%20Mumbai&z=15&output=embed",
    services: ["blood-test", "pathology"],
    regionGroup: "navi-mumbai"
  },
  // 3. KHARGHAR SECTOR 18
  {
    name: "Henotic Diagnostics - Kharghar (Sector 18)",
    subtitle: "Pathology & Clinical Lab",
    type: "pathology",
    address: "Office No. 1 & 2, First Floor, Giriraj Icon, Sector 18 Rd, near Sanjivani International School, Sector 18, Kharghar, Navi Mumbai, Maharashtra 410210",
    phone: "093223 32368",
    hours: "Open 24 hours",
    gbpUrl: "https://share.google/WFmPvAC1Lb53vwwni",
    mapsUrl: "https://maps.app.goo.gl/nAE8YksYLpafq6cZ7",
    embedUrl: "https://maps.google.com/maps?q=Giriraj%20Icon,%20Sector%2018,%20Kharghar,%20Navi%20Mumbai&z=15&output=embed",
    services: ["blood-test", "pathology"],
    regionGroup: "navi-mumbai"
  },
  // 4. VIDYAVIHAR CENTER
  {
    name: "Henotic Diagnostics - Vidyavihar",
    subtitle: "Central Pathology Lab",
    type: "pathology",
    address: "Unit number 8, First Floor, Neelkanth Corporate Park, Ramdev Pir Rd, Neelkanth Kingdom, Vidyavihar West, Vidyavihar, Mumbai, Maharashtra 400086",
    phone: "09700369700",
    hours: "Open 24 hours",
    gbpUrl: "https://share.google/qLWY5FaZvsE6IJbF7",
    mapsUrl: "https://maps.app.goo.gl/BAn3tehizSieTbHE6",
    embedUrl: "https://maps.google.com/maps?q=Neelkanth%20Corporate%20Park,%20Vidyavihar%20West,%20Mumbai&z=15&output=embed",
    services: ["blood-test", "pathology"],
    regionGroup: "mumbai"
  },
  // 5. KHARGHAR WE CARE
  {
    name: "Henotic Diagnostics - Kharghar (Sector 15)",
    subtitle: "Advanced Sonography & Imaging Center",
    type: "imaging",
    address: "Millennium Empire, Plot no 47, near D Mart Road, Sector 15, Kharghar, Navi Mumbai, Maharashtra 410210",
    phone: "089761 33001",
    hours: "Open 24 hours",
    gbpUrl: "https://share.google/oQB9Kyll6JxblLOlT",
    mapsUrl: "https://maps.app.goo.gl/qtxciKDUpHkxRH6h8",
    embedUrl: "https://maps.google.com/maps?q=Millennium%20Empire,%20Sector%2015,%20Kharghar,%20Navi%20Mumbai&z=15&output=embed",
    services: ["ultrasound", "pregnancy-sonography", "anomaly-scan", "usg-scan"],
    regionGroup: "navi-mumbai"
  },
  // 6. BELAPUR AGRAWAL
  {
    name: "Henotic Diagnostics - CBD Belapur",
    subtitle: "Advanced Imaging & Nuclear Medicine Center",
    type: "imaging",
    address: "Ground Floor, Hilton Centre, Shop No. 13 & 7, Plot No. 66, Sector 11, CBD Belapur, Navi Mumbai, Maharashtra 400614",
    phone: "8692918081",
    hours: "Open 24 hours",
    gbpUrl: "https://share.google/t8ZAPGem2llVUk8Lh",
    mapsUrl: "https://maps.app.goo.gl/NWs87cJjGrnYbTXe7",
    embedUrl: "https://maps.google.com/maps?q=Hilton%20Centre,%20Sector%2011,%20CBD%20Belapur,%20Navi%20Mumbai&z=15&output=embed",
    services: ["ultrasound", "pregnancy-sonography", "anomaly-scan", "usg-scan", "pet-scan", "mri-scan", "ct-scan"],
    regionGroup: "navi-mumbai"
  },
  // 7. KHARGHAR NDC
  {
    name: "Henotic Diagnostics - Kharghar (NDC)",
    subtitle: "Advanced Sonography & Cardiology Center",
    type: "imaging",
    address: "Shop No 1 & 2, Keystone Elita, Plot no. 49, D Mart Rd, Sector 15, Kharghar, Navi Mumbai, Maharashtra 400210",
    phone: "086570 17320",
    hours: "Open 24 hours",
    gbpUrl: "https://share.google/t6eK5i6AOgSndAN8c",
    mapsUrl: "https://maps.app.goo.gl/z3wFKLqF1pw4Hc3q9",
    embedUrl: "https://maps.google.com/maps?q=Keystone%20Elita,%20Sector%2015,%20Kharghar,%20Navi%20Mumbai&z=15&output=embed",
    services: ["ultrasound", "2d-echo", "ecg", "tmt"],
    regionGroup: "navi-mumbai"
  },
  // 8. SEAWOODS NDC
  {
    name: "Henotic Diagnostics - Seawoods",
    subtitle: "Diagnostic Imaging Center",
    type: "imaging",
    address: "2nd floor, Plot not 19, Neurogen, Brain and Spine Institute, Seawoods West, Sector 40, Seawoods, Navi Mumbai, Maharashtra 400706",
    phone: "086570 17320",
    hours: "Everyday 8 am – 9 pm",
    gbpUrl: "https://share.google/9CeZoAywTNqpwm1wC",
    mapsUrl: "https://maps.app.goo.gl/7UZyaWvgawsPJdGM6",
    embedUrl: "https://maps.google.com/maps?q=Neurogen%20Brain%20and%20Spine%20Institute,%20Seawoods&z=15&output=embed",
    services: ["ultrasound", "pregnancy-sonography", "anomaly-scan", "usg-scan"],
    regionGroup: "navi-mumbai"
  },
  // 9. GHATKOPAR WEST JEEYO
  {
    name: "Henotic Diagnostics - Ghatkopar West",
    subtitle: "PET-CT & Nuclear Imaging Center",
    type: "imaging",
    address: "Sarvodaya Hospital Premises, Lal Bahadur Shastri Marg, Gandhi Nagar, Kirti Vihar, Ghatkopar West, Mumbai, Maharashtra 400086",
    phone: "099675 26768",
    hours: "Everyday 6:30 am – 6:30 pm",
    gbpUrl: "https://share.google/XYjWwS8OY8SRIFmzA",
    mapsUrl: "https://maps.app.goo.gl/e7wLNkWGsPiqUzaT7",
    embedUrl: "https://maps.google.com/maps?q=Sarvodaya%20Hospital,%20Ghatkopar%20West,%20Mumbai&z=15&output=embed",
    services: ["pet-scan"],
    regionGroup: "mumbai"
  },
  // 10. CHEMBUR MEDCARE
  {
    name: "Henotic Diagnostics - Chembur",
    subtitle: "PET-CT & Advanced Imaging Center",
    type: "imaging",
    address: "Ground Floor, Sushrut Hospital & Research Centre, 365, Sant Vershaw Kakkaya Marg, Swastik Park, Chembur, Mumbai, Maharashtra 400071",
    phone: "088699 06990",
    hours: "Open 24 hours",
    gbpUrl: "https://share.google/RjuPj9NdR0V0H6I8Y",
    mapsUrl: "https://maps.app.goo.gl/kmWCDDfPv247Nbb5A",
    embedUrl: "https://maps.google.com/maps?q=Sushrut%20Hospital,%20Chembur,%20Mumbai&z=15&output=embed",
    services: ["pet-scan"],
    regionGroup: "mumbai"
  },
  // 11. PANVEL LOTUS
  {
    name: "Henotic Diagnostics - Panvel",
    subtitle: "3T MRI & 128-Slice CT Center",
    type: "imaging",
    address: "Shop no 1 & 2, Kanak Samruddhi, LOTUS MRI AND CT SCAN, Plot No 36, near Gandhi Hospital, behind Purohit Hospital Street, MCCH Society, Panvel, Navi Mumbai, Maharashtra 410206",
    phone: "8082452452",
    hours: "Open 24 hours",
    gbpUrl: "https://share.google/Nneg82aYPtt1zECiS",
    mapsUrl: "https://maps.app.goo.gl/z1X4RYyT4jbpim3UA",
    embedUrl: "https://maps.google.com/maps?q=Lotus%20MRI%20and%20CT%20Scan,%20Panvel&z=15&output=embed",
    services: ["mri-scan", "ct-scan"],
    regionGroup: "navi-mumbai"
  },
  // 12. KHARGHAR MEDICOVER
  {
    name: "Henotic Diagnostics - Kharghar (Sector 10)",
    subtitle: "3T MRI & Advanced Diagnostics Center",
    type: "imaging",
    address: "Sector 10, Kharghar, Navi Mumbai, Maharashtra 410210",
    phone: "040 6833 4455",
    hours: "Open 24 hours",
    gbpUrl: "https://share.google/Dy4xSDRv1k71asmhN",
    mapsUrl: "https://maps.app.goo.gl/5Dom4kKA2M52gnXB6",
    embedUrl: "https://maps.google.com/maps?q=Medicover%20Hospitals,%20Sector%2010,%20Kharghar&z=15&output=embed",
    services: ["mri-scan", "ct-scan"],
    regionGroup: "navi-mumbai"
  },
  // 13. ROADPALI WHITE LOTUS
  {
    name: "Henotic Diagnostics - Roadpali",
    subtitle: "Advanced Hospital Scan & Imaging Center",
    type: "imaging",
    address: "Plot no 1, Roadpali Rd, opposite Police head quarter, Sector 20, Kalamboli, Panvel, Maharashtra 410218",
    phone: "088793 07930",
    hours: "Open 24 hours",
    gbpUrl: "https://share.google/ieL48igFRWKzPZrok",
    mapsUrl: "https://maps.app.goo.gl/VcGQ31k1ZYsvU1AD7",
    embedUrl: "https://maps.google.com/maps?q=White%20Lotus%20International%20Hospital,%20Kalamboli&z=15&output=embed",
    services: ["mri-scan", "ct-scan"],
    regionGroup: "navi-mumbai"
  },
  // 14. SANPADA MEDCARE
  {
    name: "Henotic Diagnostics - Sanpada",
    subtitle: "Advanced MRI & CT Imaging Center",
    type: "imaging",
    address: "Ground floor, Moraj Palm Paradise, Shop no. B-4, Plot no 8 & 8A, Sector 18, Sanpada, Navi Mumbai, Maharashtra 400705",
    phone: "86553 51854",
    hours: "7 AM – 7 PM",
    gbpUrl: "https://share.google/nO928czqAXr9OwyqX",
    mapsUrl: "https://maps.app.goo.gl/F59ofYrHaDqKKrjK9",
    embedUrl: "https://maps.google.com/maps?q=Moraj%20Palm%20Paradise,%20Sanpada,%20Navi%20Mumbai&z=15&output=embed",
    services: ["mri-scan", "ct-scan"],
    regionGroup: "navi-mumbai"
  },
  // 15. KHARGHAR HEART MATE
  {
    name: "Henotic Diagnostics - Kharghar (Sector 7)",
    subtitle: "Advanced Cardiology Center",
    type: "cardiology",
    address: "Shop No 13, Tharwani Heritage, next to Police Station, Sector 7, Kharghar, Navi Mumbai, Maharashtra 410210",
    phone: "098496 34502",
    hours: "Everyday 11 am – 9 pm",
    gbpUrl: "https://share.google/aLr92KgFMB3c0djak",
    mapsUrl: "https://maps.app.goo.gl/68LDEfwTfdTAi1X9A",
    embedUrl: "https://maps.google.com/maps?q=Tharwani%20Heritage,%20Sector%207,%20Kharghar&z=15&output=embed",
    services: ["2d-echo", "ecg", "tmt"],
    regionGroup: "navi-mumbai"
  },
  // 16. BELAPUR HEART FITT
  {
    name: "Henotic Diagnostics - Belapur (Sector 11)",
    subtitle: "Cardiology & Cardiac Wellness Clinic",
    type: "cardiology",
    address: "Shop No.22, Balaji Bhavan, Plot No. 42A, Sector 11, CBD Belapur, Navi Mumbai, Maharashtra 400614",
    phone: "08879327184",
    hours: "Open 24 hours",
    gbpUrl: "https://share.google/SSLQBfe1WA6odExuJ",
    mapsUrl: "https://maps.app.goo.gl/PU3Dtt8yfriLMYTe8",
    embedUrl: "https://maps.google.com/maps?q=Balaji%20Bhavan,%20Sector%2011,%20CBD%20Belapur&z=15&output=embed",
    services: ["2d-echo", "ecg", "tmt"],
    regionGroup: "navi-mumbai"
  }
];

interface PartnerCentersProps {
  service: string; // e.g. "mri-scan", "blood-test"
  region: string;  // e.g. "navi-mumbai", "central-suburbs"
}

export default function PartnerCenters({ service, region }: PartnerCentersProps) {
  // Normalize parameters to resolve matching categories
  const serviceSlug = service.toLowerCase();
  const regionSlug = region.toLowerCase();

  // Map service slug to generic types
  const getMappedServiceCategory = (slug: string): string => {
    if (slug.includes('blood') || slug.includes('body-check') || slug.includes('pathology')) {
      return 'blood-test';
    }
    if (slug.includes('ultra') || slug.includes('sono') || slug.includes('pregnancy') || slug.includes('anomaly') || slug.includes('mammography') || slug.includes('usg')) {
      return 'ultrasound';
    }
    if (slug.includes('pet') || slug.includes('nuclear') || slug.includes('psma') || slug.includes('dopa') || slug.includes('dtpa') || slug.includes('dmsa')) {
      return 'pet-scan';
    }
    if (slug.includes('mri') || slug.includes('ct')) {
      return 'mri-scan';
    }
    if (slug.includes('echo') || slug.includes('ecg') || slug.includes('tmt') || slug.includes('cardio') || slug.includes('stress')) {
      return '2d-echo';
    }
    return 'default';
  };

  const category = getMappedServiceCategory(serviceSlug);

  // Group region parameter: navi-mumbai vs mumbai
  const regionGroup = regionSlug === 'navi-mumbai' ? 'navi-mumbai' : 'mumbai';

  // Filter centers based on matching services and region group
  const filteredCenters = centersData.filter(center => {
    // 1. Flagship center (index 0 / Kharghar) is always included for all services and regions
    if (center.name === "Henotic Diagnostics - Kharghar" && center.subtitle.includes("Main Flagship")) {
      return true;
    }

    // 2. Otherwise, must match the region group (mumbai vs navi-mumbai)
    if (center.regionGroup !== regionGroup) {
      return false;
    }

    // 3. Must match the service category
    if (category === 'default') return true; // fallback
    return center.services.includes(category);
  });

  // Unique centers filter just in case of overlaps
  const uniqueCenters = Array.from(new Set(filteredCenters.map(c => c.name)))
    .map(name => filteredCenters.find(c => c.name === name)!);

  if (uniqueCenters.length === 0) return null;

  return (
    <section className="py-20 bg-slate-50 relative overflow-hidden border-b border-slate-200">
      {/* Background Gradients */}
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-blue-100/50 rounded-full mix-blend-multiply filter blur-3xl opacity-60 pointer-events-none"></div>
      <div className="absolute bottom-1/3 right-0 w-96 h-96 bg-pink-100/50 rounded-full mix-blend-multiply filter blur-3xl opacity-60 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-800 text-xs md:text-sm font-bold uppercase tracking-widest mb-4 shadow-sm">
            <Building2 size={16} className="text-[#E55D87]" /> Direct Network Centers
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight">
            Our Parent Diagnostic Centers
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto font-medium text-base md:text-lg">
            Henotic Diagnostics operates high-precision flagship and diagnostic network hubs near you, providing standardized clinical scans and pathology.
          </p>
        </div>

        {/* Centers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {uniqueCenters.map((center, i) => {
            const isMainHub = center.name === "Henotic Diagnostics - Kharghar" && center.subtitle.includes("Main Flagship");
            
            return (
              <div 
                key={i}
                className={`relative rounded-[2.5rem] p-6 bg-white border flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 shadow-[0_15px_30px_rgba(0,0,0,0.02)] hover:shadow-[0_25px_45px_rgba(0,0,0,0.08)] ${
                  isMainHub 
                    ? "border-blue-400/80 ring-2 ring-blue-500/10 bg-gradient-to-b from-blue-50/20 to-white" 
                    : "border-slate-100 hover:border-slate-300"
                }`}
              >
                {/* 3D Glassmorphism Accent Badge */}
                {isMainHub && (
                  <span className="absolute -top-3.5 left-8 px-4 py-1 rounded-full bg-gradient-to-r from-[#E55D87] to-pink-500 text-white text-[10px] md:text-xs font-black uppercase tracking-widest shadow-md">
                    Corporate Flagship Hub
                  </span>
                )}

                <div>
                  {/* Title & Badge */}
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div>
                      <h3 className="font-extrabold text-lg md:text-xl text-slate-900 leading-snug">
                        {center.name}
                      </h3>
                      <p className="text-xs font-bold text-slate-400 mt-1 uppercase tracking-wider">
                        {center.subtitle}
                      </p>
                    </div>
                    <div className={`p-3 rounded-2xl flex items-center justify-center shrink-0 ${
                      isMainHub ? "bg-blue-100 text-blue-600" : "bg-slate-100 text-slate-600"
                    }`}>
                      {center.type === 'pathology' ? (
                        <Microscope size={22} />
                      ) : center.type === 'cardiology' ? (
                        <Activity size={22} />
                      ) : (
                        <Building2 size={22} />
                      )}
                    </div>
                  </div>

                  {/* Trust Signals (Accreditations) */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-slate-50 text-slate-600 border border-slate-100">
                      NABL Compliant
                    </span>
                    <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-slate-50 text-slate-600 border border-slate-100">
                      ISO 9001 Certified
                    </span>
                    <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100">
                      Priority Booking
                    </span>
                  </div>

                  {/* Core Details (Address, Phone, Hours) */}
                  <div className="space-y-3.5 mb-6 text-sm text-slate-600 font-medium">
                    <div className="flex items-start gap-3">
                      <MapPin size={18} className="text-[#E55D87] shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{center.address}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Clock size={18} className="text-blue-500 shrink-0" />
                      <span>{center.hours}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone size={18} className="text-emerald-500 shrink-0" />
                      <a href={`tel:${center.phone.replace(/\s+/g, '')}`} className="font-extrabold text-slate-800 hover:text-blue-600 transition-colors">
                        {center.phone}
                      </a>
                    </div>
                  </div>
                </div>

                {/* Google Maps Dedicated Box */}
                <div className="mt-4">
                  <div className="w-full h-44 rounded-2xl overflow-hidden border border-slate-200 shadow-inner bg-slate-100 relative mb-4">
                    <iframe 
                      title={`Google Map - ${center.name}`}
                      src={center.embedUrl}
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen={false}
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      className="absolute inset-0 w-full h-full object-cover"
                    ></iframe>
                  </div>

                  {/* Action Buttons */}
                  <div className="grid grid-cols-2 gap-3 mt-4">
                    <a 
                      href={`tel:${center.phone.replace(/\s+/g, '')}`} 
                      className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold text-xs hover:shadow-md hover:from-blue-700 hover:to-blue-800 transition-all text-center"
                    >
                      <PhoneCall size={14} /> Call Hub
                    </a>
                    <a 
                      href={center.gbpUrl} 
                      target="_blank" 
                      rel="noreferrer" 
                      className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-white border border-slate-200 text-slate-700 font-bold text-xs hover:bg-slate-50 transition-all text-center"
                    >
                      <Globe size={14} /> View Hub
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
