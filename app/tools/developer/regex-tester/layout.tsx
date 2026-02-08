import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Regex Tester - Ziriverse",
  description: "Test regular expression patterns with real-time matching, explanations, and flag support. Free, private, no sign-up.",
  keywords: ["regex tester", "regular expression", "regex online", "test regex", "regex pattern"],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
