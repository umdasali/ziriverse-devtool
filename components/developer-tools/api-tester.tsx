"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Send, Plus, Trash2, Copy, Check, Loader2 } from "lucide-react";

type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

interface Header {
  key: string;
  value: string;
}

interface ApiResponse {
  status: number;
  statusText: string;
  headers: Record<string, string>;
  body: string;
  responseTime: number;
}

const METHODS: HttpMethod[] = ["GET", "POST", "PUT", "PATCH", "DELETE"];

const METHOD_COLORS: Record<HttpMethod, string> = {
  GET: "bg-green-500/10 text-green-600 border-green-500/20 hover:bg-green-500/20",
  POST: "bg-blue-500/10 text-blue-600 border-blue-500/20 hover:bg-blue-500/20",
  PUT: "bg-yellow-500/10 text-yellow-600 border-yellow-500/20 hover:bg-yellow-500/20",
  PATCH: "bg-orange-500/10 text-orange-600 border-orange-500/20 hover:bg-orange-500/20",
  DELETE: "bg-red-500/10 text-red-600 border-red-500/20 hover:bg-red-500/20",
};

const METHOD_ACTIVE_COLORS: Record<HttpMethod, string> = {
  GET: "bg-green-500 text-white hover:bg-green-600",
  POST: "bg-blue-500 text-white hover:bg-blue-600",
  PUT: "bg-yellow-500 text-white hover:bg-yellow-600",
  PATCH: "bg-orange-500 text-white hover:bg-orange-600",
  DELETE: "bg-red-500 text-white hover:bg-red-600",
};

const CONTENT_TYPES = [
  { label: "JSON", value: "application/json" },
  { label: "Form Data", value: "application/x-www-form-urlencoded" },
  { label: "Plain Text", value: "text/plain" },
  { label: "XML", value: "application/xml" },
];

function getStatusColor(status: number): string {
  if (status >= 200 && status < 300) return "bg-green-500/10 text-green-600 border-green-500/20";
  if (status >= 300 && status < 400) return "bg-yellow-500/10 text-yellow-600 border-yellow-500/20";
  if (status >= 400 && status < 500) return "bg-red-500/10 text-red-600 border-red-500/20";
  if (status >= 500) return "bg-red-500/10 text-red-600 border-red-500/20";
  return "bg-muted text-muted-foreground";
}

function tryPrettyPrint(body: string): { formatted: string; isJson: boolean } {
  try {
    const parsed = JSON.parse(body);
    return { formatted: JSON.stringify(parsed, null, 2), isJson: true };
  } catch {
    return { formatted: body, isJson: false };
  }
}

