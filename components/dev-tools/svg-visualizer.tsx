"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, FileCode, Code } from "lucide-react";
import { CodeDisplay } from "./code-display";
import {
  parseSVGPath,
  optimizeSVGPath,
  validateSVGPath,
} from "@/lib/dev-tools/svg-optimizer";
import type { SVGOptimizeOptions } from "@/types/dev-tools";

interface SVGVisualizerProps {
  onVisualize?: (input: string, output: string) => void;
}

export function SVGVisualizer({ onVisualize }: SVGVisualizerProps) {
  const [input, setInput] = useState("");
  const [inputMode, setInputMode] = useState<"auto" | "path" | "document">("auto");
  const [scale, setScale] = useState(1);
  const [viewBox, setViewBox] = useState("0 0 100 100");
  const [parsedCommands, setParsedCommands] = useState<any>(null);
  const [optimizedPath, setOptimizedPath] = useState("");
  const [extractedPaths, setExtractedPaths] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [detectedMode, setDetectedMode] = useState<"path" | "document">("path");

  const optimizeOptions: SVGOptimizeOptions = {
    removeRedundant: true,
    roundDecimals: 2,
    convertToRelative: false,
  };

  // Detect input type
  useEffect(() => {
    if (!input.trim()) {
      setDetectedMode("path");
      return;
    }

    const trimmed = input.trim();
    if (trimmed.startsWith("<svg") || trimmed.startsWith("<?xml")) {
      setDetectedMode("document");
      extractPathsFromSVG(trimmed);
    } else {
      setDetectedMode("path");
    }
  }, [input]);

  // Parse or display based on mode
  useEffect(() => {
    if (input.trim()) {
      const mode = inputMode === "auto" ? detectedMode : inputMode;

      if (mode === "path") {
        handleParsePath();
      } else {
        handleDisplayDocument();
      }
    } else {
      setParsedCommands(null);
      setExtractedPaths([]);
      setError(null);
    }
  }, [input, inputMode, detectedMode]);

  const extractPathsFromSVG = (svgString: string) => {
    try {
      // Extract all path elements and their d attributes
      const pathRegex = /<path[^>]*\sd="([^"]*)"/gi;
      const paths: string[] = [];
      let match;

      while ((match = pathRegex.exec(svgString)) !== null) {
        if (match[1]) {
          paths.push(match[1]);
        }
      }

      setExtractedPaths(paths);
    } catch (error) {
      console.error("Failed to extract paths:", error);
      setExtractedPaths([]);
    }
  };

  const handleDisplayDocument = () => {
    setError(null);
    setParsedCommands(null);

    if (onVisualize) {
      onVisualize(input, "Complete SVG document");
    }
  };

  const handleParsePath = () => {
    setError(null);

    const validation = validateSVGPath(input);
    if (!validation.valid) {
      setError(validation.error || "Invalid path");
      setParsedCommands(null);
      return;
    }

    const result = parseSVGPath(input);
    if (result.error) {
      setError(result.error);
      setParsedCommands(null);
    } else {
      setParsedCommands(result);
      if (onVisualize) {
        onVisualize(input, JSON.stringify(result.commands));
      }
    }
  };

  const handleOptimize = () => {
    const mode = inputMode === "auto" ? detectedMode : inputMode;

    if (mode === "path") {
      const optimized = optimizeSVGPath(input, optimizeOptions);
      setOptimizedPath(optimized);
    } else if (extractedPaths.length > 0) {
      // Optimize all extracted paths
      const optimized = extractedPaths.map(path =>
        optimizeSVGPath(path, optimizeOptions)
      );
      setOptimizedPath(optimized.join("\n\n"));
    }
  };

  const loadExamplePath = () => {
    setInput("M10 10 L90 10 L90 90 L10 90 Z");
    setViewBox("0 0 100 100");
    setInputMode("path");
  };

  const loadExampleDocument = () => {
    const example = `<svg width="200" height="200" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#6EE7F9"/>
      <stop offset="100%" stop-color="#8B5CF6"/>
    </linearGradient>
  </defs>
  <rect width="200" height="200" rx="24" fill="url(#grad)" />
  <circle cx="100" cy="80" r="32" fill="white" opacity="0.9"/>
  <text x="100" y="145" text-anchor="middle" font-size="20" font-family="Arial" fill="white" font-weight="bold">SVG</text>
</svg>`;
    setInput(example);
    setInputMode("document");
  };

  const currentMode = inputMode === "auto" ? detectedMode : inputMode;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Left Column: Input & Controls */}
      <div className="space-y-6">
        <Card className="p-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>SVG Input</Label>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" onClick={loadExamplePath}>
                  <Code className="w-4 h-4 mr-1" />
                  Path
                </Button>
                <Button size="sm" variant="outline" onClick={loadExampleDocument}>
                  <FileCode className="w-4 h-4 mr-1" />
                  Document
                </Button>
              </div>
            </div>

            {/* Mode Selector */}
            <div className="flex items-center gap-2">
              <Label className="text-sm">Mode:</Label>
              <div className="flex gap-1">
                <Button
                  size="sm"
                  variant={inputMode === "auto" ? "default" : "outline"}
                  onClick={() => setInputMode("auto")}
                >
                  Auto
                </Button>
                <Button
                  size="sm"
                  variant={inputMode === "path" ? "default" : "outline"}
                  onClick={() => setInputMode("path")}
                >
                  Path Data
                </Button>
                <Button
                  size="sm"
                  variant={inputMode === "document" ? "default" : "outline"}
                  onClick={() => setInputMode("document")}
                >
                  Full SVG
                </Button>
              </div>
              {inputMode === "auto" && (
                <span className="text-xs text-muted-foreground ml-2">
                  Detected: {detectedMode === "path" ? "Path Data" : "Complete SVG"}
                </span>
              )}
            </div>

            <Textarea
              placeholder="Paste SVG code or path data..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="font-mono text-sm min-h-[200px]"
            />
          </div>

          {currentMode === "path" && (
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div>
                <Label htmlFor="viewBox">ViewBox</Label>
                <Input
                  id="viewBox"
                  value={viewBox}
                  onChange={(e) => setViewBox(e.target.value)}
                  placeholder="0 0 100 100"
                />
              </div>
              <div>
                <Label htmlFor="scale">Scale</Label>
                <Input
                  id="scale"
                  type="number"
                  step="0.1"
                  value={scale}
                  onChange={(e) => setScale(Number(e.target.value))}
                  placeholder="1"
                />
              </div>
            </div>
          )}

          <Button className="w-full mt-4" onClick={handleOptimize}>
            Optimize {currentMode === "path" ? "Path" : "Paths"}
          </Button>
        </Card>

        {/* Path Commands (Path Mode) */}
        {currentMode === "path" && parsedCommands && parsedCommands.commands && (
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">
              Commands ({parsedCommands.commands.length})
            </h3>
            <div className="space-y-2 max-h-[400px] overflow-auto">
              {parsedCommands.commands.map((cmd: any, i: number) => (
                <div key={i} className="p-3 bg-muted rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-mono font-bold text-primary">
                      {cmd.type}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {cmd.coordinates.join(", ")}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {cmd.explanation}
                  </p>
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* Extracted Paths (Document Mode) */}
        {currentMode === "document" && extractedPaths.length > 0 && (
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">
              Extracted Paths ({extractedPaths.length})
            </h3>
            <div className="space-y-2 max-h-[400px] overflow-auto">
              {extractedPaths.map((path, i) => (
                <div key={i} className="p-3 bg-muted rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold">Path {i + 1}</span>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        setInput(path);
                        setInputMode("path");
                      }}
                    >
                      Analyze
                    </Button>
                  </div>
                  <p className="text-xs font-mono text-muted-foreground break-all">
                    {path.slice(0, 100)}
                    {path.length > 100 ? "..." : ""}
                  </p>
                </div>
              ))}
            </div>
          </Card>
        )}
      </div>

      {/* Right Column: Preview & Output */}
      <div className="space-y-6">
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="w-4 h-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* SVG Preview */}
        {input && !error && (
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Preview</h3>
            <div className="bg-muted rounded-lg p-8 flex items-center justify-center min-h-[300px]">
              {currentMode === "document" ? (
                // Display complete SVG document
                <div
                  className="w-full h-full flex items-center justify-center"
                  style={{ transform: `scale(${scale})` }}
                  dangerouslySetInnerHTML={{ __html: input }}
                />
              ) : (
                // Display path only
                <svg
                  viewBox={viewBox}
                  className="w-full h-full max-w-md max-h-96"
                  style={{ transform: `scale(${scale})` }}
                >
                  <path
                    d={input}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                </svg>
              )}
            </div>
          </Card>
        )}

        {/* Optimized Output */}
        {optimizedPath && (
          <CodeDisplay
            code={
              currentMode === "path"
                ? `<!-- Original -->\n<path d="${input}" />\n\n<!-- Optimized -->\n<path d="${optimizedPath}" />`
                : `<!-- Optimized Path Data -->\n${optimizedPath}`
            }
            language="svg"
            filename={currentMode === "path" ? "path.svg" : "paths.txt"}
          />
        )}

        {/* Info Card */}
        {!input && (
          <Card className="p-12 text-center">
            <FileCode className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
            <p className="text-muted-foreground mb-4">
              Paste SVG code or path data to visualize
            </p>
            <div className="text-sm text-muted-foreground space-y-2">
              <p><strong>Path Data:</strong> M10 10 L90 90 Z</p>
              <p><strong>Complete SVG:</strong> &lt;svg&gt;...&lt;/svg&gt;</p>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
