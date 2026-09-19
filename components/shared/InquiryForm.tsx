'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { useCurrency } from '@/context/CurrencyContext';
import { chillies } from '@/data/chillies';
import { Mail, Phone, User, Globe, Briefcase, Anchor, Scale, FileText, CheckCircle2, HelpCircle, Send } from 'lucide-react';

const COUNTRY_PORTS: Record<string, string[]> = {
  'United Arab Emirates': ['Jebel Ali', 'Khalifa Port', 'Sharjah'],
  'United States': ['New York / New Jersey', 'Los Angeles', 'Long Beach', 'Houston', 'Savannah'],
  'United Kingdom': ['Felixstowe', 'Southampton', 'London Gateway', 'Liverpool'],
  'Netherlands': ['Rotterdam', 'Amsterdam'],
  'Singapore': ['Port of Singapore'],
  'China': ['Shanghai', 'Shenzhen', 'Ningbo', 'Qingdao'],
  'Malaysia': ['Port Klang', 'Tanjung Pelepas'],
  'Vietnam': ['Ho Chi Minh City', 'Hai Phong'],
  'Sri Lanka': ['Colombo'],
  'Bangladesh': ['Chittagong'],
  'Thailand': ['Laem Chabang'],
  'Germany': ['Hamburg', 'Bremen'],
  'Other': ['Other (Please Specify)']
};

const PHONE_CODES = [
  { code: '+1', label: '+1 (US/CA)' },
  { code: '+44', label: '+44 (UK)' },
  { code: '+91', label: '+91 (IND)' },
  { code: '+971', label: '+971 (UAE)' },
  { code: '+65', label: '+65 (SG)' },
  { code: '+86', label: '+86 (CN)' },
  { code: '+60', label: '+60 (MY)' },
  { code: '+84', label: '+84 (VN)' },
  { code: '+49', label: '+49 (DE)' },
  { code: '+94', label: '+94 (LK)' },
  { code: '+880', label: '+880 (BD)' },
  { code: '+66', label: '+66 (TH)' },
  { code: '+other', label: 'Other' }
];

