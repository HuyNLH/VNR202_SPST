'use client';

import * as motion from 'motion/react-client';
import { fadeInUp } from '@/lib/animations';

interface InfoCardProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
  className?: string;
}

export default function InfoCard({ icon, title, description, className = '' }: InfoCardProps) {
  return (
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      whileHover={{ 
        y: -12, 
        scale: 1.02,
        boxShadow: "0 20px 40px rgba(0,0,0,0.4), 0 0 20px rgba(255,255,255,0.05)"
      }}
      viewport={{ once: true, amount: 0.3 }}
      className={`group glass-card rounded-3xl p-8 md:p-10 border-white/5 transition-colors duration-500 hover:border-white/20 ${className}`}
    >
      {icon && (
        <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-3xl mb-8 shadow-inner transition-all duration-500 group-hover:bg-white/10 group-hover:scale-110 group-hover:border-white/30 group-hover:rotate-3">
          {icon}
        </div>
      )}
      <h3 className="font-heading text-2xl font-bold text-white mb-4 tracking-tight leading-tight">
        {title}
      </h3>
      <p className="text-stone-400 leading-relaxed text-base font-sans font-light">
        {description}
      </p>
    </motion.div>
  );
}
