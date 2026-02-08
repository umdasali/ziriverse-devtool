"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Copy,
  Check,
  Trash2,
  Download,
  FileCode,
  ArrowDown,
  Sparkles,
} from "lucide-react";
import {
  minifyCSS,
  minifyHTML,
  minifyJS,
  type MinifyResult,
} from "@/lib/developer-tools/minifier";

const SAMPLES: Record<string, string> = {
  html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Sample Page</title>
</head>
<body>
  <!-- Main content -->
  <header>
    <nav>
      <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/about">About</a></li>
        <li><a href="/contact">Contact</a></li>
      </ul>
    </nav>
  </header>

  <main>
    <h1>Welcome to My Site</h1>
    <p>This is a sample HTML page for testing the minifier.</p>

    <section>
      <h2>Features</h2>
      <ul>
        <li>Fast loading</li>
        <li>Responsive design</li>
        <li>Accessible</li>
      </ul>
    </section>
  </main>

  <footer>
    <p>&copy; 2026 My Website. All rights reserved.</p>
  </footer>
</body>
</html>`,
  css: `/* Main Styles */
:root {
  --primary-color: #3b82f6;
  --secondary-color: #64748b;
  --background: #ffffff;
  --text-color: #1e293b;
  --border-radius: 8px;
}

/* Reset */
*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: 'Inter', system-ui, sans-serif;
  font-size: 16px;
  line-height: 1.6;
  color: var(--text-color);
  background-color: var(--background);
}

/* Typography */
h1, h2, h3, h4, h5, h6 {
  font-weight: 700;
  line-height: 1.2;
  margin-bottom: 0.5em;
}

h1 { font-size: 2.5rem; }
h2 { font-size: 2rem; }
h3 { font-size: 1.5rem; }

/* Buttons */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.625rem 1.25rem;
  font-size: 0.875rem;
  font-weight: 500;
  border: none;
  border-radius: var(--border-radius);
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-primary {
  background-color: var(--primary-color);
  color: #ffffff;
}

.btn-primary:hover {
  opacity: 0.9;
  transform: translateY(-1px);
}`,
  javascript: `// Utility Functions

/**
 * Debounce function to limit execution rate
 * @param {Function} func - The function to debounce
 * @param {number} wait - Delay in milliseconds
 * @returns {Function} Debounced function
 */
function debounce(func, wait) {
  let timeout = null;

  return function (...args) {
    if (timeout) {
      clearTimeout(timeout);
    }

    timeout = setTimeout(() => {
      func.apply(this, args);
    }, wait);
  };
}

// Format bytes to human-readable string
function formatBytes(bytes, decimals = 2) {
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB"];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
}

// Simple event emitter
class EventEmitter {
  constructor() {
    this.events = {};
  }

