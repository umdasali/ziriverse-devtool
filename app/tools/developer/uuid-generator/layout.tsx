import type { Metadata } from "next";
import { generateMetadata } from "@/lib/seo";

export const metadata: Metadata = generateMetadata({
  title: "UUID Generator - Create Unique IDs Instantly",
  description: "Generate UUID v4 identifiers with bulk generation, format options, and validation. Free, private, no sign-up.",
  keywords: ["UUID generator", "UUID v4", "generate UUID", "random UUID", "GUID generator"],
  canonicalUrl: "https://ziriverse.com/tools/developer/uuid-generator",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
