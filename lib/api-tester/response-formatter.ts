export function formatResponseBody(body: string, contentType?: string): string {
  if (!contentType) return body;

  // JSON formatting
  if (contentType.includes("application/json")) {
    try {
      const parsed = JSON.parse(body);
      return JSON.stringify(parsed, null, 2);
    } catch {
      return body;
    }
  }

  // XML/HTML formatting (basic indentation)
  if (contentType.includes("xml") || contentType.includes("html")) {
    return formatXML(body);
  }

  return body;
}

function formatXML(xml: string): string {
  let formatted = "";
  let indent = 0;

  xml.split(/>\s*</).forEach((node) => {
    if (node.match(/^\/\w/)) indent--;
    formatted += "  ".repeat(indent) + "<" + node + ">\n";
    if (node.match(/^<?\w[^>]*[^\/]$/)) indent++;
  });

  return formatted.substring(1, formatted.length - 2);
}

export function getStatusVariant(
  status: number
): "default" | "destructive" | "secondary" {
  if (status >= 200 && status < 300) return "default"; // Success
  if (status >= 400) return "destructive"; // Client or server error
  return "secondary"; // Redirects or informational
}

export function getStatusBadgeColor(status: number): string {
  if (status >= 200 && status < 300) {
    return "bg-green-600 text-white border-green-600";
  }
  if (status >= 300 && status < 400) {
    return "bg-blue-600 text-white border-blue-600";
  }
  if (status >= 400 && status < 500) {
    return "bg-orange-600 text-white border-yellow-600";
  }
  if (status >= 500) {
    return "bg-red-600 text-white border-red-600";
  }
  return "bg-gray-600 text-white border-gray-600";
}

export function getStatusColor(status: number): string {
  if (status >= 200 && status < 300) return "text-green-600 font-semibold";
  if (status >= 300 && status < 400) return "text-blue-600 font-semibold";
  if (status >= 400 && status < 500) return "text-yellow-600 font-semibold";
  if (status >= 500) return "text-red-600 font-semibold";
  return "text-gray-600 font-semibold";
}

export function getStatusEmoji(status: number): string {
  if (status >= 200 && status < 300) return "✓";
  if (status >= 300 && status < 400) return "↗";
  if (status >= 400 && status < 500) return "⚠";
  if (status >= 500) return "✗";
  return "?";
}

export function getMethodColor(method: string): string {
  const colors: Record<string, string> = {
    GET: "bg-green-500/10 text-green-600 border-green-500/20",
    POST: "bg-blue-500/10 text-blue-600 border-blue-500/20",
    PUT: "bg-yellow-500/10 text-yellow-600 border-yellow-500/20",
    PATCH: "bg-orange-500/10 text-orange-600 border-orange-500/20",
    DELETE: "bg-red-500/10 text-red-600 border-red-500/20",
    HEAD: "bg-purple-500/10 text-purple-600 border-purple-500/20",
    OPTIONS: "bg-gray-500/10 text-gray-600 border-gray-500/20",
  };
  return colors[method] || "bg-gray-500/10 text-gray-600 border-gray-500/20";
}
