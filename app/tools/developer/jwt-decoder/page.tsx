"use client";

import { Key } from "lucide-react";
import { ToolPageLayout } from "@/components/shared/tool-page-layout";
import { JWTDecoderTool } from "@/components/developer-tools/jwt-decoder";
import { StructuredData } from "@/components/seo/structured-data";
import { generateToolSchema, generateWebPageSchema, generateBreadcrumbSchema } from "@/lib/seo";

export default function JWTDecoderPage() {
  const toolUrl = "https://ziriverse.com/tools/developer/jwt-decoder";

  return (
    <>
      <StructuredData
        data={[
          generateToolSchema(
            "JWT Decoder",
            "Decode JSON Web Tokens online to inspect header, payload claims, and check expiration status for authentication debugging",
            toolUrl
          ),
          generateWebPageSchema(
            "JWT Decoder",
            "Decode and inspect JSON Web Tokens",
            toolUrl
          ),
          generateBreadcrumbSchema([
            { name: "Home", url: "https://ziriverse.com" },
            { name: "Developer Tools", url: "https://ziriverse.com/tools/developer" },
            { name: "JWT Decoder", url: toolUrl },
          ]),
        ]}
      />

      <ToolPageLayout
        icon={Key}
        title="JWT Decoder"
        description="Decode JSON Web Tokens to inspect header, payload claims, and check expiration status"
        isNew
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Developer Tools", href: "/tools/developer" },
          { label: "JWT Decoder" },
        ]}
      >
        <JWTDecoderTool />
      </ToolPageLayout>
    </>
  );
}
