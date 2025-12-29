import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const AboutPage: React.FC = () => {
    const { t } = useTranslation();

    return (
        <div className="bg-white">
            <Helmet>
                <title>{t('about.hero.title')} | BOSS SYSTEMS AI</title>
                <meta name="description" content={t('about.hero.subtitle')} />
            </Helmet>

            {/* Hero Section */}
            <section className="bg-[#0A1931] text-white py-24 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-1/3 h-full bg-[#D4AF37]/10 -skew-x-12 translate-x-1/2" />
                <div className="container mx-auto px-6 text-center relative z-10">
                    <h1 className="text-4xl md:text-6xl font-bold mb-6">{t('about.hero.title')}</h1>
                    <p className="text-xl md:text-2xl text-[#D4AF37] max-w-3xl mx-auto">{t('about.hero.subtitle')}</p>
                </div>
            </section>

            {/* Vision / Axiome Section */}
            <section className="py-20 container mx-auto px-6">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl font-bold text-[#0A1931] mb-8">{t('about.story.title')}</h2>
                    <div className="prose max-w-none text-lg text-gray-700 leading-relaxed">
                        <p className="whitespace-pre-line">{t('about.story.content')}</p>
                    </div>
                </div>
            </section>

            {/* Dual Pole Section (Gold vs Navy) */}
            <section className="py-24 bg-gray-50">
                <div className="container mx-auto px-6">
                    <h2 className="text-3xl font-bold text-[#0A1931] text-center mb-16">{t('about.poles.title')}</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
                        {/* Pole Gold */}
                        <div className="bg-white p-10 rounded-2xl shadow-lg border border-[#D4AF37]/20 relative overflow-hidden group hover:-translate-y-2 transition-transform duration-300">
                            <div className="absolute top-0 left-0 w-full h-2 bg-[#D4AF37]" />
                            <div className="mb-6">
                                <span className="inline-block px-4 py-1 bg-[#D4AF37]/10 text-[#D4AF37] rounded-full text-sm font-bold uppercase tracking-wider mb-4">Architecture</span>
                                <h3 className="text-2xl font-bold text-[#0A1931]">{t('about.poles.gold.title')}</h3>
                            </div>
                            <p className="text-gray-600 mb-6">{t('about.poles.gold.desc')}</p>
                            <ul className="space-y-2">
                                <li className="flex items-center text-[#0A1931] font-medium">
                                    <span className="w-2 h-2 bg-[#D4AF37] rounded-full mr-3" />
                                    Stratégie de Domination
                                </li>
                                {/* Translation keys for list items would be ideal, but using generic descriptors for now or t keys if available in deeper structure */}
                            </ul>
                        </div>

                        {/* Pole Navy */}
                        <div className="bg-[#0A1931] p-10 rounded-2xl shadow-lg border border-gray-700 relative overflow-hidden group hover:-translate-y-2 transition-transform duration-300 text-white">
                            <div className="absolute top-0 left-0 w-full h-2 bg-blue-500" />
                            <div className="mb-6">
                                <span className="inline-block px-4 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm font-bold uppercase tracking-wider mb-4">Opérations</span>
                                <h3 className="text-2xl font-bold text-white">{t('about.poles.navy.title')}</h3>
                            </div>
                            <p className="text-gray-300 mb-6">{t('about.poles.navy.desc')}</p>
                            <ul className="space-y-2">
                                <li className="flex items-center text-white font-medium">
                                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-3" />
                                    Cyberguerre & Défense
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Agnostic Values Section */}
            <section className="py-24 container mx-auto px-6">
                <h2 className="text-3xl font-bold text-[#0A1931] text-center mb-16">{t('about.values.title')}</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {/* We assume keys like about.values.agnostic, about.values.liberty, about.values.ascension exist or map 3 basics */}

                    <div className="text-center p-6">
                        <div className="w-16 h-16 bg-[#0A1931] text-white rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold">1</div>
                        <h3 className="text-xl font-bold text-[#0A1931] mb-4">Inviolabilité</h3>
                        <p className="text-gray-600">Protection absolue des actifs et des données.</p>
                    </div>
                    <div className="text-center p-6">
                        <div className="w-16 h-16 bg-[#0A1931] text-white rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold">2</div>
                        <h3 className="text-xl font-bold text-[#0A1931] mb-4">Liberté de Flux</h3>
                        <p className="text-gray-600">Circulation sans friction de la valeur et de l'information.</p>
                    </div>
                    <div className="text-center p-6">
                        <div className="w-16 h-16 bg-[#0A1931] text-white rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold">3</div>
                        <h3 className="text-xl font-bold text-[#0A1931] mb-4">Ascension</h3>
                        <p className="text-gray-600">Croissance illimitée par l'effet de levier technologique.</p>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-[#0A1931] text-white text-center">
                <div className="container mx-auto px-6">
                    <h2 className="text-3xl font-bold mb-6">{t('about.cta.title', 'Prêt à bâtir votre Empire ?')}</h2>
                    <Link to="/contact" className="inline-block bg-[#D4AF37] text-[#0A1931] font-bold py-4 px-10 rounded-full hover:bg-opacity-90 transition-all duration-300 transform hover:scale-105 shadow-2xl">
                        {t('about.cta.button', 'Activer mon Audit Flash')}
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default AboutPage;
