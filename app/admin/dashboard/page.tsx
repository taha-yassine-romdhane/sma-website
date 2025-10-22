import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import AdminDashboard from './AdminDashboard';

export default async function DashboardPage() {
  const session = await auth();

  if (!session) {
    redirect('/admin/login');
  }

  return <AdminDashboard user={session.user} />;
}
