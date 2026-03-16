'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useMinigame } from '@/context/MinigameContext';
import { useSound } from '@/context/SoundContext';
import { Mission, ConnectorNode } from '@/types/minigame';
import {
  CheckCircle2, ArrowRight, RefreshCw, Timer, Zap,
  ShieldAlert, Radio, Landmark, MapPin
} from 'lucide-react';

interface ActiveNode extends ConnectorNode {
  isConnected: boolean;
}

export default function ConnectorMission({ mission }: { mission: Mission }) {
  const { dispatch } = useMinigame();
  const { playSound } = useSound();
  const gridSize = mission.gridSize || 5;

  const [nodes, setNodes] = useState<ActiveNode[]>([]);
  const [isSolved, setIsSolved] = useState(false);
  const [timeLeft, setTimeLeft] = useState(240); // User requested 2p (120s) earlier, but maybe more is better. Let's keep 120 as per previous user request or check data.
  // Wait, user request #2 was "tăng thời gian để hoàn thành ghép là 2p". Let's use 120.
  
  const getOutputDirections = (type: string, rotation: number) => {
    let baseDirs: number[] = [];
    switch (type) {
      case 'straight': baseDirs = [0, 2]; break;
      case 'elbow': baseDirs = [0, 1]; break;
      case 'tee': baseDirs = [0, 1, 3]; break;
      case 'cross': baseDirs = [0, 1, 2, 3]; break;
    }
    const offset = Math.round(rotation / 90);
    return baseDirs.map(d => (d + offset) % 4);
  };

  const checkConnections = useCallback((currentNodes: ActiveNode[]): ActiveNode[] => {
    const updatedNodes = currentNodes.map(n => ({ ...n, isConnected: false }));
    const sourceIndex = updatedNodes.findIndex(n => n.isSource);
    if (sourceIndex === -1) return updatedNodes;

    const queue = [sourceIndex];
    updatedNodes[sourceIndex].isConnected = true;

    while (queue.length > 0) {
      const currIdx = queue.shift()!;
      const currNode = updatedNodes[currIdx];
      const currDirs = getOutputDirections(currNode.type, currNode.rotation);

      const neighbors = [
        { dir: 0, idx: currIdx - gridSize, opp: 2 }, // Top
        { dir: 1, idx: (currIdx % gridSize < gridSize - 1) ? currIdx + 1 : -1, opp: 3 }, // Right
        { dir: 2, idx: currIdx + gridSize, opp: 0 }, // Bottom
        { dir: 3, idx: (currIdx % gridSize > 0) ? currIdx - 1 : -1, opp: 1 } // Left
      ];

      for (const neighbor of neighbors) {
        if (neighbor.idx >= 0 && neighbor.idx < updatedNodes.length && !updatedNodes[neighbor.idx].isConnected) {
          if (currDirs.includes(neighbor.dir)) {
            const neighborNode = updatedNodes[neighbor.idx];
            const neighborDirs = getOutputDirections(neighborNode.type, neighborNode.rotation);
            if (neighborDirs.includes(neighbor.opp)) {
              updatedNodes[neighbor.idx].isConnected = true;
              queue.push(neighbor.idx);
            }
          }
        }
      }
    }
    return updatedNodes;
  }, [gridSize]);

  useEffect(() => {
    if (mission.connectorNodes) {
      const initialNodes = mission.connectorNodes.map(node => ({
        ...node,
        rotation: node.isSource ? node.rotation : [0, 90, 180, 270][Math.floor(Math.random() * 4)],
        isConnected: false
      }));
      setNodes(checkConnections(initialNodes));
    }
    setTimeLeft(120); // 2 minutes as requested
  }, [mission.connectorNodes, checkConnections]);

  useEffect(() => {
    if (isSolved || timeLeft <= 0) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          playSound('failure');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [isSolved, playSound]);

  const initGame = useCallback(() => {
    if (!mission.connectorNodes) return;
    const initialNodes = mission.connectorNodes.map(node => ({
      ...node,
      rotation: node.isSource ? node.rotation : [0, 90, 180, 270][Math.floor(Math.random() * 4)],
      isConnected: false
    }));
    setNodes(checkConnections(initialNodes));
    setIsSolved(false);
    setTimeLeft(120);
  }, [mission.connectorNodes, checkConnections]);

  const handleRotate = (index: number) => {
    if (isSolved || timeLeft <= 0) return;
    const newNodes = [...nodes];
    if (newNodes[index].isSource) return;
    
    playSound('click');
    newNodes[index].rotation = (newNodes[index].rotation + 90) % 360;
    const verifiedNodes = checkConnections(newNodes);
    setNodes(verifiedNodes);
    
    const allTargetsConnected = verifiedNodes.filter(n => n.isTarget).every(n => n.isConnected);
    if (allTargetsConnected) {
      playSound('success');
      setIsSolved(true);
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

  const formatTime = (s: number) => `${Math.floor(s/60)}:${(s%60).toString().padStart(2, '0')}`;

  return (
    <div className="flex flex-col items-center gap-4 w-full max-w-4xl mx-auto px-4">
      {/* Visual Instruction Banner */}
      <div className="w-full bg-stone-900/80 border border-stone-800 p-4 rounded-2xl mb-4 flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <Radio className="w-5 h-5 text-amber-500 mt-1 shrink-0 animate-pulse" />
          <p className="text-stone-300 text-sm leading-relaxed">
            <span className="text-amber-500 font-bold uppercase tracking-wider block mb-1">Cơ chế truyền dẫn:</span>
            Xoay các đoạn mạch để tạo đường nối từ <Landmark className="inline w-4 h-4 text-amber-500 mx-1" /> **Trung ương (Hong Kong)** tới **3 Chi bộ** địa phương. Tín hiệu sẽ tự phát sáng khi mạch được thông suốt.
          </p>
        </div>
      </div>

      {/* HUD */}
      <div className="w-full flex justify-between items-center px-2">
        <div className={`flex items-center gap-2 font-mono text-xl ${timeLeft < 20 ? 'text-red-500 animate-pulse' : 'text-amber-500'}`}>
          <Timer className="w-6 h-6 border-2 border-current rounded-full p-0.5" />
          <span className="font-bold">{formatTime(timeLeft)}</span>
        </div>
        <div className="hidden md:flex items-center gap-4">
           {mission.connectorNodes?.filter(n => n.isTarget).map(target => {
             const isConnected = nodes.find(n => n.id === target.id)?.isConnected;
             return (
               <div key={target.id} className={`flex items-center gap-1.5 px-3 py-1 rounded-full border text-[10px] font-bold uppercase tracking-tighter transition-all ${isConnected ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-400' : 'bg-stone-900 border-stone-800 text-stone-600'}`}>
                 <div className={`w-1.5 h-1.5 rounded-full ${isConnected ? 'bg-emerald-400 animate-pulse shadow-[0_0_8px_#34d399]' : 'bg-stone-800'}`} />
                 {target.label}
               </div>
             );
           })}
        </div>
      </div>

      {/* Grid Container */}
      <div className="relative p-3 md:p-6 bg-stone-950/80 rounded-[2.5rem] border-2 border-stone-800 shadow-[0_0_50px_rgba(0,0,0,0.5)]">
        <div 
          className="grid gap-2"
          style={{ gridTemplateColumns: `repeat(${gridSize}, minmax(0, 1fr))` }}
        >
          {nodes.map((node, idx) => (
            <motion.div
              key={node.id}
              onClick={() => handleRotate(idx)}
              whileHover={!isSolved && !node.isSource ? { scale: 1.05, y: -2 } : {}}
              whileTap={!isSolved && !node.isSource ? { scale: 0.95 } : {}}
              className={`relative w-14 h-14 sm:w-16 sm:h-16 md:w-24 md:h-24 flex items-center justify-center rounded-2xl border-2 transition-all duration-300 overflow-visible group ${
                node.isConnected 
                  ? 'border-amber-500/40 bg-stone-900/40 shadow-[inset_0_0_20px_rgba(245,158,11,0.05)]' 
                  : 'border-stone-900 bg-stone-950 hover:border-stone-700/50'
              } ${node.isSource ? 'border-amber-500 shadow-[0_0_30px_rgba(245,158,11,0.2)] z-10' : ''} ${node.isTarget ? 'z-10' : ''}`}
            >
              <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[radial-gradient(#f59e0b_1px,transparent_1px)] bg-[size:10px_10px]" />

              <motion.div 
                animate={{ rotate: node.rotation }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="absolute inset-0 flex items-center justify-center pointer-events-none"
              >
                 {node.type === 'straight' && (
                   <div className={`w-3 md:w-4 h-full relative transition-all duration-500 ${node.isConnected ? 'bg-amber-500 shadow-[0_0_25px_#f59e0b,inset_0_0_10px_white]' : 'bg-stone-800/80 shadow-[inset_0_0_5px_black]'}`}>
                      <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[1px] bg-white/20" />
                   </div>
                 )}
                 {node.type === 'elbow' && (
                   <div className="relative w-full h-full p-0">
                      <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-3 md:w-4 h-1/2 transition-all duration-500 ${node.isConnected ? 'bg-amber-500 shadow-[0_0_25px_#f59e0b,inset_0_0_10px_white]' : 'bg-stone-800/80 shadow-[inset_0_0_5px_black]'}`} />
                      <div className={`absolute right-0 top-1/2 -translate-y-1/2 w-1/2 h-3 md:h-4 rounded-l-none transition-all duration-500 ${node.isConnected ? 'bg-amber-500 shadow-[0_0_25px_#f59e0b,inset_0_0_10px_white]' : 'bg-stone-800/80 shadow-[inset_0_0_5px_black]'}`} />
                      <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 md:w-4 h-3 md:h-4 z-10 transition-all duration-500 ${node.isConnected ? 'bg-amber-500' : 'bg-stone-800/80'}`} />
                   </div>
                 )}
                 {node.type === 'tee' && (
                   <div className="relative w-full h-full">
                      <div className={`absolute top-0 bottom-1/2 left-1/2 -translate-x-1/2 w-3 md:w-4 transition-all duration-500 ${node.isConnected ? 'bg-amber-500 shadow-[0_0_25px_#f59e0b,inset_0_0_10px_white]' : 'bg-stone-800/80 shadow-[inset_0_0_5px_black]'}`} />
                      <div className={`absolute left-0 right-0 top-1/2 -translate-y-1/2 h-3 md:h-4 transition-all duration-500 ${node.isConnected ? 'bg-amber-500 shadow-[0_0_25px_#f59e0b,inset_0_0_10px_white]' : 'bg-stone-800/80 shadow-[inset_0_0_5px_black]'}`} />
                      <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 md:w-4 h-3 md:h-4 z-10 transition-all duration-500 ${node.isConnected ? 'bg-amber-500' : 'bg-stone-800/80'}`} />
                   </div>
                 )}
                 {node.type === 'cross' && (
                   <div className="relative w-full h-full">
                      <div className={`absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-3 md:w-4 transition-all duration-500 ${node.isConnected ? 'bg-amber-500 shadow-[0_0_25px_#f59e0b,inset_0_0_10px_white]' : 'bg-stone-800/80 shadow-[inset_0_0_5px_black]'}`} />
                      <div className={`absolute left-0 right-0 top-1/2 -translate-y-1/2 h-3 md:h-4 transition-all duration-500 ${node.isConnected ? 'bg-amber-500 shadow-[0_0_25px_#f59e0b,inset_0_0_10px_white]' : 'bg-stone-800/80 shadow-[inset_0_0_5px_black]'}`} />
                   </div>
                 )}
              </motion.div>

              {node.isSource && (
                <div className="absolute inset-0 flex items-center justify-center -translate-y-2 md:-translate-y-4">
                  <div className="bg-amber-500 text-stone-950 p-1 md:p-2 rounded-lg shadow-xl animate-bounce">
                    <Landmark className="w-4 h-4 md:w-6 md:h-6" />
                  </div>
                </div>
              )}
              {node.isTarget && (
                <div className={`absolute inset-0 flex items-center justify-center ${node.isConnected ? 'animate-none' : 'animate-pulse'}`}>
                  <div className={`p-1 md:p-2 rounded-lg border-2 transition-all duration-500 ${node.isConnected ? 'bg-emerald-500 border-emerald-400 text-stone-950 shadow-[0_0_20px_rgba(52,211,153,0.5)]' : 'bg-stone-900 border-red-500/50 text-red-500'}`}>
                    <MapPin className="w-3 h-3 md:w-5 md:h-5 " />
                  </div>
                </div>
              )}

              {(node.isSource || node.isTarget) && (
                <div className={`absolute -bottom-5 md:-bottom-7 left-1/2 -translate-x-1/2 whitespace-nowrap text-[9px] md:text-xs font-black tracking-widest px-2 py-0.5 rounded transition-all z-20 ${node.isConnected ? 'text-amber-500 bg-stone-950/90' : 'text-stone-500'}`}>
                  {node.label}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Footer Info */}
      <div className="w-full mt-4 flex justify-between items-center text-[10px] md:text-sm text-stone-500 px-2 font-mono">
         <div className="flex items-center gap-2">
           <Zap className="w-4 h-4 text-emerald-500" /> THÔNG SUỐT: {nodes.filter(n => n.isConnected).length} / {nodes.length}
         </div>
         <div className="flex items-center gap-2">
           MỤC TIÊU: {nodes.filter(n => n.isTarget && n.isConnected).length} / {nodes.filter(n => n.isTarget).length}
         </div>
      </div>

      <div className="w-full flex justify-center mt-6 min-h-[100px]">
        <AnimatePresence mode="wait">
          {timeLeft <= 0 ? (
            <motion.div 
               initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
               className="flex flex-col items-center gap-4 bg-red-500/10 border border-red-500/30 p-8 rounded-3xl text-center backdrop-blur-md"
            >
              <ShieldAlert className="w-12 h-12 text-red-500 mb-2" />
              <h3 className="text-2xl font-bold text-white uppercase tracking-widest">Sóng liên lạc bị mất!</h3>
              <p className="text-stone-400 text-sm max-w-md">Kẻ thù đã dò thấy tần số truyền tín hiệu. Hãy khởi động lại để dùng dải tần số bí mật khác.</p>
              <button 
                onClick={() => {
                  playSound('click');
                  initGame();
                }}
                className="mt-4 px-10 py-4 bg-red-600 hover:bg-red-500 text-white rounded-xl font-bold flex items-center gap-3 transition-all shadow-xl"
              >
                <RefreshCw className="w-5 h-5" /> KHỞI ĐỘNG LẠI
              </button>
            </motion.div>
          ) : isSolved ? (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-stone-950/80 backdrop-blur-sm"
            >
              <motion.div 
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                className="w-full max-w-lg bg-gradient-to-br from-stone-900 to-stone-950 border border-emerald-500/40 rounded-[2.5rem] shadow-2xl p-10 text-center relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-[url('/images/noise.png')] opacity-10 mix-blend-overlay pointer-events-none" />
                
                <motion.div 
                  initial={{ rotate: -180, scale: 0 }}
                  animate={{ rotate: 0, scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 15 }}
                  className="w-24 h-24 rounded-full bg-emerald-500 mx-auto flex items-center justify-center shadow-[0_0_50px_rgba(16,185,129,0.4)] mb-8"
                >
                  <CheckCircle2 className="w-14 h-14 text-stone-950" />
                </motion.div>

                <h4 className="text-emerald-400 font-black text-3xl uppercase tracking-widest mb-4">Cấp báo thành công!</h4>
                <p className="text-stone-300 text-lg mb-10 leading-relaxed">
                  Mạng lưới chi bộ đã được thiết lập hoàn hảo. Sẵn sàng tiếp nhận chỉ thị chiến lược từ Trung ương tại Hương Cảng.
                </p>

                <button
                  onClick={handleNext}
                  className="w-full py-5 bg-emerald-500 text-stone-950 rounded-2xl font-black text-xl flex items-center justify-center gap-3 hover:bg-emerald-400 hover:scale-105 active:scale-95 transition-all shadow-xl group"
                >
                  <span className="uppercase tracking-tighter">Hoàn Tất Sứ Mệnh</span>
                  <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                </button>
              </motion.div>
            </motion.div>
          ) : (
            <p className="text-stone-500 text-sm italic animate-pulse">* Nhấn vào các mạch nối để xoay hướng truyền dẫn tín hiệu...</p>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
