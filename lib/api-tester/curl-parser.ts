import type {
  HTTPMethod,
  HeaderPair,
  RequestBody,
  AuthConfig,
  CurlParseResult,
} from "@/types/api-tester";

export function parseCurlCommand(curlCommand: string): CurlParseResult {
  try {
    // Normalize: remove line breaks, extra spaces
    const normalized = curlCommand
      .replace(/\\\n/g, " ")
      .replace(/\\\r\n/g, " ")
      .replace(/\s+/g, " ")
      .trim();

    // Remove leading 'curl' if present
    const command = normalized.replace(/^curl\s+/, "");

    // Extract URL: First unquoted argument or quoted string
    const url = extractUrl(command);

    // Extract method: -X POST or --request POST
    const method = extractMethod(command);

    // Extract headers: -H 'Content-Type: application/json'
    const headers = extractHeaders(command);

    // Extract body: -d '{"data":"value"}' or --data 'body'
    const body = extractBody(command);

    // Extract auth from headers or -u flag
    const auth = extractAuth(command, headers);

    return { method, url, headers, body, auth };
  } catch (error) {
    throw new Error("Failed to parse cURL command. Please check syntax.");
  }
}

function extractUrl(command: string): string {
  // Try to find URL in quotes first
  const quotedMatch = command.match(/['"]([^'"]+)['"]/);
  if (quotedMatch && quotedMatch[1].startsWith("http")) {
    return quotedMatch[1];
  }

  // Try to find URL without quotes
  const urlMatch = command.match(/(https?:\/\/[^\s'"]+)/);
  if (urlMatch) {
    return urlMatch[1];
  }

  return "";
}

function extractMethod(command: string): HTTPMethod {
  // Match -X POST, --request POST, or -X GET
  const methodMatch = command.match(/(?:-X|--request)\s+([A-Z]+)/i);
  if (methodMatch) {
    return methodMatch[1].toUpperCase() as HTTPMethod;
  }

  // Default to GET
  return "GET";
}

function extractHeaders(command: string): HeaderPair[] {
  const headers: HeaderPair[] = [];

  // Match all -H or --header flags with quoted content
  const headerRegex = /(?:-H|--header)\s+['"]([^'"]+)['"]/g;
  let match;
  let index = 0;

  while ((match = headerRegex.exec(command)) !== null) {
    const headerContent = match[1];
    const colonIndex = headerContent.indexOf(":");

    if (colonIndex > 0) {
      const key = headerContent.slice(0, colonIndex).trim();
      const value = headerContent.slice(colonIndex + 1).trim();

      // Skip Authorization header as it will be handled by extractAuth
      if (key.toLowerCase() !== "authorization") {
        headers.push({
          id: `header-${index}`,
          key,
          value,
          enabled: true,
        });
        index++;
      }
    }
  }

  return headers;
}

function extractBody(command: string): RequestBody | undefined {
  // Match -d, --data, --data-raw, --data-binary flags
  const dataRegex = /(?:-d|--data|--data-raw|--data-binary)\s+['"](.+?)['"]/;
  const match = command.match(dataRegex);

  if (match) {
    const bodyContent = match[1];

    // Try to parse as JSON
    try {
      JSON.parse(bodyContent);
      return {
        type: "json",
        json: bodyContent,
      };
    } catch {
      // If not JSON, treat as raw
      return {
        type: "raw",
        raw: bodyContent,
      };
    }
  }

  return { type: "none" };
}

function extractAuth(command: string, headers: HeaderPair[]): AuthConfig {
  // Check for -u flag (Basic auth): -u username:password
  const userMatch = command.match(/(?:-u|--user)\s+['"]?([^'":\s]+):([^'"\s]+)['"]?/);
  if (userMatch) {
    return {
      type: "basic",
      basic: {
        username: userMatch[1],
        password: userMatch[2],
      },
    };
  }

  // Check for Authorization header
  const authHeaderMatch = command.match(/[Aa]uthorization:\s*([^'"]+)/);
  if (authHeaderMatch) {
    const authValue = authHeaderMatch[1].trim();

    if (authValue.startsWith("Bearer ")) {
      return {
        type: "bearer",
        bearer: {
          token: authValue.slice(7),
        },
      };
    }

    if (authValue.startsWith("Basic ")) {
      try {
        const decoded = atob(authValue.slice(6));
        const [username, password] = decoded.split(":", 2);
        return {
          type: "basic",
          basic: { username, password },
        };
      } catch {
        // If decoding fails, ignore
      }
    }
  }

  return { type: "none" };
}
