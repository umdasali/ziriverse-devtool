"use client";

import { Binary } from "lucide-react";
import { ToolPageLayout } from "@/components/shared/tool-page-layout";
import { Base64EncoderTool } from "@/components/developer-tools/base64-encoder";

export default function Base64EncoderPage() {
  return (
    <ToolPageLayout
      icon={Binary}
      title="Base64 Encode/Decode"
      description="Encode text to Base64 or decode Base64 to text. Supports file uploads and data URL generation."
      isNew
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Developer Tools", href: "/tools/developer" },
        { label: "Base64 Encode/Decode" },
      ]}
    >
      <Base64EncoderTool />
    </ToolPageLayout>
  );
}
