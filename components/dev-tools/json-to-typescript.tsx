"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { CodeDisplay } from "./code-display";
import { jsonToTypeScript } from "@/lib/dev-tools/json-parser";
import type { JSONToTSOptions } from "@/types/dev-tools";

interface JSONToTypeScriptProps {
  initialInput?: string;
  onGenerate?: (input: string, output: string) => void;
}

const defaultOptions: JSONToTSOptions = {
  outputType: "interface",
  useExport: true,
  makeOptional: false,
  makeReadonly: false,
  includeComments: true,
  rootTypeName: "Root",
};

export function JSONToTypeScript({
  initialInput = "",
  onGenerate,
}: JSONToTypeScriptProps) {
  const [jsonInput, setJsonInput] = useState(initialInput);
  const [options, setOptions] = useState<JSONToTSOptions>(defaultOptions);
  const [output, setOutput] = useState("");
  const [error, setError] = useState<string | null>(null);

  // Auto-generate on input change (debounced)
  useEffect(() => {
    const timer = setTimeout(() => {
      if (jsonInput.trim()) {
        handleGenerate();
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [jsonInput, options]);

  const handleGenerate = () => {
    setError(null);
    const result = jsonToTypeScript(jsonInput, options);

    if (result.error) {
      setError(result.error);
      setOutput("");
    } else {
      setOutput(result.typescript);
      if (onGenerate) {
        onGenerate(jsonInput, result.typescript);
      }
    }
  };

  const loadExample = () => {
    const example = JSON.stringify(
      {
        name: "John Doe",
        age: 30,
        email: "john@example.com",
        isActive: true,
        roles: ["admin", "user"],
        address: {
          street: "123 Main St",
          city: "New York",
          zipCode: "10001",
        },
        metadata: {
          createdAt: "2024-01-01T00:00:00Z",
          tags: ["important", "verified"],
        },
      },
      null,
      2
    );
    setJsonInput(example);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Left Column: Input & Options */}
      <div className="space-y-6">
        <Card className="p-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>JSON Input</Label>
              <Button size="sm" variant="outline" onClick={loadExample}>
                Load Example
              </Button>
            </div>
            <Textarea
              placeholder='{"name": "John", "age": 30}'
              value={jsonInput}
              onChange={(e) => setJsonInput(e.target.value)}
              className="font-mono text-sm min-h-[300px]"
            />
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Options</h3>
          <div className="space-y-4">
            {/* Type Name */}
            <div>
              <Label htmlFor="typeName">Type Name</Label>
              <Input
                id="typeName"
                value={options.rootTypeName}
                onChange={(e) =>
                  setOptions({ ...options, rootTypeName: e.target.value })
                }
                placeholder="Root"
              />
            </div>

            {/* Output Type */}
            <div className="flex items-center gap-4">
              <Label>Output Type</Label>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant={options.outputType === "interface" ? "default" : "outline"}
                  onClick={() => setOptions({ ...options, outputType: "interface" })}
                >
                  Interface
                </Button>
                <Button
                  size="sm"
                  variant={options.outputType === "type" ? "default" : "outline"}
                  onClick={() => setOptions({ ...options, outputType: "type" })}
                >
                  Type
                </Button>
              </div>
            </div>

            {/* Checkboxes */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={options.useExport}
                  onChange={(e) =>
                    setOptions({ ...options, useExport: e.target.checked })
                  }
                  className="w-4 h-4"
                />
                <span className="text-sm">Add export keyword</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={options.makeOptional}
                  onChange={(e) =>
                    setOptions({ ...options, makeOptional: e.target.checked })
                  }
                  className="w-4 h-4"
                />
                <span className="text-sm">Make properties optional (?)</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={options.makeReadonly}
                  onChange={(e) =>
                    setOptions({ ...options, makeReadonly: e.target.checked })
                  }
                  className="w-4 h-4"
                />
                <span className="text-sm">Make properties readonly</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={options.includeComments}
                  onChange={(e) =>
                    setOptions({ ...options, includeComments: e.target.checked })
                  }
                  className="w-4 h-4"
                />
                <span className="text-sm">Include comments</span>
              </label>
            </div>
          </div>
        </Card>
      </div>

      {/* Right Column: Output */}
      <div className="space-y-6">
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="w-4 h-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {output && (
          <CodeDisplay
            code={output}
            language="typescript"
            filename={`${options.rootTypeName}.ts`}
          />
        )}

        {!output && !error && (
          <Card className="p-12 text-center">
            <p className="text-muted-foreground">
              Enter valid JSON to generate TypeScript definitions
            </p>
          </Card>
        )}
      </div>
    </div>
  );
}
