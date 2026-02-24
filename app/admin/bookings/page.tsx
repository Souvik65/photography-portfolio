'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import DataTable, { type Column } from '@/components/admin/DataTable';
import StatusBadge from '@/components/admin/StatusBadge';
import type { BookingSubmission, SubmissionStatus } from '@/lib/types';

const STATUSES: { label: string; value: SubmissionStatus | 'all' }[] = [
  { label: 'All', value: 'all' },
  { label: 'New', value: 'new' },
  { label: 'Read', value: 'read' },
  { label: 'Replied', value: 'replied' }, 
  { label: 'Archived', value: 'archived' },
];

const columns: Column<BookingSubmission>[] = [
  { key: 'name', label: 'Name', sortable: true },
  { key: 'email', label: 'Email', sortable: true },
  { key: 'event_type', label: 'Type', sortable: true },
  { key: 'preferred_date', label: 'Date', sortable: true, render: (row) => row.preferred_date ?? '—' },
  { key: 'status', label: 'Status', render: (row) => <StatusBadge status={row.status} /> },
  { key: 'created_at', label: 'Received', sortable: true, render: (row) => new Date(row.created_at).toLocaleDateString() },
];

export default function BookingsPage() {
  const router = useRouter();
  const [bookings, setBookings] = useState<BookingSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<SubmissionStatus | 'all'>('all');

  useEffect(() => {
    const url = statusFilter === 'all' ? '/api/admin/bookings' : `/api/admin/bookings?status=${statusFilter}`;
    fetch(url)
      .then(r => r.json())
      .then(data => { setBookings(data); setLoading(false); });
  }, [statusFilter]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-stone-900">Bookings</h2>
        <p className="text-stone-500 text-sm">{bookings.length} {statusFilter !== 'all' ? statusFilter : 'total'}</p>
      </div>

      {/* Status filter tabs */}
      <div className="flex gap-2 flex-wrap">
        {STATUSES.map(({ label, value }) => (
          <button
            key={value}
            onClick={() => setStatusFilter(value)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${statusFilter === value ? 'bg-stone-900 text-white' : 'bg-white border border-stone-200 text-stone-600 hover:bg-stone-50'}`}
          >
            {label}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="space-y-2">{Array.from({ length: 5 }).map((_, i) => <div key={i} className="h-12 bg-stone-200 rounded-xl animate-pulse" />)}</div>
      ) : (
        <DataTable
          columns={columns}
          data={bookings}
          emptyMessage="No bookings found."
          onRowClick={(row) => router.push(`/admin/bookings/${row.id}`)}
        />
      )}
    </div>
  );
}
