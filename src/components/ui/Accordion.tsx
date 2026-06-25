"use client";
import React, { useState } from 'react';

interface AccordionItemProps {
  title: React.ReactNode;
  children: React.ReactNode;
  isOpen: boolean;
  onToggle: () => void;
}

export function AccordionItem({ title, children, isOpen, onToggle }: AccordionItemProps) {
  return (
    <div className="bg-white/60 backdrop-blur-md rounded-2xl border border-white shadow-sm overflow-hidden transition-all duration-300">
      <button
        type="button"
        onClick={onToggle}
        className="w-full font-bold text-slate-800 outline-none flex justify-between items-center p-5 text-left select-none cursor-pointer"
      >
        <span>{title}</span>
        <span className={`text-blue-600 transition-transform duration-300 font-bold text-xl ${isOpen ? 'rotate-45' : ''}`}>
          +
        </span>
      </button>
      <div 
        className={`transition-all duration-300 ease-in-out ${isOpen ? 'max-h-[500px] border-t border-slate-100/50' : 'max-h-0'} overflow-hidden`}
      >
        <div className="p-5 text-slate-600 text-sm leading-relaxed font-medium bg-white/40">
          {children}
        </div>
      </div>
    </div>
  );
}

interface AccordionProps {
  items: {
    title: React.ReactNode;
    content: React.ReactNode;
  }[];
  allowMultiple?: boolean;
}

export default function Accordion({ items, allowMultiple = false }: AccordionProps) {
  const [openIndexes, setOpenIndexes] = useState<number[]>([]);

  const handleToggle = (index: number) => {
    if (allowMultiple) {
      if (openIndexes.includes(index)) {
        setOpenIndexes(openIndexes.filter(i => i !== index));
      } else {
        setOpenIndexes([...openIndexes, index]);
      }
    } else {
      if (openIndexes.includes(index)) {
        setOpenIndexes([]);
      } else {
        setOpenIndexes([index]);
      }
    }
  };

  return (
    <div className="space-y-4 w-full">
      {items.map((item, idx) => (
        <AccordionItem
          key={idx}
          title={item.title}
          isOpen={openIndexes.includes(idx)}
          onToggle={() => handleToggle(idx)}
        >
          {item.content}
        </AccordionItem>
      ))}
    </div>
  );
}
