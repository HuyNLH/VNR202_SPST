'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, Trophy } from 'lucide-react';
import { useMinigame } from '@/context/MinigameContext';
import { useSound } from '@/context/SoundContext';

export default function StartScreen() {
  const { dispatch } = useMinigame();
  const { playSound, stopSound } = useSound();

  useEffect(() => {
    // Ensure BGM stops if we reset to start screen
    stopSound('bgm');
  }, [stopSound]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center pb-10">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative group mb-12"
      >
        <div className="absolute inset-0 bg-amber-500/20 blur-3xl rounded-full" />
        <div className="w-32 h-32 md:w-40 md:h-40 bg-stone-900 border border-amber-500/30 rounded-[2rem] flex items-center justify-center shadow-2xl relative z-10 overflow-hidden backdrop-blur-xl">
          <div className="absolute inset-0 bg-[url('/images/noise.png')] opacity-20 mix-blend-overlay pointer-events-none" />
          <Trophy className="w-16 h-16 text-amber-500 z-10" />
        </div>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-5xl md:text-7xl font-heading font-bold text-white mb-8 tracking-tight leading-tight"
      >
        Hồ Sơ Bí Mật
        <div className="mt-4 text-amber-500">Mốc Son 1930</div>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="text-stone-400 max-w-xl text-lg mb-14"
      >
        Một trung tâm lưu trữ lịch sử quốc gia bị nhiễu loạn dữ liệu.
        Trong vai Người lưu trữ (Archivist), bạn hãy khôi phục lại dòng thời gian
        về sự ra đời của Đảng Cộng sản Việt Nam.
      </motion.p>

      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => {
          playSound('intr_click');
          // Add delay to allow the click sound to play before transition
          setTimeout(() => {
            dispatch({ type: 'SET_SCREEN', payload: 'intro' });
          }, 500);
        }}
        className="relative px-12 py-5 group overflow-hidden rounded-xl"
      >
        {/* Animated AI Glow Border */}
        <div className="absolute inset-0 bg-gradient-to-r from-amber-500 via-stone-900 to-amber-500 opacity-20 group-hover:opacity-40 transition-opacity duration-500" />
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          className="absolute -inset-[100%] bg-[conic-gradient(from_0deg,transparent_0deg,transparent_150deg,rgba(245,158,11,0.4)_180deg,transparent_210deg)] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        />

        {/* Glassmorphism Background */}
        <div className="absolute inset-[1px] bg-stone-950/90 rounded-xl backdrop-blur-xl" />
        <div className="absolute inset-0 border border-amber-500/20 rounded-xl group-hover:border-amber-500/50 transition-colors duration-500" />

        {/* Fututistic Grid Pattern Background */}
        <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#f59e0b_1px,transparent_1px),linear-gradient(to_bottom,#f59e0b_1px,transparent_1px)] bg-[size:10px_10px]" />

        {/* Enhanced Scanning Line */}
        <motion.div
          animate={{ top: ['-100%', '200%'] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="absolute left-0 right-0 h-1/2 bg-gradient-to-b from-transparent via-amber-500/10 to-transparent pointer-events-none"
        />

        {/* Decorative Corners */}
        <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-amber-500/60 rounded-tl-[4px]" />
        <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-amber-500/60 rounded-tr-[4px]" />
        <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-amber-500/60 rounded-bl-[4px]" />
        <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-amber-500/60 rounded-br-[4px]" />

        <div className="relative flex items-center gap-5 text-amber-500 font-bold text-xl tracking-[0.2em] uppercase">
          <span className="drop-shadow-[0_0_10px_rgba(245,158,11,0.2)] group-hover:text-white transition-colors duration-300">
            Khởi Động Hệ Thống
          </span>
          <div className="relative w-10 h-10 rounded-full border border-amber-500/30 flex items-center justify-center bg-amber-500/5 group-hover:bg-amber-500 group-hover:text-stone-950 transition-all duration-500 shadow-[0_0_15px_rgba(245,158,11,0.1)] group-hover:shadow-[0_0_20px_rgba(245,158,11,0.4)]">
            <div className="absolute inset-0 rounded-full animate-ping bg-amber-500/10 group-hover:hidden" />
            <Play className="w-5 h-5 fill-current ml-1" />
          </div>
        </div>
      </motion.button>
    </div>
  );
}
