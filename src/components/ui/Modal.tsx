'use client';

import { useEffect } from 'react';
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
  // Prevent scrolling when modal is open
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

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-2xl bg-[#0a0505] rounded-3xl border border-white/10 shadow-[0_32px_128px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col max-h-[90vh]"
          >
            {/* Header */}
            <div className="p-6 md:p-8 border-b border-white/5 flex items-start justify-between relative">
              <div className="flex-1 pr-8">
                {subtitle && (
                  <span className="text-[10px] uppercase tracking-[0.3em] text-amber-500 font-bold block mb-2">
                    {subtitle}
                  </span>
                )}
                <h3 className="font-heading text-2xl md:text-3xl font-extrabold text-white tracking-tight leading-tight">
                  {title}
                </h3>
              </div>
              
              <button
                onClick={onClose}
                className="absolute top-6 right-6 p-2 rounded-full bg-white/5 border border-white/10 text-white/40 hover:text-white hover:bg-white/10 transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content Swirl - Decorative */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-burgundy-900/20 blur-[100px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-amber-500/5 blur-[100px] pointer-events-none" />

            {/* Body */}
            <div className="p-6 md:p-8 overflow-y-auto custom-scrollbar relative">
              <div className="text-stone-300 font-sans font-light leading-relaxed text-base md:text-lg">
                {children}
              </div>
            </div>

            {/* Footer / Branding */}
            <div className="px-8 py-4 bg-black/40 border-t border-white/5">
              <p className="text-[10px] text-stone-500 font-medium uppercase tracking-[0.3em]">
                Hành trình Lịch sử Đảng — MMXXVI
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
