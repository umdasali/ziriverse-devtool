export interface JSONFormatResult {
  formatted: string;
  isValid: boolean;
  error?: string;
  stats: {
    keys: number;
    depth: number;
    size: number;
  };
}

function countKeys(obj: unknown, depth = 0): { keys: number; maxDepth: number } {
  if (typeof obj !== "object" || obj === null) return { keys: 0, maxDepth: depth };

  let keys = 0;
  let maxDepth = depth;

  if (Array.isArray(obj)) {
    for (const item of obj) {
      const result = countKeys(item, depth + 1);
      keys += result.keys;
      maxDepth = Math.max(maxDepth, result.maxDepth);
    }
  } else {
    const entries = Object.entries(obj);
    keys = entries.length;
    for (const [, value] of entries) {
      const result = countKeys(value, depth + 1);
      keys += result.keys;
      maxDepth = Math.max(maxDepth, result.maxDepth);
    }
  }

  return { keys, maxDepth };
}

export function formatJSON(input: string, indent: number = 2): JSONFormatResult {
  if (!input.trim()) {
    return { formatted: "", isValid: false, error: "Input is empty", stats: { keys: 0, depth: 0, size: 0 } };
  }

  try {
    const parsed = JSON.parse(input);
    const formatted = JSON.stringify(parsed, null, indent);
    const { keys, maxDepth } = countKeys(parsed);

    return {
      formatted,
      isValid: true,
      stats: {
        keys,
        depth: maxDepth,
        size: new Blob([formatted]).size,
      },
    };
  } catch (e) {
    const error = e instanceof Error ? e.message : "Invalid JSON";
    return { formatted: input, isValid: false, error, stats: { keys: 0, depth: 0, size: 0 } };
  }
}

export function minifyJSON(input: string): JSONFormatResult {
  try {
    const parsed = JSON.parse(input);
    const minified = JSON.stringify(parsed);
    const { keys, maxDepth } = countKeys(parsed);

    return {
      formatted: minified,
      isValid: true,
      stats: {
        keys,
        depth: maxDepth,
        size: new Blob([minified]).size,
      },
    };
  } catch (e) {
    const error = e instanceof Error ? e.message : "Invalid JSON";
    return { formatted: input, isValid: false, error, stats: { keys: 0, depth: 0, size: 0 } };
  }
}
