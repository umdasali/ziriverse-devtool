import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Branding Tools - Ziriverse",
  description: "Free branding tools: Design System Generator, Image Converter, and Color Palette Generator.",
  keywords: ["branding tools", "design system", "image converter", "color palette generator", "brand identity"],
};

export default function BrandingToolsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
