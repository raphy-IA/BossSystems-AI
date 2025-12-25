import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';
import { InlineWidget } from 'react-calendly';
import ContactForm from '../components/ContactForm';

const CALENDLY_URL = import.meta.env.VITE_CALENDLY_URL || "https://calendly.com/contact-bosssystemsai/30min";

const CalendlyEmbed: React.FC = () => {
  // In a real app, you would use a library like 'react-calendly'
  // This is a placeholder to represent the integration.
  return (
    <div className="overflow-hidden rounded-lg shadow-sm border border-gray-100">
      <InlineWidget
        url={CALENDLY_URL}
        styles={{
          height: '650px',
          width: '100%'
        }}
      />
    </div>
  );
};

const ContactPage: React.FC = () => {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const isOrderMode = !!searchParams.get('pack');

  return (
    <div className="bg-white py-20">
      <Helmet>
        <title>{t('common.nav.contact')} | BOSS SYSTEMS AI</title>
        <meta name="description" content={t('contact.page.subtitle')} />
      </Helmet>
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-[#0A1931]">
            {isOrderMode ? t('contact.page.orderTitle') : t('contact.page.title')}
          </h1>
          <p className="text-lg text-gray-600 mt-4 max-w-2xl mx-auto">
            {isOrderMode ? t('contact.page.orderSubtitle') : t('contact.page.subtitle')}
          </p>
        </div>

        <div className={`grid grid-cols-1 ${isOrderMode ? 'lg:grid-cols-1 max-w-2xl mx-auto' : 'lg:grid-cols-2'} gap-12 items-start`}>
          {!isOrderMode && (
            <div>
              <h2 className="text-2xl font-bold text-[#0A1931] mb-4">{t('contact.page.option1')}</h2>
              <CalendlyEmbed />
            </div>
          )}
          <div>
            <h2 className="text-2xl font-bold text-[#0A1931] mb-4">{isOrderMode ? t('contact.form.submit') : t('contact.page.option2')}</h2>
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
