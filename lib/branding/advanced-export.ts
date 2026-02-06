import type { BrandingState, ExportFormat } from "@/types/branding";

export function generateCSS(state: BrandingState): string {
  const { typography, colors, darkMode, spacing, borderRadius, shadows, animation, grid, breakpoints, zIndex } = state;

  return `/* Generated Design System CSS */

:root {
  /* Typography */
  --font-family: ${typography.fontFamily};
  --font-size-h1: ${typography.headingSizes.h1};
  --font-size-h2: ${typography.headingSizes.h2};
  --font-size-h3: ${typography.headingSizes.h3};
  --font-size-h4: ${typography.headingSizes.h4};
  --font-size-h5: ${typography.headingSizes.h5};
  --font-size-h6: ${typography.headingSizes.h6};
  --font-size-body: ${typography.bodySize};
  --line-height: ${typography.lineHeight};

  /* Letter Spacing */
  --letter-spacing-tight: ${typography.letterSpacing.tight};
  --letter-spacing-normal: ${typography.letterSpacing.normal};
  --letter-spacing-wide: ${typography.letterSpacing.wide};

  /* Font Weights */
  --font-weight-light: ${typography.fontWeights.light};
  --font-weight-normal: ${typography.fontWeights.normal};
  --font-weight-medium: ${typography.fontWeights.medium};
  --font-weight-semibold: ${typography.fontWeights.semibold};
  --font-weight-bold: ${typography.fontWeights.bold};

  /* Colors */
  --color-primary: ${colors.primary};
  --color-secondary: ${colors.secondary};
  --color-accent: ${colors.accent};
  --color-success: ${colors.success};
  --color-warning: ${colors.warning};
  --color-error: ${colors.error};
  --color-info: ${colors.info};
  --color-background: ${colors.background};
  --color-text: ${colors.text};
  --color-border: ${colors.border};
  --color-muted: ${colors.muted};

  /* Spacing */
  --spacing-xs: ${spacing.xs};
  --spacing-sm: ${spacing.sm};
  --spacing-md: ${spacing.md};
  --spacing-lg: ${spacing.lg};
  --spacing-xl: ${spacing.xl};
  --spacing-2xl: ${spacing["2xl"]};
  --spacing-3xl: ${spacing["3xl"]};
  --spacing-4xl: ${spacing["4xl"]};

  /* Border Radius */
  --radius-none: ${borderRadius.none};
  --radius-sm: ${borderRadius.sm};
  --radius-md: ${borderRadius.md};
  --radius-lg: ${borderRadius.lg};
  --radius-xl: ${borderRadius.xl};
  --radius-full: ${borderRadius.full};

  /* Shadows */
  --shadow-sm: ${shadows.sm};
  --shadow-md: ${shadows.md};
  --shadow-lg: ${shadows.lg};
  --shadow-xl: ${shadows.xl};
  --shadow-2xl: ${shadows["2xl"]};
  --shadow-inner: ${shadows.inner};

  /* Animation */
  --duration-fast: ${animation.duration.fast};
  --duration-normal: ${animation.duration.normal};
  --duration-slow: ${animation.duration.slow};
  --easing-linear: ${animation.easing.linear};
  --easing-in: ${animation.easing.easeIn};
  --easing-out: ${animation.easing.easeOut};
  --easing-in-out: ${animation.easing.easeInOut};

  /* Grid */
  --grid-columns: ${grid.columns};
  --grid-gap: ${grid.gap};
  --container-max-width: ${grid.containerMaxWidth};

  /* Breakpoints */
  --breakpoint-sm: ${breakpoints.sm};
  --breakpoint-md: ${breakpoints.md};
  --breakpoint-lg: ${breakpoints.lg};
  --breakpoint-xl: ${breakpoints.xl};
  --breakpoint-2xl: ${breakpoints["2xl"]};

  /* Z-Index */
  --z-dropdown: ${zIndex.dropdown};
  --z-sticky: ${zIndex.sticky};
  --z-fixed: ${zIndex.fixed};
  --z-modal: ${zIndex.modal};
  --z-popover: ${zIndex.popover};
  --z-tooltip: ${zIndex.tooltip};
}

/* Dark Mode */
[data-theme="dark"] {
  --color-primary: ${darkMode.primary};
  --color-secondary: ${darkMode.secondary};
  --color-accent: ${darkMode.accent};
  --color-success: ${darkMode.success};
  --color-warning: ${darkMode.warning};
  --color-error: ${darkMode.error};
  --color-info: ${darkMode.info};
  --color-background: ${darkMode.background};
  --color-text: ${darkMode.text};
  --color-border: ${darkMode.border};
  --color-muted: ${darkMode.muted};
}

/* Base Styles */
body {
  font-family: var(--font-family);
  font-size: var(--font-size-body);
  line-height: var(--line-height);
  color: var(--color-text);
  background-color: var(--color-background);
}

h1, h2, h3, h4, h5, h6 {
  font-weight: var(--font-weight-bold);
  line-height: 1.2;
  margin-bottom: var(--spacing-md);
}

h1 { font-size: var(--font-size-h1); }
h2 { font-size: var(--font-size-h2); }
h3 { font-size: var(--font-size-h3); }
h4 { font-size: var(--font-size-h4); }
h5 { font-size: var(--font-size-h5); }
h6 { font-size: var(--font-size-h6); }

/* Utility Classes */
.text-primary { color: var(--color-primary); }
.text-secondary { color: var(--color-secondary); }
.text-accent { color: var(--color-accent); }
.text-success { color: var(--color-success); }
.text-warning { color: var(--color-warning); }
.text-error { color: var(--color-error); }
.text-info { color: var(--color-info); }
.text-muted { color: var(--color-muted); }

.bg-primary { background-color: var(--color-primary); }
.bg-secondary { background-color: var(--color-secondary); }
.bg-accent { background-color: var(--color-accent); }
.bg-success { background-color: var(--color-success); }
.bg-warning { background-color: var(--color-warning); }
.bg-error { background-color: var(--color-error); }
.bg-info { background-color: var(--color-info); }

.shadow-sm { box-shadow: var(--shadow-sm); }
.shadow-md { box-shadow: var(--shadow-md); }
.shadow-lg { box-shadow: var(--shadow-lg); }
.shadow-xl { box-shadow: var(--shadow-xl); }
.shadow-2xl { box-shadow: var(--shadow-2xl); }
.shadow-inner { box-shadow: var(--shadow-inner); }

.transition-fast { transition-duration: var(--duration-fast); }
.transition-normal { transition-duration: var(--duration-normal); }
.transition-slow { transition-duration: var(--duration-slow); }

/* Component Styles */
.btn {
  padding: var(--spacing-md) var(--spacing-lg);
  background-color: var(--color-primary);
  color: white;
  border: none;
  border-radius: var(--radius-md);
  font-weight: var(--font-weight-medium);
  cursor: pointer;
  transition: all var(--duration-normal) var(--easing-in-out);
  box-shadow: var(--shadow-sm);
}

.btn:hover {
  opacity: 0.9;
  transform: translateY(-1px);
  box-shadow: var(--shadow-md);
}

.card {
  background: var(--color-background);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: var(--spacing-lg);
  box-shadow: var(--shadow-md);
  transition: all var(--duration-normal) var(--easing-in-out);
}

.card:hover {
  box-shadow: var(--shadow-lg);
}

.input {
  padding: var(--spacing-sm) var(--spacing-md);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  font-size: var(--font-size-body);
  transition: all var(--duration-fast) var(--easing-out);
}

.input:focus {
  outline: none;
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.container {
  max-width: var(--container-max-width);
  margin: 0 auto;
  padding: 0 var(--spacing-lg);
}

.grid {
  display: grid;
  grid-template-columns: repeat(var(--grid-columns), 1fr);
  gap: var(--grid-gap);
}

/* Responsive Breakpoints */
@media (min-width: ${breakpoints.sm}) {
  .sm\\:grid-cols-2 { grid-template-columns: repeat(2, 1fr); }
}

@media (min-width: ${breakpoints.md}) {
  .md\\:grid-cols-3 { grid-template-columns: repeat(3, 1fr); }
}

@media (min-width: ${breakpoints.lg}) {
  .lg\\:grid-cols-4 { grid-template-columns: repeat(4, 1fr); }
}
`.trim();
}

