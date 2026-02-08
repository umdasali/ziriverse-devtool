"use client";

import { FileText } from "lucide-react";
import { ToolPageLayout } from "@/components/shared/tool-page-layout";
import { RobotsTxtGeneratorTool } from "@/components/seo-tools/robots-txt-generator";

export default function RobotsTxtGeneratorPage() {
  return (
    <ToolPageLayout
      icon={FileText}
      title="Robots.txt Generator"
      description="Generate robots.txt files to control how search engines crawl and index your website"
      isNew
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "SEO Tools", href: "/tools/seo" },
        { label: "Robots.txt Generator" },
      ]}
    >
      <RobotsTxtGeneratorTool />
    </ToolPageLayout>
  );
}
