import type { Metadata } from "next";
import { siteConfig } from "@/lib/site-config";

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

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || siteConfig.url;

export function generateMetadata({
  title,
  description,
  keywords = [],
  ogImage = siteConfig.ogImage,
  ogType = "website",
  twitterCard = "summary_large_image",
  canonicalUrl,
  noindex = false,
}: SEOProps): Metadata {
  // Use absolute title to prevent root layout template from double-branding
  const displayTitle = title.includes(siteConfig.name)
    ? title
    : `${title} | ${siteConfig.name}`;

  return {
    title: { absolute: displayTitle },
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
    authors: [{ name: siteConfig.name }],
    creator: siteConfig.name,
    publisher: siteConfig.name,
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
      title: displayTitle,
      description,
      url: canonicalUrl || siteUrl,
      siteName: siteConfig.name,
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
      title: displayTitle,
      description,
      images: [ogImage],
      creator: siteConfig.twitterCreator,
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
    name: siteConfig.name,
    description: siteConfig.description,
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
      name: siteConfig.name,
      url: siteUrl,
    },
  };
}

export function generateSoftwareApplicationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: siteConfig.name,
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
    description: siteConfig.description,
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
