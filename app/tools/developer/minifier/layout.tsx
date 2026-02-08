import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "HTML/CSS/JS Minifier - Ziriverse",
  description:
    "Minify HTML, CSS, and JavaScript code to reduce file size. Free, private, no sign-up required.",
  keywords: [
    "minifier",
    "HTML minifier",
    "CSS minifier",
    "JavaScript minifier",
    "code minification",
  ],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
