import { prisma } from '@/lib/prisma';
import ProductsClient from './ProductsClient';

export const dynamic = 'force-dynamic';

async function getProducts() {
  return await prisma.product.findMany({
    where: { published: true },
    orderBy: { order: 'asc' },
  });
}

export default async function ProductsPage() {
  const products = await getProducts();

  return <ProductsClient products={products} />;
}
