import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sitemap Generator - Ziriverse",
  description:
    "Generate XML sitemaps for your website to improve search engine indexing. Free, private, no sign-up required.",
  keywords: [
    "sitemap generator",
    "XML sitemap",
    "sitemap.xml",
    "SEO sitemap",
    "search engine indexing",
  ],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
