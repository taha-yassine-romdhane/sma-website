import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import ProductsManagement from './ProductsManagement';

export default async function ProductsAdminPage() {
  const session = await auth();

  if (!session) {
    redirect('/admin/login');
  }

  const products = await prisma.product.findMany({
    orderBy: { order: 'asc' },
    include: {
      images: {
        orderBy: { order: 'asc' },
      },
    },
  });

  return <ProductsManagement user={session.user} products={products} />;
}
