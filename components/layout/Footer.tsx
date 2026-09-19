'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { chillies } from '@/data/chillies';
import { 
  Flame, Mail, MapPin, Phone, Send, ShieldCheck, Award, Globe 
} from 'lucide-react';

export default function Footer() {
  const { t } = useLanguage();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    // Simulate API registration
    const subscriptions = JSON.parse(localStorage.getItem('newsletter_subs') || '[]');
    subscriptions.push({ email, date: new Date().toISOString() });
    localStorage.setItem('newsletter_subs', JSON.stringify(subscriptions));
    
    setSubscribed(true);
    setEmail('');
  };

  return (
    <footer className="bg-brand-dark text-white border-t border-gray-800 pt-8 pb-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand Info */}
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4 group">
              <span className="font-extrabold text-lg tracking-wider text-white">
                ABHI <span className="text-brand-accent font-light">GLOBAL EXPORTS</span>
              </span>
            </Link>
            <p className="text-xs text-gray-400 leading-relaxed mb-6">
              {t('footer.desc')}
            </p>
            
            {/* Certifications Quick Badges */}
            <div className="flex flex-wrap gap-2 mb-6">
              {['APEDA', 'SPICE BOARD', 'HACCP', 'ISO 22000', 'HALAL', 'KOSHER'].map((cert) => (
                <span 
                  key={cert} 
                  className="bg-brand-primary/10 border border-brand-primary/20 text-brand-accent text-[9px] font-bold px-2 py-0.5 rounded uppercase tracking-wider"
                >
                  {cert}
                </span>
              ))}
            </div>


          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-extrabold text-sm uppercase tracking-widest text-brand-accent border-b border-gray-800 pb-2 mb-4">
              Quick Links
            </h3>
            <ul className="flex flex-col gap-2.5 text-xs text-gray-400">
              <li>
                <Link href="/" className="hover:text-brand-accent hover:translate-x-1 transition-all duration-200 inline-block">
                  {t('nav.home')}
                </Link>
              </li>
              <li>
                <Link href="/products" className="hover:text-brand-accent hover:translate-x-1 transition-all duration-200 inline-block">
                  {t('nav.products')}
                </Link>
              </li>
              <li>
                <Link href="/export-destinations" className="hover:text-brand-accent hover:translate-x-1 transition-all duration-200 inline-block">
                  {t('nav.exportCountries')}
                </Link>
              </li>
              <li>
                <Link href="/processing-plant" className="hover:text-brand-accent hover:translate-x-1 transition-all duration-200 inline-block">
                  {t('nav.plant')}
                </Link>
              </li>
              <li>
                <Link href="/certifications" className="hover:text-brand-accent hover:translate-x-1 transition-all duration-200 inline-block">
                  {t('nav.certifications')}
                </Link>
              </li>

            </ul>
          </div>

          {/* Popular Varieties */}
          <div>
            <h3 className="font-extrabold text-sm uppercase tracking-widest text-brand-accent border-b border-gray-800 pb-2 mb-4">
              Premium Chillies
            </h3>
            <ul className="flex flex-col gap-2.5 text-xs text-gray-400">
              {chillies.slice(0, 6).map((c) => (
                <li key={c.id}>
                  <Link 
                    href={`/products/${c.slug}`} 
                    className="hover:text-brand-accent hover:translate-x-1 transition-all duration-200 inline-block"
                  >
                    {c.name} (SHU: {c.shu})
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details & Newsletter */}
          <div>
            <h3 className="font-extrabold text-sm uppercase tracking-widest text-brand-accent border-b border-gray-800 pb-2 mb-4">
              B2B Newsletter
            </h3>
            <p className="text-xs text-gray-400 mb-4 leading-relaxed">
              Subscribe to get seasonal harvest reports, current Guntur market prices, and export shipping availability.
            </p>
            
            {subscribed ? (
              <div className="bg-brand-primary/10 border border-brand-primary/20 text-brand-accent text-xs p-3 rounded-lg font-bold">
                ✓ Thank you for subscribing!
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex mb-6">
                <input 
                  type="email" 
                  placeholder="Business Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-gray-800 text-xs px-3 py-2 rounded-l-lg border border-gray-700 focus:outline-none focus:border-brand-primary flex-1 text-white"
                  required
                />
                <button 
                  type="submit" 
                  className="bg-brand-primary hover:bg-brand-secondary px-3 rounded-r-lg flex items-center justify-center transition-all"
                >
                  <Send className="h-3 w-3 text-white" />
                </button>
              </form>
            )}

            <h3 className="font-extrabold text-xs uppercase tracking-widest text-brand-accent border-b border-gray-800 pb-1 mb-3">
              HQ Address
            </h3>
            <div className="flex flex-col gap-2.5 text-xs text-gray-400">
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-brand-primary shrink-0 mt-0.5" />
                <span>Abhinav Spices Kothagudem, Telangana, India</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-brand-primary shrink-0" />
                <a href="mailto:Abhinav.spices@ipmchillies.com" className="hover:text-brand-accent">
                  Abhinav.spices@ipmchillies.com
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-brand-primary shrink-0" />
                <a href="tel:+919866353270" className="hover:text-brand-accent">
                  +91 9866353270 Lalu Lakavath (Abhinav IPM Spices)
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Lower footer copyright */}
        <div className="border-t border-gray-800 pt-4 flex flex-col sm:flex-row justify-between items-center text-[11px] text-gray-500">
          <p>© {new Date().getFullYear()} {t('footer.rights')}</p>
          <div className="flex gap-4 mt-4 sm:mt-0">
            <a href="#" className="hover:text-white">Privacy Policy</a>
            <a href="#" className="hover:text-white">Terms of Sale</a>
            <a href="#" className="hover:text-white">Export Terms (FOB/CIF)</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
