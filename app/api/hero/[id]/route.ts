import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@/auth';

// GET single hero slider
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const slider = await prisma.heroSlider.findUnique({
      where: { id: params.id },
    });

    if (!slider) {
      return NextResponse.json({ error: 'Hero slider not found' }, { status: 404 });
    }

    return NextResponse.json(slider);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch hero slider' }, { status: 500 });
  }
}

// PUT update hero slider
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  const session = await auth();

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { title, subtitle, imageUrl, order, active } = body;

    const slider = await prisma.heroSlider.update({
      where: { id: params.id },
      data: {
        title,
        subtitle,
        imageUrl,
        order,
        active,
      },
    });

    return NextResponse.json(slider);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update hero slider' }, { status: 500 });
  }
}

// DELETE hero slider
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  const session = await auth();

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    await prisma.heroSlider.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ message: 'Hero slider deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete hero slider' }, { status: 500 });
  }
}
