'use client';

import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import WhatsAppButton from '@/components/shared/WhatsAppButton';
import { 
  CheckCircle, Factory, ShieldCheck, Flame, Scale, Eye, HelpCircle
} from 'lucide-react';

interface ProcessStep {
  step: string;
  title: string;
  machinery: string;
  standards: string;
  description: string;
}

const steps: ProcessStep[] = [
  {
    step: 'Step 01',
    title: 'Cold Storage & Warehousing',
    machinery: 'Climate-controlled warehouse (5°C to 10°C)',
    standards: 'HACCP Standard Storage',
    description: 'Chilli pods sourced from trusted farmers are placed immediately into our cold storage to preserve natural color values, essential oil content, and prevent aflatoxin formation.'
  },
  {
    step: 'Step 02',
    title: 'Aspirated Air Cleaning',
    machinery: 'High-volume vibro-screen air separators',
    standards: '99.5% purity grading',
    description: 'Raw chillies pass through pre-cleaners where heavy stones, soil particles, dust, and light straws are extracted using mechanical vibration screens and high-velocity air currents.'
  },
  {
    step: 'Step 03',
    title: 'Automated Destemming',
    machinery: 'Chilli Stem Cutting machines',
    standards: 'With or Without stalk specification',
    description: 'Based on buyer requests (stemless vs with-stalk), chillies pass through specialized rollers and high-speed rotary cutting blades that separate the green stalk cleanly without breaking the pod.'
  },
  {
    step: 'Step 04',
    title: 'Optical Color Sorting',
    machinery: 'Buhler Sortex CCD Color Sorter',
    standards: 'Zero discolored pods',
    description: 'Sophisticated optical sorting cameras scan each falling chilli, instantly identifying and ejecting discolored, pale yellow, or damaged pods to secure color integrity.'
  },
  {
    step: 'Step 05',
    title: 'Milling & Pulverization',
    machinery: 'Water-cooled pin mill grinders',
    standards: 'Custom mesh size (40 - 80 mesh)',
    description: 'For powder, crushed, and flakes specifications, sorted pods are fed into cold milling machines. Water-cooled mills prevent heat buildup, preserving natural spicy aroma and volatile oils.'
  },
  {
    step: 'Step 06',
    title: 'Continuous Steam Sterilization',
    machinery: 'HTST (High Temperature Short Time) Sterilizer',
    standards: 'Total Plate Count (TPC) < 10,000 cfu/g',
    description: 'Critical sterilization phase. Pure steam treats the spice to kill Salmonella, E. coli, yeasts, and molds without chemical fumigation, fully complying with European food regulations.'
  },
  {
    step: 'Step 07',
    title: 'Metal Detection & Quality Lab',
    machinery: 'In-line magnet separators & metal detectors',
    standards: 'Ferrous/Non-ferrous detection (0.5mm)',
    description: 'Spices undergo magnetic extraction and pass through final metal detectors. Concurrently, our laboratory tests moisture, ASTA color, and capsaicin levels for Certificate of Analysis (COA).'
  },
  {
    step: 'Step 08',
    title: 'Sanitary Automated Packing',
    machinery: 'Form-Fill-Seal bagging machines',
    standards: '20kg, 25kg, 50kg export bags',
    description: 'Finished chillies are packed inside multi-layer paper bags, high-density PP bags, or jute gunny bags. Sealing occurs in positive-pressure clean rooms prior to container stuffing.'
  }
];

export default function ProcessingPlant() {
  return (
    <>
      <Navbar />
      <main className="flex-grow pt-32 pb-16 bg-brand-bg dark:bg-brand-dark/40 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="mb-12 text-center max-w-3xl mx-auto">
            <span className="bg-brand-primary/10 text-brand-primary text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider inline-block mb-3">
              Modern Infrastructure
            </span>
            <h1 className="text-3xl sm:text-4xl font-black text-brand-text dark:text-white">
              Guntur Processing <span className="text-brand-primary">Plant Facility</span>
            </h1>
            <p className="text-sm text-brand-text/60 dark:text-brand-bg/60 mt-2">
              Step-by-step virtual tour showcasing our state-of-the-art cleaning, grinding, steam sterilization, and container loading processes at Guntur, Andhra Pradesh.
            </p>
          </div>

          {/* Steps Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
            {steps.map((s) => (
              <div 
                key={s.step}
                className="bg-white dark:bg-brand-dark border border-gray-100 dark:border-gray-800 rounded-2xl overflow-hidden shadow-sm flex flex-col justify-between group hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <div className="p-5 space-y-4">
                  <div className="flex justify-between items-center border-b border-gray-100 dark:border-gray-800 pb-2">
                    <span className="font-extrabold text-brand-primary text-[11px] uppercase tracking-wider">
                      {s.step}
                    </span>
                    <span className="bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-300 text-[9px] font-bold px-2 py-0.5 rounded uppercase">
                      Active Step
                    </span>
                  </div>

                  <h3 className="font-black text-base text-brand-text dark:text-white group-hover:text-brand-primary transition-colors">
                    {s.title}
                  </h3>
                  <p className="text-xs text-brand-text/80 dark:text-brand-bg/85 leading-relaxed">
                    {s.description}
                  </p>
                </div>

                {/* Bottom specs */}
                <div className="p-4 bg-gray-50 dark:bg-brand-dark/40 border-t border-gray-100 dark:border-gray-800 text-[10px] space-y-1">
                  <div>
                    <span className="text-brand-text/40 dark:text-brand-bg/40 block font-bold uppercase">Machinery</span>
                    <span className="font-bold text-brand-text dark:text-white line-clamp-1">{s.machinery}</span>
                  </div>
                  <div className="pt-1.5 border-t border-gray-200/50 dark:border-gray-800/80">
                    <span className="text-brand-text/40 dark:text-brand-bg/40 block font-bold uppercase">Compliance Standard</span>
                    <span className="font-bold text-brand-primary dark:text-brand-accent">{s.standards}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Plant Statistics Banner */}
          <div className="bg-brand-dark text-white rounded-2xl p-8 border border-brand-primary/20 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div>
              <span className="text-2xl font-black text-brand-accent">15,000 MT</span>
              <p className="text-xs text-gray-400 mt-1 uppercase tracking-widest font-bold">Annual Capacity</p>
            </div>
            <div className="border-t md:border-t-0 md:border-l md:border-r border-gray-800 py-4 md:py-0">
              <span className="text-2xl font-black text-brand-accent">99.9% Purity</span>
              <p className="text-xs text-gray-400 mt-1 uppercase tracking-widest font-bold">Physical Cleaning Rate</p>
            </div>
            <div>
              <span className="text-2xl font-black text-brand-accent">HTST Steam</span>
              <p className="text-xs text-gray-400 mt-1 uppercase tracking-widest font-bold">Non-Chemical Sanitation</p>
            </div>
          </div>

        </div>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
