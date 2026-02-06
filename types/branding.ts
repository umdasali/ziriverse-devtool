export interface TypographySettings {
  fontFamily: string;
  headingSizes: {
    h1: string;
    h2: string;
    h3: string;
    h4: string;
    h5: string;
    h6: string;
  };
  bodySize: string;
  lineHeight: string;
  letterSpacing: {
    tight: string;
    normal: string;
    wide: string;
  };
  fontWeights: {
    light: number;
    normal: number;
    medium: number;
    semibold: number;
    bold: number;
  };
}

export interface ColorPalette {
  primary: string;
  secondary: string;
  accent: string;
  success: string;
  warning: string;
  error: string;
  info: string;
  background: string;
  text: string;
  border: string;
  muted: string;
}

export interface DarkModeColors {
  primary: string;
  secondary: string;
  accent: string;
  success: string;
  warning: string;
  error: string;
  info: string;
  background: string;
  text: string;
  border: string;
  muted: string;
}

export interface SpacingScale {
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  "2xl": string;
  "3xl": string;
  "4xl": string;
}

export interface BorderRadius {
  none: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  full: string;
}

export interface ShadowSystem {
  sm: string;
  md: string;
  lg: string;
  xl: string;
  "2xl": string;
  inner: string;
}

export interface AnimationSettings {
  duration: {
    fast: string;
    normal: string;
    slow: string;
  };
  easing: {
    linear: string;
    easeIn: string;
    easeOut: string;
    easeInOut: string;
  };
}

export interface GridSystem {
  columns: number;
  gap: string;
  containerMaxWidth: string;
}

export interface Breakpoints {
  sm: string;
  md: string;
  lg: string;
  xl: string;
  "2xl": string;
}

export interface ZIndexScale {
  dropdown: number;
  sticky: number;
  fixed: number;
  modal: number;
  popover: number;
  tooltip: number;
}

export interface AccessibilityCheck {
  contrastRatio: number;
  wcagLevel: 'AA' | 'AAA' | 'Fail';
  isAccessible: boolean;
}

export interface BrandingState {
  typography: TypographySettings;
  colors: ColorPalette;
  darkMode: DarkModeColors;
  spacing: SpacingScale;
  borderRadius: BorderRadius;
  shadows: ShadowSystem;
  animation: AnimationSettings;
  grid: GridSystem;
  breakpoints: Breakpoints;
  zIndex: ZIndexScale;
  isDarkMode: boolean;
}

export interface BrandingPreset {
  name: string;
  description: string;
  state: BrandingState;
}

export interface ExportFormat {
  type: 'css' | 'scss' | 'less' | 'json' | 'tailwind' | 'javascript';
  content: string;
}

export interface DesignVersion {
  id: string;
  name: string;
  timestamp: number;
  state: BrandingState;
}
