import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import HeroManagement from './HeroManagement';

export default async function HeroPage() {
  const session = await auth();

  if (!session) {
    redirect('/admin/login');
  }

  const heroSliders = await prisma.heroSlider.findMany({
    orderBy: { order: 'asc' },
  });

  return <HeroManagement user={session.user} heroSliders={heroSliders} />;
}
