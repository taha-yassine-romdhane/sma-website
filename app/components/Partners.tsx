import React from 'react';
import Image from 'next/image';

interface Partner {
  id: string;
  name: string;
  logoUrl: string;
  order: number;
}

interface PartnersProps {
  partners: Partner[];
}

const Partners = ({ partners }: PartnersProps) => {
  if (partners.length === 0) {
    return null; // Don't show section if no partners
  }

  return (
    <section className="py-20 bg-white border-t border-slate-200">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900">Nos Partenaires</h2>
          <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
            Nous travaillons avec les meilleures marques pour vous garantir des produits de qualité supérieure
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
          {partners.map((partner) => (
            <div
              key={partner.id}
              className="flex items-center justify-center p-6 bg-slate-50 rounded-lg border border-slate-200 hover:border-sky-600 transition-all duration-300 hover:shadow-md group"
            >
              <div className="relative w-full h-16 grayscale group-hover:grayscale-0 transition-all duration-300 opacity-70 group-hover:opacity-100">
                <Image
                  src={partner.logoUrl}
                  alt={partner.name}
                  fill
                  style={{ objectFit: 'contain' }}
                  sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 16vw"
                />
              </div>
            </div>
          ))}
        </div>
        <div className="mt-12 text-center">
          <p className="text-slate-600">
            Des partenaires de confiance pour des solutions d'aluminium certifiées et durables
          </p>
        </div>
      </div>
    </section>
  );
};

export default Partners;
