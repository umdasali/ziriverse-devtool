"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Copy, Check, Trash2, Key, AlertCircle, CheckCircle2 } from "lucide-react";
import { decodeJWT } from "@/lib/developer-tools/jwt-decoder";

const SAMPLE_JWT =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyLCJleHAiOjE5MTYyMzkwMjJ9.4S_3M4WFsOlFAs2eBY9Cq_AN3WxJFY6jJrNPVm4bMoA";

export function JWTDecoderTool() {
  const [input, setInput] = useState("");
  const [copied, setCopied] = useState(false);

  const result = input ? decodeJWT(input) : null;

  const handleCopy = async (text: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Input */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base">JWT Token</CardTitle>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => setInput(SAMPLE_JWT)}>
                <Key className="h-3.5 w-3.5 mr-1" />
                Sample
              </Button>
              <Button variant="outline" size="sm" onClick={() => setInput("")}>
                <Trash2 className="h-3.5 w-3.5" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Paste your JWT token here..."
            className="w-full h-[120px] font-mono text-sm bg-muted p-4 rounded-lg border-0 resize-none focus:outline-none focus:ring-2 focus:ring-ring"
            spellCheck={false}
          />
          {result && !result.isValid && (
            <div className="mt-2 p-3 bg-destructive/10 text-destructive text-sm rounded-lg flex items-center gap-2">
              <AlertCircle className="h-4 w-4 flex-shrink-0" />
              {result.error}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Output */}
      {result?.isValid && (
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Header */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base text-red-500">Header</CardTitle>
                <Badge variant="secondary">{result.header?.alg || "Unknown"}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="relative">
                <pre className="bg-muted p-4 rounded-lg overflow-auto text-sm font-mono">
                  <code>{JSON.stringify(result.header, null, 2)}</code>
                </pre>
                <Button
                  size="sm"
                  variant="secondary"
                  className="absolute top-2 right-2"
                  onClick={() => handleCopy(JSON.stringify(result.header, null, 2))}
                >
                  {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Payload */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base text-purple-500">Payload</CardTitle>
                <div className="flex gap-1.5">
                  {result.isExpired !== undefined && (
                    <Badge
                      variant={result.isExpired ? "destructive" : "secondary"}
                      className={!result.isExpired ? "bg-green-500/10 text-green-600" : ""}
                    >
                      {result.isExpired ? (
                        <><AlertCircle className="h-3 w-3 mr-1" /> Expired</>
                      ) : (
                        <><CheckCircle2 className="h-3 w-3 mr-1" /> Valid</>
                      )}
                    </Badge>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="relative">
                <pre className="bg-muted p-4 rounded-lg overflow-auto text-sm font-mono">
                  <code>{JSON.stringify(result.payload, null, 2)}</code>
                </pre>
                <Button
                  size="sm"
                  variant="secondary"
                  className="absolute top-2 right-2"
                  onClick={() => handleCopy(JSON.stringify(result.payload, null, 2))}
                >
                  {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Claims Info */}
          <Card className="lg:col-span-2">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Token Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {result.payload?.sub && (
                  <div className="p-3 bg-muted rounded-lg">
                    <div className="text-xs text-muted-foreground">Subject (sub)</div>
                    <div className="text-sm font-mono font-medium mt-1 truncate">{result.payload.sub}</div>
                  </div>
                )}
                {result.payload?.iss && (
                  <div className="p-3 bg-muted rounded-lg">
                    <div className="text-xs text-muted-foreground">Issuer (iss)</div>
                    <div className="text-sm font-mono font-medium mt-1 truncate">{result.payload.iss}</div>
                  </div>
                )}
                {result.issuedAt && (
                  <div className="p-3 bg-muted rounded-lg">
                    <div className="text-xs text-muted-foreground">Issued At (iat)</div>
                    <div className="text-sm font-mono font-medium mt-1">{result.issuedAt.toLocaleString()}</div>
                  </div>
                )}
                {result.expiresAt && (
                  <div className="p-3 bg-muted rounded-lg">
                    <div className="text-xs text-muted-foreground">Expires At (exp)</div>
                    <div className="text-sm font-mono font-medium mt-1">{result.expiresAt.toLocaleString()}</div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
