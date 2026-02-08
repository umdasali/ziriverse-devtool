"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Copy, Check, RefreshCw, Trash2, CheckCircle2, XCircle } from "lucide-react";
import { generateUUID, generateBulkUUIDs, validateUUID, type UUIDResult } from "@/lib/developer-tools/uuid-generator";

export function UUIDGeneratorTool() {
  const [uuids, setUuids] = useState<UUIDResult[]>([generateUUID()]);
  const [bulkCount, setBulkCount] = useState(10);
  const [validateInput, setValidateInput] = useState("");
  const [copied, setCopied] = useState<string | null>(null);
  const [format, setFormat] = useState<"standard" | "noDashes" | "uppercase">("standard");

  const handleCopy = async (text: string, id: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const handleCopyAll = async () => {
    const text = uuids.map((u) => getFormatted(u)).join("\n");
    await navigator.clipboard.writeText(text);
    setCopied("all");
    setTimeout(() => setCopied(null), 2000);
  };

  const getFormatted = (u: UUIDResult) => {
    if (format === "noDashes") return u.withoutDashes;
    if (format === "uppercase") return u.uppercase;
    return u.uuid;
  };

  const isValidInput = validateInput ? validateUUID(validateInput) : null;

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      {/* Generator */}
      <div className="lg:col-span-2 space-y-6">
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <CardTitle className="text-base">Generate UUIDs</CardTitle>
              <div className="flex gap-2">
                <Button size="sm" onClick={() => setUuids([generateUUID(), ...uuids])}>
                  <RefreshCw className="h-3.5 w-3.5 mr-1" />
                  Generate One
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setUuids(generateBulkUUIDs(bulkCount))}
                >
                  Bulk ({bulkCount})
                </Button>
                <Button variant="outline" size="sm" onClick={() => setUuids([])}>
                  <Trash2 className="h-3.5 w-3.5" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {/* Format selector */}
            <div className="flex items-center gap-2">
              <Label className="text-xs text-muted-foreground">Format:</Label>
              {(["standard", "noDashes", "uppercase"] as const).map((f) => (
                <Button
                  key={f}
                  variant={format === f ? "default" : "outline"}
                  size="sm"
                  className="h-7 text-xs"
                  onClick={() => setFormat(f)}
                >
                  {f === "standard" ? "Standard" : f === "noDashes" ? "No Dashes" : "Uppercase"}
                </Button>
              ))}
            </div>

            {/* Bulk count */}
            <div className="flex items-center gap-2">
              <Label className="text-xs text-muted-foreground">Bulk count:</Label>
              <Input
                type="number"
                min={1}
                max={1000}
                value={bulkCount}
                onChange={(e) => setBulkCount(Number(e.target.value))}
                className="w-24 h-7 text-xs"
              />
            </div>

            {/* UUID List */}
            <div className="space-y-1 max-h-[400px] overflow-y-auto">
              {uuids.length === 0 && (
                <p className="text-sm text-muted-foreground py-8 text-center">
                  Click &quot;Generate One&quot; to create a UUID
                </p>
              )}
              {uuids.map((u, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between gap-2 p-2 bg-muted rounded-lg group"
                >
                  <code className="text-sm font-mono truncate">{getFormatted(u)}</code>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-7 w-7 p-0 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0"
                    onClick={() => handleCopy(getFormatted(u), `uuid-${i}`)}
                  >
                    {copied === `uuid-${i}` ? (
                      <Check className="h-3 w-3" />
                    ) : (
                      <Copy className="h-3 w-3" />
                    )}
                  </Button>
                </div>
              ))}
            </div>

            {uuids.length > 0 && (
              <Button variant="outline" size="sm" className="w-full" onClick={handleCopyAll}>
                {copied === "all" ? (
                  <><Check className="h-3.5 w-3.5 mr-1" /> Copied All</>
                ) : (
                  <><Copy className="h-3.5 w-3.5 mr-1" /> Copy All ({uuids.length})</>
                )}
              </Button>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Validator */}
      <Card className="h-fit">
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Validate UUID</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Input
            value={validateInput}
            onChange={(e) => setValidateInput(e.target.value)}
            placeholder="Paste UUID to validate..."
            className="font-mono text-sm"
          />
          {isValidInput !== null && (
            <div
              className={`flex items-center gap-2 p-3 rounded-lg text-sm ${
                isValidInput
                  ? "bg-green-500/10 text-green-600"
                  : "bg-destructive/10 text-destructive"
              }`}
            >
              {isValidInput ? (
                <><CheckCircle2 className="h-4 w-4" /> Valid UUID format</>
              ) : (
                <><XCircle className="h-4 w-4" /> Invalid UUID format</>
              )}
            </div>
          )}

          <div className="pt-3 border-t space-y-2">
            <h4 className="text-sm font-medium">About UUID v4</h4>
            <p className="text-xs text-muted-foreground">
              UUID v4 uses random or pseudo-random numbers. The probability of collision is
              astronomically low - you would need to generate 1 billion UUIDs per second for about
              85 years to have a 50% chance of a collision.
            </p>
            <Badge variant="secondary" className="text-xs">
              122 bits of randomness
            </Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
