"use client";

import { Plus, Trash2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import type { RequestBody, BodyType, FormDataPair } from "@/types/api-tester";
import { validateJson } from "@/lib/api-tester/validation";

interface BodyEditorProps {
  body: RequestBody;
  onChange: (body: RequestBody) => void;
}

export function BodyEditor({ body, onChange }: BodyEditorProps) {
  const handleTypeChange = (type: BodyType) => {
    onChange({ ...body, type });
  };

  const handleJsonChange = (json: string) => {
    onChange({ ...body, json });
  };

  const handleRawChange = (raw: string) => {
    onChange({ ...body, raw });
  };

  const addFormDataPair = () => {
    const newPair: FormDataPair = {
      id: `form-${Date.now()}`,
      key: "",
      value: "",
      enabled: true,
    };
    onChange({
      ...body,
      formData: [...(body.formData || []), newPair],
    });
  };

  const updateFormDataPair = (id: string, field: "key" | "value", newValue: string) => {
    onChange({
      ...body,
      formData: body.formData?.map((pair) =>
        pair.id === id ? { ...pair, [field]: newValue } : pair
      ),
    });
  };

  const toggleFormDataPair = (id: string) => {
    onChange({
      ...body,
      formData: body.formData?.map((pair) =>
        pair.id === id ? { ...pair, enabled: !pair.enabled } : pair
      ),
    });
  };

  const removeFormDataPair = (id: string) => {
    onChange({
      ...body,
      formData: body.formData?.filter((pair) => pair.id !== id),
    });
  };

  const isJsonValid = body.type === "json" && body.json ? validateJson(body.json) : true;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Request Body</CardTitle>
        <CardDescription>Configure the request payload</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="body-type">Body Type</Label>
          <Select value={body.type} onValueChange={(value) => handleTypeChange(value as BodyType)}>
            <SelectTrigger id="body-type">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">None</SelectItem>
              <SelectItem value="json">JSON</SelectItem>
              <SelectItem value="form-data">Form Data</SelectItem>
              <SelectItem value="raw">Raw Text</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {body.type === "json" && (
          <div className="space-y-2">
            <Label htmlFor="json-body">JSON</Label>
            <Textarea
              id="json-body"
              placeholder='{\n  "key": "value"\n}'
              value={body.json || ""}
              onChange={(e) => handleJsonChange(e.target.value)}
              rows={8}
              className="font-mono text-sm"
            />
            {body.json && !isJsonValid && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>Invalid JSON format</AlertDescription>
              </Alert>
            )}
          </div>
        )}

        {body.type === "form-data" && (
          <div className="space-y-4">
            {!body.formData || body.formData.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-4">
                No form data added. Click &quot;Add Field&quot; to get started.
              </p>
            ) : (
              <div className="space-y-2">
                {body.formData.map((pair) => (
                  <div key={pair.id} className="flex gap-2 items-center">
                    <input
                      type="checkbox"
                      checked={pair.enabled}
                      onChange={() => toggleFormDataPair(pair.id)}
                      className="h-4 w-4 rounded border-gray-300"
                    />

                    <Input
                      placeholder="Field name"
                      value={pair.key}
                      onChange={(e) => updateFormDataPair(pair.id, "key", e.target.value)}
                      disabled={!pair.enabled}
                      className="flex-1"
                    />

                    <Input
                      placeholder="Value"
                      value={pair.value}
                      onChange={(e) => updateFormDataPair(pair.id, "value", e.target.value)}
                      disabled={!pair.enabled}
                      className="flex-1"
                    />

                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeFormDataPair(pair.id)}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                ))}
              </div>
            )}

            <Button onClick={addFormDataPair} variant="outline" className="w-full">
              <Plus className="mr-2 h-4 w-4" />
              Add Field
            </Button>
          </div>
        )}

        {body.type === "raw" && (
          <div className="space-y-2">
            <Label htmlFor="raw-body">Raw Text</Label>
            <Textarea
              id="raw-body"
              placeholder="Enter raw request body..."
              value={body.raw || ""}
              onChange={(e) => handleRawChange(e.target.value)}
              rows={8}
              className="font-mono text-sm"
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
}
