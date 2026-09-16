export interface RawMaterialPrice {
  id: string;
  name: string;
  category: 'Whole' | 'Powder' | 'Specialty';
  rawMaterialPerKgUSD: number; // Raw material cost per 1 kg in USD
  deliveryPerTonUSD: number;   // Base freight & delivery charges per 1 Ton (1,000 kg) in USD
  profitMarginPercent: number; // Exporter profit margin % (Default 30%)
  
  // Separate packaging & handling delivery surcharges per ton for bag sizes
  bagPackagingFeesPerTonUSD?: {
    bag50kg: number; // e.g. $15 per ton (20 bags/ton)
    bag30kg: number; // e.g. $25 per ton (33.3 bags/ton)
    bag20kg: number; // e.g. $40 per ton (50 bags/ton)
  };

  processingExtraPerKgUSD?: number; // Optional extra processing cost for powder/stemless
  lastUpdated: string;
}

// Default Packaging & Handling Charges per Ton by Bag Size
export const defaultBagPackagingFees = {
  bag50kg: 15, // $15 / Ton (Standard 50kg Jute/PP Sacks - 20 pcs/Ton)
  bag30kg: 25, // $25 / Ton (Medium 30kg Jute/PP Sacks - 33.3 pcs/Ton)
  bag20kg: 40, // $40 / Ton (Premium 20kg Vacuum/Paper Sacks - 50 pcs/Ton)
};

// Initial Default Raw Material Rates (Per Kg in USD)
export const defaultRawMaterialPrices: RawMaterialPrice[] = [
  {
    id: "teja-s17",
    name: "Teja S17 Red Chilli",
    category: "Whole",
    rawMaterialPerKgUSD: 2.80,  // $2,800 per Ton raw material
    deliveryPerTonUSD: 250,     // $250 per Ton base freight
    profitMarginPercent: 30,    // 30% margin
    bagPackagingFeesPerTonUSD: { ...defaultBagPackagingFees },
    lastUpdated: new Date().toISOString()
  },
  {
    id: "byadgi",
    name: "Byadgi Red Chilli",
    category: "Whole",
    rawMaterialPerKgUSD: 3.20,  // $3,200 per Ton raw material
    deliveryPerTonUSD: 250,
    profitMarginPercent: 30,
    bagPackagingFeesPerTonUSD: { ...defaultBagPackagingFees },
    lastUpdated: new Date().toISOString()
  },
  {
    id: "kashmiri",
    name: "Kashmiri Red Chilli",
    category: "Whole",
    rawMaterialPerKgUSD: 3.60,  // $3,600 per Ton raw material
    deliveryPerTonUSD: 250,
    profitMarginPercent: 30,
    bagPackagingFeesPerTonUSD: { ...defaultBagPackagingFees },
    lastUpdated: new Date().toISOString()
  },
  {
    id: "guntur-sannam",
    name: "Guntur Sannam (S4)",
    category: "Whole",
    rawMaterialPerKgUSD: 2.40,  // $2,400 per Ton raw material
    deliveryPerTonUSD: 250,
    profitMarginPercent: 30,
    bagPackagingFeesPerTonUSD: { ...defaultBagPackagingFees },
    lastUpdated: new Date().toISOString()
  },
  {
    id: "sannam-s4",
    name: "Sannam S4 Chilli",
    category: "Whole",
    rawMaterialPerKgUSD: 2.50,  // $2,500 per Ton raw material
    deliveryPerTonUSD: 250,
    profitMarginPercent: 30,
    bagPackagingFeesPerTonUSD: { ...defaultBagPackagingFees },
    lastUpdated: new Date().toISOString()
  },
  {
    id: "bird-eye",
    name: "Bird Eye (Kanthani)",
    category: "Specialty",
    rawMaterialPerKgUSD: 4.80,  // $4,800 per Ton raw material
    deliveryPerTonUSD: 250,
    profitMarginPercent: 30,
    bagPackagingFeesPerTonUSD: { ...defaultBagPackagingFees },
    lastUpdated: new Date().toISOString()
  },
  {
    id: "chilli-powder",
    name: "Pure Guntur Chilli Powder",
    category: "Powder",
    rawMaterialPerKgUSD: 3.00,  // $3,000 per Ton raw material
    deliveryPerTonUSD: 250,
    profitMarginPercent: 30,
    processingExtraPerKgUSD: 0.30,
    bagPackagingFeesPerTonUSD: { ...defaultBagPackagingFees },
    lastUpdated: new Date().toISOString()
  },
  {
    id: "crushed-chilli",
    name: "Crushed Red Chilli Flakes",
    category: "Powder",
    rawMaterialPerKgUSD: 2.90,  // $2,900 per Ton raw material
    deliveryPerTonUSD: 250,
    profitMarginPercent: 30,
    processingExtraPerKgUSD: 0.25,
    bagPackagingFeesPerTonUSD: { ...defaultBagPackagingFees },
    lastUpdated: new Date().toISOString()
  }
];

export interface CalculatedBagBreakdown {
  bagSizeKg: 50 | 30 | 20;
  bagsCountPerTon: number; // e.g. 20 pcs for 50kg, 33.3 pcs for 30kg, 50 pcs for 20kg
  packagingFeePerTon: number;
  subtotalPerTon: number; // Raw Material + Delivery + Packaging Fee
  profitMarginAmountPerTon: number; // 30% margin
  finalPricePerTonUSD: number; // Customer facing rate for 1 Ton in this bag size
}

export interface Calculated1TonPrice {
  id: string;
  name: string;
  rawMaterialPerKg: number;
  rawMaterialPerTon: number;
  deliveryPerTon: number;
  subtotalPerTon: number;
  profitMarginAmountPerTon: number;
  profitMarginPercent: number;
  finalPricePerTonUSD: number;       // Customer facing price per 1 Ton (Standard 50kg bag)
  
