'use client';

import React, { useState, useEffect } from 'react';
import { chillies } from '@/data/chillies';
import { useCurrency } from '@/context/CurrencyContext';
import { defaultRawMaterialPrices, calculateCustomOrderPricing, RawMaterialPrice } from '@/data/dynamicPricing';
import { Scale, Package, Archive, Truck, DollarSign, Info } from 'lucide-react';

export default function ContainerCalculator() {
  const { formatPrice } = useCurrency();
  const [selectedChilli, setSelectedChilli] = useState(chillies[0].id);
  const [bagSize, setBagSize] = useState<50 | 30 | 20>(50); // 50kg, 30kg, 20kg
  const [calculationMode, setCalculationMode] = useState<'tonnage' | 'containers'>('tonnage');
  const [inputVal, setInputVal] = useState<number>(14); // Default 14 MT (1 x 20ft container)
  const [rawPrices, setRawPrices] = useState<RawMaterialPrice[]>(defaultRawMaterialPrices);

  // Sync with dynamic raw material rates from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('raw_material_prices');
    if (saved) {
      try {
        setRawPrices(JSON.parse(saved));
      } catch (e) {}
    }
  }, []);

  const selectedProduct = chillies.find((c) => c.id === selectedChilli) || chillies[0];
  const activeRawItem = rawPrices.find((p) => p.id === selectedChilli) || rawPrices[0];

  const isPowderOrSeed = selectedProduct.id.includes('powder') || selectedProduct.id.includes('seed');
  const max20ftMT = isPowderOrSeed ? 19 : 14;
  const max40ftMT = isPowderOrSeed ? 27 : 24;

  const calculateCapacity = () => {
    let targetTons = 0;
    let containerCount20 = 0;
    let containerCount40 = 0;

    if (calculationMode === 'tonnage') {
      targetTons = Math.max(1, inputVal);
      if (targetTons <= max20ftMT) {
        containerCount20 = 1;
      } else if (targetTons > max20ftMT && targetTons <= max40ftMT) {
        containerCount40 = 1;
      } else {
        containerCount40 = Math.floor(targetTons / max40ftMT);
        const remainder = targetTons % max40ftMT;
        if (remainder > 0) {
          if (remainder <= max20ftMT) {
            containerCount20 = 1;
          } else {
            containerCount40 += 1;
          }
        }
      }
    } else {
      containerCount20 = inputVal;
      targetTons = containerCount20 * max20ftMT;
    }

    const pricing = calculateCustomOrderPricing(activeRawItem, targetTons, bagSize);

    return {
      targetTons,
      containerCount20,
      containerCount40,
      max20ftMT,
      max40ftMT,
      pricing
    };
  };

  const results = calculateCapacity();

  return (
    <div className="bg-white dark:bg-brand-dark p-6 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-800">
      <div className="flex items-center gap-3 border-b border-gray-100 dark:border-gray-800 pb-4 mb-6">
        <div className="bg-brand-primary/10 p-2.5 rounded-lg text-brand-primary">
          <Archive className="h-6 w-6" />
        </div>
        <div>
          <h3 className="font-extrabold text-lg text-brand-text dark:text-white">Container Loading & Bag Packaging Calculator</h3>
          <p className="text-xs text-brand-text/60 dark:text-brand-bg/60">Calculates bag count, container weight, delivery fees & all-inclusive pricing</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Controls */}
        <div className="space-y-4">
          <div>
            <label className="text-xs font-bold text-brand-text/70 dark:text-brand-bg/70 uppercase block mb-1">
              Chilli Variety
            </label>
            <select
              value={selectedChilli}
              onChange={(e) => setSelectedChilli(e.target.value)}
              className="w-full bg-brand-bg dark:bg-brand-dark border border-gray-200 dark:border-gray-800 rounded-lg p-2.5 text-sm font-semibold text-brand-text dark:text-white"
            >
              {chillies.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name} ({c.heat} Heat)
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-brand-text/70 dark:text-brand-bg/70 uppercase block mb-1">
                Select Bag Packaging Size
              </label>
              <select
                value={bagSize}
                onChange={(e) => setBagSize(Number(e.target.value) as any)}
                className="w-full bg-brand-bg dark:bg-brand-dark border border-gray-200 dark:border-gray-800 rounded-lg p-2.5 text-sm font-bold text-brand-primary"
              >
                <option value={50}>50 kg Jute/PP Sacks (20 bags/ton)</option>
                <option value={30}>30 kg Jute/PP Sacks (33.3 bags/ton)</option>
                <option value={20}>20 kg Vacuum Sacks (50 bags/ton)</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-brand-text/70 dark:text-brand-bg/70 uppercase block mb-1">
                Calculation Mode
              </label>
              <select
                value={calculationMode}
                onChange={(e) => {
                  setCalculationMode(e.target.value as any);
                  setInputVal(e.target.value === 'tonnage' ? 14 : 1);
                }}
                className="w-full bg-brand-bg dark:bg-brand-dark border border-gray-200 dark:border-gray-800 rounded-lg p-2.5 text-sm"
              >
                <option value="tonnage">Target Tonnage (MT)</option>
                <option value="containers">20ft Containers</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-brand-text/70 dark:text-brand-bg/70 uppercase block mb-1">
              {calculationMode === 'tonnage' ? 'Required Order Weight (Metric Tons)' : 'Number of 20ft Containers'}
            </label>
            <input
              type="number"
              min={1}
              value={inputVal}
              onChange={(e) => setInputVal(Math.max(1, Number(e.target.value)))}
              className="w-full bg-brand-bg dark:bg-brand-dark border border-gray-200 dark:border-gray-800 rounded-lg p-2.5 text-sm font-bold"
            />
          </div>
        </div>

        {/* Results */}
        <div className="bg-brand-bg/40 dark:bg-brand-dark/40 border border-gray-100 dark:border-gray-800/80 p-5 rounded-xl flex flex-col justify-between space-y-4">
          <div className="space-y-4">
            <h4 className="font-bold text-sm text-brand-primary dark:text-brand-accent uppercase tracking-wider flex items-center justify-between">
              <span>Order & Packaging Summary</span>
              <span className="text-[10px] bg-brand-primary/10 px-2 py-0.5 rounded text-brand-primary font-black">
                {bagSize} KG BAGS
              </span>
            </h4>

            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white dark:bg-brand-dark border border-gray-100 dark:border-gray-800 p-3 rounded-lg text-center">
                <span className="text-[10px] text-brand-text/50 dark:text-brand-bg/50 uppercase block">Total Weight</span>
                <span className="text-xl font-black text-brand-primary dark:text-brand-accent">
                  {results.targetTons} <span className="text-xs font-normal">MT</span>
                </span>
              </div>

              <div className="bg-white dark:bg-brand-dark border border-gray-100 dark:border-gray-800 p-3 rounded-lg text-center">
                <span className="text-[10px] text-brand-text/50 dark:text-brand-bg/50 uppercase block">Required Bags ({bagSize}kg)</span>
                <span className="text-xl font-black text-brand-text dark:text-white">
                  {results.pricing.totalBagsRequired.toLocaleString()} <span className="text-xs font-normal">pcs</span>
                </span>
              </div>
            </div>

            <div className="space-y-2 border-t border-gray-200/50 dark:border-gray-800 pt-3 text-xs">
              <div className="flex justify-between items-center">
                <span className="text-brand-text/60 dark:text-brand-bg/60">Estimated 20ft FCL Containers:</span>
                <span className="font-bold text-brand-text dark:text-white">{results.containerCount20} x 20ft</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-brand-text/60 dark:text-brand-bg/60">Packaging & Handling ({bagSize}kg):</span>
                <span className="font-bold text-emerald-600 dark:text-emerald-400">Included ({bagSize}kg Sacks)</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-brand-text/60 dark:text-brand-bg/60">Standard 20ft Load Limit:</span>
                <span className="font-bold text-brand-text dark:text-white">~{results.max20ftMT} Metric Tons</span>
              </div>
            </div>
          </div>

          {/* All-Inclusive Wholesale Rate (Customer View) */}
          <div className="bg-gradient-to-r from-brand-primary to-brand-secondary text-white p-4 rounded-xl shadow-md">
            <div className="flex justify-between items-center">
              <div>
                <span className="text-[10px] font-extrabold text-white/80 uppercase block">
                  All-Inclusive Wholesale Price ({results.targetTons} MT in {bagSize}kg Bags)
                </span>
                <div className="text-2xl font-black mt-0.5">
                  {formatPrice(results.pricing.totalCustomerPriceUSD)}
                </div>
              </div>
              <div className="text-right text-[11px] font-bold text-white/90">
                Rate: {formatPrice(results.pricing.effectivePricePerTonCustomerUSD)} / MT
              </div>
            </div>
            <span className="text-[9px] text-white/75 block mt-1">
              Includes Goods + {bagSize}kg Bags Packaging + Delivery Freight (Doorstep/Port)
            </span>
          </div>

        </div>
      </div>
    </div>
  );
}
