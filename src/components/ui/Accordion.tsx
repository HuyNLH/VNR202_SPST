'use client';

import { useState } from 'react';
import * as motion from 'motion/react-client';
import { AnimatePresence } from 'motion/react';
import { cn } from '@/lib/utils';

interface AccordionProps {
  icon: React.ReactNode;
  title: string;
  content: string;
  details: string[];
  isOpen?: boolean;
  onToggle?: () => void;
}

export default function Accordion({ icon, title, content, details, isOpen = false, onToggle }: AccordionProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const open = onToggle ? isOpen : internalOpen;
  const toggle = onToggle || (() => setInternalOpen(!internalOpen));

  return (
    <div className={cn(
      "glass-card rounded-[2rem] overflow-hidden transition-all duration-500",
      open ? "border-amber-400/20 bg-amber-400/[0.02]" : "border-white/5 hover:border-white/10 hover:bg-white/[0.02]"
    )}>
      <button
        onClick={toggle}
        className="w-full flex items-start gap-6 p-8 md:p-10 text-left transition-colors"
        aria-expanded={open}
      >
        <div className={cn(
          "w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shrink-0 transition-all duration-500",
          open ? "bg-amber-400 text-obsidian scale-110 rotate-3 shadow-[0_0_20px_rgba(251,191,36,0.5)]" : "bg-white/5 text-stone-400 border border-white/10"
        )}>
          {icon}
        </div>
        <div className="flex-1 pt-1">
          <h4 className={cn(
            "font-heading text-xl md:text-2xl font-bold transition-colors leading-tight",
            open ? "text-white" : "text-stone-300"
          )}>
            {title}
          </h4>
          <p className={cn(
            "text-sm md:text-base mt-2 transition-colors font-sans font-light leading-relaxed",
            open ? "text-stone-300" : "text-stone-500"
          )}>
            {content}
          </p>
        </div>
        <div className={cn(
          "w-10 h-10 rounded-full flex items-center justify-center border border-white/5 text-stone-500 transition-all duration-500 shrink-0 mt-1",
          open ? "rotate-180 border-amber-400/20 text-amber-400" : "hover:border-white/20"
        )}>
          ↓
        </div>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="px-8 md:px-10 pb-10 pt-2 border-t border-white/5">
              <div className="pl-16 md:pl-[4.5rem] grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
                {details.map((detail, i) => (
                  <motion.div 
                    key={i} 
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-start gap-4 text-sm text-stone-400 leading-relaxed font-sans font-light"
                  >
                    <span className="text-amber-400 mt-1.5 shrink-0 font-bold text-[8px]">•</span>
                    {detail}
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
