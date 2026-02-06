"use client";

import { useState } from "react";
import { Check, Copy, Download } from "lucide-react";
import { saveAs } from "file-saver";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useBrandingStore } from "@/stores/branding-store";
import { generateCSS } from "@/lib/branding/css-generator";

export function CodeOutput() {
  const state = useBrandingStore();
  const [copied, setCopied] = useState(false);

  const css = generateCSS(state);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(css);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([css], { type: "text/css;charset=utf-8" });
    saveAs(blob, "design-system.css");
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Generated CSS</CardTitle>
          <div className="flex gap-2">
            <Button onClick={handleCopy} variant="outline" size="sm">
              {copied ? (
                <>
                  <Check className="mr-2 h-4 w-4" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="mr-2 h-4 w-4" />
                  Copy
                </>
              )}
            </Button>
            <Button onClick={handleDownload} variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />
              Download
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="relative">
          <pre className="p-4 bg-gray-950 text-gray-100 rounded-lg overflow-x-auto text-sm max-h-[600px] overflow-y-auto">
            <code>{css}</code>
          </pre>
        </div>
      </CardContent>
    </Card>
  );
}
