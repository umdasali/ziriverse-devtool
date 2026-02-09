"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Code2,
  History,
  FileJson,
  Ruler,
  Shapes,
  Search,
  Sparkles,
  Zap,
  Shield,
  Layers,
} from "lucide-react";

// Tool components
import { JSONToTypeScript } from "@/components/dev-tools/json-to-typescript";
import { CSSUnitConverter } from "@/components/dev-tools/css-unit-converter";
import { SVGVisualizer } from "@/components/dev-tools/svg-visualizer";
import { RegexTester } from "@/components/dev-tools/regex-tester";
import { ToolHistoryPanel } from "@/components/dev-tools/tool-history-panel";
import { StructuredData } from "@/components/seo/structured-data";
import { generateToolSchema, generateWebPageSchema, generateBreadcrumbSchema } from "@/lib/seo";

import type { ToolHistoryEntry } from "@/types/dev-tools";

const HISTORY_KEY = "dev-tools-history";
const MAX_HISTORY = 20;

export default function DevToolsPage() {
  const toolUrl = "https://ziriverse.com/dev-tools";
  const [activeTab, setActiveTab] = useState<ToolHistoryEntry["tool"]>("json-to-ts");
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory] = useState<ToolHistoryEntry[]>([]);

  // Load history from localStorage
  useEffect(() => {
    const saved = localStorage.getItem(HISTORY_KEY);
    if (saved) {
      try {
        setHistory(JSON.parse(saved));
      } catch (error) {
        console.error("Failed to load history:", error);
      }
    }
  }, []);

  // Save history to localStorage
  const saveHistory = (newHistory: ToolHistoryEntry[]) => {
    localStorage.setItem(HISTORY_KEY, JSON.stringify(newHistory));
    setHistory(newHistory);
  };

  // Add entry to history
  const addToHistory = (
    tool: ToolHistoryEntry["tool"],
    input: string,
    output: string,
    metadata?: Record<string, any>
  ) => {
    const entry: ToolHistoryEntry = {
      id: Date.now().toString(),
      tool,
      timestamp: Date.now(),
      input,
      output,
      metadata,
    };

    const newHistory = [entry, ...history].slice(0, MAX_HISTORY);
    saveHistory(newHistory);
  };

  // Load history entry
  const loadHistoryEntry = (entry: ToolHistoryEntry) => {
    setActiveTab(entry.tool);
    setShowHistory(false);
    // Note: Individual tools need to handle loading their own state
    // This could be improved with a more sophisticated state management approach
  };

  // Delete history entry
  const deleteHistoryEntry = (id: string) => {
    const newHistory = history.filter((entry) => entry.id !== id);
    saveHistory(newHistory);
  };

  return (
    <>
      <StructuredData
        data={[
          generateToolSchema(
            "Developer Tools",
            "Essential utilities for modern web development including JSON to TypeScript converter, CSS unit converter, SVG visualizer, and regex tester with real-time processing",
            toolUrl
          ),
          generateWebPageSchema(
            "Developer Tools",
            "Essential web development utilities",
            toolUrl
          ),
          generateBreadcrumbSchema([
            { name: "Home", url: "https://ziriverse.com" },
            { name: "Developer Tools", url: toolUrl },
          ]),
        ]}
      />

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-primary/10 rounded-lg">
            <Code2 className="w-8 h-8 text-primary" />
          </div>
          <div>
            <h1 className="text-4xl font-bold">Developer Tools</h1>
            <p className="text-muted-foreground mt-1">
              Essential utilities for modern web development
            </p>
          </div>
        </div>
        <Button
          variant="outline"
          onClick={() => setShowHistory(!showHistory)}
          className="flex items-center gap-2"
        >
          <History className="w-4 h-4" />
          History
          {history.length > 0 && (
            <Badge variant="secondary">{history.length}</Badge>
          )}
        </Button>
      </div>

      {/* History Panel */}
      {showHistory && (
        <ToolHistoryPanel
          history={history}
          onLoad={loadHistoryEntry}
          onDelete={deleteHistoryEntry}
          onClose={() => setShowHistory(false)}
        />
      )}

      {/* Feature Showcase */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card className="p-6 text-center">
          <FileJson className="w-8 h-8 mx-auto mb-2 text-blue-500" />
          <h3 className="font-semibold mb-1">JSON to TypeScript</h3>
          <p className="text-xs text-muted-foreground">
            Generate type-safe interfaces
          </p>
        </Card>

        <Card className="p-6 text-center">
          <Ruler className="w-8 h-8 mx-auto mb-2 text-green-500" />
          <h3 className="font-semibold mb-1">CSS Unit Converter</h3>
          <p className="text-xs text-muted-foreground">
            px to rem + fluid clamp()
          </p>
        </Card>

        <Card className="p-6 text-center">
          <Shapes className="w-8 h-8 mx-auto mb-2 text-purple-500" />
          <h3 className="font-semibold mb-1">SVG Visualizer</h3>
          <p className="text-xs text-muted-foreground">
            Parse, optimize, and preview
          </p>
        </Card>

        <Card className="p-6 text-center">
          <Search className="w-8 h-8 mx-auto mb-2 text-orange-500" />
          <h3 className="font-semibold mb-1">Regex Tester</h3>
          <p className="text-xs text-muted-foreground">
            Test patterns with explanations
          </p>
        </Card>
      </div>

      {/* Main Tools Tabs */}
      <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as any)}>
        <TabsList className="grid w-full grid-cols-4 mb-8">
          <TabsTrigger value="json-to-ts" className="flex items-center gap-2">
            <FileJson className="w-4 h-4" />
            <span className="hidden sm:inline">JSON → TS</span>
          </TabsTrigger>
          <TabsTrigger value="css-converter" className="flex items-center gap-2">
            <Ruler className="w-4 h-4" />
            <span className="hidden sm:inline">CSS Units</span>
          </TabsTrigger>
          <TabsTrigger value="svg-visualizer" className="flex items-center gap-2">
            <Shapes className="w-4 h-4" />
            <span className="hidden sm:inline">SVG Path</span>
          </TabsTrigger>
          <TabsTrigger value="regex-tester" className="flex items-center gap-2">
            <Search className="w-4 h-4" />
            <span className="hidden sm:inline">Regex</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="json-to-ts">
          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-2">JSON to TypeScript</h2>
            <p className="text-muted-foreground">
              Convert JSON objects into TypeScript interfaces or type aliases with
              customizable options
            </p>
          </div>
          <JSONToTypeScript
            onGenerate={(input, output) =>
              addToHistory("json-to-ts", input, output)
            }
          />
        </TabsContent>

        <TabsContent value="css-converter">
          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-2">CSS Unit Converter</h2>
            <p className="text-muted-foreground">
              Convert pixels to rem units and generate fluid clamp() functions for
              responsive typography
            </p>
          </div>
          <CSSUnitConverter
            onConvert={(input, output) =>
              addToHistory("css-converter", input, output)
            }
          />
        </TabsContent>

        <TabsContent value="svg-visualizer">
          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-2">SVG Path Visualizer</h2>
            <p className="text-muted-foreground">
              Visualize SVG path commands, understand their structure, and optimize
              for production
            </p>
          </div>
          <SVGVisualizer
            onVisualize={(input, output) =>
              addToHistory("svg-visualizer", input, output)
            }
          />
        </TabsContent>

        <TabsContent value="regex-tester">
          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-2">Regular Expression Tester</h2>
            <p className="text-muted-foreground">
              Test regex patterns, visualize matches, and get detailed explanations
              for each token
            </p>
          </div>
          <RegexTester
            onTest={(input, output) =>
              addToHistory("regex-tester", input, output)
            }
          />
        </TabsContent>
      </Tabs>

      {/* Features Grid */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6">
          <Sparkles className="w-8 h-8 mb-3 text-primary" />
          <h3 className="font-semibold mb-2">Real-time Processing</h3>
          <p className="text-sm text-muted-foreground">
            Instant feedback as you type with automatic validation and error
            detection
          </p>
        </Card>

        <Card className="p-6">
          <Zap className="w-8 h-8 mb-3 text-primary" />
          <h3 className="font-semibold mb-2">Client-side Processing</h3>
          <p className="text-sm text-muted-foreground">
            All processing happens in your browser - your data never leaves your
            device
          </p>
        </Card>

        <Card className="p-6">
          <Shield className="w-8 h-8 mb-3 text-primary" />
          <h3 className="font-semibold mb-2">Privacy First</h3>
          <p className="text-sm text-muted-foreground">
            No server uploads, no tracking, no data collection - completely private
          </p>
        </Card>

        <Card className="p-6">
          <Layers className="w-8 h-8 mb-3 text-primary" />
          <h3 className="font-semibold mb-2">Export & History</h3>
          <p className="text-sm text-muted-foreground">
            Copy to clipboard, download files, and access your last 20 operations
          </p>
        </Card>
      </div>

      {/* Quick Tips */}
      <Card className="mt-8 p-6 bg-muted/50">
        <h3 className="font-semibold mb-3">Quick Tips</h3>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li>
            <strong>JSON to TypeScript:</strong> Use the "Load Example" button to
            see how nested objects are converted
          </li>
          <li>
            <strong>CSS Converter:</strong> The clamp() function creates fluid
            typography that scales smoothly between breakpoints
          </li>
          <li>
            <strong>SVG Visualizer:</strong> Paths must start with an M (move)
            command to be valid
          </li>
          <li>
            <strong>Regex Tester:</strong> Enable the "global" flag to find all
            matches instead of just the first one
          </li>
        </ul>
      </Card>
      </div>
    </>
  );
}
