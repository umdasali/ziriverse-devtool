import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import {
  Sparkles,
  ArrowLeft,
  ArrowRight,
  Type,
  Palette,
  Layout,
  Moon,
  Download,
  Upload,
  Save,
  RotateCcw,
  History,
  Eye,
  Code2,
  CheckCircle2,
  Info,
  Layers,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Design System Generator Documentation",
  description:
    "Learn how to create comprehensive design systems with 100+ properties and export in CSS, SCSS, JSON, Tailwind, or JavaScript.",
  keywords: [
    "design system tutorial",
    "how to create design tokens",
    "CSS variables guide",
    "Tailwind config generator guide",
    "design system export",
  ],
  alternates: {
    canonical: `${siteConfig.url}/docs/branding`,
  },
  openGraph: {
    title: `Design System Generator Documentation | ${siteConfig.name}`,
    description:
      "Step-by-step guide to building custom design systems with typography, colors, spacing, shadows, and more.",
    url: `${siteConfig.url}/docs/branding`,
    images: [
      {
        url: "/og-image-branding.png",
        width: 1200,
        height: 630,
        alt: "Design System Generator Documentation",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `Design System Generator Docs | ${siteConfig.name}`,
    description:
      "Step-by-step guide to creating design systems with 100+ properties and 5 export formats.",
    images: ["/og-image-branding.png"],
    creator: siteConfig.twitterCreator,
  },
};

export default function BrandingDocsPage() {
  return (
    <div className="container mx-auto px-4 py-12 sm:py-16">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
        <Link href="/docs" className="hover:text-primary transition-colors">
          Documentation
        </Link>
        <span>/</span>
        <span className="text-foreground font-medium">
          Design System Generator
        </span>
      </div>

      {/* Hero */}
      <div className="mb-12">
        <div className="flex items-center gap-4 mb-4">
          <div className="p-3 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 text-white">
            <Sparkles className="h-8 w-8" />
          </div>
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold">
              Design System Generator
            </h1>
            <p className="text-muted-foreground mt-1">
              Create comprehensive design systems with 100+ customizable
              properties
            </p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 mt-4">
          <Badge>100+ Properties</Badge>
          <Badge variant="secondary">Dark Mode</Badge>
          <Badge variant="secondary">5 Export Formats</Badge>
          <Badge variant="secondary">Version Control</Badge>
          <Badge variant="secondary">4 Presets</Badge>
        </div>
      </div>

      {/* Table of Contents */}
      <Card className="border-2 mb-12">
        <CardHeader>
          <CardTitle className="text-lg">On This Page</CardTitle>
        </CardHeader>
        <CardContent>
          <nav className="space-y-2">
            {[
              { label: "Overview", href: "#overview" },
              { label: "Quick Actions", href: "#quick-actions" },
              { label: "Step 1: Explore the Overview", href: "#step-1" },
              { label: "Step 2: Customize Typography", href: "#step-2" },
              { label: "Step 3: Set Colors & Dark Mode", href: "#step-3" },
              {
                label: "Step 4: Configure Layout & Spacing",
                href: "#step-4",
              },
              { label: "Step 5: Preview Your Design", href: "#step-5" },
              { label: "Step 6: Export Your Design System", href: "#step-6" },
              { label: "Version Control", href: "#versions" },
              { label: "Presets", href: "#presets" },
              { label: "Import & Export Config", href: "#import-export" },
              { label: "Tips & Best Practices", href: "#tips" },
            ].map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="block text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </CardContent>
      </Card>

      <div className="max-w-4xl space-y-16">
        {/* Overview */}
        <section id="overview">
          <h2 className="text-2xl font-bold mb-4">Overview</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            The Design System Generator helps you build a complete, consistent
            design system for your projects. Configure typography, colors,
            spacing, shadows, animations, and more - then export everything in
            your preferred format. The live preview updates in real-time as you
            make changes.
          </p>
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="p-4 flex items-start gap-3">
              <Info className="h-5 w-5 text-primary shrink-0 mt-0.5" />
              <p className="text-sm">
                Navigate to{" "}
                <Link
                  href="/branding"
                  className="text-primary font-medium hover:underline"
                >
                  Design System
                </Link>{" "}
                from the top navigation bar. The page is organized into three
                main tabs: Overview, Customize, and Export.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Quick Actions */}
        <section id="quick-actions">
          <h2 className="text-2xl font-bold mb-4">Quick Actions</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            At the top of the page, you&apos;ll find four quick action cards:
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            <Card className="border-2">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Save className="h-5 w-5 text-primary" />
                  <h3 className="font-semibold">Save Version</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Enter a name and save the current state. Up to 20 versions can
                  be stored in your browser.
                </p>
              </CardContent>
            </Card>
            <Card className="border-2">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Layers className="h-5 w-5 text-primary" />
                  <h3 className="font-semibold">Load Preset</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Choose from 4 built-in presets (Default, Material, Tailwind,
                  Bootstrap) to start with a proven foundation.
                </p>
              </CardContent>
            </Card>
            <Card className="border-2">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Download className="h-5 w-5 text-primary" />
                  <h3 className="font-semibold">Export Config</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Download your entire design system as a JSON file for backup or
                  sharing with team members.
                </p>
              </CardContent>
            </Card>
            <Card className="border-2">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Upload className="h-5 w-5 text-primary" />
                  <h3 className="font-semibold">Import Config</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Load a previously exported JSON file to restore a design system
                  configuration.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Step 1 */}
        <section id="step-1">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary text-primary-foreground font-bold text-lg">
              1
            </div>
            <h2 className="text-2xl font-bold">Explore the Overview</h2>
          </div>
          <div className="space-y-4">
            <p className="text-muted-foreground leading-relaxed">
              The <strong>Overview</strong> tab gives you a bird&apos;s-eye view
              of your design system:
            </p>
            <ul className="space-y-2">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <p className="text-sm text-muted-foreground">
                  <strong>Live Preview:</strong> A full-width preview showing
                  typography, colors, components, and spacing using your current
                  settings.
                </p>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <p className="text-sm text-muted-foreground">
                  <strong>Feature Cards:</strong> Quick stats showing 100+
                  properties, dark mode support, 5 export formats, and version
                  control capabilities.
                </p>
              </li>
            </ul>
            <p className="text-sm text-muted-foreground">
              The live preview has 4 tabs: Typography, Colors, Components, and
              Spacing - giving you a comprehensive view of how all values work
              together.
            </p>
          </div>
        </section>

        {/* Step 2 */}
        <section id="step-2">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary text-primary-foreground font-bold text-lg">
              2
            </div>
            <h2 className="text-2xl font-bold">Customize Typography</h2>
          </div>
          <div className="space-y-4">
            <p className="text-muted-foreground leading-relaxed">
              Switch to the <strong>Customize</strong> tab. In the left panel,
              the <strong>Text</strong> sub-tab controls typography:
            </p>
            <Card className="border-2">
              <CardContent className="p-4 space-y-3">
                <div className="flex items-center gap-2">
                  <Type className="h-5 w-5 text-primary" />
                  <h3 className="font-semibold">Typography Controls</h3>
                </div>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li>
                    <strong>Font Family:</strong> Select from 5 options -
                    Inter, Roboto, Open Sans, Lato, or Poppins. Each includes
                    system fallback fonts.
                  </li>
                  <li>
                    <strong>Heading Sizes (H1-H4):</strong> Set font sizes for
                    each heading level. Values use rem units for responsive
                    scaling.
                  </li>
                  <li>
                    <strong>Body Size:</strong> The default text size for
                    paragraphs and general content.
                  </li>
                  <li>
                    <strong>Line Height:</strong> Controls vertical spacing
                    between lines of text. 1.5-1.6 is recommended for body text.
                  </li>
                </ul>
              </CardContent>
            </Card>
            <p className="text-sm text-muted-foreground">
              Changes update the live preview on the right in real-time, so you
              can see exactly how your typography choices look.
            </p>
          </div>
        </section>

        {/* Step 3 */}
        <section id="step-3">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary text-primary-foreground font-bold text-lg">
              3
            </div>
            <h2 className="text-2xl font-bold">Set Colors & Dark Mode</h2>
          </div>
          <div className="space-y-4">
            <p className="text-muted-foreground leading-relaxed">
              Switch to the <strong>Colors</strong> sub-tab to configure your
              color palette:
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              <Card className="border-2">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Palette className="h-5 w-5 text-primary" />
                    <h3 className="font-semibold">Light Mode Colors</h3>
                    <Badge variant="secondary" className="text-xs">
                      11 colors
                    </Badge>
                  </div>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>
                      <strong>Brand:</strong> Primary, Secondary, Accent
                    </li>
                    <li>
                      <strong>Status:</strong> Success, Warning, Error, Info
                    </li>
                    <li>
                      <strong>Base:</strong> Background, Text, Border, Muted
                    </li>
                  </ul>
                  <p className="text-xs text-muted-foreground mt-2">
                    Click any color swatch to open the color picker popup.
                  </p>
                </CardContent>
              </Card>
              <Card className="border-2">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Moon className="h-5 w-5 text-primary" />
                    <h3 className="font-semibold">Dark Mode Colors</h3>
                    <Badge variant="secondary" className="text-xs">
                      11 colors
                    </Badge>
                  </div>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>Separate configuration for dark theme</li>
                    <li>Same 11 color slots as light mode</li>
                    <li>Preview with dark mode toggle</li>
                  </ul>
                  <p className="text-xs text-muted-foreground mt-2">
                    Exported CSS includes{" "}
                    <code className="bg-muted px-1 py-0.5 rounded text-xs">
                      [data-theme=&quot;dark&quot;]
                    </code>{" "}
                    overrides.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Step 4 */}
        <section id="step-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary text-primary-foreground font-bold text-lg">
              4
            </div>
            <h2 className="text-2xl font-bold">Configure Layout & Spacing</h2>
          </div>
          <div className="space-y-4">
            <p className="text-muted-foreground leading-relaxed">
              Switch to the <strong>Layout</strong> sub-tab for spacing,
              shadows, and animations:
            </p>
            <div className="space-y-3">
              <Card className="border-2">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Layout className="h-4 w-4 text-primary" />
                    <h3 className="font-semibold text-sm">
                      Spacing Scale (8 levels)
                    </h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Configure spacing from XS to 4XL. These values are used for
                    padding, margin, and gap utilities. Uses rem units by default.
                  </p>
                </CardContent>
              </Card>
              <Card className="border-2">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Layout className="h-4 w-4 text-primary" />
                    <h3 className="font-semibold text-sm">
                      Border Radius (6 levels)
                    </h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Set corner rounding from none to full (9999px). Values control
                    how rounded buttons, cards, and inputs appear.
                  </p>
                </CardContent>
              </Card>
              <Card className="border-2">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Layers className="h-4 w-4 text-primary" />
                    <h3 className="font-semibold text-sm">
                      Shadow System (6 levels)
                    </h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Define elevation shadows from SM to 2XL plus an inner shadow.
                    Each shadow has a live preview box so you can see the result.
                  </p>
                </CardContent>
              </Card>
              <Card className="border-2">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="h-4 w-4 text-primary" />
                    <h3 className="font-semibold text-sm">Animation Controls</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Set animation durations (fast, normal, slow) and easing
                    functions (linear, ease-in, ease-out, ease-in-out) for
                    transitions and animations.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Step 5 */}
        <section id="step-5">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary text-primary-foreground font-bold text-lg">
              5
            </div>
            <h2 className="text-2xl font-bold">Preview Your Design</h2>
          </div>
          <div className="space-y-4">
            <p className="text-muted-foreground leading-relaxed">
              The live preview panel on the right (in Customize tab) or full-width
              (in Overview tab) shows your design system in action with 4 preview
              tabs:
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              <Card className="border-2">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Eye className="h-4 w-4 text-primary" />
                    <h3 className="font-semibold text-sm">Typography Preview</h3>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    H1-H3 heading samples, body text, and muted text rendered with
                    your font family, sizes, and weights.
                  </p>
                </CardContent>
              </Card>
              <Card className="border-2">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Eye className="h-4 w-4 text-primary" />
                    <h3 className="font-semibold text-sm">Colors Preview</h3>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Grid of all 11 color swatches showing color names and hex
                    values. Toggle dark mode to see the dark palette.
                  </p>
                </CardContent>
              </Card>
              <Card className="border-2">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Eye className="h-4 w-4 text-primary" />
                    <h3 className="font-semibold text-sm">Components Preview</h3>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Buttons (primary, secondary, accent, outline), alerts (4
                    types), cards (3 shadow levels), and badges (6 variants).
                  </p>
                </CardContent>
              </Card>
              <Card className="border-2">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Eye className="h-4 w-4 text-primary" />
                    <h3 className="font-semibold text-sm">Spacing Preview</h3>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Spacing scale visualization, border radius samples, and shadow
                    examples rendered with your values.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Step 6 */}
        <section id="step-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary text-primary-foreground font-bold text-lg">
              6
            </div>
            <h2 className="text-2xl font-bold">Export Your Design System</h2>
          </div>
          <div className="space-y-4">
            <p className="text-muted-foreground leading-relaxed">
              Switch to the <strong>Export</strong> tab to generate code in 5
              formats. Each format includes a syntax-highlighted preview, a copy
              button, and a download button.
            </p>
            <div className="space-y-3">
              {[
                {
                  name: "CSS",
                  desc: "Complete CSS with custom properties (--var), dark mode overrides, base styles, utility classes, component styles, grid system, and responsive breakpoints.",
                  icon: Code2,
                },
                {
                  name: "SCSS",
                  desc: "Sass variables ($var format) for use in SCSS/Sass projects. Compatible with any Sass-based build pipeline.",
                  icon: Code2,
                },
                {
                  name: "JSON",
                  desc: "Complete design tokens in JSON format. Ideal for design token tools, style dictionaries, or custom build systems.",
                  icon: Code2,
                },
                {
                  name: "Tailwind",
                  desc: "Ready-to-use Tailwind config (module.exports) with theme.extend for colors, spacing, shadows, animations, and breakpoints.",
                  icon: Code2,
                },
                {
                  name: "JavaScript",
                  desc: "ES6 module with named exports for each design category. Tree-shakeable for optimal bundle size.",
                  icon: Code2,
                },
              ].map((format) => (
                <Card key={format.name} className="border-2">
                  <CardContent className="p-4 flex items-start gap-4">
                    <Badge className="shrink-0">{format.name}</Badge>
                    <div>
                      <h3 className="font-semibold text-sm">{format.name}</h3>
                      <p className="text-xs text-muted-foreground mt-1">
                        {format.desc}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            <p className="text-sm text-muted-foreground">
              Use the <strong>&quot;Download All&quot;</strong> button to download
              all formats at once, or download individual formats as needed.
            </p>
          </div>
        </section>

        {/* Version Control */}
        <section id="versions">
          <h2 className="text-2xl font-bold mb-4">Version Control</h2>
          <div className="space-y-4">
            <p className="text-muted-foreground leading-relaxed">
              Save up to 20 versions of your design system and switch between
              them:
            </p>
            <Card className="border-2">
              <CardContent className="p-4 space-y-3">
                <div className="flex items-center gap-2">
                  <History className="h-5 w-5 text-primary" />
                  <h3 className="font-semibold">How to Use Versions</h3>
                </div>
                <ol className="text-sm text-muted-foreground space-y-2 list-decimal list-inside">
                  <li>
                    Enter a descriptive name in the &quot;Save Version&quot; card
                    (e.g., &quot;v1 - Blue Theme&quot;).
                  </li>
                  <li>
                    Click <strong>Save</strong> or press Enter to save the
                    current state.
                  </li>
                  <li>
                    Click <strong>Versions</strong> in the header to open the
                    version history panel.
                  </li>
                  <li>
                    Click <strong>Load</strong> on any version to restore it.
                  </li>
                  <li>
                    Click <strong>Delete</strong> to remove versions you no
                    longer need.
                  </li>
                </ol>
              </CardContent>
            </Card>
            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="p-4 flex items-start gap-3">
                <Info className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <p className="text-sm">
                  Versions are stored in your browser&apos;s local storage. Use
                  Export Config to create a portable backup you can share or
                  transfer between devices.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Presets */}
        <section id="presets">
          <h2 className="text-2xl font-bold mb-4">Presets</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Start with a proven foundation by loading one of the 4 built-in
            presets:
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              {
                name: "Default",
                desc: "A clean, balanced design system with blue primary color and Inter font. Good starting point for most projects.",
              },
              {
                name: "Material",
                desc: "Based on Google's Material Design 3. Uses Roboto font with Material color palette and spacing conventions.",
              },
              {
                name: "Tailwind",
                desc: "Matches Tailwind CSS default theme. Uses the standard Tailwind color palette, spacing scale, and typography.",
              },
              {
                name: "Bootstrap",
                desc: "Based on Bootstrap 5 defaults. Uses Bootstrap's color scheme, spacing, and typography conventions.",
              },
            ].map((preset) => (
              <Card key={preset.name} className="border-2">
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-1">{preset.name}</h3>
                  <p className="text-sm text-muted-foreground">{preset.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          <p className="text-sm text-muted-foreground mt-4">
            Loading a preset replaces all current values. Save your current work
            as a version first if you want to keep it.
          </p>
        </section>

        {/* Import / Export */}
        <section id="import-export">
          <h2 className="text-2xl font-bold mb-4">Import & Export Config</h2>
          <div className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <Card className="border-2">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Download className="h-5 w-5 text-primary" />
                    <h3 className="font-semibold">Exporting</h3>
                  </div>
                  <ol className="text-sm text-muted-foreground space-y-1 list-decimal list-inside">
                    <li>Click &quot;Export JSON&quot; in the quick actions.</li>
                    <li>
                      A JSON file downloads with all your design system values.
                    </li>
                    <li>Share this file with teammates or use it as a backup.</li>
                  </ol>
                </CardContent>
              </Card>
              <Card className="border-2">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Upload className="h-5 w-5 text-primary" />
                    <h3 className="font-semibold">Importing</h3>
                  </div>
                  <ol className="text-sm text-muted-foreground space-y-1 list-decimal list-inside">
                    <li>Click &quot;Import JSON&quot; in the quick actions.</li>
                    <li>Select a previously exported JSON file.</li>
                    <li>
                      All values are restored and the preview updates instantly.
                    </li>
                  </ol>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Tips */}
        <section id="tips">
          <h2 className="text-2xl font-bold mb-4">Tips & Best Practices</h2>
          <div className="space-y-3">
            {[
              "Start with a preset closest to your desired style, then customize from there.",
              "Save versions frequently, especially before making major changes to your color palette.",
              "Use the dark mode controls to ensure your design works well in both light and dark themes.",
              "The live preview's Components tab is the best way to see how all your values work together in real UI elements.",
              "Export as Tailwind config if you're using Tailwind CSS - it drops right into your tailwind.config.js.",
              "Use JSON export for design token workflows with tools like Style Dictionary.",
              "The CSS export includes ready-to-use utility classes, component styles, and responsive breakpoints.",
              "Click the Reset button to return all values to defaults if you want a fresh start.",
            ].map((tip, i) => (
              <Card key={i} className="border-2">
                <CardContent className="p-4 flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <p className="text-sm text-muted-foreground">{tip}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Navigation */}
        <div className="flex items-center justify-between pt-8 border-t">
          <Link
            href="/docs/seo-validator"
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            SEO Validator Guide
          </Link>
          <Link
            href="/docs/dev-tools"
            className="flex items-center gap-2 text-sm text-primary font-medium hover:underline"
          >
            Developer Tools Guide
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
