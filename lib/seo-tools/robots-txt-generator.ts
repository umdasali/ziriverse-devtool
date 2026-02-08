export interface RobotRule {
  id: string;
  userAgent: string;
  rules: { type: "allow" | "disallow"; path: string }[];
}

export interface RobotsTxtConfig {
  rules: RobotRule[];
  sitemapUrls: string[];
  crawlDelay?: number;
  host?: string;
}

export function generateRobotsTxt(config: RobotsTxtConfig): string {
  const lines: string[] = [];

  for (const rule of config.rules) {
    lines.push(`User-agent: ${rule.userAgent}`);
    for (const r of rule.rules) {
      lines.push(`${r.type === "allow" ? "Allow" : "Disallow"}: ${r.path}`);
    }
    if (config.crawlDelay) {
      lines.push(`Crawl-delay: ${config.crawlDelay}`);
    }
    lines.push("");
  }

  if (config.host) {
    lines.push(`Host: ${config.host}`);
    lines.push("");
  }

  for (const url of config.sitemapUrls) {
    if (url.trim()) {
      lines.push(`Sitemap: ${url.trim()}`);
    }
  }

  return lines.join("\n").trim();
}

export function createDefaultConfig(): RobotsTxtConfig {
  return {
    rules: [
      {
        id: crypto.randomUUID(),
        userAgent: "*",
        rules: [
          { type: "allow", path: "/" },
          { type: "disallow", path: "/api/" },
          { type: "disallow", path: "/admin/" },
        ],
      },
    ],
    sitemapUrls: ["https://example.com/sitemap.xml"],
    crawlDelay: undefined,
    host: undefined,
  };
}
