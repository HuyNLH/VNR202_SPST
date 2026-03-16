'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Lock, Unlock, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useMinigame } from '@/context/MinigameContext';
import { useSound } from '@/context/SoundContext';
import { GAME_CHAPTERS } from '@/data/minigame/chapters';

export default function ChapterSelect() {
  const { state, dispatch } = useMinigame();
  const { playSound, stopSound } = useSound();

  useEffect(() => {
    playSound('bgm');
  }, [playSound]);

  const handleSelectChapter = (chapterId: string) => {
    playSound('click');
    dispatch({ type: 'START_CHAPTER', payload: chapterId });
  };

  const topChapters = GAME_CHAPTERS.slice(0, 3);
  const bottomChapters = GAME_CHAPTERS.slice(3);

  return (
    <div className="w-full max-w-5xl mx-auto py-12 pb-24">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-heading font-bold text-white mb-4">
          Khôi Phục Khối Dữ Liệu
        </h2>
        <p className="text-stone-400 text-lg">
          Chọn một chương để bắt đầu khôi phục sự kiện lịch sử.
        </p>
      </div>

      <div className="flex flex-col gap-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {topChapters.map((chapter, idx) => (
            <ChapterCard
              key={chapter.id}
              chapter={chapter}
              idx={idx}
              state={state}
              onSelect={handleSelectChapter}
            />
          ))}
        </div>

        <div className="flex flex-wrap justify-center gap-6">
          {bottomChapters.map((chapter, idx) => (
            <div key={chapter.id} className="w-full md:w-[calc(33.333%-1rem)]">
              <ChapterCard
                chapter={chapter}
                idx={idx + 3}
                state={state}
                onSelect={handleSelectChapter}
              />
            </div>
          ))}
        </div>
      </div>

      {state.completedChapters.length === GAME_CHAPTERS.length && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-16 flex justify-center"
        >
          <button
            onClick={() => {
              playSound('click');
              dispatch({ type: 'SET_SCREEN', payload: 'ending' });
            }}
            className="px-8 py-4 bg-emerald-500 text-stone-950 font-bold rounded-full text-lg shadow-[0_0_30px_rgba(16,185,129,0.3)] hover:scale-105 transition-all"
          >
            Trích Xuất Báo Cáo Cuối Cùng
          </button>
        </motion.div>
      )}
    </div>
  );
}

function ChapterCard({ chapter, idx, state, onSelect }: {
  chapter: any,
  idx: number,
  state: any,
  onSelect: (id: string) => void
}) {
  const isCompleted = state.completedChapters.includes(chapter.id);
  const isLocked = idx > 0 && !state.completedChapters.includes(GAME_CHAPTERS[idx - 1].id);
  const playCount = state.chapterPlayCounts[chapter.id] || 0;
  const isLimitReached = playCount >= 2;
  const canPlay = !isLocked && !isLimitReached;

  return (
    <motion.button
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: idx * 0.1 }}
      whileHover={canPlay ? { y: -5, scale: 1.02 } : {}}
      onClick={() => canPlay && onSelect(chapter.id)}
      disabled={!canPlay}
      className={`text-left relative flex flex-col h-full w-full bg-stone-900/50 p-8 rounded-3xl border transition-all duration-300 overflow-hidden group ${!canPlay
          ? 'border-stone-800 opacity-60 cursor-not-allowed'
          : isCompleted
            ? 'border-emerald-500/30 hover:border-emerald-500/60'
            : 'border-amber-500/30 hover:border-amber-500/60 hover:bg-stone-800/80 cursor-pointer shadow-lg hover:shadow-amber-500/10'
        }`}
    >
      {!isLocked && (
        <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      )}

      <div className="flex items-center justify-between mb-6 relative z-10">
        <span className={`text-sm font-bold tracking-widest uppercase ${isCompleted ? 'text-emerald-400' : isLocked ? 'text-stone-500' : 'text-amber-500'
          }`}>
          Chapter 0{chapter.number}
        </span>
        <div className="flex flex-col items-end gap-1">
          {isCompleted ? (
            <CheckCircle2 className="w-6 h-6 text-emerald-500" />
          ) : isLocked ? (
            <Lock className="w-5 h-5 text-stone-500" />
          ) : (
            <Unlock className="w-5 h-5 text-amber-500/50" />
          )}
          <span className={`text-[10px] font-mono ${isLimitReached ? 'text-red-500' : 'text-stone-500'}`}>
            Lượt chơi: {playCount}/2
          </span>
        </div>
      </div>

      <h3 className="text-2xl font-bold text-white mb-2 relative z-10">{chapter.title}</h3>
      <p className="text-stone-400 text-sm mb-6 flex-1 relative z-10">{chapter.description}</p>

      <div className="mt-auto flex items-center gap-2 pt-4 border-t border-white/5 relative z-10">
        {isLimitReached ? (
          <span className="text-red-500 font-semibold text-sm">Đã hết lượt chơi</span>
        ) : isCompleted ? (
          <span className="text-emerald-400 font-semibold text-sm">Đã khôi phục - Chơi lại (không tính điểm)</span>
        ) : isLocked ? (
          <span className="text-stone-500 font-semibold text-sm line-clamp-2">Yêu cầu hoàn thành Chapter 0{idx}</span>
        ) : (
          <span className="text-amber-400 font-semibold text-sm flex items-center gap-2 group-hover:gap-3 transition-all">
            Bắt đầu nhiệm vụ <ArrowRight className="w-4 h-4" />
          </span>
        )}
      </div>
    </motion.button>
  );
}
