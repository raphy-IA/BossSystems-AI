import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { PACKAGES } from '../constants';
import { useCurrency } from '../context/CurrencyContext';

const PackagesPage: React.FC = () => {
  const { t } = useTranslation();
  const { formatPrice } = useCurrency();

  // Construct packages from translation to ensure language switch
  // We map index 0 -> starter, 1 -> scaleup, 2 -> elite based on constants order
  const packages = [
    {
      name: t('packages.starter.name'),
      tagline: t('packages.starter.tagline'),
      price: PACKAGES[0].prices ? `${t('common.from')} ${formatPrice(PACKAGES[0].prices)}` : t('packages.starter.price'),
      features: Object.values(t('packages.starter.features', { returnObjects: true })),
      ctaText: t('packages.starter.cta'),
      isPopular: false
    },
    {
      name: t('packages.scaleup.name'),
      tagline: t('packages.scaleup.tagline'),
      price: PACKAGES[1].prices ? `${t('common.from')} ${formatPrice(PACKAGES[1].prices)}` : t('packages.scaleup.price'),
      features: Object.values(t('packages.scaleup.features', { returnObjects: true })),
      ctaText: t('packages.scaleup.cta'),
      isPopular: true
    },
    {
      name: t('packages.elite.name'),
      tagline: t('packages.elite.tagline'),
      price: PACKAGES[2].prices ? `${t('common.from')} ${formatPrice(PACKAGES[2].prices)}` : t('packages.elite.price'),
      features: Object.values(t('packages.elite.features', { returnObjects: true })),
      ctaText: t('packages.elite.cta'),
      isPopular: false
    }
  ];

  return (
    <div className="bg-gray-50">
      <Helmet>
        <title>{t('common.nav.packages')} | BOSS SYSTEMS AI</title>
        <meta name="description" content={t('packages.page.subtitle')} />
      </Helmet>
      <div className="container mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-[#0A1931]">{t('packages.page.title')}</h1>
          <p className="text-lg text-gray-600 mt-4 max-w-2xl mx-auto">
            {t('packages.page.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch pt-8">
          {packages.map((pkg, index) => (
            <div
              key={pkg.name}
              className={`bg-white rounded-2xl shadow-xl p-8 flex flex-col relative transition-all duration-300 hover:shadow-2xl ${pkg.isPopular ? 'border-4 border-[#D4AF37] transform lg:scale-110 z-10' : 'border border-gray-100'}`}
            >
              {pkg.isPopular && (
                <div className="absolute -top-5 left-1/2 transform -translate-x-1/2">
                  <span className="bg-[#D4AF37] text-[#0A1931] text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider shadow-md whitespace-nowrap">
                    {t('packages.scaleup.badge', 'Recommandé')}
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
                  <span className="text-sm font-semibold text-gray-500 block mb-1">{t('packages.scaleup.investment', 'Investissement')}</span>
                  <p className="text-2xl font-extrabold text-[#0A1931]">{pkg.price}</p>
                </div>
              </div>

              <ul className="space-y-4 text-gray-700 flex-grow mb-10">
                {/* Ensure features is an array before mapping */}
                {Array.isArray(pkg.features) && pkg.features.map((feature: string) => (
                  <li key={feature} className="flex items-start text-sm">
                    <svg className="w-5 h-5 text-[#D4AF37] mr-3 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <Link
                to={`/contact?pack=${index === 0 ? 'starter' : index === 1 ? 'scaleup' : 'elite'}`}
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
