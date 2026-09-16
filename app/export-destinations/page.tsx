'use client';

import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import WhatsAppButton from '@/components/shared/WhatsAppButton';
import ExportRouteMap from '@/components/shared/ExportRouteMap';
import { 
  Globe, Anchor, MapPin, ShieldCheck, Compass, ArrowRight, Info, Plane, Truck
} from 'lucide-react';

export default function ExportDestinations() {
  return (
    <>
      <Navbar />
      <main className="flex-grow pt-32 pb-16 bg-brand-bg dark:bg-brand-dark/40 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="mb-10 text-center max-w-3xl mx-auto">
            <span className="bg-brand-primary/10 text-brand-primary text-[10px] font-extrabold px-3.5 py-1.5 rounded-full uppercase tracking-wider inline-block mb-3">
              Dispatch Origin: India, Telangana
            </span>
            <h1 className="text-3xl sm:text-4xl font-black text-brand-text dark:text-white">
              Export Destinations & <span className="text-brand-primary">Global Logistics</span>
            </h1>
            <p className="text-sm text-brand-text/60 dark:text-brand-bg/60 mt-2 leading-relaxed">
              ABHI GLOBAL EXPORTS serves wholesale buyers across 50+ countries. All export shipments originate directly from <strong>Telangana, India</strong> via Hyderabad International Airport (HYD) for airfreight and gateway container ports for ocean freight.
            </p>
          </div>

          {/* Key Origin Highlights Banner */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
            <div className="bg-white dark:bg-brand-dark p-4 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm flex items-center gap-3">
              <div className="p-3 bg-brand-primary/10 text-brand-primary rounded-xl shrink-0">
                <MapPin className="h-5 w-5" />
              </div>
              <div>
                <strong className="text-xs font-black text-brand-text dark:text-white block uppercase tracking-wider">
                  Primary Origin Hub
                </strong>
                <span className="text-xs text-brand-primary dark:text-brand-accent font-bold">
                  India, Telangana
                </span>
              </div>
            </div>

            <div className="bg-white dark:bg-brand-dark p-4 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm flex items-center gap-3">
              <div className="p-3 bg-blue-500/10 text-blue-500 rounded-xl shrink-0">
                <Plane className="h-5 w-5" />
              </div>
              <div>
                <strong className="text-xs font-black text-brand-text dark:text-white block uppercase tracking-wider">
                  Express Airfreight Hub
                </strong>
                <span className="text-xs text-gray-500 font-bold">
                  Hyderabad Int. Airport (HYD)
                </span>
              </div>
            </div>

            <div className="bg-white dark:bg-brand-dark p-4 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm flex items-center gap-3">
              <div className="p-3 bg-emerald-500/10 text-emerald-500 rounded-xl shrink-0">
                <Anchor className="h-5 w-5" />
              </div>
              <div>
                <strong className="text-xs font-black text-brand-text dark:text-white block uppercase tracking-wider">
                  Ocean Container Ports
                </strong>
                <span className="text-xs text-gray-500 font-bold">
                  Chennai & Krishnapatnam Ports
                </span>
              </div>
            </div>
          </div>

          {/* Interactive SVG World Map Component */}
          <ExportRouteMap />

        </div>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
