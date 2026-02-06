export interface MetaTags {
  // Basic
  title?: string;
  description?: string;
  url?: string;
  image?: string;
  canonical?: string;
  robots?: string;
  viewport?: string;
  language?: string;
  author?: string;
  keywords?: string;

  // Open Graph
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogUrl?: string;
  ogType?: string;
  ogSiteName?: string;
  ogLocale?: string;

  // Twitter Card
  twitterCard?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
  twitterSite?: string;
  twitterCreator?: string;
}

export interface HeadingStructure {
  h1: string[];
  h2: string[];
  h3: string[];
  h4: string[];
  h5: string[];
  h6: string[];
}

export interface LinkAnalysis {
  totalLinks: number;
  internalLinks: number;
  externalLinks: number;
  brokenLinks: number;
  noFollowLinks: number;
}

export interface ImageAnalysis {
  totalImages: number;
  imagesWithAlt: number;
  imagesWithoutAlt: number;
  largeImages: number;
  imageFormats: Record<string, number>;
}

export interface ContentAnalysis {
  wordCount: number;
  paragraphCount: number;
  readabilityScore: number;
  keywordDensity: Record<string, number>;
  contentLength: 'short' | 'medium' | 'long';
}

export interface SchemaMarkup {
  detected: boolean;
  types: string[];
  count: number;
  valid: boolean;
}

export interface PerformanceInsights {
  htmlSize: number;
  estimatedLoadTime: number;
  hasMinifiedResources: boolean;
  compressionEnabled: boolean;
}

export interface SecurityCheck {
  isHttps: boolean;
  hasHsts: boolean;
  mixedContent: boolean;
  secureHeaders: string[];
}

export interface SEOScore {
  overall: number;
  metaTags: number;
  content: number;
  technical: number;
  performance: number;
  social: number;
}

export interface AdvancedSEOData {
  metaTags: MetaTags;
  headings: HeadingStructure;
  links: LinkAnalysis;
  images: ImageAnalysis;
  content: ContentAnalysis;
  schema: SchemaMarkup;
  performance: PerformanceInsights;
  security: SecurityCheck;
  seoScore: SEOScore;
}

export interface MetaValidation {
  isValid: boolean;
  warnings: string[];
  suggestions: string[];
  errors: string[];
  score: number;
}

export interface PlatformPreview {
  platform: "facebook" | "twitter" | "discord" | "reddit" | "linkedin" | "whatsapp";
  title: string;
  description: string;
  image?: string;
  url: string;
}

export interface SEOHistory {
  id: string;
  url: string;
  timestamp: number;
  score: number;
  data: AdvancedSEOData;
}

export interface ComparisonData {
  current: AdvancedSEOData;
  previous?: AdvancedSEOData;
  competitor?: AdvancedSEOData;
}
