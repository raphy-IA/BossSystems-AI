
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { CASE_STUDIES } from '../constants';

const PortfolioPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="bg-white">
      <Helmet>
        <title>{t('common.nav.portfolio')} | BOSS SYSTEMS AI</title>
        <meta name="description" content={t('portfolio.page.subtitle')} />
      </Helmet>
      <div className="container mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-[#0A1931]">{t('portfolio.page.title')}</h1>
          <p className="text-lg text-gray-600 mt-4 max-w-2xl mx-auto">
            {t('portfolio.page.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {CASE_STUDIES.map((study) => (
            <div key={study.id} className="bg-white rounded-xl shadow-lg overflow-hidden group hover:shadow-2xl transition-all duration-300 border border-gray-100">
              <div className="relative overflow-hidden">
                <img src={study.imageUrl} alt={study.title} className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A1931] via-transparent to-transparent opacity-0 group-hover:opacity-60 transition-opacity duration-300" />
              </div>
              <div className="p-8">
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-8 h-[2px] bg-[#D4AF37]" />
                  <p className="text-sm text-[#D4AF37] font-bold uppercase tracking-wider">{t(`portfolio.cases.${study.id}.client`, study.client)}</p>
                </div>
                <h2 className="text-2xl font-bold text-[#0A1931] mb-4 leading-tight">{t(`portfolio.cases.${study.id}.title`, study.title)}</h2>
                <p className="text-gray-600 mb-6 line-clamp-3">{t(`portfolio.cases.${study.id}.desc`, study.description)}</p>
                <Link
                  to={`/portfolio/${study.slug}`}
                  className="text-[#0A1931] font-bold flex items-center gap-2 group/btn hover:text-[#D4AF37] transition-colors"
                >
                  {t('portfolio.page.cta')}
                  <span className="transform group-hover/btn:translate-x-1 transition-transform">→</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PortfolioPage;
