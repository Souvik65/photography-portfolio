'use client';

import { useState, useEffect } from 'react';
import ImageUpload from '@/components/admin/ImageUpload';
import type { SiteSettings } from '@/lib/types';

type AccordionKey = 'hero' | 'about' | 'footer';

export default function SettingsPage() {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState<AccordionKey>('hero');
  const [saving, setSaving] = useState<AccordionKey | null>(null);
  const [saved, setSaved] = useState<AccordionKey | null>(null);

  useEffect(() => {
    fetch('/api/admin/settings').then((r) => r.json()).then((data) => { setSettings(data); setLoading(false); });
  }, []);

  const handleSave = async (key: AccordionKey) => {
    if (!settings) return;
    setSaving(key);
    await fetch(`/api/admin/settings/${key}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(settings[key]),
    });
    setSaving(null);
    setSaved(key);
    setTimeout(() => setSaved(null), 2000);
  };

  const update = <K extends AccordionKey>(section: K, changes: Partial<SiteSettings[K]>) => {
    if (!settings) return;
    setSettings({ ...settings, [section]: { ...settings[section], ...changes } });
  };

  if (loading || !settings) {
    return <div className="flex items-center justify-center py-20"><div className="w-8 h-8 border-2 border-stone-300 border-t-stone-900 rounded-full animate-spin" /></div>;
  }

  const inputClass = 'w-full px-4 py-2.5 border border-stone-300 rounded-xl text-sm focus:ring-2 focus:ring-stone-900 focus:border-transparent';
  const labelClass = 'block text-sm font-medium text-stone-700 mb-2';
  const saveBtn = (key: AccordionKey, label: string) => (
    <button onClick={() => handleSave(key)} disabled={!!saving}
      className="px-6 py-2.5 bg-stone-900 text-white rounded-xl text-sm font-medium hover:bg-stone-800 disabled:opacity-70">
      {saving === key ? 'Saving...' : saved === key ? 'Saved!' : label}
    </button>
  );

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <h2 className="text-2xl font-bold text-stone-900">Site Settings</h2>

      {/* Hero Accordion */}
      <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden">
        <button onClick={() => setOpen(open === 'hero' ? 'about' : 'hero')}
          className="w-full flex items-center justify-between px-6 py-4 font-semibold text-stone-900 hover:bg-stone-50 transition-colors">
          Hero Section
          <span className="text-stone-400">{open === 'hero' ? '▲' : '▼'}</span>
        </button>
        {open === 'hero' && (
          <div className="px-6 pb-6 space-y-4 border-t border-stone-100">
            <div className="pt-4 space-y-4">
              {/* Background image — upload instead of URL input */}
              <ImageUpload
                label="Background Image"
                currentUrl={settings.hero.bg_image || undefined}
                onUpload={(url) => update('hero', { bg_image: url })}
              />

              {[{ label: 'Tagline', key: 'tagline', placeholder: 'e.g. Fine Art Photography' },
                { label: 'Heading', key: 'heading', placeholder: "e.g. Capturing Life's Most Beautiful Moments" },
                { label: 'Subheading', key: 'subheading', placeholder: 'Short description under heading' },
                { label: 'CTA Primary', key: 'cta_primary', placeholder: 'e.g. View Portfolio' },
                { label: 'CTA Secondary', key: 'cta_secondary', placeholder: 'e.g. Book a Session' },
              ].map(({ label, key, placeholder }) => (
                <div key={key}>
                  <label className={labelClass}>{label}</label>
                  <input type="text" value={(settings.hero as unknown as Record<string, string>)[key] ?? ''} placeholder={placeholder}
                    onChange={(e) => update('hero', { [key]: e.target.value } as Partial<SiteSettings['hero']>)}
                    className={inputClass} />
                </div>
              ))}
            </div>
            <div className="pt-2">{saveBtn('hero', 'Save Hero')}</div>
          </div>
        )}
      </div>

      {/* About Accordion */}
      <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden">
        <button onClick={() => setOpen(open === 'about' ? 'hero' : 'about')}
          className="w-full flex items-center justify-between px-6 py-4 font-semibold text-stone-900 hover:bg-stone-50 transition-colors">
          About Me Section
          <span className="text-stone-400">{open === 'about' ? '▲' : '▼'}</span>
        </button>
        {open === 'about' && (
          <div className="px-6 pb-6 space-y-4 border-t border-stone-100">
            <div className="pt-4 space-y-4">
              {/* Profile photo — upload instead of URL input */}
              <ImageUpload
                label="Profile Photo"
                currentUrl={settings.about.profile_image || undefined}
                onUpload={(url) => update('about', { profile_image: url })}
              />

              {[{ label: 'Name', key: 'name', placeholder: 'e.g. Alex' },
                { label: 'Subtitle', key: 'subtitle', placeholder: 'e.g. Visual Storyteller.' },
              ].map(({ label, key, placeholder }) => (
                <div key={key}>
                  <label className={labelClass}>{label}</label>
                  <input type="text" value={(settings.about as unknown as Record<string, string>)[key] ?? ''} placeholder={placeholder}
                    onChange={(e) => update('about', { [key]: e.target.value } as Partial<SiteSettings['about']>)}
                    className={inputClass} />
                </div>
              ))}

              {[{ label: 'Bio Paragraph 1', key: 'bio_1' }, { label: 'Bio Paragraph 2', key: 'bio_2' }].map(({ label, key }) => (
                <div key={key}>
                  <label className={labelClass}>{label}</label>
                  <textarea rows={4} value={(settings.about as unknown as Record<string, string>)[key] ?? ''}
                    onChange={(e) => update('about', { [key]: e.target.value } as Partial<SiteSettings['about']>)}
                    className={`${inputClass} resize-none`} />
                </div>
              ))}
            </div>
            {saveBtn('about', 'Save About')}
          </div>
        )}
      </div>

      {/* Footer Accordion */}
      <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden">
        <button onClick={() => setOpen(open === 'footer' ? 'hero' : 'footer')}
          className="w-full flex items-center justify-between px-6 py-4 font-semibold text-stone-900 hover:bg-stone-50 transition-colors">
          Footer & Contact
          <span className="text-stone-400">{open === 'footer' ? '▲' : '▼'}</span>
        </button>
        {open === 'footer' && (
          <div className="px-6 pb-6 space-y-4 border-t border-stone-100">
            <div className="pt-4 space-y-4">
              {[{ label: 'Brand Name', key: 'brand_name' }, { label: 'Tagline', key: 'tagline' },
                { label: 'Email', key: 'email' }, { label: 'Phone', key: 'phone' },
                { label: 'Instagram URL', key: 'instagram_url' },
                { label: 'Twitter URL', key: 'twitter_url' },
                { label: 'Facebook URL', key: 'facebook_url' },
              ].map(({ label, key }) => (
                <div key={key}>
                  <label className={labelClass}>{label}</label>
                  <input type="text" value={(settings.footer as unknown as Record<string, string>)[key] ?? ''}
                    onChange={(e) => update('footer', { [key]: e.target.value } as Partial<SiteSettings['footer']>)}
                    className={inputClass} />
                </div>
              ))}
              <div>
                <label className={labelClass}>Address</label>
                <textarea rows={3} value={settings.footer.address ?? ''}
                  onChange={(e) => update('footer', { address: e.target.value })}
                  className={`${inputClass} resize-none`} />
              </div>
            </div>
            {saveBtn('footer', 'Save Footer')}
          </div>
        )}
      </div>
    </div>
  );
}
