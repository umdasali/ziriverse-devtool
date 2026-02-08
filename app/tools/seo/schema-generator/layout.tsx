import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Schema Generator - Ziriverse",
  description:
    "Generate JSON-LD structured data and schema markup for your website to enhance search engine results. Free, private, no sign-up required.",
  keywords: [
    "schema generator",
    "JSON-LD generator",
    "structured data",
    "schema markup",
    "rich snippets",
  ],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
