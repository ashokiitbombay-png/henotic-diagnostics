import React from 'react';

export default function Card({ children, className = '' }: { children: React.ReactNode, className?: string }) {
  return (
    <div className={"bg-white/80 backdrop-blur-md p-6 rounded-2xl shadow-sm border border-slate-100 " + className}>
      {children}
    </div>
  );
}