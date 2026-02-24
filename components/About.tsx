'use client';

import { motion } from 'motion/react';
import Image from 'next/image';
import { Camera, Heart, Globe, Users, type LucideIcon } from 'lucide-react';
import type { AboutSettings } from '@/lib/types';

const ICON_MAP: Record<string, LucideIcon> = {
  Heart,
  Users,
  Globe,
  Camera,
};

interface AboutProps {
  about: AboutSettings;
}

export default function About({ about }: AboutProps) {
  return (
    <section id="about" className="py-24 md:py-32 bg-stone-50 text-stone-900 scroll-mt-20">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Image Column */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="relative h-[600px] w-full rounded-2xl overflow-hidden shadow-2xl"
          >
            <Image
              src={about.profile_image || 'https://picsum.photos/800/1200?random=2'}
              alt="Photographer Profile"
              fill
              className="object-cover transition-opacity duration-1000 opacity-0"
              referrerPolicy="no-referrer"
              onLoad={(e) => (e.target as HTMLImageElement).classList.remove('opacity-0')}
            />
            <div className="absolute inset-0 bg-stone-900/10 mix-blend-multiply" />
          </motion.div>

          {/* Text Column */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col justify-center"
          >
            <h2 className="text-sm font-bold tracking-widest uppercase text-stone-500 mb-4">
              About Me
            </h2>
            <h3 className="font-serif text-4xl md:text-5xl font-bold mb-6 leading-tight text-stone-900">
              Hi, I&apos;m {about.name}. <br />
              <span className="italic font-light text-stone-600">{about.subtitle}</span>
            </h3>
            <p className="text-lg text-stone-600 mb-8 leading-relaxed font-light">
              {about.bio_1}
            </p>
            <p className="text-lg text-stone-600 mb-12 leading-relaxed font-light">
              {about.bio_2}
            </p>

            {/* Specialties Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {about.specialties.map((item, index) => {
                const Icon = ICON_MAP[item.icon] ?? Camera;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                    className="flex items-start gap-4"
                  >
                    <div className="p-3 bg-stone-100 rounded-full text-stone-800">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-stone-900 mb-1">{item.title}</h4>
                      <p className="text-sm text-stone-500 font-light leading-relaxed">{item.desc}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
