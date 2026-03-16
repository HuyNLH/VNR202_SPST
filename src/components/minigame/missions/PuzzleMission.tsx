'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useMinigame } from '@/context/MinigameContext';
import { useSound } from '@/context/SoundContext';
import { Mission } from '@/types/minigame';
import { CheckCircle2, ArrowRight, RefreshCw, Timer, Eye, AlertTriangle } from 'lucide-react';
import Image from 'next/image';

interface Piece {
  id: number;
  currentPos: number;
  correctPos: number;
}

type Phase = 'preview' | 'playing' | 'solved' | 'failed';

export default function PuzzleMission({ mission }: { mission: Mission }) {
  const { dispatch } = useMinigame();
  const { playSound } = useSound();
  const gridSize = 4;
  const totalPieces = gridSize * gridSize;
  
  const getShuffledPieces = useCallback(() => {
    const newPieces: Piece[] = Array.from({ length: totalPieces }, (_, i) => ({
      id: i,
      currentPos: i,
      correctPos: i,
    }));
    
    const shuffledIndices = Array.from({ length: totalPieces }, (_, i) => i);
    for (let i = shuffledIndices.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledIndices[i], shuffledIndices[j]] = [shuffledIndices[j], shuffledIndices[i]];
    }

    if (shuffledIndices.every((val, index) => val === index)) {
      [shuffledIndices[0], shuffledIndices[1]] = [shuffledIndices[1], shuffledIndices[0]];
    }

    return newPieces.map((piece, index) => ({
      ...piece,
      currentPos: shuffledIndices[index],
    }));
  }, [totalPieces]);

  const [pieces, setPieces] = useState<Piece[]>(getShuffledPieces);
  const [selectedPiece, setSelectedPiece] = useState<number | null>(null);
  const [phase, setPhase] = useState<Phase>('preview');
  const [timeLeft, setTimeLeft] = useState(120);
  const [previewTimeLeft, setPreviewTimeLeft] = useState(30);

  const resetGame = () => {
    playSound('click');
    setPieces(getShuffledPieces());
    setPhase('preview');
    setPreviewTimeLeft(30);
    setTimeLeft(120);
    setSelectedPiece(null);
  };

  useEffect(() => {
    if (phase !== 'preview') return;
    const timer = setInterval(() => {
      setPreviewTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setPhase('playing');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [phase]);

  useEffect(() => {
    if (phase !== 'playing') return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          playSound('failure');
          setPhase('failed');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [phase, playSound]);

  const handlePieceClick = (index: number) => {
    if (phase !== 'playing') return;

    if (selectedPiece === null) {
      setSelectedPiece(index);
    } else {
      const newPieces = [...pieces];
      const tempPos = newPieces[selectedPiece].currentPos;
      newPieces[selectedPiece].currentPos = newPieces[index].currentPos;
      newPieces[index].currentPos = tempPos;

      setPieces(newPieces);
      setSelectedPiece(null);
      playSound('click');

      const solved = newPieces.every(p => p.currentPos === p.correctPos);
      if (solved) {
        playSound('success');
        setPhase('solved');
      }
    }
  };

  const handleNext = () => {
    playSound('click');
    dispatch({ 
      type: 'COMPLETE_MISSION', 
      payload: { score: mission.rewardScore, unlockId: mission.unlockId } 
    });
    dispatch({ type: 'NEXT_MISSION' });
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-4xl mx-auto">
      {/* Header Info */}
      <div className="w-full flex justify-between items-center mb-2 px-4 h-12">
        <AnimatePresence mode="wait">
          {phase === 'preview' ? (
            <motion.div 
              key="prev-timer"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="flex items-center gap-2 text-amber-500 font-bold bg-amber-500/10 px-4 py-2 rounded-full border border-amber-500/20"
            >
              <Eye className="w-5 h-5 animate-pulse" />
              <span>Ghi nhớ ảnh gốc: {previewTimeLeft}s</span>
            </motion.div>
          ) : phase === 'playing' ? (
            <motion.div 
              key="game-timer"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-4 w-full"
            >
              <div className={`flex items-center gap-2 font-mono text-xl ${timeLeft < 20 ? 'text-red-500 animate-pulse' : 'text-emerald-400'}`}>
                <Timer className="w-6 h-6" />
                <span>{formatTime(timeLeft)}</span>
              </div>
              <div className="flex-1 h-3 bg-stone-800 rounded-full overflow-hidden border border-stone-700">
                <motion.div 
                  initial={{ width: '100%' }}
                  animate={{ width: `${(timeLeft / 120) * 100}%` }}
                  className={`h-full ${timeLeft < 20 ? 'bg-red-500' : 'bg-emerald-500'}`}
                />
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>

      <div className="relative">
        <AnimatePresence mode="wait">
          {phase === 'preview' ? (
            <motion.div 
              key="preview-container"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center gap-6"
            >
              <div className="text-center bg-stone-900/80 p-6 rounded-2xl border border-amber-500/30 shadow-2xl flex flex-col items-center gap-4">
                 <div>
                   <p className="text-white text-lg font-bold mb-1 uppercase tracking-tighter">Ghi nhớ chi tiết</p>
                   <p className="text-stone-400 text-xs">Trò chơi sẽ bắt đầu sau ít giây...</p>
                 </div>
                 
                 <button
                   onClick={() => {
                     playSound('click');
                     setPhase('playing');
                     setPreviewTimeLeft(0);
                   }}
                   className="px-6 py-2 bg-amber-500 text-stone-950 rounded-full font-bold text-sm hover:bg-amber-400 hover:scale-105 active:scale-95 transition-all shadow-lg"
                 >
                   Bắt Đầu Ngay
                 </button>
              </div>

              <motion.div 
                key="preview-img"
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                className="relative w-[300px] h-[200px] md:w-[600px] md:h-[400px] rounded-2xl overflow-hidden border-4 border-amber-500 shadow-[0_0_30px_rgba(245,158,11,0.3)] bg-stone-950"
              >
                <Image 
                  src={mission.puzzleImage || '/images/logo.jpg'} 
                  alt="Original" 
                  fill
                  className="object-contain"
                  priority
                />
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key="puzzle-grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid grid-cols-4 gap-1 md:gap-2 bg-stone-800 p-2 rounded-xl shadow-2xl border border-stone-700"
            >
              {Array.from({ length: totalPieces }).map((_, displayIdx) => {
                const piece = pieces.find(p => p.currentPos === displayIdx);
                if (!piece) return <div key={displayIdx} className="w-[70px] h-[70px] md:w-[100px] md:h-[100px] bg-stone-900" />;

                const isSelected = selectedPiece !== null && pieces[selectedPiece].id === piece.id;

                const row = Math.floor(piece.id / gridSize);
                const col = piece.id % gridSize;
                const xOffset = (col / (gridSize - 1)) * 100;
                const yOffset = (row / (gridSize - 1)) * 100;

                return (
                  <motion.div
                    key={piece.id}
                    layoutId={`piece-${piece.id}`}
                    onClick={() => handlePieceClick(pieces.findIndex(p => p.id === piece.id))}
                    className={`relative w-[70px] h-[70px] md:w-[100px] md:h-[100px] rounded-lg cursor-pointer overflow-hidden border-2 transition-transform ${
                      isSelected ? 'border-amber-500 scale-105 z-10 shadow-[0_0_15px_rgba(245,158,11,0.5)]' : 'border-white/5'
                    } ${phase === 'solved' ? 'border-emerald-500/50' : 'hover:border-white/20'}`}
                  >
                    <div 
                      className="absolute inset-0 bg-no-repeat w-full h-full"
                      style={{
                        backgroundImage: `url(${mission.puzzleImage || '/images/logo.jpg'})`,
                        backgroundSize: `${gridSize * 100}% ${gridSize * 100}%`,
                        backgroundPosition: `${xOffset}% ${yOffset}%`,
                        opacity: phase === 'solved' ? 1 : 0.85
                      }}
                    />
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {phase === 'failed' && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-50 rounded-xl overflow-hidden backdrop-blur-md bg-stone-950/80 flex items-center justify-center p-6 text-center"
            >
              <div className="space-y-6">
                <div className="w-20 h-20 bg-red-500/20 text-red-500 rounded-full flex items-center justify-center mx-auto border border-red-500/30">
                  <AlertTriangle className="w-10 h-10" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-3xl font-bold text-white">Hết thời gian!</h3>
                  <p className="text-stone-400">Bạn đã không kịp khôi phục bức ảnh lịch sử.</p>
                </div>
                <button 
                  onClick={resetGame}
                  className="px-8 py-3 bg-red-500 hover:bg-red-400 text-white rounded-full font-bold flex items-center gap-2 mx-auto transition-all hover:scale-105"
                >
                  <RefreshCw className="w-5 h-5" /> Thử Lại
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="w-full flex justify-center mt-4 h-24">
        <AnimatePresence mode="wait">
          {phase === 'solved' ? (
            <motion.div 
              key="solved-anim"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="w-full flex flex-col md:flex-row items-center justify-between gap-6 p-6 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl"
            >
              <div className="flex items-center gap-4 text-emerald-400 font-bold text-xl text-center md:text-left">
                <CheckCircle2 className="w-8 h-8 flex-shrink-0" />
                Tuyệt vời! Bạn đã khôi phục thành công biểu tượng Đảng.
              </div>
              <button
                onClick={handleNext}
                className="px-8 py-3 bg-emerald-500 text-stone-950 rounded-full font-bold flex items-center justify-center gap-2 hover:bg-emerald-400 hover:scale-105 transition-all w-full md:w-auto group shadow-lg"
              >
                Tiếp Tục <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </div>
  );
}
