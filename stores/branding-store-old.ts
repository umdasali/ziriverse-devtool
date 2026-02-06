import { create } from "zustand";
import type { BrandingState, BrandingPreset } from "@/types/branding";
import { defaultPreset } from "@/lib/branding/presets";

interface BrandingStore extends BrandingState {
  setFontFamily: (fontFamily: string) => void;
  setHeadingSize: (heading: keyof BrandingState["typography"]["headingSizes"], size: string) => void;
  setBodySize: (size: string) => void;
  setLineHeight: (lineHeight: string) => void;
  setFontWeight: (weight: keyof BrandingState["typography"]["fontWeights"], value: number) => void;
  setColor: (colorKey: keyof BrandingState["colors"], color: string) => void;
  setSpacing: (key: keyof BrandingState["spacing"], value: string) => void;
  setBorderRadius: (key: keyof BrandingState["borderRadius"], value: string) => void;
  loadPreset: (preset: BrandingPreset) => void;
  reset: () => void;
}

export const useBrandingStore = create<BrandingStore>((set) => ({
  ...defaultPreset.state,

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

  setFontWeight: (weight, value) =>
    set((state) => ({
      typography: {
        ...state.typography,
        fontWeights: { ...state.typography.fontWeights, [weight]: value },
      },
    })),

  setColor: (colorKey, color) =>
    set((state) => ({
      colors: { ...state.colors, [colorKey]: color },
    })),

  setSpacing: (key, value) =>
    set((state) => ({
      spacing: { ...state.spacing, [key]: value },
    })),

  setBorderRadius: (key, value) =>
    set((state) => ({
      borderRadius: { ...state.borderRadius, [key]: value },
    })),

  loadPreset: (preset) => set(preset.state),

  reset: () => set(defaultPreset.state),
}));
