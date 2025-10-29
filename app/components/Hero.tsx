'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

interface HeroSlide {
  id: string;
  title: string;
  subtitle: string;
  imageUrl: string;
  mobileImageUrl: string | null;
  order: number;
}

interface HeroProps {
  slides: HeroSlide[];
}

const Hero = ({ slides }: HeroProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying || slides.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, slides.length]);

  const goToPrevious = () => {
    setIsAutoPlaying(false);
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToNext = () => {
    setIsAutoPlaying(false);
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const goToSlide = (index: number) => {
    setIsAutoPlaying(false);
    setCurrentSlide(index);
  };

  if (slides.length === 0) {
    // Fallback if no slides in database
    return (
      <div className="relative h-[500px] sm:h-[600px] md:h-[650px] lg:h-[700px] hero-gradient">
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/70 to-slate-800/50"></div>
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-white px-4 sm:px-6">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-4 sm:mb-6">
            SMA - Société M'saken Aluminium
          </h1>
          <p className="mt-2 sm:mt-4 text-base sm:text-lg md:text-xl lg:text-2xl text-center max-w-3xl text-slate-100 px-4">
            Votre partenaire de confiance pour des solutions d'aluminium haut de gamme.
          </p>
          <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto px-4 sm:px-0">
            <a
              href="#contact"
              className="bg-sky-600 hover:bg-sky-700 text-white font-semibold px-6 sm:px-8 py-3 rounded-lg transition-colors shadow-lg text-center"
            >
              Demander un devis
            </a>
            <a
              href="#realisations"
              className="bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white font-semibold px-6 sm:px-8 py-3 rounded-lg transition-colors border border-white/30 text-center"
            >
              Nos réalisations
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-[500px] sm:h-[600px] md:h-[650px] lg:h-[700px] overflow-hidden">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {/* Desktop Image */}
          <Image
            src={slide.imageUrl}
            alt={slide.title}
            fill
            style={{ objectFit: 'cover', objectPosition: 'center' }}
            priority={index === 0}
            sizes="100vw"
            className={`scale-105 sm:scale-100 ${slide.mobileImageUrl ? 'hidden sm:block' : ''}`}
          />
          {/* Mobile Image (if provided) */}
          {slide.mobileImageUrl && (
            <Image
              src={slide.mobileImageUrl}
              alt={slide.title}
              fill
              style={{ objectFit: 'cover', objectPosition: 'center' }}
              priority={index === 0}
              sizes="100vw"
              className="block sm:hidden scale-105"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 to-slate-800/60"></div>
          <div className="relative z-10 flex flex-col items-center justify-center h-full text-white px-4 sm:px-6">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-4 sm:mb-6 animate-fadeIn">
              {slide.title}
            </h1>
            <p className="mt-2 sm:mt-4 text-base sm:text-lg md:text-xl lg:text-2xl text-center max-w-3xl text-slate-100 animate-fadeIn px-4">
              {slide.subtitle}
            </p>
            <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto px-4 sm:px-0 animate-fadeIn">
              <a
                href="#contact"
                className="bg-sky-600 hover:bg-sky-700 text-white font-semibold px-6 sm:px-8 py-3 rounded-lg transition-colors shadow-lg text-center"
              >
                Demander un devis
              </a>
              <a
                href="#realisations"
                className="bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white font-semibold px-6 sm:px-8 py-3 rounded-lg transition-colors border border-white/30 text-center"
              >
                Nos réalisations
              </a>
            </div>
          </div>
        </div>
      ))}

      {/* Dots Navigation - Only show if more than 1 slide */}
      {slides.length > 1 && (
        <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-2 sm:h-3 rounded-full transition-all ${
                index === currentSlide
                  ? 'bg-white w-6 sm:w-8'
                  : 'bg-white/50 hover:bg-white/75 w-2 sm:w-3'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Hero;
