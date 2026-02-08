export interface PageSpeedResult {
  url: string;
  loadTime: number;
  htmlSize: number;
  isHttps: boolean;
  resourceCounts: {
    scripts: number;
    stylesheets: number;
    images: number;
    totalResources: number;
  };
  checks: PageSpeedCheck[];
  score: number;
}

export interface PageSpeedCheck {
  id: string;
  label: string;
  status: "pass" | "warning" | "fail";
  description: string;
  impact: "high" | "medium" | "low";
}

export function calculateScore(checks: PageSpeedCheck[]): number {
  let score = 100;
  for (const check of checks) {
    if (check.status === "fail") {
      score -= check.impact === "high" ? 15 : check.impact === "medium" ? 10 : 5;
    } else if (check.status === "warning") {
      score -= check.impact === "high" ? 8 : check.impact === "medium" ? 5 : 3;
    }
  }
  return Math.max(0, Math.min(100, score));
}

export function analyzeHtml(html: string, url: string, loadTime: number): PageSpeedResult {
  const htmlSize = new Blob([html]).size;
  const isHttps = url.startsWith("https://");

  const scriptMatches = html.match(/<script[\s>]/gi) || [];
  const styleMatches = html.match(/<link[^>]*rel=["']stylesheet["'][^>]*>/gi) || [];
  const imgMatches = html.match(/<img[\s>]/gi) || [];

  const resourceCounts = {
    scripts: scriptMatches.length,
    stylesheets: styleMatches.length,
    images: imgMatches.length,
    totalResources: scriptMatches.length + styleMatches.length + imgMatches.length,
  };

  const checks: PageSpeedCheck[] = [];

  // HTTPS
  checks.push({
    id: "https",
    label: "Uses HTTPS",
    status: isHttps ? "pass" : "fail",
    description: isHttps ? "Site uses secure HTTPS connection" : "Site does not use HTTPS — migrate to improve security and SEO",
    impact: "high",
  });

  // HTML Size
  const sizeKB = htmlSize / 1024;
  checks.push({
    id: "html-size",
    label: "HTML Size",
    status: sizeKB < 100 ? "pass" : sizeKB < 300 ? "warning" : "fail",
    description: `HTML document is ${sizeKB.toFixed(1)}KB${sizeKB > 100 ? " — consider reducing HTML size" : ""}`,
    impact: "medium",
  });

  // Load Time
  checks.push({
    id: "load-time",
    label: "Response Time",
    status: loadTime < 1000 ? "pass" : loadTime < 3000 ? "warning" : "fail",
    description: `Server responded in ${loadTime}ms${loadTime > 1000 ? " — aim for under 1 second" : ""}`,
    impact: "high",
  });

  // Script count
  checks.push({
    id: "scripts",
    label: "JavaScript Files",
    status: resourceCounts.scripts < 5 ? "pass" : resourceCounts.scripts < 10 ? "warning" : "fail",
    description: `Found ${resourceCounts.scripts} script tag(s)${resourceCounts.scripts >= 5 ? " — consider bundling or deferring scripts" : ""}`,
    impact: "medium",
  });

  // Stylesheet count
  checks.push({
    id: "stylesheets",
    label: "CSS Files",
    status: resourceCounts.stylesheets < 3 ? "pass" : resourceCounts.stylesheets < 6 ? "warning" : "fail",
    description: `Found ${resourceCounts.stylesheets} stylesheet(s)${resourceCounts.stylesheets >= 3 ? " — consider combining CSS files" : ""}`,
    impact: "medium",
  });

  // Meta viewport
  const hasViewport = /<meta[^>]*name=["']viewport["'][^>]*>/i.test(html);
  checks.push({
    id: "viewport",
    label: "Mobile Viewport",
    status: hasViewport ? "pass" : "fail",
    description: hasViewport ? "Page has a viewport meta tag for mobile responsiveness" : "Missing viewport meta tag — add for mobile responsiveness",
    impact: "high",
  });

  // Title tag
  const hasTitle = /<title[^>]*>[^<]+<\/title>/i.test(html);
  checks.push({
    id: "title",
    label: "Title Tag",
    status: hasTitle ? "pass" : "fail",
    description: hasTitle ? "Page has a title tag" : "Missing title tag — essential for SEO",
    impact: "high",
  });

  // Meta description
  const hasDescription = /<meta[^>]*name=["']description["'][^>]*>/i.test(html);
  checks.push({
    id: "description",
    label: "Meta Description",
    status: hasDescription ? "pass" : "warning",
    description: hasDescription ? "Page has a meta description" : "Missing meta description — add for better search snippets",
    impact: "medium",
  });

  // Image count
  checks.push({
    id: "images",
    label: "Image Count",
    status: resourceCounts.images < 10 ? "pass" : resourceCounts.images < 30 ? "warning" : "fail",
    description: `Found ${resourceCounts.images} image(s)${resourceCounts.images >= 10 ? " — consider lazy loading images" : ""}`,
    impact: "low",
  });

  // Minification check
  const isMinified = html.split("\n").length < htmlSize / 200;
  checks.push({
    id: "minification",
    label: "HTML Minification",
    status: isMinified ? "pass" : "warning",
    description: isMinified ? "HTML appears to be minified" : "HTML could benefit from minification to reduce size",
    impact: "low",
  });

  const score = calculateScore(checks);

  return { url, loadTime, htmlSize, isHttps, resourceCounts, checks, score };
}
