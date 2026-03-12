'use client';

import { useState, useEffect, useRef } from 'react';
import { NAV_ITEMS } from '@/lib/constants';
import { useScrollSpy } from '@/hooks/useScrollSpy';
import { cn } from '@/lib/utils';
import * as motion from 'motion/react-client';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [manualActiveId, setManualActiveId] = useState<string | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  
  const sectionIds = NAV_ITEMS.map((item) => item.id);
  const scrollActiveId = useScrollSpy(sectionIds, 120);
  
  const activeId = manualActiveId || scrollActiveId;

  // Handle scroll state for background styling
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Center active item in scrollable nav
  useEffect(() => {
    if (scrollContainerRef.current) {
      const activeElement = scrollContainerRef.current.querySelector(`[data-id="${activeId}"]`);
      if (activeElement) {
        activeElement.scrollIntoView({
          behavior: 'smooth',
          inline: 'center',
          block: 'nearest'
        });
      }
    }
  }, [activeId]);

  const scrollTo = (id: string) => {
    setManualActiveId(id);

    const el = document.getElementById(id);
    if (el) {
      const offset = 80;
      const elementPosition = el.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });

      // Reset manual override after scroll ends
      const handleScrollEnd = () => {
        setManualActiveId(null);
        window.removeEventListener('scrollend', handleScrollEnd);
      };
      window.addEventListener('scrollend', handleScrollEnd);
      setTimeout(() => setManualActiveId(null), 1000);
    }
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "fixed top-0 left-0 right-0 z-[70] transition-all duration-300",
        isScrolled 
          ? "bg-stone-950/90 backdrop-blur-md shadow-2xl border-b border-white/5 py-2" 
          : "bg-transparent py-4 md:py-6"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center gap-6 md:gap-12 h-12 md:h-14">
        {/* Brand Area */}
        <button
          onClick={() => scrollTo('hero')}
          className="flex items-center gap-3 shrink-0 group"
        >
          <div className="relative w-10 h-10 md:w-12 md:h-12 shrink-0 aspect-square flex items-center justify-center rounded-full overflow-hidden border border-amber-400/20 bg-stone-900 group-hover:border-amber-400/40 transition-colors">
            <img 
              src="/images/logo.jpg" 
              alt="Logo" 
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
          </div>
          <div className="flex flex-col items-start">
            <span className="font-heading text-lg md:text-xl font-bold text-white leading-tight">
              Lịch sử <span className="text-amber-400">Đảng</span>
            </span>
            <span className="text-[10px] uppercase tracking-widest text-stone-500 font-bold hidden sm:block">
              02 / 1930
            </span>
          </div>
        </button>

        {/* Navigation Row */}
        <div 
          ref={scrollContainerRef}
          className="flex items-center overflow-x-auto hide-scrollbar scroll-smooth flex-1"
        >
          <div className="flex items-center gap-1 md:gap-2">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                data-id={item.id}
                onClick={() => scrollTo(item.id)}
                className={cn(
                  "relative px-4 py-2 text-xs md:text-[13px] font-bold uppercase tracking-wide transition-all duration-300 whitespace-nowrap rounded-lg",
                  activeId === item.id 
                    ? "text-amber-400" 
                    : "text-stone-400 hover:text-stone-200"
                )}
              >
                <span className="relative z-10">{item.label}</span>
                {activeId === item.id && (
                  <motion.div
                    layoutId="nav-pill"
                    className="absolute inset-0 bg-white/5 border border-white/10 rounded-lg -z-0"
                    transition={{ type: "spring", stiffness: 450, damping: 35 }}
                  />
                )}
                <div className={cn(
                  "absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 rounded-full transition-all duration-300",
                  activeId === item.id ? "bg-amber-400" : "bg-transparent"
                )} />
              </button>
            ))}
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
