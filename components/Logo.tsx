import React from 'react';

interface LogoProps {
  variant?: 'default' | 'dark' | 'light' | 'footer';
  className?: string;
}

/**
 * Composant Logo réutilisable
 * 
 * Placez vos fichiers logo dans public/assets/logos/ :
 * - logo.png (logo principal)
 * - logo-dark.png (logo pour fond sombre)
 * - logo-light.png (logo pour fond clair)
 * - logo-footer.png (logo pour le footer)
 */
const Logo: React.FC<LogoProps> = ({ variant = 'default', className = 'h-12' }) => {
  const getLogoPath = () => {
    switch (variant) {
      case 'dark':
        return '/assets/logos/BSA - FULL 2.png';
      case 'light':
        return '/assets/logos/BSA - FULL 3.png';
      case 'footer':
        return '/assets/logos/BSA - FULL 3.png';
      default:
        return '/assets/logos/BSA - FULL.png';
    }
  };

  const getAltText = () => {
    switch (variant) {
      case 'footer':
        return 'BOSS SYSTEMS AI - Logo Footer';
      default:
        return 'BOSS SYSTEMS AI - Logo';
    }
  };

  return (
    <img 
      src={getLogoPath()} 
      alt={getAltText()} 
      className={className}
      onError={(e) => {
        // Fallback si le logo n'existe pas encore
        const target = e.target as HTMLImageElement;
        target.style.display = 'none';
        // Optionnel : afficher un texte à la place
        const fallback = document.createElement('div');
        fallback.className = className;
        fallback.textContent = 'BOSS SYSTEMS AI';
        fallback.style.color = variant === 'footer' ? '#D4AF37' : '#0A1931';
        fallback.style.fontWeight = 'bold';
        fallback.style.display = 'flex';
        fallback.style.alignItems = 'center';
        target.parentNode?.replaceChild(fallback, target);
      }}
    />
  );
};

export default Logo;

