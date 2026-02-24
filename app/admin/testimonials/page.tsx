'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Plus, Pencil, Trash2, X, Star } from 'lucide-react';
import ConfirmDialog from '@/components/admin/ConfirmDialog';
import ImageUpload from '@/components/admin/ImageUpload';
import type { Testimonial } from '@/lib/types';

export default function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Testimonial | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Testimonial | null>(null); 
  const [isDeleting, setIsDeleting] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: '', role: '', body: '', rating: 5, image: '', sort_order: 0 });
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    fetch('/api/admin/testimonials')
      .then(r => r.json())
      .then(data => { setTestimonials(data); setLoading(false); });
  }, [refreshKey]);

  const openNew = () => {
    setEditing(null);
    setForm({ name: '', role: '', body: '', rating: 5, image: '', sort_order: testimonials.length });
    setShowForm(true);
  };

  const openEdit = (t: Testimonial) => {
    setEditing(t);
    setForm({ name: t.name, role: t.role, body: t.body, rating: t.rating, image: t.image ?? '', sort_order: t.sort_order ?? 0 });
    setShowForm(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    const res = editing
      ? await fetch(`/api/admin/testimonials/${editing.id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
      : await fetch('/api/admin/testimonials', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
    if (res.ok) { setShowForm(false); setRefreshKey(k => k + 1); }
    setIsSaving(false);
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setIsDeleting(true);
    await fetch(`/api/admin/testimonials/${deleteTarget.id}`, { method: 'DELETE' });
    setDeleteTarget(null);
    setIsDeleting(false);
    setRefreshKey(k => k + 1);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-stone-900">Testimonials</h2>
        <button onClick={openNew} className="flex items-center gap-2 px-4 py-2.5 bg-stone-900 text-white rounded-xl text-sm font-medium hover:bg-stone-800 transition-colors">
          <Plus className="w-4 h-4" /> Add Testimonial
        </button>
      </div>

      {loading ? (
        <div className="space-y-3">{Array.from({ length: 3 }).map((_, i) => <div key={i} className="h-24 bg-stone-200 rounded-2xl animate-pulse" />)}</div>
      ) : (
        <div className="space-y-4">
          {testimonials.map((t) => (
            <div key={t.id} className="bg-white rounded-2xl border border-stone-200 p-6 flex items-start gap-4">
              {t.image && (
                <div className="relative w-12 h-12 rounded-full overflow-hidden shrink-0">
                  <Image src={t.image} alt={t.name} fill className="object-cover" referrerPolicy="no-referrer" />
                </div>
              )}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-bold text-stone-900">{t.name}</span>
                  <span className="text-stone-400">·</span>
                  <span className="text-sm text-stone-500">{t.role}</span>
                  <span className="flex ml-1">{Array.from({ length: t.rating }).map((_, i) => <Star key={i} className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />)}</span>
                </div>
                <p className="text-sm text-stone-600 line-clamp-2">{t.body}</p>
              </div>
              <div className="flex gap-2 shrink-0">
                <button onClick={() => openEdit(t)} className="p-2 text-stone-500 hover:text-stone-900 hover:bg-stone-100 rounded-lg transition-colors"><Pencil className="w-4 h-4" /></button>
                <button onClick={() => setDeleteTarget(t)} className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"><Trash2 className="w-4 h-4" /></button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50" onClick={() => setShowForm(false)} />
          <div className="relative bg-white rounded-2xl shadow-xl max-w-lg w-full p-8 max-h-[90vh] overflow-y-auto">
            <button onClick={() => setShowForm(false)} className="absolute top-4 right-4 text-stone-400 hover:text-stone-700"><X className="w-5 h-5" /></button>
            <h3 className="text-xl font-bold text-stone-900 mb-6">{editing ? 'Edit Testimonial' : 'New Testimonial'}</h3>
            <form onSubmit={handleSave} className="space-y-4">
              <ImageUpload label="Profile Photo" currentUrl={form.image || undefined} onUpload={(url) => setForm({ ...form, image: url })} />
              {[{ label: 'Name *', key: 'name', placeholder: 'e.g. Jane Smith' },
                { label: 'Role *', key: 'role', placeholder: 'e.g. Wedding Client' }].map(({ label, key, placeholder }) => (
                <div key={key}>
                  <label className="block text-sm font-medium text-stone-700 mb-2">{label}</label>
                  <input type="text" value={(form as Record<string, unknown>)[key] as string} onChange={(e) => setForm({ ...form, [key]: e.target.value })} required placeholder={placeholder}
                    className="w-full px-4 py-2.5 border border-stone-300 rounded-xl text-sm focus:ring-2 focus:ring-stone-900 focus:border-transparent" />
                </div>
              ))}
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">Review *</label>
                <textarea value={form.body} onChange={(e) => setForm({ ...form, body: e.target.value })} rows={4} required
                  className="w-full px-4 py-2.5 border border-stone-300 rounded-xl text-sm focus:ring-2 focus:ring-stone-900 focus:border-transparent resize-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">Rating: {form.rating}/5</label>
                <input type="range" min={1} max={5} value={form.rating} onChange={(e) => setForm({ ...form, rating: Number(e.target.value) })} className="w-full" />
              </div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setShowForm(false)} className="px-5 py-2.5 border border-stone-300 text-stone-700 rounded-xl text-sm font-medium hover:bg-stone-50">Cancel</button>
                <button type="submit" disabled={isSaving} className="px-5 py-2.5 bg-stone-900 text-white rounded-xl text-sm font-medium hover:bg-stone-800 disabled:opacity-70">{isSaving ? 'Saving...' : 'Save'}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <ConfirmDialog isOpen={!!deleteTarget} title="Delete Testimonial" message={`Delete testimonial from "${deleteTarget?.name}"?`} onConfirm={handleDelete} onCancel={() => setDeleteTarget(null)} isLoading={isDeleting} />
    </div>
  );
}
