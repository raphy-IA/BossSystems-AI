
import React from 'react';
import type { NavLink, Service, Package, CaseStudy, BlogPost } from './types';

// SVG Icons as Components
const IconShield: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}><path d="M12 2L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-3zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V13H5V6.3l7-3.11v9.8z"></path></svg>
);
const IconCompass: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v5h-2zm0 6h2v2h-2zm-5.66-2.92l1.41 1.41L7.5 13.24l-1.41-1.41zM15.09 11.83l1.41-1.41 1.75 1.75-1.41 1.41z"></path></svg>
);
const IconBrain: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}><path d="M12 2C9.25 2 7 4.25 7 7c0 2.04 1.17 3.81 2.89 4.65l-1.1 1.1C6.71 11.58 5 9.46 5 7c0-3.87 3.13-7 7-7s7 3.13 7 7c0 2.46-1.71 4.58-4.79 5.75l-1.1-1.1C15.83 10.81 17 9.04 17 7c0-2.75-2.25-5-5-5zm-3.5 13.5c-1.93 0-3.5-1.57-3.5-3.5H3c0 3.53 2.61 6.43 6 6.92V22h2v-1.58c3.39-.49 6-3.39 6-6.92h-1.5c0 1.93-1.57 3.5-3.5 3.5z"></path></svg>
);
const IconCode: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}><path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"></path></svg>
);
const IconSchool: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}><path d="M12 3L1 9l4 2.18v6.32L1 14.41v2.18l11 6 11-6v-2.18L19 17.5v-6.32L23 9 12 3zm0 8.5L5.45 8 12 4.5 18.55 8 12 11.5zM17 15.32v-4.63l-4 2.18v4.63l4-2.18z"></path></svg>
);
const IconBank: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}><path d="M11.5 1L2 6v2h19V6l-9.5-5zM6 10v7h3v-7H6zm5 0v7h3v-7h-3zm5 0v7h3v-7h-3zM2 19v2h20v-2H2z"></path></svg>
);


// Navigation Links
export const NAV_LINKS: NavLink[] = [
  { name: 'Accueil', path: '/' },
  {
    name: 'Nos Services',
    path: '/services',
    subLinks: [
      { name: 'Audit Digital & Cybersécurité', path: '/services/audit-digital-cybersecurite' },
      { name: 'Conseil Stratégique & Transformation', path: '/services/conseil-strategique-transformation' },
      { name: 'Data Intelligence & IA Appliquée', path: '/services/data-intelligence-ia-appliquee' },
      { name: 'Développement & Intégration Digitale', path: '/services/developpement-integration-digitale' },
      { name: 'Solutions Métier & Fintech', path: '/services/solutions-metier-fintech' },
      { name: 'Accompagnement & Formation', path: '/services/accompagnement-formation' },
    ],
  },
  { name: 'Offres Packagées', path: '/packages' },
  { name: 'Réalisations', path: '/portfolio' },
  { name: 'Ressources', path: '/blog' },
  { name: 'Contact', path: '/contact' },
];

