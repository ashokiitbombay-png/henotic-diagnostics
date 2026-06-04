"use client";
import Link from "next/link";
import { useState } from "react";
import { ChevronDown, MapPin, Activity } from "lucide-react";
import { cn } from "@/lib/utils";

const REGIONS = {
  "Navi Mumbai": ["vashi", "sanpada", "kharghar", "panvel"],
};
const SERVICE_CATEGORIES = {
  "Pathology & Preventive": ["blood-test", "full-body-check-up"],
};

export default function FooterDirectory() {
  const [openRegion, setOpenRegion] = useState<string | null>("Navi Mumbai");
  const formatText = (slug: string) => slug.replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase());

  return (
    <footer className="text-white py-16 font-sans relative" style={{ background: "linear-gradient(90deg, #4568dc 0%, #b06ab3 100%)", transform: "translateZ(0)" }}>
      <div className="container mx-auto px-6 relative z-10">
        <div className="mb-10 text-center">
          <h2 className="text-xl md:text-2xl font-bold text-white uppercase tracking-widest mb-2 drop-shadow-md">Global Service Directory</h2>
        </div>
      </div>
    </footer>
  );
}