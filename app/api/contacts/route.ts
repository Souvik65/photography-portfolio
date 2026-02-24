import { NextRequest, NextResponse } from 'next/server';
import { createContact } from '@/lib/db/submissions';
import { ContactSubmissionSchema } from '@/lib/validations';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = ContactSubmissionSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid request', details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const contact = await createContact(parsed.data);
    return NextResponse.json(contact, { status: 201 });
  } catch (error) {
    console.error('Contact submission error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
