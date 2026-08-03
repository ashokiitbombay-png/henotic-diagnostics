"use client";

import React from "react";
import Image from "next/image";
import { Star } from "lucide-react";

export default function GoogleReviews() {
  const reviews = [
    {
      name: "Ravi Sharma",
      date: "1 week ago",
      text: "Excellent service! The staff is very cooperative and the facility is spotless. Got my MRI done smoothly.",
      rating: 5,
    },
    {
      name: "Anjali Deshmukh",
      date: "3 weeks ago",
      text: "State-of-the-art equipment and highly professional doctors. Reports were delivered on time via WhatsApp. Highly recommended.",
      rating: 5,
    },
    {
      name: "Sanjay Patil",
      date: "1 month ago",
      text: "Very convenient location in Kharghar. The home collection team was punctual and well-trained. Great experience overall.",
      rating: 5,
    },
  ];

  return (
    <section className="w-full py-20 px-4 md:px-8 bg-slate-50 relative overflow-hidden">
      {/* Decorative Background Gradients */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100/50 rounded-full mix-blend-multiply filter blur-3xl opacity-70 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-pink-100/50 rounded-full mix-blend-multiply filter blur-3xl opacity-70 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block py-1 px-4 rounded-full bg-blue-100 text-blue-800 font-bold text-xs tracking-widest uppercase mb-4 shadow-sm border border-blue-200">
            Patient Feedback
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4 drop-shadow-sm">
            Trusted by Our Community
          </h2>
          <p className="text-lg text-slate-600 font-medium max-w-2xl mx-auto">
            See what our patients have to say about their diagnostic experience with us.
          </p>
        </div>

        {/* Main Trustindex Style Widget */}
        <div className="bg-white rounded-[2.5rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] border border-slate-100 p-8 md:p-12 flex flex-col lg:flex-row items-center gap-12 mb-16 transition-transform duration-500 hover:-translate-y-2">
          
          {/* Left Side: Images & Building */}
          <div className="w-full lg:w-1/2 relative group">
            {/* 3D Depth effect for image */}
            <div className="absolute inset-0 bg-blue-600 rounded-3xl transform rotate-3 opacity-10 transition-transform duration-500 group-hover:rotate-6 blur-md"></div>
            
            <Image
              width={600}
              height={320}
              src="https://storage.googleapis.com/wp-media-henoticbucket/Front%20Office/henotic-diagnostics-main-building.webp" 
              alt="Henotic Diagnostics Main Building" 
              className="relative z-10 w-full h-64 md:h-80 object-cover rounded-3xl border-4 border-white shadow-xl transition-transform duration-500 group-hover:scale-[1.02]"
              loading="lazy"
              quality={80}
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            
            {/* Floating Google Profile Badge */}
            <div className="absolute -bottom-8 -right-8 md:-right-10 z-20 bg-white p-3 rounded-3xl shadow-[0_20px_50px_-10px_rgba(0,0,0,0.25)] border-2 border-slate-100 flex items-center justify-center transform transition-all duration-300 hover:scale-110 hover:shadow-[0_25px_60px_-10px_rgba(59,130,246,0.3)]">
              <Image 
                width={128} 
                height={128}
                src="https://lh3.googleusercontent.com/p/AF1QipNNi77McpTFT3ksGjloBcqV3he235QDZfbaYiCv=w200-h200-p-k-no" 
                alt="Google Business Profile" 
                className="w-24 h-24 md:w-32 md:h-32 rounded-2xl object-cover"
                loading="lazy"
              />
              <Image 
                width={48} 
                height={48}
                src="https://storage.googleapis.com/wp-media-henoticbucket/ICONS-SYMBOLS/Google.webp" 
                alt="Google Icon" 
                className="absolute -top-4 -left-4 w-11 h-11 bg-white rounded-full p-1.5 shadow-lg border-2 border-white object-contain drop-shadow-md"
                loading="lazy"
              />
            </div>
          </div>

          {/* Right Side: Rating Info & Actions */}
          <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left">
            <div className="flex items-center gap-4 mb-3">
               <Image width={48} height={48} src="https://storage.googleapis.com/wp-media-henoticbucket/ICONS-SYMBOLS/Google.webp" alt="Google" className="w-12 h-12 object-contain drop-shadow-md" loading="lazy" />
               <h3 className="text-2xl md:text-3xl font-extrabold text-slate-800">Henotic Diagnostics</h3>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center gap-4 mb-8">
              <span className="text-6xl font-black text-slate-900 drop-shadow-md">4.9</span>
              <div className="flex flex-col items-center sm:items-start">
                <div className="flex gap-1.5 mb-1 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={28} className="fill-amber-400 text-amber-400 drop-shadow-sm" />
                  ))}
                </div>
                <span className="text-slate-500 font-bold text-sm">Based on (1,030) Reviews</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 w-full justify-center lg:justify-start">
              <a 
                href="https://maps.google.com/?cid=11779150789147957572" 
                target="_blank" 
                rel="noreferrer"
                className="flex items-center justify-center gap-2 px-6 py-4 bg-white border-2 border-blue-100 hover:border-blue-300 hover:bg-blue-50 text-blue-800 font-bold rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 group"
              >
                <Image width={28} height={28} src="https://storage.googleapis.com/wp-media-henoticbucket/ICONS-SYMBOLS/Google-maps.webp" alt="Google Maps" className="w-7 h-7 object-contain drop-shadow-sm group-hover:scale-115 transition-transform" loading="lazy" />
                View on Google Maps
              </a>
              <a 
                href="https://share.google/IcBtvtVjwozCBFMPp" 
                target="_blank" 
                rel="noreferrer"
                className="flex items-center justify-center gap-2 px-6 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Write a Review
              </a>
            </div>
          </div>
        </div>

        {/* Individual Review Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {reviews.map((review, idx) => (
            <div key={idx} className="bg-white p-8 rounded-3xl border border-slate-100 shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col h-full relative">
              {/* Decorative Quote Icon */}
              <div className="absolute top-6 right-6 opacity-10">
                <svg width="36" height="36" viewBox="0 0 24 24" fill="currentColor" className="text-blue-600">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
              </div>

              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-inner">
                  {review.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 leading-tight">{review.name}</h4>
                  <span className="text-xs text-slate-500">{review.date}</span>
                </div>
              </div>

              <div className="flex gap-1.5 mb-4 text-amber-400">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} size={20} className="fill-amber-400 text-amber-400 drop-shadow-sm" />
                ))}
              </div>

              <p className="text-slate-600 text-sm leading-relaxed font-medium italic relative z-10 flex-grow">
                "{review.text}"
              </p>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-2.5">
                 <Image width={24} height={24} src="https://storage.googleapis.com/wp-media-henoticbucket/ICONS-SYMBOLS/Google.webp" alt="Google" className="w-6 h-6 object-contain drop-shadow-sm" loading="lazy" />
                 <span className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">Posted on Google</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}