
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { SERVICES, PACKAGES, SOCIAL_PROOF_STATS } from '../constants';
import ContactForm from '../components/ContactForm';

const HERO_SLIDES = [
  {
    image: '/assets/hero-ai.jpg',
    title: 'Débridez votre potentiel numérique !',
    subtitle: 'L’IT innovante et l’Intelligence Artificielle au service de la performance de votre entreprise.',
    ctaPrimary: 'Demandez votre Audit Gratuit',
    ctaSecondary: 'Voir nos services',
  },
  {
    image: '/assets/hero-growth.jpg',
    title: "L'IA au Service de votre Croissance",
    subtitle: 'Déployez des solutions d’automatisation et de Data Intelligence pour scaler votre activité.',
    ctaPrimary: 'Découvrir nos solutions',
    ctaSecondary: 'Nos Réalisations',
  },
  {
    image: '/assets/hero-cyber.jpg',
    title: 'Sécurisez & Automatisez votre Succès',
    subtitle: 'Audit Cyber de haut niveau et CRM métiers propriétaires adaptés à vos besoins.',
    ctaPrimary: 'Contacter un Expert',
    ctaSecondary: 'Offres Packagées',
  }
];

const HeroSection: React.FC = () => {
  const { t } = useTranslation();
  const [currentSlide, setCurrentSlide] = useState(0);

  // We only translate the first slide for now as per key structure, 
  // or we can make the hook dynamic if we had keys for all slides.
  // For this MVF (Minimum Variable Feature), let's ensure the main visible texts are translated.
  // Ideally, HERO_SLIDES should be inside the component or we use a specialized hook to get array data.
  // Given the limited context, I will update the first slide content dynamically within the map if index === 0, 
  // or better, I will refactor HERO_SLIDES to be derived from translation if possible, 
  // BUT `t` returns strings, and we have an array of objects. 

  // Alternative: Replace the static HERO_SLIDES with a memoized version using `t`.

  const heroSlides = [
    {
      image: '/assets/hero-ai.jpg',
      title: t('home.hero.title'),
      subtitle: t('home.hero.subtitle'),
      ctaPrimary: t('home.hero.ctaStart'),
      ctaSecondary: t('home.hero.ctaPortfolio'),
    },
    {
      image: '/assets/hero-growth.jpg',
      title: t('home.hero2.title', "L'IA au Service de votre Croissance"),
      subtitle: t('home.hero2.subtitle', 'Déployez des solutions d’automatisation et de Data Intelligence pour scaler votre activité.'),
      ctaPrimary: t('home.hero2.ctaStart', 'Découvrir nos solutions'),
      ctaSecondary: t('home.hero2.ctaPortfolio', 'Nos Réalisations'),
    },
    {
      image: '/assets/hero-cyber.jpg',
      title: t('home.hero3.title', 'Sécurisez & Automatisez votre Succès'),
      subtitle: t('home.hero3.subtitle', 'Audit Cyber de haut niveau et CRM métiers propriétaires adaptés à vos besoins.'),
      ctaPrimary: t('home.hero3.ctaStart', 'Contacter un Expert'),
      ctaSecondary: t('home.hero3.ctaPortfolio', 'Offres Packagées'),
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative h-[650px] md:h-[750px] flex items-center justify-center overflow-hidden bg-[#0A1931]">
      {heroSlides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}
        >
          {/* Background Image with Overlay */}
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105 transition-transform duration-[6000ms] ease-linear"
            style={{
              backgroundImage: `url(${slide.image})`,
              transform: index === currentSlide ? 'scale(1.1)' : 'scale(1)',
            }}
          />
          <div className="absolute inset-0 bg-[#0A1931]/75 backdrop-blur-[1px]" />

          {/* Content */}
          <div className="container mx-auto px-6 relative z-10 h-full flex flex-col items-center justify-center text-center">
            <div className={`transform transition-all duration-700 delay-500 ${index === currentSlide ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <span className="inline-block px-4 py-1 bg-[#D4AF37]/20 border border-[#D4AF37]/30 text-[#D4AF37] rounded-full text-sm font-bold uppercase tracking-widest mb-6">
                BOSS SYSTEMS AI • Excellence & Innovation
              </span>
              <h1 className="text-4xl md:text-7xl font-bold leading-tight mb-6 text-white max-w-5xl mx-auto">
                {slide.title}
              </h1>
              <p className="text-lg md:text-2xl text-gray-300 mb-10 max-w-3xl mx-auto leading-relaxed">
                {slide.subtitle}
              </p>
              <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                <Link to="/contact" className="w-full sm:w-auto bg-[#D4AF37] text-[#0A1931] font-bold py-4 px-10 rounded-full hover:bg-opacity-90 transition-all duration-300 transform hover:scale-105 shadow-2xl">
                  {slide.ctaPrimary}
                </Link>
                <Link to={index === 1 ? "/portfolio" : index === 2 ? "/packages" : "/services"} className="w-full sm:w-auto border-2 border-white/30 text-white font-bold py-4 px-10 rounded-full hover:bg-white hover:text-[#0A1931] transition-all duration-300 transform hover:scale-105 backdrop-blur-sm">
                  {slide.ctaSecondary}
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Slide Indicators */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex space-x-3">
        {HERO_SLIDES.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-12 h-1 rounded-full transition-all duration-300 ${index === currentSlide ? 'bg-[#D4AF37]' : 'bg-white/20'}`}
          />
        ))}
      </div>
    </section>
  );
};

