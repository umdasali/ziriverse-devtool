import { Metadata } from "next";
import { StructuredData } from "@/components/seo/structured-data";
import {
  generateMetadata as generateSEOMetadata,
  generateToolSchema,
  generateBreadcrumbSchema,
  generateWebPageSchema,
} from "@/lib/seo";

export const metadata: Metadata = generateSEOMetadata({
  title: "Developer Utilities - JSON to TypeScript, CSS, SVG & Regex Tools",
  description:
    "Essential developer utilities: JSON to TypeScript converter, CSS unit converter (px to rem, clamp), SVG path visualizer, and regex tester with explanations. Real-time processing, syntax highlighting, copy/download features. Free developer tools.",
  keywords: [
    "JSON to TypeScript",
    "CSS unit converter",
    "px to rem converter",
    "CSS clamp generator",
    "SVG path visualizer",
    "regex tester",
    "developer tools",
    "code generator",
    "free dev tools",
  ],
  ogImage: "/og-image-dev-tools.svg",
  canonicalUrl: "https://ziriverse.com/dev-tools",
});

export default function DevToolsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <StructuredData
        data={[
          generateToolSchema(
            "Developer Utilities",
            "4 essential developer tools: JSON to TypeScript, CSS unit converter, SVG path visualizer, and regex tester with real-time processing.",
            "https://ziriverse.com/dev-tools"
          ),
          generateBreadcrumbSchema([
            { name: "Home", url: "https://ziriverse.com" },
            { name: "Developer Tools", url: "https://ziriverse.com/dev-tools" },
          ]),
          generateWebPageSchema(
            "Developer Utilities",
            "Essential developer tools for modern web development",
            "https://ziriverse.com/dev-tools"
          ),
        ]}
      />
      {children}
    </>
  );
}
