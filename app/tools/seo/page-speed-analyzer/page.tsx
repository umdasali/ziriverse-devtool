"use client";

import { Gauge } from "lucide-react";
import { ToolPageLayout } from "@/components/shared/tool-page-layout";
import { PageSpeedAnalyzerTool } from "@/components/seo-tools/page-speed-analyzer";
import { StructuredData } from "@/components/seo/structured-data";
import { generateToolSchema, generateWebPageSchema, generateBreadcrumbSchema } from "@/lib/seo";

export default function PageSpeedAnalyzerPage() {
  const toolUrl = "https://ziriverse.com/tools/seo/page-speed-analyzer";

  return (
    <>
      <StructuredData
        data={[
          generateToolSchema(
            "Page Speed Analyzer",
            "Analyze your website performance and get actionable insights to improve page load times and Core Web Vitals",
            toolUrl
          ),
          generateWebPageSchema(
            "Page Speed Analyzer",
            "Analyze website performance and speed",
            toolUrl
          ),
          generateBreadcrumbSchema([
            { name: "Home", url: "https://ziriverse.com" },
            { name: "SEO Tools", url: "https://ziriverse.com/tools/seo" },
            { name: "Page Speed Analyzer", url: toolUrl },
          ]),
        ]}
      />

      <ToolPageLayout
        icon={Gauge}
        title="Page Speed Analyzer"
        description="Analyze your website performance and get actionable insights to improve page load times"
        isNew
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "SEO Tools", href: "/tools/seo" },
          { label: "Page Speed Analyzer" },
        ]}
      >
        <PageSpeedAnalyzerTool />
      </ToolPageLayout>
    </>
  );
}
