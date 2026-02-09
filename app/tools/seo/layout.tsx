import type { Metadata } from "next";
import { generateMetadata } from "@/lib/seo";

export const metadata: Metadata = generateMetadata({
  title: "SEO Tools - Optimize Your Search Rankings Fast",
  description: "Free SEO tools: Robots.txt Generator, Sitemap Generator, Schema Generator, Page Speed Analyzer, and SEO Validator.",
  keywords: ["SEO tools", "robots.txt generator", "sitemap generator", "schema generator", "page speed analyzer", "SEO validator"],
  canonicalUrl: "https://ziriverse.com/tools/seo",
});

export default function SEOToolsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
