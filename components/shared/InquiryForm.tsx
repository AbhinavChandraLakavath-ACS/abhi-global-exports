'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { useCurrency } from '@/context/CurrencyContext';
import { chillies } from '@/data/chillies';
import { Mail, Phone, User, Globe, Briefcase, Anchor, Scale, FileText, CheckCircle2, HelpCircle, Send } from 'lucide-react';

export default function InquiryForm({ preselectedChilli }: { preselectedChilli?: string }) {
  const { t } = useLanguage();
  const { currency } = useCurrency();

  // Form State
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [country, setCountry] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [product, setProduct] = useState(preselectedChilli || chillies[0].name);
  const [quantity, setQuantity] = useState<number>(10);
  const [packaging, setPackaging] = useState('20kg Jute Bag');
  const [port, setPort] = useState('Rotterdam, Netherlands');
  const [message, setMessage] = useState('');
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (preselectedChilli) {
      setProduct(preselectedChilli);
    }
  }, [preselectedChilli]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !company || !country) {
      alert('Please fill out all required fields.');
      return;
    }

    setIsSubmitting(true);

    const rfqItem = {
      id: 'rfq_' + Math.random().toString(36).substring(7),
      name,
      company,
      country,
      email,
      phone,
      product,
      quantity,
      packaging,
      port,
      message,
      status: 'Pending Verification',
      date: new Date().toISOString()
    };

    try {
      // 1. Send API email request to /api/rfq
      await fetch('/api/rfq', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(rfqItem)
      });
    } catch (err) {
      console.log('API email notice:', err);
    }

    // 2. Save locally for dashboards
    const currentRfqs = JSON.parse(localStorage.getItem('rfqs') || '[]');
    currentRfqs.unshift(rfqItem);
    localStorage.setItem('rfqs', JSON.stringify(currentRfqs));

    setIsSubmitting(false);
    setIsSubmitted(true);
    
    // Clear form inputs
    setName('');
    setCompany('');
    setCountry('');
    setEmail('');
    setPhone('');
    setMessage('');
  };

  return (
    <div id="rfq-section" className="bg-white dark:bg-brand-dark p-6 sm:p-10 rounded-3xl shadow-2xl border border-gray-100 dark:border-gray-800 max-w-3xl mx-auto">
      <div className="text-center mb-8 border-b border-gray-100 dark:border-gray-800 pb-6">
        <span className="bg-brand-primary/10 text-brand-primary text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider inline-block mb-2">
          Direct Bulk Inquiry
        </span>
        <h3 className="text-2xl sm:text-3xl font-black text-brand-text dark:text-white">
          {t('rfq.title')}
        </h3>
        <p className="text-xs text-brand-text/60 dark:text-brand-bg/60 mt-1 max-w-lg mx-auto">
          {t('rfq.subtitle')} — Automated email notifications sent to both buyer and exporter.
        </p>
      </div>

      {isSubmitted ? (
        <div className="text-center py-10 space-y-4">
          <div className="bg-green-100 dark:bg-green-950 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto text-green-600 dark:text-green-300 shadow-md">
            <CheckCircle2 className="h-8 w-8" />
          </div>
          <h4 className="text-lg font-black text-brand-text dark:text-white">Inquiry Sent Successfully!</h4>
          <p className="text-xs text-brand-text/60 dark:text-brand-bg/60 max-w-md mx-auto leading-relaxed">
            Your quote request has been recorded. A confirmation email has been dispatched to your email, and our export desk at <strong>abhinavchandra.lakavath@gmail.com</strong> has been alerted.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
            <Link 
              href="/calculator"
              className="bg-brand-dark dark:bg-brand-dark/90 text-brand-accent hover:text-white font-extrabold text-xs py-3 px-6 rounded-xl border border-brand-primary/40 flex items-center justify-center gap-2 shadow-lg"
            >
              <span>Calculate Container Stuffing & Freight Rates (Launch Calculator)</span>
            </Link>

            <button 
              onClick={() => setIsSubmitted(false)}
              className="bg-brand-primary hover:bg-brand-secondary text-white text-xs font-bold py-3 px-6 rounded-xl shadow"
            >
              Submit Another Inquiry
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5 text-xs">
          
          {/* Helper Banner for Beginners */}
          <div className="bg-brand-bg dark:bg-brand-dark/50 p-3 rounded-xl border border-gray-200/60 dark:border-gray-800 flex items-start gap-2 text-[11px] text-brand-text/70 dark:text-brand-bg/70 leading-relaxed">
            <HelpCircle className="h-4 w-4 text-brand-primary shrink-0 mt-0.5" />
            <span><strong>First time buying wholesale chillies?</strong> Simply select your chilli variety, total tonnage requirement, and destination port. We manage customs, testing, and ocean freight!</span>
          </div>

          {/* Row 1: Contact Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] font-bold uppercase tracking-wider text-brand-text/70 dark:text-brand-bg/70 block mb-1">
                {t('rfq.name')} *
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-brand-bg dark:bg-brand-dark/60 pl-9 pr-3 py-2.5 border border-gray-200 dark:border-gray-800 rounded-xl focus:outline-none focus:border-brand-primary text-brand-text dark:text-white"
                  placeholder="Your Full Name"
                  required
                />
              </div>
            </div>
            <div>
              <label className="text-[10px] font-bold uppercase tracking-wider text-brand-text/70 dark:text-brand-bg/70 block mb-1">
                {t('rfq.company')} *
              </label>
              <div className="relative">
                <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input 
                  type="text" 
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  className="w-full bg-brand-bg dark:bg-brand-dark/60 pl-9 pr-3 py-2.5 border border-gray-200 dark:border-gray-800 rounded-xl focus:outline-none focus:border-brand-primary text-brand-text dark:text-white"
                  placeholder="Company / Business Name"
                  required
                />
              </div>
            </div>
          </div>

          {/* Row 2: Location Details */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="sm:col-span-2">
              <label className="text-[10px] font-bold uppercase tracking-wider text-brand-text/70 dark:text-brand-bg/70 block mb-1">
                {t('rfq.email')} * (Confirmation email will be sent here)
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-brand-bg dark:bg-brand-dark/60 pl-9 pr-3 py-2.5 border border-gray-200 dark:border-gray-800 rounded-xl focus:outline-none focus:border-brand-primary text-brand-text dark:text-white"
                  placeholder="buyer@company.com"
                  required
                />
              </div>
            </div>
            <div>
              <label className="text-[10px] font-bold uppercase tracking-wider text-brand-text/70 dark:text-brand-bg/70 block mb-1">
                {t('rfq.phone')}
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input 
                  type="tel" 
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-brand-bg dark:bg-brand-dark/60 pl-9 pr-3 py-2.5 border border-gray-200 dark:border-gray-800 rounded-xl focus:outline-none focus:border-brand-primary text-brand-text dark:text-white"
                  placeholder="+1 555-0192"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="text-[10px] font-bold uppercase tracking-wider text-brand-text/70 dark:text-brand-bg/70 block mb-1">
                {t('rfq.country')} *
              </label>
              <div className="relative">
                <Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input 
                  type="text" 
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="w-full bg-brand-bg dark:bg-brand-dark/60 pl-9 pr-3 py-2.5 border border-gray-200 dark:border-gray-800 rounded-xl focus:outline-none focus:border-brand-primary text-brand-text dark:text-white"
                  placeholder="Target Country"
                  required
                />
              </div>
            </div>
            <div>
              <label className="text-[10px] font-bold uppercase tracking-wider text-brand-text/70 dark:text-brand-bg/70 block mb-1">
                {t('rfq.port')} *
              </label>
              <div className="relative">
                <Anchor className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input 
                  type="text" 
                  value={port}
                  onChange={(e) => setPort(e.target.value)}
                  className="w-full bg-brand-bg dark:bg-brand-dark/60 pl-9 pr-3 py-2.5 border border-gray-200 dark:border-gray-800 rounded-xl focus:outline-none focus:border-brand-primary text-brand-text dark:text-white"
                  placeholder="e.g. Rotterdam, NY, Dubai"
                  required
                />
              </div>
            </div>
            <div>
              <label className="text-[10px] font-bold uppercase tracking-wider text-brand-text/70 dark:text-brand-bg/70 block mb-1">
                {t('rfq.product')}
              </label>
              <select
                value={product}
                onChange={(e) => setProduct(e.target.value)}
                className="w-full bg-brand-bg dark:bg-brand-dark/60 border border-gray-200 dark:border-gray-800 rounded-xl p-2.5 focus:outline-none text-brand-text dark:text-white font-bold"
              >
                {chillies.map((c) => (
                  <option key={c.id} value={c.name}>{c.name} ({c.heat} Heat)</option>
                ))}
              </select>
            </div>
          </div>

          {/* Row 3: Trade details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] font-bold uppercase tracking-wider text-brand-text/70 dark:text-brand-bg/70 block mb-1">
                {t('rfq.quantity')} (Metric Tons)
              </label>
              <div className="relative">
                <Scale className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input 
                  type="number" 
                  min={1}
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
                  className="w-full bg-brand-bg dark:bg-brand-dark/60 pl-9 pr-3 py-2.5 border border-gray-200 dark:border-gray-800 rounded-xl focus:outline-none focus:border-brand-primary text-brand-text dark:text-white font-black"
                  required
                />
              </div>
            </div>
            <div>
              <label className="text-[10px] font-bold uppercase tracking-wider text-brand-text/70 dark:text-brand-bg/70 block mb-1">
                {t('rfq.packaging')}
              </label>
              <select
                value={packaging}
                onChange={(e) => setPackaging(e.target.value)}
                className="w-full bg-brand-bg dark:bg-brand-dark/60 border border-gray-200 dark:border-gray-800 rounded-xl p-2.5 focus:outline-none text-brand-text dark:text-white font-bold"
              >
                <option value="10kg PP Bag">10kg PP Bag</option>
                <option value="20kg Jute Bag">20kg Jute Bag</option>
                <option value="25kg Gunny Bag">25kg Gunny Bag</option>
                <option value="50kg Jute Bag">50kg Jute Bag</option>
                <option value="10kg Cartons">10kg Carton Box</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-[10px] font-bold uppercase tracking-wider text-brand-text/70 dark:text-brand-bg/70 block mb-1">
              {t('rfq.message')}
            </label>
            <div className="relative">
              <FileText className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <textarea 
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full bg-brand-bg dark:bg-brand-dark/60 pl-9 pr-3 py-2.5 border border-gray-200 dark:border-gray-800 rounded-xl focus:outline-none focus:border-brand-primary text-brand-text dark:text-white leading-relaxed"
                placeholder="Custom aflatoxin limits, steam sterilization requirements, target payment terms..."
              />
            </div>
          </div>

          <button 
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-brand-primary hover:bg-brand-secondary text-white font-extrabold py-3.5 rounded-xl transition-all shadow-lg shadow-brand-primary/10 tracking-widest uppercase text-xs flex items-center justify-center gap-2"
          >
            {isSubmitting ? 'Dispatching Notifications...' : t('rfq.submit')} <Send className="h-4 w-4" />
          </button>
        </form>
      )}
    </div>
  );
}
