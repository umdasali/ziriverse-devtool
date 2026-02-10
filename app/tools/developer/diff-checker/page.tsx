import { DiffChecker } from "@/components/developer-tools/diff-checker";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Diff Checker - Compare Text & Code Side-by-Side | Branding Tools",
  description: "Compare two text or code blocks with line-by-line diff highlighting. Perfect for code review and text comparison.",
};

export default function DiffCheckerPage() {
  return (
    <div className="container mx-auto py-8 px-4 max-w-7xl">
      <DiffChecker />
    </div>
  );
}
