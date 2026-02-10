/**
 * Regex Maker - Pattern Generation Utilities
 * Generates regex patterns for common use cases with multi-language syntax support
 */

import type {
  RegexCategory,
  GeneratedPattern,
  PatternOptions,
  PhonePatternOptions,
  PasswordPatternOptions,
  URLPatternOptions,
  DatePatternOptions,
  IPAddressPatternOptions,
  PostalCodePatternOptions,
  UsernamePatternOptions,
  CustomPatternOptions,
  ProgrammingLanguage,
  LanguageCode,
  PatternTestResult,
  PatternMatch,
} from "@/types/regex-maker";

// ============================================
// MAIN PATTERN GENERATOR
// ============================================

export function generatePattern(
  category: RegexCategory,
  options: Partial<PatternOptions>,
  categoryOptions?: any
): GeneratedPattern {
  switch (category) {
    case "email":
      return generateEmailPattern(options as PatternOptions);
    case "phone":
      return generatePhonePattern({
        ...(options as PatternOptions),
        ...(categoryOptions as PhonePatternOptions),
      });
    case "url":
      return generateURLPattern({
        ...(options as PatternOptions),
        ...(categoryOptions as URLPatternOptions),
      });
    case "password":
      return generatePasswordPattern({
        ...(options as PatternOptions),
        ...(categoryOptions as PasswordPatternOptions),
      });
    case "ipAddress":
      return generateIPAddressPattern({
        ...(options as PatternOptions),
        ...(categoryOptions as IPAddressPatternOptions),
      });
    case "creditCard":
      return generateCreditCardPattern(options as PatternOptions);
    case "date":
      return generateDatePattern({
        ...(options as PatternOptions),
        ...(categoryOptions as DatePatternOptions),
      });
    case "postalCode":
      return generatePostalCodePattern({
        ...(options as PatternOptions),
        ...(categoryOptions as PostalCodePatternOptions),
      });
    case "username":
      return generateUsernamePattern({
        ...(options as PatternOptions),
        ...(categoryOptions as UsernamePatternOptions),
      });
    case "custom":
      return generateCustomPattern(
        options as PatternOptions,
        categoryOptions as CustomPatternOptions
      );
    default:
      throw new Error(`Unknown category: ${category}`);
  }
}

// ============================================
// CATEGORY-SPECIFIC PATTERN GENERATORS
// ============================================

/**
 * Generate email validation pattern
 */
export function generateEmailPattern(
  options: Partial<PatternOptions>
): GeneratedPattern {
  // Basic email pattern
  let pattern = "[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}";

  // Add anchors for strict matching
  pattern = `^${pattern}$`;

  // Apply whitespace constraints
  if (options.noLeadingSpace || options.noTrailingSpace) {
    pattern = pattern.replace("^", "^\\s*").replace("$", "\\s*$");
  }

  const flags = buildFlagsString(options.flags || {});

  return {
    id: crypto.randomUUID(),
    category: "email",
    pattern,
    flags,
    description: "Email address validation",
    examples: [
      "user@example.com",
      "firstname.lastname@company.co.uk",
      "test+tag@domain.com",
    ],
    options,
    timestamp: Date.now(),
  };
}

/**
 * Generate phone number pattern
 */
