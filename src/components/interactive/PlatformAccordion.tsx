'use client';

import { useState } from 'react';
import { platformData } from '@/data/platform';
import Accordion from '@/components/ui/Accordion';
import * as motion from 'motion/react-client';
import { staggerContainer, fadeInUp } from '@/lib/animations';
import { Target, ClipboardList, Users, CircleDollarSign, Star } from 'lucide-react';

const ICON_MAP: Record<string, React.ReactNode> = {
  '🎯': <Target className="w-6 h-6" />,
  '📋': <ClipboardList className="w-6 h-6" />,
  '👥': <Users className="w-6 h-6" />,
  '💰': <CircleDollarSign className="w-6 h-6" />,
  '⭐': <Star className="w-6 h-6" />,
};

export default function PlatformAccordion() {
  const [openId, setOpenId] = useState<string | null>(platformData[0]?.id || null);

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      className="space-y-4"
    >
      {platformData.map((item) => (
        <motion.div key={item.id} variants={fadeInUp}>
          <Accordion
            icon={ICON_MAP[item.icon] || item.icon}
            title={item.title}
            content={item.content}
            details={item.details}
            isOpen={openId === item.id}
            onToggle={() => setOpenId(openId === item.id ? null : item.id)}
          />
        </motion.div>
      ))}
    </motion.div>
  );
}
