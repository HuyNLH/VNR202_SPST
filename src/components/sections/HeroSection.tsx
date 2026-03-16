'use client';

import * as motion from 'motion/react-client';
import { SECTION_IDS } from '@/lib/constants';
import { fadeInUp, staggerContainer } from '@/lib/animations';

export default function HeroSection() {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      window.scrollTo({
        top: el.offsetTop - 80,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section
      id={SECTION_IDS.HERO}
      className="relative min-h-[100vh] flex items-center justify-center overflow-hidden bg-burgundy-900"
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url('/images/background.png')`,
        backgroundSize: '100% 100%',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >

      <div className="relative z-10 standard-frame text-center py-20 md:py-24 lg:py-32">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center"
        >
          {/* Tagline */}
          <motion.div
            variants={fadeInUp}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse" />
            <span className="text-stone-400 text-[10px] md:text-sm uppercase tracking-[0.4em] font-medium font-sans">
              Hành trình Lịch sử Đảng Cộng sản Việt Nam
            </span>
          </motion.div>

          {/* Main Title */}
          <motion.div variants={fadeInUp} className="relative mb-8">
            <h1 className="font-heading text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-extrabold text-white leading-tight tracking-tighter">
              BƯỚC NGOẶT
              <span className="block mt-4 py-2 bg-gradient-to-r from-amber-400 via-amber-200 to-amber-500 bg-clip-text text-transparent text-glow-gold">
                02/1930
              </span>
            </h1>
          </motion.div>

          {/* Subtitle */}
          <motion.p
            variants={fadeInUp}
            className="text-stone-400 text-lg md:text-2xl max-w-3xl mx-auto mb-12 leading-relaxed font-light font-sans"
          >
            Nghiên cứu về sự ra đời của Đảng Cộng sản Việt Nam và Cương lĩnh chính trị đầu tiên — 
            Ánh sáng mở ra con đường cứu nước đúng đắn cho dân tộc.
          </motion.p>

          {/* Buttons */}
          <motion.div
            variants={fadeInUp}
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
          >
            <button
              onClick={() => scrollTo(SECTION_IDS.PROBLEM)}
              className="group relative px-10 py-4 bg-white text-stone-950 rounded-2xl font-bold text-sm uppercase tracking-widest overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95 shadow-[0_0_40px_rgba(255,255,255,0.15)]"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="relative z-10 group-hover:text-white transition-colors">Khám phá ngay</span>
            </button>
            <button
              onClick={() => scrollTo(SECTION_IDS.COMPARISON)}
              className="group px-10 py-4 border border-white/20 text-white rounded-2xl font-bold text-sm uppercase tracking-widest hover:border-amber-400/50 hover:text-amber-400 transition-all duration-300 active:scale-95 backdrop-blur-sm"
            >
              So sánh sự kiện
            </button>
          </motion.div>
        </motion.div>
      </div>

      {/* Decorative side text */}
      <div className="absolute left-10 top-1/2 -rotate-90 origin-left hidden xl:block">
        <span className="text-[10px] uppercase tracking-[1em] text-white/20 font-sans">
          EDUCATIONAL EXPERIENCE
        </span>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2"
      >
        <div className="flex flex-col items-center gap-4">
          <span className="text-[10px] uppercase tracking-[0.3em] text-stone-500 font-sans font-bold">Cuộn để xem</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="w-1 h-12 bg-gradient-to-b from-amber-500/50 to-transparent rounded-full"
          />
        </div>
      </motion.div>
    </section>
  );
}
