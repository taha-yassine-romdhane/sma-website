'use client';

import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50 border-b border-slate-200">
      <div className="container mx-auto ">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Link href="/" className="flex items-center hover:opacity-80 transition-opacity">
              <div className="relative w-32 h-16 sm:w-40 sm:h-20">
                <Image
                  src="/logo.jpg"
                  alt="SMA Logo"
                  fill
                  style={{ objectFit: 'contain' }}
                  sizes="(max-width: 640px) 128px, 160px"
                  priority
                />
              </div>
            </Link>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-slate-600 hover:text-sky-600 transition-colors font-medium">
              Accueil
            </Link>
            <Link href="/about" className="text-slate-600 hover:text-sky-600 transition-colors font-medium">
              À propos
            </Link>
            <Link href="/portfolio" className="text-slate-600 hover:text-sky-600 transition-colors font-medium">
              Nos réalisations
            </Link>
            <Link href="/contact" className="text-slate-600 hover:text-sky-600 transition-colors font-medium">
              Contact
            </Link>
          </div>
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-600 hover:text-slate-900 transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
      {/* Mobile Menu */}
      <div className={`md:hidden ${isOpen ? 'block' : 'hidden'} bg-white border-t border-slate-200`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link href="/" className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:text-sky-600 hover:bg-slate-50 transition-colors">
            Accueil
          </Link>
          <Link href="/about" className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:text-sky-600 hover:bg-slate-50 transition-colors">
            À propos
          </Link>
          <Link href="/portfolio" className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:text-sky-600 hover:bg-slate-50 transition-colors">
            Nos réalisations
          </Link>
          <Link href="/contact" className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:text-sky-600 hover:bg-slate-50 transition-colors">
            Contact
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
