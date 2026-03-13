'use client';

import React from 'react';
import * as motion from 'motion/react-client';
import { SECTION_IDS } from '@/lib/constants';
import { ChevronRight, BookOpen, Star, Flag } from 'lucide-react';

interface MegaMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onItemClick: (id: string) => void;
}

const MENU_GROUPS = [
  {
    title: 'Bối cảnh lịch sử',
    icon: <BookOpen className="w-5 h-5 text-amber-500" />,
    items: [
      { id: SECTION_IDS.PROBLEM, label: 'Bối cảnh', description: 'Tình hình Việt Nam trước năm 1930' },
      { id: SECTION_IDS.MOVEMENTS, label: 'Phong trào yêu nước', description: 'Các cuộc khởi nghĩa tiêu biểu' },
    ],
  },
  {
    title: 'Sự ra đời của Đảng',
    icon: <Flag className="w-5 h-5 text-amber-500" />,
    items: [
      { id: SECTION_IDS.TIMELINE, label: 'Dòng thời gian', description: 'Tiến trình lịch sử quan trọng' },
      { id: SECTION_IDS.BIRTH, label: 'Thành lập Đảng', description: 'Hội nghị hợp nhất 02/1930' },
      { id: SECTION_IDS.PLATFORM, label: 'Cương lĩnh đầu tiên', description: 'Văn kiện chính trị cốt lõi' },
    ],
  },
  {
    title: 'Khám phá nhanh',
    icon: <Star className="w-5 h-5 text-amber-500" />,
    items: [
      { id: SECTION_IDS.COMPARISON, label: 'So sánh trước / sau', description: 'Bước ngoặt vĩ đại của dân tộc' },
      { id: SECTION_IDS.QUIZ, label: 'Trắc nghiệm', description: 'Kiểm tra kiến thức lịch sử' },
      { id: SECTION_IDS.CONCLUSION, label: 'Kết luận', description: 'Ý nghĩa lịch sử to lớn' },
    ],
  },
];

export default function MegaMenu({ isOpen, onClose, onItemClick }: MegaMenuProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15, scale: 0.98 }}
      animate={isOpen ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 15, scale: 0.98 }}
      transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
      className={`absolute top-[calc(100%+0.75rem)] left-0 right-0 w-full pointer-events-auto z-[100] ${
        isOpen ? 'block' : 'hidden'
      }`}
      onMouseLeave={onClose}
    >
      <div className="bg-[#0a0505] rounded-2xl shadow-[0_40px_100px_rgba(0,0,0,0.9)] border border-white/10 overflow-hidden">
        <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {MENU_GROUPS.map((group, idx) => (
            <div key={idx} className="flex flex-col gap-4">
              <div className="flex items-center gap-2 pb-3 border-b border-white/5">
                <div className="p-2 rounded-xl bg-burgundy-900/40">
                  {group.icon}
                </div>
                <h3 className="font-heading text-lg font-bold text-white tracking-tight">
                  {group.title}
                </h3>
              </div>
              <ul className="flex flex-col gap-2">
                {group.items.map((item) => (
                  <li key={item.id}>
                    <button
                      onClick={() => onItemClick(item.id)}
                      className="group w-full flex items-start gap-3 p-3 rounded-xl hover:bg-white/5 transition-all duration-300 text-left"
                    >
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-bold text-white/90 group-hover:text-amber-400 transition-colors">
                            {item.label}
                          </span>
                          <ChevronRight className="w-4 h-4 text-white/20 group-hover:text-amber-400 group-hover:translate-x-1 transition-all" />
                        </div>
                        <p className="text-[13px] text-stone-400 font-sans leading-relaxed group-hover:text-stone-300 transition-colors">
                          {item.description}
                        </p>
                      </div>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        {/* Decorative Bottom Bar */}
        <div className="bg-black/40 px-8 py-4 border-t border-white/5 flex items-center justify-between">
          <p className="text-[10px] text-stone-500 font-medium uppercase tracking-[0.3em]">
            Hành trình Lịch sử Đảng — MMXXVI
          </p>
          <div className="flex gap-4">
            <span className="w-1.5 h-1.5 rounded-full bg-burgundy-900" />
            <span className="w-1.5 h-1.5 rounded-full bg-burgundy-700" />
            <span className="w-1.5 h-1.5 rounded-full bg-amber-600" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
