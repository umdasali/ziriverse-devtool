import type { Metadata } from "next";
import { generateMetadata } from "@/lib/seo";

export const metadata: Metadata = generateMetadata({
  title: "Branding Tools - Build Your Brand Identity Fast",
  description: "Free branding tools: Design System Generator, Image Converter, and Color Palette Generator.",
  keywords: ["branding tools", "design system", "image converter", "color palette generator", "brand identity"],
  canonicalUrl: "https://ziriverse.com/tools/branding",
});

export default function BrandingToolsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
