"use client";

import { useState } from "react";
import { Search, Loader2 } from "lucide-react";
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
import { PlatformPreviews } from "@/components/seo-validator/platform-previews";
import { MetaDataDisplay } from "@/components/seo-validator/meta-data-display";
import { validateMetaTags } from "@/lib/seo-validator/meta-validator";
import type { MetaTags } from "@/types/seo";

export default function SEOValidatorPage() {
  const [url, setUrl] = useState("");
  const [metaTags, setMetaTags] = useState<MetaTags | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFetch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;

    setIsLoading(true);
    setError(null);
    setMetaTags(null);

    try {
      const response = await fetch("/api/fetch-meta", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to fetch meta tags");
      }

      const data = await response.json();
      setMetaTags(data.metaTags);
    } catch (err: any) {
      setError(err.message || "Failed to fetch meta tags");
    } finally {
      setIsLoading(false);
    }
  };

  const validation = metaTags ? validateMetaTags(metaTags) : null;

  return (
    <div className="container py-8 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">SEO Card Validator</h1>
        <p className="text-muted-foreground mt-2">
          Preview how your links appear on Facebook, Twitter, Discord, and
          Reddit
        </p>
      </div>

      {/* URL Input */}
      <Card>
        <CardHeader>
          <CardTitle>Enter URL</CardTitle>
          <CardDescription>
            Enter a website URL to fetch and validate its meta tags
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleFetch} className="space-y-4">
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
              <Button type="submit" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Fetching...
                  </>
                ) : (
                  <>
                    <Search className="mr-2 h-4 w-4" />
                    Validate
                  </>
                )}
              </Button>
            </div>
            {error && (
              <p className="text-sm text-destructive">{error}</p>
            )}
          </form>
        </CardContent>
      </Card>

      {/* Results */}
      {metaTags && validation && (
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Left Column - Meta Data */}
          <div className="lg:col-span-1">
            <MetaDataDisplay metaTags={metaTags} validation={validation} />
          </div>

          {/* Right Column - Platform Previews */}
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
      {!metaTags && (
        <div className="grid gap-4 md:grid-cols-3 mt-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Multi-Platform</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Preview how your links appear on Facebook, Twitter, Discord, and
                Reddit all at once
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Meta Tag Validation</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Get warnings and suggestions for missing or improperly
                configured meta tags
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Open Graph & Twitter Cards</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Validate both Open Graph and Twitter Card meta tags for optimal
                social sharing
              </p>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
