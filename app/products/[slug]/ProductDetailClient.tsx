'use client';

import { useState } from 'react';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, Mail } from 'lucide-react';

interface ProductImage {
  id: string;
  imageUrl: string;
  order: number;
}

interface Product {
  id: string;
  title: string;
  slug: string;
  category: string;
  description: string;
  mainImageUrl: string;
  images: ProductImage[];
  features: string[];
  technicalSpecs: Array<{ name: string; description: string; imageUrl: string }>;
}

interface ProductDetailClientProps {
  product: Product;
}

export default function ProductDetailClient({ product }: ProductDetailClientProps) {
  // Combine main image with gallery images (main image is first)
  const allImages = [product.mainImageUrl, ...product.images.map((img) => img.imageUrl)];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Parse JSON fields
  const features = Array.isArray(product.features) ? product.features : JSON.parse(product.features as any);
  const technicalSpecs = Array.isArray(product.technicalSpecs)
    ? product.technicalSpecs
    : JSON.parse(product.technicalSpecs as any);

  const goToPrevious = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? allImages.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentImageIndex((prev) => (prev === allImages.length - 1 ? 0 : prev + 1));
  };

  const goToImage = (index: number) => {
    setCurrentImageIndex(index);
  };

  return (
    <div>
      <Navbar />
      <main className="bg-white">
        {/* Breadcrumb */}
        <div className="bg-slate-50 border-b border-slate-200">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <Link href="/" className="hover:text-sky-600 transition-colors">
                Accueil
              </Link>
              <span>/</span>
              <Link href="/products" className="hover:text-sky-600 transition-colors">
                Nos Produits
              </Link>
              <span>/</span>
              <span className="text-slate-900 font-medium">{product.title}</span>
            </div>
          </div>
        </div>

        {/* Back Button */}
        <div className="container mx-auto px-4 py-6">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-slate-600 hover:text-sky-600 transition-colors font-medium"
          >
            <ChevronLeft size={20} />
            Retour aux produits
          </Link>
        </div>

        {/* Product Content */}
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Image Carousel */}
            <div className="w-full">
              {/* Main Image Display */}
              <div className="relative aspect-square w-full bg-slate-100 rounded-xl overflow-hidden shadow-lg">
                <Image
                  src={allImages[currentImageIndex]}
                  alt={`${product.title} - Image ${currentImageIndex + 1}`}
                  fill
                  style={{ objectFit: 'cover' }}
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />

                {/* Navigation Arrows - Only show if more than 1 image */}
                {allImages.length > 1 && (
                  <>
                    <button
                      onClick={goToPrevious}
                      className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-white text-slate-900 p-3 rounded-full transition-all shadow-lg hover:scale-110"
                      aria-label="Image précédente"
                    >
                      <ChevronLeft size={24} />
                    </button>
                    <button
                      onClick={goToNext}
                      className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-white text-slate-900 p-3 rounded-full transition-all shadow-lg hover:scale-110"
                      aria-label="Image suivante"
                    >
                      <ChevronRight size={24} />
                    </button>

                    {/* Navigation Dots */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
                      {allImages.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => goToImage(index)}
                          className={`h-2 sm:h-3 rounded-full transition-all ${
                            index === currentImageIndex
                              ? 'bg-white w-6 sm:w-8'
                              : 'bg-white/50 hover:bg-white/75 w-2 sm:w-3'
                          }`}
                          aria-label={`Aller à l'image ${index + 1}`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-8">
              {/* Title & Category */}
              <div>
                <span className="inline-block bg-sky-100 text-sky-700 text-sm font-semibold px-3 py-1 rounded-full mb-4">
                  {product.category}
                </span>
                <h1 className="text-4xl md:text-5xl font-bold text-slate-900">{product.title}</h1>
              </div>

              {/* Description */}
              <div className="prose prose-slate max-w-none">
                <p className="text-lg text-slate-600 leading-relaxed whitespace-pre-line">{product.description}</p>
              </div>

              {/* Features */}
              {features && features.length > 0 && (
                <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
                  <h2 className="text-2xl font-bold text-slate-900 mb-4">Caractéristiques</h2>
                  <ul className="space-y-3">
                    {features.map((feature: string, index: number) => (
                      <li key={index} className="flex items-start gap-3">
                        <span className="text-sky-600 mt-1">✓</span>
                        <span className="text-slate-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* CTA Button */}
              <div className="bg-gradient-to-br from-sky-50 to-blue-50 rounded-xl p-8 border border-sky-200">
                <h3 className="text-2xl font-bold text-slate-900 mb-3">Intéressé par ce produit ?</h3>
                <p className="text-slate-600 mb-6">
                  Contactez-nous pour obtenir un devis personnalisé et découvrir comment nous pouvons réaliser votre
                  projet.
                </p>
                <Link
                  href={`/contact?product=${product.slug}`}
                  className="inline-flex items-center gap-2 bg-sky-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-sky-700 transition-colors shadow-md"
                >
                  <Mail size={20} />
                  Demander un devis
                </Link>
              </div>
            </div>
          </div>

          {/* Technical Specifications */}
          {technicalSpecs && technicalSpecs.length > 0 && (
            <div className="mt-20">
              <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">Spécifications Techniques</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {technicalSpecs.map((spec: { name: string; description: string; imageUrl: string }, index: number) => (
                  <div key={index} className="bg-white rounded-xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                    {spec.imageUrl && (
                      <div className="relative w-full h-48 bg-slate-100">
                        <Image
                          src={spec.imageUrl}
                          alt={spec.name}
                          fill
                          style={{ objectFit: 'cover' }}
                          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        />
                      </div>
                    )}
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-slate-900 mb-2">{spec.name}</h3>
                      <p className="text-slate-600 text-sm">{spec.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
