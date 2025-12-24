import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { BLOG_POSTS } from '../constants';

const BlogPage: React.FC = () => {
  return (
    <div className="bg-gray-50">
      <Helmet>
        <title>Blog & Ressources | BOSS SYSTEMS AI</title>
        <meta name="description" content="Actualités, conseils et articles de fond sur l'Intelligence Artificielle, l'automatisation et la transformation digitale." />
      </Helmet>
      <div className="container mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-[#0A1931]">Ressources & Blog</h1>
          <p className="text-lg text-gray-600 mt-4 max-w-2xl mx-auto">
            Nos analyses, conseils et retours d'expérience sur l'IT, l'IA et la transformation digitale.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {BLOG_POSTS.map((post) => (
            <div key={post.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden group flex flex-col hover:shadow-xl transition-all duration-300">
              <div className="relative h-56 overflow-hidden">
                <img src={post.imageUrl} alt={post.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-[#0A1931]/80 backdrop-blur-sm text-[#D4AF37] text-xs font-bold rounded-full uppercase border border-[#D4AF37]/30">
                    {post.category}
                  </span>
                </div>
              </div>
              <div className="p-8 flex flex-col flex-grow">
                <p className="text-sm text-gray-400 mb-3">{post.date}</p>
                <h2 className="text-2xl font-bold text-[#0A1931] mb-4 group-hover:text-[#D4AF37] transition-colors leading-tight">{post.title}</h2>
                <p className="text-gray-600 mb-6 line-clamp-3 leading-relaxed">{post.excerpt}</p>
                <Link to={`/blog/${post.slug}`} className="text-[#D4AF37] font-bold hover:gap-3 transition-all mt-auto flex items-center gap-2">
                  Lire la suite <span>&rarr;</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
