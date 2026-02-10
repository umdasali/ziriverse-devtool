/**
 * Type definitions for Regex Maker feature
 * Supports pattern generation for 10 common use cases with multi-language syntax
 */

// ============================================
// PATTERN CATEGORIES
// ============================================

export type RegexCategory =
  | "email"
  | "phone"
  | "url"
  | "password"
  | "ipAddress"
  | "creditCard"
  | "date"
  | "postalCode"
  | "username"
  | "custom";

export const REGEX_CATEGORIES = {
  email: { label: "Email", icon: "Mail" },
  phone: { label: "Phone Number", icon: "Phone" },
  url: { label: "URL/Domain", icon: "Globe" },
  password: { label: "Password", icon: "Lock" },
  ipAddress: { label: "IP Address", icon: "Network" },
  creditCard: { label: "Credit Card", icon: "CreditCard" },
  date: { label: "Date", icon: "Calendar" },
  postalCode: { label: "Postal Code", icon: "MapPin" },
  username: { label: "Username", icon: "User" },
  custom: { label: "Custom Pattern", icon: "Wand2" },
} as const;

// ============================================
// PROGRAMMING LANGUAGES
// ============================================

export type ProgrammingLanguage =
  | "javascript"
  | "python"
  | "php"
  | "java"
  | "csharp"
  | "ruby"
  | "go"
  | "rust";

export const PROGRAMMING_LANGUAGES = {
  javascript: { label: "JavaScript", syntax: "javascript" },
  python: { label: "Python", syntax: "python" },
  php: { label: "PHP", syntax: "php" },
  java: { label: "Java", syntax: "java" },
  csharp: { label: "C#", syntax: "csharp" },
  ruby: { label: "Ruby", syntax: "ruby" },
  go: { label: "Go", syntax: "go" },
  rust: { label: "Rust", syntax: "rust" },
} as const;

// ============================================
// PATTERN OPTIONS
// ============================================

// Common options for all patterns
export interface PatternOptions {
  minLength?: number;
  maxLength?: number;
  caseSensitive: boolean;
  allowSpecialChars: boolean;
  noLeadingSpace: boolean;
  noTrailingSpace: boolean;
  noConsecutiveSpaces: boolean;
  flags: {
    global: boolean;
    caseInsensitive: boolean;
    multiline: boolean;
    unicode: boolean;
  };
}

// ============================================
// CATEGORY-SPECIFIC OPTIONS
// ============================================

// Phone pattern options
export interface PhonePatternOptions {
  country: "us" | "uk" | "india" | "china" | "brazil" | "generic";
  allowExtension: boolean;
  requireCountryCode: boolean;
  allowInternationalFormat: boolean;
}

export const PHONE_COUNTRIES = {
  us: { label: "United States", code: "+1", example: "(555) 123-4567" },
  uk: { label: "United Kingdom", code: "+44", example: "07123 456789" },
  india: { label: "India", code: "+91", example: "9876543210" },
  china: { label: "China", code: "+86", example: "13812345678" },
  brazil: { label: "Brazil", code: "+55", example: "(11) 98765-4321" },
  generic: { label: "Generic", code: "", example: "123-456-7890" },
} as const;

// Password pattern options
export interface PasswordPatternOptions {
  strength: "weak" | "medium" | "strong" | "veryStrong";
  requireUppercase: boolean;
  requireLowercase: boolean;
  requireNumbers: boolean;
  requireSpecialChars: boolean;
  minLength: number;
  maxLength?: number;
}

export const PASSWORD_STRENGTHS = {
  weak: {
    label: "Weak",
    description: "Any characters, min 6 characters",
    minLength: 6,
  },
  medium: {
    label: "Medium",
    description: "Letters and numbers, min 8 characters",
    minLength: 8,
  },
  strong: {
    label: "Strong",
    description: "Upper, lower, numbers, min 8 characters",
    minLength: 8,
  },
  veryStrong: {
    label: "Very Strong",
    description: "Upper, lower, numbers, special chars (@#$%^&*!?_-+=~), min 12 characters",
    minLength: 12,
  },
} as const;

