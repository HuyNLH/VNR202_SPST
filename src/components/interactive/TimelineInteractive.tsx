'use client';

import { useState } from 'react';
import { timelineData } from '@/data/timeline';
import TimelineItem from '@/components/ui/TimelineItem';
import { AnimatePresence } from 'motion/react';
import * as motion from 'motion/react-client';
import Modal from '@/components/ui/Modal';

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

      <Modal
        isOpen={!!activeId}
        onClose={() => setActiveId(null)}
        title={activeEvent?.title || ''}
        subtitle={activeEvent?.year}
      >
        <p>{activeEvent?.details}</p>
      </Modal>
    </div>
  );
}
