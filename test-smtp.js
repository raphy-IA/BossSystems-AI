// Script de test SMTP avec configuration Hostinger exacte
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Charger les variables d'environnement
dotenv.config({ path: path.join(__dirname, '.env') });

const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASSWORD, SMTP_FROM_EMAIL, SMTP_TO_EMAIL } = process.env;

console.log('\n🔍 Test de connexion SMTP avec configuration Hostinger\n');
console.log('Configuration:');
console.log(`  Host: ${SMTP_HOST || '❌ MANQUANT'}`);
console.log(`  Port: ${SMTP_PORT || '❌ MANQUANT'}`);
console.log(`  User: ${SMTP_USER || '❌ MANQUANT'}`);
console.log(`  Password: ${SMTP_PASSWORD ? '✅ (configuré)' : '❌ MANQUANT'}`);
console.log(`  From: ${SMTP_USER || '❌ MANQUANT'} (même que user selon Hostinger)`);
console.log(`  To: ${SMTP_TO_EMAIL || SMTP_USER || '❌ MANQUANT'}`);
console.log('');

if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASSWORD) {
  console.error('❌ Configuration incomplète. Vérifiez votre fichier .env');
  process.exit(1);
}

const port = parseInt(SMTP_PORT, 10);

// Configuration exacte selon les instructions Hostinger
// Port 465 → secure: true (SSL/TLS)
// Port 587 → secure: false + STARTTLS activé
const isSecure = port === 465;

console.log(`📧 Configuration selon Hostinger:`);
console.log(`   Port: ${port}`);
console.log(`   Sécurité: ${isSecure ? 'SSL/TLS (secure: true)' : 'STARTTLS (secure: false + requireTLS: true)'}`);
console.log(`   From: ${SMTP_USER} (même adresse que user)\n`);

// Configuration du transporteur selon les instructions Hostinger
const transporterConfig = {
  host: SMTP_HOST,
  port: port,
  secure: isSecure, // true pour 465, false pour 587
  auth: {
    user: SMTP_USER,
    pass: SMTP_PASSWORD,
  },
};

// Pour le port 587, activer STARTTLS selon les instructions Hostinger
if (port === 587) {
  transporterConfig.secure = false;
  transporterConfig.requireTLS = true; // STARTTLS activé
}

const transporter = nodemailer.createTransport(transporterConfig);

// Test de connexion
console.log('🧪 Test 1: Vérification de la connexion SMTP...\n');
transporter.verify(function (error, success) {
  if (error) {
    console.error('❌ Erreur de connexion SMTP:');
    console.error(`   Code: ${error.code}`);
    console.error(`   Message: ${error.message}`);
    if (error.response) {
      console.error(`   Response: ${error.response}`);
    }
    console.error('\n💡 Vérifications:');
    console.error('   1. Vérifiez que le mot de passe est correct');
    console.error('   2. Vérifiez que le port est correct (465 ou 587)');
    console.error('   3. Vérifiez les paramètres dans Hostinger');
    process.exit(1);
  } else {
    console.log('✅ Connexion SMTP réussie !\n');
    
    // Test d'envoi d'email
    console.log('🧪 Test 2: Envoi d\'un email de test...\n');
    
    const testEmail = SMTP_TO_EMAIL || SMTP_USER;
    const mailOptions = {
      from: SMTP_USER, // Format simple selon Hostinger (même adresse que user)
      to: testEmail,
      subject: 'Test SMTP - BOSS SYSTEMS AI',
      text: `Ceci est un email de test envoyé depuis le serveur.

Configuration utilisée:
- Host: ${SMTP_HOST}
- Port: ${port}
- Sécurité: ${isSecure ? 'SSL/TLS' : 'STARTTLS'}
- From: ${SMTP_USER}

Si vous recevez ce message, SMTP fonctionne correctement ! 🎉`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #0A1931;">✅ Test SMTP réussi !</h2>
          <p>Ceci est un email de test envoyé depuis le serveur.</p>
          <div style="background-color: #f9f9f9; padding: 15px; margin: 20px 0; border-left: 4px solid #D4AF37;">
            <h3 style="color: #0A1931; margin-top: 0;">Configuration utilisée:</h3>
            <ul>
              <li><strong>Host:</strong> ${SMTP_HOST}</li>
              <li><strong>Port:</strong> ${port}</li>
              <li><strong>Sécurité:</strong> ${isSecure ? 'SSL/TLS' : 'STARTTLS'}</li>
              <li><strong>From:</strong> ${SMTP_USER}</li>
            </ul>
          </div>
          <p style="color: #0A1931; font-weight: bold;">Si vous recevez ce message, SMTP fonctionne correctement ! 🎉</p>
        </div>
      `,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.error('❌ Erreur lors de l\'envoi de l\'email:');
        console.error(`   Code: ${error.code}`);
        console.error(`   Message: ${error.message}`);
        if (error.response) {
          console.error(`   Response: ${error.response}`);
        }
        process.exit(1);
      } else {
        console.log('✅ Email de test envoyé avec succès !');
        console.log(`   Message ID: ${info.messageId}`);
        console.log(`   De: ${mailOptions.from}`);
        console.log(`   À: ${mailOptions.to}`);
        console.log(`   Sujet: ${mailOptions.subject}`);
        console.log('\n📬 Vérifiez votre boîte email pour confirmer la réception.');
        console.log('   (Vérifiez aussi les spams/courriers indésirables)');
        console.log('\n🎉 Si vous recevez l\'email, SMTP est correctement configuré !');
        process.exit(0);
      }
    });
  }
});
