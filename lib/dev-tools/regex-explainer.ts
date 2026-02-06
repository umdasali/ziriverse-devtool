import type {
  RegexInput,
  RegexOutput,
  RegexMatch,
  RegexExplanation,
} from "@/types/dev-tools";

/**
 * Test regex pattern and provide matches and explanation
 */
export function testRegex(input: RegexInput): RegexOutput {
  try {
    // Build flags string
    let flagsStr = "";
    if (input.flags.global) flagsStr += "g";
    if (input.flags.caseInsensitive) flagsStr += "i";
    if (input.flags.multiline) flagsStr += "m";
    if (input.flags.dotAll) flagsStr += "s";
    if (input.flags.unicode) flagsStr += "u";
    if (input.flags.sticky) flagsStr += "y";

    // Create regex
    const regex = new RegExp(input.pattern, flagsStr);

    // Get matches
    const matches: RegexMatch[] = [];

    if (input.mode === "match") {
      if (input.flags.global) {
        // Global flag: get all matches
        let match;
        while ((match = regex.exec(input.testString)) !== null) {
          matches.push({
            match: match[0],
            index: match.index,
            groups: match.slice(1),
            length: match[0].length,
          });

          // Prevent infinite loop for zero-width matches
          if (match.index === regex.lastIndex) {
            regex.lastIndex++;
          }
        }
      } else {
        // No global flag: get first match only
        const match = regex.exec(input.testString);
        if (match) {
          matches.push({
            match: match[0],
            index: match.index,
            groups: match.slice(1),
            length: match[0].length,
          });
        }
      }
    }

    // Generate explanation
    const explanation = explainRegexPattern(input.pattern);

    // Handle replace mode
    let replacedText: string | undefined;
    if (input.mode === "replace" && input.replacement !== undefined) {
      replacedText = input.testString.replace(regex, input.replacement);
    }

    return {
      matches,
      explanation,
      replacedText,
    };
  } catch (error: any) {
    return {
      matches: [],
      explanation: [],
      error: `Invalid regex: ${error.message}`,
    };
  }
}

/**
 * Explain regex pattern token by token
 */
export function explainRegexPattern(pattern: string): RegexExplanation[] {
  const explanations: RegexExplanation[] = [];
  let i = 0;

  while (i < pattern.length) {
    const char = pattern[i];

    // Escape sequences
    if (char === "\\") {
      if (i + 1 < pattern.length) {
        const next = pattern[i + 1];
        const token = char + next;

        // Character class escapes
        if (["d", "D", "w", "W", "s", "S"].includes(next)) {
          explanations.push({
            token,
            type: "character-class",
            explanation: getEscapeExplanation(next),
            example: getEscapeExample(next),
          });
          i += 2;
          continue;
        }

        // Boundary assertions
        if (["b", "B"].includes(next)) {
          explanations.push({
            token,
            type: "anchor",
            explanation:
              next === "b"
                ? "Word boundary (position between word and non-word character)"
                : "Non-word boundary",
            example: next === "b" ? "\\bword\\b matches 'word' in 'a word here'" : "",
          });
          i += 2;
          continue;
        }

        // Other escapes
        explanations.push({
          token,
          type: "escape",
          explanation: `Escaped character: ${next}`,
          example: `Matches literal '${next}'`,
        });
        i += 2;
        continue;
      }
      i++;
      continue;
    }

    // Character classes
    if (char === "[") {
      const endIndex = pattern.indexOf("]", i);
      if (endIndex !== -1) {
        const token = pattern.slice(i, endIndex + 1);
        explanations.push({
          token,
          type: "character-class",
          explanation: explainCharacterClass(token),
          example: getCharClassExample(token),
        });
        i = endIndex + 1;
        continue;
      }
    }

    // Anchors
    if (char === "^") {
      explanations.push({
        token: "^",
        type: "anchor",
        explanation: "Start of line/string",
        example: "^hello matches 'hello' at the start",
      });
      i++;
      continue;
    }

    if (char === "$") {
      explanations.push({
        token: "$",
        type: "anchor",
        explanation: "End of line/string",
        example: "world$ matches 'world' at the end",
      });
      i++;
      continue;
    }

    // Quantifiers
    if (["*", "+", "?"].includes(char)) {
      explanations.push({
        token: char,
        type: "quantifier",
        explanation: getQuantifierExplanation(char),
        example: getQuantifierExample(char),
      });
      i++;
      continue;
    }

    // Curly brace quantifiers
    if (char === "{") {
      const endIndex = pattern.indexOf("}", i);
      if (endIndex !== -1) {
        const token = pattern.slice(i, endIndex + 1);
        explanations.push({
          token,
          type: "quantifier",
          explanation: explainCurlyBraceQuantifier(token),
          example: `a${token} matches 'a' repeated according to ${token}`,
        });
        i = endIndex + 1;
        continue;
      }
    }

    // Groups
    if (char === "(") {
      let depth = 1;
      let j = i + 1;
      let groupContent = "";

      while (j < pattern.length && depth > 0) {
        if (pattern[j] === "(" && pattern[j - 1] !== "\\") depth++;
        if (pattern[j] === ")" && pattern[j - 1] !== "\\") depth--;
        if (depth > 0) groupContent += pattern[j];
        j++;
      }

      const token = pattern.slice(i, j);
      const isNonCapturing = token.startsWith("(?:");
      const isLookahead = token.startsWith("(?=");
      const isNegativeLookahead = token.startsWith("(?!");

      explanations.push({
        token,
        type: isLookahead || isNegativeLookahead ? "assertion" : "group",
        explanation: isNonCapturing
          ? "Non-capturing group (groups without creating a backreference)"
          : isLookahead
            ? "Positive lookahead (matches if followed by pattern)"
            : isNegativeLookahead
              ? "Negative lookahead (matches if NOT followed by pattern)"
              : "Capturing group (captures matched text)",
        example: isCapturing(token) ? "Captured text can be referenced later" : undefined,
      });

      i = j;
      continue;
    }

    // Alternation
    if (char === "|") {
      explanations.push({
        token: "|",
        type: "alternation",
        explanation: "OR operator (matches either left or right pattern)",
        example: "cat|dog matches 'cat' OR 'dog'",
      });
      i++;
      continue;
    }

    // Dot
    if (char === ".") {
      explanations.push({
        token: ".",
        type: "character-class",
        explanation: "Matches any character (except newline by default)",
        example: "a.c matches 'abc', 'a3c', 'a c', etc.",
      });
      i++;
      continue;
    }

    // Literal character
    if (char.match(/[a-zA-Z0-9]/)) {
      explanations.push({
        token: char,
        type: "literal",
        explanation: `Matches literal character '${char}'`,
      });
    }

    i++;
  }

  return explanations;
}

