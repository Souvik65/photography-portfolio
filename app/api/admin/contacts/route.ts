import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import { getContacts } from '@/lib/db/submissions';
import type { SubmissionStatus } from '@/lib/types';

export async function GET(req: NextRequest) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const status = searchParams.get('status') as SubmissionStatus | null;

  try {
    const contacts = await getContacts(status ?? undefined);
    return NextResponse.json(contacts);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to fetch contacts' }, { status: 500 });
  }
}
