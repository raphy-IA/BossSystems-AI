// Script de test SMTP - Teste les deux ports (465 et 587)
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Charger les variables d'environnement
dotenv.config({ path: path.join(__dirname, '.env') });

const { SMTP_HOST, SMTP_USER, SMTP_PASSWORD, SMTP_TO_EMAIL } = process.env;

console.log('\n🔍 Test SMTP avec les deux ports Hostinger (465 et 587)\n');
console.log('Configuration:');
console.log(`  Host: ${SMTP_HOST || '❌ MANQUANT'}`);
console.log(`  User: ${SMTP_USER || '❌ MANQUANT'}`);
console.log(`  Password: ${SMTP_PASSWORD ? '✅ (configuré)' : '❌ MANQUANT'}`);
console.log(`  From: ${SMTP_USER || '❌ MANQUANT'} (même que user selon Hostinger)`);
console.log('');

if (!SMTP_HOST || !SMTP_USER || !SMTP_PASSWORD) {
  console.error('❌ Configuration incomplète. Vérifiez votre fichier .env');
  process.exit(1);
}

// Fonction pour tester une configuration
function testConfig(port, description) {
  return new Promise((resolve) => {
    const isSecure = port === 465;
    
    console.log(`\n🧪 Test: ${description}`);
    console.log(`   Port: ${port}`);
    console.log(`   Sécurité: ${isSecure ? 'SSL/TLS (secure: true)' : 'STARTTLS (secure: false + requireTLS: true)'}`);
    
    const transporterConfig = {
      host: SMTP_HOST,
      port: port,
      secure: isSecure,
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASSWORD,
      },
    };

    if (port === 587) {
      transporterConfig.secure = false;
      transporterConfig.requireTLS = true;
    }

    const transporter = nodemailer.createTransport(transporterConfig);

    transporter.verify(function (error, success) {
      if (error) {
        console.log(`   ❌ Échec: ${error.code} - ${error.message.substring(0, 60)}...`);
        resolve({ success: false, error, port, description });
      } else {
        console.log(`   ✅ Succès ! Connexion établie`);
        resolve({ success: true, transporter, port, description });
      }
    });
  });
}

// Tester les deux ports
async function testBothPorts() {
  const results = [];
  
  // Test port 465 (SSL/TLS) - Recommandé par Hostinger
  results.push(await testConfig(465, 'Port 465 avec SSL/TLS (recommandé)'));
  
  // Test port 587 (STARTTLS)
  results.push(await testConfig(587, 'Port 587 avec STARTTLS'));
  
  // Trouver la configuration qui fonctionne
  const workingConfig = results.find(r => r.success);
  
  if (!workingConfig) {
    console.error('\n❌ Aucune configuration n\'a fonctionné.');
    console.error('\n💡 Informations importantes:');
    console.error('   Vous avez dit que le webmail fonctionne, donc le mot de passe est correct.');
    console.error('   Le problème vient probablement de:');
    console.error('   1. Hostinger nécessite un "mot de passe d\'application" pour SMTP');
    console.error('   2. Il y a des restrictions de sécurité à activer dans Hostinger');
    console.error('   3. L\'accès SMTP n\'est pas activé pour cet email');
    console.error('\n🔧 Solutions:');
    console.error('   1. Dans Hostinger, cherchez "Mots de passe d\'application" ou "App Passwords"');
    console.error('   2. Créez un mot de passe d\'application et utilisez-le dans .env');
    console.error('   3. Vérifiez les paramètres de sécurité email dans Hostinger');
    console.error('   4. Contactez le support Hostinger pour activer SMTP');
    process.exit(1);
  }
  
  console.log(`\n🎉 Configuration qui fonctionne: ${workingConfig.description}`);
  console.log(`   Port: ${workingConfig.port}`);
  
  // Tester l'envoi d'email avec la configuration qui fonctionne
  console.log('\n📧 Test d\'envoi d\'email avec la configuration qui fonctionne...\n');
  
  const testEmail = SMTP_TO_EMAIL || SMTP_USER;
  const mailOptions = {
    from: SMTP_USER, // Format simple selon Hostinger
    to: testEmail,
    subject: 'Test SMTP - BOSS SYSTEMS AI',
    text: `Ceci est un email de test envoyé depuis le serveur.

Configuration utilisée:
- Host: ${SMTP_HOST}
- Port: ${workingConfig.port}
- Sécurité: ${workingConfig.port === 465 ? 'SSL/TLS' : 'STARTTLS'}
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
            <li><strong>Port:</strong> ${workingConfig.port}</li>
            <li><strong>Sécurité:</strong> ${workingConfig.port === 465 ? 'SSL/TLS' : 'STARTTLS'}</li>
            <li><strong>From:</strong> ${SMTP_USER}</li>
          </ul>
        </div>
        <p style="color: #0A1931; font-weight: bold;">Si vous recevez ce message, SMTP fonctionne correctement ! 🎉</p>
      </div>
    `,
  };

  workingConfig.transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.error('❌ Erreur lors de l\'envoi de l\'email:');
      console.error(`   ${error.message}`);
      process.exit(1);
    } else {
      console.log('✅ Email de test envoyé avec succès !');
      console.log(`   Message ID: ${info.messageId}`);
      console.log(`   De: ${mailOptions.from}`);
      console.log(`   À: ${mailOptions.to}`);
      console.log(`   Sujet: ${mailOptions.subject}`);
      console.log('\n📬 Vérifiez votre boîte email pour confirmer la réception.');
      console.log('   (Vérifiez aussi les spams/courriers indésirables)');
      console.log(`\n💡 Mettez à jour votre .env avec: SMTP_PORT=${workingConfig.port}`);
      console.log('\n🎉 Si vous recevez l\'email, SMTP est correctement configuré !');
      process.exit(0);
    }
  });
}

// Exécuter les tests
testBothPorts();

