'use client';

import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { 
  Globe, MapPin, Anchor, Navigation, Plane, Compass, Info, CheckCircle2, ShieldCheck, Layers, Layers2
} from 'lucide-react';

export interface RouteDestination {
  id: string;
  name: string;
  country: string;
  flag: string;
  port: string;
  transitDays: string;
  lat: number;
  lng: number;
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
    lat: 40.7128,
    lng: -74.0060,
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
    lat: 51.9244,
    lng: 4.4777,
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
    lat: 25.2048,
    lng: 55.2708,
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
    lat: 1.3521,
    lng: 103.8198,
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
    lat: 35.6762,
    lng: 139.6503,
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
    lat: 53.5511,
    lng: 9.9937,
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
    lat: 51.5074,
    lng: -0.1278,
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
    lat: -33.8688,
    lng: 151.2093,
    carriers: ['ANL', 'Maersk', 'Pacific Forum Line'],
    incoterms: ['FOB', 'CIF', 'CNF'],
    routeType: 'Ocean Freight'
  }
];

// Origin Point: Telangana, India Coordinates
const originTelangana = {
  name: 'India, Telangana',
  lat: 17.3850,
  lng: 78.4867
};

export default function LeafletWorldMap() {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const [selectedDest, setSelectedDest] = useState<RouteDestination>(defaultExportDestinations[0]);
  const [mapStyle, setMapStyle] = useState<'carto-dark' | 'carto-light' | 'esri-sat'>('carto-dark');

  // Helper to create curved intermediate lat/lng points for realistic flight/ship arcs
  const createArcPoints = (start: [number, number], end: [number, number], numPoints = 30) => {
    const points: [number, number][] = [];
    const lat1 = start[0];
    const lng1 = start[1];
    const lat2 = end[0];
    const lng2 = end[1];

    const midLat = (lat1 + lat2) / 2 + Math.abs(lng2 - lng1) * 0.15;
    const midLng = (lng1 + lng2) / 2;

    for (let i = 0; i <= numPoints; i++) {
      const t = i / numPoints;
      // Quadratic Bezier interpolation
      const lat = (1 - t) * (1 - t) * lat1 + 2 * (1 - t) * t * midLat + t * t * lat2;
      const lng = (1 - t) * (1 - t) * lng1 + 2 * (1 - t) * t * midLng + t * t * lng2;
      points.push([lat, lng]);
    }
    return points;
  };

  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Destroy previous instance if re-initializing
    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove();
      mapInstanceRef.current = null;
    }

    // Initialize Leaflet Map centered between India and Middle East/Europe
    const map = L.map(mapContainerRef.current, {
      center: [20, 45],
      zoom: 2,
      minZoom: 2,
      maxZoom: 10,
      zoomControl: false,
      worldCopyJump: true
    });

    mapInstanceRef.current = map;

    // Add Zoom Control to top right
    L.control.zoom({ position: 'topright' }).addTo(map);

    // Tile Layer Selector
    let tileUrl = 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png';
    let attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>';

    if (mapStyle === 'carto-light') {
      tileUrl = 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png';
    } else if (mapStyle === 'esri-sat') {
      tileUrl = 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}';
      attribution = 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community';
    }

    L.tileLayer(tileUrl, { attribution, subdomains: 'abcd', maxZoom: 19 }).addTo(map);

    // Custom Origin Icon: INDIA, TELANGANA (Pulsing Red Marker)
    const originIconHtml = `
      <div class="relative flex items-center justify-center">
        <span class="animate-ping absolute inline-flex h-8 w-8 rounded-full bg-red-500 opacity-75"></span>
        <div class="relative flex items-center justify-center w-6 h-6 bg-red-600 border-2 border-amber-400 rounded-full text-white font-black text-[10px] shadow-lg">
          IN
        </div>
      </div>
    `;

    const originIcon = L.divIcon({
      html: originIconHtml,
      className: 'custom-origin-icon',
      iconSize: [24, 24],
      iconAnchor: [12, 12]
    });

    // Add Origin Marker at Telangana, India [17.3850, 78.4867]
    const originMarker = L.marker([originTelangana.lat, originTelangana.lng], { icon: originIcon }).addTo(map);
    originMarker.bindPopup(`
      <div style="font-family: sans-serif; text-align: center; padding: 4px;">
        <strong style="color: #B71C1C; font-size: 13px;">DISPATCH ORIGIN: INDIA, TELANGANA</strong><br/>
        <span style="font-size: 11px; color: #374151;">Telangana Export Logistics Hub & Guntur Processing Center</span><br/>
        <span style="font-size: 10px; color: #047857; font-weight: bold;">Airfreight: HYD Airport • Seafreight: Chennai/Krishnapatnam</span>
      </div>
    `, { autoPan: false });

    // Draw arcs and destination markers
    defaultExportDestinations.forEach((dest) => {
      const isSelected = selectedDest.id === dest.id;

      // Create Curved Arc Points from Telangana, India to Destination
      const arcPoints = createArcPoints(
        [originTelangana.lat, originTelangana.lng],
        [dest.lat, dest.lng]
      );

      // Draw Polyline Arc
      const polyline = L.polyline(arcPoints, {
        color: isSelected ? '#fbbf24' : '#ef4444',
        weight: isSelected ? 4 : 2,
        dashArray: isSelected ? undefined : '5, 8',
        opacity: isSelected ? 1 : 0.6
      }).addTo(map);

      // Custom Destination Icon
      const destIconHtml = `
        <div class="flex items-center justify-center transition-all ${isSelected ? 'scale-125' : 'scale-100'}">
          <div class="flex items-center gap-1 ${isSelected ? 'bg-amber-400 text-slate-950 font-black' : 'bg-red-700 text-white font-bold'} px-2 py-0.5 rounded-full shadow-md text-[10px] border border-white">
            <span>${dest.flag}</span>
            <span>${dest.name}</span>
          </div>
        </div>
      `;

      const destIcon = L.divIcon({
        html: destIconHtml,
        className: 'custom-dest-icon',
        iconSize: [100, 24],
        iconAnchor: [50, 12]
      });

      const destMarker = L.marker([dest.lat, dest.lng], { icon: destIcon }).addTo(map);

      destMarker.on('click', () => {
        setSelectedDest(dest);
        map.flyTo([dest.lat, dest.lng], 4, { duration: 1.5 });
      });

      polyline.on('click', () => {
        setSelectedDest(dest);
      });
    });

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [mapStyle, selectedDest.id]);

  return (
    <div className="bg-white dark:bg-brand-dark p-6 sm:p-8 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-xl space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-gray-100 dark:border-gray-800">
        <div>
          <div className="inline-flex items-center gap-2 bg-brand-primary/10 text-brand-primary dark:text-brand-accent text-xs font-black px-3 py-1.5 rounded-full uppercase tracking-wider mb-2">
            <Globe className="h-4 w-4 animate-spin text-brand-primary" /> Live Google / OpenStreetMap Global Route Engine
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-brand-text dark:text-white flex items-center gap-2">
            Real World Map Trade Routes Starting from <span className="text-brand-primary">India, Telangana</span>
          </h2>
          <p className="text-xs sm:text-sm text-brand-text/60 dark:text-brand-bg/60 mt-1 max-w-2xl">
            Real-world geographic trade routes dispatching directly from <strong>Telangana, India</strong> to major international sea and air ports worldwide.
          </p>
        </div>

        {/* Map View Switcher & Origin Badge */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          
          <div className="flex bg-gray-100 dark:bg-gray-800 p-1 rounded-xl border border-gray-200 dark:border-gray-700">
            <button
              onClick={() => setMapStyle('carto-dark')}
              className={`px-2.5 py-1 text-[10px] font-black rounded-lg transition-all ${
                mapStyle === 'carto-dark' ? 'bg-brand-primary text-white shadow' : 'text-gray-500 hover:text-brand-primary'
              }`}
            >
              Dark Map
            </button>
            <button
              onClick={() => setMapStyle('carto-light')}
              className={`px-2.5 py-1 text-[10px] font-black rounded-lg transition-all ${
                mapStyle === 'carto-light' ? 'bg-brand-primary text-white shadow' : 'text-gray-500 hover:text-brand-primary'
              }`}
            >
              Google Standard
            </button>
            <button
              onClick={() => setMapStyle('esri-sat')}
              className={`px-2.5 py-1 text-[10px] font-black rounded-lg transition-all ${
                mapStyle === 'esri-sat' ? 'bg-brand-primary text-white shadow' : 'text-gray-500 hover:text-brand-primary'
              }`}
            >
              Satellite
            </button>
          </div>

          <div className="bg-gradient-to-br from-brand-primary to-brand-secondary text-white p-3 rounded-2xl flex items-center gap-2.5 shadow-md shrink-0">
            <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center text-white shrink-0 font-black text-base">
              IN
            </div>
            <div>
              <span className="text-[9px] text-white/80 uppercase font-black block">Origin Point</span>
              <strong className="text-xs font-black block">India, Telangana</strong>
            </div>
          </div>

        </div>
      </div>

      {/* Main Grid: Map Canvas & Destination Info */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Leaflet Map Canvas */}
        <div className="lg:col-span-8 space-y-4">
          <div className="relative w-full h-[460px] rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-800 shadow-2xl z-0">
            
            {/* Map Container Ref */}
            <div ref={mapContainerRef} className="w-full h-full z-0" />

            {/* Map Legend Overlay */}
            <div className="absolute bottom-3 left-3 bg-slate-950/85 backdrop-blur-md px-3 py-2 rounded-xl border border-white/10 flex items-center gap-4 text-[10px] text-white z-10">
              <div className="flex items-center gap-1.5 font-bold">
                <span className="h-3 w-3 rounded-full bg-red-600 border border-amber-400 animate-pulse" />
                <span className="text-amber-400">Origin: India, Telangana</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
                <span>Selected Export Route</span>
              </div>
            </div>

          </div>

          {/* Air & Sea Logistics Note */}
          <div className="flex items-start gap-3 p-4 bg-brand-primary/5 dark:bg-brand-dark/50 border border-brand-primary/10 dark:border-gray-800 rounded-2xl text-xs leading-relaxed text-brand-text/70 dark:text-brand-bg/70">
            <Info className="h-4 w-4 text-brand-primary shrink-0 mt-0.5" />
            <div>
              <strong className="font-extrabold text-brand-primary dark:text-brand-accent block mb-0.5">
                Telangana Logistics Dispatch Framework:
              </strong>
              <span>
                All international airfreight sample kits dispatch from <strong>Rajiv Gandhi International Airport (HYD), Telangana</strong>. Full container ocean shipments are dispatched via dedicated inland rail corridors from Telangana to Chennai & Krishnapatnam deepwater container ports.
              </span>
            </div>
          </div>
        </div>

        {/* Selected Destination Card */}
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
