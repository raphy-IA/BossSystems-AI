
import React, { useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { BLOG_POSTS } from '../constants';

const BlogPostDetailPage: React.FC = () => {
    const { slug } = useParams<{ slug: string }>();
    const post = BLOG_POSTS.find(p => p.slug === slug);

    // Scroll to top on mount
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [slug]);

    if (!post) {
        return <Navigate to="/blog" replace />;
    }

    return (
        <div className="bg-white min-h-screen pb-20">
            <Helmet>
                <title>{post.title} | Blog | BOSS SYSTEMS AI</title>
                <meta name="description" content={post.excerpt} />
            </Helmet>

            {/* Hero Header */}
            <section className="bg-[#0A1931] text-white pt-24 pb-20">
                <div className="container mx-auto px-6">
                    <Link to="/blog" className="text-[#D4AF37] hover:underline mb-8 inline-block font-semibold">
                        &larr; Retour aux ressources
                    </Link>
                    <div className="max-w-5xl">
                        <div className="flex items-center space-x-4 mb-6">
                            <span className="px-3 py-1 bg-[#D4AF37] text-[#0A1931] text-sm font-bold rounded-full uppercase">
                                {post.category || "Article"}
                            </span>
                            <span className="text-gray-400 text-sm">{post.date}</span>
                        </div>
                        <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
                            {post.title}
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-300 leading-relaxed font-light">
                            {post.excerpt}
                        </p>
                    </div>
                </div>
            </section>

            {/* Article Content */}
            <article className="container mx-auto px-6 -mt-16 relative z-10">
                <div className="max-w-5xl mx-auto">
                    {/* Main Image */}
                    <div className="rounded-2xl overflow-hidden shadow-2xl mb-12 border-8 border-white">
                        <img src={post.imageUrl} alt={post.title} className="w-full h-auto object-cover max-h-[500px]" />
                    </div>

                    {/* Text Content */}
                    <div className="bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-gray-100 prose prose-lg prose-slate max-w-none">
                        {post.content.split('\n\n').filter(p => p.trim() !== '').map((block, idx) => {
                            const lines = block.split('\n').map(l => l.trim()).filter(l => l !== '');
                            if (lines.length === 0) return null;

                            return (
                                <div key={idx} className="mb-10">
                                    {lines.map((line, lIdx) => {
                                        // Headings
                                        if (line.startsWith('## ')) {
                                            return <h2 key={lIdx} className="text-3xl font-bold text-[#0A1931] mt-12 mb-6 border-b pb-4 border-gray-100">{line.replace('## ', '')}</h2>;
                                        }
                                        if (line.startsWith('### ')) {
                                            return <h3 key={lIdx} className="text-2xl font-bold text-[#0A1931] mt-10 mb-6">{line.replace('### ', '')}</h3>;
                                        }

                                        // Lists
                                        if (line.startsWith('* ')) {
                                            return (
                                                <ul key={lIdx} className="list-disc pl-6 space-y-3 mb-6 text-gray-700">
                                                    <li className="pl-2 leading-relaxed">
                                                        {line.replace('* ', '').trim().split('**').map((part, i) => i % 2 === 1 ? <strong key={i} className="text-[#0A1931] font-bold">{part}</strong> : part)}
                                                    </li>
                                                </ul>
                                            );
                                        }

                                        // Normal paragraphs
                                        return (
                                            <p key={lIdx} className="text-gray-700 leading-relaxed mb-6 text-lg font-light">
                                                {line.split('**').map((part, i) => i % 2 === 1 ? <strong key={i} className="text-[#0A1931] font-bold">{part}</strong> : part)}
                                            </p>
                                        );
                                    })}
                                </div>
                            );
                        })}
                    </div>

                    {/* Social Share / CTA */}
                    <div className="mt-16 p-8 bg-[#F8FAFC] rounded-2xl border border-gray-200 flex flex-col md:flex-row items-center justify-between gap-6">
                        <div>
                            <h4 className="text-xl font-bold text-[#0A1931]">Cet article vous a été utile ?</h4>
                            <p className="text-gray-600">Partagez vos ambitions avec nous pour une analyse personnalisée.</p>
                        </div>
                        <Link to="/contact" className="bg-[#D4AF37] text-[#0A1931] font-bold py-3 px-8 rounded-full hover:bg-opacity-90 transition-all transform hover:scale-105 whitespace-nowrap">
                            Parler à un expert
                        </Link>
                    </div>
                </div>
            </article>

            {/* More Articles Section */}
            <section className="container mx-auto px-6 py-20 border-t border-gray-100 mt-20">
                <h2 className="text-3xl font-bold text-[#0A1931] mb-12 text-center">Autres lectures suggérées</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {BLOG_POSTS.filter(p => p.id !== post.id).slice(0, 3).map(otherPost => (
                        <Link to={`/blog/${otherPost.slug}`} key={otherPost.id} className="group flex flex-col bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                            <div className="h-40 overflow-hidden rounded-t-xl">
                                <img src={otherPost.imageUrl} alt={otherPost.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                            </div>
                            <div className="p-6">
                                <p className="text-xs text-[#D4AF37] font-bold uppercase mb-2">{otherPost.category}</p>
                                <h3 className="text-lg font-bold text-[#0A1931] group-hover:text-[#D4AF37] transition-colors line-clamp-2">{otherPost.title}</h3>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default BlogPostDetailPage;
