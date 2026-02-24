'use client';

import { motion } from 'motion/react';
import { Camera, Award, Star, Aperture } from 'lucide-react';
import type { Skill, Equipment, Award as AwardType } from '@/lib/types';

interface SkillsProps {
  skills: Skill[];
  equipment: Equipment[];
  awards: AwardType[];
}

export default function Skills({ skills, equipment, awards }: SkillsProps) {
  return (
    <section id="skills" className="py-24 md:py-32 bg-stone-100 text-stone-900 scroll-mt-20">
      <div className="container mx-auto px-6 md:px-12">
        <div className="text-center mb-16">
          <h2 className="text-sm font-bold tracking-widest uppercase text-stone-500 mb-4">
            Expertise
          </h2>
          <h3 className="font-serif text-4xl md:text-5xl font-bold mb-8 leading-tight text-stone-900">
            Skills & Equipment
          </h3>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Skills Progress Bars */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h4 className="text-2xl font-serif font-bold mb-8 flex items-center gap-3">
              <Star className="w-6 h-6 text-stone-500" />
              Technical Proficiency
            </h4>
            <div className="space-y-6">
              {skills.map((skill, index) => (
                <div key={skill.id}>
                  <div className="flex justify-between mb-2">
                    <span className="font-medium text-stone-700">{skill.name}</span>
                    <span className="text-stone-500 font-mono text-sm">{skill.level}%</span>
                  </div>
                  <div
                    className="h-2 w-full bg-stone-200 rounded-full overflow-hidden"
                    role="progressbar"
                    aria-valuenow={skill.level}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-label={`${skill.name} proficiency`}
                  >
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.2 + index * 0.1 }}
                      className="h-full bg-stone-900 rounded-full"
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Equipment & Awards */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-12"
          >
            {/* Equipment */}
            <div>
              <h4 className="text-2xl font-serif font-bold mb-6 flex items-center gap-3">
                <Aperture className="w-6 h-6 text-stone-500" />
                Gear List
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {equipment.map((item) => (
                  <div key={item.id} className="bg-white p-4 rounded-xl shadow-sm border border-stone-100 flex items-start gap-3">
                    <Camera className="w-5 h-5 text-stone-500 mt-1" />
                    <div>
                      <p className="font-bold text-stone-900">{item.name}</p>
                      <p className="text-sm text-stone-500">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Awards */}
            <div>
              <h4 className="text-2xl font-serif font-bold mb-6 flex items-center gap-3">
                <Award className="w-6 h-6 text-stone-500" />
                Recognition
              </h4>
              <div className="space-y-4">
                {awards.map((award) => (
                  <div key={award.id} className="flex items-center gap-4 border-b border-stone-200 pb-4 last:border-0">
                    <span className="font-mono text-stone-500 font-bold">{award.year}</span>
                    <div>
                      <p className="font-bold text-stone-900">{award.title}</p>
                      <p className="text-sm text-stone-500 italic">{award.category}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
