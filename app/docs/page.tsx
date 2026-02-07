import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import {
  ImageIcon,
  SearchCheck,
  Sparkles,
  Code2,
  ArrowRight,
  BookOpen,
  FileText,
  HelpCircle,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Documentation",
  description: `Learn how to use all ${siteConfig.name} tools with step-by-step guides and tutorials. Image converter, SEO validator, design system generator, and developer tools.`,
  keywords: [
    "documentation",
    "user guide",
    "tutorials",
    "image converter guide",
    "SEO validator guide",
    "design system guide",
    "developer tools guide",
  ],
  alternates: {
    canonical: `${siteConfig.url}/docs`,
  },
  openGraph: {
    title: `Documentation | ${siteConfig.name}`,
    description: `Step-by-step guides and tutorials for all ${siteConfig.name} tools.`,
    url: `${siteConfig.url}/docs`,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} Documentation`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `Documentation | ${siteConfig.name}`,
    description: `Step-by-step guides and tutorials for all ${siteConfig.name} tools.`,
    images: [siteConfig.ogImage],
    creator: siteConfig.twitterCreator,
  },
};

const tools = [
  {
    title: "Image Converter",
    description:
      "Convert, resize, transform, and apply filters to images. Supports 8+ formats including PNG, JPEG, WEBP, AVIF, GIF, BMP, TIFF, and ICO.",
    href: "/docs/image-converter",
    icon: ImageIcon,
    color: "from-blue-500 to-cyan-500",
    badge: "8+ Formats",
    features: [
      "Drag-and-drop upload",
      "Format conversion",
      "Resize & transform",
      "Filters & effects",
      "Client or server processing",
    ],
  },
  {
    title: "SEO Validator",
    description:
      "Comprehensive SEO analysis with 100+ data points. Validate meta tags, preview social cards, and export detailed reports.",
    href: "/docs/seo-validator",
    icon: SearchCheck,
    color: "from-green-500 to-emerald-500",
    badge: "100+ Checks",
    features: [
      "Quick check & deep analysis",
      "SEO score dashboard",
      "6 platform previews",
      "Content & security audit",
      "JSON/CSV export",
    ],
  },
  {
    title: "Design System Generator",
    description:
      "Create comprehensive design systems with 100+ customizable properties. Export in CSS, SCSS, JSON, Tailwind, and JavaScript.",
    href: "/docs/branding",
    icon: Sparkles,
    color: "from-purple-500 to-pink-500",
    badge: "100+ Properties",
    features: [
      "Typography & colors",
      "Dark mode support",
      "Shadows & animations",
      "5 export formats",
      "Version control",
    ],
  },
  {
    title: "Developer Tools",
    description:
      "Essential utilities for modern web development including JSON to TypeScript, CSS unit converter, SVG visualizer, and regex tester.",
    href: "/docs/dev-tools",
    icon: Code2,
    color: "from-orange-500 to-red-500",
    badge: "4 Tools",
    features: [
      "JSON to TypeScript",
      "CSS unit converter",
      "SVG path visualizer",
      "Regex tester",
    ],
  },
];

export default function DocsPage() {
  return (
    <div className="container mx-auto px-4 py-12 sm:py-16 lg:py-24">
      {/* Hero Section */}
      <div className="mx-auto max-w-3xl text-center mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
          <BookOpen className="h-4 w-4" />
          Documentation
        </div>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
          Learn How to Use{" "}
          <span className="bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">
            {siteConfig.name}
          </span>
        </h1>
        <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed">
          Step-by-step guides for every tool. From basic usage to advanced
          features, find everything you need to get the most out of our platform.
        </p>
      </div>

      {/* Quick Links */}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 mb-16">
        {tools.map((tool) => (
          <Link key={tool.href} href={tool.href}>
            <Card className="h-full border-2 hover:border-primary/50 transition-all hover:shadow-md group cursor-pointer">
              <CardContent className="p-4 flex items-center gap-3">
                <div
                  className={`p-2 rounded-lg bg-gradient-to-br ${tool.color} text-white shrink-0`}
                >
                  <tool.icon className="h-5 w-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-sm">{tool.title}</div>
                  <div className="text-xs text-muted-foreground">
                    View guide
                  </div>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Tool Documentation Cards */}
      <div className="space-y-8">
        {tools.map((tool) => (
          <Card key={tool.href} className="border-2 overflow-hidden">
            <div className="grid md:grid-cols-3">
              <div className="md:col-span-2 p-6 sm:p-8">
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className={`p-3 rounded-lg bg-gradient-to-br ${tool.color} text-white`}
                  >
                    <tool.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">{tool.title}</h2>
                    <Badge variant="secondary" className="mt-1">
                      {tool.badge}
                    </Badge>
                  </div>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  {tool.description}
                </p>
                <Link
                  href={tool.href}
                  className="inline-flex items-center gap-2 text-primary font-medium hover:underline"
                >
                  Read full documentation
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
              <div className="bg-muted/30 p-6 sm:p-8 border-t md:border-t-0 md:border-l">
                <h3 className="font-semibold text-sm mb-3 flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  What you&apos;ll learn
                </h3>
                <ul className="space-y-2">
                  {tool.features.map((feature) => (
                    <li
                      key={feature}
                      className="text-sm text-muted-foreground flex items-start gap-2"
                    >
                      <span className="text-primary mt-0.5">&#10003;</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* FAQ Section */}
      <div className="mt-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 flex items-center justify-center gap-2">
            <HelpCircle className="h-8 w-8" />
            Frequently Asked Questions
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Quick answers to common questions about using {siteConfig.name}
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 max-w-4xl mx-auto">
          <Card className="border-2">
            <CardHeader>
              <CardTitle className="text-lg">Is my data safe?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Most processing happens in your browser. Your images, code, and
                data never leave your device unless you explicitly choose
                server-side processing for higher quality results.
              </p>
            </CardContent>
          </Card>
          <Card className="border-2">
            <CardHeader>
              <CardTitle className="text-lg">Is it free to use?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                All tools are completely free with no limits. No account
                required, no watermarks, and no hidden fees.
              </p>
            </CardContent>
          </Card>
          <Card className="border-2">
            <CardHeader>
              <CardTitle className="text-lg">
                Do I need to create an account?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                No account is needed. All tools work immediately with no sign-up
                required. Your history and saved settings are stored locally in
                your browser.
              </p>
            </CardContent>
          </Card>
          <Card className="border-2">
            <CardHeader>
              <CardTitle className="text-lg">
                What browsers are supported?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                {siteConfig.name} works in all modern browsers including Chrome,
                Firefox, Safari, and Edge. For the best experience, use the
                latest version of your browser.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* CTA Section */}
      <div className="mt-20 text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
        <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
          Jump into any tool and start creating. No setup required.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/image-converter"
            className="inline-flex items-center justify-center rounded-lg bg-primary px-8 py-3 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90"
          >
            Try Image Converter
          </Link>
          <Link
            href="/seo-validator"
            className="inline-flex items-center justify-center rounded-lg border-2 border-primary px-8 py-3 text-sm font-medium transition-colors hover:bg-primary/10"
          >
            Try SEO Validator
          </Link>
        </div>
      </div>
    </div>
  );
}
