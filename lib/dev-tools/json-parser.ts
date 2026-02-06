import type {
  JSONToTSOptions,
  JSONToTSOutput,
  JSONValue,
} from "@/types/dev-tools";

/**
 * Convert JSON to TypeScript interface or type alias
 */
export function jsonToTypeScript(
  jsonString: string,
  options: JSONToTSOptions
): JSONToTSOutput {
  try {
    // Parse JSON
    const parsed: JSONValue = JSON.parse(jsonString);

    // Generate TypeScript definition
    const typescript = buildTypeDefinition(
      options.rootTypeName,
      parsed,
      options,
      0
    );

    return { typescript };
  } catch (error: any) {
    return {
      typescript: "",
      error: `Invalid JSON: ${error.message}`,
    };
  }
}

/**
 * Recursively build TypeScript type definition
 */
function buildTypeDefinition(
  name: string,
  value: JSONValue,
  options: JSONToTSOptions,
  depth: number
): string {
  // Prevent infinite recursion
  if (depth > 10) {
    return "any; // Max depth exceeded";
  }

  const indent = "  ".repeat(depth);
  const exportKeyword = options.useExport && depth === 0 ? "export " : "";
  const keyword = options.outputType === "interface" ? "interface" : "type";
  const readonly = options.makeReadonly ? "readonly " : "";

  // Handle null
  if (value === null) {
    return "null";
  }

  // Handle primitives
  if (typeof value !== "object") {
    return typeof value;
  }

  // Handle arrays
  if (Array.isArray(value)) {
    if (value.length === 0) {
      return "any[]";
    }

    // Analyze array element types
    const types = new Set<string>();
    for (const item of value) {
      if (item === null) {
        types.add("null");
      } else if (typeof item === "object" && !Array.isArray(item)) {
        types.add("object");
      } else if (Array.isArray(item)) {
        types.add("array");
      } else {
        types.add(typeof item);
      }
    }

    // Homogeneous array
    if (types.size === 1) {
      const type = types.values().next().value;
      if (type === "object") {
        const nestedType = buildTypeDefinition(
          `${name}Item`,
          value[0],
          options,
          depth + 1
        );
        return `${name}Item[]`;
      } else if (type === "array") {
        return "any[][]";
      } else {
        return `${type}[]`;
      }
    }

    // Mixed-type array
    return "any[]";
  }

  // Handle objects
  const properties: string[] = [];
  const nestedTypes: string[] = [];

  for (const [key, val] of Object.entries(value)) {
    const optional = options.makeOptional ? "?" : "";
    let propType: string;

    if (val === null) {
      propType = "null";
    } else if (Array.isArray(val)) {
      if (val.length === 0) {
        propType = "any[]";
      } else {
        const firstItem = val[0];
        if (typeof firstItem === "object" && firstItem !== null && !Array.isArray(firstItem)) {
          // Nested object array
          const capitalizedKey = capitalize(key);
          const nestedName = capitalizedKey.endsWith("s")
            ? capitalizedKey.slice(0, -1)
            : `${capitalizedKey}Item`;

          nestedTypes.push(
            buildTypeDefinition(nestedName, firstItem, options, depth + 1)
          );
          propType = `${nestedName}[]`;
        } else {
          propType = `${typeof firstItem}[]`;
        }
      }
    } else if (typeof val === "object") {
      // Nested object
      const capitalizedKey = capitalize(key);
      nestedTypes.push(
        buildTypeDefinition(capitalizedKey, val, options, depth + 1)
      );
      propType = capitalizedKey;
    } else {
      propType = typeof val;
    }

    const comment = options.includeComments
      ? ` // ${typeof val === "object" ? "nested object" : `example: ${JSON.stringify(val)}`}`
      : "";

    properties.push(`${indent}  ${readonly}${key}${optional}: ${propType};${comment}`);
  }

  // Build the main type definition
  let result = "";

  // Add nested types first
  if (nestedTypes.length > 0) {
    result += nestedTypes.join("\n\n") + "\n\n";
  }

  // Add main type
  if (options.outputType === "interface") {
    result += `${exportKeyword}${keyword} ${name} {\n${properties.join("\n")}\n${indent}}`;
  } else {
    result += `${exportKeyword}${keyword} ${name} = {\n${properties.join("\n")}\n${indent}}`;
  }

  return result;
}

/**
 * Capitalize first letter
 */
function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Validate JSON syntax
 */
export function validateJSON(jsonString: string): {
  valid: boolean;
  error?: string;
} {
  try {
    JSON.parse(jsonString);
    return { valid: true };
  } catch (error: any) {
    return { valid: false, error: error.message };
  }
}
