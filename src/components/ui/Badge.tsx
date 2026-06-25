import React from 'react';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'blue' | 'pink' | 'emerald' | 'amber' | 'slate' | 'transparent';
  children: React.ReactNode;
}

export default function Badge({ children, variant = 'blue', className = '', ...props }: BadgeProps) {
  const baseStyle = "inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-black uppercase tracking-wider backdrop-blur-md shadow-sm border";
  
  const variantStyles = {
    blue: "bg-blue-500/10 border-blue-500/30 text-blue-400",
    pink: "bg-pink-500/10 border-pink-500/30 text-pink-400",
    emerald: "bg-emerald-500/10 border-emerald-500/30 text-emerald-400",
    amber: "bg-amber-500/10 border-amber-500/30 text-amber-400",
    slate: "bg-slate-500/10 border-slate-500/30 text-slate-300",
    transparent: "bg-white/10 border-white/20 text-white"
  };

  return (
    <span 
      className={`${baseStyle} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
}
