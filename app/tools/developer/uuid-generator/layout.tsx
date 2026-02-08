import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "UUID Generator - Ziriverse",
  description: "Generate UUID v4 identifiers with bulk generation, format options, and validation. Free, private, no sign-up.",
  keywords: ["UUID generator", "UUID v4", "generate UUID", "random UUID", "GUID generator"],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
