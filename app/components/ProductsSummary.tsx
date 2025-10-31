import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

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

interface ProductsSummaryProps {
  products: Product[];
}

const ProductsSummary = ({ products }: ProductsSummaryProps) => {
  // Show only the first 3 products
  const displayProducts = products.slice(0, 3);

  return (
    <section className="py-12 md:py-16 lg:py-20 bg-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Nos Produits</h2>
        <p className="mt-3 md:mt-4 text-base md:text-lg text-slate-600 max-w-3xl mx-auto">
          Découvrez notre gamme de solutions en menuiserie aluminium, conçues pour allier esthétique et performance.
        </p>
        {displayProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mt-8 md:mt-12">
            {displayProducts.map((product) => (
              <Link
                key={product.id}
                href={`/products/${product.slug}`}
                className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group border border-slate-200"
              >
                {/* Image Container */}
                <div className="relative h-48 md:h-56 overflow-hidden bg-slate-100">
                  <Image
                    src={product.mainImageUrl}
                    alt={product.title}
                    fill
                    style={{ objectFit: 'cover' }}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="transition-transform duration-500 group-hover:scale-110"
                  />
                </div>

                {/* Info Container - Always visible */}
                <div className="p-4 md:p-5 text-left">
                  <h3 className="font-bold text-lg md:text-xl text-slate-900 mb-2 group-hover:text-sky-600 transition-colors">
                    {product.title}
                  </h3>
                  <p className="text-sm md:text-base text-slate-600 line-clamp-2 leading-relaxed mb-3">
                    {product.description}
                  </p>
                  <span className="text-sky-600 font-semibold text-sm md:text-base group-hover:underline">
                    Voir détails →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="mt-12 py-12 text-slate-500">
            <p>Aucun produit disponible pour le moment.</p>
          </div>
        )}
        <Link
          href="/products"
          className="mt-8 md:mt-12 inline-block bg-sky-600 text-white font-semibold px-6 md:px-8 py-2.5 md:py-3 rounded-lg hover:bg-sky-700 transition-colors shadow-md text-sm md:text-base"
        >
          Voir tous les produits
        </Link>
      </div>
    </section>
  );
};

export default ProductsSummary;
