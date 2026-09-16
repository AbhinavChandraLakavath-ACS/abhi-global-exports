'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

type Currency = 'USD' | 'EUR' | 'INR' | 'AED' | 'SGD';

interface CurrencyContextProps {
  currency: Currency;
  setCurrency: (cur: Currency) => void;
  formatPrice: (amountInUSD: number) => string;
  exchangeRate: number;
  symbol: string;
}

const currencyInfo: Record<Currency, { symbol: string; rate: number; label: string }> = {
  USD: { symbol: '$', rate: 1.0, label: 'USD ($)' },
  EUR: { symbol: '€', rate: 0.92, label: 'EUR (€)' },
  INR: { symbol: '₹', rate: 83.5, label: 'INR (₹)' },
  AED: { symbol: 'د.إ', rate: 3.67, label: 'AED (د.إ)' },
  SGD: { symbol: 'S$', rate: 1.35, label: 'SGD (S$)' },
};

const CurrencyContext = createContext<CurrencyContextProps | undefined>(undefined);

export const CurrencyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currency, setCurrency] = useState<Currency>('USD');

  useEffect(() => {
    const saved = localStorage.getItem('currency') as Currency;
    if (saved && currencyInfo[saved]) {
      setCurrency(saved);
    }
  }, []);

  const handleSetCurrency = (cur: Currency) => {
    setCurrency(cur);
    localStorage.setItem('currency', cur);
  };

  const formatPrice = (amountInUSD: number): string => {
    const info = currencyInfo[currency];
    const converted = amountInUSD * info.rate;
    // Format appropriately
    if (currency === 'INR') {
      return `${info.symbol}${Math.round(converted).toLocaleString('en-IN')}`;
    }
    return `${info.symbol}${converted.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  return (
    <CurrencyContext.Provider
      value={{
        currency,
        setCurrency: handleSetCurrency,
        formatPrice,
        exchangeRate: currencyInfo[currency].rate,
        symbol: currencyInfo[currency].symbol,
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
};
