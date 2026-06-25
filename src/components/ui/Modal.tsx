"use client";
import React, { useEffect } from 'react';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

export default function Modal({ isOpen, onClose, title, children }: ModalProps) {
  // Prevent background scrolling when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Bind Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[999999] flex items-center justify-center p-4 sm:p-6" style={{ isolation: 'isolate' }}>
      {/* Glassmorphic Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/80 backdrop-blur-md animate-in fade-in duration-200 cursor-pointer" 
        onClick={onClose}
      ></div>

      {/* Modal Content Box */}
      <div 
        role="dialog"
        aria-modal="true"
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto z-10 animate-in zoom-in-95 duration-200 rounded-[2.5rem] bg-white border border-slate-100 shadow-2xl"
      >
        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2 bg-slate-100 hover:bg-pink-100 text-slate-700 hover:text-pink-600 rounded-full transition-colors z-50 shadow-md cursor-pointer"
          aria-label="Close modal"
        >
          <X size={20} />
        </button>

        {title && (
          <div className="px-8 pt-8 pb-4 border-b border-slate-100">
            <h3 className="text-2xl font-black text-slate-900">{title}</h3>
          </div>
        )}

        <div className="p-1 sm:p-1.5 overflow-hidden rounded-[2.4rem]">
          {children}
        </div>
      </div>
    </div>
  );
}
