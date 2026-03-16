'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, Book, User, Calendar, Lock } from 'lucide-react';
import { useMinigame } from '@/context/MinigameContext';
import { useSound } from '@/context/SoundContext';
import { ARCHIVE_ITEMS } from '@/data/minigame/archive';

export default function ArchiveModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { state } = useMinigame();
  const { playSound } = useSound();

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
        <motion.div
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           exit={{ opacity: 0 }}
           onClick={onClose}
           className="absolute inset-0 bg-stone-950/80 backdrop-blur-sm"
        />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-4xl max-h-[85vh] bg-stone-900 border border-stone-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col z-10"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-stone-800 bg-stone-900/50">
            <h2 className="text-2xl font-bold text-white flex items-center gap-3">
               Kho Lưu Trữ Thành Tựu
               <span className="text-sm font-normal text-stone-300 bg-stone-800 px-3 py-1 rounded-full">
                 {state.unlockedArchives.length} / {ARCHIVE_ITEMS.length}
               </span>
            </h2>
            <button 
              onClick={() => {
                playSound('click');
                onClose();
              }}
              className="p-2 rounded-full hover:bg-stone-800 text-stone-400 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6 scrollbar-thin scrollbar-thumb-stone-700 scrollbar-track-transparent">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               {ARCHIVE_ITEMS.map((item) => {
                 const isUnlocked = state.unlockedArchives.includes(item.id);
                 
                 let Icon = Book;
                 if (item.category === 'person') Icon = User;
                 if (item.category === 'event') Icon = Calendar;

                 return (
                   <div 
                     key={item.id}
                     className={`p-6 rounded-2xl border transition-all ${
                       isUnlocked 
                         ? 'bg-stone-800/50 border-amber-500/30 shadow-[0_4px_20px_rgba(245,158,11,0.05)]' 
                         : 'bg-stone-900/50 border-stone-800 opacity-60'
                     }`}
                   >
                     <div className="flex items-start gap-4">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                          isUnlocked ? 'bg-amber-500/20 text-amber-500' : 'bg-stone-800 text-stone-600'
                        }`}>
                           {isUnlocked ? <Icon className="w-6 h-6" /> : <Lock className="w-6 h-6" />}
                        </div>
                        <div>
                          <h3 className={`text-lg font-bold mb-2 ${isUnlocked ? 'text-white' : 'text-stone-500'}`}>
                            {isUnlocked ? item.title : 'Dữ liệu bị khóa'}
                          </h3>
                          <p className={`text-sm leading-relaxed ${isUnlocked ? 'text-stone-300' : 'text-stone-600'}`}>
                            {isUnlocked ? item.description : 'Hoàn thành các nhiệm vụ lịch sử để giải mã hồ sơ này.'}
                          </p>
                        </div>
                     </div>
                   </div>
                 );
               })}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
