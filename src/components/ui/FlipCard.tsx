'use client';

import { useState } from 'react';
import * as motion from 'motion/react-client';
import { fadeInUp } from '@/lib/animations';
import { ArrowRight, ArrowLeft, Sparkles, AlertCircle } from 'lucide-react';

interface FlipCardProps {
  name: string;
  period: string;
  contributions: string[];
  limitations: string[];
}

export default function FlipCard({ name, period, contributions, limitations }: FlipCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className="perspective-1000 w-full group"
    >
      <div
        className={`relative w-full min-h-[540px] cursor-pointer transition-transform duration-700 [transform-style:preserve-3d] ${
          isFlipped ? '[transform:rotateY(180deg)]' : ''
        }`}
        onClick={() => setIsFlipped(!isFlipped)}
      >
        {/* Front */}
        <div className="absolute inset-0 [backface-visibility:hidden] glass-card rounded-3xl p-6 md:p-8 border-white/5 flex flex-col group-hover:border-white/20 transition-colors overflow-hidden">
          <div className="flex items-center justify-between mb-6">
            <span className="text-[10px] uppercase tracking-widest text-amber-500 font-bold bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
              {period}
            </span>
            <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-white/40 group-hover:text-amber-400 group-hover:border-amber-400/30 transition-all">
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>
          <h3 className="font-heading text-2xl md:text-3xl font-bold text-white mb-6 tracking-tight leading-tight uppercase">
            {name}
          </h3>
          <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
            <p className="text-[10px] font-bold text-amber-500 mb-4 uppercase tracking-[0.2em] flex items-center gap-2">
              <Sparkles className="w-3 h-3" />
              Đóng góp nổi bật
            </p>
            <ul className="space-y-4 pb-4">
              {contributions.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-[13px] text-stone-400 leading-relaxed font-sans font-light">
                  <span className="text-red-600 mt-1 shrink-0">✦</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Back */}
        <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)] bg-[#0c0c0c] rounded-3xl p-6 md:p-8 border border-red-900/40 shadow-[0_0_50px_rgba(153,27,27,0.15)] flex flex-col overflow-hidden">
          <div className="flex items-center justify-between mb-6">
            <span className="text-[10px] uppercase tracking-widest text-red-500 font-bold bg-red-500/10 px-3 py-1 rounded-full border border-red-500/20">
              Hạn chế
            </span>
            <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-white/40">
              <ArrowLeft className="w-4 h-4" />
            </div>
          </div>
          <h3 className="font-heading text-2xl md:text-3xl font-bold text-white mb-6 tracking-tight leading-tight uppercase">
            {name}
          </h3>
          <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
            <p className="text-[10px] font-bold text-red-500 mb-4 uppercase tracking-[0.2em] flex items-center gap-2">
              <AlertCircle className="w-3 h-3" />
              Những rào cản
            </p>
            <ul className="space-y-4 pb-4">
              {limitations.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-[13px] text-stone-400 leading-relaxed font-sans font-light">
                  <span className="text-red-500 mt-1 shrink-0">•</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
