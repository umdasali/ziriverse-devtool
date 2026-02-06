import type { Metadata } from "next";
import { siteConfig } from "@/lib/site-config";
import { Shield, Eye, Lock, Database, UserCheck, FileText } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `Privacy Policy for ${siteConfig.name}. Learn how we protect your data and respect your privacy.`,
  openGraph: {
    title: `Privacy Policy | ${siteConfig.name}`,
    description: `Privacy Policy for ${siteConfig.name}. Learn how we protect your data and respect your privacy.`,
    url: `${siteConfig.url}/privacy`,
  },
};

export default function PrivacyPage() {
  const highlights = [
    {
      icon: Shield,
      title: "No Data Collection",
      description: "We don't collect, store, or sell your personal data.",
    },
    {
      icon: Lock,
      title: "Client-Side Processing",
      description: "All processing happens in your browser. Your files never leave your device.",
    },
    {
      icon: Eye,
      title: "No Tracking",
      description: "We don't use analytics, cookies, or tracking pixels.",
    },
    {
      icon: Database,
      title: "Local Storage Only",
      description: "Settings and history are stored locally in your browser.",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-12 sm:py-16 lg:py-24">
      {/* Hero */}
      <div className="mx-auto max-w-3xl text-center mb-16">
        <div className="flex justify-center mb-6">
          <div className="p-4 rounded-full bg-primary/10">
            <Shield className="h-12 w-12 text-primary" />
          </div>
        </div>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
          Privacy Policy
        </h1>
        <p className="text-lg text-muted-foreground">
          Last updated: February 5, 2026
        </p>
      </div>

      {/* Highlights */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-16">
        {highlights.map((item) => (
          <Card key={item.title} className="border-2">
            <CardContent className="p-6 text-center">
              <div className="flex justify-center mb-4">
                <div className="p-3 rounded-lg bg-primary/10">
                  <item.icon className="h-6 w-6 text-primary" />
                </div>
              </div>
              <h3 className="font-semibold mb-2">{item.title}</h3>
              <p className="text-sm text-muted-foreground">{item.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-4xl space-y-12">
        <section>
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">Our Commitment to Privacy</h2>
          <div className="prose prose-gray max-w-none space-y-4 text-muted-foreground">
            <p>
              At {siteConfig.name}, we believe privacy is a fundamental right. This Privacy Policy
              explains how we handle your information when you use our platform.
            </p>
            <p>
              <strong>The short version:</strong> We don't collect, store, or sell your personal data.
              All processing happens in your browser. Your files and data never leave your device.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">Information We Don't Collect</h2>
          <div className="prose prose-gray max-w-none space-y-4 text-muted-foreground">
            <p>We do NOT collect:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Personal information (name, email, phone number)</li>
              <li>Your uploaded files or images</li>
              <li>Your design system configurations</li>
              <li>URLs you analyze with our SEO validator</li>
              <li>Usage analytics or tracking data</li>
              <li>IP addresses or device information</li>
              <li>Cookies or browser fingerprints</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">How Our Tools Work</h2>
          <div className="prose prose-gray max-w-none space-y-4 text-muted-foreground">
            <h3 className="text-xl font-semibold text-foreground">Image Converter</h3>
            <p>
              All image processing happens entirely in your browser using client-side JavaScript.
              Your images are never uploaded to our servers. The converted files are generated
              locally on your device.
            </p>

            <h3 className="text-xl font-semibold text-foreground mt-6">SEO Validator</h3>
            <p>
              When you enter a URL to analyze, our server fetches the public webpage on your behalf
              (to avoid CORS issues) and returns the HTML to your browser. We don't log or store
              the URLs you analyze. The analysis happens in your browser.
            </p>

            <h3 className="text-xl font-semibold text-foreground mt-6">Design System Generator</h3>
            <p>
              All design system configurations are stored locally in your browser's localStorage.
              We never see or store your design choices. When you export your design system,
              the files are generated locally on your device.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">Local Storage</h2>
          <div className="prose prose-gray max-w-none space-y-4 text-muted-foreground">
            <p>
              Some features use your browser's localStorage to save settings and preferences:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Design system versions and configurations</li>
              <li>SEO analysis history (last 10 scans)</li>
              <li>UI preferences and theme settings</li>
            </ul>
            <p>
              This data is stored only in your browser and can be cleared at any time through
              your browser settings. We cannot access this data.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">Third-Party Services</h2>
          <div className="prose prose-gray max-w-none space-y-4 text-muted-foreground">
            <p>
              We don't use any third-party analytics, advertising, or tracking services.
              Our website is hosted on secure servers, but we don't use services that
              collect personal information.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">Data Security</h2>
          <div className="prose prose-gray max-w-none space-y-4 text-muted-foreground">
            <p>
              Since we don't collect or store your data, there's no risk of data breaches
              or unauthorized access to your personal information. All processing happens
              on your device, under your control.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">Children's Privacy</h2>
          <div className="prose prose-gray max-w-none space-y-4 text-muted-foreground">
            <p>
              Our services are available to users of all ages. Since we don't collect any
              personal information, we don't collect information from children either.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">Changes to This Policy</h2>
          <div className="prose prose-gray max-w-none space-y-4 text-muted-foreground">
            <p>
              We may update this Privacy Policy from time to time. We will notify users of
              any material changes by updating the "Last updated" date at the top of this page.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">Contact Us</h2>
          <div className="prose prose-gray max-w-none space-y-4 text-muted-foreground">
            <p>
              If you have any questions about this Privacy Policy, please contact us at:
            </p>
            <p>
              <strong>Email:</strong>{" "}
              <a href={`mailto:${siteConfig.email}`} className="text-primary hover:underline">
                {siteConfig.email}
              </a>
            </p>
          </div>
        </section>

        {/* Bottom CTA */}
        <Card className="border-2 bg-gradient-to-br from-primary/5 to-primary/10">
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">Your Privacy is Guaranteed</h3>
            <p className="text-muted-foreground mb-6">
              We built {siteConfig.name} with privacy at its core. Start using our tools
              with complete confidence that your data stays private.
            </p>
            <a
              href="/"
              className="inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90"
            >
              Get Started
            </a>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
