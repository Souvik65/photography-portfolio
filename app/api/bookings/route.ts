import { NextRequest, NextResponse } from 'next/server';
import { createBooking } from '@/lib/db/submissions';
import { BookingSubmissionSchema } from '@/lib/validations';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = BookingSubmissionSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid request', details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const booking = await createBooking(parsed.data);
    return NextResponse.json(booking, { status: 201 });
  } catch (error) {
    console.error('Booking submission error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
