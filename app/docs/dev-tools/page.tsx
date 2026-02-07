import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import {
  Code2,
  ArrowLeft,
  FileJson,
  Ruler,
  Shapes,
  Search,
  History,
  CheckCircle2,
  Info,
  Copy,
  Download,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Developer Tools Documentation",
  description:
    "Learn how to use JSON to TypeScript converter, CSS unit converter with clamp(), SVG path visualizer, and regex tester with explanations.",
  keywords: [
    "JSON to TypeScript tutorial",
    "CSS unit converter guide",
    "SVG path visualizer guide",
    "regex tester tutorial",
    "developer tools guide",
  ],
  alternates: {
    canonical: `${siteConfig.url}/docs/dev-tools`,
  },
  openGraph: {
    title: `Developer Tools Documentation | ${siteConfig.name}`,
    description:
      "Step-by-step guides for 4 essential developer utilities with real-time processing and history.",
    url: `${siteConfig.url}/docs/dev-tools`,
    images: [
      {
        url: "/og-image-dev-tools.png",
        width: 1200,
        height: 630,
        alt: "Developer Tools Documentation",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `Developer Tools Docs | ${siteConfig.name}`,
    description:
      "Guides for JSON to TypeScript, CSS unit converter, SVG path visualizer, and regex tester.",
    images: ["/og-image-dev-tools.png"],
    creator: siteConfig.twitterCreator,
  },
};

export default function DevToolsDocsPage() {
  return (
    <div className="container mx-auto px-4 py-12 sm:py-16">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
        <Link href="/docs" className="hover:text-primary transition-colors">
          Documentation
        </Link>
        <span>/</span>
        <span className="text-foreground font-medium">Developer Tools</span>
      </div>

      {/* Hero */}
      <div className="mb-12">
        <div className="flex items-center gap-4 mb-4">
          <div className="p-3 rounded-lg bg-gradient-to-br from-orange-500 to-red-500 text-white">
            <Code2 className="h-8 w-8" />
          </div>
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold">Developer Tools</h1>
            <p className="text-muted-foreground mt-1">
              Essential utilities for modern web development
            </p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 mt-4">
          <Badge>4 Tools</Badge>
          <Badge variant="secondary">Real-time Processing</Badge>
          <Badge variant="secondary">Client-side Only</Badge>
          <Badge variant="secondary">History Tracking</Badge>
          <Badge variant="secondary">Copy & Download</Badge>
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
              { label: "JSON to TypeScript", href: "#json-to-ts" },
              { label: "CSS Unit Converter", href: "#css-converter" },
              { label: "SVG Path Visualizer", href: "#svg-visualizer" },
              { label: "Regex Tester", href: "#regex-tester" },
              { label: "Using History", href: "#history" },
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
            The Developer Tools page contains 4 essential utilities accessible
            through tabs. All processing happens in your browser - no data is
            sent to any server. Each tool includes real-time feedback, copy/download
            functionality, and history tracking.
          </p>
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="p-4 flex items-start gap-3">
              <Info className="h-5 w-5 text-primary shrink-0 mt-0.5" />
              <p className="text-sm">
                Navigate to{" "}
                <Link
                  href="/dev-tools"
                  className="text-primary font-medium hover:underline"
                >
                  Dev Tools
                </Link>{" "}
                from the top navigation bar. Switch between tools using the tab
                bar at the top of the page.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* JSON to TypeScript */}
        <section id="json-to-ts">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-blue-500/10">
              <FileJson className="h-6 w-6 text-blue-500" />
            </div>
            <h2 className="text-2xl font-bold">JSON to TypeScript</h2>
          </div>
          <div className="space-y-4">
            <p className="text-muted-foreground leading-relaxed">
              Convert JSON objects into type-safe TypeScript interfaces or type
              aliases. Handles nested objects, arrays, and optional fields.
            </p>

            <h3 className="font-semibold text-lg">How to Use</h3>
            <ol className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-500 text-white text-xs font-bold shrink-0 mt-0.5">
                  1
                </span>
                <p className="text-sm text-muted-foreground">
                  <strong>Paste your JSON</strong> into the left input panel.
                  You can also click &quot;Load Example&quot; to see a sample
                  JSON structure.
                </p>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-500 text-white text-xs font-bold shrink-0 mt-0.5">
                  2
                </span>
                <p className="text-sm text-muted-foreground">
                  <strong>Configure options:</strong> Set the root interface name,
                  choose between &quot;interface&quot; or &quot;type&quot; output,
                  and toggle whether to make fields optional.
                </p>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-500 text-white text-xs font-bold shrink-0 mt-0.5">
                  3
                </span>
                <p className="text-sm text-muted-foreground">
                  <strong>Click &quot;Generate&quot;</strong> to produce the
                  TypeScript output. The result appears in the right panel.
                </p>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-500 text-white text-xs font-bold shrink-0 mt-0.5">
                  4
                </span>
                <p className="text-sm text-muted-foreground">
                  <strong>Copy or download</strong> the generated TypeScript code
                  using the buttons above the output.
                </p>
              </li>
            </ol>

            <Card className="bg-blue-500/5 border-blue-500/20">
              <CardContent className="p-4">
                <h4 className="font-semibold text-sm mb-2">Features</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-blue-500 shrink-0 mt-0.5" />
                    Handles nested objects and arrays automatically
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-blue-500 shrink-0 mt-0.5" />
                    Generates separate interfaces for nested types
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-blue-500 shrink-0 mt-0.5" />
                    JSON validation with clear error messages
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-blue-500 shrink-0 mt-0.5" />
                    Customizable root interface name
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* CSS Unit Converter */}
        <section id="css-converter">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-green-500/10">
              <Ruler className="h-6 w-6 text-green-500" />
            </div>
            <h2 className="text-2xl font-bold">CSS Unit Converter</h2>
          </div>
          <div className="space-y-4">
            <p className="text-muted-foreground leading-relaxed">
              Convert between CSS units (px to rem) and generate fluid{" "}
              <code className="bg-muted px-1.5 py-0.5 rounded text-xs">
                clamp()
              </code>{" "}
              functions for responsive typography.
            </p>

            <h3 className="font-semibold text-lg">How to Use</h3>
            <ol className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-green-500 text-white text-xs font-bold shrink-0 mt-0.5">
                  1
                </span>
                <p className="text-sm text-muted-foreground">
                  <strong>Enter a pixel value</strong> in the input field (e.g.,
                  16, 24, 32).
                </p>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-green-500 text-white text-xs font-bold shrink-0 mt-0.5">
                  2
                </span>
                <p className="text-sm text-muted-foreground">
                  <strong>Set the base font size</strong> (default: 16px). This
                  is used as the root value for rem calculations.
                </p>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-green-500 text-white text-xs font-bold shrink-0 mt-0.5">
                  3
                </span>
                <p className="text-sm text-muted-foreground">
                  <strong>View the conversions</strong> - the tool shows rem
                  equivalent and a fluid clamp() function that scales smoothly
                  between viewport breakpoints.
                </p>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-green-500 text-white text-xs font-bold shrink-0 mt-0.5">
                  4
                </span>
                <p className="text-sm text-muted-foreground">
                  <strong>Copy the result</strong> you need directly into your
                  CSS.
                </p>
              </li>
            </ol>

            <Card className="bg-green-500/5 border-green-500/20">
              <CardContent className="p-4">
                <h4 className="font-semibold text-sm mb-2">
                  What is clamp()?
                </h4>
                <p className="text-sm text-muted-foreground">
                  The CSS{" "}
                  <code className="bg-muted px-1 py-0.5 rounded text-xs">
                    clamp()
                  </code>{" "}
                  function creates fluid typography that smoothly scales between
                  a minimum and maximum size based on viewport width. This
                  eliminates the need for multiple media query breakpoints for
                  font sizes.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* SVG Path Visualizer */}
        <section id="svg-visualizer">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-purple-500/10">
              <Shapes className="h-6 w-6 text-purple-500" />
            </div>
            <h2 className="text-2xl font-bold">SVG Path Visualizer</h2>
          </div>
          <div className="space-y-4">
            <p className="text-muted-foreground leading-relaxed">
              Visualize SVG path commands, understand their structure, and
              optimize paths for production use.
            </p>

            <h3 className="font-semibold text-lg">How to Use</h3>
            <ol className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-purple-500 text-white text-xs font-bold shrink-0 mt-0.5">
                  1
                </span>
                <p className="text-sm text-muted-foreground">
                  <strong>Paste an SVG path</strong> string into the input field
                  (the{" "}
                  <code className="bg-muted px-1 py-0.5 rounded text-xs">d</code>{" "}
                  attribute value from an SVG{" "}
                  <code className="bg-muted px-1 py-0.5 rounded text-xs">
                    &lt;path&gt;
                  </code>{" "}
                  element).
                </p>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-purple-500 text-white text-xs font-bold shrink-0 mt-0.5">
                  2
                </span>
                <p className="text-sm text-muted-foreground">
                  <strong>View the visualization</strong> - the path renders in
                  a live preview area showing the shape the path creates.
                </p>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-purple-500 text-white text-xs font-bold shrink-0 mt-0.5">
                  3
                </span>
                <p className="text-sm text-muted-foreground">
                  <strong>Explore the command breakdown</strong> - each path
                  command (M, L, C, Z, etc.) is parsed and explained.
                </p>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-purple-500 text-white text-xs font-bold shrink-0 mt-0.5">
                  4
                </span>
                <p className="text-sm text-muted-foreground">
                  <strong>Optimize the path</strong> to reduce file size while
                  maintaining visual fidelity.
                </p>
              </li>
            </ol>

            <Card className="bg-yellow-500/5 border-yellow-500/20">
              <CardContent className="p-4 flex items-start gap-3">
                <Info className="h-5 w-5 text-yellow-500 shrink-0 mt-0.5" />
                <p className="text-sm text-muted-foreground">
                  SVG paths must start with an <strong>M</strong> (moveto)
                  command. If your path doesn&apos;t render, check that it begins
                  with &quot;M&quot; followed by coordinates.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Regex Tester */}
        <section id="regex-tester">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-orange-500/10">
              <Search className="h-6 w-6 text-orange-500" />
            </div>
            <h2 className="text-2xl font-bold">Regular Expression Tester</h2>
          </div>
          <div className="space-y-4">
            <p className="text-muted-foreground leading-relaxed">
              Test regex patterns against sample text, visualize matches, and get
              detailed explanations for each token in your pattern.
            </p>

            <h3 className="font-semibold text-lg">How to Use</h3>
            <ol className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-orange-500 text-white text-xs font-bold shrink-0 mt-0.5">
                  1
                </span>
                <p className="text-sm text-muted-foreground">
                  <strong>Enter your regex pattern</strong> in the pattern input
                  field. No need to wrap it in slashes.
                </p>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-orange-500 text-white text-xs font-bold shrink-0 mt-0.5">
                  2
                </span>
                <p className="text-sm text-muted-foreground">
                  <strong>Set flags</strong> - toggle global (g), case
                  insensitive (i), multiline (m), and other regex flags using the
                  flag checkboxes.
                </p>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-orange-500 text-white text-xs font-bold shrink-0 mt-0.5">
                  3
                </span>
                <p className="text-sm text-muted-foreground">
                  <strong>Enter test text</strong> in the text area below. The
                  tool highlights matches in real-time as you type.
                </p>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-orange-500 text-white text-xs font-bold shrink-0 mt-0.5">
                  4
                </span>
                <p className="text-sm text-muted-foreground">
                  <strong>Review results</strong> - see match count, captured
                  groups, and detailed token explanations for your pattern.
                </p>
              </li>
            </ol>

            <Card className="bg-orange-500/5 border-orange-500/20">
              <CardContent className="p-4">
                <h4 className="font-semibold text-sm mb-2">Common Flags</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>
                    <strong>g (global):</strong> Find all matches instead of
                    stopping at the first one
                  </li>
                  <li>
                    <strong>i (insensitive):</strong> Case-insensitive matching
                  </li>
                  <li>
                    <strong>m (multiline):</strong> ^ and $ match line beginnings
                    and endings
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* History */}
        <section id="history">
          <h2 className="text-2xl font-bold mb-4">Using History</h2>
          <div className="space-y-4">
            <p className="text-muted-foreground leading-relaxed">
              The Dev Tools page automatically saves your last 20 operations
              across all tools. Access history by clicking the{" "}
              <strong>&quot;History&quot;</strong> button in the top right.
            </p>
            <Card className="border-2">
              <CardContent className="p-4 space-y-3">
                <div className="flex items-center gap-2">
                  <History className="h-5 w-5 text-primary" />
                  <h3 className="font-semibold">History Features</h3>
                </div>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                    View past inputs and outputs for each tool
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                    Load a previous operation to reuse or modify it
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                    Delete individual entries you no longer need
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                    History is stored locally in your browser
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Tips */}
        <section id="tips">
          <h2 className="text-2xl font-bold mb-4">Tips & Best Practices</h2>
          <div className="space-y-3">
            {[
              "JSON to TypeScript: Use the \"Load Example\" button to see how complex nested structures are handled.",
              "CSS Converter: The clamp() function eliminates the need for multiple media query breakpoints for font sizes.",
              "SVG Visualizer: SVG paths must start with an M (moveto) command to be valid.",
              "Regex Tester: Enable the \"global\" (g) flag to find all matches instead of just the first one.",
              "All tools process data entirely in your browser - your code and data never leave your device.",
              "Use the history feature to quickly access previous conversions without re-entering data.",
              "Each tool output can be copied to clipboard or downloaded as a file.",
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
            href="/docs/branding"
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Design System Guide
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
