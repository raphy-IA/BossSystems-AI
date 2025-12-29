import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { SERVICES } from '../constants';
import { useTranslation } from 'react-i18next';

const ServicesHubPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="bg-gray-50">
      <Helmet>
        <title>{t('services.page.title')} | BOSS SYSTEMS AI</title>
        <meta name="description" content={t('services.page.subtitle')} />
      </Helmet>
      <div className="container mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-[#0A1931]">{t('services.page.title')}</h1>
          <p className="text-lg text-gray-600 mt-4 max-w-2xl mx-auto">
            {t('services.page.subtitle')}
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
              <h2 className="text-2xl font-bold text-[#0A1931] mb-2">{t(service.title)}</h2>
              <p className="text-[#D4AF37] font-semibold mb-4 text-sm uppercase tracking-wider">{t(service.tagline)}</p>
              <p className="text-gray-600 flex-grow leading-relaxed">{t(service.description)}</p>
              <span className="mt-6 text-[#D4AF37] font-semibold group-hover:underline">
                {t('common.nav.cta', 'En savoir plus')} &rarr;
              </span>
            </Link>
          ))}
        </div>

        {/* IMPACT Protocol / Pillars Section */}
        <div className="mt-24 max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#0A1931]">{t('methodology.title')}</h2>
            <div className="w-24 h-1 bg-[#D4AF37] mx-auto mt-4"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="p-6 bg-white rounded-lg shadow border-l-4 border-[#D4AF37]">
              <div className="text-4xl font-black text-[#D4AF37]/20 mb-2">01</div>
              <h3 className="text-xl font-bold text-[#0A1931] mb-2">{t('methodology.step1').split('(')[0]}</h3>
              <p className="text-sm text-gray-600">{t('methodology.step1').match(/\((.*?)\)/)?.[1] || t('methodology.step1')}</p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow border-l-4 border-[#0A1931]">
              <div className="text-4xl font-black text-[#0A1931]/20 mb-2">02</div>
              <h3 className="text-xl font-bold text-[#0A1931] mb-2">{t('methodology.step2').split('(')[0]}</h3>
              <p className="text-sm text-gray-600">{t('methodology.step2').match(/\((.*?)\)/)?.[1] || t('methodology.step2')}</p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow border-l-4 border-[#D4AF37]">
              <div className="text-4xl font-black text-[#D4AF37]/20 mb-2">03</div>
              <h3 className="text-xl font-bold text-[#0A1931] mb-2">{t('methodology.step3').split('(')[0]}</h3>
              <p className="text-sm text-gray-600">{t('methodology.step3').match(/\((.*?)\)/)?.[1] || t('methodology.step3')}</p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow border-l-4 border-[#0A1931]">
              <div className="text-4xl font-black text-[#0A1931]/20 mb-2">04</div>
              <h3 className="text-xl font-bold text-[#0A1931] mb-2">{t('methodology.step4').split('(')[0]}</h3>
              <p className="text-sm text-gray-600">{t('methodology.step4').match(/\((.*?)\)/)?.[1] || t('methodology.step4')}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicesHubPage;
