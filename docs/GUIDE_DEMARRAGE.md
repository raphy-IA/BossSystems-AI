# 📖 Guide de Démarrage Rapide

## ✅ Vérification rapide

### 1. Vérifier que Node.js est installé

Ouvrez un terminal et tapez :

```bash
node --version
npm --version
```

Vous devriez voir quelque chose comme :
```
v22.16.0
10.9.2
```

Si vous obtenez une erreur, téléchargez Node.js ici : https://nodejs.org/

---

## 🚀 Lancer l'application (Étapes détaillées)

### Étape 1 : Ouvrir le terminal dans le dossier du projet

**Windows :**
- Ouvrez l'Explorateur de fichiers
- Naviguez vers : `D:\10. Programmation\Projets\boss-systems-ai-website`
- Clic droit dans le dossier → "Ouvrir dans le terminal" ou "Ouvrir PowerShell ici"

**Mac/Linux :**
```bash
cd /chemin/vers/boss-systems-ai-website
```

### Étape 2 : Installer les dépendances

```bash
npm install
```

⏱️ Cette étape peut prendre 1-2 minutes la première fois.

**Résultat attendu :** Vous verrez un dossier `node_modules/` créé.

### Étape 3 : Lancer le serveur de développement

```bash
npm run dev
```

**Résultat attendu :** Vous devriez voir quelque chose comme :

```
  VITE v6.x.x  ready in xxx ms

  ➜  Local:   http://localhost:3000/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help
```

### Étape 4 : Ouvrir dans votre navigateur

1. Copiez l'URL affichée (généralement `http://localhost:3000`)
2. Collez-la dans votre navigateur
3. Vous devriez voir le site BOSS SYSTEMS AI ! 🎉

---

## 🛑 Arrêter le serveur

Dans le terminal où le serveur tourne, appuyez sur :
```
Ctrl + C
```

---

## 📦 Compiler pour la production

Pour créer une version optimisée à déployer :

```bash
npm run build
```

Cela crée un dossier `dist/` avec tous les fichiers statiques à uploader sur votre hébergeur.

---

## ❓ Problèmes fréquents

### Erreur : "npm n'est pas reconnu"
- **Solution :** Réinstallez Node.js depuis https://nodejs.org/
- Assurez-vous de cocher "Add to PATH" pendant l'installation

### Erreur : "Port 3000 already in use"
- **Solution 1 :** Fermez l'application qui utilise le port 3000
- **Solution 2 :** Modifiez le port dans `vite.config.ts` (ligne 9)

### Erreur : "Cannot find module"
- **Solution :** Supprimez `node_modules` et réinstallez :
  ```bash
  rm -rf node_modules
  npm install
  ```

### Le site ne s'affiche pas correctement
- Vérifiez la console du navigateur (F12) pour voir les erreurs
- Assurez-vous que le serveur tourne bien (vérifiez le terminal)

---

## 🌐 Pour aller plus loin

Consultez le fichier `README.md` pour :
- Les options d'hébergement
- La structure du projet
- Plus d'informations techniques

