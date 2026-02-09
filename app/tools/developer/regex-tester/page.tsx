"use client";

import { Search } from "lucide-react";
import { ToolPageLayout } from "@/components/shared/tool-page-layout";
import { RegexTester } from "@/components/dev-tools/regex-tester";
import { StructuredData } from "@/components/seo/structured-data";
import { generateToolSchema, generateWebPageSchema, generateBreadcrumbSchema } from "@/lib/seo";

export default function RegexTesterPage() {
  const toolUrl = "https://ziriverse.com/tools/developer/regex-tester";

  return (
    <>
      <StructuredData
        data={[
          generateToolSchema(
            "Regex Tester",
            "Test regular expression patterns with real-time matching, detailed explanations, and flag support for pattern validation",
            toolUrl
          ),
          generateWebPageSchema(
            "Regex Tester",
            "Test regex patterns with real-time matching",
            toolUrl
          ),
          generateBreadcrumbSchema([
            { name: "Home", url: "https://ziriverse.com" },
            { name: "Developer Tools", url: "https://ziriverse.com/tools/developer" },
            { name: "Regex Tester", url: toolUrl },
          ]),
        ]}
      />

      <ToolPageLayout
        icon={Search}
        title="Regex Tester"
        description="Test regular expression patterns with real-time matching, detailed explanations, and flag support"
        isNew
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Developer Tools", href: "/tools/developer" },
          { label: "Regex Tester" },
        ]}
      >
        <RegexTester onTest={() => {}} />
      </ToolPageLayout>
    </>
  );
}
