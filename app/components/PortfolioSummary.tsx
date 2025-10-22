import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const PortfolioSummary = () => {
  return (
    <section id="realisations" className="py-20 bg-slate-50">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold text-slate-900">Nos réalisations</h2>
        <p className="mt-4 text-lg text-slate-600 max-w-3xl mx-auto">
          Découvrez quelques exemples de nos travaux, alliant design moderne et qualité de fabrication.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-12">
          <div className="relative h-64 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
            <Image
              src="https://via.placeholder.com/500x400"
              alt="Fenêtre en aluminium sur mesure"
              fill
              style={{ objectFit: 'cover' }}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
          <div className="relative h-64 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
            <Image
              src="https://via.placeholder.com/500x400"
              alt="Porte d'entrée en aluminium"
              fill
              style={{ objectFit: 'cover' }}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
          <div className="relative h-64 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
            <Image
              src="https://via.placeholder.com/500x400"
              alt="Véranda en aluminium"
              fill
              style={{ objectFit: 'cover' }}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        </div>
        <Link href="/portfolio" className="mt-12 inline-block bg-sky-600 text-white font-semibold px-8 py-3 rounded-lg hover:bg-sky-700 transition-colors shadow-md">
          Voir plus
        </Link>
      </div>
    </section>
  );
};

export default PortfolioSummary;
