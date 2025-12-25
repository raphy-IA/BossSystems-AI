import React, { useState, useRef } from 'react';
import { Link, NavLink as RouterNavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { NAV_LINKS } from '../constants';
import type { NavLink } from '../types';
import { useCurrency } from '../context/CurrencyContext';
import Logo from './Logo';

const Header: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { currency, toggleCurrency } = useCurrency();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const servicesTimeoutRef = useRef<number | null>(null);

  const handleServicesEnter = () => {
    if (servicesTimeoutRef.current) clearTimeout(servicesTimeoutRef.current);
    setIsServicesOpen(true);
  };

  const handleServicesLeave = () => {
    servicesTimeoutRef.current = window.setTimeout(() => {
      setIsServicesOpen(false);
    }, 200);
  };

  const toggleLanguage = () => {
    const nextLang = i18n.language.startsWith('fr') ? 'en' : 'fr';
    i18n.changeLanguage(nextLang);
  };

  const navLinkClasses = "text-white hover:text-[#D4AF37] transition-colors duration-200 text-sm xl:text-base";
  const activeLinkClasses = { color: '#D4AF37' };

  // Helper to get translated link name from key
  const getNavLabel = (name: string) => {
    const map: Record<string, string> = {
      'Accueil': 'home',
      'Nos Services': 'services',
      'Offres Packagées': 'packages',
      'Réalisations': 'portfolio',
      'Ressources': 'blog',
      'Contact': 'contact'
    };
    const key = map[name];
    return key ? t(`common.nav.${key}`) : name;
  };

  return (
    <header className="bg-[#0A1931] sticky top-0 z-50 shadow-md border-b border-white/10">
      <div className="container mx-auto px-6 py-3 flex justify-between items-center">
        <Link to="/">
          <Logo variant="default" className="h-12" />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8">
          {NAV_LINKS.map((link) => (
            link.subLinks ? (
              <div key={link.name} className="relative" onMouseEnter={handleServicesEnter} onMouseLeave={handleServicesLeave}>
                <RouterNavLink to={link.path} className={({ isActive }) => `${navLinkClasses} flex items-center`} style={({ isActive }) => isActive ? activeLinkClasses : {}}>
                  {getNavLabel(link.name)}
                  <svg className={`w-4 h-4 ml-1 transition-transform ${isServicesOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                </RouterNavLink>
                {isServicesOpen && (
                  <div className="absolute top-full left-0 mt-2 w-72 bg-[#0A1931] border border-gray-700 rounded-md shadow-lg py-2">
                    {link.subLinks.map(subLink => (
                      <RouterNavLink key={subLink.name} to={subLink.path} className="block px-4 py-2 text-sm text-white hover:bg-[#D4AF37] hover:text-[#0A1931]">
                        {subLink.name} {/* sublinks are dynamic services, will need separate translation logic later */}
                      </RouterNavLink>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <RouterNavLink key={link.name} to={link.path} className={({ isActive }) => navLinkClasses} style={({ isActive }) => isActive ? activeLinkClasses : {}}>
                {getNavLabel(link.name)}
              </RouterNavLink>
            )
          ))}
        </nav>

        <div className="hidden lg:flex items-center space-x-4">
          <button
            onClick={toggleLanguage}
            className="text-white hover:text-[#D4AF37] font-medium transition-colors border border-white/20 px-3 py-1 rounded text-sm uppercase"
          >
            {i18n.language.startsWith('fr') ? 'EN' : 'FR'}
          </button>

          <Link to="/contact" className="bg-[#D4AF37] text-[#0A1931] font-bold py-2 px-6 rounded-full hover:bg-opacity-90 transition-all duration-300 transform hover:scale-105 whitespace-nowrap">
            {t('common.nav.contact', 'Contact')}
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-white focus:outline-none">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-[#0A1931] border-t border-gray-700">
          <nav className="px-6 pt-2 pb-4 space-y-2">
            {NAV_LINKS.map((link) => (
              !link.subLinks ? (
                <RouterNavLink key={link.name} to={link.path} className="block text-white hover:text-[#D4AF37]" onClick={() => setIsMobileMenuOpen(false)}>
                  {link.name}
                </RouterNavLink>
              ) : (
                <div key={link.name}>
                  <RouterNavLink to={link.path} className="block text-white hover:text-[#D4AF37]" onClick={() => setIsMobileMenuOpen(false)}>{link.name}</RouterNavLink>
                  <div className="pl-4 mt-1 space-y-1">
                    {link.subLinks.map(subLink => (
                      <RouterNavLink key={subLink.name} to={subLink.path} className="block text-gray-300 hover:text-[#D4AF37]" onClick={() => setIsMobileMenuOpen(false)}>
                        {subLink.name}
                      </RouterNavLink>
                    ))}
                  </div>
                </div>
              )
            ))}
            <div className="flex justify-center gap-4 mt-4 mb-2">
              <button
                onClick={toggleLanguage}
                className="text-white hover:text-[#D4AF37] font-medium border border-white/20 px-3 py-1 rounded text-sm uppercase"
              >
                {i18n.language.startsWith('fr') ? 'EN' : 'FR'}
              </button>
            </div>
            <Link to="/contact" onClick={() => setIsMobileMenuOpen(false)} className="block w-full text-center mt-4 bg-[#D4AF37] text-[#0A1931] font-bold py-2 px-6 rounded-full hover:bg-opacity-90 transition-all duration-300">
              Réservez un expert
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
