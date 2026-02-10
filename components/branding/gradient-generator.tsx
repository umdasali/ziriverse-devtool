"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Copy, Plus, Trash2, Palette, Code, Check } from "lucide-react";
import { gradientPresets, type GradientPreset } from "@/lib/gradient-generator/presets";

interface ColorStop {
  id: string;
  color: string;
  position: number;
}

export function GradientGenerator() {
  const [gradientType, setGradientType] = useState<"linear" | "radial">("linear");
  const [angle, setAngle] = useState<number>(90);
  const [colorStops, setColorStops] = useState<ColorStop[]>([
    { id: "1", color: "#667eea", position: 0 },
    { id: "2", color: "#764ba2", position: 100 },
  ]);
  const [copied, setCopied] = useState(false);

  // Generate CSS gradient
  const generateCSS = (): string => {
    const stops = colorStops
      .sort((a, b) => a.position - b.position)
      .map((stop) => `${stop.color} ${stop.position}%`)
      .join(", ");

    if (gradientType === "linear") {
      return `linear-gradient(${angle}deg, ${stops})`;
    } else {
      return `radial-gradient(circle, ${stops})`;
    }
  };

  // Add color stop
  const addColorStop = () => {
    const newId = (Math.max(...colorStops.map((s) => parseInt(s.id))) + 1).toString();
    const newPosition = colorStops.length > 0 ? 50 : 0;
    setColorStops([...colorStops, { id: newId, color: "#000000", position: newPosition }]);
  };

  // Remove color stop
  const removeColorStop = (id: string) => {
    if (colorStops.length <= 2) return; // Keep at least 2 stops
    setColorStops(colorStops.filter((stop) => stop.id !== id));
  };

  // Update color stop
  const updateColorStop = (id: string, field: "color" | "position", value: string | number) => {
    setColorStops(
      colorStops.map((stop) =>
        stop.id === id ? { ...stop, [field]: value } : stop
      )
    );
  };

  // Load preset
  const loadPreset = (preset: GradientPreset) => {
    setGradientType(preset.type);
    setAngle(preset.angle);
    setColorStops(
      preset.colors.map((c, i) => ({
        id: (i + 1).toString(),
        color: c.color,
        position: c.position,
      }))
    );
  };

  // Copy CSS
  const copyCSS = () => {
    navigator.clipboard.writeText(`background: ${generateCSS()};`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const cssCode = `background: ${generateCSS()};`;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold mb-2">Gradient Generator</h1>
        <p className="text-muted-foreground">
          Create beautiful CSS gradients with visual editor
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column: Controls */}
        <div className="space-y-6">
          {/* Type & Direction */}
          <Card>
            <CardHeader>
              <CardTitle>Gradient Settings</CardTitle>
              <CardDescription>Configure type and direction</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Gradient Type</Label>
                <Select value={gradientType} onValueChange={(v: any) => setGradientType(v)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="linear">Linear</SelectItem>
                    <SelectItem value="radial">Radial</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {gradientType === "linear" && (
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label>Angle: {angle}°</Label>
                    <Badge variant="secondary">{getDirectionName(angle)}</Badge>
                  </div>
                  <Slider
                    value={[angle]}
                    onValueChange={([value]) => setAngle(value)}
                    min={0}
                    max={360}
                    step={1}
                  />
                  <div className="grid grid-cols-4 gap-2 text-xs">
                    <Button size="sm" variant="outline" onClick={() => setAngle(0)}>
                      0° ↑
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => setAngle(90)}>
                      90° →
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => setAngle(180)}>
                      180° ↓
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => setAngle(270)}>
                      270° ←
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Color Stops */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Color Stops</span>
                <Button size="sm" onClick={addColorStop}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Stop
                </Button>
              </CardTitle>
              <CardDescription>Add and customize gradient colors</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {colorStops
                .sort((a, b) => a.position - b.position)
                .map((stop) => (
                  <div key={stop.id} className="flex items-center gap-2">
                    <Input
                      type="color"
                      value={stop.color}
                      onChange={(e) => updateColorStop(stop.id, "color", e.target.value)}
                      className="w-16 h-10"
                    />
                    <Input
                      type="text"
                      value={stop.color}
                      onChange={(e) => updateColorStop(stop.id, "color", e.target.value)}
                      className="flex-1"
                      placeholder="#000000"
                    />
                    <div className="flex items-center gap-1 w-24">
                      <Input
                        type="number"
                        value={stop.position}
                        onChange={(e) =>
                          updateColorStop(stop.id, "position", parseInt(e.target.value) || 0)
                        }
                        min={0}
                        max={100}
                        className="w-16"
                      />
                      <span className="text-sm text-muted-foreground">%</span>
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => removeColorStop(stop.id)}
                      disabled={colorStops.length <= 2}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
            </CardContent>
          </Card>

          {/* Presets */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="w-5 h-5" />
                Gradient Presets
              </CardTitle>
              <CardDescription>Quick start with beautiful presets</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-2">
                {gradientPresets.map((preset) => (
                  <Button
                    key={preset.id}
                    variant="outline"
                    onClick={() => loadPreset(preset)}
                    className="h-auto p-0 overflow-hidden"
                  >
                    <div
                      className="w-full h-12"
                      style={{
                        background:
                          preset.type === "linear"
                            ? `linear-gradient(${preset.angle}deg, ${preset.colors
                                .map((c) => `${c.color} ${c.position}%`)
                                .join(", ")})`
                            : `radial-gradient(circle, ${preset.colors
                                .map((c) => `${c.color} ${c.position}%`)
                                .join(", ")})`,
                      }}
                    />
                    <span className="absolute inset-0 flex items-center justify-center bg-black/40 text-white text-xs font-medium opacity-0 hover:opacity-100 transition-opacity pointer-events-none">
                      {preset.name}
                    </span>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Preview & Code */}
        <div className="space-y-6">
          {/* Preview */}
          <Card>
            <CardHeader>
              <CardTitle>Preview</CardTitle>
            </CardHeader>
            <CardContent>
              <div
                className="w-full h-64 rounded-lg border-2"
                style={{ background: generateCSS() }}
              />
            </CardContent>
          </Card>

          {/* CSS Code */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Code className="w-5 h-5" />
                CSS Code
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <pre className="bg-muted p-4 rounded-md overflow-x-auto text-sm font-mono">
                {cssCode}
              </pre>
              <Button onClick={copyCSS} className="w-full">
                {copied ? (
                  <>
                    <Check className="w-4 h-4 mr-2" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 mr-2" />
                    Copy CSS
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Examples */}
          <Card>
            <CardHeader>
              <CardTitle>Usage Examples</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                <div>
                  <p className="font-medium mb-1">Background</p>
                  <code className="block bg-muted p-2 rounded text-xs">
                    .element {`{`} {cssCode} {`}`}
                  </code>
                </div>
                <div>
                  <p className="font-medium mb-1">Text Gradient</p>
                  <code className="block bg-muted p-2 rounded text-xs whitespace-pre-line">
                    {`.text {
  ${cssCode}
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}`}
                  </code>
                </div>
                <div>
                  <p className="font-medium mb-1">Border Gradient</p>
                  <code className="block bg-muted p-2 rounded text-xs whitespace-pre-line">
                    {`.border {
  border: 2px solid transparent;
  background: ${generateCSS()};
  background-clip: padding-box;
}`}
                  </code>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function getDirectionName(angle: number): string {
  if (angle === 0) return "Top";
  if (angle === 45) return "Top Right";
  if (angle === 90) return "Right";
  if (angle === 135) return "Bottom Right";
  if (angle === 180) return "Bottom";
  if (angle === 225) return "Bottom Left";
  if (angle === 270) return "Left";
  if (angle === 315) return "Top Left";
  return "Custom";
}
