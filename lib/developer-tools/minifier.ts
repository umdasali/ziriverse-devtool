export interface MinifyResult {
  output: string;
  originalSize: number;
  minifiedSize: number;
  savings: number;
  savingsPercent: number;
}

export function minifyCSS(input: string): MinifyResult {
  const originalSize = new Blob([input]).size;

  let output = input;
  // Remove comments
  output = output.replace(/\/\*[\s\S]*?\*\//g, "");
  // Remove newlines and extra whitespace
  output = output.replace(/\s+/g, " ");
  // Remove spaces around selectors and properties
  output = output.replace(/\s*([{}:;,>~+])\s*/g, "$1");
  // Remove trailing semicolons before closing braces
  output = output.replace(/;}/g, "}");
  // Remove leading/trailing whitespace
  output = output.trim();

  const minifiedSize = new Blob([output]).size;
  const savings = originalSize - minifiedSize;
  const savingsPercent = originalSize > 0 ? (savings / originalSize) * 100 : 0;

  return { output, originalSize, minifiedSize, savings, savingsPercent };
}

export function minifyHTML(input: string): MinifyResult {
  const originalSize = new Blob([input]).size;

  let output = input;
  // Remove HTML comments (but keep conditional comments)
  output = output.replace(/<!--(?!\[if)[\s\S]*?-->/g, "");
  // Collapse whitespace between tags
  output = output.replace(/>\s+</g, "><");
  // Collapse multiple spaces to one
  output = output.replace(/\s{2,}/g, " ");
  // Remove leading/trailing whitespace on lines
  output = output
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .join("");

  const minifiedSize = new Blob([output]).size;
  const savings = originalSize - minifiedSize;
  const savingsPercent = originalSize > 0 ? (savings / originalSize) * 100 : 0;

  return { output, originalSize, minifiedSize, savings, savingsPercent };
}

export function minifyJS(input: string): MinifyResult {
  const originalSize = new Blob([input]).size;

  let output = input;
  // Remove single-line comments (but not URLs with //)
  output = output.replace(/(?<=[^:])\/\/.*$/gm, "");
  // Remove multi-line comments
  output = output.replace(/\/\*[\s\S]*?\*\//g, "");
  // Collapse whitespace
  output = output.replace(/\s+/g, " ");
  // Remove spaces around operators
  output = output.replace(/\s*([=+\-*/<>!&|,;{}()[\]:?])\s*/g, "$1");
  // Remove trailing whitespace
  output = output.trim();

  const minifiedSize = new Blob([output]).size;
  const savings = originalSize - minifiedSize;
  const savingsPercent = originalSize > 0 ? (savings / originalSize) * 100 : 0;

  return { output, originalSize, minifiedSize, savings, savingsPercent };
}
