"use client";

import { RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { TypographyControls } from "@/components/branding/typography-controls";
import { ColorControls } from "@/components/branding/color-controls";
import { SpacingControls } from "@/components/branding/spacing-controls";
import { LivePreview } from "@/components/branding/live-preview";
import { CodeOutput } from "@/components/branding/code-output";
import { useBrandingStore } from "@/stores/branding-store";
import { presets } from "@/lib/branding/presets";

export default function BrandingPage() {
  const { loadPreset, reset } = useBrandingStore();

  return (
    <div className="container py-8 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Branding Design System</h1>
          <p className="text-muted-foreground mt-2">
            Create and export custom design systems with live preview
          </p>
        </div>
        <Button onClick={reset} variant="outline">
          <RotateCcw className="mr-2 h-4 w-4" />
          Reset to Default
        </Button>
      </div>

      {/* Presets */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Start</CardTitle>
          <CardDescription>
            Load a preset design system or start from scratch
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <Label htmlFor="preset" className="whitespace-nowrap">
              Load Preset:
            </Label>
            <Select onValueChange={(value) => {
              const preset = presets.find((p) => p.name === value);
              if (preset) loadPreset(preset);
            }}>
              <SelectTrigger id="preset" className="max-w-xs">
                <SelectValue placeholder="Choose a preset..." />
              </SelectTrigger>
              <SelectContent>
                {presets.map((preset) => (
                  <SelectItem key={preset.name} value={preset.name}>
                    <div>
                      <div className="font-medium">{preset.name}</div>
                      <div className="text-xs text-muted-foreground">
                        {preset.description}
                      </div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left Column - Controls */}
        <div className="space-y-6">
          <TypographyControls />
          <ColorControls />
          <SpacingControls />
        </div>

        {/* Right Column - Preview & Code */}
        <div className="lg:col-span-2 space-y-6">
          <LivePreview />
          <CodeOutput />
        </div>
      </div>

      {/* Features */}
      <div className="grid gap-4 md:grid-cols-3 mt-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Live Preview</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              See your changes in real-time with a fully interactive preview
              panel
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Export CSS</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Download production-ready CSS with custom properties and utility
              classes
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Design Presets</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Start with popular design systems like Material, Tailwind, or
              Bootstrap
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
