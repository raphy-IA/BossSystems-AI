import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { SERVICES } from '../constants';

const ServiceDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { t } = useTranslation();
  // We still use find to validate the slug exists, but we fetch content from i18n
  const service = SERVICES.find(s => s.slug === slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!service) {
    useEffect(() => {
      navigate('/services');
    }, [navigate]);
    return null;
  }

  // Helper to ensure features is treated as array
  const features = t(`services.items.${slug}.prestations`, { returnObjects: true });
  const featureList = Array.isArray(features) ? features : service.prestations;

  return (
    <div className="bg-white">
      <Helmet>
        <title>{t(`services.items.${slug}.title`, service.title)} | BOSS SYSTEMS AI</title>
        <meta name="description" content={t(`services.items.${slug}.description`, service.description)} />
      </Helmet>
      <div className="bg-[#0A1931] text-white py-16">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold">{t(`services.items.${slug}.title`, service.title)}</h1>
        </div>
      </div>

      <div className="container mx-auto px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <div className="prose max-w-none text-lg text-gray-700">
              <p className="lead text-xl mb-6">{t(`services.items.${slug}.description`, service.description)}</p>

              <h3 className="text-2xl font-bold text-[#0A1931] mt-12 mb-4">{t('services.page.detail.keyFeatures', 'Nos prestations clés :')}</h3>
              <ul className="space-y-3">
                {featureList.map((prestation: string, index: number) => (
                  <li key={index} className="flex items-start">
                    <svg className="w-6 h-6 mr-3 text-[#D4AF37] flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                    <span>{prestation}</span>
                  </li>
                ))}
              </ul>

              <h3 className="text-2xl font-bold text-[#0A1931] mt-12 mb-4">{t('services.page.detail.targetAudienceTitle', 'Pour qui ?')}</h3>
              <p>{t('services.page.detail.targetAudienceText', "Ce service s'adresse aux dirigeants de TPE/PME et aux responsables métiers (Finance, RH, Vente) qui cherchent à digitaliser et optimiser leurs opérations, ainsi qu'aux DSI de PME/Grandes Entreprises en quête d'une expertise externe pour leurs projets d'audit, d'IA ou de gouvernance.")}</p>
            </div>
          </div>
          <aside className="lg:col-span-1">
            <div className="sticky top-28 bg-gray-50 p-8 rounded-lg shadow-md">
              <h3 className="text-2xl font-bold text-[#0A1931] mb-4">
                {t('services.page.detail.ctaTitle', { service: t(`services.items.${slug}.title`, service.title) })}
              </h3>
              <p className="text-gray-600 mb-6">{t('services.page.detail.ctaDesc', 'Discutons de vos besoins spécifiques. Obtenez un devis personnalisé.')}</p>
              <Link to="/contact" className="w-full text-center block bg-[#D4AF37] text-[#0A1931] font-bold py-3 px-8 rounded-full hover:bg-opacity-90 transition-all duration-300 transform hover:scale-105">
                {t('services.page.detail.ctaButton', 'Obtenir un devis')}
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetailPage;
