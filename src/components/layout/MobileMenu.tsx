'use client';

import React from 'react';
import * as motion from 'motion/react-client';
import { X, ChevronRight, BookOpen, Star, Flag, Home, BarChart3, HelpCircle, Volume2 } from 'lucide-react';
import { SECTION_IDS } from '@/lib/constants';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onItemClick: (id: string) => void;
}

const MOBILE_ITEMS = [
  { id: SECTION_IDS.HERO, label: 'Trang chủ', icon: <Home className="w-5 h-5" /> },
  { 
    label: 'Nội dung lịch sử', 
    isHeader: true 
  },
  { id: SECTION_IDS.PROBLEM, label: 'Bối cảnh', icon: <BookOpen className="w-5 h-5" /> },
  { id: SECTION_IDS.MOVEMENTS, label: 'Phong trào yêu nước', icon: <Flag className="w-5 h-5" /> },
  { id: SECTION_IDS.TIMELINE, label: 'Dòng thời gian', icon: <Star className="w-5 h-5" /> },
  { id: SECTION_IDS.BIRTH, label: 'Thành lập Đảng', icon: <Flag className="w-5 h-5" /> },
  { id: SECTION_IDS.PLATFORM, label: 'Cương lĩnh đầu tiên', icon: <BookOpen className="w-5 h-5" /> },
  { 
    label: 'Tiện ích', 
    isHeader: true 
  },
  { id: 'audio-narrative', label: 'Thuyết minh', icon: <Volume2 className="w-5 h-5" /> },
  { id: SECTION_IDS.QUIZ, label: 'Trắc nghiệm', icon: <HelpCircle className="w-5 h-5" /> },
];

export default function MobileMenu({ isOpen, onClose, onItemClick }: MobileMenuProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: '100%' }}
      animate={isOpen ? { opacity: 1, x: 0 } : { opacity: 0, x: '100%' }}
      transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      className="fixed inset-0 z-[100] bg-burgundy-950/95 backdrop-blur-xl md:hidden"
    >
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <div className="flex flex-col">
            <span className="font-heading text-xl font-bold text-white">Lịch sử Đảng</span>
            <span className="text-[10px] uppercase tracking-widest text-amber-400 font-bold">Menu</span>
          </div>
          <button
            onClick={onClose}
            className="p-3 rounded-2xl bg-white/5 border border-white/10 text-white"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <nav className="flex flex-col gap-2">
            {MOBILE_ITEMS.map((item, idx) => (
              item.isHeader ? (
                <div key={idx} className="mt-6 mb-2">
                  <span className="text-[10px] uppercase tracking-[0.3em] text-stone-500 font-bold">
                    {item.label}
                  </span>
                </div>
              ) : (
                <button
                  key={item.id}
                  onClick={() => onItemClick(item.id!)}
                  className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/10 transition-all duration-300 group"
                >
                  <div className="flex items-center gap-4">
                    <div className="p-2.5 rounded-xl bg-burgundy-900/50 text-amber-400">
                      {item.icon}
                    </div>
                    <span className="font-bold text-white/90 group-hover:text-white transition-colors">
                      {item.label}
                    </span>
                  </div>
                  <ChevronRight className="w-5 h-5 text-white/20 group-hover:text-amber-400 transition-colors" />
                </button>
              )
            ))}
          </nav>
        </div>

        {/* Footer */}
        <div className="p-8 border-t border-white/10 bg-black/20">
          <p className="text-center text-[10px] uppercase tracking-[0.4em] text-stone-500 font-medium">
            Phát triển bởi Hành trình Lịch sử Đảng
          </p>
        </div>
      </div>
    </motion.div>
  );
}
