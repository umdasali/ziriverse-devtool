import type { CSSUnitInput, CSSUnitOutput } from "@/types/dev-tools";

/**
 * Convert pixels to rem units
 */
export function pxToRem(px: number, baseFontSize: number = 16): CSSUnitOutput {
  if (px <= 0) {
    return {
      result: "0rem",
      explanation: "Zero pixels equals zero rem",
    };
  }

  const rem = px / baseFontSize;
  const rounded = Math.round(rem * 1000) / 1000; // Round to 3 decimals

  return {
    result: `${rounded}rem`,
    formula: `${px}px ÷ ${baseFontSize}px = ${rounded}rem`,
    explanation: `With a base font size of ${baseFontSize}px, ${px}px equals ${rounded}rem`,
  };
}

/**
 * Generate fluid clamp() CSS function
 */
export function generateClamp(
  minSize: number,
  maxSize: number,
  minViewport: number,
  maxViewport: number,
  baseFontSize: number = 16
): CSSUnitOutput {
  // Validation
  if (minSize > maxSize) {
    return {
      result: "",
      error: "Minimum size cannot be greater than maximum size",
    };
  }

  if (minViewport >= maxViewport) {
    return {
      result: "",
      error: "Minimum viewport cannot be greater than or equal to maximum viewport",
    };
  }

  // Convert px to rem
  const minRem = minSize / baseFontSize;
  const maxRem = maxSize / baseFontSize;
  const minVw = minViewport / 100;
  const maxVw = maxViewport / 100;

  // Calculate slope and intercept
  // Formula: size = slope * viewport + intercept
  const slope = (maxSize - minSize) / (maxViewport - minViewport);
  const intercept = minSize - slope * minViewport;

  // Convert to rem
  const slopeVw = slope * 100; // Convert to vw units
  const interceptRem = intercept / baseFontSize;

  // Round values
  const minRemRounded = Math.round(minRem * 1000) / 1000;
  const maxRemRounded = Math.round(maxRem * 1000) / 1000;
  const slopeVwRounded = Math.round(slopeVw * 1000) / 1000;
  const interceptRemRounded = Math.round(interceptRem * 1000) / 1000;

  // Build clamp formula
  const preferredValue =
    interceptRemRounded >= 0
      ? `${interceptRemRounded}rem + ${slopeVwRounded}vw`
      : `${interceptRemRounded}rem + ${slopeVwRounded}vw`;

  const clampFormula = `clamp(${minRemRounded}rem, ${preferredValue}, ${maxRemRounded}rem)`;

  // Generate preview sizes
  const previewSizes = [];
  const viewportSteps = [320, 480, 768, 1024, 1280, 1536, 1920];

  for (const vp of viewportSteps) {
    if (vp < minViewport) {
      previewSizes.push({ viewport: vp, size: minSize });
    } else if (vp > maxViewport) {
      previewSizes.push({ viewport: vp, size: maxSize });
    } else {
      const calculatedSize = slope * vp + intercept;
      previewSizes.push({
        viewport: vp,
        size: Math.round(calculatedSize * 10) / 10,
      });
    }
  }

  return {
    result: clampFormula,
    formula: `clamp(MIN, PREFERRED, MAX)`,
    explanation: `Scales from ${minSize}px at ${minViewport}px viewport to ${maxSize}px at ${maxViewport}px viewport. The preferred value grows linearly between these breakpoints.`,
    previewSizes,
  };
}

/**
 * Calculate CSS unit conversion
 */
export function calculateCSSUnit(input: CSSUnitInput): CSSUnitOutput {
  if (input.mode === "px-to-rem") {
    const px = input.pxValue ?? 16;
    const base = input.baseFontSize ?? 16;
    return pxToRem(px, base);
  } else {
    const minSize = input.minSize ?? 16;
    const maxSize = input.maxSize ?? 32;
    const minVp = input.minViewport ?? 320;
    const maxVp = input.maxViewport ?? 1920;
    const base = input.baseFontSize ?? 16;

    return generateClamp(minSize, maxSize, minVp, maxVp, base);
  }
}

/**
 * Validate CSS unit input
 */
export function validateCSSInput(input: CSSUnitInput): {
  valid: boolean;
  error?: string;
} {
  if (input.mode === "px-to-rem") {
    if (input.pxValue === undefined || input.pxValue < 0) {
      return { valid: false, error: "Invalid pixel value" };
    }
    if (input.baseFontSize === undefined || input.baseFontSize <= 0) {
      return { valid: false, error: "Base font size must be greater than 0" };
    }
  } else {
    if (
      input.minSize === undefined ||
      input.maxSize === undefined ||
      input.minViewport === undefined ||
      input.maxViewport === undefined
    ) {
      return { valid: false, error: "All clamp fields are required" };
    }
    if (input.minSize > input.maxSize) {
      return { valid: false, error: "Min size cannot exceed max size" };
    }
    if (input.minViewport >= input.maxViewport) {
      return { valid: false, error: "Min viewport must be less than max viewport" };
    }
  }

  return { valid: true };
}
