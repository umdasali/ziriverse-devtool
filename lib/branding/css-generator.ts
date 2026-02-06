import type { BrandingState } from "@/types/branding";

export function generateCSS(state: BrandingState): string {
  const { typography, colors, spacing, borderRadius } = state;

  return `/* Custom Design System CSS */
/* Generated with Branding Tools */

/* ============================================
   CSS Variables (Custom Properties)
   ============================================ */

:root {
  /* Typography */
  --font-family: ${typography.fontFamily};
  --font-size-base: ${typography.bodySize};
  --line-height: ${typography.lineHeight};

  --font-weight-light: ${typography.fontWeights.light};
  --font-weight-normal: ${typography.fontWeights.normal};
  --font-weight-medium: ${typography.fontWeights.medium};
  --font-weight-semibold: ${typography.fontWeights.semibold};
  --font-weight-bold: ${typography.fontWeights.bold};

  --font-size-h1: ${typography.headingSizes.h1};
  --font-size-h2: ${typography.headingSizes.h2};
  --font-size-h3: ${typography.headingSizes.h3};
  --font-size-h4: ${typography.headingSizes.h4};
  --font-size-h5: ${typography.headingSizes.h5};
  --font-size-h6: ${typography.headingSizes.h6};

  /* Colors */
  --color-primary: ${colors.primary};
  --color-secondary: ${colors.secondary};
  --color-accent: ${colors.accent};
  --color-background: ${colors.background};
  --color-text: ${colors.text};
  --color-border: ${colors.border};

  /* Spacing */
  --spacing-xs: ${spacing.xs};
  --spacing-sm: ${spacing.sm};
  --spacing-md: ${spacing.md};
  --spacing-lg: ${spacing.lg};
  --spacing-xl: ${spacing.xl};
  --spacing-2xl: ${spacing["2xl"]};

  /* Border Radius */
  --border-radius-sm: ${borderRadius.sm};
  --border-radius-md: ${borderRadius.md};
  --border-radius-lg: ${borderRadius.lg};
  --border-radius-full: ${borderRadius.full};
}

/* ============================================
   Base Styles
   ============================================ */

body {
  font-family: var(--font-family);
  font-size: var(--font-size-base);
  line-height: var(--line-height);
  color: var(--color-text);
  background-color: var(--color-background);
}

/* ============================================
   Typography
   ============================================ */

h1, h2, h3, h4, h5, h6 {
  margin-top: 0;
  margin-bottom: var(--spacing-md);
  font-weight: var(--font-weight-bold);
  line-height: 1.2;
}

h1 { font-size: var(--font-size-h1); }
h2 { font-size: var(--font-size-h2); }
h3 { font-size: var(--font-size-h3); }
h4 { font-size: var(--font-size-h4); }
h5 { font-size: var(--font-size-h5); }
h6 { font-size: var(--font-size-h6); }

p {
  margin-top: 0;
  margin-bottom: var(--spacing-md);
}

/* ============================================
   Utility Classes
   ============================================ */

/* Colors */
.text-primary { color: var(--color-primary); }
.text-secondary { color: var(--color-secondary); }
.text-accent { color: var(--color-accent); }
.bg-primary { background-color: var(--color-primary); }
.bg-secondary { background-color: var(--color-secondary); }
.bg-accent { background-color: var(--color-accent); }
.border-color { border-color: var(--color-border); }

/* Spacing */
.p-xs { padding: var(--spacing-xs); }
.p-sm { padding: var(--spacing-sm); }
.p-md { padding: var(--spacing-md); }
.p-lg { padding: var(--spacing-lg); }
.p-xl { padding: var(--spacing-xl); }

.m-xs { margin: var(--spacing-xs); }
.m-sm { margin: var(--spacing-sm); }
.m-md { margin: var(--spacing-md); }
.m-lg { margin: var(--spacing-lg); }
.m-xl { margin: var(--spacing-xl); }

/* Border Radius */
.rounded-sm { border-radius: var(--border-radius-sm); }
.rounded-md { border-radius: var(--border-radius-md); }
.rounded-lg { border-radius: var(--border-radius-lg); }
.rounded-full { border-radius: var(--border-radius-full); }

/* Font Weights */
.font-light { font-weight: var(--font-weight-light); }
.font-normal { font-weight: var(--font-weight-normal); }
.font-medium { font-weight: var(--font-weight-medium); }
.font-semibold { font-weight: var(--font-weight-semibold); }
.font-bold { font-weight: var(--font-weight-bold); }

/* ============================================
   Components
   ============================================ */

.btn {
  display: inline-block;
  padding: var(--spacing-sm) var(--spacing-lg);
  font-weight: var(--font-weight-medium);
  text-align: center;
  text-decoration: none;
  border: 1px solid transparent;
  border-radius: var(--border-radius-md);
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-primary {
  background-color: var(--color-primary);
  color: white;
}

.btn-primary:hover {
  opacity: 0.9;
}

.btn-secondary {
  background-color: var(--color-secondary);
  color: white;
}

.card {
  padding: var(--spacing-lg);
  background-color: var(--color-background);
  border: 1px solid var(--color-border);
  border-radius: var(--border-radius-lg);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.input {
  display: block;
  width: 100%;
  padding: var(--spacing-sm);
  font-family: var(--font-family);
  font-size: var(--font-size-base);
  border: 1px solid var(--color-border);
  border-radius: var(--border-radius-md);
}

.input:focus {
  outline: none;
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}
`;
}
