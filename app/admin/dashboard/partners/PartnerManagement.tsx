'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowLeft,
  Plus,
  Edit2,
  Trash2,
  Save,
  X,
  Eye,
  EyeOff,
  GripVertical,
} from 'lucide-react';
import ImageUpload from '@/app/components/admin/ImageUpload';

interface Partner {
  id: string;
  name: string;
  logoUrl: string;
  order: number;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

interface PartnerManagementProps {
  user: any;
  partners: Partner[];
}

export default function PartnerManagement({ user, partners: initialPartners }: PartnerManagementProps) {
  const router = useRouter();
  const [partners, setPartners] = useState<Partner[]>(initialPartners);
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    logoUrl: '',
    order: 0,
    active: true,
  });

  const handleAdd = () => {
    setIsAdding(true);
    setFormData({
      name: '',
      logoUrl: '',
      order: partners.length,
      active: true,
    });
  };

  const handleEdit = (partner: Partner) => {
    setIsEditing(partner.id);
    setFormData({
      name: partner.name,
      logoUrl: partner.logoUrl,
      order: partner.order,
      active: partner.active,
    });
  };

  const handleCancel = () => {
    setIsEditing(null);
    setIsAdding(false);
    setFormData({ name: '', logoUrl: '', order: 0, active: true });
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      if (isAdding) {
        const response = await fetch('/api/partner', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          handleCancel();
          router.refresh();
        }
      } else if (isEditing) {
        const response = await fetch(`/api/partner/${isEditing}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          handleCancel();
          router.refresh();
        }
      }
    } catch (error) {
      console.error('Failed to save partner:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce partenaire ?')) return;

    setIsLoading(true);
    try {
      const response = await fetch(`/api/partner/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        router.refresh();
      }
    } catch (error) {
      console.error('Failed to delete partner:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleActive = async (partner: Partner) => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/partner/${partner.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ active: !partner.active }),
      });

      if (response.ok) {
        router.refresh();
      }
    } catch (error) {
      console.error('Failed to toggle partner status:', error);
    } finally {
      setIsLoading(false);
    }
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
              <h1 className="text-3xl font-bold text-slate-900">Gestion des Partenaires</h1>
              <p className="text-slate-600 mt-2">
                Gérez les logos de vos partenaires affichés sur le site
              </p>
              <p className="text-sm text-sky-600 mt-1">
                💡 Recommandation : Images PNG transparentes, 200x100px
              </p>
            </div>
            <button
              onClick={handleAdd}
              disabled={isAdding || isEditing !== null}
              className="flex items-center gap-2 bg-sky-600 hover:bg-sky-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Plus size={20} />
              Ajouter un partenaire
            </button>
          </div>

          {/* Add New Partner Form */}
          {isAdding && (
            <div className="mb-8 p-6 bg-sky-50 border-2 border-sky-200 rounded-xl">
              <h3 className="text-xl font-bold text-slate-900 mb-4">Nouveau Partenaire</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Nom du partenaire <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                    placeholder="Ex: Partner Company"
                  />
                </div>

                <ImageUpload
                  label="Logo du partenaire"
                  value={formData.logoUrl}
                  onChange={(url) => setFormData({ ...formData, logoUrl: url })}
                  required
                  suggestion="Résolution recommandée : 200x100px (PNG transparent préféré)"
                  placeholder="https://example.com/logo.png"
                />

                <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Ordre d'affichage
                  </label>
                  <input
                    type="number"
                    value={formData.order}
                    onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="active"
                    checked={formData.active}
                    onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
                    className="w-4 h-4 text-sky-600 border-slate-300 rounded focus:ring-sky-500"
                  />
                  <label htmlFor="active" className="text-sm font-medium text-slate-700">
                    Actif (visible sur le site)
                  </label>
                </div>
              </div>
              <div className="mt-6 flex gap-3">
                <button
                  onClick={handleSave}
                  disabled={isLoading || !formData.name || !formData.logoUrl}
                  className="flex items-center gap-2 bg-sky-600 hover:bg-sky-700 text-white font-semibold px-6 py-2 rounded-lg transition-colors disabled:opacity-50"
                >
                  <Save size={18} />
                  Enregistrer
                </button>
                <button
                  onClick={handleCancel}
                  disabled={isLoading}
                  className="flex items-center gap-2 bg-slate-200 hover:bg-slate-300 text-slate-700 font-semibold px-6 py-2 rounded-lg transition-colors"
                >
                  <X size={18} />
                  Annuler
                </button>
              </div>
            </div>
          </div>
          )}

          {/* Partners List */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {partners.map((partner) => (
              <div
                key={partner.id}
                className={`relative p-6 rounded-xl border-2 transition-all ${
                  isEditing === partner.id
                    ? 'border-sky-600 bg-sky-50'
                    : partner.active
                    ? 'border-slate-200 bg-white hover:border-slate-300'
                    : 'border-slate-200 bg-slate-50 opacity-60'
                }`}
              >
                {!partner.active && (
                  <div className="absolute top-2 right-2 bg-slate-700 text-white text-xs px-2 py-1 rounded">
                    Inactif
                  </div>
                )}

                {isEditing === partner.id ? (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Nom du partenaire
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                      />
                    </div>

                    <ImageUpload
                      label="Logo du partenaire"
                      value={formData.logoUrl}
                      onChange={(url) => setFormData({ ...formData, logoUrl: url })}
                      required
                      suggestion="200x100px (PNG transparent)"
                      placeholder="https://example.com/logo.png"
                    />
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Ordre
                      </label>
                      <input
                        type="number"
                        value={formData.order}
                        onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                      />
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={handleSave}
                        disabled={isLoading}
                        className="flex-1 flex items-center justify-center gap-2 bg-sky-600 hover:bg-sky-700 text-white font-medium px-4 py-2 rounded-lg transition-colors"
                      >
                        <Save size={16} />
                        Sauvegarder
                      </button>
                      <button
                        onClick={handleCancel}
                        disabled={isLoading}
                        className="flex items-center justify-center gap-2 bg-slate-200 hover:bg-slate-300 text-slate-700 font-medium px-4 py-2 rounded-lg transition-colors"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="relative w-full h-24 mb-4 bg-slate-100 rounded-lg flex items-center justify-center">
                      <Image
                        src={partner.logoUrl}
                        alt={partner.name}
                        fill
                        style={{ objectFit: 'contain' }}
                        sizes="(max-width: 768px) 50vw, 33vw"
                        className="p-4"
                      />
                    </div>
                    <h3 className="font-bold text-slate-900 mb-2">{partner.name}</h3>
                    <p className="text-xs text-slate-600 mb-4">Ordre: {partner.order}</p>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(partner)}
                        disabled={isLoading || isEditing !== null || isAdding}
                        className="flex-1 flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium px-3 py-2 rounded-lg transition-colors disabled:opacity-50"
                      >
                        <Edit2 size={16} />
                        Modifier
                      </button>
                      <button
                        onClick={() => handleToggleActive(partner)}
                        disabled={isLoading}
                        className={`flex items-center justify-center gap-2 font-medium px-3 py-2 rounded-lg transition-colors ${
                          partner.active
                            ? 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                            : 'bg-sky-100 hover:bg-sky-200 text-sky-700'
                        }`}
                      >
                        {partner.active ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                      <button
                        onClick={() => handleDelete(partner.id)}
                        disabled={isLoading}
                        className="flex items-center justify-center gap-2 bg-red-50 hover:bg-red-100 text-red-600 font-medium px-3 py-2 rounded-lg transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))}

            {partners.length === 0 && !isAdding && (
              <div className="col-span-full text-center py-20">
                <p className="text-slate-600 text-lg">Aucun partenaire ajouté</p>
                <p className="text-slate-500 text-sm mt-2">Cliquez sur "Ajouter un partenaire" pour commencer</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
