export interface ChilliProduct {
  id: string;
  name: string;
  slug: string;
  images: {
    solo: string; // Individual dried pod / retail package photo
    bulk: string; // Warehouse sacks / export container photo
  };
  videos: string[];
  origin: string;
  heat: 'Mild' | 'Medium' | 'High' | 'Very High' | 'Extremely High';
  shu: string; // Scoville Heat Units
  asta: string; // ASTA Color Value
  moisture: string;
  packing: string[];
  price: string;
  description: string;
  moq: string;
  containerCapacity: {
    fcl20: string; // 20ft container capacity in metric tons
    fcl40: string; // 40ft container capacity in metric tons
  };
  leadTime: string;
  harvestSeason: string;
  specifications: Record<string, string>;
  applications: string[];
  availability: boolean;
  featured: boolean;
  organic: boolean;
  machineCleaned: boolean;
  beginnerGuides: {
    heatNotice: string;   // Plain English explanation of spiciness
    colorNotice: string;  // Plain English explanation of color value
    moqNotice: string;    // Plain English explanation of MOQ requirement
  };
  seo: {
    title: string;
    description: string;
    keywords: string[];
  };
}

export const chillies: ChilliProduct[] = [
  {
    id: "teja-s17",
    name: "Teja S17",
    slug: "teja-s17",
    images: {
      solo: "/images/products/teja-s17-solo.jpg",
      bulk: "/images/products/bulk-warehouse.jpg"
    },
    videos: [],
    origin: "Guntur, Andhra Pradesh",
    heat: "Extremely High",
    shu: "75,000 - 110,000",
    asta: "50 - 70",
    moisture: "< 12%",
    packing: ["10kg PP Bag", "20kg Jute Bag", "25kg Gunny Bag"],
    price: "Price on Request",
    description: "Teja S17 is one of the most popular and hottest varieties of red chillies exported globally from India. Highly demanded for its sharp heat, fiery aroma, and rich capsaicin content, it is widely used in making spice blends, chilli powders, and hot sauces.",
    moq: "10 Metric Tons",
    containerCapacity: {
      fcl20: "14 MT",
      fcl40: "24 MT"
    },
    leadTime: "10 - 15 Days",
    harvestSeason: "January to April",
    specifications: {
      "Skin": "Thin & Wrinkled",
      "Stalk": "With or Without Stalk",
      "Purity": "99% Admixture Free",
      "Capsaicin Content": "0.5% - 0.7%"
    },
    applications: ["Hot Sauces", "Chilli Powder", "Oleoresin Extraction", "Curry Pastes"],
    availability: true,
    featured: true,
    organic: false,
    machineCleaned: true,
    beginnerGuides: {
      heatNotice: "Fiery Hot (75k-110k SHU) — Ideal if you want maximum spice kick for hot sauces or fiery curry powders.",
      colorNotice: "Moderate Red Color (50-70 ASTA) — Provides natural spice color without excessive staining.",
      moqNotice: "10 Metric Tons = ~1 Small Freight Container load. Perfect for commercial spice processors."
    },
    seo: {
      title: "Premium Teja S17 Red Chillies Exporter | ABHI GLOBAL EXPORTS",
      description: "Buy bulk Teja S17 red chillies direct from Guntur farms. High capsaicin, fiery heat, and export-grade quality. Get instant wholesale quote.",
      keywords: ["teja s17 chilli", "guntur red chilli", "high heat chilli export", "wholesale indian chillies"]
    }
  },
  {
    id: "byadgi",
    name: "Byadgi",
    slug: "byadgi",
    images: {
      solo: "/images/products/byadgi-solo.jpg",
      bulk: "/images/products/bulk-warehouse.jpg"
    },
    videos: [],
    origin: "Byadgi, Karnataka",
    heat: "Mild",
    shu: "12,000 - 15,000",
    asta: "150 - 200",
    moisture: "< 12%",
    packing: ["15kg PP Bag", "25kg Jute Bag"],
    price: "Price on Request",
    description: "Famous for its deep red color, wrinkled texture, and low pungency, Byadgi chillies are a must-have for culinary preparations where color is preferred over high heat. It is a key ingredient in many traditional South Indian spice mixes and coloring applications.",
    moq: "8 Metric Tons",
    containerCapacity: {
      fcl20: "12 MT",
      fcl40: "22 MT"
    },
    leadTime: "12 - 18 Days",
    harvestSeason: "January to May",
    specifications: {
      "Skin": "Highly Wrinkled",
      "Color Value": "150 - 200 ASTA",
      "Broken Chillies": "Max 4%",
      "Yellow Damage": "Max 2%"
    },
    applications: ["Food Coloring", "Mild Curry Powders", "Spice Mixes", "Sambar & Rasam Powders"],
    availability: true,
    featured: true,
    organic: true,
    machineCleaned: true,
    beginnerGuides: {
      heatNotice: "Very Mild Heat (12k-15k SHU) — Gentle background warmth, suitable for non-spicy recipes.",
      colorNotice: "Intense Deep Red (150-200 ASTA) — Imparts rich, appetizing crimson red color naturally.",
      moqNotice: "8 Metric Tons minimum order weight."
    },
    seo: {
      title: "Deep Red Byadgi Chillies Bulk Supplier | ABHI GLOBAL EXPORTS",
      description: "Source premium Byadgi red chillies with high ASTA color value and mild heat. Farm-direct sourcing, steam sterilized, bulk export worldwide.",
      keywords: ["byadgi chilli", "high asta red chilli", "wrinkled red chilli", "indian mild chilli"]
    }
  },
  {
    id: "sannam-s4",
    name: "Sannam S4",
    slug: "sannam-s4",
    images: {
      solo: "/images/products/sannam-s4-solo.jpg",
      bulk: "/images/products/bulk-warehouse.jpg"
    },
    videos: [],
    origin: "Guntur & Warangal",
    heat: "Medium",
    shu: "35,000 - 45,000",
    asta: "70 - 90",
    moisture: "< 11.5%",
    packing: ["20kg Jute Bag", "25kg PP Bag"],
    price: "Price on Request",
    description: "Sannam S4 (also known as 334) is the most widely cultivated and exported red chilli variety from Guntur. It possesses a moderate pungency and pleasant aroma, making it globally versatile for domestic kitchens and industrial food production alike.",
    moq: "12 Metric Tons",
    containerCapacity: {
      fcl20: "14 MT",
      fcl40: "24 MT"
    },
    leadTime: "10 - 15 Days",
    harvestSeason: "December to April",
    specifications: {
      "Skin": "Medium Thick",
      "Stalk": "With Stalk",
      "Length": "6 to 9 cm",
      "Admixture": "Max 1%"
    },
    applications: ["General Cooking", "Chilli Flakes", "Curry Powder Blends", "Pickling"],
    availability: true,
    featured: true,
    organic: false,
    machineCleaned: true,
    beginnerGuides: {
      heatNotice: "Balanced Medium Heat (35k-45k SHU) — The global benchmark for everyday spice blends.",
      colorNotice: "Standard Red (70-90 ASTA) — Good natural red shade for cooking and chilli flakes.",
      moqNotice: "12 Metric Tons minimum shipment."
    },
    seo: {
      title: "Guntur Sannam S4 Red Chilli Wholesale | ABHI GLOBAL EXPORTS",
      description: "Buy premium Sannam S4 (334) red chillies. Medium heat and rich red color, cleaned and graded. Standard packaging and fast shipping.",
      keywords: ["sannam s4 chilli", "334 red chilli", "guntur sannam wholesale", "medium heat indian chilli"]
    }
  },
  {
    id: "341",
    name: "341 Red Chilli",
    slug: "chilli-341",
    images: {
      solo: "/images/products/sannam-s4-solo.jpg",
      bulk: "/images/products/bulk-warehouse.jpg"
    },
    videos: [],
    origin: "Andhra Pradesh",
    heat: "High",
    shu: "50,000 - 65,000",
    asta: "90 - 110",
    moisture: "< 12%",
    packing: ["20kg Jute Bag", "25kg PP Bag"],
    price: "Price on Request",
    description: "Chilli 341 is a premium variety that offers a beautiful bright red color coupled with high heat levels. It is highly favored by food manufacturers seeking an optimal balance of strong spice profile and vibrant red presentation.",
    moq: "10 Metric Tons",
    containerCapacity: {
      fcl20: "13 MT",
      fcl40: "24 MT"
    },
    leadTime: "10 - 15 Days",
    harvestSeason: "February to May",
    specifications: {
      "Color": "Vibrant Red",
      "Length": "8 to 11 cm",
      "Purity": "99.5%",
      "Stalk": "Available with/without"
    },
    applications: ["Vibrant Chilli Powder", "Fast Food Seasonings", "Spicy Snacks", "Indian Gravies"],
    availability: true,
    featured: false,
    organic: false,
    machineCleaned: true,
    beginnerGuides: {
      heatNotice: "Strong High Heat (50k-65k SHU) — Delivers a fast, punchy spice level.",
      colorNotice: "Vibrant Bright Red (90-110 ASTA) — Beautiful bright red finish in ground powders.",
      moqNotice: "10 Metric Tons minimum order weight."
    },
    seo: {
      title: "Bulk 341 Red Chilli Exporter India | ABHI GLOBAL EXPORTS",
      description: "Import high-grade 341 red chillies from India. Deep color, hot spice profile, steam sterilized. Request price quote for wholesale orders.",
      keywords: ["341 red chilli", "indian 341 chilli", "bright red spicy chilli", "spices wholesale india"]
    }
  },
  {
    id: "334",
    name: "334 Chilli",
    slug: "chilli-334",
    images: {
      solo: "/images/products/sannam-s4-solo.jpg",
      bulk: "/images/products/bulk-warehouse.jpg"
    },
    videos: [],
    origin: "Andhra Pradesh & Telangana",
    heat: "Medium",
    shu: "30,000 - 40,000",
    asta: "70 - 85",
    moisture: "< 12%",
    packing: ["20kg Jute Bag", "25kg PP Bag"],
    price: "Price on Request",
    description: "The 334 variety is closely aligned with the Sannam S4, featuring a medium heat rating, high seed content, and rich pungency. It is primarily exported to Asian and Middle Eastern countries for hot curry base preparations.",
    moq: "10 Metric Tons",
    containerCapacity: {
      fcl20: "14 MT",
      fcl40: "24 MT"
    },
    leadTime: "12 - 15 Days",
    harvestSeason: "January to April",
    specifications: {
      "Skin": "Medium Wrinkled",
      "Broken": "Max 3%",
      "Moisture": "11% - 12%",
      "Stalk": "With stalk"
    },
    applications: ["Spicy Asian Dishes", "Sauces", "Chilli Flakes", "Bulk Grinding"],
    availability: true,
    featured: false,
    organic: false,
    machineCleaned: false,
    beginnerGuides: {
      heatNotice: "Medium Spicy (30k-40k SHU) — Traditional Asian curry base level.",
      colorNotice: "Standard Orange-Red (70-85 ASTA) — Suitable for bulk commercial grinding.",
      moqNotice: "10 Metric Tons minimum order weight."
    },
    seo: {
      title: "334 Red Chillies Exporter & Supplier | ABHI GLOBAL EXPORTS",
      description: "Source bulk 334 red chillies. Medium hot pungency, rich seed ratio, clean sorting, and premium packaging options. Worldwide delivery.",
      keywords: ["334 chilli", "wholesale 334 red chilli", "indian hot pepper", "chilli exporters Guntur"]
    }
  },
  {
    id: "guntur",
    name: "Guntur Sannam",
    slug: "guntur-sannam",
    images: {
      solo: "/images/products/guntur-sannam-solo.jpg",
      bulk: "/images/products/bulk-warehouse.jpg"
    },
    videos: [],
    origin: "Guntur district, Andhra Pradesh",
    heat: "High",
    shu: "40,000 - 55,000",
    asta: "80 - 100",
    moisture: "< 12%",
    packing: ["15kg PP Bag", "20kg Jute Bag", "25kg Jute Bag"],
    price: "Price on Request",
    description: "Hailing from the chilli capital of India, Guntur Sannam chillies are renowned for their signature deep red color and stinging pungency. Guntur is the benchmark for chilli quality globally, and these chillies are the cornerstone of traditional fiery Indian cuisine.",
    moq: "10 Metric Tons",
    containerCapacity: {
      fcl20: "14 MT",
      fcl40: "24 MT"
    },
    leadTime: "10 - 14 Days",
    harvestSeason: "December to April",
    specifications: {
      "Pungency": "High",
      "Color Value": "80 - 100 ASTA",
      "Stalk": "With or Without Stalk",
      "Cleaning": "Machine Cleaned & Hand Picked (MC/HP)"
    },
    applications: ["Hot Chili Powders", "Masala Blends", "Meat Marinades", "Sriracha Base"],
    availability: true,
    featured: true,
    organic: false,
    machineCleaned: true,
    beginnerGuides: {
      heatNotice: "Strong Pungency (40k-55k SHU) — Authentic Guntur spice profile.",
      colorNotice: "Rich Dark Red (80-100 ASTA) — Vibrant color value.",
      moqNotice: "10 Metric Tons minimum order weight."
    },
    seo: {
      title: "Authentic Guntur Sannam Red Chilli | ABHI GLOBAL EXPORTS",
      description: "Exporting premium Guntur Sannam red chillies globally. Direct from Guntur market, quality tested, sanitized, high heat, vibrant color.",
      keywords: ["guntur sannam", "guntur chilli export", "spicy indian red chilli", "wholesale spices Guntur"]
    }
  },
  {
    id: "kashmiri",
    name: "Kashmiri Chilli",
    slug: "kashmiri-chilli",
    images: {
      solo: "/images/products/kashmiri-solo.jpg",
      bulk: "/images/products/bulk-warehouse.jpg"
    },
    videos: [],
    origin: "Kashmir / Northern India Sourced",
    heat: "Mild",
    shu: "1,500 - 2,500",
    asta: "160 - 240",
    moisture: "< 11%",
    packing: ["10kg Carton", "20kg PP Bag"],
    price: "Price on Request",
    description: "The Kashmiri Chilli is highly prized for its exceptional crimson red color and extremely mild heat. It is a staple in premium culinary dishes worldwide where a beautiful, appetizing red color is desired without making the dish overly spicy.",
    moq: "5 Metric Tons",
    containerCapacity: {
      fcl20: "10 MT",
      fcl40: "20 MT"
    },
    leadTime: "15 - 20 Days",
    harvestSeason: "September to December",
    specifications: {
      "Color Value": "160 - 240 ASTA (Very High)",
      "Pungency": "Very Low",
      "Stalk": "Stemless / Stalkless preferred",
      "Grade": "A-Grade Premium"
    },
    applications: ["Tandoori Dishes", "Butter Chicken", "Premium Color Powders", "Garnish Oils"],
    availability: true,
    featured: true,
    organic: true,
    machineCleaned: true,
    beginnerGuides: {
      heatNotice: "Extremely Mild (1.5k-2.5k SHU) — Almost no heat, focus is purely on color and mild sweet aroma.",
      colorNotice: "Ultra Deep Crimson (160-240 ASTA) — Top tier color rating worldwide.",
      moqNotice: "5 Metric Tons lower minimum order limit."
    },
    seo: {
      title: "Premium Kashmiri Red Chilli Supplier | ABHI GLOBAL EXPORTS",
      description: "Buy bulk Kashmiri red chillies. Low heat, extreme ASTA red color, pesticide-free. Ideal for premium spice branding and restaurants.",
      keywords: ["kashmiri chilli wholesale", "mild red chilli", "natural food coloring", "kashmiri chilli exporter"]
    }
  },
  {
    id: "mundu",
    name: "Mundu Chilli",
    slug: "mundu-chilli",
    images: {
      solo: "/images/products/byadgi-solo.jpg",
      bulk: "/images/products/bulk-warehouse.jpg"
    },
    videos: [],
    origin: "Ramnad, Tamil Nadu",
    heat: "Mild",
    shu: "10,000 - 15,000",
    asta: "60 - 80",
    moisture: "< 12%",
    packing: ["15kg PP Bag", "25kg Jute Bag"],
    price: "Price on Request",
    description: "Mundu (also known as Ramnad Round) is a unique, sphere-shaped chilli grown in Tamil Nadu. It has a shiny, thick skin and a very distinct fruity, smoky flavor profile with a mild heat. It is widely used in South Indian and Sri Lankan cuisines.",
    moq: "8 Metric Tons",
    containerCapacity: {
      fcl20: "11 MT",
      fcl40: "21 MT"
    },
    leadTime: "12 - 18 Days",
    harvestSeason: "March to June",
    specifications: {
      "Shape": "Spherical / Round",
      "Flavor": "Smoky & Fruity",
      "Skin": "Thick & Shiny",
      "Stalk": "Short Stalk"
    },
    applications: ["South Indian Curries", "Sambhar Powder", "Whole Roast Chilli Seasoning", "Chutneys"],
    availability: true,
    featured: false,
    organic: false,
    machineCleaned: true,
    beginnerGuides: {
      heatNotice: "Mild Smoky Spice (10k-15k SHU) — Round sphere shaped pod with a fruity flavor.",
      colorNotice: "Shiny Cherry Red (60-80 ASTA).",
      moqNotice: "8 Metric Tons minimum order."
    },
    seo: {
      title: "Round Mundu (Ramnad) Chilli Export | ABHI GLOBAL EXPORTS",
      description: "Import authentic round Mundu chillies from Ramnad, India. Fruity-smoky flavor, mild heat, spherical shape, premium dried quality.",
      keywords: ["mundu chilli", "ramnad round chilli", "round red chilli", "smoky flavour chilli"]
    }
  },
  {
    id: "tomato-chilli",
    name: "Tomato Chilli (Warangal)",
    slug: "tomato-chilli",
    images: {
      solo: "/images/products/byadgi-solo.jpg",
      bulk: "/images/products/bulk-warehouse.jpg"
    },
    videos: [],
    origin: "Warangal, Telangana",
    heat: "Mild",
    shu: "15,000 - 22,000",
    asta: "120 - 150",
    moisture: "< 12%",
    packing: ["20kg Jute Bag", "25kg PP Bag"],
    price: "Price on Request",
    description: "Tomato Chilli is short, plump, and round, resembling a small tomato. It has an excellent deep red color value and a sweet, mildly spicy flesh. It is heavily utilized for mild paprika grinding and decorative culinary presentations.",
    moq: "10 Metric Tons",
    containerCapacity: {
      fcl20: "12 MT",
      fcl40: "22 MT"
    },
    leadTime: "14 - 20 Days",
    harvestSeason: "February to May",
    specifications: {
      "Shape": "Tomato-like / Wide Plump",
      "Skin": "Thick & Wrinkled",
      "Color ASTA": "120 - 150",
      "Broken": "Max 3%"
    },
    applications: ["Mild Paprika Powder", "Pickles", "Food Coloring", "Garnishing and Salads"],
    availability: true,
    featured: false,
    organic: false,
    machineCleaned: false,
    beginnerGuides: {
      heatNotice: "Mild Sweet Spice (15k-22k SHU) — Plump tomato-shaped chili.",
      colorNotice: "High Red ASTA (120-150) — Used for mild paprika powder.",
      moqNotice: "10 Metric Tons minimum shipment."
    },
    seo: {
      title: "Tomato Chilli Warangal Supplier | ABHI GLOBAL EXPORTS",
      description: "Bulk supply of round Tomato red chillies from Warangal. High ASTA color, thick skin, mild spicy sweet flavor. Enquire for details.",
      keywords: ["tomato chilli", "warangal tomato chilli", "round plump chilli", "paprika powder spice"]
    }
  },
  {
    id: "bird-eye",
    name: "Bird Eye Chilli",
    slug: "bird-eye",
    images: {
      solo: "/images/products/bird-eye-solo.jpg",
      bulk: "/images/products/bulk-warehouse.jpg"
    },
    videos: [],
    origin: "Mizoram / North East India Sourced",
    heat: "Extremely High",
    shu: "100,000 - 150,000",
    asta: "40 - 60",
    moisture: "< 11.5%",
    packing: ["10kg Carton", "20kg Jute Bag"],
    price: "Price on Request",
    description: "Mizoram Bird Eye chilli is small in size but packs an extremely powerful punch of heat. It is a highly potent variety, famous for its distinct aroma, sharp biting pungency, and clean chemical profile. Grown naturally in the pristine hills of North-East India.",
    moq: "3 Metric Tons",
    containerCapacity: {
      fcl20: "9 MT",
      fcl40: "18 MT"
    },
    leadTime: "15 - 25 Days",
    harvestSeason: "October to January",
    specifications: {
      "Size": "1.5 to 3 cm (Very Small)",
      "Pungency": "100k+ SHU",
      "Organic Cultivation": "Naturally grown, pesticide free",
      "Stalk": "Stalkless / Stemless"
    },
    applications: ["Extreme Hot Sauces", "Capsaicin Extracts", "Pickled Green/Red Chillies", "Thai Food Seasonings"],
    availability: true,
    featured: true,
    organic: true,
    machineCleaned: true,
    beginnerGuides: {
      heatNotice: "Extreme Biting Heat (100k-150k SHU) — Highest heat rating among Indian cultivated chillies.",
      colorNotice: "Light Red (40-60 ASTA).",
      moqNotice: "3 Metric Tons lower minimum limit due to high rarity."
    },
    seo: {
      title: "Organic Bird Eye Chilli (Mizoram) | ABHI GLOBAL EXPORTS",
      description: "Import small, high-heat organic Bird's Eye chillies from Mizoram, India. Pure capsaicin potency, intense heat, chemical-free. Direct sourcing.",
      keywords: ["bird eye chilli india", "mizoram bird eye chilli", "extremely hot small chilli", "organic bird eye"]
    }
  },
  {
    id: "wrinkle-chilli",
    name: "Wrinkle Chilli (S12)",
    slug: "wrinkle-chilli",
    images: {
      solo: "/images/products/byadgi-solo.jpg",
      bulk: "/images/products/bulk-warehouse.jpg"
    },
    videos: [],
    origin: "Karnataka / Andhra Pradesh",
    heat: "Mild",
    shu: "15,000 - 25,000",
    asta: "130 - 160",
    moisture: "< 12%",
    packing: ["15kg PP Bag", "25kg Jute Bag"],
    price: "Price on Request",
    description: "Wrinkle Chilli (S12) is prized for its high color retention and deeply wrinkled skin, giving it a premium aesthetic. It provides a sweet, mild spice profile that makes it highly popular for exporting to European markets for food preparation.",
    moq: "8 Metric Tons",
    containerCapacity: {
      fcl20: "12 MT",
      fcl40: "22 MT"
    },
    leadTime: "12 - 16 Days",
    harvestSeason: "January to April",
    specifications: {
      "Skin": "Deeply Wrinkled",
      "Color ASTA": "130 - 160",
      "Stalk": "With Stalk",
      "Yellow Damage": "Max 1.5%"
    },
    applications: ["European Food Seasoning", "Spice Mix Grinding", "Whole Table Garnish", "Mild Curry Base"],
    availability: true,
    featured: false,
    organic: false,
    machineCleaned: true,
    beginnerGuides: {
      heatNotice: "Mild Pungency (15k-25k SHU) — Smooth taste profile.",
      colorNotice: "High ASTA Red (130-160) — Popular across European food spice manufacturers.",
      moqNotice: "8 Metric Tons minimum order weight."
    },
    seo: {
      title: "Wrinkle Chilli S12 Exporter India | ABHI GLOBAL EXPORTS",
      description: "Source premium S12 wrinkled red chillies. Mild pungency, high ASTA value, excellent color retention. Request wholesale pricing.",
      keywords: ["wrinkle chilli s12", "s12 red chilli", "premium wrinkled chilli", "export spice india"]
    }
  }
];

