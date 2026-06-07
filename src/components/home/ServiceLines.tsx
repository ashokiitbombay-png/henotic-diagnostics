import Link from "next/link";
import { ArrowRight } from "lucide-react";

const services = [
  { id: "radiology", title: "Advanced Radiology", desc: "3T MRI, 128-Slice CT, and Digital X-Ray with low-radiation protocols.", img: "https://storage.googleapis.com/wp-media-henoticbucket/2026/01/934e91ce-ct-scan-kharghar-01-scaled.webp", link: "/services/mri-scan" },
  { id: "nuclear", title: "Nuclear Medicine", desc: "PET-CT for precise cancer staging and metabolic imaging.", img: "https://storage.googleapis.com/wp-media-henoticbucket/2026/01/49b5aa8f-henotic-diagnostics-mri-scan-ct-scan-pet-scan-dopa-scan.webp", link: "/services/pet-scan" },
  { id: "cardiac", title: "Cardiac Sciences", desc: "Angiography, 2D Echo, and TMT for comprehensive heart evaluation.", img: "https://storage.googleapis.com/wp-media-henoticbucket/2026/01/7f8eb649-tmt-test-stress-echo-test-stress-test-2d-echo-test-kharghar-henotic-diagnostics-navi-mumbai.webp", link: "/services/ultrasound" },
  { id: "pathology", title: "Clinical Pathology", desc: "Automated analyzers for blood, hormone, and infection markers.", img: "https://storage.googleapis.com/wp-media-henoticbucket/Laboratory/laboratory-henotic-diagnostics-ct-scan-dexa-bone-scan-mri-scan-sonography-ultrasound-pet-scan-dopa-scan-kharghar-navi-mumbai.webp", link: "/services/blood-test" }
];

export default function ServiceLines() {
  return (
    <section className="py-24 bg-white relative">
      <div className="container mx-auto px-4 md:px-8 max-w-7xl">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 border-b border-slate-100 pb-8">
          <div className="max-w-2xl">
            <h2 className="text-4xl font-extrabold text-blue-950 mb-4">Core Modalities</h2>
            <p className="text-slate-600 text-lg font-medium">Complete spectrum of diagnostic imaging and pathology under one roof.</p>
          </div>
          <Link href="/services" className="hidden md:flex items-center font-bold text-[#E55D87] hover:text-pink-600 transition p-2 bg-pink-50 rounded-xl px-4">
            View All Departments <ArrowRight size={20} className="ml-2" />
          </Link>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((s) => (
            <Link key={s.id} href={s.link} className="group relative bg-slate-900 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 h-[350px]">
              <div className="absolute inset-0">
                <img width="800" height="800" src={s.img} alt={s.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-70 group-hover:opacity-40" fetchPriority="high" decoding="sync" />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-950 via-blue-900/60 to-transparent"></div>
              </div>
              <div className="absolute bottom-0 left-0 p-6 w-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <h3 className="text-xl font-extrabold text-white mb-2">{s.title}</h3>
                <p className="text-blue-100 text-sm font-medium mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">{s.desc}</p>
                <div className="flex items-center text-xs font-bold text-[#E55D87] uppercase tracking-widest bg-white/10 w-max px-3 py-1.5 rounded-full backdrop-blur-md border border-white/20">
                  Explore <ArrowRight size={14} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}