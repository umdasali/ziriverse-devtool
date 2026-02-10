import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Regex Maker - Generate Regex Patterns | Branding Tools",
  description:
    "Generate regex patterns for common use cases including email, phone, URL, password validation and more. Support for 8 programming languages with live testing and syntax highlighting. Free, no sign-up required.",
  keywords: [
    "regex generator",
    "regex maker",
    "regex builder",
    "pattern generator",
    "email validation regex",
    "phone number regex",
    "generate regular expression",
    "regex tool online",
    "regex tester",
    "javascript regex",
    "python regex",
    "php regex",
  ],
  openGraph: {
    title: "Regex Maker - Generate Regex Patterns for Common Use Cases",
    description:
      "Generate regex patterns for email, phone, URL, password validation and more. Support for JavaScript, Python, PHP, Java, C#, Ruby, Go, and Rust. Free online tool.",
    type: "website",
    url: "https://brandingtools.com/tools/developer/regex-maker",
    images: [
      {
        url: "/og-regex-maker.png",
        width: 1200,
        height: 630,
        alt: "Regex Maker Tool",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Regex Maker - Generate Regex Patterns",
    description:
      "Generate regex patterns for common use cases with multi-language support. Free online tool.",
    images: ["/og-regex-maker.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://brandingtools.com/tools/developer/regex-maker",
  },
};

export default function RegexMakerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
