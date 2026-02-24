'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import StatusBadge from '@/components/admin/StatusBadge';
import ConfirmDialog from '@/components/admin/ConfirmDialog';
import type { BookingSubmission, SubmissionStatus } from '@/lib/types';

const STATUSES: SubmissionStatus[] = ['new', 'read', 'replied', 'archived'];

export default function BookingDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const [booking, setBooking] = useState<BookingSubmission | null>(null);
  const [notes, setNotes] = useState('');
  const [status, setStatus] = useState<SubmissionStatus>('new');
  const [isSaving, setIsSaving] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    params.then(({ id }) => {
      fetch(`/api/admin/bookings/${id}`).then((r) => r.json()).then((data: BookingSubmission) => {
        setBooking(data);
        setNotes(data.admin_notes ?? '');
        setStatus(data.status);
      });
    });
  }, [params]);

  const handleSave = async () => {
    if (!booking) return;
    setIsSaving(true);
    await fetch(`/api/admin/bookings/${booking.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status, admin_notes: notes }),
    });
    setIsSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleDelete = async () => {
    if (!booking) return;
    setIsDeleting(true);
    await fetch(`/api/admin/bookings/${booking.id}`, { method: 'DELETE' });
    router.push('/admin/bookings');
  };

  if (!booking) {
    return <div className="flex items-center justify-center py-20"><div className="w-8 h-8 border-2 border-stone-300 border-t-stone-900 rounded-full animate-spin" /></div>;
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin/bookings" className="text-stone-500 hover:text-stone-900 transition-colors"><ArrowLeft className="w-5 h-5" /></Link>
          <h2 className="text-2xl font-bold text-stone-900">Booking Details</h2>
        </div>
        <button onClick={() => setShowDelete(true)} className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"><Trash2 className="w-5 h-5" /></button>
      </div>

      <div className="bg-white rounded-2xl border border-stone-200 p-8 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold text-stone-900">{booking.name}</h3>
            <p className="text-stone-500 text-sm">{new Date(booking.created_at).toLocaleString()}</p>
          </div>
          <StatusBadge status={booking.status} />
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm">
          {[
            { label: 'Email', value: booking.email },
            { label: 'Phone', value: booking.phone ?? '—' },
            { label: 'Event Type', value: booking.event_type },
            { label: 'Preferred Date', value: booking.preferred_date ?? '—' },
          ].map(({ label, value }) => (
            <div key={label}>
              <p className="text-stone-400 text-xs uppercase tracking-wider mb-1">{label}</p>
              <p className="font-medium text-stone-800">{value}</p>
            </div>
          ))}
        </div>

        <div>
          <p className="text-stone-400 text-xs uppercase tracking-wider mb-2">Message</p>
          <p className="text-stone-700 text-sm leading-relaxed bg-stone-50 rounded-xl p-4">{booking.message}</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-stone-700 mb-2">Status</label>
          <select value={status} onChange={(e) => setStatus(e.target.value as SubmissionStatus)}
            className="w-full px-4 py-2.5 border border-stone-300 rounded-xl text-sm focus:ring-2 focus:ring-stone-900 focus:border-transparent">
            {STATUSES.map((s) => <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>)}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-stone-700 mb-2">Admin Notes</label>
          <textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={4}
            placeholder="Internal notes, follow-up reminders, etc."
            className="w-full px-4 py-2.5 border border-stone-300 rounded-xl text-sm focus:ring-2 focus:ring-stone-900 focus:border-transparent resize-none" />
        </div>

        <button onClick={handleSave} disabled={isSaving} className="px-6 py-2.5 bg-stone-900 text-white rounded-xl text-sm font-medium hover:bg-stone-800 disabled:opacity-70">
          {isSaving ? 'Saving...' : saved ? 'Saved!' : 'Save Changes'}
        </button>
      </div>

      <ConfirmDialog isOpen={showDelete} title="Delete Booking" message={`Delete booking from "${booking.name}"? This cannot be undone.`}
        onConfirm={handleDelete} onCancel={() => setShowDelete(false)} isLoading={isDeleting} />
    </div>
  );
}
