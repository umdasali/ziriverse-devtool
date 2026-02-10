import { HashGenerator } from "@/components/developer-tools/hash-generator";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hash Generator - MD5, SHA-1, SHA-256, SHA-512 | Branding Tools",
  description: "Generate cryptographic hashes (MD5, SHA-1, SHA-256, SHA-512) for text and files. Verify data integrity and create checksums.",
};

export default function HashGeneratorPage() {
  return (
    <div className="container mx-auto py-8 px-4 max-w-5xl">
      <HashGenerator />
    </div>
  );
}
