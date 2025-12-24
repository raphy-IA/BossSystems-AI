import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import { CONTACT_FORM_NEEDS } from '../constants';

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    needs: CONTACT_FORM_NEEDS[0],
    message: '',
    rgpd: false,
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!formData.rgpd) {
      setError("Veuillez accepter la politique de confidentialité.");
      return;
    }

    setIsLoading(true);

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const adminTemplateId = import.meta.env.VITE_EMAILJS_ADMIN_TEMPLATE_ID;
    const customerTemplateId = import.meta.env.VITE_EMAILJS_CUSTOMER_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    // Simulation mode for testing without real keys
    if (!serviceId || !adminTemplateId || !customerTemplateId || !publicKey) {
      console.warn("EmailJS keys are missing. Simulating successful dual submission for testing.");
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate network delay
      setIsSubmitted(true);
      setIsLoading(false);
      return;
    }

    try {
      // 1. Send Admin Notification
      const adminRes = await emailjs.send(
        serviceId,
        adminTemplateId,
        {
          name: formData.name,
          email: formData.email,
          company: formData.company,
          phone: formData.phone,
          needs: formData.needs,
          message: formData.message,
        },
        publicKey
      );
      console.log('EmailJS Admin Result:', adminRes.status, adminRes.text);

      // 2. Send Customer Confirmation (Auto-reply)
      const customerRes = await emailjs.send(
        serviceId,
        customerTemplateId,
        {
          name: formData.name,
          email: formData.email,
          needs: formData.needs,
        },
        publicKey
      );
      console.log('EmailJS Customer Result:', customerRes.status, customerRes.text);

      // 3. Save to CSV via PHP
      try {
        const phpRes = await fetch('/api/contact.php', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
        const phpData = await phpRes.json();
        console.log('PHP CSV Result:', phpData);
      } catch (phpErr) {
        console.warn('CSV logging is only functional on Hostinger/PHP server:', phpErr);
      }

      setIsSubmitted(true);
      setFormData({
        name: '',
        email: '',
        company: '',
        phone: '',
        needs: CONTACT_FORM_NEEDS[0],
        message: '',
        rgpd: false,
      });

    } catch (err) {
      console.error('Erreur lors de l\'envoi:', err);
      setError('Une erreur est survenue lors de l\'envoi du message. Veuillez réessayer plus tard.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="bg-green-50 border border-green-200 text-green-800 p-6 rounded-lg text-center">
        <h3 className="text-xl font-bold">Merci !</h3>
        <p>Votre message a bien été envoyé. Nous vous recontacterons dans les plus brefs délais.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-gray-50 p-8 rounded-lg shadow-md space-y-6">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-800 p-4 rounded-lg">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <input
          type="text"
          name="name"
          placeholder="Nom complet"
          required
          value={formData.name}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#D4AF37] focus:outline-none"
        />
        <input
          type="email"
          name="email"
          placeholder="Email professionnel"
          required
          value={formData.email}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#D4AF37] focus:outline-none"
        />
        <input
          type="text"
          name="company"
          placeholder="Entreprise"
          value={formData.company}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#D4AF37] focus:outline-none"
        />
        <input
          type="tel"
          name="phone"
          placeholder="Téléphone"
          value={formData.phone}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#D4AF37] focus:outline-none"
        />
      </div>
      <div>
        <label htmlFor="needs" className="block text-sm font-medium text-gray-700 mb-2">Mon besoin concerne :</label>
        <select
          name="needs"
          id="needs"
          value={formData.needs}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#D4AF37] focus:outline-none bg-white"
        >
          {CONTACT_FORM_NEEDS.map(need => (
            <option key={need} value={need}>{need}</option>
          ))}
        </select>
      </div>
      <div>
        <textarea
          name="message"
          placeholder="Votre message (optionnel)"
          rows={4}
          value={formData.message}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#D4AF37] focus:outline-none"
        ></textarea>
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
          J'accepte la politique de confidentialité et que mes données soient utilisées pour me recontacter.
        </label>
      </div>
      <div>
        <button
          type="submit"
          disabled={!formData.rgpd || isLoading}
          className="w-full bg-[#D4AF37] text-[#0A1931] font-bold py-3 px-8 rounded-full hover:bg-opacity-90 transition-all duration-300 transform hover:scale-105 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Envoi en cours...' : 'Envoyer la demande'}
        </button>
      </div>
    </form>
  );
};

export default ContactForm;
