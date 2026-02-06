export const siteConfig = {
  name: "Ziriverse",
  domain: "ziriverse.com",
  url: "https://ziriverse.com",
  description: "Professional branding tools for modern creators. Convert images, validate SEO, and generate custom design systems - all in one powerful platform.",
  tagline: "Your Complete Branding Toolkit",

  // SEO
  keywords: [
    "branding tools",
    "design system generator",
    "image converter",
    "SEO validator",
    "meta tag validator",
    "web design tools",
    "brand identity",
    "design tokens",
    "color palette generator",
    "typography tools"
  ],

  // Open Graph
  ogImage: "/og-image.png",
  twitterCard: "summary_large_image",
  twitterCreator: "@ziriverse",

  // Contact
  email: "hello@ziriverse.com",

  // Social Links
  social: {
    twitter: "https://twitter.com/ziriverse",
    github: "https://github.com/ziriverse",
    linkedin: "https://linkedin.com/company/ziriverse",
  },

  // Navigation
  navigation: [
    { name: "Home", href: "/" },
    { name: "Image Converter", href: "/image-converter" },
    { name: "SEO Validator", href: "/seo-validator" },
    { name: "Design System", href: "/branding" },
    { name: "About", href: "/about" },
  ],

  // Footer Links
  footerLinks: {
    product: [
      { name: "Image Converter", href: "/image-converter" },
      { name: "SEO Validator", href: "/seo-validator" },
      { name: "Design System", href: "/branding" },
    ],
    company: [
      { name: "About", href: "/about" },
      { name: "Contact", href: "/contact" },
    ],
    legal: [
      { name: "Privacy Policy", href: "/privacy" },
      { name: "Terms of Service", href: "/terms" },
    ],
  },

  // Features
  features: [
    {
      id: "image-converter",
      title: "Image Converter",
      description: "Convert images between 8 formats with advanced controls for resize, transform, and filters.",
      icon: "ImageIcon",
      href: "/image-converter",
      color: "from-blue-500 to-cyan-500",
    },
    {
      id: "seo-validator",
      title: "SEO Validator",
      description: "Advanced SEO analysis with 100+ data points, scoring system, and platform previews.",
      icon: "SearchCheck",
      href: "/seo-validator",
      color: "from-purple-500 to-pink-500",
    },
    {
      id: "design-system",
      title: "Design System Generator",
      description: "Create comprehensive design systems with 100+ properties and export in 5 formats.",
      icon: "Sparkles",
      href: "/branding",
      color: "from-orange-500 to-red-500",
    },
  ],
};

export type SiteConfig = typeof siteConfig;
