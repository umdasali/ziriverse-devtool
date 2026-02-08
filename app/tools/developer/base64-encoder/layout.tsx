import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Base64 Encode/Decode - Ziriverse",
  description: "Encode and decode text and files to Base64 format. Supports data URL generation. Free, private, no sign-up.",
  keywords: ["base64 encoder", "base64 decoder", "base64 online", "text to base64", "file to base64"],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
