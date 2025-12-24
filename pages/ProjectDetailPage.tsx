
import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { CASE_STUDIES } from '../constants';

const ProjectDetailPage: React.FC = () => {
    const { slug } = useParams<{ slug: string }>();
    const navigate = useNavigate();
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

    return (
        <div className="bg-white">
            <Helmet>
                <title>{project.title} | Réalisations | BOSS SYSTEMS AI</title>
                <meta name="description" content={project.description} />
            </Helmet>

            {/* Hero Section */}
            <div className="relative bg-[#0A1931] text-white pt-24 pb-24 overflow-hidden">
                <div className="absolute inset-0 opacity-20">
                    <img src={project.imageUrl} alt="" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-[#0A1931] mix-blend-multiply" />
                </div>
                <div className="container mx-auto px-6 relative z-10">
                    <Link to="/portfolio" className="text-[#D4AF37] hover:underline mb-6 inline-block text-sm font-bold uppercase tracking-widest">
                        ← Retour aux réalisations
                    </Link>
                    <div className="flex items-center gap-2 mb-4">
                        <span className="w-12 h-[2px] bg-[#D4AF37]" />
                        <p className="text-sm text-[#D4AF37] font-bold uppercase tracking-wider">{project.client}</p>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold leading-tight max-w-4xl">{project.title}</h1>
                </div>
            </div>

            <div className="container mx-auto px-6 py-20">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-12">
                        <section>
                            <h2 className="text-3xl font-bold text-[#0A1931] mb-6">Vue d'ensemble</h2>
                            <p className="text-xl text-gray-700 leading-relaxed">
                                {project.overview}
                            </p>
                        </section>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                            <section className="bg-gray-50 p-8 rounded-2xl border-l-4 border-red-400">
                                <h3 className="text-2xl font-bold text-[#0A1931] mb-4">Les Défis</h3>
                                <ul className="space-y-4">
                                    {project.challenges?.map((challenge, idx) => (
                                        <li key={idx} className="flex items-start text-gray-700">
                                            <span className="text-red-400 mr-3 text-xl">•</span>
                                            {challenge}
                                        </li>
                                    ))}
                                </ul>
                            </section>

                            <section className="bg-gray-50 p-8 rounded-2xl border-l-4 border-green-400">
                                <h3 className="text-2xl font-bold text-[#0A1931] mb-4">La Solution</h3>
                                <ul className="space-y-4">
                                    {project.solutions?.map((solution, idx) => (
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
                                Impact & Résultats
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
                                {project.results?.map((result, idx) => (
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
                                <img src={project.imageUrl} alt={project.title} className="w-full h-64 object-cover" />
                            </div>

                            <div className="bg-gray-50 p-8 rounded-2xl shadow-inner text-center">
                                <h3 className="text-2xl font-bold text-[#0A1931] mb-4">Un projet similaire ?</h3>
                                <p className="text-gray-600 mb-8 leading-relaxed">
                                    Confiez-nous vos enjeux technologiques et transformons-les en opportunités de croissance.
                                </p>
                                <Link to="/contact" className="w-full inline-block bg-[#D4AF37] text-[#0A1931] font-bold py-4 px-8 rounded-full hover:bg-opacity-90 transition-all duration-300 transform hover:scale-105 shadow-md">
                                    Discuter avec nous
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
