'use client';

import { useState } from 'react';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  LayoutDashboard,
  ImageIcon,
  FolderOpen,
  LogOut,
  User,
  Home,
  Mail,
  Users,
  Settings,
} from 'lucide-react';

interface AdminDashboardProps {
  user: {
    name?: string | null;
    email?: string | null;
  } | undefined;
}

export default function AdminDashboard({ user }: AdminDashboardProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('overview');

  const handleSignOut = async () => {
    await signOut({ redirect: false });
    router.push('/admin/login');
  };

  const menuItems = [
    {
      id: 'overview',
      label: 'Vue d\'ensemble',
      icon: LayoutDashboard,
      href: '/admin/dashboard',
    },
    {
      id: 'hero',
      label: 'Hero Slider',
      icon: ImageIcon,
      href: '/admin/dashboard/hero',
    },
    {
      id: 'portfolio',
      label: 'Portfolio',
      icon: FolderOpen,
      href: '/admin/dashboard/portfolio',
    },
    {
      id: 'partners',
      label: 'Partenaires',
      icon: Users,
      href: '/admin/dashboard/partners',
    },
    {
      id: 'contacts',
      label: 'Messages',
      icon: Mail,
      href: '/admin/dashboard/contacts',
    },
    {
      id: 'settings',
      label: 'Paramètres',
      icon: Settings,
      href: '/admin/dashboard/settings',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Top Navigation */}
      <nav className="bg-white border-b border-slate-200">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-sky-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">S</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-900">SMA Admin</h1>
                <p className="text-xs text-slate-600">Tableau de bord</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Link
                href="/"
                target="_blank"
                className="flex items-center gap-2 text-slate-600 hover:text-sky-600 transition-colors"
              >
                <Home size={20} />
                <span className="hidden md:inline text-sm">Voir le site</span>
              </Link>

              <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
                <div className="hidden md:block text-right">
                  <p className="text-sm font-semibold text-slate-900">{user?.name}</p>
                  <p className="text-xs text-slate-600">{user?.email}</p>
                </div>
                <button
                  onClick={handleSignOut}
                  className="flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors"
                >
                  <LogOut size={18} />
                  <span className="hidden md:inline text-sm">Déconnexion</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-xl border border-slate-200 p-4">
              <nav className="space-y-1">
                {menuItems.map((item) => (
                  <Link
                    key={item.id}
                    href={item.href}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                      activeTab === item.id
                        ? 'bg-sky-50 text-sky-700 font-semibold'
                        : 'text-slate-700 hover:bg-slate-50'
                    }`}
                    onClick={() => setActiveTab(item.id)}
                  >
                    <item.icon size={20} />
                    <span>{item.label}</span>
                  </Link>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="md:col-span-3">
            <div className="bg-white rounded-xl border border-slate-200 p-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Vue d'ensemble</h2>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="p-6 bg-gradient-to-br from-sky-50 to-sky-100 rounded-xl border border-sky-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-sky-700">Hero Slider</p>
                      <p className="text-3xl font-bold text-sky-900 mt-2">3</p>
                      <p className="text-xs text-sky-600 mt-1">Images actives</p>
                    </div>
                    <ImageIcon className="w-12 h-12 text-sky-600 opacity-50" />
                  </div>
                  <Link
                    href="/admin/dashboard/hero"
                    className="mt-4 inline-flex items-center text-sm font-semibold text-sky-700 hover:text-sky-800"
                  >
                    Gérer →
                  </Link>
                </div>

                <div className="p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl border border-purple-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-purple-700">Portfolio</p>
                      <p className="text-3xl font-bold text-purple-900 mt-2">6</p>
                      <p className="text-xs text-purple-600 mt-1">Projets publiés</p>
                    </div>
                    <FolderOpen className="w-12 h-12 text-purple-600 opacity-50" />
                  </div>
                  <Link
                    href="/admin/dashboard/portfolio"
                    className="mt-4 inline-flex items-center text-sm font-semibold text-purple-700 hover:text-purple-800"
                  >
                    Gérer →
                  </Link>
                </div>

                <div className="p-6 bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl border border-orange-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-orange-700">Partenaires</p>
                      <p className="text-3xl font-bold text-orange-900 mt-2">0</p>
                      <p className="text-xs text-orange-600 mt-1">Logos actifs</p>
                    </div>
                    <Users className="w-12 h-12 text-orange-600 opacity-50" />
                  </div>
                  <Link
                    href="/admin/dashboard/partners"
                    className="mt-4 inline-flex items-center text-sm font-semibold text-orange-700 hover:text-orange-800"
                  >
                    Gérer →
                  </Link>
                </div>

                <div className="p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-xl border border-green-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-green-700">Messages</p>
                      <p className="text-3xl font-bold text-green-900 mt-2">0</p>
                      <p className="text-xs text-green-600 mt-1">Nouveaux messages</p>
                    </div>
                    <Mail className="w-12 h-12 text-green-600 opacity-50" />
                  </div>
                  <Link
                    href="/admin/dashboard/contacts"
                    className="mt-4 inline-flex items-center text-sm font-semibold text-green-700 hover:text-green-800"
                  >
                    Gérer →
                  </Link>
                </div>
              </div>

              <div className="mt-8 p-6 bg-slate-50 rounded-xl border border-slate-200">
                <h3 className="text-lg font-semibold text-slate-900 mb-4">Accès rapide</h3>
                <div className="space-y-3">
                  <Link
                    href="/admin/dashboard/hero"
                    className="block p-4 bg-white rounded-lg border border-slate-200 hover:border-sky-600 hover:shadow-sm transition-all"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-slate-900">Modifier le Hero Slider</p>
                        <p className="text-sm text-slate-600 mt-1">Gérer les images et textes de la bannière principale</p>
                      </div>
                      <ImageIcon className="w-6 h-6 text-slate-400" />
                    </div>
                  </Link>

                  <Link
                    href="/admin/dashboard/portfolio"
                    className="block p-4 bg-white rounded-lg border border-slate-200 hover:border-sky-600 hover:shadow-sm transition-all"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-slate-900">Gérer le Portfolio</p>
                        <p className="text-sm text-slate-600 mt-1">Ajouter, modifier ou supprimer des projets</p>
                      </div>
                      <FolderOpen className="w-6 h-6 text-slate-400" />
                    </div>
                  </Link>

                  <Link
                    href="/admin/dashboard/partners"
                    className="block p-4 bg-white rounded-lg border border-slate-200 hover:border-sky-600 hover:shadow-sm transition-all"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-slate-900">Gérer les Partenaires</p>
                        <p className="text-sm text-slate-600 mt-1">Ajouter ou modifier les logos des partenaires</p>
                      </div>
                      <Users className="w-6 h-6 text-slate-400" />
                    </div>
                  </Link>

                  <Link
                    href="/admin/dashboard/contacts"
                    className="block p-4 bg-white rounded-lg border border-slate-200 hover:border-sky-600 hover:shadow-sm transition-all"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-slate-900">Voir les Messages</p>
                        <p className="text-sm text-slate-600 mt-1">Consulter les messages de contact reçus</p>
                      </div>
                      <Mail className="w-6 h-6 text-slate-400" />
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
