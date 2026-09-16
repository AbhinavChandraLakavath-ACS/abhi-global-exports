'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { 
  MessageSquare, X, Send, Bot, User, HelpCircle, 
  Sparkles, FlaskConical, Truck, Award, ShieldCheck, ArrowRight, CheckCircle2 
} from 'lucide-react';
import Link from 'next/link';

interface ChatMessage {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  time: string;
  actionLink?: { label: string; url: string };
}

export default function Chatbot() {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Initialize with welcome message
  useEffect(() => {
    setMessages([
      {
        id: 'welcome',
        sender: 'ai',
        text: "Welcome to ABHI GLOBAL EXPORTS! I am your AI Export Assistant powered by Guntur Spice Intelligence. Ask me anything about our chilli varieties, 1kg sample kits, 1-ton bulk pricing, shipping routes from Telangana India, or spice technical specifications!",
        time: new Date().toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  }, [t]);

  // Scroll to bottom on updates
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isOpen, isTyping]);

  // ADVANCED AI KNOWLEDGE ENGINE (Perplexity/ChatGPT/Gemini Style Export Assistant)
  const getAIResponse = (input: string): { text: string; actionLink?: { label: string; url: string } } => {
    const text = input.toLowerCase().trim();

    // 1. SAMPLE ORDERING & QUALITY INSPECTION KITS
    if (
      text.includes('sample') || 
      text.includes('order sample') || 
      text.includes('quality test') || 
      text.includes('specimen') || 
      text.includes('1kg') || 
      text.includes('1 kg') ||
      text.includes('test kit') ||
      text.includes('try before bulk') ||
      text.includes('buy sample') ||
      text.includes('check quality') ||
      text.includes('how to order') ||
      text.includes('order for sample')
    ) {
      return {
        text: "**Ordering 1kg Quality Inspection Samples:**\n\nYou can order a **1 kg Quality Inspection Pack** for any chilli variety to test ASTA color, SHU pungency, and moisture before placing commercial bulk container orders!\n\n• **Limit:** Exactly 1.0 kg per company/customer.\n• **Includes:** Vacuum-sealed sample + Official Lab COA Report + Express Air Freight (DHL/FedEx).\n• **Price:** Single all-inclusive rate (e.g. $45 - $55 depending on variety).\n• **Dispatch:** Shipped via Air Express directly from our Telangana/Hyderabad logistics hub within 24 hours!\n\nClick below to open the sample checkout form on any product page:",
        actionLink: { label: 'Go to Product Catalog & Sample Order', url: '/products' }
      };
    }

    // 2. PRICING, 1-TON CALCULATIONS & BULK QUOTATIONS
    if (
      text.includes('price') || 
      text.includes('cost') || 
      text.includes('rate') || 
      text.includes('1 ton') || 
      text.includes('tonnage') || 
      text.includes('quote') || 
      text.includes('how much') || 
      text.includes('fob price') || 
      text.includes('cif price') ||
      text.includes('discount') ||
      text.includes('wholesale')
    ) {
      return {
        text: "**Bulk 1-Ton & Container Wholesale Pricing:**\n\nChilli prices depend on daily Guntur APMC market rates, bag size (50kg, 30kg, 20kg), and destination port.\n\n• **Formula:** Final Price = (Raw Material 1-Ton Rate + Packaging Fee + Delivery Freight) × 1.30 (Includes 30% Exporter Profit Margin).\n• **Teja S17 1-Ton Baseline:** ~$3,850 - $4,200 / Metric Ton (CIF).\n• **Byadgi 1-Ton Baseline:** ~$4,400 - $4,800 / Metric Ton (CIF).\n\nYou can customize tonnage, container loading (14 MT / 24 MT), and bag sizes using our live Container Calculator or submit an RFQ!",
        actionLink: { label: 'Use Freight & 1-Ton Calculator', url: '/calculator' }
      };
    }

    // 3. TEJA S17 RED CHILLI
    if (text.includes('teja') || text.includes('s17') || text.includes('hottest')) {
      return {
        text: "**Teja S17 Red Chilli Specifications:**\n\n• **Heat Rating:** 75,000 - 110,000 Scoville Heat Units (SHU) - Extremely High Heat.\n• **Color Value:** 50 - 70 ASTA (Moderate Deep Red).\n• **Moisture:** Below 12% Max.\n• **Origin:** Guntur, Andhra Pradesh / Telangana border.\n• **Primary Uses:** Hot sauces, spice blends, chilli powder extraction, oleoresin.\n• **20ft Container Load:** 14 Metric Tons (Whole Pods) / 19 MT (Powder).",
        actionLink: { label: 'View Teja S17 Product Details', url: '/products/teja-s17' }
      };
    }

    // 4. BYADGI RED CHILLI
    if (text.includes('byadgi') || text.includes('color chilli') || text.includes('mild chilli')) {
      return {
        text: "**Byadgi Red Chilli Specifications:**\n\n• **Heat Rating:** 12,000 - 15,000 SHU (Mild Heat - gentle spicy warmth).\n• **Color Value:** 150 - 200 ASTA (Brilliant Deep Crimson Red).\n• **Skin Texture:** Wrinkled, thin skin with high natural color extraction yield.\n• **Uses:** Oleoresin extraction, food coloring, curries, tandoori marinades, European spice mixes.",
        actionLink: { label: 'View Byadgi Product Details', url: '/products/byadgi' }
      };
    }

    // 5. KASHMIRI CHILLI
    if (text.includes('kashmiri') || text.includes('tandoori') || text.includes('mildest')) {
      return {
        text: "**Kashmiri Red Chilli Specifications:**\n\n• **Heat Rating:** 1,500 - 2,500 SHU (Very Mild - non-pungent).\n• **Color Value:** 160 - 240 ASTA (Highest Vibrant Red Color Rating).\n• **Uses:** Restaurant curries, tandoori marinades, sauces requiring deep red hue without burning spice.",
        actionLink: { label: 'View Kashmiri Product Details', url: '/products/kashmiri' }
      };
    }

    // 6. GUNTUR SANNAM / S4 CHILLI
    if (text.includes('guntur') || text.includes('sannam') || text.includes('s4')) {
      return {
        text: "**Guntur Sannam (S4) Specifications:**\n\n• **Heat Rating:** 35,000 - 45,000 SHU (Medium to High Spicy Heat).\n• **Color Value:** 40 - 50 ASTA.\n• **Market Share:** Accounts for over 60% of total Indian chilli exports worldwide!\n• **Uses:** Commercial chilli powder production, canned food processing, pickles.",
        actionLink: { label: 'View Guntur Sannam Product Details', url: '/products/guntur-sannam' }
      };
    }

    // 7. BIRD'S EYE / KANIKARI CHILLI
    if (text.includes('bird') || text.includes('eye') || text.includes('kanthari')) {
      return {
        text: "**Bird Eye (Kanthani) Chilli Specifications:**\n\n• **Heat Rating:** 100,000 - 225,000 SHU (Extremely High Pungency).\n• **Size:** Small 1-2 cm pungent wild pods.\n• **Uses:** Pickles, hot chili oils, Thai sauces, pharmaceutical capsaicin extraction.",
        actionLink: { label: 'View Bird Eye Product Details', url: '/products/bird-eye' }
      };
    }

    // 8. LOGISTICS, ORIGIN & TELANGANA SHIPPING ROUTES
    if (
      text.includes('telangana') || 
      text.includes('origin') || 
      text.includes('india') || 
      text.includes('shipping') || 
      text.includes('transit') || 
      text.includes('port') || 
      text.includes('delivery') || 
      text.includes('airfreight') || 
      text.includes('hyderabad') ||
      text.includes('chennai')
    ) {
      return {
        text: "**Dispatch Origin & Global Trade Routes:**\n\n• **Dispatch Origin:** India, Telangana (Hyderabad Export Hub / Guntur Processing Facility).\n• **Air Freight:** Dispatched from **Rajiv Gandhi International Airport (HYD), Telangana** (Express 3-5 days delivery for sample kits).\n• **Ocean Container Freight:** Loaded at **Chennai Port & Krishnapatnam Deepwater Ports**.\n\n**Typical Ocean Transit Durations:**\n- Dubai (Jebel Ali): 7 - 10 Days\n- Singapore: 5 - 7 Days\n- Rotterdam (Europe): 22 - 25 Days\n- New York / NJ: 26 - 30 Days\n- Tokyo, Japan: 12 - 15 Days",
        actionLink: { label: 'View Interactive World Trade Map', url: '/export-destinations' }
      };
    }

    // 9. CERTIFICATIONS & COMPLIANCE
    if (
      text.includes('certification') || 
      text.includes('certificate') || 
      text.includes('iso') || 
      text.includes('haccp') || 
      text.includes('halal') || 
      text.includes('kosher') || 
      text.includes('fssai') || 
      text.includes('apeda') || 
      text.includes('phyto')
    ) {
      return {
        text: "**Quality Certifications & Export Compliance:**\n\nABHI GLOBAL EXPORTS is fully certified for international food safety and customs clearances:\n\n- **ISO 22000:2018** Food Safety Management System\n- **HACCP** Hazard Analysis & Critical Control Points\n- **APEDA** Agricultural & Processed Food Products Export Development Authority\n- **Spices Board of India** Registration Cum Membership Certificate (RCMC)\n- **FSSAI** Food Safety & Standards Authority of India\n- **Halal & Kosher Certified**\n- **Phytosanitary & Fumigation Certificates** issued for every container shipment.",
        actionLink: { label: 'View & Download Compliance Certificates', url: '/certifications' }
      };
    }

    // 10. PACKAGING OPTIONS (50kg, 30kg, 20kg)
    if (text.includes('bag') || text.includes('pack') || text.includes('jute') || text.includes('sack') || text.includes('50kg') || text.includes('30kg') || text.includes('20kg')) {
      return {
        text: "**Bulk Export Packaging Bag Options:**\n\nWe provide 3 standardized export bag packaging formats tailored to buyer warehouse logistics:\n\n1. **50 kg Jute / PP Bags** (Standard Bulk - 20 bags / MT)\n2. **30 kg Jute / PP Bags** (Medium Bulk - 33.3 bags / MT)\n3. **20 kg Vacuum-Sealed Sacks** (Premium Color Preservation - 50 bags / MT)\n\nCustom private labeling and buyer logo printing on bags are available for container orders!",
        actionLink: { label: 'Calculate Bag Quantities', url: '/calculator' }
      };
    }

    // 11. SPICE SCIENCE, CAPSAICIN & ASTA EXPLANATION
    if (text.includes('asta') || text.includes('shu') || text.includes('scoville') || text.includes('capsaicin') || text.includes('moisture') || text.includes('color')) {
      return {
        text: "**Spice Technical Guide (ASTA & SHU):**\n\n• **SHU (Scoville Heat Units):** Measures capsaicin concentration causing heat perception. Ranges from 1,500 SHU (Kashmiri) up to 110,000+ SHU (Teja S17).\n• **ASTA (American Spice Trade Association):** Standard laboratory spectrophotometric rating for red pigment. Higher ASTA (150-240) = deeper, richer red dye strength.\n• **Moisture Content:** Kept below **12%** to prevent aflatoxin or fungal development during long ocean transits.",
        actionLink: { label: 'Explore Processing Technology', url: '/processing-plant' }
      };
    }

    // 12. COMPANY & OWNER INFORMATION
    if (text.includes('who') || text.includes('owner') || text.includes('company') || text.includes('abhi') || text.includes('address') || text.includes('contact') || text.includes('email') || text.includes('phone')) {
      return {
        text: "**ABHI GLOBAL EXPORTS Company Overview:**\n\n• **Premier Exporter:** Leading Indian B2B dried red chilli exporter, processor, and cold storage owner based in Guntur & Telangana, India.\n• **Owner Contact:** Lalu Lakavath (Abhinav IPM Spices)\n• **Official Export Email:** abhinavchandra.lakavath@gmail.com\n• **WhatsApp Support:** +91 9866353270\n• **Processing Hub:** GT Road, Guntur Export Industrial Zone, Andhra Pradesh / Telangana, India.",
        actionLink: { label: 'Contact Export Team', url: '/#rfq-section' }
      };
    }

    // 13. GENERAL KNOWLEDGE / CONVERSATIONAL FALLBACK (Smart AI Assistant Mode)
    return {
      text: `**AI Export Intelligence Assistant Answer:**\n\nThank you for asking about "${input}".\n\nAt **ABHI GLOBAL EXPORTS** (Telangana, India), we specialize in commercial dried red chillies, chilli powders, flakes, and oleoresin extraction. \n\nWhether you need:\n1. **1kg Quality Test Samples** shipped via DHL Air Express,\n2. **1-Ton & 20ft/40ft Container Pricing** (calculated with 50kg, 30kg, 20kg bags & 30% margin),\n3. **Customs Documentation & Lab Certificates (COA/Phytosanitary)**,\n\nOur team is ready to assist! How can I help you finalize your order or technical specification today?`,
      actionLink: { label: 'Browse Products Catalog', url: '/products' }
    };
  };

  const handleSendMessage = (e?: React.FormEvent, customText?: string) => {
    if (e) e.preventDefault();
    const textToSend = customText || query;
    if (!textToSend.trim()) return;

    // User Message
    const userMsg: ChatMessage = {
      id: Math.random().toString(36).substring(7),
      sender: 'user',
      text: textToSend,
      time: new Date().toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setQuery('');
    setIsTyping(true);

    // AI Message (short delay for realistic typing feeling)
    setTimeout(() => {
      const response = getAIResponse(textToSend);
      const aiMsg: ChatMessage = {
        id: Math.random().toString(36).substring(7),
        sender: 'ai',
        text: response.text,
        actionLink: response.actionLink,
        time: new Date().toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
    }, 450);
  };

  const quickQuestions = [
    'How can I order 1kg sample?',
    'What is 1-ton Teja S17 price?',
    'Shipping transit times from Telangana?',
    'Bag sizes 50kg / 30kg / 20kg?',
    'ISO & HACCP Certifications?'
  ];

  return (
    <>
      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 left-6 z-50 bg-brand-primary text-white p-3.5 rounded-full shadow-2xl hover:bg-brand-secondary hover:scale-110 active:scale-95 transition-all duration-300 flex items-center justify-center group"
        aria-label="Toggle AI Support Bot"
      >
        {isOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <div className="relative">
            <Bot className="h-6 w-6" />
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-500"></span>
            </span>
          </div>
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 left-6 z-50 w-80 sm:w-[420px] bg-white dark:bg-brand-dark border border-gray-100 dark:border-gray-800 shadow-2xl rounded-3xl overflow-hidden flex flex-col h-[520px] transition-all">
          
          {/* Header */}
          <div className="bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-primary p-4 text-white flex justify-between items-center shadow-md">
            <div className="flex items-center gap-3">
              <div className="bg-white/20 p-2 rounded-xl backdrop-blur-md">
                <Sparkles className="h-5 w-5 text-brand-accent animate-pulse" />
              </div>
              <div>
                <h4 className="font-black text-sm tracking-wider flex items-center gap-1.5">
                  AI CHILLI EXPORT BOT
                  <span className="bg-amber-400 text-brand-primary text-[9px] font-black px-1.5 py-0.2 rounded uppercase">PRO V2</span>
                </h4>
                <span className="text-[10px] text-amber-200 font-extrabold uppercase tracking-widest block">
                  ABHI GLOBAL EXPORTS • TELANGANA INDIA
                </span>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-white/80 hover:text-white p-1">
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 p-4 overflow-y-auto no-scrollbar space-y-4 bg-brand-bg/30 dark:bg-brand-dark/40">
            {messages.map((msg) => (
              <div 
                key={msg.id} 
                className={`flex gap-2.5 items-start ${msg.sender === 'user' ? 'justify-end' : ''}`}
              >
                {msg.sender === 'ai' && (
                  <div className="bg-brand-primary text-white p-1.5 rounded-xl shrink-0 mt-1 shadow-sm">
                    <Bot className="h-4 w-4" />
                  </div>
                )}
                
                <div className={`max-w-[85%] p-3.5 rounded-2xl text-xs leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-brand-primary text-white rounded-tr-none font-medium shadow-md'
                    : 'bg-white dark:bg-brand-dark border border-gray-100 dark:border-gray-800 text-brand-text dark:text-brand-bg rounded-tl-none shadow-sm space-y-2'
                }`}>
                  
                  {/* Message formatted content */}
                  <div className="whitespace-pre-line">
                    {msg.text}
                  </div>

                  {/* Action Link Button if provided */}
                  {msg.actionLink && (
                    <div className="pt-2 border-t border-gray-100 dark:border-gray-800">
                      <Link
                        href={msg.actionLink.url}
                        onClick={() => setIsOpen(false)}
                        className="inline-flex items-center gap-1.5 bg-brand-primary text-white text-[11px] font-extrabold px-3 py-1.5 rounded-xl hover:bg-brand-secondary transition-all shadow-sm"
                      >
                        <span>{msg.actionLink.label}</span>
                        <ArrowRight className="h-3 w-3" />
                      </Link>
                    </div>
                  )}

                  <span className={`text-[8px] font-bold block text-right mt-1 ${
                    msg.sender === 'user' ? 'text-white/60' : 'text-gray-400'
                  }`}>
                    {msg.time}
                  </span>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-2 items-center text-xs text-gray-400 italic">
                <div className="bg-brand-primary/10 p-1 rounded text-brand-primary">
                  <Bot className="h-3.5 w-3.5 animate-bounce" />
                </div>
                <span>AI Assistant is looking up export database...</span>
              </div>
            )}

            <div ref={chatEndRef} />
          </div>

          {/* Quick Suggestions Chips */}
          <div className="p-2 border-t border-gray-100 dark:border-gray-800 bg-gray-50/80 dark:bg-brand-dark/50 overflow-x-auto whitespace-nowrap no-scrollbar flex gap-1.5">
            {quickQuestions.map((q) => (
              <button
                key={q}
                onClick={() => handleSendMessage(undefined, q)}
                className="bg-white dark:bg-brand-dark border border-gray-200 dark:border-gray-700 px-3 py-1 rounded-full text-[10px] font-extrabold text-brand-text/80 dark:text-brand-bg/80 hover:border-brand-primary hover:text-brand-primary transition-all shrink-0 shadow-2xs"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Typing Form */}
          <form onSubmit={handleSendMessage} className="p-3 border-t border-gray-100 dark:border-gray-800 flex gap-2 bg-white dark:bg-brand-dark">
            <input
              type="text"
              placeholder="Ask anything about 1kg samples, 1-ton rates, shipping..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1 bg-brand-bg dark:bg-brand-dark/60 px-3.5 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-brand-primary text-brand-text dark:text-white"
            />
            <button
              type="submit"
              className="bg-brand-primary hover:bg-brand-secondary text-white p-2.5 rounded-xl flex items-center justify-center transition-all shadow-md shrink-0"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>

        </div>
      )}
    </>
  );
}
