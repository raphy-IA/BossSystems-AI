<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# 🚀 BOSS SYSTEMS AI - Site Web

Site web institutionnel et commercial pour BOSS SYSTEMS AI, une société de conseil en IT/IA.

## 📋 Prérequis

- **Node.js** v18 ou supérieur ([télécharger ici](https://nodejs.org/))
- **npm** (inclus avec Node.js)

Vérifiez votre installation :
```bash
node --version
npm --version
```

## 🏃‍♂️ Lancer l'application en local

### 1. Installer les dépendances

```bash
npm install
```

### 2. Configurer les variables d'environnement

Créez un fichier `.env` à la racine du projet (copiez `.env.example`) :

```env
VITE_API_URL=http://localhost:3001
SMTP_HOST=smtp.hostinger.com
SMTP_PORT=465
SMTP_USER=itsmanagement@bosssystemsai.com
SMTP_PASSWORD=votre_mot_de_passe_ici
SMTP_FROM_EMAIL=itsmanagement@bosssystemsai.com
SMTP_TO_EMAIL=contact@bosssystemsai.com
PORT=3001
```

**⚠️ Important :** Remplacez `votre_mot_de_passe_ici` par le mot de passe réel de l'email `itsmanagement@bosssystemsai.com`.

### 3. Lancer l'application

**Option A : Frontend + Backend ensemble (recommandé)**

```bash
npm run dev:full
```

**Option B : Séparément**

```bash
# Terminal 1 : Frontend
npm run dev

# Terminal 2 : Backend
npm run server
```

- **Frontend** : http://localhost:3000
- **Backend** : http://localhost:3001

Le serveur de développement offre le **hot-reload** : les modifications sont reflétées automatiquement dans le navigateur.

### 4. Autres commandes utiles

```bash
# Compiler pour la production
npm run build

# Prévisualiser la version compilée
npm run preview

# Démarrer uniquement le backend
npm run server
```

## 🌐 Hébergement

### ⚠️ Important : Hébergement WordPress

**Cette application ne peut PAS être hébergée "via WordPress"** car c'est une application React qui nécessite une compilation.

### ✅ Options d'hébergement recommandées

#### Option 1 : Hébergement statique (Recommandé)

1. **Compiler l'application** :
   ```bash
   npm run build
   ```
   Cela génère un dossier `dist/` avec tous les fichiers statiques.

2. **Déployer le contenu de `dist/`** sur :
   - **Netlify** (gratuit, facile) : https://www.netlify.com/
   - **Vercel** (gratuit, excellent) : https://vercel.com/
   - **GitHub Pages** (gratuit) : https://pages.github.com/
   - **Cloudflare Pages** (gratuit) : https://pages.cloudflare.com/
   - **Hébergement web classique** (OVH, Infomaniak, Planethoster, etc.)
     - Uploadez le contenu de `dist/` dans votre dossier `public_html/` ou `www/`

#### Option 2 : Sous-domaine séparé

Si vous utilisez déjà WordPress :
- **WordPress** sur : `www.votredomaine.com`
- **Application React** sur : `app.votredomaine.com` ou `boss-systems.votredomaine.com`

### 📦 Variables d'environnement (optionnel)

Si vous utilisez l'API Gemini (actuellement non implémentée), créez un fichier `.env.local` :

```env
GEMINI_API_KEY=votre_clé_api_ici
```

## 📧 Formulaire de contact

Le formulaire de contact :
- ✅ **Sauvegarde** les demandes dans `data/contacts.json`
- ✅ **Envoie** un email à `contact@bosssystemsai.com` via SMTP Hostinger

**Configuration SMTP :**
- Serveur : `smtp.hostinger.com`
- Port : `465` (SSL)
- Expéditeur : `itsmanagement@bosssystemsai.com`

Pour configurer l'envoi d'email, consultez `docs/CONFIGURATION_BACKEND.md`

## 🛠️ Technologies utilisées

- **React** 19.2.0
- **TypeScript** 5.8.2
- **Vite** 6.2.0
- **React Router DOM** 7.9.6
- **Express** 4.18.2 (Backend API)
- **Nodemailer** 6.9.7 (Envoi d'emails via SMTP)
- **Tailwind CSS** (via CDN)

## 📁 Structure du projet

```
├── components/         # Composants réutilisables
├── pages/             # Pages de l'application
├── constants.tsx      # Données centralisées
├── types.ts          # Définitions TypeScript
└── App.tsx           # Point d'entrée
```

## 🐛 Problèmes courants

### Le serveur ne démarre pas
- Vérifiez que Node.js est bien installé : `node --version`
- Supprimez `node_modules` et réinstallez : `rm -rf node_modules && npm install`

### Erreur de port déjà utilisé
- Le port 3000 est peut-être occupé. Modifiez le port dans `vite.config.ts` ou arrêtez le processus utilisant le port 3000.
