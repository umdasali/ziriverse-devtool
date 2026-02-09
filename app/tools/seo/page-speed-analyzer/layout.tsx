import type { Metadata } from "next";
import { generateMetadata } from "@/lib/seo";

export const metadata: Metadata = generateMetadata({
  title: "Page Speed Analyzer - Test Website Performance",
  description:
    "Analyze your website page speed and performance metrics. Get actionable insights to improve load times. Free, private, no sign-up required.",
  keywords: [
    "page speed analyzer",
    "website performance",
    "page load time",
    "web performance",
    "site speed test",
  ],
  canonicalUrl: "https://ziriverse.com/tools/seo/page-speed-analyzer",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
