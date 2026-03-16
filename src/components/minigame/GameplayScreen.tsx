'use client';

import { useMinigame } from '@/context/MinigameContext';
import { GAME_CHAPTERS } from '@/data/minigame/chapters';
import DecisionMission from '@/components/minigame/missions/DecisionMission';
import TimelineMission from '@/components/minigame/missions/TimelineMission';
import DecoderMission from '@/components/minigame/missions/DecoderMission';
import PuzzleMission from '@/components/minigame/missions/PuzzleMission';
import ConnectorMission from '@/components/minigame/missions/ConnectorMission';
import { motion } from 'framer-motion';

export default function GameplayScreen() {
  const { state } = useMinigame();
  
  const chapter = GAME_CHAPTERS.find(c => c.id === state.currentChapterId);
  if (!chapter) return null;
  
  const mission = chapter.missions[state.currentMissionIndex];
  if (!mission) return null;

  const renderMissionComponent = () => {
    switch (mission.type) {
      case 'decision':
        return <DecisionMission mission={mission} />;
      case 'timeline':
        return <TimelineMission mission={mission} />;
      case 'decoder':
        return <DecoderMission mission={mission} />;
      case 'puzzle':
        return <PuzzleMission mission={mission} />;
      case 'connector':
        return <ConnectorMission mission={mission} />;
      default:
        return <div className="text-white">Loại nhiệm vụ không hợp lệ</div>;
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto py-8 pb-20">
      {/* Chapter Header */}
      <div className="text-center mb-12">
        <span className="text-amber-500 font-bold tracking-widest uppercase text-sm mb-2 block">
          Chapter 0{chapter.number}: {chapter.period}
        </span>
        <h2 className="text-3xl md:text-5xl font-heading font-bold text-white mb-4">
          {chapter.title}
        </h2>
        <p className="text-stone-400 max-w-2xl mx-auto">
          {chapter.description}
        </p>
      </div>

      {/* Mission Container */}
      <motion.div
        key={mission.id} // Re-animate when mission changes
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-stone-900/60 border border-stone-800 rounded-3xl p-6 md:p-12 shadow-2xl backdrop-blur-xl relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-transparent pointer-events-none" />
        
        <div className="relative z-10 pr-16 md:pr-0">
          <div className="mb-8 border-b border-stone-800 pb-6">
            <h3 className="text-2xl font-bold text-white mb-2">{mission.title}</h3>
            <p className="text-stone-400 text-lg">{mission.instructions}</p>
          </div>

          {renderMissionComponent()} {/* Render mission using the helper function */}
        </div>
      </motion.div>
    </div>
  );
}
