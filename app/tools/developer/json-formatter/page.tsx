"use client";

import { FileJson } from "lucide-react";
import { ToolPageLayout } from "@/components/shared/tool-page-layout";
import { JSONFormatterTool } from "@/components/developer-tools/json-formatter";

export default function JSONFormatterPage() {
  return (
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
  );
}
