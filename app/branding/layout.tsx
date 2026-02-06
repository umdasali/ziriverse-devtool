import { Metadata } from "next";
import { StructuredData } from "@/components/seo/structured-data";
import {
  generateMetadata as generateSEOMetadata,
  generateToolSchema,
  generateBreadcrumbSchema,
  generateWebPageSchema,
} from "@/lib/seo";

export const metadata: Metadata = generateSEOMetadata({
  title: "Design System Generator - 100+ Properties, 5 Export Formats",
  description:
    "Create complete design systems with 100+ customizable properties including typography, colors, spacing, shadows, and animations. Export to CSS, SCSS, JSON, Tailwind, or JavaScript. Live preview with dark mode support and version control.",
  keywords: [
    "design system generator",
    "design tokens",
    "CSS variables generator",
    "Tailwind config generator",
    "design system tool",
    "theme generator",
    "style guide generator",
    "brand colors",
    "typography system",
  ],
  canonicalUrl: "https://brandingtools.dev/branding",
});

export default function BrandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <StructuredData
        data={[
          generateToolSchema(
            "Design System Generator",
            "Generate complete design systems with 100+ properties. Export to CSS, SCSS, JSON, Tailwind, or JavaScript with live preview and dark mode.",
            "https://brandingtools.dev/branding"
          ),
          generateBreadcrumbSchema([
            { name: "Home", url: "https://brandingtools.dev" },
            { name: "Design System", url: "https://brandingtools.dev/branding" },
          ]),
          generateWebPageSchema(
            "Design System Generator",
            "Professional design system generator with 100+ properties and 5 export formats",
            "https://brandingtools.dev/branding"
          ),
        ]}
      />
      {children}
    </>
  );
}
