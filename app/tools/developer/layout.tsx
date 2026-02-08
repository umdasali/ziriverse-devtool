import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Developer Tools - Ziriverse",
  description: "Free developer tools: JSON Formatter, Base64 Encoder, JWT Decoder, HTML/CSS/JS Minifier, Regex Tester, UUID Generator, and API Tester.",
  keywords: ["developer tools", "JSON formatter", "base64 encoder", "JWT decoder", "minifier", "regex tester", "UUID generator", "API tester"],
};

export default function DeveloperToolsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