export default function InquiryForm({ preselectedChilli }: { preselectedChilli?: string }) {
  const { t } = useLanguage();
  const { currency } = useCurrency();

  // Form State
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  
  const [country, setCountry] = useState('United Arab Emirates');
  const [port, setPort] = useState(COUNTRY_PORTS['United Arab Emirates'][0]);
  
  const [email, setEmail] = useState('');
  const [phoneCode, setPhoneCode] = useState('+971');
  const [phone, setPhone] = useState('');
  
  // Product state: maps product name to quantity
  const [selectedProducts, setSelectedProducts] = useState<Record<string, boolean>>({});
  const [quantities, setQuantities] = useState<Record<string, number>>({});

  const [packaging, setPackaging] = useState('20kg Jute Bag');
  const [message, setMessage] = useState('');
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const defaultProduct = preselectedChilli || chillies[0].name;
    setSelectedProducts({ [defaultProduct]: true });
    setQuantities({ [defaultProduct]: 10 });
  }, [preselectedChilli]);

  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newCountry = e.target.value;
    setCountry(newCountry);
    setPort(COUNTRY_PORTS[newCountry][0]);
  };

  const toggleProduct = (productName: string) => {
    setSelectedProducts(prev => {
      const newSel = { ...prev };
      if (newSel[productName]) {
        delete newSel[productName];
      } else {
        newSel[productName] = true;
        if (!quantities[productName]) {
          setQuantities(q => ({ ...q, [productName]: 10 }));
        }
      }
      return newSel;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const activeProducts = Object.keys(selectedProducts).filter(k => selectedProducts[k]);
    if (!name || !email || !company || activeProducts.length === 0) {
      alert('Please fill out all required fields and select at least one product.');
      return;
    }

    setIsSubmitting(true);

    const productSummary = activeProducts.map(p => `${p} (${quantities[p]} MT)`).join(', ');
    const fullPhone = `${phoneCode} ${phone}`;

    const rfqItem = {
      id: 'rfq_' + Math.random().toString(36).substring(7),
      name,
      company,
      country,
      email,
      phone: fullPhone,
      product: productSummary, // Store as combined string for backward compatibility with admin table
      quantity: Object.values(quantities).reduce((a, b) => a + b, 0), // Total quantity
      packaging,
      port,
      message,
      status: 'Pending Verification',
      date: new Date().toISOString()
    };

    try {
      await fetch('/api/rfq', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(rfqItem)
      });
    } catch (err) {
      console.log('API email notice:', err);
    }

    const currentRfqs = JSON.parse(localStorage.getItem('rfqs') || '[]');
    currentRfqs.unshift(rfqItem);
    localStorage.setItem('rfqs', JSON.stringify(currentRfqs));

    setIsSubmitting(false);
    setIsSubmitted(true);
    
    setName('');
    setCompany('');
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
            Your quote request has been recorded. A confirmation email has been dispatched to your email, and our export desk has been alerted.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">


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
          
          <div className="bg-brand-bg dark:bg-brand-dark/50 p-3 rounded-xl border border-gray-200/60 dark:border-gray-800 flex items-start gap-2 text-[11px] text-brand-text/70 dark:text-brand-bg/70 leading-relaxed">
            <HelpCircle className="h-4 w-4 text-brand-primary shrink-0 mt-0.5" />
            <span><strong>First time buying wholesale chillies?</strong> Select your required products and port. We manage customs, testing, and ocean freight!</span>
          </div>

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

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] font-bold uppercase tracking-wider text-brand-text/70 dark:text-brand-bg/70 block mb-1">
                {t('rfq.email')} *
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
                WhatsApp / {t('rfq.phone')}
              </label>
              <div className="flex gap-2">
                <select 
                  value={phoneCode}
                  onChange={(e) => setPhoneCode(e.target.value)}
                  className="w-1/3 bg-brand-bg dark:bg-brand-dark/60 border border-gray-200 dark:border-gray-800 rounded-xl px-2 py-2.5 focus:outline-none text-brand-text dark:text-white font-bold"
                >
                  {PHONE_CODES.map(pc => (
                    <option key={pc.code} value={pc.code}>{pc.label}</option>
                  ))}
                </select>
                <div className="relative flex-1">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input 
                    type="tel" 
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-brand-bg dark:bg-brand-dark/60 pl-9 pr-3 py-2.5 border border-gray-200 dark:border-gray-800 rounded-xl focus:outline-none focus:border-brand-primary text-brand-text dark:text-white"
                    placeholder="Mobile Number"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-b border-gray-100 dark:border-gray-800/80 py-4">
            <div>
              <label className="text-[10px] font-bold uppercase tracking-wider text-brand-text/70 dark:text-brand-bg/70 block mb-1">
                Destination Country *
              </label>
              <div className="relative">
                <Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <select
                  value={country}
                  onChange={handleCountryChange}
                  className="w-full bg-brand-bg dark:bg-brand-dark/60 pl-9 pr-3 py-2.5 border border-gray-200 dark:border-gray-800 rounded-xl focus:outline-none focus:border-brand-primary text-brand-text dark:text-white font-bold"
                >
                  {Object.keys(COUNTRY_PORTS).map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <label className="text-[10px] font-bold uppercase tracking-wider text-brand-text/70 dark:text-brand-bg/70 block mb-1">
                Destination Port *
              </label>
              <div className="relative">
                <Anchor className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <select
                  value={port}
                  onChange={(e) => setPort(e.target.value)}
                  className="w-full bg-brand-bg dark:bg-brand-dark/60 pl-9 pr-3 py-2.5 border border-gray-200 dark:border-gray-800 rounded-xl focus:outline-none focus:border-brand-primary text-brand-text dark:text-white font-bold"
                >
                  {COUNTRY_PORTS[country]?.map(p => (
                    <option key={p} value={p}>{p}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-[10px] font-bold uppercase tracking-wider text-brand-text/70 block mb-1">
              Select Products & Quantities (Metric Tons) *
            </label>
            <div className="bg-brand-bg dark:bg-brand-dark/60 border border-gray-200 dark:border-gray-800 rounded-xl p-3 max-h-48 overflow-y-auto space-y-2 custom-scrollbar">
              {chillies.map(c => (
                <div key={c.id} className="flex items-center justify-between py-1 border-b border-gray-100 dark:border-gray-800/50 last:border-0">
                  <label className="flex items-center gap-3 cursor-pointer flex-1">
                    <input 
                      type="checkbox" 
                      checked={!!selectedProducts[c.name]}
                      onChange={() => toggleProduct(c.name)}
                      className="rounded border-gray-300 text-brand-primary focus:ring-brand-primary w-4 h-4"
                    />
                    <span className="text-xs font-bold text-brand-text dark:text-white">{c.name}</span>
                  </label>
                  {selectedProducts[c.name] && (
                    <div className="flex items-center gap-2 w-1/3 min-w-[100px]">
                       <input 
                         type="number" 
                         min={1}
                         value={quantities[c.name] || 1}
                         onChange={(e) => setQuantities(q => ({...q, [c.name]: Math.max(1, parseInt(e.target.value) || 1)}))}
                         className="w-full bg-white dark:bg-brand-dark px-2 py-1.5 border border-gray-200 dark:border-gray-700 rounded-lg text-xs font-black focus:outline-none focus:border-brand-primary"
                       />
                       <span className="text-[10px] text-brand-text/50 dark:text-brand-bg/50 font-bold uppercase">MT</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
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
                <option value="Custom Packing">Custom (Specify in Message)</option>
              </select>
            </div>
            
            <div>
              <label className="text-[10px] font-bold uppercase tracking-wider text-brand-text/70 dark:text-brand-bg/70 block mb-1">
                {t('rfq.message')}
              </label>
              <div className="relative">
                <FileText className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <textarea 
                  rows={2}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full bg-brand-bg dark:bg-brand-dark/60 pl-9 pr-3 py-2.5 border border-gray-200 dark:border-gray-800 rounded-xl focus:outline-none focus:border-brand-primary text-brand-text dark:text-white leading-relaxed resize-none"
                  placeholder="Custom aflatoxin limits, terms..."
                />
              </div>
            </div>
          </div>

          <button 
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-brand-primary hover:bg-brand-secondary text-white font-extrabold py-3.5 rounded-xl transition-all shadow-lg shadow-brand-primary/10 tracking-widest uppercase text-xs flex items-center justify-center gap-2 mt-4"
          >
            {isSubmitting ? 'Dispatching Notifications...' : t('rfq.submit')} <Send className="h-4 w-4" />
          </button>
        </form>
      )}
    </div>
  );
}
