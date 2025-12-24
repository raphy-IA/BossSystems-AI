# 🔧 Comment démarrer le serveur backend

## ⚠️ Erreur : "Impossible de contacter le serveur"

Cette erreur apparaît parce que **le serveur backend n'est pas démarré**.

## ✅ Solution : Démarrer le serveur

### Option 1 : Tout démarrer ensemble (RECOMMANDÉ) ⭐

**Dans un seul terminal :**

```bash
npm run dev:full
```

Cela démarre automatiquement :
- ✅ Frontend sur `http://localhost:3000`
- ✅ Backend sur `http://localhost:3001`

### Option 2 : Démarrer séparément

**Ouvrez 2 terminaux :**

**Terminal 1 - Frontend :**
```bash
npm run dev
```

**Terminal 2 - Backend :**
```bash
npm run server
```

## ✅ Vérifier que le serveur fonctionne

### 1. Vérifier les messages dans la console

Après avoir démarré le serveur, vous devriez voir :

```
🚀 Serveur démarré sur http://localhost:3001
📁 Données sauvegardées dans: [chemin vers data/contacts.json]
📧 SMTP configuré: ✅ (ou ❌ si non configuré)
```

### 2. Tester l'API dans le navigateur

Ouvrez votre navigateur et allez sur :

```
http://localhost:3001/api/health
```

Vous devriez voir :
```json
{"status":"ok"}
```

Si vous voyez cela, le serveur fonctionne ! ✅

## 📋 Avant de démarrer

### 1. Vérifier que les dépendances sont installées

```bash
npm install
```

### 2. Vérifier le fichier `.env`

Assurez-vous d'avoir créé un fichier `.env` à la racine du projet.

**Si le fichier n'existe pas, créez-le avec :**

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

**⚠️ Important :** Remplacez `votre_mot_de_passe_ici` par le mot de passe réel.

## 🐛 Problèmes courants

### Le serveur ne démarre pas

**Erreur :** "Cannot find module"
- **Solution :** `npm install`

**Erreur :** "Port 3001 already in use"
- **Solution 1 :** Fermez l'application qui utilise le port 3001
- **Solution 2 :** Changez le port dans `.env` : `PORT=3002` (et `VITE_API_URL=http://localhost:3002`)

### Le frontend ne peut toujours pas contacter le backend

1. Vérifiez que le serveur est bien démarré (message dans la console)
2. Testez `http://localhost:3001/api/health` dans votre navigateur
3. Vérifiez que l'URL dans `.env` est correcte : `VITE_API_URL=http://localhost:3001`
4. Redémarrez le frontend après avoir créé/modifié le fichier `.env`

### L'erreur persiste

1. Ouvrez la console du navigateur (F12)
2. Regardez l'onglet "Console" pour voir les erreurs
3. Regardez l'onglet "Network" pour voir si la requête vers `/api/contact` échoue

## 📝 Checklist de vérification

Avant de tester le formulaire :

- [ ] `npm install` exécuté
- [ ] Fichier `.env` créé avec les variables SMTP
- [ ] Serveur backend démarré avec `npm run server` ou `npm run dev:full`
- [ ] Message de confirmation dans la console : "🚀 Serveur démarré..."
- [ ] Test de santé OK : `http://localhost:3001/api/health` retourne `{"status":"ok"}`
- [ ] Frontend démarré avec `npm run dev` (ou `npm run dev:full`)
- [ ] Formulaire de contact testé

## 🎯 Commandes rapides

```bash
# Installer les dépendances
npm install

# Démarrer tout (frontend + backend)
npm run dev:full

# OU démarrer séparément :
npm run dev      # Terminal 1 : Frontend
npm run server   # Terminal 2 : Backend
```

## 💡 Astuce

Pour toujours démarrer le serveur automatiquement, utilisez :

```bash
npm run dev:full
```

Cela évite d'oublier de démarrer le backend ! 🚀