export function generatePhonePattern(
  options: Partial<PatternOptions & PhonePatternOptions>
): GeneratedPattern {
  const country = options.country || "generic";
  let pattern = "";
  let examples: string[] = [];

  switch (country) {
    case "us":
      // US: (555) 123-4567, 555-123-4567, 5551234567, +1 555-123-4567
      if (options.requireCountryCode) {
        pattern = "\\+1\\s?";
      } else {
        pattern = "\\+?1?\\s?";
      }
      pattern += "\\(?\\d{3}\\)?[\\s.-]?\\d{3}[\\s.-]?\\d{4}";
      examples = ["(555) 123-4567", "555-123-4567", "+1 555-123-4567"];
      break;

    case "uk":
      // UK: 07123 456789, +44 7123 456789
      if (options.requireCountryCode) {
        pattern = "\\+44\\s?7\\d{3}";
      } else {
        pattern = "(\\+44\\s?7\\d{3}|\\(?07\\d{3}\\)?)";
      }
      pattern += "\\s?\\d{3}\\s?\\d{3}";
      examples = ["07123 456789", "+44 7123 456789", "07123456789"];
      break;

    case "india":
      // India: 9876543210, +91 9876543210
      if (options.requireCountryCode) {
        pattern = "\\+91[\\-\\s]?";
      } else {
        pattern = "(\\+91[\\-\\s]?)?";
      }
      pattern += "[6-9]\\d{9}";
      examples = ["9876543210", "+91 9876543210", "+91-9876543210"];
      break;

    case "china":
      // China: 13812345678, +86 13812345678
      if (options.requireCountryCode) {
        pattern = "\\+86\\s?";
      } else {
        pattern = "(\\+86\\s?)?";
      }
      pattern += "1[3-9]\\d{9}";
      examples = ["13812345678", "+86 13812345678", "+86 138 1234 5678"];
      break;

    case "brazil":
      // Brazil: (11) 98765-4321, +55 11 98765-4321
      if (options.requireCountryCode) {
        pattern = "\\+55\\s?";
      } else {
        pattern = "(\\+55\\s?)?";
      }
      pattern += "\\(?\\d{2}\\)?\\s?9?\\d{4}-?\\d{4}";
      examples = ["(11) 98765-4321", "+55 11 98765-4321", "11987654321"];
      break;

    default:
      // Generic: 123-456-7890, 1234567890
      pattern = "\\d{3}[\\s.-]?\\d{3}[\\s.-]?\\d{4}";
      examples = ["123-456-7890", "123.456.7890", "1234567890"];
  }

  // Add extension support
  if (options.allowExtension) {
    pattern += "(\\s?(ext|x)\\.?\\s?\\d{1,5})?";
    examples.push(examples[0] + " ext. 123");
  }

  pattern = `^${pattern}$`;
  const flags = buildFlagsString(options.flags || {});

  return {
    id: crypto.randomUUID(),
    category: "phone",
    pattern,
    flags,
    description: `Phone number validation (${country.toUpperCase()})`,
    examples,
    options,
    categoryOptions: {
      country,
      allowExtension: options.allowExtension,
      requireCountryCode: options.requireCountryCode,
    },
    timestamp: Date.now(),
  };
}

/**
 * Generate URL pattern
 */
export function generateURLPattern(
  options: Partial<PatternOptions & URLPatternOptions>
): GeneratedPattern {
  let pattern = "";

  // Protocol
  if (options.requireProtocol) {
    if (options.allowHTTPSOnly) {
      pattern = "https:\\/\\/";
    } else if (options.allowHTTPOnly) {
      pattern = "http:\\/\\/";
    } else {
      pattern = "https?:\\/\\/";
    }
  } else {
    pattern = "(https?:\\/\\/)?";
  }

  // Subdomain (optional)
  if (options.allowSubdomain) {
    pattern += "(www\\.)?";
  }

  // Domain
  pattern += "[a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(\\.[a-zA-Z]{2,})+";

  // Path
  pattern += "(\\/[a-zA-Z0-9._~:/?#\\[\\]@!$&'()*+,;=-]*)?";

  // Query params
  if (!options.allowQueryParams) {
    pattern = pattern.replace("\\?", "");
  }

  // Fragment
  if (!options.allowFragment) {
    pattern = pattern.replace("#", "");
  }

  pattern = `^${pattern}$`;
  const flags = buildFlagsString(options.flags || {});

  return {
    id: crypto.randomUUID(),
    category: "url",
    pattern,
    flags,
    description: "URL validation",
    examples: [
      "https://example.com",
      "http://www.google.com/search?q=regex",
      "https://github.com/user/repo",
    ],
    options,
    categoryOptions: {
      requireProtocol: options.requireProtocol,
      allowSubdomain: options.allowSubdomain,
    },
    timestamp: Date.now(),
  };
}

/**
 * Generate password pattern
 */
