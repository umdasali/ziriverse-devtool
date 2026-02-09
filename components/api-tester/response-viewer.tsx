"use client";

import { useState } from "react";
import { Copy, Check, Loader2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import type { APIRequest, APIResponse } from "@/types/api-tester";
import { formatResponseBody, getStatusVariant, getStatusBadgeColor } from "@/lib/api-tester/response-formatter";
import { formatBytes } from "@/lib/utils";
import { CurlExporter } from "./curl-exporter";

interface ResponseViewerProps {
  response: APIResponse | null;
  isLoading: boolean;
  error: string | null;
  request: APIRequest;
}

export function ResponseViewer({
  response,
  isLoading,
  error,
  request,
}: ResponseViewerProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      alert("Failed to copy to clipboard");
    }
  };

  if (isLoading) {
    return (
      <Card className="lg:sticky lg:top-20">
        <CardHeader>
          <CardTitle>Response</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-12 space-y-4">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            <p className="text-sm text-muted-foreground">Sending request...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="lg:sticky lg:top-20">
        <CardHeader>
          <CardTitle>Response</CardTitle>
        </CardHeader>
        <CardContent>
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    );
  }

  if (!response) {
    return (
      <Card className="lg:sticky lg:top-20">
        <CardHeader>
          <CardTitle>Response</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-12 space-y-4">
            <div className="text-6xl">🚀</div>
            <p className="text-sm text-muted-foreground text-center">
              Configure your request and click &quot;Send&quot; to see the response
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const formattedBody = formatResponseBody(
    response.body,
    response.headers["content-type"]
  );

  return (
    <Card className="lg:sticky lg:top-20">
      <CardHeader>
        <div className="flex items-center justify-between flex-wrap gap-2">
          <CardTitle>Response</CardTitle>
          <div className="flex gap-2 flex-wrap">
            <Badge variant="outline" className={getStatusBadgeColor(response.status)}>
              {response.status} {response.statusText}
            </Badge>
            <Badge variant="outline">{response.time.toFixed(0)}ms</Badge>
            <Badge variant="outline">{formatBytes(response.size)}</Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="body">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="body">Body</TabsTrigger>
            <TabsTrigger value="headers">Headers</TabsTrigger>
            <TabsTrigger value="export">Export</TabsTrigger>
          </TabsList>

          <TabsContent value="body" className="space-y-2">
            <div className="flex justify-end">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleCopy(response.body)}
              >
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

            <pre className="bg-muted p-4 rounded-lg overflow-auto max-h-96 text-sm font-mono whitespace-pre-wrap break-all">
              <code>{formattedBody}</code>
            </pre>
          </TabsContent>

          <TabsContent value="headers" className="space-y-2">
            {Object.keys(response.headers).length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-4">
                No response headers
              </p>
            ) : (
              <div className="space-y-2">
                {Object.entries(response.headers).map(([key, value]) => (
                  <div
                    key={key}
                    className="flex gap-2 text-sm p-2 bg-muted rounded"
                  >
                    <span className="font-medium min-w-[150px]">{key}:</span>
                    <span className="text-muted-foreground break-all">
                      {value}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="export">
            <CurlExporter request={request} />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
