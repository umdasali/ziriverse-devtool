"use client";

import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { CodeDisplay } from "./code-display";
import { testRegex } from "@/lib/dev-tools/regex-explainer";
import type { RegexInput } from "@/types/dev-tools";

interface RegexTesterProps {
  onTest?: (input: string, output: string) => void;
}

export function RegexTester({ onTest }: RegexTesterProps) {
  const [pattern, setPattern] = useState("");
  const [testString, setTestString] = useState("");
  const [replacement, setReplacement] = useState("");
  const [mode, setMode] = useState<"match" | "replace">("match");
  const [flags, setFlags] = useState({
    global: true,
    caseInsensitive: false,
    multiline: false,
    dotAll: false,
    unicode: false,
    sticky: false,
  });
  const [output, setOutput] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  // Auto-test on changes
  useEffect(() => {
    if (pattern && testString) {
      handleTest();
    } else {
      setOutput(null);
      setError(null);
    }
  }, [pattern, testString, flags, mode, replacement]);

  const handleTest = () => {
    setError(null);

    const input: RegexInput = {
      pattern,
      flags,
      testString,
      mode,
      replacement: mode === "replace" ? replacement : undefined,
    };

    const result = testRegex(input);
    if (result.error) {
      setError(result.error);
      setOutput(null);
    } else {
      setOutput(result);
      if (onTest) {
        onTest(pattern, JSON.stringify(result.matches));
      }
    }
  };

  const loadExample = () => {
    setPattern("\\d{3}-\\d{4}");
    setTestString("Call me at 123-4567 or 999-8888");
    setFlags({ ...flags, global: true });
  };

  const toggleFlag = (flag: keyof typeof flags) => {
    setFlags({ ...flags, [flag]: !flags[flag] });
  };

  // Highlight matches in test string
  const highlightMatches = () => {
    if (!output || !output.matches || output.matches.length === 0) {
      return testString;
    }

    const parts: React.ReactElement[] = [];
    let lastIndex = 0;

    output.matches.forEach((match: any, i: number) => {
      // Text before match
      if (match.index > lastIndex) {
        parts.push(
          <span key={`text-${i}`}>
            {testString.slice(lastIndex, match.index)}
          </span>
        );
      }

      // Matched text
      parts.push(
        <span key={`match-${i}`} className="bg-yellow-200 dark:bg-yellow-900">
          {match.match}
        </span>
      );

      lastIndex = match.index + match.length;
    });

    // Remaining text
    if (lastIndex < testString.length) {
      parts.push(<span key="text-end">{testString.slice(lastIndex)}</span>);
    }

    return parts;
  };

  return (
    <div className="grid grid-cols-1 gap-6">
      {/* Top Section: Pattern & Flags */}
      <Card className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>Regex Pattern</Label>
              <Button size="sm" variant="outline" onClick={loadExample}>
                Load Example
              </Button>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-mono">/</span>
              <Input
                value={pattern}
                onChange={(e) => setPattern(e.target.value)}
                placeholder="\d{3}-\d{4}"
                className="font-mono"
              />
              <span className="text-2xl font-mono">/</span>
              <span className="font-mono text-muted-foreground text-sm">
                {Object.entries(flags)
                  .filter(([_, v]) => v)
                  .map(([k]) => k[0])
                  .join("")}
              </span>
            </div>

            {/* Flags */}
            <div className="flex flex-wrap gap-2">
              {Object.entries(flags).map(([flag, value]) => (
                <Button
                  key={flag}
                  size="sm"
                  variant={value ? "default" : "outline"}
                  onClick={() => toggleFlag(flag as keyof typeof flags)}
                >
                  {flag[0].toUpperCase()} - {flag}
                </Button>
              ))}
            </div>
          </div>

          {/* Mode */}
          <div className="space-y-4">
            <Label>Mode</Label>
            <div className="flex gap-2">
              <Button
                variant={mode === "match" ? "default" : "outline"}
                onClick={() => setMode("match")}
              >
                Match
              </Button>
              <Button
                variant={mode === "replace" ? "default" : "outline"}
                onClick={() => setMode("replace")}
              >
                Replace
              </Button>
            </div>

            {mode === "replace" && (
              <div>
                <Label htmlFor="replacement">Replacement Text</Label>
                <Input
                  id="replacement"
                  value={replacement}
                  onChange={(e) => setReplacement(e.target.value)}
                  placeholder="Use $1, $2 for capture groups"
                />
              </div>
            )}
          </div>
        </div>
      </Card>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Test String */}
        <Card className="p-6 lg:col-span-2">
          <Label>Test String</Label>
          <Textarea
            value={testString}
            onChange={(e) => setTestString(e.target.value)}
            placeholder="Enter text to test against the pattern..."
            className="mt-2 min-h-[200px] font-mono text-sm"
          />

          {/* Highlighted Results */}
          {output && output.matches && output.matches.length > 0 && (
            <div className="mt-4">
              <Label>Matches Highlighted</Label>
              <div className="mt-2 p-4 bg-muted rounded-lg font-mono text-sm whitespace-pre-wrap">
                {highlightMatches()}
              </div>
            </div>
          )}

          {/* Replaced Text */}
          {mode === "replace" && output && output.replacedText && (
            <div className="mt-4">
              <Label>Replaced Text</Label>
              <div className="mt-2 p-4 bg-muted rounded-lg font-mono text-sm whitespace-pre-wrap">
                {output.replacedText}
              </div>
            </div>
          )}
        </Card>

        {/* Results Panel */}
        <div className="space-y-6">
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="w-4 h-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {/* Match Count */}
          {output && output.matches && (
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Matches</h3>
              <div className="flex items-center gap-2">
                <Badge variant="default" className="text-lg">
                  {output.matches.length}
                </Badge>
                <span className="text-sm text-muted-foreground">
                  {output.matches.length === 1 ? "match" : "matches"} found
                </span>
              </div>

              {output.matches.length > 0 && (
                <div className="mt-4 space-y-2 max-h-[300px] overflow-auto">
                  {output.matches.map((match: any, i: number) => (
                    <div key={i} className="p-2 bg-muted rounded text-sm">
                      <div className="font-mono font-semibold">
                        {match.match}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Index: {match.index}, Length: {match.length}
                      </div>
                      {match.groups && match.groups.length > 0 && (
                        <div className="text-xs text-muted-foreground">
                          Groups: {match.groups.join(", ")}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </Card>
          )}

          {/* Explanation */}
          {output && output.explanation && output.explanation.length > 0 && (
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Pattern Explanation</h3>
              <div className="space-y-2 max-h-[400px] overflow-auto">
                {output.explanation.map((exp: any, i: number) => (
                  <div key={i} className="p-2 bg-muted rounded text-sm">
                    <div className="font-mono font-semibold text-primary">
                      {exp.token}
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      {exp.explanation}
                    </div>
                    {exp.example && (
                      <div className="text-xs text-muted-foreground italic mt-1">
                        Ex: {exp.example}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
