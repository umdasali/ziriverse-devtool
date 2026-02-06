"use client";

import { useState } from "react";
import { HexColorPicker } from "react-colorful";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useBrandingStore } from "@/stores/branding-store";
import type { ColorPalette } from "@/types/branding";

const colorLabels: Record<keyof ColorPalette, string> = {
  primary: "Primary",
  secondary: "Secondary",
  accent: "Accent",
  success: "Success",
  warning: "Warning",
  error: "Error",
  info: "Info",
  background: "Background",
  text: "Text",
  border: "Border",
  muted: "Muted",
};

export function ColorControls() {
  const { colors, setColor } = useBrandingStore();
  const [activeColor, setActiveColor] = useState<keyof ColorPalette | null>(
    null
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Colors</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          {Object.entries(colors).map(([key, value]) => (
            <div key={key}>
              <Label htmlFor={`color-${key}`}>{colorLabels[key as keyof ColorPalette]}</Label>
              <div className="flex gap-2 mt-1">
                <button
                  className="w-12 h-10 rounded border-2 border-gray-300"
                  style={{ backgroundColor: value }}
                  onClick={() =>
                    setActiveColor(
                      activeColor === key ? null : (key as keyof ColorPalette)
                    )
                  }
                  aria-label={`Pick ${colorLabels[key as keyof ColorPalette]} color`}
                />
                <Input
                  id={`color-${key}`}
                  value={value}
                  onChange={(e) =>
                    setColor(key as keyof ColorPalette, e.target.value)
                  }
                  className="flex-1"
                />
              </div>
              {activeColor === key && (
                <div className="mt-2">
                  <HexColorPicker
                    color={value}
                    onChange={(color) =>
                      setColor(key as keyof ColorPalette, color)
                    }
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
