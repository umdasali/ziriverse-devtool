import { Metadata } from "next";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ImageIcon,
  Globe,
  Palette,
  Code2,
  ArrowRight,
  Zap,
  Shield,
  Sparkles,
  Check,
  ChevronDown,
  Users,
  TrendingUp,
  Heart,
  Star,
  Download,
  Globe2
} from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import { StructuredData } from "@/components/seo/structured-data";
import {
  generateMetadata as generateSEOMetadata,
  generateWebsiteSchema,
  generateSoftwareApplicationSchema,
  generateWebPageSchema,
} from "@/lib/seo";

export const metadata: Metadata = generateSEOMetadata({
  title: "Branding Tools - Free Professional Web Development Utilities",
  description:
    "Professional toolkit for web developers featuring advanced image converter (8+ formats), comprehensive SEO validator (100+ checks), design system generator, JSON to TypeScript, CSS converters, SVG visualizer, and regex tester. Privacy-first, client-side processing.",
  keywords: [
    "image converter",
    "SEO validator",
    "design system generator",
    "JSON to TypeScript",
    "CSS unit converter",
    "SVG path visualizer",
    "regex tester",
    "web development tools",
    "free developer tools",
    "privacy-first tools"
  ],
  canonicalUrl: "https://brandingtools.dev",
});

const features = [
  {
    title: "Image Converter",
    description: "Convert images between 8 formats with advanced controls for resize, transform, and filters. Lightning-fast client-side processing.",
    icon: ImageIcon,
    href: "/image-converter",
    badge: "8 Formats",
    gradient: "from-blue-500 to-cyan-500",
    stats: "Support for AVIF, WebP, PNG, JPEG, GIF, BMP, TIFF, ICO",
  },
  {
    title: "SEO Validator",
    description: "Advanced SEO analysis with 100+ data points, scoring system, and previews for 6 social platforms. Export reports in JSON/CSV.",
    icon: Globe,
    href: "/seo-validator",
    badge: "100+ Data Points",
    gradient: "from-green-500 to-emerald-500",
    stats: "Facebook, Twitter, LinkedIn, Discord, Reddit, WhatsApp",
  },
  {
    title: "Design System Generator",
    description: "Create comprehensive design systems with 100+ properties. Export in 5 formats with version control and dark mode support.",
    icon: Palette,
    href: "/branding",
    badge: "100+ Properties",
    gradient: "from-purple-500 to-pink-500",
    stats: "CSS, SCSS, JSON, Tailwind, JavaScript exports",
  },
  {
    title: "Developer Utilities",
    description: "JSON to TypeScript, CSS converters, SVG visualizer, and regex tester. Essential tools for modern development workflows.",
    icon: Code2,
    href: "/dev-tools",
    badge: "4 Tools",
    gradient: "from-orange-500 to-red-500",
    stats: "JSON-TS, CSS Units, SVG Path, Regex Tester",
  },
];

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
  { icon: TrendingUp, value: "4", label: "Powerful Tools" },
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
    quote: "Best SEO validator I've used. The scoring system helped improve our site's visibility.",
    author: "Michael Rodriguez",
    role: "Marketing Manager",
    rating: 5,
  },
  {
    quote: "Image converter with 8 formats and filters? Exactly what I needed for my workflow.",
    author: "Emily Thompson",
    role: "UI/UX Designer",
    rating: 5,
  },
];

const faqs = [
  {
    question: "Is Branding Tools really free?",
    answer: "Yes! All tools are completely free with no hidden costs, subscriptions, or usage limits. We believe powerful branding tools should be accessible to everyone.",
  },
  {
    question: "Is my data safe and private?",
    answer: "Absolutely. We process everything client-side in your browser. Your files and data never leave your device. We don't collect, store, or track any personal information.",
  },
  {
    question: "What formats does the Image Converter support?",
    answer: "We support 8 formats: AVIF, WebP, PNG, JPEG, GIF, BMP, TIFF, and ICO. You can also resize, rotate, flip, and apply 6 different filters.",
  },
  {
    question: "Can I export my design system to my project?",
    answer: "Yes! Export in 5 formats: CSS (with custom properties), SCSS (variables), JSON (design tokens), Tailwind config, or JavaScript (ES6 modules).",
  },
  {
    question: "What platforms does the SEO Validator preview?",
    answer: "We provide previews for 6 platforms: Facebook, Twitter, LinkedIn, Discord, Reddit, and WhatsApp. Plus advanced analysis with 100+ SEO data points.",
  },
  {
    question: "Do I need an account to use Branding Tools?",
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
            "Branding Tools - Free Professional Web Development Utilities",
            "Professional toolkit for web developers with 4 powerful tools",
            "https://brandingtools.dev"
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
                100% Free · Privacy First · No Sign-Up Required
              </Badge>

              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">
                Professional Tools for{" "}
                <span className="bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent">
                  Modern Developers
                </span>
              </h1>

              <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Convert images, validate SEO, generate design systems, and streamline development - all in one powerful,
                privacy-focused platform. Free forever, no sign-up required.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
                <Link href="/image-converter">
                  <Button size="lg" className="group text-base px-8">
                    Get Started Free
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
                <Link href="/dev-tools">
                  <Button size="lg" variant="outline" className="text-base px-8">
                    Explore Tools
                  </Button>
                </Link>
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

        {/* Features Section */}
        <section className="py-20 sm:py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
                Everything You Need
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Four powerful tools designed to streamline your development workflow
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2 max-w-6xl mx-auto">
              {features.map((feature) => (
                <Card
                  key={feature.href}
                  className="group relative overflow-hidden border-2 hover:border-primary/50 transition-all hover:shadow-xl"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity`} />

                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className={`p-3 rounded-lg bg-gradient-to-br ${feature.gradient}`}>
                        <feature.icon className="h-6 w-6 text-white" />
                      </div>
                      <Badge variant="secondary" className="text-xs">{feature.badge}</Badge>
                    </div>

                    <CardTitle className="mt-4 text-xl">{feature.title}</CardTitle>
                    <CardDescription className="text-base">{feature.description}</CardDescription>

                    <div className="text-xs text-muted-foreground mt-4 flex items-center gap-1">
                      <Check className="h-3 w-3 text-primary" />
                      {feature.stats}
                    </div>
                  </CardHeader>

                  <CardContent>
                    <Link href={feature.href}>
                      <Button className="w-full group/btn">
                        Try it Now
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

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
                      "{testimonial.quote}"
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
                Ready to Transform Your Workflow?
              </h2>
              <p className="text-lg sm:text-xl opacity-90">
                Join thousands of developers who trust {siteConfig.name} for their
                development needs. No credit card required, no sign-up hassle.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
                <Link href="/image-converter">
                  <Button size="lg" variant="secondary" className="text-base px-8 group">
                    Start Creating Free
                    <Sparkles className="ml-2 h-4 w-4 transition-transform group-hover:scale-110" />
                  </Button>
                </Link>
                <Link href="/dev-tools">
                  <Button size="lg" variant="outline" className="text-base px-8 bg-white/10 border-white/20 hover:bg-white/20 text-white">
                    Explore Developer Tools
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
