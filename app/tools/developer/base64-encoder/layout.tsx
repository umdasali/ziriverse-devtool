import type { Metadata } from "next";
import { generateMetadata } from "@/lib/seo";

export const metadata: Metadata = generateMetadata({
  title: "Base64 Encoder/Decoder - Convert Text & Files",
  description: "Encode and decode text and files to Base64 format. Supports data URL generation. Free, private, no sign-up.",
  keywords: ["base64 encoder", "base64 decoder", "base64 online", "text to base64", "file to base64"],
  canonicalUrl: "https://ziriverse.com/tools/developer/base64-encoder",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