  // Specific Bag Size Options (50kg, 30kg, 20kg)
  bagOptions: {
    bag50kg: CalculatedBagBreakdown;
    bag30kg: CalculatedBagBreakdown;
    bag20kg: CalculatedBagBreakdown;
  };

  // Container Load Price Matrices (Customer View with 30% Margin)
  finalPricePerContainer20ftUSD: number; // 14 Tons (Standard Pods) / 19 Tons (Powder)
  finalPricePerContainer40ftUSD: number; // 24 Tons (Standard Pods) / 27 Tons (Powder)
}

/**
 * Calculates full 1-Ton pricing breakdown based on raw material rate, freight, 50/30/20kg bag sizes, and 30% margin.
 */
export function calculate1TonPricing(item: RawMaterialPrice): Calculated1TonPrice {
  const processingExtra = item.processingExtraPerKgUSD || 0;
  const effectiveRawPerKg = item.rawMaterialPerKgUSD + processingExtra;
  const rawMaterialPerTon = effectiveRawPerKg * 1000;
  const deliveryPerTon = item.deliveryPerTonUSD;
  const marginPercent = item.profitMarginPercent || 30;

  const bagFees = item.bagPackagingFeesPerTonUSD || defaultBagPackagingFees;

  // Compute breakdown for 50kg, 30kg, and 20kg bag options
  const createBagBreakdown = (bagSizeKg: 50 | 30 | 20, feePerTon: number): CalculatedBagBreakdown => {
    const bagsCountPerTon = Math.round((1000 / bagSizeKg) * 10) / 10;
    const subtotal = rawMaterialPerTon + deliveryPerTon + feePerTon;
    const margin = subtotal * (marginPercent / 100);
    const finalPricePerTonUSD = Math.round((subtotal + margin) * 100) / 100;

    return {
      bagSizeKg,
      bagsCountPerTon,
      packagingFeePerTon: feePerTon,
      subtotalPerTon: subtotal,
      profitMarginAmountPerTon: Math.round(margin * 100) / 100,
      finalPricePerTonUSD
    };
  };

  const bag50 = createBagBreakdown(50, bagFees.bag50kg);
  const bag30 = createBagBreakdown(30, bagFees.bag30kg);
  const bag20 = createBagBreakdown(20, bagFees.bag20kg);

  // Determine container capacities
  const isPowder = item.id.includes('powder') || item.id.includes('crushed') || item.category === 'Powder';
  const container20ftTons = isPowder ? 19 : 14;
  const container40ftTons = isPowder ? 27 : 24;

  return {
    id: item.id,
    name: item.name,
    rawMaterialPerKg: effectiveRawPerKg,
    rawMaterialPerTon,
    deliveryPerTon,
    subtotalPerTon: bag50.subtotalPerTon,
    profitMarginAmountPerTon: bag50.profitMarginAmountPerTon,
    profitMarginPercent: marginPercent,
    finalPricePerTonUSD: bag50.finalPricePerTonUSD,
    bagOptions: {
      bag50kg: bag50,
      bag30kg: bag30,
      bag20kg: bag20,
    },
    finalPricePerContainer20ftUSD: Math.round(bag50.finalPricePerTonUSD * container20ftTons),
    finalPricePerContainer40ftUSD: Math.round(bag50.finalPricePerTonUSD * container40ftTons),
  };
}

/**
 * Calculates customized order pricing for any requested tonnage, bag size (50/30/20kg), and container weight.
 */
export function calculateCustomOrderPricing(
  item: RawMaterialPrice,
  tonnage: number,
  bagSizeKg: 50 | 30 | 20 = 50,
  oceanFreightOverridePerTon?: number
) {
  const processingExtra = item.processingExtraPerKgUSD || 0;
  const effectiveRawPerKg = item.rawMaterialPerKgUSD + processingExtra;
  const rawMaterialTotalCost = effectiveRawPerKg * 1000 * tonnage;

  const bagFees = item.bagPackagingFeesPerTonUSD || defaultBagPackagingFees;
  const bagPackagingFeePerTon = bagSizeKg === 50 ? bagFees.bag50kg : bagSizeKg === 30 ? bagFees.bag30kg : bagFees.bag20kg;
  const totalPackagingCost = bagPackagingFeePerTon * tonnage;

  const effectiveFreightPerTon = oceanFreightOverridePerTon !== undefined ? oceanFreightOverridePerTon : item.deliveryPerTonUSD;
  const totalDeliveryCost = effectiveFreightPerTon * tonnage;

  const subtotalBeforeMargin = rawMaterialTotalCost + totalPackagingCost + totalDeliveryCost;
  const marginPercent = item.profitMarginPercent || 30;
  const totalProfitMarginAmount = subtotalBeforeMargin * (marginPercent / 100);

  const totalCustomerPriceUSD = Math.round((subtotalBeforeMargin + totalProfitMarginAmount) * 100) / 100;
  const effectivePricePerTonCustomerUSD = Math.round((totalCustomerPriceUSD / tonnage) * 100) / 100;
  const totalBagsRequired = Math.ceil((tonnage * 1000) / bagSizeKg);

  return {
    tonnage,
    bagSizeKg,
    totalBagsRequired,
    rawMaterialTotalCost,
    totalPackagingCost,
    totalDeliveryCost,
    subtotalBeforeMargin,
    marginPercent,
    totalProfitMarginAmount: Math.round(totalProfitMarginAmount * 100) / 100,
    totalCustomerPriceUSD,
    effectivePricePerTonCustomerUSD,
  };
}
