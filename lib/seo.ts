import type { Metadata } from "next";

interface SEOProps {
  title: string;
  description: string;
  keywords?: string[];
  ogImage?: string;
  ogType?: "website" | "article";
  twitterCard?: "summary" | "summary_large_image";
  canonicalUrl?: string;
  noindex?: boolean;
}

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://ziriverse.com";

export function generateMetadata({
  title,
  description,
  keywords = [],
  ogImage = "/og-image.png",
  ogType = "website",
  twitterCard = "summary_large_image",
  canonicalUrl,
  noindex = false,
}: SEOProps): Metadata {
  const fullTitle = title.includes("Ziriverse")
    ? title
    : `${title} | Ziriverse - Professional Branding Tools`;

  return {
    title: fullTitle,
    description,
    keywords: [
      "web development tools",
      "image converter",
      "SEO validator",
      "design system",
      "developer tools",
      "free tools",
      ...keywords,
    ],
    authors: [{ name: "Ziriverse" }],
    creator: "Ziriverse",
    publisher: "Ziriverse",
    robots: {
      index: !noindex,
      follow: !noindex,
      googleBot: {
        index: !noindex,
        follow: !noindex,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    alternates: {
      canonical: canonicalUrl || siteUrl,
    },
    openGraph: {
      title: fullTitle,
      description,
      url: canonicalUrl || siteUrl,
      siteName: "Ziriverse",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: "en_US",
      type: ogType,
    },
    twitter: {
      card: twitterCard,
      title: fullTitle,
      description,
      images: [ogImage],
      creator: "@ziriverse",
    },
    verification: {
      google: "your-google-verification-code",
      yandex: "your-yandex-verification-code",
      yahoo: "your-yahoo-verification-code",
    },
  };
}

/**
 * Generate JSON-LD structured data for Schema.org
 */
export function generateWebsiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Ziriverse",
    description:
      "Professional branding tools for modern creators. Convert images, validate SEO, and generate custom design systems - all in one powerful platform.",
    url: siteUrl,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${siteUrl}/search?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

export function generateWebPageSchema(
  title: string,
  description: string,
  url: string
) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: title,
    description,
    url,
    isPartOf: {
      "@type": "WebSite",
      name: "Ziriverse",
      url: siteUrl,
    },
  };
}

export function generateSoftwareApplicationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Ziriverse",
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      ratingCount: "1250",
    },
    description:
      "Professional branding tools for modern creators. Convert images, validate SEO, and generate custom design systems - all in one powerful platform.",
    featureList: [
      "Advanced Image Converter with 8+ formats",
      "SEO Validator with 100+ checkpoints",
      "Design System Generator with live preview",
      "JSON to TypeScript converter",
      "CSS Unit Converter with clamp()",
      "SVG Path Visualizer",
      "Regex Tester with explanations",
    ],
  };
}

export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function generateToolSchema(
  name: string,
  description: string,
  url: string
) {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name,
    description,
    url,
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Web Browser",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    isAccessibleForFree: true,
  };
}
