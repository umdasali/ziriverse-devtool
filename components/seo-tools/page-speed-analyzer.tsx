"use client";

import { useState } from "react";
import {
  Search,
  Loader2,
  Gauge,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Globe,
  FileCode,
  ShieldCheck,
  Image as ImageIcon,
  FileText,
  Code,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type {
  PageSpeedResult,
  PageSpeedCheck,
} from "@/lib/seo-tools/page-speed-analyzer";

function getScoreColor(score: number): string {
  if (score >= 80) return "text-green-600";
  if (score >= 50) return "text-yellow-600";
  return "text-red-600";
}

function getScoreBgColor(score: number): string {
  if (score >= 80) return "bg-green-100 border-green-300";
  if (score >= 50) return "bg-yellow-100 border-yellow-300";
  return "bg-red-100 border-red-300";
}

function getScoreLabel(score: number): string {
  if (score >= 80) return "Good";
  if (score >= 50) return "Needs Improvement";
  return "Poor";
}

function getCheckIcon(status: PageSpeedCheck["status"]) {
  switch (status) {
    case "pass":
      return <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0" />;
    case "warning":
      return (
        <AlertTriangle className="h-5 w-5 text-yellow-600 flex-shrink-0" />
      );
    case "fail":
      return <XCircle className="h-5 w-5 text-red-600 flex-shrink-0" />;
  }
}

function getImpactBadge(impact: PageSpeedCheck["impact"]) {
  switch (impact) {
    case "high":
      return <Badge variant="destructive">High</Badge>;
    case "medium":
      return <Badge variant="secondary">Medium</Badge>;
    case "low":
      return <Badge variant="outline">Low</Badge>;
  }
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  const kb = bytes / 1024;
  if (kb < 1024) return `${kb.toFixed(1)} KB`;
  const mb = kb / 1024;
  return `${mb.toFixed(2)} MB`;
}

export function PageSpeedAnalyzerTool() {
  const [url, setUrl] = useState("");
  const [result, setResult] = useState<PageSpeedResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!url.trim()) return;

    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch("/api/page-speed", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: url.trim() }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to analyze page");
      }

      const data = await response.json();
      setResult(data.data);
    } catch (err: unknown) {
      setError(
        err instanceof Error ? err.message : "An unexpected error occurred"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header & Input */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Gauge className="h-5 w-5" />
            Page Speed Analyzer
          </CardTitle>
          <CardDescription>
            Analyze page performance, SEO basics, and resource usage
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAnalyze} className="flex gap-3">
            <div className="flex-1">
              <Label htmlFor="speed-url" className="sr-only">
                URL
              </Label>
              <Input
                id="speed-url"
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://example.com"
                disabled={isLoading}
              />
            </div>
            <Button type="submit" disabled={isLoading || !url.trim()}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Search className="mr-2 h-4 w-4" />
                  Analyze
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Loading State */}
      {isLoading && (
        <Card>
          <CardContent className="py-12">
            <div className="flex flex-col items-center justify-center gap-4">
              <Loader2 className="h-10 w-10 animate-spin text-muted-foreground" />
              <p className="text-sm text-muted-foreground">
                Analyzing page performance...
              </p>
              <div className="grid grid-cols-3 gap-4 w-full max-w-md">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="h-20 bg-muted animate-pulse rounded-lg"
                  />
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Error State */}
      {error && !isLoading && (
        <Card className="border-destructive">
          <CardContent className="py-6">
            <div className="flex items-center gap-3">
              <XCircle className="h-6 w-6 text-destructive flex-shrink-0" />
              <div>
                <p className="font-medium text-destructive">Analysis Failed</p>
                <p className="text-sm text-muted-foreground">{error}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Results */}
      {result && !isLoading && (
        <div className="space-y-6">
          {/* Score Card */}
          <Card>
            <CardContent className="py-6">
              <div className="flex flex-col sm:flex-row items-center gap-6">
                <div
                  className={`flex items-center justify-center w-28 h-28 rounded-full border-4 ${getScoreBgColor(result.score)}`}
                >
                  <div className="text-center">
                    <span
                      className={`text-3xl font-bold ${getScoreColor(result.score)}`}
                    >
                      {result.score}
                    </span>
                    <p className="text-xs text-muted-foreground">/100</p>
                  </div>
                </div>
                <div className="text-center sm:text-left">
                  <h3 className="text-xl font-semibold">
                    {getScoreLabel(result.score)}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {result.url}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-3">
                    <Badge
                      variant={result.score >= 80 ? "default" : "secondary"}
                      className={result.score >= 80 ? "bg-green-500" : ""}
                    >
                      Score: {result.score}
                    </Badge>
                    <Badge variant="outline">
                      {result.checks.filter((c) => c.status === "pass").length}{" "}
                      passed
                    </Badge>
                    {result.checks.filter((c) => c.status === "fail").length >
                      0 && (
                      <Badge variant="destructive">
                        {
                          result.checks.filter((c) => c.status === "fail")
                            .length
                        }{" "}
                        failed
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <Card>
              <CardContent className="py-4 text-center">
                <Loader2 className="h-5 w-5 mx-auto mb-2 text-muted-foreground" />
                <p className="text-lg font-semibold">{result.loadTime}ms</p>
                <p className="text-xs text-muted-foreground">Load Time</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="py-4 text-center">
                <FileCode className="h-5 w-5 mx-auto mb-2 text-muted-foreground" />
                <p className="text-lg font-semibold">
                  {formatBytes(result.htmlSize)}
                </p>
                <p className="text-xs text-muted-foreground">HTML Size</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="py-4 text-center">
                <ShieldCheck className="h-5 w-5 mx-auto mb-2 text-muted-foreground" />
                <p className="text-lg font-semibold">
                  {result.isHttps ? "Yes" : "No"}
                </p>
                <p className="text-xs text-muted-foreground">HTTPS</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="py-4 text-center">
                <Code className="h-5 w-5 mx-auto mb-2 text-muted-foreground" />
                <p className="text-lg font-semibold">
                  {result.resourceCounts.scripts}
                </p>
                <p className="text-xs text-muted-foreground">Scripts</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="py-4 text-center">
                <FileText className="h-5 w-5 mx-auto mb-2 text-muted-foreground" />
                <p className="text-lg font-semibold">
                  {result.resourceCounts.stylesheets}
                </p>
                <p className="text-xs text-muted-foreground">CSS Files</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="py-4 text-center">
                <ImageIcon className="h-5 w-5 mx-auto mb-2 text-muted-foreground" />
                <p className="text-lg font-semibold">
                  {result.resourceCounts.images}
                </p>
                <p className="text-xs text-muted-foreground">Images</p>
              </CardContent>
            </Card>
          </div>

          {/* Checks List */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Detailed Checks</CardTitle>
              <CardDescription>
                {result.checks.length} checks performed on {result.url}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {result.checks.map((check) => (
                  <div
                    key={check.id}
                    className="flex items-start gap-3 p-3 border rounded-lg"
                  >
                    {getCheckIcon(check.status)}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-medium text-sm">
                          {check.label}
                        </span>
                        {getImpactBadge(check.impact)}
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        {check.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
