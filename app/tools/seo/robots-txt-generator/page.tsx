"use client";

import { FileText } from "lucide-react";
import { ToolPageLayout } from "@/components/shared/tool-page-layout";
import { RobotsTxtGeneratorTool } from "@/components/seo-tools/robots-txt-generator";
import { StructuredData } from "@/components/seo/structured-data";
import { generateToolSchema, generateWebPageSchema, generateBreadcrumbSchema } from "@/lib/seo";

export default function RobotsTxtGeneratorPage() {
  const toolUrl = "https://ziriverse.com/tools/seo/robots-txt-generator";

  return (
    <>
      <StructuredData
        data={[
          generateToolSchema(
            "Robots.txt Generator",
            "Generate robots.txt files to control how search engines crawl and index your website for better SEO management",
            toolUrl
          ),
          generateWebPageSchema(
            "Robots.txt Generator",
            "Create robots.txt files for search engine control",
            toolUrl
          ),
          generateBreadcrumbSchema([
            { name: "Home", url: "https://ziriverse.com" },
            { name: "SEO Tools", url: "https://ziriverse.com/tools/seo" },
            { name: "Robots.txt Generator", url: toolUrl },
          ]),
        ]}
      />

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
    </>
  );
}
