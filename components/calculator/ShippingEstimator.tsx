'use client';

import React, { useState, useEffect } from 'react';
import { useCurrency } from '@/context/CurrencyContext';
import { defaultRawMaterialPrices, calculateCustomOrderPricing, RawMaterialPrice } from '@/data/dynamicPricing';
import { Truck, Navigation, Anchor, DollarSign, Calendar, Package } from 'lucide-react';

interface PortDetails {
  name: string;
  country: string;
  freight20ft: number; // in USD per 20ft container
  transitDays: number;
}

const ports: Record<string, PortDetails> = {
  rotterdam: { name: 'Port of Rotterdam', country: 'Netherlands', freight20ft: 3200, transitDays: 24 },
  newyork: { name: 'Port of New York / New Jersey', country: 'USA', freight20ft: 4500, transitDays: 28 },
  tokyo: { name: 'Port of Tokyo', country: 'Japan', freight20ft: 1400, transitDays: 14 },
  dubai: { name: 'Port of Jebel Ali', country: 'UAE', freight20ft: 1600, transitDays: 10 },
  singapore: { name: 'Port of Singapore', country: 'Singapore', freight20ft: 850, transitDays: 7 },
  hamburg: { name: 'Port of Hamburg', country: 'Germany', freight20ft: 3400, transitDays: 26 },
};

