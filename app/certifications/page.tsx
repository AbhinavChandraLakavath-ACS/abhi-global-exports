'use client';

import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import WhatsAppButton from '@/components/shared/WhatsAppButton';
import { 
  Award, ShieldCheck, Download, CheckCircle2, FileText, FileSignature
} from 'lucide-react';

interface Certification {
  name: string;
  authority: string;
  scope: string;
  certNumber: string;
  description: string;
}

const certificates: Certification[] = [
  {
    name: 'ISO 22000:2018',
    authority: 'SGS International Certification',
    scope: 'Food Safety Management Systems (FSMS)',
    certNumber: 'IN/FSMS-9874/22000',
    description: 'Guarantees that all cleaning, grinding, stem removal, sorting, and packaging procedures comply with worldwide food safety standards.'
  },
  {
    name: 'HACCP Compliance',
    authority: 'TUV Nord Group',
    scope: 'Hazard Analysis Critical Control Point',
    certNumber: 'HACCP-IND-8574/2026',
    description: 'Enforces rigorous hazards analysis controls at every stage of dried chilli processing, from warehouse receipt to container sealing.'
  },
  {
    name: 'APEDA Registration',
    authority: 'Ministry of Commerce, Govt of India',
    scope: 'Agricultural & Processed Food Products Export',
    certNumber: 'APEDA-REG-108742/2025',
    description: 'Enables official licensing for international shipment and verifies quality authenticity of agricultural exports from India.'
  },
  {
    name: 'Spice Board of India License',
    authority: 'Spices Board, Ministry of Commerce',
    scope: 'Exporter of Spices & Chilli Products',
    certNumber: 'SB-LIC-CH-57421/2024',
    description: 'Verifies the exporter profile and authorizes testing approvals at Spice Board laboratories prior to vessel loading.'
  },
  {
    name: 'FSSAI License',
    authority: 'Food Safety and Standards Authority of India',
    scope: 'Food Manufacturer & Exporter Category',
    certNumber: 'FSSAI-10024011000574',
    description: 'The national benchmark license confirming sanitary manufacturing, warehouse hygienic standards, and clean staff testing.'
  },
  {
    name: 'Halal Certified',
    authority: 'Jamiat Ulama-i-Hind Halal Trust',
    scope: 'Global Halal Compliance for Food Products',
    certNumber: 'JUH-HALAL-7854/2026',
    description: 'Attests that our processing plant operates entirely free of non-halal raw materials, suitable for Islamic dietary requirements.'
  },
  {
    name: 'Kosher Certified',
    authority: 'Star-K Kosher Certification',
    scope: 'Kosher Food Quality Standards',
    certNumber: 'KSH-STAR-9685/2026',
    description: 'Confirms processing purity and absolute absence of cross-contamination in grinding and packaging, approved for Kosher consumers.'
  },
  {
    name: 'FDA Registration',
    authority: 'U.S. Food and Drug Administration',
    scope: 'Foreign Facility Registration',
    certNumber: 'FDA-REG-198756431',
    description: 'Compliance registration enabling direct export and customs clearances of red chillies and spice powders into the United States.'
  }
];

export default function Certifications() {
  const handleDownload = (certName: string) => {
    alert(`Downloading verified certificate PDF for ${certName}`);
  };

  return (
    <>
      <Navbar />
      <main className="flex-grow pt-32 pb-16 bg-brand-bg dark:bg-brand-dark/40 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="mb-12 text-center max-w-3xl mx-auto">
            <span className="bg-brand-primary/10 text-brand-primary text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider inline-block mb-3">
              Verified Compliance
            </span>
            <h1 className="text-3xl sm:text-4xl font-black text-brand-text dark:text-white">
              Certifications & <span className="text-brand-primary">Quality Marks</span>
            </h1>
            <p className="text-sm text-brand-text/60 dark:text-brand-bg/60 mt-2">
              ABHI GLOBAL EXPORTS operates under international sanitary and phytosanitary rules. Our Guntur facility undergoes routine third-party audits to guarantee product safety and purity.
            </p>
          </div>

          {/* Certifications Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
            {certificates.map((cert) => (
              <div 
                key={cert.name}
                className="bg-white dark:bg-brand-dark border border-gray-100 dark:border-gray-800/80 rounded-2xl p-5 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1"
              >
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <div className="bg-brand-primary/15 p-2.5 rounded-xl text-brand-primary">
                      <ShieldCheck className="h-5 w-5" />
                    </div>
                    <span className="font-mono text-[9px] font-bold text-brand-text/40 dark:text-brand-bg/40">
                      REG: {cert.certNumber}
                    </span>
                  </div>

                  <h3 className="font-black text-base text-brand-text dark:text-white mb-1 group-hover:text-brand-primary transition-colors">
                    {cert.name}
                  </h3>
                  <p className="text-[10px] text-brand-primary dark:text-brand-accent uppercase font-bold tracking-wider mb-3">
                    {cert.authority.split(',')[0]}
                  </p>
                  <p className="text-xs text-brand-text/75 dark:text-brand-bg/85 leading-relaxed">
                    {cert.description}
                  </p>
                </div>

                <div className="pt-6 border-t border-gray-100 dark:border-gray-800/60 mt-5 flex justify-between items-center">
                  <span className="text-[9px] text-brand-text/40 dark:text-brand-bg/40 font-bold uppercase tracking-wider block">
                    Scope: {cert.scope.substring(0, 15)}...
                  </span>
                  <button 
                    onClick={() => handleDownload(cert.name)}
                    className="p-2 bg-brand-bg hover:bg-brand-primary hover:text-white dark:bg-brand-dark/50 dark:hover:bg-brand-primary rounded-lg text-brand-primary transition-colors"
                    title="Download Document"
                  >
                    <Download className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Quality Assurance Standards Box */}
          <div className="bg-white dark:bg-brand-dark p-6 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
            <div className="lg:col-span-2 space-y-2">
              <h3 className="font-black text-lg text-brand-text dark:text-white flex items-center gap-1.5">
                <FileSignature className="h-5 w-5 text-brand-primary" /> Request Quality Certification Pack
              </h3>
              <p className="text-xs text-brand-text/60 dark:text-brand-bg/60 leading-relaxed">
                Do you require custom audits or pesticide residual lab testing reports (e.g. Eurofins)? Contact our compliance team to obtain the complete laboratory quality dossiers for European or US customs clearance.
              </p>
            </div>
            <div className="flex justify-end">
              <a 
                href="/#rfq-section"
                className="bg-brand-primary hover:bg-brand-secondary text-white text-xs font-extrabold px-6 py-3 rounded-xl shadow-md transition-all block w-full text-center lg:w-auto"
              >
                Contact Compliance Officer
              </a>
            </div>
          </div>

        </div>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