export function generatePasswordPattern(
  options: Partial<PatternOptions & PasswordPatternOptions>
): GeneratedPattern {
  const strength = options.strength || "medium";
  const minLength = options.minLength || 8;
  let pattern = "";
  let description = "";

  switch (strength) {
    case "weak":
      // Any characters, min length
      pattern = `.{${minLength},}`;
      description = `Password (weak): any characters, min ${minLength} chars`;
      break;

    case "medium":
      // Letters and numbers
      pattern = `(?=.*[a-zA-Z])(?=.*\\d)[a-zA-Z\\d]{${minLength},}`;
      description = `Password (medium): letters and numbers, min ${minLength} chars`;
      break;

    case "strong":
      // Upper, lower, numbers
      pattern = `(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{${minLength},}`;
      description = `Password (strong): upper, lower, numbers, min ${minLength} chars`;
      break;

    case "veryStrong":
      // Upper, lower, numbers, special chars (expanded to include more common special characters)
      pattern = `(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@#$%^&*!?_\\-+=~])[A-Za-z\\d@#$%^&*!?_\\-+=~]{${minLength},}`;
      description = `Password (very strong): upper, lower, numbers, special chars (@#$%^&*!?_-+=~), min ${minLength} chars`;
      break;
  }

  // Add max length constraint
  if (options.maxLength) {
    pattern = pattern.replace(/,\}/, `,${options.maxLength}}`);
  }

  pattern = `^${pattern}$`;
  const flags = buildFlagsString(options.flags || {});

  return {
    id: crypto.randomUUID(),
    category: "password",
    pattern,
    flags,
    description,
    examples: [
      "Password123",
      "MyP@ssw0rd",
      "Secure123!@#",
      "Atish825@#Amrin",
      "VeryStr0ng!Pass",
    ],
    options,
    categoryOptions: { strength, minLength },
    timestamp: Date.now(),
  };
}

/**
 * Generate IP address pattern
 */
export function generateIPAddressPattern(
  options: Partial<PatternOptions & IPAddressPatternOptions>
): GeneratedPattern {
  const version = options.version || "ipv4";
  let pattern = "";
  let examples: string[] = [];

  switch (version) {
    case "ipv4":
      // IPv4: 192.168.1.1
      pattern =
        "\\b((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\b";
      examples = ["192.168.1.1", "10.0.0.1", "172.16.254.1"];
      break;

    case "ipv6":
      // IPv6: 2001:0db8:85a3:0000:0000:8a2e:0370:7334
      pattern =
        "([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}";
      examples = [
        "2001:0db8:85a3:0000:0000:8a2e:0370:7334",
        "2001:db8::8a2e:370:7334",
        "::1",
      ];
      break;

    case "both":
      // IPv4 or IPv6
      const ipv4 =
        "\\b((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\b";
      const ipv6 =
        "([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}";
      pattern = `(${ipv4})|(${ipv6})`;
      examples = ["192.168.1.1", "2001:db8::1", "10.0.0.1"];
      break;
  }

  // Add CIDR support
  if (options.allowCIDR) {
    pattern += "(\\/([0-9]|[1-2][0-9]|3[0-2]))?";
    examples.push("192.168.1.0/24");
  }

  pattern = `^${pattern}$`;
  const flags = buildFlagsString(options.flags || {});

  return {
    id: crypto.randomUUID(),
    category: "ipAddress",
    pattern,
    flags,
    description: `IP address validation (${version.toUpperCase()})`,
    examples,
    options,
    categoryOptions: { version, allowCIDR: options.allowCIDR },
    timestamp: Date.now(),
  };
}

/**
 * Generate credit card pattern
 */
export function generateCreditCardPattern(
  options: Partial<PatternOptions>
): GeneratedPattern {
  // Matches: 4111-1111-1111-1111, 4111 1111 1111 1111, 4111111111111111
  let pattern = "\\d{4}[\\s-]?\\d{4}[\\s-]?\\d{4}[\\s-]?\\d{4}";

  pattern = `^${pattern}$`;
  const flags = buildFlagsString(options.flags || {});

  return {
    id: crypto.randomUUID(),
    category: "creditCard",
    pattern,
    flags,
    description: "Credit card number validation (16 digits)",
    examples: [
      "4111-1111-1111-1111",
      "5500 0000 0000 0004",
      "340000000000009",
    ],
    options,
    timestamp: Date.now(),
  };
}

/**
 * Generate date pattern
 */
