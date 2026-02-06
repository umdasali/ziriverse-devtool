import { create } from "zustand";
import type {
  BrandingState,
  BrandingPreset,
  ColorPalette,
  DarkModeColors,
  ShadowSystem,
  AnimationSettings,
  GridSystem,
  Breakpoints,
  ZIndexScale,
} from "@/types/branding";

// Default state
const defaultState: BrandingState = {
  typography: {
    fontFamily: "Inter, system-ui, sans-serif",
    headingSizes: {
      h1: "3rem",
      h2: "2.5rem",
      h3: "2rem",
      h4: "1.5rem",
      h5: "1.25rem",
      h6: "1rem",
    },
    bodySize: "1rem",
    lineHeight: "1.6",
    letterSpacing: {
      tight: "-0.025em",
      normal: "0",
      wide: "0.025em",
    },
    fontWeights: {
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
  },
  colors: {
    primary: "#3b82f6",
    secondary: "#64748b",
    accent: "#10b981",
    success: "#22c55e",
    warning: "#f59e0b",
    error: "#ef4444",
    info: "#06b6d4",
    background: "#ffffff",
    text: "#1f2937",
    border: "#e5e7eb",
    muted: "#6b7280",
  },
  darkMode: {
    primary: "#60a5fa",
    secondary: "#94a3b8",
    accent: "#34d399",
    success: "#4ade80",
    warning: "#fbbf24",
    error: "#f87171",
    info: "#22d3ee",
    background: "#0f172a",
    text: "#f1f5f9",
    border: "#334155",
    muted: "#94a3b8",
  },
  spacing: {
    xs: "0.25rem",
    sm: "0.5rem",
    md: "1rem",
    lg: "1.5rem",
    xl: "2rem",
    "2xl": "3rem",
    "3xl": "4rem",
    "4xl": "6rem",
  },
  borderRadius: {
    none: "0",
    sm: "0.25rem",
    md: "0.5rem",
    lg: "0.75rem",
    xl: "1rem",
    full: "9999px",
  },
  shadows: {
    sm: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
    md: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
    lg: "0 10px 15px -3px rgb(0 0 0 / 0.1)",
    xl: "0 20px 25px -5px rgb(0 0 0 / 0.1)",
    "2xl": "0 25px 50px -12px rgb(0 0 0 / 0.25)",
    inner: "inset 0 2px 4px 0 rgb(0 0 0 / 0.05)",
  },
  animation: {
    duration: {
      fast: "150ms",
      normal: "300ms",
      slow: "500ms",
    },
    easing: {
      linear: "linear",
      easeIn: "cubic-bezier(0.4, 0, 1, 1)",
      easeOut: "cubic-bezier(0, 0, 0.2, 1)",
      easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)",
    },
  },
  grid: {
    columns: 12,
    gap: "1.5rem",
    containerMaxWidth: "1280px",
  },
  breakpoints: {
    sm: "640px",
    md: "768px",
    lg: "1024px",
    xl: "1280px",
    "2xl": "1536px",
  },
  zIndex: {
    dropdown: 1000,
    sticky: 1020,
    fixed: 1030,
    modal: 1040,
    popover: 1050,
    tooltip: 1060,
  },
  isDarkMode: false,
};

interface BrandingStore extends BrandingState {
  // Typography actions
  setFontFamily: (fontFamily: string) => void;
  setHeadingSize: (heading: keyof BrandingState["typography"]["headingSizes"], size: string) => void;
  setBodySize: (size: string) => void;
  setLineHeight: (lineHeight: string) => void;
  setLetterSpacing: (key: keyof BrandingState["typography"]["letterSpacing"], value: string) => void;
  setFontWeight: (weight: keyof BrandingState["typography"]["fontWeights"], value: number) => void;

  // Color actions
  setColor: (colorKey: keyof ColorPalette, color: string) => void;
  setDarkModeColor: (colorKey: keyof DarkModeColors, color: string) => void;
  toggleDarkMode: () => void;

  // Spacing actions
  setSpacing: (key: keyof BrandingState["spacing"], value: string) => void;
  setBorderRadius: (key: keyof BrandingState["borderRadius"], value: string) => void;

  // Shadow actions
  setShadow: (key: keyof ShadowSystem, value: string) => void;

