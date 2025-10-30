import { prisma } from '@/lib/prisma';
import PortfolioClient from './PortfolioClient';

export const dynamic = 'force-dynamic';

async function getPortfolioItems() {
  return await prisma.portfolio.findMany({
    where: { published: true },
    orderBy: { order: 'asc' },
    include: {
      images: {
        orderBy: { order: 'asc' },
      },
      categories: true,
    },
  });
}

export default async function PortfolioPage() {
  const portfolioItems = await getPortfolioItems();

  return <PortfolioClient portfolioItems={portfolioItems} />;
}
