
import React from 'react';
import { Link } from 'react-router-dom';
import { NAV_LINKS, SERVICES } from '../constants';
import Logo from './Logo';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-[#0A1931] text-white pt-20 pb-10 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[500px] h-[500px] bg-[#D4AF37]/5 rounded-full blur-[100px]" />
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[100px]" />

      <div className="container mx-auto px-6 relative z-10">

        {/* Top CTA Banner */}
        <div className="bg-gradient-to-r from-[#D4AF37] to-[#B89A30] rounded-3xl p-8 md:p-12 mb-20 shadow-2xl transform -translate-y-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-center md:text-left">
              <h2 className="text-2xl md:text-3xl font-bold text-[#0A1931] mb-2">Prêt à propulser votre entreprise vers l'avenir ?</h2>
              <p className="text-[#0A1931]/80 text-lg">Discutons de vos enjeux technologiques dès aujourd'hui.</p>
            </div>
            <Link
              to="/contact"
              className="bg-[#0A1931] text-white px-8 py-4 rounded-full font-bold hover:bg-opacity-90 transition-all transform hover:scale-105 shadow-xl whitespace-nowrap"
            >
              Réservez un expert &rarr;
            </Link>
          </div>
        </div>

        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

          {/* Column 1: Vision & Socials */}
          <div className="space-y-6">
            <Logo variant="footer" className="h-12" />
            <p className="text-gray-400 leading-relaxed">
              L'excellence technologique au service des ambitions de demain. Expertise en IA, Cybersécurité et Solutions Métiers pour PME innovantes.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#D4AF37] hover:text-[#0A1931] transition-all" aria-label="LinkedIn">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#D4AF37] hover:text-[#0A1931] transition-all" aria-label="YouTube">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /></svg>
              </a>
            </div>
          </div>

          {/* Column 2: Core Services */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-white flex items-center gap-2">
              <span className="w-2 h-2 bg-[#D4AF37] rounded-full" />
              Expertises Clés
            </h3>
            <ul className="space-y-4">
              {SERVICES.slice(0, 4).map((service) => (
                <li key={service.slug}>
                  <Link to={`/services/${service.slug}`} className="text-gray-400 hover:text-[#D4AF37] transition-all hover:pl-2 flex items-center gap-2">
                    <span className="text-xs">→</span>
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Navigation */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-white flex items-center gap-2">
              <span className="w-2 h-2 bg-[#D4AF37] rounded-full" />
              Explorer
            </h3>
            <ul className="space-y-4">
              {NAV_LINKS.filter(link => !link.subLinks).map((link) => (
                <li key={link.name}>
                  <Link to={link.path} className="text-gray-400 hover:text-[#D4AF37] transition-all hover:pl-2 flex items-center gap-2">
                    <span className="text-xs">→</span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Direct Contact */}
          <div className="bg-white/5 p-8 rounded-2xl border border-white/10">
            <h3 className="text-lg font-bold mb-6 text-[#D4AF37]">Coordonnées</h3>
            <div className="space-y-5">
              <div className="flex items-start gap-4">
                <svg className="w-6 h-6 text-[#D4AF37] mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                <div>
                  <p className="text-xs text-gray-500 uppercase font-bold tracking-widest mb-1">Email</p>
                  <a href="mailto:contact@bosssystems-ai.com" className="text-gray-200 hover:text-[#D4AF37] transition-colors font-medium">contact@bosssystems-ai.com</a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <svg className="w-6 h-6 text-[#D4AF37] mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
                <div>
                  <p className="text-xs text-gray-500 uppercase font-bold tracking-widest mb-1">Localisation</p>
                  <p className="text-gray-200 font-medium">Service Global & Remote Expertise</p>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Legal & Copyright */}
        <div className="border-t border-white/10 pt-10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-gray-500 text-sm">
              © {currentYear} <span className="text-gray-300 font-semibold tracking-wide">BOSS SYSTEMS AI</span>. L'excellence au service de l'IA.
            </p>
            <div className="flex flex-wrap justify-center gap-8 text-xs text-gray-500 uppercase font-bold tracking-widest">
              <a href="#" className="hover:text-[#D4AF37] transition-colors">Mentions Légales</a>
              <a href="#" className="hover:text-[#D4AF37] transition-colors">Confidentialité</a>
              <a href="#" className="hover:text-[#D4AF37] transition-colors">CGV</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
