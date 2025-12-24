import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { PACKAGES } from '../constants';

const PackagesPage: React.FC = () => {
  return (
    <div className="bg-gray-50">
      <Helmet>
        <title>Nos Offres Packagées | BOSS SYSTEMS AI</title>
        <meta name="description" content="Comparez nos packs Digital Starter, Scale Up et Enterprise. Des solutions clés en main adaptées à votre stade de croissance." />
      </Helmet>
      <div className="container mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-[#0A1931]">Des solutions adaptées à votre croissance</h1>
          <p className="text-lg text-gray-600 mt-4 max-w-2xl mx-auto">
            Comparez nos offres et choisissez le pack qui correspond le mieux à votre ambition et à votre maturité digitale.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {PACKAGES.map((pkg, index) => (
            <div
              key={pkg.name}
              className={`bg-white rounded-xl shadow-lg p-8 flex flex-col ${index === 1 ? 'border-4 border-[#D4AF37] transform lg:scale-105' : 'border border-gray-200'}`}
            >
              {index === 1 && (
                <div className="text-center mb-4">
                  <span className="bg-[#D4AF37] text-[#0A1931] text-sm font-bold px-4 py-1 rounded-full uppercase">Le plus populaire</span>
                </div>
              )}
              <h2 className="text-3xl font-bold text-[#0A1931] text-center mb-2">{pkg.name}</h2>
              <p className="text-gray-500 text-center mb-8 h-12">
                {pkg.name === 'Starter Digital Pack' ? "Idéal pour démarrer" : pkg.name === 'Scale Up Pack' ? "Pour scaler efficacement" : "Pour innover et dominer"}
              </p>

              <div className="border-t border-gray-200 my-6"></div>

              <ul className="space-y-4 text-gray-700 flex-grow mb-8">
                {pkg.features.map(feature => (
                  <li key={feature} className="flex items-start">
                    <svg className="w-6 h-6 text-green-500 mr-3 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Link
                to="/contact"
                className={`w-full text-center block font-bold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 mt-auto ${index === 1 ? 'bg-[#D4AF37] text-[#0A1931] hover:bg-opacity-90' : 'bg-slate-800 text-white hover:bg-slate-700'}`}
              >
                {pkg.ctaText}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PackagesPage;
