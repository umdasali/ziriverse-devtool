"use client";

import { useState } from "react";
import { Check, Copy, Download, FileCode2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useBrandingStore } from "@/stores/branding-store";
import { exportDesignSystem } from "@/lib/branding/advanced-export";
import type { ExportFormat } from "@/types/branding";

export function AdvancedCodeOutput() {
  const exportState = useBrandingStore((state) => state.exportState);
  const [copied, setCopied] = useState(false);
  const [selectedFormat, setSelectedFormat] = useState<ExportFormat['type']>('css');

  const formats: Array<{ type: ExportFormat['type']; label: string; ext: string }> = [
    { type: 'css', label: 'CSS', ext: 'css' },
    { type: 'scss', label: 'SCSS', ext: 'scss' },
    { type: 'json', label: 'JSON', ext: 'json' },
    { type: 'tailwind', label: 'Tailwind', ext: 'js' },
    { type: 'javascript', label: 'JavaScript', ext: 'js' },
  ];

  const state = exportState();
  const currentExport = exportDesignSystem(state, selectedFormat);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(currentExport.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const format = formats.find(f => f.type === selectedFormat);
    if (!format) return;

    const blob = new Blob([currentExport.content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `design-system.${format.ext}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleDownloadAll = () => {
    formats.forEach(format => {
      const exportData = exportDesignSystem(state, format.type);
      const blob = new Blob([exportData.content], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `design-system.${format.ext}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    });
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <FileCode2 className="h-5 w-5" />
              Export Design System
            </CardTitle>
            <CardDescription>
              Download in multiple formats for different frameworks
            </CardDescription>
          </div>
          <Button onClick={handleDownloadAll} variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Download All
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <Tabs value={selectedFormat} onValueChange={(v) => setSelectedFormat(v as ExportFormat['type'])}>
          <TabsList className="grid w-full grid-cols-5">
            {formats.map(format => (
              <TabsTrigger key={format.type} value={format.type}>
                {format.label}
              </TabsTrigger>
            ))}
          </TabsList>

          {formats.map(format => (
            <TabsContent key={format.type} value={format.type} className="space-y-4">
              <div className="relative">
                <pre className="bg-muted p-4 rounded-lg overflow-x-auto max-h-[500px] text-xs font-mono">
                  <code>{currentExport.content}</code>
                </pre>
                <div className="absolute top-2 right-2 flex gap-2">
                  <Button size="sm" onClick={handleCopy} variant="secondary">
                    {copied ? (
                      <>
                        <Check className="h-3 w-3 mr-1" />
                        Copied
                      </>
                    ) : (
                      <>
                        <Copy className="h-3 w-3 mr-1" />
                        Copy
                      </>
                    )}
                  </Button>
                  <Button size="sm" onClick={handleDownload} variant="secondary">
                    <Download className="h-3 w-3 mr-1" />
                    Download
                  </Button>
                </div>
              </div>

              <div className="text-xs text-muted-foreground">
                {format.type === 'css' && 'CSS with custom properties and utility classes'}
                {format.type === 'scss' && 'SCSS variables for Sass projects'}
                {format.type === 'json' && 'JSON format for programmatic use'}
                {format.type === 'tailwind' && 'Tailwind CSS configuration file'}
                {format.type === 'javascript' && 'ES6 module with design tokens'}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  );
}
