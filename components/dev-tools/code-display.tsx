"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Copy, Download, Check } from "lucide-react";
import { copyToClipboard, downloadFile, getFileExtension } from "@/lib/dev-tools/code-formatter";
import type { CodeLanguage } from "@/types/dev-tools";

interface CodeDisplayProps {
  code: string;
  language: CodeLanguage;
  filename?: string;
  showLineNumbers?: boolean;
}

export function CodeDisplay({
  code,
  language,
  filename,
  showLineNumbers = false,
}: CodeDisplayProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const success = await copyToClipboard(code);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownload = () => {
    const ext = getFileExtension(language);
    const defaultFilename = filename || `output.${ext}`;
    downloadFile(code, defaultFilename);
  };

  const displayCode = showLineNumbers
    ? code
        .split("\n")
        .map((line, i) => `${(i + 1).toString().padStart(3, " ")} | ${line}`)
        .join("\n")
    : code;

  return (
    <Card className="flex flex-col h-full">
      <div className="flex items-center justify-between p-4 border-b">
        <h3 className="text-sm font-medium">Output</h3>
        <div className="flex gap-2">
          <Button size="sm" variant="outline" onClick={handleCopy}>
            {copied ? (
              <>
                <Check className="w-4 h-4 mr-2" />
                Copied
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 mr-2" />
                Copy
              </>
            )}
          </Button>
          <Button size="sm" variant="outline" onClick={handleDownload}>
            <Download className="w-4 h-4 mr-2" />
            Download
          </Button>
        </div>
      </div>
      <div className="flex-1 overflow-auto p-4">
        <pre className="text-sm font-mono whitespace-pre-wrap break-all">
          <code>{displayCode}</code>
        </pre>
      </div>
    </Card>
  );
}
