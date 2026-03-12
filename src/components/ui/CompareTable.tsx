'use client';

import { cn } from '@/lib/utils';
import { ComparisonRow } from '@/types';
import * as motion from 'motion/react-client';
import { fadeInUp, staggerContainer } from '@/lib/animations';

interface CompareTableProps {
  data: ComparisonRow[];
}

export default function CompareTable({ data }: CompareTableProps) {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      className="space-y-12 max-w-5xl mx-auto"
    >
      {data.map((item, idx) => (
        <motion.div
           key={idx}
           variants={fadeInUp}
           className="relative group lg:px-12"
        >
          {/* Criterion Floating Label */}
          <div className="absolute -top-4 left-4 lg:left-0 z-20">
            <div className="px-4 py-1.5 rounded-full bg-stone-900 border border-white/10 shadow-xl overflow-hidden">
               <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-amber-400 relative z-10">
                 Tiêu chí: {item.criteria}
               </span>
               <div className="absolute inset-0 bg-gradient-to-r from-amber-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">
            {/* Connector center dot (decorative) */}
            <div className="hidden md:flex absolute inset-0 items-center justify-center z-10 pointer-events-none">
               <div className="w-10 h-10 rounded-full bg-obsidian border border-white/10 flex items-center justify-center shadow-2xl">
                  <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
               </div>
               <div className="w-px h-full bg-gradient-to-b from-transparent via-white/5 to-transparent absolute" />
            </div>

            {/* Before (Left side) */}
            <div className="group/side">
               <div className="glass-card rounded-[2.5rem] p-8 md:p-10 border-white/5 bg-white/[0.01] hover:bg-white/[0.03] transition-all duration-500 hover:scale-[1.02] h-full flex flex-col justify-center">
                  <h5 className="text-[10px] font-bold uppercase tracking-widest text-red-500/60 mb-6 flex items-center gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]" />
                    Trước khi có Đảng
                  </h5>
                  <p className="text-lg text-stone-400 leading-relaxed font-sans font-light group-hover/side:text-stone-300 transition-colors">
                    {item.before}
                  </p>
               </div>
            </div>

            {/* After (Right side) */}
            <div className="group/side">
               <div className="glass-card rounded-[2.5rem] p-8 md:p-10 border-amber-400/10 bg-amber-400/[0.02] hover:bg-amber-400/[0.05] transition-all duration-500 hover:scale-[1.02] h-full flex flex-col justify-center shadow-[0_0_50px_rgba(251,191,36,0.02)]">
                  <h5 className="text-[10px] font-bold uppercase tracking-widest text-amber-400 mb-6 flex items-center gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shadow-[0_0_12px_rgba(251,191,36,0.6)] animate-pulse" />
                    Sau khi có Đảng
                  </h5>
                  <p className="text-xl text-stone-100 leading-relaxed font-sans font-medium group-hover/side:text-white transition-colors">
                    {item.after}
                  </p>
               </div>
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
