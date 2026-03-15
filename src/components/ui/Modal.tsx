'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}

export default function Modal({ isOpen, onClose, title, subtitle, children }: ModalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!mounted) return null;

  const modalContent = (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 md:p-8">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            animate={{ opacity: 1, backdropFilter: 'blur(24px)' }}
            exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            transition={{ duration: 0.5, ease: "circOut" }}
            onClick={onClose}
            className="absolute inset-0 bg-black/90"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 40, rotateX: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0, rotateX: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20, rotateX: -10 }}
            transition={{ 
              type: "spring", 
              damping: 20, 
              stiffness: 260,
              mass: 0.8,
              duration: 0.6
            }}
            className="relative w-full max-w-xl bg-[#0a0505] rounded-[2.5rem] border border-white/10 shadow-[0_32px_128px_rgba(0,0,0,1)] overflow-hidden flex flex-col max-h-[85vh] perspective-1000"
          >
            {/* Header */}
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="p-6 md:p-10 border-b border-white/5 flex items-start justify-between relative z-10 bg-[#0a0505]/50 backdrop-blur-md"
            >
              <div className="flex-1 pr-10">
                {subtitle && (
                  <motion.span 
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                    className="text-[10px] lg:text-[11px] uppercase tracking-[0.4em] text-amber-500 font-extrabold block mb-3"
                  >
                    {subtitle}
                  </motion.span>
                )}
                <h3 className="font-heading text-3xl md:text-4xl font-extrabold text-white tracking-tighter leading-tight text-glow-white">
                  {title}
                </h3>
              </div>
              
              <button
                onClick={onClose}
                className="absolute top-8 right-8 p-3 rounded-full bg-white/5 border border-white/10 text-white/40 hover:text-white hover:bg-white/10 transition-all hover:rotate-90 duration-300"
              >
                <X className="w-6 h-6" />
              </button>
            </motion.div>

            {/* Decorative Background Elements */}
            <motion.div 
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3]
              }}
              transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
              className="absolute top-0 right-0 w-80 h-80 bg-burgundy-900/10 blur-[100px] pointer-events-none" 
            />
            <motion.div 
              animate={{ 
                scale: [1, 1.3, 1],
                opacity: [0.1, 0.2, 0.1]
              }}
              transition={{ repeat: Infinity, duration: 10, ease: "easeInOut", delay: 1 }}
              className="absolute bottom-0 left-0 w-80 h-80 bg-amber-500/5 blur-[120px] pointer-events-none" 
            />

            {/* Body */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="p-8 md:p-10 overflow-y-auto custom-scrollbar relative z-0"
            >
              <div className="text-stone-300 font-sans font-light leading-relaxed text-lg md:text-xl space-y-6">
                {children}
              </div>
            </motion.div>

            {/* Footer / Branding */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="px-10 py-5 bg-black/40 border-t border-white/5 relative z-10 flex items-center justify-between"
            >
              <p className="text-[10px] text-stone-500 font-bold uppercase tracking-[0.4em]">
                Hành trình Lịch sử Đảng
              </p>
              <div className="flex gap-1.5">
                <div className="w-1 h-1 rounded-full bg-amber-500/30" />
                <div className="w-1 h-1 rounded-full bg-amber-500/50" />
                <div className="w-1 h-1 rounded-full bg-amber-500/30" />
              </div>
            </motion.div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );

  return createPortal(modalContent, document.body);
}
