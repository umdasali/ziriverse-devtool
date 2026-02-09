import type { Metadata } from "next";
import { generateMetadata } from "@/lib/seo";

export const metadata: Metadata = generateMetadata({
  title: "Sitemap Generator - Create XML Sitemaps Fast",
  description:
    "Generate XML sitemaps for your website to improve search engine indexing. Free, private, no sign-up required.",
  keywords: [
    "sitemap generator",
    "XML sitemap",
    "sitemap.xml",
    "SEO sitemap",
    "search engine indexing",
  ],
  canonicalUrl: "https://ziriverse.com/tools/seo/sitemap-generator",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
