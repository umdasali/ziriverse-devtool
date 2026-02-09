"use client";

import { FileJson } from "lucide-react";
import { ToolPageLayout } from "@/components/shared/tool-page-layout";
import { JSONFormatterTool } from "@/components/developer-tools/json-formatter";
import { StructuredData } from "@/components/seo/structured-data";
import { generateToolSchema, generateWebPageSchema, generateBreadcrumbSchema } from "@/lib/seo";

export default function JSONFormatterPage() {
  const toolUrl = "https://ziriverse.com/tools/developer/json-formatter";

  return (
    <>
      <StructuredData
        data={[
          generateToolSchema(
            "JSON Formatter & Validator",
            "Format, beautify, validate, and minify JSON with real-time error detection. Supports syntax highlighting, tree view, and instant error messages.",
            toolUrl
          ),
          generateWebPageSchema(
            "JSON Formatter & Validator",
            "Free online JSON formatter and validator with syntax highlighting and error detection",
            toolUrl
          ),
          generateBreadcrumbSchema([
            { name: "Home", url: "https://ziriverse.com" },
            { name: "Developer Tools", url: "https://ziriverse.com/tools/developer" },
            { name: "JSON Formatter", url: toolUrl },
          ]),
        ]}
      />

      <ToolPageLayout
        icon={FileJson}
        title="JSON Formatter & Validator"
        description="Format, beautify, validate, and minify JSON with real-time error detection"
        isNew
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Developer Tools", href: "/tools/developer" },
          { label: "JSON Formatter" },
        ]}
      >
        <JSONFormatterTool />
      </ToolPageLayout>
    </>
  );
}
