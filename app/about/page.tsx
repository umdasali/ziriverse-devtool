import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import {
  Target,
  Zap,
  Shield,
  Heart,
  Users,
  Rocket,
  ImageIcon,
  SearchCheck,
  Sparkles,
  Code2,
  ArrowRight,
  Globe,
  Lock,
  Cpu,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "About Us",
  description: `Learn more about ${siteConfig.name} and our mission to provide professional branding tools for modern creators.`,
  keywords: [
    "about Ziriverse",
    "branding tools",
    "web development platform",
    "free developer tools",
    "privacy-first tools",
  ],
  alternates: {
    canonical: `${siteConfig.url}/about`,
  },
  openGraph: {
    title: `About Us | ${siteConfig.name}`,
    description: `Learn more about ${siteConfig.name} and our mission to provide professional branding tools for modern creators.`,
    url: `${siteConfig.url}/about`,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: `About ${siteConfig.name}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `About Us | ${siteConfig.name}`,
    description: `Learn more about ${siteConfig.name} and our mission to provide professional branding tools for modern creators.`,
    images: [siteConfig.ogImage],
    creator: siteConfig.twitterCreator,
  },
};

export default function AboutPage() {
  const values = [
    {
      icon: Target,
      title: "Purpose-Driven",
      description:
        "We build tools that solve real problems for designers and developers.",
    },
    {
      icon: Zap,
      title: "Fast & Efficient",
      description:
        "Lightning-fast performance with client-side processing for privacy.",
    },
    {
      icon: Shield,
      title: "Privacy First",
      description:
        "Your data stays on your device. No tracking, no collection.",
    },
    {
      icon: Heart,
      title: "User-Centric",
      description:
        "Designed with love for creators who care about their craft.",
    },
    {
      icon: Users,
      title: "Community Focused",
      description: "Built by creators, for creators. We listen and improve.",
    },
    {
      icon: Rocket,
      title: "Always Evolving",
      description: "Constantly improving and adding features you need.",
    },
  ];

  const tools = [
    {
      icon: ImageIcon,
      title: "Image Converter",
      description:
        "Convert images between 8+ formats with advanced resize, transform, and filter controls. Process client-side for privacy or server-side for quality.",
      badge: "8+ Formats",
      href: "/image-converter",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: SearchCheck,
      title: "SEO Validator",
      description:
        "Comprehensive SEO analysis with 100+ data points. Score your pages, audit content and security, preview social cards across 6 platforms, and export detailed reports.",
      badge: "100+ Checks",
      href: "/seo-validator",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: Sparkles,
      title: "Design System Generator",
      description:
        "Create complete design systems with 100+ customizable properties. Configure typography, colors, dark mode, shadows, animations, and export in CSS, SCSS, JSON, Tailwind, or JavaScript.",
      badge: "100+ Properties",
      href: "/branding",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: Code2,
      title: "Developer Tools",
      description:
        "Essential utilities including JSON to TypeScript converter, CSS unit converter with fluid clamp(), SVG path visualizer, and regex tester with explanations.",
      badge: "4 Tools",
      href: "/dev-tools",
      color: "from-orange-500 to-red-500",
    },
  ];

  const team = [
    {
      role: "Our Vision",
      description:
        "To be the go-to platform for professional branding and design tools that empower creators worldwide.",
    },
    {
      role: "Our Mission",
      description:
        "To provide fast, secure, and powerful tools that make branding and design accessible to everyone.",
    },
    {
      role: "Our Promise",
      description:
        "To maintain the highest standards of quality, privacy, and user experience in everything we build.",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-12 sm:py-16 lg:py-24">
      {/* Hero Section */}
      <div className="mx-auto max-w-3xl text-center mb-16 sm:mb-20">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
          About{" "}
          <span className="bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">
            {siteConfig.name}
          </span>
        </h1>
        <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed">
          We&apos;re building the ultimate toolkit for modern creators.
          Professional-grade tools for image conversion, SEO optimization, design
          system generation, and developer utilities - all in one platform.
        </p>
      </div>

      {/* Story Section */}
      <div className="mx-auto max-w-4xl mb-20">
        <Card className="border-2">
          <CardContent className="p-6 sm:p-8 lg:p-12">
            <h2 className="text-2xl sm:text-3xl font-bold mb-6">Our Story</h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                {siteConfig.name} was born from a simple observation: creators
                spend too much time switching between multiple tools for basic
                branding tasks. We believed there had to be a better way.
              </p>
              <p>
                Our journey began with a question: What if we could combine the
                most essential branding and development tools into one seamless,
                privacy-focused platform? What if we could make professional-grade
                tools accessible to everyone, from indie creators to enterprise
                teams?
              </p>
              <p>
                Today, {siteConfig.name} serves thousands of creators worldwide
                with tools for image conversion, SEO validation, design system
                generation, and developer utilities. But we&apos;re just getting
                started.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* What We Offer */}
      <div className="mb-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            What We Offer
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Four powerful tools designed for modern creators and developers
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          {tools.map((tool) => (
            <Card
              key={tool.title}
              className="border-2 hover:border-primary/50 transition-all hover:shadow-md group"
            >
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div
                    className={`p-3 rounded-lg bg-gradient-to-br ${tool.color} text-white shrink-0`}
                  >
                    <tool.icon className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-bold text-lg">{tool.title}</h3>
                      <Badge variant="secondary" className="text-xs">
                        {tool.badge}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                      {tool.description}
                    </p>
                    <Link
                      href={tool.href}
                      className="inline-flex items-center gap-1 text-sm text-primary font-medium hover:underline"
                    >
                      Try it now
                      <ArrowRight className="h-3 w-3" />
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="mb-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Why Choose {siteConfig.name}?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Built with the principles that matter most to creators
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-3">
          <Card className="border-2 text-center">
            <CardContent className="p-6">
              <div className="inline-flex p-3 rounded-full bg-green-500/10 mb-4">
                <Lock className="h-8 w-8 text-green-500" />
              </div>
              <h3 className="font-bold text-lg mb-2">Privacy First</h3>
              <p className="text-sm text-muted-foreground">
                Most processing happens in your browser. Your images, code, and
                data stay on your device unless you choose otherwise.
              </p>
            </CardContent>
          </Card>
          <Card className="border-2 text-center">
            <CardContent className="p-6">
              <div className="inline-flex p-3 rounded-full bg-blue-500/10 mb-4">
                <Cpu className="h-8 w-8 text-blue-500" />
              </div>
              <h3 className="font-bold text-lg mb-2">No Account Required</h3>
              <p className="text-sm text-muted-foreground">
                All tools work instantly with no sign-up, no watermarks, and no
                hidden fees. Your settings and history are stored locally.
              </p>
            </CardContent>
          </Card>
          <Card className="border-2 text-center">
            <CardContent className="p-6">
              <div className="inline-flex p-3 rounded-full bg-purple-500/10 mb-4">
                <Globe className="h-8 w-8 text-purple-500" />
              </div>
              <h3 className="font-bold text-lg mb-2">Always Free</h3>
              <p className="text-sm text-muted-foreground">
                Every tool is completely free with no limits. We believe
                essential creator tools should be accessible to everyone.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Values Section */}
      <div className="mb-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Our Values</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            The principles that guide everything we do
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {values.map((value) => (
            <Card
              key={value.title}
              className="border-2 hover:border-primary/50 transition-colors"
            >
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-primary/10">
                    <value.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">
                      {value.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {value.description}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Mission/Vision Section */}
      <div className="mb-20">
        <div className="grid gap-6 md:grid-cols-3">
          {team.map((item) => (
            <Card
              key={item.role}
              className="border-2 bg-gradient-to-br from-primary/5 to-primary/10"
            >
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-3">{item.role}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-gradient-to-r from-primary/10 via-purple-500/10 to-pink-500/10 rounded-2xl p-8 sm:p-12 mb-20">
        <div className="grid gap-8 sm:grid-cols-4 text-center">
          <div>
            <div className="text-4xl sm:text-5xl font-bold mb-2">4</div>
            <div className="text-sm text-muted-foreground uppercase tracking-wide">
              Powerful Tools
            </div>
          </div>
          <div>
            <div className="text-4xl sm:text-5xl font-bold mb-2">100+</div>
            <div className="text-sm text-muted-foreground uppercase tracking-wide">
              Features
            </div>
          </div>
          <div>
            <div className="text-4xl sm:text-5xl font-bold mb-2">5</div>
            <div className="text-sm text-muted-foreground uppercase tracking-wide">
              Export Formats
            </div>
          </div>
          <div>
            <div className="text-4xl sm:text-5xl font-bold mb-2">100%</div>
            <div className="text-sm text-muted-foreground uppercase tracking-wide">
              Privacy Focused
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="text-center">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4">
          Ready to Get Started?
        </h2>
        <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
          Join thousands of creators who trust {siteConfig.name} for their
          branding and development needs.
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
          <Link
            href="/docs"
            className="inline-flex items-center justify-center rounded-lg border-2 px-8 py-3 text-sm font-medium transition-colors hover:bg-muted"
          >
            Read Documentation
          </Link>
        </div>
      </div>
    </div>
  );
}
