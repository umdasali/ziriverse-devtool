import type { Metadata } from "next";
import { generateMetadata } from "@/lib/seo";

export const metadata: Metadata = generateMetadata({
  title: "HTML/CSS/JS Minifier - Reduce File Size Fast",
  description:
    "Minify HTML, CSS, and JavaScript code to reduce file size. Free, private, no sign-up required.",
  keywords: [
    "minifier",
    "HTML minifier",
    "CSS minifier",
    "JavaScript minifier",
    "code minification",
  ],
  canonicalUrl: "https://ziriverse.com/tools/developer/minifier",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
