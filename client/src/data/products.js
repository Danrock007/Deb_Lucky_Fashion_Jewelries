const products = [
  // --- WATCHES ---
  {
    id: 1,
    name: "Rolex Oyster Perpetual Chain Strap",
    category: "Watches",
    price: 100,
    badge: "Bestseller",
    image: "/products/rolex-chain-strap.JPG",
    description: "Classic luxury timepiece featuring a stainless steel chain strap."
  },
  {
    id: 2,
    name: "Casio Standard Classic Watch",
    category: "Watches",
    price: 100,
    image: "/products/casio-watch.JPG",
    description: "Durable and versatile everyday wrist watch."
  },
  {
    id: 3,
    name: "Daniel Wellington Minimalist Watch",
    category: "Watches",
    price: 100,
    image: "/products/dw-watch.JPG",
    description: "Slim, elegant dial paired with modern craftsmanship."
  },
  {
    id: 4,
    name: "Curren Classic 9095",
    category: "Watches",
    price: 130,
    image: "/products/curren-watch-9095.JPG",
    description: "High-precision quartz sports and dress watch."
  },
  {
    id: 5,
    name: "Curren Chrono 9098",
    category: "Watches",
    price: 130,
    image: "/products/curren-watch-9098.JPG",
    description: "Sleek chronograph design built for everyday durability."
  },
  {
    id: 6,
    name: "Cartier Ballon Bleu",
    category: "Watches",
    price: 130,
    image: "/products/cartier-watch-ballon-bleu.JPG",
    description: "Distinctive rounded casing with signature Roman numeral aesthetics."
  },
  {
    id: 7,
    name: "Scottie Pebble Petite Watch",
    category: "Watches",
    price: 200,
    image: "/products/scottie-watch-pebble.JPG",
    description: "Delicate feminine timepiece with smooth rounded accents."
  },
  {
    id: 8,
    name: "Scottie Classic 9734",
    category: "Watches",
    price: 200,
    image: "/products/scottie-watch-9734.JPG",
    description: "Sophisticated jewelry-style wristwatch."
  },

  // --- NECKLACES ---
  {
    id: 9,
    name: "Bow Charm Single Necklace",
    category: "Necklaces",
    price: 25,
    badge: "Popular",
    image: "/products/female-single-necklace.JPG",
    description: "Dainty gold chain featuring an elegant bow centerpiece."
  },
  {
    id: 10,
    name: "Bar Charm Single Necklace",
    category: "Necklaces",
    price: 25,
    image: "/products/female-single-necklace1.JPG",
    description: "Minimalist chain necklace accented with fine pendants."
  },
  {
    id: 11,
    name: "Emerald Gem Single Necklace",
    category: "Necklaces",
    price: 25,
    image: "/products/female-single-necklace2.JPG",
    description: "Striking gemstone pendant on a polished chain."
  },
  {
    id: 12,
    name: "Silver Bow Ribbon Set",
    category: "Sets",
    price: 100,
    badge: "New",
    image: "/products/necklace-with-earrings.JPG",
    description: "Coordinated bow pendant necklace and stud earrings."
  },
  {
    id: 13,
    name: "Pink Crystal Ribbon Set",
    category: "Sets",
    price: 100,
    image: "/products/necklace-with-earrings1.JPG",
    description: "Sparkling rose-toned ribbon necklace with matching earrings."
  },
  {
    id: 14,
    name: "Golden Bow Ribbon Set",
    category: "Sets",
    price: 100,
    image: "/products/necklace-with-earrings2.JPG",
    description: "Lustrous gold-finish necklace paired with companion studs."
  },

  // --- BRACELETS ---
  {
    id: 15,
    name: "Men's ID Plate Link Bracelet",
    category: "Bracelets",
    price: 55,
    image: "/products/male-bracelet.JPG",
    description: "Solid stainless steel link chain bracelet with engravable bar."
  },
  {
    id: 16,
    name: "Delicate Tennis Bracelet",
    category: "Bracelets",
    price: 25,
    image: "/products/female-bracelet.JPG",
    description: "Refined women's bracelet designed with crystal shimmer."
  },
  {
    id: 17,
    name: "Charm Accent Chain Bracelet",
    category: "Bracelets",
    price: 25,
    image: "/products/female-bracelet1.JPG",
    description: "Everyday staple piece with subtle metallic charms."
  },
  {
    id: 18,
    name: "Classic Steel Link Bracelet",
    category: "Bracelets",
    price: 55,
    image: "/products/bracelet.JPG",
    description: "Premium finish link bracelet for modern styling."
  },
  {
    id: 19,
    name: "Duo Tone Link Bracelet",
    category: "Bracelets",
    price: 55,
    image: "/products/bracelet1.JPG",
    description: "Polished two-tone chain bracelet."
  },

  // --- BOTTLES ---
  {
    id: 20,
    name: "Insulated Bamboo Tumbler",
    category: "Bottles",
    price: 80,
    badge: "Eco",
    image: "/products/bamboo-bottle.JPG",
    description: "Natural bamboo exterior with stainless steel thermal insulation."
  },
  {
    id: 21,
    name: "Matte Silicone Flask",
    category: "Bottles",
    price: 80,
    image: "/products/silicon-bottle.JPG",
    description: "Soft-touch grip leakproof hydration bottle."
  },
  {
    id: 22,
    name: "Silicone Thermal Bottle - Pastel",
    category: "Bottles",
    price: 80,
    image: "/products/silicon-bottle1.JPG",
    description: "Lightweight, easy-carry silicone thermal bottle."
  },
  {
    id: 23,
    name: "Silicone Flask Edition 2",
    category: "Bottles",
    price: 80,
    image: "/products/silicon-bottle2.JPG",
    description: "Compact insulated everyday bottle."
  },
  {
    id: 24,
    name: "Textured Rough Finish Bottle",
    category: "Bottles",
    price: 70,
    image: "/products/rough-bottle.JPG",
    description: "Durable textured coating for high grip and outdoor wear."
  },
  {
    id: 25,
    name: "Rough Grip Tumbler II",
    category: "Bottles",
    price: 70,
    image: "/products/rough-bottle2.JPG",
    description: "Matte rugged thermal water bottle."
  },

  // --- DIARIES ---
  {
    id: 26,
    name: "Executive Leather Journal",
    category: "Diaries",
    price: 50,
    image: "/products/diary-without-pen.JPG",
    description: "Premium PU leather bound planner with snap closure."
  },
  {
    id: 27,
    name: "Executive Slim Diary",
    category: "Diaries",
    price: 50,
    image: "/products/diary-without-pen1.JPG",
    description: "Minimalist leather-bound notebook for everyday planning."
  },
  {
    id: 28,
    name: "Executive Gift Set with Pen & Ink",
    category: "Diaries",
    price: 85,
    badge: "Gift Box",
    image: "/products/diary-with-extra-ink.JPG",
    description: "Complete presentation box featuring journal, rollerball pen, and refill ink."
  },
  {
    id: 29,
    name: "Deluxe Journal Gift Set",
    category: "Diaries",
    price: 85,
    image: "/products/diary-with-extra-ink1.JPG",
    description: "Leather gift planner accompanied by executive pen accessories."
  },

  // --- WALLETS & PURSES ---
  {
    id: 30,
    name: "Classic Bi-Fold Wallet",
    category: "Wallets",
    price: 60,
    image: "/products/wallet.JPG",
    description: "Slim profile card and bill holder in rich faux leather."
  },
  {
    id: 31,
    name: "Executive Pocket Wallet",
    category: "Wallets",
    price: 60,
    image: "/products/wallet1.JPG",
    description: "Multi-slot leather pocket wallet for essentials."
  },
  {
    id: 32,
    name: "Structured Clutch Purse",
    category: "Wallets",
    price: 60,
    image: "/products/wallet-purse.JPG",
    description: "Multi-compartment organizer clutch purse."
  },
    {
    id: 33,
    name: "bamboo bottle 1",
    category: "Accessories",
    price: 80,
    image: "/products/bamboo-bottle-1.JPG",
    description: "Premium collection item."
  },
  {
    id: 34,
    name: "bamboo bottle",
    category: "Accessories",
    price: 80,
    image: "/products/bamboo-bottle.JPG",
    description: "Premium collection item."
  },
  {
    id: 35,
    name: "bracelet",
    category: "Bracelets",
    price: 55,
    image: "/products/bracelet.JPG",
    description: "Premium collection item."
  },
  {
    id: 36,
    name: "bracelet1",
    category: "Bracelets",
    price: 55,
    image: "/products/bracelet1.JPG",
    description: "Premium collection item."
  },
  {
    id: 37,
    name: "cartier watch ballon bleu 1",
    category: "Watches",
    price: 130,
    image: "/products/cartier-watch-ballon-bleu-1.JPG",
    description: "Premium collection item."
  },
  {
    id: 38,
    name: "cartier watch ballon bleu",
    category: "Watches",
    price: 130,
    image: "/products/cartier-watch-ballon-bleu.JPG",
    description: "Premium collection item."
  },
  {
    id: 39,
    name: "casio watch 1",
    category: "Watches",
    price: 100,
    image: "/products/casio-watch-1.JPG",
    description: "Premium collection item."
  },
  {
    id: 40,
    name: "casio watch",
    category: "Watches",
    price: 100,
    image: "/products/casio-watch.JPG",
    description: "Premium collection item."
  },
  {
    id: 41,
    name: "curren watch 9095",
    category: "Watches",
    price: 130,
    image: "/products/curren-watch-9095.JPG",
    description: "Premium collection item."
  },
  {
    id: 42,
    name: "curren watch 9097",
    category: "Watches",
    price: 130,
    image: "/products/curren-watch-9097.JPG",
    description: "Premium collection item."
  },
  {
    id: 43,
    name: "curren watch 9098",
    category: "Watches",
    price: 130,
    image: "/products/curren-watch-9098.JPG",
    description: "Premium collection item."
  },
  {
    id: 44,
    name: "curren watch 9103",
    category: "Watches",
    price: 130,
    image: "/products/curren-watch-9103.JPG",
    description: "Premium collection item."
  },
  {
    id: 45,
    name: "diary with extra ink 2",
    category: "Accessories",
    price: 85,
    image: "/products/diary-with-extra-ink-2.JPG",
    description: "Premium collection item."
  },
  {
    id: 46,
    name: "diary with extra ink 3",
    category: "Accessories",
    price: 85,
    image: "/products/diary-with-extra-ink-3.JPG",
    description: "Premium collection item."
  },
  {
    id: 47,
    name: "diary with extra ink 4",
    category: "Accessories",
    price: 85,
    image: "/products/diary-with-extra-ink-4.JPG",
    description: "Premium collection item."
  },
  {
    id: 48,
    name: "diary with extra ink 5",
    category: "Accessories",
    price: 85,
    image: "/products/diary-with-extra-ink-5.JPG",
    description: "Premium collection item."
  },
  {
    id: 49,
    name: "diary with extra ink",
    category: "Accessories",
    price: 85,
    image: "/products/diary-with-extra-ink.JPG",
    description: "Premium collection item."
  },
  {
    id: 50,
    name: "diary with extra ink1",
    category: "Accessories",
    price: 85,
    image: "/products/diary-with-extra-ink1.JPG",
    description: "Premium collection item."
  },
  {
    id: 51,
    name: "diary without pen 2",
    category: "Accessories",
    price: 50,
    image: "/products/diary-without-pen-2.JPG",
    description: "Premium collection item."
  },
  {
    id: 52,
    name: "diary without pen 3",
    category: "Accessories",
    price: 50,
    image: "/products/diary-without-pen-3.JPG",
    description: "Premium collection item."
  },
  {
    id: 53,
    name: "diary without pen",
    category: "Accessories",
    price: 50,
    image: "/products/diary-without-pen.JPG",
    description: "Premium collection item."
  },
  {
    id: 54,
    name: "diary without pen1",
    category: "Accessories",
    price: 50,
    image: "/products/diary-without-pen1.JPG",
    description: "Premium collection item."
  },
  {
    id: 55,
    name: "dw watch 1",
    category: "Watches",
    price: 100,
    image: "/products/dw-watch-1.JPG",
    description: "Premium collection item."
  },
  {
    id: 56,
    name: "dw watch",
    category: "Watches",
    price: 100,
    image: "/products/dw-watch.JPG",
    description: "Premium collection item."
  },
  {
    id: 57,
    name: "female bracelet 2",
    category: "Packaging",
    price: "Custom",
    image: "/products/female-bracelet-2.JPG",
    description: "Premium collection item."
  },
  {
    id: 58,
    name: "female bracelet 3",
    category: "Packaging",
    price: "Custom",
    image: "/products/female-bracelet-3.JPG",
    description: "Premium collection item."
  },
  {
    id: 59,
    name: "female bracelet 4",
    category: "Packaging",
    price: "Custom",
    image: "/products/female-bracelet-4.JPG",
    description: "Premium collection item."
  },
  {
    id: 60,
    name: "female bracelet 5",
    category: "Packaging",
    price: "Custom",
    image: "/products/female-bracelet-5.JPG",
    description: "Premium collection item."
  },
  {
    id: 61,
    name: "female bracelet",
    category: "Bracelets",
    price: 25,
    image: "/products/female-bracelet.JPG",
    description: "Premium collection item."
  },
  {
    id: 62,
    name: "female bracelet1",
    category: "Bracelets",
    price: 25,
    image: "/products/female-bracelet1.JPG",
    description: "Premium collection item."
  },
  {
    id: 63,
    name: "female single necklace",
    category: "Necklaces",
    price: 25,
    image: "/products/female-single-necklace.JPG",
    description: "Premium collection item."
  },
  {
    id: 64,
    name: "female single necklace1",
    category: "Necklaces",
    price: 25,
    image: "/products/female-single-necklace1.JPG",
    description: "Premium collection item."
  },
  {
    id: 65,
    name: "female single necklace2",
    category: "Necklaces",
    price: 25,
    image: "/products/female-single-necklace2.JPG",
    description: "Premium collection item."
  },
  {
    id: 66,
    name: "male bracelet 1",
    category: "Bracelets",
    price: 100,
    image: "/products/male-bracelet-1.JPG",
    description: "Premium collection item."
  },
  {
    id: 67,
    name: "male bracelet 2",
    category: "Bracelets",
    price: 100,
    image: "/products/male-bracelet-2.JPG",
    description: "Premium collection item."
  },
  {
    id: 68,
    name: "male bracelet 3",
    category: "Bracelets",
    price: 100,
    image: "/products/male-bracelet-3.JPG",
    description: "Premium collection item."
  },
  {
    id: 69,
    name: "male bracelet 4",
    category: "Bracelets",
    price: 100,
    image: "/products/male-bracelet-4.JPG",
    description: "Premium collection item."
  },
  {
    id: 70,
    name: "male bracelet 5",
    category: "Bracelets",
    price: 100,
    image: "/products/male-bracelet-5.JPG",
    description: "Premium collection item."
  },
  {
    id: 71,
    name: "male bracelet 6",
    category: "Bracelets",
    price: 100,
    image: "/products/male-bracelet-6.JPG",
    description: "Premium collection item."
  },
  {
    id: 72,
    name: "male bracelet 7",
    category: "Bracelets",
    price: 100,
    image: "/products/male-bracelet-7.JPG",
    description: "Premium collection item."
  },
  {
    id: 73,
    name: "male bracelet 8",
    category: "Bracelets",
    price: 100,
    image: "/products/male-bracelet-8.JPG",
    description: "Premium collection item."
  },
  {
    id: 74,
    name: "male bracelet",
    category: "Bracelets",
    price: 100,
    image: "/products/male-bracelet.JPG",
    description: "Premium collection item."
  },
  {
    id: 75,
    name: "necklace with earrings 3",
    category: "Necklaces",
    price: 100,
    image: "/products/necklace-with-earrings-3.JPG",
    description: "Premium collection item."
  },
  {
    id: 76,
    name: "necklace with earrings 4",
    category: "Necklaces",
    price: 100,
    image: "/products/necklace-with-earrings-4.JPG",
    description: "Premium collection item."
  },
  {
    id: 77,
    name: "necklace with earrings 5",
    category: "Necklaces",
    price: 100,
    image: "/products/necklace-with-earrings-5.JPG",
    description: "Premium collection item."
  },
  {
    id: 78,
    name: "necklace with earrings 6",
    category: "Necklaces",
    price: 100,
    image: "/products/necklace-with-earrings-6.JPG",
    description: "Premium collection item."
  },
  {
    id: 79,
    name: "necklace with earrings",
    category: "Necklaces",
    price: 100,
    image: "/products/necklace-with-earrings.JPG",
    description: "Premium collection item."
  },
  {
    id: 80,
    name: "necklace with earrings1",
    category: "Necklaces",
    price: 100,
    image: "/products/necklace-with-earrings1.JPG",
    description: "Premium collection item."
  },
  {
    id: 81,
    name: "necklace with earrings2",
    category: "Necklaces",
    price: 100,
    image: "/products/necklace-with-earrings2.JPG",
    description: "Premium collection item."
  },
  {
    id: 82,
    name: "neclace pendant",
    category: "Accessories",
    price: 25,
    image: "/products/neclace-pendant.JPG",
    description: "Premium collection item."
  },
  {
    id: 83,
    name: "package 1",
    category: "Packaging",
    price: "Custom" ,
    image: "/products/package-1.JPG",
    description: "Premium collection item."
  },
  {
    id: 84,
    name: "package 2",
    category: "Packaging",
    price: "Custom",
    image: "/products/package-2.JPG",
    description: "Premium collection item."
  },
  {
    id: 85,
    name: "package 3",
    category: "Packaging",
    price: "Custom",
    image: "/products/package-3.JPG",
    description: "Premium collection item."
  },
  {
    id: 86,
    name: "package 4",
    category: "Packaging",
    price: "Custom",
    image: "/products/package-4.JPG",
    description: "Premium collection item."
  },
  {
    id: 87,
    name: "package 5",
    category: "Packaging",
    price: "Custom",
    image: "/products/package-5.JPG",
    description: "Premium collection item."
  },
  {
    id: 88,
    name: "package 6",
    category: "Packaging",
    price: "Custom",
    image: "/products/package-6.JPG",
    description: "Premium collection item."
  },
  {
    id: 89,
    name: "package 7",
    category: "Packaging",
    price: "Custom",
    image: "/products/package-7.JPG",
    description: "Premium collection item."
  },
  {
    id: 90,
    name: "package",
    category: "Packaging",
    price: "Custom",
    image: "/products/package.JPG",
    description: "Premium collection item."
  },
  {
    id: 91,
    name: "rolex chain strap",
    category: "Accessories",
    price: 100,
    image: "/products/rolex-chain-strap.JPG",
    description: "Premium collection item."
  },
  {
    id: 92,
    name: "rough bottle",
    category: "Accessories",
    price: 70,
    image: "/products/rough-bottle.JPG",
    description: "Premium collection item."
  },
  {
    id: 93,
    name: "rough bottle2",
    category: "Accessories",
    price: 70,
    image: "/products/rough-bottle2.JPG",
    description: "Premium collection item."
  },
  {
    id: 94,
    name: "scottie watch 9734",
    category: "Watches",
    price: 200,
    image: "/products/scottie-watch-9734.JPG",
    description: "Premium collection item."
  },
  {
    id: 95,
    name: "scottie watch pebble 1",
    category: "Watches",
    price: 200,
    image: "/products/scottie-watch-pebble-1.JPG",
    description: "Premium collection item."
  },
  {
    id: 96,
    name: "scottie watch pebble 2",
    category: "Watches",
    price: 200,
    image: "/products/scottie-watch-pebble-2.JPG",
    description: "Premium collection item."
  },
  {
    id: 97,
    name: "scottie watch pebble",
    category: "Watches",
    price: 200,
    image: "/products/scottie-watch-pebble.JPG",
    description: "Premium collection item."
  },
  {
    id: 98,
    name: "silicon bottle 3",
    category: "Accessories",
    price: 80,
    image: "/products/silicon-bottle-3.JPG",
    description: "Premium collection item."
  },
  {
    id: 99,
    name: "silicon bottle 4",
    category: "Accessories",
    price: 80,
    image: "/products/silicon-bottle-4.JPG",
    description: "Premium collection item."
  },
  {
    id: 100,
    name: "silicon bottle",
    category: "Accessories",
    price: 80,
    image: "/products/silicon-bottle.JPG",
    description: "Premium collection item."
  },
  {
    id: 101,
    name: "silicon bottle1",
    category: "Accessories",
    price: 80,
    image: "/products/silicon-bottle1.JPG",
    description: "Premium collection item."
  },
  {
    id: 102,
    name: "silicon bottle2",
    category: "Accessories",
    price: 80,
    image: "/products/silicon-bottle2.JPG",
    description: "Premium collection item."
  },
  {
    id: 103,
    name: "wallet 2",
    category: "Accessories",
    price: 60,
    image: "/products/wallet-2.JPG",
    description: "Premium collection item."
  },
  {
    id: 104,
    name: "wallet 3",
    category: "Accessories",
    price: 60,
    image: "/products/wallet-3.JPG",
    description: "Premium collection item."
  },
  {
    id: 105,
    name: "wallet purse 1",
    category: "Accessories",
    price: 60,
    image: "/products/wallet-purse-1.JPG",
    description: "Premium collection item."
  },
  {
    id: 106,
    name: "wallet purse",
    category: "Accessories",
    price: 60,
    image: "/products/wallet-purse.JPG",
    description: "Premium collection item."
  },
  {
    id: 107,
    name: "wallet",
    category: "Accessories",
    price: 60,
    image: "/products/wallet.JPG",
    description: "Premium collection item."
  },
  {
    id: 108,
    name: "wallet1",
    category: "Accessories",
    price: 60,
    image: "/products/wallet1.JPG",
    description: "Premium collection item."
  }
];

export default products;
