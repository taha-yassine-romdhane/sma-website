'use client';

import { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Image from 'next/image';

interface PortfolioItem {
  id: string;
  title: string;
  category: string;
  description: string;
  imageUrl: string;
  published: boolean;
  order: number;
}

interface PortfolioClientProps {
  portfolioItems: PortfolioItem[];
}

export default function PortfolioClient({ portfolioItems }: PortfolioClientProps) {
  const [selectedCategory, setSelectedCategory] = useState('Tout voir');

  // Get unique categories from portfolio items
  const uniqueCategories = Array.from(new Set(portfolioItems.map((item) => item.category)));
  const categories = ['Tout voir', ...uniqueCategories];

  const filteredItems =
    selectedCategory === 'Tout voir'
      ? portfolioItems
      : portfolioItems.filter((item) => item.category === selectedCategory);

  return (
    <div>
      <Navbar />
      <main className="bg-white">
        {/* Header Section */}
        <div className="bg-gradient-to-br from-slate-50 to-slate-100 py-24 border-b border-slate-200">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-slate-900">Nos Réalisations</h1>
            <p className="mt-6 text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Explorez la qualité et la diversité de nos travaux en menuiserie aluminium. Chaque projet est une nouvelle
              histoire de confiance et de savoir-faire.
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
            {filteredItems.length} projet{filteredItems.length > 1 ? 's' : ''} trouvé
            {filteredItems.length > 1 ? 's' : ''}
          </p>
        </div>

        {/* Portfolio Grid */}
        <div className="container mx-auto px-4 py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden group hover:shadow-lg transition-all duration-300"
              >
                <div className="relative h-64 overflow-hidden bg-slate-100">
                  <Image
                    src={item.imageUrl}
                    alt={item.title}
                    fill
                    style={{ objectFit: 'cover' }}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-sky-600 text-white text-sm font-semibold px-3 py-1 rounded-full shadow-md">
                      {item.category}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-sky-600 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>

          {filteredItems.length === 0 && (
            <div className="text-center py-20">
              <p className="text-slate-600 text-xl">Aucun projet trouvé dans cette catégorie.</p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
