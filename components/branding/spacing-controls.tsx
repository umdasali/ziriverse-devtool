"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useBrandingStore } from "@/stores/branding-store";

export function SpacingControls() {
  const { spacing, borderRadius, setSpacing, setBorderRadius } = useBrandingStore();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Spacing & Borders</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="spacing">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="spacing">Spacing</TabsTrigger>
            <TabsTrigger value="radius">Border Radius</TabsTrigger>
          </TabsList>

          <TabsContent value="spacing" className="space-y-3 mt-4">
            <div className="grid grid-cols-2 gap-3">
              {Object.entries(spacing).map(([key, value]) => (
                <div key={key}>
                  <Label htmlFor={`spacing-${key}`}>
                    {key.toUpperCase()}
                  </Label>
                  <Input
                    id={`spacing-${key}`}
                    value={value}
                    onChange={(e) =>
                      setSpacing(
                        key as keyof typeof spacing,
                        e.target.value
                      )
                    }
                  />
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="radius" className="space-y-3 mt-4">
            <div className="grid grid-cols-2 gap-3">
              {Object.entries(borderRadius).map(([key, value]) => (
                <div key={key}>
                  <Label htmlFor={`radius-${key}`}>
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                  </Label>
                  <Input
                    id={`radius-${key}`}
                    value={value}
                    onChange={(e) =>
                      setBorderRadius(
                        key as keyof typeof borderRadius,
                        e.target.value
                      )
                    }
                  />
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
