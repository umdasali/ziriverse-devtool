"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useBrandingStore } from "@/stores/branding-store";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function AnimationControls() {
  const { animation, setAnimationDuration, setAnimationEasing } = useBrandingStore();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Animation Settings</CardTitle>
        <CardDescription>Configure transitions and timing functions</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="duration">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="duration">Duration</TabsTrigger>
            <TabsTrigger value="easing">Easing</TabsTrigger>
          </TabsList>

          <TabsContent value="duration" className="space-y-4 pt-4">
            {Object.entries(animation.duration).map(([key, value]) => (
              <div key={key} className="space-y-2">
                <Label htmlFor={`duration-${key}`} className="capitalize">{key}</Label>
                <Input
                  id={`duration-${key}`}
                  value={value}
                  onChange={(e) => setAnimationDuration(key as keyof typeof animation.duration, e.target.value)}
                  className="font-mono text-sm"
                  placeholder="e.g., 300ms"
                />
              </div>
            ))}
          </TabsContent>

          <TabsContent value="easing" className="space-y-4 pt-4">
            {Object.entries(animation.easing).map(([key, value]) => (
              <div key={key} className="space-y-2">
                <Label htmlFor={`easing-${key}`} className="capitalize">{key}</Label>
                <Input
                  id={`easing-${key}`}
                  value={value}
                  onChange={(e) => setAnimationEasing(key as keyof typeof animation.easing, e.target.value)}
                  className="font-mono text-sm"
                  placeholder="e.g., cubic-bezier(...)"
                />
              </div>
            ))}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
