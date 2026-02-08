import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page Speed Analyzer - Ziriverse",
  description:
    "Analyze your website page speed and performance metrics. Get actionable insights to improve load times. Free, private, no sign-up required.",
  keywords: [
    "page speed analyzer",
    "website performance",
    "page load time",
    "web performance",
    "site speed test",
  ],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
