import type { Metadata } from "next";
import { generateMetadata } from "@/lib/seo";

export const metadata: Metadata = generateMetadata({
  title: "Developer Tools - Essential Utilities for Coders",
  description: "Free developer tools: JSON Formatter, Base64 Encoder, JWT Decoder, HTML/CSS/JS Minifier, Regex Tester, UUID Generator, and API Tester.",
  keywords: ["developer tools", "JSON formatter", "base64 encoder", "JWT decoder", "minifier", "regex tester", "UUID generator", "API tester"],
  canonicalUrl: "https://ziriverse.com/tools/developer",
});

export default function DeveloperToolsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
