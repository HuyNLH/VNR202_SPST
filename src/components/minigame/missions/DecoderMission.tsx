'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useMinigame } from '@/context/MinigameContext';
import { useSound } from '@/context/SoundContext';
import { Mission, DecoderItem } from '@/types/minigame';
import { CheckCircle2, ArrowRight } from 'lucide-react';

export default function DecoderMission({ mission }: { mission: Mission }) {
  const { dispatch } = useMinigame();
  const { playSound } = useSound();
  
  const [encryptedList] = useState<DecoderItem[]>(() => mission.decoderItems || []);
  const [decryptedList] = useState<DecoderItem[]>(() => {
    return mission.decoderItems ? [...mission.decoderItems].sort(() => Math.random() - 0.5) : [];
  });
  
  const [selectedEncrypted, setSelectedEncrypted] = useState<string | null>(null);
  const [matchedPairs, setMatchedPairs] = useState<string[]>([]);

  const handleSelectEncrypted = (id: string) => {
    if (matchedPairs.includes(id)) return;
    playSound('click');
    setSelectedEncrypted(id === selectedEncrypted ? null : id);
  };

  const handleSelectDecrypted = (id: string) => {
    if (matchedPairs.includes(id)) return;
    if (!selectedEncrypted) return; 
    playSound('click');

    if (selectedEncrypted === id) {
      playSound('success');
      setMatchedPairs([...matchedPairs, id]);
      setSelectedEncrypted(null);
    } else {
      playSound('failure');
      setSelectedEncrypted(null);
    }
  };

  const isComplete = mission.decoderItems && matchedPairs.length === mission.decoderItems.length;

  const handleNext = () => {
    playSound('click');
    dispatch({ 
      type: 'COMPLETE_MISSION', 
      payload: { score: mission.rewardScore, unlockId: mission.unlockId } 
    });
    dispatch({ type: 'NEXT_MISSION' });
  };

  return (
    <div className="flex flex-col gap-6 w-full">
      {/* Sound removed as per user request */}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-12">
        {/* Left Column - Encrypted */}
        <div className="space-y-4">
          <h4 className="text-amber-500 uppercase tracking-widest text-xs font-bold mb-6 flex items-center gap-2">
             <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
             Mã Thông Điệp Cần Giải
          </h4>
          {encryptedList.map((item) => {
            const isMatched = matchedPairs.includes(item.id);
            const isSelected = selectedEncrypted === item.id;
            
            return (
              <button
                key={`enc-${item.id}`}
                onClick={() => handleSelectEncrypted(item.id)}
                disabled={isMatched}
                className={`w-full p-5 rounded-2xl border text-left transition-all duration-300 relative overflow-hidden flex flex-col justify-center ${
                  isMatched 
                    ? 'bg-emerald-500/10 border-emerald-500/30 opacity-50 cursor-not-allowed' 
                    : isSelected
                      ? 'bg-amber-500/10 border-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.2)] scale-[1.02]'
                      : 'bg-stone-900 border-stone-800 hover:border-amber-500/50 hover:bg-stone-800'
                }`}
              >
                {isMatched && <CheckCircle2 className="w-6 h-6 text-emerald-500 absolute top-4 right-4" />}
                <span className={`font-mono text-lg md:text-xl font-bold tracking-wider ${isMatched ? 'text-emerald-500' : isSelected ? 'text-amber-400' : 'text-stone-300'}`}>
                  {item.encrypted}
                </span>
                <span className={`text-sm mt-2 font-medium ${isMatched ? 'text-emerald-500/70' : 'text-stone-500'}`}>
                   Manh mối: {item.clue}
                </span>
              </button>
            );
          })}
        </div>

        {/* Right Column - Decrypted */}
        <div className="space-y-4 pt-8 md:pt-0 border-t border-stone-800 md:border-none mt-4 md:mt-0">
          <h4 className="text-emerald-500 uppercase tracking-widest text-xs font-bold mb-6 flex items-center gap-2">
             <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
             Dữ Liệu Nguyên Bản
          </h4>
          {decryptedList.map((item) => {
            const isMatched = matchedPairs.includes(item.id);
            const isSelectable = selectedEncrypted !== null && !isMatched;

            return (
              <button
                key={`dec-${item.id}`}
                onClick={() => handleSelectDecrypted(item.id)}
                disabled={isMatched || !selectedEncrypted}
                className={`w-full p-5 rounded-2xl border text-left transition-all duration-300 min-h-[100px] flex items-center ${
                  isMatched 
                    ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400 cursor-not-allowed shadow-[0_0_15px_rgba(16,185,129,0.2)]' 
                    : isSelectable
                      ? 'bg-stone-800 border-amber-500/50 text-stone-100 hover:bg-stone-700 hover:border-amber-500 cursor-pointer shadow-[0_0_10px_rgba(245,158,11,0.1)]'
                      : 'bg-stone-900/50 border-stone-800 text-stone-500'
                }`}
              >
                <p className="text-base md:text-lg leading-relaxed">{item.decrypted}</p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Completion State */}
      <AnimatePresence>
        {isComplete && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="mt-8 flex flex-col md:flex-row items-center justify-between gap-6 p-6 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl"
          >
            <div className="flex items-center gap-4 text-emerald-400 font-bold text-xl">
              <CheckCircle2 className="w-8 h-8 flex-shrink-0" />
              Tài liệu đã được giải mã thành công!
            </div>
            <button
              onClick={handleNext}
              className="px-8 py-3 bg-emerald-500 text-stone-950 rounded-full font-bold flex items-center justify-center gap-2 hover:bg-emerald-400 hover:scale-105 transition-all w-full md:w-auto group shadow-lg"
            >
              Tiếp Tục <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
