'use client';

import { cn } from '@/lib/utils';

interface QuizOptionProps {
  id: string;
  text: string;
  isSelected: boolean;
  isCorrect?: boolean;
  isIncorrect?: boolean;
  onSelect: () => void;
  disabled?: boolean;
}

export default function QuizOption({
  text,
  isSelected,
  isCorrect,
  isIncorrect,
  onSelect,
  disabled,
}: QuizOptionProps) {
  return (
    <button
      onClick={onSelect}
      disabled={disabled}
      className={cn(
        "w-full text-left p-6 rounded-2xl border transition-all duration-300 group relative overflow-hidden",
        "font-sans text-sm md:text-base leading-relaxed",
        !isSelected && !isCorrect && !isIncorrect && "border-white/5 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.04] text-stone-400 hover:text-stone-200",
        isSelected && !isCorrect && !isIncorrect && "border-white/40 bg-white/10 text-white shadow-lg scale-[1.01]",
        isCorrect && "border-emerald-500/50 bg-emerald-500/10 text-emerald-400 shadow-[0_0_30px_rgba(16,185,129,0.15)]",
        isIncorrect && "border-red-500/50 bg-red-500/10 text-red-400 shadow-[0_0_30px_rgba(239,68,68,0.15)]",
        disabled && "cursor-default"
      )}
    >
      <div className="flex items-center gap-6 relative z-10">
        <div className={cn(
          "w-8 h-8 rounded-full border flex items-center justify-center text-[10px] font-bold transition-all duration-300 shrink-0",
          !isSelected && !isCorrect && !isIncorrect && "border-stone-700 bg-stone-900 text-stone-500 group-hover:border-stone-500 group-hover:text-stone-300",
          isSelected && !isCorrect && !isIncorrect && "border-white bg-white text-obsidian",
          isCorrect && "border-emerald-500 bg-emerald-500 text-obsidian",
          isIncorrect && "border-red-500 bg-red-500 text-obsidian"
        )}>
           {isCorrect ? '✓' : isIncorrect ? '✕' : ''}
        </div>
        <span className="flex-1 font-medium">{text}</span>
      </div>
      
      {/* Decorative accent for selected/correct/incorrect */}
      {(isSelected || isCorrect || isIncorrect) && (
        <div className={cn(
          "absolute inset-0 opacity-10",
          isCorrect ? "bg-emerald-500" : isIncorrect ? "bg-red-500" : "bg-white"
        )} />
      )}
    </button>
  );
}
