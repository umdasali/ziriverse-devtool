import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "API Tester - Ziriverse",
  description: "Test REST API endpoints with custom methods, headers, and body. View formatted responses with status codes and timing. Free, private, no sign-up.",
  keywords: ["API tester", "REST client", "HTTP request tester", "API testing tool", "test API online"],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
