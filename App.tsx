import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ServicesHubPage from './pages/ServicesHubPage';
import ServiceDetailPage from './pages/ServiceDetailPage';
import PackagesPage from './pages/PackagesPage';
import PortfolioPage from './pages/PortfolioPage';
import ProjectDetailPage from './pages/ProjectDetailPage';
import BlogPage from './pages/BlogPage';
import BlogPostDetailPage from './pages/BlogPostDetailPage';
import ContactPage from './pages/ContactPage';
import ScrollToTop from './components/ScrollToTop';

const ChatWidget: React.FC = () => (
  <button className="fixed bottom-5 right-5 bg-[#D4AF37] text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:bg-[#b89a30] transition-colors z-50">
    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
    </svg>
  </button>
);


export default function App() {
  return (
    <HelmetProvider>
      <Router>
        <ScrollToTop />
        <div className="bg-white text-[#212529]">
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/services" element={<ServicesHubPage />} />
              <Route path="/services/:slug" element={<ServiceDetailPage />} />
              <Route path="/packages" element={<PackagesPage />} />
              <Route path="/portfolio" element={<PortfolioPage />} />
              <Route path="/portfolio/:slug" element={<ProjectDetailPage />} />
              <Route path="/blog" element={<BlogPage />} />
              <Route path="/blog/:slug" element={<BlogPostDetailPage />} />
              <Route path="/contact" element={<ContactPage />} />
            </Routes>
          </main>
          <Footer />
          <ChatWidget />
        </div>
      </Router>
    </HelmetProvider>
  );
}
