import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';

// PUT - Update category
export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await auth();

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const { name } = await request.json();

    if (!name || !name.trim()) {
      return NextResponse.json({ error: 'Category name is required' }, { status: 400 });
    }

    const category = await prisma.portfolioCategory.update({
      where: { id },
      data: {
        name: name.trim(),
      },
      include: {
        _count: {
          select: { portfolios: true, products: true },
        },
      },
    });

    return NextResponse.json(category);
  } catch (error: any) {
    console.error('Error updating category:', error);

    // Handle unique constraint violation
    if (error.code === 'P2002') {
      return NextResponse.json({ error: 'Category name already exists' }, { status: 409 });
    }

    // Handle not found
    if (error.code === 'P2025') {
      return NextResponse.json({ error: 'Category not found' }, { status: 404 });
    }

    return NextResponse.json({ error: 'Failed to update category' }, { status: 500 });
  }
}

// DELETE - Delete category
export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await auth();

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;

    // Check if category is being used by any portfolios or products
    const category = await prisma.portfolioCategory.findUnique({
      where: { id },
      include: {
        _count: {
          select: { portfolios: true, products: true },
        },
      },
    });

    if (!category) {
      return NextResponse.json({ error: 'Category not found' }, { status: 404 });
    }

    const totalUsage = category._count.portfolios + category._count.products;
    if (totalUsage > 0) {
      const items = [];
      if (category._count.portfolios > 0) items.push(`${category._count.portfolios} portfolio item(s)`);
      if (category._count.products > 0) items.push(`${category._count.products} product(s)`);

      return NextResponse.json(
        { error: `Cannot delete category. It is being used by ${items.join(' and ')}` },
        { status: 400 }
      );
    }

    await prisma.portfolioCategory.delete({
      where: { id },
    });

    return NextResponse.json({ message: 'Category deleted successfully' });
  } catch (error: any) {
    console.error('Error deleting category:', error);

    // Handle not found
    if (error.code === 'P2025') {
      return NextResponse.json({ error: 'Category not found' }, { status: 404 });
    }

    return NextResponse.json({ error: 'Failed to delete category' }, { status: 500 });
  }
}
