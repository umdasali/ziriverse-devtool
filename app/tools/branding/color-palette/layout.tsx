import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Color Palette Generator - Branding Tools - Ziriverse",
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
};

export default function ColorPaletteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
