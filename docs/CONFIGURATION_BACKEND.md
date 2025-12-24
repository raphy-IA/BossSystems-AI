# 🔧 Configuration du Backend

## 📋 Vue d'ensemble

Le backend sauvegarde automatiquement les demandes de contact dans un fichier JSON et envoie un email via SMTP Hostinger à `contact@bosssystemsai.com`.

## 🚀 Démarrage rapide

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

### 3. Démarrer le serveur

```bash
# Option 1 : Démarrer le serveur seul
npm run server

# Option 2 : Démarrer le frontend et le backend ensemble
npm run dev:full
```

Le serveur démarre sur `http://localhost:3001`

## 📁 Structure des données

Les contacts sont sauvegardés dans `data/contacts.json` :

```json
[
  {
    "id": "1703123456789",
    "name": "John Doe",
    "email": "john@example.com",
    "company": "Example Corp",
    "phone": "+33 6 12 34 56 78",
    "needs": "Audit & Cyber",
    "message": "Bonjour, je souhaite un audit...",
    "rgpd": true,
    "date": "2024-01-15T10:30:00.000Z"
  }
]
```

## 📧 Configuration SMTP Hostinger

### Paramètres SMTP

- **Serveur SMTP** : `smtp.hostinger.com`
- **Port** : `465`
- **Sécurité** : SSL (secure: true)
- **Email expéditeur** : `itsmanagement@bosssystemsai.com`
- **Email destinataire** : `contact@bosssystemsai.com`

### Format des emails

Les emails sont envoyés en HTML avec :
- Design professionnel avec les couleurs de la marque
- Toutes les informations du contact
- Message formaté
- Possibilité de répondre directement au contact (replyTo)

## 🔒 Sécurité

- Les données sont sauvegardées localement dans `data/contacts.json`
- Les emails sont envoyés via SMTP SSL sécurisé
- Le fichier `data/contacts.json` est dans `.gitignore` (ne sera pas commité)
- Le fichier `.env` est dans `.gitignore` (ne sera pas commité)

## 🐛 Dépannage

### Le serveur ne démarre pas

Vérifiez que le port 3001 n'est pas déjà utilisé :
```bash
# Windows
netstat -ano | findstr :3001

# Mac/Linux
lsof -i :3001
```

### Les emails ne sont pas envoyés

1. **Vérifiez les variables d'environnement :**
   - Assurez-vous que toutes les variables SMTP sont correctement configurées dans `.env`
   - Vérifiez que le mot de passe est correct

2. **Vérifiez les logs du serveur :**
   - Le serveur affiche les erreurs d'envoi d'email dans la console
   - Recherchez les messages d'erreur dans les logs

3. **Testez la connexion SMTP :**
   - Vérifiez que le port 465 est accessible
   - Vérifiez que les identifiants SMTP sont corrects
   - Contactez votre hébergeur si nécessaire

### Erreur d'authentification SMTP

Si vous obtenez une erreur d'authentification :
- Vérifiez que le mot de passe est correct
- Certains hébergeurs nécessitent un mot de passe d'application spécifique
- Vérifiez que l'email `itsmanagement@bosssystemsai.com` existe bien

### Les contacts ne sont pas sauvegardés

1. Vérifiez que le dossier `data/` existe et est accessible en écriture
2. Vérifiez les logs du serveur pour voir les erreurs

## 📊 Accéder aux contacts sauvegardés

Vous pouvez accéder à tous les contacts via l'API :

```bash
GET http://localhost:3001/api/contacts
```

Ou lire directement le fichier `data/contacts.json`.

## 🔄 Migration depuis EmailJS

Si vous aviez configuré EmailJS précédemment :
1. Supprimez les variables `EMAILJS_*` du fichier `.env`
2. Ajoutez les variables `SMTP_*` selon la configuration ci-dessus
3. Le backend utilisera automatiquement SMTP au lieu d'EmailJS
