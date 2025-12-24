import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { SERVICES } from '../constants';

const ServicesHubPage: React.FC = () => {
  return (
    <div className="bg-gray-50">
      <Helmet>
        <title>Nos Services & Innovations | BOSS SYSTEMS AI</title>
        <meta name="description" content="Découvrez nos expertises en Intelligence Artificielle, Chatbots, Automatisation et Développement Web pour booster votre entreprise." />
      </Helmet>
      <div className="container mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-[#0A1931]">Nos Expertises</h1>
          <p className="text-lg text-gray-600 mt-4 max-w-2xl mx-auto">
            Des solutions complètes pour chaque étape de votre transformation digitale.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES.map((service) => (
            <Link
              key={service.slug}
              to={`/services/${service.slug}`}
              className="group bg-white p-8 rounded-lg shadow-md hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300 flex flex-col text-center"
            >
              <div className="flex justify-center mb-6">
                <service.icon className="w-20 h-20 text-[#0A1931] group-hover:text-[#D4AF37] transition-colors duration-300" />
              </div>
              <h2 className="text-2xl font-bold text-[#0A1931] mb-3">{service.title}</h2>
              <p className="text-gray-600 flex-grow">{service.tagline}</p>
              <span className="mt-6 text-[#D4AF37] font-semibold group-hover:underline">
                En savoir plus &rarr;
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServicesHubPage;
