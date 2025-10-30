'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Pencil, Trash2, Plus, X } from 'lucide-react';

type Category = {
  id: string;
  name: string;
  _count: {
    portfolios: number;
    products: number;
  };
};

type CategoriesManagementProps = {
  categories: Category[];
};

export default function CategoriesManagement({ categories: initialCategories }: CategoriesManagementProps) {
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [categoryName, setCategoryName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [deleteModal, setDeleteModal] = useState<{ show: boolean; category: Category | null; warning: string }>({
    show: false,
    category: null,
    warning: '',
  });

  const openCreateModal = () => {
    setEditingCategory(null);
    setCategoryName('');
    setError('');
    setIsModalOpen(true);
  };

  const openEditModal = (category: Category) => {
    setEditingCategory(category);
    setCategoryName(category.name);
    setError('');
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingCategory(null);
    setCategoryName('');
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      const url = editingCategory
        ? `/api/portfolio/categories/${editingCategory.id}`
        : '/api/portfolio/categories';
      const method = editingCategory ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: categoryName }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to save category');
      }

      const savedCategory = await response.json();

      // Optimistic UI update - instantly update the list
      if (editingCategory) {
        // Update existing category
        setCategories(categories.map(cat =>
          cat.id === savedCategory.id ? savedCategory : cat
        ));
      } else {
        // Add new category to the list instantly
        setCategories([...categories, savedCategory]);
      }

      closeModal();
      router.refresh();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const openDeleteModal = (category: Category) => {
    const totalUsage = category._count.portfolios + category._count.products;
    let warning = '';

    if (totalUsage > 0) {
      const items = [];
      if (category._count.portfolios > 0) items.push(`${category._count.portfolios} portfolio item(s)`);
      if (category._count.products > 0) items.push(`${category._count.products} product(s)`);
      warning = `This category is being used by ${items.join(' and ')}. You cannot delete it.`;
    }

    setDeleteModal({ show: true, category, warning });
  };

  const closeDeleteModal = () => {
    setDeleteModal({ show: false, category: null, warning: '' });
  };

  const confirmDelete = async () => {
    if (!deleteModal.category) return;

    try {
      const response = await fetch(`/api/portfolio/categories/${deleteModal.category.id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to delete category');
      }

      // Optimistic UI update - instantly remove from list
      setCategories(categories.filter(cat => cat.id !== deleteModal.category!.id));
      closeDeleteModal();
      router.refresh();
    } catch (err: any) {
      setDeleteModal({ ...deleteModal, warning: err.message });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-800">Categories</h1>
            <p className="text-slate-600 mt-2">Manage categories for portfolios and products</p>
          </div>
          <button
            onClick={openCreateModal}
            className="flex items-center gap-2 px-6 py-3 bg-sky-600 text-white rounded-lg hover:bg-sky-700 transition-colors shadow-lg"
          >
            <Plus className="w-5 h-5" />
            Add Category
          </button>
        </div>

        {/* Categories List */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {categories.length === 0 ? (
            <div className="p-12 text-center text-slate-500">
              <p className="text-lg">No categories yet.</p>
              <p className="text-sm mt-2">Click "Add Category" to create your first category.</p>
            </div>
          ) : (
            <div className="divide-y divide-slate-200">
              {categories.map((category) => (
                <div
                  key={category.id}
                  className="p-6 flex items-center justify-between hover:bg-slate-50 transition-colors"
                >
                  <div>
                    <h3 className="text-lg font-semibold text-slate-800">{category.name}</h3>
                    <p className="text-sm text-slate-500 mt-1">
                      {category._count.portfolios} portfolio{category._count.portfolios !== 1 ? 's' : ''} · {category._count.products} product{category._count.products !== 1 ? 's' : ''}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => openEditModal(category)}
                      className="p-2 text-sky-600 hover:bg-sky-50 rounded-lg transition-colors"
                      title="Edit category"
                    >
                      <Pencil className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => openDeleteModal(category)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Delete category"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 backdrop-blur-sm bg-black/30 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-slate-800">
                {editingCategory ? 'Edit Category' : 'Add Category'}
              </h2>
              <button
                onClick={closeModal}
                className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-slate-500" />
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label htmlFor="categoryName" className="block text-sm font-semibold text-slate-700 mb-2">
                  Category Name
                </label>
                <input
                  type="text"
                  id="categoryName"
                  value={categoryName}
                  onChange={(e) => setCategoryName(e.target.value)}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-colors"
                  placeholder="e.g., Fenêtres"
                  required
                  autoFocus
                />
              </div>

              {error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
                  {error}
                </div>
              )}

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={closeModal}
                  className="flex-1 px-4 py-3 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors"
                  disabled={isSubmitting}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-3 bg-sky-600 text-white rounded-lg hover:bg-sky-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Saving...' : editingCategory ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteModal.show && deleteModal.category && (
        <div className="fixed inset-0 backdrop-blur-sm bg-black/30 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-slate-800">Delete Category</h2>
              <button
                onClick={closeDeleteModal}
                className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-slate-500" />
              </button>
            </div>

            {deleteModal.warning ? (
              /* Warning - Cannot Delete */
              <div>
                <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-700 font-semibold mb-2">Cannot Delete Category</p>
                  <p className="text-red-600 text-sm">{deleteModal.warning}</p>
                </div>
                <p className="text-slate-600 text-sm mb-6">
                  Remove all portfolios and products from this category before deleting it.
                </p>
                <button
                  onClick={closeDeleteModal}
                  className="w-full px-4 py-3 bg-slate-600 text-white rounded-lg hover:bg-slate-700 transition-colors"
                >
                  Close
                </button>
              </div>
            ) : (
              /* Confirmation - Can Delete */
              <div>
                <p className="text-slate-600 mb-6">
                  Are you sure you want to delete the category <span className="font-semibold text-slate-800">"{deleteModal.category.name}"</span>? This action cannot be undone.
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={closeDeleteModal}
                    className="flex-1 px-4 py-3 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={confirmDelete}
                    className="flex-1 px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
