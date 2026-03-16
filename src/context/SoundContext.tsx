'use client';

import React, { createContext, useContext, useState, useCallback, useRef } from 'react';

type SoundType = 'intr_click' | 'loading_intro' | 'click' | 'success' | 'failure' | 'bgm' | 'victory';

interface SoundContextType {
  playSound: (type: SoundType) => void;
  stopSound: (type: SoundType) => void;
  stopAllSounds: () => void;
  isBgmMuted: boolean;
  toggleBgmMute: () => void;
  bgmVolume: number;
  setBgmVolume: (volume: number) => void;
}

const SoundContext = createContext<SoundContextType | undefined>(undefined);

const SOUND_CONFIG: Record<SoundType, { url: string, volume: number, loop?: boolean }> = {
  intr_click: { url: '/audio/intro_click.mp3', volume: 1.0 },
  loading_intro: { url: '/audio/loading_intro.mp3', volume: 0.4, loop: true },
  click: { url: '/audio/click.mp3', volume: 0.8 },
  success: { url: '/audio/success.mp3', volume: 1.0 },
  failure: { url: '/audio/failure.mp3', volume: 0.5 },
  bgm: { url: '/audio/noi_vong_tay_lon.mp3', volume: 0.5, loop: true },
  victory: { url: '/audio/victory_game.mp3', volume: 1.0 },
};

export const SoundProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isBgmMuted, setIsBgmMuted] = useState(false);
  const [bgmVolume, setBgmVolume] = useState(1.0);
  const audioCache = useRef<Record<string, HTMLAudioElement>>({});

  const isBgmMutedRef = useRef(isBgmMuted);
  const bgmVolumeRef = useRef(bgmVolume);

  React.useEffect(() => {
    isBgmMutedRef.current = isBgmMuted;
    bgmVolumeRef.current = bgmVolume;
  }, [isBgmMuted, bgmVolume]);

  const playSound = useCallback((type: SoundType) => {
    const config = SOUND_CONFIG[type];
    if (!config) return;

    if (!audioCache.current[type]) {
      const audio = new Audio(config.url);
      if (config.loop) audio.loop = true;
      audioCache.current[type] = audio;
    }

    const audio = audioCache.current[type];

    // Volume Logic: Only BGM is affected by the volume control
    if (type === 'bgm') {
      audio.volume = isBgmMutedRef.current ? 0 : config.volume * bgmVolumeRef.current;
    } else {
      audio.volume = config.volume; // SFX always at full config volume
    }

    if (!config.loop) {
      audio.currentTime = 0;
    } else if (audio.paused) {
      audio.currentTime = 0;
    }

    if (audio.paused) {
      audio.play().catch(_err => {
        // Silent catch for autoplay restrictions
      });
    }
  }, []);

  const stopSound = useCallback((type: SoundType) => {
    if (!audioCache.current[type]) return;
    const audio = audioCache.current[type];
    audio.pause();
    audio.currentTime = 0;
  }, []);

  const stopAllSounds = useCallback(() => {
    Object.values(audioCache.current).forEach(audio => {
      audio.pause();
      audio.currentTime = 0;
    });
  }, []);

  // Update BGM volume when control changes
  React.useEffect(() => {
    const bgmAudio = audioCache.current['bgm'];
    if (bgmAudio) {
      bgmAudio.volume = isBgmMuted ? 0 : SOUND_CONFIG.bgm.volume * bgmVolume;
    }
  }, [isBgmMuted, bgmVolume]);

  const toggleBgmMute = () => setIsBgmMuted(prev => !prev);

  return (
    <SoundContext.Provider value={{
      playSound,
      stopSound,
      stopAllSounds,
      isBgmMuted,
      toggleBgmMute,
      bgmVolume,
      setBgmVolume
    }}>
      {children}
    </SoundContext.Provider>
  );
};

export const useSound = () => {
  const context = useContext(SoundContext);
  if (context === undefined) {
    throw new Error('useSound must be used within a SoundProvider');
  }
  return context;
};
