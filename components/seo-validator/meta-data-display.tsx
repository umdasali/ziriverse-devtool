"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, CheckCircle2, Info } from "lucide-react";
import type { MetaTags, MetaValidation } from "@/types/seo";

interface MetaDataDisplayProps {
  metaTags: MetaTags;
  validation: MetaValidation;
}

export function MetaDataDisplay({
  metaTags,
  validation,
}: MetaDataDisplayProps) {
  return (
    <div className="space-y-4">
      {/* Validation Status */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">Validation Status</CardTitle>
            {validation.isValid ? (
              <Badge variant="default" className="bg-green-500">
                <CheckCircle2 className="mr-1 h-3 w-3" />
                Valid
              </Badge>
            ) : (
              <Badge variant="destructive">
                <AlertCircle className="mr-1 h-3 w-3" />
                Issues Found
              </Badge>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-2">
          {validation.warnings.length > 0 && (
            <div className="space-y-2">
              {validation.warnings.map((warning, i) => (
                <Alert key={i} variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{warning}</AlertDescription>
                </Alert>
              ))}
            </div>
          )}
          {validation.suggestions.length > 0 && (
            <div className="space-y-2">
              {validation.suggestions.map((suggestion, i) => (
                <Alert key={i}>
                  <Info className="h-4 w-4" />
                  <AlertDescription>{suggestion}</AlertDescription>
                </Alert>
              ))}
            </div>
          )}
          {validation.isValid && validation.suggestions.length === 0 && (
            <p className="text-sm text-muted-foreground">
              All meta tags are properly configured!
            </p>
          )}
        </CardContent>
      </Card>

      {/* Meta Tags */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Meta Tags</CardTitle>
          <CardDescription>Extracted meta tags from the page</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <MetaSection title="Basic Tags">
              <MetaItem label="Title" value={metaTags.title} />
              <MetaItem label="Description" value={metaTags.description} />
              <MetaItem label="URL" value={metaTags.url} />
              <MetaItem label="Image" value={metaTags.image} isUrl />
            </MetaSection>

            <MetaSection title="Open Graph">
              <MetaItem label="og:title" value={metaTags.ogTitle} />
              <MetaItem label="og:description" value={metaTags.ogDescription} />
              <MetaItem label="og:image" value={metaTags.ogImage} isUrl />
              <MetaItem label="og:url" value={metaTags.ogUrl} isUrl />
              <MetaItem label="og:type" value={metaTags.ogType} />
              <MetaItem label="og:site_name" value={metaTags.ogSiteName} />
            </MetaSection>

            <MetaSection title="Twitter Card">
              <MetaItem label="twitter:card" value={metaTags.twitterCard} />
              <MetaItem label="twitter:title" value={metaTags.twitterTitle} />
              <MetaItem
                label="twitter:description"
                value={metaTags.twitterDescription}
              />
              <MetaItem
                label="twitter:image"
                value={metaTags.twitterImage}
                isUrl
              />
              <MetaItem label="twitter:site" value={metaTags.twitterSite} />
              <MetaItem
                label="twitter:creator"
                value={metaTags.twitterCreator}
              />
            </MetaSection>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function MetaSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h4 className="font-semibold text-sm mb-2">{title}</h4>
      <div className="space-y-1">{children}</div>
    </div>
  );
}

function MetaItem({
  label,
  value,
  isUrl = false,
}: {
  label: string;
  value?: string;
  isUrl?: boolean;
}) {
  if (!value) return null;

  return (
    <div className="flex items-start text-xs">
      <span className="font-mono text-muted-foreground w-40 flex-shrink-0">
        {label}:
      </span>
      <span className="break-all">
        {isUrl ? (
          <a
            href={value}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            {value}
          </a>
        ) : (
          value
        )}
      </span>
    </div>
  );
}
