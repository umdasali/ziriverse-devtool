"use client";

import { useState, useCallback } from "react";
import {
  Plus,
  Trash2,
  Copy,
  Check,
  Download,
  MapPin,
  FileCode,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  generateSitemapXML,
  createDefaultEntries,
  type SitemapEntry,
} from "@/lib/seo-tools/sitemap-generator";

const CHANGE_FREQUENCIES = [
  "always",
  "hourly",
  "daily",
  "weekly",
  "monthly",
  "yearly",
  "never",
] as const;

export function SitemapGeneratorTool() {
  const [entries, setEntries] = useState<SitemapEntry[]>(createDefaultEntries);
  const [copied, setCopied] = useState(false);

  const output = generateSitemapXML(entries);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([output], {
      type: "application/xml;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "sitemap.xml";
    a.click();
    URL.revokeObjectURL(url);
  };

  const addEntry = useCallback(() => {
    setEntries((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        url: "",
        lastmod: new Date().toISOString().split("T")[0],
        changefreq: "monthly",
        priority: 0.5,
      },
    ]);
  }, []);

  const removeEntry = useCallback((id: string) => {
    setEntries((prev) => prev.filter((e) => e.id !== id));
  }, []);

  const updateEntry = useCallback(
    (id: string, field: keyof SitemapEntry, value: string | number | undefined) => {
      setEntries((prev) =>
        prev.map((e) => (e.id === id ? { ...e, [field]: value } : e))
      );
    },
    []
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Sitemap Generator
              </CardTitle>
              <CardDescription>
                Create an XML sitemap to help search engines discover your pages
              </CardDescription>
            </div>
            <Badge variant="secondary">
              {entries.length} URL{entries.length !== 1 ? "s" : ""}
            </Badge>
          </div>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Form Section */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">URL Entries</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {entries.map((entry, index) => (
                <div
                  key={entry.id}
                  className="border rounded-lg p-4 space-y-3 bg-muted/30"
                >
                  <div className="flex items-center justify-between">
                    <Badge variant="outline">URL #{index + 1}</Badge>
                    {entries.length > 1 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeEntry(entry.id)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4 mr-1" />
                        Remove
                      </Button>
                    )}
                  </div>

                  <div>
                    <Label htmlFor={`url-${entry.id}`}>
                      URL <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id={`url-${entry.id}`}
                      value={entry.url}
                      onChange={(e) =>
                        updateEntry(entry.id, "url", e.target.value)
                      }
                      placeholder="https://example.com/page"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <Label htmlFor={`lastmod-${entry.id}`}>
                        Last Modified
                      </Label>
                      <Input
                        id={`lastmod-${entry.id}`}
                        type="date"
                        value={entry.lastmod ?? ""}
                        onChange={(e) =>
                          updateEntry(
                            entry.id,
                            "lastmod",
                            e.target.value || undefined
                          )
                        }
                      />
                    </div>

                    <div>
                      <Label htmlFor={`changefreq-${entry.id}`}>
                        Change Frequency
                      </Label>
                      <Select
                        value={entry.changefreq ?? ""}
                        onValueChange={(value: string) =>
                          updateEntry(
                            entry.id,
                            "changefreq",
                            value || undefined
                          )
                        }
                      >
                        <SelectTrigger id={`changefreq-${entry.id}`}>
                          <SelectValue placeholder="Select frequency" />
                        </SelectTrigger>
                        <SelectContent>
                          {CHANGE_FREQUENCIES.map((freq) => (
                            <SelectItem key={freq} value={freq}>
                              {freq.charAt(0).toUpperCase() + freq.slice(1)}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor={`priority-${entry.id}`}>
                        Priority (0.0 - 1.0)
                      </Label>
                      <Input
                        id={`priority-${entry.id}`}
                        type="number"
                        min={0}
                        max={1}
                        step={0.1}
                        value={entry.priority ?? ""}
                        onChange={(e) =>
                          updateEntry(
                            entry.id,
                            "priority",
                            e.target.value
                              ? parseFloat(e.target.value)
                              : undefined
                          )
                        }
                        placeholder="0.5"
                      />
                    </div>
                  </div>
                </div>
              ))}

              <Button variant="outline" onClick={addEntry} className="w-full">
                <Plus className="h-4 w-4 mr-2" />
                Add URL
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Output Section */}
        <div>
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <FileCode className="h-5 w-5" />
                  Generated XML
                </CardTitle>
                <div className="flex gap-2">
                  <Button onClick={handleCopy} variant="outline" size="sm">
                    {copied ? (
                      <>
                        <Check className="mr-1 h-4 w-4" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="mr-1 h-4 w-4" />
                        Copy
                      </>
                    )}
                  </Button>
                  <Button onClick={handleDownload} variant="outline" size="sm">
                    <Download className="mr-1 h-4 w-4" />
                    Download
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <pre className="p-4 bg-gray-950 text-gray-100 rounded-lg overflow-x-auto text-sm max-h-[600px] overflow-y-auto whitespace-pre-wrap">
                <code>{output}</code>
              </pre>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
