import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import { updatePricingPackage, deletePricingPackage } from '@/lib/db/pricing';
import { PricingPackageUpdateSchema } from '@/lib/validations';

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const { id } = await params;
    const body = await req.json();
    const parsed = PricingPackageUpdateSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid data', details: parsed.error.flatten() }, { status: 400 });
    }
    const pkg = await updatePricingPackage(id, parsed.data);
    return NextResponse.json(pkg);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to update package' }, { status: 500 });
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const { id } = await params;
    await deletePricingPackage(id);
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to delete package' }, { status: 500 });
  }
}
