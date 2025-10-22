import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@/auth';

// GET all hero sliders
export async function GET() {
  try {
    const sliders = await prisma.heroSlider.findMany({
      where: { active: true },
      orderBy: { order: 'asc' },
    });
    return NextResponse.json(sliders);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch hero sliders' }, { status: 500 });
  }
}

// POST create new hero slider
export async function POST(request: NextRequest) {
  const session = await auth();

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { title, subtitle, imageUrl, order, active } = body;

    const slider = await prisma.heroSlider.create({
      data: {
        title,
        subtitle,
        imageUrl,
        order: order ?? 0,
        active: active ?? true,
      },
    });

    return NextResponse.json(slider, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create hero slider' }, { status: 500 });
  }
}
