import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Robots.txt Generator - Ziriverse",
  description:
    "Generate robots.txt files for your website to control search engine crawling. Free, private, no sign-up required.",
  keywords: [
    "robots.txt generator",
    "robots.txt",
    "search engine crawling",
    "SEO robots",
    "crawler control",
  ],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
