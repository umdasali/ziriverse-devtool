import { NextRequest, NextResponse } from "next/server";

const SENSITIVE_HEADERS = [
  "set-cookie",
  "authorization",
  "proxy-authorization",
  "cookie",
  "www-authenticate",
  "proxy-authenticate",
];

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { url, method, headers, body: requestBody } = body as {
      url: string;
      method: string;
      headers: Record<string, string>;
      body?: string;
    };

    if (!url) {
      return NextResponse.json(
        { error: "URL is required" },
        { status: 400 }
      );
    }

    // Validate URL
    let parsedUrl: URL;
    try {
      parsedUrl = new URL(url);
    } catch {
      return NextResponse.json(
        { error: "Invalid URL" },
        { status: 400 }
      );
    }

    // Build fetch options
    const fetchOptions: RequestInit = {
      method: method || "GET",
      headers: headers || {},
    };

    // Attach body for methods that support it
    if (requestBody && ["POST", "PUT", "PATCH"].includes(method)) {
      fetchOptions.body = requestBody;
    }

    // Set up timeout with AbortController
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 30000); // 30 second timeout
    fetchOptions.signal = controller.signal;

    const startTime = Date.now();

    let response: Response;
    try {
      response = await fetch(parsedUrl.toString(), fetchOptions);
    } catch (error: any) {
      if (error.name === "AbortError") {
        return NextResponse.json(
          { error: "Request timed out after 30 seconds" },
          { status: 408 }
        );
      }
      return NextResponse.json(
        { error: error.message || "Failed to fetch the URL" },
        { status: 502 }
      );
    } finally {
      clearTimeout(timeout);
    }

    const responseTime = Date.now() - startTime;

    // Read the response body as text
    const responseBody = await response.text();

    // Convert response headers to a plain object, stripping sensitive headers
    const responseHeaders: Record<string, string> = {};
    response.headers.forEach((value, key) => {
      if (!SENSITIVE_HEADERS.includes(key.toLowerCase())) {
        responseHeaders[key] = value;
      }
    });

    return NextResponse.json({
      status: response.status,
      statusText: response.statusText,
      headers: responseHeaders,
      body: responseBody,
      responseTime,
    });
  } catch (error: any) {
    console.error("Proxy error:", error);
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}
