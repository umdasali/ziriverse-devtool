"use client";

import { MapPin } from "lucide-react";
import { ToolPageLayout } from "@/components/shared/tool-page-layout";
import { SitemapGeneratorTool } from "@/components/seo-tools/sitemap-generator";
import { StructuredData } from "@/components/seo/structured-data";
import { generateToolSchema, generateWebPageSchema, generateBreadcrumbSchema } from "@/lib/seo";

export default function SitemapGeneratorPage() {
  const toolUrl = "https://ziriverse.com/tools/seo/sitemap-generator";

  return (
    <>
      <StructuredData
        data={[
          generateToolSchema(
            "Sitemap Generator",
            "Generate XML sitemaps to help search engines discover and index your website pages for improved SEO visibility",
            toolUrl
          ),
          generateWebPageSchema(
            "Sitemap Generator",
            "Create XML sitemaps for search engines",
            toolUrl
          ),
          generateBreadcrumbSchema([
            { name: "Home", url: "https://ziriverse.com" },
            { name: "SEO Tools", url: "https://ziriverse.com/tools/seo" },
            { name: "Sitemap Generator", url: toolUrl },
          ]),
        ]}
      />

      <ToolPageLayout
        icon={MapPin}
        title="Sitemap Generator"
        description="Generate XML sitemaps to help search engines discover and index your website pages"
        isNew
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "SEO Tools", href: "/tools/seo" },
          { label: "Sitemap Generator" },
        ]}
      >
        <SitemapGeneratorTool />
      </ToolPageLayout>
    </>
  );
}
