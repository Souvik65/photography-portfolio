'use client';

import { Camera, Instagram, Twitter, Facebook, Mail, MapPin, Phone } from 'lucide-react';
import Link from 'next/link';
import type { FooterSettings } from '@/lib/types';

interface FooterProps {
  footer: FooterSettings;
}

export default function Footer({ footer }: FooterProps) {
  const currentYear = new Date().getFullYear();

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
    <footer className="bg-stone-950 text-stone-400 py-16 md:py-24 border-t border-stone-900">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="#home" onClick={(e) => handleNavClick(e, '#home')} className="inline-flex items-center gap-2 mb-6 group">
              <Camera className="w-8 h-8 text-white group-hover:text-stone-300 transition-colors" />
              <span className="font-serif text-2xl font-bold tracking-tight text-white group-hover:text-stone-300 transition-colors">
                {footer.brand_name}
              </span>
            </Link>
            <p className="text-sm leading-relaxed mb-6 max-w-xs">
              {footer.tagline}
            </p>
            <div className="flex items-center gap-4">
              <a href={footer.instagram_url || '#'} className="w-10 h-10 rounded-full bg-stone-900 flex items-center justify-center hover:bg-white hover:text-stone-900 transition-all" aria-label="Instagram">
                <Instagram className="w-5 h-5" />
              </a>
              <a href={footer.twitter_url || '#'} className="w-10 h-10 rounded-full bg-stone-900 flex items-center justify-center hover:bg-white hover:text-stone-900 transition-all" aria-label="Twitter">
                <Twitter className="w-5 h-5" />
              </a>
              <a href={footer.facebook_url || '#'} className="w-10 h-10 rounded-full bg-stone-900 flex items-center justify-center hover:bg-white hover:text-stone-900 transition-all" aria-label="Facebook">
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold mb-6 tracking-widest uppercase text-sm">Explore</h4>
            <ul className="space-y-4 text-sm">
              <li><Link href="#home" onClick={(e) => handleNavClick(e, '#home')} className="hover:text-white transition-colors">Home</Link></li>
              <li><Link href="#about" onClick={(e) => handleNavClick(e, '#about')} className="hover:text-white transition-colors">About Me</Link></li>
              <li><Link href="#portfolio" onClick={(e) => handleNavClick(e, '#portfolio')} className="hover:text-white transition-colors">Portfolio</Link></li>
              <li><Link href="#skills" onClick={(e) => handleNavClick(e, '#skills')} className="hover:text-white transition-colors">Expertise</Link></li>
              <li><Link href="#pricing" onClick={(e) => handleNavClick(e, '#pricing')} className="hover:text-white transition-colors">Pricing</Link></li>
              <li><Link href="#contact" onClick={(e) => handleNavClick(e, '#contact')} className="hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-bold mb-6 tracking-widest uppercase text-sm">Contact</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-stone-600 shrink-0" />
                <span style={{ whiteSpace: 'pre-line' }}>{footer.address}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-stone-600 shrink-0" />
                <a href={`tel:${footer.phone.replace(/\D/g, '')}`} className="hover:text-white transition-colors">{footer.phone}</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-stone-600 shrink-0" />
                <a href={`mailto:${footer.email}`} className="hover:text-white transition-colors">{footer.email}</a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-white font-bold mb-6 tracking-widest uppercase text-sm">Newsletter</h4>
            <p className="text-sm mb-4">Subscribe to receive updates, tips, and exclusive offers.</p>
            <form className="flex flex-col gap-3" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Email address"
                aria-label="Email address for newsletter"
                className="w-full px-4 py-3 bg-stone-900 border border-stone-800 rounded-lg focus:outline-none focus:border-stone-600 text-white text-sm"
                required
              />
              <button
                type="submit"
                className="w-full px-4 py-3 bg-white text-stone-900 font-bold rounded-lg hover:bg-stone-200 transition-colors text-sm"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="pt-8 border-t border-stone-900 flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
          <p>&copy; {currentYear} {footer.brand_name} Photography. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
