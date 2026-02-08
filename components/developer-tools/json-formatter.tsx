"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Copy, Download, Check, Trash2, FileJson } from "lucide-react";
import { formatJSON, minifyJSON } from "@/lib/developer-tools/json-formatter";

const SAMPLE_JSON = `{
  "name": "John Doe",
  "age": 30,
  "email": "john@example.com",
  "address": {
    "street": "123 Main St",
    "city": "Springfield",
    "state": "IL"
  },
  "hobbies": ["reading", "coding", "gaming"],
  "isActive": true
}`;

export function JSONFormatterTool() {
  const [input, setInput] = useState("");
  const [indent, setIndent] = useState(2);
  const [copied, setCopied] = useState(false);

  const result = input ? formatJSON(input, indent) : null;
  const minified = input ? minifyJSON(input) : null;

  const handleCopy = async (text: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = (content: string, filename: string) => {
    const blob = new Blob([content], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {/* Input */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base">Input JSON</CardTitle>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => setInput(SAMPLE_JSON)}>
                <FileJson className="h-3.5 w-3.5 mr-1" />
                Sample
              </Button>
              <Button variant="outline" size="sm" onClick={() => setInput("")}>
                <Trash2 className="h-3.5 w-3.5 mr-1" />
                Clear
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Paste your JSON here..."
            className="w-full h-[400px] font-mono text-sm bg-muted p-4 rounded-lg border-0 resize-none focus:outline-none focus:ring-2 focus:ring-ring"
            spellCheck={false}
          />
          {result && !result.isValid && (
            <div className="mt-2 p-3 bg-destructive/10 text-destructive text-sm rounded-lg">
              {result.error}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Output */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base">Output</CardTitle>
            {result?.isValid && (
              <div className="flex items-center gap-2">
                <Badge variant="secondary">{result.stats.keys} keys</Badge>
                <Badge variant="secondary">Depth: {result.stats.depth}</Badge>
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="formatted">
            <TabsList className="grid w-full grid-cols-2 mb-3">
              <TabsTrigger value="formatted">Formatted</TabsTrigger>
              <TabsTrigger value="minified">Minified</TabsTrigger>
            </TabsList>

            <TabsContent value="formatted">
              <div className="relative">
                <div className="flex items-center gap-2 mb-2">
                  <label className="text-xs text-muted-foreground">Indent:</label>
                  {[2, 4].map((n) => (
                    <Button
                      key={n}
                      variant={indent === n ? "default" : "outline"}
                      size="sm"
                      className="h-6 px-2 text-xs"
                      onClick={() => setIndent(n)}
                    >
                      {n} spaces
                    </Button>
                  ))}
                </div>
                <pre className="bg-muted p-4 rounded-lg overflow-auto max-h-[350px] text-xs font-mono">
                  <code>{result?.formatted || "Output will appear here..."}</code>
                </pre>
                {result?.isValid && (
                  <div className="absolute top-10 right-2 flex gap-1">
                    <Button size="sm" variant="secondary" onClick={() => handleCopy(result.formatted)}>
                      {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                    </Button>
                    <Button size="sm" variant="secondary" onClick={() => handleDownload(result.formatted, "formatted.json")}>
                      <Download className="h-3 w-3" />
                    </Button>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="minified">
              <div className="relative">
                <pre className="bg-muted p-4 rounded-lg overflow-auto max-h-[380px] text-xs font-mono break-all whitespace-pre-wrap">
                  <code>{minified?.formatted || "Output will appear here..."}</code>
                </pre>
                {minified?.isValid && (
                  <div className="absolute top-2 right-2 flex gap-1">
                    <Button size="sm" variant="secondary" onClick={() => handleCopy(minified.formatted)}>
                      {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                    </Button>
                    <Button size="sm" variant="secondary" onClick={() => handleDownload(minified.formatted, "minified.json")}>
                      <Download className="h-3 w-3" />
                    </Button>
                  </div>
                )}
              </div>
              {result?.isValid && minified?.isValid && (
                <p className="text-xs text-muted-foreground mt-2">
                  Saved {result.stats.size - minified.stats.size} bytes ({Math.round((1 - minified.stats.size / result.stats.size) * 100)}% smaller)
                </p>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
