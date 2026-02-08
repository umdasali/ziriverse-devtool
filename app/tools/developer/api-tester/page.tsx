"use client";

import { Send } from "lucide-react";
import { ToolPageLayout } from "@/components/shared/tool-page-layout";
import { APITesterTool } from "@/components/developer-tools/api-tester";

export default function APITesterPage() {
  return (
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
  );
}
