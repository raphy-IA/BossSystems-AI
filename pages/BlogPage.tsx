import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { BLOG_POSTS } from '../constants';

const BlogPage: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div className="bg-gray-50">
      <Helmet>
        <title>{t('common.nav.blog')} | BOSS SYSTEMS AI</title>
        <meta name="description" content={t('blog.page.subtitle')} />
      </Helmet>
      <div className="container mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-[#0A1931]">{t('blog.page.title')}</h1>
          <p className="text-lg text-gray-600 mt-4 max-w-2xl mx-auto">
            {t('blog.page.subtitle')}
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
                <h2 className="text-2xl font-bold text-[#0A1931] mb-4 group-hover:text-[#D4AF37] transition-colors leading-tight">{t(`blog.posts.${post.id}.title`, post.title)}</h2>
                <p className="text-gray-600 mb-6 line-clamp-3 leading-relaxed">{t(`blog.posts.${post.id}.excerpt`, post.excerpt)}</p>
                <Link to={`/blog/${post.slug}`} className="text-[#D4AF37] font-bold hover:gap-3 transition-all mt-auto flex items-center gap-2">
                  {t('blog.page.readMore')} <span>&rarr;</span>
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