const IntroSection: React.FC = () => {
  const { t } = useTranslation();
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gray-50 -skew-x-12 translate-x-1/2" />
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-[#0A1931] mb-6 tracking-tight">{t('home.intro.title')}</h2>
          <div className="w-24 h-1 bg-[#D4AF37] mx-auto mb-8" />
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {t('home.intro.description')}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100 hover:border-[#D4AF37]/30 transition-all group">
            <div className="w-14 h-14 bg-[#0A1931] text-[#D4AF37] rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
            </div>
            <h3 className="text-2xl font-bold text-[#0A1931] mb-4">{t('home.intro.audit.title')}</h3>
            <p className="text-gray-600 leading-relaxed text-lg">{t('home.intro.audit.desc')}</p>
          </div>
          <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100 hover:border-[#D4AF37]/30 transition-all group">
            <div className="w-14 h-14 bg-[#0A1931] text-[#D4AF37] rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" /></svg>
            </div>
            <h3 className="text-2xl font-bold text-[#0A1931] mb-4">{t('home.intro.custom.title')}</h3>
            <p className="text-gray-600 leading-relaxed text-lg">{t('home.intro.custom.desc')}</p>
          </div>
          <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100 hover:border-[#D4AF37]/30 transition-all group">
            <div className="w-14 h-14 bg-[#0A1931] text-[#D4AF37] rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
            </div>
            <h3 className="text-2xl font-bold text-[#0A1931] mb-4">{t('home.intro.partner.title')}</h3>
            <p className="text-gray-600 leading-relaxed text-lg">{t('home.intro.partner.desc')}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

const ServicesSection: React.FC = () => {
  const { t } = useTranslation();
  return (
    <section className="py-24 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-6">
          <div className="text-left">
            <h2 className="text-3xl md:text-5xl font-bold text-[#0A1931] mb-4 tracking-tight">{t('home.services.title')}</h2>
            <p className="text-xl text-gray-600 max-w-2xl">{t('home.services.subtitle')}</p>
          </div>
          <Link to="/services" className="text-[#D4AF37] font-bold text-lg hover:underline flex items-center gap-2">
            {t('home.services.cta')} &rarr;
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES.map(service => (
            <Link to={`/services/${service.slug}`} key={service.slug} className="group bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
              <div className="w-20 h-20 bg-gray-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[#0A1931] transition-colors overflow-hidden">
                <service.icon className="w-12 h-12 text-[#0A1931] group-hover:text-[#D4AF37] transition-colors" />
              </div>
              <h3 className="text-2xl font-bold text-[#0A1931] mb-4 leading-tight group-hover:text-[#D4AF37] transition-colors">{service.title}</h3>
              <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors">
                {service.tagline}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

const PackagesSection: React.FC = () => {
  const { t } = useTranslation();
  return (
    <section className="py-24 bg-[#0A1931] text-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-[#D4AF37]/5 -skew-x-12 translate-x-1/2" />
      <div className="container mx-auto px-6 text-center relative z-10">
        <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">{t('home.packages.title')}</h2>
        <p className="text-xl text-gray-400 mb-16 max-w-2xl mx-auto">{t('home.packages.subtitle')}</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {PACKAGES.map(pkg => (
            <div key={pkg.name} className="bg-white/5 p-10 rounded-3xl border border-white/10 flex flex-col hover:border-[#D4AF37]/50 transition-colors group">
              <h3 className="text-2xl font-bold text-[#D4AF37] mb-6">{pkg.name}</h3>
              <ul className="text-left space-y-4 text-gray-300 flex-grow mb-10">
                {pkg.features.map(feature => (
                  <li key={feature} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-[#D4AF37]/20 flex items-center justify-center mt-1 shrink-0">
                      <svg className="w-3 h-3 text-[#D4AF37]" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                    </div>
                    <span className="text-lg">{feature}</span>
                  </li>
                ))}
              </ul>
              <Link to="/contact" className="mt-auto bg-[#D4AF37] text-[#0A1931] font-bold py-4 px-8 rounded-full hover:bg-opacity-90 transition-all duration-300">
                {t('home.packages.cta')}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};


const SocialProofSection: React.FC = () => {
  const { t } = useTranslation();
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-5xl font-bold text-[#0A1931] mb-16 tracking-tight">{t('home.stats.title')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl mx-auto">
          {SOCIAL_PROOF_STATS.map(stat => (
            <div key={stat.label} className="p-10 bg-gray-50 rounded-3xl border border-gray-100 hover:shadow-lg transition-all transform hover:-translate-y-1">
              <p className="text-5xl md:text-6xl font-black text-[#D4AF37] mb-4 tracking-tighter">{stat.value}</p>
              <p className="text-xl font-bold text-[#0A1931]">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const FinalCTASection: React.FC = () => {
  const { t } = useTranslation();
  return (
    <section className="py-24 bg-gray-50 relative">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-[#0A1931] mb-6 tracking-tight">{t('home.cta.title')}</h2>
          <p className="text-xl text-gray-600 leading-relaxed">
            {t('home.cta.description')}
          </p>
        </div>
        <div className="max-w-4xl mx-auto">
          <ContactForm />
        </div>
      </div>
    </section>
  );
};


const HomePage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Agence IA & IT Innovante | BOSS SYSTEMS AI</title>
        <meta name="description" content="Débridez votre potentiel numérique avec BOSS SYSTEMS AI. Experts en Intelligence Artificielle et solutions IT pour transformer votre entreprise." />
      </Helmet>
      <HeroSection />
      <IntroSection />
      <ServicesSection />
      <PackagesSection />
      <SocialProofSection />
      <FinalCTASection />
    </>
  );
};

export default HomePage;