export function generateDatePattern(
  options: Partial<PatternOptions & DatePatternOptions>
): GeneratedPattern {
  const format = options.format || "YYYY-MM-DD";
  const allowLeadingZero = options.allowLeadingZero !== false;
  let pattern = "";
  let examples: string[] = [];

  const dayPattern = allowLeadingZero ? "\\d{2}" : "(0?[1-9]|[12][0-9]|3[01])";
  const monthPattern = allowLeadingZero
    ? "\\d{2}"
    : "(0?[1-9]|1[0-2])";
  const yearPattern = "\\d{4}";

  switch (format) {
    case "YYYY-MM-DD":
      pattern = `${yearPattern}-${monthPattern}-${dayPattern}`;
      examples = ["2024-03-15", "2024-12-31", "2024-01-01"];
      break;
    case "MM/DD/YYYY":
      pattern = `${monthPattern}\\/${dayPattern}\\/${yearPattern}`;
      examples = ["03/15/2024", "12/31/2024", "01/01/2024"];
      break;
    case "DD/MM/YYYY":
      pattern = `${dayPattern}\\/${monthPattern}\\/${yearPattern}`;
      examples = ["15/03/2024", "31/12/2024", "01/01/2024"];
      break;
    case "YYYY/MM/DD":
      pattern = `${yearPattern}\\/${monthPattern}\\/${dayPattern}`;
      examples = ["2024/03/15", "2024/12/31", "2024/01/01"];
      break;
    case "DD-MM-YYYY":
      pattern = `${dayPattern}-${monthPattern}-${yearPattern}`;
      examples = ["15-03-2024", "31-12-2024", "01-01-2024"];
      break;
    case "MM-DD-YYYY":
      pattern = `${monthPattern}-${dayPattern}-${yearPattern}`;
      examples = ["03-15-2024", "12-31-2024", "01-01-2024"];
      break;
  }

  pattern = `^${pattern}$`;
  const flags = buildFlagsString(options.flags || {});

  return {
    id: crypto.randomUUID(),
    category: "date",
    pattern,
    flags,
    description: `Date validation (${format})`,
    examples,
    options,
    categoryOptions: { format, allowLeadingZero },
    timestamp: Date.now(),
  };
}

/**
 * Generate postal code pattern
 */
export function generatePostalCodePattern(
  options: Partial<PatternOptions & PostalCodePatternOptions>
): GeneratedPattern {
  const country = options.country || "us";
  let pattern = "";
  let examples: string[] = [];

  switch (country) {
    case "us":
      // US: 12345 or 12345-6789
      pattern = "\\d{5}(-\\d{4})?";
      examples = ["12345", "12345-6789", "90210"];
      break;
    case "uk":
      // UK: SW1A 1AA
      pattern =
        "[A-Z]{1,2}\\d{1,2}[A-Z]?\\s?\\d[A-Z]{2}";
      examples = ["SW1A 1AA", "M1 1AE", "B33 8TH"];
      break;
    case "canada":
      // Canada: K1A 0B1
      pattern = "[A-Z]\\d[A-Z]\\s?\\d[A-Z]\\d";
      examples = ["K1A 0B1", "M5W 1E6", "V6B 1A1"];
      break;
    case "australia":
      // Australia: 2000
      pattern = "\\d{4}";
      examples = ["2000", "3000", "4000"];
      break;
    case "germany":
      // Germany: 10115
      pattern = "\\d{5}";
      examples = ["10115", "80331", "20095"];
      break;
    default:
      // Generic: 5 digits
      pattern = "\\d{5}";
      examples = ["12345", "67890", "11111"];
  }

  pattern = `^${pattern}$`;
  const flags = buildFlagsString(options.flags || {});

  return {
    id: crypto.randomUUID(),
    category: "postalCode",
    pattern,
    flags,
    description: `Postal code validation (${country.toUpperCase()})`,
    examples,
    options,
    categoryOptions: { country },
    timestamp: Date.now(),
  };
}

/**
 * Generate username pattern
 */
