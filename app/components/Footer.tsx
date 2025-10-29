import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Facebook, Instagram, Linkedin, MapPin, Phone, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white text-slate-800 py-8 md:py-10 border-t-2 border-slate-200 shadow-inner">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
          <div>
            <div className="mb-4">
              <div className="relative w-full max-w-[240px] h-14 md:h-16">
                <Image
                  src="/logo.jpg"
                  alt="SMA Logo"
                  fill
                  style={{ objectFit: 'contain', objectPosition: 'left' }}
                  sizes="240px"
                />
              </div>
            </div>
            <p className="text-slate-600 leading-relaxed text-sm md:text-base mb-4">
              Votre partenaire de confiance pour des solutions d'aluminium haut de gamme.
            </p>
            <div className="flex space-x-3">
              <a href="https://www.facebook.com/Msaken.Aluminium/" target="_blank" rel="noopener noreferrer" className="bg-slate-100 text-slate-700 hover:bg-sky-600 hover:text-white p-2.5 rounded-full transition-all shadow-sm hover:shadow-md" aria-label="Facebook"><Facebook size={18} /></a>
              <a href="https://www.instagram.com/msakenaluminium/" target="_blank" rel="noopener noreferrer" className="bg-slate-100 text-slate-700 hover:bg-sky-600 hover:text-white p-2.5 rounded-full transition-all shadow-sm hover:shadow-md" aria-label="Instagram"><Instagram size={18} /></a>
              <a href="https://www.linkedin.com/in/soci%C3%A9t%C3%A9-m-saken-aluminium-939503389" target="_blank" rel="noopener noreferrer" className="bg-slate-100 text-slate-700 hover:bg-sky-600 hover:text-white p-2.5 rounded-full transition-all shadow-sm hover:shadow-md" aria-label="LinkedIn"><Linkedin size={18} /></a>
            </div>
          </div>
          <div>
            <h3 className="text-base md:text-lg font-bold text-slate-900 mb-3 border-b-2 border-sky-600 pb-2 inline-block">Navigation</h3>
            <ul className="mt-4 space-y-2">
              <li><Link href="/" className="text-slate-600 hover:text-sky-600 transition-colors font-medium flex items-center group text-sm md:text-base"><span className="mr-2 text-sky-600 opacity-0 group-hover:opacity-100 transition-opacity">→</span> Accueil</Link></li>
              <li><Link href="/about" className="text-slate-600 hover:text-sky-600 transition-colors font-medium flex items-center group text-sm md:text-base"><span className="mr-2 text-sky-600 opacity-0 group-hover:opacity-100 transition-opacity">→</span> À propos</Link></li>
              <li><Link href="/portfolio" className="text-slate-600 hover:text-sky-600 transition-colors font-medium flex items-center group text-sm md:text-base"><span className="mr-2 text-sky-600 opacity-0 group-hover:opacity-100 transition-opacity">→</span> Nos réalisations</Link></li>
              <li><Link href="/contact" className="text-slate-600 hover:text-sky-600 transition-colors font-medium flex items-center group text-sm md:text-base"><span className="mr-2 text-sky-600 opacity-0 group-hover:opacity-100 transition-opacity">→</span> Contact</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-base md:text-lg font-bold text-slate-900 mb-3 border-b-2 border-sky-600 pb-2 inline-block">Contactez-nous</h3>
            <address className="mt-4 not-italic space-y-2 text-slate-600 text-sm md:text-base">
              <p className="font-medium flex items-center gap-2">
                <MapPin size={16} className="text-sky-600 flex-shrink-0" />
                M'saken, Sousse, Tunisie
              </p>
              <div className="flex flex-col space-y-1">
                <a href="tel:+21698983137" className="hover:text-sky-600 transition-colors font-medium flex items-center gap-2">
                  <Phone size={16} className="text-sky-600 flex-shrink-0" />
                  +216 98 983 137
                </a>
                <a href="tel:+21622192220" className="hover:text-sky-600 transition-colors font-medium flex items-center gap-2">
                  <Phone size={16} className="text-sky-600 flex-shrink-0" />
                  +216 22 192 220
                </a>
                <a href="tel:+21673257335" className="hover:text-sky-600 transition-colors font-medium flex items-center gap-2">
                  <Phone size={16} className="text-sky-600 flex-shrink-0" />
                  +216 73 257 335
                </a>
              </div>
              <a href="mailto:msakenaluminium@outlook.fr" className="hover:text-sky-600 transition-colors font-medium flex items-center gap-2">
                <Mail size={16} className="text-sky-600 flex-shrink-0" />
                msakenaluminium@outlook.fr
              </a>
            </address>
          </div>
        </div>
        <div className="mt-8 border-t-2 border-slate-200 pt-5 text-center">
          <p className="text-slate-600 font-medium text-sm md:text-base">
            &copy; {new Date().getFullYear()} <span className="text-slate-900 font-bold">SMA - Société M'saken Aluminium</span>. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
