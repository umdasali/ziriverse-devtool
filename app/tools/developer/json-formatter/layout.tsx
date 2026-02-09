import type { Metadata } from "next";
import { generateMetadata } from "@/lib/seo";

export const metadata: Metadata = generateMetadata({
  title: "JSON Formatter & Validator - Format JSON Online",
  description: "Format, beautify, and validate JSON online. Syntax highlighting, tree view, minification, and error detection. Free, private, no sign-up.",
  keywords: ["JSON formatter", "JSON validator", "JSON beautifier", "JSON minifier", "format JSON online"],
  canonicalUrl: "https://ziriverse.com/tools/developer/json-formatter",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