  // Animation actions
  setAnimationDuration: (key: keyof AnimationSettings["duration"], value: string) => void;
  setAnimationEasing: (key: keyof AnimationSettings["easing"], value: string) => void;

  // Grid actions
  setGridColumns: (columns: number) => void;
  setGridGap: (gap: string) => void;
  setContainerMaxWidth: (maxWidth: string) => void;

  // Breakpoint actions
  setBreakpoint: (key: keyof Breakpoints, value: string) => void;

  // Z-index actions
  setZIndex: (key: keyof ZIndexScale, value: number) => void;

  // Preset and state management
  loadPreset: (preset: BrandingPreset) => void;
  loadState: (state: BrandingState) => void;
  reset: () => void;
  exportState: () => BrandingState;
}

export const useBrandingStore = create<BrandingStore>((set, get) => ({
  ...defaultState,

  // Typography
  setFontFamily: (fontFamily) =>
    set((state) => ({
      typography: { ...state.typography, fontFamily },
    })),

  setHeadingSize: (heading, size) =>
    set((state) => ({
      typography: {
        ...state.typography,
        headingSizes: { ...state.typography.headingSizes, [heading]: size },
      },
    })),

  setBodySize: (size) =>
    set((state) => ({
      typography: { ...state.typography, bodySize: size },
    })),

  setLineHeight: (lineHeight) =>
    set((state) => ({
      typography: { ...state.typography, lineHeight },
    })),

  setLetterSpacing: (key, value) =>
    set((state) => ({
      typography: {
        ...state.typography,
        letterSpacing: { ...state.typography.letterSpacing, [key]: value },
      },
    })),

  setFontWeight: (weight, value) =>
    set((state) => ({
      typography: {
        ...state.typography,
        fontWeights: { ...state.typography.fontWeights, [weight]: value },
      },
    })),

  // Colors
  setColor: (colorKey, color) =>
    set((state) => ({
      colors: { ...state.colors, [colorKey]: color },
    })),

  setDarkModeColor: (colorKey, color) =>
    set((state) => ({
      darkMode: { ...state.darkMode, [colorKey]: color },
    })),

  toggleDarkMode: () =>
    set((state) => ({
      isDarkMode: !state.isDarkMode,
    })),

  // Spacing
  setSpacing: (key, value) =>
    set((state) => ({
      spacing: { ...state.spacing, [key]: value },
    })),

  setBorderRadius: (key, value) =>
    set((state) => ({
      borderRadius: { ...state.borderRadius, [key]: value },
    })),

  // Shadows
  setShadow: (key, value) =>
    set((state) => ({
      shadows: { ...state.shadows, [key]: value },
    })),

  // Animation
  setAnimationDuration: (key, value) =>
    set((state) => ({
      animation: {
        ...state.animation,
        duration: { ...state.animation.duration, [key]: value },
      },
    })),

  setAnimationEasing: (key, value) =>
    set((state) => ({
      animation: {
        ...state.animation,
        easing: { ...state.animation.easing, [key]: value },
      },
    })),

  // Grid
  setGridColumns: (columns) =>
    set((state) => ({
      grid: { ...state.grid, columns },
    })),

  setGridGap: (gap) =>
    set((state) => ({
      grid: { ...state.grid, gap },
    })),

  setContainerMaxWidth: (maxWidth) =>
    set((state) => ({
      grid: { ...state.grid, containerMaxWidth: maxWidth },
    })),

  // Breakpoints
  setBreakpoint: (key, value) =>
    set((state) => ({
      breakpoints: { ...state.breakpoints, [key]: value },
    })),

  // Z-index
  setZIndex: (key, value) =>
    set((state) => ({
      zIndex: { ...state.zIndex, [key]: value },
    })),

  // State management
  loadPreset: (preset) => set(preset.state),

  loadState: (state) => set(state),

  reset: () => set(defaultState),

  exportState: () => {
    const state = get();
    return {
      typography: state.typography,
      colors: state.colors,
      darkMode: state.darkMode,
      spacing: state.spacing,
      borderRadius: state.borderRadius,
      shadows: state.shadows,
      animation: state.animation,
      grid: state.grid,
      breakpoints: state.breakpoints,
      zIndex: state.zIndex,
      isDarkMode: state.isDarkMode,
    };
  },
}));
