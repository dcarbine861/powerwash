// src/data/services.js
// Single source of truth for all service data.
// Used by both the Home page cards and the Service Detail pages.

const SERVICES = [
  {
    slug: "house-exterior",           // used in the URL: /services/house-exterior
    icon: "🏠",
    title: "House Exterior",
    tagline: "Restore your home's original beauty",
    description:
      "Our full exterior house wash removes years of built-up mold, mildew, algae, dirt, and grime from siding, fascia, soffits, and gutters. We use a low-pressure soft-wash technique that's safe for all siding types — vinyl, wood, brick, and stucco.",
    price: "From $199",
    duration: "2–4 hours",
    includes: [
      "Full siding wash (vinyl, wood, brick, stucco)",
      "Gutters and downspouts exterior cleaned",
      "Fascia and soffits washed",
      "Mold, mildew, and algae treatment",
      "Rinse and spot check",
    ],
    faqs: [
      {
        q: "Is it safe for my plants and landscaping?",
        a: "Yes — we pre-wet all surrounding plants and use biodegradable cleaning solutions that are safe for landscaping.",
      },
      {
        q: "How long does it take to dry?",
        a: "Most surfaces are dry within 1–2 hours on a sunny day. We recommend waiting 24 hours before painting or staining.",
      },
    ],
  },
  {
    slug: "driveway",
    icon: "🚗",
    title: "Driveway",
    tagline: "Eliminate oil stains and embedded grime",
    description:
      "High-pressure hot water cleaning that blasts away oil stains, tire marks, rust, and years of embedded dirt from concrete or asphalt. We pre-treat stubborn stains before the main wash for the best results.",
    price: "From $99",
    duration: "1–2 hours",
    includes: [
      "Pre-treatment of oil and rust stains",
      "High-pressure hot water wash",
      "Edging along borders and curbs",
      "Post-rinse inspection",
    ],
    faqs: [
      {
        q: "Will it remove all oil stains?",
        a: "Most fresh and moderate stains come out completely. Very old, deep-set stains may lighten significantly but not fully disappear.",
      },
      {
        q: "Can you clean asphalt driveways?",
        a: "Yes, but we use lower pressure on asphalt to avoid surface damage. Results are still excellent.",
      },
    ],
  },
  {
    slug: "deck-patio",
    icon: "🪵",
    title: "Deck / Patio",
    tagline: "Prep your outdoor space for sealing or staining",
    description:
      "Gentle yet thorough cleaning for wood, composite, and stone surfaces. We remove green algae, black mold, dirt, and weathering stains — perfect before applying a new sealant or stain, or just to enjoy a clean outdoor space again.",
    price: "From $129",
    duration: "1–3 hours",
    includes: [
      "Soft-wash or pressure wash (based on material)",
      "Algae and mold treatment",
      "Between-board cleaning for wood decks",
      "Furniture moved and replaced",
      "Post-clean inspection",
    ],
    faqs: [
      {
        q: "Will it damage my composite decking?",
        a: "No — we adjust pressure based on material. Composite decking gets a low-pressure soft wash to preserve the surface.",
      },
      {
        q: "Should I seal my deck after cleaning?",
        a: "We recommend waiting 48–72 hours after cleaning before applying any sealant or stain to ensure the wood is fully dry.",
      },
    ],
  },
  {
    slug: "full-property",
    icon: "⭐",
    title: "Full Property Package",
    tagline: "Everything in one visit — our best value",
    description:
      "Get the house exterior, driveway, deck, and all walkways cleaned in a single visit by our full crew. This is our most popular option for homeowners who want a complete refresh before selling, hosting an event, or just taking pride in their property.",
    price: "From $349",
    duration: "4–7 hours",
    includes: [
      "Full house exterior wash",
      "Driveway and garage apron",
      "Deck or patio",
      "All walkways and paths",
      "Front porch and steps",
      "Priority scheduling",
    ],
    faqs: [
      {
        q: "Do I need to be home?",
        a: "Not necessarily. As long as we have access to a water spigot and the areas to be cleaned, you don't need to be present.",
      },
      {
        q: "Is this price negotiable for large properties?",
        a: "We offer custom quotes for larger properties. Just mention your square footage in the booking notes and we'll adjust.",
      },
    ],
  },
];

export default SERVICES;
