'use client';

import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { GameState, ScreenType } from '@/types/minigame';
import { GAME_CHAPTERS } from '@/data/minigame/chapters';

// Initial state
const initialState: GameState = {
  currentScreen: 'start',
  currentChapterId: null,
  currentMissionIndex: 0,
  totalScore: 0,
  unlockedArchives: [],
  completedChapters: [],
  chapterPlayCounts: {}
};

// Actions
export type ActionType = 
  | { type: 'SET_SCREEN'; payload: ScreenType }
  | { type: 'START_CHAPTER'; payload: string }
  | { type: 'COMPLETE_MISSION'; payload: { score: number; unlockId?: string } }
  | { type: 'NEXT_MISSION' }
  | { type: 'RESET_GAME' };

// Reducer
function gameReducer(state: GameState, action: ActionType): GameState {
  switch (action.type) {
    case 'SET_SCREEN':
      return { ...state, currentScreen: action.payload };
    case 'START_CHAPTER':
      return { ...state, currentChapterId: action.payload, currentMissionIndex: 0, currentScreen: 'gameplay' };
    case 'COMPLETE_MISSION':
      const isFirstPlay = !state.completedChapters.includes(state.currentChapterId || '');
      const newScore = isFirstPlay ? state.totalScore + action.payload.score : state.totalScore;
      
      const newArchives = action.payload.unlockId && !state.unlockedArchives.includes(action.payload.unlockId)
        ? [...state.unlockedArchives, action.payload.unlockId]
        : state.unlockedArchives;
      return { ...state, totalScore: newScore, unlockedArchives: newArchives };
    case 'NEXT_MISSION':
      // Move to next mission or end chapter
      const chapter = GAME_CHAPTERS.find(c => c.id === state.currentChapterId);
      if (!chapter) return state;
      
      const newMissionIndex = state.currentMissionIndex + 1;
      if (newMissionIndex >= chapter.missions.length) {
        // Chapter complete
        const currentPlayCount = state.chapterPlayCounts[chapter.id] || 0;
        const newPlayCounts = { 
          ...state.chapterPlayCounts, 
          [chapter.id]: currentPlayCount + 1 
        };

        const newCompleted = state.completedChapters.includes(chapter.id) 
          ? state.completedChapters 
          : [...state.completedChapters, chapter.id];
          
        return { 
          ...state, 
          completedChapters: newCompleted,
          chapterPlayCounts: newPlayCounts,
          currentScreen: 'chapter_select' 
        };
      } else {
        return { ...state, currentMissionIndex: newMissionIndex };
      }
    case 'RESET_GAME':
      return initialState;
    default:
      return state;
  }
}

// Context
interface MinigameContextProps {
  state: GameState;
  dispatch: React.Dispatch<ActionType>;
}

const MinigameContext = createContext<MinigameContextProps | undefined>(undefined);

export function MinigameProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  return (
    <MinigameContext.Provider value={{ state, dispatch }}>
      {children}
    </MinigameContext.Provider>
  );
}

export function useMinigame() {
  const context = useContext(MinigameContext);
  if (context === undefined) {
    throw new Error('useMinigame must be used within a MinigameProvider');
  }
  return context;
}
