import React from 'react';
import { Helmet } from 'react-helmet-async';
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
  return (
    <div className="bg-white py-20">
      <Helmet>
        <title>Contactez un Expert | BOSS SYSTEMS AI</title>
        <meta name="description" content="Prenez rendez-vous pour un audit gratuit ou envoyez-nous un message. Nous répondons sous 24h." />
      </Helmet>
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-[#0A1931]">Contactez un expert</h1>
          <p className="text-lg text-gray-600 mt-4 max-w-2xl mx-auto">
            Que ce soit pour un audit gratuit, une question sur nos services ou un projet spécifique, nous sommes à votre écoute.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div>
            <h2 className="text-2xl font-bold text-[#0A1931] mb-4">Option 1: Prise de RDV Instantanée</h2>
            <CalendlyEmbed />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-[#0A1931] mb-4">Option 2: Formulaire de Contact Détaillé</h2>
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
