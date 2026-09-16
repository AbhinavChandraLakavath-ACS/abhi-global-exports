'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import RawMaterialPriceManager from '@/components/admin/RawMaterialPriceManager';
import { 
  FileText, Clipboard, Package, UserCheck, Mail, MessageSquare, 
  TrendingUp, Layers, Check, X, ShieldAlert, Award, FileSpreadsheet, DollarSign
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

interface NewsletterSub {
  email: string;
  date: string;
}

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  date: string;
}

export default function AdminDashboard() {
  const [rfqs, setRfqs] = useState<RFQItem[]>([]);
  const [samples, setSamples] = useState<SampleRequest[]>([]);
  const [subs, setSubs] = useState<NewsletterSub[]>([]);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  
  const [activeTab, setActiveTab] = useState<'pricing' | 'rfqs' | 'samples' | 'marketing' | 'messages'>('pricing');

  // Load datasets
  const loadData = () => {
    const loadedRFQs = JSON.parse(localStorage.getItem('rfqs') || '[]');
    const loadedSamples = JSON.parse(localStorage.getItem('sample_requests') || '[]');
    const loadedSubs = JSON.parse(localStorage.getItem('newsletter_subs') || '[]');
    const loadedMessages = JSON.parse(localStorage.getItem('contact_messages') || '[]');
    
    setRfqs(loadedRFQs);
    setSamples(loadedSamples);
    setSubs(loadedSubs);
    setMessages(loadedMessages);
  };

  useEffect(() => {
    loadData();
    // Listen for changes
    window.addEventListener('storage', loadData);
    return () => window.removeEventListener('storage', loadData);
  }, []);

  // Update status helper
  const handleUpdateStatus = (id: string, newStatus: string, type: 'rfq' | 'sample') => {
    if (type === 'rfq') {
      const updated = rfqs.map((r) => r.id === id ? { ...r, status: newStatus } : r);
      localStorage.setItem('rfqs', JSON.stringify(updated));
      setRfqs(updated);
    } else {
      const updated = samples.map((s) => s.id === id ? { ...s, status: newStatus } : s);
      localStorage.setItem('sample_requests', JSON.stringify(updated));
      setSamples(updated);
    }
  };

  // Delete item helper
  const handleDeleteItem = (id: string, type: 'rfq' | 'sample' | 'sub' | 'message') => {
    if (confirm('Are you sure you want to delete this record?')) {
      if (type === 'rfq') {
        const updated = rfqs.filter((r) => r.id !== id);
        localStorage.setItem('rfqs', JSON.stringify(updated));
        setRfqs(updated);
      } else if (type === 'sample') {
        const updated = samples.filter((s) => s.id !== id);
        localStorage.setItem('sample_requests', JSON.stringify(updated));
        setSamples(updated);
      } else if (type === 'message') {
        const updated = messages.filter((m) => m.id !== id);
        localStorage.setItem('contact_messages', JSON.stringify(updated));
        setMessages(updated);
      }
    }
  };

  return (
    <>
      <Navbar />
      <main className="flex-grow pt-32 pb-16 bg-brand-bg dark:bg-brand-dark/40 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-black text-brand-text dark:text-white flex items-center gap-2">
                Admin <span className="text-brand-primary">Dashboard</span>
              </h1>
              <p className="text-sm text-brand-text/60 dark:text-brand-bg/60">
                Manage B2B chilli inquiries, verify sample requests, and track marketing metrics.
              </p>
            </div>
            
            <div className="bg-brand-primary text-brand-accent text-xs font-extrabold px-4 py-2 rounded-xl flex items-center gap-1.5 shadow-md">
              <ShieldAlert className="h-4.5 w-4.5" /> SECURED CONTROL PANEL
            </div>
          </div>

          {/* Quick Metrics Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[
              { label: 'Total RFQs', value: rfqs.length, icon: <FileText className="h-5 w-5" />, color: 'text-brand-primary' },
              { label: 'Sample Requests', value: samples.length, icon: <Package className="h-5 w-5" />, color: 'text-amber-500' },
              { label: 'Newsletter Subs', value: subs.length, icon: <Mail className="h-5 w-5" />, color: 'text-blue-500' },
              { label: 'Messages', value: messages.length, icon: <MessageSquare className="h-5 w-5" />, color: 'text-purple-500' }
            ].map((metric) => (
              <div key={metric.label} className="bg-white dark:bg-brand-dark p-5 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-brand-text/50 dark:text-brand-bg/50 uppercase tracking-wider font-extrabold block">{metric.label}</span>
                  <span className="text-2xl font-black text-brand-text dark:text-white">{metric.value}</span>
                </div>
                <div className={`p-3 bg-brand-bg dark:bg-brand-dark/60 rounded-xl ${metric.color}`}>
                  {metric.icon}
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar Tabs */}
            <div className="bg-white dark:bg-brand-dark p-4 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm space-y-2 self-start">
              {[
                { id: 'pricing', label: '1-Ton Pricing Engine', count: '⚡ Live' },
                { id: 'rfqs', label: 'Inbound RFQs', count: rfqs.length },
                { id: 'samples', label: 'Sample requests', count: samples.length },
                { id: 'messages', label: 'User messages', count: messages.length },
                { id: 'marketing', label: 'Subscribers List', count: subs.length }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`w-full flex items-center justify-between px-4 py-3.5 text-xs font-extrabold uppercase tracking-wider rounded-xl transition-all ${
                    activeTab === tab.id
                      ? 'bg-brand-primary text-white shadow-md'
                      : 'text-brand-text/75 dark:text-brand-bg/85 hover:bg-brand-bg dark:hover:bg-brand-dark/50'
                  }`}
                >
                  <span>{tab.label}</span>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full ${activeTab === tab.id ? 'bg-white text-brand-primary' : 'bg-gray-100 dark:bg-gray-800 text-brand-text/50'}`}>
                    {tab.count}
                  </span>
                </button>
              ))}
            </div>

            {/* Admin Table Output Panel */}
            <div className="lg:col-span-3 bg-white dark:bg-brand-dark rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm p-6 overflow-x-auto">
              
              {activeTab === 'pricing' && (
                <RawMaterialPriceManager />
              )}
              {activeTab === 'rfqs' && (
                <div>
                  <h3 className="font-extrabold text-sm uppercase tracking-widest text-brand-text dark:text-white mb-4">
                    Bulk RFQ Quote Manager
                  </h3>
                  {rfqs.length === 0 ? (
                    <p className="text-xs text-brand-text/50 dark:text-brand-bg/50 py-6 text-center">No inquiries currently loaded.</p>
                  ) : (
                    <table className="w-full text-left text-xs border-collapse">
                      <thead>
                        <tr className="border-b border-gray-100 dark:border-gray-800 font-extrabold uppercase text-[10px] tracking-wider text-brand-text/40 dark:text-brand-bg/40">
                          <th className="pb-3">Buyer Company</th>
                          <th className="pb-3">Product</th>
                          <th className="pb-3 text-center">Quantity</th>
                          <th className="pb-3">Status</th>
                          <th className="pb-3 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100 dark:divide-gray-800/40">
                        {rfqs.map((rfq) => (
                          <tr key={rfq.id} className="hover:bg-brand-bg/30 dark:hover:bg-brand-dark/30">
                            <td className="py-4.5 font-bold">
                              {rfq.company}
                              <span className="block text-[10px] font-normal text-brand-text/50 dark:text-brand-bg/50">{rfq.name} ({rfq.country})</span>
                            </td>
                            <td className="py-4.5 font-bold">{rfq.product}</td>
                            <td className="py-4.5 font-black text-center">{rfq.quantity} MT</td>
                            <td className="py-4.5">
                              <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                                rfq.status.toLowerCase() === 'approved' 
                                  ? 'bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-300' 
                                  : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                              }`}>
                                {rfq.status}
                              </span>
                            </td>
                            <td className="py-4.5 text-right space-x-1.5">
                              {rfq.status !== 'Approved' && (
                                <button 
                                  onClick={() => handleUpdateStatus(rfq.id, 'Approved', 'rfq')}
                                  className="bg-green-600 hover:bg-green-700 text-white text-[10px] font-bold px-2.5 py-1 rounded"
                                >
                                  Approve & Draft Contract
                                </button>
                              )}
                              {rfq.status !== 'In Negotiation' && rfq.status !== 'Approved' && (
                                <button 
                                  onClick={() => handleUpdateStatus(rfq.id, 'In Negotiation', 'rfq')}
                                  className="bg-amber-600 hover:bg-amber-700 text-white text-[10px] font-bold px-2 py-1 rounded"
                                >
                                  Negotiate
                                </button>
                              )}
                              <button 
                                onClick={() => handleDeleteItem(rfq.id, 'rfq')}
                                className="bg-red-600 hover:bg-red-700 text-white text-[10px] font-bold px-2 py-1 rounded"
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              )}

              {activeTab === 'samples' && (
                <div>
                  <h3 className="font-extrabold text-sm uppercase tracking-widest text-brand-text dark:text-white mb-4">
                    Product Sample approvals
                  </h3>
                  {samples.length === 0 ? (
                    <p className="text-xs text-brand-text/50 dark:text-brand-bg/50 py-6 text-center">No samples requested yet.</p>
                  ) : (
                    <table className="w-full text-left text-xs border-collapse">
                      <thead>
                        <tr className="border-b border-gray-100 dark:border-gray-800 font-extrabold uppercase text-[10px] tracking-wider text-brand-text/40 dark:text-brand-bg/40">
                          <th className="pb-3">Requested Chilli</th>
                          <th className="pb-3">Date</th>
                          <th className="pb-3">Status</th>
                          <th className="pb-3 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100 dark:divide-gray-800/40">
                        {samples.map((sample) => (
                          <tr key={sample.id} className="hover:bg-brand-bg/30 dark:hover:bg-brand-dark/30">
                            <td className="py-4.5 font-bold">{sample.chilliName} (1kg Bag)</td>
                            <td className="py-4.5">{new Date(sample.date).toLocaleDateString()}</td>
                            <td className="py-4.5">
                              <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                                sample.status.toLowerCase() === 'approved' 
                                  ? 'bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-300' 
                                  : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                              }`}>
                                {sample.status}
                              </span>
                            </td>
                            <td className="py-4.5 text-right space-x-1.5">
                              {sample.status !== 'Approved' && (
                                <button 
                                  onClick={() => handleUpdateStatus(sample.id, 'Approved', 'sample')}
                                  className="bg-green-600 hover:bg-green-700 text-white text-[10px] font-bold px-3 py-1 rounded animate-pulse"
                                >
                                  Approve Sample
                                </button>
                              )}
                              <button 
                                onClick={() => handleDeleteItem(sample.id, 'sample')}
                                className="bg-red-600 hover:bg-red-700 text-white text-[10px] font-bold px-2.5 py-1 rounded"
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              )}

              {activeTab === 'messages' && (
                <div>
                  <h3 className="font-extrabold text-sm uppercase tracking-widest text-brand-text dark:text-white mb-4">
                    Inbound Customer Contacts
                  </h3>
                  {messages.length === 0 ? (
                    <p className="text-xs text-brand-text/50 dark:text-brand-bg/50 py-6 text-center">No contact inquiries.</p>
                  ) : (
                    <div className="space-y-4">
                      {messages.map((msg) => (
                        <div key={msg.id} className="bg-brand-bg/30 dark:bg-brand-dark/60 border border-gray-100 dark:border-gray-800 p-4 rounded-xl space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="font-bold">{msg.name} ({msg.email})</span>
                            <span className="text-[10px] text-brand-text/50 dark:text-brand-bg/50">{new Date(msg.date).toLocaleString()}</span>
                          </div>
                          <p className="font-bold text-brand-primary dark:text-brand-accent">Subject: {msg.subject}</p>
                          <p className="text-xs leading-relaxed text-brand-text/80 dark:text-brand-bg/85">{msg.message}</p>
                          <div className="flex justify-end">
                            <button 
                              onClick={() => handleDeleteItem(msg.id, 'message')}
                              className="bg-red-600 hover:bg-red-700 text-white text-[10px] font-bold px-2 py-1 rounded"
                            >
                              Archive / Delete
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'marketing' && (
                <div>
                  <h3 className="font-extrabold text-sm uppercase tracking-widest text-brand-text dark:text-white mb-4">
                    Newsletter Subscribers
                  </h3>
                  {subs.length === 0 ? (
                    <p className="text-xs text-brand-text/50 dark:text-brand-bg/50 py-6 text-center">No newsletter subscriptions.</p>
                  ) : (
                    <div className="space-y-2 max-w-md">
                      {subs.map((s, idx) => (
                        <div key={idx} className="bg-brand-bg/30 dark:bg-brand-dark/60 border border-gray-100 dark:border-gray-800 px-4 py-2 rounded-lg flex justify-between items-center">
                          <span className="font-bold">{s.email}</span>
                          <span className="text-[10px] text-brand-text/40 dark:text-brand-bg/40 font-bold">{new Date(s.date).toLocaleDateString()}</span>
                        </div>
                      ))}
                    </div>
                  )}
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
