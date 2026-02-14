"use client";

import { useState, useEffect } from "react";
import { RotateCcw, Download, Upload, Save, History as HistoryIcon, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { TypographyControls } from "@/components/branding/typography-controls";
import { ColorControls } from "@/components/branding/color-controls";
import { SpacingControls } from "@/components/branding/spacing-controls";
import { ShadowControls } from "@/components/branding/shadow-controls";
import { AnimationControls } from "@/components/branding/animation-controls";
import { DarkModeControls } from "@/components/branding/darkmode-controls";
import { EnhancedLivePreview } from "@/components/branding/enhanced-live-preview";
import { AdvancedCodeOutput } from "@/components/branding/advanced-code-output";
import { useBrandingStore } from "@/stores/branding-store";
import { presets } from "@/lib/branding/presets";
import type { DesignVersion } from "@/types/branding";

export default function BrandingPage() {
  const { loadPreset, reset, loadState, exportState } = useBrandingStore();
  const [versions, setVersions] = useState<DesignVersion[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const [versionName, setVersionName] = useState("");

  // Load versions from localStorage
  useEffect(() => {
    const savedVersions = localStorage.getItem("design-versions");
    if (savedVersions) {
      try {
        setVersions(JSON.parse(savedVersions));
      } catch (e) {
        console.error("Failed to load versions", e);
      }
    }
  }, []);

  // Save current design as version
  const handleSaveVersion = () => {
    if (!versionName.trim()) {
      alert("Please enter a name for this version");
      return;
    }

    const newVersion: DesignVersion = {
      id: Date.now().toString(),
      name: versionName,
      timestamp: Date.now(),
      state: exportState(),
    };

    const updatedVersions = [newVersion, ...versions].slice(0, 20); // Keep last 20
    setVersions(updatedVersions);
    localStorage.setItem("design-versions", JSON.stringify(updatedVersions));
    setVersionName("");
    alert(`Version "${versionName}" saved!`);
  };

  // Load version
  const handleLoadVersion = (version: DesignVersion) => {
    loadState(version.state);
    setShowHistory(false);
  };

  // Delete version
  const handleDeleteVersion = (id: string) => {
    const updated = versions.filter(v => v.id !== id);
    setVersions(updated);
    localStorage.setItem("design-versions", JSON.stringify(updated));
  };

  // Export JSON
  const handleExportJSON = () => {
    const state = exportState();
    const blob = new Blob([JSON.stringify(state, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `design-system-${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Import JSON
  const handleImportJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const state = JSON.parse(event.target?.result as string);
        loadState(state);
        alert("Design system imported successfully!");
      } catch (error) {
        alert("Failed to import design system. Invalid JSON file.");
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  return (
    <div className="container py-8 space-y-8">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Sparkles className="h-8 w-8" />
            Advanced Design System Generator
          </h1>
          <p className="text-muted-foreground mt-2">
            Create comprehensive design systems with 100+ customizable properties
          </p>
        </div>
        <div className="flex gap-2">
          <Button onClick={() => setShowHistory(!showHistory)} variant="outline" size="sm">
            <HistoryIcon className="mr-2 h-4 w-4" />
            Versions ({versions.length})
          </Button>
          <Button onClick={reset} variant="outline" size="sm">
            <RotateCcw className="mr-2 h-4 w-4" />
            Reset
          </Button>
        </div>
      </div>

      {/* Version History Panel */}
      {showHistory && (
        <Card>
          <CardHeader>
            <CardTitle>Version History</CardTitle>
            <CardDescription>Load previously saved design systems</CardDescription>
          </CardHeader>
          <CardContent>
            {versions.length === 0 ? (
              <p className="text-muted-foreground text-sm">No saved versions yet!</p>
            ) : (
              <div className="space-y-2">
                {versions.map((version) => (
                  <div
                    key={version.id}
                    className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex-1">
                      <div className="font-medium">{version.name}</div>
                      <div className="text-xs text-muted-foreground">
                        {new Date(version.timestamp).toLocaleString()}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleLoadVersion(version)}
                      >
                        Load
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleDeleteVersion(version.id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Quick Actions */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {/* Save Version */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Save Version</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Input
              placeholder="Version name..."
              value={versionName}
              onChange={(e) => setVersionName(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSaveVersion()}
            />
            <Button onClick={handleSaveVersion} size="sm" className="w-full">
              <Save className="mr-2 h-3 w-3" />
              Save
            </Button>
          </CardContent>
        </Card>

        {/* Load Preset */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Load Preset</CardTitle>
          </CardHeader>
          <CardContent>
            <Select onValueChange={(value) => {
              const preset = presets.find((p) => p.name === value);
              if (preset) loadPreset(preset);
            }}>
              <SelectTrigger>
                <SelectValue placeholder="Choose preset..." />
              </SelectTrigger>
              <SelectContent>
                {presets.map((preset) => (
                  <SelectItem key={preset.name} value={preset.name}>
                    {preset.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        {/* Export JSON */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Export Config</CardTitle>
          </CardHeader>
          <CardContent>
            <Button onClick={handleExportJSON} variant="outline" size="sm" className="w-full">
              <Download className="mr-2 h-3 w-3" />
              Export JSON
            </Button>
          </CardContent>
        </Card>

        {/* Import JSON */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Import Config</CardTitle>
          </CardHeader>
          <CardContent>
            <label htmlFor="import-json">
              <Button variant="outline" size="sm" className="w-full cursor-pointer" asChild>
                <span>
                  <Upload className="mr-2 h-3 w-3" />
                  Import JSON
                </span>
              </Button>
              <input
                id="import-json"
                type="file"
                accept=".json"
                onChange={handleImportJSON}
                className="hidden"
              />
            </label>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="customize">Customize</TabsTrigger>
          <TabsTrigger value="export">Export</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <EnhancedLivePreview />

          {/* Features */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="pb-3">
                <Badge variant="secondary" className="w-fit">100+ Properties</Badge>
                <CardTitle className="text-sm mt-2">Comprehensive</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground">
                  Typography, colors, spacing, shadows, animations, grid, and more
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <Badge variant="secondary" className="w-fit">Dark Mode</Badge>
                <CardTitle className="text-sm mt-2">Theme Support</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground">
                  Built-in dark mode with separate color configuration
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <Badge variant="secondary" className="w-fit">5 Formats</Badge>
                <CardTitle className="text-sm mt-2">Multiple Exports</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground">
                  CSS, SCSS, JSON, Tailwind config, and JavaScript
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <Badge variant="secondary" className="w-fit">Version Control</Badge>
                <CardTitle className="text-sm mt-2">History</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground">
                  Save and load multiple design system versions
                </p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Customize Tab */}
        <TabsContent value="customize">
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Left Column - Controls */}
            <div className="space-y-6">
              <Tabs defaultValue="typography">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="typography">Text</TabsTrigger>
                  <TabsTrigger value="colors">Colors</TabsTrigger>
                  <TabsTrigger value="layout">Layout</TabsTrigger>
                </TabsList>

                <TabsContent value="typography" className="space-y-6">
                  <TypographyControls />
                </TabsContent>

                <TabsContent value="colors" className="space-y-6">
                  <ColorControls />
                  <DarkModeControls />
                </TabsContent>

                <TabsContent value="layout" className="space-y-6">
                  <SpacingControls />
                  <ShadowControls />
                  <AnimationControls />
                </TabsContent>
              </Tabs>
            </div>

            {/* Right Column - Preview */}
            <div className="space-y-6">
              <EnhancedLivePreview />
            </div>
          </div>
        </TabsContent>

        {/* Export Tab */}
        <TabsContent value="export">
          <AdvancedCodeOutput />
        </TabsContent>
      </Tabs>
    </div>
  );
}
