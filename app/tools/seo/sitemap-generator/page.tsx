"use client";

import { MapPin } from "lucide-react";
import { ToolPageLayout } from "@/components/shared/tool-page-layout";
import { SitemapGeneratorTool } from "@/components/seo-tools/sitemap-generator";

export default function SitemapGeneratorPage() {
  return (
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
  );
}
