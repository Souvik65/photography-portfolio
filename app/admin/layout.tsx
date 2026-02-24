import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import { headers } from 'next/headers';
import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminHeader from '@/components/admin/AdminHeader';
import { countNewBookings, countNewContacts } from '@/lib/db/submissions';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default async function AdminLayout({ children }: AdminLayoutProps) {
  const headersList = await headers();
  const pathname = headersList.get('x-pathname') ?? '';

  // Login page must not be wrapped by the auth guard — it renders standalone
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  const session = await auth();
  if (!session) redirect('/admin/login');

  const [newBookings, newContacts] = await Promise.all([
    countNewBookings(),
    countNewContacts(),
  ]);

  return (
    <div className="flex h-screen bg-stone-100 overflow-hidden">
      {/* Sidebar — always visible on lg+ */}
      <div className="hidden lg:flex">
        <AdminSidebar newBookings={newBookings} newContacts={newContacts} />
      </div>

      {/* Main area */}
      <div className="flex flex-col flex-1 overflow-hidden">
        <AdminHeader
          userName={session.user?.name}
          userImage={session.user?.image}
          pageTitle="Admin"
        />
        <main className="flex-1 overflow-y-auto p-6 md:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
