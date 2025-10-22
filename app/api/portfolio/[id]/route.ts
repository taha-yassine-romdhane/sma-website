import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@/auth';

// GET single portfolio item
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const portfolio = await prisma.portfolio.findUnique({
      where: { id: params.id },
    });

    if (!portfolio) {
      return NextResponse.json({ error: 'Portfolio item not found' }, { status: 404 });
    }

    return NextResponse.json(portfolio);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch portfolio item' }, { status: 500 });
  }
}

// PUT update portfolio item
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  const session = await auth();

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { title, category, description, imageUrl, published, order } = body;

    const portfolio = await prisma.portfolio.update({
      where: { id: params.id },
      data: {
        title,
        category,
        description,
        imageUrl,
        published,
        order,
      },
    });

    return NextResponse.json(portfolio);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update portfolio item' }, { status: 500 });
  }
}

// DELETE portfolio item
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  const session = await auth();

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    await prisma.portfolio.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ message: 'Portfolio item deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete portfolio item' }, { status: 500 });
  }
}
