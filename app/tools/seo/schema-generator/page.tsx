"use client";

import { Braces } from "lucide-react";
import { ToolPageLayout } from "@/components/shared/tool-page-layout";
import { SchemaGeneratorTool } from "@/components/seo-tools/schema-generator";

export default function SchemaGeneratorPage() {
  return (
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
  );
}
