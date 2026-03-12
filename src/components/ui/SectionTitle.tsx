'use client';

import * as motion from 'motion/react-client';
import { fadeInUp } from '@/lib/animations';

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  light?: boolean;
}

export default function SectionTitle({ title, subtitle, light = false }: SectionTitleProps) {
  return (
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      className="text-center mb-16 md:mb-24"
    >
      <div className="flex flex-col items-center">
        {/* Decorative Top Line */}
        <div className="w-12 h-1 bg-gradient-to-r from-red-600 to-amber-500 rounded-full mb-6" />
        
        <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 tracking-tight text-white leading-tight">
          {title}
        </h2>
        
        {subtitle && (
          <p className="text-stone-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed font-light font-sans">
            {subtitle}
          </p>
        )}
      </div>
    </motion.div>
  );
}
