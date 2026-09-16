'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import WhatsAppButton from '@/components/shared/WhatsAppButton';
import ContainerCalculator from '@/components/calculator/ContainerCalculator';
import ShippingEstimator from '@/components/calculator/ShippingEstimator';
import SamplePurchaseWidget from '@/components/shared/SamplePurchaseWidget';
import { chillies, ChilliProduct } from '@/data/chillies';
import { useLanguage } from '@/context/LanguageContext';
import { useCurrency } from '@/context/CurrencyContext';
import Link from 'next/link';
import { 
  Flame, Award, Calendar, Clock, MapPin, Scale, ShieldCheck, 
  ChevronRight, Download, FileText, CheckCircle2, ChevronLeft,
  Mail, ShoppingBag, MessageSquare, Info, Image as ImageIcon, Package, HelpCircle, FlaskConical
} from 'lucide-react';

export default function ProductDetails() {
  const params = useParams();
  const router = useRouter();
  const { t } = useLanguage();
  
  const slug = params?.slug as string;
  const product = chillies.find((c) => c.slug === slug) || chillies[0];
  
  const [selectedView, setSelectedView] = useState<'solo' | 'bulk'>('solo');
  const [sampleRequested, setSampleRequested] = useState(false);
  const [activeTab, setActiveTab] = useState<'specs' | 'applications' | 'logistics'>('specs');

  // Handle Free Sample request local storage registry
  const handleRequestSample = () => {
    const samples = JSON.parse(localStorage.getItem('sample_requests') || '[]');
    samples.push({
      id: Math.random().toString(36).substring(7),
      chilliId: product.id,
      chilliName: product.name,
      status: 'Pending Verification',
      date: new Date().toISOString()
    });
    localStorage.setItem('sample_requests', JSON.stringify(samples));
    setSampleRequested(true);
  };

  // Structured SEO data JSON-LD
  const schemaJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    'name': product.name,
    'description': product.description,
    'image': `https://abhiglobalexports.com${product.images.solo}`,
    'offers': {
      '@type': 'AggregateOffer',
      'priceCurrency': 'USD',
      'lowPrice': '1800',
      'highPrice': '4500',
      'offerCount': '11',
      'priceValuable': 'Price on Request'
    },
    'brand': {
      '@type': 'Brand',
      'name': 'ABHI GLOBAL EXPORTS'
    },
    'additionalProperty': [
      { '@type': 'PropertyValue', 'name': 'Pungency', 'value': product.shu },
      { '@type': 'PropertyValue', 'name': 'Color Value', 'value': product.asta },
      { '@type': 'PropertyValue', 'name': 'Moisture', 'value': product.moisture }
    ]
  };

  return (
    <>
      {/* Dynamic SEO Injector */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaJsonLd) }}
      />

      <Navbar />
      <main className="flex-grow pt-32 pb-16 bg-brand-bg dark:bg-brand-dark/40 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Breadcrumbs */}
          <nav className="text-xs text-brand-text/50 dark:text-brand-bg/50 mb-6 flex items-center gap-1.5 font-semibold">
            <Link href="/" className="hover:text-brand-primary">Home</Link>
            <ChevronRight className="h-3 w-3" />
            <Link href="/products" className="hover:text-brand-primary">Products</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-brand-text dark:text-white">{product.name} Details</span>
          </nav>

          {/* Core Intro Card */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
            
            {/* Visuals Column (Solo & Bulk Switcher) */}
            <div className="lg:col-span-5 bg-white dark:bg-brand-dark border border-gray-100 dark:border-gray-800 p-6 rounded-2xl shadow-sm flex flex-col justify-between items-center text-center">
              <div className="w-full flex justify-between items-center mb-4">
                <span className="bg-brand-primary/10 text-brand-primary text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1">
                  <Flame className="h-3 w-3 fill-brand-primary" /> {product.heat} Heat
                </span>
                <span className="text-xs text-brand-text/50 dark:text-brand-bg/50 font-bold uppercase tracking-widest">
                  Origin: {product.origin.split(',')[0]}
                </span>
              </div>

              {/* Dynamic Photo Display Container */}
              <div className="w-full relative h-72 rounded-2xl overflow-hidden mb-4 bg-gray-100 dark:bg-brand-dark/80 border border-gray-200/60 dark:border-gray-800 flex items-center justify-center group">
                <img 
                  src={selectedView === 'solo' ? product.images.solo : product.images.bulk} 
                  alt={`${product.name} ${selectedView} photography`}
                  className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
                />
                
                <div className="absolute top-3 left-3 bg-brand-dark/90 backdrop-blur-md text-white text-[10px] font-extrabold px-2.5 py-1 rounded-lg border border-white/10 uppercase tracking-wider">
                  {selectedView === 'solo' ? 'Solo Pod View' : 'Bulk Warehouse Sacks'}
                </div>
              </div>

              {/* Photo View Switcher Controls */}
              <div className="w-full grid grid-cols-2 gap-2 p-1.5 bg-brand-bg dark:bg-brand-dark/60 rounded-xl border border-gray-200/60 dark:border-gray-800 mb-6">
                <button
                  onClick={() => setSelectedView('solo')}
                  className={`py-2 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                    selectedView === 'solo'
                      ? 'bg-brand-primary text-white shadow-md'
                      : 'text-brand-text/70 dark:text-brand-bg/70 hover:text-brand-primary'
                  }`}
                >
                  <ImageIcon className="h-3.5 w-3.5" /> Solo Pod Photo
                </button>
                <button
                  onClick={() => setSelectedView('bulk')}
                  className={`py-2 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                    selectedView === 'bulk'
                      ? 'bg-brand-primary text-white shadow-md'
                      : 'text-brand-text/70 dark:text-brand-bg/70 hover:text-brand-primary'
                  }`}
                >
                  <Package className="h-3.5 w-3.5" /> Bulk Warehouse Photo
                </button>
              </div>

              <div className="w-full space-y-2">
                <h1 className="text-2xl font-black text-brand-text dark:text-white">
                  {product.name} Red Chilli
                </h1>
                <p className="text-xs text-brand-text/50 dark:text-brand-bg/50 uppercase tracking-widest font-extrabold">
                  SHU: {product.shu} | ASTA: {product.asta}
                </p>

                {/* Quality Badges */}
                <div className="flex gap-2 justify-center py-1">
                  <span className="bg-gray-100 dark:bg-brand-dark/50 text-brand-text/70 dark:text-brand-bg/70 text-[10px] font-bold px-2 py-0.5 rounded border border-gray-200/50 dark:border-gray-800">
                    {product.organic ? 'Organic Certified' : 'Conventional Sourced'}
                  </span>
                  <span className="bg-gray-100 dark:bg-brand-dark/50 text-brand-text/70 dark:text-brand-bg/70 text-[10px] font-bold px-2 py-0.5 rounded border border-gray-200/50 dark:border-gray-800">
                    {product.machineCleaned ? 'Machine Cleaned' : 'Hand Sorted'}
                  </span>
                </div>
              </div>
            </div>

            {/* Product description & beginner helper column */}
            <div className="lg:col-span-7 bg-white dark:bg-brand-dark border border-gray-100 dark:border-gray-800 p-6 rounded-2xl shadow-sm flex flex-col justify-between">
              <div>
                <h2 className="text-xs font-black text-brand-primary dark:text-brand-accent uppercase tracking-widest mb-1">
                  Product Overview
                </h2>
                <h3 className="text-2xl font-black text-brand-text dark:text-white mb-3">
                  Export Grade Dried Red Chilli
                </h3>
                <p className="text-sm text-brand-text/80 dark:text-brand-bg/85 leading-relaxed mb-6">
                  {product.description}
                </p>

                {/* Beginner Guide Card (Plain English Explanations) */}
                <div className="bg-brand-bg/50 dark:bg-brand-dark/50 p-4 rounded-xl border border-gray-200/70 dark:border-gray-800 mb-6 space-y-2">
                  <h4 className="font-extrabold text-xs text-brand-primary dark:text-brand-accent uppercase tracking-wider flex items-center gap-1.5">
                    <HelpCircle className="h-4 w-4" /> Beginner Guide to {product.name} Specifications
                  </h4>
                  <ul className="space-y-1.5 text-xs text-brand-text/80 dark:text-brand-bg/85">
                    <li><strong>Heat Level:</strong> {product.beginnerGuides.heatNotice}</li>
                    <li><strong>Color Value:</strong> {product.beginnerGuides.colorNotice}</li>
                    <li><strong>MOQ Requirement:</strong> {product.beginnerGuides.moqNotice}</li>
                  </ul>
                </div>

                {/* Sourcing Specifications Row */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6 border-t border-b border-gray-100 dark:border-gray-800/80 py-4">
                  <div>
                    <span className="text-[10px] text-brand-text/40 dark:text-brand-bg/40 block font-bold uppercase tracking-wider">Moisture</span>
                    <span className="text-sm font-extrabold text-brand-text dark:text-white">{product.moisture}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-brand-text/40 dark:text-brand-bg/40 block font-bold uppercase tracking-wider">Lead Time</span>
                    <span className="text-sm font-extrabold text-brand-text dark:text-white">{product.leadTime}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-brand-text/40 dark:text-brand-bg/40 block font-bold uppercase tracking-wider">Harvest Season</span>
                    <span className="text-sm font-extrabold text-brand-text dark:text-white">{product.harvestSeason}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-brand-text/40 dark:text-brand-bg/40 block font-bold uppercase tracking-wider">MOQ Requirement</span>
                    <span className="text-sm font-extrabold text-brand-primary dark:text-brand-accent">{product.moq}</span>
                  </div>
                </div>

                {/* Packaging options */}
                <div className="mb-6">
                  <h4 className="text-xs font-bold text-brand-text/60 dark:text-brand-bg/60 uppercase tracking-widest mb-2">Available Bulk Packaging</h4>
                  <div className="flex flex-wrap gap-2">
                    {product.packing.map((pack) => (
                      <span key={pack} className="bg-brand-bg dark:bg-brand-dark/60 text-brand-text/85 dark:text-brand-bg/85 text-xs font-bold px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-800">
                        {pack}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* B2B CTAs */}
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link 
                    href="/#rfq-section"
                    className="bg-brand-primary hover:bg-brand-secondary text-white font-extrabold px-6 py-3.5 rounded-xl text-center text-sm flex-1 shadow-md shadow-brand-primary/10"
                  >
                    Request B2B Price Quote
                  </Link>

                  <a 
                    href="#sample-purchase-section"
                    className="border-2 border-brand-primary text-brand-primary dark:text-brand-accent hover:bg-brand-primary hover:text-white font-extrabold px-6 py-3.5 rounded-xl text-center text-sm flex-1 transition-all flex items-center justify-center gap-2 shadow-sm"
                  >
                    <FlaskConical className="h-4 w-4" /> Order 1kg Quality Sample
                  </a>
                </div>

                {/* Downloads */}
                <div className="grid grid-cols-2 gap-3">
                  <a 
                    href="#" 
                    onClick={(e) => { e.preventDefault(); alert(`Downloading Specification Sheet PDF for ${product.name}`); }}
                    className="flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700/80 text-brand-text/80 dark:text-brand-bg/85 text-xs font-bold p-3 rounded-lg border border-gray-200/50 dark:border-gray-800 transition-colors"
                  >
                    <Download className="h-4 w-4 text-brand-primary shrink-0" /> Download Spec Sheet
                  </a>
                  
                  <a 
                    href="#" 
                    onClick={(e) => { e.preventDefault(); alert(`Downloading Certificate of Analysis (COA) PDF for ${product.name}`); }}
                    className="flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700/80 text-brand-text/80 dark:text-brand-bg/85 text-xs font-bold p-3 rounded-lg border border-gray-200/50 dark:border-gray-800 transition-colors"
                  >
                    <FileText className="h-4 w-4 text-brand-primary shrink-0" /> Download COA Sheet
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Details Specifications Tabs */}
          <div className="bg-white dark:bg-brand-dark border border-gray-100 dark:border-gray-800 rounded-2xl shadow-sm overflow-hidden mb-12">
            <div className="flex border-b border-gray-100 dark:border-gray-800 bg-brand-bg/30">
              {[
                { id: 'specs', label: 'Technical Specifications' },
                { id: 'applications', label: 'Applications & Culinary Uses' },
                { id: 'logistics', label: 'Export & Logistics Details' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-6 py-4 text-xs uppercase font-extrabold tracking-wider border-b-2 transition-all ${
                    activeTab === tab.id
                      ? 'border-brand-primary text-brand-primary bg-white dark:bg-brand-dark'
                      : 'border-transparent text-brand-text/60 dark:text-brand-bg/60 hover:text-brand-primary'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="p-6">
              {activeTab === 'specs' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(product.specifications).map(([key, val]) => (
                    <div key={key} className="flex justify-between items-center py-2.5 border-b border-gray-50 dark:border-gray-800/40 text-sm">
                      <span className="text-brand-text/50 dark:text-brand-bg/50 font-bold">{key}</span>
                      <span className="font-extrabold text-brand-text dark:text-white">{val}</span>
                    </div>
                  ))}
                  <div className="flex justify-between items-center py-2.5 border-b border-gray-50 dark:border-gray-800/40 text-sm">
                    <span className="text-brand-text/50 dark:text-brand-bg/50 font-bold">Standard Packing Options</span>
                    <span className="font-extrabold text-brand-text dark:text-white">{product.packing.join(' / ')}</span>
                  </div>
                  <div className="flex justify-between items-center py-2.5 border-b border-gray-50 dark:border-gray-800/40 text-sm">
                    <span className="text-brand-text/50 dark:text-brand-bg/50 font-bold">Total Cap / 20ft dry</span>
                    <span className="font-extrabold text-brand-text dark:text-white">{product.containerCapacity.fcl20}</span>
                  </div>
                </div>
              )}

              {activeTab === 'applications' && (
                <div>
                  <h4 className="font-extrabold text-sm text-brand-text dark:text-white uppercase tracking-wider mb-4">Recommended Industry Uses</h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                    {product.applications.map((app) => (
                      <li key={app} className="flex items-center gap-2 text-brand-text/80 dark:text-brand-bg/85 font-medium">
                        <span className="h-2 w-2 rounded-full bg-brand-primary" />
                        {app}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {activeTab === 'logistics' && (
                <div className="space-y-4 text-sm leading-relaxed text-brand-text/80 dark:text-brand-bg/85">
                  <p>
                    <strong>Incoterms Supported:</strong> FOB (Chennai / Krishnapatnam Port), CNF, CIF (to any global port), DDP.
                  </p>
                  <p>
                    <strong>Container Packing Capacity:</strong> Standard 20ft container loads {product.containerCapacity.fcl20} and 40ft containers hold {product.containerCapacity.fcl40}. Customized packing bags of 10kg, 20kg, or 50kg are accepted.
                  </p>
                  <p>
                    <strong>Documentation Provided:</strong> Certificate of Origin (APEDA), Phytosanitary Certificate, Bill of Lading, Commercial Invoice, Packing List, Certificate of Analysis (COA) for moisture/capsaicin testing, and Fumigation Certificate.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Interactive Calculator Section */}
          <div className="mb-12">
            <h3 className="text-2xl font-black text-brand-text dark:text-white mb-6">
              Estimate Packing & Freight for {product.name}
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <ContainerCalculator />
              <ShippingEstimator />
            </div>
          </div>

          {/* Sample Purchase Section (1 kg Quality Inspection Kit) */}
          <SamplePurchaseWidget product={product} />

        </div>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
