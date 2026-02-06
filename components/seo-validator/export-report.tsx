"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, FileJson, FileSpreadsheet } from "lucide-react";
import type { AdvancedSEOData, MetaValidation } from "@/types/seo";

interface ExportReportProps {
  data: AdvancedSEOData;
  validation: MetaValidation;
  url: string;
}

export function ExportReport({ data, validation, url }: ExportReportProps) {
  const exportAsJSON = () => {
    const report = {
      url,
      timestamp: new Date().toISOString(),
      score: data.seoScore,
      validation,
      data,
    };

    const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' });
    const url_blob = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url_blob;
    a.download = `seo-report-${new Date().getTime()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url_blob);
  };

  const exportAsCSV = () => {
    const rows: string[][] = [
      ['SEO Report', url],
      ['Date', new Date().toLocaleString()],
      [''],
      ['Overall Score', data.seoScore.overall.toString()],
      ['Meta Tags Score', data.seoScore.metaTags.toString()],
      ['Content Score', data.seoScore.content.toString()],
      ['Technical Score', data.seoScore.technical.toString()],
      ['Performance Score', data.seoScore.performance.toString()],
      ['Social Score', data.seoScore.social.toString()],
      [''],
      ['Validation'],
      ['Status', validation.isValid ? 'Valid' : 'Invalid'],
      ['Errors', validation.errors.length.toString()],
      ['Warnings', validation.warnings.length.toString()],
      ['Suggestions', validation.suggestions.length.toString()],
      [''],
      ['Meta Tags'],
      ['Title', data.metaTags.title || 'N/A'],
      ['Description', data.metaTags.description || 'N/A'],
      ['Canonical', data.metaTags.canonical || 'N/A'],
      [''],
      ['Content'],
      ['Word Count', data.content.wordCount.toString()],
      ['Paragraphs', data.content.paragraphCount.toString()],
      ['Readability Score', data.content.readabilityScore.toString()],
      [''],
      ['Links'],
      ['Total Links', data.links.totalLinks.toString()],
      ['Internal Links', data.links.internalLinks.toString()],
      ['External Links', data.links.externalLinks.toString()],
      [''],
      ['Images'],
      ['Total Images', data.images.totalImages.toString()],
      ['Images With Alt', data.images.imagesWithAlt.toString()],
      ['Images Without Alt', data.images.imagesWithoutAlt.toString()],
      [''],
      ['Security'],
      ['HTTPS', data.security.isHttps ? 'Yes' : 'No'],
      ['HSTS', data.security.hasHsts ? 'Yes' : 'No'],
      ['Mixed Content', data.security.mixedContent ? 'Yes' : 'No'],
    ];

    const csv = rows.map(row => row.map(cell => `"${cell}"`).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url_blob = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url_blob;
    a.download = `seo-report-${new Date().getTime()}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url_blob);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Download className="h-5 w-5" />
          Export Report
        </CardTitle>
        <CardDescription>
          Download your SEO analysis report
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <Button onClick={exportAsJSON} variant="outline" className="w-full">
          <FileJson className="mr-2 h-4 w-4" />
          Export as JSON
        </Button>
        <Button onClick={exportAsCSV} variant="outline" className="w-full">
          <FileSpreadsheet className="mr-2 h-4 w-4" />
          Export as CSV
        </Button>
        <p className="text-xs text-muted-foreground">
          JSON format contains complete data. CSV format contains summary data.
        </p>
      </CardContent>
    </Card>
  );
}