export function generateSCSS(state: BrandingState): string {
  const css = generateCSS(state);
  return css
    .replace(/:root/g, '$design-system: (')
    .replace(/--/g, '  ')
    .replace(/;/g, ',');
}

export function generateJSON(state: BrandingState): string {
  return JSON.stringify(state, null, 2);
}

export function generateTailwindConfig(state: BrandingState): string {
  const { colors, spacing, borderRadius, shadows, animation, breakpoints, typography } = state;

  return `/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: '${colors.primary}',
        secondary: '${colors.secondary}',
        accent: '${colors.accent}',
        success: '${colors.success}',
        warning: '${colors.warning}',
        error: '${colors.error}',
        info: '${colors.info}',
      },
      spacing: {
        xs: '${spacing.xs}',
        sm: '${spacing.sm}',
        md: '${spacing.md}',
        lg: '${spacing.lg}',
        xl: '${spacing.xl}',
        '2xl': '${spacing["2xl"]}',
        '3xl': '${spacing["3xl"]}',
        '4xl': '${spacing["4xl"]}',
      },
      borderRadius: {
        none: '${borderRadius.none}',
        sm: '${borderRadius.sm}',
        md: '${borderRadius.md}',
        lg: '${borderRadius.lg}',
        xl: '${borderRadius.xl}',
        full: '${borderRadius.full}',
      },
      boxShadow: {
        sm: '${shadows.sm}',
        md: '${shadows.md}',
        lg: '${shadows.lg}',
        xl: '${shadows.xl}',
        '2xl': '${shadows["2xl"]}',
        inner: '${shadows.inner}',
      },
      transitionDuration: {
        fast: '${animation.duration.fast}',
        normal: '${animation.duration.normal}',
        slow: '${animation.duration.slow}',
      },
      transitionTimingFunction: {
        'ease-in': '${animation.easing.easeIn}',
        'ease-out': '${animation.easing.easeOut}',
        'ease-in-out': '${animation.easing.easeInOut}',
      },
      screens: {
        sm: '${breakpoints.sm}',
        md: '${breakpoints.md}',
        lg: '${breakpoints.lg}',
        xl: '${breakpoints.xl}',
        '2xl': '${breakpoints["2xl"]}',
      },
      fontFamily: {
        sans: ['${typography.fontFamily}'],
      },
      fontSize: {
        h1: '${typography.headingSizes.h1}',
        h2: '${typography.headingSizes.h2}',
        h3: '${typography.headingSizes.h3}',
        h4: '${typography.headingSizes.h4}',
        h5: '${typography.headingSizes.h5}',
        h6: '${typography.headingSizes.h6}',
        body: '${typography.bodySize}',
      },
    },
  },
  plugins: [],
}`;
}

export function generateJavaScript(state: BrandingState): string {
  return `export const designSystem = ${JSON.stringify(state, null, 2)};

export const colors = designSystem.colors;
export const darkModeColors = designSystem.darkMode;
export const typography = designSystem.typography;
export const spacing = designSystem.spacing;
export const borderRadius = designSystem.borderRadius;
export const shadows = designSystem.shadows;
export const animation = designSystem.animation;
export const grid = designSystem.grid;
export const breakpoints = designSystem.breakpoints;
export const zIndex = designSystem.zIndex;`;
}

export function exportDesignSystem(state: BrandingState, format: ExportFormat['type']): ExportFormat {
  const generators = {
    css: generateCSS,
    scss: generateSCSS,
    json: generateJSON,
    tailwind: generateTailwindConfig,
    javascript: generateJavaScript,
    less: generateCSS, // For now, LESS uses same as CSS
  };

  return {
    type: format,
    content: generators[format](state),
  };
}
