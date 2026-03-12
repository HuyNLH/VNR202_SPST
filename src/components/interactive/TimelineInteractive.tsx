'use client';

import { useState } from 'react';
import { timelineData } from '@/data/timeline';
import TimelineItem from '@/components/ui/TimelineItem';
import { AnimatePresence } from 'motion/react';
import * as motion from 'motion/react-client';

export default function TimelineInteractive() {
  const [activeId, setActiveId] = useState<string | null>(null);

  const activeEvent = timelineData.find((e) => e.id === activeId);

  return (
    <div className="relative">
      {/* Vertical line */}
      <div className="absolute left-[7px] md:left-1/2 md:-translate-x-0.5 top-0 bottom-0 w-0.5 bg-red-200" />

      {timelineData.map((event, index) => (
        <TimelineItem
          key={event.id}
          event={event}
          isActive={activeId === event.id}
          onClick={() => setActiveId(activeId === event.id ? null : event.id)}
          index={index}
        />
      ))}

      {/* Details panel */}
      <AnimatePresence>
        {activeEvent?.details && (
          <motion.div
            key={activeEvent.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="mt-8 bg-gradient-to-br from-amber-50 to-white rounded-2xl p-6 md:p-8 border border-amber-200 shadow-md"
          >
            <p className="text-xs font-semibold uppercase tracking-widest text-red-700 mb-2">
              {activeEvent.year}
            </p>
            <h4 className="font-heading text-xl font-bold text-stone-800 mb-3">{activeEvent.title}</h4>
            <p className="text-stone-700 leading-relaxed">{activeEvent.details}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
