import { GradientGenerator } from "@/components/branding/gradient-generator";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gradient Generator - Create CSS Gradients | Branding Tools",
  description: "Create beautiful linear and radial gradients with visual editor. Export as CSS, preview in real-time, and use gradient presets.",
};

export default function GradientGeneratorPage() {
  return (
    <div className="container mx-auto py-8 px-4 max-w-6xl">
      <GradientGenerator />
    </div>
  );
}
