"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useBrandingStore } from "@/stores/branding-store";

const fontFamilies = [
  { value: "Inter, system-ui, sans-serif", label: "Inter" },
  { value: "Roboto, system-ui, sans-serif", label: "Roboto" },
  { value: "ui-sans-serif, system-ui, sans-serif", label: "System UI" },
  { value: "Georgia, serif", label: "Georgia" },
  { value: "ui-monospace, monospace", label: "Monospace" },
];

export function TypographyControls() {
  const { typography, setFontFamily, setHeadingSize, setBodySize, setLineHeight } =
    useBrandingStore();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Typography</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label>Font Family</Label>
          <Select value={typography.fontFamily} onValueChange={setFontFamily}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {fontFamilies.map((font) => (
                <SelectItem key={font.value} value={font.value}>
                  {font.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <Label htmlFor="h1-size">H1 Size</Label>
            <Input
              id="h1-size"
              value={typography.headingSizes.h1}
              onChange={(e) => setHeadingSize("h1", e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="h2-size">H2 Size</Label>
            <Input
              id="h2-size"
              value={typography.headingSizes.h2}
              onChange={(e) => setHeadingSize("h2", e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="h3-size">H3 Size</Label>
            <Input
              id="h3-size"
              value={typography.headingSizes.h3}
              onChange={(e) => setHeadingSize("h3", e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="h4-size">H4 Size</Label>
            <Input
              id="h4-size"
              value={typography.headingSizes.h4}
              onChange={(e) => setHeadingSize("h4", e.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <Label htmlFor="body-size">Body Size</Label>
            <Input
              id="body-size"
              value={typography.bodySize}
              onChange={(e) => setBodySize(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="line-height">Line Height</Label>
            <Input
              id="line-height"
              value={typography.lineHeight}
              onChange={(e) => setLineHeight(e.target.value)}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
