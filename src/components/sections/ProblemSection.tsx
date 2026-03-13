'use client';

import { useRef } from 'react';
import * as motion from 'motion/react-client';
import { useScroll, useTransform } from 'motion/react';
import { ShieldAlert, Flame, Compass } from 'lucide-react';
import SectionTitle from '@/components/ui/SectionTitle';
import InfoCard from '@/components/ui/InfoCard';
import { SECTION_IDS } from '@/lib/constants';
import { staggerContainer, fadeInUp } from '@/lib/animations';

export default function ProblemSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [0.95, 1]);

  return (
    <section
      ref={containerRef}
      id={SECTION_IDS.PROBLEM}
      className="py-32 md:py-48 bg-obsidian relative overflow-hidden"
    >
      {/* Cinematic Background Elements */}
      <motion.div 
        style={{ y: y1 }}
        className="absolute top-1/4 left-0 w-full h-[500px] bg-gradient-to-b from-red-900/5 via-transparent to-transparent -skew-y-6 pointer-events-none" 
      />
      <motion.div 
        style={{ scale: scale, opacity: opacity }}
        className="absolute -top-24 -left-24 w-96 h-96 bg-red-900/10 rounded-full blur-[120px] pointer-events-none" 
      />

      {/* Background Decorative Text */}
      <motion.div 
        style={{ y: y2, opacity }}
        className="absolute top-40 right-10 select-none pointer-events-none transition-opacity duration-1000 hidden lg:block"
      >
        <span className="text-[12rem] font-bold text-white/[0.02] leading-none tracking-tighter">
          1858
        </span>
      </motion.div>

      <motion.div 
        style={{ opacity, scale }}
        className="standard-frame relative z-10"
      >
        <div className="grid md:grid-cols-12 gap-12 items-start">
          {/* Header Area */}
          <div className="md:col-span-12 lg:col-span-5 mb-12 lg:mb-0">
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="text-left"
            >
              <div className="w-12 h-1 bg-gradient-to-r from-red-600 to-amber-500 rounded-full mb-8" />
              <h2 className="font-heading text-5xl md:text-6xl lg:text-7xl font-extrabold text-white mb-4 tracking-tight leading-tight">
                Việt Nam trước <br />
                <span className="bg-gradient-to-r from-amber-400 via-amber-200 to-amber-500 bg-clip-text text-transparent text-glow-gold">
                  bước ngoặt 1930
                </span>
              </h2>
              <p className="text-burgundy-400 font-heading text-2xl md:text-3xl font-bold tracking-wide mb-8">
                Tiếng chuông Cảnh tỉnh
              </p>
              <p className="text-stone-400 text-xl font-light leading-relaxed max-w-xl mb-12">
                Trước năm 1930, Việt Nam chìm trong ách thống trị thực dân. Nhiều phong trào yêu nước đã bùng lên mạnh mẽ nhưng chưa tìm được con đường cứu nước phù hợp với yêu cầu của thời đại.
              </p>

              {/* Historical Image Integration */}
              <motion.div
                initial={{ opacity: 0, y: 30, rotate: -2 }}
                whileInView={{ opacity: 1, y: 0, rotate: -1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                className="relative group mt-8 hidden lg:block"
              >
                <div className="absolute -inset-1 bg-gradient-to-r from-amber-500/20 to-burgundy-500/20 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000" />
                <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                  <img 
                    src="/images/lich-su-viet-nam-tu-nam-1919-den-nam-1930.jpg" 
                    alt="Lịch sử Việt Nam 1919-1930" 
                    className="w-full grayscale h-auto hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <p className="text-[10px] uppercase tracking-widest text-amber-400 font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      Tư liệu lịch sử (1919 — 1930)
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Cards Area - Staggered/Asymmetrical */}
          <div className="md:col-span-12 lg:col-span-7">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="grid gap-8"
            >
              {/* Card 1 - Left Aligned */}
              <motion.div variants={fadeInUp} className="max-w-md lg:ml-0">
                <InfoCard
                  icon={<ShieldAlert className="w-8 h-8 text-red-500" />}
                  title="Ách thống trị thực dân"
                  description="Từ năm 1858, thực dân Pháp nổ súng xâm lược Việt Nam và từng bước áp đặt ách thống trị. Nhân dân chịu cảnh áp bức nặng nề về chính trị, kinh tế, văn hóa."
                />
              </motion.div>

              {/* Card 2 - Right Aligned (Staggered) */}
              <motion.div variants={fadeInUp} className="max-w-md lg:ml-auto">
                <InfoCard
                  icon={<Flame className="w-8 h-8 text-amber-500" />}
                  title="Phong trào yêu nước"
                  description="Các phong trào yêu nước diễn ra liên tục, rộng khắp như Cần Vương, Đông Du, Duy Tân, Việt Nam Quốc dân đảng... Tuy nhiên, các phong trào đều lần lượt thất bại do thiếu đường lối đúng đắn."
                />
              </motion.div>

              {/* Card 3 - Centered Aligned (Transition) */}
              <motion.div variants={fadeInUp} className="max-w-md lg:mx-auto">
                <InfoCard
                  icon={<Compass className="w-8 h-8 text-red-400" />}
                  title="Khủng hoảng đường lối"
                  description="Các khuynh hướng cứu nước trước đó lần lượt thất bại; cách mạng Việt Nam lâm vào bế tắc về đường lối và cần một tổ chức tiên phong đủ sức lãnh đạo."
                />
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Feature Quote Area */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="mt-32 max-w-4xl mx-auto"
        >
          <div className="glass-card rounded-[3rem] p-12 md:p-16 border-white/5 relative overflow-hidden group">
            {/* Glowing aura */}
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-red-600/10 rounded-full blur-[80px] group-hover:bg-red-600/20 transition-all duration-700" />

            <p className="text-2xl md:text-3xl text-stone-200 leading-relaxed text-center font-sans font-extralight italic">
              "Từ thực tiễn đó, lịch sử đặt ra yêu cầu cấp thiết về một con đường cứu nước đúng đắn và một tổ chức tiên phong đủ sức lãnh đạo cách mạng."
            </p>
            <div className="mt-10 flex flex-col items-center">
              <div className="h-px w-20 bg-gradient-to-r from-transparent via-stone-700 to-transparent mb-6" />
              <p className="text-amber-400 font-bold uppercase tracking-[0.4em] text-xs">
                SỨ MỆNH LỊCH SỬ
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
