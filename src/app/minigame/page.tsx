'use client';

import { Sparkles } from 'lucide-react';
import { MinigameProvider } from '@/context/MinigameContext';
import { SoundProvider } from '@/context/SoundContext';
import GameContainer from '@/components/minigame/GameContainer';

export default function MinigamePage() {
  return (
    <MinigameProvider>
      <SoundProvider>
        <div className="min-h-screen bg-stone-950 text-white selection:bg-amber-500/30 font-sans selection:text-amber-200 flex flex-col items-center overflow-hidden">
          {/* Background Effects */}
          <div className="fixed inset-0 pointer-events-none">
            {/* Base Image Background */}
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage: "url('/images/background_screen_minigame.jpg')",
                opacity: 0.35, // Increased from 0.15
                filter: 'brightness(1.2)' // Added brightness boost
              }}
            />
            <div className="absolute inset-0 bg-[url('/images/noise.png')] opacity-[0.03] mix-blend-overlay" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-amber-600/10 blur-[150px] rounded-full -translate-y-1/2 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-burgundy-600/10 blur-[120px] rounded-full -translate-x-1/3 translate-y-1/3 pointer-events-none" />
          </div>

          <main className="flex-1 w-full max-w-7xl mx-auto px-6 py-20 relative z-10 flex flex-col items-center justify-center">
            <GameContainer />
          </main>

          {/* Floating Sparkles decoration */}
          <div className="absolute top-1/4 left-10 animate-bounce duration-[3000ms] opacity-20 pointer-events-none">
            <Sparkles className="w-8 h-8 text-amber-500" />
          </div>
          <div className="absolute bottom-1/4 right-10 animate-bounce duration-[4000ms] opacity-20 pointer-events-none">
            <Sparkles className="w-6 h-6 text-amber-500" />
          </div>
        </div>
      </SoundProvider>
    </MinigameProvider>
  );
}
