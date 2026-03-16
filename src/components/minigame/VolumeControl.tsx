'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX, Volume1 } from 'lucide-react';
import { useSound } from '@/context/SoundContext';
import { useState } from 'react';

export default function VolumeControl() {
  const { bgmVolume, setBgmVolume, isBgmMuted, toggleBgmMute, playSound } = useSound();
  const [isHovered, setIsHovered] = useState(false);

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setBgmVolume(value);
    if (value > 0 && isBgmMuted) {
      toggleBgmMute();
    }
  };

  return (
    <div 
      className="relative flex items-center gap-2"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, width: 0, x: 20 }}
            animate={{ opacity: 1, width: 100, x: 0 }}
            exit={{ opacity: 0, width: 0, x: 20 }}
            className="overflow-hidden bg-stone-900/90 border border-amber-500/20 px-3 py-2 rounded-xl backdrop-blur-xl shadow-2xl flex items-center"
          >
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={isBgmMuted ? 0 : bgmVolume}
              onChange={handleVolumeChange}
              className="w-full h-1 bg-stone-700 rounded-lg appearance-none cursor-pointer accent-amber-500"
            />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => {
          playSound('click');
          toggleBgmMute();
        }}
        className={`p-2.5 rounded-2xl border transition-all duration-300 shadow-2xl backdrop-blur-xl ${
          isBgmMuted 
            ? 'bg-red-500/10 border-red-500/30 text-red-500' 
            : 'bg-stone-900/90 border-amber-500/20 text-amber-500 hover:border-amber-500/50'
        }`}
      >
        {isBgmMuted || bgmVolume === 0 ? (
          <VolumeX className="w-5 h-5" />
        ) : bgmVolume < 0.5 ? (
          <Volume1 className="w-5 h-5" />
        ) : (
          <Volume2 className="w-5 h-5" />
        )}
      </motion.button>
    </div>
  );
}
