'use client';

import { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2, X, Check, Star } from 'lucide-react';
import ConfirmDialog from '@/components/admin/ConfirmDialog';
import type { PricingPackage } from '@/lib/types';

export default function PricingPage() {
  const [packages, setPackages] = useState<PricingPackage[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<PricingPackage | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<PricingPackage | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: '', price: '', description: '', features: '', popular: false, sort_order: 0 });
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    fetch('/api/admin/pricing')
      .then(r => r.json())
      .then(data => { setPackages(data); setLoading(false); });
  }, [refreshKey]);

  const openNew = () => {
    setEditing(null);
    setForm({ name: '', price: '', description: '', features: '', popular: false, sort_order: packages.length });
    setShowForm(true);
  };

  const openEdit = (pkg: PricingPackage) => {
    setEditing(pkg);
    setForm({ name: pkg.name, price: pkg.price, description: pkg.description, features: pkg.features.join('\n'), popular: pkg.popular, sort_order: pkg.sort_order ?? 0 });
    setShowForm(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    const body = { ...form, price: form.price, features: form.features.split('\n').filter(Boolean) };
    const res = editing
      ? await fetch(`/api/admin/pricing/${editing.id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
      : await fetch('/api/admin/pricing', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
    if (res.ok) { setShowForm(false); setRefreshKey(k => k + 1); }
    setIsSaving(false);
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setIsDeleting(true);
    await fetch(`/api/admin/pricing/${deleteTarget.id}`, { method: 'DELETE' });
    setDeleteTarget(null);
    setIsDeleting(false);
    setRefreshKey(k => k + 1);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-stone-900">Pricing</h2>
        <button onClick={openNew} className="flex items-center gap-2 px-4 py-2.5 bg-stone-900 text-white rounded-xl text-sm font-medium hover:bg-stone-800 transition-colors">
          <Plus className="w-4 h-4" /> Add Package
        </button>
      </div>

      {loading ? (
        <div className="space-y-4">{Array.from({ length: 3 }).map((_, i) => <div key={i} className="h-32 bg-stone-200 rounded-2xl animate-pulse" />)}</div>
      ) : (
        <div className="space-y-4">
          {packages.map((pkg) => (
            <div key={pkg.id} className="bg-white rounded-2xl border border-stone-200 p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-bold text-stone-900">{pkg.name}</h3>
                    {pkg.popular && <span className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full font-medium flex items-center gap-1"><Star className="w-3 h-3" />Popular</span>}
                  </div>
                  <p className="text-2xl font-bold text-stone-900 mb-2">{pkg.price}</p>
                  <p className="text-sm text-stone-500 mb-3">{pkg.description}</p>
                  <ul className="space-y-1">
                    {pkg.features.map((f, i) => <li key={i} className="flex items-center gap-2 text-sm text-stone-600"><Check className="w-4 h-4 text-green-500 shrink-0" />{f}</li>)}
                  </ul>
                </div>
                <div className="flex gap-2 ml-4">
                  <button onClick={() => openEdit(pkg)} className="p-2 text-stone-500 hover:text-stone-900 hover:bg-stone-100 rounded-lg transition-colors"><Pencil className="w-4 h-4" /></button>
                  <button onClick={() => setDeleteTarget(pkg)} className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"><Trash2 className="w-4 h-4" /></button>
                </div>
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
            <h3 className="text-xl font-bold text-stone-900 mb-6">{editing ? 'Edit Package' : 'New Package'}</h3>
            <form onSubmit={handleSave} className="space-y-4">
              {[{ label: 'Package Name *', key: 'name', type: 'text', placeholder: 'e.g. Essential' },
                { label: 'Price *', key: 'price', type: 'text', placeholder: 'e.g. $499' },
                { label: 'Description *', key: 'description', type: 'text', placeholder: 'Short description' }].map(({ label, key, type, placeholder }) => (
                <div key={key}>
                  <label className="block text-sm font-medium text-stone-700 mb-2">{label}</label>
                  <input type={type} value={(form as Record<string, unknown>)[key] as string} onChange={(e) => setForm({ ...form, [key]: e.target.value })} required placeholder={placeholder}
                    className="w-full px-4 py-2.5 border border-stone-300 rounded-xl text-sm focus:ring-2 focus:ring-stone-900 focus:border-transparent" />
                </div>
              ))}
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">Features (one per line) *</label>
                <textarea value={form.features} onChange={(e) => setForm({ ...form, features: e.target.value })} rows={5} required
                  className="w-full px-4 py-2.5 border border-stone-300 rounded-xl text-sm focus:ring-2 focus:ring-stone-900 focus:border-transparent resize-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">Sort Order</label>
                <input type="number" value={form.sort_order} onChange={(e) => setForm({ ...form, sort_order: Number(e.target.value) })}
                  className="w-full px-4 py-2.5 border border-stone-300 rounded-xl text-sm focus:ring-2 focus:ring-stone-900 focus:border-transparent" />
              </div>
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" checked={form.popular} onChange={(e) => setForm({ ...form, popular: e.target.checked })} className="w-4 h-4 rounded" />
                <span className="text-sm text-stone-700">Mark as popular</span>
              </label>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setShowForm(false)} className="px-5 py-2.5 border border-stone-300 text-stone-700 rounded-xl text-sm font-medium hover:bg-stone-50">Cancel</button>
                <button type="submit" disabled={isSaving} className="px-5 py-2.5 bg-stone-900 text-white rounded-xl text-sm font-medium hover:bg-stone-800 disabled:opacity-70">{isSaving ? 'Saving...' : 'Save'}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <ConfirmDialog isOpen={!!deleteTarget} title="Delete Package" message={`Delete "${deleteTarget?.name}"? This cannot be undone.`} onConfirm={handleDelete} onCancel={() => setDeleteTarget(null)} isLoading={isDeleting} />
    </div>
  );
}
