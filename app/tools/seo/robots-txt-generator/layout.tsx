import type { Metadata } from "next";
import { generateMetadata } from "@/lib/seo";

export const metadata: Metadata = generateMetadata({
  title: "Robots.txt Generator - Control Search Crawlers",
  description:
    "Generate robots.txt files for your website to control search engine crawling. Free, private, no sign-up required.",
  keywords: [
    "robots.txt generator",
    "robots.txt",
    "search engine crawling",
    "SEO robots",
    "crawler control",
  ],
  canonicalUrl: "https://ziriverse.com/tools/seo/robots-txt-generator",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
