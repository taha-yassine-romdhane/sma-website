'use client';

import React from 'react';
import { Facebook, Instagram, Linkedin } from 'lucide-react';

const SocialMediaFloat = () => {
  return (
    <div className="fixed right-4 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-3">
      {/* Facebook */}
      <a
        href="https://www.facebook.com/Msaken.Aluminium/"
        target="_blank"
        rel="noopener noreferrer"
        className="group relative bg-white hover:bg-[#1877F2] text-slate-700 hover:text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-200 hover:border-[#1877F2]"
        aria-label="Facebook"
      >
        <Facebook size={24} />
        <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-slate-900 text-white px-3 py-1 rounded text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-300">
          Facebook
        </span>
      </a>

      {/* Instagram */}
      <a
        href="https://www.instagram.com/msakenaluminium/"
        target="_blank"
        rel="noopener noreferrer"
        className="group relative bg-white hover:bg-gradient-to-br hover:from-[#833AB4] hover:via-[#E1306C] hover:to-[#F77737] text-slate-700 hover:text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-200"
        aria-label="Instagram"
      >
        <Instagram size={24} />
        <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-slate-900 text-white px-3 py-1 rounded text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-300">
          Instagram
        </span>
      </a>

      {/* LinkedIn */}
      <a
        href="https://www.linkedin.com/in/soci%C3%A9t%C3%A9-m-saken-aluminium-939503389"
        target="_blank"
        rel="noopener noreferrer"
        className="group relative bg-white hover:bg-[#0A66C2] text-slate-700 hover:text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-200 hover:border-[#0A66C2]"
        aria-label="LinkedIn"
      >
        <Linkedin size={24} />
        <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-slate-900 text-white px-3 py-1 rounded text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-300">
          LinkedIn
        </span>
      </a>
    </div>
  );
};

export default SocialMediaFloat;
