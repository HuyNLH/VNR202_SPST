'use client';

import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, RefreshCw, AlertTriangle, ShieldCheck } from 'lucide-react';
import { useMinigame } from '@/context/MinigameContext';
import { useSound } from '@/context/SoundContext';
import { GAME_CHAPTERS } from '@/data/minigame/chapters';
import { Chapter, Mission } from '@/types/minigame';

export default function EndingScreen() {
  const { state, dispatch } = useMinigame();
  const { playSound, stopSound } = useSound();

  const maxScore = GAME_CHAPTERS.reduce((acc: number, chapter: Chapter) => {
    return acc + chapter.missions.reduce((mAcc: number, m: Mission) => mAcc + m.rewardScore, 0);
  }, 0);
  const scorePercentage = (state.totalScore / maxScore) * 100;
  const percentage = Math.min(100, Math.round(scorePercentage));

  useEffect(() => {
    // Stop BGM to focus on ending sounds
    stopSound('bgm');

    if (scorePercentage >= 50) {
      playSound('victory');
    } else {
      playSound('failure');
    }
  }, [scorePercentage, playSound, stopSound]);

  let endingTitle = "Hồ Sơ Không Đầy Đủ";
  let endingDesc = "Dòng thời gian vẫn còn nhiều khoảng trống. Cần thu thập thêm dữ liệu.";
  let Icon = AlertTriangle;
  let color = "text-amber-500";
  let bgColors = "from-amber-500/20 to-orange-600/20";

  if (percentage >= 85) {
    endingTitle = "Lưu Trữ Gia Khách Danh (Perfect Historian)";
    endingDesc = "Xuất sắc! Bạn đã khôi phục hoàn chỉnh dòng thời gian lịch sử về sự ra đời của Đảng.";
    Icon = Trophy;
    color = "text-amber-400";
    bgColors = "from-amber-400/20 to-yellow-600/20";
  } else if (percentage >= 50) {
    endingTitle = "Dữ Liệu Cơ Bản Được Phục Hồi";
    endingDesc = "Bạn đã khôi phục được dòng thời gian chính, nhưng một số chi tiết vẫn còn thiếu sót.";
    Icon = ShieldCheck;
    color = "text-emerald-400";
    bgColors = "from-emerald-400/20 to-teal-600/20";
  } else {
    color = "text-red-500";
    bgColors = "from-red-500/20 to-rose-600/20";
  }

  return (
    <div className="w-full max-w-3xl mx-auto py-12 flex flex-col items-center text-center">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className={`w-32 h-32 rounded-full bg-gradient-to-br ${bgColors} flex items-center justify-center p-1 mb-8 shadow-2xl relative`}
      >
        <div className="absolute inset-0 bg-current opacity-20 blur-xl rounded-full" />
        <div className="w-full h-full bg-stone-900 rounded-full flex items-center justify-center backdrop-blur-md z-10">
          <Icon className={`w-14 h-14 ${color}`} />
        </div>
      </motion.div>

      <motion.h2
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className={`text-4xl md:text-5xl font-heading font-bold mb-4 ${color}`}
      >
        {endingTitle}
      </motion.h2>

      <motion.p
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-stone-400 text-lg md:text-xl max-w-xl mb-12"
      >
        {endingDesc}
      </motion.p>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="flex gap-12 sm:gap-24 mb-16"
      >
        <div className="flex flex-col items-center">
          <span className="text-stone-500 uppercase tracking-widest text-xs font-bold mb-2">Độ Chính Xác</span>
          <span className="text-4xl font-mono text-white">{percentage}%</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-stone-500 uppercase tracking-widest text-xs font-bold mb-2">Thành Tựu</span>
          <span className="text-4xl font-mono text-white">{state.unlockedArchives.length}/{GAME_CHAPTERS.length}</span>
        </div>
      </motion.div>

      <motion.button
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.7 }}
        onClick={() => {
          playSound('click');
          dispatch({ type: 'RESET_GAME' });
        }}
        className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-bold rounded-full text-lg flex items-center gap-3 transition-all group"
      >
        <RefreshCw className="w-5 h-5 group-hover:-rotate-180 transition-transform duration-500" />
        Phục Hồi Lại Từ Đầu
      </motion.button>
    </div>
  );
}
