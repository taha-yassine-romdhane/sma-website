import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Image from 'next/image';
import { Eye, Award, Users, Target, Heart, Sparkles } from 'lucide-react';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <div>
      <Navbar />
      <main className="bg-white">
        {/* Header Section */}
        <div className="bg-gradient-to-br from-slate-50 to-slate-100 py-12 sm:py-16 md:py-24 border-b border-slate-200">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight">Notre Histoire, Votre Confiance</h1>
            <p className="mt-4 sm:mt-6 text-base sm:text-lg md:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Découvrez comment la Société M'saken Aluminium (SMA) est devenue un leader de la menuiserie aluminium à Sousse.
            </p>
          </div>
        </div>

        {/* Introduction Section */}
        <section className="py-12 sm:py-16 md:py-20">
          <div className="container mx-auto px-4 grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900">Bienvenue chez SMA</h2>
              <p className="mt-4 sm:mt-6 text-base sm:text-lg text-slate-600 leading-relaxed">
                Fondée à M'saken, au cœur de la région de Sousse, la Société M'saken Aluminium (SMA) s'est imposée comme une référence dans le domaine de la menuiserie en aluminium. Notre savoir-faire, transmis de génération en génération, nous permet de proposer des solutions innovantes et sur mesure pour les particuliers et les professionnels.
              </p>
              <p className="mt-3 sm:mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
                Nous sommes spécialisés dans la conception, la fabrication et l'installation de fenêtres, portes, vérandas, et autres structures en aluminium, alliant esthétique, durabilité et performance énergétique.
              </p>
              <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4">
                <Link
                  href="/portfolio"
                  className="bg-sky-600 hover:bg-sky-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors shadow-md text-center"
                >
                  Voir nos réalisations
                </Link>
                <Link
                  href="/contact"
                  className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold px-6 py-3 rounded-lg transition-colors border border-slate-300 text-center"
                >
                  Contactez-nous
                </Link>
              </div>
            </div>
            <div className="relative h-64 sm:h-80 md:h-96 rounded-xl overflow-hidden shadow-lg">
              <Image
                src="/sma-local.jpg"
                alt="Société M'saken Aluminium - Notre showroom et atelier"
                fill
                style={{ objectFit: 'cover' }}
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        </section>

        {/* Mission & Vision Section */}
        <section className="py-12 sm:py-16 md:py-20 bg-slate-50 border-y border-slate-200">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-6 sm:gap-8 md:gap-12">
              <div className="bg-white p-6 sm:p-8 rounded-xl shadow-sm border border-slate-200">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-sky-100 p-2 sm:p-3 rounded-lg">
                    <Target className="w-6 h-6 sm:w-8 sm:h-8 text-sky-600" />
                  </div>
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-900">Notre Mission</h3>
                </div>
                <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
                  Offrir des produits en aluminium de qualité supérieure qui améliorent le confort, la sécurité et l'esthétique des espaces de vie et de travail de nos clients.
                </p>
              </div>
              <div className="bg-white p-6 sm:p-8 rounded-xl shadow-sm border border-slate-200">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-sky-100 p-2 sm:p-3 rounded-lg">
                    <Eye className="w-6 h-6 sm:w-8 sm:h-8 text-sky-600" />
                  </div>
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-900">Notre Vision</h3>
                </div>
                <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
                  Être le partenaire de confiance et le leader incontesté de la menuiserie aluminium en Tunisie, reconnu pour notre innovation, notre qualité et notre service client irréprochable.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="py-12 sm:py-16 md:py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-10 sm:mb-12 md:mb-16">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900">Pourquoi Nous Choisir ?</h2>
              <p className="mt-3 sm:mt-4 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto">
                Trois piliers qui font de SMA votre partenaire idéal pour vos projets d'aluminium
              </p>
            </div>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
              <div className="bg-white p-6 sm:p-8 rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
                <div className="flex justify-center mb-4 sm:mb-6">
                  <div className="bg-sky-600 text-white rounded-lg p-3 sm:p-4">
                    <Award size={28} className="sm:w-8 sm:h-8" />
                  </div>
                </div>
                <h3 className="text-xl sm:text-2xl font-semibold text-slate-900 text-center mb-2 sm:mb-3">Qualité Supérieure</h3>
                <p className="text-sm sm:text-base text-slate-600 text-center leading-relaxed">
                  Nous utilisons uniquement des matériaux de première qualité pour garantir la longévité et la performance de nos produits.
                </p>
              </div>
              <div className="bg-white p-6 sm:p-8 rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
                <div className="flex justify-center mb-4 sm:mb-6">
                  <div className="bg-sky-600 text-white rounded-lg p-3 sm:p-4">
                    <Users size={28} className="sm:w-8 sm:h-8" />
                  </div>
                </div>
                <h3 className="text-xl sm:text-2xl font-semibold text-slate-900 text-center mb-2 sm:mb-3">Équipe d'Experts</h3>
                <p className="text-sm sm:text-base text-slate-600 text-center leading-relaxed">
                  Notre équipe d'artisans qualifiés et passionnés est à votre écoute pour réaliser vos projets les plus ambitieux.
                </p>
              </div>
              <div className="bg-white p-6 sm:p-8 rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
                <div className="flex justify-center mb-4 sm:mb-6">
                  <div className="bg-sky-600 text-white rounded-lg p-3 sm:p-4">
                    <Sparkles size={28} className="sm:w-8 sm:h-8" />
                  </div>
                </div>
                <h3 className="text-xl sm:text-2xl font-semibold text-slate-900 text-center mb-2 sm:mb-3">Approche Sur Mesure</h3>
                <p className="text-sm sm:text-base text-slate-600 text-center leading-relaxed">
                  Chaque projet est unique. Nous offrons un service personnalisé pour répondre précisément à vos besoins et à vos envies.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Certificate Section */}
        <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-br from-slate-700 to-slate-800">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8 sm:mb-10 md:mb-12">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">Notre Certification</h2>
              <p className="mt-3 sm:mt-4 text-base sm:text-lg text-slate-200 max-w-2xl mx-auto">
                Certifiés par Tunisie Profilés Aluminium - Un gage de qualité et de confiance
              </p>
            </div>
            <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-2xl p-4 sm:p-6 md:p-8">
              <div className="relative w-full aspect-[4/3] sm:aspect-[16/10]">
                <Image
                  src="/certificate.jpg"
                  alt="Certificat d'agrément SMA - Tunisie Profilés Aluminium"
                  fill
                  style={{ objectFit: 'contain' }}
                  className="rounded-lg"
                  sizes="(max-width: 768px) 100vw, 1200px"
                />
              </div>
              <div className="mt-4 sm:mt-6 text-center">
                <p className="text-slate-600 text-xs sm:text-sm md:text-base">
                  Certification d'agrément N° 24-007 | Émise le 30/04/2024 | Valide jusqu'au 29/04/2027
                </p>
                <p className="mt-2 text-slate-700 font-semibold text-sm sm:text-base">
                  1ᴱᴿ RÉSEAU DE CONFIANCE - ELLIPSE 67 & 40 / CLOISON 16
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-12 sm:py-16 md:py-20 bg-slate-50 border-t border-slate-200">
          <div className="container mx-auto px-4">
            <div className="text-center mb-10 sm:mb-12 md:mb-16">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900">Nos Valeurs</h2>
              <p className="mt-3 sm:mt-4 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto">
                Les principes qui guident notre travail au quotidien
              </p>
            </div>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 max-w-5xl mx-auto">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 bg-sky-100 text-sky-600 rounded-full mb-3 sm:mb-4">
                  <Heart size={28} className="sm:w-8 sm:h-8" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-slate-900 mb-2">Passion</h3>
                <p className="text-sm sm:text-base text-slate-600">
                  Un amour du métier qui se reflète dans chaque réalisation
                </p>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 bg-sky-100 text-sky-600 rounded-full mb-3 sm:mb-4">
                  <Award size={28} className="sm:w-8 sm:h-8" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-slate-900 mb-2">Excellence</h3>
                <p className="text-sm sm:text-base text-slate-600">
                  Un engagement constant vers la perfection et l'amélioration
                </p>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 bg-sky-100 text-sky-600 rounded-full mb-3 sm:mb-4">
                  <Users size={28} className="sm:w-8 sm:h-8" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-slate-900 mb-2">Proximité</h3>
                <p className="text-sm sm:text-base text-slate-600">
                  Une écoute attentive et un accompagnement personnalisé
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-br from-slate-700 to-slate-800 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">Prêt à démarrer votre projet ?</h2>
            <p className="mt-3 sm:mt-4 text-base sm:text-lg md:text-xl text-slate-200 max-w-2xl mx-auto">
              Contactez-nous dès aujourd'hui pour discuter de vos besoins et obtenir un devis gratuit.
            </p>
            <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center max-w-md sm:max-w-none mx-auto">
              <Link
                href="/contact"
                className="bg-sky-600 hover:bg-sky-700 text-white font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-lg transition-colors shadow-lg text-center"
              >
                Demander un devis
              </Link>
              <Link
                href="/portfolio"
                className="bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-lg transition-colors border border-white/30 text-center"
              >
                Voir nos projets
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
