"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useBrandingStore } from "@/stores/branding-store";

export function LivePreview() {
  const { typography, colors, spacing, borderRadius } = useBrandingStore();

  const styles = {
    fontFamily: typography.fontFamily,
    color: colors.text,
    backgroundColor: colors.background,
    lineHeight: typography.lineHeight,
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Live Preview</CardTitle>
      </CardHeader>
      <CardContent>
        <div
          className="p-6 border rounded-lg"
          style={{
            ...styles,
            borderColor: colors.border,
            borderRadius: borderRadius.lg,
          }}
        >
          {/* Headings */}
          <h1
            style={{
              fontSize: typography.headingSizes.h1,
              fontWeight: typography.fontWeights.bold,
              marginBottom: spacing.md,
            }}
          >
            Heading 1
          </h1>
          <h2
            style={{
              fontSize: typography.headingSizes.h2,
              fontWeight: typography.fontWeights.bold,
              marginBottom: spacing.md,
            }}
          >
            Heading 2
          </h2>
          <h3
            style={{
              fontSize: typography.headingSizes.h3,
              fontWeight: typography.fontWeights.semibold,
              marginBottom: spacing.md,
            }}
          >
            Heading 3
          </h3>

          {/* Body Text */}
          <p
            style={{
              fontSize: typography.bodySize,
              marginBottom: spacing.md,
            }}
          >
            This is a paragraph with regular body text. It demonstrates how your
            chosen typography settings will look in actual content. The line
            height and font family are applied here.
          </p>

          {/* Buttons */}
          <div className="flex gap-3 mb-6">
            <button
              style={{
                backgroundColor: colors.primary,
                color: "#ffffff",
                padding: `${spacing.sm} ${spacing.lg}`,
                borderRadius: borderRadius.md,
                fontWeight: typography.fontWeights.medium,
                border: "none",
                cursor: "pointer",
              }}
            >
              Primary Button
            </button>
            <button
              style={{
                backgroundColor: colors.secondary,
                color: "#ffffff",
                padding: `${spacing.sm} ${spacing.lg}`,
                borderRadius: borderRadius.md,
                fontWeight: typography.fontWeights.medium,
                border: "none",
                cursor: "pointer",
              }}
            >
              Secondary Button
            </button>
            <button
              style={{
                backgroundColor: "transparent",
                color: colors.primary,
                padding: `${spacing.sm} ${spacing.lg}`,
                borderRadius: borderRadius.md,
                fontWeight: typography.fontWeights.medium,
                border: `1px solid ${colors.border}`,
                cursor: "pointer",
              }}
            >
              Outline Button
            </button>
          </div>

          {/* Card Example */}
          <div
            style={{
              padding: spacing.lg,
              backgroundColor: colors.background,
              border: `1px solid ${colors.border}`,
              borderRadius: borderRadius.lg,
              marginBottom: spacing.md,
            }}
          >
            <h4
              style={{
                fontSize: typography.headingSizes.h4,
                fontWeight: typography.fontWeights.semibold,
                marginBottom: spacing.sm,
              }}
            >
              Card Title
            </h4>
            <p style={{ fontSize: typography.bodySize, marginBottom: 0 }}>
              This is a card component showing how borders, spacing, and colors
              work together.
            </p>
          </div>

          {/* Form Input */}
          <div style={{ marginBottom: spacing.md }}>
            <label
              style={{
                display: "block",
                fontSize: typography.bodySize,
                fontWeight: typography.fontWeights.medium,
                marginBottom: spacing.xs,
              }}
            >
              Email Address
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              style={{
                width: "100%",
                padding: spacing.sm,
                fontSize: typography.bodySize,
                border: `1px solid ${colors.border}`,
                borderRadius: borderRadius.md,
                fontFamily: typography.fontFamily,
              }}
            />
          </div>

          {/* Color Swatches */}
          <div>
            <h5
              style={{
                fontSize: typography.headingSizes.h5,
                fontWeight: typography.fontWeights.semibold,
                marginBottom: spacing.sm,
              }}
            >
              Color Palette
            </h5>
            <div className="flex gap-2">
              {Object.entries(colors).map(([key, value]) => (
                <div key={key} className="text-center">
                  <div
                    style={{
                      width: "60px",
                      height: "60px",
                      backgroundColor: value,
                      borderRadius: borderRadius.md,
                      border: `1px solid ${colors.border}`,
                    }}
                  />
                  <p
                    style={{
                      fontSize: "0.75rem",
                      marginTop: spacing.xs,
                      textTransform: "capitalize",
                    }}
                  >
                    {key}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
