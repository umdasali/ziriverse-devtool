"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Copy, FileText, Check, Upload, Shield } from "lucide-react";
import CryptoJS from "crypto-js";

interface HashResult {
  md5: string;
  sha1: string;
  sha256: string;
  sha512: string;
}

export function HashGenerator() {
  const [textInput, setTextInput] = useState<string>("");
  const [fileInput, setFileInput] = useState<File | null>(null);
  const [textHashes, setTextHashes] = useState<HashResult | null>(null);
  const [fileHashes, setFileHashes] = useState<HashResult | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [copiedHash, setCopiedHash] = useState<string | null>(null);

  // Generate hashes for text
  const generateTextHashes = () => {
    if (!textInput.trim()) return;

    setIsGenerating(true);
    setTimeout(() => {
      const hashes: HashResult = {
        md5: CryptoJS.MD5(textInput).toString(),
        sha1: CryptoJS.SHA1(textInput).toString(),
        sha256: CryptoJS.SHA256(textInput).toString(),
        sha512: CryptoJS.SHA512(textInput).toString(),
      };

      setTextHashes(hashes);
      setIsGenerating(false);
    }, 100);
  };

  // Generate hashes for file
  const generateFileHashes = async () => {
    if (!fileInput) return;

    setIsGenerating(true);

    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;

      const hashes: HashResult = {
        md5: CryptoJS.MD5(content).toString(),
        sha1: CryptoJS.SHA1(content).toString(),
        sha256: CryptoJS.SHA256(content).toString(),
        sha512: CryptoJS.SHA512(content).toString(),
      };

      setFileHashes(hashes);
      setIsGenerating(false);
    };

    reader.readAsText(fileInput);
  };

  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileInput(file);
      setFileHashes(null);
    }
  };

  // Copy hash to clipboard
  const copyToClipboard = (text: string, hashType: string) => {
    navigator.clipboard.writeText(text);
    setCopiedHash(hashType);
    setTimeout(() => setCopiedHash(null), 2000);
  };

  // Format file size
  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const HashDisplay = ({ hashes, source }: { hashes: HashResult; source: "text" | "file" }) => (
    <div className="space-y-4">
      {Object.entries(hashes).map(([algorithm, hash]) => (
        <div key={algorithm} className="space-y-2">
          <div className="flex items-center justify-between">
            <Label className="text-sm font-medium uppercase">{algorithm}</Label>
            <Badge variant="secondary">{hash.length} chars</Badge>
          </div>
          <div className="flex gap-2">
            <code className="flex-1 bg-muted px-3 py-2 rounded-md font-mono text-xs break-all">
              {hash}
            </code>
            <Button
              size="sm"
              variant="outline"
              onClick={() => copyToClipboard(hash, `${source}-${algorithm}`)}
            >
              {copiedHash === `${source}-${algorithm}` ? (
                <Check className="w-4 h-4 text-green-600" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </Button>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold mb-2">Hash Generator</h1>
        <p className="text-muted-foreground">
          Generate cryptographic hashes for text and files
        </p>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="text">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="text">
            <FileText className="w-4 h-4 mr-2" />
            Text Hash
          </TabsTrigger>
          <TabsTrigger value="file">
            <Upload className="w-4 h-4 mr-2" />
            File Hash
          </TabsTrigger>
        </TabsList>

        {/* Text Hash */}
        <TabsContent value="text" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Generate Hash from Text</CardTitle>
              <CardDescription>
                Enter any text to generate MD5, SHA-1, SHA-256, and SHA-512 hashes
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Input Text</Label>
                <Textarea
                  placeholder="Enter text to hash..."
                  value={textInput}
                  onChange={(e) => setTextInput(e.target.value)}
                  rows={6}
                  className="font-mono text-sm"
                />
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>{textInput.length} characters</span>
                  <span>{new Blob([textInput]).size} bytes</span>
                </div>
              </div>

              <Button
                onClick={generateTextHashes}
                disabled={!textInput.trim() || isGenerating}
                className="w-full"
              >
                {isGenerating ? "Generating..." : "Generate Hashes"}
              </Button>

              {textHashes && (
                <div className="space-y-2 pt-4">
                  <Label className="text-base">Generated Hashes:</Label>
                  <HashDisplay hashes={textHashes} source="text" />
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* File Hash */}
        <TabsContent value="file" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Generate Hash from File</CardTitle>
              <CardDescription>
                Upload a file to generate cryptographic hashes
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Select File</Label>
                <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                  <input
                    type="file"
                    onChange={handleFileChange}
                    className="hidden"
                    id="file-upload"
                  />
                  <label
                    htmlFor="file-upload"
                    className="cursor-pointer flex flex-col items-center gap-2"
                  >
                    <Upload className="w-8 h-8 text-muted-foreground" />
                    <span className="text-sm font-medium">
                      {fileInput ? fileInput.name : "Click to upload file"}
                    </span>
                    {fileInput && (
                      <Badge variant="secondary">{formatFileSize(fileInput.size)}</Badge>
                    )}
                  </label>
                </div>
              </div>

              <Button
                onClick={generateFileHashes}
                disabled={!fileInput || isGenerating}
                className="w-full"
              >
                {isGenerating ? "Generating..." : "Generate Hashes"}
              </Button>

              {fileHashes && (
                <div className="space-y-2 pt-4">
                  <Label className="text-base">Generated Hashes:</Label>
                  <HashDisplay hashes={fileHashes} source="file" />
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Information Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5" />
            Hash Algorithm Information
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <h4 className="font-medium mb-2">MD5 (128-bit)</h4>
              <p className="text-muted-foreground">
                Fast but considered cryptographically broken. Use only for non-security purposes like checksums.
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-2">SHA-1 (160-bit)</h4>
              <p className="text-muted-foreground">
                Deprecated for security. Vulnerable to collision attacks. Avoid for new applications.
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-2">SHA-256 (256-bit)</h4>
              <p className="text-muted-foreground">
                Part of SHA-2 family. Widely used and considered secure. Recommended for most use cases.
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-2">SHA-512 (512-bit)</h4>
              <p className="text-muted-foreground">
                Strongest hash in SHA-2 family. Higher security but slower. Use for sensitive data.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Use Cases Card */}
      <Card>
        <CardHeader>
          <CardTitle>Common Use Cases</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>• <strong>File Integrity:</strong> Verify downloaded files haven't been tampered with</li>
            <li>• <strong>Password Storage:</strong> Never store passwords in plain text (use SHA-256 with salt)</li>
            <li>• <strong>Checksums:</strong> Ensure data hasn't been corrupted during transfer</li>
            <li>• <strong>Digital Signatures:</strong> Create unique fingerprints for documents</li>
            <li>• <strong>Deduplication:</strong> Identify duplicate files by comparing hashes</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
