'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import type { Testimonial } from '@/lib/types';

interface TestimonialsProps {
  testimonials: Testimonial[];
}

export default function Testimonials({ testimonials }: TestimonialsProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const nextTestimonial = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    if (testimonials.length === 0) return;
    const timer = setInterval(() => {
      nextTestimonial();
    }, 5000);
    return () => clearInterval(timer);
  }, [currentIndex, testimonials.length]);

  const variants = {
    enter: (direction: number) => {
      return {
        x: direction > 0 ? 1000 : -1000,
        opacity: 0,
      };
    },
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => {
      return {
        zIndex: 0,
        x: direction < 0 ? 1000 : -1000,
        opacity: 0,
      };
    },
  };

  if (testimonials.length === 0) return null;

  return (
    <section id="testimonials" className="py-24 md:py-32 bg-stone-900 text-stone-50 overflow-hidden relative scroll-mt-20">
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <Image
          src="https://picsum.photos/1920/1080?random=24"
          alt="Background Texture"
          fill
          className="object-cover"
          referrerPolicy="no-referrer"
        />
      </div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-sm font-bold tracking-widest uppercase text-stone-300 mb-4">
            Testimonials
          </h2>
          <h3 className="font-serif text-4xl md:text-5xl font-bold mb-8 leading-tight text-white">
            Client Stories
          </h3>
        </div>

        <div className="relative max-w-4xl mx-auto h-[400px] sm:h-[300px] flex items-center justify-center" aria-live="polite">
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: 'spring', stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
              }}
              className="absolute w-full text-center px-4 md:px-16"
            >
              <Quote className="w-12 h-12 text-stone-700 mx-auto mb-6" />
              <p className="text-xl md:text-2xl font-serif italic text-stone-300 mb-8 leading-relaxed">
                &quot;{testimonials[currentIndex].body}&quot;
              </p>

              <div className="flex flex-col items-center">
                <div className="relative w-16 h-16 rounded-full overflow-hidden mb-4 border-2 border-stone-700">
                  <Image
                    src={testimonials[currentIndex].image || 'https://picsum.photos/150/150?random=99'}
                    alt={testimonials[currentIndex].name}
                    fill
                    className="object-cover transition-opacity duration-500 opacity-0"
                    referrerPolicy="no-referrer"
                    onLoad={(e) => (e.target as HTMLImageElement).classList.remove('opacity-0')}
                  />
                </div>
                <h4 className="font-bold text-lg text-white">{testimonials[currentIndex].name}</h4>
                <p className="text-sm text-stone-300 mb-2">{testimonials[currentIndex].role}</p>
                <div className="flex gap-1 justify-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < testimonials[currentIndex].rating ? 'text-yellow-500 fill-yellow-500' : 'text-stone-600'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Controls */}
          <button
            onClick={prevTestimonial}
            className="absolute left-0 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/5 hover:bg-white/10 transition-colors text-white/50 hover:text-white hidden sm:block"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={nextTestimonial}
            className="absolute right-0 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/5 hover:bg-white/10 transition-colors text-white/50 hover:text-white hidden sm:block"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-8">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setDirection(index > currentIndex ? 1 : -1);
                setCurrentIndex(index);
              }}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentIndex ? 'bg-white w-6' : 'bg-stone-600 hover:bg-stone-400'
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
