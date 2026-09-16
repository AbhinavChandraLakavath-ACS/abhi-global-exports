'use client';

import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import WhatsAppButton from '@/components/shared/WhatsAppButton';
import Chatbot from '@/components/chatbot/Chatbot';
import ContainerCalculator from '@/components/calculator/ContainerCalculator';
import ShippingEstimator from '@/components/calculator/ShippingEstimator';
import Link from 'next/link';
import { ChevronRight, Scale } from 'lucide-react';

export default function CalculatorPage() {
  return (
    <>
      <Navbar />
      <main className="flex-grow pt-32 pb-16 bg-brand-bg dark:bg-brand-dark/40 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Breadcrumbs */}
          <nav className="text-xs text-brand-text/50 dark:text-brand-bg/50 mb-4 flex items-center gap-1.5 font-semibold">
            <Link href="/" className="hover:text-brand-primary">Home</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-brand-text dark:text-white">Logistics Calculators</span>
          </nav>

          <div className="mb-8">
            <h1 className="text-3xl font-black text-brand-text dark:text-white flex items-center gap-2">
              Logistics & <span className="text-brand-primary">FOB/CIF Calculators</span>
            </h1>
            <p className="text-sm text-brand-text/60 dark:text-brand-bg/60 mt-1 max-w-2xl">
              Determine container stuffing weights and ocean transit freights from Guntur plant to international ports. Select your variety density and incoterm settings.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <ContainerCalculator />
            <ShippingEstimator />
          </div>

        </div>
      </main>
      <Footer />
      <WhatsAppButton />
      <Chatbot />
    </>
  );
}