export const categories = [
  { id: "whole", name: "Whole Chillies", slug: "whole-chillies", image: "/images/categories/whole-chillies.jpg", description: "Whole sundried red chillies with or without stalks, cleaned and graded." },
  { id: "stemless", name: "Stemless", slug: "stemless-chillies", image: "/images/categories/stemless-chillies.jpg", description: "Destemmed premium chillies, processed in-house for direct grinding." },
  { id: "powder", name: "Chilli Powder", slug: "chilli-powder", image: "/images/categories/chilli-powder.jpg", description: "Finely ground pure red chilli powder, steam sterilized and customizable mesh sizes." },
  { id: "crushed", name: "Crushed Chilli", slug: "crushed-chilli", image: "/images/categories/crushed-chilli.jpg", description: "Coarsely crushed red chillies, perfect for pizzas and global seasoning applications." },
  { id: "flakes", name: "Chilli Flakes", slug: "chilli-flakes", image: "/images/categories/chilli-flakes.jpg", description: "Premium red chilli flakes with controlled seed ratio for aesthetic toppings." },
  { id: "seeds", name: "Chilli Seeds", slug: "chilli-seeds", image: "/images/categories/chilli-seeds.jpg", description: "High-germination and clean red chilli seeds for agriculture and oil extraction." }
];
