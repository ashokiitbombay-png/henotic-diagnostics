import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { ChevronRight, MapPin, Activity, ShieldCheck, Clock, CheckCircle2, ArrowRight, Calendar } from "lucide-react";
import BookingForm from "@/components/forms/BookingForm";
import GoogleReviews from "@/components/home/GoogleReviews";
import { REGION_LOCATIONS } from "@/lib/data/locations";

// --- GLOBAL CONSTANTS & ASSETS ---
const ACCREDITATIONS = [
  { title: "PCPNDT", img: "https://storage.googleapis.com/wp-media-henoticbucket/Accreditation%20Logos/pcpndt-certified-henotic-diagnsotics-kharghar.webp" },
  { title: "NABL", img: "https://storage.googleapis.com/wp-media-henoticbucket/Accreditation%20Logos/NABL-henotic-diagnsotics-kharghar.webp" },
  { title: "ISO", img: "https://storage.googleapis.com/wp-media-henoticbucket/Accreditation%20Logos/iso-certification-for-henotic-diagnsotics-kharghar.webp" },
  { title: "AERB", img: "https://storage.googleapis.com/wp-media-henoticbucket/Accreditation%20Logos/Atomic_Energy_Regulatory_Board_Henotic-Diagnostics-LOGO.svg%20(1).webp" }
];

const TRUST_SIGNALS = [
  "Experienced Radiologists",
  "Advanced Ultrasound Technology",
  "Detailed Digital Reports",
  "Pregnancy Screening Expertise",
  "Convenient Appointment Scheduling",
  "Comprehensive Prenatal Care Support",
  "NABL Standards",
  "Experienced Sonologists",
  "High-Risk Pregnancy Assessment",
  "Thousands of Patients Served"
];

const formatText = (text: string) => text.split("-").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");

