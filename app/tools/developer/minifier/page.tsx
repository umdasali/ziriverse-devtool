"use client";

import { Minimize2 } from "lucide-react";
import { ToolPageLayout } from "@/components/shared/tool-page-layout";
import { MinifierTool } from "@/components/developer-tools/minifier";
import { StructuredData } from "@/components/seo/structured-data";
import { generateToolSchema, generateWebPageSchema, generateBreadcrumbSchema } from "@/lib/seo";

export default function MinifierPage() {
  const toolUrl = "https://ziriverse.com/tools/developer/minifier";

  return (
    <>
      <StructuredData
        data={[
          generateToolSchema(
            "HTML/CSS/JS Minifier",
            "Minify HTML, CSS, and JavaScript code to reduce file size and improve website load times for better performance",
            toolUrl
          ),
          generateWebPageSchema(
            "HTML/CSS/JS Minifier",
            "Minify code to reduce file size",
            toolUrl
          ),
          generateBreadcrumbSchema([
            { name: "Home", url: "https://ziriverse.com" },
            { name: "Developer Tools", url: "https://ziriverse.com/tools/developer" },
            { name: "Minifier", url: toolUrl },
          ]),
        ]}
      />

      <ToolPageLayout
        icon={Minimize2}
        title="HTML/CSS/JS Minifier"
        description="Minify HTML, CSS, and JavaScript code to reduce file size and improve load times"
        isNew
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Developer Tools", href: "/tools/developer" },
          { label: "Minifier" },
        ]}
      >
        <MinifierTool />
      </ToolPageLayout>
    </>
  );
}
