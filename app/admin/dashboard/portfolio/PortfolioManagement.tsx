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
  FolderOpen,
  Eye,
  EyeOff,
} from 'lucide-react';
import ImageUpload from '@/app/components/admin/ImageUpload';

interface PortfolioImage {
  id: string;
  imageUrl: string;
  order: number;
}

interface PortfolioCategory {
  id: string;
  name: string;
}

interface PortfolioItem {
  id: string;
  title: string;
  categories: PortfolioCategory[];
  description: string;
  imageUrl: string;
  images: PortfolioImage[];
  published: boolean;
  order: number;
}

interface PortfolioManagementProps {
  user: any;
  portfolioItems: PortfolioItem[];
  categories: PortfolioCategory[];
}

export default function PortfolioManagement({ user, portfolioItems: initialItems, categories }: PortfolioManagementProps) {
  const router = useRouter();
  const [items, setItems] = useState<PortfolioItem[]>(initialItems);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<PortfolioItem | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    categoryIds: [] as string[],
    description: '',
    imageUrl: '',
    published: true,
    order: 0,
  });

  const [additionalImages, setAdditionalImages] = useState<string[]>([]);

  const handleOpenModal = (item?: PortfolioItem) => {
    if (item) {
      setEditingItem(item);
      setFormData({
        title: item.title,
        categoryIds: item.categories.map(cat => cat.id),
        description: item.description,
        imageUrl: item.imageUrl,
        published: item.published,
        order: item.order,
      });
      setAdditionalImages(item.images?.map((img) => img.imageUrl) || []);
    } else {
      setEditingItem(null);
      setFormData({
        title: '',
        categoryIds: [],
        description: '',
        imageUrl: '',
        published: true,
        order: items.length + 1,
      });
      setAdditionalImages([]);
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingItem(null);
    setFormData({
      title: '',
      categoryIds: [],
      description: '',
      imageUrl: '',
      published: true,
      order: 0,
    });
    setAdditionalImages([]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const payload = {
        ...formData,
        additionalImages, // Include additional images in the payload
      };

      if (editingItem) {
        // Update existing item
        const response = await fetch(`/api/portfolio/${editingItem.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });

        if (response.ok) {
          const updatedItem = await response.json();
          setItems(items.map((i) => (i.id === updatedItem.id ? updatedItem : i)));
        }
      } else {
        // Create new item
        const response = await fetch('/api/portfolio', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });

        if (response.ok) {
          const newItem = await response.json();
          setItems([...items, newItem]);
        }
      }

      handleCloseModal();
      router.refresh();
    } catch (error) {
      console.error('Failed to save item:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce projet ?')) return;

    setIsLoading(true);
    try {
      const response = await fetch(`/api/portfolio/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setItems(items.filter((i) => i.id !== id));
        router.refresh();
      }
    } catch (error) {
      console.error('Failed to delete item:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTogglePublished = async (item: PortfolioItem) => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/portfolio/${item.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...item, published: !item.published }),
      });

      if (response.ok) {
        const updatedItem = await response.json();
        setItems(items.map((i) => (i.id === updatedItem.id ? updatedItem : i)));
        router.refresh();
      }
    } catch (error) {
      console.error('Failed to toggle item:', error);
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
              <h1 className="text-3xl font-bold text-slate-900">Gestion Portfolio</h1>
              <p className="text-slate-600 mt-2">Gérer les projets affichés sur le site</p>
            </div>
            <button
              onClick={() => handleOpenModal()}
              className="flex items-center gap-2 bg-sky-600 hover:bg-sky-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors shadow-md"
            >
              <Plus size={20} />
              Ajouter un projet
            </button>
          </div>

          {items.length === 0 ? (
            <div className="text-center py-20">
              <FolderOpen className="w-16 h-16 text-slate-300 mx-auto mb-4" />
              <p className="text-slate-600 text-lg">Aucun projet trouvé</p>
              <p className="text-slate-500 text-sm mt-2">Cliquez sur "Ajouter un projet" pour commencer</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-xl border-2 border-slate-200 overflow-hidden hover:border-sky-600 transition-all"
                >
                  <div className="relative h-48 bg-slate-100">
                    <Image
                      src={item.imageUrl}
                      alt={item.title}
                      fill
                      style={{ objectFit: 'cover' }}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute top-2 right-2 flex gap-2">
                      <button
                        onClick={() => handleTogglePublished(item)}
                        className={`p-2 rounded-lg shadow-md transition-colors ${
                          item.published
                            ? 'bg-green-500 hover:bg-green-600 text-white'
                            : 'bg-slate-500 hover:bg-slate-600 text-white'
                        }`}
                        title={item.published ? 'Publié' : 'Non publié'}
                      >
                        {item.published ? <Eye size={16} /> : <EyeOff size={16} />}
                      </button>
                    </div>
                    <div className="absolute top-2 left-2 flex flex-wrap gap-1">
                      {item.categories.map((cat) => (
                        <span key={cat.id} className="bg-sky-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">
                          {cat.name}
                        </span>
                      ))}
                    </div>
                    <div className="absolute bottom-2 left-2">
                      <span className="bg-white/90 text-slate-700 text-xs font-semibold px-2 py-1 rounded">
                        Ordre: {item.order}
                      </span>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-slate-900 mb-2 truncate">{item.title}</h3>
                    <p className="text-sm text-slate-600 line-clamp-2 mb-4">{item.description}</p>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleOpenModal(item)}
                        className="flex-1 flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium px-4 py-2 rounded-lg transition-colors"
                      >
                        <Edit size={16} />
                        Modifier
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
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
                  {editingItem ? 'Modifier le projet' : 'Nouveau projet'}
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
                  Titre du projet <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-colors"
                  placeholder="Fenêtres Modernes pour Villa"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Catégories <span className="text-red-500">*</span>
                </label>
                {categories.length === 0 ? (
                  <div className="w-full px-4 py-3 border border-amber-300 bg-amber-50 rounded-lg text-amber-800">
                    Aucune catégorie disponible. Veuillez d'abord{' '}
                    <Link href="/admin/dashboard/categories" className="font-semibold underline hover:text-amber-900">
                      créer une catégorie
                    </Link>
                    .
                  </div>
                ) : (
                  <div className="border border-slate-300 rounded-lg p-4 space-y-2 max-h-48 overflow-y-auto bg-white">
                    {categories.map((cat) => (
                      <label key={cat.id} className="flex items-center gap-3 cursor-pointer hover:bg-slate-50 p-2 rounded transition-colors">
                        <input
                          type="checkbox"
                          checked={formData.categoryIds.includes(cat.id)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setFormData({ ...formData, categoryIds: [...formData.categoryIds, cat.id] });
                            } else {
                              setFormData({ ...formData, categoryIds: formData.categoryIds.filter(id => id !== cat.id) });
                            }
                          }}
                          className="w-4 h-4 text-sky-600 border-slate-300 rounded focus:ring-sky-500"
                        />
                        <span className="text-slate-700">{cat.name}</span>
                      </label>
                    ))}
                  </div>
                )}
                {formData.categoryIds.length === 0 && categories.length > 0 && (
                  <p className="text-sm text-amber-600 mt-2">Veuillez sélectionner au moins une catégorie</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-colors resize-none"
                  placeholder="Description détaillée du projet..."
                />
              </div>

              <ImageUpload
                label="Image principale (couverture)"
                value={formData.imageUrl}
                onChange={(url) => setFormData({ ...formData, imageUrl: url })}
                required
                suggestion="Résolution recommandée : 800x600px ou 1200x900px"
                placeholder="https://example.com/project-image.jpg"
              />

              {/* Additional Images Section */}
              <div className="border-t border-slate-200 pt-6">
                <div className="flex items-center justify-between mb-4">
                  <label className="block text-sm font-semibold text-slate-700">
                    Images supplémentaires (optionnel)
                  </label>
                  <button
                    type="button"
                    onClick={() => setAdditionalImages([...additionalImages, ''])}
                    className="flex items-center gap-2 text-sm bg-sky-600 hover:bg-sky-700 text-white px-4 py-2 rounded-lg transition-colors shadow-md"
                  >
                    <Plus size={16} />
                    Ajouter une image
                  </button>
                </div>

                {additionalImages.length > 0 ? (
                  <div className="space-y-6">
                    {additionalImages.map((imageUrl, index) => (
                      <div key={index} className="relative border border-slate-200 rounded-lg p-4 bg-slate-50">
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-sm font-semibold text-slate-700">Image {index + 1}</span>
                          <button
                            type="button"
                            onClick={() => setAdditionalImages(additionalImages.filter((_, i) => i !== index))}
                            className="flex items-center gap-1 text-sm text-red-600 hover:text-red-700 font-medium"
                          >
                            <Trash2 size={16} />
                            Supprimer
                          </button>
                        </div>
                        <ImageUpload
                          label=""
                          value={imageUrl}
                          onChange={(url) => {
                            const newImages = [...additionalImages];
                            newImages[index] = url;
                            setAdditionalImages(newImages);
                          }}
                          placeholder="https://example.com/image.jpg"
                          suggestion="Glissez-déposez ou cliquez pour télécharger"
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 border-2 border-dashed border-slate-200 rounded-lg bg-slate-50">
                    <p className="text-slate-500 text-sm mb-2">Aucune image supplémentaire ajoutée</p>
                    <p className="text-slate-400 text-xs">
                      Cliquez sur "Ajouter une image" pour créer une galerie
                    </p>
                  </div>
                )}
              </div>

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
                        checked={formData.published}
                        onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                        className="w-5 h-5 text-sky-600 border-slate-300 rounded focus:ring-sky-500"
                      />
                      <span className="text-slate-700">Publié</span>
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
                      {editingItem ? 'Mettre à jour' : 'Créer'}
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
