'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { X } from 'lucide-react';

const CertificateModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Check if user has seen the certificate before
    const hasSeenCertificate = localStorage.getItem('hasSeenCertificate');

    if (!hasSeenCertificate) {
      // Show modal after a short delay for better UX
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    // Mark that user has seen the certificate
    localStorage.setItem('hasSeenCertificate', 'true');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="relative w-full max-w-5xl mx-4 bg-white rounded-lg shadow-2xl overflow-hidden">
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 z-10 bg-white/90 hover:bg-white rounded-full p-2 shadow-lg transition-all hover:scale-110"
          aria-label="Close certificate"
        >
          <X size={24} className="text-slate-700" />
        </button>

        {/* Certificate content */}
        <div className="p-4 sm:p-8">
          <div className="text-center mb-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-2">
              Notre Certification
            </h2>
            <p className="text-slate-600">
              Certification d'agrément - Tunisie Profilés Aluminium
            </p>
          </div>

          {/* Certificate image */}
          <div className="relative w-full aspect-[4/3] sm:aspect-[16/10]">
            <Image
              src="/certificate.jpg"
              alt="Certificat d'agrément SMA Aluminium"
              fill
              style={{ objectFit: 'contain' }}
              priority
              className="rounded-lg"
            />
          </div>

          {/* Close button at bottom */}
          <div className="mt-6 text-center">
            <button
              onClick={handleClose}
              className="px-8 py-3 bg-sky-600 hover:bg-sky-700 text-white font-medium rounded-lg transition-colors shadow-md"
            >
              Continuer vers le site
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CertificateModal;
