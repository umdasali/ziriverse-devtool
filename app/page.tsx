import { Metadata } from "next";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRight,
  Zap,
  Shield,
  Sparkles,
  ChevronDown,
  Users,
  TrendingUp,
  Heart,
  Star,
  Download,
  Globe2,
} from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import { toolCategories, allTools, newTools } from "@/lib/tool-registry";
import { StructuredData } from "@/components/seo/structured-data";
import {
  generateMetadata as generateSEOMetadata,
  generateWebsiteSchema,
  generateSoftwareApplicationSchema,
  generateWebPageSchema,
} from "@/lib/seo";

export const metadata: Metadata = generateSEOMetadata({
  title: "Ziriverse - The Developer Platform for SEO, Development & Branding",
  description:
    "15+ free developer tools — SEO analysis, JSON formatter, JWT decoder, API tester, design system generator, image converter, color palette generator, and more. Privacy-first, no sign-up required.",
  keywords: [
    "developer tools",
    "SEO tools",
    "branding tools",
    "JSON formatter",
    "base64 encoder",
    "JWT decoder",
    "API tester",
    "minifier",
    "UUID generator",
    "regex tester",
    "robots.txt generator",
    "sitemap generator",
    "schema generator",
    "page speed analyzer",
    "color palette generator",
    "image converter",
    "design system generator",
    "free developer tools",
    "privacy-first tools",
  ],
  canonicalUrl: "https://ziriverse.com",
});

const benefits = [
  {
    icon: Shield,
    title: "Privacy First",
    description: "All processing happens in your browser. Your files never leave your device. Zero tracking, zero data collection.",
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Optimized for performance with client-side processing, smart caching, and instant results.",
  },
  {
    icon: Sparkles,
    title: "Professional Quality",
    description: "Enterprise-grade tools with features that rival paid alternatives. Free forever.",
  },
  {
    icon: Heart,
    title: "Built with Love",
    description: "Crafted by developers, for developers. Modern, intuitive, and delightful to use.",
  },
];

const stats = [
  { icon: TrendingUp, value: `${allTools.length}+`, label: "Powerful Tools" },
  { icon: Users, value: "50K+", label: "Active Users" },
  { icon: Download, value: "1M+", label: "Conversions" },
  { icon: Globe2, value: "150+", label: "Countries" },
];

const testimonials = [
  {
    quote: "The design system generator saved me hours of work. Export to Tailwind is perfect!",
    author: "Sarah Chen",
    role: "Frontend Developer",
    rating: 5,
  },
  {
    quote: "Best SEO validator I've used. The robots.txt and schema generators are game changers.",
    author: "Michael Rodriguez",
    role: "Marketing Manager",
    rating: 5,
  },
  {
    quote: "JWT decoder, API tester, JSON formatter — all the dev tools I need in one place.",
    author: "Emily Thompson",
    role: "Full-Stack Developer",
    rating: 5,
  },
];

const faqs = [
  {
    question: "Is Ziriverse really free?",
    answer: `Yes! All ${allTools.length}+ tools are completely free with no hidden costs, subscriptions, or usage limits. We believe powerful developer tools should be accessible to everyone.`,
  },
  {
    question: "Is my data safe and private?",
    answer: "Absolutely. We process everything client-side in your browser. Your files and data never leave your device. We don't collect, store, or track any personal information.",
  },
  {
    question: "What SEO tools are available?",
    answer: "We offer a complete SEO toolkit: SEO Validator with 100+ checks, Robots.txt Generator, Sitemap Generator, Schema/JSON-LD Generator, and Page Speed Analyzer.",
  },
  {
    question: "What developer tools are included?",
    answer: "JSON Formatter, Base64 Encoder/Decoder, JWT Decoder, HTML/CSS/JS Minifier, Regex Tester, UUID Generator, API Tester, plus the original JSON-to-TypeScript, CSS Unit Converter, and SVG Visualizer.",
  },
  {
    question: "Can I export my design system to my project?",
    answer: "Yes! Export in 5 formats: CSS (with custom properties), SCSS (variables), JSON (design tokens), Tailwind config, or JavaScript (ES6 modules).",
  },
  {
    question: "Do I need an account to use Ziriverse?",
    answer: "No account needed! Just visit the site and start using any tool immediately. Your preferences are saved locally in your browser.",
  },
];

