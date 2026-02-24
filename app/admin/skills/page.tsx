'use client';

import { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2, X } from 'lucide-react';
import ConfirmDialog from '@/components/admin/ConfirmDialog';
import type { Skill, Equipment, Award } from '@/lib/types';

type TabId = 'skills' | 'equipment' | 'awards';

export default function SkillsPage() {
  const [tab, setTab] = useState<TabId>('skills');

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-stone-900">Skills & Expertise</h2>
      <div className="flex gap-2 bg-stone-100 p-1 rounded-xl w-fit">
        {(['skills', 'equipment', 'awards'] as TabId[]).map((t) => (
          <button key={t} onClick={() => setTab(t)}
            className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-colors ${tab === t ? 'bg-white text-stone-900 shadow-sm' : 'text-stone-500 hover:text-stone-700'}`}>
            {t}
          </button>
        ))}
      </div>
      {tab === 'skills' && <SkillsTab />}
      {tab === 'equipment' && <EquipmentTab />}
      {tab === 'awards' && <AwardsTab />}
    </div>
  );
}

function SkillsTab() {
  const [items, setItems] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Skill | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Skill | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [form, setForm] = useState({ name: '', level: 80, sort_order: 0 });
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    fetch('/api/admin/skills')
      .then(r => r.json())
      .then(data => { setItems(data); setLoading(false); });
  }, [refreshKey]);

  const openNew = () => { setEditing(null); setForm({ name: '', level: 80, sort_order: items.length }); setShowForm(true); };
  const openEdit = (s: Skill) => { setEditing(s); setForm({ name: s.name, level: s.level, sort_order: s.sort_order ?? 0 }); setShowForm(true); };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault(); setIsSaving(true);
    const res = editing
      ? await fetch(`/api/admin/skills/${editing.id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
      : await fetch('/api/admin/skills', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
    if (res.ok) { setShowForm(false); setRefreshKey(k => k + 1); }
    setIsSaving(false);
  };

  const handleDelete = async () => {
    if (!deleteTarget) return; setIsDeleting(true);
    await fetch(`/api/admin/skills/${deleteTarget.id}`, { method: 'DELETE' });
    setDeleteTarget(null); setIsDeleting(false); setRefreshKey(k => k + 1);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <button onClick={openNew} className="flex items-center gap-2 px-4 py-2.5 bg-stone-900 text-white rounded-xl text-sm font-medium hover:bg-stone-800 transition-colors"><Plus className="w-4 h-4" />Add Skill</button>
      </div>
      {loading ? <div className="space-y-2">{Array.from({ length: 4 }).map((_, i) => <div key={i} className="h-14 bg-stone-200 rounded-xl animate-pulse" />)}</div> : (
        <div className="bg-white rounded-2xl border border-stone-200 divide-y divide-stone-100">
          {items.map((s) => (
            <div key={s.id} className="flex items-center gap-4 px-6 py-4">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-stone-800 mb-1">{s.name}</p>
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-2 bg-stone-100 rounded-full"><div className="h-full bg-stone-800 rounded-full" style={{ width: `${s.level}%` }} /></div>
                  <span className="text-xs text-stone-400 w-8 text-right">{s.level}%</span>
                </div>
              </div>
              <div className="flex gap-2">
                <button onClick={() => openEdit(s)} className="p-2 text-stone-500 hover:text-stone-900 hover:bg-stone-100 rounded-lg transition-colors"><Pencil className="w-4 h-4" /></button>
                <button onClick={() => setDeleteTarget(s)} className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"><Trash2 className="w-4 h-4" /></button>
              </div>
            </div>
          ))}
        </div>
      )}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50" onClick={() => setShowForm(false)} />
          <div className="relative bg-white rounded-2xl shadow-xl max-w-md w-full p-8">
            <button onClick={() => setShowForm(false)} className="absolute top-4 right-4 text-stone-400 hover:text-stone-700"><X className="w-5 h-5" /></button>
            <h3 className="text-xl font-bold text-stone-900 mb-6">{editing ? 'Edit Skill' : 'New Skill'}</h3>
            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">Skill Name *</label>
                <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required
                  className="w-full px-4 py-2.5 border border-stone-300 rounded-xl text-sm focus:ring-2 focus:ring-stone-900 focus:border-transparent" />
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">Level: {form.level}%</label>
                <input type="range" min={0} max={100} value={form.level} onChange={(e) => setForm({ ...form, level: Number(e.target.value) })} className="w-full" />
              </div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setShowForm(false)} className="px-5 py-2.5 border border-stone-300 text-stone-700 rounded-xl text-sm font-medium hover:bg-stone-50">Cancel</button>
                <button type="submit" disabled={isSaving} className="px-5 py-2.5 bg-stone-900 text-white rounded-xl text-sm font-medium hover:bg-stone-800 disabled:opacity-70">{isSaving ? 'Saving...' : 'Save'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
      <ConfirmDialog isOpen={!!deleteTarget} title="Delete Skill" message={`Delete "${deleteTarget?.name}"?`} onConfirm={handleDelete} onCancel={() => setDeleteTarget(null)} isLoading={isDeleting} />
    </div>
  );
}

function EquipmentTab() {
  const [items, setItems] = useState<Equipment[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Equipment | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Equipment | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [form, setForm] = useState({ name: '', description: '', sort_order: 0 });
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    fetch('/api/admin/equipment')
      .then(r => r.json())
      .then(data => { setItems(data); setLoading(false); });
  }, [refreshKey]);

  const openNew = () => { setEditing(null); setForm({ name: '', description: '', sort_order: items.length }); setShowForm(true); };
  const openEdit = (eq: Equipment) => { setEditing(eq); setForm({ name: eq.name, description: eq.description, sort_order: eq.sort_order ?? 0 }); setShowForm(true); };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault(); setIsSaving(true);
    const res = editing
      ? await fetch(`/api/admin/equipment/${editing.id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
      : await fetch('/api/admin/equipment', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
    if (res.ok) { setShowForm(false); setRefreshKey(k => k + 1); }
    setIsSaving(false);
  };

  const handleDelete = async () => {
    if (!deleteTarget) return; setIsDeleting(true);
    await fetch(`/api/admin/equipment/${deleteTarget.id}`, { method: 'DELETE' });
    setDeleteTarget(null); setIsDeleting(false); setRefreshKey(k => k + 1);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <button onClick={openNew} className="flex items-center gap-2 px-4 py-2.5 bg-stone-900 text-white rounded-xl text-sm font-medium hover:bg-stone-800 transition-colors"><Plus className="w-4 h-4" />Add Equipment</button>
      </div>
      {loading ? <div className="space-y-2">{Array.from({ length: 4 }).map((_, i) => <div key={i} className="h-14 bg-stone-200 rounded-xl animate-pulse" />)}</div> : (
        <div className="bg-white rounded-2xl border border-stone-200 divide-y divide-stone-100">
          {items.map((eq) => (
            <div key={eq.id} className="flex items-center gap-4 px-6 py-4">
              <div className="flex-1">
                <p className="text-sm font-medium text-stone-800">{eq.name}</p>
                <p className="text-xs text-stone-400">{eq.description}</p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => openEdit(eq)} className="p-2 text-stone-500 hover:text-stone-900 hover:bg-stone-100 rounded-lg transition-colors"><Pencil className="w-4 h-4" /></button>
                <button onClick={() => setDeleteTarget(eq)} className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"><Trash2 className="w-4 h-4" /></button>
              </div>
            </div>
          ))}
        </div>
      )}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50" onClick={() => setShowForm(false)} />
          <div className="relative bg-white rounded-2xl shadow-xl max-w-md w-full p-8">
            <button onClick={() => setShowForm(false)} className="absolute top-4 right-4 text-stone-400 hover:text-stone-700"><X className="w-5 h-5" /></button>
            <h3 className="text-xl font-bold text-stone-900 mb-6">{editing ? 'Edit Equipment' : 'New Equipment'}</h3>
            <form onSubmit={handleSave} className="space-y-4">
              {[{ label: 'Name *', key: 'name' }, { label: 'Description', key: 'description' }].map(({ label, key }) => (
                <div key={key}>
                  <label className="block text-sm font-medium text-stone-700 mb-2">{label}</label>
                  <input type="text" value={(form as Record<string, unknown>)[key] as string} onChange={(e) => setForm({ ...form, [key]: e.target.value })} required={key === 'name'}
                    className="w-full px-4 py-2.5 border border-stone-300 rounded-xl text-sm focus:ring-2 focus:ring-stone-900 focus:border-transparent" />
                </div>
              ))}
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setShowForm(false)} className="px-5 py-2.5 border border-stone-300 text-stone-700 rounded-xl text-sm font-medium hover:bg-stone-50">Cancel</button>
                <button type="submit" disabled={isSaving} className="px-5 py-2.5 bg-stone-900 text-white rounded-xl text-sm font-medium hover:bg-stone-800 disabled:opacity-70">{isSaving ? 'Saving...' : 'Save'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
      <ConfirmDialog isOpen={!!deleteTarget} title="Delete Equipment" message={`Delete "${deleteTarget?.name}"?`} onConfirm={handleDelete} onCancel={() => setDeleteTarget(null)} isLoading={isDeleting} />
    </div>
  );
}

function AwardsTab() {
  const [items, setItems] = useState<Award[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Award | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Award | null>(null); 
  const [isDeleting, setIsDeleting] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [form, setForm] = useState({ year: String(new Date().getFullYear()), title: '', category: '', sort_order: 0 });
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    fetch('/api/admin/awards')
      .then(r => r.json())
      .then(data => { setItems(data); setLoading(false); });
  }, [refreshKey]);

  const openNew = () => { setEditing(null); setForm({ year: String(new Date().getFullYear()), title: '', category: '', sort_order: items.length }); setShowForm(true); };
  const openEdit = (a: Award) => { setEditing(a); setForm({ year: a.year, title: a.title, category: a.category, sort_order: a.sort_order ?? 0 }); setShowForm(true); };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault(); setIsSaving(true);
    const res = editing
      ? await fetch(`/api/admin/awards/${editing.id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
      : await fetch('/api/admin/awards', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
    if (res.ok) { setShowForm(false); setRefreshKey(k => k + 1); }
    setIsSaving(false);
  };

  const handleDelete = async () => {
    if (!deleteTarget) return; setIsDeleting(true);
    await fetch(`/api/admin/awards/${deleteTarget.id}`, { method: 'DELETE' });
    setDeleteTarget(null); setIsDeleting(false); setRefreshKey(k => k + 1);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <button onClick={openNew} className="flex items-center gap-2 px-4 py-2.5 bg-stone-900 text-white rounded-xl text-sm font-medium hover:bg-stone-800 transition-colors"><Plus className="w-4 h-4" />Add Award</button>
      </div>
      {loading ? <div className="space-y-2">{Array.from({ length: 3 }).map((_, i) => <div key={i} className="h-14 bg-stone-200 rounded-xl animate-pulse" />)}</div> : (
        <div className="bg-white rounded-2xl border border-stone-200 divide-y divide-stone-100">
          {items.map((a) => (
            <div key={a.id} className="flex items-center gap-4 px-6 py-4">
              <span className="text-xs font-bold text-stone-400 w-10 shrink-0">{a.year}</span>
              <div className="flex-1">
                <p className="text-sm font-medium text-stone-800">{a.title}</p>
                <p className="text-xs text-stone-400">{a.category}</p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => openEdit(a)} className="p-2 text-stone-500 hover:text-stone-900 hover:bg-stone-100 rounded-lg transition-colors"><Pencil className="w-4 h-4" /></button>
                <button onClick={() => setDeleteTarget(a)} className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"><Trash2 className="w-4 h-4" /></button>
              </div>
            </div>
          ))}
        </div>
      )}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50" onClick={() => setShowForm(false)} />
          <div className="relative bg-white rounded-2xl shadow-xl max-w-md w-full p-8">
            <button onClick={() => setShowForm(false)} className="absolute top-4 right-4 text-stone-400 hover:text-stone-700"><X className="w-5 h-5" /></button>
            <h3 className="text-xl font-bold text-stone-900 mb-6">{editing ? 'Edit Award' : 'New Award'}</h3>
            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">Year *</label>
                <input type="number" value={form.year} onChange={(e) => setForm({ ...form, year: e.target.value })} required min={1900} max={2100}
                  className="w-full px-4 py-2.5 border border-stone-300 rounded-xl text-sm focus:ring-2 focus:ring-stone-900 focus:border-transparent" />
              </div>
              {[{ label: 'Award Title *', key: 'title' }, { label: 'Category *', key: 'category' }].map(({ label, key }) => (
                <div key={key}>
                  <label className="block text-sm font-medium text-stone-700 mb-2">{label}</label>
                  <input type="text" value={(form as Record<string, unknown>)[key] as string} onChange={(e) => setForm({ ...form, [key]: e.target.value })} required
                    className="w-full px-4 py-2.5 border border-stone-300 rounded-xl text-sm focus:ring-2 focus:ring-stone-900 focus:border-transparent" />
                </div>
              ))}
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setShowForm(false)} className="px-5 py-2.5 border border-stone-300 text-stone-700 rounded-xl text-sm font-medium hover:bg-stone-50">Cancel</button>
                <button type="submit" disabled={isSaving} className="px-5 py-2.5 bg-stone-900 text-white rounded-xl text-sm font-medium hover:bg-stone-800 disabled:opacity-70">{isSaving ? 'Saving...' : 'Save'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
      <ConfirmDialog isOpen={!!deleteTarget} title="Delete Award" message={`Delete "${deleteTarget?.title}"?`} onConfirm={handleDelete} onCancel={() => setDeleteTarget(null)} isLoading={isDeleting} />
    </div>
  );
}
