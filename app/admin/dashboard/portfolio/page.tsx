import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import PortfolioManagement from './PortfolioManagement';

export default async function PortfolioAdminPage() {
  const session = await auth();

  if (!session) {
    redirect('/admin/login');
  }

  const portfolioItems = await prisma.portfolio.findMany({
    orderBy: { order: 'asc' },
    include: {
      images: {
        orderBy: { order: 'asc' },
      },
      categories: true,
    },
  });

  const categories = await prisma.portfolioCategory.findMany({
    orderBy: { name: 'asc' },
  });

  return <PortfolioManagement user={session.user} portfolioItems={portfolioItems} categories={categories} />;
}
