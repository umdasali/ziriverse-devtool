"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Copy, Check, Trash2, Upload, ArrowRightLeft } from "lucide-react";
import { encodeBase64, decodeBase64, fileToBase64 } from "@/lib/developer-tools/base64-encoder";

export function Base64EncoderTool() {
  const [mode, setMode] = useState<"encode" | "decode">("encode");
  const [input, setInput] = useState("");
  const [fileResult, setFileResult] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const result = mode === "encode" ? encodeBase64(input) : decodeBase64(input);

  const handleCopy = async (text: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const dataUrl = await fileToBase64(file);
    setFileResult(dataUrl);
  };

  const swapMode = () => {
    if (result.isValid && result.output) {
      setInput(result.output);
    }
    setMode(mode === "encode" ? "decode" : "encode");
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="text">
        <TabsList className="grid w-full grid-cols-2 max-w-xs">
          <TabsTrigger value="text">Text</TabsTrigger>
          <TabsTrigger value="file">File</TabsTrigger>
        </TabsList>

        <TabsContent value="text" className="space-y-4">
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Input */}
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">
                    {mode === "encode" ? "Text Input" : "Base64 Input"}
                  </CardTitle>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={swapMode}>
                      <ArrowRightLeft className="h-3.5 w-3.5 mr-1" />
                      Swap
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => setInput("")}>
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex gap-2 mb-3">
                  <Button
                    variant={mode === "encode" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setMode("encode")}
                  >
                    Encode
                  </Button>
                  <Button
                    variant={mode === "decode" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setMode("decode")}
                  >
                    Decode
                  </Button>
                </div>
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={mode === "encode" ? "Enter text to encode..." : "Paste Base64 string..."}
                  className="w-full h-[300px] font-mono text-sm bg-muted p-4 rounded-lg border-0 resize-none focus:outline-none focus:ring-2 focus:ring-ring"
                  spellCheck={false}
                />
                {!result.isValid && result.error && input && (
                  <div className="mt-2 p-3 bg-destructive/10 text-destructive text-sm rounded-lg">
                    {result.error}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Output */}
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">
                    {mode === "encode" ? "Base64 Output" : "Decoded Text"}
                  </CardTitle>
                  {result.isValid && (
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary">{result.inputSize}B in</Badge>
                      <Badge variant="secondary">{result.outputSize}B out</Badge>
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <div className="relative">
                  <pre className="bg-muted p-4 rounded-lg overflow-auto max-h-[340px] text-sm font-mono whitespace-pre-wrap break-all">
                    <code>{result.output || "Output will appear here..."}</code>
                  </pre>
                  {result.isValid && result.output && (
                    <div className="absolute top-2 right-2">
                      <Button size="sm" variant="secondary" onClick={() => handleCopy(result.output)}>
                        {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="file" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">File to Base64</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer hover:bg-muted/50 transition-colors">
                <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                <span className="text-sm text-muted-foreground">Click to upload a file</span>
                <input type="file" className="hidden" onChange={handleFileUpload} />
              </label>
              {fileResult && (
                <div className="relative">
                  <pre className="bg-muted p-4 rounded-lg overflow-auto max-h-[300px] text-xs font-mono break-all whitespace-pre-wrap">
                    <code>{fileResult}</code>
                  </pre>
                  <div className="absolute top-2 right-2">
                    <Button size="sm" variant="secondary" onClick={() => handleCopy(fileResult)}>
                      {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
