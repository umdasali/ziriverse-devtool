import { Metadata } from "next";
import { StructuredData } from "@/components/seo/structured-data";
import {
  generateMetadata as generateSEOMetadata,
  generateBreadcrumbSchema,
  generateWebPageSchema,
} from "@/lib/seo";

export const metadata: Metadata = generateSEOMetadata({
  title: "Contact Us - Get in Touch with Ziriverse",
  description:
    "Contact Ziriverse for support, feedback, or collaboration. Professional branding tools for modern creators. Email: ziriverse@gmail.com. Connect via Instagram, X (Twitter), or GitHub.",
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
  canonicalUrl: "https://ziriverse.com/contact",
});

// Generate ContactPoint structured data
function generateContactPointSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    mainEntity: {
      "@type": "Organization",
      name: "Ziriverse",
      email: "ziriverse@gmail.com",
      url: "https://ziriverse.com",
      logo: "https://ziriverse.com/favicon.svg",
      sameAs: [
        "https://x.com/ziriverse",
        "https://www.instagram.com/ziriverse",
        "https://github.com/umdasali",
      ],
      contactPoint: [
        {
          "@type": "ContactPoint",
          email: "ziriverse@gmail.com",
          contactType: "customer support",
          areaServed: "Worldwide",
          availableLanguage: ["English"],
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
            { name: "Home", url: "https://ziriverse.com" },
            { name: "Contact", url: "https://ziriverse.com/contact" },
          ]),
          generateWebPageSchema(
            "Contact Us - Get in Touch",
            "Contact page for Ziriverse with email and social links",
            "https://ziriverse.com/contact"
          ),
        ]}
      />
      {children}
    </>
  );
}
