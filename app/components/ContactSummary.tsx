import React from 'react';
import Link from 'next/link';

const ContactSummary = () => {
  return (
    <section id="contact" className="py-20 bg-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold text-slate-900">Un projet en tête ?</h2>
        <p className="mt-6 text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
          N'hésitez pas à nous contacter pour discuter de votre projet. Notre équipe est à votre écoute pour vous conseiller et vous proposer un devis personnalisé.
        </p>
        <Link href="/contact" className="mt-10 inline-block bg-sky-600 text-white font-semibold px-8 py-3 rounded-lg hover:bg-sky-700 transition-colors shadow-md">
          Contactez-nous
        </Link>
      </div>
    </section>
  );
};

export default ContactSummary;
