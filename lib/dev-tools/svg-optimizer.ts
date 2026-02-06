import type {
  SVGPathInput,
  SVGPathOutput,
  PathCommand,
  SVGOptimizeOptions,
} from "@/types/dev-tools";

/**
 * Parse SVG path data into commands
 */
export function parseSVGPath(pathData: string): SVGPathOutput {
  try {
    const commands: PathCommand[] = [];

    // Regex to match SVG path commands
    const commandRegex = /([MmLlHhVvCcSsQqTtAaZz])([\d\s,.-]*)/g;
    let match;
    let currentX = 0;
    let currentY = 0;

    while ((match = commandRegex.exec(pathData)) !== null) {
      const type = match[1];
      const coordsStr = match[2].trim();

      // Parse coordinates
      const coords = coordsStr
        ? coordsStr
            .split(/[\s,]+/)
            .filter((c) => c.length > 0)
            .map((c) => parseFloat(c))
        : [];

      // Build command object
      const command: PathCommand = {
        type,
        coordinates: coords,
        explanation: getCommandExplanation(type, coords),
      };

      // Calculate absolute coordinates for visualization
      const absoluteCoords = calculateAbsoluteCoords(
        type,
        coords,
        currentX,
        currentY
      );

      if (absoluteCoords.length > 0) {
        command.absoluteCoords = absoluteCoords;
        // Update current position
        const lastCoord = absoluteCoords[absoluteCoords.length - 1];
        currentX = lastCoord.x;
        currentY = lastCoord.y;
      }

      commands.push(command);
    }

    if (commands.length === 0) {
      return {
        commands: [],
        error: "No valid path commands found",
      };
    }

    return { commands };
  } catch (error: any) {
    return {
      commands: [],
      error: `Parse error: ${error.message}`,
    };
  }
}

/**
 * Get human-readable explanation for path command
 */
function getCommandExplanation(type: string, coords: number[]): string {
  const cmd = type.toUpperCase();
  const isRelative = type !== cmd;

  switch (cmd) {
    case "M":
      return `${isRelative ? "Relative move" : "Move"} to (${coords[0]}, ${coords[1]})`;
    case "L":
      return `${isRelative ? "Relative line" : "Line"} to (${coords[0]}, ${coords[1]})`;
    case "H":
      return `${isRelative ? "Relative horizontal" : "Horizontal"} line to x=${coords[0]}`;
    case "V":
      return `${isRelative ? "Relative vertical" : "Vertical"} line to y=${coords[0]}`;
    case "C":
      return `${isRelative ? "Relative cubic" : "Cubic"} Bézier curve`;
    case "S":
      return `${isRelative ? "Relative smooth cubic" : "Smooth cubic"} Bézier`;
    case "Q":
      return `${isRelative ? "Relative quadratic" : "Quadratic"} Bézier curve`;
    case "T":
      return `${isRelative ? "Relative smooth quadratic" : "Smooth quadratic"} Bézier`;
    case "A":
      return `${isRelative ? "Relative arc" : "Arc"}`;
    case "Z":
      return "Close path";
    default:
      return `Unknown command: ${type}`;
  }
}

/**
 * Calculate absolute coordinates from relative commands
 */
function calculateAbsoluteCoords(
  type: string,
  coords: number[],
  currentX: number,
  currentY: number
): { x: number; y: number }[] {
  const cmd = type.toUpperCase();
  const isRelative = type !== cmd;
  const result: { x: number; y: number }[] = [];

  switch (cmd) {
    case "M":
    case "L":
      if (coords.length >= 2) {
        result.push({
          x: isRelative ? currentX + coords[0] : coords[0],
          y: isRelative ? currentY + coords[1] : coords[1],
        });
      }
      break;
    case "H":
      if (coords.length >= 1) {
        result.push({
          x: isRelative ? currentX + coords[0] : coords[0],
          y: currentY,
        });
      }
      break;
    case "V":
      if (coords.length >= 1) {
        result.push({
          x: currentX,
          y: isRelative ? currentY + coords[0] : coords[0],
        });
      }
      break;
    case "C":
      if (coords.length >= 6) {
        // Control point 1, Control point 2, End point
        result.push({
          x: isRelative ? currentX + coords[4] : coords[4],
          y: isRelative ? currentY + coords[5] : coords[5],
        });
      }
      break;
    case "S":
    case "Q":
      if (coords.length >= 4) {
        result.push({
          x: isRelative ? currentX + coords[2] : coords[2],
          y: isRelative ? currentY + coords[3] : coords[3],
        });
      }
      break;
    case "T":
      if (coords.length >= 2) {
        result.push({
          x: isRelative ? currentX + coords[0] : coords[0],
          y: isRelative ? currentY + coords[1] : coords[1],
        });
      }
      break;
    case "A":
      if (coords.length >= 7) {
        result.push({
          x: isRelative ? currentX + coords[5] : coords[5],
          y: isRelative ? currentY + coords[6] : coords[6],
        });
      }
      break;
    case "Z":
      // Close path - no coordinates
      break;
  }

  return result;
}

/**
 * Optimize SVG path
 */
export function optimizeSVGPath(
  pathData: string,
  options: SVGOptimizeOptions
): string {
  let optimized = pathData;

  // Remove redundant whitespace
  if (options.removeRedundant) {
    optimized = optimized.replace(/\s+/g, " ").trim();
  }

  // Round decimal values
  if (options.roundDecimals >= 0) {
    optimized = optimized.replace(/\d+\.\d+/g, (match) => {
      const num = parseFloat(match);
      return num.toFixed(options.roundDecimals);
    });
  }

  // Convert to relative coordinates (basic implementation)
  if (options.convertToRelative) {
    // This is a simplified conversion
    // Full implementation would require state tracking
    optimized = optimized.replace(/([MLHVCSQTA])/g, (match) =>
      match.toLowerCase()
    );
  }

  return optimized;
}

/**
 * Validate SVG path syntax
 */
export function validateSVGPath(pathData: string): {
  valid: boolean;
  error?: string;
} {
  if (!pathData || pathData.trim().length === 0) {
    return { valid: false, error: "Path data cannot be empty" };
  }

  // Check if path starts with M or m
  const trimmed = pathData.trim();
  if (!/^[Mm]/.test(trimmed)) {
    return {
      valid: false,
      error: "Path must start with M (move) command",
    };
  }

  // Basic validation - check for valid command letters
  const validCommands = /^[MmLlHhVvCcSsQqTtAaZz\d\s,.-]+$/;
  if (!validCommands.test(pathData)) {
    return {
      valid: false,
      error: "Path contains invalid characters",
    };
  }

  return { valid: true };
}
