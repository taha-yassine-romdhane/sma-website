import { redirect } from 'next/navigation';
import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import CategoriesManagement from './CategoriesManagement';

export default async function CategoriesPage() {
  const session = await auth();

  if (!session) {
    redirect('/admin/login');
  }

  const categories = await prisma.portfolioCategory.findMany({
    orderBy: { name: 'asc' },
    include: {
      _count: {
        select: { portfolios: true },
      },
    },
  });

  return <CategoriesManagement categories={categories} />;
}
