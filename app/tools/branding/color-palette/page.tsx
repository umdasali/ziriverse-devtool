"use client";

import { Paintbrush } from "lucide-react";
import { ToolPageLayout } from "@/components/shared/tool-page-layout";
import { ColorPaletteGeneratorTool } from "@/components/branding-tools/color-palette-generator";

export default function ColorPalettePage() {
  return (
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
  );
}
