'use client';

import { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Image from 'next/image';
import Link from 'next/link';

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
  published: boolean;
  order: number;
}

interface ProductsClientProps {
  products: Product[];
}

export default function ProductsClient({ products }: ProductsClientProps) {
  const [selectedCategory, setSelectedCategory] = useState('Tout voir');

  // Get unique categories from products
  const uniqueCategories = Array.from(
    new Set(products.flatMap((product) => product.categories.map((cat) => cat.name)))
  );
  const categories = ['Tout voir', ...uniqueCategories];

  const filteredProducts =
    selectedCategory === 'Tout voir'
      ? products
      : products.filter((product) => product.categories.some((cat) => cat.name === selectedCategory));

  return (
    <div>
      <Navbar />
      <main className="bg-white">
        {/* Header Section */}
        <div className="bg-gradient-to-br from-slate-50 to-slate-100 py-24 border-b border-slate-200">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-slate-900">Nos Produits</h1>
            <p className="mt-6 text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Découvrez notre gamme complète de solutions en menuiserie aluminium. Des produits de qualité supérieure
              conçus pour répondre à tous vos besoins.
            </p>
          </div>
        </div>

        {/* Filter Section */}
        <div className="container mx-auto px-4 py-12 border-b border-slate-200">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`font-semibold px-6 py-3 rounded-lg transition-all ${
                  selectedCategory === category
                    ? 'bg-sky-600 text-white shadow-md'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-300'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
          <p className="text-center mt-6 text-slate-600">
            {filteredProducts.length} produit{filteredProducts.length > 1 ? 's' : ''} trouvé
            {filteredProducts.length > 1 ? 's' : ''}
          </p>
        </div>

        {/* Products Grid */}
        <div className="container mx-auto px-4 py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <Link
                key={product.id}
                href={`/products/${product.slug}`}
                className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden group hover:shadow-lg transition-all duration-300"
              >
                <div className="relative h-64 overflow-hidden bg-slate-100">
                  <Image
                    src={product.mainImageUrl}
                    alt={product.title}
                    fill
                    style={{ objectFit: 'cover' }}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                    {product.categories.map((cat) => (
                      <span key={cat.id} className="bg-sky-600 text-white text-sm font-semibold px-3 py-1 rounded-full shadow-md">
                        {cat.name}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-sky-600 transition-colors">
                    {product.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed line-clamp-3">{product.description}</p>
                  <div className="mt-4">
                    <span className="text-sky-600 font-semibold group-hover:underline">Voir détails →</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-20">
              <p className="text-slate-600 text-xl">Aucun produit trouvé dans cette catégorie.</p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
