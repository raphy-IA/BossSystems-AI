
import type React from 'react';

export interface NavLink {
  name: string;
  path: string;
  subLinks?: NavLink[];
}

export interface Service {
  slug: string;
  title: string;
  tagline: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  description: string;
  prestations: string[];
}

export interface Package {
  name: string;
  price: string;
  tagline: string;
  features: string[];
  ctaText: string;
  isPopular?: boolean;
}

export interface CaseStudy {
  id: number;
  slug: string;
  title: string;
  client: string;
  description: string;
  imageUrl: string;
  overview?: string;
  challenges?: string[];
  solutions?: string[];
  results?: string[];
}

export interface BlogPost {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  imageUrl: string;
  date: string;
  category?: string;
}
