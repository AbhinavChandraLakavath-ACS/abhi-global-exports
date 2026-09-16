'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import { useCurrency } from '@/context/CurrencyContext';
import { chillies, categories } from '@/data/chillies';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Menu, X, ChevronDown, Globe, DollarSign, Sun, Moon, 
  Phone, ArrowRight, Award, Truck, ShieldCheck, Flame, Scale, MessageSquare, 
  User, CheckCircle2, AlertCircle, Package, Shield, FileText, Lock, Building2, Newspaper
} from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();
  const { language, setLanguage, t } = useLanguage();
  const { currency, setCurrency, symbol } = useCurrency();
  
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeMegaMenu, setActiveMegaMenu] = useState<'products' | 'categories' | 'company' | null>(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isVerifyModalOpen, setIsVerifyModalOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  // Amazon Profile Verification state
  const [buyerProfile, setBuyerProfile] = useState<{
    name: string;
    company: string;
    email: string;
    taxId: string;
    isVerified: boolean;
  }>({
    name: '',
    company: '',
    email: '',
    taxId: '',
    isVerified: false
  });

  // Verification Form Inputs
  const [vName, setVName] = useState('');
  const [vCompany, setVCompany] = useState('');
  const [vEmail, setVEmail] = useState('');
  const [vTaxId, setVTaxId] = useState('');

  // Monitor scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Sync dark mode state with document element
  useEffect(() => {
    const isDark = localStorage.getItem('theme') === 'dark' || 
      (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);
    setDarkMode(isDark);
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    // Load buyer profile verification state from local storage
    const saved = localStorage.getItem('buyer_verification_profile');
    if (saved) {
      try {
        setBuyerProfile(JSON.parse(saved));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    if (newMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  // Submit Verification Modal (Amazon Buyer Style)
  const handleVerifySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!vName || !vCompany || !vEmail) {
      alert('Please fill out all required verification fields.');
      return;
    }
    const updated = {
      name: vName,
      company: vCompany,
      email: vEmail,
      taxId: vTaxId || 'TAX-VERIFIED-9821',
      isVerified: true
    };
    setBuyerProfile(updated);
    localStorage.setItem('buyer_verification_profile', JSON.stringify(updated));
    setIsVerifyModalOpen(false);
    setIsProfileOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 shadow-lg">
      
      {/* 1. TOP ANNOUNCEMENT BAR */}
      <div className="bg-brand-dark border-b border-brand-primary/30 text-white text-xs py-2 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto flex justify-between items-center gap-2">
          
          {/* Quality Banner */}
          <div className="flex items-center gap-2 text-[11px]">
            <span className="bg-brand-primary/80 text-brand-accent px-2 py-0.5 rounded font-black text-[10px] uppercase tracking-wider flex items-center gap-1">
              <Flame className="h-3 w-3" /> Direct Guntur Sourcing
            </span>
            <span className="text-gray-300 font-semibold hidden md:inline">
              ISO 22000 & FDA Certified Wholesale Red Chilli Exporters
            </span>
          </div>

          {/* Quick Contact & Controls */}
          <div className="flex items-center gap-4 text-[11px] font-bold">
            <a 
              href="https://wa.me/919866353270" 
              target="_blank" 
              rel="noreferrer"
              className="text-brand-accent hover:underline flex items-center gap-1"
            >
              <MessageSquare className="h-3.5 w-3.5" /> WhatsApp: +91 9866353270
            </a>

            <div className="h-3 w-[1px] bg-gray-700 hidden sm:block" />

            <Link href="/dashboard/buyer" className="hover:text-brand-accent transition-colors hidden sm:block">
              Buyer Portal
            </Link>

            <Link href="/dashboard/admin" className="hover:text-brand-accent transition-colors hidden sm:block">
              Admin
            </Link>

            <div className="h-3 w-[1px] bg-gray-700" />

            {/* Language Selector */}
            <div className="relative group/lang">
              <button className="flex items-center gap-1 text-gray-300 hover:text-white transition-colors">
                <Globe className="h-3 w-3" />
                <span className="uppercase">{language}</span>
              </button>
              <div className="absolute right-0 top-full hidden group-hover/lang:flex flex-col bg-brand-dark border border-gray-800 shadow-2xl rounded-lg overflow-hidden py-1 w-28 z-50">
                {(['en', 'es', 'hi', 'ar', 'vi'] as const).map((lang) => (
                  <button 
                    key={lang}
                    onClick={() => setLanguage(lang)}
                    className={`px-3 py-1.5 text-xs text-left hover:bg-gray-800 font-medium ${
                      language === lang ? 'text-brand-accent font-bold bg-brand-primary/20' : 'text-gray-300'
                    }`}
                  >
                    {lang === 'en' && 'English'}
                    {lang === 'es' && 'Español'}
                    {lang === 'hi' && 'हिन्दी'}
                    {lang === 'ar' && 'العربية'}
                    {lang === 'vi' && 'Tiếng Việt'}
                  </button>
                ))}
              </div>
            </div>

            {/* Currency Selector */}
            <div className="relative group/curr">
              <button className="flex items-center gap-1 text-gray-300 hover:text-white transition-colors">
                <span>{symbol} {currency}</span>
              </button>
              <div className="absolute right-0 top-full hidden group-hover/curr:flex flex-col bg-brand-dark border border-gray-800 shadow-2xl rounded-lg overflow-hidden py-1 w-24 z-50">
                {(['USD', 'EUR', 'INR', 'AED', 'SGD'] as const).map((cur) => (
                  <button 
                    key={cur}
                    onClick={() => setCurrency(cur)}
                    className={`px-3 py-1.5 text-xs text-left hover:bg-gray-800 font-medium ${
                      currency === cur ? 'text-brand-accent font-bold bg-brand-primary/20' : 'text-gray-300'
                    }`}
                  >
                    {cur}
                  </button>
                ))}
              </div>
            </div>

            {/* Theme Toggle */}
            <button 
              onClick={toggleDarkMode}
              className="text-gray-300 hover:text-brand-accent transition-colors p-1"
              title="Toggle Light / Dark Mode"
            >
              {darkMode ? <Sun className="h-3.5 w-3.5 text-brand-accent" /> : <Moon className="h-3.5 w-3.5" />}
            </button>
          </div>
        </div>
      </div>

      {/* 2. MAIN NAVIGATION BAR */}
      <div className={`bg-white/95 dark:bg-brand-dark/95 backdrop-blur-md transition-all duration-300 ${
        isScrolled ? 'py-2.5 shadow-md' : 'py-3'
      }`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex justify-between items-center">
            
            {/* Single Clean Brand Logo */}
            <Link href="/" className="flex items-center gap-2.5 group shrink-0 mr-8">
              <div className="bg-brand-primary p-2 rounded-xl group-hover:scale-105 transition-transform duration-300 shadow-md shadow-brand-primary/20">
                <Flame className="h-5 w-5 text-brand-accent fill-brand-accent animate-pulse" />
              </div>
              <div className="flex flex-col">
                <span className="font-black text-lg sm:text-xl tracking-wider text-brand-primary dark:text-white uppercase leading-none">
                  ABHI <span className="text-brand-accent font-light ml-1">GLOBAL EXPORTS</span>
                </span>
                <span className="text-[9px] font-extrabold uppercase tracking-widest text-brand-text/60 dark:text-brand-bg/60 mt-1">
                  Chilli Export Portal
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Items */}
            <nav className="hidden lg:flex items-center gap-6 shrink-0">
              
              {/* 1. Home */}
              <Link 
                href="/" 
                className={`font-extrabold text-xs uppercase tracking-wider transition-colors hover:text-brand-primary dark:hover:text-brand-accent ${
                  pathname === '/' ? 'text-brand-primary dark:text-brand-accent' : 'text-brand-text dark:text-brand-bg'
                }`}
              >
                {t('nav.home')}
              </Link>

              {/* 2. Chilli Varieties Mega Menu */}
              <div 
                className="relative"
                onMouseEnter={() => setActiveMegaMenu('products')}
                onMouseLeave={() => setActiveMegaMenu(null)}
              >
                <button className="flex items-center gap-1 font-extrabold text-xs uppercase tracking-wider text-brand-text dark:text-brand-bg hover:text-brand-primary dark:hover:text-brand-accent transition-colors py-2">
                  Chillies <ChevronDown className="h-3.5 w-3.5" />
                </button>

                <AnimatePresence>
                  {activeMegaMenu === 'products' && (
                    <motion.div 
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 12 }}
                      transition={{ duration: 0.15 }}
                      className="absolute left-1/2 -translate-x-1/2 top-full w-[650px] bg-white dark:bg-brand-dark rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-800 p-6 grid grid-cols-2 gap-6 z-50"
                    >
                      <div>
                        <h4 className="font-extrabold text-xs uppercase tracking-widest text-brand-primary dark:text-brand-accent border-b border-gray-100 dark:border-gray-800 pb-2 mb-3">
                          Popular Indian Varieties
                        </h4>
                        <div className="grid grid-cols-2 gap-2">
                          {chillies.map((c) => (
                            <Link 
                              key={c.id} 
                              href={`/products/${c.slug}`}
                              className="text-xs text-brand-text/80 dark:text-brand-bg/85 hover:text-brand-primary dark:hover:text-brand-accent transition-colors py-1 font-bold flex items-center gap-1.5"
                            >
                              <span className="h-1.5 w-1.5 rounded-full bg-brand-primary" />
                              {c.name}
                            </Link>
                          ))}
                        </div>
                      </div>

                      <div className="bg-brand-bg/60 dark:bg-brand-dark/50 p-4 rounded-xl border border-gray-200/60 dark:border-gray-800 flex flex-col justify-between">
                        <div>
                          <h4 className="font-extrabold text-xs text-brand-primary dark:text-brand-accent uppercase tracking-wider mb-1">
                            Browse All 11 Chillies
                          </h4>
                          <p className="text-[11px] text-brand-text/70 dark:text-brand-bg/70 leading-relaxed mb-4">
                            Filter by heat levels (SHU ratings), ASTA color values, and container capacities.
                          </p>
                        </div>
                        <Link 
                          href="/products"
                          className="bg-brand-primary hover:bg-brand-secondary text-white text-xs font-bold py-2 px-3 rounded-lg flex items-center justify-center gap-1 transition-all"
                        >
                          View Products Catalog <ArrowRight className="h-3 w-3" />
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* 3. Categories Dropdown */}
              <div 
                className="relative"
                onMouseEnter={() => setActiveMegaMenu('categories')}
                onMouseLeave={() => setActiveMegaMenu(null)}
              >
                <button className="flex items-center gap-1 font-extrabold text-xs uppercase tracking-wider text-brand-text dark:text-brand-bg hover:text-brand-primary dark:hover:text-brand-accent transition-colors py-2">
                  Categories ▾ <ChevronDown className="h-3.5 w-3.5" />
                </button>

                <AnimatePresence>
                  {activeMegaMenu === 'categories' && (
                    <motion.div 
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 12 }}
                      transition={{ duration: 0.15 }}
                      className="absolute left-1/2 -translate-x-1/2 top-full w-[420px] bg-white dark:bg-brand-dark rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-800 p-4 grid grid-cols-2 gap-3 z-50"
                    >
                      {categories.map((cat) => (
                        <Link 
                          key={cat.id} 
                          href={`/products?category=${cat.id}`}
                          className="p-2.5 hover:bg-brand-bg dark:hover:bg-brand-dark/50 rounded-xl group transition-colors border border-transparent hover:border-gray-200 dark:hover:border-gray-800"
                        >
                          <span className="font-bold text-xs text-brand-text dark:text-brand-bg group-hover:text-brand-primary dark:group-hover:text-brand-accent transition-colors block">
                            {cat.name}
                          </span>
                          <span className="text-[10px] text-brand-text/60 dark:text-brand-bg/60 line-clamp-1 block mt-0.5">
                            {cat.description}
                          </span>
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* 4. Company & Plant Dropdown */}
              <div 
                className="relative"
                onMouseEnter={() => setActiveMegaMenu('company')}
                onMouseLeave={() => setActiveMegaMenu(null)}
              >
                <button className="flex items-center gap-1 font-extrabold text-xs uppercase tracking-wider text-brand-text dark:text-brand-bg hover:text-brand-primary dark:hover:text-brand-accent transition-colors py-2">
                  Company ▾ <ChevronDown className="h-3.5 w-3.5" />
                </button>

                <AnimatePresence>
                  {activeMegaMenu === 'company' && (
                    <motion.div 
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 12 }}
                      transition={{ duration: 0.15 }}
                      className="absolute left-1/2 -translate-x-1/2 top-full w-[320px] bg-white dark:bg-brand-dark rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-800 p-3 flex flex-col gap-1 text-xs font-bold z-50"
                    >
                      <Link href="/processing-plant" className="p-2.5 flex items-center gap-2 hover:bg-brand-bg dark:hover:bg-brand-dark/50 rounded-lg text-brand-text dark:text-white hover:text-brand-primary">
                        <Building2 className="h-4 w-4 shrink-0" /> Processing Plant Tour
                      </Link>
                      <Link href="/certifications" className="p-2.5 flex items-center gap-2 hover:bg-brand-bg dark:hover:bg-brand-dark/50 rounded-lg text-brand-text dark:text-white hover:text-brand-primary">
                        <ShieldCheck className="h-4 w-4 shrink-0" /> ISO & FDA Certifications
                      </Link>
                      <Link href="/export-destinations" className="p-2.5 flex items-center gap-2 hover:bg-brand-bg dark:hover:bg-brand-dark/50 rounded-lg text-brand-text dark:text-white hover:text-brand-primary">
                        <Globe className="h-4 w-4 shrink-0" /> Global Export Destinations
                      </Link>
                      <Link href="/blog" className="p-2.5 flex items-center gap-2 hover:bg-brand-bg dark:hover:bg-brand-dark/50 rounded-lg text-brand-text dark:text-white hover:text-brand-primary">
                        <Newspaper className="h-4 w-4 shrink-0" /> Harvest Reports & Blog
                      </Link>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

            </nav>

            {/* Right Action Group: Request Quote Button & AMAZON-STYLE ROUND PROFILE VERIFICATION WIDGET */}
            <div className="hidden lg:flex items-center shrink-0 gap-4 ml-4 pl-4 border-l border-gray-200 dark:border-gray-800 relative">
              
              {/* Request Quote Button */}
              <Link 
                href="/#rfq-section"
                className="bg-brand-primary hover:bg-brand-secondary text-white text-xs font-black px-4 py-2.5 rounded-xl uppercase tracking-wider transition-transform duration-300 hover:scale-105 active:scale-95 shadow-md shadow-brand-primary/20 flex items-center gap-1.5"
              >
                <span>Request Quote</span>
              </Link>

              {/* AMAZON-STYLE ROUND PROFILE ICON (ALWAYS VISIBLE IN TOP RIGHT) */}
              <div className="relative">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 relative border-2 ${
                    buyerProfile.isVerified
                      ? 'border-green-500 bg-green-500/10 text-green-500 shadow-md shadow-green-500/20'
                      : 'border-brand-primary bg-brand-primary/10 text-brand-primary hover:scale-105'
                  }`}
                  title={buyerProfile.isVerified ? 'Verified B2B Buyer Account' : 'Click to Verify Profile'}
                >
                  <User className="h-5 w-5" />
                  
                  {/* Status Indicator Badge Dot */}
                  <span className={`absolute -top-0.5 -right-0.5 w-3.5 h-3.5 rounded-full flex items-center justify-center text-[8px] font-black border-2 border-white dark:border-brand-dark ${
                    buyerProfile.isVerified ? 'bg-green-500 text-white' : 'bg-amber-500 text-white animate-pulse'
                  }`}>
                    {buyerProfile.isVerified ? '✓' : '!'}
                  </span>
                </button>

                {/* Amazon-Style Profile Dropdown Menu */}
                <AnimatePresence>
                  {isProfileOpen && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute right-0 top-full mt-3 w-80 bg-white dark:bg-brand-dark rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-800 overflow-hidden z-50 text-xs"
                    >
                      {/* Amazon Profile Banner */}
                      <div className="p-4 bg-gradient-to-br from-brand-primary/15 via-brand-dark/5 to-amber-500/10 border-b border-gray-100 dark:border-gray-800 flex items-center gap-3">
                        <div className={`w-11 h-11 rounded-full flex items-center justify-center font-black text-sm text-white shrink-0 shadow-md ${
                          buyerProfile.isVerified ? 'bg-green-600' : 'bg-brand-primary'
                        }`}>
                          {buyerProfile.name ? buyerProfile.name.charAt(0).toUpperCase() : 'B'}
                        </div>
                        <div className="overflow-hidden">
                          <h4 className="font-extrabold text-sm text-brand-text dark:text-white truncate">
                            {buyerProfile.name || 'Guest Buyer Account'}
                          </h4>
                          <p className="text-[10px] text-brand-text/60 dark:text-brand-bg/60 truncate">
                            {buyerProfile.company || 'B2B Buyer Account'}
                          </p>
                          <span className={`inline-flex items-center gap-1 text-[9px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider mt-1 ${
                            buyerProfile.isVerified 
                              ? 'bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300' 
                              : 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300'
                          }`}>
                            {buyerProfile.isVerified ? <CheckCircle2 className="h-3 w-3" /> : <AlertCircle className="h-3 w-3" />}
                            {buyerProfile.isVerified ? 'Verified B2B Buyer' : 'Verification Required'}
                          </span>
                        </div>
                      </div>

                      {/* Profile Actions */}
                      <div className="p-3 space-y-2">
                        {!buyerProfile.isVerified ? (
                          <button
                            onClick={() => { setIsVerifyModalOpen(true); setIsProfileOpen(false); }}
                            className="w-full bg-brand-primary hover:bg-brand-secondary text-white font-extrabold py-2.5 px-3 rounded-xl flex items-center justify-center gap-2 shadow"
                          >
                            <ShieldCheck className="h-4 w-4" /> Verify Profile Now
                          </button>
                        ) : (
                          <div className="bg-green-50 dark:bg-green-950/40 p-2.5 rounded-xl border border-green-200 dark:border-green-800/50 flex items-center justify-between text-[11px]">
                            <span className="font-bold text-green-700 dark:text-green-300">Tax ID: {buyerProfile.taxId}</span>
                            <span className="text-[9px] bg-green-600 text-white px-1.5 py-0.5 rounded font-black">ACTIVE</span>
                          </div>
                        )}

                        <div className="pt-2 border-t border-gray-100 dark:border-gray-800 space-y-1">
                          <Link 
                            href="/dashboard/buyer"
                            onClick={() => setIsProfileOpen(false)}
                            className="flex items-center justify-between p-2 hover:bg-brand-bg dark:hover:bg-brand-dark/50 rounded-lg text-brand-text dark:text-white font-bold"
                          >
                            <span className="flex items-center gap-2"><FileText className="h-4 w-4 text-brand-primary" /> My RFQs & Active Quotes</span>
                            <ChevronDown className="h-3.5 w-3.5 -rotate-90 text-gray-400" />
                          </Link>

                          <Link 
                            href="/dashboard/buyer"
                            onClick={() => setIsProfileOpen(false)}
                            className="flex items-center justify-between p-2 hover:bg-brand-bg dark:hover:bg-brand-dark/50 rounded-lg text-brand-text dark:text-white font-bold"
                          >
                            <span className="flex items-center gap-2"><Package className="h-4 w-4 text-amber-500" /> My Free Sample Requests</span>
                            <ChevronDown className="h-3.5 w-3.5 -rotate-90 text-gray-400" />
                          </Link>

                          <Link 
                            href="/calculator"
                            onClick={() => setIsProfileOpen(false)}
                            className="flex items-center justify-between p-2 hover:bg-brand-bg dark:hover:bg-brand-dark/50 rounded-lg text-brand-text dark:text-white font-bold"
                          >
                            <span className="flex items-center gap-2"><Scale className="h-4 w-4 text-blue-500" /> Container & Stuffing Calculator</span>
                            <ChevronDown className="h-3.5 w-3.5 -rotate-90 text-gray-400" />
                          </Link>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

            </div>

            {/* Mobile Drawer Button */}
            <div className="flex lg:hidden items-center gap-2">
              {/* Round Profile Icon Mobile */}
              <button
                onClick={() => setIsVerifyModalOpen(true)}
                className={`w-8 h-8 rounded-full flex items-center justify-center border ${
                  buyerProfile.isVerified ? 'border-green-500 text-green-500' : 'border-brand-primary text-brand-primary'
                }`}
              >
                <User className="h-4 w-4" />
              </button>

              <button 
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 bg-gray-100 dark:bg-brand-dark/80 rounded-lg text-brand-text dark:text-brand-bg hover:text-brand-primary transition-colors"
                aria-label="Toggle Menu"
              >
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>

          </div>
        </div>
      </div>

      {/* 3. AMAZON-STYLE BUYER VERIFICATION MODAL */}
      <AnimatePresence>
        {isVerifyModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-brand-dark/90 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div 
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              className="bg-white dark:bg-brand-dark rounded-3xl border border-gray-100 dark:border-gray-800 shadow-2xl p-6 sm:p-8 max-w-md w-full relative"
            >
              <button
                onClick={() => setIsVerifyModalOpen(false)}
                className="absolute top-5 right-5 text-gray-400 hover:text-brand-primary p-1"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="text-center mb-6">
                <div className="w-14 h-14 bg-brand-primary/10 text-brand-primary rounded-full flex items-center justify-center mx-auto mb-3">
                  <ShieldCheck className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-black text-brand-text dark:text-white">
                  Verify B2B Buyer Account
                </h3>
                <p className="text-xs text-brand-text/60 dark:text-brand-bg/60 mt-1">
                  Complete 1-click B2B verification to unlock priority FOB pricing and express sample dispatch.
                </p>
              </div>

              <form onSubmit={handleVerifySubmit} className="space-y-4 text-xs">
                <div>
                  <label className="font-bold text-brand-text/70 dark:text-brand-bg/70 block mb-1 uppercase text-[10px]">
                    Full Name *
                  </label>
                  <input 
                    type="text" 
                    value={vName}
                    onChange={(e) => setVName(e.target.value)}
                    placeholder="e.g. John Doe"
                    className="w-full bg-brand-bg dark:bg-brand-dark/60 border border-gray-200 dark:border-gray-800 rounded-xl p-2.5 text-brand-text dark:text-white focus:outline-none focus:border-brand-primary font-bold"
                    required
                  />
                </div>

                <div>
                  <label className="font-bold text-brand-text/70 dark:text-brand-bg/70 block mb-1 uppercase text-[10px]">
                    Company / Business Name *
                  </label>
                  <input 
                    type="text" 
                    value={vCompany}
                    onChange={(e) => setVCompany(e.target.value)}
                    placeholder="e.g. Global Spice Importers Ltd"
                    className="w-full bg-brand-bg dark:bg-brand-dark/60 border border-gray-200 dark:border-gray-800 rounded-xl p-2.5 text-brand-text dark:text-white focus:outline-none focus:border-brand-primary font-bold"
                    required
                  />
                </div>

                <div>
                  <label className="font-bold text-brand-text/70 dark:text-brand-bg/70 block mb-1 uppercase text-[10px]">
                    Business Email *
                  </label>
                  <input 
                    type="email" 
                    value={vEmail}
                    onChange={(e) => setVEmail(e.target.value)}
                    placeholder="purchasing@company.com"
                    className="w-full bg-brand-bg dark:bg-brand-dark/60 border border-gray-200 dark:border-gray-800 rounded-xl p-2.5 text-brand-text dark:text-white focus:outline-none focus:border-brand-primary font-bold"
                    required
                  />
                </div>

                <div>
                  <label className="font-bold text-brand-text/70 dark:text-brand-bg/70 block mb-1 uppercase text-[10px]">
                    Tax ID / VAT / Registration No (Optional)
                  </label>
                  <input 
                    type="text" 
                    value={vTaxId}
                    onChange={(e) => setVTaxId(e.target.value)}
                    placeholder="e.g. VAT-98765432"
                    className="w-full bg-brand-bg dark:bg-brand-dark/60 border border-gray-200 dark:border-gray-800 rounded-xl p-2.5 text-brand-text dark:text-white focus:outline-none focus:border-brand-primary"
                  />
                </div>

                <button 
                  type="submit"
                  className="w-full bg-brand-primary hover:bg-brand-secondary text-white font-extrabold py-3 rounded-xl shadow-lg uppercase tracking-wider text-xs flex items-center justify-center gap-2 mt-2"
                >
                  <CheckCircle2 className="h-4 w-4" /> Activate Verified Buyer Status
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 4. MOBILE NAVIGATION DRAWER */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white dark:bg-brand-dark border-t border-gray-100 dark:border-gray-800 shadow-2xl overflow-hidden"
          >
            <div className="px-6 py-6 flex flex-col gap-3 text-xs">
              
              <Link 
                href="/"
                onClick={() => setIsOpen(false)}
                className="font-extrabold text-sm py-2 border-b border-gray-100 dark:border-gray-800 text-brand-text dark:text-white"
              >
                Home
              </Link>

              <Link 
                href="/products"
                onClick={() => setIsOpen(false)}
                className="font-extrabold text-sm py-2 border-b border-gray-100 dark:border-gray-800 text-brand-text dark:text-white flex items-center gap-1"
              >
                <Flame className="h-4 w-4 shrink-0 text-brand-primary" /> Chilli Products Catalog
              </Link>

              <Link 
                href="/processing-plant"
                onClick={() => setIsOpen(false)}
                className="font-bold py-2 border-b border-gray-100 dark:border-gray-800 text-brand-text/80 dark:text-brand-bg/85 flex items-center gap-2"
              >
                <Building2 className="h-4 w-4 shrink-0 text-brand-primary" /> Processing Plant Tour
              </Link>

              <Link 
                href="/certifications"
                onClick={() => setIsOpen(false)}
                className="font-bold py-2 border-b border-gray-100 dark:border-gray-800 text-brand-text/80 dark:text-brand-bg/85 flex items-center gap-2"
              >
                <ShieldCheck className="h-4 w-4 shrink-0 text-brand-primary" /> ISO & FDA Certifications
              </Link>

              <Link 
                href="/export-destinations"
                onClick={() => setIsOpen(false)}
                className="font-bold py-2 border-b border-gray-100 dark:border-gray-800 text-brand-text/80 dark:text-brand-bg/85 flex items-center gap-2"
              >
                <Globe className="h-4 w-4 shrink-0 text-brand-primary" /> Export Destinations
              </Link>

              <Link 
                href="/calculator"
                onClick={() => setIsOpen(false)}
                className="font-bold py-2 border-b border-gray-100 dark:border-gray-800 text-brand-text/80 dark:text-brand-bg/85 flex items-center gap-2"
              >
                <Package className="h-4 w-4 shrink-0 text-brand-primary" /> Container & Freight Calculator
              </Link>

              <Link 
                href="/dashboard/buyer"
                onClick={() => setIsOpen(false)}
                className="font-bold py-2 border-b border-gray-100 dark:border-gray-800 text-brand-text/80 dark:text-brand-bg/85"
              >
                Buyer Dashboard
              </Link>

              <Link 
                href="/dashboard/admin"
                onClick={() => setIsOpen(false)}
                className="font-bold py-2 border-b border-gray-100 dark:border-gray-800 text-brand-text/80 dark:text-brand-bg/85"
              >
                Admin Dashboard
              </Link>

              {/* Action Quote Button */}
              <Link 
                href="/#rfq-section"
                onClick={() => setIsOpen(false)}
                className="bg-brand-primary hover:bg-brand-secondary text-white text-xs font-black py-3 rounded-xl text-center shadow-lg uppercase tracking-wider mt-2"
              >
                Request Wholesale RFQ Quote
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </header>
  );
}
