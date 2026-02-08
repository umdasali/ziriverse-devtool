import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import {
  Paintbrush,
  ArrowLeft,
  Palette,
  Eye,
  Download,
  CheckCircle2,
  Info,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Color Palette Generator Documentation",
  description:
    "Learn how to generate color palettes with 6 harmony types, shades and tints, WCAG contrast checking, and export in CSS, SCSS, or JSON.",
  keywords: [
    "color palette generator",
    "color theory",
    "color harmony",
    "WCAG contrast checker",
    "complementary colors",
    "analogous colors",
    "triadic colors",
    "tetradic colors",
    "split complementary colors",
    "monochromatic colors",
    "color shades and tints",
    "accessible color contrast",
    "CSS color variables",
    "design tokens colors",
  ],
  alternates: {
    canonical: `${siteConfig.url}/docs/color-palette`,
  },
  openGraph: {
    title: `Color Palette Generator Documentation | ${siteConfig.name}`,
    description:
      "Step-by-step guide to generating harmonious color palettes with WCAG contrast checking and multiple export formats.",
    url: `${siteConfig.url}/docs/color-palette`,
    images: [
      {
        url: "/og-image-color-palette.png",
        width: 1200,
        height: 630,
        alt: "Color Palette Generator Documentation",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `Color Palette Generator Docs | ${siteConfig.name}`,
    description:
      "Guide to generating color palettes with 6 harmony types, WCAG contrast checking, and 3 export formats.",
    images: ["/og-image-color-palette.png"],
    creator: siteConfig.twitterCreator,
  },
};

export default function ColorPaletteDocsPage() {
  return (
    <div className="container mx-auto px-4 py-12 sm:py-16">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
        <Link href="/docs" className="hover:text-primary transition-colors">
          Documentation
        </Link>
        <span>/</span>
        <span className="text-foreground font-medium">
          Color Palette Generator
        </span>
      </div>

      {/* Hero */}
      <div className="mb-12">
        <div className="flex items-center gap-4 mb-4">
          <div className="p-3 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 text-white">
            <Paintbrush className="h-8 w-8" />
          </div>
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold">
              Color Palette Generator
            </h1>
            <p className="text-muted-foreground mt-1">
              Create harmonious color palettes with contrast checking and
              multiple export formats
            </p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 mt-4">
          <Badge>New</Badge>
          <Badge variant="secondary">Color Theory</Badge>
          <Badge variant="secondary">WCAG Contrast</Badge>
          <Badge variant="secondary">3 Export Formats</Badge>
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
              {
                label: "Step 1: Choose a Base Color",
                href: "#step-1",
              },
              {
                label: "Step 2: Select a Harmony Type",
                href: "#step-2",
              },
              {
                label: "Step 3: Explore Shades & Tints",
                href: "#step-3",
              },
              {
                label: "Step 4: Check WCAG Contrast",
                href: "#step-4",
              },
              {
                label: "Step 5: Export Your Palette",
                href: "#step-5",
              },
              { label: "Harmony Types", href: "#harmony-types" },
              { label: "WCAG Compliance Levels", href: "#wcag-levels" },
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
            The Color Palette Generator helps you create harmonious color
            palettes based on color theory principles. Start with any base
            color, choose a harmony type, and the tool generates a complete
            palette with shades and tints for each color. A built-in WCAG
            contrast checker ensures your color combinations meet accessibility
            standards.
          </p>
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="p-4 flex items-start gap-3">
              <Info className="h-5 w-5 text-primary shrink-0 mt-0.5" />
              <p className="text-sm">
                Navigate to{" "}
                <Link
                  href="/tools/branding/color-palette"
                  className="text-primary font-medium hover:underline"
                >
                  Color Palette Generator
                </Link>{" "}
                from the Branding Tools section or the top navigation bar. All
                processing happens in your browser - no data is sent to any
                server.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Step 1 */}
        <section id="step-1">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary text-primary-foreground font-bold text-lg">
              1
            </div>
            <h2 className="text-2xl font-bold">Choose a Base Color</h2>
          </div>
          <div className="space-y-4">
            <p className="text-muted-foreground leading-relaxed">
              Your base color is the foundation of the entire palette. Every
              harmony calculation starts from this color.
            </p>
            <ul className="space-y-2">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <p className="text-sm text-muted-foreground">
                  <strong>Color Picker:</strong> Click the color swatch to open
                  an interactive color picker. Drag to select any hue,
                  saturation, and lightness combination.
                </p>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <p className="text-sm text-muted-foreground">
                  <strong>Hex Input:</strong> Type a hex color value directly
                  (e.g.,{" "}
                  <code className="bg-muted px-1 py-0.5 rounded text-xs">
                    #3b82f6
                  </code>
                  ) for precise color selection.
                </p>
              </li>
            </ul>
            <p className="text-sm text-muted-foreground">
              The palette updates in real-time as you adjust the base color, so
              you can see the resulting harmonies instantly.
            </p>
          </div>
        </section>

        {/* Step 2 */}
        <section id="step-2">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary text-primary-foreground font-bold text-lg">
              2
            </div>
            <h2 className="text-2xl font-bold">Select a Harmony Type</h2>
          </div>
          <div className="space-y-4">
            <p className="text-muted-foreground leading-relaxed">
              Choose from 6 color harmony types. Each applies a different
              color theory formula to generate complementary colors from your
              base:
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                {
                  name: "Complementary",
                  desc: "2 colors positioned opposite each other on the color wheel. Creates high contrast and visual impact.",
                },
                {
                  name: "Analogous",
                  desc: "3 colors adjacent on the color wheel. Produces a harmonious, unified feel with low contrast.",
                },
                {
                  name: "Triadic",
                  desc: "3 colors evenly spaced 120\u00b0 apart on the color wheel. Offers vibrant variety while staying balanced.",
                },
                {
                  name: "Tetradic",
                  desc: "4 colors forming a rectangle on the color wheel. Provides the most color variety for rich palettes.",
                },
                {
                  name: "Split Complementary",
                  desc: "3 colors: the base plus 2 colors adjacent to its complement. High contrast with less tension than complementary.",
                },
                {
                  name: "Monochromatic",
                  desc: "5 variations of the same hue at different saturation and lightness levels. Clean and cohesive.",
                },
              ].map((harmony) => (
                <Card key={harmony.name} className="border-2">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Palette className="h-4 w-4 text-primary" />
                      <h3 className="font-semibold text-sm">{harmony.name}</h3>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {harmony.desc}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
            <p className="text-sm text-muted-foreground">
              Switch between harmony types to compare results. The palette
              regenerates instantly when you change the selection.
            </p>
          </div>
        </section>

        {/* Step 3 */}
        <section id="step-3">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary text-primary-foreground font-bold text-lg">
              3
            </div>
            <h2 className="text-2xl font-bold">Explore Shades & Tints</h2>
          </div>
          <div className="space-y-4">
            <p className="text-muted-foreground leading-relaxed">
              For each color in your generated palette, an 11-stop scale is
              automatically created ranging from the lightest tint to the
              darkest shade:
            </p>
            <Card className="border-2">
              <CardContent className="p-4 space-y-3">
                <div className="flex items-center gap-2">
                  <Palette className="h-5 w-5 text-primary" />
                  <h3 className="font-semibold">11-Stop Scale</h3>
                </div>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                    <span>
                      <strong>Tints (lighter):</strong> The base color mixed
                      with increasing amounts of white, creating lighter
                      variations ideal for backgrounds and hover states.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                    <span>
                      <strong>Base color:</strong> Your original color sits at
                      the center of the scale.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                    <span>
                      <strong>Shades (darker):</strong> The base color mixed
                      with increasing amounts of black, creating darker
                      variations for text, borders, and active states.
                    </span>
                  </li>
                </ul>
              </CardContent>
            </Card>
            <p className="text-sm text-muted-foreground">
              Click any swatch in the scale to copy its hex value to the
              clipboard. This gives you a complete range from light to dark for
              every color in your palette.
            </p>
          </div>
        </section>

        {/* Step 4 */}
        <section id="step-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary text-primary-foreground font-bold text-lg">
              4
            </div>
            <h2 className="text-2xl font-bold">Check WCAG Contrast</h2>
          </div>
          <div className="space-y-4">
            <p className="text-muted-foreground leading-relaxed">
              The built-in WCAG contrast checker helps you verify that your
              color combinations meet accessibility requirements:
            </p>
            <Card className="border-2">
              <CardContent className="p-4 space-y-3">
                <div className="flex items-center gap-2">
                  <Eye className="h-5 w-5 text-primary" />
                  <h3 className="font-semibold">How to Check Contrast</h3>
                </div>
                <ol className="text-sm text-muted-foreground space-y-2 list-decimal list-inside">
                  <li>
                    Select a <strong>text color</strong> (foreground) from the
                    palette or enter a custom hex value.
                  </li>
                  <li>
                    Select a <strong>background color</strong> from the palette
                    or enter a custom hex value.
                  </li>
                  <li>
                    The tool displays the <strong>contrast ratio</strong>{" "}
                    between the two colors (e.g., 4.5:1).
                  </li>
                  <li>
                    Compliance badges show whether the combination passes{" "}
                    <strong>WCAG AA</strong> and <strong>WCAG AAA</strong>{" "}
                    levels for both normal and large text.
                  </li>
                </ol>
              </CardContent>
            </Card>
            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="p-4 flex items-start gap-3">
                <Info className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <p className="text-sm">
                  A contrast ratio of at least <strong>4.5:1</strong> is
                  required for WCAG AA (normal text) and{" "}
                  <strong>3:1</strong> for large text. WCAG AAA requires{" "}
                  <strong>7:1</strong> for normal text and{" "}
                  <strong>4.5:1</strong> for large text.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Step 5 */}
        <section id="step-5">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary text-primary-foreground font-bold text-lg">
              5
            </div>
            <h2 className="text-2xl font-bold">Export Your Palette</h2>
          </div>
          <div className="space-y-4">
            <p className="text-muted-foreground leading-relaxed">
              Export your generated palette in 3 formats. Each includes the
              full palette with all shades and tints.
            </p>
            <div className="space-y-3">
              {[
                {
                  name: "CSS Custom Properties",
                  desc: "Export as CSS custom properties (--var) ready to drop into your stylesheet. Includes all palette colors, shades, and tints as named variables.",
                },
                {
                  name: "SCSS Variables",
                  desc: "Export as Sass variables ($var format) for use in SCSS/Sass projects. Compatible with any Sass-based build pipeline.",
                },
                {
                  name: "JSON Design Tokens",
                  desc: "Export as a structured JSON file containing all color values. Ideal for design token tools, style dictionaries, or custom build systems.",
                },
              ].map((format) => (
                <Card key={format.name} className="border-2">
                  <CardContent className="p-4 flex items-start gap-4">
                    <Download className="h-5 w-5 text-primary shrink-0 mt-0.5" />
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
              Each export includes a copy button for quick clipboard access and
              a download button to save the file locally.
            </p>
          </div>
        </section>

        {/* Harmony Types Detail */}
        <section id="harmony-types">
          <h2 className="text-2xl font-bold mb-4">Harmony Types</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Understanding color harmony helps you choose the right palette for
            your project. Here is a detailed breakdown of each type:
          </p>
          <div className="space-y-3">
            <Card className="border-2">
              <CardContent className="p-4">
                <h3 className="font-semibold mb-1">Complementary</h3>
                <p className="text-sm text-muted-foreground">
                  Uses 2 colors that sit directly opposite each other on the
                  color wheel (180&deg; apart). This creates the strongest
                  contrast and is ideal for call-to-action elements, buttons,
                  and areas where you want maximum visual impact. Use one color
                  as the dominant and the other as an accent.
                </p>
              </CardContent>
            </Card>
            <Card className="border-2">
              <CardContent className="p-4">
                <h3 className="font-semibold mb-1">Analogous</h3>
                <p className="text-sm text-muted-foreground">
                  Uses 3 colors that are adjacent on the color wheel. This
                  produces a serene, comfortable design with minimal contrast.
                  Best for creating a unified look where no single color
                  dominates. Common in nature-inspired and editorial designs.
                </p>
              </CardContent>
            </Card>
            <Card className="border-2">
              <CardContent className="p-4">
                <h3 className="font-semibold mb-1">Triadic</h3>
                <p className="text-sm text-muted-foreground">
                  Uses 3 colors evenly spaced at 120&deg; intervals on the
                  color wheel. Offers vibrant variety while maintaining visual
                  balance. Works well when you need multiple distinct colors
                  that still feel cohesive, such as in dashboards or data
                  visualizations.
                </p>
              </CardContent>
            </Card>
            <Card className="border-2">
              <CardContent className="p-4">
                <h3 className="font-semibold mb-1">Tetradic</h3>
                <p className="text-sm text-muted-foreground">
                  Uses 4 colors forming a rectangle on the color wheel (two
                  complementary pairs). Provides the most color variety and is
                  best for complex interfaces with many elements. Balance is
                  key - let one color dominate and use the others as accents.
                </p>
              </CardContent>
            </Card>
            <Card className="border-2">
              <CardContent className="p-4">
                <h3 className="font-semibold mb-1">Split Complementary</h3>
                <p className="text-sm text-muted-foreground">
                  Uses 3 colors: the base color plus the two colors adjacent to
                  its complement. Provides high contrast similar to
                  complementary but with less visual tension. A great choice
                  when you want contrast without the boldness of a direct
                  complement.
                </p>
              </CardContent>
            </Card>
            <Card className="border-2">
              <CardContent className="p-4">
                <h3 className="font-semibold mb-1">Monochromatic</h3>
                <p className="text-sm text-muted-foreground">
                  Uses 5 variations of the same hue at different saturation and
                  lightness levels. Creates a clean, elegant, and cohesive
                  look. Ideal for minimalist designs, single-brand pages, or
                  when you want a sophisticated, understated palette.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* WCAG Compliance Levels */}
        <section id="wcag-levels">
          <h2 className="text-2xl font-bold mb-4">WCAG Compliance Levels</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            The Web Content Accessibility Guidelines (WCAG) define minimum
            contrast ratios to ensure text is readable for users with visual
            impairments:
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            <Card className="border-2">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Badge>AA</Badge>
                  <h3 className="font-semibold text-sm">Level AA</h3>
                </div>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>
                    <strong>Normal text:</strong> Minimum contrast ratio of
                    4.5:1
                  </li>
                  <li>
                    <strong>Large text:</strong> Minimum contrast ratio of 3:1
                  </li>
                  <li>
                    Large text is defined as 18pt (24px) or 14pt (18.66px) bold
                  </li>
                </ul>
                <p className="text-xs text-muted-foreground mt-2">
                  This is the minimum recommended level for most web content.
                </p>
              </CardContent>
            </Card>
            <Card className="border-2">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Badge>AAA</Badge>
                  <h3 className="font-semibold text-sm">Level AAA</h3>
                </div>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>
                    <strong>Normal text:</strong> Minimum contrast ratio of 7:1
                  </li>
                  <li>
                    <strong>Large text:</strong> Minimum contrast ratio of
                    4.5:1
                  </li>
                  <li>
                    Provides enhanced accessibility for users with low vision
                  </li>
                </ul>
                <p className="text-xs text-muted-foreground mt-2">
                  The highest level of compliance, recommended for critical
                  content.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Tips */}
        <section id="tips">
          <h2 className="text-2xl font-bold mb-4">Tips & Best Practices</h2>
          <div className="space-y-3">
            {[
              "Start with your brand\u0027s primary color as the base to ensure the generated palette aligns with your identity.",
              "Use the complementary harmony for high-impact designs like landing pages and call-to-action sections.",
              "Analogous palettes work best for content-heavy pages where a calm, unified feel is important.",
              "Always check contrast ratios before finalizing your palette - aim for WCAG AA at minimum for body text.",
              "The monochromatic harmony is ideal for minimalist designs or when you want a single-brand color to dominate.",
              "Use lighter tints for backgrounds and hover states, and darker shades for text and active states.",
              "Export as JSON design tokens if you use tools like Style Dictionary or Figma Tokens for your workflow.",
              "Test your palette in both light and dark contexts to ensure versatility across different themes.",
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
            href="/docs/seo-tools"
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            SEO Tools Docs
          </Link>
          <Link
            href="/docs"
            className="flex items-center gap-2 text-sm text-primary font-medium hover:underline"
          >
            Back to Documentation
          </Link>
        </div>
      </div>
    </div>
  );
}