export function generateUsernamePattern(
  options: Partial<PatternOptions & UsernamePatternOptions>
): GeneratedPattern {
  const minLength = options.minLength || 3;
  const maxLength = options.maxLength || 20;

  let charSet = "a-zA-Z0-9";
  if (options.allowDots) charSet += ".";
  if (options.allowUnderscores) charSet += "_";
  if (options.allowHyphens) charSet += "-";

  let pattern = "";
  if (options.requireStartWithLetter) {
    pattern = `[a-zA-Z][${charSet}]{${minLength - 1},${maxLength - 1}}`;
  } else {
    pattern = `[${charSet}]{${minLength},${maxLength}}`;
  }

  pattern = `^${pattern}$`;
  const flags = buildFlagsString(options.flags || {});

  return {
    id: crypto.randomUUID(),
    category: "username",
    pattern,
    flags,
    description: `Username validation (${minLength}-${maxLength} characters)`,
    examples: ["john_doe", "user123", "alice.smith", "bob-jones"],
    options,
    categoryOptions: {
      minLength,
      maxLength,
      allowDots: options.allowDots,
      allowUnderscores: options.allowUnderscores,
      allowHyphens: options.allowHyphens,
    },
    timestamp: Date.now(),
  };
}

/**
 * Generate custom pattern
 */
export function generateCustomPattern(
  options: Partial<PatternOptions>,
  customOptions: Partial<CustomPatternOptions>
): GeneratedPattern {
  let charSet = "";

  if (customOptions.includeLowercase) charSet += "a-z";
  if (customOptions.includeUppercase) charSet += "A-Z";
  if (customOptions.includeDigits) charSet += "0-9";
  if (customOptions.includeSpecialChars)
    charSet += "@$!%*?&._-";
  if (customOptions.customCharSet)
    charSet += customOptions.customCharSet;

  let pattern = `[${charSet}]`;

  // Add length constraints
  if (customOptions.minLength || customOptions.maxLength) {
    const min = customOptions.minLength || 1;
    const max = customOptions.maxLength || "";
    pattern += `{${min},${max}}`;
  } else {
    pattern += "+";
  }

  // Apply whitespace constraints
  if (options.noLeadingSpace) {
    pattern = `(?!\\s)${pattern}`;
  }
  if (options.noTrailingSpace) {
    pattern = `${pattern}(?<!\\s)`;
  }
  if (options.noConsecutiveSpaces) {
    pattern = pattern.replace(/\+/, "(?!.*\\s{2,})");
  }

  pattern = `^${pattern}$`;
  const flags = buildFlagsString(options.flags || {});

  return {
    id: crypto.randomUUID(),
    category: "custom",
    pattern,
    flags,
    description: "Custom pattern",
    examples: ["abc123", "Test@123", "custom_pattern"],
    options,
    categoryOptions: customOptions,
    timestamp: Date.now(),
  };
}

// ============================================
// LANGUAGE CODE GENERATORS
// ============================================

export function generateLanguageCode(
  pattern: GeneratedPattern,
  language: ProgrammingLanguage
): LanguageCode {
  switch (language) {
    case "javascript":
      return generateJavaScriptCode(pattern);
    case "python":
      return generatePythonCode(pattern);
    case "php":
      return generatePHPCode(pattern);
    case "java":
      return generateJavaCode(pattern);
    case "csharp":
      return generateCSharpCode(pattern);
    case "ruby":
      return generateRubyCode(pattern);
    case "go":
      return generateGoCode(pattern);
    case "rust":
      return generateRustCode(pattern);
    default:
      throw new Error(`Unknown language: ${language}`);
  }
}

function generateJavaScriptCode(pattern: GeneratedPattern): LanguageCode {
  const flags = pattern.flags || "";
  const code = `// ${pattern.description}
const regex = /${pattern.pattern}/${flags};

// Test if string matches
const isValid = regex.test('test string');

// Extract matches
const matches = 'test string'.match(regex);

// Find all matches
const allMatches = 'test string'.matchAll(/${pattern.pattern}/${flags});

// Example
console.log(regex.test('${pattern.examples[0]}')); // true`;

  return {
    language: "javascript",
    label: "JavaScript",
    code,
    syntax: "javascript",
  };
}

