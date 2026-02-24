'use client';

import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowRight, ChevronDown } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import type { HeroSettings } from '@/lib/types';

interface HeroProps {
  hero: HeroSettings;
}

export default function Hero({ hero }: HeroProps) {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, 300]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      const navHeight = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <motion.div
        className="absolute -inset-[10%] z-0"
        style={{ y }}
      >
        <Image
          src={hero.bg_image || 'https://picsum.photos/1920/1080?random=1'}
          alt="Cinematic photography background"
          fill
          priority
          className="object-cover object-center transition-opacity duration-1000 opacity-0"
          referrerPolicy="no-referrer"
          onLoad={(e) => (e.target as HTMLImageElement).classList.remove('opacity-0')}
        />
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/40" />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 md:px-12 text-center text-white flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <p className="text-sm md:text-base font-medium tracking-[0.2em] uppercase mb-4 text-stone-200">
            {hero.tagline}
          </p>
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight">
            {hero.heading.split(' ').slice(0, -2).join(' ')} <br className="hidden md:block" />
            <span className="italic font-light text-stone-300">{hero.heading.split(' ').slice(-2).join(' ')}</span>
          </h1>
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-stone-200 mb-10 font-light">
            {hero.subheading}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center gap-4"
        >
          <Link
            href="#portfolio"
            onClick={(e) => handleNavClick(e, '#portfolio')}
            className="group flex items-center gap-2 bg-white text-stone-900 px-8 py-4 rounded-full font-medium tracking-wide transition-all hover:bg-stone-100"
          >
            {hero.cta_primary}
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <Link
            href="#booking"
            onClick={(e) => handleNavClick(e, '#booking')}
            className="flex items-center gap-2 bg-transparent border border-white/30 text-white px-8 py-4 rounded-full font-medium tracking-wide transition-all hover:bg-white/10"
          >
            {hero.cta_secondary}
          </Link>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <Link href="#about" aria-label="Scroll down" onClick={(e) => handleNavClick(e, '#about')}>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="w-10 h-16 border-2 border-white/30 rounded-full flex justify-center p-2 cursor-pointer hover:border-white/60 transition-colors"
          >
            <ChevronDown className="w-5 h-5 text-white/70" />
          </motion.div>
        </Link>
      </motion.div>
    </section>
  );
}
