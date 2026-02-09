"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { generateCurlCommand } from "@/lib/api-tester/curl-generator";
import type { APIRequest } from "@/types/api-tester";

interface CurlExporterProps {
  request: APIRequest;
}

export function CurlExporter({ request }: CurlExporterProps) {
  const [copied, setCopied] = useState(false);

  const curlCommand = generateCurlCommand(request);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(curlCommand);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      alert("Failed to copy to clipboard");
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-sm font-medium">cURL Command</h3>
        <Button variant="outline" size="sm" onClick={handleCopy}>
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
      </div>

      <pre className="bg-muted p-4 rounded-lg overflow-auto max-h-64 text-sm font-mono">
        <code>{curlCommand}</code>
      </pre>

      <p className="text-xs text-muted-foreground">
        Copy this command to use in your terminal or share with others
      </p>
    </div>
  );
}
