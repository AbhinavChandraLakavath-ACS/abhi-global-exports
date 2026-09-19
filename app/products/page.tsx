'use client';

import React, { useState, useMemo, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import WhatsAppButton from '@/components/shared/WhatsAppButton';
import SamplePurchaseWidget from '@/components/shared/SamplePurchaseWidget';
import { chillies, ChilliProduct, categories } from '@/data/chillies';
import { useLanguage } from '@/context/LanguageContext';
import { useCurrency } from '@/context/CurrencyContext';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Flame, Search, SlidersHorizontal, ArrowUpDown, X, Check,
  Scale, Grid, List, CheckCircle2, ChevronRight, FileSpreadsheet,
  HelpCircle, Image as ImageIcon, Package
} from 'lucide-react';

export default function ProductCatalog() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-brand-bg dark:bg-brand-dark flex items-center justify-center text-brand-primary font-bold text-sm">
        Loading Chilli Catalog...
      </div>
    }>
      <ProductCatalogContent />
    </Suspense>
  );
}

function ProductCatalogContent() {
  const { t } = useLanguage();
  const searchParams = useSearchParams();
  const router = useRouter();

  // Search & Filters State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedHeat, setSelectedHeat] = useState<string[]>([]);
  const [organicFilter, setOrganicFilter] = useState(false);
  const [machineCleanedFilter, setMachineCleanedFilter] = useState(false);
  const [sortBy, setSortBy] = useState<'name' | 'heat-asc' | 'heat-desc'>('name');
  
  // Comparison State
  const [comparedProducts, setComparedProducts] = useState<string[]>([]);
  const [isCompareOpen, setIsCompareOpen] = useState(false);

  // Set category filter from query search parameter
  const categoryParam = searchParams.get('category');
  
  // Clear all filters
  const resetFilters = () => {
    setSearchQuery('');
    setSelectedHeat([]);
    setOrganicFilter(false);
    setMachineCleanedFilter(false);
    if (categoryParam) {
      router.push('/products');
    }
  };

  // Toggle heat level selection
  const handleHeatToggle = (level: string) => {
    setSelectedHeat((prev) => 
      prev.includes(level) ? prev.filter((h) => h !== level) : [...prev, level]
    );
  };

  // Toggle products to comparison
  const handleCompareToggle = (id: string) => {
    setComparedProducts((prev) => {
      if (prev.includes(id)) {
        return prev.filter((pId) => pId !== id);
      }
      if (prev.length >= 3) {
        alert('You can compare a maximum of 3 varieties at once.');
        return prev;
      }
      return [...prev, id];
    });
  };

  // Filtered and sorted products
  const filteredProducts = useMemo(() => {
    return chillies
      .filter((chilli) => {
        // Search text matching
        const matchesSearch = 
          chilli.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          chilli.origin.toLowerCase().includes(searchQuery.toLowerCase()) ||
          chilli.description.toLowerCase().includes(searchQuery.toLowerCase());
          
        // Heat level matching
        const matchesHeat = 
          selectedHeat.length === 0 || selectedHeat.includes(chilli.heat);
          
        // Attribute matching
        const matchesOrganic = !organicFilter || chilli.organic;
        const matchesCleaned = !machineCleanedFilter || chilli.machineCleaned;

        // Category matching from url
        let matchesCategory = true;
        if (categoryParam) {
          if (categoryParam === 'whole' && chilli.slug.includes('powder')) matchesCategory = false;
          if (categoryParam === 'powder' && !chilli.slug.includes('powder')) matchesCategory = false;
        }

        return matchesSearch && matchesHeat && matchesOrganic && matchesCleaned && matchesCategory;
      })
      .sort((a, b) => {
        if (sortBy === 'name') {
          return a.name.localeCompare(b.name);
        }
        
        // Heat conversion map for ordering
        const heatWeights = {
          'Mild': 1,
          'Medium': 2,
          'High': 3,
          'Very High': 4,
          'Extremely High': 5
        };
        const weightA = heatWeights[a.heat] || 0;
        const weightB = heatWeights[b.heat] || 0;

        if (sortBy === 'heat-asc') return weightA - weightB;
        if (sortBy === 'heat-desc') return weightB - weightA;
        return 0;
      });
  }, [searchQuery, selectedHeat, organicFilter, machineCleanedFilter, categoryParam, sortBy]);

  // Product objects currently selected for comparison
  const productsToCompare = useMemo(() => {
    return chillies.filter((c) => comparedProducts.includes(c.id));
  }, [comparedProducts]);

  return (
    <>
      <Navbar />
      <main className="flex-grow pt-32 pb-16 bg-brand-bg dark:bg-brand-dark/40 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Breadcrumbs & Header */}
          <nav className="text-xs text-brand-text/50 dark:text-brand-bg/50 mb-4 flex items-center gap-1.5 font-semibold">
            <Link href="/" className="hover:text-brand-primary">Home</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-brand-text dark:text-white">Products Catalog</span>
          </nav>

          <div className="mb-8">
            <h1 className="text-3xl font-black text-brand-text dark:text-white flex items-center gap-2">
              Indian Chilli Varieties <span className="text-brand-primary">Catalog</span>
            </h1>
            <p className="text-sm text-brand-text/60 dark:text-brand-bg/60 mt-1 max-w-2xl">
              Browse and filter premium dried chillies, ground powders, and spice components directly from Guntur, India. Includes plain-English heat and color value guides.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Filters Sidebar */}
            <div className="bg-white dark:bg-brand-dark p-6 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm space-y-6 self-start lg:sticky lg:top-24">
              <div className="flex justify-between items-center border-b border-gray-100 dark:border-gray-800 pb-3">
                <span className="font-extrabold text-sm uppercase tracking-wider text-brand-text dark:text-white flex items-center gap-1.5">
                  <SlidersHorizontal className="h-4 w-4 text-brand-primary" /> Filter Options
                </span>
                <button 
                  onClick={resetFilters}
                  className="text-xs font-bold text-brand-primary hover:text-brand-secondary"
                >
                  Clear All
                </button>
              </div>

              {/* Category info label */}
              {categoryParam && (
                <div className="bg-brand-primary/5 border border-brand-primary/10 text-brand-primary text-xs p-2.5 rounded-lg flex justify-between items-center font-bold">
                  <span>Filtered: {categoryParam.toUpperCase()}</span>
                  <Link href="/products" className="text-brand-text hover:text-brand-primary">
                    <X className="h-4.5 w-4.5" />
                  </Link>
                </div>
              )}

              {/* Heat Levels */}
              <div>
                <h4 className="font-extrabold text-xs text-brand-text dark:text-white uppercase tracking-wider mb-3">
                  Heat Ratings (Pungency)
                </h4>
                <div className="space-y-2">
                  {['Mild', 'Medium', 'High', 'Very High', 'Extremely High'].map((level) => (
                    <label 
                      key={level} 
                      className="flex items-center gap-2 text-xs font-medium text-brand-text/80 dark:text-brand-bg/85 cursor-pointer"
                    >
                      <input 
                        type="checkbox"
                        checked={selectedHeat.includes(level)}
                        onChange={() => handleHeatToggle(level)}
                        className="rounded text-brand-primary focus:ring-brand-primary h-4 w-4 border-gray-300"
                      />
                      <span>{level}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Organic / Cleaning Attributes */}
              <div className="border-t border-gray-100 dark:border-gray-800/80 pt-4 space-y-3">
                <h4 className="font-extrabold text-xs text-brand-text dark:text-white uppercase tracking-wider mb-2">
                  Quality Marks
                </h4>
                <label className="flex items-center gap-2 text-xs font-medium text-brand-text/80 dark:text-brand-bg/85 cursor-pointer">
                  <input 
                    type="checkbox"
                    checked={organicFilter}
                    onChange={(e) => setOrganicFilter(e.target.checked)}
                    className="rounded text-brand-primary focus:ring-brand-primary h-4 w-4 border-gray-300"
                  />
                  <span>Organic Certified</span>
                </label>
                <label className="flex items-center gap-2 text-xs font-medium text-brand-text/80 dark:text-brand-bg/85 cursor-pointer">
                  <input 
                    type="checkbox"
                    checked={machineCleanedFilter}
                    onChange={(e) => setMachineCleanedFilter(e.target.checked)}
                    className="rounded text-brand-primary focus:ring-brand-primary h-4 w-4 border-gray-300"
                  />
                  <span>Machine Cleaned / Hand Sorted</span>
                </label>
              </div>
            </div>

            {/* Catalog Content */}
            <div className="lg:col-span-3 space-y-6">
              {/* Search & Sort Panel */}
              <div className="bg-white dark:bg-brand-dark p-4 rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm flex flex-col sm:flex-row gap-4 items-center justify-between">
                <div className="relative w-full sm:max-w-xs">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input 
                    type="text" 
                    placeholder="Search variety, origin..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-brand-bg dark:bg-brand-dark pl-9 pr-4 py-2 border border-gray-200 dark:border-gray-800 rounded-lg text-sm focus:outline-none focus:border-brand-primary"
                  />
                </div>

                <div className="flex gap-4 items-center w-full sm:w-auto justify-end">
                  <div className="flex items-center gap-2 text-xs font-bold text-brand-text/70 dark:text-brand-bg/70">
                    <ArrowUpDown className="h-4 w-4 text-brand-primary" /> Sort
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value as any)}
                      className="bg-brand-bg dark:bg-brand-dark border border-gray-200 dark:border-gray-800 rounded-lg p-1.5 font-bold"
                    >
                      <option value="name">Alphabetical</option>
                      <option value="heat-desc">Heat (High to Low)</option>
                      <option value="heat-asc">Heat (Low to High)</option>
                    </select>
                  </div>
                  <span className="text-xs text-brand-text/50 dark:text-brand-bg/50 font-bold">
                    {filteredProducts.length} Results
                  </span>
                </div>
              </div>

              {/* Grid Layout */}
              {filteredProducts.length === 0 ? (
                <div className="bg-white dark:bg-brand-dark rounded-2xl border border-gray-100 dark:border-gray-800 p-16 text-center shadow-sm">
                  <Flame className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                  <h3 className="font-extrabold text-lg text-brand-text dark:text-white">No Chilli Varieties Found</h3>
                  <p className="text-xs text-brand-text/60 dark:text-brand-bg/60 mt-1 max-w-sm mx-auto">
                    Try adjusting your search criteria, clearing the filters, or selecting alternative heat levels.
                  </p>
                  <button 
                    onClick={resetFilters}
                    className="mt-4 bg-brand-primary hover:bg-brand-secondary text-white text-xs font-bold px-4 py-2 rounded-lg"
                  >
                    Reset Filters
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredProducts.map((product) => {
                    const isCompared = comparedProducts.includes(product.id);
                    return (
                      <div 
                        key={product.id}
                        className="bg-white dark:bg-brand-dark border border-gray-100 dark:border-gray-800/80 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1"
                      >
                        {/* Card Header Photo */}
                        <div className="h-48 relative bg-gray-100 dark:bg-brand-dark/80 overflow-hidden flex items-center justify-center">
                          <img 
                            src={product.images.solo} 
                            alt={product.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />

                          {/* Heat Badges */}
                          <div className="absolute top-3 left-3 bg-brand-dark/90 backdrop-blur-md text-brand-accent text-[9px] font-extrabold px-2.5 py-0.5 rounded-full flex items-center gap-1 uppercase tracking-wider border border-brand-accent/20">
                            <Flame className="h-3 w-3 fill-brand-accent text-brand-accent" /> {product.heat}
                          </div>
                          
                          {/* Sourcing Badges */}
                          {product.organic && (
                            <div className="absolute top-3 right-3 bg-green-600/90 text-white text-[9px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">
                              Organic
                            </div>
                          )}

                          <div className="absolute bottom-2 left-3 right-3 bg-brand-dark/85 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 flex justify-between items-center text-white">
                            <span className="font-extrabold text-xs">{product.name}</span>
                            <span className="text-[10px] text-gray-300 uppercase font-bold">{product.origin.split(',')[0]}</span>
                          </div>
                        </div>

                        {/* Card Content specs */}
                        <div className="p-5 flex-1 flex flex-col justify-between">
                          <div className="space-y-3 mb-5">
                            <p className="text-xs text-brand-text/75 dark:text-brand-bg/85 line-clamp-3 leading-relaxed">
                              {product.description}
                            </p>

                            <div className="grid grid-cols-2 gap-2 text-[11px] border-t border-b border-gray-100 dark:border-gray-800/80 py-2.5">
                              <div>
                                <span className="text-brand-text/40 dark:text-brand-bg/40 block uppercase font-bold text-[9px]">Pungency (Heat)</span>
                                <span className="font-bold text-brand-primary dark:text-brand-accent">{product.shu} SHU</span>
                              </div>
                              <div>
                                <span className="text-brand-text/40 dark:text-brand-bg/40 block uppercase font-bold text-[9px]">Color (ASTA)</span>
                                <span className="font-bold text-brand-text dark:text-white">{product.asta} ASTA</span>
                              </div>
                              <div className="mt-1">
                                <span className="text-brand-text/40 dark:text-brand-bg/40 block uppercase font-bold text-[9px]">Min MOQ</span>
                                <span className="font-bold text-brand-text dark:text-white">{product.moq}</span>
                              </div>
                              <div className="mt-1">
                                <span className="text-brand-text/40 dark:text-brand-bg/40 block uppercase font-bold text-[9px]">20ft Capacity</span>
                                <span className="font-bold text-brand-text dark:text-white">{product.containerCapacity.fcl20}</span>
                              </div>
                            </div>
                          </div>

                          {/* CTA Row */}
                          <div className="space-y-2">
                            <div className="flex gap-2">
                              <Link 
                                href={`/products/${product.slug}`}
                                className="bg-brand-primary hover:bg-brand-secondary text-white text-xs font-bold py-2.5 rounded-lg flex-1 text-center transition-all shadow-md shadow-brand-primary/5"
                              >
                                {t('common.details')}
                              </Link>
                              
                              <button 
                                onClick={() => handleCompareToggle(product.id)}
                                className={`p-2.5 border rounded-lg transition-all ${
                                  isCompared 
                                    ? 'bg-brand-primary/10 border-brand-primary text-brand-primary dark:border-brand-accent dark:text-brand-accent'
                                    : 'border-gray-200 dark:border-gray-800 text-brand-text dark:text-brand-bg hover:bg-brand-primary/5 hover:border-brand-primary'
                                }`}
                                title="Compare Variety"
                              >
                                <Scale className="h-4 w-4" />
                              </button>
                            </div>

                            <a 
                              href={`/?quote=${product.id}#rfq-section`} 
                              className="text-center block text-[11px] font-bold text-brand-primary hover:text-brand-secondary py-1 dark:text-brand-accent"
                            >
                              Request Price Quote
                            </a>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* 1kg Quality Sample Purchase Section */}
          <SamplePurchaseWidget product={filteredProducts[0] || chillies[0]} />
        </div>
      </main>

      {/* Persistent Compare Drawer */}
      <AnimatePresence>
        {comparedProducts.length > 0 && (
          <motion.div 
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-0 left-0 right-0 z-40 bg-brand-dark border-t border-brand-primary/30 p-4 shadow-2xl text-white"
          >
            <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <span className="text-xs uppercase font-extrabold tracking-widest text-brand-accent flex items-center gap-1.5">
                  <Scale className="h-5 w-5" /> Compare Chilli Varieties ({comparedProducts.length}/3)
                </span>
                
                <div className="flex gap-2">
                  {productsToCompare.map((p) => (
                    <div 
                      key={p.id}
                      className="bg-gray-800 px-3 py-1.5 rounded-lg border border-gray-700 flex items-center gap-2 text-xs font-bold"
                    >
                      <span>{p.name}</span>
                      <button 
                        onClick={() => handleCompareToggle(p.id)}
                        className="text-brand-primary hover:text-brand-accent"
                      >
                        <X className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-3">
                <button 
                  onClick={() => setComparedProducts([])}
                  className="px-4 py-2 border border-gray-700 hover:border-white rounded-lg text-xs font-bold"
                >
                  Clear List
                </button>
                <button 
                  onClick={() => setIsCompareOpen(true)}
                  className="bg-brand-primary hover:bg-brand-secondary text-brand-accent px-6 py-2 rounded-lg text-xs font-extrabold flex items-center gap-1 shadow-lg"
                >
                  Compare Now <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Comparison Modal Overlays */}
      <AnimatePresence>
        {isCompareOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-brand-dark/95 backdrop-blur-md flex items-center justify-center p-4"
          >
            <motion.div 
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              className="bg-white dark:bg-brand-dark rounded-2xl border border-gray-200 dark:border-gray-800 shadow-2xl p-6 max-w-4xl w-full max-h-[85vh] overflow-y-auto no-scrollbar"
            >
              <div className="flex justify-between items-center border-b border-gray-100 dark:border-gray-800 pb-4 mb-6">
                <h3 className="text-xl font-black text-brand-text dark:text-white flex items-center gap-2">
                  <Scale className="h-6 w-6 text-brand-primary" /> Chilli Specifications Comparison
                </h3>
                <button 
                  onClick={() => setIsCompareOpen(false)}
                  className="p-1 hover:bg-gray-100 dark:hover:bg-brand-dark/80 rounded-full text-brand-text dark:text-brand-bg transition-colors"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <div className="grid grid-cols-4 gap-4 text-xs">
                {/* Labels Column */}
                <div className="space-y-4 font-extrabold text-brand-text/50 dark:text-brand-bg/50 uppercase tracking-widest pt-20">
                  <div className="h-10 border-b border-gray-100 dark:border-gray-800 flex items-center">Heat Rating</div>
                  <div className="h-10 border-b border-gray-100 dark:border-gray-800 flex items-center">Scoville Pungency</div>
                  <div className="h-10 border-b border-gray-100 dark:border-gray-800 flex items-center">ASTA Color Value</div>
                  <div className="h-10 border-b border-gray-100 dark:border-gray-800 flex items-center">Moisture Content</div>
                  <div className="h-10 border-b border-gray-100 dark:border-gray-800 flex items-center">Origin Sourced</div>
                  <div className="h-10 border-b border-gray-100 dark:border-gray-800 flex items-center">Minimum MOQ</div>
                  <div className="h-10 border-b border-gray-100 dark:border-gray-800 flex items-center">20ft Dry Capacity</div>
                  <div className="h-16 border-b border-gray-100 dark:border-gray-800 flex items-start pt-2">Applications</div>
                </div>

                {/* Products Columns */}
                {productsToCompare.map((p) => (
                  <div key={p.id} className="text-center border-l border-gray-100 dark:border-gray-800/80 px-2 space-y-4">
                    {/* Header */}
                    <div className="pb-4">
                      <img src={p.images.solo} alt={p.name} className="w-12 h-12 rounded-lg object-cover mx-auto mb-1 border" />
                      <h4 className="font-extrabold text-sm text-brand-text dark:text-white block mt-1 line-clamp-1">{p.name}</h4>
                      <span className="text-[10px] text-brand-text/50 dark:text-brand-bg/50 uppercase tracking-widest block font-bold">{p.origin.split(',')[0]}</span>
                    </div>

                    <div className="h-10 border-b border-gray-100 dark:border-gray-800 flex items-center justify-center font-bold text-brand-primary dark:text-brand-accent">
                      {p.heat}
                    </div>

                    <div className="h-10 border-b border-gray-100 dark:border-gray-800 flex items-center justify-center font-bold">
                      {p.shu} SHU
                    </div>

                    <div className="h-10 border-b border-gray-100 dark:border-gray-800 flex items-center justify-center font-bold">
                      {p.asta} ASTA
                    </div>

                    <div className="h-10 border-b border-gray-100 dark:border-gray-800 flex items-center justify-center font-bold">
                      {p.moisture}
                    </div>

                    <div className="h-10 border-b border-gray-100 dark:border-gray-800 flex items-center justify-center font-bold">
                      {p.origin}
                    </div>

                    <div className="h-10 border-b border-gray-100 dark:border-gray-800 flex items-center justify-center font-bold text-brand-primary dark:text-brand-accent">
                      {p.moq}
                    </div>

                    <div className="h-10 border-b border-gray-100 dark:border-gray-800 flex items-center justify-center font-bold">
                      {p.containerCapacity.fcl20}
                    </div>

                    <div className="h-16 border-b border-gray-100 dark:border-gray-800 flex flex-wrap gap-1 items-start justify-center pt-2 overflow-y-auto no-scrollbar">
                      {p.applications.map((app) => (
                        <span key={app} className="bg-gray-100 dark:bg-brand-dark/50 px-2 py-0.5 rounded text-[10px] font-bold text-brand-text/80 dark:text-brand-bg/85">
                          {app}
                        </span>
                      ))}
                    </div>

                    {/* Action */}
                    <div className="pt-2">
                      <Link 
                        href={`/products/${p.slug}`}
                        onClick={() => setIsCompareOpen(false)}
                        className="bg-brand-primary hover:bg-brand-secondary text-white text-[11px] font-bold px-4 py-2 rounded-lg inline-block"
                      >
                        View Full Specs
                      </Link>
                    </div>
                  </div>
                ))}

                {/* Empty columns if comparing less than 3 */}
                {Array.from({ length: 3 - productsToCompare.length }).map((_, idx) => (
                  <div key={idx} className="border-l border-gray-100 dark:border-gray-800/80 flex items-center justify-center text-brand-text/30 dark:text-brand-bg/30 font-bold uppercase tracking-wider">
                    Add Chilli
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
