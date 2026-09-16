'use client';

import React, { useState } from 'react';
import { 
  Globe, MapPin, Anchor, Navigation, Plane, Compass, Info, CheckCircle2, ShieldCheck, ArrowRight 
} from 'lucide-react';
import Link from 'next/link';

export interface RouteDestination {
  id: string;
  name: string;
  country: string;
  flag: string;
  port: string;
  transitDays: string;
  x: number; // SVG X coordinate on 1000x500 vector map
  y: number; // SVG Y coordinate on 1000x500 vector map
  carriers: string[];
  incoterms: string[];
  routeType: 'Ocean Freight' | 'Air Courier' | 'Dual multimodal';
}

export const defaultExportDestinations: RouteDestination[] = [
  {
    id: 'us-ny',
    name: 'New York / NJ',
    country: 'United States',
    flag: '',
    port: 'Port of New York & New Jersey',
    transitDays: '26 - 30 Days',
    x: 235,
    y: 160,
    carriers: ['Maersk Line', 'MSC', 'ONE', 'Hapag-Lloyd'],
    incoterms: ['FOB', 'CIF', 'CNF', 'DDP'],
    routeType: 'Ocean Freight'
  },
  {
    id: 'nl-rot',
    name: 'Rotterdam',
    country: 'Netherlands (Europe Hub)',
    flag: '',
    port: 'Port of Rotterdam',
    transitDays: '22 - 25 Days',
    x: 485,
    y: 115,
    carriers: ['CMA CGM', 'Maersk', 'MSC', 'Evergreen'],
    incoterms: ['FOB', 'CIF', 'CNF', 'DDP'],
    routeType: 'Ocean Freight'
  },
  {
    id: 'ae-dxb',
    name: 'Dubai / Jebel Ali',
    country: 'United Arab Emirates',
    flag: '',
    port: 'Jebel Ali Port, Dubai',
    transitDays: '7 - 10 Days',
    x: 575,
    y: 210,
    carriers: ['DP World', 'MSC', 'OOCL', 'COSCO'],
    incoterms: ['FOB', 'CIF', 'CNF', 'DDP'],
    routeType: 'Dual multimodal'
  },
  {
    id: 'sg-sin',
    name: 'Singapore Port',
    country: 'Singapore',
    flag: '',
    port: 'Port of Singapore Authority',
    transitDays: '5 - 7 Days',
    x: 770,
    y: 295,
    carriers: ['PIL', 'ONE', 'CMA CGM', 'Maersk'],
    incoterms: ['FOB', 'CIF', 'CNF', 'DDP'],
    routeType: 'Ocean Freight'
  },
  {
    id: 'jp-tyo',
    name: 'Tokyo / Yokohama',
    country: 'Japan',
    flag: '',
    port: 'Port of Tokyo',
    transitDays: '12 - 15 Days',
    x: 865,
    y: 175,
    carriers: ['ONE (Ocean Network Express)', 'NYK', 'MOL'],
    incoterms: ['FOB', 'CIF', 'CNF'],
    routeType: 'Ocean Freight'
  },
  {
    id: 'de-ham',
    name: 'Hamburg',
    country: 'Germany',
    flag: '',
    port: 'Port of Hamburg',
    transitDays: '23 - 26 Days',
    x: 505,
    y: 108,
    carriers: ['Hapag-Lloyd', 'Maersk', 'MSC'],
    incoterms: ['FOB', 'CIF', 'DDP'],
    routeType: 'Ocean Freight'
  },
  {
    id: 'uk-lon',
    name: 'London Gateway',
    country: 'United Kingdom',
    flag: '',
    port: 'London Gateway / Felixstowe',
    transitDays: '21 - 24 Days',
    x: 465,
    y: 112,
    carriers: ['Maersk', 'MSC', 'CMA CGM'],
    incoterms: ['FOB', 'CIF', 'DDP'],
    routeType: 'Ocean Freight'
  },
  {
    id: 'au-syd',
    name: 'Sydney / Melbourne',
    country: 'Australia',
    flag: '',
    port: 'Port Botany, Sydney',
    transitDays: '16 - 19 Days',
    x: 875,
    y: 390,
    carriers: ['ANL', 'Maersk', 'Pacific Forum Line'],
    incoterms: ['FOB', 'CIF', 'CNF'],
    routeType: 'Ocean Freight'
  }
];

