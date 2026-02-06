"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useBrandingStore } from "@/stores/branding-store";

export function ShadowControls() {
  const { shadows, setShadow } = useBrandingStore();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Shadow System</CardTitle>
        <CardDescription>Define elevation levels for your components</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {Object.entries(shadows).map(([key, value]) => (
          <div key={key} className="space-y-2">
            <Label htmlFor={`shadow-${key}`} className="capitalize">
              {key.replace(/([A-Z])/g, ' $1').trim()}
            </Label>
            <div className="flex gap-2">
              <Input
                id={`shadow-${key}`}
                value={value}
                onChange={(e) => setShadow(key as keyof typeof shadows, e.target.value)}
                className="font-mono text-sm"
              />
              <div
                className="w-16 h-10 bg-white border rounded flex-shrink-0"
                style={{ boxShadow: value }}
              />
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
