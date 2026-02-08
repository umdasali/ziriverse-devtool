"use client";

import { useState, useCallback } from "react";
import { HexColorPicker } from "react-colorful";
import {
  Copy,
  Check,
  Download,
  Contrast,
  Palette,
  SunMoon,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  hexToHSL,
  hexToRGB,
  getContrastRatio,
  getWCAGLevel,
} from "@/lib/branding-tools/color-utils";
import {
  generatePalette,
  generateShades,
  exportPaletteCSS,
  exportPaletteSCSS,
  exportPaletteJSON,
  type HarmonyType,
  type PaletteColor,
} from "@/lib/branding-tools/color-palette";

const HARMONY_TYPES: { value: HarmonyType; label: string }[] = [
  { value: "complementary", label: "Complementary" },
  { value: "analogous", label: "Analogous" },
  { value: "triadic", label: "Triadic" },
  { value: "tetradic", label: "Tetradic" },
  { value: "split-complementary", label: "Split-Complementary" },
  { value: "monochromatic", label: "Monochromatic" },
];

function isValidHex(hex: string): boolean {
  return /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(hex);
}

export function ColorPaletteGeneratorTool() {
  const [baseColor, setBaseColor] = useState("#3b82f6");
  const [hexInput, setHexInput] = useState("#3b82f6");
  const [harmony, setHarmony] = useState<HarmonyType>("complementary");
  const [copiedHex, setCopiedHex] = useState<string | null>(null);
  const [copiedExport, setCopiedExport] = useState<string | null>(null);

  const palette = generatePalette(baseColor, harmony);
  const shades = generateShades(baseColor);
  const hsl = hexToHSL(baseColor);
  const rgb = hexToRGB(baseColor);

  const handleColorPickerChange = useCallback((color: string) => {
    setBaseColor(color);
    setHexInput(color);
  }, []);

  const handleHexInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setHexInput(value);
      if (isValidHex(value)) {
        setBaseColor(value);
      }
    },
    []
  );

  const copyToClipboard = useCallback(async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedHex(key);
      setTimeout(() => setCopiedHex(null), 1500);
    } catch {
      // Fallback for clipboard API failure
    }
  }, []);

  const copyExportContent = useCallback(async (content: string, format: string) => {
    try {
      await navigator.clipboard.writeText(content);
      setCopiedExport(format);
      setTimeout(() => setCopiedExport(null), 1500);
    } catch {
      // Fallback for clipboard API failure
    }
  }, []);

  const downloadContent = useCallback((content: string, filename: string) => {
    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }, []);

  const getTextColor = (hex: string): string => {
    const ratio = getContrastRatio(hex, "#ffffff");
    return ratio >= 4.5 ? "#ffffff" : "#000000";
  };

  const cssOutput = exportPaletteCSS(palette);
  const scssOutput = exportPaletteSCSS(palette);
  const jsonOutput = exportPaletteJSON(palette);

  return (
    <div className="space-y-8">
      {/* Color Picker and Harmony Selection */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Base Color Picker */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Palette className="h-5 w-5" />
              Base Color
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-center">
              <HexColorPicker
                color={baseColor}
                onChange={handleColorPickerChange}
                style={{ width: "100%", maxWidth: "280px" }}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="hex-input">HEX Value</Label>
              <Input
                id="hex-input"
                value={hexInput}
                onChange={handleHexInputChange}
                placeholder="#3b82f6"
                className="font-mono"
              />
              {!isValidHex(hexInput) && hexInput.length > 0 && (
                <p className="text-xs text-destructive">
                  Enter a valid HEX color (e.g., #3b82f6)
                </p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="p-3 rounded-md bg-muted">
                <span className="text-muted-foreground block mb-1">HSL</span>
                <span className="font-mono">
                  {hsl.h}, {hsl.s}%, {hsl.l}%
                </span>
              </div>
              <div className="p-3 rounded-md bg-muted">
                <span className="text-muted-foreground block mb-1">RGB</span>
                <span className="font-mono">
                  {rgb.r}, {rgb.g}, {rgb.b}
                </span>
              </div>
            </div>

            <div
              className="h-16 rounded-lg border"
              style={{ backgroundColor: baseColor }}
            />
          </CardContent>
        </Card>

        {/* Harmony Type Selector */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <SunMoon className="h-5 w-5" />
              Harmony Type
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-2">
              {HARMONY_TYPES.map((type) => (
                <Button
                  key={type.value}
                  variant={harmony === type.value ? "default" : "outline"}
                  size="sm"
                  onClick={() => setHarmony(type.value)}
                  className="w-full"
                >
                  {type.label}
                </Button>
              ))}
            </div>

            <div className="text-sm text-muted-foreground">
              {harmony === "complementary" && (
                <p>
                  Two colors opposite on the color wheel. Creates high contrast
                  and vibrant combinations.
                </p>
              )}
              {harmony === "analogous" && (
                <p>
                  Three colors adjacent on the color wheel. Creates harmonious,
                  comfortable designs.
                </p>
              )}
              {harmony === "triadic" && (
                <p>
                  Three colors evenly spaced (120 degrees apart). Offers vibrant
                  variety while maintaining balance.
                </p>
              )}
              {harmony === "tetradic" && (
                <p>
                  Four colors evenly spaced (90 degrees apart). Rich color
                  scheme with many possibilities.
                </p>
              )}
              {harmony === "split-complementary" && (
                <p>
                  Base color plus two adjacent to its complement. High contrast
                  with less tension.
                </p>
              )}
              {harmony === "monochromatic" && (
                <p>
                  Variations of a single hue at different saturation and
                  lightness levels. Elegant and cohesive.
                </p>
              )}
            </div>

            {/* Mini preview of harmony on color wheel */}
            <div className="flex items-center justify-center gap-2 flex-wrap pt-2">
              {palette.map((color, index) => (
                <div key={index} className="text-center">
                  <div
                    className="w-12 h-12 rounded-full border-2 border-border"
                    style={{ backgroundColor: color.hex }}
                  />
                  <span className="text-xs text-muted-foreground mt-1 block">
                    {color.name}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Generated Palette */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Generated Palette</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {palette.map((color, index) => (
              <button
                key={index}
                className="group relative rounded-lg border overflow-hidden transition-all hover:shadow-md focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                onClick={() => copyToClipboard(color.hex, `palette-${index}`)}
                title={`Click to copy ${color.hex}`}
              >
                <div
                  className="h-14 sm:h-16 w-full flex items-center justify-center"
                  style={{ backgroundColor: color.hex }}
                >
                  {copiedHex === `palette-${index}` ? (
                    <Check
                      className="h-5 w-5"
                      style={{ color: getTextColor(color.hex) }}
                    />
                  ) : (
                    <Copy
                      className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity"
                      style={{ color: getTextColor(color.hex) }}
                    />
                  )}
                </div>
                <div className="p-2 bg-background text-center">
                  <p className="text-xs font-medium truncate">{color.name}</p>
                  <p className="text-xs font-mono text-muted-foreground">
                    {color.hex}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Shades and Tints */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Shades & Tints</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex rounded-lg overflow-hidden border">
            {shades.map((shade, index) => (
              <button
                key={index}
                className="group relative flex-1 h-14 sm:h-16 transition-all hover:flex-[2] focus:outline-none focus:ring-2 focus:ring-ring focus:ring-inset"
                style={{ backgroundColor: shade }}
                onClick={() => copyToClipboard(shade, `shade-${index}`)}
                title={`Click to copy ${shade}`}
              >
                {copiedHex === `shade-${index}` ? (
                  <Check
                    className="h-4 w-4 mx-auto"
                    style={{ color: getTextColor(shade) }}
                  />
                ) : (
                  <span
                    className="text-[10px] font-mono opacity-0 group-hover:opacity-100 transition-opacity block text-center"
                    style={{ color: getTextColor(shade) }}
                  >
                    {shade}
                  </span>
                )}
              </button>
            ))}
          </div>
          <div className="flex justify-between mt-2 text-xs text-muted-foreground px-1">
            <span>Lighter</span>
            <span>Base</span>
            <span>Darker</span>
          </div>
        </CardContent>
      </Card>

      {/* Contrast Checker */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Contrast className="h-5 w-5" />
            Contrast Checker
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2 pr-4 font-medium">Color</th>
                  <th className="text-left py-2 pr-4 font-medium">Swatch</th>
                  <th className="text-center py-2 px-2 font-medium">
                    vs White
                  </th>
                  <th className="text-center py-2 px-2 font-medium">
                    vs Black
                  </th>
                  <th className="text-center py-2 px-2 font-medium">WCAG</th>
                </tr>
              </thead>
              <tbody>
                {palette.map((color, index) => {
                  const whiteRatio = getContrastRatio(color.hex, "#ffffff");
                  const blackRatio = getContrastRatio(color.hex, "#000000");
                  const whiteWCAG = getWCAGLevel(whiteRatio);
                  const blackWCAG = getWCAGLevel(blackRatio);
                  const bestBg =
                    whiteRatio > blackRatio ? "white" : "black";
                  const bestRatio = Math.max(whiteRatio, blackRatio);
                  const bestWCAG = getWCAGLevel(bestRatio);

                  return (
                    <tr key={index} className="border-b last:border-0">
                      <td className="py-3 pr-4">
                        <span className="font-medium">{color.name}</span>
                        <br />
                        <span className="text-xs font-mono text-muted-foreground">
                          {color.hex}
                        </span>
                      </td>
                      <td className="py-3 pr-4">
                        <div
                          className="w-10 h-10 rounded-md border"
                          style={{ backgroundColor: color.hex }}
                        />
                      </td>
                      <td className="py-3 px-2 text-center">
                        <div className="flex flex-col items-center gap-1">
                          <span className="font-mono text-xs">
                            {whiteRatio.toFixed(2)}:1
                          </span>
                          <div className="flex gap-0.5">
                            {whiteWCAG.AA ? (
                              <Badge
                                variant="default"
                                className="text-[10px] px-1 py-0 bg-green-600 hover:bg-green-600"
                              >
                                AA
                              </Badge>
                            ) : (
                              <Badge
                                variant="secondary"
                                className="text-[10px] px-1 py-0 opacity-50"
                              >
                                AA
                              </Badge>
                            )}
                            {whiteWCAG.AAA ? (
                              <Badge
                                variant="default"
                                className="text-[10px] px-1 py-0 bg-green-600 hover:bg-green-600"
                              >
                                AAA
                              </Badge>
                            ) : (
                              <Badge
                                variant="secondary"
                                className="text-[10px] px-1 py-0 opacity-50"
                              >
                                AAA
                              </Badge>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-2 text-center">
                        <div className="flex flex-col items-center gap-1">
                          <span className="font-mono text-xs">
                            {blackRatio.toFixed(2)}:1
                          </span>
                          <div className="flex gap-0.5">
                            {blackWCAG.AA ? (
                              <Badge
                                variant="default"
                                className="text-[10px] px-1 py-0 bg-green-600 hover:bg-green-600"
                              >
                                AA
                              </Badge>
                            ) : (
                              <Badge
                                variant="secondary"
                                className="text-[10px] px-1 py-0 opacity-50"
                              >
                                AA
                              </Badge>
                            )}
                            {blackWCAG.AAA ? (
                              <Badge
                                variant="default"
                                className="text-[10px] px-1 py-0 bg-green-600 hover:bg-green-600"
                              >
                                AAA
                              </Badge>
                            ) : (
                              <Badge
                                variant="secondary"
                                className="text-[10px] px-1 py-0 opacity-50"
                              >
                                AAA
                              </Badge>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-2 text-center">
                        <div className="flex flex-col items-center gap-1">
                          <span className="text-xs text-muted-foreground">
                            Best on {bestBg}
                          </span>
                          <div className="flex gap-0.5">
                            {bestWCAG.AALarge && (
                              <Badge
                                variant="outline"
                                className="text-[10px] px-1 py-0"
                              >
                                AA-L
                              </Badge>
                            )}
                            {bestWCAG.AAALarge && (
                              <Badge
                                variant="outline"
                                className="text-[10px] px-1 py-0"
                              >
                                AAA-L
                              </Badge>
                            )}
                          </div>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Export Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Export Palette</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="css">
            <TabsList className="w-full grid grid-cols-3">
              <TabsTrigger value="css">CSS</TabsTrigger>
              <TabsTrigger value="scss">SCSS</TabsTrigger>
              <TabsTrigger value="json">JSON</TabsTrigger>
            </TabsList>

            <TabsContent value="css" className="space-y-3">
              <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm font-mono whitespace-pre">
                {cssOutput}
              </pre>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => copyExportContent(cssOutput, "css")}
                >
                  {copiedExport === "css" ? (
                    <>
                      <Check className="h-4 w-4 mr-1" /> Copied
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4 mr-1" /> Copy
                    </>
                  )}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => downloadContent(cssOutput, "color-palette.css")}
                >
                  <Download className="h-4 w-4 mr-1" /> Download
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="scss" className="space-y-3">
              <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm font-mono whitespace-pre">
                {scssOutput}
              </pre>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => copyExportContent(scssOutput, "scss")}
                >
                  {copiedExport === "scss" ? (
                    <>
                      <Check className="h-4 w-4 mr-1" /> Copied
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4 mr-1" /> Copy
                    </>
                  )}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    downloadContent(scssOutput, "color-palette.scss")
                  }
                >
                  <Download className="h-4 w-4 mr-1" /> Download
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="json" className="space-y-3">
              <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm font-mono whitespace-pre">
                {jsonOutput}
              </pre>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => copyExportContent(jsonOutput, "json")}
                >
                  {copiedExport === "json" ? (
                    <>
                      <Check className="h-4 w-4 mr-1" /> Copied
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4 mr-1" /> Copy
                    </>
                  )}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    downloadContent(jsonOutput, "color-palette.json")
                  }
                >
                  <Download className="h-4 w-4 mr-1" /> Download
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
