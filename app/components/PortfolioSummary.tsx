import React from 'react';
import Link from 'next/link';
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

interface PortfolioSummaryProps {
  portfolioItems: PortfolioItem[];
}

const PortfolioSummary = ({ portfolioItems }: PortfolioSummaryProps) => {
  // Show only the first 6 items (featured items with lowest order numbers)
  const displayItems = portfolioItems.slice(0, 6);

  return (
    <section id="realisations" className="py-20 bg-slate-50">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold text-slate-900">Nos réalisations</h2>
        <p className="mt-4 text-lg text-slate-600 max-w-3xl mx-auto">
          Découvrez quelques exemples de nos travaux, alliant design moderne et qualité de fabrication.
        </p>
        {displayItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-12">
            {displayItems.map((item) => (
              <div
                key={item.id}
                className="relative h-64 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow group"
              >
                <Image
                  src={item.imageUrl}
                  alt={item.title}
                  fill
                  style={{ objectFit: 'cover' }}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                    <div className="mb-2">
                      <span className="bg-sky-600 text-white text-xs font-semibold px-2 py-1 rounded">
                        {item.category}
                      </span>
                    </div>
                    <h3 className="font-bold text-lg">{item.title}</h3>
                    <p className="text-sm text-slate-200 mt-1 line-clamp-2">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="mt-12 py-12 text-slate-500">
            <p>Aucune réalisation disponible pour le moment.</p>
          </div>
        )}
        <Link
          href="/portfolio"
          className="mt-12 inline-block bg-sky-600 text-white font-semibold px-8 py-3 rounded-lg hover:bg-sky-700 transition-colors shadow-md"
        >
          Voir plus
        </Link>
      </div>
    </section>
  );
};

export default PortfolioSummary;
