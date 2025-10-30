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
  Package,
  Eye,
  EyeOff,
  Image as ImageIcon,
  GripVertical,
} from 'lucide-react';
import ImageUpload from '@/app/components/admin/ImageUpload';

interface ProductImage {
  id: string;
  imageUrl: string;
  order: number;
}

interface ProductCategory {
  id: string;
  name: string;
}

interface Product {
  id: string;
  title: string;
  slug: string;
  categories: ProductCategory[];
  description: string;
  mainImageUrl: string;
  images: ProductImage[];
  features: string[];
  technicalSpecs: Array<{ name: string; description: string; imageUrl: string }>;
  published: boolean;
  order: number;
}

interface ProductsManagementProps {
  user: any;
  products: Product[];
  categories: ProductCategory[];
}

export default function ProductsManagement({ user, products: initialProducts, categories }: ProductsManagementProps) {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    categoryIds: [] as string[],
    description: '',
    mainImageUrl: '',
    published: true,
    order: 0,
  });

  const [galleryImages, setGalleryImages] = useState<string[]>([]);
  const [newGalleryImageUrl, setNewGalleryImageUrl] = useState('');
  const [features, setFeatures] = useState<string[]>(['']);
  const [technicalSpecs, setTechnicalSpecs] = useState<Array<{ name: string; description: string; imageUrl: string }>>([
    { name: '', description: '', imageUrl: '' },
  ]);

  // Generate slug from title
  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  };

  const handleOpenModal = (product?: Product) => {
    if (product) {
      setEditingProduct(product);
      setFormData({
        title: product.title,
        slug: product.slug,
        categoryIds: product.categories.map(cat => cat.id),
        description: product.description,
        mainImageUrl: product.mainImageUrl,
        published: product.published,
        order: product.order,
      });
      setGalleryImages(product.images.map((img) => img.imageUrl));
      setFeatures(Array.isArray(product.features) ? product.features : JSON.parse(product.features as any) || ['']);
      setTechnicalSpecs(
        Array.isArray(product.technicalSpecs)
          ? product.technicalSpecs
          : JSON.parse(product.technicalSpecs as any) || [{ name: '', description: '', imageUrl: '' }]
      );
    } else {
      setEditingProduct(null);
      setFormData({
        title: '',
        slug: '',
        categoryIds: [],
        description: '',
        mainImageUrl: '',
        published: true,
        order: products.length + 1,
      });
      setGalleryImages([]);
      setNewGalleryImageUrl('');
      setFeatures(['']);
      setTechnicalSpecs([{ name: '', description: '', imageUrl: '' }]);
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingProduct(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Filter out empty features and specs
      const cleanFeatures = features.filter((f) => f.trim() !== '');
      const cleanSpecs = technicalSpecs.filter((s) => s.name.trim() !== '' || s.description.trim() !== '' || s.imageUrl.trim() !== '');

      const productData = {
        ...formData,
        features: cleanFeatures,
        technicalSpecs: cleanSpecs,
        galleryImages,
      };

      const url = editingProduct ? `/api/admin/products/${editingProduct.id}` : '/api/admin/products';
      const method = editingProduct ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productData),
      });

      if (!response.ok) throw new Error('Failed to save product');

      router.refresh();
      handleCloseModal();
    } catch (error) {
      console.error('Error saving product:', error);
      alert('Erreur lors de la sauvegarde du produit');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce produit ?')) return;

    setIsLoading(true);
    try {
      const response = await fetch(`/api/admin/products/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to delete product');

      router.refresh();
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('Erreur lors de la suppression du produit');
    } finally {
      setIsLoading(false);
    }
  };

  const addFeature = () => {
    setFeatures([...features, '']);
  };

  const removeFeature = (index: number) => {
    setFeatures(features.filter((_, i) => i !== index));
  };

  const updateFeature = (index: number, value: string) => {
    const newFeatures = [...features];
    newFeatures[index] = value;
    setFeatures(newFeatures);
  };

  const addTechnicalSpec = () => {
    setTechnicalSpecs([...technicalSpecs, { name: '', description: '', imageUrl: '' }]);
  };

  const removeTechnicalSpec = (index: number) => {
    setTechnicalSpecs(technicalSpecs.filter((_, i) => i !== index));
  };

  const updateTechnicalSpec = (index: number, field: 'name' | 'description' | 'imageUrl', value: string) => {
    const newSpecs = [...technicalSpecs];
    newSpecs[index][field] = value;
    setTechnicalSpecs(newSpecs);
  };

  const addGalleryImage = () => {
    if (newGalleryImageUrl.trim()) {
      setGalleryImages([...galleryImages, newGalleryImageUrl]);
      setNewGalleryImageUrl('');
    }
  };

  const removeGalleryImage = (index: number) => {
    setGalleryImages(galleryImages.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                href="/admin/dashboard"
                className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <ArrowLeft size={24} />
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-slate-900">Gestion des Produits</h1>
                <p className="text-slate-600 text-sm">Gérez vos produits et leurs détails</p>
              </div>
            </div>
            <button
              onClick={() => handleOpenModal()}
              className="bg-sky-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-sky-700 transition-colors flex items-center gap-2"
            >
              <Plus size={20} />
              Nouveau Produit
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        {products.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-12 text-center">
            <Package size={64} className="mx-auto text-slate-300 mb-4" />
            <h3 className="text-xl font-semibold text-slate-900 mb-2">Aucun produit</h3>
            <p className="text-slate-600 mb-6">Commencez par ajouter votre premier produit</p>
            <button
              onClick={() => handleOpenModal()}
              className="bg-sky-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-sky-700 transition-colors inline-flex items-center gap-2"
            >
              <Plus size={20} />
              Ajouter un produit
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className="relative h-48 bg-slate-100">
                  <Image
                    src={product.mainImageUrl}
                    alt={product.title}
                    fill
                    style={{ objectFit: 'cover' }}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute top-3 right-3 flex gap-2">
                    {product.published ? (
                      <span className="bg-green-500 text-white px-2 py-1 rounded text-xs font-semibold flex items-center gap-1">
                        <Eye size={14} />
                        Publié
                      </span>
                    ) : (
                      <span className="bg-slate-500 text-white px-2 py-1 rounded text-xs font-semibold flex items-center gap-1">
                        <EyeOff size={14} />
                        Brouillon
                      </span>
                    )}
                  </div>
                  <div className="absolute top-3 left-3 flex flex-wrap gap-1">
                    {product.categories.map((cat) => (
                      <span key={cat.id} className="bg-sky-600 text-white px-2 py-1 rounded text-xs font-semibold">
                        {cat.name}
                      </span>
                    ))}
                  </div>
                  {product.images.length > 0 && (
                    <div className="absolute bottom-3 left-3">
                      <span className="bg-black/60 text-white px-2 py-1 rounded text-xs font-semibold flex items-center gap-1">
                        <ImageIcon size={14} />
                        {product.images.length} image{product.images.length > 1 ? 's' : ''}
                      </span>
                    </div>
                  )}
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-bold text-slate-900 mb-2 line-clamp-1">{product.title}</h3>
                  <p className="text-slate-600 text-sm mb-4 line-clamp-2">{product.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-500">Ordre: {product.order}</span>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleOpenModal(product)}
                        className="p-2 text-sky-600 hover:bg-sky-50 rounded-lg transition-colors"
                        title="Modifier"
                      >
                        <Edit size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Supprimer"
                        disabled={isLoading}
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl my-8">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-slate-200">
              <h2 className="text-2xl font-bold text-slate-900">
                {editingProduct ? 'Modifier le produit' : 'Nouveau produit'}
              </h2>
              <button
                onClick={handleCloseModal}
                className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleSubmit} className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
              {/* Basic Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Titre du produit <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => {
                      setFormData({ ...formData, title: e.target.value, slug: generateSlug(e.target.value) });
                    }}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                    placeholder="Ex: Menuiserie Coulissante"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Slug (URL) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                    placeholder="menuiserie-coulissante"
                  />
                  <p className="text-xs text-slate-500 mt-1">Auto-généré à partir du titre</p>
                </div>
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
                  <div className="border border-slate-200 rounded-lg p-4 bg-slate-50">
                    <div className="flex flex-wrap gap-2">
                      {categories.map((cat) => (
                        <button
                          key={cat.id}
                          type="button"
                          onClick={() => {
                            if (formData.categoryIds.includes(cat.id)) {
                              setFormData({ ...formData, categoryIds: formData.categoryIds.filter(id => id !== cat.id) });
                            } else {
                              setFormData({ ...formData, categoryIds: [...formData.categoryIds, cat.id] });
                            }
                          }}
                          className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                            formData.categoryIds.includes(cat.id)
                              ? 'bg-sky-600 text-white shadow-md hover:bg-sky-700'
                              : 'bg-white text-slate-700 border-2 border-slate-300 hover:border-sky-400 hover:text-sky-600'
                          }`}
                        >
                          {cat.name}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                {formData.categoryIds.length === 0 && categories.length > 0 && (
                  <p className="text-sm text-amber-600 mt-2">Veuillez sélectionner au moins une catégorie</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Ordre d'affichage</label>
                <input
                  type="number"
                  value={formData.order}
                  onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                  min="0"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                  placeholder="Description détaillée du produit..."
                />
              </div>

              {/* Main Image */}
              <ImageUpload
                label="Image principale"
                value={formData.mainImageUrl}
                onChange={(url) => setFormData({ ...formData, mainImageUrl: url })}
                required
                suggestion="Image représentative du produit (format paysage recommandé)"
                placeholder="https://example.com/product-image.jpg"
                previewLabel="Image principale"
              />

              {/* Gallery Images */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Images de la galerie</label>
                <div className="space-y-3">
                  {galleryImages.map((imageUrl, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="relative w-20 h-20 bg-slate-100 rounded-lg overflow-hidden flex-shrink-0">
                        <Image src={imageUrl} alt={`Gallery ${index + 1}`} fill style={{ objectFit: 'cover' }} />
                      </div>
                      <input
                        type="text"
                        value={imageUrl}
                        readOnly
                        className="flex-1 px-4 py-2 border border-slate-300 rounded-lg bg-slate-50"
                      />
                      <button
                        type="button"
                        onClick={() => removeGalleryImage(index)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  ))}
                  <div className="border-2 border-dashed border-slate-300 rounded-lg p-4">
                    <ImageUpload
                      label="Ajouter une image à la galerie"
                      value={newGalleryImageUrl}
                      onChange={setNewGalleryImageUrl}
                      suggestion="Images supplémentaires du produit"
                      placeholder="https://example.com/gallery-image.jpg"
                      previewLabel="Nouvelle image"
                    />
                    {newGalleryImageUrl && (
                      <button
                        type="button"
                        onClick={addGalleryImage}
                        className="mt-3 w-full bg-sky-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-sky-700 transition-colors flex items-center justify-center gap-2"
                      >
                        <Plus size={18} />
                        Ajouter à la galerie
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Features */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Caractéristiques</label>
                <div className="space-y-2">
                  {features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <input
                        type="text"
                        value={feature}
                        onChange={(e) => updateFeature(index, e.target.value)}
                        className="flex-1 px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                        placeholder="Ex: Isolation thermique et acoustique"
                      />
                      {features.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeFeature(index)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <X size={18} />
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={addFeature}
                    className="text-sky-600 hover:text-sky-700 font-semibold text-sm flex items-center gap-1"
                  >
                    <Plus size={16} />
                    Ajouter une caractéristique
                  </button>
                </div>
              </div>

              {/* Technical Specs */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Spécifications techniques</label>
                <div className="space-y-4">
                  {technicalSpecs.map((spec, index) => (
                    <div key={index} className="border-2 border-slate-200 rounded-lg p-4 space-y-3 bg-slate-50">
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="text-sm font-semibold text-slate-700">Spécification #{index + 1}</h4>
                        {technicalSpecs.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeTechnicalSpec(index)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            <X size={18} />
                          </button>
                        )}
                      </div>

                      <div className="space-y-3">
                        <input
                          type="text"
                          value={spec.name}
                          onChange={(e) => updateTechnicalSpec(index, 'name', e.target.value)}
                          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent text-sm bg-white"
                          placeholder="Nom de la spécification (Ex: EX60 Prestige)"
                        />
                        <textarea
                          value={spec.description}
                          onChange={(e) => updateTechnicalSpec(index, 'description', e.target.value)}
                          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent text-sm bg-white resize-none"
                          placeholder="Description courte de la spécification..."
                          rows={2}
                        />

                        <ImageUpload
                          label="Image de la spécification"
                          value={spec.imageUrl}
                          onChange={(url) => updateTechnicalSpec(index, 'imageUrl', url)}
                          suggestion="Image illustrant cette spécification (recommandé: 400x400px)"
                          placeholder="https://example.com/spec-image.jpg"
                          previewLabel={`Spec ${index + 1}`}
                        />
                      </div>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={addTechnicalSpec}
                    className="w-full text-sky-600 hover:text-sky-700 font-semibold text-sm flex items-center justify-center gap-2 py-3 border-2 border-dashed border-slate-300 rounded-lg hover:border-sky-400 transition-colors"
                  >
                    <Plus size={18} />
                    Ajouter une spécification
                  </button>
                </div>
              </div>

              {/* Published Toggle */}
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="published"
                  checked={formData.published}
                  onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                  className="w-5 h-5 text-sky-600 border-slate-300 rounded focus:ring-sky-500"
                />
                <label htmlFor="published" className="text-sm font-semibold text-slate-700">
                  Publier ce produit
                </label>
              </div>

              {/* Submit Button */}
              <div className="flex justify-end gap-3 pt-4 border-t border-slate-200">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-6 py-2 border border-slate-300 rounded-lg font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="bg-sky-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-sky-700 transition-colors flex items-center gap-2 disabled:opacity-50"
                >
                  <Save size={18} />
                  {isLoading ? 'Enregistrement...' : 'Enregistrer'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
