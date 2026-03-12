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
      viewport={{ once: true, amount: 0.3 }}
      className={`glass-card glass-card-hover rounded-3xl p-8 md:p-10 border-white/5 ${className}`}
    >
      {icon && (
        <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-3xl mb-8 shadow-inner">
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
