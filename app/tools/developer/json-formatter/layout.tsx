import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "JSON Formatter & Validator - Ziriverse",
  description: "Format, beautify, and validate JSON online. Syntax highlighting, tree view, minification, and error detection. Free, private, no sign-up.",
  keywords: ["JSON formatter", "JSON validator", "JSON beautifier", "JSON minifier", "format JSON online"],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
