'use client';

import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import WhatsAppButton from '@/components/shared/WhatsAppButton';
import Chatbot from '@/components/chatbot/Chatbot';
import Link from 'next/link';
import { ChevronRight, Calendar, User, ArrowRight, Flame } from 'lucide-react';

interface BlogPost {
  title: string;
  category: string;
  date: string;
  author: string;
  excerpt: string;
  slug: string;
}

const blogPosts: BlogPost[] = [
  {
    title: 'Guntur Chilli Market Report: 2026 Harvest Season Trends',
    category: 'Market Trends',
    date: 'June 28, 2026',
    author: 'Abhinav Chandra (CEO)',
    excerpt: 'An analysis of Guntur chilli index values, current cold storage stocks, and export shipping availability for Teja S17 and Byadgi crops.',
    slug: 'guntur-chilli-market-report-2026'
  },
  {
    title: 'HTST Steam Sterilization vs Chemical Fumigation (ETO)',
    category: 'Quality Control',
    date: 'May 14, 2026',
    author: 'Dr. Ramesh Kumar (Director of QA)',
    excerpt: 'Why high-temperature short-time (HTST) steam sterilization is mandatory to pass strict European Salmonella and aflatoxin clearance limits.',
    slug: 'steam-sterilization-vs-chemical-fumigation'
  },
  {
    title: 'Teja S17 vs Sannam S4: Choosing the Right Heat Rating',
    category: 'Product Guide',
    date: 'April 02, 2026',
    author: 'Sanjay Varma (Sales Head)',
    excerpt: 'Compare the pungency, capsacin ratios, ASTA coloring values, and pricing factors between Tejas and standard Sannams for hot sauce manufacturing.',
    slug: 'teja-s17-vs-sannam-s4-heat-rating'
  }
];

export default function BlogPage() {
  return (
    <>
      <Navbar />
      <main className="flex-grow pt-32 pb-16 bg-brand-bg dark:bg-brand-dark/40 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Breadcrumbs */}
          <nav className="text-xs text-brand-text/50 dark:text-brand-bg/50 mb-4 flex items-center gap-1.5 font-semibold">
            <Link href="/" className="hover:text-brand-primary">Home</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-brand-text dark:text-white">B2B Spices Blog</span>
          </nav>

          <div className="mb-10">
            <h1 className="text-3xl font-black text-brand-text dark:text-white flex items-center gap-2">
              ABHI GLOBAL <span className="text-brand-primary">Spices Blog</span>
            </h1>
            <p className="text-sm text-brand-text/60 dark:text-brand-bg/60 mt-1 max-w-2xl">
              Stay updated with agricultural harvesting logs, shipping container indexes, and spice regulatory updates direct from Guntur.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <div 
                key={post.slug}
                className="bg-white dark:bg-brand-dark border border-gray-100 dark:border-gray-800 rounded-2xl overflow-hidden shadow-sm flex flex-col justify-between group hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <div className="p-6 space-y-4">
                  <span className="bg-brand-primary/10 text-brand-primary text-[9px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider inline-block">
                    {post.category}
                  </span>

                  <h3 className="font-black text-lg text-brand-text dark:text-white leading-snug group-hover:text-brand-primary transition-colors">
                    {post.title}
                  </h3>

                  <p className="text-xs text-brand-text/60 dark:text-brand-bg/60 leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>
                </div>

                {/* Bottom author specs */}
                <div className="p-6 bg-gray-50 dark:bg-brand-dark/40 border-t border-gray-100 dark:border-gray-800 text-[10px] space-y-3">
                  <div className="flex justify-between items-center text-brand-text/50 dark:text-brand-bg/50">
                    <span className="flex items-center gap-1"><User className="h-3.5 w-3.5" /> {post.author}</span>
                    <span className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5" /> {post.date}</span>
                  </div>

                  <button 
                    onClick={() => alert(`Opening full blog article: ${post.title}`)}
                    className="w-full bg-white hover:bg-brand-primary hover:text-white dark:bg-brand-dark dark:hover:bg-brand-primary text-brand-primary border border-gray-200 dark:border-gray-800 py-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5"
                  >
                    Read Article <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      </main>
      <Footer />
      <WhatsAppButton />
      <Chatbot />
    </>
  );
}
