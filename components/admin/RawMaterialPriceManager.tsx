'use client';

import React, { useState, useEffect } from 'react';
import { 
  defaultRawMaterialPrices, RawMaterialPrice, 
  calculate1TonPricing, calculateCustomOrderPricing, Calculated1TonPrice, defaultBagPackagingFees
} from '@/data/dynamicPricing';
import { useCurrency } from '@/context/CurrencyContext';
import { 
  TrendingUp, Save, RefreshCw, DollarSign, Calculator, 
  CheckCircle2, ShieldCheck, Eye, Lock, ArrowUpRight, ArrowDownRight, Sparkles, AlertCircle, Package, Truck, Layers
} from 'lucide-react';

export default function RawMaterialPriceManager() {
  const { formatPrice } = useCurrency();
  const [prices, setPrices] = useState<RawMaterialPrice[]>(defaultRawMaterialPrices);
  const [showCustomerPreview, setShowCustomerPreview] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [lastSavedTime, setLastSavedTime] = useState<string>('');

  // Global settings
  const [globalFreight, setGlobalFreight] = useState<number>(250);
  const [bag50Fee, setBag50Fee] = useState<number>(15);
  const [bag30Fee, setBag30Fee] = useState<number>(25);
  const [bag20Fee, setBag20Fee] = useState<number>(40);

  // Ton & Container weight simulator
  const [selectedVarietyId, setSelectedVarietyId] = useState<string>('teja-s17');
  const [simTonnage, setSimTonnage] = useState<number>(14); // 14 MT = 20ft container default
  const [simBagSize, setSimBagSize] = useState<50 | 30 | 20>(50);

  // Load stored rates from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('raw_material_prices');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setPrices(parsed);
      } catch (e) {
        console.error('Error parsing stored raw material prices:', e);
      }
    }
    const lastTime = localStorage.getItem('raw_material_prices_updated');
    if (lastTime) {
      setLastSavedTime(lastTime);
    }
  }, []);

  // Update raw material rate per kg for a specific item
  const handleRateChange = (id: string, newRateKg: number) => {
    const updated = prices.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          rawMaterialPerKgUSD: Math.max(0, newRateKg),
          lastUpdated: new Date().toISOString()
        };
      }
      return item;
    });
    setPrices(updated);
  };

  // Update freight charge per ton for a specific item
  const handleFreightChange = (id: string, newFreightTon: number) => {
    const updated = prices.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          deliveryPerTonUSD: Math.max(0, newFreightTon),
          lastUpdated: new Date().toISOString()
        };
      }
      return item;
    });
    setPrices(updated);
  };

  // Bulk percentage change to all raw material prices
  const handleApplyPercentage = (percent: number) => {
    const multiplier = 1 + percent / 100;
    const updated = prices.map((item) => ({
      ...item,
      rawMaterialPerKgUSD: Math.round(item.rawMaterialPerKgUSD * multiplier * 100) / 100,
      lastUpdated: new Date().toISOString()
    }));
    setPrices(updated);
  };

  // Standardize delivery charges across all products
  const handleStandardizeFreight = (amount: number) => {
    setGlobalFreight(amount);
    const updated = prices.map((item) => ({
      ...item,
      deliveryPerTonUSD: amount,
      lastUpdated: new Date().toISOString()
    }));
    setPrices(updated);
  };

  // Standardize bag packaging delivery fees
  const handleStandardizeBagFees = (b50: number, b30: number, b20: number) => {
    setBag50Fee(b50);
    setBag30Fee(b30);
    setBag20Fee(b20);
    const updated = prices.map((item) => ({
      ...item,
      bagPackagingFeesPerTonUSD: {
        bag50kg: b50,
        bag30kg: b30,
        bag20kg: b20
      },
      lastUpdated: new Date().toISOString()
    }));
    setPrices(updated);
  };

  // Reset to default baseline rates
  const handleResetDefaults = () => {
    if (confirm('Reset all raw material rates, bag packaging fees, and 1-Ton price calculations to defaults?')) {
      setPrices(defaultRawMaterialPrices);
      setBag50Fee(15);
      setBag30Fee(25);
      setBag20Fee(40);
      localStorage.removeItem('raw_material_prices');
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 3000);
    }
  };

  // Save & Publish rates site-wide
  const handlePublishPrices = () => {
    const timestamp = new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' });
    localStorage.setItem('raw_material_prices', JSON.stringify(prices));
    localStorage.setItem('raw_material_prices_updated', `${timestamp} IST`);
    setLastSavedTime(`${timestamp} IST`);
    
    // Dispatch custom browser event so open pages recalculate live
    window.dispatchEvent(new Event('rawMaterialPricesUpdated'));
    
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 4000);
  };

  // Compute calculated metrics for all items
  const calculatedItems = prices.map((p) => calculate1TonPricing(p));
  const activeVariety = prices.find((p) => p.id === selectedVarietyId) || prices[0];
  const activeSimResult = calculateCustomOrderPricing(activeVariety, simTonnage, simBagSize);

  return (
    <div className="space-y-6">
      
      {/* Section Header */}
      <div className="bg-gradient-to-r from-brand-dark via-gray-900 to-brand-primary p-6 rounded-2xl text-white shadow-xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 bg-brand-primary/20 text-brand-accent border border-brand-accent/30 text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider mb-2">
              <TrendingUp className="h-4 w-4" /> 1-Ton & Container Packaging Pricing Engine
            </div>
            <h2 className="text-2xl font-black tracking-tight">
              Raw Material, Bag Size (50/30/20kg) & Container Delivery Pricing
            </h2>
            <p className="text-xs text-gray-300 max-w-2xl mt-1">
              Continuously update raw material rates, freight fees, and packaging charges for <strong>50kg, 30kg & 20kg bags</strong>. Automatically computes 1-Ton & container weights with <strong>30% Exporter Profit Margin</strong> included.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowCustomerPreview(!showCustomerPreview)}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 border ${
                showCustomerPreview 
                  ? 'bg-amber-500 text-slate-950 border-amber-400 font-black' 
                  : 'bg-white/10 hover:bg-white/20 text-white border-white/20'
              }`}
            >
              <Eye className="h-4 w-4" />
              {showCustomerPreview ? 'Customer View (Margin Hidden)' : 'Admin View (Margin Exposed)'}
            </button>

            <button
              onClick={handlePublishPrices}
              className="bg-brand-primary hover:bg-brand-secondary text-white font-black px-5 py-2.5 rounded-xl text-xs uppercase tracking-wider shadow-lg shadow-brand-primary/30 flex items-center gap-2 transition-all"
            >
              <Save className="h-4 w-4" /> Publish Prices Site-Wide
            </button>
          </div>
        </div>
      </div>

      {savedSuccess && (
        <div className="bg-emerald-500/15 border border-emerald-500/30 text-emerald-800 dark:text-emerald-300 p-4 rounded-xl text-xs font-extrabold flex items-center justify-between animate-fadeIn">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-emerald-500" />
            <span>Prices & Bag Size Delivery rates successfully recalculated and published! (Last published: {lastSavedTime})</span>
          </div>
          <span className="text-[10px] bg-emerald-500 text-white px-2 py-0.5 rounded font-black uppercase">LIVE ACTIVE</span>
        </div>
      )}

      {/* Bag Size Packaging Delivery Fee Configurator */}
      <div className="bg-white dark:bg-brand-dark p-5 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm">
        <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-3 mb-4">
          <h3 className="font-extrabold text-xs text-brand-text dark:text-white uppercase tracking-wider flex items-center gap-2">
            <Package className="h-4 w-4 text-brand-primary" /> Separate Bag Packaging & Delivery Charge Controls (Per Metric Ton)
          </h3>
          <span className="text-[10px] text-gray-400 font-bold uppercase">
            Includes stitching, palletization, and handling per ton
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          
          {/* 50 kg Bag Config */}
          <div className="bg-brand-bg/50 dark:bg-brand-dark/50 p-3.5 rounded-xl border border-gray-200/80 dark:border-gray-800 space-y-2">
            <div className="flex justify-between items-center">
              <span className="font-black text-xs text-brand-text dark:text-white">50 kg Sacks (Standard)</span>
              <span className="text-[10px] bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-2 py-0.5 rounded font-bold">20 bags / Ton</span>
            </div>
            <div className="flex items-center gap-2">
              <label className="text-[11px] text-gray-500 font-bold">Fee / Ton ($):</label>
              <input
                type="number"
                value={bag50Fee}
                onChange={(e) => handleStandardizeBagFees(Number(e.target.value), bag30Fee, bag20Fee)}
                className="w-24 px-2 py-1 text-xs font-black rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-brand-dark text-brand-primary"
              />
              <span className="text-[10px] text-gray-400 font-bold">(${(bag50Fee / 1000).toFixed(3)}/kg)</span>
            </div>
          </div>

          {/* 30 kg Bag Config */}
          <div className="bg-brand-bg/50 dark:bg-brand-dark/50 p-3.5 rounded-xl border border-gray-200/80 dark:border-gray-800 space-y-2">
            <div className="flex justify-between items-center">
              <span className="font-black text-xs text-brand-text dark:text-white">30 kg Sacks (Medium)</span>
              <span className="text-[10px] bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-2 py-0.5 rounded font-bold">33.3 bags / Ton</span>
            </div>
            <div className="flex items-center gap-2">
              <label className="text-[11px] text-gray-500 font-bold">Fee / Ton ($):</label>
              <input
                type="number"
                value={bag30Fee}
                onChange={(e) => handleStandardizeBagFees(bag50Fee, Number(e.target.value), bag20Fee)}
                className="w-24 px-2 py-1 text-xs font-black rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-brand-dark text-brand-primary"
              />
              <span className="text-[10px] text-gray-400 font-bold">(${(bag30Fee / 1000).toFixed(3)}/kg)</span>
            </div>
          </div>

          {/* 20 kg Bag Config */}
          <div className="bg-brand-bg/50 dark:bg-brand-dark/50 p-3.5 rounded-xl border border-gray-200/80 dark:border-gray-800 space-y-2">
            <div className="flex justify-between items-center">
              <span className="font-black text-xs text-brand-text dark:text-white">20 kg Sacks (Premium)</span>
              <span className="text-[10px] bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-2 py-0.5 rounded font-bold">50 bags / Ton</span>
            </div>
            <div className="flex items-center gap-2">
              <label className="text-[11px] text-gray-500 font-bold">Fee / Ton ($):</label>
              <input
                type="number"
                value={bag20Fee}
                onChange={(e) => handleStandardizeBagFees(bag50Fee, bag30Fee, Number(e.target.value))}
                className="w-24 px-2 py-1 text-xs font-black rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-brand-dark text-brand-primary"
              />
              <span className="text-[10px] text-gray-400 font-bold">(${(bag20Fee / 1000).toFixed(3)}/kg)</span>
            </div>
          </div>

        </div>
      </div>

      {/* TONNAGE & CONTAINER WEIGHT SIMULATOR PANEL */}
      <div className="bg-white dark:bg-brand-dark p-6 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm space-y-4">
        
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-gray-100 dark:border-gray-800 pb-3">
          <div>
            <h3 className="font-extrabold text-sm text-brand-text dark:text-white uppercase tracking-wider flex items-center gap-2">
              <Calculator className="h-4.5 w-4.5 text-brand-primary" /> Live Ton & Container Weight Requirement Simulator
            </h3>
            <p className="text-xs text-gray-500 mt-0.5">
              Simulate total price, packaging costs, delivery charges, and 30% margin for any tonnage or container capacity.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-gray-500">Chilli Variety:</span>
            <select
              value={selectedVarietyId}
              onChange={(e) => setSelectedVarietyId(e.target.value)}
              className="bg-brand-bg dark:bg-brand-dark border border-gray-200 dark:border-gray-700 rounded-xl px-3 py-1.5 text-xs font-extrabold text-brand-text dark:text-white"
            >
              {prices.map((p) => (
                <option key={p.id} value={p.id}>{p.name}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Simulator Parameters */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          
          <div>
            <label className="block text-[11px] font-extrabold text-gray-500 uppercase tracking-wider mb-1">
              Select Tonnage Requirement
            </label>
            <div className="flex gap-1.5 flex-wrap">
              {[1, 5, 10, 14, 24].map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setSimTonnage(t)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-extrabold transition-all ${
                    simTonnage === t 
                      ? 'bg-brand-primary text-white shadow-md' 
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200'
                  }`}
                >
                  {t === 14 ? '14 MT (20ft FCL)' : t === 24 ? '24 MT (40ft FCL)' : `${t} Ton`}
                </button>
              ))}
            </div>
            <div className="mt-2 flex items-center gap-1.5">
              <span className="text-xs text-gray-400 font-bold">Custom MT:</span>
              <input
                type="number"
                min="1"
                value={simTonnage}
                onChange={(e) => setSimTonnage(Math.max(1, Number(e.target.value)))}
                className="w-24 px-2 py-1 text-xs font-black rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-brand-dark text-brand-text dark:text-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-extrabold text-gray-500 uppercase tracking-wider mb-1">
              Packaging Bag Size
            </label>
            <div className="grid grid-cols-3 gap-1.5">
              {[50, 30, 20].map((b) => (
                <button
                  key={b}
                  type="button"
                  onClick={() => setSimBagSize(b as any)}
                  className={`py-2 px-2 rounded-xl text-xs font-black text-center transition-all ${
                    simBagSize === b 
                      ? 'bg-brand-primary text-white shadow-md' 
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200'
                  }`}
                >
                  {b} kg Bags
                </button>
              ))}
            </div>
            <span className="text-[10px] text-gray-400 font-bold mt-1.5 block">
              Bags Required: {activeSimResult.totalBagsRequired.toLocaleString()} pcs
            </span>
          </div>

          {/* Simulator Output Summary */}
          <div className="bg-gradient-to-br from-brand-primary to-brand-secondary text-white p-4 rounded-xl shadow-md flex flex-col justify-between">
            <div>
              <span className="text-[10px] text-white/80 uppercase font-black tracking-wider block">
                Calculated Price ({simTonnage} MT in {simBagSize}kg Bags)
              </span>
              <div className="text-2xl font-black mt-1">
                {formatPrice(activeSimResult.totalCustomerPriceUSD)}
              </div>
              <span className="text-[10px] text-white/80 block mt-0.5 font-bold">
                Rate per Ton: {formatPrice(activeSimResult.effectivePricePerTonCustomerUSD)} / MT
              </span>
            </div>

            {!showCustomerPreview && (
              <div className="mt-2 pt-2 border-t border-white/20 text-[10px] text-white/90 space-y-0.5 font-semibold">
                <div>Raw Material: {formatPrice(activeSimResult.rawMaterialTotalCost)}</div>
                <div>Freight + Bags: {formatPrice(activeSimResult.totalDeliveryCost + activeSimResult.totalPackagingCost)}</div>
                <div className="font-extrabold text-amber-200">30% Profit: +{formatPrice(activeSimResult.totalProfitMarginAmount)}</div>
              </div>
            )}
          </div>

        </div>

      </div>

      {/* Main Table: Variety Rates with 50kg / 30kg / 20kg Bag Pricing Matrix */}
      <div className="bg-white dark:bg-brand-dark rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          
          <thead>
            <tr className="bg-brand-bg/50 dark:bg-brand-dark/80 border-b border-gray-100 dark:border-gray-800 text-[10px] font-black uppercase tracking-wider text-brand-text/50 dark:text-brand-bg/50">
              <th className="p-4">Chilli Variety</th>
              <th className="p-4">Raw Material ($/kg)</th>
              <th className="p-4">Freight ($/ton)</th>
              <th className="p-4 text-emerald-600 dark:text-emerald-400">50kg Bag (1 Ton)</th>
              <th className="p-4 text-blue-600 dark:text-blue-400">30kg Bag (1 Ton)</th>
              <th className="p-4 text-purple-600 dark:text-purple-400">20kg Bag (1 Ton)</th>
              {!showCustomerPreview && (
                <th className="p-4 text-amber-600 dark:text-amber-400">30% Profit (1 Ton)</th>
              )}
              <th className="p-4 text-right text-brand-primary dark:text-brand-accent">20ft Container (14 MT)</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100 dark:divide-gray-800/50">
            {prices.map((item) => {
              const calc = calculate1TonPricing(item);

              return (
                <tr key={item.id} className="hover:bg-brand-bg/30 dark:hover:bg-brand-dark/30 transition-colors">
                  
                  {/* Product Title */}
                  <td className="p-4 font-black text-brand-text dark:text-white">
                    {item.name}
                    <span className="block text-[10px] font-medium text-gray-400">
                      ID: {item.id} • {item.category}
                    </span>
                  </td>

                  {/* Raw Material Rate Input */}
                  <td className="p-4">
                    <div className="flex items-center gap-1">
                      <span className="font-extrabold text-gray-400">$</span>
                      <input
                        type="number"
                        step="0.05"
                        min="0"
                        value={item.rawMaterialPerKgUSD}
                        onChange={(e) => handleRateChange(item.id, parseFloat(e.target.value) || 0)}
                        className="w-24 px-2 py-1.5 text-xs font-black rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-brand-dark focus:ring-2 focus:ring-brand-primary text-brand-text dark:text-white"
                      />
                      <span className="text-[10px] text-gray-400 font-bold">/ kg</span>
                    </div>
                  </td>

                  {/* Delivery Charges per 1 Ton Input */}
                  <td className="p-4">
                    <div className="flex items-center gap-1">
                      <span className="font-extrabold text-gray-400">$</span>
                      <input
                        type="number"
                        step="10"
                        min="0"
                        value={item.deliveryPerTonUSD}
                        onChange={(e) => handleFreightChange(item.id, parseFloat(e.target.value) || 0)}
                        className="w-20 px-2 py-1 text-xs font-extrabold rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-brand-dark text-blue-600 dark:text-blue-400"
                      />
                      <span className="text-[9px] text-gray-400 font-bold">/ ton</span>
                    </div>
                  </td>

                  {/* 50 kg Bag Rate (1 Ton) */}
                  <td className="p-4 font-black text-emerald-700 dark:text-emerald-400">
                    {formatPrice(calc.bagOptions.bag50kg.finalPricePerTonUSD)}
                    <span className="block text-[9px] font-normal text-gray-400">20 bags / Ton</span>
                  </td>

                  {/* 30 kg Bag Rate (1 Ton) */}
                  <td className="p-4 font-black text-blue-700 dark:text-blue-400">
                    {formatPrice(calc.bagOptions.bag30kg.finalPricePerTonUSD)}
                    <span className="block text-[9px] font-normal text-gray-400">33.3 bags / Ton</span>
                  </td>

                  {/* 20 kg Bag Rate (1 Ton) */}
                  <td className="p-4 font-black text-purple-700 dark:text-purple-400">
                    {formatPrice(calc.bagOptions.bag20kg.finalPricePerTonUSD)}
                    <span className="block text-[9px] font-normal text-gray-400">50 bags / Ton</span>
                  </td>

                  {/* Admin 30% Profit Breakdown Column */}
                  {!showCustomerPreview && (
                    <td className="p-4 font-extrabold text-amber-600 dark:text-amber-400">
                      +{formatPrice(calc.profitMarginAmountPerTon)}
                      <span className="block text-[9px] font-semibold text-amber-700/60">(30% Margin)</span>
                    </td>
                  )}

                  {/* 20ft Container (14 Tons) */}
                  <td className="p-4 text-right font-black text-brand-primary dark:text-brand-accent">
                    {formatPrice(calc.finalPricePerContainer20ftUSD)}
                    <span className="block text-[9px] text-gray-400 font-normal">14 MT Load</span>
                  </td>

                </tr>
              );
            })}
          </tbody>

        </table>
      </div>

    </div>
  );
}
