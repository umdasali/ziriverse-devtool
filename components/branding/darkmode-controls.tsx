"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { HexColorPicker } from "react-colorful";
import { Input } from "@/components/ui/input";
import { useBrandingStore } from "@/stores/branding-store";
import { useState } from "react";
import { Moon } from "lucide-react";

export function DarkModeControls() {
  const { darkMode, setDarkModeColor } = useBrandingStore();
  const [activeColor, setActiveColor] = useState<keyof typeof darkMode | null>(null);

  const colorLabels: Record<keyof typeof darkMode, string> = {
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

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Moon className="h-5 w-5" />
          Dark Mode Colors
        </CardTitle>
        <CardDescription>Define colors for dark theme variant</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          {Object.entries(darkMode).map(([key, value]) => (
            <div key={key} className="space-y-2">
              <Label className="text-xs">{colorLabels[key as keyof typeof darkMode]}</Label>
              <div className="flex gap-2">
                <div
                  className="w-10 h-10 rounded border-2 cursor-pointer flex-shrink-0"
                  style={{ backgroundColor: value }}
                  onClick={() =>
                    setActiveColor(activeColor === key ? null : (key as keyof typeof darkMode))
                  }
                />
                <Input
                  value={value}
                  onChange={(e) =>
                    setDarkModeColor(key as keyof typeof darkMode, e.target.value)
                  }
                  className="font-mono text-xs"
                />
              </div>
            </div>
          ))}
        </div>

        {activeColor && (
          <div className="pt-4 border-t">
            <Label className="text-sm mb-2 block">
              Adjust {colorLabels[activeColor]}
            </Label>
            <HexColorPicker
              color={darkMode[activeColor]}
              onChange={(color) => setDarkModeColor(activeColor, color)}
              style={{ width: "100%" }}
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
}
