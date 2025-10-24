import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Facebook, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white text-slate-800 py-12 md:py-16 border-t-2 border-slate-200 shadow-inner">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12">
          <div>
            <div className="flex items-center mb-6">
              <div className="relative w-32 h-32 md:w-36 md:h-36 border-2 border-slate-200 rounded-xl p-2 bg-white shadow-sm">
                <Image
                  src="/logo.jpg"
                  alt="SMA Logo"
                  fill
                  style={{ objectFit: 'contain' }}
                  sizes="(max-width: 768px) 128px, 144px"
                  className="rounded-lg"
                />
              </div>
            </div>
            <h4 className="text-xl md:text-2xl font-bold text-slate-900 mb-3">SMA - Société M'saken Aluminium</h4>
            <p className="text-slate-600 leading-relaxed">
              Votre partenaire de confiance pour des solutions d'aluminium haut de gamme.
            </p>
          </div>
          <div>
            <h3 className="text-lg md:text-xl font-bold text-slate-900 mb-4 border-b-2 border-sky-600 pb-2 inline-block">Navigation</h3>
            <ul className="mt-5 space-y-3">
              <li><Link href="/" className="text-slate-600 hover:text-sky-600 transition-colors font-medium flex items-center group"><span className="mr-2 text-sky-600 opacity-0 group-hover:opacity-100 transition-opacity">→</span> Accueil</Link></li>
              <li><Link href="/about" className="text-slate-600 hover:text-sky-600 transition-colors font-medium flex items-center group"><span className="mr-2 text-sky-600 opacity-0 group-hover:opacity-100 transition-opacity">→</span> À propos</Link></li>
              <li><Link href="/portfolio" className="text-slate-600 hover:text-sky-600 transition-colors font-medium flex items-center group"><span className="mr-2 text-sky-600 opacity-0 group-hover:opacity-100 transition-opacity">→</span> Nos réalisations</Link></li>
              <li><Link href="/contact" className="text-slate-600 hover:text-sky-600 transition-colors font-medium flex items-center group"><span className="mr-2 text-sky-600 opacity-0 group-hover:opacity-100 transition-opacity">→</span> Contact</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg md:text-xl font-bold text-slate-900 mb-4 border-b-2 border-sky-600 pb-2 inline-block">Contactez-nous</h3>
            <address className="mt-5 not-italic space-y-3 text-slate-600">
              <p className="font-medium">📍 M'saken, Sousse, Tunisie</p>
              <p className="flex flex-col space-y-1">
                <a href="tel:+21698983137" className="hover:text-sky-600 transition-colors font-medium">📞 +216 98 983 137</a>
                <a href="tel:+21622192220" className="hover:text-sky-600 transition-colors font-medium">📞 +216 22 192 220</a>
                <a href="tel:+21673257335" className="hover:text-sky-600 transition-colors font-medium">📞 +216 73 257 335</a>
              </p>
              <p>
                <a href="mailto:msakenaluminium@outlook.fr" className="hover:text-sky-600 transition-colors font-medium">
                  ✉️ msakenaluminium@outlook.fr
                </a>
              </p>
            </address>
            <div className="flex mt-6 space-x-3">
              <a href="https://www.facebook.com/Msaken.Aluminium/" target="_blank" rel="noopener noreferrer" className="bg-slate-100 text-slate-700 hover:bg-sky-600 hover:text-white p-3 rounded-full transition-all shadow-sm hover:shadow-md" aria-label="Facebook"><Facebook size={20} /></a>
              <a href="https://www.instagram.com/msakenaluminium/" target="_blank" rel="noopener noreferrer" className="bg-slate-100 text-slate-700 hover:bg-sky-600 hover:text-white p-3 rounded-full transition-all shadow-sm hover:shadow-md" aria-label="Instagram"><Instagram size={20} /></a>
              <a href="https://www.linkedin.com/in/soci%C3%A9t%C3%A9-m-saken-aluminium-939503389" target="_blank" rel="noopener noreferrer" className="bg-slate-100 text-slate-700 hover:bg-sky-600 hover:text-white p-3 rounded-full transition-all shadow-sm hover:shadow-md" aria-label="LinkedIn"><Linkedin size={20} /></a>
            </div>
          </div>
        </div>
        <div className="mt-10 md:mt-12 border-t-2 border-slate-200 pt-6 md:pt-8 text-center">
          <p className="text-slate-600 font-medium">
            &copy; {new Date().getFullYear()} <span className="text-slate-900 font-bold">SMA - Société M'saken Aluminium</span>. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
