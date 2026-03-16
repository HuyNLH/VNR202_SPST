'use client';

import { useState } from 'react';
import { motion, Reorder, AnimatePresence } from 'framer-motion';
import { useMinigame } from '@/context/MinigameContext';
import { useSound } from '@/context/SoundContext';
import { Mission, TimelineEvent } from '@/types/minigame';
import { ArrowRight, CheckCircle2, GripVertical, AlertCircle } from 'lucide-react';

export default function TimelineMission({ mission }: { mission: Mission }) {
  const { dispatch } = useMinigame();
  const { playSound } = useSound();
  
  const [events, setEvents] = useState<TimelineEvent[]>(() => {
    return mission.timelineEvents ? [...mission.timelineEvents].sort(() => Math.random() - 0.5) : [];
  });
  
  const [isDone, setIsDone] = useState(false);
  const [verificationFeedback, setVerificationFeedback] = useState<{ isError: boolean; message: string } | null>(null);
  const [attempts, setAttempts] = useState(0);

  const handleVerify = () => {
    playSound('click');
    setAttempts(prev => prev + 1);
    
    // Check if the current order of events matches the expectedOrder
    const isCorrect = events.every((event, index) => event.expectedOrder === index + 1);

    if (isCorrect) {
      playSound('success');
      setVerificationFeedback({ isError: false, message: "Dòng thời gian đã được kết nối chính xác!" });
      setIsDone(true);
    } else {
      playSound('failure');
      setVerificationFeedback({ 
        isError: true, 
        message: "Trình tự chưa chính xác. Hãy kéo thả để sắp xếp lại các sự kiện theo đúng dòng thời gian lịch sử." 
      });
      // Clear feedback after a few seconds
      setTimeout(() => setVerificationFeedback(null), 3000);
    }
  };

  const handleNext = () => {
    const finalScore = Math.max(0, mission.rewardScore - (attempts - 1) * 10);
    
    dispatch({ 
      type: 'COMPLETE_MISSION', 
      payload: { score: finalScore, unlockId: mission.unlockId } 
    });
    playSound('click');
    dispatch({ type: 'NEXT_MISSION' });
  };

  return (
    <div className="flex flex-col gap-6 max-w-2xl mx-auto w-full relative">
      <div className="flex items-center justify-between mb-2">
         <p className="text-stone-400 text-sm italic">
           Kéo các thẻ sự kiện để sắp xếp chúng theo trình tự thời gian từ sớm nhất đến muộn nhất.
         </p>
      </div>

      {/* Verification Feedback */}
      <AnimatePresence>
        {verificationFeedback && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={`flex items-center gap-3 p-4 rounded-xl border ${
              verificationFeedback.isError 
                ? 'bg-red-500/10 border-red-500/30 text-red-400' 
                : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
            }`}
          >
            {verificationFeedback.isError ? <AlertCircle className="w-5 h-5" /> : <CheckCircle2 className="w-5 h-5" />}
            <span className="text-sm font-medium">{verificationFeedback.message}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Reorderable List */}
      <Reorder.Group 
        axis="y" 
        values={events} 
        onReorder={(newOrder) => {
          setEvents(newOrder);
          // Optional: sound for small move
          // playSound('click'); 
        }}
        className="space-y-4"
      >
        {events.map((event) => (
          <Reorder.Item
            key={event.id}
            value={event}
            className="relative cursor-grab active:cursor-grabbing"
          >
            <motion.div
              layout
              className="group flex items-center gap-4 p-5 bg-stone-900/80 border border-stone-800 hover:border-amber-500/50 rounded-2xl transition-all shadow-xl backdrop-blur-sm"
            >
              <div className="text-stone-600 group-hover:text-amber-500 transition-colors">
                <GripVertical className="w-5 h-5" />
              </div>
              
              <div className="flex-1">
                <p className="text-stone-200 text-sm md:text-base leading-relaxed">
                  {event.label}
                </p>
              </div>

              {/* Decorative index indicator */}
              <div className="hidden md:flex w-8 h-8 rounded-full bg-stone-800 items-center justify-center text-stone-500 text-xs font-bold font-mono">
                ?
              </div>
            </motion.div>
          </Reorder.Item>
        ))}
      </Reorder.Group>

      {/* Action Button */}
      {!isDone ? (
        <button
          onClick={handleVerify}
          className="mt-6 w-full py-4 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold rounded-2xl transition-all hover:scale-[1.02] active:scale-95 shadow-lg shadow-amber-500/10 border border-amber-400/20"
        >
          Kết nối dòng thời gian
        </button>
      ) : (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 flex flex-col md:flex-row items-center justify-between gap-6 p-6 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl"
        >
          <div className="flex items-center gap-4 text-emerald-400 font-bold text-xl">
            <CheckCircle2 className="w-8 h-8 flex-shrink-0" />
            Dòng thời gian đã thông suốt!
          </div>
          <button
            onClick={handleNext}
            className="px-8 py-3 bg-emerald-500 text-stone-950 rounded-full font-bold flex items-center justify-center gap-2 hover:bg-emerald-400 hover:scale-105 transition-all w-full md:w-auto group"
          >
            Tiếp Tục <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>
      )}
      
      {/* Visual Timeline Connector (Decorative) */}
      <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-0.5 bg-stone-800 -z-10 opacity-20" />
    </div>
  );
}
