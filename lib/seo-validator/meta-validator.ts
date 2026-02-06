import type { MetaTags, MetaValidation, AdvancedSEOData } from "@/types/seo";

export function validateMetaTags(meta: MetaTags): MetaValidation {
  const warnings: string[] = [];
  const suggestions: string[] = [];
  const errors: string[] = [];
  let score = 100;

  // Title validation (Critical)
  if (!meta.title && !meta.ogTitle) {
    errors.push("No title found - Critical for SEO");
    score -= 15;
  } else {
    const title = meta.ogTitle || meta.title || "";
    if (title.length < 30) {
      suggestions.push(`Title is short (${title.length} chars). Recommended: 30-60 characters`);
      score -= 5;
    } else if (title.length > 60) {
      warnings.push(`Title is too long (${title.length} chars). May be truncated in search results`);
      score -= 8;
    }
  }

  // Description validation (Critical)
  if (!meta.description && !meta.ogDescription) {
    errors.push("No description found - Critical for SEO");
    score -= 15;
  } else {
    const desc = meta.ogDescription || meta.description || "";
    if (desc.length < 50) {
      suggestions.push(`Description is short (${desc.length} chars). Recommended: 50-160 characters`);
      score -= 5;
    } else if (desc.length > 160) {
      warnings.push(`Description is too long (${desc.length} chars). May be truncated in search results`);
      score -= 8;
    }
  }

  // Image validation (Important)
  if (!meta.image && !meta.ogImage && !meta.twitterImage) {
    warnings.push("No image found. Social media posts may not display properly");
    score -= 10;
  }

  // Canonical URL (Important)
  if (!meta.canonical) {
    suggestions.push("No canonical URL specified. Add <link rel=\"canonical\"> to avoid duplicate content issues");
    score -= 5;
  }

  // Robots meta tag
  if (meta.robots && (meta.robots.includes('noindex') || meta.robots.includes('nofollow'))) {
    warnings.push(`Robots directive: ${meta.robots}. This may prevent search engine indexing`);
  }

  // Viewport (Mobile-friendly)
  if (!meta.viewport) {
    warnings.push("No viewport meta tag. Page may not be mobile-friendly");
    score -= 5;
  }

  // Language
  if (!meta.language) {
    suggestions.push("No language specified. Add lang attribute to <html> tag");
    score -= 3;
  }

  // Open Graph validation
  if (meta.ogImage && !meta.ogTitle) {
    suggestions.push("OG image found but no OG title specified");
    score -= 3;
  }

  if (meta.ogTitle && !meta.ogImage) {
    suggestions.push("OG title found but no OG image. Add og:image for better social sharing");
    score -= 5;
  }

  // Twitter Card validation
  if (!meta.twitterCard) {
    suggestions.push('No Twitter Card type specified. Add <meta name="twitter:card" content="summary_large_image">');
    score -= 5;
  } else if (meta.twitterCard === 'summary_large_image' && !meta.twitterImage && !meta.ogImage) {
    warnings.push("Twitter Card type is 'summary_large_image' but no image specified");
    score -= 5;
  }

  // Keywords (deprecated but sometimes useful)
  if (meta.keywords && meta.keywords.split(',').length > 10) {
    suggestions.push("Too many keywords. Focus on 5-10 relevant keywords");
    score -= 2;
  }

  return {
    isValid: errors.length === 0 && warnings.length === 0,
    warnings,
    suggestions,
    errors,
    score: Math.max(0, score),
  };
}

export function validateAdvancedSEO(data: AdvancedSEOData): MetaValidation {
  const warnings: string[] = [];
  const suggestions: string[] = [];
  const errors: string[] = [];

  // Heading structure validation
  if (data.headings.h1.length === 0) {
    errors.push("No H1 heading found. Every page should have exactly one H1");
  } else if (data.headings.h1.length > 1) {
    warnings.push(`Multiple H1 headings found (${data.headings.h1.length}). Use only one H1 per page`);
  }

  // Content validation
  if (data.content.wordCount < 300) {
    warnings.push(`Content is short (${data.content.wordCount} words). Aim for at least 300 words`);
  }

  if (data.content.readabilityScore < 60) {
    suggestions.push(`Readability score is low (${data.content.readabilityScore}/100). Simplify sentence structure`);
  }

  // Image optimization
  if (data.images.totalImages > 0) {
    const altPercentage = (data.images.imagesWithAlt / data.images.totalImages) * 100;
    if (altPercentage < 100) {
      warnings.push(`${data.images.imagesWithoutAlt} images missing alt text (${Math.round(100 - altPercentage)}%)`);
    }
  }

  // Link analysis
  if (data.links.totalLinks === 0) {
    suggestions.push("No links found. Add internal and external links to improve SEO");
  } else if (data.links.internalLinks === 0) {
    suggestions.push("No internal links found. Add links to other pages on your site");
  }

  // Schema markup
  if (!data.schema.detected) {
    suggestions.push("No structured data (Schema.org) found. Add JSON-LD for better search results");
  }

  // Security
  if (!data.security.isHttps) {
    errors.push("Site is not using HTTPS. This is a critical security and SEO issue");
  }

  if (data.security.mixedContent) {
    warnings.push("Mixed content detected. Some resources are loaded over HTTP instead of HTTPS");
  }

  if (data.security.secureHeaders.length < 2) {
    suggestions.push("Few security headers detected. Add X-Frame-Options, CSP, etc.");
  }

  // Performance
  if (data.performance.htmlSize > 200000) {
    warnings.push(`HTML size is large (${Math.round(data.performance.htmlSize / 1024)}KB). Consider minification`);
  }

  if (!data.performance.compressionEnabled) {
    warnings.push("Compression not enabled. Enable gzip or brotli compression");
  }

  const metaValidation = validateMetaTags(data.metaTags);

  return {
    isValid: errors.length === 0 && metaValidation.isValid,
    warnings: [...warnings, ...metaValidation.warnings],
    suggestions: [...suggestions, ...metaValidation.suggestions],
    errors: [...errors, ...metaValidation.errors],
    score: Math.min(100, data.seoScore.overall + metaValidation.score / 2),
  };
}

export function getPlatformTitle(meta: MetaTags, platform: string): string {
  switch (platform) {
    case "twitter":
      return meta.twitterTitle || meta.ogTitle || meta.title || "No title";
    case "facebook":
    case "discord":
    case "reddit":
      return meta.ogTitle || meta.title || "No title";
    default:
      return meta.title || "No title";
  }
}

export function getPlatformDescription(
  meta: MetaTags,
  platform: string
): string {
  switch (platform) {
    case "twitter":
      return (
        meta.twitterDescription ||
        meta.ogDescription ||
        meta.description ||
        "No description"
      );
    case "facebook":
    case "discord":
    case "reddit":
      return meta.ogDescription || meta.description || "No description";
    default:
      return meta.description || "No description";
  }
}

export function getPlatformImage(meta: MetaTags, platform: string): string | undefined {
  switch (platform) {
    case "twitter":
      return meta.twitterImage || meta.ogImage || meta.image;
    case "facebook":
    case "discord":
    case "reddit":
      return meta.ogImage || meta.image;
    default:
      return meta.image;
  }
}
