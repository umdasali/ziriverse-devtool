import type { Metadata } from "next";
import { generateMetadata } from "@/lib/seo";

export const metadata: Metadata = generateMetadata({
  title: "JWT Decoder - Inspect JSON Web Tokens Instantly",
  description: "Decode JSON Web Tokens to inspect header, payload claims, and expiration status. Free, private, no sign-up.",
  keywords: ["JWT decoder", "JSON web token", "decode JWT", "JWT inspector", "JWT claims"],
  canonicalUrl: "https://ziriverse.com/tools/developer/jwt-decoder",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
