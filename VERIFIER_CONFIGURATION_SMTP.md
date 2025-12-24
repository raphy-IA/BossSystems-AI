# 🔍 Vérifier la Configuration SMTP

## ✅ Correction appliquée

Le problème était que **Node.js ne charge pas automatiquement le fichier `.env`**. 

**Solution :** J'ai installé et configuré le package `dotenv` qui charge automatiquement les variables d'environnement depuis le fichier `.env`.

---

## 📋 Étapes pour vérifier que tout fonctionne

### 1. Vérifier que le fichier `.env` existe

Le fichier `.env` doit être **à la racine du projet** (même niveau que `package.json`).

**Chemin attendu :**
```
D:\10. Programmation\Projets\boss-systems-ai-website\.env
```

**Comment vérifier :**
- Ouvrez l'Explorateur de fichiers
- Allez dans le dossier du projet
- Vérifiez qu'il y a un fichier nommé `.env` (sans extension)

**⚠️ Important :** Le fichier doit s'appeler exactement `.env` (pas `.env.txt` ou autre)

---

### 2. Vérifier le contenu du fichier `.env`

Ouvrez le fichier `.env` et vérifiez qu'il contient exactement ceci (remplacez les valeurs) :

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

**Points importants :**
- ✅ Pas d'espaces autour du `=` (ex: `SMTP_HOST=smtp.hostinger.com` ✅, pas `SMTP_HOST = smtp.hostinger.com` ❌)
- ✅ Pas de guillemets autour des valeurs (sauf si nécessaire)
- ✅ Pas de ligne vide au début
- ✅ Le mot de passe doit être le vrai mot de passe de l'email

---

### 3. Redémarrer le serveur

**⚠️ CRUCIAL :** Après avoir créé ou modifié le fichier `.env`, vous **DEVEZ** redémarrer le serveur.

1. Arrêtez le serveur (Ctrl + C dans le terminal)
2. Relancez-le : `npm run dev:full`

---

### 4. Vérifier les logs au démarrage

Quand le serveur démarre, vous devriez voir :

**Si SMTP est bien configuré :**
```
🚀 Serveur démarré sur http://localhost:3001
📁 Données sauvegardées dans: [chemin]
📧 SMTP configuré: ✅
   Host: smtp.hostinger.com
   Port: 465
   User: itsmanagement@bosssystemsai.com
   To: contact@bosssystemsai.com
```

**Si SMTP n'est pas configuré :**
```
🚀 Serveur démarré sur http://localhost:3001
📁 Données sauvegardées dans: [chemin]
📧 SMTP configuré: ❌

⚠️  Configuration SMTP manquante. Variables requises :
   SMTP_HOST: ❌ MANQUANT
   SMTP_PORT: ❌ MANQUANT
   SMTP_USER: ❌ MANQUANT
   SMTP_PASSWORD: ❌ MANQUANT

💡 Vérifiez que le fichier .env existe à la racine du projet et contient ces variables.
   Chemin attendu: [chemin vers .env]
```

---

## 🐛 Problèmes courants et solutions

### Problème 1 : "SMTP configuré: ❌" même après avoir créé `.env`

**Causes possibles :**
1. Le fichier `.env` n'est pas au bon endroit
2. Le fichier s'appelle `.env.txt` au lieu de `.env`
3. Le serveur n'a pas été redémarré après création du fichier
4. Erreur de syntaxe dans le fichier `.env`

**Solutions :**
1. Vérifiez que le fichier est bien à la racine (même niveau que `package.json`)
2. Renommez le fichier en `.env` (sans extension)
3. Redémarrez le serveur (Ctrl + C puis `npm run dev:full`)
4. Vérifiez la syntaxe (pas d'espaces autour du `=`, pas de guillemets inutiles)

---

### Problème 2 : Le fichier `.env` n'apparaît pas dans l'Explorateur

**Cause :** Les fichiers commençant par `.` sont cachés par défaut sur Windows.

**Solution :**
1. Dans l'Explorateur Windows, allez dans l'onglet "Affichage"
2. Cochez "Éléments masqués"
3. Le fichier `.env` devrait maintenant apparaître

**Alternative :** Créez le fichier directement dans votre éditeur de code (VS Code, etc.)

---

### Problème 3 : "Cannot find module 'dotenv'"

**Cause :** Le package `dotenv` n'est pas installé.

**Solution :**
```bash
npm install dotenv
```

---

### Problème 4 : Les emails ne partent toujours pas après configuration

**Vérifications à faire :**

1. **Vérifiez les logs du serveur** après avoir soumis le formulaire :
   - Vous devriez voir : `✅ Email admin envoyé avec succès: [ID]`
   - Si vous voyez une erreur, notez le message

2. **Vérifiez le mot de passe SMTP** :
   - Le mot de passe dans `.env` doit être le vrai mot de passe de l'email
   - Certains hébergeurs nécessitent un "mot de passe d'application" au lieu du mot de passe principal

3. **Vérifiez les paramètres SMTP Hostinger** :
   - Serveur : `smtp.hostinger.com`
   - Port : `465` (SSL) ou `587` (STARTTLS)
   - Essayez le port 587 si 465 ne fonctionne pas

4. **Vérifiez votre boîte email** :
   - Vérifiez les spams/courriers indésirables
   - Vérifiez que l'email `contact@bosssystemsai.com` existe et fonctionne

---

## 🧪 Test rapide

### Étape 1 : Vérifier la configuration

1. Démarrez le serveur : `npm run dev:full`
2. Regardez les logs au démarrage
3. Vérifiez que `📧 SMTP configuré: ✅` apparaît

### Étape 2 : Tester l'envoi

1. Allez sur http://localhost:3000/contact
2. Remplissez le formulaire avec **votre vraie adresse email**
3. Envoyez le formulaire
4. Regardez les logs du serveur :
   ```
   ✅ Contact sauvegardé: [ID]
   ✅ Email admin envoyé avec succès: [messageId]
   ✅ Email de confirmation envoyé au client: [messageId]
   ```

### Étape 3 : Vérifier les emails

1. Vérifiez `contact@bosssystemsai.com` → Email admin
2. Vérifiez votre email → Email de confirmation
3. Vérifiez aussi les spams si nécessaire

---

## 📝 Checklist de vérification

- [ ] Le fichier `.env` existe à la racine du projet
- [ ] Le fichier s'appelle exactement `.env` (pas `.env.txt`)
- [ ] Toutes les variables SMTP sont remplies dans `.env`
- [ ] Le mot de passe SMTP est correct
- [ ] Le serveur a été redémarré après modification de `.env`
- [ ] Les logs affichent `📧 SMTP configuré: ✅`
- [ ] Test d'envoi effectué
- [ ] Les emails sont reçus (vérifier aussi les spams)

---

## 💡 Aide supplémentaire

Si après toutes ces vérifications, les emails ne partent toujours pas :

1. **Partagez les logs du serveur** après avoir soumis le formulaire
2. **Vérifiez que vous pouvez vous connecter à l'email** `itsmanagement@bosssystemsai.com` via un client email
3. **Testez les paramètres SMTP** dans un client email (Outlook, Thunderbird, etc.)

---

**Le problème principal était que `dotenv` n'était pas installé. Maintenant c'est corrigé !** ✅

Redémarrez le serveur et vérifiez que `📧 SMTP configuré: ✅` apparaît dans les logs.

