import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";
import { CurrencyProvider as AppCurrencyProvider } from "@/context/CurrencyContext";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "ABHI GLOBAL EXPORTS | Indian Chilli Exporter",
  description: "Premium bulk Indian dried chillies, powders, flakes and seeds exporter. Sourced direct from Guntur farms, steam sterilized, ISO and HACCP certified.",
  keywords: "indian chilli exporter, guntur red chilli, teja s17 chilli, byadgi chilli bulk, kashmiri chilli wholesale, spices export india",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`h-full antialiased ${inter.variable}`}
    >
      <body className="flex min-h-full flex-col font-sans bg-brand-bg text-brand-text dark:bg-brand-dark dark:text-white transition-colors duration-300">
        <LanguageProvider>
          <AppCurrencyProvider>
            {children}
          </AppCurrencyProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
