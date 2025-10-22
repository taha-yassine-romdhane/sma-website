import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@/auth';

// GET all portfolio items
export async function GET() {
  try {
    const portfolio = await prisma.portfolio.findMany({
      orderBy: { order: 'asc' },
    });
    return NextResponse.json(portfolio);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch portfolio items' }, { status: 500 });
  }
}

// POST create new portfolio item
export async function POST(request: NextRequest) {
  const session = await auth();

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { title, category, description, imageUrl, published, order } = body;

    const portfolio = await prisma.portfolio.create({
      data: {
        title,
        category,
        description,
        imageUrl,
        published: published ?? true,
        order: order ?? 0,
      },
    });

    return NextResponse.json(portfolio, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create portfolio item' }, { status: 500 });
  }
}
