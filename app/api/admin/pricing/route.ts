import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import { getPricingPackages, createPricingPackage } from '@/lib/db/pricing';
import { PricingPackageSchema } from '@/lib/validations';

export async function GET() {
  const session = await auth();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const packages = await getPricingPackages();
    return NextResponse.json(packages);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to fetch packages' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const body = await req.json();
    const parsed = PricingPackageSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid data', details: parsed.error.flatten() }, { status: 400 });
    }
    const pkg = await createPricingPackage(parsed.data);
    return NextResponse.json(pkg, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to create package' }, { status: 500 });
  }
}