export default function HomePage() {
  return (
    <>
      <StructuredData
        data={[
          generateWebsiteSchema(),
          generateSoftwareApplicationSchema(),
          generateWebPageSchema(
            "Ziriverse - The Developer Platform",
            `${allTools.length}+ free developer tools for SEO, development, and branding`,
            "https://ziriverse.com"
          ),
        ]}
      />

      <div className="overflow-hidden">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-b from-primary/5 via-purple-500/5 to-background pt-20 pb-32 sm:pt-24 sm:pb-40">
          <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] -z-10" />

          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-4xl text-center space-y-8">
              <Badge className="text-sm px-4 py-1" variant="secondary">
                <Sparkles className="h-3 w-3 mr-2 inline" />
                {allTools.length}+ Free Tools · Privacy First · No Sign-Up Required
              </Badge>

              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">
                The Developer Platform for{" "}
                <span className="bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent">
                  Modern Creators
                </span>
              </h1>

              <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                SEO analysis, developer utilities, and branding tools — all in one powerful,
                privacy-focused platform. Free forever, no sign-up required.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
                <Button asChild size="lg" className="group text-base px-8">
                  <Link href="/tools/developer">
                    Explore All Tools
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="text-base px-8">
                  <Link href="/docs">
                    View Documentation
                  </Link>
                </Button>
              </div>
            </div>

            {/* Stats */}
            <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="flex justify-center mb-2">
                    <stat.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground mt-2">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Tool Categories Section */}
        <section className="py-20 sm:py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
                Everything You Need, One Platform
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                {allTools.length}+ tools organized into three powerful categories
              </p>
            </div>

            <div className="space-y-16 max-w-7xl mx-auto">
              {toolCategories.map((category) => (
                <div key={category.id}>
                  {/* Category Header */}
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div className={`p-2.5 rounded-lg bg-gradient-to-br ${category.gradient}`}>
                        <category.icon className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl sm:text-2xl font-bold">{category.name}</h3>
                        <p className="text-sm text-muted-foreground">{category.description}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Badge variant="secondary">{category.tools.length} Tools</Badge>
                      {category.tools.some((t) => t.isNew) && (
                        <Badge className="bg-green-500/10 text-green-600 border-green-500/20">
                          {category.tools.filter((t) => t.isNew).length} New
                        </Badge>
                      )}
                      <Button asChild variant="outline" size="sm">
                        <Link href={category.href}>
                          View All <ArrowRight className="ml-1 h-3.5 w-3.5" />
                        </Link>
                      </Button>
                    </div>
                  </div>

                  {/* Tool Cards Grid */}
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {category.tools.map((tool) => (
                      <Card
                        key={tool.id}
                        className="group relative overflow-hidden border hover:border-primary/50 transition-all hover:shadow-lg"
                      >
                        <div className={`absolute inset-0 bg-gradient-to-br ${tool.gradient} opacity-0 group-hover:opacity-5 transition-opacity pointer-events-none`} />
                        <CardHeader className="pb-2">
                          <div className="flex items-start justify-between">
                            <div className="p-2 rounded-lg bg-primary/10">
                              <tool.icon className="h-4 w-4 text-primary" />
                            </div>
                            <div className="flex gap-1">
                              {tool.badge && (
                                <Badge variant="secondary" className="text-[10px] h-5">
                                  {tool.badge}
                                </Badge>
                              )}
                              {tool.isNew && (
                                <Badge className="bg-green-500/10 text-green-600 border-green-500/20 text-[10px] h-5">
                                  New
                                </Badge>
                              )}
                            </div>
                          </div>
                          <CardTitle className="text-sm mt-2">{tool.name}</CardTitle>
                        </CardHeader>
                        <CardContent className="pt-0">
                          <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
                            {tool.description}
                          </p>
                          <Button asChild size="sm" variant="ghost" className="w-full group/btn h-8 text-xs">
                            <Link href={tool.href}>
                              Try it Now
                              <ArrowRight className="ml-1 h-3 w-3 transition-transform group-hover/btn:translate-x-1" />
                            </Link>
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* What's New Section */}
        {newTools.length > 0 && (
          <section className="py-16 sm:py-20 bg-gradient-to-b from-green-500/5 to-background">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <Badge className="bg-green-500/10 text-green-600 border-green-500/20 mb-4">
                  Just Launched
                </Badge>
                <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                  {newTools.length} New Tools Added
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  We&apos;ve expanded the platform with powerful new utilities across all categories
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 max-w-6xl mx-auto">
                {newTools.map((tool) => (
                  <Link
                    key={tool.id}
                    href={tool.href}
                    className="flex items-center gap-3 p-3 rounded-lg border hover:border-primary/50 hover:bg-muted/50 transition-all group"
                  >
                    <div className="p-2 rounded-lg bg-primary/10 flex-shrink-0">
                      <tool.icon className="h-4 w-4 text-primary" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-sm font-medium group-hover:text-primary transition-colors truncate">
                        {tool.name}
                      </div>
                      <div className="text-xs text-muted-foreground truncate">{tool.shortDescription}</div>
                    </div>
                    <ArrowRight className="h-3.5 w-3.5 text-muted-foreground ml-auto flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Benefits Section */}
        <section className="py-20 sm:py-24 bg-gradient-to-b from-primary/5 to-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
                Why Choose {siteConfig.name}?
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Built with modern technologies and best practices
              </p>
            </div>

            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 max-w-6xl mx-auto">
              {benefits.map((benefit) => (
                <Card key={benefit.title} className="border-2 text-center">
                  <CardHeader>
                    <div className="flex justify-center mb-4">
                      <div className="p-4 rounded-full bg-primary/10">
                        <benefit.icon className="h-8 w-8 text-primary" />
                      </div>
                    </div>
                    <CardTitle className="text-lg">{benefit.title}</CardTitle>
                    <CardDescription>{benefit.description}</CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-20 sm:py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
                Loved by Developers
              </h2>
              <p className="text-lg text-muted-foreground">
                See what our users are saying
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-3 max-w-6xl mx-auto">
              {testimonials.map((testimonial, index) => (
                <Card key={index} className="border-2">
                  <CardHeader>
                    <div className="flex gap-1 mb-3">
                      {Array.from({ length: testimonial.rating }).map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <CardDescription className="text-base italic">
                      &quot;{testimonial.quote}&quot;
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="font-semibold">{testimonial.author}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 sm:py-24 bg-gradient-to-b from-background to-primary/5">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-lg text-muted-foreground">
                Everything you need to know about {siteConfig.name}
              </p>
            </div>

            <div className="max-w-3xl mx-auto space-y-4">
              {faqs.map((faq, index) => (
                <Card key={index} className="border-2">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-start gap-3">
                      <ChevronDown className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      {faq.question}
                    </CardTitle>
                    <CardDescription className="text-base pl-8">
                      {faq.answer}
                    </CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 sm:py-32 bg-gradient-to-br from-primary via-purple-500 to-pink-500 text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center space-y-8">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">
                Ready to Supercharge Your Workflow?
              </h2>
              <p className="text-lg sm:text-xl opacity-90">
                Join thousands of developers who trust {siteConfig.name} for their
                SEO, development, and branding needs. {allTools.length}+ tools, zero cost.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
                <Button asChild size="lg" variant="secondary" className="text-base px-8 group">
                  <Link href="/tools/seo">
                    Explore SEO Tools
                    <Sparkles className="ml-2 h-4 w-4 transition-transform group-hover:scale-110" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="text-base px-8 bg-white/10 border-white/20 hover:bg-white/20 text-white">
                  <Link href="/tools/developer">
                    Developer Tools
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
