import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "JWT Decoder - Ziriverse",
  description: "Decode JSON Web Tokens to inspect header, payload claims, and expiration status. Free, private, no sign-up.",
  keywords: ["JWT decoder", "JSON web token", "decode JWT", "JWT inspector", "JWT claims"],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
