import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import ProductDetailClient from './ProductDetailClient';

export const dynamic = 'force-dynamic';

async function getProduct(slug: string) {
  const product = await prisma.product.findUnique({
    where: { slug },
    include: {
      images: {
        orderBy: { order: 'asc' },
      },
      categories: true,
    },
  });

  if (!product || !product.published) {
    return null;
  }

  return product;
}

export default async function ProductDetailPage({ params }: { params: { slug: string } }) {
  const product = await getProduct(params.slug);

  if (!product) {
    notFound();
  }

  return <ProductDetailClient product={product} />;
}