// Services Data
export const SERVICES: Service[] = [
  {
    slug: 'audit-digital-cybersecurite',
    title: 'Audit Digital & Cybersécurité',
    tagline: 'Diagnostiquer pour mieux protéger et performer.',
    icon: IconShield,
    description: "Une analyse complète de votre environnement numérique pour identifier les vulnérabilités, optimiser les performances et garantir une protection robuste contre les menaces actuelles.",
    prestations: ["Audit flash de maturité IT/IA", "Cartographie personnalisée des risques et opportunités", "Scan de vulnérabilités et tests d'intrusion", "Recommandations stratégiques de sécurisation"],
  },
  {
    slug: 'conseil-strategique-transformation',
    title: 'Conseil Stratégique & Transformation',
    tagline: "Piloter le changement vers l'excellence digitale.",
    icon: IconCompass,
    description: "Nous vous aidons à définir et à mettre en œuvre une feuille de route de transformation digitale alignée sur vos objectifs business, intégrant l'automatisation des processus de gestion.",
    prestations: ["Élaboration de roadmap de transformation numérique", "Automatisation des processus de gestion métiers", "Gouvernance des données et de l'IA", "Optimisation opérationnelle par le digital"],
  },
  {
    slug: 'data-intelligence-ia-appliquee',
    title: 'Data Intelligence & IA Appliquée',
    tagline: "Transformer vos données en avantage compétitif.",
    icon: IconBrain,
    description: "Exploitez la puissance de vos données avec des solutions d'Intelligence Artificielle sur mesure pour automatiser, prédire et décider plus intelligemment.",
    prestations: ["Tableaux de bord analytiques « narrés » par IA", "Déploiement de chatbots avancés (support, FAQ, RH…)", "Automatisation du traitement documentaire", "Solutions de scoring prospect et de prédiction"],
  },
  {
    slug: 'developpement-integration-digitale',
    title: 'Développement & Intégration Digitale',
    tagline: 'Construire les outils de votre performance.',
    icon: IconCode,
    description: "Création d'applications web, mobiles et intégration de systèmes pour fluidifier vos opérations et offrir des expériences utilisateur exceptionnelles.",
    prestations: ["Développement d'applications web et mobiles sur mesure", "Intégration d'API et de services tiers", "Automatisation des workflows (RPA)", "Modernisation de systèmes hérités (Legacy)"],
  },
  {
    slug: 'solutions-metier-fintech',
    title: 'Solutions Métier & Fintech',
    tagline: 'Des outils propriétaires pour vos besoins spécifiques.',
    icon: IconBank,
    description: "Conception de solutions de gestion métiers (CRM/ERP) propriétaires et de produits financiers innovants adaptés à votre secteur d'activité.",
    prestations: ["Applications CRM/ERP propriétaires (Audit, Agro, PME)", "Développement de plateformes Fintech", "Produits financiers numériques sur mesure", "Systèmes de gestion de mandats et de facturation complexe"],
  },
  {
    slug: 'accompagnement-formation',
    title: 'Accompagnement & Formation',
    tagline: "Assurer l'adoption et la montée en compétences.",
    icon: IconSchool,
    description: "Nous formons vos équipes aux nouveaux outils et nouvelles méthodes pour garantir une adoption réussie de la transformation et maximiser le retour sur investissement.",
    prestations: ["Formations sur mesure aux outils digitaux et IA", "Accompagnement au changement pour les équipes", "Coaching de managers sur le leadership digital", "Création de documentation et de supports pédagogiques"],
  },
];

// Packages Data
export const PACKAGES: Package[] = [
  {
    name: 'Starter Digital Pack',
    price: 'À partir de 1 500 €',
    tagline: 'L\'essentiel pour poser vos bases digitales.',
    features: [
      'Audit Flash IT & maturité IA',
      'Site vitrine Premium (SEO optimisé)',
      'Automatisation d’un processus métier clé',
      'Configuration email pro & Cybersécurité base',
      'Accompagnement prise en main (2h)'
    ],
    ctaText: 'Démarrer maintenant',
  },
  {
    name: 'Scale Up Pack',
    price: 'À partir de 3 500 €',
    tagline: 'Boostez votre productivité et passez à l\'échelle.',
    features: [
      'Tout le pack Starter',
      'Roadmap de transformation complète',
      'Tableaux de bord IA (Data Intelligence)',
      'Chatbot Intelligent (Support ou Sales)',
      'Audit sécurité & Conformité RGPD',
      'Support prioritaire (Ticket J+1)'
    ],
    ctaText: 'Propulser mon business',
    isPopular: true,
  },
  {
    name: 'Elite Innovation Pack',
    price: 'Sur Devis',
    tagline: 'L\'excellence technologique sur mesure.',
    features: [
      'Tout le pack Scale Up',
      'Cadrage IA & RPA métier complexe',
      'Développement d\'une App/CRM propriétaire',
      'Supervision sécurité proactive (SOC)',
      'DSI partagée & Conseil stratégique continu',
      'Garantie de performance & SLA sur mesure'
    ],
    ctaText: 'Contacter un expert',
  },
];

// Social Proof Data
export const SOCIAL_PROOF_STATS = [
  { value: '+60%', label: 'de gains de productivité' },
  { value: '80%', label: 'de risques cyber évités' },
  { value: 'Jusqu’à 6 mois', label: 'gagnés sur vos projets' },
];

