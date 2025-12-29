import React, { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';
import emailjs from '@emailjs/browser';
import { CONTACT_FORM_NEEDS } from '../constants';

const ContactForm: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [searchParams] = useSearchParams();

  // Math Challenge State
  const [mathChallenge, setMathChallenge] = useState({ a: 0, b: 0 });
  const [mathAnswer, setMathAnswer] = useState('');

  // Honeypot State (Hidden field for bots)
  const [honeypot, setHoneypot] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    needs: CONTACT_FORM_NEEDS[0],
    message: '',
    rgpd: false,
    source: 'CONTACT' // 'CONTACT' or 'ORDER'
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Generate Math Challenge on Mount
  useEffect(() => {
    setMathChallenge({
      a: Math.floor(Math.random() * 10) + 1,
      b: Math.floor(Math.random() * 10) + 1
    });
  }, []);

  // Handle URL Params for Package Pre-selection
  useEffect(() => {
    const packParam = searchParams.get('pack');
    if (packParam) {
      // Direct match since constants now use keys like 'starter', 'scaleup', 'elite'
      const exactNeed = CONTACT_FORM_NEEDS.find(n => n === packParam);

      if (exactNeed) {
        // Translate the package name (e.g. 'elite' -> 'Pack Souveraineté')
        const packageName = t(`contact.needs.${exactNeed}`);

        setFormData(prev => ({
          ...prev,
          needs: exactNeed,
          source: 'ORDER', // Tag as Order
          // Use translated package name in the message
          message: prev.message || (i18n.language.startsWith('fr')
            ? `[COMMANDE] Je souhaite commander le ${packageName}.`
            : `[ORDER] I would like to order the ${packageName}.`)
        }));
      }
    }
  }, [searchParams, t, i18n.language]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    // Handle Math Answer separately
    if (name === 'mathAnswer') {
      setMathAnswer(value);
      return;
    }
    // Handle Honeypot separately
    if (name === '_gotcha') {
      setHoneypot(value);
      return;
    }

    const checked = (e.target as HTMLInputElement).checked;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    setError(null);
  };

  // ... (keeping handleSubmit as is, handled by earlier read) 
  // Wait, I can't jump lines. I need to Replace form content logic.
  // The replace tool needs contiguous block. 
  // Lines 41-61 covers useEffect.
  // Lines 338-345 covers dropdown map.
  // I should use MultiReplace or two calls. 
  // I will split this into two calls or use MultiReplace.
  // I'll use separate calls for clarity as they are far apart.
  // This tool call handles useEffect (StartLine 41).


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // 1. Honeypot Check (Silent Fail for Bots)
    if (honeypot !== '') {
      console.warn('Bot detected via honeypot.');
      // Fake success for bots
      setIsSubmitted(true);
      return;
    }

    // 2. Math Challenge Verification
    const expectedAnswer = mathChallenge.a + mathChallenge.b;
    if (parseInt(mathAnswer) !== expectedAnswer) {
      setError(t('contact.form.mathError', 'Réponse incorrecte au calcul.'));
      // Reroll challenge to prevent brute force
      setMathChallenge({
        a: Math.floor(Math.random() * 10) + 1,
        b: Math.floor(Math.random() * 10) + 1
      });
      setMathAnswer('');
      return;
    }

    if (!formData.rgpd) {
      setError(t('contact.form.errorConsent', "Veuillez accepter la politique de confidentialité."));
      return;
    }

    setIsLoading(true);

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const adminTemplateId = import.meta.env.VITE_EMAILJS_ADMIN_TEMPLATE_ID;
    const customerTemplateId = import.meta.env.VITE_EMAILJS_CUSTOMER_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    // Simulation mode logic remains...
    if (!serviceId || !adminTemplateId || !customerTemplateId || !publicKey) {
      console.warn("EmailJS keys are missing. Simulating successful dual submission for testing.");

      // Attempt CSV logging even in simulation mode (for local PHP testing)
      try {
        await fetch('/api/contact.php', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...formData, message: `[SIMULATION] ${formData.message}` }),
        });
      } catch (err) { console.warn('CSV Log failed in simulation:', err); }

      await new Promise(resolve => setTimeout(resolve, 1500));
      setIsSubmitted(true);
      setIsLoading(false);
      return;
    }

    try {
      // Prepare Payload with Logic Tags
      const isOrder = formData.source === 'ORDER';
      const subjectTag = isOrder ? '[COMMANDE]' : '[CONTACT]';
      const finalMessage = `${subjectTag} ${formData.needs}\n\n${formData.message}`;

      // Determine Language
      const lang = i18n.language.startsWith('fr') ? 'fr' : 'en';

      // Dynamic Email Content
      const adminBody = isOrder
        ? (lang === 'fr'
          ? `⚠️ NOUVELLE COMMANDE REÇUE\n\nUne nouvelle demande de package a été enregistrée via le site web.\n\n👤 Nom : ${formData.name}\n🏢 Entreprise : ${formData.company}\n📧 Email : ${formData.email}\n📞 Téléphone : ${formData.phone}\n\n🎯 Package Choisi : ${formData.needs}\n\n📝 Descriptif / Message : "${finalMessage}"\n\n________________________________________\nAction demandée : Valider la commande et envoyer le devis/contrat sous 24h.`
          : `⚠️ NEW ORDER RECEIVED\n\nA new package order has been registered via the website.\n\n👤 Name: ${formData.name}\n🏢 Company: ${formData.company}\n📧 Email: ${formData.email}\n📞 Phone: ${formData.phone}\n\n🎯 Package Chosen: ${formData.needs}\n\n📝 Description / Message: "${finalMessage}"\n\n________________________________________\nAction Required: Validate the order and send the quote/contract within 24h.`)
        : `Hi Boss Systems AI Manager,\n\nUne nouvelle demande de collaboration vient d'arriver via le site web. Voici les détails stratégiques du prospect :\n\n👤 Nom : ${formData.name} 🏢 Entreprise : ${formData.company} 📧 Email : ${formData.email} 📞 Téléphone : ${formData.phone}\n🎯 Besoin Identifié : ${formData.needs}\n📝 Descriptif du projet : "${formData.message}"\n\n________________________________________\nAction demandée : Merci d'analyser cette demande et de répondre sous 24h pour garantir notre standard de service premium.\n\nBest regards, Boss Systems AI - Dashboard Automatisé`;

      const customerBody = isOrder
        ? (lang === 'fr'
          ? `Bonjour ${formData.name},\n\nNous avons bien reçu votre commande pour le pack : "${formData.needs}".\n\n✅ Votre demande a été pré-enregistrée avec succès.\n\nProchaine étape : Un expert va analyser votre dossier et vous contacter sous 24h ouvrées pour valider les détails techniques et administratifs.\n\nSi vous avez des questions urgentes, n'hésitez pas à répondre directement à cet email.\n\nCordialement,\nL'Équipe BOSS SYSTEMS AI`
          : `Hello ${formData.name},\n\nWe have received your order for the package: "${formData.needs}".\n\n✅ Your request has been successfully pre-registered.\n\nNext Step: An expert will analyze your file and contact you within 24 business hours to validate the technical and administrative details.\n\nIf you have any urgent questions, please feel free to reply directly to this email.\n\nBest regards,\nThe BOSS SYSTEMS AI Team`)
        : (lang === 'fr'
          ? `Bonjour ${formData.name},\n\nMerci de nous avoir sollicités pour votre projet concernant : "${formData.needs}".\n\nNous avons bien reçu vos informations et toute l'équipe de BOSS SYSTEMS AI vous remercie de votre confiance. Nous analysons actuellement vos besoins pour vous proposer une approche innovante et parfaitement adaptée à vos enjeux.\n\nÀ quoi s'attendre ? Un de nos experts reviendra vers vous par email ou téléphone d'ici 24 à 48h maximum pour une première consultation stratégique.\n\nEn attendant, n'hésitez pas à redécouvrir nos dernières réalisations sur notre site.\n\nÀ très bientôt pour transformer vos idées en puissance technologique.\n\nBien cordialement,\nL'Équipe BOSS SYSTEMS AI Premium IT Solutions for Visionary Leaders.`
          : `Hello ${formData.name},\n\nThank you for reaching out to us regarding your project: "${formData.needs}".\n\nWe have successfully received your information, and the entire BOSS SYSTEMS AI team thanks you for your trust. We are currently analyzing your needs to propose an innovative approach perfectly adapted to your challenges.\n\nWhat to expect? One of our experts will get back to you via email or phone within 24 to 48 hours maximum for a first strategic consultation.\n\nIn the meantime, feel free to rediscover our latest achievements on our website.\n\nSee you soon to transform your ideas into technological power.\n\nBest regards,\nThe BOSS SYSTEMS AI Team\nPremium IT Solutions for Visionary Leaders.`);

      const dynamicData = {
        name: formData.name,
        email: formData.email,
        company: formData.company,
        phone: formData.phone,
        needs: formData.needs,
        message: finalMessage,

        // We now send the FULL intro/body to the template
        // The template in EmailJS should mostly be {{email_body}} or similar
        admin_subject: isOrder ? (lang === 'fr' ? `[COMMANDE] Nouveau Lead : ${formData.needs}` : `[ORDER] New Lead: ${formData.needs}`) : (lang === 'fr' ? `Nouveau Contact : ${formData.needs}` : `New Contact: ${formData.needs}`),
        email_body_admin: adminBody,

        reply_subject: isOrder ? (lang === 'fr' ? `Validation de votre commande : ${formData.needs}` : `Order Validation: ${formData.needs}`) : (lang === 'fr' ? `Votre projet avec BOSS SYSTEMS AI : ${formData.needs}` : `Your project with BOSS SYSTEMS AI: ${formData.needs}`),
        email_body_customer: customerBody,
      };

      // 1. Send Admin Notification
      await emailjs.send(
        serviceId,
        adminTemplateId,
        dynamicData,
        publicKey
      );

      // 2. Send Customer Confirmation (Auto-reply)
      await emailjs.send(
        serviceId,
        customerTemplateId,
        dynamicData,
        publicKey
      );

      // 3. Save to CSV via PHP
      try {
        await fetch('/api/contact.php', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...formData, message: finalMessage }),
        });
      } catch (phpErr) {
        console.warn('CSV logging is only functional on Hostinger/PHP server:', phpErr);
      }

      setIsSubmitted(true);
      // Reset logic...
      setFormData({
        name: '',
        email: '',
        company: '',
        phone: '',
        needs: CONTACT_FORM_NEEDS[0],
        message: '',
        rgpd: false,
        source: 'CONTACT'
      });
      setMathAnswer(''); // Reset math

    } catch (err) {
      console.error('Erreur lors de l\'envoi:', err);
      setError(t('contact.form.error', 'Une erreur est survenue lors de l\'envoi du message. Veuillez réessayer plus tard.'));
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    if (formData.source === 'ORDER') {
      return (
        <div className="bg-yellow-50 border border-yellow-200 text-[#0A1931] p-8 rounded-lg text-center shadow-lg">
          <div className="mb-4 flex justify-center">
            <svg className="w-16 h-16 text-[#D4AF37]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
          </div>
          <h3 className="text-2xl font-bold mb-4">Commande Pré-enregistrée !</h3>
          <p className="text-lg mb-6">
            Votre demande pour le <span className="font-bold">{formData.needs}</span> a bien été reçue.
            <br /><br />
            <span className="font-bold underline">Action requise :</span> Un email de confirmation vient de vous être envoyé.
            Veuillez vérifier votre boîte réception (et vos spams) pour valider définitivement votre commande.
          </p>
          <button onClick={() => window.location.href = '/'} className="bg-[#0A1931] text-white px-6 py-2 rounded-full hover:bg-slate-800 transition-colors">
            Retour à l'accueil
          </button>
        </div>
      );
    }

    return (
      <div className="bg-green-50 border border-green-200 text-green-800 p-6 rounded-lg text-center">
        <h3 className="text-xl font-bold">{t('contact.form.successTitle', 'Merci !')}</h3>
        <p>{t('contact.form.success', 'Votre message a bien été envoyé. Nous vous recontacterons dans les plus brefs délais.')}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-gray-50 p-8 rounded-lg shadow-md space-y-6 relative">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-800 p-4 rounded-lg">
          {error}
        </div>
      )}

      {/* Honeypot Field - Hidden */}
      <div style={{ display: 'none' }}>
        <input
          type="text"
          name="_gotcha"
          value={honeypot}
          onChange={handleChange}
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      {/* Order Mode Banner - Premium Design */}
      {formData.source === 'ORDER' && (
        <div className="mb-8 relative overflow-hidden rounded-xl bg-[#0A1931] text-white p-6 md:p-8 shadow-2xl border border-[#D4AF37]/30 group">
          {/* Background Effects */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4AF37]/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-blue-500/10 rounded-full blur-xl translate-y-1/2 -translate-x-1/2" />

          <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start gap-6 text-center md:text-left">
            <div className="flex-shrink-0 p-4 bg-white/5 rounded-full border border-[#D4AF37]/50 shadow-[0_0_15px_rgba(212,175,55,0.3)]">
              <svg className="w-8 h-8 text-[#D4AF37]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            </div>

            <div className="flex-grow">
              <span className="text-[#D4AF37] text-xs font-bold uppercase tracking-[0.2em] mb-2 block">
                Offre Sélectionnée
              </span>
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 tracking-tight">
                {t(`contact.needs.${formData.needs}`, formData.needs)}
              </h3>
              <div className="w-12 h-1 bg-[#D4AF37] rounded-full mb-4 mx-auto md:mx-0 opacity-50" />
              <p className="text-gray-300 text-sm leading-relaxed">
                Vous êtes sur le point d'activer un levier de croissance majeur.
                <br className="hidden md:block" />
                Un expert du Haut Commandement validera votre dossier technique sous 24h.
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <input
          type="text"
          name="name"
          placeholder={t('contact.form.name')}
          required
          value={formData.name}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#D4AF37] focus:outline-none"
        />
        <input
          type="email"
          name="email"
          placeholder={t('contact.form.email')}
          required
          value={formData.email}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#D4AF37] focus:outline-none"
        />
        <input
          type="text"
          name="company"
          placeholder={t('contact.form.company')}
          value={formData.company}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#D4AF37] focus:outline-none"
        />
        <input
          type="tel"
          name="phone"
          placeholder={t('contact.form.phone')}
          value={formData.phone}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#D4AF37] focus:outline-none"
        />
      </div>

      {/* Needs Selection - Conditional Rendering */}
      <div>
        <label htmlFor="needs" className="block text-sm font-medium text-gray-700 mb-2">{t('contact.form.need')}</label>
        <select
          name="needs"
          id="needs"
          value={formData.needs}
          onChange={handleChange}
          disabled={formData.source === 'ORDER'} // Lock if Order
          className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-[#D4AF37] focus:outline-none bg-white ${formData.source === 'ORDER' ? 'bg-gray-100 text-gray-500 cursor-not-allowed border-gray-200' : 'border-gray-300'}`}
        >
          {CONTACT_FORM_NEEDS
            .filter(need => {
              // If NOT ORDER mode, exclude packs
              if (formData.source !== 'ORDER') {
                return !['starter', 'scaleup', 'elite'].includes(need);
              }
              return true;
            })
            .map(need => {
              return <option key={need} value={need}>{t(`contact.needs.${need}`, need)}</option>;
            })}
        </select>
      </div>

      <div>
        <textarea
          name="message"
          placeholder={t('contact.form.message')}
          rows={4}
          value={formData.message}
          onChange={handleChange}
          readOnly={formData.source === 'ORDER'} // Read-only if Order
          className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-[#D4AF37] focus:outline-none ${formData.source === 'ORDER' ? 'bg-gray-100 text-gray-500 cursor-not-allowed border-gray-200' : 'border-gray-300'}`}
        ></textarea>
      </div>

      {/* Math Challenge */}
      <div className="bg-white p-4 rounded-lg border border-gray-200">
        <label htmlFor="mathAnswer" className="block text-sm font-bold text-[#0A1931] mb-2">
          {t('contact.form.security', 'Sécurité Anti-Robot')}
        </label>
        <div className="flex items-center gap-4">
          <span className="text-lg font-medium text-gray-700">
            {t('contact.form.mathLabel', `Combien font ${mathChallenge.a} + ${mathChallenge.b} ?`, { a: mathChallenge.a, b: mathChallenge.b })}
          </span>
          <input
            type="number"
            name="mathAnswer"
            id="mathAnswer"
            required
            value={mathAnswer}
            onChange={handleChange}
            className="w-24 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#D4AF37] focus:outline-none text-center font-bold"
          />
        </div>
      </div>

      <div className="flex items-start">
        <input
          type="checkbox"
          name="rgpd"
          id="rgpd"
          checked={formData.rgpd}
          onChange={handleChange}
          className="h-4 w-4 mt-1 text-[#D4AF37] border-gray-300 rounded focus:ring-[#D4AF37]"
        />
        <label htmlFor="rgpd" className="ml-2 block text-sm text-gray-600">
          {t('contact.form.privacy', "J'accepte la politique de confidentialité et que mes données soient utilisées pour me recontacter.")}
        </label>
      </div>
      <div>
        <button
          type="submit"
          disabled={!formData.rgpd || isLoading}
          className="w-full bg-[#D4AF37] text-[#0A1931] font-bold py-3 px-8 rounded-full hover:bg-opacity-90 transition-all duration-300 transform hover:scale-105 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {isLoading ? t('contact.form.sending', 'Envoi en cours...') : (formData.source === 'ORDER' ? 'Valider ma commande' : t('contact.form.submit'))}
        </button>
      </div>
    </form>
  );
};

export default ContactForm;
