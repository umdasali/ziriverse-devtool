"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Sparkles } from "lucide-react";
import { useBrandingStore } from "@/stores/branding-store";
import { presets } from "@/lib/branding/presets";
import type { BrandingPreset } from "@/types/branding";

export function PresetPreviewCards() {
  const { loadPreset, typography } = useBrandingStore();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {presets.map((preset) => (
        <PresetCard
          key={preset.name}
          preset={preset}
          onLoad={() => loadPreset(preset)}
          isActive={typography.fontFamily === preset.state.typography.fontFamily}
        />
      ))}
    </div>
  );
}

interface PresetCardProps {
  preset: BrandingPreset;
  onLoad: () => void;
  isActive: boolean;
}

function PresetCard({ preset, onLoad, isActive }: PresetCardProps) {
  return (
    <Card className={`cursor-pointer transition-all hover:shadow-lg ${isActive ? "border-primary ring-2 ring-primary/20" : ""}`}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              {preset.name}
              {isActive && (
                <Badge variant="default" className="gap-1">
                  <Check className="w-3 h-3" />
                  Active
                </Badge>
              )}
            </CardTitle>
            <CardDescription className="mt-1">{preset.description}</CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Color Palette Preview */}
        <div>
          <p className="text-xs font-medium text-muted-foreground mb-2">Colors</p>
          <div className="grid grid-cols-5 gap-1.5">
            {Object.entries(preset.state.colors).slice(0, 5).map(([key, color]) => (
              <div key={key} className="space-y-1">
                <div
                  className="w-full h-10 rounded border"
                  style={{ backgroundColor: color }}
                  title={`${key}: ${color}`}
                />
                <p className="text-[10px] text-center text-muted-foreground capitalize truncate">
                  {key}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Typography Preview */}
        <div>
          <p className="text-xs font-medium text-muted-foreground mb-2">Typography</p>
          <div
            className="p-3 bg-muted/30 rounded border"
            style={{ fontFamily: preset.state.typography.fontFamily }}
          >
            <h3
              className="text-lg font-bold mb-1"
              style={{ fontSize: preset.state.typography.headingSizes.h3 }}
            >
              Heading Sample
            </h3>
            <p className="text-sm" style={{ fontSize: preset.state.typography.bodySize }}>
              The quick brown fox jumps over the lazy dog
            </p>
          </div>
        </div>

        {/* Spacing & Border Radius Preview */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <p className="text-xs font-medium text-muted-foreground mb-2">Spacing</p>
            <div className="flex items-end gap-1 h-12">
              <div
                className="bg-primary/80 w-3"
                style={{ height: preset.state.spacing.xs }}
                title={`xs: ${preset.state.spacing.xs}`}
              />
              <div
                className="bg-primary/80 w-3"
                style={{ height: preset.state.spacing.sm }}
                title={`sm: ${preset.state.spacing.sm}`}
              />
              <div
                className="bg-primary/80 w-3"
                style={{ height: preset.state.spacing.md }}
                title={`md: ${preset.state.spacing.md}`}
              />
              <div
                className="bg-primary/80 w-3"
                style={{ height: preset.state.spacing.lg }}
                title={`lg: ${preset.state.spacing.lg}`}
              />
              <div
                className="bg-primary/80 w-3"
                style={{ height: preset.state.spacing.xl }}
                title={`xl: ${preset.state.spacing.xl}`}
              />
            </div>
          </div>

          <div>
            <p className="text-xs font-medium text-muted-foreground mb-2">Border Radius</p>
            <div className="flex gap-1.5">
              <div
                className="bg-primary/80 w-8 h-8 border"
                style={{ borderRadius: preset.state.borderRadius.sm }}
                title={`sm: ${preset.state.borderRadius.sm}`}
              />
              <div
                className="bg-primary/80 w-8 h-8 border"
                style={{ borderRadius: preset.state.borderRadius.md }}
                title={`md: ${preset.state.borderRadius.md}`}
              />
              <div
                className="bg-primary/80 w-8 h-8 border"
                style={{ borderRadius: preset.state.borderRadius.lg }}
                title={`lg: ${preset.state.borderRadius.lg}`}
              />
              <div
                className="bg-primary/80 w-8 h-8 border"
                style={{ borderRadius: preset.state.borderRadius.full }}
                title={`full: ${preset.state.borderRadius.full}`}
              />
            </div>
          </div>
        </div>

        {/* Load Button */}
        <Button
          onClick={onLoad}
          variant={isActive ? "secondary" : "default"}
          className="w-full"
          size="sm"
        >
          <Sparkles className="w-4 h-4 mr-2" />
          {isActive ? "Currently Active" : "Load Preset"}
        </Button>
      </CardContent>
    </Card>
  );
}