export default function ShippingEstimator() {
  const { formatPrice } = useCurrency();
  const [selectedPort, setSelectedPort] = useState('rotterdam');
  const [incoterm, setIncoterm] = useState<'FOB' | 'CIF' | 'CNF' | 'DDP'>('CIF');
  const [quantityMT, setQuantityMT] = useState<number>(14); // Default 14 MT (1 x 20ft container)
  const [bagSize, setBagSize] = useState<50 | 30 | 20>(50); // 50kg, 30kg, 20kg
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

  const port = ports[selectedPort] || ports.rotterdam;
  const activeVariety = rawPrices[0]; // Teja S17 as baseline reference

  const localHandlingUSD = 500; // Guntur loading & port clearance per container

  const calculateEstimate = () => {
    // 20ft container capacity: 14 MT
    const containers = Math.max(1, Math.ceil(quantityMT / 14));
    const oceanFreightUSD = port.freight20ft * containers;
    const oceanFreightPerTon = oceanFreightUSD / quantityMT;

    // Use dynamic order pricing engine (including bag packaging + delivery + 30% margin)
    const customPricing = calculateCustomOrderPricing(activeVariety, quantityMT, bagSize, oceanFreightPerTon);

    let freightCost = 0;
    let insuranceCost = 0;
    let clearanceAndDuty = 0;
    let localLoadingCost = localHandlingUSD * containers;

    if (incoterm === 'FOB') {
      freightCost = 0;
      insuranceCost = 0;
    } else if (incoterm === 'CNF') {
      freightCost = oceanFreightUSD;
    } else if (incoterm === 'CIF') {
      freightCost = oceanFreightUSD;
      insuranceCost = customPricing.rawMaterialTotalCost * 0.0025; // 0.25% marine insurance
    } else if (incoterm === 'DDP') {
      freightCost = oceanFreightUSD;
      insuranceCost = customPricing.rawMaterialTotalCost * 0.0025;
      clearanceAndDuty = 1200 * containers + customPricing.rawMaterialTotalCost * 0.05;
    }

    const totalSellerCostUSD = localLoadingCost + freightCost + insuranceCost + clearanceAndDuty;

    return {
      containers,
      transitDays: port.transitDays,
      oceanFreightUSD,
      localLoadingCost,
      freightCost,
      insuranceCost,
      clearanceAndDuty,
      totalSellerCostUSD,
      customPricing
    };
  };

  const results = calculateEstimate();

  return (
    <div className="bg-white dark:bg-brand-dark p-6 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-800">
      <div className="flex items-center gap-3 border-b border-gray-100 dark:border-gray-800 pb-4 mb-6">
        <div className="bg-brand-primary/10 p-2.5 rounded-lg text-brand-primary">
          <Truck className="h-6 w-6" />
        </div>
        <div>
          <h3 className="font-extrabold text-lg text-brand-text dark:text-white">Freight & Incoterms (50/30/20kg Sacks) Estimator</h3>
          <p className="text-xs text-brand-text/60 dark:text-brand-bg/60">Estimates freight charges & total price based on tonnage and bag size</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Controls */}
        <div className="space-y-4">
          <div>
            <label className="text-xs font-bold text-brand-text/70 dark:text-brand-bg/70 uppercase block mb-1">
              Destination Port
            </label>
            <select
              value={selectedPort}
              onChange={(e) => setSelectedPort(e.target.value)}
              className="w-full bg-brand-bg dark:bg-brand-dark border border-gray-200 dark:border-gray-800 rounded-lg p-2.5 text-sm font-semibold"
            >
              {Object.entries(ports).map(([key, p]) => (
                <option key={key} value={key}>
                  {p.name} ({p.country}) — ${p.freight20ft} / 20ft
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-brand-text/70 dark:text-brand-bg/70 uppercase block mb-1">
                Incoterm
              </label>
              <select
                value={incoterm}
                onChange={(e) => setIncoterm(e.target.value as any)}
                className="w-full bg-brand-bg dark:bg-brand-dark border border-gray-200 dark:border-gray-800 rounded-lg p-2.5 text-sm font-semibold"
              >
                <option value="FOB">FOB (Free On Board)</option>
                <option value="CNF">CNF (Cost & Freight)</option>
                <option value="CIF">CIF (Cost, Ins, Freight)</option>
                <option value="DDP">DDP (Delivered Duty Paid)</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-brand-text/70 dark:text-brand-bg/70 uppercase block mb-1">
                Bag Size Requirement
              </label>
              <select
                value={bagSize}
                onChange={(e) => setBagSize(Number(e.target.value) as any)}
                className="w-full bg-brand-bg dark:bg-brand-dark border border-gray-200 dark:border-gray-800 rounded-lg p-2.5 text-sm font-extrabold text-brand-primary"
              >
                <option value={50}>50 kg Sacks</option>
                <option value={30}>30 kg Sacks</option>
                <option value={20}>20 kg Sacks</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-brand-text/70 dark:text-brand-bg/70 uppercase block mb-1">
              Required Volume (Metric Tons)
            </label>
            <input
              type="number"
              min={1}
              value={quantityMT}
              onChange={(e) => setQuantityMT(Math.max(1, Number(e.target.value)))}
              className="w-full bg-brand-bg dark:bg-brand-dark border border-gray-200 dark:border-gray-800 rounded-lg p-2.5 text-sm font-bold"
            />
          </div>

          <div className="p-3 bg-brand-primary/5 rounded-lg border border-brand-primary/10 text-[10px] text-brand-text/70 dark:text-brand-bg/70 leading-relaxed">
            <strong>Packaging Note:</strong> Bag size affects container loading density and handling fee. Selected: <strong>{bagSize} kg Sacks</strong> ({results.customPricing.totalBagsRequired.toLocaleString()} total bags).
          </div>
        </div>

        {/* Results */}
        <div className="bg-brand-bg/40 dark:bg-brand-dark/40 border border-gray-100 dark:border-gray-800/80 p-5 rounded-xl flex flex-col justify-between space-y-4">
          <div className="space-y-4">
            <h4 className="font-bold text-sm text-brand-primary dark:text-brand-accent uppercase tracking-wider">
              Transit & Logistics Estimates
            </h4>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white dark:bg-brand-dark border border-gray-100 dark:border-gray-800 p-3 rounded-lg text-center">
                <span className="text-[10px] text-brand-text/50 dark:text-brand-bg/50 uppercase block">Transit Time</span>
                <span className="text-lg font-black text-brand-primary dark:text-brand-accent flex items-center justify-center gap-1">
                  <Calendar className="h-4 w-4 shrink-0" /> {results.transitDays} <span className="text-xs font-normal">Days</span>
                </span>
              </div>

              <div className="bg-white dark:bg-brand-dark border border-gray-100 dark:border-gray-800 p-3 rounded-lg text-center">
                <span className="text-[10px] text-brand-text/50 dark:text-brand-bg/50 uppercase block">Containers Required</span>
                <span className="text-lg font-black text-brand-text dark:text-white flex items-center justify-center gap-1">
                  <Anchor className="h-4 w-4 shrink-0" /> {results.containers} x 20ft FCL
                </span>
              </div>
            </div>

            <div className="space-y-2 border-t border-gray-200/50 dark:border-gray-800 pt-3 text-xs">
              <div className="flex justify-between items-center">
                <span className="text-brand-text/60 dark:text-brand-bg/60">Ocean Freight ({incoterm}):</span>
                <span className="font-bold text-brand-text dark:text-white">
                  {incoterm === 'FOB' ? 'Paid by Buyer' : formatPrice(results.freightCost)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-brand-text/60 dark:text-brand-bg/60">Packaging Fee ({bagSize}kg Sacks):</span>
                <span className="font-bold text-brand-text dark:text-white">
                  {formatPrice(results.customPricing.totalPackagingCost)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-brand-text/60 dark:text-brand-bg/60">Local Port Loading & Customs:</span>
                <span className="font-bold text-brand-text dark:text-white">
                  {formatPrice(results.localLoadingCost)}
                </span>
              </div>
              <div className="flex justify-between items-center font-extrabold text-sm border-t border-gray-200 dark:border-gray-800 pt-2 text-brand-primary dark:text-brand-accent">
                <span>Total Export Order Value:</span>
                <span>{formatPrice(results.customPricing.totalCustomerPriceUSD)}</span>
              </div>
            </div>
          </div>

          <div className="p-2.5 bg-yellow-500/10 border border-yellow-500/20 text-[9px] text-yellow-700 dark:text-yellow-400 rounded-lg">
            * All-inclusive rate includes Raw Material + {bagSize}kg Packaging + Delivery Freight + 30% Exporter Margin.
          </div>
        </div>
      </div>
    </div>
  );
}
