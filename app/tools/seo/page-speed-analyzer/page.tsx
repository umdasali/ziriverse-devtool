"use client";

import { Gauge } from "lucide-react";
import { ToolPageLayout } from "@/components/shared/tool-page-layout";
import { PageSpeedAnalyzerTool } from "@/components/seo-tools/page-speed-analyzer";

export default function PageSpeedAnalyzerPage() {
  return (
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
  );
}
