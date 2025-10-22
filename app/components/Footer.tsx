import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Facebook, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-slate-100 text-slate-800 py-12 border-t border-slate-200">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <div className="relative w-20 h-20">
                <Image
                  src="/logo.jpg"
                  alt="SMA Logo"
                  fill
                  style={{ objectFit: 'contain' }}
                  sizes="80px"
                />
              </div>
            </div>
            <h4 className="text-xl font-bold text-slate-700 mb-2">SMA - Société M'saken Aluminium</h4>
            <p className="mt-2 text-slate-600">
              Votre partenaire de confiance pour des solutions d'aluminium haut de gamme.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-slate-700">Navigation</h3>
            <ul className="mt-4 space-y-2">
              <li><Link href="/" className="text-slate-600 hover:text-sky-600 transition-colors">Accueil</Link></li>
              <li><Link href="/about" className="text-slate-600 hover:text-sky-600 transition-colors">À propos</Link></li>
              <li><Link href="/portfolio" className="text-slate-600 hover:text-sky-600 transition-colors">Nos réalisations</Link></li>
              <li><Link href="/contact" className="text-slate-600 hover:text-sky-600 transition-colors">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-slate-700">Contactez-nous</h3>
            <address className="mt-4 not-italic space-y-2 text-slate-600">
              <p>Adresse: M'saken, Sousse, Tunisie</p>
              <p>Téléphone: +216 12 345 678</p>
              <p>Email: contact@sma-aluminium.com</p>
            </address>
            <div className="flex mt-4 space-x-4">
              <a href="#" className="text-slate-600 hover:text-sky-600 transition-colors" aria-label="Facebook"><Facebook size={24} /></a>
              <a href="#" className="text-slate-600 hover:text-sky-600 transition-colors" aria-label="Instagram"><Instagram size={24} /></a>
              <a href="#" className="text-slate-600 hover:text-sky-600 transition-colors" aria-label="Linkedin"><Linkedin size={24} /></a>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-slate-300 pt-8 text-center text-slate-600">
          <p>&copy; {new Date().getFullYear()} SMA - Société M'saken Aluminium. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
