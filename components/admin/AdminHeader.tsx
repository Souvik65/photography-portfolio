'use client';

import { signOut } from 'next-auth/react';
import { LogOut, Menu } from 'lucide-react';
import Image from 'next/image';

interface AdminHeaderProps {
  userName?: string | null;
  userImage?: string | null;
  pageTitle: string;
  onMenuClick?: () => void;
}

export default function AdminHeader({ userName, userImage, pageTitle, onMenuClick }: AdminHeaderProps) {
  return (
    <header className="bg-white border-b border-stone-200 px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuClick}
          className="lg:hidden text-stone-500 hover:text-stone-900"
          aria-label="Open sidebar"
        >
          <Menu className="w-6 h-6" />
        </button>
        <h1 className="text-xl font-bold text-stone-900">{pageTitle}</h1>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-3">
          {userImage ? (
            <Image
              src={userImage}
              alt={userName ?? 'Admin'}
              width={36}
              height={36}
              className="rounded-full"
              referrerPolicy="no-referrer"
            />
          ) : (
            <div className="w-9 h-9 rounded-full bg-stone-200 flex items-center justify-center text-stone-600 font-bold text-sm">
              {userName?.[0]?.toUpperCase() ?? 'A'}
            </div>
          )}
          <span className="hidden sm:block text-sm font-medium text-stone-700">{userName}</span>
        </div>
        <button
          onClick={() => signOut({ callbackUrl: '/admin/login' })}
          className="flex items-center gap-2 px-3 py-2 text-sm text-stone-500 hover:text-stone-900 hover:bg-stone-100 rounded-lg transition-colors"
        >
          <LogOut className="w-4 h-4" />
          <span className="hidden sm:block">Sign Out</span>
        </button>
      </div>
    </header>
  );
}
