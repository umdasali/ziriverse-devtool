import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SEO Tools - Ziriverse",
  description: "Free SEO tools: Robots.txt Generator, Sitemap Generator, Schema Generator, Page Speed Analyzer, and SEO Validator.",
  keywords: ["SEO tools", "robots.txt generator", "sitemap generator", "schema generator", "page speed analyzer", "SEO validator"],
};

export default function SEOToolsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