// URL pattern options
export interface URLPatternOptions {
  requireProtocol: boolean;
  allowSubdomain: boolean;
  allowQueryParams: boolean;
  allowFragment: boolean;
  allowHTTPOnly: boolean;
  allowHTTPSOnly: boolean;
}

// Date pattern options
export interface DatePatternOptions {
  format:
    | "YYYY-MM-DD"
    | "MM/DD/YYYY"
    | "DD/MM/YYYY"
    | "YYYY/MM/DD"
    | "DD-MM-YYYY"
    | "MM-DD-YYYY";
  allowLeadingZero: boolean;
  strictValidation: boolean; // Validate actual date ranges
}

export const DATE_FORMATS = {
  "YYYY-MM-DD": { label: "YYYY-MM-DD", example: "2024-03-15" },
  "MM/DD/YYYY": { label: "MM/DD/YYYY", example: "03/15/2024" },
  "DD/MM/YYYY": { label: "DD/MM/YYYY", example: "15/03/2024" },
  "YYYY/MM/DD": { label: "YYYY/MM/DD", example: "2024/03/15" },
  "DD-MM-YYYY": { label: "DD-MM-YYYY", example: "15-03-2024" },
  "MM-DD-YYYY": { label: "MM-DD-YYYY", example: "03-15-2024" },
} as const;

// IP Address pattern options
export interface IPAddressPatternOptions {
  version: "ipv4" | "ipv6" | "both";
  allowCIDR: boolean; // Allow CIDR notation (e.g., 192.168.0.0/24)
}

// Postal Code pattern options
export interface PostalCodePatternOptions {
  country: "us" | "uk" | "canada" | "australia" | "germany" | "generic";
}

export const POSTAL_CODE_COUNTRIES = {
  us: { label: "United States (ZIP)", example: "12345 or 12345-6789" },
  uk: { label: "United Kingdom", example: "SW1A 1AA" },
  canada: { label: "Canada", example: "K1A 0B1" },
  australia: { label: "Australia", example: "2000" },
  germany: { label: "Germany", example: "10115" },
  generic: { label: "Generic (5 digits)", example: "12345" },
} as const;

// Username pattern options
export interface UsernamePatternOptions {
  allowDots: boolean;
  allowUnderscores: boolean;
  allowHyphens: boolean;
  requireStartWithLetter: boolean;
  minLength: number;
  maxLength: number;
}

// Custom pattern options
export interface CustomPatternOptions {
  includeDigits: boolean;
  includeLetters: boolean;
  includeUppercase: boolean;
  includeLowercase: boolean;
  includeSpecialChars: boolean;
  customCharSet?: string; // Custom character set
  minLength?: number;
  maxLength?: number;
}

// ============================================
// GENERATED PATTERN
// ============================================

export interface GeneratedPattern {
  id: string;
  category: RegexCategory;
  pattern: string; // Raw regex pattern (without delimiters)
  flags: string; // Combined flags (e.g., "gi")
  description: string; // Human-readable description
  examples: string[]; // Example strings that match
  options: Partial<PatternOptions>; // Options used to generate
  categoryOptions?: any; // Category-specific options
  timestamp: number;
}

// ============================================
// LANGUAGE-SPECIFIC CODE
// ============================================

export interface LanguageCode {
  language: ProgrammingLanguage;
  label: string;
  code: string; // Full code snippet
  syntax: string; // Syntax name for highlighting
}

// ============================================
// PATTERN TESTING
// ============================================

export interface PatternMatch {
  text: string;
  index: number;
  length: number;
}

export interface PatternTestResult {
  matches: PatternMatch[];
  matchCount: number;
  isValid: boolean;
  error?: string;
}

// ============================================
// HISTORY
// ============================================

