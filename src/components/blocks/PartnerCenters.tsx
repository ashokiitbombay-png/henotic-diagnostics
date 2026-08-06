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
    mapsUrl: "https://maps.app.goo.gl/Ex2RG9afjvuEJp7y5",
    embedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3771.4687576643887!2d73.07795039999999!3d19.043116999999995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c3812919666b%3A0xa377f33beeed1944!2sHenotic%20Diagnostics!5e0!3m2!1sen!2sin!4v1786048629791!5m2!1sen!2sin",
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

// Curated theme styles selector
const getCardTheme = (isMainHub: boolean, index: number) => {
  if (isMainHub) {
    return {
      container: "bg-gradient-to-br from-blue-50/80 via-white to-white border-blue-300 shadow-[0_20px_40px_rgba(37,99,235,0.06)] hover:shadow-[0_30px_60px_rgba(37,99,235,0.12)] hover:border-blue-400",
      header: "bg-gradient-to-r from-blue-900 to-blue-950 text-white border-b border-blue-800",
      addressBg: "bg-blue-50/80 border border-blue-100/50",
      mapFrame: "border-4 border-blue-600/80 bg-blue-50/50",
      badge: "bg-blue-100 text-blue-900 border border-blue-200",
      accentText: "text-blue-700",
      btnPrimary: "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white"
    };
  }

  // Three different color themes distributed across cards
  const schemes = [
    // Theme 1: Vibrant Pink Theme (index % 3 == 0)
    {
      container: "bg-gradient-to-br from-pink-50/80 via-white to-white border-pink-200 shadow-[0_20px_40px_rgba(223,137,181,0.06)] hover:shadow-[0_30px_60px_rgba(223,137,181,0.12)] hover:border-pink-300",
      header: "bg-gradient-to-r from-[#b03a74] to-[#c85694] text-white border-b border-[#a12f65]",
      addressBg: "bg-[#fdf2f8]/90 border border-pink-100/60",
      mapFrame: "border-4 border-[#c85694]/80 bg-pink-50/50",
      badge: "bg-pink-100 text-[#b03a74] border border-pink-200",
      accentText: "text-[#c85694]",
      btnPrimary: "bg-gradient-to-r from-[#c85694] to-pink-600 hover:from-pink-600 hover:to-pink-750 text-white shadow-sm"
    },
    // Theme 2: Emerald Green Theme (index % 3 == 1)
    {
      container: "bg-gradient-to-br from-emerald-50/80 via-white to-white border-emerald-200 shadow-[0_20px_40px_rgba(16,185,129,0.06)] hover:shadow-[0_30px_60px_rgba(16,185,129,0.12)] hover:border-emerald-300",
      header: "bg-gradient-to-r from-emerald-800 to-emerald-900 text-white border-b border-emerald-700",
      addressBg: "bg-emerald-50/90 border border-emerald-100/60",
      mapFrame: "border-4 border-emerald-600/80 bg-emerald-50/50",
      badge: "bg-emerald-100 text-emerald-900 border border-emerald-200",
      accentText: "text-emerald-700",
      btnPrimary: "bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white shadow-sm"
    },
    // Theme 3: Deep Indigo / Violet Theme (index % 3 == 2)
    {
      container: "bg-gradient-to-br from-indigo-50/80 via-white to-white border-indigo-200 shadow-[0_20px_40px_rgba(99,102,241,0.06)] hover:shadow-[0_30px_60px_rgba(99,102,241,0.12)] hover:border-indigo-300",
      header: "bg-gradient-to-r from-indigo-850 to-indigo-950 text-white border-b border-indigo-800",
      addressBg: "bg-indigo-50/90 border border-indigo-100/60",
      mapFrame: "border-4 border-indigo-600/80 bg-indigo-50/50",
      badge: "bg-indigo-100 text-indigo-900 border border-indigo-200",
      accentText: "text-indigo-700",
      btnPrimary: "bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white shadow-sm"
    }
  ];

  return schemes[index % schemes.length];
};

interface PartnerCentersProps {
  service: string;
  region: string;
}

