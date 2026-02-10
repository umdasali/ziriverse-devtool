import { MarkdownPreview } from "@/components/developer-tools/markdown-preview";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Markdown Preview - Live Markdown to HTML Converter | Branding Tools",
  description: "Convert Markdown to HTML with live preview. Support for GitHub Flavored Markdown, syntax highlighting, and export options.",
};

export default function MarkdownPreviewPage() {
  return (
    <div className="container mx-auto py-8 px-4 max-w-7xl">
      <MarkdownPreview />
    </div>
  );
}
