export const siteConfig = {
  name: "Ziriverse",
  domain: "ziriverse.com",
  url: "https://ziriverse.com",
  description: "The all-in-one developer platform - 15+ free tools for SEO, development, and branding. Privacy-first, no sign-up required.",
  tagline: "Your Complete Developer Platform",

  // SEO
  keywords: [
    "developer tools",
    "SEO tools",
    "branding tools",
    "design system generator",
    "image converter",
    "SEO validator",
    "JSON formatter",
    "base64 encoder",
    "JWT decoder",
    "HTML minifier",
    "regex tester",
    "UUID generator",
    "API tester",
    "robots.txt generator",
    "sitemap generator",
    "schema generator",
    "page speed analyzer",
    "color palette generator",
    "web design tools",
    "brand identity",
    "design tokens",
  ],

  // Open Graph
  ogImage: "/og-image.png",
  twitterCard: "summary_large_image",
  twitterCreator: "@ziriverse",

  // Contact
  email: "ziriverse@gmail.com",

  // Social Links
  social: {
    twitter: "https://x.com/ziriverse",
    instagram: "https://www.instagram.com/ziriverse",
    github: "https://github.com/umdasali",
  },

  // Footer Links
  footerLinks: {
    seoTools: [
      { name: "SEO Validator", href: "/seo-validator" },
      { name: "Robots.txt Generator", href: "/tools/seo/robots-txt-generator" },
      { name: "Sitemap Generator", href: "/tools/seo/sitemap-generator" },
      { name: "Schema Generator", href: "/tools/seo/schema-generator" },
      { name: "Page Speed Analyzer", href: "/tools/seo/page-speed-analyzer" },
    ],
    developerTools: [
      { name: "Dev Tools Hub", href: "/dev-tools" },
      { name: "JSON Formatter", href: "/tools/developer/json-formatter" },
      { name: "Base64 Encode/Decode", href: "/tools/developer/base64-encoder" },
      { name: "JWT Decoder", href: "/tools/developer/jwt-decoder" },
      { name: "HTML/CSS/JS Minifier", href: "/tools/developer/minifier" },
      { name: "UUID Generator", href: "/tools/developer/uuid-generator" },
      { name: "API Tester", href: "/tools/developer/api-tester" },
    ],
    brandingTools: [
      { name: "Design System Generator", href: "/branding" },
      { name: "Image Converter", href: "/image-converter" },
      { name: "Color Palette Generator", href: "/tools/branding/color-palette" },
    ],
    company: [
      { name: "About", href: "/about" },
      { name: "Contact", href: "/contact" },
      { name: "Documentation", href: "/docs" },
    ],
    legal: [
      { name: "Privacy Policy", href: "/privacy" },
      { name: "Terms of Service", href: "/terms" },
    ],
  },
};

export type SiteConfig = typeof siteConfig;
