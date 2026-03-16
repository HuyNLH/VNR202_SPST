'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useMinigame } from '@/context/MinigameContext';
import { useSound } from '@/context/SoundContext';
import { Mission, DecisionQuestion } from '@/types/minigame';
import { CheckCircle2, XCircle, ArrowRight } from 'lucide-react';

export default function DecisionMission({ mission }: { mission: Mission }) {
  const { dispatch } = useMinigame();
  const { playSound } = useSound();
  
  const [activeQuestions] = useState<DecisionQuestion[]>(() => {
    if (mission.questions && mission.questions.length > 0) {
      const shuffled = [...mission.questions].sort(() => Math.random() - 0.5);
      return shuffled.slice(0, 3);
    } else if (mission.options) {
      return [{
        id: 'legacy_q',
        prompt: mission.instructions,
        options: mission.options
      }];
    }
    return [];
  });

  const [currentIndex, setCurrentIndex] = useState(0);
  const [accumulatedScore, setAccumulatedScore] = useState(0);

  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isRevealed, setIsRevealed] = useState(false);

  if (activeQuestions.length === 0) return null;

  const currentQuestion = activeQuestions[currentIndex];
  const isLastQuestion = currentIndex === activeQuestions.length - 1;

  const handleSelect = (id: string) => {
    if (isRevealed) return;
    playSound('click');
    setSelectedId(id);
  };

  const handleSubmit = () => {
    if (!selectedId || isRevealed) return;
    playSound('click');
    
    const selectedOption = currentQuestion.options.find(o => o.id === selectedId);
    if (selectedOption?.isCorrect) {
       playSound('success');
       setAccumulatedScore(prev => prev + Math.floor(mission.rewardScore / activeQuestions.length));
    } else {
       playSound('failure');
    }
    
    setIsRevealed(true);
  };

  const handleNext = () => {
    if (!isLastQuestion) {
      setCurrentIndex(prev => prev + 1);
      setSelectedId(null);
      setIsRevealed(false);
    } else {
      dispatch({ 
        type: 'COMPLETE_MISSION', 
        payload: { 
          score: accumulatedScore, 
          unlockId: accumulatedScore > 0 ? mission.unlockId : undefined 
        } 
      });
      playSound('click');
      dispatch({ type: 'NEXT_MISSION' });
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between mb-4 border-b border-stone-800 pb-4">
         <div className="flex flex-col gap-1">
           <span className="text-amber-500 font-bold uppercase tracking-widest text-xs">Phân tích tình huống {currentIndex + 1}/{activeQuestions.length}</span>
           {activeQuestions.length > 1 && (
             <div className="flex gap-1.5">
               {activeQuestions.map((_, i) => (
                 <div key={i} className={`w-2 h-2 rounded-full ${i === currentIndex ? 'bg-amber-500 scale-125' : i < currentIndex ? 'bg-amber-500/50' : 'bg-stone-700'} transition-all`} />
               ))}
             </div>
           )}
         </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
           key={currentQuestion.id}
           initial={{ opacity: 0, x: 20 }}
           animate={{ opacity: 1, x: 0 }}
           exit={{ opacity: 0, x: -20 }}
           transition={{ duration: 0.3 }}
           className="space-y-6"
        >
          <p className="text-lg md:text-xl text-white font-medium leading-relaxed mb-6">
            {currentQuestion.prompt}
          </p>

          <div className="space-y-4">
            {currentQuestion.options.map((option) => {
              const isSelected = selectedId === option.id;
              let bdColor = "border-stone-800 hover:border-amber-500/50";
              let bgColor = "bg-stone-900/50 hover:bg-stone-800";
              
              if (isRevealed) {
                if (option.isCorrect) {
                  bdColor = "border-emerald-500";
                  bgColor = isSelected ? "bg-emerald-500/20" : "bg-stone-900/50";
                } else if (isSelected && !option.isCorrect) {
                  bdColor = "border-red-500";
                  bgColor = "bg-red-500/20";
                } else {
                  bdColor = "border-stone-800 opacity-50";
                  bgColor = "bg-stone-900/20 opacity-50";
                }
              } else if (isSelected) {
                bdColor = "border-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.2)]";
                bgColor = "bg-amber-500/10";
              }

              return (
                <button
                  key={option.id}
                  disabled={isRevealed}
                  onClick={() => handleSelect(option.id)}
                  className={`w-full text-left p-4 md:p-6 rounded-2xl border transition-all duration-300 ${bdColor} ${bgColor} focus:outline-none relative overflow-hidden`}
                >
                  <div className="flex items-start gap-4 relative z-10">
                    <div className={`w-6 h-6 rounded-full border flex-shrink-0 flex items-center justify-center mt-0.5 ${
                      isSelected ? 'border-amber-500 bg-amber-500' : 'border-stone-600'
                    }`}>
                      {isSelected && !isRevealed && <div className="w-2.5 h-2.5 bg-stone-900 rounded-full" />}
                      {isRevealed && option.isCorrect && <CheckCircle2 className="w-6 h-6 text-emerald-500 absolute" />}
                      {isRevealed && isSelected && !option.isCorrect && <XCircle className="w-6 h-6 text-red-500 absolute" />}
                    </div>
                    <div>
                      <p className="text-stone-200 text-base md:text-lg leading-relaxed">{option.text}</p>
                      
                      {isRevealed && isSelected && (
                         <motion.div 
                           initial={{ opacity: 0, height: 0 }}
                           animate={{ opacity: 1, height: 'auto' }}
                           className={`mt-4 pt-4 border-t ${option.isCorrect ? 'border-emerald-500/30' : 'border-red-500/30'}`}
                         >
                           <p className={option.isCorrect ? 'text-emerald-400' : 'text-red-400'}>
                             {option.feedback}
                           </p>
                         </motion.div>
                      )}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="mt-8 flex justify-end">
        {!isRevealed ? (
          <button
            onClick={handleSubmit}
            disabled={!selectedId}
            className={`px-8 py-3 rounded-full font-bold transition-all ${
              selectedId 
                ? 'bg-amber-500 text-stone-950 hover:bg-amber-400 hover:scale-105 shadow-lg shadow-amber-500/10' 
                : 'bg-stone-800 text-stone-500 cursor-not-allowed'
            }`}
          >
            Xác Nhận Quyết Định
          </button>
        ) : (
          <button
            onClick={handleNext}
            className="px-8 py-3 bg-white text-stone-950 rounded-full font-bold flex items-center gap-2 hover:bg-stone-200 transition-all hover:scale-105 group shadow-xl"
          >
            {isLastQuestion ? 'Hoàn Thành Nhiệm Vụ' : 'Câu Tiếp Theo'} <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        )}
      </div>
    </div>
  );
}
