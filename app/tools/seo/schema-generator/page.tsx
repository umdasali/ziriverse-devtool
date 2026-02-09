"use client";

import { Braces } from "lucide-react";
import { ToolPageLayout } from "@/components/shared/tool-page-layout";
import { SchemaGeneratorTool } from "@/components/seo-tools/schema-generator";
import { StructuredData } from "@/components/seo/structured-data";
import { generateToolSchema, generateWebPageSchema, generateBreadcrumbSchema } from "@/lib/seo";

export default function SchemaGeneratorPage() {
  const toolUrl = "https://ziriverse.com/tools/seo/schema-generator";

  return (
    <>
      <StructuredData
        data={[
          generateToolSchema(
            "Schema Generator",
            "Generate JSON-LD structured data and schema markup to enhance your search engine results with rich snippets",
            toolUrl
          ),
          generateWebPageSchema(
            "Schema Generator",
            "Create JSON-LD structured data for rich results",
            toolUrl
          ),
          generateBreadcrumbSchema([
            { name: "Home", url: "https://ziriverse.com" },
            { name: "SEO Tools", url: "https://ziriverse.com/tools/seo" },
            { name: "Schema Generator", url: toolUrl },
          ]),
        ]}
      />

      <ToolPageLayout
        icon={Braces}
        title="Schema Generator"
        description="Generate JSON-LD structured data and schema markup to enhance your search engine results"
        isNew
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "SEO Tools", href: "/tools/seo" },
          { label: "Schema Generator" },
        ]}
      >
        <SchemaGeneratorTool />
      </ToolPageLayout>
    </>
  );
}
