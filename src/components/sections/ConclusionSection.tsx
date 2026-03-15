'use client';

import { SECTION_IDS } from '@/lib/constants';
import * as motion from 'motion/react-client';
import { fadeInUp } from '@/lib/animations';

export default function ConclusionSection() {
  const currentYear = new Date().getFullYear();

  return (
    <section
      id={SECTION_IDS.CONCLUSION}
      className="relative py-32 md:py-48 overflow-hidden bg-obsidian"
    >
      {/* Decorative background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-px bg-gradient-to-r from-transparent via-amber-500/20 to-transparent" />
      
      <div className="standard-frame relative z-10 text-center">
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <div className="inline-block p-4 rounded-3xl bg-amber-400/5 border border-amber-400/10 mb-10 shadow-inner">
             <span className="text-3xl">🕊️</span>
          </div>
          
          <h2 className="font-heading text-4xl md:text-6xl font-extrabold text-white mb-10 tracking-tight leading-tight">
            Một bước ngoặt, <br />
            <span className="bg-gradient-to-r from-amber-400 to-amber-200 bg-clip-text text-transparent">mở đường tương lai.</span>
          </h2>
          
          <div className="glass-card rounded-[2.5rem] p-10 md:p-14 border-white/5 shadow-2xl relative overflow-hidden group hover:border-amber-400/20 transition-all duration-700">
            {/* Subtle light sweep */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.03] to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            
            <p className="text-xl md:text-2xl text-stone-300 leading-relaxed font-sans font-light mb-8">
              Sự ra đời của Đảng Cộng sản Việt Nam vào tháng 02/1930 không chỉ là một sự kiện chính trị đơn thuần, 
              mà là ánh bình minh chấm dứt đêm dài khủng hoảng về đường lối cứu nước.
            </p>
            <p className="text-lg text-stone-500 leading-relaxed font-sans font-extralight italic">
              Kể từ đây, vận mệnh dân tộc đã gắn liền với sự lãnh đạo của Đảng, 
              mở ra kỷ nguyên độc lập, tự do và chủ nghĩa xã hội cho Việt Nam.
            </p>
          </div>
          
          <div className="mt-20 pt-10 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-4">
              <p className="text-stone-500 text-xs font-bold uppercase tracking-[0.3em]">
                Dự án giáo dục lịch sử — {currentYear}
              </p>
            </div>
            
            <div className="flex gap-10">
              <button onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})} className="text-stone-500 hover:text-amber-400 text-xs font-bold uppercase tracking-widest transition-colors">
                Lên đầu trang ↑
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
