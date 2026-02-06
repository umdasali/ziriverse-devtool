import { NextRequest, NextResponse } from "next/server";
import metascraper from "metascraper";
import metascraperDescription from "metascraper-description";
import metascraperImage from "metascraper-image";
import metascraperTitle from "metascraper-title";
import metascraperUrl from "metascraper-url";
import * as cheerio from "cheerio";
import type { AdvancedSEOData } from "@/types/seo";

const scraper = metascraper([
  metascraperDescription(),
  metascraperImage(),
  metascraperTitle(),
  metascraperUrl(),
]);

export async function POST(request: NextRequest) {
  try {
    const { url } = await request.json();

    if (!url) {
      return NextResponse.json({ error: "URL is required" }, { status: 400 });
    }

    // Validate URL
    let parsedUrl: URL;
    try {
      parsedUrl = new URL(url);
    } catch {
      return NextResponse.json({ error: "Invalid URL" }, { status: 400 });
    }

    // Fetch the page with timeout
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000);

    let html: string;
    let response: Response;

    try {
      response = await fetch(parsedUrl.toString(), {
        signal: controller.signal,
        headers: {
          "User-Agent": "Mozilla/5.0 (compatible; SEOAnalyzer/2.0; +http://example.com/bot)",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      html = await response.text();
    } catch (error: any) {
      if (error.name === "AbortError") {
        return NextResponse.json({ error: "Request timeout" }, { status: 408 });
      }
      return NextResponse.json({ error: "Failed to fetch URL" }, { status: 500 });
    } finally {
      clearTimeout(timeout);
    }

    // Parse HTML
    const $ = cheerio.load(html);
    const metadata = await scraper({ html, url: parsedUrl.toString() });

    // Extract Meta Tags
    const metaTags = {
      title: metadata.title || $("title").text() || undefined,
      description: metadata.description || $('meta[name="description"]').attr("content") || undefined,
      url: metadata.url || parsedUrl.toString(),
      image: metadata.image || undefined,
      canonical: $('link[rel="canonical"]').attr("href") || undefined,
      robots: $('meta[name="robots"]').attr("content") || undefined,
      viewport: $('meta[name="viewport"]').attr("content") || undefined,
      language: $('html').attr('lang') || $('meta[http-equiv="content-language"]').attr("content") || undefined,
      author: $('meta[name="author"]').attr("content") || undefined,
      keywords: $('meta[name="keywords"]').attr("content") || undefined,

      // Open Graph
      ogTitle: $('meta[property="og:title"]').attr("content") || undefined,
      ogDescription: $('meta[property="og:description"]').attr("content") || undefined,
      ogImage: $('meta[property="og:image"]').attr("content") || undefined,
      ogUrl: $('meta[property="og:url"]').attr("content") || undefined,
      ogType: $('meta[property="og:type"]').attr("content") || undefined,
      ogSiteName: $('meta[property="og:site_name"]').attr("content") || undefined,
      ogLocale: $('meta[property="og:locale"]').attr("content") || undefined,

      // Twitter Card
      twitterCard: $('meta[name="twitter:card"]').attr("content") || undefined,
      twitterTitle: $('meta[name="twitter:title"]').attr("content") || undefined,
      twitterDescription: $('meta[name="twitter:description"]').attr("content") || undefined,
      twitterImage: $('meta[name="twitter:image"]').attr("content") || undefined,
      twitterSite: $('meta[name="twitter:site"]').attr("content") || undefined,
      twitterCreator: $('meta[name="twitter:creator"]').attr("content") || undefined,
    };

    // Heading Structure Analysis
    const headings = {
      h1: $('h1').map((_, el) => $(el).text().trim()).get(),
      h2: $('h2').map((_, el) => $(el).text().trim()).get(),
      h3: $('h3').map((_, el) => $(el).text().trim()).get(),
      h4: $('h4').map((_, el) => $(el).text().trim()).get(),
      h5: $('h5').map((_, el) => $(el).text().trim()).get(),
      h6: $('h6').map((_, el) => $(el).text().trim()).get(),
    };

    // Link Analysis
    const allLinks = $('a[href]');
    const internalLinks = allLinks.filter((_, el) => {
      const href = $(el).attr('href') || '';
      return href.startsWith('/') || href.startsWith(parsedUrl.origin);
    }).length;
    const externalLinks = allLinks.length - internalLinks;
    const noFollowLinks = $('a[rel*="nofollow"]').length;

    const links = {
      totalLinks: allLinks.length,
      internalLinks,
      externalLinks,
      brokenLinks: 0, // Would need additional requests to check
      noFollowLinks,
    };

    // Image Analysis
    const allImages = $('img');
    const imagesWithAlt = $('img[alt]').filter((_, el) => $(el).attr('alt')?.trim() !== '').length;
    const imageFormats: Record<string, number> = {};

    allImages.each((_, el) => {
      const src = $(el).attr('src') || '';
      const ext = src.split('.').pop()?.toLowerCase() || 'unknown';
      imageFormats[ext] = (imageFormats[ext] || 0) + 1;
    });

    const images = {
      totalImages: allImages.length,
      imagesWithAlt,
      imagesWithoutAlt: allImages.length - imagesWithAlt,
      largeImages: 0, // Would need size analysis
      imageFormats,
    };

    // Content Analysis
    const bodyText = $('body').text().replace(/\s+/g, ' ').trim();
    const words = bodyText.split(/\s+/).filter(w => w.length > 2);
    const paragraphs = $('p').length;

    // Simple keyword density calculation (top 10 words)
    const wordFreq: Record<string, number> = {};
    const stopWords = new Set(['the', 'and', 'for', 'are', 'but', 'not', 'you', 'all', 'can', 'has', 'had', 'was', 'been', 'have', 'will', 'from', 'this', 'that', 'with', 'they', 'your']);

    words.forEach(word => {
      const lower = word.toLowerCase().replace(/[^a-z0-9]/g, '');
      if (lower.length > 3 && !stopWords.has(lower)) {
        wordFreq[lower] = (wordFreq[lower] || 0) + 1;
      }
    });

    const sortedWords = Object.entries(wordFreq)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10);

    const keywordDensity: Record<string, number> = {};
    sortedWords.forEach(([word, count]) => {
      keywordDensity[word] = (count / words.length) * 100;
    });

    // Simple readability score (Flesch Reading Ease approximation)
    const sentences = bodyText.split(/[.!?]+/).filter(s => s.trim().length > 0).length;
    const syllables = words.length * 1.5; // Rough approximation
    const readabilityScore = Math.max(0, Math.min(100,
      206.835 - 1.015 * (words.length / sentences) - 84.6 * (syllables / words.length)
    ));

    const content = {
      wordCount: words.length,
      paragraphCount: paragraphs,
      readabilityScore: Math.round(readabilityScore),
      keywordDensity,
      contentLength: words.length < 300 ? 'short' as const : words.length < 1000 ? 'medium' as const : 'long' as const,
    };

    // Schema Markup Detection
    const schemaScripts = $('script[type="application/ld+json"]');
    const schemaTypes: string[] = [];

    schemaScripts.each((_, el) => {
      try {
        const schema = JSON.parse($(el).html() || '{}');
        if (schema['@type']) {
          schemaTypes.push(schema['@type']);
        } else if (schema['@graph']) {
          schema['@graph'].forEach((item: any) => {
            if (item['@type']) schemaTypes.push(item['@type']);
          });
        }
      } catch (e) {
        // Invalid JSON, skip
      }
    });

    const schema = {
      detected: schemaScripts.length > 0,
      types: schemaTypes,
      count: schemaScripts.length,
      valid: schemaTypes.length > 0,
    };

    // Performance Insights
    const htmlSize = Buffer.byteLength(html, 'utf8');
    const estimatedLoadTime = htmlSize / 100000; // Rough estimate: 100KB/s

    const performance = {
      htmlSize,
      estimatedLoadTime: Math.round(estimatedLoadTime * 10) / 10,
      hasMinifiedResources: html.includes('.min.js') || html.includes('.min.css'),
      compressionEnabled: response.headers.get('content-encoding') === 'gzip' ||
                          response.headers.get('content-encoding') === 'br',
    };

    // Security Check
    const isHttps = parsedUrl.protocol === 'https:';
    const hasHsts = response.headers.get('strict-transport-security') !== null;
    const mixedContent = isHttps && (
      $('img[src^="http:"]').length > 0 ||
      $('script[src^="http:"]').length > 0 ||
      $('link[href^="http:"]').length > 0
    );

    const secureHeaders: string[] = [];
    if (response.headers.get('x-content-type-options')) secureHeaders.push('X-Content-Type-Options');
    if (response.headers.get('x-frame-options')) secureHeaders.push('X-Frame-Options');
    if (response.headers.get('x-xss-protection')) secureHeaders.push('X-XSS-Protection');
    if (response.headers.get('content-security-policy')) secureHeaders.push('Content-Security-Policy');

    const security = {
      isHttps,
      hasHsts,
      mixedContent,
      secureHeaders,
    };

    // Calculate SEO Score
    const seoScore = calculateSEOScore({
      metaTags,
      headings,
      links,
      images,
      content,
      schema,
      performance,
      security,
    });

    const advancedData: AdvancedSEOData = {
      metaTags,
      headings,
      links,
      images,
      content,
      schema,
      performance,
      security,
      seoScore,
    };

    return NextResponse.json({ data: advancedData });
  } catch (error) {
    console.error("SEO analysis error:", error);
    return NextResponse.json(
      { error: "Failed to analyze SEO" },
      { status: 500 }
    );
  }
}

function calculateSEOScore(data: Omit<AdvancedSEOData, 'seoScore'>): {
  overall: number;
  metaTags: number;
  content: number;
  technical: number;
  performance: number;
  social: number;
} {
  // Meta Tags Score (25 points)
  let metaScore = 0;
  if (data.metaTags.title && data.metaTags.title.length >= 30 && data.metaTags.title.length <= 60) metaScore += 5;
  if (data.metaTags.description && data.metaTags.description.length >= 50 && data.metaTags.description.length <= 160) metaScore += 5;
  if (data.metaTags.canonical) metaScore += 3;
  if (data.metaTags.viewport) metaScore += 3;
  if (data.metaTags.robots) metaScore += 2;
  if (data.metaTags.language) metaScore += 2;
  if (data.headings.h1.length === 1) metaScore += 5;

  // Content Score (25 points)
  let contentScore = 0;
  if (data.content.wordCount >= 300) contentScore += 8;
  if (data.content.readabilityScore >= 60) contentScore += 7;
  if (data.content.paragraphCount >= 3) contentScore += 5;
  if (Object.keys(data.content.keywordDensity).length > 0) contentScore += 5;

  // Technical Score (20 points)
  let technicalScore = 0;
  if (data.security.isHttps) technicalScore += 5;
  if (!data.security.mixedContent) technicalScore += 3;
  if (data.security.secureHeaders.length >= 2) technicalScore += 4;
  if (data.schema.detected) technicalScore += 5;
  if (data.headings.h1.length > 0) technicalScore += 3;

  // Performance Score (15 points)
  let performanceScore = 0;
  if (data.performance.htmlSize < 100000) performanceScore += 5;
  if (data.performance.hasMinifiedResources) performanceScore += 5;
  if (data.performance.compressionEnabled) performanceScore += 5;

  // Social Score (15 points)
  let socialScore = 0;
  if (data.metaTags.ogTitle) socialScore += 3;
  if (data.metaTags.ogDescription) socialScore += 3;
  if (data.metaTags.ogImage) socialScore += 4;
  if (data.metaTags.twitterCard) socialScore += 3;
  if (data.metaTags.twitterImage) socialScore += 2;

  const overall = Math.round(metaScore + contentScore + technicalScore + performanceScore + socialScore);

  return {
    overall,
    metaTags: metaScore,
    content: contentScore,
    technical: technicalScore,
    performance: performanceScore,
    social: socialScore,
  };
}
