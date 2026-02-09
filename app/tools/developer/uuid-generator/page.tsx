"use client";

import { Fingerprint } from "lucide-react";
import { ToolPageLayout } from "@/components/shared/tool-page-layout";
import { UUIDGeneratorTool } from "@/components/developer-tools/uuid-generator";
import { StructuredData } from "@/components/seo/structured-data";
import { generateToolSchema, generateWebPageSchema, generateBreadcrumbSchema } from "@/lib/seo";

export default function UUIDGeneratorPage() {
  const toolUrl = "https://ziriverse.com/tools/developer/uuid-generator";

  return (
    <>
      <StructuredData
        data={[
          generateToolSchema(
            "UUID Generator",
            "Generate universally unique identifiers (UUID v4) with bulk generation, format options, and validation for databases and applications",
            toolUrl
          ),
          generateWebPageSchema(
            "UUID Generator",
            "Generate UUIDs with bulk generation and validation",
            toolUrl
          ),
          generateBreadcrumbSchema([
            { name: "Home", url: "https://ziriverse.com" },
            { name: "Developer Tools", url: "https://ziriverse.com/tools/developer" },
            { name: "UUID Generator", url: toolUrl },
          ]),
        ]}
      />

      <ToolPageLayout
        icon={Fingerprint}
        title="UUID Generator"
        description="Generate universally unique identifiers (UUID v4) with bulk generation, format options, and validation"
        isNew
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Developer Tools", href: "/tools/developer" },
          { label: "UUID Generator" },
        ]}
      >
        <UUIDGeneratorTool />
      </ToolPageLayout>
    </>
  );
}
