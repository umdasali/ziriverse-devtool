"use client";

import { Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { HeaderPair } from "@/types/api-tester";

interface HeadersEditorProps {
  headers: HeaderPair[];
  onChange: (headers: HeaderPair[]) => void;
}

export function HeadersEditor({ headers, onChange }: HeadersEditorProps) {
  const addHeader = () => {
    const newHeader: HeaderPair = {
      id: `header-${Date.now()}`,
      key: "",
      value: "",
      enabled: true,
    };
    onChange([...headers, newHeader]);
  };

  const updateHeader = (id: string, field: "key" | "value", newValue: string) => {
    onChange(
      headers.map((header) =>
        header.id === id ? { ...header, [field]: newValue } : header
      )
    );
  };

  const toggleHeader = (id: string) => {
    onChange(
      headers.map((header) =>
        header.id === id ? { ...header, enabled: !header.enabled } : header
      )
    );
  };

  const removeHeader = (id: string) => {
    onChange(headers.filter((header) => header.id !== id));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Headers</CardTitle>
        <CardDescription>Add custom HTTP headers to your request</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {headers.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-4">
            No headers added. Click &quot;Add Header&quot; to get started.
          </p>
        ) : (
          <div className="space-y-2">
            {headers.map((header) => (
              <div key={header.id} className="flex gap-2 items-center">
                <input
                  type="checkbox"
                  checked={header.enabled}
                  onChange={() => toggleHeader(header.id)}
                  className="h-4 w-4 rounded border-gray-300"
                />

                <Input
                  placeholder="Header name"
                  value={header.key}
                  onChange={(e) => updateHeader(header.id, "key", e.target.value)}
                  disabled={!header.enabled}
                  className="flex-1"
                />

                <Input
                  placeholder="Value"
                  value={header.value}
                  onChange={(e) => updateHeader(header.id, "value", e.target.value)}
                  disabled={!header.enabled}
                  className="flex-1"
                />

                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeHeader(header.id)}
                >
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </div>
            ))}
          </div>
        )}

        <Button onClick={addHeader} variant="outline" className="w-full">
          <Plus className="mr-2 h-4 w-4" />
          Add Header
        </Button>
      </CardContent>
    </Card>
  );
}
