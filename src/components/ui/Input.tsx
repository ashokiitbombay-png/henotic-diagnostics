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
          <label className="text-slate-700 dark:text-slate-300 font-bold text-sm select-none">
            {label}
          </label>
        )}
        <div className="relative w-full">
          {Icon && (
            <div className="absolute inset-y-0 left-0 pl-4 sm:pl-5 flex items-center pointer-events-none z-10">
              <Icon className="text-slate-400 group-focus-within:text-violet-500 transition-colors duration-200" size={20} />
            </div>
          )}
          <input
            ref={ref}
            className={`w-full ${Icon ? 'pl-12 sm:pl-14' : 'px-4 sm:px-5'} pr-4 sm:pr-5 py-4 sm:py-[18px] rounded-xl sm:rounded-2xl bg-white/90 backdrop-blur-xl border border-slate-200/80 shadow-sm hover:shadow-md focus:shadow-lg focus:ring-2 focus:ring-violet-500/30 focus:border-violet-400 text-slate-900 font-semibold outline-none transition-all duration-200 text-base placeholder-slate-400 ${error ? 'border-red-400 focus:ring-red-500/20 focus:border-red-400' : ''} ${className}`}
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
