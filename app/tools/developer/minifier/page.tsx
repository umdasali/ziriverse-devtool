"use client";

import { Minimize2 } from "lucide-react";
import { ToolPageLayout } from "@/components/shared/tool-page-layout";
import { MinifierTool } from "@/components/developer-tools/minifier";

export default function MinifierPage() {
  return (
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
  );
}
