# 📧 Guide de Configuration SMTP

## ❌ Problème : Les emails ne sont pas envoyés

Si vous avez testé le formulaire et que vous ne recevez pas d'emails, c'est parce que **le fichier `.env` n'existe pas ou n'est pas configuré correctement**.

---

## ✅ Solution : Créer et configurer le fichier `.env`

### Étape 1 : Créer le fichier `.env`

À la racine du projet (même niveau que `package.json`), créez un fichier nommé **`.env`** (sans extension).

### Étape 2 : Ajouter la configuration

Copiez-collez ce contenu dans le fichier `.env` :

```env
# URL du backend (pour le frontend)
VITE_API_URL=http://localhost:3001

# Configuration SMTP Hostinger
SMTP_HOST=smtp.hostinger.com
SMTP_PORT=465
SMTP_USER=itsmanagement@bosssystemsai.com
SMTP_PASSWORD=VOTRE_MOT_DE_PASSE_ICI
SMTP_FROM_EMAIL=itsmanagement@bosssystemsai.com
SMTP_TO_EMAIL=contact@bosssystemsai.com

# Port du serveur backend
PORT=3001
```

### Étape 3 : Remplacer le mot de passe

**⚠️ IMPORTANT :** Remplacez `VOTRE_MOT_DE_PASSE_ICI` par le **vrai mot de passe** de l'email `itsmanagement@bosssystemsai.com`.

**Où trouver le mot de passe ?**
- Dans votre compte Hostinger
- Dans les paramètres de l'email
- C'est le mot de passe que vous utilisez pour vous connecter à `itsmanagement@bosssystemsai.com`

### Étape 4 : Redémarrer le serveur

Après avoir créé/modifié le fichier `.env`, **redémarrez le serveur** :

1. Arrêtez le serveur (Ctrl + C)
2. Relancez-le : `npm run dev:full`

---

## 🔍 Vérifier que SMTP est configuré

Quand vous démarrez le serveur, vous devriez voir dans la console :

```
🚀 Serveur démarré sur http://localhost:3001
📁 Données sauvegardées dans: [chemin]
📧 SMTP configuré: ✅
```

Si vous voyez `📧 SMTP configuré: ❌`, cela signifie que le fichier `.env` n'est pas correctement configuré.

---

## 📋 Informations SMTP Hostinger

Si vous utilisez Hostinger, voici les paramètres standards :

- **Serveur SMTP :** `smtp.hostinger.com`
- **Port :** `465` (SSL/TLS) ou `587` (STARTTLS)
- **Sécurité :** SSL/TLS
- **Authentification :** Requise (votre email et mot de passe)

**Note :** Si le port 465 ne fonctionne pas, essayez le port 587 et changez `SMTP_PORT=587` dans le `.env`.

---

## 🧪 Tester l'envoi d'email

1. **Configurez le fichier `.env`** (voir ci-dessus)
2. **Redémarrez le serveur** : `npm run dev:full`
3. **Remplissez le formulaire de contact** sur http://localhost:3000
4. **Envoyez le formulaire**
5. **Vérifiez :**
   - La console du serveur devrait afficher : `✅ Email envoyé avec succès: [ID]`
   - Vérifiez votre boîte email `contact@bosssystemsai.com`
   - Vérifiez aussi les spams/courriers indésirables

---

## ❓ Problèmes courants

### Le serveur affiche "SMTP configuré: ❌"

**Causes possibles :**
- Le fichier `.env` n'existe pas
- Le fichier `.env` est mal nommé (doit être exactement `.env`, pas `.env.txt`)
- Les variables ne sont pas correctement écrites (pas d'espaces autour du `=`)

**Solution :**
- Vérifiez que le fichier `.env` est bien à la racine du projet
- Vérifiez l'orthographe des variables (en majuscules)
- Redémarrez le serveur après modification

### Erreur "Invalid login" ou "Authentication failed"

**Cause :** Le mot de passe SMTP est incorrect.

**Solutions :**
- Vérifiez que le mot de passe dans `.env` est correct
- Essayez de vous connecter à l'email via un client email pour vérifier le mot de passe
- Certains hébergeurs nécessitent un "mot de passe d'application" au lieu du mot de passe principal

### Erreur "Connection timeout"

**Causes possibles :**
- Le serveur SMTP est incorrect
- Le port est incorrect
- Problème de firewall

**Solutions :**
- Vérifiez que `SMTP_HOST=smtp.hostinger.com` est correct
- Essayez le port 587 au lieu de 465
- Vérifiez votre connexion internet

### Les emails arrivent dans les spams

**Causes :**
- L'email est envoyé depuis un serveur local
- Le domaine n'a pas de SPF/DKIM configuré

**Solutions :**
- Vérifiez votre dossier spam/courriers indésirables
- En production, configurez SPF/DKIM dans les DNS de votre domaine

---

## 🔒 Sécurité

**⚠️ IMPORTANT :** Le fichier `.env` contient des informations sensibles (mot de passe).

**À faire :**
- ✅ Ne jamais commiter le fichier `.env` dans Git
- ✅ Le fichier `.env` devrait être dans `.gitignore`
- ✅ Ne partagez jamais le contenu du `.env`

**Vérifiez que `.env` est dans `.gitignore` :**
```bash
# Dans .gitignore, vous devriez avoir :
.env
.env.local
```

---

## 📝 Exemple de fichier `.env` complet

```env
# ============================================
# Configuration Backend
# ============================================
VITE_API_URL=http://localhost:3001
PORT=3001

# ============================================
# Configuration SMTP Hostinger
# ============================================
SMTP_HOST=smtp.hostinger.com
SMTP_PORT=465
SMTP_USER=itsmanagement@bosssystemsai.com
SMTP_PASSWORD=votre_mot_de_passe_secret
SMTP_FROM_EMAIL=itsmanagement@bosssystemsai.com
SMTP_TO_EMAIL=contact@bosssystemsai.com
```

---

## ✅ Checklist de configuration

- [ ] Fichier `.env` créé à la racine du projet
- [ ] Toutes les variables SMTP remplies
- [ ] Mot de passe SMTP correct
- [ ] Serveur redémarré après modification
- [ ] Console affiche `📧 SMTP configuré: ✅`
- [ ] Test d'envoi de formulaire effectué
- [ ] Email reçu dans la boîte de réception

---

Une fois configuré, les emails seront envoyés automatiquement à chaque soumission de formulaire ! 🎉

