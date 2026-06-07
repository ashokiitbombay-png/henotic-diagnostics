"use client";
import React from "react";

export default function GoogleReviews() {
  const reviews = [
    {
      name: "Ravi Sharma",
      date: "1 week ago",
      text: "State-of-the-art equipment and highly professional doctors. The facility is spotless, and I received my MRI reports digitally exactly on time. Highly recommended!",
      rating: 5,
    },
    {
      name: "Anjali Deshmukh",
      date: "3 weeks ago",
      text: "Best diagnostic center in Navi Mumbai. The staff is exceptionally polite, and the home collection team arrived right on schedule. A seamless experience.",
      rating: 5,
    },
  ];

  return (
    <section className="w-full py-24 px-4 md:px-8 bg-slate-50 relative overflow-hidden border-y border-slate-200">
      {/* 3D Decorative Background Gradients */}
      <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-blue-300/30 rounded-full mix-blend-multiply filter blur-[100px] opacity-70 pointer-events-none"></div>
      <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-pink-300/30 rounded-full mix-blend-multiply filter blur-[100px] opacity-70 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-2 py-2 px-5 rounded-full bg-white text-blue-800 font-extrabold text-xs tracking-[0.2em] uppercase mb-6 shadow-[0_10px_20px_rgba(0,0,0,0.05)] border border-blue-100">
            <img width="800" height="800" decoding="async" src="https://storage.googleapis.com/wp-media-henoticbucket/ICONS-SYMBOLS/google-icon-logo-svgrepo-com.svg" alt="Google" className="w-4 h-4" />
            Verified Patient Trust Signals
          </span>
          <h2 className="text-4xl md:text-6xl font-extrabold text-slate-900 mb-6 drop-shadow-sm tracking-tight">
            Trusted by Our Community
          </h2>
          <p className="text-lg md:text-xl text-slate-600 font-medium max-w-2xl mx-auto leading-relaxed">
            Excellence in diagnostics, validated by the people we serve. See why patients rate us as the top imaging center in Navi Mumbai.
          </p>
        </div>

        {/* --- MAIN 3D TRUSTINDEX WIDGET --- */}
        <div className="bg-white/80 backdrop-blur-xl rounded-[3rem] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] border border-white p-8 md:p-12 flex flex-col lg:flex-row items-center gap-12 mb-16 transform transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_40px_80px_-15px_rgba(0,0,0,0.15)] relative overflow-hidden group">
          
          {/* Subtle Glass Shine Effect */}
          <div className="absolute top-0 left-[-100%] w-1/2 h-full bg-gradient-to-r from-transparent via-white/80 to-transparent skew-x-[-20deg] group-hover:left-[200%] transition-all duration-1000 ease-in-out z-20 pointer-events-none"></div>

          {/* Left Side: 3D Image & Badges */}
          <div className="w-full lg:w-[45%] relative">
            <div className="absolute inset-0 bg-blue-600 rounded-[2.5rem] transform rotate-3 opacity-15 transition-transform duration-500 group-hover:rotate-6 blur-lg"></div>
            
            <img width="800" height="800" src="https://storage.googleapis.com/wp-media-henoticbucket/Front%20Office/henotic-diagnostics-main-building.webp" 
              alt="Henotic Diagnostics Facility" 
              className="relative z-10 w-full h-72 md:h-80 object-cover rounded-[2.5rem] border-[6px] border-white shadow-2xl transition-transform duration-700 group-hover:scale-[1.03]"
            fetchPriority="high" decoding="sync" />
            
            {/* Floating GBP Badge */}
            <div className="absolute -bottom-6 -right-4 md:-right-8 z-30 bg-white p-2 rounded-2xl shadow-[0_20px_40px_rgba(0,0,0,0.15)] border border-slate-50 transform hover:scale-110 transition-transform duration-300">
              <img width="800" height="800" decoding="async" 
                src="https://lh3.googleusercontent.com/p/AF1QipNNi77McpTFT3ksGjloBcqV3he235QDZfbaYiCv=s1360-w1360-h1020-rw" 
                alt="Google Business Profile" 
                className="w-20 h-20 md:w-24 md:h-24 rounded-xl object-cover"
                onError={(e) => { e.currentTarget.src = "https://storage.googleapis.com/wp-media-henoticbucket/ICONS-SYMBOLS/google-my-business-icon.webp"; }}
              />
              <img width="800" height="800" decoding="async" 
                src="https://storage.googleapis.com/wp-media-henoticbucket/ICONS-SYMBOLS/google-icon-logo-svgrepo-com.svg" 
                alt="Google Icon" 
                className="absolute -top-4 -left-4 w-10 h-10 bg-white rounded-full p-2 shadow-lg border border-slate-100"
              />
            </div>
          </div>

          {/* Right Side: Rating Info & Actions */}
          <div className="w-full lg:w-[55%] flex flex-col items-center lg:items-start text-center lg:text-left pl-0 lg:pl-8">
            <div className="flex items-center gap-3 mb-6">
              <img width="800" height="800" decoding="async" src="https://storage.googleapis.com/wp-media-henoticbucket/ICONS-SYMBOLS/google-icon-logo-svgrepo-com.svg" alt="Google" className="w-8 h-8 object-contain drop-shadow-sm" />
              <h3 className="text-3xl md:text-4xl font-black text-slate-800 tracking-tight">Henotic Diagnostics</h3>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center gap-6 mb-10 bg-slate-100/80 p-6 rounded-3xl border border-slate-200 w-full justify-center lg:justify-start shadow-inner">
              <span className="text-6xl md:text-7xl font-black text-slate-900 drop-shadow-md">4.9</span>
              <div className="flex flex-col items-center sm:items-start gap-2">
                <div className="flex gap-1.5">
                  {[...Array(5)].map((_, i) => (
                    <img width="800" height="800" decoding="async" key={i} src="https://storage.googleapis.com/wp-media-henoticbucket/ICONS-SYMBOLS/yellow-star.webp" alt="Star" className="w-7 h-7 md:w-9 md:h-9 drop-shadow-[0_5px_10px_rgba(250,204,21,0.5)] transform hover:scale-125 hover:-translate-y-1 transition-all duration-300" />
                  ))}
                </div>
                <span className="text-slate-600 font-extrabold text-sm tracking-wide">Based on 1,030+ Verified Reviews</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 w-full justify-center lg:justify-start">
              <a 
                href="https://share.google/IcBtvtVjwozCBFMPp" 
                target="_blank" 
                rel="noreferrer"
                className="flex items-center justify-center gap-3 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-extrabold rounded-2xl shadow-[0_10px_20px_rgba(37,99,235,0.3)] hover:shadow-[0_15px_30px_rgba(37,99,235,0.4)] transform hover:-translate-y-1 transition-all duration-300 w-full sm:w-auto text-lg"
              >
                Write a Review
              </a>
              <a 
                href="https://maps.google.com/?cid=11779150789147957572" 
                target="_blank" 
                rel="noreferrer"
                className="flex items-center justify-center gap-3 px-8 py-4 bg-white border-2 border-slate-200 hover:border-blue-300 hover:bg-blue-50 text-slate-700 hover:text-blue-800 font-extrabold rounded-2xl shadow-sm hover:shadow-md transform hover:-translate-y-1 transition-all duration-300 w-full sm:w-auto text-lg group"
              >
                <img width="800" height="800" decoding="async" src="https://storage.googleapis.com/wp-media-henoticbucket/ICONS-SYMBOLS/Google_Maps_icon_(2020).svg.png" alt="Google Maps" className="w-6 h-6 object-contain group-hover:scale-110 transition-transform" />
                View Map
              </a>
            </div>
          </div>
        </div>

        {/* --- REVIEWS & GOOGLE MAPS EMBED GRID --- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Review Cards (Spans 2 columns) */}
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8">
            {reviews.map((review, idx) => (
              <div key={idx} className="bg-white/80 backdrop-blur-lg p-8 md:p-10 rounded-[2.5rem] border border-white shadow-[0_15px_40px_-10px_rgba(0,0,0,0.08)] hover:-translate-y-2 transition-all duration-500 flex flex-col h-full relative group">
                
                {/* 3D Quote Background */}
                <div className="absolute top-8 right-8 opacity-5 group-hover:opacity-10 group-hover:scale-110 transition-all duration-500 pointer-events-none">
                  <svg width="60" height="60" viewBox="0 0 24 24" fill="currentColor" className="text-blue-900">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                </div>

                <div className="flex items-center gap-5 mb-6 relative z-10">
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-cyan-400 rounded-full flex items-center justify-center text-white font-black text-2xl shadow-inner border-2 border-white ring-2 ring-slate-100">
                    {review.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-extrabold text-slate-900 text-lg leading-tight flex items-center gap-2">
                      {review.name}
                      <svg className="w-4 h-4 text-blue-500 drop-shadow-sm" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                    </h4>
                    <span className="text-xs text-slate-500 font-bold">{review.date}</span>
                  </div>
                </div>

                <div className="flex gap-1.5 mb-6 relative z-10">
                  {[...Array(review.rating)].map((_, i) => (
                    <img width="800" height="800" decoding="async" key={i} src="https://storage.googleapis.com/wp-media-henoticbucket/ICONS-SYMBOLS/yellow-star.webp" alt="Star" className="w-5 h-5 drop-shadow-sm" />
                  ))}
                </div>

                <p className="text-slate-700 text-base leading-relaxed font-medium italic relative z-10 flex-grow">
                  "{review.text}"
                </p>

                <div className="mt-8 pt-5 border-t border-slate-200 flex items-center gap-3 relative z-10 bg-slate-100/50 -mx-4 -mb-4 p-4 rounded-b-[2rem]">
                   <img width="800" height="800" decoding="async" src="https://storage.googleapis.com/wp-media-henoticbucket/ICONS-SYMBOLS/google-icon-logo-svgrepo-com.svg" alt="Google" className="w-5 h-5 drop-shadow-sm" />
                   <span className="text-[11px] uppercase tracking-[0.15em] text-slate-500 font-extrabold">Verified Google Review</span>
                </div>
              </div>
            ))}
          </div>

          {/* Interactive Google Map Embed (Spans 1 column) */}
          <div className="lg:col-span-1 h-[400px] lg:h-auto w-full bg-white rounded-[2.5rem] shadow-[0_15px_40px_-10px_rgba(0,0,0,0.1)] border-8 border-white overflow-hidden relative group hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.15)] transition-shadow duration-500">
             <div className="absolute top-4 left-4 right-4 z-10 bg-white/90 backdrop-blur-md px-4 py-3 rounded-2xl shadow-lg border border-white/50 flex items-center justify-between pointer-events-none">
               <div>
                 <p className="font-extrabold text-slate-900 text-sm">Find Us Here</p>
                 <p className="text-xs font-bold text-slate-500">Kharghar, Navi Mumbai</p>
               </div>
               <img width="800" height="800" decoding="async" src="https://storage.googleapis.com/wp-media-henoticbucket/ICONS-SYMBOLS/Google_Maps_icon_(2020).svg.png" alt="Maps" className="w-8 h-8 object-contain drop-shadow-md" />
             </div>
             
             <iframe 
                src="https://maps.google.com/maps?q=Henotic+Diagnostics,Second+floor,Millennium+Empire,Sector+15,Kharghar,Navi+Mumbai&t=&z=13&ie=UTF8&iwloc=&output=embed" 
                className="w-full h-full border-0 absolute inset-0 grayscale-[15%] group-hover:grayscale-0 transition-all duration-700"
                allowFullScreen
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Henotic Diagnostics Map Embed"
             ></iframe>
             
             {/* Inner Shadow Overlay for depth */}
             <div className="absolute inset-0 pointer-events-none rounded-[2rem] ring-1 ring-inset ring-slate-900/5 shadow-[inset_0_0_20px_rgba(0,0,0,0.1)]"></div>
          </div>

        </div>
      </div>
    </section>
  );
}