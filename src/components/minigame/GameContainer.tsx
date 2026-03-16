'use client';

import { useState, useEffect } from 'react';
import { useMinigame } from '@/context/MinigameContext';
import { useSound } from '@/context/SoundContext';
import { Database } from 'lucide-react';
import StartScreen from './StartScreen';
import IntroScreen from './IntroScreen';
import ChapterSelect from './ChapterSelect';
import GameplayScreen from './GameplayScreen';
import EndingScreen from './EndingScreen';
import ArchiveModal from './ArchiveModal';
import VolumeControl from './VolumeControl';

export default function GameContainer() {
  const { state } = useMinigame();
  const { playSound, stopAllSounds } = useSound();
  const [isArchiveOpen, setIsArchiveOpen] = useState(false);

  useEffect(() => {
    // Stop all sounds when the entire minigame container unmounts
    // back to the parent page/app
    return () => stopAllSounds();
  }, [stopAllSounds]);

  // Automatically scroll to top when minigame screen changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [state.currentScreen]);

  const renderScreen = () => {
    switch (state.currentScreen) {
      case 'start': return <StartScreen />;
      case 'intro': return <IntroScreen />;
      case 'chapter_select': return <ChapterSelect />;
      case 'gameplay': return <GameplayScreen />;
      case 'ending': return <EndingScreen />;
      default: return <StartScreen />;
    }
  };

  return (
    <div className="w-full relative min-h-[70vh] pb-12 md:pb-8">
      {/* Global Game HUD Info (Hidden on Start/Intro) */}
      {state.currentScreen !== 'start' && state.currentScreen !== 'intro' && (
        <div className="fixed bottom-8 right-8 hidden md:flex flex-col items-end gap-4 z-[100] animate-in fade-in slide-in-from-bottom-4 duration-500">
           {/* Desktop HUD (Bottom Right) */}
           <div className="flex items-center gap-4">
              <VolumeControl />
              <div className="bg-stone-900/95 border border-emerald-500/20 px-5 py-2.5 rounded-2xl text-stone-300 shadow-2xl backdrop-blur-xl flex items-center gap-2 text-sm font-mono whitespace-nowrap">
                 <span>Điểm Số:</span>
                 <span className="text-emerald-400 font-bold bg-emerald-500/20 px-2 py-0.5 rounded-lg">{state.totalScore}</span>
              </div>
           </div>

           <button 
             onClick={() => {
               playSound('click');
               setIsArchiveOpen(true);
             }}
             className="bg-stone-900/95 hover:bg-stone-800 border border-amber-500/20 hover:border-amber-500/50 px-5 py-2.5 rounded-2xl text-stone-300 shadow-2xl backdrop-blur-xl flex items-center gap-2 transition-all group cursor-pointer text-sm font-mono"
           >
             <Database className="w-4 h-4 text-amber-500 group-hover:animate-pulse" />
             <span>Kho Lưu Trữ</span>
             <span className="text-amber-400 font-bold bg-amber-500/20 px-2 py-0.5 rounded-lg">{state.unlockedArchives.length}</span>
           </button>
        </div>
      )}

      {/* Mobile HUD (Top Right, fixed below header) */}
      {state.currentScreen !== 'start' && state.currentScreen !== 'intro' && (
        <div className="fixed top-24 right-4 flex md:hidden flex-col items-end gap-2 z-[90] animate-in fade-in slide-in-from-top-4 duration-500">
           <div className="flex items-center gap-2">
              <div className="bg-stone-900/95 border border-emerald-500/20 px-3 py-1.5 rounded-xl text-stone-300 shadow-xl backdrop-blur-md flex items-center gap-1.5 text-[10px] font-mono">
                 <span className="text-emerald-400 font-bold">{state.totalScore}</span>
              </div>
              <button 
                onClick={() => {
                  playSound('click');
                  setIsArchiveOpen(true);
                }}
                className="bg-stone-900/95 border border-amber-500/20 px-3 py-1.5 rounded-xl text-stone-300 shadow-xl backdrop-blur-md flex items-center gap-1.5 font-mono text-[10px]"
              >
                <Database className="w-3 h-3 text-amber-500" />
                <span className="text-amber-400 font-bold">{state.unlockedArchives.length}</span>
              </button>
           </div>
           <div className="scale-90 origin-top-right">
              <VolumeControl />
           </div>
        </div>
      )}

      <div className="pt-4 md:pt-8 w-full">
        {renderScreen()}
      </div>

      <ArchiveModal isOpen={isArchiveOpen} onClose={() => setIsArchiveOpen(false)} />
    </div>
  );
}
