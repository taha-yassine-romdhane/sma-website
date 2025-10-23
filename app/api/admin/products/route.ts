import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@/auth';

// POST create new product
export async function POST(request: NextRequest) {
  const session = await auth();

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { title, slug, category, description, mainImageUrl, features, technicalSpecs, galleryImages, published, order } = body;

    // Create product
    const product = await prisma.product.create({
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

    // Create gallery images if provided
    if (galleryImages && galleryImages.length > 0) {
      await prisma.productImage.createMany({
        data: galleryImages.map((imageUrl: string, index: number) => ({
          productId: product.id,
          imageUrl,
          order: index,
        })),
      });
    }

    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json({ error: 'Failed to create product' }, { status: 500 });
  }
}
