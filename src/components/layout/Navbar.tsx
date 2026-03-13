'use client';

import { useState, useEffect, useRef } from 'react';
import { SECTION_IDS } from '@/lib/constants';
import { useScrollSpy } from '@/hooks/useScrollSpy';
import { cn } from '@/lib/utils';
import * as motion from 'motion/react-client';
import { Menu, ChevronDown, Volume2, VolumeX, Play, Pause } from 'lucide-react';
import MegaMenu from './MegaMenu';
import MobileMenu from './MobileMenu';

const MAIN_NAV = [
  { id: SECTION_IDS.HERO, label: 'Trang chủ', hasMega: false },
  { id: 'content', label: 'Nội dung', hasMega: true },
  { id: 'audio-narrative', label: 'Thuyết minh', isAudio: true },
  { id: SECTION_IDS.QUIZ, label: 'Trắc nghiệm', hasMega: false },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMegaOpen, setIsMegaOpen] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [manualActiveId, setManualActiveId] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  const sectionIds = Object.values(SECTION_IDS);
  const scrollActiveId = useScrollSpy(sectionIds, 120);
  
  const activeId = manualActiveId || scrollActiveId;

  // Force scroll to top on refresh
  useEffect(() => {
    window.scrollTo(0, 0);
    // Some browsers need a slight delay
    const timer = setTimeout(() => window.scrollTo(0, 0), 10);
    return () => clearTimeout(timer);
  }, []);

  // Handle scroll state for pill transformation
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleAudio = () => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(e => console.log("Audio play failed:", e));
    }
    setIsPlaying(!isPlaying);
  };

  const scrollTo = (id: string) => {
    if (id === 'audio-narrative') {
      toggleAudio();
      return;
    }
    setManualActiveId(id);
    setIsMegaOpen(false);
    setIsMobileOpen(false);

    const el = document.getElementById(id);
    if (el) {
      const offset = 100;
      const elementPosition = el.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });

      setTimeout(() => setManualActiveId(null), 1000);
    }
  };

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-[80] flex justify-center p-4 md:p-6 pointer-events-none">
        <motion.nav
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className={cn(
            "relative pointer-events-auto flex items-center gap-3 md:gap-4 transition-all duration-500 ease-in-out px-4 py-2 md:px-6 md:py-3 lg:px-8 lg:py-4",
            isScrolled 
              ? "bg-burgundy-950/85 backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.6)] border border-white/10 rounded-full" 
              : "bg-stone-950/20 md:bg-white/5 border border-white/5 md:backdrop-blur-md rounded-2xl md:rounded-[2.5rem]"
          )}
        >
          {/* Logo/Brand */}
          <button
            onClick={() => scrollTo(SECTION_IDS.HERO)}
            className="flex items-center gap-4 group px-2"
          >
            <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-burgundy-900 border border-amber-400/30 flex items-center justify-center overflow-hidden transition-all duration-500 group-hover:border-amber-400/60 group-hover:scale-105 shadow-xl">
              <img src="/images/logo.jpg" alt="Logo" className="w-full h-full object-cover" />
            </div>
            <div className="flex flex-col items-start">
              <span className="font-heading text-lg md:text-xl font-bold text-white tracking-tight leading-none">
                Lịch sử <span className="text-amber-400 font-extrabold text-glow-gold">Đảng</span>
              </span>
              <span className="text-[9px] uppercase tracking-[0.3em] text-white/40 font-bold hidden sm:block mt-0.5">
                Mốc son 1930
              </span>
            </div>
          </button>

          {/* Vertical Divider */}
          <div className="w-px h-8 bg-white/10 mx-4 hidden md:block" />

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-2">
            {MAIN_NAV.map((item) => (
              <div 
                key={item.id}
                className="relative"
                onMouseEnter={() => item.hasMega && setIsMegaOpen(true)}
              >
                <button
                  onClick={() => item.isAudio ? toggleAudio() : !item.hasMega && scrollTo(item.id)}
                  className={cn(
                    "relative px-4 lg:px-6 py-2.5 text-[12px] lg:text-[13px] font-bold uppercase tracking-[0.1em] lg:tracking-[0.15em] transition-all duration-300 rounded-full flex items-center gap-2",
                    (item.isAudio && isPlaying) || (item.hasMega ? isMegaOpen : activeId === item.id)
                      ? "text-white" 
                      : "text-stone-400 hover:text-stone-100"
                  )}
                >
                  {item.isAudio && (
                    <div className="relative">
                      {isPlaying ? (
                        <div className="flex gap-0.5 items-end h-3 mb-0.5">
                          <motion.div animate={{ height: [4, 12, 6, 10, 4] }} transition={{ repeat: Infinity, duration: 0.8 }} className="w-0.5 bg-amber-400" />
                          <motion.div animate={{ height: [8, 4, 12, 6, 8] }} transition={{ repeat: Infinity, duration: 0.6 }} className="w-0.5 bg-amber-400" />
                          <motion.div animate={{ height: [6, 10, 4, 12, 6] }} transition={{ repeat: Infinity, duration: 0.7 }} className="w-0.5 bg-amber-400" />
                        </div>
                      ) : (
                        <Volume2 className="w-4 h-4 opacity-60" />
                      )}
                    </div>
                  )}
                  <span className="relative z-10">{item.label}</span>
                  {item.hasMega && (
                    <ChevronDown className={cn("w-4 h-4 transition-transform duration-300 opacity-60", isMegaOpen && "rotate-180 opacity-100")} />
                  )}
                  {((item.isAudio && isPlaying) || (item.hasMega ? isMegaOpen : activeId === item.id)) && (
                    <motion.div
                      layoutId="active-pill"
                      className={cn(
                        "absolute inset-0 border border-white/10 rounded-full shadow-inner",
                        item.isAudio ? "bg-amber-400/10" : "bg-white/10"
                      )}
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                </button>
              </div>
            ))}
          </div>

          <audio 
            ref={audioRef}
            src="/audio/thuyet-minh.mp3"
            onEnded={() => setIsPlaying(false)}
            preload="auto"
          />

          {/* Mega Menu Dropdown - Now centered and matching Navbar width */}
          <MegaMenu 
            isOpen={isMegaOpen} 
            onClose={() => setIsMegaOpen(false)} 
            onItemClick={scrollTo}
          />

          {/* Mobile Menu Trigger */}
          <button
            onClick={() => setIsMobileOpen(true)}
            className="md:hidden p-3 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors shadow-lg"
          >
            <Menu className="w-6 h-6" />
          </button>
        </motion.nav>
      </div>

      {/* Mobile Drawer */}
      <MobileMenu 
        isOpen={isMobileOpen} 
        onClose={() => setIsMobileOpen(false)} 
        onItemClick={scrollTo} 
      />
    </>
  );
}
