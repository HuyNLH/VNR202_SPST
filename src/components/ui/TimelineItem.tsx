'use client';

import * as motion from 'motion/react-client';
import { TimelineEvent } from '@/types';
import { cn } from '@/lib/utils';

interface TimelineItemProps {
  event: TimelineEvent;
  isActive: boolean;
  onClick: () => void;
  index: number;
}

export default function TimelineItem({ event, isActive, onClick, index }: TimelineItemProps) {
  const isLeft = index % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "relative flex items-center w-full mb-12 sm:mb-20",
        isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
      )}
    >
      {/* Content */}
      <div className={cn(
        "w-full md:w-5/12 pl-16 md:pl-0",
        isLeft ? 'md:pr-12 md:text-right' : 'md:pl-12 md:text-left'
      )}>
        <button
          onClick={onClick}
          className={cn(
            "group relative w-full text-left md:text-inherit p-8 rounded-3xl transition-all duration-500 glass-card text-stone-100",
            isActive 
              ? "border-amber-400/30 bg-amber-400/5 shadow-[0_0_40px_rgba(251,191,36,0.08)]" 
              : "border-white/5 hover:border-white/20 hover:bg-white/5"
          )}
          aria-expanded={isActive}
        >
          {/* Year Badge */}
          <span
            className={cn(
              "text-[10px] font-bold uppercase tracking-[0.3em] block mb-4",
              isActive ? "text-amber-400" : "text-stone-500 group-hover:text-stone-300 transition-colors"
            )}
          >
            {event.year}
          </span>
          <h4 className={cn(
            "font-heading text-2xl md:text-3xl font-extrabold mb-4 tracking-tight leading-tight transition-colors",
            isActive ? "text-white" : "text-stone-300 group-hover:text-white"
          )}>
            {event.title}
          </h4>
          <p className={cn(
            "text-sm leading-relaxed font-sans font-light transition-colors",
            isActive ? "text-stone-300" : "text-stone-500 group-hover:text-stone-400"
          )}>
            {event.description}
          </p>
          
          {/* Subtle Indicator */}
          {!isActive && (
            <div className="absolute top-8 right-8 text-white/10 group-hover:text-white/30 transition-colors hidden md:block">
              <span className="text-xs uppercase tracking-widest font-bold">Chi tiết ↓</span>
            </div>
          )}
        </button>
      </div>

      {/* Center dot/cue */}
      <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 flex items-center justify-center z-10">
        <div
          className={cn(
            "w-5 h-5 rounded-full border-2 transition-all duration-500 flex items-center justify-center",
            isActive 
              ? "bg-amber-400 border-amber-400 shadow-[0_0_20px_rgba(251,191,36,0.5)] scale-125" 
              : "bg-obsidian border-stone-800"
          )}
        >
          {isActive && <div className="w-1.5 h-1.5 bg-obsidian rounded-full" />}
        </div>
      </div>

      {/* Spacer for opposite side */}
      <div className="hidden md:block w-5/12" />
    </motion.div>
  );
}
