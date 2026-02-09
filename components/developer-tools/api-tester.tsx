"use client";

import { useState, useEffect } from "react";
import { History, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { RequestBuilder } from "@/components/api-tester/request-builder";
import { HeadersEditor } from "@/components/api-tester/headers-editor";
import { BodyEditor } from "@/components/api-tester/body-editor";
import { AuthEditor } from "@/components/api-tester/auth-editor";
import { ResponseViewer } from "@/components/api-tester/response-viewer";
import { CurlImporter } from "@/components/api-tester/curl-importer";
import { HistoryPanel } from "@/components/api-tester/history-panel";
import type {
  APIRequest,
  APIResponse,
  RequestHistory,
  CurlParseResult,
  HTTPMethod,
  HeaderPair,
  RequestBody,
  AuthConfig,
} from "@/types/api-tester";
import { executeRequest } from "@/lib/api-tester/request-executor";
import { validateRequest } from "@/lib/api-tester/validation";

const defaultRequest: APIRequest = {
  id: "default",
  method: "GET",
  url: "",
  headers: [],
  body: { type: "none" },
  auth: { type: "none" },
};

export function APITesterTool() {
  const [request, setRequest] = useState<APIRequest>(defaultRequest);
  const [response, setResponse] = useState<APIResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [history, setHistory] = useState<RequestHistory[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const [useProxy, setUseProxy] = useState(false);

  // Load history from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("api-tester-history");
    if (saved) {
      try {
        setHistory(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to load history", e);
      }
    }
  }, []);

  // Save to history
  const saveToHistory = (
    req: APIRequest,
    res: APIResponse | null,
    success: boolean
  ) => {
    const entry: RequestHistory = {
      id: Date.now().toString(),
      request: req,
      response: res || undefined,
      timestamp: Date.now(),
      success,
    };

    const updated = [entry, ...history].slice(0, 20); // Keep last 20
    setHistory(updated);
    localStorage.setItem("api-tester-history", JSON.stringify(updated));
  };

  // Load from history
  const loadFromHistory = (entry: RequestHistory) => {
    setRequest(entry.request);
    setResponse(entry.response || null);
    setError(null);
    setShowHistory(false);
  };

  // Delete history entry
  const deleteHistoryEntry = (id: string) => {
    const updated = history.filter((e) => e.id !== id);
    setHistory(updated);
    localStorage.setItem("api-tester-history", JSON.stringify(updated));
  };

  // Handle cURL import
  const handleCurlImport = (result: CurlParseResult) => {
    setRequest((prev) => ({
      ...prev,
      method: result.method || prev.method,
      url: result.url || prev.url,
      headers: result.headers || prev.headers,
      body: result.body || prev.body,
      auth: result.auth || prev.auth,
    }));
  };

  // Send request
  const handleSendRequest = async () => {
    setError(null);
    setResponse(null);

    // Validate request
    const validation = validateRequest(request);
    if (!validation.isValid) {
      setError(validation.errors.join(", "));
      return;
    }

    setIsLoading(true);

    try {
      const res = await executeRequest(request, useProxy);
      setResponse(res);
      saveToHistory(request, res, true);
    } catch (err: any) {
      const errorMessage = err.message || "Request failed";
      setError(errorMessage);
      saveToHistory(request, null, false);
    } finally {
      setIsLoading(false);
    }
  };

  // Reset request
  const handleReset = () => {
    setRequest(defaultRequest);
    setResponse(null);
    setError(null);
  };

  // Update handlers
  const updateMethod = (method: HTTPMethod) => {
    setRequest((prev) => ({ ...prev, method }));
  };

  const updateUrl = (url: string) => {
    setRequest((prev) => ({ ...prev, url }));
  };

  const updateHeaders = (headers: HeaderPair[]) => {
    setRequest((prev) => ({ ...prev, headers }));
  };

  const updateBody = (body: RequestBody) => {
    setRequest((prev) => ({ ...prev, body }));
  };

  const updateAuth = (auth: AuthConfig) => {
    setRequest((prev) => ({ ...prev, auth }));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">API Testing Tool</h2>
          <p className="text-sm text-muted-foreground">
            Test REST APIs with cURL import and request history
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowHistory(!showHistory)}
          >
            <History className="mr-2 h-4 w-4" />
            History ({history.length})
          </Button>
          <Button variant="outline" size="sm" onClick={handleReset}>
            <RotateCcw className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* History Panel */}
      {showHistory && (
        <HistoryPanel
          history={history}
          onLoad={loadFromHistory}
          onDelete={deleteHistoryEntry}
          onClose={() => setShowHistory(false)}
        />
      )}

      {/* cURL Import */}
      <CurlImporter onImport={handleCurlImport} />

      {/* Main Content */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* LEFT COLUMN: Request Builder */}
        <div className="space-y-4">
          <RequestBuilder
            method={request.method}
            url={request.url}
            onMethodChange={updateMethod}
            onUrlChange={updateUrl}
            onSend={handleSendRequest}
            isLoading={isLoading}
          />

          <Tabs defaultValue="headers" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="headers">
                Headers
                {request.headers.filter((h) => h.enabled).length > 0 && (
                  <span className="ml-1 text-xs">
                    ({request.headers.filter((h) => h.enabled).length})
                  </span>
                )}
              </TabsTrigger>
              <TabsTrigger value="body">
                Body
                {request.body.type !== "none" && (
                  <span className="ml-1 text-xs">•</span>
                )}
              </TabsTrigger>
              <TabsTrigger value="auth">
                Auth
                {request.auth.type !== "none" && (
                  <span className="ml-1 text-xs">•</span>
                )}
              </TabsTrigger>
            </TabsList>

            <TabsContent value="headers">
              <HeadersEditor headers={request.headers} onChange={updateHeaders} />
            </TabsContent>

            <TabsContent value="body">
              <BodyEditor body={request.body} onChange={updateBody} />
            </TabsContent>

            <TabsContent value="auth">
              <AuthEditor auth={request.auth} onChange={updateAuth} />
            </TabsContent>
          </Tabs>

          {/* Proxy Toggle */}
          <div className="flex items-center gap-2 p-4 bg-muted rounded-lg">
            <input
              type="checkbox"
              id="use-proxy"
              checked={useProxy}
              onChange={(e) => setUseProxy(e.target.checked)}
              className="h-4 w-4 rounded border-gray-300"
            />
            <Label htmlFor="use-proxy" className="text-sm cursor-pointer">
              Use server proxy (enable if you encounter CORS issues)
            </Label>
          </div>
        </div>

        {/* RIGHT COLUMN: Response Viewer */}
        <ResponseViewer
          response={response}
          isLoading={isLoading}
          error={error}
          request={request}
        />
      </div>
    </div>
  );
}
