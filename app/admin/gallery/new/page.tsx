'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import ImageUpload from '@/components/admin/ImageUpload';

const CATEGORIES = ['Wedding', 'Portrait', 'Commercial', 'Event', 'Nature', 'Architecture', 'Street', 'Other'];

export default function NewPhotoPage() {
  const router = useRouter();
  const [src, setSrc] = useState('');
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Wedding');
  const [sortOrder, setSortOrder] = useState(0);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!src) { setError('Please upload a photo first.'); return; }
    setIsSaving(true);
    setError('');
    try {
      const res = await fetch('/api/admin/portfolio', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, category, src, sort_order: sortOrder }),
      });
      if (!res.ok) throw new Error();
      router.push('/admin/gallery');
    } catch {
      setError('Failed to save. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/gallery" className="text-stone-500 hover:text-stone-900 transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <h2 className="text-2xl font-bold text-stone-900">Add New Photo</h2>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-stone-200 p-8 space-y-6">
        <ImageUpload label="Photo *" onUpload={setSrc} />

        <div>
          <label className="block text-sm font-medium text-stone-700 mb-2">Title *</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full px-4 py-2.5 border border-stone-300 rounded-xl focus:ring-2 focus:ring-stone-900 focus:border-transparent text-sm"
            placeholder="e.g. Golden Hour Portrait"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-stone-700 mb-2">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-4 py-2.5 border border-stone-300 rounded-xl focus:ring-2 focus:ring-stone-900 focus:border-transparent text-sm"
          >
            {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-stone-700 mb-2">Sort Order</label>
          <input
            type="number"
            value={sortOrder}
            onChange={(e) => setSortOrder(Number(e.target.value))}
            className="w-full px-4 py-2.5 border border-stone-300 rounded-xl focus:ring-2 focus:ring-stone-900 focus:border-transparent text-sm"
          />
          <p className="text-xs text-stone-400 mt-1">Lower numbers appear first.</p>
        </div>

        {error && <p className="text-sm text-red-500">{error}</p>}

        <div className="flex gap-3 pt-2">
          <Link href="/admin/gallery" className="px-6 py-2.5 border border-stone-300 text-stone-700 rounded-xl text-sm font-medium hover:bg-stone-50 transition-colors">
            Cancel
          </Link>
          <button
            type="submit"
            disabled={isSaving}
            className="px-6 py-2.5 bg-stone-900 text-white rounded-xl text-sm font-medium hover:bg-stone-800 transition-colors disabled:opacity-70"
          >
            {isSaving ? 'Saving...' : 'Save Photo'}
          </button>
        </div>
      </form>
    </div>
  );
}
