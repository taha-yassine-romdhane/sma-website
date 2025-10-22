import React from 'react';
import Link from 'next/link';

const AboutSummary = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold text-slate-900">À propos de SMA</h2>
        <p className="mt-6 text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
          La Société M'saken Aluminium (SMA) est votre expert en menuiserie aluminium, offrant des solutions sur mesure pour les particuliers et les professionnels. Nous nous engageons à fournir des produits de haute qualité et un service exceptionnel.
        </p>
        <Link href="/about" className="mt-10 inline-block bg-sky-600 text-white font-semibold px-8 py-3 rounded-lg hover:bg-sky-700 transition-colors shadow-md">
          En savoir plus
        </Link>
      </div>
    </section>
  );
};

export default AboutSummary;