function generatePythonCode(pattern: GeneratedPattern): LanguageCode {
  const flags = pattern.flags || "";
  let pyFlags = "";
  if (flags.includes("i")) pyFlags += "re.IGNORECASE | ";
  if (flags.includes("m")) pyFlags += "re.MULTILINE | ";
  if (flags.includes("u")) pyFlags += "re.UNICODE | ";
  pyFlags = pyFlags.replace(/ \| $/, "");

  const code = `# ${pattern.description}
import re

pattern = r'${pattern.pattern}'
regex = re.compile(pattern${pyFlags ? `, ${pyFlags}` : ""})

# Test if string matches
is_valid = bool(regex.match('test string'))

# Find all matches
matches = regex.findall('test string')

# Search for pattern
match = regex.search('test string')

# Example
print(regex.match('${pattern.examples[0]}'))  # Match object or None`;

  return {
    language: "python",
    label: "Python",
    code,
    syntax: "python",
  };
}

function generatePHPCode(pattern: GeneratedPattern): LanguageCode {
  const flags = pattern.flags || "";
  const code = `// ${pattern.description}
$pattern = '/${pattern.pattern}/${flags}';

// Test if string matches
if (preg_match($pattern, 'test string')) {
    echo "Valid";
}

// Extract matches
preg_match($pattern, 'test string', $matches);

// Find all matches
preg_match_all($pattern, 'test string', $allMatches);

// Example
echo preg_match($pattern, '${pattern.examples[0]}'); // 1 (true)`;

  return {
    language: "php",
    label: "PHP",
    code,
    syntax: "php",
  };
}

function generateJavaCode(pattern: GeneratedPattern): LanguageCode {
  const flags = pattern.flags || "";
  let javaFlags = "";
  if (flags.includes("i")) javaFlags += "Pattern.CASE_INSENSITIVE | ";
  if (flags.includes("m")) javaFlags += "Pattern.MULTILINE | ";
  if (flags.includes("u")) javaFlags += "Pattern.UNICODE_CASE | ";
  javaFlags = javaFlags.replace(/ \| $/, "");

  const code = `// ${pattern.description}
import java.util.regex.Pattern;
import java.util.regex.Matcher;

Pattern pattern = Pattern.compile("${pattern.pattern}"${javaFlags ? `, ${javaFlags}` : ""});
Matcher matcher = pattern.matcher("test string");

// Test if string matches
boolean isValid = matcher.matches();

// Find matches
while (matcher.find()) {
    System.out.println(matcher.group());
}

// Example
Matcher exampleMatcher = pattern.matcher("${pattern.examples[0]}");
System.out.println(exampleMatcher.matches()); // true`;

  return {
    language: "java",
    label: "Java",
    code,
    syntax: "java",
  };
}

function generateCSharpCode(pattern: GeneratedPattern): LanguageCode {
  const flags = pattern.flags || "";
  let csFlags = "";
  if (flags.includes("i")) csFlags += "RegexOptions.IgnoreCase | ";
  if (flags.includes("m")) csFlags += "RegexOptions.Multiline | ";
  csFlags = csFlags.replace(/ \| $/, "");

  const code = `// ${pattern.description}
using System.Text.RegularExpressions;

Regex regex = new Regex(@"${pattern.pattern}"${csFlags ? `, ${csFlags}` : ""});

// Test if string matches
bool isValid = regex.IsMatch("test string");

// Extract matches
Match match = regex.Match("test string");

// Find all matches
MatchCollection matches = regex.Matches("test string");

// Example
Console.WriteLine(regex.IsMatch("${pattern.examples[0]}")); // True`;

  return {
    language: "csharp",
    label: "C#",
    code,
    syntax: "csharp",
  };
}

function generateRubyCode(pattern: GeneratedPattern): LanguageCode {
  const flags = pattern.flags || "";
  let rubyFlags = "";
  if (flags.includes("i")) rubyFlags += "i";
  if (flags.includes("m")) rubyFlags += "m";

  const code = `# ${pattern.description}
regex = /${pattern.pattern}/${rubyFlags}

# Test if string matches
is_valid = regex.match?('test string')

# Extract matches
matches = 'test string'.scan(regex)

# Match object
match = 'test string'.match(regex)

# Example
puts regex.match?('${pattern.examples[0]}') # true`;

  return {
    language: "ruby",
    label: "Ruby",
    code,
    syntax: "ruby",
  };
}

