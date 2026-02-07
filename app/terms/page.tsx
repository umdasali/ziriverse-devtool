import type { Metadata } from "next";
import { siteConfig } from "@/lib/site-config";
import { FileText, CheckCircle2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: `Terms of Service for ${siteConfig.name}. Please read these terms carefully before using our platform.`,
  keywords: [
    "terms of service",
    "terms and conditions",
    "usage policy",
    "free tools terms",
  ],
  alternates: {
    canonical: `${siteConfig.url}/terms`,
  },
  openGraph: {
    title: `Terms of Service | ${siteConfig.name}`,
    description: `Terms of Service for ${siteConfig.name}. Please read these terms carefully before using our platform.`,
    url: `${siteConfig.url}/terms`,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} Terms of Service`,
      },
    ],
  },
  twitter: {
    card: "summary",
    title: `Terms of Service | ${siteConfig.name}`,
    description: `Terms of Service for ${siteConfig.name}. Please read these terms carefully before using our platform.`,
    images: [siteConfig.ogImage],
    creator: siteConfig.twitterCreator,
  },
};

export default function TermsPage() {
  return (
    <div className="container mx-auto px-4 py-12 sm:py-16 lg:py-24">
      {/* Hero */}
      <div className="mx-auto max-w-3xl text-center mb-16">
        <div className="flex justify-center mb-6">
          <div className="p-4 rounded-full bg-primary/10">
            <FileText className="h-12 w-12 text-primary" />
          </div>
        </div>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
          Terms of Service
        </h1>
        <p className="text-lg text-muted-foreground">
          Last updated: February 5, 2026
        </p>
      </div>

      {/* Quick Summary */}
      <Card className="mx-auto max-w-4xl mb-12 border-2 bg-gradient-to-br from-blue-500/5 to-cyan-500/5">
        <CardContent className="p-6 sm:p-8">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-primary" />
            Quick Summary
          </h2>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span>Use our tools for free, responsibly, and legally</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span>We provide tools "as is" without warranties</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span>You own your content and designs</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span>Don't abuse or misuse our services</span>
            </li>
          </ul>
        </CardContent>
      </Card>

      {/* Main Content */}
      <div className="mx-auto max-w-4xl space-y-12">
        <section>
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">1. Acceptance of Terms</h2>
          <div className="prose prose-gray max-w-none space-y-4 text-muted-foreground">
            <p>
              By accessing and using {siteConfig.name} ("{siteConfig.domain}"), you accept and agree
              to be bound by the terms and provisions of this agreement. If you do not agree to these
              Terms of Service, please do not use our platform.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">2. Use of Services</h2>
          <div className="prose prose-gray max-w-none space-y-4 text-muted-foreground">
            <h3 className="text-xl font-semibold text-foreground">2.1 License to Use</h3>
            <p>
              We grant you a limited, non-exclusive, non-transferable, and revocable license to use
              {siteConfig.name} for your personal or commercial projects, subject to these terms.
            </p>

            <h3 className="text-xl font-semibold text-foreground mt-6">2.2 Acceptable Use</h3>
            <p>You agree to use our services only for lawful purposes. You agree NOT to:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Use our services to violate any applicable laws or regulations</li>
              <li>Attempt to gain unauthorized access to our systems or networks</li>
              <li>Interfere with or disrupt our services or servers</li>
              <li>Use automated scripts or bots to abuse our services</li>
              <li>Redistribute, resell, or republish our tools without permission</li>
              <li>Remove or modify any copyright notices or branding</li>
            </ul>

            <h3 className="text-xl font-semibold text-foreground mt-6">2.3 Account Responsibility</h3>
            <p>
              While we don't currently require accounts, if we introduce user accounts in the future,
              you will be responsible for maintaining the security of your account and for all
              activities that occur under your account.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">3. Intellectual Property</h2>
          <div className="prose prose-gray max-w-none space-y-4 text-muted-foreground">
            <h3 className="text-xl font-semibold text-foreground">3.1 Your Content</h3>
            <p>
              You retain all rights to any images, designs, or content you create using our tools.
              We don't claim any ownership over your work.
            </p>

            <h3 className="text-xl font-semibold text-foreground mt-6">3.2 Our Platform</h3>
            <p>
              The {siteConfig.name} platform, including its design, code, and functionality,
              is owned by us and protected by copyright and other intellectual property laws.
              You may not copy, modify, or reverse engineer our platform.
            </p>

            <h3 className="text-xl font-semibold text-foreground mt-6">3.3 Exported Code</h3>
            <p>
              Code and design systems you generate using our tools are yours to use freely in
              your projects. We don't claim any ownership or require attribution (though we
              appreciate it!).
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">4. Disclaimers and Limitations</h2>
          <div className="prose prose-gray max-w-none space-y-4 text-muted-foreground">
            <h3 className="text-xl font-semibold text-foreground">4.1 "As Is" Service</h3>
            <p>
              {siteConfig.name} is provided "as is" and "as available" without warranties of any kind,
              either express or implied. We don't guarantee that our services will be uninterrupted,
              secure, or error-free.
            </p>

            <h3 className="text-xl font-semibold text-foreground mt-6">4.2 No Liability</h3>
            <p>
              We are not liable for any damages arising from your use of our services, including but
              not limited to lost data, lost profits, or business interruption. You use our tools at
              your own risk.
            </p>

            <h3 className="text-xl font-semibold text-foreground mt-6">4.3 User Responsibility</h3>
            <p>
              You are solely responsible for:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>The accuracy and legality of content you process through our tools</li>
              <li>Backing up your work before performing operations</li>
              <li>Testing generated code before using it in production</li>
              <li>Complying with applicable laws when using our tools</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">5. Service Availability</h2>
          <div className="prose prose-gray max-w-none space-y-4 text-muted-foreground">
            <p>
              We strive to maintain high availability, but we don't guarantee uninterrupted access.
              We may:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Temporarily suspend services for maintenance or updates</li>
              <li>Modify or discontinue features without notice</li>
              <li>Impose usage limits to ensure fair access for all users</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">6. Third-Party Links</h2>
          <div className="prose prose-gray max-w-none space-y-4 text-muted-foreground">
            <p>
              Our platform may contain links to third-party websites or services. We are not
              responsible for the content, privacy policies, or practices of any third-party
              sites. Use them at your own risk.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">7. Indemnification</h2>
          <div className="prose prose-gray max-w-none space-y-4 text-muted-foreground">
            <p>
              You agree to indemnify and hold harmless {siteConfig.name}, its operators, and
              affiliates from any claims, damages, or expenses arising from your use of our
              services or violation of these terms.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">8. Changes to Terms</h2>
          <div className="prose prose-gray max-w-none space-y-4 text-muted-foreground">
            <p>
              We reserve the right to modify these terms at any time. We will notify users of
              material changes by updating the "Last updated" date. Your continued use of
              {siteConfig.name} after changes constitutes acceptance of the new terms.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">9. Termination</h2>
          <div className="prose prose-gray max-w-none space-y-4 text-muted-foreground">
            <p>
              We reserve the right to terminate or suspend access to our services for any user
              who violates these terms, without prior notice or liability.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">10. Governing Law</h2>
          <div className="prose prose-gray max-w-none space-y-4 text-muted-foreground">
            <p>
              These terms shall be governed by and construed in accordance with applicable laws,
              without regard to conflict of law principles.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">11. Contact Information</h2>
          <div className="prose prose-gray max-w-none space-y-4 text-muted-foreground">
            <p>
              If you have any questions about these Terms of Service, please contact us at:
            </p>
            <p>
              <strong>Email:</strong>{" "}
              <a href={`mailto:${siteConfig.email}`} className="text-primary hover:underline">
                {siteConfig.email}
              </a>
            </p>
            <p>
              <strong>Website:</strong>{" "}
              <a href={siteConfig.url} className="text-primary hover:underline">
                {siteConfig.url}
              </a>
            </p>
          </div>
        </section>

        {/* Bottom Card */}
        <Card className="border-2 bg-gradient-to-br from-primary/5 to-primary/10">
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">Ready to Create?</h3>
            <p className="text-muted-foreground mb-6">
              Now that you've read our terms, start using our powerful branding tools.
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
