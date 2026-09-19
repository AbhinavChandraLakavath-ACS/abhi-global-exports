'use client';

import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import WhatsAppButton from '@/components/shared/WhatsAppButton';
import InquiryForm from '@/components/shared/InquiryForm';
import { chillies, categories } from '@/data/chillies';
import { useLanguage } from '@/context/LanguageContext';
import { useCurrency } from '@/context/CurrencyContext';
import Link from 'next/link';
import { 
  Flame, Award, Globe, Scale, ShieldCheck, Ship, ArrowRight,
  TrendingUp, Leaf, Tractor, ThermometerSun, FileSignature, CheckCircle, Factory
} from 'lucide-react';

export default function Home() {
  const { t } = useLanguage();
  const { formatPrice } = useCurrency();

  const featuredChillies = chillies.filter(c => c.featured);

  return (
    <>
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center pt-32 overflow-hidden bg-gradient-to-br from-brand-dark via-[#180505] to-brand-dark text-white">
        {/* Animated background decoration */}
        <div className="absolute inset-0 opacity-15 pointer-events-none">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-brand-primary rounded-full filter blur-[120px] animate-pulse" />
          <div className="absolute bottom-20 -left-20 w-80 h-80 bg-brand-accent rounded-full filter blur-[100px] animate-pulse" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-6 max-w-4xl py-12">
          {/* Badge */}
          <div className="inline-flex gap-2.5 bg-white/5 border border-white/10 px-4.5 py-1.5 rounded-full text-xs font-bold text-brand-accent uppercase tracking-widest">
            <Flame className="h-4.5 w-4.5 text-brand-accent fill-brand-accent animate-bounce" />
            <span>Premium Chilli Exporter</span>
          </div>

          {/* Title */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
            {t('hero.title')}
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-base text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Leading B2B source for authentic Guntur Sannam, high-ASTA Byadgi, Kashmiri, and high-heat Teja S17 chillies. Steam sterilized, processed, and packed to global import specifications.
          </p>

          {/* Core Stats / Badges */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto py-6">
            {[
              { label: t('hero.badge1'), desc: 'Spices Database' },
              { label: t('hero.badge2'), desc: 'Global Markets' },
              { label: t('hero.badge3'), desc: 'Audit Checked' }
            ].map((stat, idx) => (
              <div key={idx} className="bg-white/5 border border-white/5 rounded-2xl p-4 backdrop-blur-sm">
                <span className="text-sm sm:text-base font-black text-brand-accent block">{stat.label}</span>
                <span className="text-[10px] text-gray-400 uppercase tracking-widest font-bold mt-1 block">{stat.desc}</span>
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <div className="pt-4">
            <Link 
              href="#rfq-section"
              className="bg-brand-primary hover:bg-brand-secondary text-brand-accent font-extrabold px-8 py-4 rounded-xl text-sm transition-transform duration-300 hover:scale-105 inline-flex items-center gap-2 shadow-2xl shadow-brand-primary/20"
            >
              {t('hero.cta')} <ArrowRight className="h-4.5 w-4.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Grid Section */}
      <section className="py-20 bg-brand-bg dark:bg-brand-dark/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center max-w-2xl mx-auto">
            <span className="text-brand-primary font-black uppercase tracking-widest text-xs block mb-2">Product Divisions</span>
            <h2 className="text-3xl font-black text-brand-text dark:text-white">
              Export Category Forms
            </h2>
            <p className="text-xs text-brand-text/50 dark:text-brand-bg/50 mt-1">
              Select and order custom formats from whole chillies to fine ground powders and oil-extraction seeds.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((cat) => (
              <Link 
                key={cat.id}
                href={`/products?category=${cat.id}`}
                className="bg-white dark:bg-brand-dark border border-gray-100 dark:border-gray-800 rounded-2xl p-5 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group flex flex-col justify-between overflow-hidden"
              >
                <div>
                  <div className="h-44 w-full rounded-xl overflow-hidden mb-4 relative bg-gray-100 dark:bg-brand-dark/80 border border-gray-100 dark:border-gray-800">
                    <img 
                      src={cat.image} 
                      alt={cat.name} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-2 right-2 bg-brand-dark/85 backdrop-blur-md text-brand-accent text-[9px] font-extrabold px-2 py-0.5 rounded uppercase tracking-wider">
                      Export Division
                    </div>
                  </div>
                  <h3 className="font-black text-base text-brand-text dark:text-white mb-1.5 group-hover:text-brand-primary transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-brand-text/60 dark:text-brand-bg/60 leading-relaxed mb-4">
                    {cat.description}
                  </p>
                </div>
                <span className="text-xs font-extrabold text-brand-primary dark:text-brand-accent flex items-center gap-1">
                  Enquire Category <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Chilli Grid Section */}
      <section className="py-20 bg-white dark:bg-brand-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
            <div>
              <span className="text-brand-primary font-black uppercase tracking-widest text-xs block mb-2">Featured Products</span>
              <h2 className="text-3xl font-black text-brand-text dark:text-white">
                Popular Red Chilli Varieties
              </h2>
            </div>
            <Link 
              href="/products"
              className="bg-brand-primary/10 hover:bg-brand-primary hover:text-white text-brand-primary text-xs font-extrabold px-5 py-2.5 rounded-lg transition-colors inline-flex items-center gap-1"
            >
              View Full Catalog ({chillies.length} varieties) <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredChillies.slice(0, 6).map((c) => (
              <div 
                key={c.id}
                className="bg-brand-bg/20 dark:bg-brand-dark/40 border border-gray-100 dark:border-gray-800 rounded-2xl overflow-hidden shadow-sm flex flex-col justify-between group hover:shadow-xl transition-all duration-300"
              >
                {/* Header Photo */}
                <div className="h-48 relative bg-gray-100 dark:bg-brand-dark/80 overflow-hidden flex items-center justify-center">
                  <img 
                    src={c.images.solo} 
                    alt={c.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-brand-dark/90 backdrop-blur-md text-brand-accent text-[9px] font-extrabold px-2.5 py-0.5 rounded-full flex items-center gap-1 uppercase tracking-wider border border-brand-accent/20">
                    <Flame className="h-3 w-3 fill-brand-accent text-brand-accent" /> {c.heat}
                  </div>
                  <div className="absolute bottom-2 left-3 right-3 bg-brand-dark/85 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 flex justify-between items-center text-white">
                    <span className="font-extrabold text-xs">{c.name}</span>
                    <span className="text-[10px] text-gray-300 uppercase font-bold">{c.origin.split(',')[0]}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div className="space-y-3 mb-5">
                    <p className="text-xs text-brand-text/75 dark:text-brand-bg/85 line-clamp-2 leading-relaxed">
                      {c.description}
                    </p>
                    <div className="grid grid-cols-2 gap-2 text-[10px] border-t border-b border-gray-100 dark:border-gray-800/80 py-2 font-bold text-brand-text/60 dark:text-brand-bg/60">
                      <div>SHU: <span className="text-brand-primary dark:text-brand-accent">{c.shu}</span></div>
                      <div>ASTA Color: <span className="text-brand-text dark:text-white">{c.asta}</span></div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Link 
                      href={`/products/${c.slug}`}
                      className="bg-brand-primary hover:bg-brand-secondary text-white text-xs font-bold py-2.5 rounded-lg flex-1 text-center transition-all"
                    >
                      Specifications Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us & Stats */}
      <section className="py-20 bg-brand-bg dark:bg-brand-dark/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Why Choose Us */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <span className="text-brand-primary font-black uppercase tracking-widest text-xs block mb-2">Quality Sourcing</span>
                <h2 className="text-3xl font-black text-brand-text dark:text-white">
                  Why Global Spice Buyers Settle For ABHI
                </h2>
                <p className="text-xs text-brand-text/60 dark:text-brand-bg/60 mt-1 max-w-lg leading-relaxed">
                  We control the entire supply chain from Guntur contract farms, cold warehousing, cleaning, destemming, steam sterilization, and stuffing.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-medium text-brand-text dark:text-white">
                {[
                  { label: 'Farm-Direct Sourcing', desc: 'Eliminates mid-agents, guaranteeing freshness and lowest FOB pricing.', icon: <Tractor className="h-5 w-5 text-brand-primary" /> },
                  { label: 'HTST Steam Sterilization', desc: 'Non-chemical pathogen treatment meeting strict EU regulations.', icon: <ThermometerSun className="h-5 w-5 text-brand-primary" /> },
                  { label: 'Modern Processing & Grinding', desc: 'Custom ground mesh powders down to 80-mesh under chilled milling.', icon: <Factory className="h-5 w-5 text-brand-primary" /> },
                  { label: 'Complete Export Documentation', desc: 'Fumigation, Phytosanitary, APEDA, and custom laboratory COAs.', icon: <FileSignature className="h-5 w-5 text-brand-primary" /> }
                ].map((item, idx) => (
                  <div key={idx} className="bg-white dark:bg-brand-dark p-4 rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm space-y-2">
                    <div className="flex items-center gap-2 font-bold text-brand-text dark:text-white text-sm">
                      {item.icon}
                      {item.label}
                    </div>
                    <p className="text-[11px] text-brand-text/60 dark:text-brand-bg/60 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Statistics Banner */}
            <div className="lg:col-span-5 bg-white dark:bg-brand-dark p-6 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm space-y-6">
              <h3 className="font-extrabold text-sm uppercase tracking-widest text-brand-text dark:text-white border-b border-gray-100 dark:border-gray-800 pb-3">
                Global Logistics Footprint
              </h3>

              <div className="space-y-4">
                {[
                  { count: '250+ Containers', desc: 'Shipped annually via Chennai & Krishnapatnam ports.', percent: 85 },
                  { count: '50+ Countries Served', desc: 'Logistics routes spanning Europe, USA, UAE, and East Asia.', percent: 75 },
                  { count: '99% Clean sorting rating', desc: 'Sortex optical separation removes discolorations.', percent: 99 }
                ].map((stat, idx) => (
                  <div key={idx} className="space-y-1.5 text-xs">
                    <div className="flex justify-between items-center font-bold">
                      <span className="text-brand-text dark:text-white">{stat.count}</span>
                      <span className="text-[10px] text-brand-primary dark:text-brand-accent uppercase">{stat.desc}</span>
                    </div>
                    <div className="w-full bg-gray-100 dark:bg-gray-800 h-2 rounded-full overflow-hidden">
                      <div className="bg-brand-primary h-full rounded-full" style={{ width: `${stat.percent}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* RFQ Submission form */}
      <section className="py-20 bg-white dark:bg-brand-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <InquiryForm />
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </>
  );
}
