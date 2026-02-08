/**
 * Color palette generation functions based on color theory harmonies.
 */

import { hexToHSL, hslToHex } from "./color-utils";

export type HarmonyType =
  | "complementary"
  | "analogous"
  | "triadic"
  | "tetradic"
  | "split-complementary"
  | "monochromatic";

export interface PaletteColor {
  hex: string;
  name: string;
}

/** Normalize a hue value to 0-359 range. */
function normalizeHue(hue: number): number {
  return ((hue % 360) + 360) % 360;
}

/** Clamp a value between min and max. */
function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/**
 * Generate a color palette based on color harmony theory from a base color.
 *
 * Harmony types:
 * - Complementary: base + 180 degree rotation
 * - Analogous: base + 30 degree offsets on each side
 * - Triadic: base + 120 degree + 240 degree rotations
 * - Tetradic: base + 90 + 180 + 270 degree rotations
 * - Split-complementary: base + 150 + 210 degree rotations
 * - Monochromatic: same hue at different saturation/lightness levels
 */
export function generatePalette(baseColor: string, harmony: HarmonyType): PaletteColor[] {
  const { h, s, l } = hexToHSL(baseColor);

  switch (harmony) {
    case "complementary":
      return [
        { hex: baseColor, name: "Primary" },
        { hex: hslToHex(normalizeHue(h + 180), s, l), name: "Complement" },
      ];

    case "analogous":
      return [
        { hex: hslToHex(normalizeHue(h - 30), s, l), name: "Analogous Left" },
        { hex: baseColor, name: "Primary" },
        { hex: hslToHex(normalizeHue(h + 30), s, l), name: "Analogous Right" },
      ];

    case "triadic":
      return [
        { hex: baseColor, name: "Primary" },
        { hex: hslToHex(normalizeHue(h + 120), s, l), name: "Triadic A" },
        { hex: hslToHex(normalizeHue(h + 240), s, l), name: "Triadic B" },
      ];

    case "tetradic":
      return [
        { hex: baseColor, name: "Primary" },
        { hex: hslToHex(normalizeHue(h + 90), s, l), name: "Tetradic A" },
        { hex: hslToHex(normalizeHue(h + 180), s, l), name: "Tetradic B" },
        { hex: hslToHex(normalizeHue(h + 270), s, l), name: "Tetradic C" },
      ];

    case "split-complementary":
      return [
        { hex: baseColor, name: "Primary" },
        { hex: hslToHex(normalizeHue(h + 150), s, l), name: "Split A" },
        { hex: hslToHex(normalizeHue(h + 210), s, l), name: "Split B" },
      ];

    case "monochromatic":
      return [
        { hex: hslToHex(h, clamp(s - 20, 0, 100), clamp(l + 30, 0, 100)), name: "Lightest" },
        { hex: hslToHex(h, clamp(s - 10, 0, 100), clamp(l + 15, 0, 100)), name: "Light" },
        { hex: baseColor, name: "Primary" },
        { hex: hslToHex(h, clamp(s + 10, 0, 100), clamp(l - 15, 0, 100)), name: "Dark" },
        { hex: hslToHex(h, clamp(s + 20, 0, 100), clamp(l - 30, 0, 100)), name: "Darkest" },
      ];

    default:
      return [{ hex: baseColor, name: "Primary" }];
  }
}

/**
 * Generate shades and tints of a color.
 * Returns 11 colors: 5 lighter tints, the base color, and 5 darker shades.
 * Ordered from lightest to darkest.
 */
export function generateShades(hex: string): string[] {
  const { h, s, l } = hexToHSL(hex);
  const shades: string[] = [];

  // 5 tints (lighter), stepping toward lightness 95
  for (let i = 5; i >= 1; i--) {
    const tintL = clamp(l + i * ((95 - l) / 5), 0, 100);
    const tintS = clamp(s - i * 3, 0, 100);
    shades.push(hslToHex(h, tintS, tintL));
  }

  // Base color
  shades.push(hex);

  // 5 shades (darker), stepping toward lightness 5
  for (let i = 1; i <= 5; i++) {
    const shadeL = clamp(l - i * ((l - 5) / 5), 0, 100);
    const shadeS = clamp(s + i * 2, 0, 100);
    shades.push(hslToHex(h, shadeS, shadeL));
  }

  return shades;
}

/** Export palette as CSS custom properties. */
export function exportPaletteCSS(colors: PaletteColor[]): string {
  const lines = [
    "/* Generated Color Palette */",
    ":root {",
  ];

  colors.forEach((color) => {
    const varName = color.name.toLowerCase().replace(/\s+/g, "-");
    lines.push(`  --color-${varName}: ${color.hex};`);
  });

  lines.push("}");
  return lines.join("\n");
}

/** Export palette as SCSS variables. */
export function exportPaletteSCSS(colors: PaletteColor[]): string {
  const lines = ["// Generated Color Palette"];

  colors.forEach((color) => {
    const varName = color.name.toLowerCase().replace(/\s+/g, "-");
    lines.push(`$color-${varName}: ${color.hex};`);
  });

  return lines.join("\n");
}

/** Export palette as a JSON string. */
export function exportPaletteJSON(colors: PaletteColor[]): string {
  const obj: Record<string, string> = {};

  colors.forEach((color) => {
    const key = color.name.toLowerCase().replace(/\s+/g, "_");
    obj[key] = color.hex;
  });

  return JSON.stringify(obj, null, 2);
}
