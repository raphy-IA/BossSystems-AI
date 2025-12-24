# 🧪 Guide de Test du Site Web BOSS SYSTEMS AI

## 📋 Prérequis

Avant de commencer, assurez-vous d'avoir :
- ✅ **Node.js** v18 ou supérieur installé
- ✅ **npm** (inclus avec Node.js)

Vérifiez votre installation :
```bash
node --version
npm --version
```

---

## 🚀 Méthode 1 : Test complet (Frontend + Backend)

Cette méthode permet de tester **toutes les fonctionnalités**, y compris le formulaire de contact.

### Étape 1 : Installer les dépendances

Si vous ne l'avez pas encore fait :
```bash
npm install
```

### Étape 2 : Configurer les variables d'environnement (optionnel)

Le site fonctionne **sans configuration** pour tester l'interface, mais pour tester le formulaire de contact, créez un fichier `.env` :

1. Copiez le fichier `.env.example` :
   ```bash
   # Sur Windows (PowerShell)
   Copy-Item .env.example .env
   
   # Sur Mac/Linux
   cp .env.example .env
   ```

2. Éditez le fichier `.env` et configurez :
   - `VITE_API_URL` : URL du backend (par défaut : `http://localhost:3001`)
   - Variables SMTP (optionnel) : Si vous voulez tester l'envoi d'emails

**Note :** Si vous ne configurez pas SMTP, les contacts seront **sauvegardés dans `data/contacts.json`** mais les emails ne seront **pas envoyés**.

### Étape 3 : Lancer le site (Frontend + Backend)

Dans un **seul terminal**, lancez :
```bash
npm run dev:full
```

Cette commande démarre :
- ✅ **Frontend** sur `http://localhost:3000`
- ✅ **Backend** sur `http://localhost:3001`

### Étape 4 : Ouvrir dans le navigateur

1. Ouvrez votre navigateur
2. Allez sur : **http://localhost:3000**
3. Vous devriez voir le site BOSS SYSTEMS AI ! 🎉

---

## 🎨 Méthode 2 : Test Frontend uniquement

Si vous voulez juste tester l'interface sans le backend :

```bash
npm run dev
```

Le site sera accessible sur `http://localhost:3000`, mais :
- ⚠️ Le formulaire de contact ne fonctionnera pas (erreur de connexion au serveur)
- ✅ Toutes les autres pages fonctionneront normalement

---

## 🧪 Ce que vous pouvez tester

### ✅ Navigation
- [ ] Cliquez sur tous les liens du menu
- [ ] Testez le menu déroulant "Nos Services"
- [ ] Vérifiez que toutes les pages se chargent correctement

### ✅ Pages à tester
- [ ] **Accueil** (`/`) - Hero, services, statistiques
- [ ] **Services** (`/services`) - Liste des 5 services
- [ ] **Détail d'un service** (`/services/audit-digital-cybersecurite`) - Page détaillée
- [ ] **Offres Packagées** (`/packages`) - Les 3 packs
- [ ] **Réalisations** (`/portfolio`) - Cas clients
- [ ] **Ressources** (`/blog`) - Articles de blog
- [ ] **Contact** (`/contact`) - Formulaire de contact

### ✅ Formulaire de contact (nécessite le backend)

1. Allez sur la page **Contact** (`/contact`)
2. Remplissez le formulaire :
   - Nom complet
   - Email
   - Entreprise (optionnel)
   - Téléphone (optionnel)
   - Besoin (sélection dans la liste)
   - Message (optionnel)
   - Cochez la case RGPD
3. Cliquez sur "Envoyer la demande"

**Résultat attendu :**
- ✅ Message de confirmation "Merci !"
- ✅ Contact sauvegardé dans `data/contacts.json`
- ✅ Email envoyé (si SMTP configuré) à `contact@bosssystemsai.com`

### ✅ Widget de chat
- [ ] Vérifiez que le bouton de chat apparaît en bas à droite
- [ ] Cliquez dessus (actuellement, c'est juste un bouton visuel)

### ✅ Responsive Design
- [ ] Testez sur différentes tailles d'écran
- [ ] Ouvrez les outils de développement (F12)
- [ ] Utilisez le mode responsive (Ctrl+Shift+M)
- [ ] Testez sur mobile, tablette, desktop

---

## 🔍 Vérifier que tout fonctionne

### Frontend
- ✅ Le site se charge sans erreur
- ✅ Pas d'erreurs dans la console du navigateur (F12)
- ✅ Les images/logos s'affichent correctement

### Backend
Dans le terminal où le serveur tourne, vous devriez voir :
```
🚀 Serveur démarré sur http://localhost:3001
📁 Données sauvegardées dans: .../data/contacts.json
📧 SMTP configuré: ✅ (ou ❌ si non configuré)
```

### Formulaire de contact
Après avoir soumis le formulaire :
- ✅ Vérifiez `data/contacts.json` - votre contact devrait y être
- ✅ Si SMTP configuré, vérifiez votre boîte email `contact@bosssystemsai.com`

---

## 🛑 Arrêter le serveur

Dans le terminal où le serveur tourne, appuyez sur :
```
Ctrl + C
```

---

## ❓ Problèmes courants

### Le serveur ne démarre pas
```bash
# Vérifiez que Node.js est installé
node --version

# Supprimez node_modules et réinstallez
rm -rf node_modules
npm install
```

### Erreur "Port 3000 already in use"
- Fermez l'application qui utilise le port 3000
- Ou modifiez le port dans `vite.config.ts`

### Erreur "Port 3001 already in use"
- Fermez l'application qui utilise le port 3001
- Ou modifiez `PORT` dans le fichier `.env`

### Le formulaire ne fonctionne pas
- Vérifiez que le backend est démarré (`npm run dev:full`)
- Vérifiez la console du navigateur (F12) pour les erreurs
- Vérifiez que `VITE_API_URL` dans `.env` correspond au port du backend

### Les emails ne sont pas envoyés
- Vérifiez que les variables SMTP sont correctement configurées dans `.env`
- Vérifiez les logs du serveur backend pour voir les erreurs
- Les contacts sont quand même sauvegardés dans `data/contacts.json`

---

## 📊 Vérifier les contacts sauvegardés

Tous les contacts sont sauvegardés dans :
```
data/contacts.json
```

Vous pouvez ouvrir ce fichier pour voir tous les contacts reçus.

---

## 🎯 Test rapide (5 minutes)

1. **Lancez le site :**
   ```bash
   npm run dev:full
   ```

2. **Ouvrez** http://localhost:3000

3. **Testez la navigation :**
   - Cliquez sur "Nos Services"
   - Cliquez sur "Contact"

4. **Testez le formulaire :**
   - Remplissez le formulaire de contact
   - Envoyez-le
   - Vérifiez `data/contacts.json`

5. **C'est tout !** ✅

---

## 📝 Notes importantes

- Le site utilise **HashRouter**, donc les URLs contiennent un `#` : `http://localhost:3000/#/services`
- Les logos sont dans `public/assets/logos/`
- Les données sont centralisées dans `constants.tsx`
- Le backend sauvegarde automatiquement dans `data/contacts.json`

---

Bon test ! 🚀

