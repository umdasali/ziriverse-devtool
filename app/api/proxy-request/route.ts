import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { method, url, headers, body } = await request.json();

    // Validate URL
    try {
      new URL(url);
    } catch {
      return NextResponse.json({ error: "Invalid URL" }, { status: 400 });
    }

    // Validate method
    const validMethods = ["GET", "POST", "PUT", "PATCH", "DELETE", "HEAD", "OPTIONS"];
    if (!validMethods.includes(method)) {
      return NextResponse.json({ error: "Invalid HTTP method" }, { status: 400 });
    }

    // Execute proxied request with timeout
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 30000); // 30 second timeout

    try {
      const response = await fetch(url, {
        method,
        headers: headers || {},
        body: method !== "GET" && method !== "HEAD" ? body : undefined,
        signal: controller.signal,
      });

      clearTimeout(timeout);

      const responseBody = await response.text();
      const responseHeaders: Record<string, string> = {};
      response.headers.forEach((value, key) => {
        responseHeaders[key] = value;
      });

      return NextResponse.json({
        status: response.status,
        statusText: response.statusText,
        headers: responseHeaders,
        body: responseBody,
      });
    } catch (fetchError: any) {
      clearTimeout(timeout);

      if (fetchError.name === "AbortError") {
        return NextResponse.json(
          { error: "Request timeout (30 seconds)" },
          { status: 408 }
        );
      }

      throw fetchError;
    }
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Proxy request failed" },
      { status: 500 }
    );
  }
}
