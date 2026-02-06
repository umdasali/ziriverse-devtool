import { Metadata } from "next";
import { StructuredData } from "@/components/seo/structured-data";
import {
  generateMetadata as generateSEOMetadata,
  generateToolSchema,
  generateBreadcrumbSchema,
  generateWebPageSchema,
} from "@/lib/seo";

export const metadata: Metadata = generateSEOMetadata({
  title: "Comprehensive SEO Validator - 100+ Checkpoints & Analysis",
  description:
    "Advanced SEO analysis tool with 100+ data points. Validate meta tags, check performance, analyze content, preview on 6 platforms (Facebook, Twitter, LinkedIn, Discord, Reddit, WhatsApp). Export reports in JSON/CSV. Improve your search rankings.",
  keywords: [
    "SEO validator",
    "SEO analyzer",
    "meta tags checker",
    "SEO audit tool",
    "search engine optimization",
    "social media preview",
    "og tags validator",
    "twitter card validator",
    "free SEO tool",
  ],
  canonicalUrl: "https://brandingtools.dev/seo-validator",
});

export default function SEOValidatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <StructuredData
        data={[
          generateToolSchema(
            "Comprehensive SEO Validator",
            "Advanced SEO analysis with 100+ checkpoints covering meta tags, content quality, performance, and social media previews for 6 platforms.",
            "https://brandingtools.dev/seo-validator"
          ),
          generateBreadcrumbSchema([
            { name: "Home", url: "https://brandingtools.dev" },
            { name: "SEO Validator", url: "https://brandingtools.dev/seo-validator" },
          ]),
          generateWebPageSchema(
            "Comprehensive SEO Validator",
            "Professional SEO analysis tool with 100+ checkpoints and platform previews",
            "https://brandingtools.dev/seo-validator"
          ),
        ]}
      />
      {children}
    </>
  );
}
