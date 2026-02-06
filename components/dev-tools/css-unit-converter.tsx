"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { CodeDisplay } from "./code-display";
import { calculateCSSUnit, validateCSSInput } from "@/lib/dev-tools/css-calculator";
import type { CSSUnitInput } from "@/types/dev-tools";

interface CSSUnitConverterProps {
  onConvert?: (input: string, output: string) => void;
}

export function CSSUnitConverter({ onConvert }: CSSUnitConverterProps) {
  const [mode, setMode] = useState<"px-to-rem" | "clamp">("px-to-rem");

  // px-to-rem state
  const [pxValue, setPxValue] = useState(16);
  const [baseFontSize, setBaseFontSize] = useState(16);

  // clamp state
  const [minSize, setMinSize] = useState(16);
  const [maxSize, setMaxSize] = useState(32);
  const [minViewport, setMinViewport] = useState(320);
  const [maxViewport, setMaxViewport] = useState(1920);

  const [output, setOutput] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  // Auto-calculate on changes
  useEffect(() => {
    handleCalculate();
  }, [mode, pxValue, baseFontSize, minSize, maxSize, minViewport, maxViewport]);

  const handleCalculate = () => {
    setError(null);

    const input: CSSUnitInput = {
      mode,
      pxValue,
      baseFontSize,
      minSize,
      maxSize,
      minViewport,
      maxViewport,
    };

    const validation = validateCSSInput(input);
    if (!validation.valid) {
      setError(validation.error || "Invalid input");
      setOutput(null);
      return;
    }

    const result = calculateCSSUnit(input);
    if (result.result) {
      setOutput(result);
      if (onConvert) {
        onConvert(
          JSON.stringify(input),
          result.result
        );
      }
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Left Column: Controls */}
      <div className="space-y-6">
        <Card className="p-6">
          <Tabs value={mode} onValueChange={(v) => setMode(v as any)}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="px-to-rem">px to rem</TabsTrigger>
              <TabsTrigger value="clamp">clamp()</TabsTrigger>
            </TabsList>

            <TabsContent value="px-to-rem" className="space-y-4 mt-4">
              <div>
                <Label htmlFor="px">Pixel Value</Label>
                <Input
                  id="px"
                  type="number"
                  value={pxValue}
                  onChange={(e) => setPxValue(Number(e.target.value))}
                  placeholder="16"
                />
              </div>

              <div>
                <Label htmlFor="base">Base Font Size (px)</Label>
                <Input
                  id="base"
                  type="number"
                  value={baseFontSize}
                  onChange={(e) => setBaseFontSize(Number(e.target.value))}
                  placeholder="16"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Default browser font size is 16px
                </p>
              </div>
            </TabsContent>

            <TabsContent value="clamp" className="space-y-4 mt-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="minSize">Min Size (px)</Label>
                  <Input
                    id="minSize"
                    type="number"
                    value={minSize}
                    onChange={(e) => setMinSize(Number(e.target.value))}
                    placeholder="16"
                  />
                </div>
                <div>
                  <Label htmlFor="maxSize">Max Size (px)</Label>
                  <Input
                    id="maxSize"
                    type="number"
                    value={maxSize}
                    onChange={(e) => setMaxSize(Number(e.target.value))}
                    placeholder="32"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="minVp">Min Viewport (px)</Label>
                  <Input
                    id="minVp"
                    type="number"
                    value={minViewport}
                    onChange={(e) => setMinViewport(Number(e.target.value))}
                    placeholder="320"
                  />
                </div>
                <div>
                  <Label htmlFor="maxVp">Max Viewport (px)</Label>
                  <Input
                    id="maxVp"
                    type="number"
                    value={maxViewport}
                    onChange={(e) => setMaxViewport(Number(e.target.value))}
                    placeholder="1920"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="baseClamp">Base Font Size (px)</Label>
                <Input
                  id="baseClamp"
                  type="number"
                  value={baseFontSize}
                  onChange={(e) => setBaseFontSize(Number(e.target.value))}
                  placeholder="16"
                />
              </div>
            </TabsContent>
          </Tabs>
        </Card>

        {/* Explanation */}
        {output && output.explanation && (
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-2">Explanation</h3>
            <p className="text-sm text-muted-foreground">{output.explanation}</p>
          </Card>
        )}
      </div>

      {/* Right Column: Output */}
      <div className="space-y-6">
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="w-4 h-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {output && (
          <>
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Result</h3>
              <div className="bg-muted p-4 rounded-lg font-mono text-lg">
                {output.result}
              </div>
              {output.formula && (
                <p className="text-xs text-muted-foreground mt-2">
                  {output.formula}
                </p>
              )}
            </Card>

            {/* Preview sizes for clamp */}
            {output.previewSizes && (
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Responsive Preview</h3>
                <div className="space-y-2">
                  {output.previewSizes.map(
                    (preview: { viewport: number; size: number }) => (
                      <div
                        key={preview.viewport}
                        className="flex items-center justify-between p-2 bg-muted rounded"
                      >
                        <span className="text-sm font-medium">
                          {preview.viewport}px viewport
                        </span>
                        <span
                          className="text-sm"
                          style={{ fontSize: `${Math.min(preview.size, 24)}px` }}
                        >
                          {preview.size}px
                        </span>
                      </div>
                    )
                  )}
                </div>
              </Card>
            )}

            {/* CSS Output */}
            <CodeDisplay
              code={`/* CSS Variable */\n--font-size: ${output.result};\n\n/* Direct Usage */\nfont-size: ${output.result};`}
              language="css"
              filename="styles.css"
            />
          </>
        )}
      </div>
    </div>
  );
}
