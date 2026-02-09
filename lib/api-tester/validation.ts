import type { APIRequest, ValidationResult } from "@/types/api-tester";

export function validateRequest(request: APIRequest): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Validate URL
  if (!request.url) {
    errors.push("URL is required");
  } else {
    if (!validateUrl(request.url)) {
      errors.push("Invalid URL format. Must use HTTP or HTTPS protocol");
    }
  }

  // Validate JSON body
  if (request.body.type === "json" && request.body.json) {
    if (!validateJson(request.body.json)) {
      errors.push("Invalid JSON in request body");
    }
  }

  // Validate headers
  request.headers.forEach((header, i) => {
    if (header.enabled) {
      if (!header.key) {
        warnings.push(`Header ${i + 1} has empty key`);
      }
      if (header.key && !header.value) {
        warnings.push(`Header "${header.key}" has empty value`);
      }
    }
  });

  // Check for common issues
  if (request.method === "GET" && request.body.type !== "none") {
    warnings.push("GET requests typically should not have a body");
  }

  // Validate auth
  if (request.auth.type === "basic") {
    if (!request.auth.basic?.username) {
      warnings.push("Basic auth is enabled but username is empty");
    }
  } else if (request.auth.type === "bearer") {
    if (!request.auth.bearer?.token) {
      warnings.push("Bearer auth is enabled but token is empty");
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
  };
}

export function validateUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    return ["http:", "https:"].includes(parsed.protocol);
  } catch {
    return false;
  }
}

export function validateJson(json: string): boolean {
  try {
    JSON.parse(json);
    return true;
  } catch {
    return false;
  }
}