export default function PartnerCenters({ service, region }: PartnerCentersProps) {
  const serviceSlug = service.toLowerCase();
  const regionSlug = region.toLowerCase();

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
  const regionGroup = regionSlug === 'navi-mumbai' ? 'navi-mumbai' : 'mumbai';

  const filteredCenters = centersData.filter(center => {
    if (center.name === "Henotic Diagnostics - Kharghar" && center.subtitle.includes("Main Flagship")) {
      return true;
    }
    if (center.regionGroup !== regionGroup) {
      return false;
    }
    if (category === 'default') return true;
    return center.services.includes(category);
  });

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
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-slate-200 text-slate-800 text-xs md:text-sm font-bold uppercase tracking-widest mb-4 shadow-sm backdrop-blur-md">
            <Building2 size={16} className="text-[#c85694]" /> Direct Network Centers
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight">
            Our Parent Diagnostic Centers
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto font-medium text-base md:text-lg">
            Henotic Diagnostics operates high-precision flagship and diagnostic network hubs near you, providing standardized clinical scans and pathology.
          </p>
        </div>

        {/* Centers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
          {uniqueCenters.map((center, i) => {
            const isMainHub = center.name === "Henotic Diagnostics - Kharghar" && center.subtitle.includes("Main Flagship");
            
            // Get custom theme styles based on flagship status and loop index
            const theme = getCardTheme(isMainHub, i);
            
            // Separate brand name ("Henotic Diagnostics") from location name
            const [brandPart, locationPart] = center.name.includes(' - ') 
              ? center.name.split(' - ') 
              : ['Henotic Diagnostics', center.name.replace('Henotic Diagnostics ', '')];

            return (
              <div 
                key={i}
                className={`relative rounded-[2.5rem] overflow-hidden border flex flex-col justify-between transition-all duration-500 hover:-translate-y-2 ${theme.container}`}
              >
                {/* Ribbon Tag for Flagship Hub */}
                {isMainHub && (
                  <span className="absolute top-4 right-4 z-20 px-3 py-1 rounded-full bg-gradient-to-r from-[#E55D87] to-pink-500 text-white text-[9px] font-black uppercase tracking-widest shadow-md">
                    Flagship Hub
                  </span>
                )}

                <div>
                  {/* Colored Header Banner Grid */}
                  <div className={`p-6 ${theme.header}`}>
                    <span className="block text-[11px] font-black tracking-[0.25em] uppercase text-white/80 mb-1 leading-none">
                      Parent Network Center
                    </span>
                    {/* Brand Name - Rendered BIG always */}
                    <span className="block text-xl md:text-2xl font-black tracking-wide uppercase leading-tight text-white drop-shadow-sm">
                      {brandPart}
                    </span>
                    {/* Location Name */}
                    <span className="block text-md md:text-lg font-bold text-white/95 mt-1">
                      — {locationPart}
                    </span>
                  </div>

                  {/* Body Content Area */}
                  <div className="p-6">
                    {/* Subtitle & Badge Row */}
                    <div className="flex items-center justify-between gap-4 mb-4">
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                        {center.subtitle}
                      </p>
                      <div className={`p-2.5 rounded-xl flex items-center justify-center shrink-0 ${theme.badge}`}>
                        {center.type === 'pathology' ? (
                          <Microscope size={18} />
                        ) : center.type === 'cardiology' ? (
                          <Activity size={18} />
                        ) : (
                          <Building2 size={18} />
                        )}
                      </div>
                    </div>

                    {/* Trust Signals */}
                    <div className="flex flex-wrap gap-1.5 mb-5">
                      <span className="text-[9px] font-bold px-2.5 py-0.5 rounded-full bg-slate-50 text-slate-600 border border-slate-100">
                        NABL Compliant
                      </span>
                      <span className="text-[9px] font-bold px-2.5 py-0.5 rounded-full bg-slate-50 text-slate-600 border border-slate-100">
                        ISO 9001
                      </span>
                      <span className="text-[9px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100">
                        Priority Desk
                      </span>
                    </div>

                    {/* Body Address Box (Visual background color panel) */}
                    <div className={`p-4 rounded-2xl mb-4 ${theme.addressBg}`}>
                      <div className="space-y-3 text-xs md:text-sm text-slate-700 font-medium">
                        <div className="flex items-start gap-2.5">
                          <MapPin size={16} className={`shrink-0 mt-0.5 ${theme.accentText}`} />
                          <span className="leading-relaxed">{center.address}</span>
                        </div>
                        <div className="flex items-center gap-2.5 border-t border-slate-200/50 pt-2 mt-2">
                          <Clock size={16} className="text-blue-500 shrink-0" />
                          <span>{center.hours}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Map Frame and Direct Actions Area */}
                <div className="px-6 pb-6 mt-auto">
                  {/* Google Map Box (Visual frame background edge color) */}
                  <div className={`w-full h-44 rounded-2xl overflow-hidden shadow-inner relative mb-4 ${theme.mapFrame}`}>
                    <iframe 
                      title={`Google Map - ${center.name}`}
                      src={center.embedUrl}
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen={false}
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      className="absolute inset-0 w-full h-full object-cover rounded-xl"
                    ></iframe>
                  </div>

                  {/* Interactive Button Grid */}
                  <div className="grid grid-cols-2 gap-3">
                    <a 
                      href={`tel:${center.phone.replace(/\s+/g, '')}`} 
                      className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-bold text-xs transition-all text-center ${theme.btnPrimary}`}
                    >
                      <PhoneCall size={13} /> Call Center
                    </a>
                    <a 
                      href={center.gbpUrl} 
                      target="_blank" 
                      rel="noreferrer" 
                      className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-white border border-slate-200 text-slate-700 font-bold text-xs hover:bg-slate-50 hover:border-slate-300 transition-all text-center shadow-sm"
                    >
                      <Globe size={13} /> Google Profile
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
