"use client";

import { useState, useMemo } from "react";
import {
  Copy,
  Check,
  Download,
  Code2,
  FileJson,
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  generateSchema,
  schemaTemplates,
  type SchemaType,
} from "@/lib/seo-tools/schema-generator";

const SCHEMA_TYPES: SchemaType[] = [
  "Article",
  "Product",
  "FAQ",
  "Organization",
  "LocalBusiness",
  "BreadcrumbList",
  "WebSite",
];

export function SchemaGeneratorTool() {
  const [selectedType, setSelectedType] = useState<SchemaType>("Article");
  const [values, setValues] = useState<Record<string, string>>({});
  const [copied, setCopied] = useState(false);

  const template = schemaTemplates[selectedType];

  const output = useMemo(
    () => generateSchema(selectedType, values),
    [selectedType, values]
  );

  const handleCopy = async () => {
    const scriptTag = `<script type="application/ld+json">\n${output}\n</script>`;
    await navigator.clipboard.writeText(scriptTag);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const scriptTag = `<script type="application/ld+json">\n${output}\n</script>`;
    const blob = new Blob([scriptTag], {
      type: "application/json;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${selectedType.toLowerCase()}-schema.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleTypeChange = (type: string) => {
    setSelectedType(type as SchemaType);
    setValues({});
  };

  const handleFieldChange = (key: string, value: string) => {
    setValues((prev) => ({ ...prev, [key]: value }));
  };

  const filledCount = template.fields.filter(
    (f) => values[f.key]?.trim()
  ).length;
  const requiredCount = template.fields.filter((f) => f.required).length;
  const filledRequiredCount = template.fields.filter(
    (f) => f.required && values[f.key]?.trim()
  ).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Code2 className="h-5 w-5" />
                Schema Markup Generator
              </CardTitle>
              <CardDescription>
                Generate JSON-LD structured data for rich search results
              </CardDescription>
            </div>
            <Badge
              variant={
                filledRequiredCount === requiredCount
                  ? "default"
                  : "secondary"
              }
              className={
                filledRequiredCount === requiredCount ? "bg-green-500" : ""
              }
            >
              {filledCount}/{template.fields.length} fields
            </Badge>
          </div>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Form Section */}
        <div className="space-y-4">
          {/* Schema Type Selector */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Schema Type</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs
                value={selectedType}
                onValueChange={handleTypeChange}
              >
                <TabsList className="flex flex-wrap h-auto gap-1">
                  {SCHEMA_TYPES.map((type) => (
                    <TabsTrigger
                      key={type}
                      value={type}
                      className="text-xs"
                    >
                      {type}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>
              <p className="text-sm text-muted-foreground mt-3">
                {template.description}
              </p>
            </CardContent>
          </Card>

          {/* Fields */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">
                {selectedType} Fields
              </CardTitle>
              <CardDescription>
                Fill in the fields below. Required fields are marked with{" "}
                <span className="text-destructive">*</span>
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {template.fields.map((field) => (
                <div key={field.key}>
                  <Label htmlFor={`schema-${field.key}`}>
                    {field.label}
                    {field.required && (
                      <span className="text-destructive ml-1">*</span>
                    )}
                  </Label>
                  {field.type === "textarea" ? (
                    <textarea
                      id={`schema-${field.key}`}
                      value={values[field.key] ?? ""}
                      onChange={(e) =>
                        handleFieldChange(field.key, e.target.value)
                      }
                      placeholder={field.placeholder}
                      rows={3}
                      className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 mt-1"
                    />
                  ) : (
                    <Input
                      id={`schema-${field.key}`}
                      type={
                        field.type === "number"
                          ? "number"
                          : field.type === "date"
                            ? "date"
                            : "text"
                      }
                      value={values[field.key] ?? ""}
                      onChange={(e) =>
                        handleFieldChange(field.key, e.target.value)
                      }
                      placeholder={field.placeholder}
                      step={field.type === "number" ? "0.01" : undefined}
                      className="mt-1"
                    />
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Output Section */}
        <div>
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <FileJson className="h-5 w-5" />
                  JSON-LD Output
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
                  <Button
                    onClick={handleDownload}
                    variant="outline"
                    size="sm"
                  >
                    <Download className="mr-1 h-4 w-4" />
                    Download
                  </Button>
                </div>
              </div>
              <CardDescription>
                Add this script tag to your page&apos;s {"<head>"} section
              </CardDescription>
            </CardHeader>
            <CardContent>
              <pre className="p-4 bg-gray-950 text-gray-100 rounded-lg overflow-x-auto text-sm max-h-[600px] overflow-y-auto whitespace-pre-wrap">
                <code>
                  {`<script type="application/ld+json">\n${output}\n</script>`}
                </code>
              </pre>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
