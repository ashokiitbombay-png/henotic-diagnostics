import React from 'react';

export default function Button({ children, className = '', ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button 
      className={"px-6 py-3 bg-gradient-to-r from-[#EC6EAD] to-[#3494E6] text-white font-bold rounded-xl shadow-md hover:shadow-lg transition-all " + className}
      {...props}
    >
      {children}
    </button>
  );
}