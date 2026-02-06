// Type Definitions for Developer Tools

// ==================== SHARED TYPES ====================

export interface ToolHistoryEntry {
  id: string;
  tool: "json-to-ts" | "css-converter" | "svg-visualizer" | "regex-tester";
  timestamp: number;
  input: string;
  output: string;
  metadata?: Record<string, any>;
}

// ==================== JSON TO TYPESCRIPT ====================

export interface JSONToTSOptions {
  outputType: "interface" | "type";
  useExport: boolean;
  makeOptional: boolean;
  makeReadonly: boolean;
  includeComments: boolean;
  rootTypeName: string;
}

export interface JSONToTSInput {
  jsonString: string;
  options: JSONToTSOptions;
}

export interface JSONToTSOutput {
  typescript: string;
  error?: string;
}

export type JSONValue =
  | string
  | number
  | boolean
  | null
  | JSONValue[]
  | { [key: string]: JSONValue };

// ==================== CSS UNIT CONVERTER ====================

export interface CSSUnitInput {
  mode: "px-to-rem" | "clamp";
  // px-to-rem fields
  pxValue?: number;
  baseFontSize?: number;
  // clamp fields
  minSize?: number;
  maxSize?: number;
  minViewport?: number;
  maxViewport?: number;
}

export interface CSSUnitOutput {
  result: string;
  formula?: string;
  explanation?: string;
  previewSizes?: { viewport: number; size: number }[];
  error?: string;
}

// ==================== SVG PATH VISUALIZER ====================

export interface SVGPathInput {
  pathData: string;
  scale: number;
  viewBox: string;
}

export interface SVGPathOutput {
  commands: PathCommand[];
  optimizedPath?: string;
  error?: string;
}

export interface PathCommand {
  type: string; // M, L, C, S, Q, T, A, Z
  coordinates: number[];
  explanation: string;
  absoluteCoords?: { x: number; y: number }[];
}

export interface SVGOptimizeOptions {
  removeRedundant: boolean;
  roundDecimals: number;
  convertToRelative: boolean;
}

// ==================== REGEX TESTER ====================

export interface RegexInput {
  pattern: string;
  flags: {
    global: boolean;
    caseInsensitive: boolean;
    multiline: boolean;
    dotAll: boolean;
    unicode: boolean;
    sticky: boolean;
  };
  testString: string;
  mode: "match" | "replace";
  replacement?: string;
}

export interface RegexOutput {
  matches: RegexMatch[];
  explanation: RegexExplanation[];
  replacedText?: string;
  error?: string;
}

export interface RegexMatch {
  match: string;
  index: number;
  groups?: string[];
  length: number;
}

export interface RegexExplanation {
  token: string;
  type:
    | "character-class"
    | "quantifier"
    | "anchor"
    | "group"
    | "literal"
    | "escape"
    | "alternation"
    | "assertion";
  explanation: string;
  example?: string;
}

// ==================== CODE FORMATTER ====================

export type CodeLanguage = "typescript" | "css" | "json" | "svg" | "regex";

export interface CodeFormatOptions {
  language: CodeLanguage;
  showLineNumbers: boolean;
  highlightLines?: number[];
  theme?: "light" | "dark";
}
