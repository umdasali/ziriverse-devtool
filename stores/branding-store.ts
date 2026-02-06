import { create } from "zustand";
import type { BrandingState, BrandingPreset } from "@/types/branding";
import { defaultPreset } from "@/lib/branding/presets";

interface BrandingStore extends BrandingState {
  // Typography actions
  setFontFamily: (fontFamily: string) => void;
  setHeadingSize: (heading: keyof BrandingState["typography"]["headingSizes"], size: string) => void;
  setBodySize: (size: string) => void;
  setLineHeight: (lineHeight: string) => void;
  setLetterSpacing: (key: keyof BrandingState["typography"]["letterSpacing"], value: string) => void;
  setFontWeight: (weight: keyof BrandingState["typography"]["fontWeights"], value: number) => void;

  // Color actions
  setColor: (colorKey: keyof BrandingState["colors"], color: string) => void;
  setDarkModeColor: (colorKey: keyof BrandingState["darkMode"], color: string) => void;
  toggleDarkMode: () => void;

  // Spacing & Layout actions
  setSpacing: (key: keyof BrandingState["spacing"], value: string) => void;
  setBorderRadius: (key: keyof BrandingState["borderRadius"], value: string) => void;

  // Shadow actions
  setShadow: (key: keyof BrandingState["shadows"], value: string) => void;

  // Animation actions
  setAnimationDuration: (key: keyof BrandingState["animation"]["duration"], value: string) => void;
  setAnimationEasing: (key: keyof BrandingState["animation"]["easing"], value: string) => void;

  // Grid actions
  setGridColumns: (columns: number) => void;
  setGridGap: (gap: string) => void;
  setContainerMaxWidth: (maxWidth: string) => void;

  // Breakpoint actions
  setBreakpoint: (key: keyof BrandingState["breakpoints"], value: string) => void;

  // Z-Index actions
  setZIndex: (key: keyof BrandingState["zIndex"], value: number) => void;

  // Preset & State management
  loadPreset: (preset: BrandingPreset) => void;
  reset: () => void;
  exportState: () => BrandingState;
  loadState: (state: BrandingState) => void;
}

export const useBrandingStore = create<BrandingStore>((set, get) => ({
  ...defaultPreset.state,

  // Typography actions
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

  // Color actions
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

  // Spacing & Layout actions
  setSpacing: (key, value) =>
    set((state) => ({
      spacing: { ...state.spacing, [key]: value },
    })),

  setBorderRadius: (key, value) =>
    set((state) => ({
      borderRadius: { ...state.borderRadius, [key]: value },
    })),

  // Shadow actions
  setShadow: (key, value) =>
    set((state) => ({
      shadows: { ...state.shadows, [key]: value },
    })),

  // Animation actions
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

  // Grid actions
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

  // Breakpoint actions
  setBreakpoint: (key, value) =>
    set((state) => ({
      breakpoints: { ...state.breakpoints, [key]: value },
    })),

  // Z-Index actions
  setZIndex: (key, value) =>
    set((state) => ({
      zIndex: { ...state.zIndex, [key]: value },
    })),

  // Preset & State management
  loadPreset: (preset) => set(preset.state),

  reset: () => set(defaultPreset.state),

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

  loadState: (state) => set(state),
}));
