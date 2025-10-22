import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import PartnerManagement from './PartnerManagement';

export const dynamic = 'force-dynamic';

export default async function PartnersPage() {
  const session = await auth();

  if (!session) {
    redirect('/admin/login');
  }

  const partners = await prisma.partner.findMany({
    orderBy: { order: 'asc' },
  });

  return <PartnerManagement user={session.user} partners={partners} />;
}
