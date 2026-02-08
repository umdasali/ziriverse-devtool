export interface SitemapEntry {
  id: string;
  url: string;
  lastmod?: string;
  changefreq?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority?: number;
}

export function generateSitemapXML(entries: SitemapEntry[]): string {
  const lines = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ];

  for (const entry of entries) {
    if (!entry.url.trim()) continue;
    lines.push("  <url>");
    lines.push(`    <loc>${escapeXml(entry.url.trim())}</loc>`);
    if (entry.lastmod) {
      lines.push(`    <lastmod>${entry.lastmod}</lastmod>`);
    }
    if (entry.changefreq) {
      lines.push(`    <changefreq>${entry.changefreq}</changefreq>`);
    }
    if (entry.priority !== undefined) {
      lines.push(`    <priority>${entry.priority.toFixed(1)}</priority>`);
    }
    lines.push("  </url>");
  }

  lines.push("</urlset>");
  return lines.join("\n");
}

function escapeXml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export function createDefaultEntries(): SitemapEntry[] {
  return [
    { id: crypto.randomUUID(), url: "https://example.com/", lastmod: new Date().toISOString().split("T")[0], changefreq: "weekly", priority: 1.0 },
    { id: crypto.randomUUID(), url: "https://example.com/about", lastmod: new Date().toISOString().split("T")[0], changefreq: "monthly", priority: 0.8 },
  ];
}
