import type { APIRequest, APIResponse } from "@/types/api-tester";

export async function executeRequest(
  request: APIRequest,
  useProxy: boolean = false
): Promise<APIResponse> {
  const startTime = performance.now();

  try {
    const headers = buildHeaders(request);
    const body = buildBody(request);

    let response: Response;
    let responseBody: string;
    let responseHeaders: Record<string, string> = {};

    if (useProxy) {
      // Server-side proxy for CORS-restricted APIs
      response = await fetch("/api/proxy-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          method: request.method,
          url: request.url,
          headers,
          body,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Proxy request failed");
      }

      const data = await response.json();
      const endTime = performance.now();

      return {
        status: data.status,
        statusText: data.statusText,
        headers: data.headers,
        body: data.body,
        size: new Blob([data.body]).size,
        time: endTime - startTime,
      };
    } else {
      // Direct client-side request
      response = await fetch(request.url, {
        method: request.method,
        headers,
        body:
          request.method !== "GET" && request.method !== "HEAD"
            ? body
            : undefined,
      });

      responseBody = await response.text();
      const endTime = performance.now();

      // Convert Headers object to plain object
      response.headers.forEach((value, key) => {
        responseHeaders[key] = value;
      });

      return {
        status: response.status,
        statusText: response.statusText,
        headers: responseHeaders,
        body: responseBody,
        size: new Blob([responseBody]).size,
        time: endTime - startTime,
      };
    }
  } catch (error: any) {
    // Check for CORS error
    if (error.message.includes("CORS") || error.message.includes("Failed to fetch")) {
      throw new Error(
        "Request failed. This might be a CORS issue. Try enabling the proxy option."
      );
    }
    throw new Error(error.message || "Request failed");
  }
}

function buildHeaders(request: APIRequest): Record<string, string> {
  const headers: Record<string, string> = {};

  // Add enabled headers
  request.headers
    .filter((h) => h.enabled && h.key)
    .forEach((h) => {
      headers[h.key] = h.value;
    });

  // Add auth headers
  if (request.auth.type === "bearer" && request.auth.bearer?.token) {
    headers["Authorization"] = `Bearer ${request.auth.bearer.token}`;
  } else if (request.auth.type === "basic" && request.auth.basic) {
    const encoded = btoa(
      `${request.auth.basic.username}:${request.auth.basic.password}`
    );
    headers["Authorization"] = `Basic ${encoded}`;
  }

  // Add Content-Type for body
  if (request.body.type === "json") {
    headers["Content-Type"] = "application/json";
  } else if (request.body.type === "form-data") {
    headers["Content-Type"] = "application/x-www-form-urlencoded";
  }

  return headers;
}

function buildBody(request: APIRequest): string | undefined {
  if (request.body.type === "none") return undefined;

  if (request.body.type === "json" && request.body.json) {
    return request.body.json;
  }

  if (request.body.type === "form-data" && request.body.formData) {
    const params = new URLSearchParams();
    request.body.formData
      .filter((pair) => pair.enabled && pair.key)
      .forEach((pair) => params.append(pair.key, pair.value));
    return params.toString();
  }

  if (request.body.type === "raw" && request.body.raw) {
    return request.body.raw;
  }

  return undefined;
}
