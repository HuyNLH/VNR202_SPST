'use client';

import * as motion from 'motion/react-client';
import { TimelineEvent } from '@/types';
import { cn } from '@/lib/utils';
import { Flame } from 'lucide-react';

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
        "relative flex items-center w-full mb-12 sm:mb-20 group",
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

      <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 flex items-center justify-center z-10">
        <div className="relative flex items-center justify-center">
          {/* Flame Glow Backdrop */}
          <motion.div
            animate={isActive ? {
              scale: [1, 1.5, 1.2],
              opacity: [0.5, 0.8, 0.5],
            } : {}}
            transition={{ repeat: Infinity, duration: 2 }}
            className={cn(
              "absolute inset-0 blur-xl rounded-full transition-all duration-500",
              isActive ? "bg-orange-500/40" : "bg-transparent group-hover:bg-orange-500/20"
            )}
          />
          
          <motion.div
            animate={isActive || true ? {
              y: [0, -2, 0],
              scale: [1, 1.05, 1],
            } : {}}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            className={cn(
              "relative flex items-center justify-center transition-all duration-500 rounded-full bg-obsidian z-20",
              isActive ? "scale-150 p-1" : "scale-100 group-hover:scale-125 p-0.5"
            )}
          >
            <Flame 
              className={cn(
                "w-6 h-6 transition-all duration-500 fill-current",
                isActive 
                  ? "text-orange-500 drop-shadow-[0_0_8px_rgba(249,115,22,0.8)]" 
                  : "text-stone-800 group-hover:text-orange-600 group-hover:drop-shadow-[0_0_5px_rgba(234,88,12,0.5)] shadow-none"
              )} 
            />
            
            {/* Inner core flame for active state */}
            {isActive && (
              <motion.div
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ repeat: Infinity, duration: 1 }}
                className="absolute inset-0 flex items-center justify-center p-1"
              >
                <Flame className="w-6 h-6 text-amber-300 fill-current blur-[2px]" />
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>

      {/* Spacer for opposite side */}
      <div className="hidden md:block w-5/12" />
    </motion.div>
  );
}
