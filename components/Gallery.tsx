'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import type { PortfolioItem } from '@/lib/types';

const categories = ['All', 'Weddings', 'Portraits', 'Nature', 'Commercial'];

interface GalleryProps {
  items: PortfolioItem[];
}

export default function Gallery({ items }: GalleryProps) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [sortOrder, setSortOrder] = useState('newest');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filteredItems = (activeCategory === 'All'
    ? items
    : items.filter(item => item.category === activeCategory))
    .sort((a, b) => {
      if (sortOrder === 'newest') return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      if (sortOrder === 'oldest') return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
      if (sortOrder === 'a-z') return a.title.localeCompare(b.title);
      if (sortOrder === 'z-a') return b.title.localeCompare(a.title);
      return 0;
    });

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
  };

  const closeLightbox = useCallback(() => {
    setLightboxIndex(null);
  }, []);

  const nextImage = useCallback(() => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % filteredItems.length);
    }
  }, [lightboxIndex, filteredItems.length]);

  const prevImage = useCallback(() => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex - 1 + filteredItems.length) % filteredItems.length);
    }
  }, [lightboxIndex, filteredItems.length]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
    };

    if (lightboxIndex !== null) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [lightboxIndex, closeLightbox, nextImage, prevImage]);

  return (
    <section id="portfolio" className="py-24 md:py-32 bg-white text-stone-900 scroll-mt-20">
      <div className="container mx-auto px-6 md:px-12">
        <div className="text-center mb-16">
          <h2 className="text-sm font-bold tracking-widest uppercase text-stone-500 mb-4">
            Portfolio
          </h2>
          <h3 className="font-serif text-4xl md:text-5xl font-bold mb-8 leading-tight text-stone-900">
            Selected Works
          </h3>

          {/* Controls: Filter and Sort */}
          <div className="flex flex-col lg:flex-row justify-between items-center gap-6 mb-12">
            {/* Filter Buttons */}
            <div className="flex flex-wrap justify-center gap-3">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  aria-pressed={activeCategory === category}
                  className={`px-5 py-2 rounded-full text-sm font-medium tracking-wide transition-all ${
                    activeCategory === category
                      ? 'bg-stone-900 text-white'
                      : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-3">
              <label htmlFor="sortOrder" className="text-sm font-medium text-stone-500 uppercase tracking-widest">Sort by:</label>
              <select
                id="sortOrder"
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                className="bg-stone-100 border-none text-stone-700 text-sm font-medium rounded-full px-4 py-2 focus:ring-2 focus:ring-stone-900 outline-none cursor-pointer"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="a-z">Title (A-Z)</option>
                <option value="z-a">Title (Z-A)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Masonry Grid */}
        <motion.div layout className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          <AnimatePresence>
            {filteredItems.map((item, index) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1], delay: index * 0.05 }}
                key={item.id}
                className="relative group overflow-hidden rounded-xl cursor-pointer break-inside-avoid shadow-sm hover:shadow-xl transition-shadow bg-stone-100"
                onClick={() => openLightbox(index)}
              >
                <div className="relative w-full h-auto">
                  <Image
                    src={item.src}
                    alt={item.title}
                    width={800}
                    height={1200}
                    className="w-full h-auto object-cover transition-all duration-700 group-hover:scale-105 opacity-0"
                    referrerPolicy="no-referrer"
                    onLoad={(e) => (e.target as HTMLImageElement).classList.remove('opacity-0')}
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center text-white p-6" aria-hidden="true">
                    <Maximize2 className="w-8 h-8 mb-4 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 delay-100" />
                    <h4 className="font-serif text-2xl font-bold mb-2 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 delay-150">
                      {item.title}
                    </h4>
                    <p className="text-sm tracking-widest uppercase font-light opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 delay-200">
                      {item.category}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 md:p-12"
            role="dialog"
            aria-modal="true"
            aria-label="Image lightbox"
          >
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 text-white/70 hover:text-white z-50 p-2"
              aria-label="Close lightbox"
            >
              <X className="w-8 h-8" />
            </button>

            <button
              onClick={(e) => { e.stopPropagation(); prevImage(); }}
              className="absolute left-4 md:left-12 text-white/50 hover:text-white z-50 p-4 rounded-full bg-black/20 hover:bg-black/40 transition-all"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-8 h-8" />
            </button>

            <div className="relative w-full max-w-6xl h-full flex flex-col items-center justify-center py-12">
              <div className="relative w-full flex-1 mb-6">
                <Image
                  src={filteredItems[lightboxIndex].src}
                  alt={filteredItems[lightboxIndex].title}
                  fill
                  className="object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="text-center text-white mb-6 shrink-0">
                <p className="font-serif text-xl mb-1">{filteredItems[lightboxIndex].title}</p>
                <p className="text-sm text-white/70 uppercase tracking-widest">
                  {filteredItems[lightboxIndex].category} • {lightboxIndex + 1} / {filteredItems.length}
                </p>
              </div>

              {/* Thumbnail Strip */}
              <div className="flex items-center justify-center gap-2 overflow-x-auto max-w-full px-4 pb-2 shrink-0">
                {filteredItems.map((item, idx) => (
                  <button
                    key={item.id}
                    onClick={(e) => { e.stopPropagation(); setLightboxIndex(idx); }}
                    className={`relative w-16 h-16 shrink-0 rounded-md overflow-hidden transition-all ${
                      idx === lightboxIndex ? 'ring-2 ring-white opacity-100 scale-105' : 'opacity-40 hover:opacity-100'
                    }`}
                    aria-label={`View image ${idx + 1}`}
                    aria-current={idx === lightboxIndex ? 'true' : 'false'}
                  >
                    <Image
                      src={item.src}
                      alt={`Thumbnail ${idx + 1}`}
                      fill
                      className="object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={(e) => { e.stopPropagation(); nextImage(); }}
              className="absolute right-4 md:right-12 text-white/50 hover:text-white z-50 p-4 rounded-full bg-black/20 hover:bg-black/40 transition-all"
              aria-label="Next image"
            >
              <ChevronRight className="w-8 h-8" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
