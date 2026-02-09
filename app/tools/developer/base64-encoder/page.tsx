"use client";

import { Binary } from "lucide-react";
import { ToolPageLayout } from "@/components/shared/tool-page-layout";
import { Base64EncoderTool } from "@/components/developer-tools/base64-encoder";
import { StructuredData } from "@/components/seo/structured-data";
import { generateToolSchema, generateWebPageSchema, generateBreadcrumbSchema } from "@/lib/seo";

export default function Base64EncoderPage() {
  const toolUrl = "https://ziriverse.com/tools/developer/base64-encoder";

  return (
    <>
      <StructuredData
        data={[
          generateToolSchema(
            "Base64 Encode/Decode",
            "Encode text to Base64 or decode Base64 to text with file upload support and data URL generation for web developers",
            toolUrl
          ),
          generateWebPageSchema(
            "Base64 Encode/Decode",
            "Encode and decode Base64 strings online",
            toolUrl
          ),
          generateBreadcrumbSchema([
            { name: "Home", url: "https://ziriverse.com" },
            { name: "Developer Tools", url: "https://ziriverse.com/tools/developer" },
            { name: "Base64 Encode/Decode", url: toolUrl },
          ]),
        ]}
      />

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
    </>
  );
}
