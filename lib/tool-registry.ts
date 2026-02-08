import {
  Globe,
  FileText,
  MapPin,
  Braces,
  Gauge,
  Code2,
  FileJson,
  Binary,
  Key,
  Minimize2,
  Search,
  Fingerprint,
  Send,
  Palette,
  ImageIcon,
  Paintbrush,
  type LucideIcon,
} from "lucide-react";

export interface Tool {
  id: string;
  name: string;
  description: string;
  shortDescription: string;
  href: string;
  icon: LucideIcon;
  category: "seo" | "developer" | "branding";
  badge?: string;
  gradient: string;
  isNew?: boolean;
  isFeatured?: boolean;
}

export interface ToolCategory {
  id: "seo" | "developer" | "branding";
  name: string;
  description: string;
  icon: LucideIcon;
  href: string;
  gradient: string;
  tools: Tool[];
}

export const toolCategories: ToolCategory[] = [
  {
    id: "seo",
    name: "SEO Tools",
    description: "Optimize your website for search engines with powerful analysis and generation tools",
    icon: Globe,
    href: "/tools/seo",
    gradient: "from-green-500 to-emerald-500",
    tools: [
      {
        id: "seo-validator",
        name: "SEO Validator",
        description: "Advanced SEO analysis with 100+ data points, scoring system, and 6 platform previews",
        shortDescription: "100+ data points analysis",
        href: "/seo-validator",
        icon: Globe,
        category: "seo",
        badge: "100+ Checks",
        gradient: "from-green-500 to-emerald-500",
        isFeatured: true,
      },
      {
        id: "robots-txt-generator",
        name: "Robots.txt Generator",
        description: "Create and customize robots.txt files with user-agent rules, crawl directives, and sitemap references",
        shortDescription: "Create robots.txt files",
        href: "/tools/seo/robots-txt-generator",
        icon: FileText,
        category: "seo",
        gradient: "from-green-500 to-emerald-500",
        isNew: true,
      },
      {
        id: "sitemap-generator",
        name: "Sitemap Generator",
        description: "Generate XML sitemaps with URL priority, change frequency, and last modified dates",
        shortDescription: "Generate XML sitemaps",
        href: "/tools/seo/sitemap-generator",
        icon: MapPin,
        category: "seo",
        gradient: "from-green-500 to-emerald-500",
        isNew: true,
      },
      {
        id: "schema-generator",
        name: "Schema Generator",
        description: "Create JSON-LD structured data for Articles, Products, FAQ, Organizations, and more",
        shortDescription: "JSON-LD structured data",
        href: "/tools/seo/schema-generator",
        icon: Braces,
        category: "seo",
        gradient: "from-green-500 to-emerald-500",
        isNew: true,
      },
      {
        id: "page-speed-analyzer",
        name: "Page Speed Analyzer",
        description: "Analyze page performance with load time metrics, resource analysis, and optimization tips",
        shortDescription: "Performance metrics",
        href: "/tools/seo/page-speed-analyzer",
        icon: Gauge,
        category: "seo",
        gradient: "from-green-500 to-emerald-500",
        isNew: true,
      },
    ],
  },
  {
    id: "developer",
    name: "Developer Tools",
    description: "Essential utilities for modern web development - format, encode, decode, test, and generate",
    icon: Code2,
    href: "/tools/developer",
    gradient: "from-orange-500 to-red-500",
    tools: [
      {
        id: "dev-tools-hub",
        name: "Dev Tools Hub",
        description: "JSON to TypeScript, CSS Unit Converter, SVG Visualizer, and Regex Tester in one place",
        shortDescription: "JSON-TS, CSS, SVG, Regex",
        href: "/dev-tools",
        icon: Code2,
        category: "developer",
        badge: "4-in-1",
        gradient: "from-orange-500 to-red-500",
        isFeatured: true,
      },
      {
        id: "json-formatter",
        name: "JSON Formatter & Validator",
        description: "Format, beautify, and validate JSON with syntax highlighting, tree view, and error detection",
        shortDescription: "Format & validate JSON",
        href: "/tools/developer/json-formatter",
        icon: FileJson,
        category: "developer",
        gradient: "from-orange-500 to-red-500",
        isNew: true,
      },
      {
        id: "base64-encoder",
        name: "Base64 Encode/Decode",
        description: "Encode and decode text and files to Base64 format with data URL generation",
        shortDescription: "Encode & decode Base64",
        href: "/tools/developer/base64-encoder",
        icon: Binary,
        category: "developer",
        gradient: "from-orange-500 to-red-500",
        isNew: true,
      },
      {
        id: "jwt-decoder",
        name: "JWT Decoder",
        description: "Decode JSON Web Tokens to inspect header, payload claims, and expiration status",
        shortDescription: "Decode JWT tokens",
        href: "/tools/developer/jwt-decoder",
        icon: Key,
        category: "developer",
        gradient: "from-orange-500 to-red-500",
        isNew: true,
      },
      {
        id: "minifier",
        name: "HTML/CSS/JS Minifier",
        description: "Minify HTML, CSS, and JavaScript code to reduce file size and improve load times",
        shortDescription: "Minify web code",
        href: "/tools/developer/minifier",
        icon: Minimize2,
        category: "developer",
        gradient: "from-orange-500 to-red-500",
        isNew: true,
      },
      {
        id: "regex-tester",
        name: "Regex Tester",
        description: "Test regular expression patterns with real-time matching, explanations, and flag support",
        shortDescription: "Test regex patterns",
        href: "/tools/developer/regex-tester",
        icon: Search,
        category: "developer",
        gradient: "from-orange-500 to-red-500",
        isNew: true,
      },
      {
        id: "uuid-generator",
        name: "UUID Generator",
        description: "Generate universally unique identifiers (UUID v4) with bulk generation and format options",
        shortDescription: "Generate UUIDs",
        href: "/tools/developer/uuid-generator",
        icon: Fingerprint,
        category: "developer",
        gradient: "from-orange-500 to-red-500",
        isNew: true,
      },
      {
        id: "api-tester",
        name: "API Tester",
        description: "Test REST API endpoints with custom methods, headers, body, and view formatted responses",
        shortDescription: "Test REST APIs",
        href: "/tools/developer/api-tester",
        icon: Send,
        category: "developer",
        gradient: "from-orange-500 to-red-500",
        isNew: true,
      },
    ],
  },
  {
    id: "branding",
    name: "Branding Tools",
    description: "Create professional brand identities with design systems, image conversion, and color palettes",
    icon: Palette,
    href: "/tools/branding",
    gradient: "from-purple-500 to-pink-500",
    tools: [
      {
        id: "design-system",
        name: "Design System Generator",
        description: "Create comprehensive design systems with 100+ customizable properties and export in 5 formats",
        shortDescription: "100+ customizable properties",
        href: "/branding",
        icon: Palette,
        category: "branding",
        badge: "100+ Props",
        gradient: "from-purple-500 to-pink-500",
        isFeatured: true,
      },
      {
        id: "image-converter",
        name: "Image Converter",
        description: "Convert images between 8+ formats with resize, transform, and filter controls",
        shortDescription: "Convert 8+ image formats",
        href: "/image-converter",
        icon: ImageIcon,
        category: "branding",
        badge: "8 Formats",
        gradient: "from-blue-500 to-cyan-500",
        isFeatured: true,
      },
      {
        id: "color-palette",
        name: "Color Palette Generator",
        description: "Generate harmonious color palettes using color theory with WCAG contrast checking and export options",
        shortDescription: "Generate color palettes",
        href: "/tools/branding/color-palette",
        icon: Paintbrush,
        category: "branding",
        gradient: "from-purple-500 to-pink-500",
        isNew: true,
      },
    ],
  },
];

export const allTools: Tool[] = toolCategories.flatMap((c) => c.tools);
export const featuredTools = allTools.filter((t) => t.isFeatured);
export const newTools = allTools.filter((t) => t.isNew);

export function getToolByHref(href: string): Tool | undefined {
  return allTools.find((t) => t.href === href);
}

export function getCategoryByTool(toolId: string): ToolCategory | undefined {
  return toolCategories.find((c) => c.tools.some((t) => t.id === toolId));
}
