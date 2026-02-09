"use client";

import { Send } from "lucide-react";
import { ToolPageLayout } from "@/components/shared/tool-page-layout";
import { APITesterTool } from "@/components/developer-tools/api-tester";
import { StructuredData } from "@/components/seo/structured-data";
import { generateToolSchema, generateWebPageSchema, generateBreadcrumbSchema } from "@/lib/seo";

export default function APITesterPage() {
  const toolUrl = "https://ziriverse.com/tools/developer/api-tester";

  return (
    <>
      <StructuredData
        data={[
          generateToolSchema(
            "API Tester",
            "Test REST API endpoints with custom HTTP methods, headers, request body, and view formatted JSON responses for API development",
            toolUrl
          ),
          generateWebPageSchema(
            "API Tester",
            "Test REST API endpoints with custom requests",
            toolUrl
          ),
          generateBreadcrumbSchema([
            { name: "Home", url: "https://ziriverse.com" },
            { name: "Developer Tools", url: "https://ziriverse.com/tools/developer" },
            { name: "API Tester", url: toolUrl },
          ]),
        ]}
      />

      <ToolPageLayout
        icon={Send}
        title="API Tester"
        description="Test REST API endpoints with custom methods, headers, body, and view formatted responses"
        isNew
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Developer Tools", href: "/tools/developer" },
          { label: "API Tester" },
        ]}
      >
        <APITesterTool />
      </ToolPageLayout>
    </>
  );
}