  on(event, listener) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(listener);
    return this;
  }

  emit(event, ...args) {
    const listeners = this.events[event];
    if (listeners) {
      listeners.forEach((listener) => {
        listener.apply(this, args);
      });
    }
    return this;
  }

  off(event, listener) {
    const listeners = this.events[event];
    if (listeners) {
      this.events[event] = listeners.filter((l) => l !== listener);
    }
    return this;
  }
}`,
};

function formatBytes(bytes: number): string {
  if (bytes === 0) return "0 B";
  if (bytes < 1024) return `${bytes} B`;
  const kb = bytes / 1024;
  return `${kb.toFixed(1)} KB`;
}

export function MinifierTool() {
  const [input, setInput] = useState("");
  const [language, setLanguage] = useState<"html" | "css" | "javascript">("html");
  const [copied, setCopied] = useState(false);

  const result: MinifyResult | null = useMemo(() => {
    if (!input.trim()) return null;

    switch (language) {
      case "html":
        return minifyHTML(input);
      case "css":
        return minifyCSS(input);
      case "javascript":
        return minifyJS(input);
      default:
        return null;
    }
  }, [input, language]);

  const handleCopy = async () => {
    if (!result?.output) return;
    await navigator.clipboard.writeText(result.output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    if (!result?.output) return;

    const extensions: Record<string, string> = {
      html: "html",
      css: "css",
      javascript: "js",
    };

    const blob = new Blob([result.output], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `minified.${extensions[language]}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleLoadSample = () => {
    setInput(SAMPLES[language]);
  };

  const handleClear = () => {
    setInput("");
  };

  const handleLanguageChange = (value: string) => {
    setLanguage(value as "html" | "css" | "javascript");
    setInput("");
  };

  return (
    <div className="space-y-6">
      {/* Language Selector */}
      <Tabs value={language} onValueChange={handleLanguageChange}>
        <TabsList className="grid w-full grid-cols-3 max-w-sm">
          <TabsTrigger value="html">HTML</TabsTrigger>
          <TabsTrigger value="css">CSS</TabsTrigger>
          <TabsTrigger value="javascript">JavaScript</TabsTrigger>
        </TabsList>

        <TabsContent value={language} className="mt-4">
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Input Panel */}
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base flex items-center gap-2">
                    <FileCode className="h-4 w-4" />
                    {language.toUpperCase()} Input
                  </CardTitle>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={handleLoadSample}>
                      <Sparkles className="h-3.5 w-3.5 mr-1" />
                      Load Sample
                    </Button>
                    <Button variant="outline" size="sm" onClick={handleClear}>
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={`Paste your ${language.toUpperCase()} code here...`}
                  className="w-full h-[400px] font-mono text-sm bg-muted p-4 rounded-lg border-0 resize-none focus:outline-none focus:ring-2 focus:ring-ring"
                  spellCheck={false}
                />
                {input && (
                  <div className="mt-2 text-xs text-muted-foreground">
                    {input.length} characters
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Output Panel */}
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base flex items-center gap-2">
                    <ArrowDown className="h-4 w-4" />
                    Minified Output
                  </CardTitle>
                  {result && (
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleCopy}
                        disabled={!result.output}
                      >
                        {copied ? (
                          <Check className="h-3.5 w-3.5 mr-1" />
                        ) : (
                          <Copy className="h-3.5 w-3.5 mr-1" />
                        )}
                        {copied ? "Copied" : "Copy"}
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleDownload}
                        disabled={!result.output}
                      >
                        <Download className="h-3.5 w-3.5 mr-1" />
                        Download
                      </Button>
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <pre className="bg-muted p-4 rounded-lg overflow-auto h-[400px] text-sm font-mono whitespace-pre-wrap break-all">
                  <code>
                    {result?.output || "Minified output will appear here..."}
                  </code>
                </pre>

                {/* Stats */}
                {result && (
                  <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <div className="bg-muted rounded-lg p-3 text-center">
                      <div className="text-xs text-muted-foreground mb-1">
                        Original
                      </div>
                      <div className="text-sm font-semibold">
                        {formatBytes(result.originalSize)}
                      </div>
                    </div>
                    <div className="bg-muted rounded-lg p-3 text-center">
                      <div className="text-xs text-muted-foreground mb-1">
                        Minified
                      </div>
                      <div className="text-sm font-semibold">
                        {formatBytes(result.minifiedSize)}
                      </div>
                    </div>
                    <div className="bg-muted rounded-lg p-3 text-center">
                      <div className="text-xs text-muted-foreground mb-1">
                        Saved
                      </div>
                      <div className="text-sm font-semibold">
                        {formatBytes(result.savings)}
                      </div>
                    </div>
                    <div className="bg-muted rounded-lg p-3 text-center">
                      <div className="text-xs text-muted-foreground mb-1">
                        Reduction
                      </div>
                      <Badge
                        variant="secondary"
                        className={
                          result.savingsPercent > 0
                            ? "bg-green-500/10 text-green-600 border-green-500/20"
                            : ""
                        }
                      >
                        {result.savingsPercent.toFixed(1)}%
                      </Badge>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
