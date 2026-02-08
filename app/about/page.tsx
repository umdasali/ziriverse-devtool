import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { allTools, toolCategories } from "@/lib/tool-registry";
import {
  Target,
  Zap,
  Shield,
  Heart,
  Users,
  Rocket,
  ArrowRight,
  Globe,
  Lock,
  Cpu,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "About Us",
  description: `Learn more about ${siteConfig.name} — the all-in-one developer platform with ${allTools.length}+ free tools for SEO, development, and branding.`,
  keywords: [
    "about Ziriverse",
    "developer platform",
    "free developer tools",
    "SEO tools",
    "branding tools",
    "privacy-first tools",
    "web development platform",
  ],
  alternates: {
    canonical: `${siteConfig.url}/about`,
  },
  openGraph: {
    title: `About Us | ${siteConfig.name}`,
    description: `Learn more about ${siteConfig.name} — the all-in-one developer platform with ${allTools.length}+ free tools.`,
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
    description: `Learn more about ${siteConfig.name} — the all-in-one developer platform with ${allTools.length}+ free tools.`,
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

  const team = [
    {
      role: "Our Vision",
      description:
        "To be the go-to platform for professional developer and branding tools that empower creators worldwide.",
    },
    {
      role: "Our Mission",
      description:
        "To provide fast, secure, and powerful tools that make SEO, development, and branding accessible to everyone.",
    },
    {
      role: "Our Promise",
      description:
        "To maintain the highest standards of quality, privacy, and user experience in everything we build.",
    },
  ];

  const newToolCount = allTools.filter((t) => t.isNew).length;

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
          We&apos;re building the ultimate developer platform for modern
          creators. {allTools.length}+ professional-grade tools for SEO
          optimization, web development, image conversion, design system
          generation, and more - all free, all in one place.
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
                tasks. We believed there had to be a better way.
              </p>
              <p>
                Our journey began with a question: What if we could combine the
                most essential developer and branding tools into one seamless,
                privacy-focused platform? What if we could make professional-grade
                tools accessible to everyone, from indie creators to enterprise
                teams?
              </p>
              <p>
                Today, {siteConfig.name} serves thousands of creators worldwide
                with {allTools.length}+ tools across {toolCategories.length}{" "}
                categories — SEO tools, developer utilities, and branding
                solutions. But we&apos;re just getting started.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* What We Offer - Tool Categories */}
      <div className="mb-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            What We Offer
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {allTools.length}+ powerful tools across {toolCategories.length}{" "}
            categories designed for modern creators and developers
          </p>
        </div>

        <div className="space-y-8">
          {toolCategories.map((category) => (
            <Card
              key={category.id}
              className="border-2 hover:border-primary/50 transition-all hover:shadow-md"
            >
              <CardContent className="p-6">
                <div className="flex items-start gap-4 mb-4">
                  <div
                    className={`p-3 rounded-lg bg-gradient-to-br ${category.gradient} text-white shrink-0`}
                  >
                    <category.icon className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-bold text-lg">{category.name}</h3>
                      <Badge variant="secondary" className="text-xs">
                        {category.tools.length} Tools
                      </Badge>
                      {category.tools.some((t) => t.isNew) && (
                        <Badge className="bg-green-500/10 text-green-600 border-green-500/20 text-xs">
                          New
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {category.description}
                    </p>
                  </div>
                </div>
                <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3 mt-4">
                  {category.tools.map((tool) => (
                    <Link
                      key={tool.id}
                      href={tool.href}
                      className="flex items-center gap-2 p-2 rounded-lg hover:bg-muted/50 transition-colors group"
                    >
                      <tool.icon className="h-4 w-4 text-muted-foreground group-hover:text-primary shrink-0" />
                      <span className="text-sm group-hover:text-primary transition-colors">
                        {tool.name}
                      </span>
                      {tool.isNew && (
                        <Badge
                          variant="secondary"
                          className="text-[10px] px-1.5 py-0"
                        >
                          New
                        </Badge>
                      )}
                    </Link>
                  ))}
                </div>
                <div className="mt-4 pt-4 border-t">
                  <Link
                    href={category.href}
                    className="inline-flex items-center gap-1 text-sm text-primary font-medium hover:underline"
                  >
                    View all {category.name}
                    <ArrowRight className="h-3 w-3" />
                  </Link>
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
                All {allTools.length}+ tools work instantly with no sign-up, no
                watermarks, and no hidden fees. Settings are stored locally.
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
            <div className="text-4xl sm:text-5xl font-bold mb-2">
              {allTools.length}+
            </div>
            <div className="text-sm text-muted-foreground uppercase tracking-wide">
              Powerful Tools
            </div>
          </div>
          <div>
            <div className="text-4xl sm:text-5xl font-bold mb-2">
              {toolCategories.length}
            </div>
            <div className="text-sm text-muted-foreground uppercase tracking-wide">
              Categories
            </div>
          </div>
          <div>
            <div className="text-4xl sm:text-5xl font-bold mb-2">
              {newToolCount}
            </div>
            <div className="text-sm text-muted-foreground uppercase tracking-wide">
              New Tools
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
          development and branding needs.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/tools/seo"
            className="inline-flex items-center justify-center rounded-lg bg-primary px-8 py-3 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90"
          >
            Explore SEO Tools
          </Link>
          <Link
            href="/tools/developer"
            className="inline-flex items-center justify-center rounded-lg border-2 border-primary px-8 py-3 text-sm font-medium transition-colors hover:bg-primary/10"
          >
            Explore Developer Tools
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
