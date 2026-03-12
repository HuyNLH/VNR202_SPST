'use client';

import SectionTitle from '@/components/ui/SectionTitle';
import FlipCard from '@/components/ui/FlipCard';
import { movementsData } from '@/data/movements';
import { SECTION_IDS } from '@/lib/constants';
import * as motion from 'motion/react-client';
import { fadeInUp, staggerContainer } from '@/lib/animations';

export default function PrePartyMovementsSection() {
  return (
    <section 
      id={SECTION_IDS.MOVEMENTS} 
      className="py-32 md:py-48 bg-obsidian relative overflow-hidden"
    >
      {/* Cinematic Layering */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(185,28,28,0.05),transparent_70%)]" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <SectionTitle
          title="Thử nghiệm & Hy sinh"
          subtitle="Trước 1930, dân tộc ta đã không ngừng đấu tranh qua nhiều khuynh hướng, nhấn vào từng thẻ để chiêm nghiệm những bài học lịch sử."
          light
        />

        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12"
        >
          {movementsData.map((movement, index) => (
            <motion.div 
              key={movement.id}
              variants={fadeInUp}
              className={index % 2 === 0 ? "lg:mt-12" : "lg:mb-12"}
            >
              <FlipCard
                name={movement.name}
                period={movement.period}
                contributions={movement.contributions}
                limitations={movement.limitations}
              />
            </motion.div>
          ))}
        </motion.div>
        
        {/* Abstract connector or decorative line */}
        <div className="mt-32 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>
    </section>
  );
}
