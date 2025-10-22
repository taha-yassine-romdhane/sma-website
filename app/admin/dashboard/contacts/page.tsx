import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import ContactManagement from './ContactManagement';

export default async function ContactsPage() {
  const session = await auth();

  if (!session) {
    redirect('/admin/login');
  }

  const contacts = await prisma.contact.findMany({
    orderBy: { createdAt: 'desc' },
  });

  return <ContactManagement user={session.user} contacts={contacts} />;
}
