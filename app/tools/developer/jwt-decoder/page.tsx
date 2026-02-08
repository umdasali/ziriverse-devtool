"use client";

import { Key } from "lucide-react";
import { ToolPageLayout } from "@/components/shared/tool-page-layout";
import { JWTDecoderTool } from "@/components/developer-tools/jwt-decoder";

export default function JWTDecoderPage() {
  return (
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
  );
}
