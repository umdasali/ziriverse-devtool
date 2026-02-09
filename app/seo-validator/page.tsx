"use client";

import { useState, useEffect } from "react";
import { Search, Loader2, Sparkles, History, X } from "lucide-react";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { PlatformPreviews } from "@/components/seo-validator/platform-previews";
import { MetaDataDisplay } from "@/components/seo-validator/meta-data-display";
import { SEOScoreDashboard } from "@/components/seo-validator/seo-score-dashboard";
import { AdvancedAnalysis } from "@/components/seo-validator/advanced-analysis";
import { ExportReport } from "@/components/seo-validator/export-report";
import { validateAdvancedSEO } from "@/lib/seo-validator/meta-validator";
import { StructuredData } from "@/components/seo/structured-data";
import { generateToolSchema, generateWebPageSchema, generateBreadcrumbSchema } from "@/lib/seo";
import type { MetaTags, AdvancedSEOData, SEOHistory } from "@/types/seo";

export default function SEOValidatorPage() {
  const toolUrl = "https://ziriverse.com/seo-validator";
  const [url, setUrl] = useState("");
  const [metaTags, setMetaTags] = useState<MetaTags | null>(null);
  const [advancedData, setAdvancedData] = useState<AdvancedSEOData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [mode, setMode] = useState<"simple" | "advanced">("simple");
  const [history, setHistory] = useState<SEOHistory[]>([]);
  const [showHistory, setShowHistory] = useState(false);

  // Load history from localStorage
  useEffect(() => {
    const savedHistory = localStorage.getItem("seo-history");
    if (savedHistory) {
      try {
        setHistory(JSON.parse(savedHistory));
      } catch (e) {
        console.error("Failed to load history", e);
      }
    }
  }, []);

  // Save to history
  const saveToHistory = (url: string, data: AdvancedSEOData) => {
    const newEntry: SEOHistory = {
      id: Date.now().toString(),
      url,
      timestamp: Date.now(),
      score: data.seoScore.overall,
      data,
    };

    const updatedHistory = [newEntry, ...history].slice(0, 10); // Keep last 10
    setHistory(updatedHistory);
    localStorage.setItem("seo-history", JSON.stringify(updatedHistory));
  };

  // Load from history
  const loadFromHistory = (entry: SEOHistory) => {
    setUrl(entry.url);
    setAdvancedData(entry.data);
    setMetaTags(entry.data.metaTags);
    setMode("advanced");
    setShowHistory(false);
  };

  // Delete history entry
  const deleteHistoryEntry = (id: string) => {
    const updatedHistory = history.filter(entry => entry.id !== id);
    setHistory(updatedHistory);
    localStorage.setItem("seo-history", JSON.stringify(updatedHistory));
  };

  const handleFetch = async (e: React.FormEvent, advanced: boolean = false) => {
    e.preventDefault();
    if (!url) return;

    setIsLoading(true);
    setError(null);
    setMetaTags(null);
    setAdvancedData(null);

    try {
      if (advanced) {
        const response = await fetch("/api/analyze-seo", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ url }),
        });

        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.error || "Failed to analyze SEO");
        }

        const { data } = await response.json();
        setAdvancedData(data);
        setMetaTags(data.metaTags);
        saveToHistory(url, data);
      } else {
        const response = await fetch("/api/fetch-meta", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ url }),
        });

        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.error || "Failed to fetch meta tags");
        }

        const data = await response.json();
        setMetaTags(data.metaTags);
      }
    } catch (err: any) {
      setError(err.message || "Failed to fetch data");
    } finally {
      setIsLoading(false);
    }
  };

  const validation = advancedData
    ? validateAdvancedSEO(advancedData)
    : null;

  return (
    <>
      <StructuredData
        data={[
          generateToolSchema(
            "Advanced SEO Analyzer",
            "Comprehensive SEO analysis with 100+ data points including meta tags, content analysis, performance metrics, and search engine optimization recommendations",
            toolUrl
          ),
          generateWebPageSchema(
            "Advanced SEO Analyzer",
            "Analyze SEO with 100+ checkpoints and insights",
            toolUrl
          ),
          generateBreadcrumbSchema([
            { name: "Home", url: "https://ziriverse.com" },
            { name: "SEO Validator", url: toolUrl },
          ]),
        ]}
      />

      <div className="container py-8 space-y-8">
        {/* Header */}
        <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold">Advanced SEO Analyzer</h1>
          <p className="text-muted-foreground mt-2">
            Comprehensive SEO analysis with 100+ data points
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowHistory(!showHistory)}
          >
            <History className="mr-2 h-4 w-4" />
            History ({history.length})
          </Button>
        </div>
      </div>

      {/* History Panel */}
      {showHistory && history.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Recent Scans</CardTitle>
            <CardDescription>Your last 10 SEO analyses</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {history.map((entry) => (
                <div
                  key={entry.id}
                  className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="flex-1">
                    <div className="font-medium text-sm truncate">{entry.url}</div>
                    <div className="text-xs text-muted-foreground">
                      {new Date(entry.timestamp).toLocaleString()}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={entry.score >= 80 ? "default" : entry.score >= 60 ? "secondary" : "destructive"}>
                      {entry.score}/100
                    </Badge>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => loadFromHistory(entry)}
                    >
                      Load
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => deleteHistoryEntry(entry.id)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* URL Input */}
      <Card>
        <CardHeader>
          <CardTitle>Enter URL</CardTitle>
          <CardDescription>
            Choose between quick validation or comprehensive analysis
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={(e) => handleFetch(e, mode === "advanced")} className="space-y-4">
            <div className="flex gap-2">
              <div className="flex-1">
                <Label htmlFor="url" className="sr-only">
                  Website URL
                </Label>
                <Input
                  id="url"
                  type="url"
                  placeholder="https://example.com"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  disabled={isLoading}
                  required
                />
              </div>
              <Button type="submit" disabled={isLoading} variant={mode === "advanced" ? "default" : "secondary"}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    {mode === "advanced" ? <Sparkles className="mr-2 h-4 w-4" /> : <Search className="mr-2 h-4 w-4" />}
                    {mode === "advanced" ? "Deep Analyze" : "Quick Check"}
                  </>
                )}
              </Button>
            </div>

            <div className="flex items-center gap-4">
              <Button
                type="button"
                variant={mode === "simple" ? "default" : "outline"}
                size="sm"
                onClick={() => setMode("simple")}
              >
                Quick Check
              </Button>
              <Button
                type="button"
                variant={mode === "advanced" ? "default" : "outline"}
                size="sm"
                onClick={() => setMode("advanced")}
              >
                <Sparkles className="mr-2 h-4 w-4" />
                Advanced Analysis
              </Button>
              <p className="text-xs text-muted-foreground">
                {mode === "advanced"
                  ? "Comprehensive SEO analysis with 100+ data points"
                  : "Quick meta tag validation and social previews"}
              </p>
            </div>

            {error && (
              <p className="text-sm text-destructive">{error}</p>
            )}
          </form>
        </CardContent>
      </Card>

      {/* Results - Advanced Mode */}
      {advancedData && validation && mode === "advanced" && (
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="analysis">Analysis</TabsTrigger>
            <TabsTrigger value="meta">Meta Tags</TabsTrigger>
            <TabsTrigger value="previews">Previews</TabsTrigger>
            <TabsTrigger value="export">Export</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <SEOScoreDashboard score={advancedData.seoScore} />

            {/* Quick Issues */}
            {(validation.errors.length > 0 || validation.warnings.length > 0) && (
              <Card>
                <CardHeader>
                  <CardTitle>Issues Found</CardTitle>
                  <CardDescription>Critical issues and warnings</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  {validation.errors.map((error, i) => (
                    <div key={i} className="text-sm text-destructive flex items-start gap-2">
                      <span className="font-bold">ERROR:</span>
                      <span>{error}</span>
                    </div>
                  ))}
                  {validation.warnings.slice(0, 5).map((warning, i) => (
                    <div key={i} className="text-sm text-yellow-600 flex items-start gap-2">
                      <span className="font-bold">WARNING:</span>
                      <span>{warning}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Analysis Tab */}
          <TabsContent value="analysis">
            <AdvancedAnalysis data={advancedData} />
          </TabsContent>

          {/* Meta Tags Tab */}
          <TabsContent value="meta">
            <MetaDataDisplay metaTags={advancedData.metaTags} validation={validation} />
          </TabsContent>

          {/* Previews Tab */}
          <TabsContent value="previews">
            <Card>
              <CardHeader>
                <CardTitle>Platform Previews</CardTitle>
                <CardDescription>
                  See how your link appears on different platforms
                </CardDescription>
              </CardHeader>
              <CardContent>
                <PlatformPreviews metaTags={advancedData.metaTags} />
              </CardContent>
            </Card>
          </TabsContent>

          {/* Export Tab */}
          <TabsContent value="export">
            <ExportReport data={advancedData} validation={validation} url={url} />
          </TabsContent>
        </Tabs>
      )}

      {/* Results - Simple Mode */}
      {metaTags && !advancedData && (
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-1">
            <MetaDataDisplay metaTags={metaTags} validation={validation || { isValid: true, warnings: [], suggestions: [], errors: [], score: 100 }} />
          </div>
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Platform Previews</CardTitle>
                <CardDescription>
                  See how your link appears on different platforms
                </CardDescription>
              </CardHeader>
              <CardContent>
                <PlatformPreviews metaTags={metaTags} />
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {/* Features */}
      {!metaTags && !advancedData && (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mt-8">
          <Card>
            <CardHeader>
              <Badge variant="secondary" className="w-fit">100+ Checks</Badge>
              <CardTitle className="text-lg mt-2">Comprehensive Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Analyze meta tags, content, links, images, performance, security, and more
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Badge variant="secondary" className="w-fit">SEO Score</Badge>
              <CardTitle className="text-lg mt-2">Actionable Insights</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Get an overall SEO score with detailed breakdown and improvement suggestions
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Badge variant="secondary" className="w-fit">6 Platforms</Badge>
              <CardTitle className="text-lg mt-2">Social Previews</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Preview how your links appear on Facebook, Twitter, LinkedIn, Discord, and more
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Badge variant="secondary" className="w-fit">Export</Badge>
              <CardTitle className="text-lg mt-2">Report Generation</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Export detailed reports in JSON or CSV format for documentation and tracking
              </p>
            </CardContent>
          </Card>
        </div>
      )}
      </div>
    </>
  );
}
