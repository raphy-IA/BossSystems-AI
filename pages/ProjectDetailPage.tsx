import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { CASE_STUDIES } from '../constants';
import { useTranslation } from 'react-i18next';

const ProjectDetailPage: React.FC = () => {
    const { slug } = useParams<{ slug: string }>();
    const navigate = useNavigate();
    const { t } = useTranslation();
    const project = CASE_STUDIES.find(p => p.slug === slug);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [slug]);

    if (!project) {
        useEffect(() => {
            navigate('/portfolio');
        }, [navigate]);
        return null;
    }

    const challenges = t(`portfolio.cases.${project.id}.challenges`, { returnObjects: true }) as string[];
    const solutions = t(`portfolio.cases.${project.id}.solutions`, { returnObjects: true }) as string[];
    const results = t(`portfolio.cases.${project.id}.results`, { returnObjects: true }) as string[];

    // Fallback if translation returns string (missing key) or empty
    const displayChallenges = Array.isArray(challenges) ? challenges : project.challenges || [];
    const displaySolutions = Array.isArray(solutions) ? solutions : project.solutions || [];
    const displayResults = Array.isArray(results) ? results : project.results || [];

    return (
        <div className="bg-white">
            <Helmet>
                <title>{t(`portfolio.cases.${project.id}.title`, project.title)} | {t('portfolio.page.title')} | BOSS SYSTEMS AI</title>
                <meta name="description" content={t(`portfolio.cases.${project.id}.desc`, project.description)} />
            </Helmet>

            {/* Hero Section */}
            <div className="relative bg-[#0A1931] text-white pt-24 pb-24 overflow-hidden">
                <div className="absolute inset-0 opacity-20">
                    <img src={project.imageUrl} alt="" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-[#0A1931] mix-blend-multiply" />
                </div>
                <div className="container mx-auto px-6 relative z-10">
                    <Link to="/portfolio" className="text-[#D4AF37] hover:underline mb-6 inline-block text-sm font-bold uppercase tracking-widest">
                        ← {t('portfolio.page.title')} {/* "Retour aux réalisations" can be approximated or added to keys if needed, but reusing page title works loosely or I can add a specific key */}
                    </Link>
                    <div className="flex items-center gap-2 mb-4">
                        <span className="w-12 h-[2px] bg-[#D4AF37]" />
                        <p className="text-sm text-[#D4AF37] font-bold uppercase tracking-wider">{t(`portfolio.cases.${project.id}.client`, project.client)}</p>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold leading-tight max-w-4xl">{t(`portfolio.cases.${project.id}.title`, project.title)}</h1>
                </div>
            </div>

            <div className="container mx-auto px-6 py-20">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-12">
                        <section>
                            <h2 className="text-3xl font-bold text-[#0A1931] mb-6">{t('portfolio.desc_title', "Vue d'ensemble")}</h2>
                            <p className="text-xl text-gray-700 leading-relaxed">
                                {t(`portfolio.cases.${project.id}.overview`, project.overview)}
                            </p>
                        </section>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                            <section className="bg-gray-50 p-8 rounded-2xl border-l-4 border-red-400">
                                <h3 className="text-2xl font-bold text-[#0A1931] mb-4">{t('portfolio.challenges_title', 'Les Défis')}</h3>
                                <ul className="space-y-4">
                                    {displayChallenges.map((challenge, idx) => (
                                        <li key={idx} className="flex items-start text-gray-700">
                                            <span className="text-red-400 mr-3 text-xl">•</span>
                                            {challenge}
                                        </li>
                                    ))}
                                </ul>
                            </section>

                            <section className="bg-gray-50 p-8 rounded-2xl border-l-4 border-green-400">
                                <h3 className="text-2xl font-bold text-[#0A1931] mb-4">{t('portfolio.solutions_title', 'La Solution')}</h3>
                                <ul className="space-y-4">
                                    {displaySolutions.map((solution, idx) => (
                                        <li key={idx} className="flex items-start text-gray-700">
                                            <span className="text-green-400 mr-3 text-xl">✓</span>
                                            {solution}
                                        </li>
                                    ))}
                                </ul>
                            </section>
                        </div>

                        <section className="bg-[#0A1931] text-white p-10 rounded-3xl shadow-xl">
                            <h3 className="text-2xl font-bold mb-6 flex items-center gap-3 text-[#D4AF37]">
                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                {t('portfolio.results_title', 'Impact & Résultats')}
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
                                {displayResults.map((result, idx) => (
                                    <div key={idx} className="flex items-center bg-white/10 p-4 rounded-xl">
                                        <span className="text-2xl font-bold text-[#D4AF37] mr-4">#0{idx + 1}</span>
                                        <p className="text-lg font-medium">{result}</p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>

                    {/* Sidebar */}
                    <aside className="lg:col-span-1">
                        <div className="sticky top-28 space-y-8">
                            <div className="rounded-2xl overflow-hidden shadow-lg">
                                <img src={project.imageUrl} alt={t(`portfolio.cases.${project.id}.title`, project.title)} className="w-full h-64 object-cover" />
                            </div>

                            <div className="bg-gray-50 p-8 rounded-2xl shadow-inner text-center">
                                <h3 className="text-2xl font-bold text-[#0A1931] mb-4">{t('portfolio.cta_title', 'Un projet similaire ?')}</h3>
                                <p className="text-gray-600 mb-8 leading-relaxed">
                                    {t('portfolio.cta_desc', 'Confiez-nous vos enjeux technologiques et transformons-les en opportunités de croissance.')}
                                </p>
                                <Link to="/contact" className="w-full inline-block bg-[#D4AF37] text-[#0A1931] font-bold py-4 px-8 rounded-full hover:bg-opacity-90 transition-all duration-300 transform hover:scale-105 shadow-md">
                                    {t('portfolio.cta_button', 'Discuter avec nous')}
                                </Link>
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    );
};

export default ProjectDetailPage;
