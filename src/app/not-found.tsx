import Link from 'next/link';
import { Activity } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center">
      <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-6 shadow-inner">
        <Activity size={40} className="text-[#3494E6]" />
      </div>
      <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-4">Page Not Found</h1>
      <p className="text-lg text-slate-600 mb-8 max-w-md">
        The diagnostic service or location you are looking for may have been updated or moved.
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <Link 
          href="/"
          className="px-8 py-4 bg-gradient-to-r from-[#EC6EAD] to-[#3494E6] text-white font-black rounded-xl shadow-lg hover:shadow-xl transition-all"
        >
          Return to Homepage
        </Link>
        <Link 
          href="/services"
          className="px-8 py-4 bg-white text-[#3494E6] border-2 border-[#3494E6]/20 font-black rounded-xl hover:bg-slate-50 transition-all"
        >
          View All Services
        </Link>
      </div>
    </div>
  );
}