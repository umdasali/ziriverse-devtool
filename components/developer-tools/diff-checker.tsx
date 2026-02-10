"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { GitCompare, Eye, SplitSquareVertical, RefreshCw, Copy } from "lucide-react";
import * as Diff from "diff";

interface DiffResult {
  added: number;
  removed: number;
  unchanged: number;
}

export function DiffChecker() {
  const [originalText, setOriginalText] = useState<string>("");
  const [modifiedText, setModifiedText] = useState<string>("");
  const [diffResult, setDiffResult] = useState<Diff.Change[]>([]);
  const [stats, setStats] = useState<DiffResult>({ added: 0, removed: 0, unchanged: 0 });
  const [viewMode, setViewMode] = useState<"split" | "unified">("split");

  // Calculate diff
  useEffect(() => {
    const changes = Diff.diffLines(originalText, modifiedText);
    setDiffResult(changes);

    // Calculate stats
    let added = 0;
    let removed = 0;
    let unchanged = 0;

    changes.forEach((change) => {
      const lines = change.value.split("\n").filter((line) => line).length;
      if (change.added) {
        added += lines;
      } else if (change.removed) {
        removed += lines;
      } else {
        unchanged += lines;
      }
    });

    setStats({ added, removed, unchanged });
  }, [originalText, modifiedText]);

  // Swap texts
  const swapTexts = () => {
    const temp = originalText;
    setOriginalText(modifiedText);
    setModifiedText(temp);
  };

  // Clear all
  const clearAll = () => {
    setOriginalText("");
    setModifiedText("");
  };

  // Load sample
  const loadSample = () => {
    setOriginalText(`function greet(name) {
  console.log("Hello, " + name);
  return true;
}

const user = "John";
greet(user);
`);
    setModifiedText(`function greet(name, greeting = "Hello") {
  console.log(greeting + ", " + name + "!");
  return { success: true, message: greeting };
}

const user = "Jane";
const result = greet(user, "Hi");
console.log(result);
`);
  };

  // Copy diff result
  const copyDiff = () => {
    const diffText = diffResult
      .map((change) => {
        const prefix = change.added ? "+ " : change.removed ? "- " : "  ";
        return change.value
          .split("\n")
          .filter((line) => line)
          .map((line) => prefix + line)
          .join("\n");
      })
      .join("\n");

    navigator.clipboard.writeText(diffText);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Diff Checker</h1>
          <p className="text-muted-foreground">
            Compare two text or code blocks line-by-line
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={loadSample}>
            Load Sample
          </Button>
          <Button variant="outline" onClick={swapTexts}>
            <RefreshCw className="w-4 h-4 mr-2" />
            Swap
          </Button>
          <Button variant="outline" onClick={clearAll}>
            Clear All
          </Button>
        </div>
      </div>

      {/* Stats */}
      <Card>
        <CardContent className="py-4">
          <div className="flex items-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <GitCompare className="w-4 h-4 text-muted-foreground" />
              <span className="font-medium">Comparison:</span>
            </div>
            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
              +{stats.added} added
            </Badge>
            <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
              -{stats.removed} removed
            </Badge>
            <Badge variant="outline">
              {stats.unchanged} unchanged
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Input Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Original Text</CardTitle>
            <CardDescription>{originalText.split("\n").length} lines</CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              value={originalText}
              onChange={(e) => setOriginalText(e.target.value)}
              placeholder="Paste original text here..."
              className="font-mono text-sm min-h-[400px] resize-none"
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Modified Text</CardTitle>
            <CardDescription>{modifiedText.split("\n").length} lines</CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              value={modifiedText}
              onChange={(e) => setModifiedText(e.target.value)}
              placeholder="Paste modified text here..."
              className="font-mono text-sm min-h-[400px] resize-none"
            />
          </CardContent>
        </Card>
      </div>

      {/* Diff Result */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Eye className="w-5 h-5" />
              Diff Result
            </CardTitle>
            <div className="flex gap-2">
              <Button size="sm" variant="outline" onClick={copyDiff}>
                <Copy className="w-4 h-4 mr-2" />
                Copy Diff
              </Button>
              <Tabs value={viewMode} onValueChange={(v: any) => setViewMode(v)}>
                <TabsList>
                  <TabsTrigger value="split">
                    <SplitSquareVertical className="w-4 h-4 mr-2" />
                    Split
                  </TabsTrigger>
                  <TabsTrigger value="unified">
                    <GitCompare className="w-4 h-4 mr-2" />
                    Unified
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {diffResult.length === 0 || (originalText === "" && modifiedText === "") ? (
            <div className="text-center py-16 text-muted-foreground">
              <GitCompare className="w-16 h-16 mx-auto mb-4 opacity-20" />
              <p>Enter text in both fields to see the diff</p>
            </div>
          ) : viewMode === "unified" ? (
            <UnifiedDiffView changes={diffResult} />
          ) : (
            <SplitDiffView original={originalText} modified={modifiedText} changes={diffResult} />
          )}
        </CardContent>
      </Card>

      {/* Legend */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Legend</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-green-100 border border-green-300 rounded"></div>
              <span>Added lines</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-red-100 border border-red-300 rounded"></div>
              <span>Removed lines</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-gray-50 border border-gray-200 rounded"></div>
              <span>Unchanged lines</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Unified diff view (like git diff)
function UnifiedDiffView({ changes }: { changes: Diff.Change[] }) {
  return (
    <div className="border rounded-lg overflow-hidden">
      <pre className="p-4 overflow-x-auto text-xs font-mono bg-muted/30">
        {changes.map((change, index) => {
          const lines = change.value.split("\n").filter((line) => line);
          return (
            <div key={index}>
              {lines.map((line, lineIndex) => (
                <div
                  key={`${index}-${lineIndex}`}
                  className={
                    change.added
                      ? "bg-green-100 text-green-900"
                      : change.removed
                      ? "bg-red-100 text-red-900"
                      : ""
                  }
                >
                  <span className="inline-block w-6 text-muted-foreground select-none">
                    {change.added ? "+" : change.removed ? "-" : " "}
                  </span>
                  {line}
                </div>
              ))}
            </div>
          );
        })}
      </pre>
    </div>
  );
}

// Split diff view (side-by-side)
function SplitDiffView({
  original,
  modified,
  changes,
}: {
  original: string;
  modified: string;
  changes: Diff.Change[];
}) {
  const originalLines = original.split("\n");
  const modifiedLines = modified.split("\n");

  return (
    <div className="grid grid-cols-2 gap-4 border rounded-lg overflow-hidden">
      {/* Original */}
      <div className="border-r">
        <div className="bg-muted px-4 py-2 border-b">
          <span className="text-sm font-medium">Original</span>
        </div>
        <pre className="p-4 overflow-x-auto text-xs font-mono min-h-[300px]">
          {originalLines.map((line, index) => {
            const isRemoved = changes.some(
              (change) =>
                change.removed && change.value.split("\n").includes(line)
            );
            return (
              <div
                key={index}
                className={isRemoved ? "bg-red-100 text-red-900" : ""}
              >
                <span className="inline-block w-8 text-muted-foreground select-none">
                  {index + 1}
                </span>
                {line}
              </div>
            );
          })}
        </pre>
      </div>

      {/* Modified */}
      <div>
        <div className="bg-muted px-4 py-2 border-b">
          <span className="text-sm font-medium">Modified</span>
        </div>
        <pre className="p-4 overflow-x-auto text-xs font-mono min-h-[300px]">
          {modifiedLines.map((line, index) => {
            const isAdded = changes.some(
              (change) =>
                change.added && change.value.split("\n").includes(line)
            );
            return (
              <div
                key={index}
                className={isAdded ? "bg-green-100 text-green-900" : ""}
              >
                <span className="inline-block w-8 text-muted-foreground select-none">
                  {index + 1}
                </span>
                {line}
              </div>
            );
          })}
        </pre>
      </div>
    </div>
  );
}
