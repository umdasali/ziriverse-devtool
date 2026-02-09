import type { Metadata } from "next";
import { generateMetadata } from "@/lib/seo";

export const metadata: Metadata = generateMetadata({
  title: "Schema Generator - Create JSON-LD Markup Fast",
  description:
    "Generate JSON-LD structured data and schema markup for your website to enhance search engine results. Free, private, no sign-up required.",
  keywords: [
    "schema generator",
    "JSON-LD generator",
    "structured data",
    "schema markup",
    "rich snippets",
  ],
  canonicalUrl: "https://ziriverse.com/tools/seo/schema-generator",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
