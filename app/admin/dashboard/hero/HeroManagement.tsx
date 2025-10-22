'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowLeft,
  Plus,
  Edit,
  Trash2,
  Save,
  X,
  ImageIcon,
  Eye,
  EyeOff,
} from 'lucide-react';
import ImageUpload from '@/app/components/admin/ImageUpload';

interface HeroSlider {
  id: string;
  title: string;
  subtitle: string;
  imageUrl: string;
  mobileImageUrl: string | null;
  order: number;
  active: boolean;
}

interface HeroManagementProps {
  user: any;
  heroSliders: HeroSlider[];
}

export default function HeroManagement({ user, heroSliders: initialSliders }: HeroManagementProps) {
  const router = useRouter();
  const [sliders, setSliders] = useState<HeroSlider[]>(initialSliders);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSlider, setEditingSlider] = useState<HeroSlider | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    imageUrl: '',
    mobileImageUrl: '',
    order: 0,
    active: true,
  });

  const handleOpenModal = (slider?: HeroSlider) => {
    if (slider) {
      setEditingSlider(slider);
      setFormData({
        title: slider.title,
        subtitle: slider.subtitle,
        imageUrl: slider.imageUrl,
        mobileImageUrl: slider.mobileImageUrl || '',
        order: slider.order,
        active: slider.active,
      });
    } else {
      setEditingSlider(null);
      setFormData({
        title: '',
        subtitle: '',
        imageUrl: '',
        mobileImageUrl: '',
        order: sliders.length + 1,
        active: true,
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingSlider(null);
    setFormData({
      title: '',
      subtitle: '',
      imageUrl: '',
      mobileImageUrl: '',
      order: 0,
      active: true,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (editingSlider) {
        // Update existing slider
        const response = await fetch(`/api/hero/${editingSlider.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          const updatedSlider = await response.json();
          setSliders(sliders.map((s) => (s.id === updatedSlider.id ? updatedSlider : s)));
        }
      } else {
        // Create new slider
        const response = await fetch('/api/hero', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          const newSlider = await response.json();
          setSliders([...sliders, newSlider]);
        }
      }

      handleCloseModal();
      router.refresh();
    } catch (error) {
      console.error('Failed to save slider:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce slider ?')) return;

    setIsLoading(true);
    try {
      const response = await fetch(`/api/hero/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setSliders(sliders.filter((s) => s.id !== id));
        router.refresh();
      }
    } catch (error) {
      console.error('Failed to delete slider:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleActive = async (slider: HeroSlider) => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/hero/${slider.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...slider, active: !slider.active }),
      });

      if (response.ok) {
        const updatedSlider = await response.json();
        setSliders(sliders.map((s) => (s.id === updatedSlider.id ? updatedSlider : s)));
        router.refresh();
      }
    } catch (error) {
      console.error('Failed to toggle slider:', error);
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
              <h1 className="text-3xl font-bold text-slate-900">Gestion Hero Slider</h1>
              <p className="text-slate-600 mt-2">Gérer les images et textes de la bannière principale</p>
              <p className="text-sm text-sky-600 mt-1">
                💡 Téléchargez 2 versions : Desktop (1920x700px) et Mobile (768x500px) pour un affichage optimal
              </p>
            </div>
            <button
              onClick={() => handleOpenModal()}
              className="flex items-center gap-2 bg-sky-600 hover:bg-sky-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors shadow-md"
            >
              <Plus size={20} />
              Ajouter un slider
            </button>
          </div>

          {sliders.length === 0 ? (
            <div className="text-center py-20">
              <ImageIcon className="w-16 h-16 text-slate-300 mx-auto mb-4" />
              <p className="text-slate-600 text-lg">Aucun slider trouvé</p>
              <p className="text-slate-500 text-sm mt-2">Cliquez sur "Ajouter un slider" pour commencer</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sliders.map((slider) => (
                <div
                  key={slider.id}
                  className="bg-white rounded-xl border-2 border-slate-200 overflow-hidden hover:border-sky-600 transition-all"
                >
                  <div className="relative h-48 bg-slate-100">
                    <Image
                      src={slider.imageUrl}
                      alt={slider.title}
                      fill
                      style={{ objectFit: 'cover' }}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute top-2 right-2 flex gap-2">
                      <button
                        onClick={() => handleToggleActive(slider)}
                        className={`p-2 rounded-lg shadow-md transition-colors ${
                          slider.active
                            ? 'bg-green-500 hover:bg-green-600 text-white'
                            : 'bg-slate-500 hover:bg-slate-600 text-white'
                        }`}
                        title={slider.active ? 'Désactiver' : 'Activer'}
                      >
                        {slider.active ? <Eye size={16} /> : <EyeOff size={16} />}
                      </button>
                    </div>
                    <div className="absolute bottom-2 left-2">
                      <span className="bg-sky-600 text-white text-xs font-semibold px-2 py-1 rounded">
                        Ordre: {slider.order}
                      </span>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-slate-900 mb-2 truncate">{slider.title}</h3>
                    <p className="text-sm text-slate-600 line-clamp-2 mb-4">{slider.subtitle}</p>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleOpenModal(slider)}
                        className="flex-1 flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium px-4 py-2 rounded-lg transition-colors"
                      >
                        <Edit size={16} />
                        Modifier
                      </button>
                      <button
                        onClick={() => handleDelete(slider.id)}
                        className="flex items-center justify-center gap-2 bg-red-50 hover:bg-red-100 text-red-600 font-medium px-4 py-2 rounded-lg transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-slate-200">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-slate-900">
                  {editingSlider ? 'Modifier le slider' : 'Nouveau slider'}
                </h2>
                <button
                  onClick={handleCloseModal}
                  className="text-slate-400 hover:text-slate-600 transition-colors"
                >
                  <X size={24} />
                </button>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Titre <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-colors"
                  placeholder="SMA - Société M'saken Aluminium"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Sous-titre <span className="text-red-500">*</span>
                </label>
                <textarea
                  required
                  rows={3}
                  value={formData.subtitle}
                  onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-colors resize-none"
                  placeholder="Votre partenaire de confiance pour des solutions d'aluminium..."
                />
              </div>

              <ImageUpload
                label="Image Desktop"
                value={formData.imageUrl}
                onChange={(url) => setFormData({ ...formData, imageUrl: url })}
                required
                suggestion="Résolution recommandée : 1920x700px (format paysage)"
                placeholder="https://example.com/desktop-image.jpg"
                previewLabel="Aperçu Desktop"
              />

              <ImageUpload
                label="Image Mobile (optionnel)"
                value={formData.mobileImageUrl}
                onChange={(url) => setFormData({ ...formData, mobileImageUrl: url })}
                suggestion="Résolution recommandée : 768x500px (format portrait/carré). Si vide, l'image desktop sera utilisée sur mobile"
                placeholder="https://example.com/mobile-image.jpg"
                previewLabel="Aperçu Mobile"
              />

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Ordre <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    required
                    min="0"
                    value={formData.order}
                    onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Statut</label>
                  <div className="flex items-center h-full">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.active}
                        onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
                        className="w-5 h-5 text-sky-600 border-slate-300 rounded focus:ring-sky-500"
                      />
                      <span className="text-slate-700">Actif</span>
                    </label>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="flex-1 px-6 py-3 border border-slate-300 text-slate-700 font-semibold rounded-lg hover:bg-slate-50 transition-colors"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex-1 flex items-center justify-center gap-2 bg-sky-600 hover:bg-sky-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Enregistrement...
                    </>
                  ) : (
                    <>
                      <Save size={20} />
                      {editingSlider ? 'Mettre à jour' : 'Créer'}
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
