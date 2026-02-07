import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import {
  SearchCheck,
  ArrowLeft,
  ArrowRight,
  Globe,
  BarChart3,
  Eye,
  FileDown,
  History,
  Sparkles,
  Search,
  CheckCircle2,
  Info,
  AlertTriangle,
  Shield,
  Link2,
  ImageIcon,
  FileText,
  Code2,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "SEO Validator Documentation",
  description:
    "Learn how to analyze website SEO with 100+ data points, validate meta tags, preview social cards on 6 platforms, and export reports.",
  keywords: [
    "SEO validator tutorial",
    "how to check SEO",
    "meta tag validation guide",
    "social media preview tool",
    "SEO audit guide",
  ],
  alternates: {
    canonical: `${siteConfig.url}/docs/seo-validator`,
  },
  openGraph: {
    title: `SEO Validator Documentation | ${siteConfig.name}`,
    description:
      "Step-by-step guide to using the advanced SEO analyzer with scoring, analysis, and export features.",
    url: `${siteConfig.url}/docs/seo-validator`,
    images: [
      {
        url: "/og-image-seo-validator.png",
        width: 1200,
        height: 630,
        alt: "SEO Validator Documentation",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `SEO Validator Docs | ${siteConfig.name}`,
    description:
      "Step-by-step guide to SEO analysis with 100+ data points, scoring, and social media previews.",
    images: ["/og-image-seo-validator.png"],
    creator: siteConfig.twitterCreator,
  },
};

export default function SEOValidatorDocsPage() {
  return (
    <div className="container mx-auto px-4 py-12 sm:py-16">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
        <Link href="/docs" className="hover:text-primary transition-colors">
          Documentation
        </Link>
        <span>/</span>
        <span className="text-foreground font-medium">SEO Validator</span>
      </div>

      {/* Hero */}
      <div className="mb-12">
        <div className="flex items-center gap-4 mb-4">
          <div className="p-3 rounded-lg bg-gradient-to-br from-green-500 to-emerald-500 text-white">
            <SearchCheck className="h-8 w-8" />
          </div>
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold">SEO Validator</h1>
            <p className="text-muted-foreground mt-1">
              Comprehensive SEO analysis with 100+ data points
            </p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 mt-4">
          <Badge>100+ Checks</Badge>
          <Badge variant="secondary">SEO Score</Badge>
          <Badge variant="secondary">6 Platform Previews</Badge>
          <Badge variant="secondary">Export Reports</Badge>
          <Badge variant="secondary">Scan History</Badge>
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
              { label: "Step 1: Enter a URL", href: "#step-1" },
              { label: "Step 2: Choose Analysis Mode", href: "#step-2" },
              { label: "Step 3: Review the Overview", href: "#step-3" },
              { label: "Step 4: Explore Detailed Analysis", href: "#step-4" },
              { label: "Step 5: Check Meta Tags", href: "#step-5" },
              { label: "Step 6: Preview Social Cards", href: "#step-6" },
              { label: "Step 7: Export Reports", href: "#step-7" },
              { label: "Using Scan History", href: "#history" },
              { label: "Understanding SEO Scores", href: "#scores" },
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
            The SEO Validator helps you analyze any website&apos;s search engine
            optimization. It checks meta tags, content quality, technical SEO,
            performance, security, and social media readiness. You can use it to
            audit your own sites or analyze competitors.
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            <Card className="border-2">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Search className="h-5 w-5 text-primary" />
                  <h3 className="font-semibold">Quick Check</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Fast meta tag validation with social media previews. Ideal for
                  quick checks on meta tag completeness.
                </p>
              </CardContent>
            </Card>
            <Card className="border-2">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="h-5 w-5 text-primary" />
                  <h3 className="font-semibold">Advanced Analysis</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Comprehensive 100+ point analysis with SEO scoring, content
                  audit, security checks, and exportable reports.
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
            <h2 className="text-2xl font-bold">Enter a URL</h2>
          </div>
          <div className="space-y-4">
            <p className="text-muted-foreground leading-relaxed">
              Navigate to{" "}
              <Link
                href="/seo-validator"
                className="text-primary font-medium hover:underline"
              >
                SEO Validator
              </Link>{" "}
              and enter the full URL of the website you want to analyze in the
              input field.
            </p>
            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="p-4 flex items-start gap-3">
                <Info className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <div className="text-sm">
                  <strong>URL format:</strong> Enter the complete URL including
                  the protocol, e.g.,{" "}
                  <code className="bg-muted px-1.5 py-0.5 rounded text-xs">
                    https://example.com
                  </code>
                  . Both HTTP and HTTPS URLs are accepted.
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Step 2 */}
        <section id="step-2">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary text-primary-foreground font-bold text-lg">
              2
            </div>
            <h2 className="text-2xl font-bold">Choose Analysis Mode</h2>
          </div>
          <div className="space-y-4">
            <p className="text-muted-foreground leading-relaxed">
              Below the URL input, choose between two analysis modes:
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              <Card className="border-2 border-blue-500/30">
                <CardContent className="p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <Search className="h-5 w-5 text-blue-500" />
                    <h3 className="font-semibold">Quick Check</h3>
                  </div>
                  <ul className="text-sm text-muted-foreground space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-blue-500 shrink-0 mt-0.5" />
                      Extracts 16 meta tags
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-blue-500 shrink-0 mt-0.5" />
                      Shows basic validation status
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-blue-500 shrink-0 mt-0.5" />
                      Social media previews
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-blue-500 shrink-0 mt-0.5" />
                      Fast results
                    </li>
                  </ul>
                </CardContent>
              </Card>
              <Card className="border-2 border-purple-500/30">
                <CardContent className="p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <Sparkles className="h-5 w-5 text-purple-500" />
                    <h3 className="font-semibold">Advanced Analysis</h3>
                  </div>
                  <ul className="text-sm text-muted-foreground space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-purple-500 shrink-0 mt-0.5" />
                      100+ data points
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-purple-500 shrink-0 mt-0.5" />
                      SEO score (0-100)
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-purple-500 shrink-0 mt-0.5" />
                      7 analysis categories
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-purple-500 shrink-0 mt-0.5" />
                      Exportable reports
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
            <p className="text-sm text-muted-foreground">
              Click the corresponding button to select your mode, then click{" "}
              <strong>&quot;Quick Check&quot;</strong> or{" "}
              <strong>&quot;Deep Analyze&quot;</strong> to start.
            </p>
          </div>
        </section>

        {/* Step 3 */}
        <section id="step-3">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary text-primary-foreground font-bold text-lg">
              3
            </div>
            <h2 className="text-2xl font-bold">Review the Overview</h2>
          </div>
          <div className="space-y-4">
            <p className="text-muted-foreground leading-relaxed">
              In Advanced mode, the results appear in a tabbed interface. The{" "}
              <strong>Overview</strong> tab shows:
            </p>
            <Card className="border-2">
              <CardContent className="p-4 space-y-3">
                <div className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-primary" />
                  <h3 className="font-semibold">SEO Score Dashboard</h3>
                </div>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li>
                    <strong>Overall Score:</strong> A number from 0-100 displayed
                    in a progress ring. Green (80+) is good, yellow (60-79) needs
                    work, red (below 60) needs attention.
                  </li>
                  <li>
                    <strong>Category Breakdown:</strong> Individual scores for
                    Meta Tags, Content Quality, Technical SEO, Performance, and
                    Social Media.
                  </li>
                  <li>
                    <strong>Issues Found:</strong> Critical errors and warnings
                    are listed below the score with clear labels.
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Step 4 */}
        <section id="step-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary text-primary-foreground font-bold text-lg">
              4
            </div>
            <h2 className="text-2xl font-bold">Explore Detailed Analysis</h2>
          </div>
          <div className="space-y-4">
            <p className="text-muted-foreground leading-relaxed">
              Switch to the <strong>Analysis</strong> tab for deep insights.
              This tab contains 6 sub-categories:
            </p>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  icon: FileText,
                  title: "Headings",
                  desc: "H1-H6 structure analysis, hierarchy checking, and SEO recommendations for heading usage.",
                },
                {
                  icon: Link2,
                  title: "Links",
                  desc: "Total, internal, and external link counts. NoFollow detection and link distribution metrics.",
                },
                {
                  icon: ImageIcon,
                  title: "Images",
                  desc: "Alt text coverage percentage, image format distribution, and accessibility recommendations.",
                },
                {
                  icon: FileText,
                  title: "Content",
                  desc: "Word count, readability score (Flesch), top 10 keywords with density analysis.",
                },
                {
                  icon: Code2,
                  title: "Technical",
                  desc: "Schema markup detection, JSON-LD analysis, performance metrics, and minification status.",
                },
                {
                  icon: Shield,
                  title: "Security",
                  desc: "HTTPS validation, HSTS header, mixed content detection, and security headers audit.",
                },
              ].map((category) => (
                <Card key={category.title} className="border-2">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <category.icon className="h-4 w-4 text-primary" />
                      <h3 className="font-semibold text-sm">
                        {category.title}
                      </h3>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {category.desc}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Step 5 */}
        <section id="step-5">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary text-primary-foreground font-bold text-lg">
              5
            </div>
            <h2 className="text-2xl font-bold">Check Meta Tags</h2>
          </div>
          <div className="space-y-4">
            <p className="text-muted-foreground leading-relaxed">
              The <strong>Meta Tags</strong> tab shows all extracted meta
              information organized into sections:
            </p>
            <ul className="space-y-2">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <p className="text-sm text-muted-foreground">
                  <strong>Validation Status:</strong> Color-coded status based on
                  your overall meta tag score.
                </p>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <p className="text-sm text-muted-foreground">
                  <strong>Basic Meta Tags:</strong> Title, description, keywords,
                  author, viewport, robots, canonical URL, language, and more.
                </p>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <p className="text-sm text-muted-foreground">
                  <strong>Open Graph Tags:</strong> og:title, og:description,
                  og:image, og:type, og:url - used by Facebook and LinkedIn.
                </p>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <p className="text-sm text-muted-foreground">
                  <strong>Twitter Card Tags:</strong> twitter:card,
                  twitter:title, twitter:description, twitter:image.
                </p>
              </li>
            </ul>
            <p className="text-sm text-muted-foreground">
              Missing or problematic tags are flagged with warnings and
              suggestions for improvement.
            </p>
          </div>
        </section>

        {/* Step 6 */}
        <section id="step-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary text-primary-foreground font-bold text-lg">
              6
            </div>
            <h2 className="text-2xl font-bold">Preview Social Cards</h2>
          </div>
          <div className="space-y-4">
            <p className="text-muted-foreground leading-relaxed">
              The <strong>Previews</strong> tab shows how your URL will appear
              when shared on 6 different platforms:
            </p>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {[
                { name: "Facebook", desc: "Open Graph card preview" },
                { name: "Twitter/X", desc: "Twitter Card preview" },
                { name: "LinkedIn", desc: "Professional network preview" },
                { name: "Discord", desc: "Chat embed preview" },
                { name: "Reddit", desc: "Link post preview" },
                { name: "WhatsApp", desc: "Message link preview" },
              ].map((platform) => (
                <Card key={platform.name} className="border-2">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2">
                      <Eye className="h-4 w-4 text-primary" />
                      <div>
                        <h3 className="font-semibold text-sm">
                          {platform.name}
                        </h3>
                        <p className="text-xs text-muted-foreground">
                          {platform.desc}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            <p className="text-sm text-muted-foreground">
              Each preview uses the platform-specific fallback logic. For
              example, Twitter uses twitter:title first, then falls back to
              og:title, then to the regular title tag.
            </p>
          </div>
        </section>

        {/* Step 7 */}
        <section id="step-7">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary text-primary-foreground font-bold text-lg">
              7
            </div>
            <h2 className="text-2xl font-bold">Export Reports</h2>
          </div>
          <div className="space-y-4">
            <p className="text-muted-foreground leading-relaxed">
              In Advanced mode, the <strong>Export</strong> tab lets you download
              your analysis results:
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              <Card className="border-2">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <FileDown className="h-5 w-5 text-primary" />
                    <h3 className="font-semibold">JSON Export</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Complete data export including all meta tags, analysis
                    results, scores, and recommendations. Ideal for programmatic
                    use or detailed archiving.
                  </p>
                </CardContent>
              </Card>
              <Card className="border-2">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <FileDown className="h-5 w-5 text-primary" />
                    <h3 className="font-semibold">CSV Export</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Summary export for spreadsheets. Includes key metrics, scores,
                    and issues in a format compatible with Excel, Google Sheets,
                    and other tools.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* History */}
        <section id="history">
          <h2 className="text-2xl font-bold mb-4">Using Scan History</h2>
          <div className="space-y-4">
            <p className="text-muted-foreground leading-relaxed">
              The SEO Validator automatically saves your last 10 advanced
              analysis scans. Access history by clicking the{" "}
              <strong>&quot;History&quot;</strong> button in the top right.
            </p>
            <Card className="border-2">
              <CardContent className="p-4 space-y-3">
                <div className="flex items-center gap-2">
                  <History className="h-5 w-5 text-primary" />
                  <h3 className="font-semibold">History Features</h3>
                </div>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li>
                    <strong>View past scans:</strong> See URLs, timestamps, and
                    scores at a glance.
                  </li>
                  <li>
                    <strong>Load a scan:</strong> Click &quot;Load&quot; to restore
                    a previous analysis without re-scanning.
                  </li>
                  <li>
                    <strong>Delete entries:</strong> Remove individual history
                    entries you no longer need.
                  </li>
                  <li>
                    <strong>Score badges:</strong> Color-coded badges show the
                    score - green (80+), grey (60-79), red (below 60).
                  </li>
                </ul>
              </CardContent>
            </Card>
            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="p-4 flex items-start gap-3">
                <Info className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <p className="text-sm">
                  History is stored in your browser&apos;s local storage. Clearing
                  browser data will remove your scan history.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Scores */}
        <section id="scores">
          <h2 className="text-2xl font-bold mb-4">Understanding SEO Scores</h2>
          <div className="space-y-4">
            <p className="text-muted-foreground leading-relaxed">
              The overall score is calculated from 5 categories, each weighted
              differently:
            </p>
            <div className="space-y-3">
              {[
                {
                  name: "Meta Tags",
                  points: "25 points",
                  desc: "Title, description, Open Graph, Twitter Card completeness and quality.",
                },
                {
                  name: "Content Quality",
                  points: "25 points",
                  desc: "Word count, readability, keyword usage, heading structure.",
                },
                {
                  name: "Technical SEO",
                  points: "20 points",
                  desc: "Schema markup, canonical URLs, robots directives, structured data.",
                },
                {
                  name: "Performance",
                  points: "15 points",
                  desc: "Page size, minification, compression, estimated load time.",
                },
                {
                  name: "Social Media",
                  points: "15 points",
                  desc: "Open Graph completeness, Twitter Card setup, image availability.",
                },
              ].map((category) => (
                <Card key={category.name} className="border-2">
                  <CardContent className="p-4 flex items-start gap-4">
                    <Badge className="shrink-0">{category.points}</Badge>
                    <div>
                      <h3 className="font-semibold text-sm">
                        {category.name}
                      </h3>
                      <p className="text-xs text-muted-foreground mt-1">
                        {category.desc}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Tips */}
        <section id="tips">
          <h2 className="text-2xl font-bold mb-4">Tips & Best Practices</h2>
          <div className="space-y-3">
            {[
              "Always include a title tag between 30-60 characters for optimal search engine display.",
              "Meta descriptions should be 50-160 characters and include your primary keyword.",
              "Add Open Graph tags (og:title, og:description, og:image) for better social media sharing.",
              "Include a Twitter Card type (summary_large_image recommended) for rich Twitter previews.",
              "Use Advanced Analysis mode for a complete picture - Quick Check only validates meta tags.",
              "Export reports as JSON for detailed records or CSV for spreadsheet-friendly summaries.",
              "Check the Security tab to ensure HTTPS is properly configured and security headers are in place.",
              "Re-scan after making changes to verify improvements in your SEO score.",
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
            href="/docs/image-converter"
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Image Converter Guide
          </Link>
          <Link
            href="/docs/branding"
            className="flex items-center gap-2 text-sm text-primary font-medium hover:underline"
          >
            Design System Guide
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
