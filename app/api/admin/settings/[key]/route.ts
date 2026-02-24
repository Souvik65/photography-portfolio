import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import { updateSiteSetting } from '@/lib/db/settings';
import { HeroSettingsSchema, AboutSettingsSchema, FooterSettingsSchema } from '@/lib/validations';
import type { HeroSettings, AboutSettings, FooterSettings } from '@/lib/types';

const SCHEMAS = {
  hero: HeroSettingsSchema,
  about: AboutSettingsSchema,
  footer: FooterSettingsSchema,
};

export async function PUT(req: NextRequest, { params }: { params: Promise<{ key: string }> }) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { key } = await params;
  if (!['hero', 'about', 'footer'].includes(key)) {
    return NextResponse.json({ error: 'Invalid settings key' }, { status: 400 });
  }

  try {
    const body = await req.json();
    const schema = SCHEMAS[key as keyof typeof SCHEMAS];
    const parsed = schema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid data', details: parsed.error.flatten() }, { status: 400 });
    }
    await updateSiteSetting(
      key as 'hero' | 'about' | 'footer',
      parsed.data as HeroSettings | AboutSettings | FooterSettings
    );
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to update settings' }, { status: 500 });
  }
}
