import { Metadata } from "next";
import { StructuredData } from "@/components/seo/structured-data";
import {
  generateMetadata as generateSEOMetadata,
  generateToolSchema,
  generateBreadcrumbSchema,
  generateWebPageSchema,
} from "@/lib/seo";

export const metadata: Metadata = generateSEOMetadata({
  title: "Advanced Image Converter - Convert Between 8+ Formats",
  description:
    "Free online image converter supporting 8+ formats (AVIF, WebP, PNG, JPEG, GIF, BMP, TIFF, ICO). Resize, transform, apply filters. Client-side processing for privacy. Professional quality with Sharp.js technology.",
  keywords: [
    "image converter",
    "convert images",
    "AVIF converter",
    "WebP converter",
    "PNG to JPEG",
    "image format converter",
    "resize images",
    "image filters",
    "free image tool",
  ],
  ogImage: "/og-image-image-converter.png",
  canonicalUrl: "https://ziriverse.com/image-converter",
});

export default function ImageConverterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <StructuredData
        data={[
          generateToolSchema(
            "Advanced Image Converter",
            "Convert images between 8+ formats with resize, transform, and filter options. Supports AVIF, WebP, PNG, JPEG, GIF, BMP, TIFF, ICO.",
            "https://ziriverse.com/image-converter"
          ),
          generateBreadcrumbSchema([
            { name: "Home", url: "https://ziriverse.com" },
            { name: "Image Converter", url: "https://ziriverse.com/image-converter" },
          ]),
          generateWebPageSchema(
            "Advanced Image Converter",
            "Professional image conversion tool with 8+ format support",
            "https://ziriverse.com/image-converter"
          ),
        ]}
      />
      {children}
    </>
  );
}
