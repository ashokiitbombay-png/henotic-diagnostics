"use client";

import React from "react";

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
            
            <img 
              src="https://storage.googleapis.com/wp-media-henoticbucket/Front%20Office/henotic-diagnostics-main-building.webp" 
              alt="Henotic Diagnostics Main Building" 
              className="relative z-10 w-full h-64 md:h-80 object-cover rounded-3xl border-4 border-white shadow-xl transition-transform duration-500 group-hover:scale-[1.02]"
            fetchPriority="high" />
            
            {/* Floating Google Profile Badge */}
            <div className="absolute -bottom-6 -right-6 md:-right-8 z-20 bg-white p-2 rounded-2xl shadow-2xl border border-slate-100 flex items-center justify-center transform transition-transform duration-300 hover:scale-110">
              <img 
                src="https://lh3.googleusercontent.com/p/AF1QipNNi77McpTFT3ksGjloBcqV3he235QDZfbaYiCv=s1360-w1360-h1020-rw" 
                alt="Google Business Profile" 
                className="w-20 h-20 md:w-24 md:h-24 rounded-xl object-cover"
                onError={(e) => {
                  // Fallback if the Google profile image URL is invalid or blocked
                  e.currentTarget.src = "https://storage.googleapis.com/wp-media-henoticbucket/ICONS-SYMBOLS/google-my-business-icon.webp";
                }}
              />
              <img 
                src="https://storage.googleapis.com/wp-media-henoticbucket/ICONS-SYMBOLS/google-icon-logo-svgrepo-com.svg" 
                alt="Google Icon" 
                className="absolute -top-3 -left-3 w-8 h-8 bg-white rounded-full p-1 shadow-md"
              />
            </div>
          </div>

          {/* Right Side: Rating Info & Actions */}
          <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left">
            <div className="flex items-center gap-3 mb-2">
               <img src="https://storage.googleapis.com/wp-media-henoticbucket/ICONS-SYMBOLS/google-icon-logo-svgrepo-com.svg" alt="Google" className="w-8 h-8" />
               <h3 className="text-2xl md:text-3xl font-extrabold text-slate-800">Henotic Diagnostics</h3>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center gap-4 mb-8">
              <span className="text-6xl font-black text-slate-900 drop-shadow-md">4.9</span>
              <div className="flex flex-col items-center sm:items-start">
                <div className="flex gap-1 mb-1">
                  {[...Array(5)].map((_, i) => (
                    <img key={i} src="https://storage.googleapis.com/wp-media-henoticbucket/ICONS-SYMBOLS/yellow-star.webp" alt="Star" className="w-6 h-6 md:w-8 md:h-8 drop-shadow-sm transform hover:scale-110 transition-transform duration-200" />
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
                <img src="https://storage.googleapis.com/wp-media-henoticbucket/ICONS-SYMBOLS/Google_Maps_icon_(2020).svg.png" alt="Google Maps" className="w-5 h-5 group-hover:scale-110 transition-transform" />
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
                <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor" className="text-blue-600">
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

              <div className="flex gap-1 mb-4">
                {[...Array(review.rating)].map((_, i) => (
                  <img key={i} src="https://storage.googleapis.com/wp-media-henoticbucket/ICONS-SYMBOLS/yellow-star.webp" alt="Star" className="w-4 h-4 drop-shadow-sm" />
                ))}
              </div>

              <p className="text-slate-600 text-sm leading-relaxed font-medium italic relative z-10 flex-grow">
                "{review.text}"
              </p>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-2">
                 <img src="https://storage.googleapis.com/wp-media-henoticbucket/ICONS-SYMBOLS/google-icon-logo-svgrepo-com.svg" alt="Google" className="w-4 h-4" />
                 <span className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">Posted on Google</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}