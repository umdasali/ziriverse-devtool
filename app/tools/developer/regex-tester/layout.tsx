import type { Metadata } from "next";
import { generateMetadata } from "@/lib/seo";

export const metadata: Metadata = generateMetadata({
  title: "Regex Tester - Test Regular Expressions Online",
  description: "Test regular expression patterns with real-time matching, explanations, and flag support. Free, private, no sign-up.",
  keywords: ["regex tester", "regular expression", "regex online", "test regex", "regex pattern"],
  canonicalUrl: "https://ziriverse.com/tools/developer/regex-tester",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
