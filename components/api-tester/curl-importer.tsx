"use client";

import { useState } from "react";
import { FileCode, AlertCircle, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { parseCurlCommand } from "@/lib/api-tester/curl-parser";
import type { CurlParseResult } from "@/types/api-tester";

interface CurlImporterProps {
  onImport: (result: CurlParseResult) => void;
}

export function CurlImporter({ onImport }: CurlImporterProps) {
  const [curlInput, setCurlInput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleImport = () => {
    setError(null);
    setSuccess(false);

    if (!curlInput.trim()) {
      setError("Please enter a cURL command");
      return;
    }

    try {
      const result = parseCurlCommand(curlInput);
      onImport(result);
      setSuccess(true);
      setCurlInput("");

      // Hide success message after 3 seconds
      setTimeout(() => setSuccess(false), 3000);
    } catch (err: any) {
      setError(err.message || "Failed to parse cURL command");
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileCode className="h-5 w-5" />
          Import from cURL
        </CardTitle>
        <CardDescription>
          Paste a cURL command to automatically populate the request fields
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="curl-input">cURL Command</Label>
          <Textarea
            id="curl-input"
            placeholder="curl -X POST 'https://api.example.com/endpoint' -H 'Content-Type: application/json' -d '{&quot;key&quot;:&quot;value&quot;}'"
            value={curlInput}
            onChange={(e) => setCurlInput(e.target.value)}
            rows={4}
            className="font-mono text-sm"
          />
        </div>

        <Button onClick={handleImport} variant="default" className="w-full">
          Import cURL
        </Button>

        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {success && (
          <Alert>
            <CheckCircle2 className="h-4 w-4" />
            <AlertDescription>cURL command imported successfully!</AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  );
}
