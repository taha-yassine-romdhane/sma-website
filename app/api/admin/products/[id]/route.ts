import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@/auth';

// PUT update product
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  const session = await auth();

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { title, slug, category, description, mainImageUrl, features, technicalSpecs, galleryImages, published, order } = body;

    // Update product
    const product = await prisma.product.update({
      where: { id: params.id },
      data: {
        title,
        slug,
        category,
        description,
        mainImageUrl,
        features: JSON.stringify(features || []),
        technicalSpecs: JSON.stringify(technicalSpecs || []),
        published: published ?? true,
        order: order ?? 0,
      },
    });

    // Delete existing gallery images
    await prisma.productImage.deleteMany({
      where: { productId: params.id },
    });

    // Create new gallery images if provided
    if (galleryImages && galleryImages.length > 0) {
      await prisma.productImage.createMany({
        data: galleryImages.map((imageUrl: string, index: number) => ({
          productId: params.id,
          imageUrl,
          order: index,
        })),
      });
    }

    return NextResponse.json(product);
  } catch (error) {
    console.error('Error updating product:', error);
    return NextResponse.json({ error: 'Failed to update product' }, { status: 500 });
  }
}

// DELETE product
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  const session = await auth();

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    // Delete product (cascade will delete images automatically)
    await prisma.product.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error);
    return NextResponse.json({ error: 'Failed to delete product' }, { status: 500 });
  }
}
