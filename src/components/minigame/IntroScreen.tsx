'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Terminal, ArrowRight } from 'lucide-react';
import { useMinigame } from '@/context/MinigameContext';
import { useSound } from '@/context/SoundContext';

// Typewriter Component for realistic terminal feel
function TypewriterEffect({ text, delay = 0, onComplete, className }: {
  text: string;
  delay?: number;
  onComplete?: () => void;
  className?: string;
}) {
  const [displayText, setDisplayText] = useState('');
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const startTimeout = setTimeout(() => setStarted(true), delay * 1000);
    return () => clearTimeout(startTimeout);
  }, [delay]);

  useEffect(() => {
    if (!started) return;

    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex <= text.length) {
        setDisplayText(text.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(interval);
        if (onComplete) onComplete();
      }
    }, 30); // Speed of typing

    return () => clearInterval(interval);
  }, [started, text, onComplete]);

  return <span className={className}>{displayText}</span>;
}

export default function IntroScreen() {
  const { dispatch } = useMinigame();
  const { playSound, stopSound } = useSound();
  const [textStage, setTextStage] = useState(0);
  const [showButton, setShowButton] = useState(false);

  const texts = [
    "Khởi động hệ thống lưu trữ Archivist-OS...",
    "Phát hiện gián đoạn dữ liệu tại Mốc thời gian: 1930.",
    "Cảnh báo: Dữ liệu về sự kiện thành lập Đảng Cộng sản Việt Nam đang bị phân mảnh.",
    "Bắt buộc khôi phục lại 5 khối dữ liệu chính (Chapters) để sửa chữa tiến trình lịch sử.",
    "Hệ thống yêu cầu xác nhận từ nhân sự..."
  ];

  const handleLineComplete = useCallback(() => {
    // Current line finished - stop the sound immediately
    stopSound('loading_intro');

    if (textStage < texts.length - 1) {
      setTimeout(() => {
        // Before starting next line - start sound again
        playSound('loading_intro');
        setTextStage(prev => prev + 1);
      }, 500);
    } else {
      // Last line done - increment one more to lock all text as static
      setTimeout(() => {
        setTextStage(prev => prev + 1);
        setShowButton(true);
      }, 200);
    }
  }, [textStage, texts.length, stopSound, playSound]);

  // Logic to play sound on mount for the first line
  useEffect(() => {
    playSound('loading_intro');
    
    return () => {
      stopSound('loading_intro');
    };
  }, [playSound, stopSound]);

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col justify-center min-h-[70vh]">
      <div
        className="relative rounded-3xl border border-stone-800 p-8 md:p-12 font-mono text-sm md:text-lg overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] min-h-[500px] flex flex-col"
        style={{
          backgroundImage: "linear-gradient(to bottom, rgba(28, 25, 23, 0.8), rgba(28, 25, 23, 0.7)), url('/images/background_intro_minigame.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Decorative Grid Overlay */}
        <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#f59e0b_1px,transparent_1px),linear-gradient(to_bottom,#f59e0b_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />

        {/* Terminal Header */}
        <div className="flex items-center justify-between mb-10 pb-5 border-b border-stone-800/50 relative z-10">
          <div className="flex items-center gap-3">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500/20" />
              <div className="w-3 h-3 rounded-full bg-amber-500/20" />
              <div className="w-3 h-3 rounded-full bg-emerald-500/20" />
            </div>
            <span className="text-stone-500 font-bold tracking-widest text-xs ml-2">ARCHIVIST-OS v2.0.5</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-stone-600 font-bold tracking-widest">
            <span className="animate-pulse w-2 h-2 rounded-full bg-emerald-500" />
            SYSTEM SECURE
          </div>
        </div>

        {/* Text Area */}
        <div className="space-y-6 flex-1 relative z-10">
          {texts.map((text, idx) => (
            idx <= textStage && (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className={`flex items-start gap-4 ${idx === 2 || idx === 3 ? 'text-amber-500 drop-shadow-[0_0_8px_rgba(245,158,11,0.2)]' : 'text-emerald-400 drop-shadow-[0_0_8px_rgba(52,211,153,0.1)]'
                  }`}
              >
                <span className="text-stone-600 shrink-0 font-bold mt-1">{'>'}</span>
                <p className="leading-relaxed font-medium">
                  {idx < textStage ? (
                    text
                  ) : (
                    <TypewriterEffect 
                      text={text} 
                      onComplete={handleLineComplete}
                    />
                  )}
                  {idx === textStage && !showButton && (
                    <motion.span
                      animate={{ opacity: [0, 1, 0] }}
                      transition={{ duration: 0.8, repeat: Infinity }}
                      className="inline-block w-2 h-5 ml-1 bg-current align-middle"
                    />
                  )}
                </p>
              </motion.div>
            )
          ))}

          {showButton && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 20
              }}
              className="pt-12 flex justify-center"
            >
              <button
                onClick={() => {
                  playSound('click');
                  dispatch({ type: 'SET_SCREEN', payload: 'chapter_select' });
                }}
                className="group relative px-10 py-4 bg-stone-100 hover:bg-white text-stone-950 font-bold rounded-xl flex items-center gap-3 transition-all transform hover:scale-105 shadow-[0_0_30px_rgba(255,255,255,0.1)] active:scale-95"
              >
                Xác Nhận & Tiếp Cận Dữ Liệu
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>
          )}
        </div>

        {/* Corner Decorations */}
        <div className="absolute top-0 left-0 w-20 h-20 bg-gradient-to-br from-amber-500/5 to-transparent pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-20 h-20 bg-gradient-to-tl from-emerald-500/5 to-transparent pointer-events-none" />
      </div>
    </div>
  );
}
