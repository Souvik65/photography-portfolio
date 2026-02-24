import Link from 'next/link';
import { Images, DollarSign, Star, BookOpen, MessageSquare, ArrowRight, Settings } from 'lucide-react';
import { getPortfolioItems } from '@/lib/db/portfolio';
import { countNewBookings, countNewContacts, getBookings, getContacts } from '@/lib/db/submissions';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';

export default async function AdminDashboard() {
  const session = await auth();
  if (!session) redirect('/admin/login');

  const [portfolioItems, newBookings, newContacts, recentBookings, recentContacts] = await Promise.all([
    getPortfolioItems(),
    countNewBookings(),
    countNewContacts(),
    getBookings('new'),
    getContacts('new'),
  ]);

  const stats = [
    { label: 'Portfolio Photos', value: portfolioItems.length, icon: Images, href: '/admin/gallery', color: 'bg-blue-50 text-blue-600' },
    { label: 'New Bookings', value: newBookings, icon: BookOpen, href: '/admin/bookings', color: 'bg-amber-50 text-amber-600' },
    { label: 'Unread Contacts', value: newContacts, icon: MessageSquare, href: '/admin/contacts', color: 'bg-purple-50 text-purple-600' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-stone-900 mb-1">Welcome back{session.user?.name ? `, ${session.user.name.split(' ')[0]}` : ''}!</h2>
        <p className="text-stone-500 text-sm">Here&apos;s what&apos;s happening with your portfolio.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {stats.map(({ label, value, icon: Icon, href, color }) => (
          <Link key={label} href={href} className="bg-white rounded-2xl p-6 border border-stone-200 hover:shadow-md transition-shadow flex items-center gap-4">
            <div className={`p-3 rounded-xl ${color}`}>
              <Icon className="w-6 h-6" />
            </div>
            <div>
              <p className="text-3xl font-bold text-stone-900">{value}</p>
              <p className="text-sm text-stone-500">{label}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* Quick Links */}
      <div>
        <h3 className="text-lg font-bold text-stone-900 mb-4">Manage Content</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { href: '/admin/gallery', label: 'Gallery', icon: Images },
            { href: '/admin/pricing', label: 'Pricing', icon: DollarSign },
            { href: '/admin/testimonials', label: 'Testimonials', icon: Star },
            { href: '/admin/settings', label: 'Site Settings', icon: Settings },
          ].map(({ href, label, icon: Icon }) => (
            <Link key={href} href={href} className="bg-white rounded-xl p-4 border border-stone-200 hover:bg-stone-50 transition-colors flex items-center gap-3 text-sm font-medium text-stone-700">
              <Icon className="w-5 h-5 text-stone-500" />
              {label}
              <ArrowRight className="w-4 h-4 ml-auto text-stone-300" />
            </Link>
          ))}
        </div>
      </div>

      {/* Recent submissions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Bookings */}
        <div className="bg-white rounded-2xl border border-stone-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-stone-900">New Bookings</h3>
            <Link href="/admin/bookings" className="text-xs text-stone-500 hover:text-stone-900">View all →</Link>
          </div>
          {recentBookings.length === 0 ? (
            <p className="text-sm text-stone-400">No new bookings.</p>
          ) : (
            <ul className="space-y-3">
              {recentBookings.slice(0, 5).map((b) => (
                <li key={b.id}>
                  <Link href={`/admin/bookings/${b.id}`} className="flex items-center justify-between hover:bg-stone-50 rounded-lg px-2 py-1.5 -mx-2 transition-colors">
                    <div>
                      <p className="text-sm font-medium text-stone-800">{b.name}</p>
                      <p className="text-xs text-stone-400">{b.event_type} · {b.preferred_date ?? 'No date'}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-stone-300" />
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Recent Contacts */}
        <div className="bg-white rounded-2xl border border-stone-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-stone-900">New Messages</h3>
            <Link href="/admin/contacts" className="text-xs text-stone-500 hover:text-stone-900">View all →</Link>
          </div>
          {recentContacts.length === 0 ? (
            <p className="text-sm text-stone-400">No new messages.</p>
          ) : (
            <ul className="space-y-3">
              {recentContacts.slice(0, 5).map((c) => (
                <li key={c.id}>
                  <Link href={`/admin/contacts/${c.id}`} className="flex items-center justify-between hover:bg-stone-50 rounded-lg px-2 py-1.5 -mx-2 transition-colors">
                    <div>
                      <p className="text-sm font-medium text-stone-800">{c.name}</p>
                      <p className="text-xs text-stone-400">{c.subject}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-stone-300" />
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
