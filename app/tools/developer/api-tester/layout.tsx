import type { Metadata } from "next";
import { generateMetadata } from "@/lib/seo";

export const metadata: Metadata = generateMetadata({
  title: "API Tester - Test REST Endpoints Instantly",
  description: "Test REST API endpoints with custom methods, headers, and body. View formatted responses with status codes and timing. Free, private, no sign-up.",
  keywords: ["API tester", "REST client", "HTTP request tester", "API testing tool", "test API online"],
  canonicalUrl: "https://ziriverse.com/tools/developer/api-tester",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
