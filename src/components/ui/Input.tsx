import React, { forwardRef } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ComponentType<any>;
  label?: string;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className = '', icon: Icon, label, error, ...props }, ref) => {
    return (
      <div className="relative group w-full flex flex-col gap-1">
        {label && (
          <label className="text-slate-700 font-bold text-sm select-none">
            {label}
          </label>
        )}
        <div className="relative w-full">
          {Icon && (
            <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
              <Icon className="text-slate-500 group-focus-within:text-[#d57eeb] transition-colors" size={22} />
            </div>
          )}
          <input
            ref={ref}
            className={`w-full ${Icon ? 'pl-14' : 'px-5'} pr-5 py-5 rounded-2xl bg-white/80 backdrop-blur-xl border border-white shadow-sm focus:ring-4 focus:ring-[#d57eeb]/40 text-slate-900 font-bold outline-none transition-all text-lg placeholder-slate-500 ${error ? 'border-red-500 focus:ring-red-500/20' : ''} ${className}`}
            {...props}
          />
        </div>
        {error && (
          <span className="text-red-500 font-bold text-xs pl-2 select-none animate-pulse">
            {error}
          </span>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
