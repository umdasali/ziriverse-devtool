import { NextRequest, NextResponse } from "next/server";
import metascraper from "metascraper";
import metascraperDescription from "metascraper-description";
import metascraperImage from "metascraper-image";
import metascraperTitle from "metascraper-title";
import metascraperUrl from "metascraper-url";
import * as cheerio from "cheerio";

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
    const timeout = setTimeout(() => controller.abort(), 10000); // 10 second timeout

    let html: string;
    try {
      const response = await fetch(parsedUrl.toString(), {
        signal: controller.signal,
        headers: {
          "User-Agent":
            "Mozilla/5.0 (compatible; MetaTagBot/1.0; +http://example.com/bot)",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      html = await response.text();
    } catch (error: any) {
      if (error.name === "AbortError") {
        return NextResponse.json(
          { error: "Request timeout" },
          { status: 408 }
        );
      }
      return NextResponse.json(
        { error: "Failed to fetch URL" },
        { status: 500 }
      );
    } finally {
      clearTimeout(timeout);
    }

    // Parse HTML with cheerio
    const $ = cheerio.load(html);

    // Use metascraper for basic tags
    const metadata = await scraper({ html, url: parsedUrl.toString() });

    // Extract additional meta tags manually
    const metaTags = {
      title: metadata.title || $("title").text() || undefined,
      description:
        metadata.description ||
        $('meta[name="description"]').attr("content") ||
        undefined,
      url: metadata.url || parsedUrl.toString(),
      image: metadata.image || undefined,

      // Open Graph
      ogTitle: $('meta[property="og:title"]').attr("content") || undefined,
      ogDescription:
        $('meta[property="og:description"]').attr("content") || undefined,
      ogImage: $('meta[property="og:image"]').attr("content") || undefined,
      ogUrl: $('meta[property="og:url"]').attr("content") || undefined,
      ogType: $('meta[property="og:type"]').attr("content") || undefined,
      ogSiteName:
        $('meta[property="og:site_name"]').attr("content") || undefined,

      // Twitter Card
      twitterCard:
        $('meta[name="twitter:card"]').attr("content") || undefined,
      twitterTitle:
        $('meta[name="twitter:title"]').attr("content") || undefined,
      twitterDescription:
        $('meta[name="twitter:description"]').attr("content") || undefined,
      twitterImage:
        $('meta[name="twitter:image"]').attr("content") || undefined,
      twitterSite:
        $('meta[name="twitter:site"]').attr("content") || undefined,
      twitterCreator:
        $('meta[name="twitter:creator"]').attr("content") || undefined,
    };

    return NextResponse.json({ metaTags });
  } catch (error) {
    console.error("Meta fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch meta tags" },
      { status: 500 }
    );
  }
}
