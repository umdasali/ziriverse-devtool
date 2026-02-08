import { NextRequest, NextResponse } from "next/server";
import { analyzeHtml } from "@/lib/seo-tools/page-speed-analyzer";

export async function POST(request: NextRequest) {
  try {
    const { url } = await request.json();

    if (!url) {
      return NextResponse.json({ error: "URL is required" }, { status: 400 });
    }

    try {
      new URL(url);
    } catch {
      return NextResponse.json({ error: "Invalid URL format" }, { status: 400 });
    }

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000);

    const startTime = Date.now();

    const response = await fetch(url, {
      signal: controller.signal,
      headers: {
        "User-Agent":
          "Mozilla/5.0 (compatible; ZiriverseBot/1.0; +https://ziriverse.com)",
      },
    });

    clearTimeout(timeout);
    const loadTime = Date.now() - startTime;

    if (!response.ok) {
      return NextResponse.json(
        { error: `Failed to fetch URL: HTTP ${response.status}` },
        { status: 400 }
      );
    }

    const html = await response.text();
    const result = analyzeHtml(html, url, loadTime);

    return NextResponse.json({ data: result });
  } catch (error: unknown) {
    if (error instanceof Error && error.name === "AbortError") {
      return NextResponse.json(
        { error: "Request timed out after 15 seconds" },
        { status: 408 }
      );
    }

    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to analyze page" },
      { status: 500 }
    );
  }
}