// --- DYNAMIC METADATA GENERATION (UPGRADED WITH OPEN GRAPH) ---
export async function generateMetadata({ params }: { params: Promise<{ slug?: string[] }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const slugArray = resolvedParams.slug || [];
  const isAuthority = slugArray.length === 0;
  const isRegion = slugArray.length === 1;
  const isLocal = slugArray.length === 2;

  const baseUrl = "https://www.henoticdiagnostics.com";
  const currentPath = `/services/nt-scan${slugArray.length > 0 ? '/' + slugArray.join('/') : ''}`;

  // Mirror the image logic used in the UI
  const heroImage = isLocal ? "https://storage.googleapis.com/wp-media-henoticbucket/Sonography/nt-scan-henotic-diagnostics-kharghar.webp" :
                    isRegion ? "https://storage.googleapis.com/wp-media-henoticbucket/Sonography/anomaly-scan-nt-scan-henotic-diagnostics-kharghar.webp" :
                    "https://storage.googleapis.com/wp-media-henoticbucket/Sonography/anomaly-scan-nt-scan-henotic-diagnostics-kharghar-navi-mumbai.webp";

  let baseMetadata: any = {};

  if (isLocal) {
    const loc = formatText(slugArray[1]);
    baseMetadata = {
      title: `NT Scan in ${loc} | Pregnancy NT NB Scan Near Me`,
      description: `Looking for NT Scan in ${loc}? Book first trimester pregnancy screening, NT NB Scan, fetal assessment, and prenatal ultrasound services at Henotic Diagnostics.`,
      keywords: `NT Scan near me, NT Scan in ${loc}, NT NB Scan ${loc}, Pregnancy Scan ${loc}, Book NT Scan ${loc}, NT Scan Centre ${loc}`
    };
  } else if (isRegion) {
    const reg = formatText(slugArray[0]);
    baseMetadata = {
      title: `NT Scan in ${reg} | Nuchal Translucency Scan Near You`,
      description: `Book NT Scan in ${reg} with experienced fetal imaging specialists. First trimester screening, NT NB Scan, pregnancy ultrasound, and prenatal assessment services.`,
      keywords: `NT Scan in ${reg}, NT NB Scan ${reg}, Pregnancy Scan ${reg}, Nuchal Translucency Scan ${reg}, First Trimester Screening ${reg}`
    };
  } else {
    baseMetadata = {
      title: "NT Scan (Nuchal Translucency Scan) | First Trimester Pregnancy Screening",
      description: "Learn about NT Scan, Nuchal Translucency screening, Down syndrome risk assessment, first trimester fetal evaluation, NT NB scan, and prenatal screening during pregnancy.",
      keywords: "NT Scan, Nuchal Translucency Scan, NT NB Scan, First Trimester Screening, Down Syndrome Screening, Pregnancy Ultrasound, 11 to 13 Week Scan"
    };
  }

  // Inject Open Graph & Twitter Cards dynamically
  return {
    ...baseMetadata,
    openGraph: {
      title: baseMetadata.title,
      description: baseMetadata.description,
      url: `${baseUrl}${currentPath}`,
      siteName: 'Henotic Diagnostics',
      images: [
        {
          url: heroImage,
          width: 1200,
          height: 630,
          alt: baseMetadata.title,
        }
      ],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: baseMetadata.title,
      description: baseMetadata.description,
      images: [heroImage],
    }
  };
}

// --- MAIN PAGE COMPONENT ---
export default async function NTScanSilo({ params }: { params: Promise<{ slug?: string[] }> }) {
  const resolvedParams = await params;
  const slugArray = resolvedParams.slug || [];
  
  const isAuthority = slugArray.length === 0;
  const isRegion = slugArray.length === 1;
  const isLocal = slugArray.length === 2;

  const currentRegionSlug = isRegion || isLocal ? slugArray[0] : "";
  const currentLocalSlug = isLocal ? slugArray[1] : "";
  
  const regionName = isRegion || isLocal ? formatText(currentRegionSlug) : "";
  const locationName = isLocal ? formatText(currentLocalSlug) : "";

  const heroImage = isLocal ? "https://storage.googleapis.com/wp-media-henoticbucket/Sonography/nt-scan-henotic-diagnostics-kharghar.webp" :
                    isRegion ? "https://storage.googleapis.com/wp-media-henoticbucket/Sonography/anomaly-scan-nt-scan-henotic-diagnostics-kharghar.webp" :
                    "https://storage.googleapis.com/wp-media-henoticbucket/Sonography/anomaly-scan-nt-scan-henotic-diagnostics-kharghar-navi-mumbai.webp";

  const locationsToDisplay = isRegion ? (REGION_LOCATIONS[currentRegionSlug] || []) : [];
  const baseUrl = "https://www.henoticdiagnostics.com";

  // --- DYNAMIC JSON-LD BREADCRUMB SCHEMA ---
  const breadcrumbList = [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": baseUrl },
    { "@type": "ListItem", "position": 2, "name": "Services", "item": `${baseUrl}/services` },
    { "@type": "ListItem", "position": 3, "name": "NT Scan", "item": `${baseUrl}/services/nt-scan` }
  ];
  if (isRegion || isLocal) {
    breadcrumbList.push({ "@type": "ListItem", "position": 4, "name": regionName, "item": `${baseUrl}/services/nt-scan/${currentRegionSlug}` });
  }
  if (isLocal) {
    breadcrumbList.push({ "@type": "ListItem", "position": 5, "name": locationName, "item": `${baseUrl}/services/nt-scan/${currentRegionSlug}/${currentLocalSlug}` });
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "MedicalClinic",
        "name": `Henotic Diagnostics - NT Scan${isLocal ? ` in ${locationName}` : isRegion ? ` in ${regionName}` : ''}`,
        "image": heroImage,
        "url": `${baseUrl}/services/nt-scan/${slugArray.join('/')}`,
        "medicalSpecialty": "Obstetric Ultrasound",
        "availableService": { "@type": "MedicalTest", "name": "NT Scan (Nuchal Translucency)" }
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": breadcrumbList
      }
    ]
  };

  return (
    <main className="min-h-screen bg-slate-50 font-sans mt-[80px] pb-24 overflow-hidden">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* --- 1. PREMIUM HERO SECTION --- */}
      <section className="relative pt-10 pb-24 md:pt-16 md:pb-32 bg-slate-900 overflow-hidden">
        
        {/* The Base Hero Image - Boosted Opacity for Visibility */}
        <div className="absolute inset-0 z-0 bg-cover bg-center opacity-70 transition-transform duration-[10000ms] hover:scale-105" style={{ backgroundImage: `url('${heroImage}')` }}></div>
        
        {/* DYNAMIC DIRECTIONAL GRADIENT: Forces image visibility on the opposite side of the text */}
        <div className={`absolute inset-0 z-0 ${isAuthority ? 'bg-gradient-to-r from-slate-900 via-slate-900/80 to-transparent' : 'bg-gradient-to-l from-slate-900 via-slate-900/80 to-transparent'}`}></div>
        
        {/* Base Bottom Fade */}
        <div className="absolute inset-0 z-0 bg-gradient-to-t from-slate-50 via-slate-900/30 to-transparent"></div>
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full mix-blend-screen filter blur-[120px] opacity-20 bg-[#b06ab3] animate-pulse"></div>

        <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
          
          {/* VISUAL GRADIENT BREADCRUMBS (5 STEPS) */}
          <nav className="flex flex-wrap items-center gap-2 text-xs sm:text-sm font-extrabold mb-12 p-3 sm:px-5 sm:py-3 rounded-2xl bg-slate-900/40 backdrop-blur-md w-max border border-white/10 shadow-2xl text-white/90">
            <Link href="/" className="hover:text-pink-400 transition-colors">Home</Link>
            <ChevronRight size={14} className="text-white/40" />
            <Link href="/services" className="hover:text-pink-400 transition-colors">Services</Link>
            <ChevronRight size={14} className="text-white/40" />
            <Link href="/services/nt-scan" className={`${isAuthority ? 'text-white drop-shadow-md' : 'hover:text-pink-400'} transition-colors`}>NT-Scan</Link>
            
            {isRegion || isLocal ? (
              <>
                <ChevronRight size={14} className="text-white/40" />
                <Link href={`/services/nt-scan/${currentRegionSlug}`} className={`${isRegion ? 'text-white drop-shadow-md' : 'hover:text-pink-400'} transition-colors`}>{regionName}</Link>
              </>
            ) : null}
            
            {isLocal ? (
              <>
                <ChevronRight size={14} className="text-white/40" />
                <span className="text-white bg-gradient-to-r from-[#5ffbf1] to-[#ba83ca] bg-clip-text text-transparent drop-shadow-md">{locationName}</span>
              </>
            ) : null}
          </nav>

          {/* DYNAMIC SWAPPING GRID */}
          <div className="grid lg:grid-cols-2 gap-12 items-center relative z-20">
            
            {/* TEXT COLUMN: Left for Authority, Right for Regional/Local */}
            <div className={`flex flex-col ${isAuthority ? 'lg:order-1 items-start text-left' : 'lg:order-2 lg:items-end lg:text-right items-start text-left'}`}>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-pink-500/20 border border-pink-400/30 text-pink-100 text-xs font-extrabold uppercase tracking-widest mb-6 backdrop-blur-md shadow-lg">
                <ShieldCheck size={16} /> Fetal Medicine Specialists
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-[1.1] mb-6 tracking-tight drop-shadow-[0_5px_5px_rgba(0,0,0,0.8)]">
                {isLocal ? (
                  <>NT Scan in <br className="hidden lg:block"/><span className="text-transparent bg-clip-text bg-gradient-to-r from-[#41dfff] to-[#d16ba5]">{locationName}</span></>
                ) : isRegion ? (
                  <>NT Scan in <br className="hidden lg:block"/><span className="text-transparent bg-clip-text bg-gradient-to-r from-[#41dfff] to-[#d16ba5]">{regionName}</span></>
                ) : (
                  <>NT Scan <br className="hidden lg:block"/><span className="text-transparent bg-clip-text bg-gradient-to-r from-[#41dfff] to-[#d16ba5]">(Nuchal Translucency)</span></>
                )}
              </h1>
              
              <p className={`text-lg md:text-xl text-slate-100 font-medium drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)] mb-8 ${isAuthority ? 'max-w-xl' : 'max-w-xl lg:ml-auto'}`}>
                {isLocal ? `Looking for NT Scan in ${locationName}? Book your first trimester pregnancy screening and NT NB Scan at our state-of-the-art center.` 
                : isRegion ? `Book NT Scan in ${regionName} with experienced fetal imaging specialists for comprehensive prenatal assessment.` 
                : `Comprehensive first-trimester pregnancy screening to evaluate fetal development and estimate the risk of chromosomal abnormalities.`}
              </p>
            </div>

            {/* LOGOS COLUMN: Right for Authority, Left for Regional/Local */}
            <div className={`flex flex-wrap gap-5 ${isAuthority ? 'lg:order-2 lg:justify-end justify-start' : 'lg:order-1 lg:justify-start justify-start'}`}>
               {ACCREDITATIONS.map((acc, index) => (
                  <div key={acc.title} className="flex flex-col items-center group">
                    <div className="w-16 h-16 sm:w-24 sm:h-24 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center p-3 sm:p-4 mb-3 transition-transform duration-500 group-hover:-translate-y-3 group-hover:scale-110 relative shadow-[0_25px_40px_-10px_rgba(0,0,0,0.8),_0_0_0_2px_rgba(255,255,255,0.4),_inset_0_-5px_8px_rgba(0,0,0,0.2),_inset_0_5px_8px_rgba(255,255,255,0.5)]">
                      <img decoding="async" src={acc.img} alt={`${acc.title} Certified`} className="w-full h-full object-contain drop-shadow-xl" fetchPriority="high" />
                      <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-white/10 to-white/30 pointer-events-none"></div>
                    </div>
                    <span className="text-[10px] sm:text-xs font-black text-white tracking-widest uppercase drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">{acc.title}</span>
                  </div>
                ))}
            </div>

          </div>
        </div>
      </section>

      {/* --- 2. REGIONAL INTERNAL LINKING GRID --- */}
      {isRegion && locationsToDisplay.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 md:px-8 -mt-10 relative z-30 mb-16">
          <div className="bg-white rounded-[2rem] p-8 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.1)] border border-slate-100">
            <h3 className="text-xl font-extrabold text-slate-900 mb-6 flex items-center gap-2">
              <MapPin className="text-[#E55D87]" size={24} /> Areas Served in {regionName}
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {locationsToDisplay.map(loc => (
                <Link key={loc} href={`/services/nt-scan/${currentRegionSlug}/${loc}`} className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100 hover:border-[#4568dc] hover:bg-blue-50 transition-all group">
                  <span className="font-bold text-slate-700 group-hover:text-[#4568dc] text-sm">{formatText(loc)}</span>
                  <ArrowRight size={16} className="text-slate-400 group-hover:text-[#4568dc] transform group-hover:translate-x-1 transition-transform" />
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* --- 3. DYNAMIC CONTENT & SIDEBAR --- */}
      <section className={`max-w-7xl mx-auto px-4 md:px-8 relative z-20 ${!isRegion ? '-mt-16' : ''}`}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          <div className="lg:col-span-2 bg-white rounded-[3rem] p-8 md:p-12 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] border-[6px] border-white relative overflow-hidden group">
            <div className="prose prose-lg prose-blue text-slate-700 font-medium max-w-none
              prose-h2:text-3xl prose-h2:font-black prose-h2:text-slate-900 prose-h2:mb-6 prose-h2:mt-10
              prose-h3:text-2xl prose-h3:font-bold prose-h3:text-slate-800 prose-h3:mt-8
              prose-ul:list-none prose-ul:pl-0 prose-li:relative prose-li:pl-8 prose-li:mb-3">
              
              <style dangerouslySetInnerHTML={{__html: `.prose ul li::before { content: '✓'; position: absolute; left: 0; color: #E55D87; font-weight: 900; }`}} />

              {isLocal ? (
                <>
                  <h2 className="flex items-center gap-3 border-b border-slate-100 pb-6"><div className="bg-pink-100 p-2.5 rounded-2xl text-[#E55D87]"><Activity size={24} /></div>NT Scan in {locationName}</h2>
                  <p>Searching for an NT Scan in {locationName} during early pregnancy? NT Scan is one of the most important first trimester screening examinations performed between 11 weeks and 13 weeks 6 days to evaluate fetal development and assess chromosomal abnormality risk.</p>
                  <h3>Why Choose NT Scan During Pregnancy?</h3>
                  <p>NT Scan helps evaluate:</p>
                  <ul>
                    <li>Nuchal translucency thickness</li>
                    <li>Fetal growth</li>
                    <li>Nasal bone assessment</li>
                    <li>Early fetal anatomy</li>
                    <li>Pregnancy dating accuracy</li>
                  </ul>
                  <p>The examination provides valuable information for expectant parents and healthcare providers during the first trimester.</p>
                  <h3>Convenient NT Scan Services in {locationName}</h3>
                  <p>Patients from {locationName} and nearby areas often seek accessible pregnancy screening services with modern ultrasound technology and experienced specialists.</p>
                  <h3>Trusted Pregnancy Imaging</h3>
                  <p>Choosing an experienced diagnostic centre for NT Scan is important because accurate measurements require specialized fetal imaging expertise. Proper fetal positioning, quality equipment, and adherence to standardized protocols help ensure reliable results.</p>
                  <h3>Additional Pregnancy Screening Services</h3>
                  <p>Patients often combine NT Scan with:</p>
                  <ul>
                    <li>Dual Marker Test</li>
                    <li>NIPT Test</li>
                    <li>Anomaly Scan</li>
                    <li>Fetal Echo</li>
                    <li>Growth Scan</li>
                    <li>Doppler Study</li>
                  </ul>
                  <h3>Book Your NT Scan</h3>
                  <p>Early booking helps ensure the examination is performed within the recommended gestational age window. Timely screening allows appropriate follow-up and supports informed pregnancy care decisions.</p>
                </>
              ) : isRegion ? (
                <>
                  <h2 className="flex items-center gap-3 border-b border-slate-100 pb-6"><div className="bg-pink-100 p-2.5 rounded-2xl text-[#E55D87]"><Activity size={24} /></div>NT Scan in {regionName}</h2>
                  <p>Expectant parents looking for NT Scan services in {regionName} often seek accurate screening, experienced sonologists, advanced ultrasound technology, and timely reporting. NT Scan plays a critical role in first trimester pregnancy assessment and helps evaluate fetal development during the most important early stages of pregnancy.</p>
                  <h3>Advanced First Trimester Pregnancy Screening</h3>
                  <p>NT Scan in {regionName} provides early evaluation of:</p>
                  <ul>
                    <li>Nuchal translucency thickness</li>
                    <li>Nasal bone visualization</li>
                    <li>Fetal heart activity</li>
                    <li>Crown-rump length measurement</li>
                    <li>Early fetal anatomy assessment</li>
                  </ul>
                  <h3>Why Early Pregnancy Screening Matters</h3>
                  <p>Early identification of pregnancies that may require additional monitoring enables better prenatal care planning. NT Scan is frequently combined with Dual Marker testing and NIPT to provide comprehensive risk assessment.</p>
                  <h3>Who Should Consider NT Scan?</h3>
                  <ul>
                    <li>All pregnant women between 11 and 13 weeks 6 days</li>
                    <li>Women above 35 years of age</li>
                    <li>High-risk pregnancies</li>
                    <li>IVF pregnancies</li>
                    <li>Previous history of genetic abnormalities</li>
                    <li>Patients seeking comprehensive prenatal screening</li>
                  </ul>
                  <h3>Why Patients Choose Henotic Diagnostics</h3>
                  <ul>
                    <li>Advanced ultrasound imaging systems</li>
                    <li>Experienced fetal imaging specialists</li>
                    <li>Focus on pregnancy care</li>
                    <li>Detailed reporting</li>
                    <li>Convenient appointment scheduling</li>
                    <li>Comprehensive prenatal screening support</li>
                  </ul>
                </>
              ) : (
                <>
                  <h2 className="flex items-center gap-3 border-b border-slate-100 pb-6"><div className="bg-pink-100 p-2.5 rounded-2xl text-[#E55D87]"><Activity size={24} /></div>NT Scan (Nuchal Translucency Scan): Comprehensive First Trimester Pregnancy Screening</h2>
                  <p>An NT Scan, also known as a Nuchal Translucency Scan, is one of the most important first-trimester pregnancy ultrasounds. Performed between 11 weeks and 13 weeks 6 days, the examination evaluates fetal development and helps estimate the risk of chromosomal abnormalities including Down syndrome, Trisomy 18, and Trisomy 13.</p>
                  <p>The NT Scan measures the fluid-filled space behind the fetal neck while simultaneously assessing fetal anatomy, growth, nasal bone visualization, and cardiac activity. When combined with maternal age, Dual Marker testing, and NIPT, NT Scan becomes a powerful prenatal screening tool.</p>
                  <h3>Why NT Scan Is Important</h3>
                  <p>Early pregnancy screening allows parents and doctors to identify pregnancies that may require additional monitoring or genetic testing. NT Scan provides valuable information about fetal well-being while helping guide future pregnancy care.</p>
                  <h3>Key Benefits</h3>
                  <ul>
                    <li>Early chromosomal abnormality risk assessment</li>
                    <li>First trimester fetal anatomical evaluation</li>
                    <li>Accurate gestational age confirmation</li>
                    <li>Nasal bone assessment</li>
                    <li>Multiple pregnancy evaluation</li>
                    <li>Early detection of selected structural abnormalities</li>
                  </ul>
                  <h3>What Conditions Can NT Scan Help Screen For?</h3>
                  <ul>
                    <li>Down Syndrome (Trisomy 21)</li>
                    <li>Edwards Syndrome (Trisomy 18)</li>
                    <li>Patau Syndrome (Trisomy 13)</li>
                    <li>Turner Syndrome</li>
                    <li>Certain congenital heart defects</li>
                    <li>Selected genetic syndromes</li>
                    <li>Major fetal structural abnormalities</li>
                  </ul>
                  <h3>NT Scan and Modern Prenatal Screening</h3>
                  <p>Today, NT Scan remains a cornerstone of first trimester screening because it provides information that blood tests alone cannot offer. While NIPT evaluates fetal DNA, NT Scan allows direct visualization of fetal anatomy and growth.</p>
                  <h3>Frequently Asked Questions</h3>
                  <h4>What is the best time for an NT Scan?</h4>
                  <p>The ideal time is between 11 weeks and 13 weeks 6 days of pregnancy.</p>
                  <h4>Is NT Scan safe?</h4>
                  <p>Yes. NT Scan uses diagnostic ultrasound and does not involve radiation exposure.</p>
                  <h4>Can NT Scan diagnose Down syndrome?</h4>
                  <p>No. NT Scan is a screening examination that estimates risk and may indicate whether additional testing should be considered.</p>
                </>
              )}
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-[100px] bg-gradient-to-br from-[#4568dc] to-[#b06ab3] rounded-[3rem] p-8 shadow-[0_40px_80px_-20px_rgba(176,106,179,0.5)] border-4 border-white text-white">
              <h3 className="text-2xl font-black mb-6 drop-shadow-md">Henotic Advantage</h3>
              <ul className="space-y-4 mb-8">
                {TRUST_SIGNALS.map((signal, idx) => (
                  <li key={idx} className="flex items-start gap-3 font-bold text-white/95 text-sm">
                    <CheckCircle2 className="text-[#5ffbf1] shrink-0 mt-0.5" size={18}/> {signal}
                  </li>
                ))}
              </ul>
              <a href="#booking" className="block w-full bg-white text-[#4568dc] text-center font-black text-lg py-4 rounded-2xl shadow-lg hover:scale-105 transition-transform">
                Book Priority Slot
              </a>
            </div>
          </div>

        </div>
      </section>

      {/* --- 4. PREMIUM BOOKING FORM --- */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 mt-20" id="booking">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-pink-50 border border-pink-100 text-[#E55D87] text-sm font-extrabold uppercase tracking-widest mb-4">
            <Calendar size={16} /> Fast Track Booking
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
            Schedule Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4568dc] to-[#b06ab3]">NT Scan</span>
          </h2>
        </div>
        <BookingForm />
      </section>

      {/* --- 5. REVIEWS --- */}
      <section className="mt-12">
        <GoogleReviews />
      </section>

    </main>
  );
}