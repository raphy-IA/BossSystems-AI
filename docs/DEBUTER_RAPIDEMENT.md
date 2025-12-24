# 🚀 Démarrer rapidement

## ⚠️ Erreur : "Impossible de contacter le serveur"

Cette erreur signifie que **le serveur backend n'est pas démarré**.

## ✅ Solution rapide

### Option 1 : Démarrer frontend + backend ensemble (Recommandé)

```bash
npm run dev:full
```

Cela démarre automatiquement :
- Le frontend sur `http://localhost:3000`
- Le backend sur `http://localhost:3001`

### Option 2 : Démarrer séparément

**Terminal 1 - Frontend :**
```bash
npm run dev
```

**Terminal 2 - Backend :**
```bash
npm run server
```

## 🔍 Vérifier que le serveur fonctionne

### 1. Vérifier que le serveur est démarré

Après avoir lancé le serveur, vous devriez voir dans la console :

```
🚀 Serveur démarré sur http://localhost:3001
📁 Données sauvegardées dans: D:\10. Programmation\Projets\boss-systems-ai-website\data\contacts.json
📧 SMTP configuré: ✅
```

### 2. Tester l'API

Ouvrez votre navigateur et allez sur :
```
http://localhost:3001/api/health
```

Vous devriez voir :
```json
{"status":"ok"}
```

## 📋 Configuration requise

### 1. Fichier `.env`

Assurez-vous d'avoir créé un fichier `.env` à la racine du projet avec :

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

### 2. Dépendances installées

```bash
npm install
```

## 🐛 Problèmes courants

### Le serveur ne démarre pas

**Erreur :** "Cannot find module 'nodemailer'"
- **Solution :** `npm install`

**Erreur :** "Port 3001 already in use"
- **Solution :** Fermez l'application qui utilise le port 3001 ou changez le port dans `.env`

### Le frontend ne peut pas contacter le backend

**Vérifiez :**
1. Le backend est bien démarré (voir le message dans la console)
2. L'URL dans `.env` est correcte : `VITE_API_URL=http://localhost:3001`
3. Aucun firewall ne bloque le port 3001

### L'erreur persiste après avoir démarré le serveur

1. Vérifiez que le serveur est bien démarré
2. Vérifiez `http://localhost:3001/api/health` dans votre navigateur
3. Rechargez la page du formulaire (F5)
4. Vérifiez la console du navigateur (F12) pour voir les erreurs

## 📝 Checklist rapide

- [ ] `npm install` exécuté
- [ ] Fichier `.env` créé avec les bonnes variables
- [ ] Serveur backend démarré (`npm run server` ou `npm run dev:full`)
- [ ] Message de confirmation dans la console : "🚀 Serveur démarré sur http://localhost:3001"
- [ ] Test de santé OK : `http://localhost:3001/api/health` retourne `{"status":"ok"}`
- [ ] Formulaire de contact testé

## 🆘 Besoin d'aide ?

Si le problème persiste :
1. Vérifiez les logs du serveur dans la console
2. Vérifiez la console du navigateur (F12) pour les erreurs
3. Consultez `docs/CONFIGURATION_BACKEND.md` pour plus de détails