export interface RegexMakerHistoryEntry {
  id: string;
  pattern: GeneratedPattern;
  timestamp: number;
}

// ============================================
// PATTERN PRESETS
// ============================================

export interface PatternPreset {
  id: string;
  name: string;
  category: RegexCategory;
  description: string;
  pattern: string;
  flags: string;
  examples: string[];
}

// Common pattern presets
export const COMMON_PRESETS: PatternPreset[] = [
  {
    id: "email-basic",
    name: "Email (Basic)",
    category: "email",
    description: "Basic email validation",
    pattern: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$",
    flags: "i",
    examples: ["user@example.com", "test.user+tag@domain.co.uk"],
  },
  {
    id: "email-strict",
    name: "Email (RFC 5322)",
    category: "email",
    description: "Strict RFC 5322 compliant email validation",
    pattern:
      "^[a-zA-Z0-9.!#$%&'*+\\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$",
    flags: "",
    examples: ["user@example.com", "firstname.lastname@company.com"],
  },
  {
    id: "url-basic",
    name: "URL (Basic)",
    category: "url",
    description: "Basic URL validation with HTTP/HTTPS",
    pattern: "^https?:\\/\\/[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}",
    flags: "i",
    examples: ["https://example.com", "http://www.google.com"],
  },
  {
    id: "phone-us",
    name: "US Phone",
    category: "phone",
    description: "US phone number with optional formatting",
    pattern: "^\\+?1?\\s?\\(?\\d{3}\\)?[\\s.-]?\\d{3}[\\s.-]?\\d{4}$",
    flags: "",
    examples: ["(555) 123-4567", "555-123-4567", "5551234567"],
  },
];

// ============================================
// DEFAULT VALUES
// ============================================

export const DEFAULT_PATTERN_OPTIONS: PatternOptions = {
  minLength: undefined,
  maxLength: undefined,
  caseSensitive: false,
  allowSpecialChars: true,
  noLeadingSpace: true,
  noTrailingSpace: true,
  noConsecutiveSpaces: false,
  flags: {
    global: true,
    caseInsensitive: true,
    multiline: false,
    unicode: false,
  },
};

export const DEFAULT_PHONE_OPTIONS: PhonePatternOptions = {
  country: "generic",
  allowExtension: false,
  requireCountryCode: false,
  allowInternationalFormat: true,
};

export const DEFAULT_PASSWORD_OPTIONS: PasswordPatternOptions = {
  strength: "medium",
  requireUppercase: true,
  requireLowercase: true,
  requireNumbers: true,
  requireSpecialChars: false,
  minLength: 8,
  maxLength: undefined,
};

export const DEFAULT_URL_OPTIONS: URLPatternOptions = {
  requireProtocol: true,
  allowSubdomain: true,
  allowQueryParams: true,
  allowFragment: true,
  allowHTTPOnly: false,
  allowHTTPSOnly: false,
};

export const DEFAULT_DATE_OPTIONS: DatePatternOptions = {
  format: "YYYY-MM-DD",
  allowLeadingZero: true,
  strictValidation: false,
};

export const DEFAULT_IP_OPTIONS: IPAddressPatternOptions = {
  version: "ipv4",
  allowCIDR: false,
};

export const DEFAULT_POSTAL_CODE_OPTIONS: PostalCodePatternOptions = {
  country: "us",
};

export const DEFAULT_USERNAME_OPTIONS: UsernamePatternOptions = {
  allowDots: true,
  allowUnderscores: true,
  allowHyphens: true,
  requireStartWithLetter: true,
  minLength: 3,
  maxLength: 20,
};

export const DEFAULT_CUSTOM_OPTIONS: CustomPatternOptions = {
  includeDigits: true,
  includeLetters: true,
  includeUppercase: true,
  includeLowercase: true,
  includeSpecialChars: false,
  minLength: undefined,
  maxLength: undefined,
};
