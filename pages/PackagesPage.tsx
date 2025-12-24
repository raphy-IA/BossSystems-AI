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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch pt-8">
          {PACKAGES.map((pkg) => (
            <div
              key={pkg.name}
              className={`bg-white rounded-2xl shadow-xl p-8 flex flex-col relative transition-all duration-300 hover:shadow-2xl ${pkg.isPopular ? 'border-4 border-[#D4AF37] transform lg:scale-110 z-10' : 'border border-gray-100'}`}
            >
              {pkg.isPopular && (
                <div className="absolute -top-5 left-1/2 transform -translate-x-1/2">
                  <span className="bg-[#D4AF37] text-[#0A1931] text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider shadow-md whitespace-nowrap">
                    Recommandé
                  </span>
                </div>
              )}

              <div className="mb-8">
                <h2 className="text-2xl font-bold text-[#0A1931] mb-2">{pkg.name}</h2>
                <p className="text-gray-500 text-sm leading-relaxed h-10">
                  {pkg.tagline}
                </p>
              </div>

              <div className="mb-8 p-6 bg-gray-50 rounded-xl border border-gray-100">
                <div className="text-center">
                  <span className="text-sm font-semibold text-gray-500 block mb-1">Investissement</span>
                  <p className="text-2xl font-extrabold text-[#0A1931]">{pkg.price}</p>
                </div>
              </div>

              <ul className="space-y-4 text-gray-700 flex-grow mb-10">
                {pkg.features.map(feature => (
                  <li key={feature} className="flex items-start text-sm">
                    <svg className="w-5 h-5 text-[#D4AF37] mr-3 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <Link
                to="/contact"
                className={`w-full text-center block font-bold py-4 px-8 rounded-full transition-all duration-300 shadow-lg ${pkg.isPopular ? 'bg-[#D4AF37] text-[#0A1931] hover:bg-[#b8952d]' : 'bg-[#0A1931] text-white hover:bg-slate-800'}`}
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
