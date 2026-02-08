import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import {
  Code2,
  ArrowLeft,
  FileJson,
  Binary,
  Key,
  Minimize2,
  Search,
  Fingerprint,
  Send,
  CheckCircle2,
  Info,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "New Developer Tools Documentation",
  description:
    "Learn how to use the 7 new developer tools: JSON Formatter, Base64 Encode/Decode, JWT Decoder, HTML/CSS/JS Minifier, UUID Generator, API Tester, and Regex Tester.",
  keywords: [
    "JSON formatter documentation",
    "Base64 encoder decoder guide",
    "JWT decoder tutorial",
    "HTML CSS JS minifier guide",
    "UUID generator documentation",
    "API tester guide",
    "regex tester tutorial",
    "developer tools guide",
  ],
  alternates: {
    canonical: `${siteConfig.url}/docs/developer-tools`,
  },
  openGraph: {
    title: `New Developer Tools Documentation | ${siteConfig.name}`,
    description:
      "Step-by-step guides for 7 new developer utilities including JSON Formatter, Base64, JWT Decoder, Minifier, UUID Generator, API Tester, and Regex Tester.",
    url: `${siteConfig.url}/docs/developer-tools`,
    images: [
      {
        url: "/og-image-developer-tools.png",
        width: 1200,
        height: 630,
        alt: "New Developer Tools Documentation",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `New Developer Tools Docs | ${siteConfig.name}`,
    description:
      "Guides for JSON Formatter, Base64, JWT Decoder, Minifier, UUID Generator, API Tester, and Regex Tester.",
    images: ["/og-image-developer-tools.png"],
    creator: siteConfig.twitterCreator,
  },
};

export default function DeveloperToolsDocsPage() {
  return (
    <div className="container mx-auto px-4 py-12 sm:py-16">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
        <Link href="/docs" className="hover:text-primary transition-colors">
          Documentation
        </Link>
        <span>/</span>
        <span className="text-foreground font-medium">
          New Developer Tools
        </span>
      </div>

      {/* Hero */}
      <div className="mb-12">
        <div className="flex items-center gap-4 mb-4">
          <div className="p-3 rounded-lg bg-gradient-to-br from-orange-500 to-red-500 text-white">
            <Code2 className="h-8 w-8" />
          </div>
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold">
              New Developer Tools
            </h1>
            <p className="text-muted-foreground mt-1">
              7 powerful utilities for everyday development workflows
            </p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 mt-4">
          <Badge>7 New Tools</Badge>
          <Badge variant="secondary">Client-side Processing</Badge>
          <Badge variant="secondary">Copy &amp; Download</Badge>
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
              { label: "JSON Formatter & Validator", href: "#json-formatter" },
              { label: "Base64 Encode/Decode", href: "#base64-encoder" },
              { label: "JWT Decoder", href: "#jwt-decoder" },
              { label: "HTML/CSS/JS Minifier", href: "#minifier" },
              { label: "UUID Generator", href: "#uuid-generator" },
              { label: "API Tester", href: "#api-tester" },
              { label: "Regex Tester", href: "#regex-tester" },
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
            These 7 new developer tools are standalone pages designed for
            everyday coding tasks. Each tool focuses on a single purpose with a
            clean interface, real-time feedback, and the ability to copy or
            download results. Most processing happens entirely in your browser,
            keeping your data private.
          </p>
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="p-4 flex items-start gap-3">
              <Info className="h-5 w-5 text-primary shrink-0 mt-0.5" />
              <p className="text-sm">
                All tools are accessible from the{" "}
                <Link
                  href="/dev-tools"
                  className="text-primary font-medium hover:underline"
                >
                  Dev Tools Hub
                </Link>{" "}
                or directly via their individual routes listed below. No sign-up
                or account is required.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* JSON Formatter & Validator */}
        <section id="json-formatter">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-blue-500/10">
              <FileJson className="h-6 w-6 text-blue-500" />
            </div>
            <h2 className="text-2xl font-bold">JSON Formatter &amp; Validator</h2>
          </div>
          <div className="space-y-4">
            <p className="text-muted-foreground leading-relaxed">
              Paste raw JSON, format and beautify it with configurable
              indentation, validate its structure with detailed error detection,
              and view statistics about your data.
            </p>
            <p className="text-sm text-muted-foreground">
              <strong>Route:</strong>{" "}
              <Link
                href="/tools/developer/json-formatter"
                className="text-primary hover:underline"
              >
                /tools/developer/json-formatter
              </Link>
            </p>

            <h3 className="font-semibold text-lg">How to Use</h3>
            <ol className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-500 text-white text-xs font-bold shrink-0 mt-0.5">
                  1
                </span>
                <p className="text-sm text-muted-foreground">
                  <strong>Paste your JSON</strong> into the input editor. The
                  tool accepts any valid or invalid JSON string for validation.
                </p>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-500 text-white text-xs font-bold shrink-0 mt-0.5">
                  2
                </span>
                <p className="text-sm text-muted-foreground">
                  <strong>Choose your indent size</strong> from the available
                  options: 2 spaces, 4 spaces, 8 spaces, or tabs.
                </p>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-500 text-white text-xs font-bold shrink-0 mt-0.5">
                  3
                </span>
                <p className="text-sm text-muted-foreground">
                  <strong>Click &quot;Format&quot;</strong> to beautify the JSON.
                  If there are syntax errors, the tool highlights the exact
                  location and provides a descriptive error message.
                </p>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-500 text-white text-xs font-bold shrink-0 mt-0.5">
                  4
                </span>
                <p className="text-sm text-muted-foreground">
                  <strong>Review the stats</strong> panel showing total keys,
                  nesting depth, and data size of your JSON.
                </p>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-500 text-white text-xs font-bold shrink-0 mt-0.5">
                  5
                </span>
                <p className="text-sm text-muted-foreground">
                  <strong>Copy or download</strong> the formatted output using
                  the action buttons.
                </p>
              </li>
            </ol>

            <Card className="bg-blue-500/5 border-blue-500/20">
              <CardContent className="p-4">
                <h4 className="font-semibold text-sm mb-2">Features</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-blue-500 shrink-0 mt-0.5" />
                    Format and beautify JSON with configurable indentation
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-blue-500 shrink-0 mt-0.5" />
                    Validate JSON with precise error location and messages
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-blue-500 shrink-0 mt-0.5" />
                    View stats: total keys, nesting depth, and data size
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-blue-500 shrink-0 mt-0.5" />
                    Copy to clipboard or download as a .json file
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Base64 Encode/Decode */}
        <section id="base64-encoder">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-purple-500/10">
              <Binary className="h-6 w-6 text-purple-500" />
            </div>
            <h2 className="text-2xl font-bold">Base64 Encode/Decode</h2>
          </div>
          <div className="space-y-4">
            <p className="text-muted-foreground leading-relaxed">
              Encode text to Base64 or decode Base64 strings back to plain text.
              Also supports file-to-Base64 conversion for generating data URLs.
            </p>
            <p className="text-sm text-muted-foreground">
              <strong>Route:</strong>{" "}
              <Link
                href="/tools/developer/base64-encoder"
                className="text-primary hover:underline"
              >
                /tools/developer/base64-encoder
              </Link>
            </p>

            <h3 className="font-semibold text-lg">How to Use</h3>
            <ol className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-purple-500 text-white text-xs font-bold shrink-0 mt-0.5">
                  1
                </span>
                <p className="text-sm text-muted-foreground">
                  <strong>Choose your mode</strong> - select &quot;Text&quot; for
                  string encoding/decoding or &quot;File&quot; for file-to-Base64
                  conversion.
                </p>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-purple-500 text-white text-xs font-bold shrink-0 mt-0.5">
                  2
                </span>
                <p className="text-sm text-muted-foreground">
                  <strong>In text mode:</strong> enter your text in the left
                  panel. Toggle between &quot;Encode&quot; and
                  &quot;Decode&quot; directions, or use the swap button to
                  reverse input and output.
                </p>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-purple-500 text-white text-xs font-bold shrink-0 mt-0.5">
                  3
                </span>
                <p className="text-sm text-muted-foreground">
                  <strong>In file mode:</strong> upload a file and receive its
                  Base64 data URL representation, ready for embedding in HTML or
                  CSS.
                </p>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-purple-500 text-white text-xs font-bold shrink-0 mt-0.5">
                  4
                </span>
                <p className="text-sm text-muted-foreground">
                  <strong>Copy the result</strong> from the output panel using
                  the copy button.
                </p>
              </li>
            </ol>

            <Card className="bg-purple-500/5 border-purple-500/20">
              <CardContent className="p-4">
                <h4 className="font-semibold text-sm mb-2">Features</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-purple-500 shrink-0 mt-0.5" />
                    Two-column input/output layout for easy comparison
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-purple-500 shrink-0 mt-0.5" />
                    Encode/decode toggle with instant swap button
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-purple-500 shrink-0 mt-0.5" />
                    File upload mode for generating Base64 data URLs
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-purple-500 shrink-0 mt-0.5" />
                    All processing happens entirely in your browser
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* JWT Decoder */}
        <section id="jwt-decoder">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-amber-500/10">
              <Key className="h-6 w-6 text-amber-500" />
            </div>
            <h2 className="text-2xl font-bold">JWT Decoder</h2>
          </div>
          <div className="space-y-4">
            <p className="text-muted-foreground leading-relaxed">
              Decode JSON Web Tokens to inspect their header, payload, and
              expiration status without needing external services.
            </p>
            <p className="text-sm text-muted-foreground">
              <strong>Route:</strong>{" "}
              <Link
                href="/tools/developer/jwt-decoder"
                className="text-primary hover:underline"
              >
                /tools/developer/jwt-decoder
              </Link>
            </p>

            <h3 className="font-semibold text-lg">How to Use</h3>
            <ol className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-amber-500 text-white text-xs font-bold shrink-0 mt-0.5">
                  1
                </span>
                <p className="text-sm text-muted-foreground">
                  <strong>Paste your JWT token</strong> into the input field. The
                  token should have the standard three-part format
                  (header.payload.signature).
                </p>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-amber-500 text-white text-xs font-bold shrink-0 mt-0.5">
                  2
                </span>
                <p className="text-sm text-muted-foreground">
                  <strong>View the decoded header</strong> showing the algorithm
                  (e.g., HS256, RS256) and token type.
                </p>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-amber-500 text-white text-xs font-bold shrink-0 mt-0.5">
                  3
                </span>
                <p className="text-sm text-muted-foreground">
                  <strong>Inspect the payload</strong> with all claims displayed
                  in a formatted view, including subject, issuer, issued-at, and
                  expiration timestamps.
                </p>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-amber-500 text-white text-xs font-bold shrink-0 mt-0.5">
                  4
                </span>
                <p className="text-sm text-muted-foreground">
                  <strong>Check expiration status</strong> - the tool
                  automatically indicates whether the token is still valid or has
                  expired.
                </p>
              </li>
            </ol>

            <Card className="bg-amber-500/5 border-amber-500/20">
              <CardContent className="p-4">
                <h4 className="font-semibold text-sm mb-2">Features</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
                    Decoded header and payload displayed in formatted JSON
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
                    Automatic expiration status check
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
                    Token details: subject, issuer, issued at, and expires at
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
                    No server communication - your tokens stay private
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-yellow-500/5 border-yellow-500/20">
              <CardContent className="p-4 flex items-start gap-3">
                <Info className="h-5 w-5 text-yellow-500 shrink-0 mt-0.5" />
                <p className="text-sm text-muted-foreground">
                  This tool only <strong>decodes</strong> JWT tokens. It does not
                  verify signatures. Never paste production tokens containing
                  sensitive data into any online tool.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* HTML/CSS/JS Minifier */}
        <section id="minifier">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-red-500/10">
              <Minimize2 className="h-6 w-6 text-red-500" />
            </div>
            <h2 className="text-2xl font-bold">HTML/CSS/JS Minifier</h2>
          </div>
          <div className="space-y-4">
            <p className="text-muted-foreground leading-relaxed">
              Minify HTML, CSS, or JavaScript code to reduce file size. View the
              original size versus minified size alongside the savings
              percentage.
            </p>
            <p className="text-sm text-muted-foreground">
              <strong>Route:</strong>{" "}
              <Link
                href="/tools/developer/minifier"
                className="text-primary hover:underline"
              >
                /tools/developer/minifier
              </Link>
            </p>

            <h3 className="font-semibold text-lg">How to Use</h3>
            <ol className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-red-500 text-white text-xs font-bold shrink-0 mt-0.5">
                  1
                </span>
                <p className="text-sm text-muted-foreground">
                  <strong>Select the language tab</strong> - choose between HTML,
                  CSS, or JavaScript depending on the code you want to minify.
                </p>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-red-500 text-white text-xs font-bold shrink-0 mt-0.5">
                  2
                </span>
                <p className="text-sm text-muted-foreground">
                  <strong>Paste your code</strong> into the input area. There is
                  no strict size limit, though very large files may take a moment
                  to process.
                </p>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-red-500 text-white text-xs font-bold shrink-0 mt-0.5">
                  3
                </span>
                <p className="text-sm text-muted-foreground">
                  <strong>Click &quot;Minify&quot;</strong> to process the code.
                  The minified output appears below with a size comparison
                  showing original size, minified size, and percentage saved.
                </p>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-red-500 text-white text-xs font-bold shrink-0 mt-0.5">
                  4
                </span>
                <p className="text-sm text-muted-foreground">
                  <strong>Copy or download</strong> the minified output using the
                  action buttons above the result.
                </p>
              </li>
            </ol>

            <Card className="bg-red-500/5 border-red-500/20">
              <CardContent className="p-4">
                <h4 className="font-semibold text-sm mb-2">Features</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-red-500 shrink-0 mt-0.5" />
                    Tab-based interface for HTML, CSS, and JavaScript
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-red-500 shrink-0 mt-0.5" />
                    Original vs. minified size comparison with savings percentage
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-red-500 shrink-0 mt-0.5" />
                    Removes whitespace, comments, and unnecessary characters
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-red-500 shrink-0 mt-0.5" />
                    Copy to clipboard or download the minified file
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* UUID Generator */}
        <section id="uuid-generator">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-teal-500/10">
              <Fingerprint className="h-6 w-6 text-teal-500" />
            </div>
            <h2 className="text-2xl font-bold">UUID Generator</h2>
          </div>
          <div className="space-y-4">
            <p className="text-muted-foreground leading-relaxed">
              Generate cryptographically random UUID v4 identifiers with bulk
              generation support, multiple format options, and a built-in UUID
              validator.
            </p>
            <p className="text-sm text-muted-foreground">
              <strong>Route:</strong>{" "}
              <Link
                href="/tools/developer/uuid-generator"
                className="text-primary hover:underline"
              >
                /tools/developer/uuid-generator
              </Link>
            </p>

            <h3 className="font-semibold text-lg">How to Use</h3>
            <ol className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-teal-500 text-white text-xs font-bold shrink-0 mt-0.5">
                  1
                </span>
                <p className="text-sm text-muted-foreground">
                  <strong>Click &quot;Generate&quot;</strong> to create a new
                  UUID v4 using the browser&apos;s{" "}
                  <code className="bg-muted px-1.5 py-0.5 rounded text-xs">
                    crypto.randomUUID()
                  </code>{" "}
                  API.
                </p>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-teal-500 text-white text-xs font-bold shrink-0 mt-0.5">
                  2
                </span>
                <p className="text-sm text-muted-foreground">
                  <strong>For bulk generation,</strong> set the quantity (up to
                  100 UUIDs at once) and click generate. All results appear in a
                  scrollable list.
                </p>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-teal-500 text-white text-xs font-bold shrink-0 mt-0.5">
                  3
                </span>
                <p className="text-sm text-muted-foreground">
                  <strong>Choose a format:</strong> standard (with dashes), no
                  dashes, or uppercase. The output updates automatically based on
                  your selection.
                </p>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-teal-500 text-white text-xs font-bold shrink-0 mt-0.5">
                  4
                </span>
                <p className="text-sm text-muted-foreground">
                  <strong>Validate a UUID</strong> by pasting it into the
                  validator input to check whether it conforms to the UUID
                  format.
                </p>
              </li>
            </ol>

            <Card className="bg-teal-500/5 border-teal-500/20">
              <CardContent className="p-4">
                <h4 className="font-semibold text-sm mb-2">Features</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-teal-500 shrink-0 mt-0.5" />
                    Cryptographically secure UUID v4 generation
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-teal-500 shrink-0 mt-0.5" />
                    Bulk generation of up to 100 UUIDs at once
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-teal-500 shrink-0 mt-0.5" />
                    Format options: standard, no dashes, uppercase
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-teal-500 shrink-0 mt-0.5" />
                    Built-in UUID validator
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* API Tester */}
        <section id="api-tester">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-indigo-500/10">
              <Send className="h-6 w-6 text-indigo-500" />
            </div>
            <h2 className="text-2xl font-bold">API Tester</h2>
          </div>
          <div className="space-y-4">
            <p className="text-muted-foreground leading-relaxed">
              Send HTTP requests to any API endpoint and inspect the response.
              Requests are proxied through the server to avoid CORS
              restrictions, so you can test any public API directly from your
              browser.
            </p>
            <p className="text-sm text-muted-foreground">
              <strong>Route:</strong>{" "}
              <Link
                href="/tools/developer/api-tester"
                className="text-primary hover:underline"
              >
                /tools/developer/api-tester
              </Link>
            </p>

            <h3 className="font-semibold text-lg">How to Use</h3>
            <ol className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-indigo-500 text-white text-xs font-bold shrink-0 mt-0.5">
                  1
                </span>
                <p className="text-sm text-muted-foreground">
                  <strong>Select the HTTP method</strong> from the dropdown:
                  GET, POST, PUT, PATCH, or DELETE.
                </p>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-indigo-500 text-white text-xs font-bold shrink-0 mt-0.5">
                  2
                </span>
                <p className="text-sm text-muted-foreground">
                  <strong>Enter the URL</strong> of the API endpoint you want to
                  test (e.g.,{" "}
                  <code className="bg-muted px-1.5 py-0.5 rounded text-xs">
                    https://jsonplaceholder.typicode.com/posts
                  </code>
                  ).
                </p>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-indigo-500 text-white text-xs font-bold shrink-0 mt-0.5">
                  3
                </span>
                <p className="text-sm text-muted-foreground">
                  <strong>Configure headers and body</strong> as needed. Add
                  custom headers (e.g., Authorization, Content-Type) and a
                  request body for POST/PUT/PATCH requests.
                </p>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-indigo-500 text-white text-xs font-bold shrink-0 mt-0.5">
                  4
                </span>
                <p className="text-sm text-muted-foreground">
                  <strong>Click &quot;Send&quot;</strong> to execute the request.
                  The response panel shows the HTTP status code, response
                  timing, headers, and body content.
                </p>
              </li>
            </ol>

            <Card className="bg-indigo-500/5 border-indigo-500/20">
              <CardContent className="p-4">
                <h4 className="font-semibold text-sm mb-2">Features</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-indigo-500 shrink-0 mt-0.5" />
                    Supports GET, POST, PUT, PATCH, and DELETE methods
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-indigo-500 shrink-0 mt-0.5" />
                    Custom headers and request body configuration
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-indigo-500 shrink-0 mt-0.5" />
                    Server-side proxy to bypass CORS restrictions
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-indigo-500 shrink-0 mt-0.5" />
                    Response details: status code, timing, headers, and body
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-yellow-500/5 border-yellow-500/20">
              <CardContent className="p-4 flex items-start gap-3">
                <Info className="h-5 w-5 text-yellow-500 shrink-0 mt-0.5" />
                <p className="text-sm text-muted-foreground">
                  Requests are routed through a server-side proxy to avoid
                  browser CORS restrictions. Avoid sending sensitive credentials
                  such as API keys through this tool in production environments.
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
            <h2 className="text-2xl font-bold">
              Regex Tester (Standalone)
            </h2>
          </div>
          <div className="space-y-4">
            <p className="text-muted-foreground leading-relaxed">
              A full-page version of the regex tester with all the same features
              as the Dev Tools Hub version. Test regular expression patterns
              against sample text, visualize matches, and explore captured
              groups.
            </p>
            <p className="text-sm text-muted-foreground">
              <strong>Route:</strong>{" "}
              <Link
                href="/tools/developer/regex-tester"
                className="text-primary hover:underline"
              >
                /tools/developer/regex-tester
              </Link>
            </p>

            <h3 className="font-semibold text-lg">How to Use</h3>
            <ol className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-orange-500 text-white text-xs font-bold shrink-0 mt-0.5">
                  1
                </span>
                <p className="text-sm text-muted-foreground">
                  <strong>Enter your regex pattern</strong> in the pattern input
                  field. No need to wrap it in slashes - just type the pattern
                  directly.
                </p>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-orange-500 text-white text-xs font-bold shrink-0 mt-0.5">
                  2
                </span>
                <p className="text-sm text-muted-foreground">
                  <strong>Set flags</strong> using the flag checkboxes: global
                  (g), case insensitive (i), multiline (m), dotAll (s), and
                  unicode (u).
                </p>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-orange-500 text-white text-xs font-bold shrink-0 mt-0.5">
                  3
                </span>
                <p className="text-sm text-muted-foreground">
                  <strong>Enter test text</strong> in the textarea. Matches are
                  highlighted in real-time as you type both the pattern and the
                  test string.
                </p>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-orange-500 text-white text-xs font-bold shrink-0 mt-0.5">
                  4
                </span>
                <p className="text-sm text-muted-foreground">
                  <strong>Review results</strong> - see the total match count,
                  captured groups, and detailed token explanations for each part
                  of your pattern.
                </p>
              </li>
            </ol>

            <Card className="bg-orange-500/5 border-orange-500/20">
              <CardContent className="p-4">
                <h4 className="font-semibold text-sm mb-2">Features</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-orange-500 shrink-0 mt-0.5" />
                    Full-page layout with more space for complex patterns
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-orange-500 shrink-0 mt-0.5" />
                    Real-time match highlighting as you type
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-orange-500 shrink-0 mt-0.5" />
                    Captured group display with detailed token explanations
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-orange-500 shrink-0 mt-0.5" />
                    Same functionality as the Dev Tools Hub regex tester
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Tips & Best Practices */}
        <section id="tips">
          <h2 className="text-2xl font-bold mb-4">Tips &amp; Best Practices</h2>
          <div className="space-y-3">
            {[
              "JSON Formatter: Use the stats panel to quickly understand the structure and size of unfamiliar JSON data before diving in.",
              "Base64: File mode is great for embedding small images directly in CSS or HTML without extra network requests.",
              "JWT Decoder: Always check the expiration timestamp when debugging authentication issues - an expired token is the most common cause of 401 errors.",
              "Minifier: Compare the savings percentage across HTML, CSS, and JS to identify which files benefit most from minification in your project.",
              "UUID Generator: Use the bulk generation feature when seeding databases or creating test fixtures that require unique identifiers.",
              "API Tester: Start with a simple GET request to verify connectivity before adding headers and body payloads for more complex requests.",
              "Regex Tester: Enable the global (g) flag to find all matches instead of stopping at the first one.",
              "All tools process data in your browser by default. The only exception is the API Tester, which routes requests through a server-side proxy to avoid CORS issues.",
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
