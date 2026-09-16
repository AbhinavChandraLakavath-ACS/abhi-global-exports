'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { useLanguage } from '@/context/LanguageContext';
import { useCurrency } from '@/context/CurrencyContext';
import { chillies } from '@/data/chillies';
import Link from 'next/link';
import { 
  FileText, Clipboard, Package, User, CheckCircle2, AlertCircle, 
  Hourglass, MessageSquare, Scale, Download, History, LogOut
} from 'lucide-react';

interface RFQItem {
  id: string;
  name: string;
  company: string;
  country: string;
  email: string;
  phone: string;
  product: string;
  quantity: number;
  packaging: string;
  port: string;
  message: string;
  status: string;
  date: string;
}

interface SampleRequest {
  id: string;
  chilliId: string;
  chilliName: string;
  status: string;
  date: string;
}

export default function BuyerDashboard() {
  const { t } = useLanguage();
  const { formatPrice } = useCurrency();
  
  const [rfqs, setRfqs] = useState<RFQItem[]>([]);
  const [samples, setSamples] = useState<SampleRequest[]>([]);
  const [activeTab, setActiveTab] = useState<'quotes' | 'samples' | 'profile'>('quotes');

  // Load from local storage
  useEffect(() => {
    const loadedRFQs = JSON.parse(localStorage.getItem('rfqs') || '[]');
    const loadedSamples = JSON.parse(localStorage.getItem('sample_requests') || '[]');
    setRfqs(loadedRFQs);
    setSamples(loadedSamples);
  }, []);

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'approved':
      case 'completed':
        return <CheckCircle2 className="h-4 w-4 text-green-500" />;
      case 'in negotiation':
      case 'pending verification':
        return <Hourglass className="h-4 w-4 text-amber-500 animate-pulse" />;
      default:
        return <AlertCircle className="h-4 w-4 text-gray-400" />;
    }
  };

  const getStatusClass = (status: string) => {
    switch (status.toLowerCase()) {
      case 'approved':
      case 'completed':
        return 'bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-300';
      case 'in negotiation':
      case 'pending verification':
        return 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
    }
  };

  return (
    <>
      <Navbar />
      <main className="flex-grow pt-32 pb-16 bg-brand-bg dark:bg-brand-dark/40 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header Row */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-black text-brand-text dark:text-white">
                Buyer <span className="text-brand-primary">Dashboard</span>
              </h1>
              <p className="text-sm text-brand-text/60 dark:text-brand-bg/60">
                Track Guntur chilli spice inquiries, certificates, and sample approvals.
              </p>
            </div>
            
            <div className="bg-white dark:bg-brand-dark px-4 py-2 border border-gray-100 dark:border-gray-800 rounded-xl shadow-sm text-xs font-bold flex items-center gap-2">
              <User className="h-4 w-4 text-brand-primary" />
              <span>Abhinav Exports Corp (International Buyer)</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar Controls */}
            <div className="bg-white dark:bg-brand-dark p-4 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm space-y-2 self-start">
              {[
                { id: 'quotes', label: 'RFQ & Inquiries', icon: <FileText className="h-4.5 w-4.5" /> },
                { id: 'samples', label: 'Spice Samples', icon: <Package className="h-4.5 w-4.5" /> },
                { id: 'profile', label: 'Company Profile', icon: <User className="h-4.5 w-4.5" /> }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`w-full flex items-center gap-3 px-4 py-3 text-xs font-extrabold uppercase tracking-wider rounded-xl transition-all ${
                    activeTab === tab.id
                      ? 'bg-brand-primary text-white shadow-md'
                      : 'text-brand-text/75 dark:text-brand-bg/85 hover:bg-brand-bg dark:hover:bg-brand-dark/50'
                  }`}
                >
                  {tab.icon}
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Dashboard Content Panel */}
            <div className="lg:col-span-3">
              {activeTab === 'quotes' && (
                <div className="space-y-6">
                  <div className="bg-white dark:bg-brand-dark p-6 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm">
                    <h3 className="font-extrabold text-sm uppercase tracking-widest text-brand-text dark:text-white mb-4 flex items-center gap-2">
                      <Clipboard className="h-4 w-4 text-brand-primary" /> Active B2B Chilli Inquiries
                    </h3>
                    
                    {rfqs.length === 0 ? (
                      <div className="text-center py-10">
                        <p className="text-xs text-brand-text/50 dark:text-brand-bg/50">You have no active RFQ quote inquiries.</p>
                        <Link 
                          href="/#rfq-section" 
                          className="mt-4 bg-brand-primary hover:bg-brand-secondary text-white text-xs font-bold px-4 py-2 rounded-lg inline-block"
                        >
                          Submit First RFQ
                        </Link>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {rfqs.map((rfq) => (
                          <div 
                            key={rfq.id}
                            className="bg-brand-bg/30 dark:bg-brand-dark/40 border border-gray-100 dark:border-gray-800 p-5 rounded-xl space-y-3"
                          >
                            <div className="flex justify-between items-start gap-4 flex-wrap">
                              <div>
                                <h4 className="font-black text-sm text-brand-text dark:text-white">
                                  {rfq.product} Bulk Supply
                                </h4>
                                <p className="text-[10px] text-brand-text/50 dark:text-brand-bg/50 uppercase tracking-wider mt-0.5">
                                  Requested on {new Date(rfq.date).toLocaleDateString()}
                                </p>
                              </div>
                              <span className={`text-[10px] uppercase font-bold px-2.5 py-1 rounded-full flex items-center gap-1.5 ${getStatusClass(rfq.status)}`}>
                                {getStatusIcon(rfq.status)}
                                {rfq.status}
                              </span>
                            </div>

                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs pt-2 border-t border-gray-100 dark:border-gray-800/80">
                              <div>
                                <span className="text-[10px] text-brand-text/40 dark:text-brand-bg/40 block font-bold uppercase">Volume</span>
                                <span className="font-bold text-brand-text dark:text-white">{rfq.quantity} Metric Tons</span>
                              </div>
                              <div>
                                <span className="text-[10px] text-brand-text/40 dark:text-brand-bg/40 block font-bold uppercase">Incoterm Port</span>
                                <span className="font-bold text-brand-text dark:text-white">{rfq.port}</span>
                              </div>
                              <div>
                                <span className="text-[10px] text-brand-text/40 dark:text-brand-bg/40 block font-bold uppercase">Packing type</span>
                                <span className="font-bold text-brand-text dark:text-white">{rfq.packaging}</span>
                              </div>
                              <div>
                                <span className="text-[10px] text-brand-text/40 dark:text-brand-bg/40 block font-bold uppercase">Quote Ref</span>
                                <span className="font-mono text-brand-primary dark:text-brand-accent font-bold">#{rfq.id.substring(0, 8)}</span>
                              </div>
                            </div>

                            {rfq.status.toLowerCase() === 'approved' && (
                              <div className="bg-brand-primary/5 p-3 rounded-lg border border-brand-primary/10 flex items-center justify-between text-xs mt-3">
                                <span className="text-brand-text/80 dark:text-brand-bg/85 font-semibold">Our FOB pricing contract has been generated. Ready for signing.</span>
                                <button 
                                  onClick={() => alert('Downloading official FOB/CIF contract draft PDF')}
                                  className="bg-brand-primary hover:bg-brand-secondary text-white text-[10px] font-bold py-1.5 px-3 rounded flex items-center gap-1"
                                >
                                  <Download className="h-3.5 w-3.5" /> Download Contract
                                </button>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {activeTab === 'samples' && (
                <div className="bg-white dark:bg-brand-dark p-6 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm">
                  <h3 className="font-extrabold text-sm uppercase tracking-widest text-brand-text dark:text-white mb-4 flex items-center gap-2">
                    <Package className="h-4 w-4 text-brand-primary" /> Chilli Sample Request Log
                  </h3>

                  {samples.length === 0 ? (
                    <p className="text-xs text-brand-text/50 dark:text-brand-bg/50 text-center py-8">
                      No sample requests found. Visit product pages to request free 1kg physical samples.
                    </p>
                  ) : (
                    <div className="space-y-4">
                      {samples.map((sample) => (
                        <div 
                          key={sample.id}
                          className="bg-brand-bg/30 dark:bg-brand-dark/40 border border-gray-100 dark:border-gray-800 p-4 rounded-xl flex justify-between items-center"
                        >
                          <div>
                            <h4 className="font-black text-sm text-brand-text dark:text-white">
                              {sample.chilliName} (1kg Sample Pods)
                            </h4>
                            <p className="text-[10px] text-brand-text/50 dark:text-brand-bg/50 uppercase font-bold tracking-wider mt-0.5">
                              Requested: {new Date(sample.date).toLocaleDateString()}
                            </p>
                          </div>
                          
                          <div className="flex items-center gap-3">
                            <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded ${getStatusClass(sample.status)}`}>
                              {sample.status}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'profile' && (
                <div className="bg-white dark:bg-brand-dark p-6 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm space-y-6">
                  <div>
                    <h3 className="font-extrabold text-sm uppercase tracking-widest text-brand-text dark:text-white mb-4">
                      B2B Account Information
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                      <div>
                        <span className="text-[10px] text-brand-text/40 dark:text-brand-bg/40 block font-bold uppercase mb-1">Company Name</span>
                        <input type="text" className="w-full bg-brand-bg dark:bg-brand-dark border border-gray-200 dark:border-gray-800 p-2.5 rounded-lg font-bold" defaultValue="Abhinav Exports Corp" />
                      </div>
                      <div>
                        <span className="text-[10px] text-brand-text/40 dark:text-brand-bg/40 block font-bold uppercase mb-1">Tax / VAT ID</span>
                        <input type="text" className="w-full bg-brand-bg dark:bg-brand-dark border border-gray-200 dark:border-gray-800 p-2.5 rounded-lg font-bold" defaultValue="VAT-987654321-EU" />
                      </div>
                      <div>
                        <span className="text-[10px] text-brand-text/40 dark:text-brand-bg/40 block font-bold uppercase mb-1">Corporate Email</span>
                        <input type="email" className="w-full bg-brand-bg dark:bg-brand-dark border border-gray-200 dark:border-gray-800 p-2.5 rounded-lg font-bold" defaultValue="buyer@abhinavexports.com" />
                      </div>
                      <div>
                        <span className="text-[10px] text-brand-text/40 dark:text-brand-bg/40 block font-bold uppercase mb-1">Target Delivery Port</span>
                        <input type="text" className="w-full bg-brand-bg dark:bg-brand-dark border border-gray-200 dark:border-gray-800 p-2.5 rounded-lg font-bold" defaultValue="Rotterdam, Netherlands" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="border-t border-gray-100 dark:border-gray-800/80 pt-4 flex justify-end">
                    <button 
                      onClick={() => alert('Profile successfully saved!')}
                      className="bg-brand-primary hover:bg-brand-secondary text-white text-xs font-bold py-2.5 px-6 rounded-lg"
                    >
                      Save Account Changes
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

        </div>
      </main>
      <Footer />
    </>
  );
}
