"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useBrandingStore } from "@/stores/branding-store";
import { Moon, Sun, AlertCircle, CheckCircle2, Info, AlertTriangle } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function EnhancedLivePreview() {
  const state = useBrandingStore();
  const { isDarkMode, toggleDarkMode } = state;
  const colors = isDarkMode ? state.darkMode : state.colors;

  const previewStyle: React.CSSProperties = {
    fontFamily: state.typography.fontFamily,
    fontSize: state.typography.bodySize,
    lineHeight: state.typography.lineHeight,
    color: colors.text,
    backgroundColor: colors.background,
    padding: state.spacing.lg,
    borderRadius: state.borderRadius.lg,
  };

  return (
    <Card>
      <CardHeader className="pb-3 sm:pb-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <CardTitle>Live Preview</CardTitle>
            <CardDescription>See your design system in action</CardDescription>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={toggleDarkMode}
            className="w-fit"
          >
            {isDarkMode ? <Sun className="h-4 w-4 mr-2" /> : <Moon className="h-4 w-4 mr-2" />}
            {isDarkMode ? 'Light' : 'Dark'} Mode
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="typography">
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4">
            <TabsTrigger value="typography">Typography</TabsTrigger>
            <TabsTrigger value="colors">Colors</TabsTrigger>
            <TabsTrigger value="components">Components</TabsTrigger>
            <TabsTrigger value="spacing">Spacing</TabsTrigger>
          </TabsList>

          {/* Typography Tab */}
          <TabsContent value="typography">
            <div style={previewStyle} className="space-y-4 overflow-hidden">
              <h1 style={{ fontSize: state.typography.headingSizes.h1, fontWeight: state.typography.fontWeights.bold }}>
                Heading 1
              </h1>
              <h2 style={{ fontSize: state.typography.headingSizes.h2, fontWeight: state.typography.fontWeights.bold }}>
                Heading 2
              </h2>
              <h3 style={{ fontSize: state.typography.headingSizes.h3, fontWeight: state.typography.fontWeights.semibold }}>
                Heading 3
              </h3>
              <p style={{ fontSize: state.typography.bodySize, lineHeight: state.typography.lineHeight }}>
                This is body text. The quick brown fox jumps over the lazy dog. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </p>
              <p style={{ fontSize: state.typography.bodySize, color: colors.muted }}>
                This is muted text for secondary information.
              </p>
            </div>
          </TabsContent>

          {/* Colors Tab */}
          <TabsContent value="colors">
            <div style={previewStyle}>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {Object.entries(colors).map(([name, color]) => (
                  <div key={name} className="text-center">
                    <div
                      className="w-full h-20 rounded-lg mb-2"
                      style={{
                        backgroundColor: color,
                        boxShadow: state.shadows.md,
                      }}
                    />
                    <div className="text-xs font-medium capitalize">{name}</div>
                    <div className="text-xs text-muted-foreground font-mono">{color}</div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Components Tab */}
          <TabsContent value="components">
            <div style={previewStyle} className="space-y-6">
              {/* Buttons */}
              <div className="space-y-3">
                <h4 className="font-semibold">Buttons</h4>
                <div className="flex flex-wrap gap-2">
                  <button
                    style={{
                      backgroundColor: colors.primary,
                      color: 'white',
                      padding: `${state.spacing.sm} ${state.spacing.md}`,
                      borderRadius: state.borderRadius.md,
                      border: 'none',
                      fontWeight: state.typography.fontWeights.medium,
                      cursor: 'pointer',
                      boxShadow: state.shadows.sm,
                      transition: `all ${state.animation.duration.normal} ${state.animation.easing.easeInOut}`,
                    }}
                  >
                    Primary
                  </button>
                  <button
                    style={{
                      backgroundColor: colors.secondary,
                      color: 'white',
                      padding: `${state.spacing.sm} ${state.spacing.md}`,
                      borderRadius: state.borderRadius.md,
                      border: 'none',
                      fontWeight: state.typography.fontWeights.medium,
                      cursor: 'pointer',
                      boxShadow: state.shadows.sm,
                    }}
                  >
                    Secondary
                  </button>
                  <button
                    style={{
                      backgroundColor: colors.accent,
                      color: 'white',
                      padding: `${state.spacing.sm} ${state.spacing.md}`,
                      borderRadius: state.borderRadius.md,
                      border: 'none',
                      fontWeight: state.typography.fontWeights.medium,
                      cursor: 'pointer',
                      boxShadow: state.shadows.sm,
                    }}
                  >
                    Accent
                  </button>
                  <button
                    style={{
                      backgroundColor: 'transparent',
                      color: colors.primary,
                      padding: `${state.spacing.sm} ${state.spacing.md}`,
                      borderRadius: state.borderRadius.md,
                      border: `1px solid ${colors.border}`,
                      fontWeight: state.typography.fontWeights.medium,
                      cursor: 'pointer',
                    }}
                  >
                    Outline
                  </button>
                </div>
              </div>

              {/* Alerts */}
              <div className="space-y-3">
                <h4 className="font-semibold">Alerts</h4>
                <div className="space-y-2">
                  {[
                    { type: 'success', icon: CheckCircle2 },
                    { type: 'warning', icon: AlertTriangle },
                    { type: 'error', icon: AlertCircle },
                    { type: 'info', icon: Info },
                  ].map(({ type, icon: Icon }) => (
                    <div
                      key={type}
                      style={{
                        backgroundColor: `${colors[type as keyof typeof colors]}15`,
                        borderLeft: `4px solid ${colors[type as keyof typeof colors]}`,
                        padding: state.spacing.md,
                        borderRadius: state.borderRadius.md,
                        display: 'flex',
                        alignItems: 'center',
                        gap: state.spacing.sm,
                      }}
                    >
                      <Icon
                        style={{ color: colors[type as keyof typeof colors] }}
                        size={20}
                      />
                      <span style={{ textTransform: 'capitalize' }}>
                        This is a {type} alert message
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Cards */}
              <div className="space-y-3">
                <h4 className="font-semibold">Cards</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {['sm', 'md', 'lg'].map((shadow) => (
                    <div
                      key={shadow}
                      style={{
                        backgroundColor: colors.background,
                        border: `1px solid ${colors.border}`,
                        borderRadius: state.borderRadius.lg,
                        padding: state.spacing.lg,
                        boxShadow: state.shadows[shadow as keyof typeof state.shadows],
                      }}
                    >
                      <h5 style={{ fontWeight: state.typography.fontWeights.semibold, marginBottom: state.spacing.sm }}>
                        Card with {shadow} shadow
                      </h5>
                      <p style={{ fontSize: '0.875rem', color: colors.muted }}>
                        Card content goes here
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Badges */}
              <div className="space-y-3">
                <h4 className="font-semibold">Badges</h4>
                <div className="flex flex-wrap gap-2">
                  {['primary', 'secondary', 'success', 'warning', 'error', 'info'].map((color) => (
                    <span
                      key={color}
                      style={{
                        backgroundColor: colors[color as keyof typeof colors],
                        color: 'white',
                        padding: `${state.spacing.xs} ${state.spacing.sm}`,
                        borderRadius: state.borderRadius.full,
                        fontSize: '0.75rem',
                        fontWeight: state.typography.fontWeights.medium,
                      }}
                    >
                      {color}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Spacing Tab */}
          <TabsContent value="spacing">
            <div style={previewStyle} className="space-y-6">
              <div className="space-y-3">
                <h4 className="font-semibold">Spacing Scale</h4>
                {Object.entries(state.spacing).map(([name, value]) => (
                  <div key={name} className="flex items-center gap-4">
                    <div className="w-20 text-sm font-mono">{name}</div>
                    <div
                      style={{
                        width: value,
                        height: '20px',
                        backgroundColor: colors.primary,
                        borderRadius: state.borderRadius.sm,
                      }}
                    />
                    <div className="text-xs text-muted-foreground">{value}</div>
                  </div>
                ))}
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold">Border Radius</h4>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {Object.entries(state.borderRadius).map(([name, value]) => (
                    <div key={name} className="text-center">
                      <div
                        style={{
                          width: '60px',
                          height: '60px',
                          backgroundColor: colors.primary,
                          borderRadius: value,
                          margin: '0 auto 8px',
                        }}
                      />
                      <div className="text-xs font-medium">{name}</div>
                      <div className="text-xs text-muted-foreground">{value}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold">Shadows</h4>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {Object.entries(state.shadows).map(([name, value]) => (
                    <div key={name} className="text-center">
                      <div
                        style={{
                          width: '80px',
                          height: '60px',
                          backgroundColor: colors.background,
                          boxShadow: value,
                          margin: '0 auto 8px',
                          borderRadius: state.borderRadius.md,
                        }}
                      />
                      <div className="text-xs font-medium">{name}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
