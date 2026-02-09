import type { APIRequest } from "@/types/api-tester";

export function generateCurlCommand(request: APIRequest): string {
  let curl = `curl -X ${request.method}`;

  // Add URL (quoted)
  curl += ` '${request.url}'`;

  // Add headers
  const headers = buildHeadersForCurl(request);
  Object.entries(headers).forEach(([key, value]) => {
    curl += ` \\\n  -H '${key}: ${value}'`;
  });

  // Add body
  if (request.body.type === "json" && request.body.json) {
    // Escape single quotes in JSON
    const escaped = request.body.json.replace(/'/g, "'\\''");
    curl += ` \\\n  -d '${escaped}'`;
  } else if (request.body.type === "raw" && request.body.raw) {
    // Escape single quotes in raw body
    const escaped = request.body.raw.replace(/'/g, "'\\''");
    curl += ` \\\n  -d '${escaped}'`;
  } else if (request.body.type === "form-data" && request.body.formData) {
    // Add form data
    request.body.formData
      .filter((pair) => pair.enabled && pair.key)
      .forEach((pair) => {
        const escapedValue = pair.value.replace(/'/g, "'\\''");
        curl += ` \\\n  -d '${pair.key}=${escapedValue}'`;
      });
  }

  return curl;
}

function buildHeadersForCurl(request: APIRequest): Record<string, string> {
  const headers: Record<string, string> = {};

  // Add enabled headers
  request.headers
    .filter((h) => h.enabled && h.key)
    .forEach((h) => {
      headers[h.key] = h.value;
    });

  // Add auth headers
  if (request.auth.type === "bearer" && request.auth.bearer) {
    headers["Authorization"] = `Bearer ${request.auth.bearer.token}`;
  } else if (request.auth.type === "basic" && request.auth.basic) {
    const encoded = btoa(
      `${request.auth.basic.username}:${request.auth.basic.password}`
    );
    headers["Authorization"] = `Basic ${encoded}`;
  }

  // Add Content-Type for JSON
  if (request.body.type === "json" && !headers["Content-Type"]) {
    headers["Content-Type"] = "application/json";
  }

  return headers;
}
