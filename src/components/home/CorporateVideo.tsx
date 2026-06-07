"use client";
import { useRef, useState } from "react";
import { Play, Volume2, VolumeX, Pause } from "lucide-react";

export default function CorporateVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const togglePlay = () => { if (videoRef.current) { isPlaying ? videoRef.current.pause() : videoRef.current.play(); setIsPlaying(!isPlaying); } };
  const toggleMute = () => { if (videoRef.current) { videoRef.current.muted = !isMuted; setIsMuted(!isMuted); } };

  return (
    <section className="py-24 bg-slate-900 relative overflow-hidden border-y border-slate-800">
      <div className="absolute inset-0 bg-blue-900/20 backdrop-blur-3xl"></div>
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="text-center mb-12">
           <span className="text-pink-400 font-bold uppercase tracking-widest text-sm mb-2 block drop-shadow-md">Corporate Overview</span>
           <h2 className="text-4xl md:text-5xl font-extrabold text-white">Trusted Healthcare Partner</h2>
        </div>
        <div className="relative rounded-[3rem] overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.6)] border border-white/20 group max-w-5xl mx-auto bg-black">
          <video ref={videoRef} src="https://storage.googleapis.com/wp-media-henoticbucket/Videos/henotic_diagnostics_trusted_health_care-corporate-video.mp4" className="w-full h-auto aspect-video object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500" loop controls={false} />
          <div className={`absolute inset-0 flex items-center justify-center bg-black/40 transition-all duration-300 ${isPlaying ? 'opacity-0 hover:opacity-100' : 'opacity-100'}`}>
             <button suppressHydrationWarning  onClick={togglePlay} className="w-24 h-24 bg-white/20 backdrop-blur-xl rounded-full flex items-center justify-center hover:scale-110 transition-transform border border-white/50 text-white shadow-2xl">
               {isPlaying ? <Pause size={40} fill="currentColor" /> : <Play size={40} fill="currentColor" className="ml-2" />}
             </button>
          </div>
          <div className="absolute bottom-8 right-8 flex gap-4">
             <button suppressHydrationWarning  onClick={toggleMute} className="p-4 bg-black/60 backdrop-blur-md rounded-full text-white border border-white/20 hover:bg-pink-600 transition-colors shadow-lg">
               {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
             </button>
          </div>
        </div>
      </div>
    </section>
  );
}