function generateGoCode(pattern: GeneratedPattern): LanguageCode {
  const code = `// ${pattern.description}
package main

import (
    "fmt"
    "regexp"
)

func main() {
    pattern := \`${pattern.pattern}\`
    regex := regexp.MustCompile(pattern)

    // Test if string matches
    isValid := regex.MatchString("test string")

    // Find matches
    matches := regex.FindAllString("test string", -1)

    // Example
    fmt.Println(regex.MatchString("${pattern.examples[0]}")) // true
}`;

  return {
    language: "go",
    label: "Go",
    code,
    syntax: "go",
  };
}

function generateRustCode(pattern: GeneratedPattern): LanguageCode {
  const code = `// ${pattern.description}
use regex::Regex;

fn main() {
    let regex = Regex::new(r"${pattern.pattern}").unwrap();

    // Test if string matches
    let is_valid = regex.is_match("test string");

    // Find matches
    for mat in regex.find_iter("test string") {
        println!("{}", mat.as_str());
    }

    // Example
    println!("{}", regex.is_match("${pattern.examples[0]}")); // true
}`;

  return {
    language: "rust",
    label: "Rust",
    code,
    syntax: "rust",
  };
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

/**
 * Build flags string from flags object
 */
export function buildFlagsString(flags: {
  global?: boolean;
  caseInsensitive?: boolean;
  multiline?: boolean;
  unicode?: boolean;
}): string {
  let flagStr = "";
  if (flags.global) flagStr += "g";
  if (flags.caseInsensitive) flagStr += "i";
  if (flags.multiline) flagStr += "m";
  if (flags.unicode) flagStr += "u";
  return flagStr;
}

/**
 * Test pattern against string
 */
export function testGeneratedPattern(
  pattern: GeneratedPattern,
  testString: string
): PatternTestResult {
  try {
    const regex = new RegExp(pattern.pattern, pattern.flags);
    const matches: PatternMatch[] = [];

    if (pattern.flags.includes("g")) {
      // Global flag: find all matches
      let match;
      while ((match = regex.exec(testString)) !== null) {
        matches.push({
          text: match[0],
          index: match.index,
          length: match[0].length,
        });
      }
    } else {
      // No global flag: find first match
      const match = regex.exec(testString);
      if (match) {
        matches.push({
          text: match[0],
          index: match.index,
          length: match[0].length,
        });
      }
    }

    return {
      matches,
      matchCount: matches.length,
      isValid: true,
    };
  } catch (error: any) {
    return {
      matches: [],
      matchCount: 0,
      isValid: false,
      error: error.message || "Invalid pattern",
    };
  }
}

/**
 * Get example strings for a category
 */
export function getExampleStrings(category: RegexCategory): string[] {
  switch (category) {
    case "email":
      return [
        "user@example.com",
        "firstname.lastname@company.co.uk",
        "test+tag@domain.com",
        "invalid@",
        "@invalid.com",
      ];
    case "phone":
      return [
        "(555) 123-4567",
        "555-123-4567",
        "+1 555-123-4567",
        "1234567890",
        "invalid-phone",
      ];
    case "url":
      return [
        "https://example.com",
        "http://www.google.com/search",
        "ftp://invalid.com",
        "not-a-url",
      ];
    case "password":
      return ["Password123", "weak", "MyP@ssw0rd", "12345678"];
    case "ipAddress":
      return [
        "192.168.1.1",
        "10.0.0.1",
        "256.1.1.1",
        "2001:db8::1",
        "invalid",
      ];
    case "creditCard":
      return [
        "4111-1111-1111-1111",
        "4111 1111 1111 1111",
        "4111111111111111",
        "1234",
      ];
    case "date":
      return [
        "2024-03-15",
        "03/15/2024",
        "15/03/2024",
        "2024/03/15",
        "invalid-date",
      ];
    case "postalCode":
      return ["12345", "12345-6789", "SW1A 1AA", "invalid"];
    case "username":
      return ["john_doe", "user123", "alice.smith", "a", "invalid user"];
    default:
      return ["test", "example", "sample"];
  }
}
