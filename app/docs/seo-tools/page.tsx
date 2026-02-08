import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import {
  Globe,
  ArrowLeft,
  FileText,
  MapPin,
  Braces,
  Gauge,
  CheckCircle2,
  Info,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "SEO Tools Documentation",
  description:
    "Learn how to use the Robots.txt Generator, Sitemap Generator, Schema Generator, and Page Speed Analyzer to improve your website&apos;s search engine optimization.",
  keywords: [
    "robots.txt generator tutorial",
    "sitemap generator guide",
    "schema generator guide",
    "page speed analyzer tutorial",
    "SEO tools guide",
    "structured data JSON-LD",
    "XML sitemap creator",
    "website performance analysis",
  ],
  alternates: {
    canonical: `${siteConfig.url}/docs/seo-tools`,
  },
  openGraph: {
    title: `SEO Tools Documentation | ${siteConfig.name}`,
    description:
      "Step-by-step guides for 4 essential SEO utilities: Robots.txt Generator, Sitemap Generator, Schema Generator, and Page Speed Analyzer.",
    url: `${siteConfig.url}/docs/seo-tools`,
    images: [
      {
        url: "/og-image-seo-tools.png",
        width: 1200,
        height: 630,
        alt: "SEO Tools Documentation",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `SEO Tools Docs | ${siteConfig.name}`,
    description:
      "Guides for Robots.txt Generator, Sitemap Generator, Schema Generator, and Page Speed Analyzer.",
    images: ["/og-image-seo-tools.png"],
    creator: siteConfig.twitterCreator,
  },
};

export default function SEOToolsDocsPage() {
  return (
    <div className="container mx-auto px-4 py-12 sm:py-16">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
        <Link href="/docs" className="hover:text-primary transition-colors">
          Documentation
        </Link>
        <span>/</span>
        <span className="text-foreground font-medium">SEO Tools</span>
      </div>

      {/* Hero */}
      <div className="mb-12">
        <div className="flex items-center gap-4 mb-4">
          <div className="p-3 rounded-lg bg-gradient-to-br from-green-500 to-emerald-500 text-white">
            <Globe className="h-8 w-8" />
          </div>
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold">SEO Tools</h1>
            <p className="text-muted-foreground mt-1">
              Essential utilities for search engine optimization
            </p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 mt-4">
          <Badge>4 New Tools</Badge>
          <Badge variant="secondary">Search Engine Optimization</Badge>
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
              { label: "Robots.txt Generator", href: "#robots-txt" },
              { label: "Sitemap Generator", href: "#sitemap" },
              { label: "Schema Generator", href: "#schema" },
              { label: "Page Speed Analyzer", href: "#page-speed" },
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
            The SEO Tools collection provides 4 specialized utilities to help
            you optimize your website for search engines. Generate robots.txt
            files, create XML sitemaps, build structured data markup, and
            analyze page performance -- all from a simple, intuitive interface
            with copy and download support.
          </p>
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="p-4 flex items-start gap-3">
              <Info className="h-5 w-5 text-primary shrink-0 mt-0.5" />
              <p className="text-sm">
                Each SEO tool is available at its own dedicated page under{" "}
                <code className="bg-muted px-1.5 py-0.5 rounded text-xs">
                  /tools/seo/
                </code>
                . You can also access them from the navigation menu or from the{" "}
                <Link
                  href="/seo-validator"
                  className="text-primary font-medium hover:underline"
                >
                  SEO Validator
                </Link>{" "}
                page.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Robots.txt Generator */}
        <section id="robots-txt">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-green-500/10">
              <FileText className="h-6 w-6 text-green-500" />
            </div>
            <h2 className="text-2xl font-bold">Robots.txt Generator</h2>
          </div>
          <div className="space-y-4">
            <p className="text-muted-foreground leading-relaxed">
              Create properly formatted{" "}
              <code className="bg-muted px-1.5 py-0.5 rounded text-xs">
                robots.txt
              </code>{" "}
              files with user-agent rules, allow/disallow directives, and
              sitemap references. Control how search engine crawlers access
              your website.
            </p>

            <h3 className="font-semibold text-lg">How to Use</h3>
            <ol className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-green-500 text-white text-xs font-bold shrink-0 mt-0.5">
                  1
                </span>
                <p className="text-sm text-muted-foreground">
                  <strong>Add a user-agent rule</strong> by specifying the
                  crawler name (e.g., &quot;Googlebot&quot;, &quot;Bingbot&quot;,
                  or &quot;*&quot; for all crawlers).
                </p>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-green-500 text-white text-xs font-bold shrink-0 mt-0.5">
                  2
                </span>
                <p className="text-sm text-muted-foreground">
                  <strong>Add allow/disallow directives</strong> for each
                  user-agent to control which paths the crawler can or cannot
                  access.
                </p>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-green-500 text-white text-xs font-bold shrink-0 mt-0.5">
                  3
                </span>
                <p className="text-sm text-muted-foreground">
                  <strong>Specify a sitemap URL</strong> to help search engines
                  discover your XML sitemap for more efficient crawling.
                </p>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-green-500 text-white text-xs font-bold shrink-0 mt-0.5">
                  4
                </span>
                <p className="text-sm text-muted-foreground">
                  <strong>Copy or download</strong> the generated robots.txt
                  file using the buttons in the output panel.
                </p>
              </li>
            </ol>

            <Card className="bg-green-500/5 border-green-500/20">
              <CardContent className="p-4">
                <h4 className="font-semibold text-sm mb-2">Features</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500 shrink-0 mt-0.5" />
                    Multiple user-agent rules with individual directives
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500 shrink-0 mt-0.5" />
                    Allow and disallow path directives per user-agent
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500 shrink-0 mt-0.5" />
                    Sitemap URL reference included in output
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500 shrink-0 mt-0.5" />
                    Real-time preview of the generated file
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Sitemap Generator */}
        <section id="sitemap">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-green-500/10">
              <MapPin className="h-6 w-6 text-green-500" />
            </div>
            <h2 className="text-2xl font-bold">Sitemap Generator</h2>
          </div>
          <div className="space-y-4">
            <p className="text-muted-foreground leading-relaxed">
              Generate valid XML sitemaps by adding URLs with priority, change
              frequency, and last modified date. Helps search engines understand
              the structure and importance of your pages.
            </p>

            <h3 className="font-semibold text-lg">How to Use</h3>
            <ol className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-green-500 text-white text-xs font-bold shrink-0 mt-0.5">
                  1
                </span>
                <p className="text-sm text-muted-foreground">
                  <strong>Add a URL entry</strong> by entering the full page URL
                  (e.g., &quot;https://example.com/about&quot;).
                </p>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-green-500 text-white text-xs font-bold shrink-0 mt-0.5">
                  2
                </span>
                <p className="text-sm text-muted-foreground">
                  <strong>Set priority and change frequency</strong> for each
                  URL. Priority ranges from 0.0 to 1.0 and change frequency
                  can be daily, weekly, monthly, etc.
                </p>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-green-500 text-white text-xs font-bold shrink-0 mt-0.5">
                  3
                </span>
                <p className="text-sm text-muted-foreground">
                  <strong>Add or remove entries</strong> dynamically using the
                  add and delete buttons. Build your sitemap one URL at a time.
                </p>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-green-500 text-white text-xs font-bold shrink-0 mt-0.5">
                  4
                </span>
                <p className="text-sm text-muted-foreground">
                  <strong>Copy or download</strong> the generated XML sitemap
                  file using the output panel buttons.
                </p>
              </li>
            </ol>

            <Card className="bg-green-500/5 border-green-500/20">
              <CardContent className="p-4">
                <h4 className="font-semibold text-sm mb-2">Features</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500 shrink-0 mt-0.5" />
                    Valid XML sitemap format with proper namespace declarations
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500 shrink-0 mt-0.5" />
                    Configurable priority, change frequency, and last modified date
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500 shrink-0 mt-0.5" />
                    Dynamic add/remove URL entries
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500 shrink-0 mt-0.5" />
                    Real-time XML preview as you build your sitemap
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Schema Generator */}
        <section id="schema">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-green-500/10">
              <Braces className="h-6 w-6 text-green-500" />
            </div>
            <h2 className="text-2xl font-bold">Schema Generator</h2>
          </div>
          <div className="space-y-4">
            <p className="text-muted-foreground leading-relaxed">
              Generate JSON-LD structured data markup from 7 common schema
              types. Structured data helps search engines understand your
              content and can enable rich results in search listings.
            </p>

            <h3 className="font-semibold text-lg">How to Use</h3>
            <ol className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-green-500 text-white text-xs font-bold shrink-0 mt-0.5">
                  1
                </span>
                <p className="text-sm text-muted-foreground">
                  <strong>Choose a schema type</strong> from the available
                  options: Article, Product, FAQ, Organization, LocalBusiness,
                  BreadcrumbList, or WebSite.
                </p>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-green-500 text-white text-xs font-bold shrink-0 mt-0.5">
                  2
                </span>
                <p className="text-sm text-muted-foreground">
                  <strong>Fill in the template fields</strong> that appear for
                  your chosen schema type. Each type has its own set of
                  relevant properties.
                </p>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-green-500 text-white text-xs font-bold shrink-0 mt-0.5">
                  3
                </span>
                <p className="text-sm text-muted-foreground">
                  <strong>Review the generated JSON-LD</strong> output in the
                  preview panel. The markup is formatted and ready to be
                  embedded in your HTML.
                </p>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-green-500 text-white text-xs font-bold shrink-0 mt-0.5">
                  4
                </span>
                <p className="text-sm text-muted-foreground">
                  <strong>Copy or download</strong> the JSON-LD code. Place it
                  inside a{" "}
                  <code className="bg-muted px-1 py-0.5 rounded text-xs">
                    &lt;script type=&quot;application/ld+json&quot;&gt;
                  </code>{" "}
                  tag in your page&apos;s HTML.
                </p>
              </li>
            </ol>

            <Card className="bg-green-500/5 border-green-500/20">
              <CardContent className="p-4">
                <h4 className="font-semibold text-sm mb-2">
                  Supported Schema Types
                </h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500 shrink-0 mt-0.5" />
                    <strong>Article</strong> -- Blog posts, news articles, and editorial content
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500 shrink-0 mt-0.5" />
                    <strong>Product</strong> -- E-commerce products with price, availability, and reviews
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500 shrink-0 mt-0.5" />
                    <strong>FAQ</strong> -- Frequently asked questions with expandable answers
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500 shrink-0 mt-0.5" />
                    <strong>Organization</strong> -- Company or organization information
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500 shrink-0 mt-0.5" />
                    <strong>LocalBusiness</strong> -- Local businesses with address and hours
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500 shrink-0 mt-0.5" />
                    <strong>BreadcrumbList</strong> -- Navigation breadcrumb trails
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500 shrink-0 mt-0.5" />
                    <strong>WebSite</strong> -- Website-level information with search action
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Page Speed Analyzer */}
        <section id="page-speed">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-green-500/10">
              <Gauge className="h-6 w-6 text-green-500" />
            </div>
            <h2 className="text-2xl font-bold">Page Speed Analyzer</h2>
          </div>
          <div className="space-y-4">
            <p className="text-muted-foreground leading-relaxed">
              Analyze any webpage&apos;s performance with 10 key checks and
              receive an overall score from 0 to 100. The tool fetches the
              page server-side and evaluates response time, HTML structure,
              and optimization best practices.
            </p>

            <h3 className="font-semibold text-lg">How to Use</h3>
            <ol className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-green-500 text-white text-xs font-bold shrink-0 mt-0.5">
                  1
                </span>
                <p className="text-sm text-muted-foreground">
                  <strong>Enter a URL</strong> to analyze (e.g.,
                  &quot;https://example.com&quot;). The URL must be publicly
                  accessible.
                </p>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-green-500 text-white text-xs font-bold shrink-0 mt-0.5">
                  2
                </span>
                <p className="text-sm text-muted-foreground">
                  <strong>Click &quot;Analyze&quot;</strong> to start the
                  performance check. The server fetches the page and measures
                  timing and structure.
                </p>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-green-500 text-white text-xs font-bold shrink-0 mt-0.5">
                  3
                </span>
                <p className="text-sm text-muted-foreground">
                  <strong>Review the results</strong> -- each of the 10
                  performance checks shows a pass/fail status with details
                  about what was found.
                </p>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-green-500 text-white text-xs font-bold shrink-0 mt-0.5">
                  4
                </span>
                <p className="text-sm text-muted-foreground">
                  <strong>Check the overall score</strong> (0-100) to get a
                  quick summary of the page&apos;s performance health.
                </p>
              </li>
            </ol>

            <Card className="bg-green-500/5 border-green-500/20">
              <CardContent className="p-4">
                <h4 className="font-semibold text-sm mb-2">
                  10 Performance Checks
                </h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500 shrink-0 mt-0.5" />
                    <strong>HTTPS</strong> -- Verifies the page is served over a secure connection
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500 shrink-0 mt-0.5" />
                    <strong>HTML Size</strong> -- Checks if the HTML document size is within optimal range
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500 shrink-0 mt-0.5" />
                    <strong>Response Time</strong> -- Measures server response time for the initial request
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500 shrink-0 mt-0.5" />
                    <strong>Scripts</strong> -- Counts the number of script tags and evaluates impact
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500 shrink-0 mt-0.5" />
                    <strong>Stylesheets</strong> -- Checks external stylesheet count and loading strategy
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500 shrink-0 mt-0.5" />
                    <strong>Viewport</strong> -- Ensures a viewport meta tag is present for mobile responsiveness
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500 shrink-0 mt-0.5" />
                    <strong>Title</strong> -- Validates that the page has a title tag
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500 shrink-0 mt-0.5" />
                    <strong>Meta Description</strong> -- Checks for a meta description tag
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500 shrink-0 mt-0.5" />
                    <strong>Images</strong> -- Evaluates image optimization and alt text usage
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500 shrink-0 mt-0.5" />
                    <strong>Minification</strong> -- Detects whether HTML appears to be minified
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-yellow-500/5 border-yellow-500/20">
              <CardContent className="p-4 flex items-start gap-3">
                <Info className="h-5 w-5 text-yellow-500 shrink-0 mt-0.5" />
                <p className="text-sm text-muted-foreground">
                  The Page Speed Analyzer performs a server-side fetch of the
                  target URL. Pages that require authentication or block
                  server-side requests may not return accurate results.
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
              "Robots.txt: Use \"*\" as the user-agent to create rules that apply to all search engine crawlers.",
              "Robots.txt: Always include a Sitemap directive pointing to your XML sitemap for better crawl discovery.",
              "Sitemap: Set higher priority values (0.8-1.0) for your most important pages like the homepage and key landing pages.",
              "Sitemap: Update the last modified date whenever page content changes to signal freshness to search engines.",
              "Schema: Test your generated JSON-LD with Google\u2019s Rich Results Test to verify it is valid before deploying.",
              "Schema: FAQ schema can help your pages appear with expandable question-and-answer results in Google Search.",
              "Page Speed: Aim for a response time under 200ms and an HTML size under 100KB for optimal performance.",
              "Page Speed: Ensure every page has a viewport meta tag, title, and meta description for basic SEO compliance.",
              "All tools support copying output to clipboard and downloading as a file for easy integration into your project.",
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
            href="/docs/dev-tools"
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Developer Tools Docs
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
