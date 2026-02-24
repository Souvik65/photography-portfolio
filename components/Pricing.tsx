'use client';

import { motion } from 'motion/react';
import { Check, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import type { PricingPackage } from '@/lib/types';

interface PricingProps {
  packages: PricingPackage[];
}

export default function Pricing({ packages }: PricingProps) {
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.split('?')[0].replace('#', '');
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
    <section id="pricing" className="py-24 md:py-32 bg-stone-50 text-stone-900 scroll-mt-20">
      <div className="container mx-auto px-6 md:px-12">
        <div className="text-center mb-16">
          <h2 className="text-sm font-bold tracking-widest uppercase text-stone-500 mb-4">
            Investment
          </h2>
          <h3 className="font-serif text-4xl md:text-5xl font-bold mb-8 leading-tight text-stone-900">
            Pricing Packages
          </h3>
          <p className="text-lg text-stone-600 max-w-2xl mx-auto font-light">
            Transparent pricing for professional photography services. Custom packages available upon request.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-center">
          {packages.map((pkg, index) => (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className={`relative bg-white rounded-2xl p-8 shadow-sm border ${
                pkg.popular ? 'border-stone-900 shadow-xl lg:-translate-y-4' : 'border-stone-200'
              }`}
            >
              {pkg.popular && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-stone-900 text-white px-4 py-1 rounded-full text-xs font-bold tracking-widest uppercase">
                  Most Popular
                </div>
              )}

              <div className="text-center mb-8">
                <h4 className="font-serif text-2xl font-bold mb-2 text-stone-900">{pkg.name}</h4>
                <p className="text-stone-500 text-sm mb-6 h-10">{pkg.description}</p>
                <div className="text-5xl font-bold text-stone-900 mb-2">{pkg.price}</div>
                <p className="text-sm text-stone-500">Starting at</p>
              </div>

              <ul className="space-y-4 mb-8">
                {pkg.features.map((feature, fIndex) => (
                  <li key={fIndex} className="flex items-start gap-3 text-stone-600">
                    <Check className="w-5 h-5 text-stone-900 shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <Link
                href={`#booking?package=${encodeURIComponent(pkg.name)}`}
                onClick={(e) => handleNavClick(e, `#booking?package=${encodeURIComponent(pkg.name)}`)}
                className={`w-full flex items-center justify-center gap-2 py-4 rounded-full font-medium tracking-wide transition-all ${
                  pkg.popular
                    ? 'bg-stone-900 text-white hover:bg-stone-800'
                    : 'bg-stone-100 text-stone-900 hover:bg-stone-200'
                }`}
              >
                Choose Package
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
