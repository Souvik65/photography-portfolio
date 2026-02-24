'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Camera, LayoutDashboard, Images, DollarSign, Star, Wrench, Settings, BookOpen, MessageSquare, X } from 'lucide-react';

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard, exact: true },
  { href: '/admin/gallery', label: 'Gallery', icon: Images },
  { href: '/admin/pricing', label: 'Pricing', icon: DollarSign },
  { href: '/admin/testimonials', label: 'Testimonials', icon: Star },
  { href: '/admin/skills', label: 'Skills', icon: Wrench },
  { href: '/admin/settings', label: 'Settings', icon: Settings },
  { href: '/admin/bookings', label: 'Bookings', icon: BookOpen },
  { href: '/admin/contacts', label: 'Contacts', icon: MessageSquare },
];

interface AdminSidebarProps {
  newBookings?: number;
  newContacts?: number;
  onClose?: () => void;
}

export default function AdminSidebar({ newBookings = 0, newContacts = 0, onClose }: AdminSidebarProps) {
  const pathname = usePathname();

  const isActive = (href: string, exact?: boolean) => {
    if (exact) return pathname === href;
    return pathname.startsWith(href);
  };

  return (
    <aside className="flex flex-col h-full bg-stone-950 text-stone-300 w-64">
      {/* Logo */}
      <div className="flex items-center justify-between px-6 py-5 border-b border-stone-800">
        <Link href="/admin" className="flex items-center gap-2 group">
          <Camera className="w-7 h-7 text-white" />
          <span className="font-serif text-lg font-bold text-white">Admin</span>
        </Link>
        {onClose && (
          <button onClick={onClose} className="lg:hidden text-stone-400 hover:text-white" aria-label="Close sidebar">
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
        {navItems.map(({ href, label, icon: Icon, exact }) => {
          const active = isActive(href, exact);
          const badge = label === 'Bookings' ? newBookings : label === 'Contacts' ? newContacts : 0;
          return (
            <Link
              key={href}
              href={href}
              onClick={onClose}
              className={`flex items-center justify-between gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                active
                  ? 'bg-white text-stone-900'
                  : 'text-stone-400 hover:bg-stone-900 hover:text-white'
              }`}
            >
              <span className="flex items-center gap-3">
                <Icon className="w-5 h-5 shrink-0" />
                {label}
              </span>
              {badge > 0 && (
                <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${active ? 'bg-stone-200 text-stone-700' : 'bg-red-500 text-white'}`}>
                  {badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="px-6 py-4 border-t border-stone-800">
        <Link href="/" className="text-xs text-stone-500 hover:text-stone-300 transition-colors">
          ← View Public Site
        </Link>
      </div>
    </aside>
  );
}
