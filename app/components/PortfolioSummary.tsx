import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

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
    <section id="realisations" className="py-12 md:py-16 lg:py-20 bg-slate-50">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Nos réalisations</h2>
        <p className="mt-3 md:mt-4 text-base md:text-lg text-slate-600 max-w-3xl mx-auto">
          Découvrez quelques exemples de nos travaux, alliant design moderne et qualité de fabrication.
        </p>
        {displayItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mt-8 md:mt-12">
            {displayItems.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group"
              >
                {/* Image Container */}
                <div className="relative h-48 md:h-56 overflow-hidden">
                  <Image
                    src={item.imageUrl}
                    alt={item.title}
                    fill
                    style={{ objectFit: 'cover' }}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="transition-transform duration-500 group-hover:scale-110"
                  />
                  {/* Category Badges - Always visible */}
                  <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                    {item.categories.map((cat) => (
                      <span key={cat.id} className="bg-sky-600 text-white text-xs md:text-sm font-semibold px-3 py-1.5 rounded-full shadow-lg">
                        {cat.name}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Info Container - Always visible */}
                <div className="p-4 md:p-5 text-left">
                  <h3 className="font-bold text-lg md:text-xl text-slate-900 mb-2 group-hover:text-sky-600 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-sm md:text-base text-slate-600 line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>
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
          className="mt-8 md:mt-12 inline-block bg-sky-600 text-white font-semibold px-6 md:px-8 py-2.5 md:py-3 rounded-lg hover:bg-sky-700 transition-colors shadow-md text-sm md:text-base"
        >
          Voir plus
        </Link>
      </div>
    </section>
  );
};

export default PortfolioSummary;
