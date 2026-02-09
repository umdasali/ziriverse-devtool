import type { Metadata } from "next";
import { generateMetadata } from "@/lib/seo";

export const metadata: Metadata = generateMetadata({
  title: "Color Palette Generator - Create Brand Colors",
  description:
    "Generate harmonious color palettes using color theory. Choose from complementary, analogous, triadic, tetradic, split-complementary, and monochromatic harmonies with WCAG contrast checking and export options.",
  keywords: [
    "color palette generator",
    "color harmony",
    "complementary colors",
    "analogous colors",
    "triadic colors",
    "WCAG contrast checker",
    "color theory",
    "branding colors",
    "design system colors",
  ],
  canonicalUrl: "https://ziriverse.com/tools/branding/color-palette",
});

export default function ColorPaletteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
