"use client";

import { Paintbrush } from "lucide-react";
import { ToolPageLayout } from "@/components/shared/tool-page-layout";
import { ColorPaletteGeneratorTool } from "@/components/branding-tools/color-palette-generator";
import { StructuredData } from "@/components/seo/structured-data";
import { generateToolSchema, generateWebPageSchema, generateBreadcrumbSchema } from "@/lib/seo";

export default function ColorPalettePage() {
  const toolUrl = "https://ziriverse.com/tools/branding/color-palette";

  return (
    <>
      <StructuredData
        data={[
          generateToolSchema(
            "Color Palette Generator",
            "Generate harmonious color palettes using color theory with WCAG contrast checking and multiple export options for design projects",
            toolUrl
          ),
          generateWebPageSchema(
            "Color Palette Generator",
            "Create harmonious color palettes with accessibility",
            toolUrl
          ),
          generateBreadcrumbSchema([
            { name: "Home", url: "https://ziriverse.com" },
            { name: "Branding Tools", url: "https://ziriverse.com/tools/branding" },
            { name: "Color Palette", url: toolUrl },
          ]),
        ]}
      />

      <ToolPageLayout
        icon={Paintbrush}
        title="Color Palette Generator"
        description="Generate harmonious color palettes using color theory with WCAG contrast checking and export options"
        isNew
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Branding Tools", href: "/tools/branding" },
          { label: "Color Palette" },
        ]}
      >
        <ColorPaletteGeneratorTool />
      </ToolPageLayout>
    </>
  );
}