// Helper functions

function getEscapeExplanation(char: string): string {
  const explanations: Record<string, string> = {
    d: "Digit (0-9)",
    D: "Non-digit (anything except 0-9)",
    w: "Word character (a-z, A-Z, 0-9, _)",
    W: "Non-word character",
    s: "Whitespace (space, tab, newline)",
    S: "Non-whitespace",
  };
  return explanations[char] || "Unknown escape";
}

function getEscapeExample(char: string): string {
  const examples: Record<string, string> = {
    d: "\\d+ matches '123' in 'abc123'",
    D: "\\D+ matches 'abc' in 'abc123'",
    w: "\\w+ matches 'hello_world123'",
    W: "\\W+ matches '!@#' in 'hello!@#world'",
    s: "\\s+ matches whitespace in 'hello   world'",
    S: "\\S+ matches 'hello' in 'hello world'",
  };
  return examples[char] || "";
}

function explainCharacterClass(token: string): string {
  const content = token.slice(1, -1);
  if (content.startsWith("^")) {
    return `Negated character class: matches any character NOT in [${content.slice(1)}]`;
  }
  return `Character class: matches any character in [${content}]`;
}

function getCharClassExample(token: string): string {
  if (token === "[a-z]") return "Matches any lowercase letter";
  if (token === "[A-Z]") return "Matches any uppercase letter";
  if (token === "[0-9]") return "Matches any digit";
  if (token === "[a-zA-Z]") return "Matches any letter";
  return `Matches characters in ${token}`;
}

function getQuantifierExplanation(char: string): string {
  const explanations: Record<string, string> = {
    "*": "Zero or more times",
    "+": "One or more times",
    "?": "Zero or one time (optional)",
  };
  return explanations[char] || "";
}

function getQuantifierExample(char: string): string {
  const examples: Record<string, string> = {
    "*": "a* matches '', 'a', 'aa', 'aaa', etc.",
    "+": "a+ matches 'a', 'aa', 'aaa', etc. (not '')",
    "?": "a? matches '' or 'a'",
  };
  return examples[char] || "";
}

function explainCurlyBraceQuantifier(token: string): string {
  const match = token.match(/\{(\d+)(,)?(\d+)?\}/);
  if (!match) return "Invalid quantifier";

  const [, min, comma, max] = match;

  if (!comma) {
    return `Exactly ${min} times`;
  } else if (!max) {
    return `At least ${min} times`;
  } else {
    return `Between ${min} and ${max} times`;
  }
}

function isCapturing(token: string): boolean {
  return !token.startsWith("(?:") && !token.startsWith("(?=") && !token.startsWith("(?!");
}

/**
 * Validate regex pattern
 */
export function validateRegexPattern(pattern: string): {
  valid: boolean;
  error?: string;
} {
  try {
    new RegExp(pattern);
    return { valid: true };
  } catch (error: any) {
    return { valid: false, error: error.message };
  }
}
