'use client';

import React, { useState } from 'react';
import { ChilliProduct } from '@/data/chillies';
import { useCurrency } from '@/context/CurrencyContext';
import { 
  FlaskConical, CheckCircle2, ShieldCheck, Truck, FileText, 
  Package, AlertCircle, ArrowRight, CreditCard, Lock, Send, Info
} from 'lucide-react';

interface SamplePurchaseWidgetProps {
  product: ChilliProduct;
}

// Internal base product prices per 1kg in USD
const productBasePrices: Record<string, number> = {
  'teja-s17': 14.00,
  'byadgi': 16.00,
  'kashmiri': 18.00,
  'guntur-sannam': 11.00,
  'sannam-s4': 12.00,
  'bird-eye': 22.00,
};

export default function SamplePurchaseWidget({ product }: SamplePurchaseWidgetProps) {
  const { formatPrice } = useCurrency();

  // Internal Financial Calculations (HIDDEN FROM CUSTOMER DISPLAY)
  const baseCost = productBasePrices[product.id] || 15.00;
  const deliveryCharge = 26.00; // Express Doorstep Air Courier & Lab Testing
  const subtotal = baseCost + deliveryCharge;
  const profitMarginAmount = subtotal * 0.30; // 30% margin
  const totalChargedUSD = Math.round((subtotal + profitMarginAmount) * 100) / 100;

  // Single all-inclusive customer-facing price
  const formattedTotal = formatPrice(totalChargedUSD);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zipCode: '',
    country: 'United States',
    sampleType: 'Whole Pods (With Stalk)',
    paymentMethod: 'card'
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [orderId, setOrderId] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');

    try {
      // Send payload with both customer info and exporter's internal cost breakdown
      const response = await fetch('/api/sample-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          product: product.name,
          productId: product.id,
          // Internal calculation parameters passed for exporter reference in email
          baseCost,
          deliveryCharge,
          profitMarginAmount,
          totalChargedUSD,
          formattedTotal
        }),
      });

      const data = await response.json();

      if (data.success) {
        const newOrderId = data.orderId || `AGE-SMP-${Math.floor(100000 + Math.random() * 900000)}`;
        setOrderId(newOrderId);
        
        // Persist to local storage
        const existing = JSON.parse(localStorage.getItem('sample_purchases') || '[]');
        existing.push({
          orderId: newOrderId,
          product: product.name,
          sampleType: formData.sampleType,
          totalPrice: formattedTotal,
          totalUSD: totalChargedUSD,
          date: new Date().toISOString(),
          customerName: formData.name,
          company: formData.company,
          email: formData.email,
          country: formData.country,
          status: 'Confirmed & Awaiting Air Courier Dispatch'
        });
        localStorage.setItem('sample_purchases', JSON.stringify(existing));

        setSubmitted(true);
      } else {
        setErrorMessage(data.error || 'Failed to submit order. Please try again.');
      }
    } catch (err: any) {
      setErrorMessage('Network error occurred. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="sample-purchase-section" className="mt-6 mb-8 scroll-mt-28">
      <div className="bg-white dark:bg-brand-dark border-2 border-brand-primary/20 dark:border-brand-primary/40 rounded-3xl p-4 sm:p-6 lg:p-8 shadow-xl relative overflow-hidden">
        
        {/* Subtle accent bar */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-brand-primary via-brand-accent to-brand-secondary" />

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-gray-100 dark:border-gray-800">
          <div>
            <div className="inline-flex items-center gap-2 bg-brand-primary/10 text-brand-primary dark:text-brand-accent text-xs font-black px-3 py-1.5 rounded-full uppercase tracking-wider mb-2">
              <FlaskConical className="h-4 w-4" /> B2B Quality Inspection Sample
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-brand-text dark:text-white">
              Purchase Quality Evaluation Sample (1 kg Kit)
            </h2>
            <p className="text-xs sm:text-sm text-brand-text/60 dark:text-brand-bg/60 mt-1 max-w-2xl">
              Evaluate physical color value (ASTA), pungency (SHU), moisture levels, and pod size for <strong className="text-brand-primary">{product.name}</strong> before placing commercial bulk container orders.
            </p>
          </div>

          {/* Customer Facing Price Tag (Single Flat All-Inclusive Rate) */}
          <div className="bg-gradient-to-br from-brand-primary to-brand-secondary text-white p-4 sm:p-5 rounded-2xl text-center md:text-right shrink-0 shadow-lg shadow-brand-primary/20">
            <span className="text-[11px] font-extrabold uppercase tracking-widest text-white/80 block">
              All-Inclusive Sample Pack Price
            </span>
            <div className="text-3xl font-black tracking-tight mt-0.5">
              {formattedTotal}
            </div>
            <span className="text-[10px] font-bold text-white/80 block mt-1">
              Includes 1kg Vacuum Sealed Sample + Air Freight + COA Report
            </span>
          </div>
        </div>

        {/* STRICT QUANTITY NOTICE BADGE */}
        <div className="my-6 bg-amber-500/10 border border-amber-500/30 text-amber-900 dark:text-amber-300 rounded-2xl p-4 flex items-start gap-3">
          <AlertCircle className="h-5 w-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
          <div className="text-xs sm:text-sm">
            <strong className="font-extrabold block text-amber-700 dark:text-amber-400 uppercase tracking-wider">
              ⚠️ Strict Sample Order Limit: 1 KG Maximum
            </strong>
            <span>
              To ensure fair availability for all international importers and food processors, sample purchases are strictly capped at <strong>only 1 kg per customer/company</strong> for quality testing purposes. For bulk quantities (10 MT to 500 MT), please use our standard B2B RFQ system above.
            </span>
          </div>
        </div>

        {submitted ? (
          /* Order Success View */
          <div className="bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 rounded-2xl p-6 sm:p-8 text-center space-y-4">
            <div className="w-16 h-16 bg-emerald-500 text-white rounded-full flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/30">
              <CheckCircle2 className="h-10 w-10" />
            </div>
            <h3 className="text-2xl font-black text-emerald-900 dark:text-emerald-300">
              Sample Order Confirmed!
            </h3>
            <p className="text-xs sm:text-sm text-emerald-800 dark:text-emerald-400 max-w-lg mx-auto">
              Your 1kg quality sample order for <strong>{product.name}</strong> has been registered. Order Reference: <span className="font-extrabold font-mono bg-emerald-200/60 dark:bg-emerald-900/60 px-2 py-0.5 rounded text-emerald-950 dark:text-emerald-100">{orderId}</span>
            </p>

            <div className="bg-white dark:bg-brand-dark p-4 rounded-xl border border-emerald-200 dark:border-emerald-800 text-left max-w-md mx-auto space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-gray-500">Sample Variety:</span>
                <span className="font-bold">{product.name} (1.0 kg)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Sample Format:</span>
                <span className="font-bold">{formData.sampleType}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Delivery Address:</span>
                <span className="font-bold">{formData.address}, {formData.city}, {formData.country}</span>
              </div>
              <div className="flex justify-between border-t border-gray-100 dark:border-gray-800 pt-2 text-emerald-700 dark:text-emerald-400 font-extrabold">
                <span>Estimated Price:</span>
                <span>{formattedTotal}</span>
              </div>
            </div>

            <p className="text-xs text-gray-500 dark:text-gray-400">
              Your inquiry has been received! We will contact you shortly via WhatsApp or Email at <strong>{formData.email}</strong> to finalize shipping details and process payment off-platform.
            </p>

            <button
              onClick={() => setSubmitted(false)}
              className="bg-brand-primary hover:bg-brand-secondary text-white font-extrabold px-6 py-2.5 rounded-xl text-xs uppercase tracking-wider transition-colors inline-flex items-center gap-2"
            >
              Order Sample For Another Variety
            </button>
          </div>
        ) : (
          /* Order Form Grid */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: What's Included & Guarantee */}
            <div className="lg:col-span-5 space-y-4">
              <h3 className="font-black text-sm uppercase tracking-wider text-brand-text dark:text-white flex items-center gap-2">
                <Package className="h-4 w-4 text-brand-primary" /> What's Included In 1kg Sample Kit:
              </h3>

              <div className="space-y-3">
                <div className="flex items-start gap-3 bg-brand-bg/50 dark:bg-brand-dark/50 p-3.5 rounded-xl border border-gray-200/70 dark:border-gray-800">
                  <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-xs font-extrabold text-brand-text dark:text-white block">
                      1.0 KG Hermetically Sealed Sample
                    </strong>
                    <span className="text-[11px] text-brand-text/70 dark:text-brand-bg/70 leading-snug block">
                      Moisture-locked vacuum packaging preserving natural color and essential capsaicin oils.
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-brand-bg/50 dark:bg-brand-dark/50 p-3.5 rounded-xl border border-gray-200/70 dark:border-gray-800">
                  <FileText className="h-5 w-5 text-brand-primary shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-xs font-extrabold text-brand-text dark:text-white block">
                      Official Lab COA & HPLC Certificate
                    </strong>
                    <span className="text-[11px] text-brand-text/70 dark:text-brand-bg/70 leading-snug block">
                      Certified laboratory test analysis detailing exact SHU (pungency), ASTA color value, and moisture %.
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-brand-bg/50 dark:bg-brand-dark/50 p-3.5 rounded-xl border border-gray-200/70 dark:border-gray-800">
                  <Truck className="h-5 w-5 text-blue-500 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-xs font-extrabold text-brand-text dark:text-white block">
                      Express Air Freight Doorstep Delivery
                    </strong>
                    <span className="text-[11px] text-brand-text/70 dark:text-brand-bg/70 leading-snug block">
                      Dispatched via DHL / FedEx Express with full end-to-end parcel tracking to your lab/office.
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-brand-bg/50 dark:bg-brand-dark/50 p-3.5 rounded-xl border border-gray-200/70 dark:border-gray-800">
                  <ShieldCheck className="h-5 w-5 text-purple-500 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-xs font-extrabold text-brand-text dark:text-white block">
                      Phytosanitary & Quarantine Clearance
                    </strong>
                    <span className="text-[11px] text-brand-text/70 dark:text-brand-bg/70 leading-snug block">
                      Fully compliant with international plant quarantine customs clearance standards.
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-xl border border-gray-200/80 dark:border-gray-800 bg-gray-50/50 dark:bg-brand-dark/30 text-[11px] text-gray-500 dark:text-gray-400 space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-gray-700 dark:text-gray-300">
                  <Lock className="h-3.5 w-3.5 text-brand-primary" /> Secure Commercial B2B Sample Checkout
                </div>
                <p>
                  Orders processed immediately upon receipt. Sample fee may be credited towards your first 20ft container shipment order!
                </p>
              </div>
            </div>

            {/* Right Column: Customer Shipping & Payment Form */}
            <div className="lg:col-span-7 bg-brand-bg/30 dark:bg-brand-dark/60 p-5 sm:p-6 rounded-2xl border border-gray-200/80 dark:border-gray-800">
              
              <h3 className="font-extrabold text-sm text-brand-text dark:text-white mb-4 flex items-center justify-between">
                <span>Shipping & Contact Details</span>
                <span className="text-xs font-bold text-brand-primary bg-brand-primary/10 px-2.5 py-0.5 rounded-full">
                  1.0 KG Fixed Quantity
                </span>
              </h3>

              {errorMessage && (
                <div className="mb-4 bg-red-50 dark:bg-red-950/40 border border-red-200 text-red-700 dark:text-red-300 text-xs p-3 rounded-xl">
                  {errorMessage}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-extrabold text-brand-text/70 dark:text-brand-bg/70 uppercase tracking-wider mb-1">
                      Full Name *
                    </label>
                    <input 
                      type="text"
                      name="name"
                      required
                      placeholder="e.g. John Doe"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-white dark:bg-brand-dark border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-brand-primary text-brand-text dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-extrabold text-brand-text/70 dark:text-brand-bg/70 uppercase tracking-wider mb-1">
                      Company Name *
                    </label>
                    <input 
                      type="text"
                      name="company"
                      required
                      placeholder="e.g. Global Foods Corp"
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-white dark:bg-brand-dark border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-brand-primary text-brand-text dark:text-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-extrabold text-brand-text/70 dark:text-brand-bg/70 uppercase tracking-wider mb-1">
                      Work Email Address *
                    </label>
                    <input 
                      type="email"
                      name="email"
                      required
                      placeholder="john@company.com"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-white dark:bg-brand-dark border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-brand-primary text-brand-text dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-extrabold text-brand-text/70 dark:text-brand-bg/70 uppercase tracking-wider mb-1">
                      Phone / WhatsApp *
                    </label>
                    <input 
                      type="tel"
                      name="phone"
                      required
                      placeholder="+1 (555) 000-0000"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-white dark:bg-brand-dark border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-brand-primary text-brand-text dark:text-white"
                    />
                  </div>
                </div>

                {/* Sample Preparation Type */}
                <div>
                  <label className="block text-[11px] font-extrabold text-brand-text/70 dark:text-brand-bg/70 uppercase tracking-wider mb-1">
                    Preferred Sample Processing Format
                  </label>
                  <select
                    name="sampleType"
                    value={formData.sampleType}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-white dark:bg-brand-dark border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-brand-primary text-brand-text dark:text-white font-medium"
                  >
                    <option value="Whole Pods (With Stalk)">Whole Pods (With Stalk)</option>
                    <option value="Stemless Pods (Without Stalk)">Stemless Pods (Without Stalk)</option>
                    <option value="Fine Ground Chilli Powder">Fine Ground Chilli Powder</option>
                    <option value="Crushed Flakes (Coarse)">Crushed Flakes (Coarse)</option>
                    <option value="Chilli Seeds Only">Chilli Seeds Only</option>
                  </select>
                </div>

                {/* Shipping Address */}
                <div>
                  <label className="block text-[11px] font-extrabold text-brand-text/70 dark:text-brand-bg/70 uppercase tracking-wider mb-1">
                    Destination Shipping Address *
                  </label>
                  <input 
                    type="text"
                    name="address"
                    required
                    placeholder="Street Address, Suite / Building"
                    value={formData.address}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-white dark:bg-brand-dark border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-brand-primary text-brand-text dark:text-white mb-2"
                  />
                  <div className="grid grid-cols-3 gap-2">
                    <input 
                      type="text"
                      name="city"
                      required
                      placeholder="City"
                      value={formData.city}
                      onChange={handleChange}
                      className="px-3 py-2 text-xs rounded-xl bg-white dark:bg-brand-dark border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-brand-primary text-brand-text dark:text-white"
                    />
                    <input 
                      type="text"
                      name="zipCode"
                      required
                      placeholder="ZIP / Postal Code"
                      value={formData.zipCode}
                      onChange={handleChange}
                      className="px-3 py-2 text-xs rounded-xl bg-white dark:bg-brand-dark border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-brand-primary text-brand-text dark:text-white"
                    />
                    <input 
                      type="text"
                      name="country"
                      required
                      placeholder="Country"
                      value={formData.country}
                      onChange={handleChange}
                      className="px-3 py-2 text-xs rounded-xl bg-white dark:bg-brand-dark border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-brand-primary text-brand-text dark:text-white font-semibold"
                    />
                  </div>
                </div>

                {/* Submit Action Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-brand-primary hover:bg-brand-secondary text-white font-extrabold py-3.5 rounded-xl shadow-lg shadow-brand-primary/20 text-sm flex items-center justify-center gap-2 transition-all disabled:opacity-50 mt-4"
                >
                  {loading ? (
                    <span>Registering Inquiry...</span>
                  ) : (
                    <>
                      <span>Request Sample Details via Email/WhatsApp</span>
                      <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </button>

                <p className="text-[10px] text-center text-gray-400 dark:text-gray-500">
                  We will contact you via WhatsApp or Email to coordinate sample shipping and invoicing.
                </p>

              </form>
            </div>

          </div>
        )}

      </div>
    </section>
  );
}
