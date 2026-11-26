(function () {
  "use strict";

  window.RABAR_CATEGORIES = [
    {
      id: "t-shirts",
      name: "T-Shirts",
      subtitle: "Heavyweight Jersey",
      image: "./assets/categories/tshirts.jpg"
    },
    {
      id: "polo-shirts",
      name: "Polo Shirts",
      subtitle: "Refined Piqué & Knit",
      image: "./assets/categories/polos.jpg"
    },
    {
      id: "shirts",
      name: "Shirts",
      subtitle: "Tailored Poplin & Linen",
      image: "./assets/categories/shirts.jpg"
    },
    {
      id: "pants",
      name: "Pants",
      subtitle: "Architectural Trousers & Denim",
      image: "./assets/categories/pants.jpg"
    },
    {
      id: "sneakers",
      name: "Sneakers",
      subtitle: "Minimalist Court Leather",
      image: "./assets/categories/sneakers.jpg"
    },
    {
      id: "sportswear",
      name: "Sportswear",
      subtitle: "Technical Movement",
      image: "./assets/categories/sportswear.jpg"
    },
    {
      id: "accessories",
      name: "Accessories",
      subtitle: "Leather & Everyday Objects",
      image: "./assets/categories/accessories.jpg"
    }
  ];

  window.RABAR_PRODUCTS = [
    {
      id: "rbr-001",
      name: "Architectural Heavyweight Tee",
      category: "T-Shirts",
      productType: "Crewneck T-Shirt",
      price: 68,
      description:
        "Cut in 280gsm combed organic cotton jersey with a structured rib collar and dropped shoulder line. Designed to hold a crisp, architectural drape from morning to evening.",
      details: [
        "100% organic long-staple cotton, 280gsm double-knit jersey",
        "Structured 2.5cm ribbed neckline that resists stretching",
        "Relaxed boxy fit with clean tonal blind-stitch hem"
      ],
      images: [
        "./assets/products/rbr-001-1.jpg",
        "./assets/products/rbr-001-2.jpg"
      ],
      sizes: ["S", "M", "L", "XL"],
      colors: [
        { name: "Black", hex: "#171717" },
        { name: "White", hex: "#FFFFFF" },
        { name: "Beige", hex: "#E8E1D8" }
      ],
      inStock: true,
      stockStatus: "In Stock — Ready to Ship",
      isNewArrival: true,
      isBestSeller: true,
      createdOrder: 12,
      bestSellerRank: 1
    },
    {
      id: "rbr-002",
      name: "Mercerized Supima Essential Tee",
      category: "T-Shirts",
      productType: "Tailored T-Shirt",
      price: 62,
      description:
        "Spun from ultra-fine mercerized Supima cotton for a cool, matte luster and effortless layering under suiting or overshirts.",
      details: [
        "100% mercerized Supima cotton, 210gsm smooth interlock",
        "Tailored shoulder seam with clean set-in sleeve",
        "Pre-shrunk enzyme wash for lasting shape retention"
      ],
      images: [
        "./assets/products/rbr-002-1.jpg",
        "./assets/products/rbr-002-2.jpg"
      ],
      sizes: ["S", "M", "L", "XL"],
      colors: [
        { name: "Off-White", hex: "#F7F5F1" },
        { name: "Stone", hex: "#D2C9BC" },
        { name: "Charcoal", hex: "#3A3A3A" }
      ],
      inStock: true,
      stockStatus: "In Stock — Ready to Ship",
      isNewArrival: true,
      isBestSeller: false,
      createdOrder: 11,
      bestSellerRank: 9
    },
    {
      id: "rbr-003",
      name: "Fine-Gauge Merino Knit Polo",
      category: "Polo Shirts",
      productType: "Knit Polo Shirt",
      price: 115,
      description:
        "A refined open-collar knit polo crafted from breathable extra-fine merino wool and silk blend, offering tailored polish without rigidity.",
      details: [
        "85% extra-fine Australian merino wool, 15% mulberry silk",
        "Buttonless Johnny collar with clean tubular placket",
        "Ribbed cuffs and hem for a structured waist finish"
      ],
      images: [
        "./assets/products/rbr-003-1.jpg",
        "./assets/products/rbr-003-2.jpg"
      ],
      sizes: ["S", "M", "L", "XL"],
      colors: [
        { name: "Beige", hex: "#E8E1D8" },
        { name: "Black", hex: "#171717" },
        { name: "Taupe", hex: "#8B8175" }
      ],
      inStock: true,
      stockStatus: "In Stock — Ready to Ship",
      isNewArrival: true,
      isBestSeller: true,
      createdOrder: 10,
      bestSellerRank: 2
    },
    {
      id: "rbr-004",
      name: "Tailored Honeycomb Piqué Polo",
      category: "Polo Shirts",
      productType: "Piqué Polo Shirt",
      price: 128,
      description:
        "Elevated court heritage rendered in breathable micro-honeycomb cotton piqué with genuine mother-of-pearl buttons and a sharp spread collar.",
      details: [
        "100% Italian combed cotton honeycomb piqué, 240gsm",
        "Three-button concealed placket with smoked mother-of-pearl buttons",
        "Split side vents reinforced with tonal herringbone tape"
      ],
      images: [
        "./assets/products/rbr-004-1.jpg",
        "./assets/products/rbr-004-2.jpg"
      ],
      sizes: ["S", "M", "L", "XL"],
      colors: [
        { name: "White", hex: "#FFFFFF" },
        { name: "Charcoal", hex: "#3A3A3A" },
        { name: "Stone", hex: "#D2C9BC" }
      ],
      inStock: true,
      stockStatus: "In Stock — Ready to Ship",
      isNewArrival: false,
      isBestSeller: true,
      createdOrder: 5,
      bestSellerRank: 4
    },
    {
      id: "rbr-005",
      name: "Crisp Compact Poplin Shirt",
      category: "Shirts",
      productType: "Button-Down Shirt",
      price: 145,
      description:
        "Precision-tailored in high-density compact cotton poplin with a clean French front and subtle curved hem, built to transition from studio to dinner.",
      details: [
        "100% two-fold compact Giza cotton poplin",
        "Minimalist concealed button placket with French seams",
        "Single-button mitered cuffs and subtle back yoke pleat"
      ],
      images: [
        "./assets/products/rbr-005-1.jpg",
        "./assets/products/rbr-005-2.jpg"
      ],
      sizes: ["S", "M", "L", "XL"],
      colors: [
        { name: "White", hex: "#FFFFFF" },
        { name: "Off-White", hex: "#F7F5F1" },
        { name: "Black", hex: "#171717" }
      ],
      inStock: true,
      stockStatus: "In Stock — Ready to Ship",
      isNewArrival: true,
      isBestSeller: true,
      createdOrder: 9,
      bestSellerRank: 3
    },
    {
      id: "rbr-006",
      name: "Washed Belgian Linen Overshirt",
      category: "Shirts",
      productType: "Linen Shirt",
      price: 165,
      description:
        "Relaxed yet composed in garment-washed Belgian flax linen, featuring a boxy architectural silhouette, twin welt pockets, and horn-toned buttons.",
      details: [
        "100% sustainably grown Belgian linen, 235gsm",
        "Softly structured camp-inspired collar and straight hem",
        "Twin internal chest compartments with clean exterior stitching"
      ],
      images: [
        "./assets/products/rbr-006-1.jpg",
        "./assets/products/rbr-006-2.jpg"
      ],
      sizes: ["S", "M", "L", "XL"],
      colors: [
        { name: "Stone", hex: "#D2C9BC" },
        { name: "Taupe", hex: "#8B8175" },
        { name: "Beige", hex: "#E8E1D8" }
      ],
      inStock: true,
      stockStatus: "In Stock — Ready to Ship",
      isNewArrival: true,
      isBestSeller: false,
      createdOrder: 8,
      bestSellerRank: 10
    },
    {
      id: "rbr-007",
      name: "Double-Pleat Architectural Trouser",
      category: "Pants",
      productType: "Tailored Trousers",
      price: 185,
      description:
        "Full-length tailored trousers featuring deep forward pleats, a clean extended waistband tab, and a fluid tapered leg in crease-resistant wool twill.",
      details: [
        "96% virgin wool, 4% elastane high-twist gabardine",
        "Extended hook-and-bar waist closure with side adjusters",
        "Half-lined to the knee in breathable cupro"
      ],
      images: [
        "./assets/products/rbr-007-1.jpg",
        "./assets/products/rbr-007-2.jpg"
      ],
      sizes: ["30", "32", "34", "36"],
      colors: [
        { name: "Charcoal", hex: "#3A3A3A" },
        { name: "Black", hex: "#171717" },
        { name: "Taupe", hex: "#8B8175" }
      ],
      inStock: true,
      stockStatus: "In Stock — Ready to Ship",
      isNewArrival: false,
      isBestSeller: true,
      createdOrder: 4,
      bestSellerRank: 5
    },
    {
      id: "rbr-008",
      name: "Selvedge Straight Studio Denim",
      category: "Jeans",
      productType: "Selvedge Jeans",
      price: 195,
      description:
        "Cut from 13.5oz Japanese shuttle-loomed selvedge denim in a tonal mineral rinse, finished with matte black hardware and a clean straight leg.",
      details: [
        "100% cotton 13.5oz Japanese rope-dyed selvedge denim",
        "Matte obsidian hardware with minimalist tonal back patch",
        "Mid-rise straight fit tailored for clean stacking over sneakers"
      ],
      images: [
        "./assets/products/rbr-008-1.jpg",
        "./assets/products/rbr-008-2.jpg"
      ],
      sizes: ["30", "32", "34", "36"],
      colors: [
        { name: "Black", hex: "#171717" },
        { name: "Off-White", hex: "#F7F5F1" },
        { name: "Charcoal", hex: "#3A3A3A" }
      ],
      inStock: true,
      stockStatus: "In Stock — Ready to Ship",
      isNewArrival: true,
      isBestSeller: false,
      createdOrder: 7,
      bestSellerRank: 11
    },
    {
      id: "rbr-009",
      name: "Monolith Calfskin Court Sneaker",
      category: "Sneakers",
      productType: "Low-Top Leather Sneaker",
      price: 245,
      description:
        "Hand-lasted in full-grain Italian calfskin with a tonal stitched cupsole, padded Achilles collar, and stripped-back quarter panels for pure architectural form.",
      details: [
        "Full-grain Nappa calfskin upper with smooth calf lining",
        "Sidewall-stitched Margom-style natural rubber cupsole",
        "Removable vegetable-tanned leather footbed and waxed cotton laces"
      ],
      images: [
        "./assets/products/rbr-009-1.jpg",
        "./assets/products/rbr-009-2.jpg"
      ],
      sizes: ["40", "41", "42", "43", "44"],
      colors: [
        { name: "White", hex: "#FFFFFF" },
        { name: "Off-White", hex: "#F7F5F1" },
        { name: "Black", hex: "#171717" }
      ],
      inStock: true,
      stockStatus: "In Stock — Ready to Ship",
      isNewArrival: true,
      isBestSeller: true,
      createdOrder: 6,
      bestSellerRank: 6
    },
    {
      id: "rbr-010",
      name: "Suede-Panel Low Runner",
      category: "Sneakers",
      productType: "Minimalist Runner",
      price: 225,
      description:
        "A low-profile architectural runner combining water-repellent Italian nubuck suede with breathable tonal technical mesh on a sculpted EVA-rubber sole.",
      details: [
        "Italian split-suede overlays with matte ripstop mesh base",
        "Dual-density cushioned midsole with high-traction gum tread",
        "Tonal heel stabilizer and minimalist embossed tongue"
      ],
      images: [
        "./assets/products/rbr-010-1.jpg",
        "./assets/products/rbr-010-2.jpg"
      ],
      sizes: ["40", "41", "42", "43", "44"],
      colors: [
        { name: "Stone", hex: "#D2C9BC" },
        { name: "Beige", hex: "#E8E1D8" },
        { name: "Taupe", hex: "#8B8175" }
      ],
      inStock: true,
      stockStatus: "In Stock — Ready to Ship",
      isNewArrival: false,
      isBestSeller: true,
      createdOrder: 3,
      bestSellerRank: 7
    },
    {
      id: "rbr-011",
      name: "Technical Scuba Pullover Hoodie",
      category: "Sportswear",
      productType: "Technical Pullover",
      price: 135,
      description:
        "Engineered in bonded double-knit stretch scuba fabric for wind resistance and effortless movement, detailed with a structured three-panel hood and minimalist kangaroo pocket.",
      details: [
        "78% recycled polyamide, 22% elastane bonded technical knit",
        "Structured three-panel scuba hood with tonal matte finish",
        "Articulated raglan sleeves and clean ribbed cuff trim"
      ],
      images: [
        "./assets/products/rbr-011-1.jpg",
        "./assets/products/rbr-011-2.jpg"
      ],
      sizes: ["S", "M", "L", "XL"],
      colors: [
        { name: "Black", hex: "#171717" },
        { name: "Charcoal", hex: "#3A3A3A" },
        { name: "Stone", hex: "#D2C9BC" }
      ],
      inStock: false,
      stockStatus: "Sold Out — Restocking Soon",
      isNewArrival: true,
      isBestSeller: false,
      createdOrder: 2,
      bestSellerRank: 12
    },
    {
      id: "rbr-012",
      name: "Full-Grain Minimalist Cardholder",
      category: "Accessories",
      productType: "Leather Goods",
      price: 55,
      description:
        "Slim architectural cardholder crafted from vegetable-tanned box calfskin with hand-painted edges, four precision card slots, and a central note sleeve.",
      details: [
        "100% Italian vegetable-tanned box calfskin leather",
        "Four angled card slots plus central folded-bill compartment",
        "Hand-burnished tonal edges and ultra-slim 4mm profile"
      ],
      images: [
        "./assets/products/rbr-012-1.jpg",
        "./assets/products/rbr-012-2.jpg"
      ],
      sizes: ["One Size"],
      colors: [
        { name: "Black", hex: "#171717" },
        { name: "Taupe", hex: "#8B8175" },
        { name: "Beige", hex: "#E8E1D8" }
      ],
      inStock: true,
      stockStatus: "In Stock — Ready to Ship",
      isNewArrival: false,
      isBestSeller: true,
      createdOrder: 1,
      bestSellerRank: 8
    }
  ];
})();
