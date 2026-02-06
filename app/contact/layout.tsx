import { Metadata } from "next";
import { StructuredData } from "@/components/seo/structured-data";
import {
  generateMetadata as generateSEOMetadata,
  generateBreadcrumbSchema,
  generateWebPageSchema,
} from "@/lib/seo";

export const metadata: Metadata = generateSEOMetadata({
  title: "Contact Us - Get in Touch with Branding Tools",
  description:
    "Contact Branding Tools for support, feedback, or collaboration. Based in Dhanbad (Jharkhand) and Kolkata (West Bengal), India. Email: umdasali@gmail.com. Connect via GitHub or LinkedIn.",
  keywords: [
    "contact",
    "support",
    "feedback",
    "collaboration",
    "web development",
    "Dhanbad developer",
    "Kolkata developer",
    "India",
  ],
  canonicalUrl: "https://brandingtools.dev/contact",
});

// Generate ContactPoint structured data
function generateContactPointSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    mainEntity: {
      "@type": "Organization",
      name: "Branding Tools",
      email: "umdasali@gmail.com",
      url: "https://brandingtools.dev",
      logo: "https://brandingtools.dev/logo.png",
      sameAs: [
        "https://github.com/umdasali",
        "https://www.linkedin.com/in/md-ali-sher-ali-265153284/",
      ],
      contactPoint: [
        {
          "@type": "ContactPoint",
          email: "umdasali@gmail.com",
          contactType: "customer support",
          areaServed: "Worldwide",
          availableLanguage: ["English", "Hindi"],
        },
      ],
      address: [
        {
          "@type": "PostalAddress",
          addressLocality: "Dhanbad",
          addressRegion: "Jharkhand",
          addressCountry: "IN",
        },
        {
          "@type": "PostalAddress",
          addressLocality: "New Town, Kolkata",
          addressRegion: "West Bengal",
          addressCountry: "IN",
        },
      ],
    },
  };
}

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <StructuredData
        data={[
          generateContactPointSchema(),
          generateBreadcrumbSchema([
            { name: "Home", url: "https://brandingtools.dev" },
            { name: "Contact", url: "https://brandingtools.dev/contact" },
          ]),
          generateWebPageSchema(
            "Contact Us - Get in Touch",
            "Contact page for Branding Tools with email, locations, and social links",
            "https://brandingtools.dev/contact"
          ),
        ]}
      />
      {children}
    </>
  );
}
