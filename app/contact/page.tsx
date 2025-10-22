'use client';

import { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Phone, Mail, MapPin, Clock, Send } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' });

        // Reset success message after 5 seconds
        setTimeout(() => setSubmitStatus('idle'), 5000);
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <Navbar />
      <main className="bg-white">
        {/* Header Section */}
        <div className="bg-gradient-to-br from-slate-50 to-slate-100 py-24 border-b border-slate-200">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-slate-900">Contactez-Nous</h1>
            <p className="mt-6 text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Une question ? Un projet ? N'hésitez pas à nous contacter. Notre équipe est à votre disposition pour vous répondre dans les plus brefs délais.
            </p>
          </div>
        </div>

        {/* Contact Form and Info Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12">
              {/* Contact Info */}
              <div>
                <h2 className="text-4xl font-bold text-slate-900">Nos Coordonnées</h2>
                <p className="mt-4 text-lg text-slate-600 leading-relaxed">
                  Retrouvez-nous à M'saken ou contactez-nous directement par téléphone ou par email.
                </p>
                <div className="mt-10 space-y-6">
                  <div className="flex items-start group">
                    <div className="flex-shrink-0 bg-sky-600 text-white rounded-lg p-3 group-hover:bg-sky-700 transition-colors">
                      <MapPin size={24} />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-xl font-semibold text-slate-900">Adresse</h3>
                      <p className="text-slate-600 mt-1">M'saken, Sousse, Tunisie</p>
                    </div>
                  </div>
                  <div className="flex items-start group">
                    <div className="flex-shrink-0 bg-sky-600 text-white rounded-lg p-3 group-hover:bg-sky-700 transition-colors">
                      <Phone size={24} />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-xl font-semibold text-slate-900">Téléphone</h3>
                      <a href="tel:+21612345678" className="text-slate-600 hover:text-sky-600 transition-colors mt-1 block">
                        +216 12 345 678
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start group">
                    <div className="flex-shrink-0 bg-sky-600 text-white rounded-lg p-3 group-hover:bg-sky-700 transition-colors">
                      <Mail size={24} />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-xl font-semibold text-slate-900">Email</h3>
                      <a href="mailto:contact@sma-aluminium.com" className="text-slate-600 hover:text-sky-600 transition-colors mt-1 block">
                        contact@sma-aluminium.com
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start group">
                    <div className="flex-shrink-0 bg-sky-600 text-white rounded-lg p-3 group-hover:bg-sky-700 transition-colors">
                      <Clock size={24} />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-xl font-semibold text-slate-900">Horaires d'ouverture</h3>
                      <p className="text-slate-600 mt-1">Lundi - Vendredi: 8h00 - 17h00</p>
                      <p className="text-slate-600">Samedi: 8h00 - 12h00</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div className="bg-slate-50 p-8 rounded-xl border border-slate-200 shadow-sm">
                <h2 className="text-3xl font-bold text-slate-900">Envoyez-nous un message</h2>
                <p className="mt-2 text-slate-600">Remplissez le formulaire ci-dessous et nous vous répondrons rapidement.</p>

                {submitStatus === 'success' && (
                  <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-green-800 font-medium">Message envoyé avec succès ! Nous vous répondrons bientôt.</p>
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-red-800 font-medium">Une erreur est survenue. Veuillez réessayer.</p>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-slate-700 mb-2">
                      Nom complet <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="block w-full px-4 py-3 border border-slate-300 rounded-lg shadow-sm focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-colors bg-white"
                      placeholder="Votre nom complet"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-slate-700 mb-2">
                      Adresse email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="block w-full px-4 py-3 border border-slate-300 rounded-lg shadow-sm focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-colors bg-white"
                      placeholder="votre.email@exemple.com"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-semibold text-slate-700 mb-2">
                      Téléphone
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      id="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="block w-full px-4 py-3 border border-slate-300 rounded-lg shadow-sm focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-colors bg-white"
                      placeholder="+216 XX XXX XXX"
                    />
                  </div>
                  <div>
                    <label htmlFor="subject" className="block text-sm font-semibold text-slate-700 mb-2">
                      Sujet <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="subject"
                      id="subject"
                      required
                      value={formData.subject}
                      onChange={handleChange}
                      className="block w-full px-4 py-3 border border-slate-300 rounded-lg shadow-sm focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-colors bg-white"
                      placeholder="Demande de devis, question technique..."
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-semibold text-slate-700 mb-2">
                      Message <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      name="message"
                      id="message"
                      rows={5}
                      required
                      value={formData.message}
                      onChange={handleChange}
                      className="block w-full px-4 py-3 border border-slate-300 rounded-lg shadow-sm focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-colors bg-white resize-none"
                      placeholder="Décrivez votre projet ou votre demande en détail..."
                    ></textarea>
                  </div>
                  <div>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-sky-600 text-white font-semibold px-6 py-4 rounded-lg hover:bg-sky-700 transition-colors shadow-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          Envoi en cours...
                        </>
                      ) : (
                        <>
                          <Send size={20} />
                          Envoyer le message
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* Map Section */}
        <section className="bg-slate-100 border-t border-slate-200">
          <div className="container mx-auto px-4 py-20">
            <h2 className="text-4xl font-bold text-center text-slate-900">Où nous trouver</h2>
            <p className="mt-4 text-center text-lg text-slate-600 max-w-2xl mx-auto">
              Visitez notre showroom à M'saken pour découvrir nos produits et échanger avec notre équipe.
            </p>
            <div className="mt-10 h-96 rounded-xl overflow-hidden shadow-lg border border-slate-300">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d51958.10942392101!2d10.54223455924978!3d35.73020992195836!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x13001b1615283679%3A0x75224235a895336!2sM'saken!5e0!3m2!1sfr!2stn!4v1678886456789!5m2!1sfr!2stn"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
