# 📋 Flux de Traitement du Formulaire de Contact

## 🔄 Vue d'ensemble du processus

Quand un utilisateur soumet le formulaire de contact, voici ce qui se passe :

```
┌─────────────────┐
│  Utilisateur    │
│  remplit le     │
│  formulaire     │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  ContactForm    │
│  (Frontend)     │
│  - Validation   │
│  - Envoi POST   │
└────────┬────────┘
         │
         │ POST /api/contact
         │ (JSON avec données)
         ▼
┌─────────────────┐
│  Backend        │
│  server/index.js│
│  - Validation   │
│  - Sauvegarde   │
│  - Envoi email  │
└────────┬────────┘
         │
         ├─────────────────┐
         │                 │
         ▼                 ▼
┌─────────────────┐  ┌─────────────────┐
│  Sauvegarde     │  │  Envoi Email    │
│  data/          │  │  via SMTP       │
│  contacts.json  │  │  Hostinger      │
└─────────────────┘  └─────────────────┘
```

---

## 📝 Étape par étape

### 1️⃣ **Frontend : Soumission du formulaire**

**Fichier :** `components/ContactForm.tsx`

**Ce qui se passe :**
1. L'utilisateur remplit le formulaire et clique sur "Envoyer la demande"
2. Validation côté client :
   - Vérification que la case RGPD est cochée
   - Vérification des champs requis (nom, email, besoin)
3. Envoi d'une requête POST à l'API :
   ```javascript
   POST http://localhost:3001/api/contact
   Content-Type: application/json
   
   {
     "name": "John Doe",
     "email": "john@example.com",
     "company": "Entreprise XYZ",
     "phone": "0123456789",
     "needs": "Audit & Cyber",
     "message": "Bonjour, je souhaite...",
     "rgpd": true
   }
   ```

**Résultat :**
- ✅ Si succès : Message "Merci ! Votre message a bien été envoyé..."
- ❌ Si erreur : Message d'erreur affiché à l'utilisateur

---

### 2️⃣ **Backend : Réception et traitement**

**Fichier :** `server/index.js` (Route `/api/contact`)

**Ce qui se passe :**

#### A. Validation des données (lignes 191-199)
```javascript
if (!name || !email || !needs || !rgpd) {
  return res.status(400).json({ 
    success: false, 
    error: 'Données manquantes' 
  });
}
```

#### B. Sauvegarde dans le fichier JSON (lignes 211-213)
```javascript
const savedContact = await saveContact(contactData);
// → Sauvegarde dans data/contacts.json
```

**Format sauvegardé :**
```json
{
  "id": "1766506493996",
  "name": "John Doe",
  "email": "john@example.com",
  "company": "Entreprise XYZ",
  "phone": "0123456789",
  "needs": "Audit & Cyber",
  "message": "Bonjour, je souhaite...",
  "rgpd": true,
  "date": "2025-12-23T16:14:53.996Z"
}
```

**Emplacement :** `data/contacts.json`

#### C. Envoi d'email via SMTP (lignes 215-216)
```javascript
const emailSent = await sendEmail(contactData);
```

**Configuration SMTP :**
- **Serveur :** `smtp.hostinger.com`
- **Port :** `465` (SSL)
- **Expéditeur :** `itsmanagement@bosssystemsai.com` (configuré dans `.env`)
- **Destinataire :** `contact@bosssystemsai.com` (configuré dans `.env`)

**Format de l'email :**
- Email HTML formaté avec les couleurs de la marque (#0A1931, #D4AF37)
- Contient toutes les informations du formulaire
- Permet de répondre directement au contact (replyTo)

#### D. Réponse au frontend (lignes 218-223)
```javascript
res.json({
  success: true,
  message: 'Demande enregistrée avec succès',
  contactId: savedContact.id,
  emailSent,  // true ou false selon si l'email a été envoyé
});
```

---

## 📍 Où sont dirigées les données ?

### 1. **Sauvegarde locale** ✅
- **Fichier :** `data/contacts.json`
- **Format :** Tableau JSON avec tous les contacts
- **Accès :** Directement dans le projet
- **Utilité :** Archive, backup, analyse

### 2. **Email de notification** ✅ (si SMTP configuré)
- **Destinataire :** `contact@bosssystemsai.com` (configuré dans `.env`)
- **Format :** Email HTML professionnel
- **Contenu :** Toutes les informations du formulaire
- **Utilité :** Notification immédiate de nouvelle demande

### 3. **Réponse au frontend** ✅
- **Format :** JSON avec statut de succès/erreur
- **Utilité :** Confirmation à l'utilisateur

---

## ⚙️ Configuration actuelle

### Variables d'environnement nécessaires (`.env`)

```env
# URL du backend
VITE_API_URL=http://localhost:3001

# Configuration SMTP (Hostinger)
SMTP_HOST=smtp.hostinger.com
SMTP_PORT=465
SMTP_USER=itsmanagement@bosssystemsai.com
SMTP_PASSWORD=votre_mot_de_passe
SMTP_FROM_EMAIL=itsmanagement@bosssystemsai.com
SMTP_TO_EMAIL=contact@bosssystemsai.com

# Port du serveur backend
PORT=3001
```

### Comportement si SMTP non configuré

Si les variables SMTP ne sont pas configurées :
- ✅ Les contacts sont **toujours sauvegardés** dans `data/contacts.json`
- ⚠️ Les emails **ne sont pas envoyés**
- ✅ Le système continue de fonctionner normalement

---

## 🔍 Vérifier les contacts reçus

### Méthode 1 : Fichier JSON
Ouvrez directement : `data/contacts.json`

### Méthode 2 : API (pour développement)
```bash
GET http://localhost:3001/api/contacts
```

Réponse :
```json
{
  "success": true,
  "contacts": [
    {
      "id": "1766506493996",
      "name": "John Doe",
      "email": "john@example.com",
      ...
    }
  ]
}
```

---

## 📊 Statistiques actuelles

D'après le fichier `data/contacts.json`, vous avez actuellement :
- **1 contact** enregistré (test du 23 décembre 2025)

---

## 🚀 Améliorations possibles

Voir le document `AMELIORATIONS_FORMULAIRE.md` pour des suggestions d'amélioration.

