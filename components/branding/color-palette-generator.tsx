"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Copy, Check, Palette, Wand2 } from "lucide-react";
import { useBrandingStore } from "@/stores/branding-store";

type ColorHarmony = "complementary" | "triadic" | "analogous" | "tetradic" | "split-complementary" | "monochromatic";

export function ColorPaletteGenerator() {
  const { setColor } = useBrandingStore();
  const [baseColor, setBaseColor] = useState("#3b82f6");
  const [copiedColor, setCopiedColor] = useState<string | null>(null);

  // Convert hex to HSL
  const hexToHSL = (hex: string): { h: number; s: number; l: number } => {
    // Remove # if present
    hex = hex.replace("#", "");

    // Convert to RGB
    const r = parseInt(hex.substr(0, 2), 16) / 255;
    const g = parseInt(hex.substr(2, 2), 16) / 255;
    const b = parseInt(hex.substr(4, 2), 16) / 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0;
    let s = 0;
    const l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

      switch (max) {
        case r:
          h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
          break;
        case g:
          h = ((b - r) / d + 2) / 6;
          break;
        case b:
          h = ((r - g) / d + 4) / 6;
          break;
      }
    }

    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100),
    };
  };

  // Convert HSL to hex
  const hslToHex = (h: number, s: number, l: number): string => {
    h = h / 360;
    s = s / 100;
    l = l / 100;

    let r, g, b;

    if (s === 0) {
      r = g = b = l;
    } else {
      const hue2rgb = (p: number, q: number, t: number) => {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1 / 6) return p + (q - p) * 6 * t;
        if (t < 1 / 2) return q;
        if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
        return p;
      };

      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;

      r = hue2rgb(p, q, h + 1 / 3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1 / 3);
    }

    const toHex = (x: number) => {
      const hex = Math.round(x * 255).toString(16);
      return hex.length === 1 ? "0" + hex : hex;
    };

    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
  };

  // Generate color harmonies
  const generateHarmony = (baseHex: string, type: ColorHarmony): string[] => {
    const base = hexToHSL(baseHex);
    let hues: number[] = [];

    switch (type) {
      case "complementary":
        hues = [base.h, (base.h + 180) % 360];
        break;
      case "triadic":
        hues = [base.h, (base.h + 120) % 360, (base.h + 240) % 360];
        break;
      case "analogous":
        hues = [(base.h - 30 + 360) % 360, base.h, (base.h + 30) % 360];
        break;
      case "tetradic":
        hues = [base.h, (base.h + 90) % 360, (base.h + 180) % 360, (base.h + 270) % 360];
        break;
      case "split-complementary":
        hues = [base.h, (base.h + 150) % 360, (base.h + 210) % 360];
        break;
      case "monochromatic":
        return [
          hslToHex(base.h, base.s, Math.max(10, base.l - 20)),
          hslToHex(base.h, base.s, Math.max(10, base.l - 10)),
          baseHex,
          hslToHex(base.h, base.s, Math.min(90, base.l + 10)),
          hslToHex(base.h, base.s, Math.min(90, base.l + 20)),
        ];
    }

    return hues.map((h) => hslToHex(h, base.s, base.l));
  };

  // Copy color to clipboard
  const copyColor = (color: string) => {
    navigator.clipboard.writeText(color);
    setCopiedColor(color);
    setTimeout(() => setCopiedColor(null), 2000);
  };

  // Apply color to design system
  const applyToPrimary = (color: string) => {
    setColor("primary", color);
  };

  const harmonies: Array<{ id: ColorHarmony; name: string; description: string }> = [
    { id: "complementary", name: "Complementary", description: "Opposite colors on the color wheel" },
    { id: "triadic", name: "Triadic", description: "Three evenly spaced colors" },
    { id: "analogous", name: "Analogous", description: "Adjacent colors on the wheel" },
    { id: "tetradic", name: "Tetradic", description: "Four colors forming a rectangle" },
    { id: "split-complementary", name: "Split Complementary", description: "Base color + two adjacent to complement" },
    { id: "monochromatic", name: "Monochromatic", description: "Variations of a single hue" },
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Palette className="w-5 h-5" />
            Base Color
          </CardTitle>
          <CardDescription>Choose a base color to generate harmonious palettes</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-4">
            <div className="flex-1 space-y-2">
              <Label>Color Picker</Label>
              <div className="flex gap-2">
                <Input
                  type="color"
                  value={baseColor}
                  onChange={(e) => setBaseColor(e.target.value)}
                  className="w-20 h-10"
                />
                <Input
                  type="text"
                  value={baseColor}
                  onChange={(e) => setBaseColor(e.target.value)}
                  className="flex-1"
                  placeholder="#3b82f6"
                />
              </div>
            </div>
          </div>

          {/* Quick colors */}
          <div className="space-y-2">
            <Label>Quick Colors</Label>
            <div className="grid grid-cols-8 gap-2">
              {[
                "#ef4444", "#f59e0b", "#10b981", "#3b82f6",
                "#6366f1", "#8b5cf6", "#ec4899", "#06b6d4",
              ].map((color) => (
                <button
                  key={color}
                  onClick={() => setBaseColor(color)}
                  className={`w-full h-10 rounded border-2 transition-all ${
                    baseColor === color ? "border-primary ring-2 ring-primary/20" : "border-transparent"
                  }`}
                  style={{ backgroundColor: color }}
                  title={color}
                />
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="complementary">
        <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6">
          {harmonies.map((harmony) => (
            <TabsTrigger key={harmony.id} value={harmony.id} className="text-xs">
              {harmony.name.split(" ")[0]}
            </TabsTrigger>
          ))}
        </TabsList>

        {harmonies.map((harmony) => {
          const colors = generateHarmony(baseColor, harmony.id);

          return (
            <TabsContent key={harmony.id} value={harmony.id}>
              <Card>
                <CardHeader>
                  <CardTitle>{harmony.name}</CardTitle>
                  <CardDescription>{harmony.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Color palette */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                    {colors.map((color, index) => (
                      <div key={index} className="space-y-2">
                        <div
                          className="w-full h-24 rounded-lg border-2 border-transparent hover:border-primary transition-all cursor-pointer"
                          style={{ backgroundColor: color }}
                          onClick={() => copyColor(color)}
                          title={`Click to copy ${color}`}
                        />
                        <div className="space-y-1">
                          <p className="text-xs font-mono text-center">{color}</p>
                          <div className="flex gap-1">
                            <Button
                              size="sm"
                              variant="outline"
                              className="flex-1 h-7 text-xs"
                              onClick={() => copyColor(color)}
                            >
                              {copiedColor === color ? (
                                <Check className="w-3 h-3" />
                              ) : (
                                <Copy className="w-3 h-3" />
                              )}
                            </Button>
                            <Button
                              size="sm"
                              variant="default"
                              className="flex-1 h-7 text-xs"
                              onClick={() => applyToPrimary(color)}
                            >
                              <Wand2 className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Usage example */}
                  <div className="space-y-2">
                    <Label>Preview</Label>
                    <div className="p-6 rounded-lg" style={{ backgroundColor: colors[0] }}>
                      <h3 className="text-2xl font-bold text-white mb-2">Sample Heading</h3>
                      <p className="text-white/90">
                        This is how your color palette might look in a real design. Experiment
                        with different harmonies to find the perfect combination.
                      </p>
                      <div className="mt-4 flex gap-2">
                        {colors.slice(1, 4).map((color, index) => (
                          <div
                            key={index}
                            className="h-2 flex-1 rounded"
                            style={{ backgroundColor: color }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Tips */}
                  <div className="bg-muted/50 p-4 rounded-lg text-sm space-y-1">
                    <p className="font-medium">💡 Tips:</p>
                    <ul className="text-muted-foreground space-y-1 ml-4 list-disc">
                      <li>Click any color swatch to copy its hex code</li>
                      <li>Use the wand button to apply color as primary</li>
                      <li>Test color combinations for accessibility</li>
                      <li>Adjust saturation and lightness for variations</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          );
        })}
      </Tabs>
    </div>
  );
}
