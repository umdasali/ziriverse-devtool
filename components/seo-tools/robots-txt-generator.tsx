"use client";

import { useState, useCallback } from "react";
import {
  Plus,
  Trash2,
  Copy,
  Check,
  Download,
  Bot,
  ShieldCheck,
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
  generateRobotsTxt,
  createDefaultConfig,
  type RobotsTxtConfig,
  type RobotRule,
} from "@/lib/seo-tools/robots-txt-generator";

export function RobotsTxtGeneratorTool() {
  const [config, setConfig] = useState<RobotsTxtConfig>(createDefaultConfig);
  const [copied, setCopied] = useState(false);

  const output = generateRobotsTxt(config);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([output], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "robots.txt";
    a.click();
    URL.revokeObjectURL(url);
  };

  const addRuleGroup = useCallback(() => {
    setConfig((prev) => ({
      ...prev,
      rules: [
        ...prev.rules,
        {
          id: crypto.randomUUID(),
          userAgent: "*",
          rules: [{ type: "disallow" as const, path: "/" }],
        },
      ],
    }));
  }, []);

  const removeRuleGroup = useCallback((id: string) => {
    setConfig((prev) => ({
      ...prev,
      rules: prev.rules.filter((r) => r.id !== id),
    }));
  }, []);

  const updateUserAgent = useCallback((id: string, userAgent: string) => {
    setConfig((prev) => ({
      ...prev,
      rules: prev.rules.map((r) =>
        r.id === id ? { ...r, userAgent } : r
      ),
    }));
  }, []);

  const addRule = useCallback((groupId: string) => {
    setConfig((prev) => ({
      ...prev,
      rules: prev.rules.map((r) =>
        r.id === groupId
          ? { ...r, rules: [...r.rules, { type: "disallow" as const, path: "/" }] }
          : r
      ),
    }));
  }, []);

  const removeRule = useCallback((groupId: string, ruleIndex: number) => {
    setConfig((prev) => ({
      ...prev,
      rules: prev.rules.map((r) =>
        r.id === groupId
          ? { ...r, rules: r.rules.filter((_, i) => i !== ruleIndex) }
          : r
      ),
    }));
  }, []);

  const updateRuleType = useCallback(
    (groupId: string, ruleIndex: number, type: "allow" | "disallow") => {
      setConfig((prev) => ({
        ...prev,
        rules: prev.rules.map((r) =>
          r.id === groupId
            ? {
                ...r,
                rules: r.rules.map((rule, i) =>
                  i === ruleIndex ? { ...rule, type } : rule
                ),
              }
            : r
        ),
      }));
    },
    []
  );

  const updateRulePath = useCallback(
    (groupId: string, ruleIndex: number, path: string) => {
      setConfig((prev) => ({
        ...prev,
        rules: prev.rules.map((r) =>
          r.id === groupId
            ? {
                ...r,
                rules: r.rules.map((rule, i) =>
                  i === ruleIndex ? { ...rule, path } : rule
                ),
              }
            : r
        ),
      }));
    },
    []
  );

  const addSitemapUrl = useCallback(() => {
    setConfig((prev) => ({
      ...prev,
      sitemapUrls: [...prev.sitemapUrls, ""],
    }));
  }, []);

  const removeSitemapUrl = useCallback((index: number) => {
    setConfig((prev) => ({
      ...prev,
      sitemapUrls: prev.sitemapUrls.filter((_, i) => i !== index),
    }));
  }, []);

  const updateSitemapUrl = useCallback((index: number, value: string) => {
    setConfig((prev) => ({
      ...prev,
      sitemapUrls: prev.sitemapUrls.map((u, i) => (i === index ? value : u)),
    }));
  }, []);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Form Section */}
      <div className="space-y-4">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Bot className="h-5 w-5" />
                  Robots.txt Generator
                </CardTitle>
                <CardDescription>
                  Configure crawling rules for search engine bots
                </CardDescription>
              </div>
              <Badge variant="secondary">
                {config.rules.length} group{config.rules.length !== 1 ? "s" : ""}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* User-Agent Rule Groups */}
            {config.rules.map((group) => (
              <div
                key={group.id}
                className="border rounded-lg p-4 space-y-4 bg-muted/30"
              >
                <div className="flex items-center justify-between">
                  <Label htmlFor={`ua-${group.id}`} className="font-semibold">
                    User-Agent
                  </Label>
                  {config.rules.length > 1 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeRuleGroup(group.id)}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4 mr-1" />
                      Remove Group
                    </Button>
                  )}
                </div>
                <Input
                  id={`ua-${group.id}`}
                  value={group.userAgent}
                  onChange={(e) => updateUserAgent(group.id, e.target.value)}
                  placeholder="* (all bots)"
                />

                {/* Rules within group */}
                <div className="space-y-2">
                  <Label className="text-sm text-muted-foreground">Rules</Label>
                  {group.rules.map((rule, ruleIndex) => (
                    <div key={ruleIndex} className="flex items-center gap-2">
                      <Select
                        value={rule.type}
                        onValueChange={(value: string) =>
                          updateRuleType(
                            group.id,
                            ruleIndex,
                            value as "allow" | "disallow"
                          )
                        }
                      >
                        <SelectTrigger className="w-[130px]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="allow">Allow</SelectItem>
                          <SelectItem value="disallow">Disallow</SelectItem>
                        </SelectContent>
                      </Select>
                      <Input
                        value={rule.path}
                        onChange={(e) =>
                          updateRulePath(group.id, ruleIndex, e.target.value)
                        }
                        placeholder="/path"
                        className="flex-1"
                      />
                      {group.rules.length > 1 && (
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeRule(group.id, ruleIndex)}
                          className="text-destructive hover:text-destructive flex-shrink-0"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => addRule(group.id)}
                    className="mt-2"
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    Add Rule
                  </Button>
                </div>
              </div>
            ))}

            <Button variant="outline" onClick={addRuleGroup} className="w-full">
              <Plus className="h-4 w-4 mr-2" />
              Add User-Agent Group
            </Button>

            {/* Sitemap URLs */}
            <div className="space-y-2">
              <Label className="font-semibold">Sitemap URLs</Label>
              {config.sitemapUrls.map((url, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Input
                    value={url}
                    onChange={(e) => updateSitemapUrl(index, e.target.value)}
                    placeholder="https://example.com/sitemap.xml"
                    className="flex-1"
                  />
                  {config.sitemapUrls.length > 1 && (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeSitemapUrl(index)}
                      className="text-destructive hover:text-destructive flex-shrink-0"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
              <Button variant="outline" size="sm" onClick={addSitemapUrl}>
                <Plus className="h-4 w-4 mr-1" />
                Add Sitemap URL
              </Button>
            </div>

            {/* Crawl Delay */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="crawl-delay">Crawl Delay (seconds)</Label>
                <Input
                  id="crawl-delay"
                  type="number"
                  min={0}
                  value={config.crawlDelay ?? ""}
                  onChange={(e) =>
                    setConfig((prev) => ({
                      ...prev,
                      crawlDelay: e.target.value
                        ? parseInt(e.target.value, 10)
                        : undefined,
                    }))
                  }
                  placeholder="Optional"
                />
              </div>
              <div>
                <Label htmlFor="host">Host</Label>
                <Input
                  id="host"
                  value={config.host ?? ""}
                  onChange={(e) =>
                    setConfig((prev) => ({
                      ...prev,
                      host: e.target.value || undefined,
                    }))
                  }
                  placeholder="https://example.com"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Output Section */}
      <div>
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <ShieldCheck className="h-5 w-5" />
                Generated robots.txt
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
              <code>{output || "# Empty robots.txt"}</code>
            </pre>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