// Portfolio Data
export const CASE_STUDIES: CaseStudy[] = [
  {
    id: 1,
    slug: "optimisation-ventes-industrietech",
    title: "Optimisation des Ventes pour PME Industrielle",
    client: "IndustrieTech",
    description: "Déploiement d'un CRM et d'outils de scoring IA, résultant en une augmentation de 30% des leads qualifiés.",
    imageUrl: "/assets/portfolio/industrietech.jpg",
    overview: "IndustrieTech faisait face à un cycle de vente long et des difficultés à prioriser ses prospects.",
    challenges: ["Silos de données entre marketing et ventes", "Processus manuel de qualification des leads", "Manque de visibilité sur le tunnel de conversion"],
    solutions: ["Intégration d'un CRM Salesforce avec scoring IA", "Automatisation des séquences d'emailing personnalisées", "Tableaux de bord de performance en temps réel"],
    results: ["+30% de leads qualifiés en 6 mois", "-20% sur la durée du cycle de vente", "Productivité accrue de l'équipe commerciale"]
  },
  {
    id: 2,
    slug: "securisation-ecommerce-shopsecure",
    title: "Sécurisation d'Infrastructure E-commerce",
    client: "ShopSecure",
    description: "Audit complet et mise en place d'une politique de sécurité multicouche, réduisant les incidents de 95%.",
    imageUrl: "/assets/portfolio/shopsecure.jpg",
    overview: "ShopSecure a subi plusieurs attaques par déni de service (DDoS) mettant en péril son activité saisonnière.",
    challenges: ["Vulnérabilités critiques sur la plateforme de paiement", "Absence de plan de reprise d'activité (PRA)", "Infrastructure cloud mal configurée"],
    solutions: ["Implémentation d'un WAF (Web Application Firewall)", "Migration vers une architecture cloud sécurisée (AWS)", "Configuration de sauvegardes immuables"],
    results: ["Zéro interruption de service pendant le Black Friday", "-95% de tentatives d'intrusion réussies", "Conformité RGPD et PCI-DSS validée"]
  },
  {
    id: 3,
    slug: "automatisation-support-servicefirst",
    title: "Automatisation du Support Client",
    client: "ServiceFirst",
    description: "Intégration d'un chatbot intelligent traitant 70% des requêtes de niveau 1 en toute autonomie.",
    imageUrl: "/assets/portfolio/servicefirst.jpg",
    overview: "ServiceFirst était submergé par des demandes simples et répétitives, bloquant ses agents sur des tâches à faible valeur ajoutée.",
    challenges: ["Temps d'attente client trop élevé", "Surcharge des équipes de support", "Incohérence des réponses entre les canaux"],
    solutions: ["Déploiement d'un agent conversationnel IA (LLM)", "Base de connaissance centralisée et auto-apprenante", "Escalade intelligente vers les humains pour les cas complexes"],
    results: ["70% des requêtes résolues sans intervention humaine", "Satisfaction client (CSAT) en hausse de 25%", "Réduction des coûts opérationnels de 40%"]
  },
  {
    id: 4,
    slug: "ia-predictive-agridata",
    title: "IA Prédictive pour l'Agriculture",
    client: "AgriData AI",
    description: "Analyse de données satellitaires et capteurs IoT pour prédire les rendements et optimiser l'irrigation.",
    imageUrl: "/assets/portfolio/agridata.jpg",
    overview: "AgriData AI souhaitait fournir aux agriculteurs des outils décisionnels précis pour faire face au changement climatique.",
    challenges: ["Volume massif de données hétérogènes (météo, sols, images)", "Difficulté à fournir des prévisions à l'échelle locale", "Besoin d'une interface simple pour des non-experts"],
    solutions: ["Modèles de Machine Learning entraînés sur données multispectrales", "Intégration de capteurs IoT LoRaWAN sur site", "Application mobile avec conseils agronomiques personnalisés"],
    results: ["Optimisation de l'irrigation (économie d'eau de 20%)", "Précision des prévisions de rendement de 92%", "Adoption massive par plus de 500 exploitations"]
  },
  {
    id: 5,
    slug: "automatisation-documentaire-legalflow",
    title: "Automatisation Documentaire (RPA)",
    client: "LegalFlow",
    description: "Traitement automatisé de dossiers juridiques complexes, réduisant le temps de gestion de 15h à 2h par semaine.",
    imageUrl: "/assets/portfolio/legalflow.jpg",
    overview: "LegalFlow perdait des milliers d'heures facturables sur de la saisie de données et de la classification de documents.",
    challenges: ["Traitement de gros volumes de documents non structurés", "Risque élevé d'erreurs humaines de saisie", "Délais de traitement impactant la relation client"],
    solutions: ["OCR avancé couplé à une analyse sémantique IA", "Workflows RPA pour synchroniser les dossiers avec le logiciel métier", "Signature électronique automatique intégrée"],
    results: ["Gain de 13h par semaine et par collaborateur", "Éradication complète des erreurs de saisie", "Accélération du traitement des dossiers de 300%"]
  },
  {
    id: 6,
    slug: "soc-cyberguard360",
    title: "SOC & Détection de Menaces en Temps Réel",
    client: "CyberGuard 360",
    description: "Mise en place d'un centre de supervision sécurité (SOC) avec détection proactive des anomalies par IA.",
    imageUrl: "/assets/portfolio/cyberguard.jpg",
    overview: "CyberGuard 360 avait besoin d'une visibilité totale sur l'infrastructure de ses clients pour réagir instantanément aux menaces.",
    challenges: ["Logs fragmentés et difficiles à analyser", "Multiplication des attaques complexes (APT)", "Fatigue des alertes pour les analystes"],
    solutions: ["Déploiement d'une solution SIEM/SOAR moderne", "Algorithmes de détection d'anomalies comportementales", "Système d'automatisation de la réponse aux incidents"],
    results: ["Temps de détection (MTTD) réduit de plusieurs jours à quelques minutes", "Automatisation de 80% des tâches de réponse", "Sécurisation de plus de 5000 terminaux critiques"]
  },
  {
    id: 7,
    slug: "crm-cabinet-audit-mandatemaster",
    title: "CRM Métier pour Cabinet de Conseil",
    client: "Consulto Group",
    description: "Conception d'une application propriétaire de gestion de mandats, ressources et facturation automatisée.",
    imageUrl: "/assets/portfolio/consulto.jpg",
    overview: "Consulto Group utilisait plusieurs outils disparates pour gérer ses missions, entraînant des erreurs de facturation et une perte de visibilité sur la rentabilité.",
    challenges: ["Difficulté de suivi des heures par collaborateur", "Processus de facturation manuel et chronophage", "Absence de vision consolidée des performances par mandat"],
    solutions: ["Développement d'un CRM propriétaire sur mesure", "Moteur de calcul automatisé des honoraires et frais", "Tableaux de bord de rentabilité temps réel"],
    results: ["Réduction de 80% du temps passé sur la facturation", "Visibilité totale sur la marge par projet", "Amélioration du taux d'occupation des consultants de 15%"]
  },
  {
    id: 8,
    slug: "fintech-tresorerie-predictive-cashflow",
    title: "Plateforme de Trésorerie Prédictive",
    client: "BankFlow Solutions",
    description: "Développement d'une solution Fintech utilisant l'IA pour prédire les flux de trésorerie et automatiser les rapprochements.",
    imageUrl: "/assets/portfolio/bankflow.jpg",
    overview: "BankFlow Solutions souhaitait offrir à ses clients PME une visibilité proactive sur leurs besoins de financement.",
    challenges: ["Complexité du rapprochement bancaire multi-comptes", "Instabilité des prévisions de cash-flow", "Besoin d'une sécurité bancaire de niveau institutionnel"],
    solutions: ["Algorithmes de Machine Learning pour l'analyse des tendances", "Intégration API bancaire (Open Banking)", "Modules de simulation de scénarios financiers"],
    results: ["Précision des prévisions à 30 jours supérieure à 95%", "Automatisation de 90% des rapprochements bancaires", "Détection précoce des risques d'impayés"]
  },
  {
    id: 9,
    slug: "automatisation-stocks-omnimarket",
    title: "Automatisation de Gestion Retail/ERP",
    client: "OmniMarket",
    description: "Mise en place d'un système de gestion de stocks et de réapprovisionnement automatique pour PME agroalimentaire.",
    imageUrl: "/assets/portfolio/omnimarket.jpg",
    overview: "OmniMarket souffrait de ruptures de stock fréquentes et d'un surstockage coûteux sur certaines références périssables.",
    challenges: ["Gestion de stocks multi-entrepôts archaïque", "Manque de prédiction de la demande saisonnière", "Pertes importantes dues aux dates d'expiration"],
    solutions: ["Déploiement d'un mini-ERP avec module intelligent de réapprovisionnement", "Système d'alertes prédictives sur les dates de péremption", "Intégration avec les systèmes fournisseurs"],
    results: ["Réduction des ruptures de stock de 45%", "-30% de pertes sur les produits périssables", "Optimisation du fonds de roulement de 20%"]
  },
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 1,
    slug: "ia-transformation-pme-2025",
    category: "Intelligence Artificielle",
    title: "Comment l'IA peut transformer votre PME en 2025",
    excerpt: "Découvrez les applications concrètes de l'intelligence artificielle qui sont à la portée des petites et moyennes entreprises aujourd'hui.",
    imageUrl: "/assets/blog/ia-pme.jpg",
    date: "15 Octobre 2025",
    content: `## L'IA : Plus qu'un Buzzword pour les PME en 2025

En 2025, l'Intelligence Artificielle n'est plus réservée aux géants de la Tech. Pour les PME, elle représente un levier de compétitivité sans précédent. Mais par où commencer ?

### 1. L'Automatisation des Tâches Administratives
L'IA peut aujourd'hui gérer la saisie de factures, le classement de documents et même la réponse aux emails redondants. Gain de temps estimé : **jusqu'à 15 heures par semaine** pour vos équipes administratives.

### 2. La Personnalisation de la Relation Client
Grâce aux LLM (Large Language Models), vous pouvez offrir un support client 24/7 qui comprend réellement les besoins de vos interlocuteurs, avec la même finesse qu'un agent humain.

### 3. L'Analyse Prédictive Simple
Prédire vos besoins en stock ou vos pics d'activité n'a jamais été aussi accessible. Les outils d'IA modernes analysent vos données historiques pour vous éviter les ruptures ou le surstockage.

**Conclusion :** L'enjeu de 2025 n'est pas de savoir si vous utiliserez l'IA, mais à quel point elle sera intégrée au cœur de vos processus métiers.`
  },
  {
    id: 2,
    slug: "menaces-cybersecurite-2026",
    category: "Cybersécurité",
    title: "Les 5 menaces de cybersécurité à ne pas ignorer",
    excerpt: "La sécurité n'est pas une option. Tour d'horizon des risques majeurs et des stratégies pour vous en prémunir efficacement.",
    imageUrl: "/assets/blog/cyber-menaces.jpg",
    date: "02 Octobre 2025",
    content: `## Cybersécurité : Le Panorama des Risques en 2026

Avec la sophistication croissante des attaques, la question n'est plus "si" vous serez attaqué, mais "quand". Voici les 5 menaces critiques à surveiller.

### 1. Le Phishing par Deepfake
Les attaquants utilisent désormais l'IA pour cloner la voix ou l'image de dirigeants (Arnaque au Président 2.0). La sensibilisation de vos équipes est votre première barrière.

### 2. Le Ransomware-as-a-Service (RaaS)
Les logiciels de rançon sont maintenant vendus "clés en main" sur le darknet, multipliant le nombre d'attaquants potentiels ciblant spécifiquement les PME, plus vulnérables.

### 3. Les Attaques sur la Supply Chain Logicielle
Une faille dans un outil tiers que vous utilisez peut compromettre toute votre infrastructure. L'audit de vos partenaires digitaux est devenu indispensable.

### 4. L'Exploitation des Objets Connectés (IoT)
Chaque caméra ou capteur non sécurisé est une porte d'entrée potentielle dans votre réseau local.

### 5. L'Infiltration furtive par IA
Certains malwares utilisent l'IA pour rester indétectés par les antivirus classiques en changeant leur propre code.`
  },
  {
    id: 3,
    slug: "roi-transformation-digitale",
    category: "Stratégie",
    title: "Le ROI de la transformation digitale : mythe ou réalité ?",
    excerpt: "Aller au-delà du buzzword. Comment mesurer concrètement l'impact financier de vos investissements technologiques.",
    imageUrl: "/assets/blog/roi-digital.jpg",
    date: "21 Septembre 2025",
    content: `## Mesurer le Succès : Le ROI Digital

Beaucoup d'entreprises lancent des projets de transformation sans indicateurs clairs. Voici comment s'assurer que votre investissement génère du profit.

### Les Indicateurs de Performance (KPI) Essentiels :
*   **Réduction des coûts opérationnels** : Moins d'erreurs manuelles, moins de temps de traitement.
*   **Amélioration du taux de conversion** : Un tunnel de vente optimisé par l'IA convertit mieux.
*   **Taux de rétention client** : Un meilleur service digitial fidélise davantage.

### Le Piège du "Too Much"
Vouloir tout transformer d'un coup est la meilleure façon de diluer votre ROI. Nous conseillons une approche par "Quick Wins" : des petits projets à impact fort qui financent les étapes suivantes.`
  },
  {
    id: 4,
    slug: "rpa-automatisation-processus-rentabilite",
    category: "Automatisation",
    title: "L'Automatisation RPA : Le levier invisible de votre rentabilité",
    excerpt: "Libérez vos collaborateurs des tâches répétitives pour les concentrer sur l'innovation et la valeur ajoutée.",
    imageUrl: "/assets/blog/rpa-efficiency.jpg",
    date: "10 Octobre 2025",
    content: `## RPA : Automatiser ce qui est Invisible mais Chronophage

Le Robotic Process Automation (RPA) n'est pas de l'IA complexe, mais c'est l'outil le plus efficace pour éliminer les goulots d'étranglement administratifs.

### Pourquoi implémenter du RPA ?
*   **Erreur Zéro** : Un robot ne fait jamais de "copier-coler" erroné.
*   **Disponibilité 24/7** : Les tâches nocturnes permettent aux équipes de commencer la journée avec des dossiers déjà prêts.
*   **Adoptabilité** : Le RPA s'installe au-dessus de vos logiciels actuels sans avoir à tout changer.

**Exemple concret :** Un cabinet d'expertise comptable a réduit de 70% le temps de rapprochement bancaire grâce au RPA.`
  },
  {
    id: 5,
    slug: "crm-metier-vs-logiciel-standard",
    category: "Solutions Métier",
    title: "ERP & CRM Métiers : Pourquoi le standard ne suffit plus",
    excerpt: "Pourquoi les solutions 'prêtes à l'emploi' freinent souvent votre croissance et comment le sur-mesure change la donne.",
    imageUrl: "/assets/blog/crm-metier.jpg",
    date: "28 Septembre 2025",
    content: `## Logiciels Standard vs Sur-Mesure : Le Duel

Les logiciels SaaS standard (Salesforce, Hubspot, etc.) sont puissants mais imposent souvent leurs processus à votre métier. 

### Les limites du standard :
*   **Complexité inutile** : 80% des fonctionnalités ne sont jamais utilisées.
*   **Coûts cachés** : Les abonnements par utilisateur deviennent prohibitifs au fil de la croissance.
*   **Inflexibilité** : Modifier un workflow spécifique peut prendre des mois ou être impossible.

### L'Avantage du Propriétaire
Posséder son propre CRM Métier, c'est avoir un outil qui colle 100% à votre réalité opérationnelle (ex: Cabinets d'Audit, Agro-alimentaire) et qui constitue un actif valorisable pour votre entreprise.`
  },
  {
    id: 6,
    slug: "fintech-2026-tresorerie-autonome",
    category: "Fintech",
    title: "Fintech 2026 : Vers une trésorerie autonome et prédictive",
    excerpt: "Comment les nouvelles technologies bancaires permettent aux dirigeants de ne plus naviguer à vue.",
    imageUrl: "/assets/blog/fintech-2026.jpg",
    date: "12 Octobre 2025",
    content: `## L'Avenir de la Finance d'Entreprise

La Fintech ne se limite plus aux paiements mobiles. En 2026, l'enjeu est la **Liquidité Intelligence**.

### Prévision de Trésorerie en Temps Réel
Grâce à l'Open Banking et au Machine Learning, votre logiciel peut prédire une tension de trésorerie 3 semaines à l'avance, vous permettant d'anticiper un financement ou de décaler une dépense.

### Le Rapprochement Bancaire Autonome
Les réconciliations entre factures et relevés se font désormais à 98% sans intervention humaine, identifiant les anomalies instantanément.

**Notre Vision :** Le directeur financier de demain sera un copilote stratégique soutenu par une technologie qui gère l'opérationnel de manière invisible.`
  },
];

export const CONTACT_FORM_NEEDS = [
  'Audit & Cyber', 'Conseil Strat', 'Data & IA', 'Développement', 'Fintech & CRM', 'Formation',
  'Pack Starter', 'Pack Scale Up', 'Pack Elite', 'Autre'
];
