"use client";

import { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, CheckCircle2, Info } from "lucide-react";
import { useBrandingStore } from "@/stores/branding-store";

export function AccessibilityChecker() {
  const { colors, darkMode, isDarkMode } = useBrandingStore();
  const activeColors = isDarkMode ? darkMode : colors;

  // Calculate contrast ratio between two colors
  const getContrastRatio = (color1: string, color2: string): number => {
    const getLuminance = (hex: string): number => {
      // Remove # if present
      hex = hex.replace("#", "");

      // Convert to RGB
      const r = parseInt(hex.substr(0, 2), 16) / 255;
      const g = parseInt(hex.substr(2, 2), 16) / 255;
      const b = parseInt(hex.substr(4, 2), 16) / 255;

      // Apply gamma correction
      const sRGBtoLinear = (val: number) =>
        val <= 0.03928 ? val / 12.92 : Math.pow((val + 0.055) / 1.055, 2.4);

      const rLinear = sRGBtoLinear(r);
      const gLinear = sRGBtoLinear(g);
      const bLinear = sRGBtoLinear(b);

      // Calculate relative luminance
      return 0.2126 * rLinear + 0.7152 * gLinear + 0.0722 * bLinear;
    };

    const lum1 = getLuminance(color1);
    const lum2 = getLuminance(color2);

    const lighter = Math.max(lum1, lum2);
    const darker = Math.min(lum1, lum2);

    return (lighter + 0.05) / (darker + 0.05);
  };

  // WCAG compliance levels
  const getComplianceLevel = (ratio: number, isLargeText: boolean = false) => {
    if (isLargeText) {
      if (ratio >= 4.5) return { level: "AAA", color: "text-green-600" };
      if (ratio >= 3) return { level: "AA", color: "text-green-500" };
      return { level: "Fail", color: "text-red-600" };
    } else {
      if (ratio >= 7) return { level: "AAA", color: "text-green-600" };
      if (ratio >= 4.5) return { level: "AA", color: "text-green-500" };
      return { level: "Fail", color: "text-red-600" };
    }
  };

  // Check all important color combinations
  const colorChecks = useMemo(() => {
    return [
      {
        name: "Text on Background",
        foreground: activeColors.text,
        background: activeColors.background,
        ratio: getContrastRatio(activeColors.text, activeColors.background),
        critical: true,
      },
      {
        name: "Primary on Background",
        foreground: activeColors.primary,
        background: activeColors.background,
        ratio: getContrastRatio(activeColors.primary, activeColors.background),
        critical: true,
      },
      {
        name: "Secondary on Background",
        foreground: activeColors.secondary,
        background: activeColors.background,
        ratio: getContrastRatio(activeColors.secondary, activeColors.background),
        critical: false,
      },
      {
        name: "White on Primary",
        foreground: "#ffffff",
        background: activeColors.primary,
        ratio: getContrastRatio("#ffffff", activeColors.primary),
        critical: true,
      },
      {
        name: "Success on Background",
        foreground: activeColors.success,
        background: activeColors.background,
        ratio: getContrastRatio(activeColors.success, activeColors.background),
        critical: false,
      },
      {
        name: "Error on Background",
        foreground: activeColors.error,
        background: activeColors.background,
        ratio: getContrastRatio(activeColors.error, activeColors.background),
        critical: false,
      },
      {
        name: "Warning on Background",
        foreground: activeColors.warning,
        background: activeColors.background,
        ratio: getContrastRatio(activeColors.warning, activeColors.background),
        critical: false,
      },
      {
        name: "Muted on Background",
        foreground: activeColors.muted,
        background: activeColors.background,
        ratio: getContrastRatio(activeColors.muted, activeColors.background),
        critical: false,
      },
    ];
  }, [activeColors]);

  // Calculate overall score
  const passingChecks = colorChecks.filter((check) => check.ratio >= 4.5).length;
  const totalScore = Math.round((passingChecks / colorChecks.length) * 100);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Accessibility Score</span>
            <Badge
              variant={totalScore >= 80 ? "default" : totalScore >= 60 ? "secondary" : "destructive"}
              className="text-lg px-4"
            >
              {totalScore}%
            </Badge>
          </CardTitle>
          <CardDescription>
            WCAG 2.1 color contrast compliance for {isDarkMode ? "dark" : "light"} mode
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-1 text-sm">
            <p className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-green-600" />
              <span className="font-medium">AA:</span> Minimum contrast ratio of 4.5:1 for normal text
            </p>
            <p className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-green-600" />
              <span className="font-medium">AAA:</span> Enhanced contrast ratio of 7:1 for normal text
            </p>
            <p className="flex items-center gap-2">
              <Info className="w-4 h-4 text-blue-600" />
              <span className="font-medium">Large text:</span> Lower thresholds (3:1 for AA, 4.5:1 for AAA)
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Color Contrast Checks</CardTitle>
          <CardDescription>
            {passingChecks} of {colorChecks.length} combinations pass AA standard
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {colorChecks.map((check, index) => {
            const normalText = getComplianceLevel(check.ratio, false);
            const largeText = getComplianceLevel(check.ratio, true);

            return (
              <div
                key={index}
                className={`p-4 border rounded-lg ${
                  check.ratio < 4.5 && check.critical ? "border-red-200 bg-red-50/50" : ""
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-medium">{check.name}</h4>
                      {check.critical && check.ratio < 4.5 && (
                        <Badge variant="destructive" className="text-xs">
                          <AlertCircle className="w-3 h-3 mr-1" />
                          Critical
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Ratio: <span className="font-mono font-semibold">{check.ratio.toFixed(2)}:1</span>
                    </p>
                  </div>

                  {/* Color swatches */}
                  <div className="flex gap-2 items-center">
                    <div
                      className="w-8 h-8 rounded border"
                      style={{ backgroundColor: check.foreground }}
                      title={`Foreground: ${check.foreground}`}
                    />
                    <span className="text-xs text-muted-foreground">on</span>
                    <div
                      className="w-8 h-8 rounded border"
                      style={{ backgroundColor: check.background }}
                      title={`Background: ${check.background}`}
                    />
                  </div>
                </div>

                {/* Compliance badges */}
                <div className="flex gap-2 text-xs">
                  <div className="flex items-center gap-1">
                    <span className="text-muted-foreground">Normal text:</span>
                    <Badge
                      variant={normalText.level === "Fail" ? "destructive" : "secondary"}
                      className={normalText.color}
                    >
                      {normalText.level}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-muted-foreground">Large text:</span>
                    <Badge
                      variant={largeText.level === "Fail" ? "destructive" : "secondary"}
                      className={largeText.color}
                    >
                      {largeText.level}
                    </Badge>
                  </div>
                </div>

                {/* Example preview */}
                <div className="mt-3 p-2 rounded" style={{ backgroundColor: check.background }}>
                  <p className="text-sm" style={{ color: check.foreground }}>
                    Sample text preview
                  </p>
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>

      {/* Recommendations */}
      {totalScore < 80 && (
        <Card className="border-yellow-200 bg-yellow-50/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-yellow-800">
              <AlertCircle className="w-5 h-5" />
              Accessibility Recommendations
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-yellow-800 space-y-2">
            <p>• Increase contrast between text and background colors</p>
            <p>• Ensure primary and error colors have sufficient contrast</p>
            <p>• Test with actual users who have visual impairments</p>
            <p>• Consider using darker text colors or lighter backgrounds</p>
            <p>• Aim for AAA compliance (7:1 ratio) for critical content</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
