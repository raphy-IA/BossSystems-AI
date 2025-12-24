# 🔧 Guide Spécifique : Configuration SMTP Hostinger

## ✅ Diagnostic

**Situation :**
- ✅ Le webmail Hostinger fonctionne (vous pouvez vous connecter et envoyer des emails)
- ❌ SMTP ne fonctionne pas (erreur `535 5.7.8 Error: authentication failed`)

**Conclusion :** Le mot de passe est correct, mais Hostinger nécessite probablement une **configuration spéciale pour SMTP**.

---

## 🔍 Solutions à essayer (dans l'ordre)

### Solution 1 : Vérifier les paramètres SMTP dans Hostinger

**Étapes :**

1. **Connectez-vous à votre compte Hostinger**
2. **Allez dans "Email" → "Gestion des emails"**
3. **Sélectionnez l'email `itsmanagement@bosssystemsai.com`**
4. **Cherchez les paramètres SMTP** ou **"Configuration email"**
5. **Notez les paramètres exacts affichés** :
   - Serveur SMTP
   - Port SMTP
   - Méthode d'authentification
   - Paramètres de sécurité

**Les paramètres peuvent être différents de ceux que nous utilisons !**

---

### Solution 2 : Créer un "Mot de passe d'application"

**Hostinger peut nécessiter un mot de passe d'application pour SMTP.**

**Étapes :**

1. **Dans Hostinger, allez dans "Email" → "Gestion des emails"**
2. **Sélectionnez l'email `itsmanagement@bosssystemsai.com`**
3. **Cherchez :**
   - "Mots de passe d'application"
   - "App Passwords"
   - "SMTP Password"
   - "Mot de passe SMTP"
4. **Si vous trouvez cette option :**
   - Créez un nouveau mot de passe d'application
   - **Utilisez ce mot de passe dans `.env`** au lieu du mot de passe principal

**Mise à jour dans `.env` :**
```env
SMTP_PASSWORD=le_mot_de_passe_d_application_ici
```

---

### Solution 3 : Vérifier les restrictions de sécurité

**Hostinger peut bloquer les connexions SMTP depuis certaines IP ou nécessiter une activation.**

**Étapes :**

1. **Dans Hostinger, cherchez :**
   - "Sécurité email"
   - "Paramètres SMTP"
   - "Restrictions SMTP"
2. **Vérifiez s'il y a :**
   - Restrictions d'IP
   - Nécessité d'activer SMTP
   - Paramètres de sécurité à activer

---

### Solution 4 : Contacter le support Hostinger

**Si rien ne fonctionne, contactez le support Hostinger et demandez :**

1. **Les paramètres SMTP exacts** pour votre compte
2. **Si un mot de passe d'application est nécessaire**
3. **S'il y a des restrictions à activer**

**Questions à poser :**
- "Quels sont les paramètres SMTP exacts pour mon email `itsmanagement@bosssystemsai.com` ?"
- "Dois-je utiliser un mot de passe d'application pour SMTP ?"
- "Y a-t-il des restrictions de sécurité à activer ?"

---

### Solution 5 : Tester avec un client email

**Pour vérifier que SMTP fonctionne avec les bons paramètres :**

1. **Configurez Outlook ou Thunderbird** avec :
   - Serveur SMTP : `smtp.hostinger.com`
   - Port : `465` ou `587`
   - Email : `itsmanagement@bosssystemsai.com`
   - Mot de passe : celui que vous utilisez

2. **Si ça fonctionne dans Outlook/Thunderbird :**
   - Les paramètres sont corrects
   - Le problème vient peut-être de la configuration dans le code

3. **Si ça ne fonctionne pas non plus :**
   - Le problème vient des paramètres Hostinger
   - Il faut chercher un mot de passe d'application

---

## 📋 Paramètres SMTP Hostinger standards

**Selon la documentation Hostinger :**

- **Serveur SMTP :** `smtp.hostinger.com`
- **Port SSL :** `465`
- **Port STARTTLS :** `587`
- **Sécurité :** SSL/TLS
- **Authentification :** Requise

**Mais ces paramètres peuvent varier selon votre plan Hostinger !**

---

## 🔧 Alternative : Utiliser un service d'email tiers

**Si Hostinger continue de poser problème, je recommande d'utiliser un service d'email dédié :**

### Option recommandée : Resend

- ✅ Gratuit jusqu'à 3000 emails/mois
- ✅ Configuration en 2 minutes
- ✅ Plus fiable que SMTP Hostinger
- ✅ Meilleure délivrabilité

**Je peux configurer Resend pour vous en 10 minutes !**

Voir `SOLUTION_ALTERNATIVE_EMAIL.md` pour plus de détails.

---

## 📝 Checklist

- [ ] J'ai vérifié les paramètres SMTP dans le panneau Hostinger
- [ ] J'ai cherché "Mots de passe d'application" dans Hostinger
- [ ] J'ai testé SMTP avec un client email (Outlook/Thunderbird)
- [ ] J'ai contacté le support Hostinger si nécessaire
- [ ] J'ai envisagé d'utiliser un service d'email tiers (Resend)

---

## 🎯 Prochaines étapes

1. **Vérifiez les paramètres SMTP dans Hostinger** (Solution 1)
2. **Cherchez un "mot de passe d'application"** (Solution 2)
3. **Si rien ne fonctionne, contactez le support Hostinger** (Solution 4)
4. **Ou passez à Resend** (Solution alternative - je peux configurer)

**Dites-moi ce que vous trouvez dans Hostinger et je vous aiderai à configurer !** 🔧