export function APITesterTool() {
  const [method, setMethod] = useState<HttpMethod>("GET");
  const [url, setUrl] = useState("");
  const [headers, setHeaders] = useState<Header[]>([{ key: "", value: "" }]);
  const [body, setBody] = useState("");
  const [contentType, setContentType] = useState("application/json");
  const [response, setResponse] = useState<ApiResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const supportsBody = ["POST", "PUT", "PATCH"].includes(method);

  const handleAddHeader = () => {
    setHeaders([...headers, { key: "", value: "" }]);
  };

  const handleRemoveHeader = (index: number) => {
    setHeaders(headers.filter((_, i) => i !== index));
  };

  const handleHeaderChange = (index: number, field: "key" | "value", val: string) => {
    const updated = [...headers];
    updated[index] = { ...updated[index], [field]: val };
    setHeaders(updated);
  };

  const handleSendRequest = async () => {
    if (!url.trim()) {
      setError("Please enter a URL");
      return;
    }

    setIsLoading(true);
    setError(null);
    setResponse(null);

    try {
      // Build headers object from key-value pairs
      const headerObj: Record<string, string> = {};
      headers.forEach((h) => {
        if (h.key.trim()) {
          headerObj[h.key.trim()] = h.value;
        }
      });

      // Add content-type for methods with body
      if (supportsBody && body.trim()) {
        headerObj["Content-Type"] = contentType;
      }

      const payload: {
        url: string;
        method: string;
        headers: Record<string, string>;
        body?: string;
      } = {
        url: url.trim(),
        method,
        headers: headerObj,
      };

      if (supportsBody && body.trim()) {
        payload.body = body;
      }

      const res = await fetch("/api/proxy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || `Proxy returned status ${res.status}`);
        return;
      }

      setResponse(data as ApiResponse);
    } catch (err: any) {
      setError(err.message || "Failed to send request");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyResponse = async () => {
    if (!response) return;
    const { formatted } = tryPrettyPrint(response.body);
    await navigator.clipboard.writeText(formatted);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const responseBody = response ? tryPrettyPrint(response.body) : null;

  return (
    <div className="grid gap-6">
      {/* Request Builder */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Request Builder</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Method Selector */}
          <div className="space-y-2">
            <Label>Method</Label>
            <div className="flex flex-wrap gap-2">
              {METHODS.map((m) => (
                <Button
                  key={m}
                  variant="outline"
                  size="sm"
                  className={
                    method === m
                      ? METHOD_ACTIVE_COLORS[m]
                      : METHOD_COLORS[m]
                  }
                  onClick={() => setMethod(m)}
                >
                  {m}
                </Button>
              ))}
            </div>
          </div>

          {/* URL Input */}
          <div className="space-y-2">
            <Label htmlFor="request-url">URL</Label>
            <div className="flex gap-2">
              <Input
                id="request-url"
                placeholder="https://api.example.com/endpoint"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !isLoading) handleSendRequest();
                }}
                className="flex-1 font-mono text-sm"
              />
              <Button
                onClick={handleSendRequest}
                disabled={isLoading}
                className="flex-shrink-0"
              >
                {isLoading ? (
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <Send className="h-4 w-4 mr-2" />
                )}
                Send
              </Button>
            </div>
          </div>

          {/* Headers */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>Headers</Label>
              <Button variant="outline" size="sm" onClick={handleAddHeader}>
                <Plus className="h-3.5 w-3.5 mr-1" />
                Add Header
              </Button>
            </div>
            <div className="space-y-2">
              {headers.map((header, index) => (
                <div key={index} className="flex gap-2 items-center">
                  <Input
                    placeholder="Header name"
                    value={header.key}
                    onChange={(e) => handleHeaderChange(index, "key", e.target.value)}
                    className="flex-1 font-mono text-sm"
                  />
                  <Input
                    placeholder="Header value"
                    value={header.value}
                    onChange={(e) => handleHeaderChange(index, "value", e.target.value)}
                    className="flex-1 font-mono text-sm"
                  />
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleRemoveHeader(index)}
                    className="flex-shrink-0"
                    disabled={headers.length === 1}
                  >
                    <Trash2 className="h-3.5 w-3.5 text-muted-foreground" />
                  </Button>
                </div>
              ))}
            </div>
          </div>

          {/* Body (only for POST/PUT/PATCH) */}
          {supportsBody && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>Body</Label>
                <div className="flex gap-1">
                  {CONTENT_TYPES.map((ct) => (
                    <Button
                      key={ct.value}
                      variant={contentType === ct.value ? "default" : "outline"}
                      size="sm"
                      className="h-7 px-2 text-xs"
                      onClick={() => setContentType(ct.value)}
                    >
                      {ct.label}
                    </Button>
                  ))}
                </div>
              </div>
              <textarea
                value={body}
                onChange={(e) => setBody(e.target.value)}
                placeholder={
                  contentType === "application/json"
                    ? '{\n  "key": "value"\n}'
                    : "Enter request body..."
                }
                className="w-full h-[200px] font-mono text-sm bg-muted p-4 rounded-lg border-0 resize-none focus:outline-none focus:ring-2 focus:ring-ring"
                spellCheck={false}
              />
            </div>
          )}

          {/* Error */}
          {error && (
            <div className="p-3 bg-destructive/10 text-destructive text-sm rounded-lg">
              {error}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Response Viewer */}
      {response && (
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base">Response</CardTitle>
              <div className="flex items-center gap-2">
                <Badge className={getStatusColor(response.status)}>
                  {response.status} {response.statusText}
                </Badge>
                <Badge variant="secondary">{response.responseTime}ms</Badge>
                <Button variant="outline" size="sm" onClick={handleCopyResponse}>
                  {copied ? (
                    <Check className="h-3.5 w-3.5 mr-1" />
                  ) : (
                    <Copy className="h-3.5 w-3.5 mr-1" />
                  )}
                  {copied ? "Copied" : "Copy"}
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="body">
              <TabsList className="grid w-full grid-cols-2 mb-3">
                <TabsTrigger value="body">Body</TabsTrigger>
                <TabsTrigger value="headers">Headers</TabsTrigger>
              </TabsList>

              <TabsContent value="body">
                <pre className="bg-muted p-4 rounded-lg overflow-auto max-h-[400px] text-xs font-mono whitespace-pre-wrap break-all">
                  <code>{responseBody?.formatted || "(empty response)"}</code>
                </pre>
                {responseBody?.isJson && (
                  <p className="text-xs text-muted-foreground mt-2">
                    Detected JSON - auto-formatted for readability
                  </p>
                )}
              </TabsContent>

              <TabsContent value="headers">
                <div className="bg-muted rounded-lg overflow-auto max-h-[400px]">
                  {Object.keys(response.headers).length > 0 ? (
                    <div className="divide-y divide-border">
                      {Object.entries(response.headers).map(([key, value]) => (
                        <div key={key} className="flex gap-4 p-3 text-sm">
                          <span className="font-mono font-medium text-xs min-w-[180px] flex-shrink-0">
                            {key}
                          </span>
                          <span className="font-mono text-xs text-muted-foreground break-all">
                            {value}
                          </span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="p-4 text-sm text-muted-foreground">
                      No headers in response
                    </p>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
