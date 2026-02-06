import type { Metadata } from "next";
import { siteConfig } from "@/lib/site-config";
import { Target, Zap, Shield, Heart, Users, Rocket } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "About Us",
  description: `Learn more about ${siteConfig.name} and our mission to provide professional branding tools for modern creators.`,
  openGraph: {
    title: `About ${siteConfig.name}`,
    description: `Learn more about ${siteConfig.name} and our mission to provide professional branding tools for modern creators.`,
    url: `${siteConfig.url}/about`,
  },
};

export default function AboutPage() {
  const values = [
    {
      icon: Target,
      title: "Purpose-Driven",
      description: "We build tools that solve real problems for designers and developers.",
    },
    {
      icon: Zap,
      title: "Fast & Efficient",
      description: "Lightning-fast performance with client-side processing for privacy.",
    },
    {
      icon: Shield,
      title: "Privacy First",
      description: "Your data stays on your device. No tracking, no collection.",
    },
    {
      icon: Heart,
      title: "User-Centric",
      description: "Designed with love for creators who care about their craft.",
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
      description: "To be the go-to platform for professional branding and design tools that empower creators worldwide.",
    },
    {
      role: "Our Mission",
      description: "To provide fast, secure, and powerful tools that make branding and design accessible to everyone.",
    },
    {
      role: "Our Promise",
      description: "To maintain the highest standards of quality, privacy, and user experience in everything we build.",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-12 sm:py-16 lg:py-24">
      {/* Hero Section */}
      <div className="mx-auto max-w-3xl text-center mb-16 sm:mb-20">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
          About {siteConfig.name}
        </h1>
        <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed">
          We're building the ultimate toolkit for modern creators. Professional-grade
          tools for image conversion, SEO optimization, and design system generation
          - all in one beautiful platform.
        </p>
      </div>

      {/* Story Section */}
      <div className="mx-auto max-w-4xl mb-20">
        <Card className="border-2">
          <CardContent className="p-6 sm:p-8 lg:p-12">
            <h2 className="text-2xl sm:text-3xl font-bold mb-6">Our Story</h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                {siteConfig.name} was born from a simple observation: creators spend too much
                time switching between multiple tools for basic branding tasks. We believed
                there had to be a better way.
              </p>
              <p>
                Our journey began with a question: What if we could combine the most essential
                branding tools into one seamless, privacy-focused platform? What if we could
                make professional-grade tools accessible to everyone, from indie creators to
                enterprise teams?
              </p>
              <p>
                Today, {siteConfig.name} serves thousands of creators worldwide with tools
                for image conversion, SEO validation, and design system generation. But we're
                just getting started.
              </p>
            </div>
          </CardContent>
        </Card>
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
            <Card key={value.title} className="border-2 hover:border-primary/50 transition-colors">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-primary/10">
                    <value.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">{value.title}</h3>
                    <p className="text-sm text-muted-foreground">{value.description}</p>
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
            <Card key={item.role} className="border-2 bg-gradient-to-br from-primary/5 to-primary/10">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-3">{item.role}</h3>
                <p className="text-muted-foreground leading-relaxed">{item.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-gradient-to-r from-primary/10 via-purple-500/10 to-pink-500/10 rounded-2xl p-8 sm:p-12 mb-20">
        <div className="grid gap-8 sm:grid-cols-3 text-center">
          <div>
            <div className="text-4xl sm:text-5xl font-bold mb-2">3</div>
            <div className="text-sm text-muted-foreground uppercase tracking-wide">Powerful Tools</div>
          </div>
          <div>
            <div className="text-4xl sm:text-5xl font-bold mb-2">100+</div>
            <div className="text-sm text-muted-foreground uppercase tracking-wide">Features</div>
          </div>
          <div>
            <div className="text-4xl sm:text-5xl font-bold mb-2">100%</div>
            <div className="text-sm text-muted-foreground uppercase tracking-wide">Privacy Focused</div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="text-center">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4">Ready to Get Started?</h2>
        <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
          Join thousands of creators who trust {siteConfig.name} for their branding needs.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="/image-converter"
            className="inline-flex items-center justify-center rounded-lg bg-primary px-8 py-3 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90"
          >
            Try Image Converter
          </a>
          <a
            href="/seo-validator"
            className="inline-flex items-center justify-center rounded-lg border-2 border-primary px-8 py-3 text-sm font-medium transition-colors hover:bg-primary/10"
          >
            Try SEO Validator
          </a>
        </div>
      </div>
    </div>
  );
}
