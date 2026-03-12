'use client';

import * as motion from 'motion/react-client';
import { ShieldAlert, Flame, Compass } from 'lucide-react';
import SectionTitle from '@/components/ui/SectionTitle';
import InfoCard from '@/components/ui/InfoCard';
import { SECTION_IDS } from '@/lib/constants';
import { staggerContainer, fadeInUp } from '@/lib/animations';

export default function ProblemSection() {
  return (
    <section 
      id={SECTION_IDS.PROBLEM} 
      className="py-32 md:py-48 bg-obsidian relative overflow-hidden"
    >
      {/* Cinematic Background Elements */}
      <div className="absolute top-1/4 left-0 w-full h-[500px] bg-gradient-to-b from-red-900/5 via-transparent to-transparent -skew-y-6 pointer-events-none" />
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-red-900/10 rounded-full blur-[120px] pointer-events-none" />
      
      {/* Background Decorative Text */}
      <div className="absolute top-40 right-10 select-none pointer-events-none transition-opacity duration-1000 hidden lg:block">
        <span className="text-[12rem] font-bold text-white/[0.02] leading-none tracking-tighter">
          1858
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid md:grid-cols-12 gap-12 items-start">
          {/* Header Area */}
          <div className="md:col-span-12 lg:col-span-5 mb-12 lg:mb-0">
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-left"
            >
              <div className="w-12 h-1 bg-gradient-to-r from-red-600 to-amber-500 rounded-full mb-8" />
              <h2 className="font-heading text-5xl md:text-6xl lg:text-7xl font-extrabold text-white mb-8 tracking-tight leading-tight">
                Tiếng chuông <br />
                <span className="bg-gradient-to-r from-red-600 to-amber-400 bg-clip-text text-transparent">Cảnh tỉnh</span>
              </h2>
              <p className="text-stone-400 text-xl font-light leading-relaxed max-w-xl">
                Bối cảnh lịch sử đầy biến động: Tại sao dân tộc cần một con đường mới? Nhìn lại tình hình đất nước trước bước ngoặt 1930.
              </p>
            </motion.div>
          </div>

          {/* Cards Area - Staggered/Asymmetrical */}
          <div className="md:col-span-12 lg:col-span-7">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              className="grid gap-8"
            >
              {/* Card 1 - Left Aligned */}
              <motion.div variants={fadeInUp} className="max-w-md lg:ml-0">
                <InfoCard
                  icon={<ShieldAlert className="w-8 h-8 text-red-500" />}
                  title="Ách thống trị thực dân"
                  description="Từ 1858, thực dân Pháp xâm lược và áp đặt ách thống trị. Nhân dân chịu cảnh áp bức nặng nề về chính trị, kinh tế, văn hóa."
                />
              </motion.div>

              {/* Card 2 - Right Aligned (Staggered) */}
              <motion.div variants={fadeInUp} className="max-w-md lg:ml-auto">
                <InfoCard
                  icon={<Flame className="w-8 h-8 text-amber-500" />}
                  title="Phong trào yêu nước"
                  description="Cần Vương, Đông Du, Duy Tân... Tuy nhiên, các phong trào đều lần lượt thất bại do thiếu đường lối đúng đắn."
                />
              </motion.div>

              {/* Card 3 - Centered Aligned (Transition) */}
              <motion.div variants={fadeInUp} className="max-w-md lg:mx-auto">
                <InfoCard
                  icon={<Compass className="w-8 h-8 text-red-400" />}
                  title="Khủng hoảng đường lối"
                  description="Các khuuy hướng phong kiến và tư sản đều không giải quyết được vấn đề dân tộc, gây lâm vào tình trạng bế tắc."
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
          viewport={{ once: true, amount: 0.3 }}
          className="mt-32 max-w-4xl mx-auto"
        >
          <div className="glass-card rounded-[3rem] p-12 md:p-16 border-white/5 relative overflow-hidden group">
             {/* Glowing aura */}
             <div className="absolute -top-24 -right-24 w-64 h-64 bg-red-600/10 rounded-full blur-[80px] group-hover:bg-red-600/20 transition-all duration-700" />
             
             <p className="text-2xl md:text-3xl text-stone-200 leading-relaxed text-center font-sans font-extralight italic">
              "Trước tình hình đó, lịch sử đặt ra yêu cầu bức thiết: tìm được một con đường cách mạng đúng đắn, với một giai cấp lãnh đạo tiên tiến."
            </p>
            <div className="mt-10 flex flex-col items-center">
              <div className="h-px w-20 bg-gradient-to-r from-transparent via-stone-700 to-transparent mb-6" />
              <p className="text-amber-400 font-bold uppercase tracking-[0.4em] text-xs">
                SỨ MỆNH LỊCH SỬ — NGUYỄN ÁI QUỐC
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
