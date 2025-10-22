'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowLeft,
  Mail,
  Trash2,
  Phone,
  Calendar,
  User,
  CheckCircle,
  Circle,
  X,
  Eye,
} from 'lucide-react';

interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  subject: string;
  message: string;
  read: boolean;
  createdAt: Date;
}

interface ContactManagementProps {
  user: any;
  contacts: Contact[];
}

export default function ContactManagement({ user, contacts: initialContacts }: ContactManagementProps) {
  const router = useRouter();
  const [contacts, setContacts] = useState<Contact[]>(initialContacts);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [filter, setFilter] = useState<'all' | 'read' | 'unread'>('all');

  const filteredContacts = contacts.filter((contact) => {
    if (filter === 'read') return contact.read;
    if (filter === 'unread') return !contact.read;
    return true;
  });

  const unreadCount = contacts.filter((c) => !c.read).length;

  const handleViewContact = async (contact: Contact) => {
    setSelectedContact(contact);

    // Mark as read if not already
    if (!contact.read) {
      try {
        const response = await fetch(`/api/contact/${contact.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ read: true }),
        });

        if (response.ok) {
          setContacts(contacts.map((c) => (c.id === contact.id ? { ...c, read: true } : c)));
          router.refresh();
        }
      } catch (error) {
        console.error('Failed to mark as read:', error);
      }
    }
  };

  const handleToggleRead = async (contact: Contact) => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/contact/${contact.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ read: !contact.read }),
      });

      if (response.ok) {
        const updatedContact = await response.json();
        setContacts(contacts.map((c) => (c.id === updatedContact.id ? updatedContact : c)));
        router.refresh();
      }
    } catch (error) {
      console.error('Failed to toggle read status:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce message ?')) return;

    setIsLoading(true);
    try {
      const response = await fetch(`/api/contact/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setContacts(contacts.filter((c) => c.id !== id));
        if (selectedContact?.id === id) {
          setSelectedContact(null);
        }
        router.refresh();
      }
    } catch (error) {
      console.error('Failed to delete contact:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Top Navigation */}
      <nav className="bg-white border-b border-slate-200">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link
                href="/admin/dashboard"
                className="flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors"
              >
                <ArrowLeft size={20} />
                <span>Retour au tableau de bord</span>
              </Link>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm text-slate-600">{user?.email}</span>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-xl border border-slate-200 p-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">Messages de Contact</h1>
              <p className="text-slate-600 mt-2">
                {unreadCount > 0 ? (
                  <span className="text-sky-600 font-semibold">{unreadCount} nouveau(x) message(s)</span>
                ) : (
                  'Aucun nouveau message'
                )}
              </p>
            </div>

            {/* Filter Buttons */}
            <div className="flex gap-2">
              <button
                onClick={() => setFilter('all')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  filter === 'all'
                    ? 'bg-sky-600 text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                Tous ({contacts.length})
              </button>
              <button
                onClick={() => setFilter('unread')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  filter === 'unread'
                    ? 'bg-sky-600 text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                Non lus ({unreadCount})
              </button>
              <button
                onClick={() => setFilter('read')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  filter === 'read'
                    ? 'bg-sky-600 text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                Lus ({contacts.length - unreadCount})
              </button>
            </div>
          </div>

          {filteredContacts.length === 0 ? (
            <div className="text-center py-20">
              <Mail className="w-16 h-16 text-slate-300 mx-auto mb-4" />
              <p className="text-slate-600 text-lg">Aucun message trouvé</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              {/* Contact List */}
              <div className="space-y-3 max-h-[600px] overflow-y-auto">
                {filteredContacts.map((contact) => (
                  <div
                    key={contact.id}
                    className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                      selectedContact?.id === contact.id
                        ? 'border-sky-600 bg-sky-50'
                        : contact.read
                        ? 'border-slate-200 bg-white hover:border-slate-300'
                        : 'border-sky-200 bg-sky-50/50 hover:border-sky-300'
                    }`}
                    onClick={() => handleViewContact(contact)}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        {contact.read ? (
                          <CheckCircle size={16} className="text-slate-400" />
                        ) : (
                          <Circle size={16} className="text-sky-600 fill-sky-600" />
                        )}
                        <h3 className="font-bold text-slate-900">{contact.name}</h3>
                      </div>
                      <span className="text-xs text-slate-500">
                        {new Date(contact.createdAt).toLocaleDateString('fr-FR')}
                      </span>
                    </div>
                    <p className="text-sm font-semibold text-slate-700 mb-1">{contact.subject}</p>
                    <p className="text-sm text-slate-600 line-clamp-2">{contact.message}</p>
                  </div>
                ))}
              </div>

              {/* Contact Detail */}
              <div className="bg-slate-50 rounded-xl border border-slate-200 p-6">
                {selectedContact ? (
                  <>
                    <div className="flex items-start justify-between mb-6">
                      <h2 className="text-2xl font-bold text-slate-900">{selectedContact.subject}</h2>
                      <button
                        onClick={() => setSelectedContact(null)}
                        className="text-slate-400 hover:text-slate-600"
                      >
                        <X size={20} />
                      </button>
                    </div>

                    <div className="space-y-4 mb-6">
                      <div className="flex items-center gap-3 text-slate-700">
                        <User size={18} className="text-slate-400" />
                        <span>{selectedContact.name}</span>
                      </div>
                      <div className="flex items-center gap-3 text-slate-700">
                        <Mail size={18} className="text-slate-400" />
                        <a
                          href={`mailto:${selectedContact.email}`}
                          className="text-sky-600 hover:underline"
                        >
                          {selectedContact.email}
                        </a>
                      </div>
                      {selectedContact.phone && (
                        <div className="flex items-center gap-3 text-slate-700">
                          <Phone size={18} className="text-slate-400" />
                          <a href={`tel:${selectedContact.phone}`} className="text-sky-600 hover:underline">
                            {selectedContact.phone}
                          </a>
                        </div>
                      )}
                      <div className="flex items-center gap-3 text-slate-600">
                        <Calendar size={18} className="text-slate-400" />
                        <span className="text-sm">{formatDate(selectedContact.createdAt)}</span>
                      </div>
                    </div>

                    <div className="bg-white rounded-lg p-4 mb-6">
                      <h3 className="font-semibold text-slate-900 mb-2">Message:</h3>
                      <p className="text-slate-700 whitespace-pre-wrap">{selectedContact.message}</p>
                    </div>

                    <div className="flex gap-3">
                      <button
                        onClick={() => handleToggleRead(selectedContact)}
                        disabled={isLoading}
                        className="flex-1 flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium px-4 py-3 rounded-lg transition-colors disabled:opacity-50"
                      >
                        {selectedContact.read ? <Circle size={18} /> : <CheckCircle size={18} />}
                        {selectedContact.read ? 'Marquer non lu' : 'Marquer comme lu'}
                      </button>
                      <button
                        onClick={() => handleDelete(selectedContact.id)}
                        disabled={isLoading}
                        className="flex items-center justify-center gap-2 bg-red-50 hover:bg-red-100 text-red-600 font-medium px-4 py-3 rounded-lg transition-colors disabled:opacity-50"
                      >
                        <Trash2 size={18} />
                        Supprimer
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full text-center py-20">
                    <Eye className="w-16 h-16 text-slate-300 mb-4" />
                    <p className="text-slate-600">Sélectionnez un message pour voir les détails</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