// Origin Point: Telangana, India Coordinates on this Vector Map
const originTelangana = {
  name: 'India, Telangana',
  subtitle: 'Telangana Logistics Hub & Guntur Processing Center',
  x: 665,
  y: 230
};

export default function ExportRouteMap() {
  const [selectedDest, setSelectedDest] = useState<RouteDestination>(defaultExportDestinations[0]);

  return (
    <div className="bg-white dark:bg-brand-dark p-6 sm:p-8 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-xl space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-gray-100 dark:border-gray-800">
        <div>
          <div className="inline-flex items-center gap-2 bg-brand-primary/10 text-brand-primary dark:text-brand-accent text-xs font-black px-3 py-1.5 rounded-full uppercase tracking-wider mb-2">
            <Globe className="h-4 w-4 animate-spin text-brand-primary" /> Vector Trade Route Engine
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-brand-text dark:text-white flex items-center gap-2">
            Export Network Starting from <span className="text-brand-primary">India, Telangana</span>
          </h2>
          <p className="text-xs sm:text-sm text-brand-text/60 dark:text-brand-bg/60 mt-1 max-w-2xl">
            Dispatching directly from <strong>Telangana, India</strong> (via Hyderabad Airport & gateway sea ports) to global destinations.
          </p>
        </div>

        {/* Origin Badge */}
        <div className="bg-gradient-to-br from-brand-primary to-brand-secondary text-white p-3.5 rounded-2xl flex items-center gap-3 shadow-md shadow-brand-primary/20 shrink-0">
          <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center text-white shrink-0 font-black text-lg">
            🇮🇳
          </div>
          <div>
            <span className="text-[10px] text-white/80 uppercase font-black tracking-widest block">Dispatch Origin</span>
            <strong className="text-sm font-black block">India, Telangana</strong>
            <span className="text-[10px] text-brand-accent font-bold block">Telangana Export Unit</span>
          </div>
        </div>
      </div>

      {/* Main Grid: Map & Details Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Vector Map Viewport Container */}
        <div className="lg:col-span-8 space-y-4">
          <div className="relative w-full aspect-[2/1] bg-[#1e232a] rounded-2xl overflow-hidden border border-gray-800 shadow-2xl p-2 group">
            
            {/* Real World Map Image Backdrop provided by user */}
            <img 
              src="/images/world-map-vector.png" 
              alt="Vector World Map Backdrop" 
              className="absolute inset-0 w-full h-full object-fill opacity-90 transition-all group-hover:scale-[1.01]"
            />

            {/* SVG Trade Route Layer Overlaid Exactly on Vector Map */}
            <svg viewBox="0 0 1000 500" className="w-full h-full relative z-10 select-none">
              
              {/* Dynamic Animated Trade Arcs starting from TELANGANA, INDIA (665, 230) */}
              {defaultExportDestinations.map((dest) => {
                const isSelected = selectedDest.id === dest.id;
                const startX = originTelangana.x; // 665
                const startY = originTelangana.y; // 230
                const endX = dest.x;
                const endY = dest.y;

                // Control point for smooth curved arc path
                const controlX = (startX + endX) / 2;
                const controlY = Math.min(startY, endY) - Math.abs(startX - endX) * 0.28;

                return (
                  <g key={dest.id} className="cursor-pointer" onClick={() => setSelectedDest(dest)}>
                    
                    {/* Shadow / Base Arc Line */}
                    <path
                      d={`M ${startX},${startY} Q ${controlX},${controlY} ${endX},${endY}`}
                      fill="none"
                      stroke={isSelected ? '#fbbf24' : '#ef4444'}
                      strokeWidth={isSelected ? '3' : '1.5'}
                      strokeDasharray={isSelected ? 'none' : '4,4'}
                      opacity={isSelected ? 1 : 0.45}
                      className="transition-all duration-300"
                    />

                    {/* Animated Pulse Beam along selected path */}
                    {isSelected && (
                      <path
                        d={`M ${startX},${startY} Q ${controlX},${controlY} ${endX},${endY}`}
                        fill="none"
                        stroke="#f59e0b"
                        strokeWidth="3.5"
                        strokeDasharray="8,16"
                        className="animate-pulse"
                      />
                    )}

                    {/* Destination Node Marker */}
                    <circle
                      cx={endX}
                      cy={endY}
                      r={isSelected ? '7' : '4.5'}
                      fill={isSelected ? '#fbbf24' : '#ef4444'}
                      stroke="#ffffff"
                      strokeWidth={isSelected ? '2' : '1'}
                      className="transition-all duration-300 hover:scale-150"
                    />

                    {/* Destination Flag & Name Label */}
                    <g transform={`translate(${endX + 6}, ${endY + 3})`}>
                      <rect 
                        x="-2" 
                        y="-10" 
                        width={dest.name.length * 6 + 24} 
                        height="14" 
                        rx="3" 
                        fill={isSelected ? '#1e293b' : '#0f172a'} 
                        opacity="0.85" 
                      />
                      <text
                        x="0"
                        y="0"
                        className={`text-[9px] font-black pointer-events-none ${
                          isSelected ? 'fill-amber-300 font-extrabold text-[10px]' : 'fill-white'
                        }`}
                      >
                        {dest.flag} {dest.name}
                      </text>
                    </g>

                  </g>
                );
              })}

              {/* ORIGIN PIN: INDIA, TELANGANA (665, 230) */}
              <g className="cursor-pointer">
                {/* Animated Pulsing Radar Rings */}
                <circle cx={originTelangana.x} cy={originTelangana.y} r="20" className="fill-red-500/30 animate-ping" />
                <circle cx={originTelangana.x} cy={originTelangana.y} r="10" className="fill-red-600/50 animate-pulse" />
                
                {/* Central Origin Pin Marker */}
                <circle
                  cx={originTelangana.x}
                  cy={originTelangana.y}
                  r="7"
                  fill="#dc2626"
                  stroke="#fbbf24"
                  strokeWidth="2.5"
                />
                
                {/* Telangana Origin Label Tag */}
                <g transform={`translate(${originTelangana.x - 75}, ${originTelangana.y - 34})`}>
                  <rect width="150" height="24" rx="6" fill="#991b1b" stroke="#fbbf24" strokeWidth="1.5" className="shadow-lg" />
                  <text x="75" y="15" textAnchor="middle" className="text-[10px] font-black fill-white tracking-wider">
                    📍 ORIGIN: TELANGANA, INDIA
                  </text>
                </g>
              </g>

            </svg>

            {/* Map Legend Overlay */}
            <div className="absolute bottom-3 left-3 right-3 bg-slate-950/90 backdrop-blur-md p-2.5 rounded-xl border border-white/10 flex flex-wrap items-center justify-between gap-2 text-[10px] text-gray-300">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-red-600 border border-amber-400 animate-pulse" />
                <strong className="text-amber-400">Dispatch Origin:</strong> India, Telangana (Hyderabad Air Hub & Gateway Ports)
              </div>
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
                <span>Active Destination Ports</span>
              </div>
            </div>

          </div>

          {/* Telangana Logistics Note */}
          <div className="flex items-start gap-3 p-4 bg-brand-primary/5 dark:bg-brand-dark/50 border border-brand-primary/10 dark:border-gray-800 rounded-2xl text-xs leading-relaxed text-brand-text/70 dark:text-brand-bg/70">
            <Info className="h-4 w-4 text-brand-primary shrink-0 mt-0.5" />
            <div>
              <strong className="font-extrabold text-brand-primary dark:text-brand-accent block mb-0.5">
                Telangana Logistics Dispatch Framework:
              </strong>
              <span>
                All international airfreight sample kits dispatch from <strong>Rajiv Gandhi International Airport (HYD), Telangana</strong>. Full container ocean shipments are dispatched via inland rail corridors from Telangana to Chennai & Krishnapatnam deepwater container ports.
              </span>
            </div>
          </div>
        </div>

        {/* Selected Destination Details Card */}
        <div className="lg:col-span-4 bg-brand-bg/40 dark:bg-brand-dark/60 border border-gray-200/80 dark:border-gray-800 p-6 rounded-2xl space-y-5">
          
          <div className="border-b border-gray-200 dark:border-gray-800 pb-4">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] text-brand-primary font-black uppercase tracking-widest bg-brand-primary/10 px-2.5 py-0.5 rounded-full">
                Active Trade Route
              </span>
              <span className="text-2xl">{selectedDest.flag}</span>
            </div>
            <h3 className="text-2xl font-black text-brand-text dark:text-white mt-1">
              {selectedDest.name}
            </h3>
            <span className="text-xs font-bold text-gray-500 block">
              Destination Country: {selectedDest.country}
            </span>
          </div>

          <div className="space-y-3.5 text-xs">
            
            <div className="flex justify-between items-center py-2 border-b border-gray-200/60 dark:border-gray-800">
              <span className="text-gray-500 font-bold flex items-center gap-1.5">
                <MapPin className="h-4 w-4 text-brand-primary" /> Dispatch Origin
              </span>
              <span className="font-black text-brand-primary dark:text-brand-accent">
                India, Telangana
              </span>
            </div>

            <div className="flex justify-between items-center py-2 border-b border-gray-200/60 dark:border-gray-800">
              <span className="text-gray-500 font-bold flex items-center gap-1.5">
                <Anchor className="h-4 w-4 text-blue-500" /> Entry Port
              </span>
              <span className="font-extrabold text-brand-text dark:text-white">
                {selectedDest.port}
              </span>
            </div>

            <div className="flex justify-between items-center py-2 border-b border-gray-200/60 dark:border-gray-800">
              <span className="text-gray-500 font-bold flex items-center gap-1.5">
                <Compass className="h-4 w-4 text-emerald-500" /> Transit Duration
              </span>
              <span className="font-black text-emerald-600 dark:text-emerald-400">
                {selectedDest.transitDays}
              </span>
            </div>

            {/* Approved Ocean Carriers */}
            <div>
              <span className="text-[10px] text-gray-400 font-black uppercase block mb-1.5">
                Approved Marine Shipping Lines
              </span>
              <div className="flex flex-wrap gap-1.5">
                {selectedDest.carriers.map((c) => (
                  <span key={c} className="bg-white dark:bg-brand-dark text-brand-text/90 dark:text-brand-bg/90 font-bold px-2.5 py-1 rounded-lg border border-gray-200 dark:border-gray-700">
                    {c}
                  </span>
                ))}
              </div>
            </div>

            {/* Incoterms */}
            <div>
              <span className="text-[10px] text-gray-400 font-black uppercase block mb-1.5">
                Supported Trade Incoterms
              </span>
              <div className="flex flex-wrap gap-1.5">
                {selectedDest.incoterms.map((t) => (
                  <span key={t} className="bg-brand-primary/10 border border-brand-primary/20 text-brand-primary dark:text-brand-accent font-extrabold px-2 py-0.5 rounded text-[10px]">
                    {t}
                  </span>
                ))}
              </div>
            </div>

          </div>

          <div className="pt-2">
            <a 
              href="/#rfq-section" 
              className="w-full bg-brand-primary hover:bg-brand-secondary text-white font-extrabold py-3.5 rounded-xl text-center text-xs block shadow-lg shadow-brand-primary/20 transition-all uppercase tracking-wider"
            >
              Get Freight Rate for {selectedDest.name}
            </a>
          </div>

        </div>

      </div>

    </div>
  );
}
