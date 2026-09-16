# ABHI GLOBAL EXPORTS — Complete Codebase Context for ChatGPT & Claude AI

> **System Prompt for AI Assistants (ChatGPT / Claude / Gemini / Perplexity):**
> You are inspecting the complete, production-ready codebase for **ABHI GLOBAL EXPORTS**, a B2B international dried red chilli export platform built with **Next.js 15 (App Router)**, **Tailwind CSS**, **TypeScript**, **Framer Motion**, **Lucide Icons**, and **Leaflet / OpenStreetMap**.
> Use this document to understand the architecture, data models, pricing algorithms, API routes, and component tree for reviewing, auditing, or adding new features.

---

## 📌 Executive Project Summary

- **Business Name:** ABHI GLOBAL EXPORTS
- **Owner / Exporter Email:** `abhinavchandra.lakavath@gmail.com`
- **Primary Export Hub / Origin:** **India, Telangana** (Hyderabad HYD Airport for air freight, Chennai & Krishnapatnam ports for ocean containers).
- **Core Products:** 11 Export Grade Dried Red Chilli Varieties (Teja S17, Byadgi, Kashmiri, Guntur Sannam S4, Bird's Eye/Kanthari, etc.) and 6 Product Categories (Whole Pods, Stemless, Powder, Flakes, Seeds).
- **Tech Stack:** Next.js 15, React 19, TypeScript, Tailwind CSS v4, Framer Motion, Lucide Icons, Leaflet Maps, Resend API.

---

## 🛠️ Key Technical Features & Algorithms

### 1. 1kg Quality Evaluation Sample Purchase System
- **Location:** Integrated at the bottom of product pages ([`SamplePurchaseWidget.tsx`](file:///C:/Users/Abhinav%20Chandra/.gemini/antigravity/scratch/abhi-global-exports/components/shared/SamplePurchaseWidget.tsx)).
- **Quantity Constraint:** Strictly capped at **1 kg maximum** per customer for lab quality verification prior to bulk container ordering.
- **Internal Financial Formula (Hidden from Customer):**
  $$\text{Sample Total USD} = (\text{Base 1kg Product Price} + \text{\$26 Express Courier \& COA Fee}) \times 1.30 \text{ (30\% Margin)}$$
- **Customer View:** Displays ONLY a single flat all-inclusive price tag (e.g. **$52.00 / 1kg Pack** or **₹4,342** in INR).

### 2. Admin 1-Ton Dynamic Pricing Engine
- **Location:** Admin Dashboard ([`/dashboard/admin`](file:///C:/Users/Abhinav%20Chandra/.gemini/antigravity/scratch/abhi-global-exports/app/dashboard/admin/page.tsx) $\rightarrow$ [`RawMaterialPriceManager.tsx`](file:///C:/Users/Abhinav%20Chandra/.gemini/antigravity/scratch/abhi-global-exports/components/admin/RawMaterialPriceManager.tsx)).
- **Editable Parameters:** Raw material market rates ($/kg), base freight per ton ($/ton), and separate bag packaging delivery charges for **50 kg**, **30 kg**, and **20 kg** sacks.
- **Automated Formula:**
  $$\mathbf{\text{Customer 1-Ton Selling Price}} = [(\text{Raw Material Rate/kg} \times 1,000) + \text{Bag Packaging Fee/Ton} + \text{Freight/Ton}] \times 1.30$$
- **Features:** Market Inflation Adjusters (+5%, +10%, -5%), Customer View Simulator, and 1-Click **"Publish Prices Site-Wide"**.

### 3. Interactive World Trade Map (Origin: India, Telangana)
- **Location:** [`ExportRouteMap.tsx`](file:///C:/Users/Abhinav%20Chandra/.gemini/antigravity/scratch/abhi-global-exports/components/shared/ExportRouteMap.tsx) & [`LeafletWorldMap.tsx`](file:///C:/Users/Abhinav%20Chandra/.gemini/antigravity/scratch/abhi-global-exports/components/shared/LeafletWorldMap.tsx).
- **Features:** High-definition real-world vector map backdrop with pulsing origin pin at **India, Telangana** (`[17.3850, 78.4867]`) and animated curved trade polyline arcs to USA, Netherlands, UAE, Singapore, Japan, Germany, UK, and Australia.

### 4. Dual Automated Email Dispatch
- **Endpoints:** [`app/api/sample-order/route.ts`](file:///C:/Users/Abhinav%20Chandra/.gemini/antigravity/scratch/abhi-global-exports/app/api/sample-order/route.ts) & [`app/api/rfq/route.ts`](file:///C:/Users/Abhinav%20Chandra/.gemini/antigravity/scratch/abhi-global-exports/app/api/rfq/route.ts).
- **Exporter Mail (`abhinavchandra.lakavath@gmail.com`):** Receives order details WITH full internal cost breakdown (Base Cost, Freight, Packaging, 30% Profit Margin, Net Profit Earned).
- **Customer Mail:** Receives a clean receipt showing ONLY item, quantity, delivery address, and flat total paid.

### 5. Pro AI Export Assistant Chatbot
- **Location:** [`Chatbot.tsx`](file:///C:/Users/Abhinav%20Chandra/.gemini/antigravity/scratch/abhi-global-exports/components/chatbot/Chatbot.tsx).
- **Features:** Intelligence engine answering 1kg sample kits, 1-ton rates, 50/30/20kg bags, Telangana logistics, ISO/HACCP certifications, SHU/ASTA ratings, and natural language prompt queries with direct clickable action buttons.

---

## 📁 Key File Structure & Architecture

```
abhi-global-exports/
├── app/
│   ├── api/
│   │   ├── rfq/route.ts              # Bulk RFQ handler with dual email dispatch
│   │   └── sample-order/route.ts     # 1kg sample order handler with margin logs
│   ├── products/
│   │   ├── page.tsx                  # Product catalog page with filters
│   │   └── [slug]/page.tsx           # Product detail page + SamplePurchaseWidget
│   ├── export-destinations/page.tsx   # Global supply destinations & ExportRouteMap
│   ├── calculator/page.tsx           # Container & Freight Calculator page
│   ├── certifications/page.tsx       # ISO 22000, HACCP, APEDA, FSSAI certificates
│   ├── processing-plant/page.tsx     # Guntur plant tour & steam sterilization
│   ├── dashboard/
│   │   ├── admin/page.tsx            # Admin Control Panel & RawMaterialPriceManager
│   │   └── buyer/page.tsx            # Buyer portal for saved quotes & samples
│   ├── layout.tsx                    # Root layout with Currency & Language providers
│   └── page.tsx                      # Main Landing Page
├── components/
│   ├── admin/
│   │   └── RawMaterialPriceManager.tsx # 1-Ton & 50/30/20kg bag dynamic price controller
│   ├── calculator/
│   │   ├── ContainerCalculator.tsx    # Bag size & 20ft/40ft container loading
│   │   └── ShippingEstimator.tsx     # Port freight & Incoterms estimator
│   ├── chatbot/
│   │   └── Chatbot.tsx               # ChatGPT/Gemini style AI Chilli Assistant
│   ├── layout/
│   │   ├── Navbar.tsx                # Single emblem header + Round Profile Widget
│   │   └── Footer.tsx                # Footer with quick links & exporter contacts
│   └── shared/
│       ├── ExportRouteMap.tsx        # World map component (India, Telangana origin)
│       ├── LeafletWorldMap.tsx       # Real geographic Leaflet world map engine
│       ├── SamplePurchaseWidget.tsx  # 1kg quality sample purchase widget
│       ├── InquiryForm.tsx           # B2B RFQ submission form
│       └── WhatsAppButton.tsx        # Floating WhatsApp quick chat
├── data/
│   ├── chillies.ts                   # 11 Dried Red Chilli product definitions
│   └── dynamicPricing.ts             # 1-Ton & 50/30/20kg bag calculation engine
├── context/
│   ├── CurrencyContext.tsx           # Currency switcher (USD, EUR, INR, AED, SGD)
│   └── LanguageContext.tsx           # Multi-language translation context
└── public/
    └── images/
        ├── products/                 # High-contrast solo pod & bulk warehouse photos
        ├── categories/               # Studio photos for whole, stemless, powder, etc.
        └── world-map-vector.png      # High-definition vector world map backdrop
```

---

## 🤖 Instructions to Share with ChatGPT or Claude

1. **Option A (Attach Document):**
   Attach this `PROJECT_CONTEXT.md` file directly into ChatGPT (GPT-4o) or Claude (Claude 3.5 Sonnet / Claude 3 Opus).
2. **Option B (Paste Prompt):**
   Copy the contents of this file and paste it into ChatGPT / Claude along with your prompt (e.g., *"I have uploaded the codebase for ABHI GLOBAL EXPORTS. Please review..."*).
3. **Option C (GitHub / Live URL):**
   Provide the live website URL `http://localhost:3000` or your deployed domain `https://abhiglobalexports.com` so ChatGPT and Claude can browse the live site!
