import { createAdminSupabaseClient, createServerSupabaseClient } from '@/lib/supabase';
import type { SiteSettings, HeroSettings, AboutSettings, FooterSettings } from '@/lib/types';

export async function getSiteSettings(): Promise<SiteSettings> {
  const supabase = createServerSupabaseClient();
  const { data, error } = await supabase
    .from('site_settings')
    .select('*');
  if (error) throw new Error(error.message);

  const map: Record<string, unknown> = {};
  for (const row of data ?? []) {
    map[row.key] = row.value;
  }

  return {
    hero: (map.hero ?? {}) as HeroSettings,
    about: (map.about ?? {}) as AboutSettings,
    footer: (map.footer ?? {}) as FooterSettings,
  };
}

export async function updateSiteSetting(
  key: 'hero' | 'about' | 'footer',
  value: HeroSettings | AboutSettings | FooterSettings
): Promise<void> {
  const supabase = createAdminSupabaseClient();
  const { error } = await supabase
    .from('site_settings')
    .upsert({ key, value }, { onConflict: 'key' });
  if (error) throw new Error(error.message);
}
