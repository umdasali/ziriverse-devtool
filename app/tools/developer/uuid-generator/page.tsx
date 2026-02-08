"use client";

import { Fingerprint } from "lucide-react";
import { ToolPageLayout } from "@/components/shared/tool-page-layout";
import { UUIDGeneratorTool } from "@/components/developer-tools/uuid-generator";

export default function UUIDGeneratorPage() {
  return (
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
  );
}
