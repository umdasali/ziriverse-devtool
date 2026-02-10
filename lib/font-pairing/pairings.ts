export interface FontPair {
  id: string;
  name: string;
  heading: {
    name: string;
    family: string;
    weight: string;
    style: string;
  };
  body: {
    name: string;
    family: string;
    weight: string;
    style: string;
  };
  category: "classic" | "modern" | "elegant" | "playful" | "minimal";
  description: string;
  useCase: string;
}

export const fontPairings: FontPair[] = [
  {
    id: "playfair-source",
    name: "Playfair Display & Source Sans Pro",
    heading: {
      name: "Playfair Display",
      family: "'Playfair Display', serif",
      weight: "700",
      style: "normal",
    },
    body: {
      name: "Source Sans Pro",
      family: "'Source Sans Pro', sans-serif",
      weight: "400",
      style: "normal",
    },
    category: "elegant",
    description: "Elegant serif with clean sans-serif for sophisticated designs",
    useCase: "Fashion, luxury brands, editorial",
  },
  {
    id: "montserrat-merriweather",
    name: "Montserrat & Merriweather",
    heading: {
      name: "Montserrat",
      family: "'Montserrat', sans-serif",
      weight: "700",
      style: "normal",
    },
    body: {
      name: "Merriweather",
      family: "'Merriweather', serif",
      weight: "400",
      style: "normal",
    },
    category: "modern",
    description: "Geometric sans-serif with friendly serif for modern, approachable feel",
    useCase: "Tech blogs, modern businesses, portfolios",
  },
  {
    id: "roboto-roboto",
    name: "Roboto & Roboto Slab",
    heading: {
      name: "Roboto Slab",
      family: "'Roboto Slab', serif",
      weight: "700",
      style: "normal",
    },
    body: {
      name: "Roboto",
      family: "'Roboto', sans-serif",
      weight: "400",
      style: "normal",
    },
    category: "modern",
    description: "Harmonious pairing from the same family with different personalities",
    useCase: "Apps, dashboards, tech products",
  },
  {
    id: "oswald-lato",
    name: "Oswald & Lato",
    heading: {
      name: "Oswald",
      family: "'Oswald', sans-serif",
      weight: "600",
      style: "normal",
    },
    body: {
      name: "Lato",
      family: "'Lato', sans-serif",
      weight: "400",
      style: "normal",
    },
    category: "modern",
    description: "Bold condensed headings with warm, friendly body text",
    useCase: "News, magazines, professional sites",
  },
  {
    id: "raleway-opensans",
    name: "Raleway & Open Sans",
    heading: {
      name: "Raleway",
      family: "'Raleway', sans-serif",
      weight: "600",
      style: "normal",
    },
    body: {
      name: "Open Sans",
      family: "'Open Sans', sans-serif",
      weight: "400",
      style: "normal",
    },
    category: "minimal",
    description: "Elegant thin headings with highly legible body text",
    useCase: "Startups, portfolios, minimal designs",
  },
  {
    id: "abril-droid",
    name: "Abril Fatface & Droid Sans",
    heading: {
      name: "Abril Fatface",
      family: "'Abril Fatface', cursive",
      weight: "400",
      style: "normal",
    },
    body: {
      name: "Droid Sans",
      family: "'Droid Sans', sans-serif",
      weight: "400",
      style: "normal",
    },
    category: "playful",
    description: "Bold display font with neutral sans-serif for creative projects",
    useCase: "Creative agencies, art sites, events",
  },
  {
    id: "lora-lato",
    name: "Lora & Lato",
    heading: {
      name: "Lora",
      family: "'Lora', serif",
      weight: "700",
      style: "normal",
    },
    body: {
      name: "Lato",
      family: "'Lato', sans-serif",
      weight: "400",
      style: "normal",
    },
    category: "classic",
    description: "Classic serif with modern sans-serif for timeless appeal",
    useCase: "Blogs, books, traditional businesses",
  },
  {
    id: "poppins-inter",
    name: "Poppins & Inter",
    heading: {
      name: "Poppins",
      family: "'Poppins', sans-serif",
      weight: "600",
      style: "normal",
    },
    body: {
      name: "Inter",
      family: "'Inter', sans-serif",
      weight: "400",
      style: "normal",
    },
    category: "modern",
    description: "Geometric headings with highly optimized screen text",
    useCase: "SaaS, web apps, modern websites",
  },
  {
    id: "cormorant-nunito",
    name: "Cormorant Garamond & Nunito Sans",
    heading: {
      name: "Cormorant Garamond",
      family: "'Cormorant Garamond', serif",
      weight: "600",
      style: "normal",
    },
    body: {
      name: "Nunito Sans",
      family: "'Nunito Sans', sans-serif",
      weight: "400",
      style: "normal",
    },
    category: "elegant",
    description: "Refined serif with rounded sans-serif for sophisticated warmth",
    useCase: "Restaurants, hospitality, lifestyle",
  },
  {
    id: "bebas-opensans",
    name: "Bebas Neue & Open Sans",
    heading: {
      name: "Bebas Neue",
      family: "'Bebas Neue', cursive",
      weight: "400",
      style: "normal",
    },
    body: {
      name: "Open Sans",
      family: "'Open Sans', sans-serif",
      weight: "400",
      style: "normal",
    },
    category: "playful",
    description: "Bold condensed display with versatile body text",
    useCase: "Sports, energy drinks, bold brands",
  },
  {
    id: "crimson-worksans",
    name: "Crimson Text & Work Sans",
    heading: {
      name: "Crimson Text",
      family: "'Crimson Text', serif",
      weight: "600",
      style: "normal",
    },
    body: {
      name: "Work Sans",
      family: "'Work Sans', sans-serif",
      weight: "400",
      style: "normal",
    },
    category: "classic",
    description: "Traditional serif with contemporary sans-serif",
    useCase: "Academic, publishing, professional",
  },
  {
    id: "spectral-rubik",
    name: "Spectral & Rubik",
    heading: {
      name: "Spectral",
      family: "'Spectral', serif",
      weight: "600",
      style: "normal",
    },
    body: {
      name: "Rubik",
      family: "'Rubik', sans-serif",
      weight: "400",
      style: "normal",
    },
    category: "modern",
    description: "Modern serif with rounded sans-serif for friendly professionalism",
    useCase: "Education, consulting, services",
  },
];

export const fontCategories = [
  { id: "all", label: "All Pairings", count: fontPairings.length },
  { id: "modern", label: "Modern", count: fontPairings.filter(p => p.category === "modern").length },
  { id: "elegant", label: "Elegant", count: fontPairings.filter(p => p.category === "elegant").length },
  { id: "classic", label: "Classic", count: fontPairings.filter(p => p.category === "classic").length },
  { id: "playful", label: "Playful", count: fontPairings.filter(p => p.category === "playful").length },
  { id: "minimal", label: "Minimal", count: fontPairings.filter(p => p.category === "minimal").length },
] as const;
