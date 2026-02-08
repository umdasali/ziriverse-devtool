"use client";

import { Search } from "lucide-react";
import { ToolPageLayout } from "@/components/shared/tool-page-layout";
import { RegexTester } from "@/components/dev-tools/regex-tester";

export default function RegexTesterPage() {
  return (
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
  );
}
