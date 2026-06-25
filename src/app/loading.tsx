import React from "react";
import { Activity } from "lucide-react";

export default function GlobalLoading() {
  return (
    <main className="min-h-[70vh] flex items-center justify-center bg-slate-50 font-sans px-4 py-20 mt-[80px]">
      <div className="text-center space-y-6">
        {/* Pulsing loading container */}
        <div className="relative w-20 h-20 mx-auto flex items-center justify-center">
          {/* Decorative halo ring */}
          <div className="absolute inset-0 bg-blue-500/20 rounded-full animate-ping duration-1500"></div>
          {/* Inner pulse circle */}
          <div className="w-16 h-16 bg-gradient-to-br from-[#4568dc] to-[#b06ab3] rounded-full flex items-center justify-center text-white shadow-lg relative z-10 animate-pulse">
            <Activity size={28} className="animate-spin duration-3000" />
          </div>
        </div>
        
        <div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">Loading Diagnostics...</h2>
          <p className="text-slate-500 text-sm font-bold mt-2">Connecting to our secure server</p>
        </div>
        
        {/* Simple skeleton animation indicator */}
        <div className="flex justify-center gap-1.5 mt-2">
          <div className="w-2.5 h-2.5 rounded-full bg-blue-500/40 animate-bounce"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-pink-500/40 animate-bounce [animation-delay:0.2s]"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-purple-500/40 animate-bounce [animation-delay:0.4s]"></div>
        </div>
      </div>
    </main>
  );
}
