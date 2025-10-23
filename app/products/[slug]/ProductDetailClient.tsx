'use client';

import { useState } from 'react';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, Mail } from 'lucide-react';

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
  technicalSpecs: Array<{ name: string; description: string }>;
}

interface ProductDetailClientProps {
  product: Product;
}

export default function ProductDetailClient({ product }: ProductDetailClientProps) {
  const [selectedImage, setSelectedImage] = useState(product.mainImageUrl);

  // Parse JSON fields
  const features = Array.isArray(product.features) ? product.features : JSON.parse(product.features as any);
  const technicalSpecs = Array.isArray(product.technicalSpecs)
    ? product.technicalSpecs
    : JSON.parse(product.technicalSpecs as any);

  // Combine main image with gallery images
  const allImages = [product.mainImageUrl, ...product.images.map((img) => img.imageUrl)];

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
            {/* Image Gallery */}
            <div className="space-y-4">
              {/* Main Image */}
              <div className="relative aspect-square w-full bg-slate-100 rounded-xl overflow-hidden shadow-md">
                <Image
                  src={selectedImage}
                  alt={product.title}
                  fill
                  style={{ objectFit: 'cover' }}
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
              </div>

              {/* Thumbnail Gallery */}
              {allImages.length > 1 && (
                <div className="grid grid-cols-5 gap-2">
                  {allImages.map((imageUrl, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(imageUrl)}
                      className={`relative aspect-square bg-slate-100 rounded-lg overflow-hidden border-2 transition-all ${
                        selectedImage === imageUrl ? 'border-sky-600 shadow-md' : 'border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <Image
                        src={imageUrl}
                        alt={`${product.title} - Image ${index + 1}`}
                        fill
                        style={{ objectFit: 'cover' }}
                        sizes="20vw"
                      />
                    </button>
                  ))}
                </div>
              )}
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
                {technicalSpecs.map((spec: { name: string; description: string }, index: number) => (
                  <div key={index} className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                    <h3 className="text-xl font-bold text-slate-900 mb-2">{spec.name}</h3>
                    <p className="text-slate-600 text-sm">{spec.description}</p>
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
