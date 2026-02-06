import type { CodeLanguage, CodeFormatOptions } from "@/types/dev-tools";

/**
 * Apply basic syntax highlighting to code
 * Note: This is a simple implementation. For production, use a library like Prism.js
 */
export function highlightCode(
  code: string,
  language: CodeLanguage
): string {
  // For now, return the code as-is
  // In a production app, you would use a syntax highlighting library
  return code;
}

/**
 * Format code with line numbers
 */
export function formatWithLineNumbers(code: string): string {
  const lines = code.split("\n");
  return lines
    .map((line, index) => {
      const lineNum = (index + 1).toString().padStart(3, " ");
      return `${lineNum} | ${line}`;
    })
    .join("\n");
}

/**
 * Copy text to clipboard
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (error) {
    console.error("Failed to copy to clipboard:", error);
    return false;
  }
}

/**
 * Download text as file
 */
export function downloadFile(
  content: string,
  filename: string,
  mimeType: string = "text/plain"
): void {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Get file extension for language
 */
export function getFileExtension(language: CodeLanguage): string {
  const extensions: Record<CodeLanguage, string> = {
    typescript: "ts",
    css: "css",
    json: "json",
    svg: "svg",
    regex: "txt",
  };
  return extensions[language] || "txt";
}
