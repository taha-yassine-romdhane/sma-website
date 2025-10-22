import React from 'react';
import { Shield, Wrench, Ruler, Award } from 'lucide-react';

const Services = () => {
  const services = [
    {
      icon: <Ruler className="w-12 h-12 text-sky-600" />,
      title: 'Sur mesure',
      description: 'Des produits conçus et fabriqués selon vos besoins spécifiques et vos dimensions exactes.'
    },
    {
      icon: <Shield className="w-12 h-12 text-sky-600" />,
      title: 'Qualité garantie',
      description: 'Matériaux premium et finitions soignées pour une durabilité exceptionnelle.'
    },
    {
      icon: <Wrench className="w-12 h-12 text-sky-600" />,
      title: 'Installation professionnelle',
      description: 'Notre équipe expérimentée assure une pose impeccable de tous nos produits.'
    },
    {
      icon: <Award className="w-12 h-12 text-sky-600" />,
      title: 'Expertise reconnue',
      description: 'Des années d\'expérience dans la menuiserie aluminium à votre service.'
    }
  ];

  return (
    <section className="py-20 bg-white border-t border-slate-200">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900">Nos services</h2>
          <p className="mt-4 text-lg text-slate-600 max-w-3xl mx-auto">
            Un accompagnement complet pour tous vos projets d'aluminium
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="text-center p-6 rounded-lg hover:bg-slate-50 transition-colors"
            >
              <div className="flex justify-center mb-4">
                {service.icon}
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">
                {service.title}
              </h3>
              <p className="text-slate-600 leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
