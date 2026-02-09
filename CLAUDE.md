# CLAUDE.md - Branding Project Documentation

> **Purpose**: This file serves as a comprehensive reference guide for AI-assisted development on the Branding Project. It contains everything needed to understand the codebase structure, patterns, and conventions.

**Last Updated**: 2026-02-09
**Project Version**: 1.1.0
**Node Version**: 20
**Framework**: Next.js 16 with App Router

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Quick Reference](#quick-reference)
3. [Project Structure](#project-structure)
4. [Technology Stack](#technology-stack)
5. [Architecture & Design Patterns](#architecture--design-patterns)
6. [Features & Components](#features--components)
7. [State Management](#state-management)
8. [API Routes](#api-routes)
9. [Styling System](#styling-system)
10. [Type Definitions](#type-definitions)
11. [Utilities & Helpers](#utilities--helpers)
12. [Naming Conventions](#naming-conventions)
13. [Development Guidelines](#development-guidelines)

---

## Project Overview

**Branding Tools** is a professional Next.js application featuring four powerful web development utilities:

1. **Image Converter** - Convert images between PNG/JPEG/WEBP formats with quality control
2. **SEO Card Validator** - Validate and preview meta tags across social media platforms
3. **Branding Design System Generator** - Create custom design systems with live preview
4. **API Tester** - Professional REST API client for testing endpoints with full HTTP support

**Core Philosophy**:
- Privacy-first (client-side processing where possible)
- Type-safe (full TypeScript strict mode)
- Component-based architecture
- Performance-optimized
- Modular and scalable

---

## Quick Reference

### Common Commands
```bash
npm run dev          # Start development server (port 3000)
npm run build        # Production build
npm run start        # Start production server
npm run lint         # ESLint checks
npm run format       # Prettier formatting
```

### Key Directories
```
app/                 # Next.js App Router pages + API routes
components/          # React UI components (feature-specific + shared)
lib/                 # Business logic and utilities
types/               # TypeScript type definitions
stores/              # Zustand state management
docs/                # Documentation files
```

### Important Files
- `app/layout.tsx` - Root layout with Navigation + Footer
- `tailwind.config.ts` - Tailwind theme configuration
- `next.config.js` - Next.js configuration (image optimization, body size)
- `stores/branding-store.ts` - Global state for branding feature
- `lib/utils.ts` - Core utility functions (cn, formatBytes, debounce)

---

## Project Structure

```
Branding Project/
├── app/                              # Next.js App Router
│   ├── layout.tsx                    # Root layout (Navigation + Footer)
│   ├── page.tsx                      # Landing page with feature cards
│   ├── globals.css                   # Tailwind base + CSS variables
│   │
│   ├── image-converter/
│   │   └── page.tsx                  # Image converter feature page
│   │
│   ├── seo-validator/
│   │   └── page.tsx                  # SEO validator feature page
│   │
│   ├── branding/
│   │   └── page.tsx                  # Branding design system page
│   │
│   ├── tools/developer/api-tester/
│   │   ├── page.tsx                  # API Tester feature page
│   │   └── layout.tsx                # API Tester metadata & SEO
│   │
│   └── api/                          # Server-side API routes
│       ├── convert-image/route.ts    # Image conversion (Sharp)
│       ├── fetch-meta/route.ts       # Meta tag fetching (Cheerio)
│       └── proxy-request/route.ts    # CORS proxy for API testing
│
├── components/                       # React UI Components
│   ├── ui/                           # shadcn/ui components (11 total)
│   │   ├── button.tsx                # CVA-based button with variants
│   │   ├── card.tsx                  # Card container
│   │   ├── input.tsx                 # Text input
│   │   ├── label.tsx                 # Form label
│   │   ├── select.tsx                # Radix Select wrapper
│   │   ├── slider.tsx                # Radix Slider wrapper
│   │   ├── tabs.tsx                  # Radix Tabs wrapper
│   │   ├── accordion.tsx             # Radix Accordion wrapper
│   │   ├── alert.tsx                 # Alert notification
│   │   ├── badge.tsx                 # Badge/tag component
│   │   └── textarea.tsx              # Textarea field
│   │
│   ├── layout/
│   │   ├── navigation.tsx            # Top navbar with active route highlighting
│   │   └── footer.tsx                # Footer with copyright
│   │
│   ├── image-converter/
│   │   ├── image-uploader.tsx        # Drag-drop file uploader
│   │   ├── format-selector.tsx       # Format & quality controls
│   │   └── conversion-preview.tsx    # Before/after image preview
│   │
│   ├── seo-validator/
│   │   ├── platform-previews.tsx     # 4-tab platform preview
│   │   └── meta-data-display.tsx     # Meta tags list & validation
│   │
│   ├── branding/
│   │   ├── typography-controls.tsx   # Font & size controls
│   │   ├── color-controls.tsx        # Color picker controls
│   │   ├── spacing-controls.tsx      # Spacing & border radius
│   │   ├── live-preview.tsx          # Real-time design preview
│   │   └── code-output.tsx           # CSS output with copy/download
│   │
│   ├── api-tester/
│   │   ├── request-builder.tsx       # HTTP method & URL input
│   │   ├── headers-editor.tsx        # Dynamic headers management
│   │   ├── body-editor.tsx           # Request body (JSON/form/raw)
│   │   ├── auth-editor.tsx           # Authentication controls
│   │   ├── response-viewer.tsx       # Formatted response display
│   │   ├── curl-importer.tsx         # Import cURL commands
│   │   ├── curl-exporter.tsx         # Export as cURL
│   │   └── history-panel.tsx         # Request history (last 20)
│   │
│   └── developer-tools/
│       └── api-tester.tsx            # Main API Tester component
│
├── lib/                              # Business Logic & Utilities
│   ├── utils.ts                      # cn(), formatBytes(), debounce()
│   ├── image-converter/
│   │   └── client-converter.ts       # Canvas-based image conversion
│   ├── seo-validator/
│   │   └── meta-validator.ts         # Meta tag validation & platform logic
│   ├── branding/
│   │   ├── presets.ts                # Material, Tailwind, Bootstrap presets
│   │   └── css-generator.ts          # CSS template generation
│   └── api-tester/
│       ├── validation.ts             # Request & URL validation
│       ├── curl-parser.ts            # Parse cURL commands
│       ├── curl-generator.ts         # Generate cURL commands
│       ├── request-executor.ts       # Execute API requests
│       └── response-formatter.ts     # Format responses & styling
│
├── stores/                           # Zustand State Management
│   └── branding-store.ts             # Design system state
│
├── types/                            # TypeScript Type Definitions
│   ├── image.ts                      # ImageFormat, ConversionResult, ImageFile
│   ├── branding.ts                   # BrandingState, TypographySettings
│   ├── seo.ts                        # MetaTags, MetaValidation
│   └── api-tester.ts                 # APIRequest, APIResponse, HTTPMethod
│
├── docs/                             # Documentation
│   ├── ARCHITECTURE.md               # System architecture
│   ├── FEATURES.md                   # Feature documentation
│   ├── API.md                        # API route documentation
│   └── DEPLOYMENT.md                 # Deployment guide
│
└── Configuration Files
    ├── package.json                  # Dependencies & scripts
    ├── tsconfig.json                 # TypeScript config (strict mode)
    ├── tailwind.config.ts            # Tailwind theme
    ├── next.config.js                # Next.js config (images, body size)
    ├── postcss.config.mjs            # PostCSS plugins
    ├── .eslintrc.json                # ESLint rules
    ├── .prettierrc                   # Prettier config
    └── .nvmrc                        # Node version (20)
```

---

## Technology Stack

### Core Framework
- **Next.js 16** - React framework with App Router
- **React 19** - UI library
- **TypeScript 5.9** - Type safety with strict mode

### UI & Styling
- **Tailwind CSS 3.4** - Utility-first CSS framework
- **shadcn/ui** - Component library (built on Radix UI)
- **Radix UI** - Headless component primitives
  - react-accordion, react-select, react-slider, react-tabs, react-label, react-dropdown-menu, react-dialog
- **class-variance-authority (CVA)** - Component variant system
- **clsx + tailwind-merge** - Class name utilities
- **lucide-react** - Icon library

### State Management
- **Zustand 5.0** - Lightweight state management (used for branding store)

### Image Processing
- **Sharp 0.34** - Server-side image processing (Node.js)
- **browser-image-compression 2.0** - Client-side compression

### Meta Tag Processing
- **Cheerio 1.2** - HTML parsing
- **Metascraper 5.49** - Meta tag extraction with plugins
  - metascraper-description, metascraper-image, metascraper-title, metascraper-url

### File Handling
- **react-dropzone 14.4** - Drag-drop file uploads
- **react-colorful 5.6** - Color picker component
- **file-saver 2.0** - File download utility

### Development Tools
- **ESLint 9.39** - Code linting
- **Prettier 3.8** - Code formatting
- **PostCSS** - CSS transformation
- **Autoprefixer** - CSS vendor prefixes

---

## Architecture & Design Patterns

### Architectural Principles

1. **Modularity** - Each feature is self-contained with its own components, logic, and types
2. **Type Safety** - Full TypeScript strict mode enforcement
3. **Performance** - Client-side processing where possible, server-side for quality operations
4. **Privacy** - Image conversion happens in-browser by default
5. **Scalability** - Component-based architecture allows easy feature additions

### Design Patterns

#### 1. Component Composition Pattern
```typescript
// Page components compose feature-specific components
<ImageConverterPage>
  <ImageUploader />
  <FormatSelector />
  <ConversionPreview />
</ImageConverterPage>
```

#### 2. State Management Pattern (Zustand)
```typescript
const useBrandingStore = create<BrandingState>((set) => ({
  // State
  typography: defaultTypography,
  colors: defaultColors,

  // Actions
  setFontFamily: (fontFamily) =>
    set((state) => ({
      typography: { ...state.typography, fontFamily }
    })),
}));
```

#### 3. Client vs Server Separation
- **Client-side**: UI rendering, interactions, simple transformations
- **Server-side**: Resource-intensive operations (Sharp image processing, web scraping)

#### 4. API Route Pattern (Next.js Route Handlers)
```typescript
export async function POST(request: NextRequest) {
  // Extract data
  // Process
  // Return response
}
```

#### 5. Type-Driven Development
- Central type definitions in `/types` directory
- Interfaces defined before implementation
- Strict type checking throughout

### Code Organization Conventions

**File Naming**:
- Pages: `page.tsx` (Next.js convention)
- API routes: `route.ts`
- Components: PascalCase (e.g., `ImageUploader.tsx`)
- Utilities: camelCase with hyphens (e.g., `client-converter.ts`)
- Types: camelCase (e.g., `image.ts`, `branding.ts`)

**Export Convention**:
- Named exports for components and functions
- Default exports for pages (Next.js requirement)

---

## Features & Components

### Feature 1: Advanced Image Converter

**Route**: `/image-converter`

**Component Hierarchy**:
```
ImageConverterPage (app/image-converter/page.tsx)
├── ImageUploader (drag-drop, react-dropzone)
│   ├── Validates file type and size
│   ├── Displays current image preview
│   └── Supports 8+ image formats
│
├── Format & Quality Settings Card (Tabbed Interface)
│   ├── Basic Tab
│   │   ├── Format: PNG | JPEG | WEBP | AVIF | GIF | BMP | TIFF | ICO
│   │   ├── Quality: Slider (1-100)
│   │   └── Preserve Metadata checkbox
│   │
│   ├── Resize Tab
│   │   ├── Width & Height inputs
│   │   ├── Maintain aspect ratio toggle
│   │   └── Original dimensions display
│   │
│   ├── Transform Tab
│   │   ├── Rotate: 0° | 90° | 180° | 270° + custom angle
│   │   ├── Flip horizontal checkbox
│   │   └── Flip vertical checkbox
│   │
│   └── Filters Tab
│       ├── Grayscale checkbox
│       ├── Sepia checkbox
│       ├── Sharpen checkbox
│       ├── Blur slider (0-10)
│       ├── Brightness slider (-100 to 100)
│       └── Contrast slider (-100 to 100)
│
├── Conversion Controls
│   ├── Server/Client mode toggle
│   ├── Convert Image button
│   ├── Download button (when converted)
│   └── Reset Settings button
│
└── ConversionPreview (2-column comparison)
    ├── Original image preview + size + dimensions
    └── Converted image preview + size
```

**Key State**:
```typescript
const [image, setImage] = useState<ImageFile | null>(null);
const [format, setFormat] = useState<ImageFormat>("webp");
const [quality, setQuality] = useState(80);
const [converted, setConverted] = useState<ConversionResult | null>(null);
const [isConverting, setIsConverting] = useState(false);
const [useServer, setUseServer] = useState(false);

// Advanced options
const [resize, setResize] = useState<ResizeOptions>({
  width: undefined,
  height: undefined,
  maintainAspectRatio: true,
});

const [transform, setTransform] = useState<TransformOptions>({
  rotate: 0,
  flipHorizontal: false,
  flipVertical: false,
});

const [filter, setFilter] = useState<FilterOptions>({
  grayscale: false,
  sepia: false,
  blur: 0,
  sharpen: false,
  brightness: 0,
  contrast: 0,
});

const [preserveMetadata, setPreserveMetadata] = useState(false);
```

**Key Functions**:
- `convertImageClient()` - Canvas-based conversion with filters (lib/image-converter/client-converter.ts)
- `POST /api/convert-image` - Server-side Sharp conversion with all features
- `applyFilters()` - Client-side filter application using canvas ImageData
- `getMimeType()` - Returns correct MIME type for each format

**Supported Features**:

1. **Format Conversion** (8 formats)
   - PNG (lossless, transparency)
   - JPEG (small size, no transparency)
   - WEBP (modern, great compression)
   - AVIF (best compression, latest)
   - GIF (animation support, limited colors)
   - BMP (uncompressed, large size)
   - TIFF (high quality, large size)
   - ICO (icon format)

2. **Resize Operations**
   - Custom width and height
   - Aspect ratio lock/unlock
   - Automatic dimension calculation

3. **Transform Operations**
   - Rotate: 0°, 90°, 180°, 270°, or custom angle
   - Flip horizontal
   - Flip vertical

4. **Filter Effects**
   - Grayscale conversion
   - Sepia tone
   - Blur (0-10 intensity)
   - Sharpen
   - Brightness adjustment (-100 to +100)
   - Contrast adjustment (-100 to +100)

5. **Quality Control**
   - Adjustable quality (1-100%)
   - Format-specific optimization
   - Metadata preservation option

**Validation**:
- File types: PNG, JPEG, WEBP, AVIF, GIF, BMP, TIFF, ICO
- Max file size: 50MB
- Implemented in `validateImageFile()`

**Client vs Server Mode**:
- **Client-side**: Fast, private, canvas-based processing with filters
- **Server-side**: Higher quality, Sharp library, professional-grade output

---

### Feature 2: Advanced SEO Analyzer

**Route**: `/seo-validator`

**Component Hierarchy**:
```
SEOValidatorPage (app/seo-validator/page.tsx)
├── Header + History Button
├── History Panel (Last 10 scans)
│   ├── Scan list with scores
│   ├── Load previous scan
│   └── Delete entries
│
├── URL Input Form
│   ├── Mode selector (Quick Check / Advanced Analysis)
│   ├── Input + Analyze button
│   └── Mode description
│
└── Results (Tabbed Interface - 5 tabs)
    ├── Overview Tab
    │   ├── SEO Score Dashboard
    │   │   ├── Overall score (0-100) with progress ring
    │   │   ├── Category breakdown (5 scores)
    │   │   └── Quick insights
    │   └── Critical Issues Card
    │       ├── Errors list
    │       └── Warnings list
    │
    ├── Analysis Tab (6 sub-tabs)
    │   ├── Headings - H1-H6 structure analysis
    │   ├── Links - Internal/external link breakdown
    │   ├── Images - Alt text coverage, formats
    │   ├── Content - Word count, readability, keywords
    │   ├── Technical - Schema markup, performance
    │   └── Security - HTTPS, headers, mixed content
    │
    ├── Meta Tags Tab
    │   ├── Validation Status (score-based)
    │   ├── Basic Meta Tags (16 tags)
    │   ├── Open Graph Tags
    │   └── Twitter Card Tags
    │
    ├── Previews Tab (6 platforms)
    │   ├── Facebook | Twitter | LinkedIn
    │   └── Discord | Reddit | WhatsApp
    │
    └── Export Tab
        ├── Export as JSON (complete data)
        └── Export as CSV (summary)
```

**Key State**:
```typescript
const [url, setUrl] = useState("");
const [metaTags, setMetaTags] = useState<MetaTags | null>(null);
const [advancedData, setAdvancedData] = useState<AdvancedSEOData | null>(null);
const [isLoading, setIsLoading] = useState(false);
const [error, setError] = useState<string | null>(null);
const [mode, setMode] = useState<"simple" | "advanced">("simple");
const [history, setHistory] = useState<SEOHistory[]>([]);
const [showHistory, setShowHistory] = useState(false);
```

**Key Functions**:
- `POST /api/fetch-meta` - Basic meta tag fetching (simple mode)
- `POST /api/analyze-seo` - Comprehensive SEO analysis (advanced mode)
- `validateMetaTags()` - Basic validation with scoring
- `validateAdvancedSEO()` - Advanced validation with 100+ checks
- `calculateSEOScore()` - Score calculation (0-100)

**Analysis Modes**:

**Simple Mode (Quick Check)**:
- Meta tag extraction (16 tags)
- Basic validation
- Platform previews (6 platforms)
- ~2 seconds

**Advanced Mode (Deep Analysis)**:
- 100+ data points analyzed
- SEO score calculation
- 7 analysis categories:
  1. Headings (H1-H6)
  2. Links (internal/external)
  3. Images (alt text, formats)
  4. Content (word count, readability, keywords)
  5. Schema markup
  6. Performance metrics
  7. Security audit
- ~5-10 seconds

**SEO Score Breakdown (100 points)**:
- Meta Tags: 25 points
- Content Quality: 25 points
- Technical SEO: 20 points
- Performance: 15 points
- Social Media: 15 points

**Advanced Analysis Features**:

1. **Heading Structure**
   - H1-H6 detection and validation
   - Hierarchy checking
   - SEO recommendations

2. **Link Analysis**
   - Total, internal, external counts
   - NoFollow detection
   - Link distribution metrics

3. **Image Analysis**
   - Alt text coverage percentage
   - Format distribution
   - Accessibility recommendations

4. **Content Analysis**
   - Word count tracking
   - Readability score (Flesch)
   - Top 10 keywords with density
   - Content length classification

5. **Schema Markup**
   - JSON-LD detection
   - Schema types identified
   - Validation status

6. **Performance Insights**
   - HTML file size
   - Load time estimation
   - Minification detection
   - Compression status

7. **Security Check**
   - HTTPS validation
   - HSTS header
   - Mixed content detection
   - Security headers audit

**History & Export**:
- Last 10 scans saved (localStorage)
- JSON export (complete data)
- CSV export (summary)
- Timestamp tracking
- Score history

---

### Feature 3: Branding Design System (ENHANCED v2.0)

**Route**: `/branding`
**Status**: Production Ready ✅
**Properties**: 100+ customizable values
**Export Formats**: 5 (CSS, SCSS, JSON, Tailwind, JavaScript)

**🆕 Version 2.0 Features**:
- Version control system (save/load/delete up to 20 versions)
- Dark mode color palette with live toggle
- 5 export formats (was 1)
- Shadow system (6 elevation levels)
- Animation controls (duration + easing)
- Grid system configuration
- Responsive breakpoints (5 levels)
- Z-index scale management
- Extended color palette (11 colors, was 6)
- Enhanced live preview (4 tabs)
- Import/Export JSON configuration

**Component Hierarchy**:
```
BrandingPage (app/branding/page.tsx) - 384 lines
├── Header
│   ├── Title "Advanced Design System Generator"
│   ├── Versions button (shows count)
│   └── Reset button
│
├── Version History Panel (toggleable)
│   ├── List of saved versions with timestamps
│   ├── Load button per version
│   └── Delete button per version
│
├── Quick Actions (4 cards grid)
│   ├── Save Version Card (name input + save)
│   ├── Load Preset Card (4 presets selector)
│   ├── Export Config Card (JSON download)
│   └── Import Config Card (JSON upload)
│
└── Main Content (3 Tabs)
    │
    ├── Overview Tab
    │   ├── EnhancedLivePreview (full width)
    │   └── Feature Cards Grid (4 cards)
    │       ├── 100+ Properties badge
    │       ├── Dark Mode badge
    │       ├── 5 Formats badge
    │       └── Version Control badge
    │
    ├── Customize Tab (2 columns)
    │   │
    │   ├── Left Column: Controls (Nested Tabs)
    │   │   ├── Text Tab
    │   │   │   └── TypographyControls
    │   │   │       ├── Font family selector (5 options)
    │   │   │       ├── H1-H4 sizes
    │   │   │       ├── Body size + Line height
    │   │   │       └── (Letter spacing in store, not UI yet)
    │   │   │
    │   │   ├── Colors Tab
    │   │   │   ├── ColorControls (11 colors)
    │   │   │   │   ├── Primary, Secondary, Accent
    │   │   │   │   ├── Success, Warning, Error, Info
    │   │   │   │   ├── Background, Text, Border, Muted
    │   │   │   │   └── HexColorPicker popup per color
    │   │   │   │
    │   │   │   └── DarkModeControls (11 dark colors)
    │   │   │       ├── Same structure as light mode
    │   │   │       ├── Grid layout with swatches
    │   │   │       └── Separate HexColorPicker
    │   │   │
    │   │   └── Layout Tab
    │   │       ├── SpacingControls (2 sub-tabs)
    │   │       │   ├── Spacing: XS, SM, MD, LG, XL, 2XL, 3XL, 4XL
    │   │       │   └── Border Radius: none, SM, MD, LG, XL, full
    │   │       │
    │   │       ├── ShadowControls (6 shadows)
    │   │       │   ├── SM, MD, LG, XL, 2XL, inner
    │   │       │   ├── Visual preview boxes
    │   │       │   └── Text input for custom values
    │   │       │
    │   │       └── AnimationControls (2 sub-tabs)
    │   │           ├── Duration: fast, normal, slow
    │   │           └── Easing: linear, ease-in, ease-out, ease-in-out
    │   │
    │   └── Right Column: Preview
    │       └── EnhancedLivePreview (4 tabs)
    │           ├── Typography Tab
    │           │   ├── H1-H3 samples
    │           │   ├── Body text
    │           │   └── Muted text
    │           │
    │           ├── Colors Tab
    │           │   ├── Grid of 11 color swatches
    │           │   ├── Color names
    │           │   └── Hex values
    │           │
    │           ├── Components Tab
    │           │   ├── Buttons (primary, secondary, accent, outline)
    │           │   ├── Alerts (success, warning, error, info)
    │           │   ├── Cards (3 shadow variations)
    │           │   └── Badges (6 color variants)
    │           │
    │           └── Spacing Tab
    │               ├── Spacing scale visualization
    │               ├── Border radius samples
    │               └── Shadow examples
    │
    └── Export Tab
        └── AdvancedCodeOutput (5 format tabs)
            ├── CSS Tab
            │   ├── Custom properties (--var)
            │   ├── Dark mode override ([data-theme="dark"])
            │   ├── Utility classes
            │   ├── Component styles (btn, card, input)
            │   └── Responsive breakpoints
            │
            ├── SCSS Tab
            │   └── Sass variables ($var)
            │
            ├── JSON Tab
            │   └── Complete design tokens
            │
            ├── Tailwind Tab
            │   └── Tailwind config (module.exports)
            │
            └── JavaScript Tab
                └── ES6 module with exports

            Each tab has:
            ├── Syntax-highlighted code preview
            ├── Copy button (with "Copied" confirmation)
            ├── Download button (individual)
            └── Download All button (batch)
```

**State Management**: Zustand Store (`stores/branding-store.ts`) - Enhanced v2.0

```typescript
interface BrandingState {
  // Typography (15 properties)
  typography: {
    fontFamily: string;
    headingSizes: { h1: string; h2: string; h3: string; h4: string; h5: string; h6: string; };
    bodySize: string;
    lineHeight: string;
    letterSpacing: { tight: string; normal: string; wide: string; };  // 🆕
    fontWeights: { light: number; normal: number; medium: number; semibold: number; bold: number; };
  };

  // Light Mode Colors (11 properties) 🆕 Extended from 6
  colors: {
    primary: string; secondary: string; accent: string;
    success: string; warning: string; error: string; info: string;  // 🆕 Status colors
    background: string; text: string; border: string; muted: string;  // 🆕 Added muted
  };

  // Dark Mode Colors (11 properties) 🆕 NEW
  darkMode: {
    primary: string; secondary: string; accent: string;
    success: string; warning: string; error: string; info: string;
    background: string; text: string; border: string; muted: string;
  };

  // Spacing (8 properties) 🆕 Extended from 6
  spacing: {
    xs: string; sm: string; md: string; lg: string; xl: string;
    "2xl": string; "3xl": string; "4xl": string;  // 🆕 Added 3xl, 4xl
  };

  // Border Radius (6 properties) 🆕 Extended from 4
  borderRadius: {
    none: string; sm: string; md: string; lg: string; xl: string; full: string;  // 🆕 Added none, xl
  };

  // Shadow System (6 properties) 🆕 NEW
  shadows: {
    sm: string; md: string; lg: string; xl: string; "2xl": string; inner: string;
  };

  // Animation (7 properties) 🆕 NEW
  animation: {
    duration: { fast: string; normal: string; slow: string; };
    easing: { linear: string; easeIn: string; easeOut: string; easeInOut: string; };
  };

  // Grid System (3 properties) 🆕 NEW
  grid: {
    columns: number;
    gap: string;
    containerMaxWidth: string;
  };

  // Breakpoints (5 properties) 🆕 NEW
  breakpoints: {
    sm: string; md: string; lg: string; xl: string; "2xl": string;
  };

  // Z-Index Scale (6 properties) 🆕 NEW
  zIndex: {
    dropdown: number; sticky: number; fixed: number;
    modal: number; popover: number; tooltip: number;
  };

  // Dark Mode Toggle 🆕 NEW
  isDarkMode: boolean;

  // --- ACTIONS (25+ methods) ---

  // Typography Actions
  setFontFamily: (fontFamily: string) => void;
  setHeadingSize: (heading: keyof Typography["headingSizes"], size: string) => void;
  setBodySize: (size: string) => void;
  setLineHeight: (lineHeight: string) => void;
  setLetterSpacing: (key: keyof Typography["letterSpacing"], value: string) => void;  // 🆕
  setFontWeight: (weight: keyof Typography["fontWeights"], value: number) => void;

  // Color Actions
  setColor: (colorKey: keyof ColorPalette, color: string) => void;
  setDarkModeColor: (colorKey: keyof DarkModeColors, color: string) => void;  // 🆕
  toggleDarkMode: () => void;  // 🆕

  // Spacing & Layout
  setSpacing: (key: keyof SpacingScale, value: string) => void;
  setBorderRadius: (key: keyof BorderRadius, value: string) => void;
  setShadow: (key: keyof ShadowSystem, value: string) => void;  // 🆕

  // Animation Actions 🆕 NEW
  setAnimationDuration: (key: keyof AnimationSettings["duration"], value: string) => void;
  setAnimationEasing: (key: keyof AnimationSettings["easing"], value: string) => void;

  // Grid Actions 🆕 NEW
  setGridColumns: (columns: number) => void;
  setGridGap: (gap: string) => void;
  setContainerMaxWidth: (maxWidth: string) => void;

  // Breakpoint Actions 🆕 NEW
  setBreakpoint: (key: keyof Breakpoints, value: string) => void;

  // Z-Index Actions 🆕 NEW
  setZIndex: (key: keyof ZIndexScale, value: number) => void;

  // Preset & State Management
  loadPreset: (preset: BrandingPreset) => void;
  reset: () => void;
  exportState: () => BrandingState;  // 🆕 For version control
  loadState: (state: BrandingState) => void;  // 🆕 For version control
}
```

**Total Properties**: 100+ (79 direct + nested values)

**Key Functions** (lib/branding/advanced-export.ts):
- `generateCSS(state)` - Complete CSS with dark mode, 237 lines
- `generateSCSS(state)` - Sass variables format
- `generateJSON(state)` - Design tokens JSON
- `generateTailwindConfig(state)` - Tailwind config file
- `generateJavaScript(state)` - ES6 module with exports
- `exportDesignSystem(state, format)` - Main export orchestrator

**Generated CSS Structure** (5 formats available):

**CSS Output** (~237 lines):
1. `:root` - All properties as CSS custom properties (--var)
2. `[data-theme="dark"]` - Dark mode color overrides
3. Base Styles - body, headings (H1-H6), paragraphs
4. Utility Classes - Colors, shadows, transitions
5. Component Styles - .btn, .card, .input with hover/focus states
6. Grid System - .container, .grid classes
7. Responsive Breakpoints - @media queries

**Tailwind Output**:
- theme.extend object with all properties
- Compatible with tailwind.config.js
- Includes colors, spacing, shadows, animation, breakpoints

**JavaScript Output**:
- ES6 module: `export const designSystem = {...}`
- Named exports for each category
- Tree-shakeable imports

---

### Feature 4: Professional API Tester & REST Client

**Route**: `/tools/developer/api-tester`
**Status**: Production Ready ✅
**Features**: 7 HTTP methods, cURL integration, CORS bypass, history management
**Storage**: localStorage persistence (last 20 requests)

**What is an API Tester?**
An API Tester (also called REST Client or HTTP Client) is a tool that allows developers to test API endpoints without writing code. It's essential for:
- Testing backend APIs during development
- Debugging API responses
- Validating request/response formats
- Testing authentication flows
- Sharing API examples via cURL commands

**Why use this API Tester?**
- **No installation required** - runs entirely in your browser
- **Privacy-focused** - all data stays in your browser (localStorage)
- **CORS bypass** - built-in proxy for testing restricted APIs
- **cURL integration** - import/export cURL commands instantly
- **Request history** - automatically saves your last 20 requests
- **Professional features** - authentication, custom headers, multiple body types

**Component Hierarchy**:
```
APITesterPage (app/tools/developer/api-tester/page.tsx)
├── Main Component: APITesterTool (384 lines)
│   ├── State Management (localStorage persistence)
│   ├── Request validation pipeline
│   ├── Response formatting & display
│   └── History management (20 requests max)
│
├── Header Section
│   ├── Title: "API Tester"
│   ├── History button (shows count badge)
│   └── Reset button (clear all data)
│
├── History Panel (toggleable sidebar)
│   ├── Last 20 requests with timestamps
│   ├── Success/failure indicators (✓/✗)
│   ├── Load previous request button
│   ├── Delete individual entries
│   └── Relative timestamps ("5m ago", "2h ago")
│
├── cURL Importer (full-width card)
│   ├── Textarea for pasting cURL commands
│   ├── Parse & populate button
│   ├── Success/error feedback messages
│   └── Supports complex cURL syntax
│
└── Two-Column Layout (responsive)
    │
    ├── Left Column: Request Builder
    │   ├── RequestBuilder Component
    │   │   ├── HTTP Method Selector (7 methods)
    │   │   │   └── GET | POST | PUT | PATCH | DELETE | HEAD | OPTIONS
    │   │   ├── URL Input (validated)
    │   │   ├── Send Request button (with loading state)
    │   │   └── Keyboard shortcut (Enter key)
    │   │
    │   ├── Configuration Tabs (3 tabs)
    │   │   │
    │   │   ├── Headers Tab
    │   │   │   └── HeadersEditor
    │   │   │       ├── Add/remove header pairs
    │   │   │       ├── Key + Value inputs
    │   │   │       ├── Enable/disable toggle per header
    │   │   │       ├── Header count badge
    │   │   │       └── Empty state message
    │   │   │
    │   │   ├── Body Tab
    │   │   │   └── BodyEditor (4 body types)
    │   │   │       ├── None - no request body
    │   │   │       ├── JSON - JSON editor with validation
    │   │   │       │   ├── Syntax error alerts
    │   │   │       │   └── Auto-format option
    │   │   │       ├── Form Data - key-value pairs
    │   │   │       │   ├── Add/remove fields
    │   │   │       │   └── Enable/disable per field
    │   │   │       └── Raw Text - plain text editor
    │   │   │
    │   │   └── Auth Tab
    │   │       └── AuthEditor (3 auth types)
    │   │           ├── None - no authentication
    │   │           ├── Basic Auth
    │   │           │   ├── Username input
    │   │           │   ├── Password input
    │   │           │   └── Auto Base64 encoding
    │   │           └── Bearer Token
    │   │               ├── Token input field
    │   │               └── Authorization header preview
    │   │
    │   └── CORS Proxy Toggle
    │       ├── Enable/disable server proxy
    │       ├── Explanation tooltip
    │       └── Use for CORS-restricted APIs
    │
    └── Right Column: Response Viewer (sticky positioning)
        └── ResponseViewer Component
            ├── Empty State (before first request)
            │   └── "Send a request to see the response"
            │
            ├── Loading State
            │   └── Spinner + "Sending request..."
            │
            ├── Error State
            │   ├── Alert with error message
            │   └── CORS suggestion (if applicable)
            │
            └── Success State (3 tabs)
                ├── Response Metadata Badges
                │   ├── Status Code + Text (color-coded)
                │   │   └── 2xx (green), 3xx (blue), 4xx (orange), 5xx (red)
                │   ├── Response Time (milliseconds)
                │   └── Response Size (bytes, formatted)
                │
                ├── Body Tab
                │   ├── Formatted response body
                │   │   ├── JSON: Pretty-printed
                │   │   ├── XML/HTML: Indented
                │   │   └── Plain text: Raw
                │   ├── Copy button (with confirmation)
                │   └── Syntax highlighting
                │
                ├── Headers Tab
                │   ├── All response headers (key-value)
                │   ├── Alphabetically sorted
                │   └── Monospace font
                │
                └── Export Tab
                    └── CurlExporter
                        ├── Generated cURL command
                        ├── Copy button (with confirmation)
                        └── Properly escaped values
```

**Key State** (useState in APITesterTool):
```typescript
// Current Request Being Built
const [request, setRequest] = useState<APIRequest>({
  id: uuid(),
  method: "GET",
  url: "",
  headers: [],         // Dynamic header pairs
  body: {
    type: "none",
    json: "",
    formData: [],
    raw: ""
  },
  auth: {
    type: "none",
    basic: { username: "", password: "" },
    bearer: { token: "" }
  }
});

// Response & UI State
const [response, setResponse] = useState<APIResponse | null>(null);
const [isLoading, setIsLoading] = useState(false);
const [error, setError] = useState<string | null>(null);

// History & Settings
const [history, setHistory] = useState<RequestHistory[]>([]);  // Last 20 requests
const [showHistory, setShowHistory] = useState(false);         // Panel visibility
const [useProxy, setUseProxy] = useState(false);              // CORS proxy toggle
```

**HTTP Methods Supported** (7 total):
1. **GET** - Retrieve data (no body allowed)
2. **POST** - Create new resources
3. **PUT** - Update/replace entire resource
4. **PATCH** - Partial update of resource
5. **DELETE** - Remove resource
6. **HEAD** - Get headers only (no body)
7. **OPTIONS** - Get allowed methods (CORS preflight)

**Body Types** (4 options):

1. **None**
   - No request body
   - Used for GET, HEAD, OPTIONS
   - Automatically selected for GET requests

2. **JSON**
   - Content-Type: application/json
   - Syntax validation with error alerts
   - Pretty-print formatting
   - Most common for modern APIs

3. **Form Data**
   - Content-Type: application/x-www-form-urlencoded
   - Key-value pairs (like HTML forms)
   - URL-encoded automatically
   - Enable/disable individual fields

4. **Raw Text**
   - Content-Type: text/plain
   - Plain text body
   - For custom formats (XML, CSV, etc.)

**Authentication Types** (3 options):

1. **None**
   - No authentication
   - Public APIs

2. **Basic Auth**
   - Username + Password
   - Automatically Base64 encoded
   - Adds: `Authorization: Basic <encoded>`
   - Common for legacy APIs

3. **Bearer Token**
   - Token-based authentication
   - Adds: `Authorization: Bearer <token>`
   - Used by most modern APIs (JWT, OAuth)

**cURL Integration** (Import & Export):

**Import cURL Commands**:
The parser supports complex cURL syntax including:
- Multiple header flags: `-H` or `--header`
- Method flags: `-X` or `--request`
- Data flags: `-d`, `--data`, `--data-raw`, `--data-binary`
- Auth flags: `-u` or `--user` for Basic Auth
- Quoted and unquoted values
- Line breaks and backslash continuation
- Shell escaping

**Example cURL Import**:
```bash
curl -X POST 'https://api.example.com/users' \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer eyJhbGc...' \
  -d '{"name":"John","email":"john@example.com"}'
```

**Parsed Result**:
- Method: POST
- URL: https://api.example.com/users
- Headers: Content-Type (application/json)
- Auth: Bearer token (auto-detected)
- Body: JSON with user data

**Export as cURL**:
- Generates valid cURL command from current request
- Properly escapes single quotes in values
- Multi-line format with backslash continuation
- Copy to clipboard with one click

**Request History** (localStorage persistence):

**What's Saved**:
- Last 20 requests (FIFO - oldest removed)
- Full request details (method, URL, headers, body, auth)
- Response data (status, headers, body)
- Timestamp (Unix timestamp)
- Success/failure flag

**History Features**:
- **Load Previous Request**: Click to restore a saved request
- **Delete Entry**: Remove individual history items
- **Relative Timestamps**: "5m ago", "2h ago", "1d ago"
- **Visual Indicators**: ✓ (success) or ✗ (error)
- **Status Display**: Shows status code and response time
- **Automatic Pruning**: Keeps only 20 most recent

**CORS Proxy** (Bypass CORS restrictions):

**What is CORS?**
Cross-Origin Resource Sharing (CORS) is a browser security feature that blocks requests to different domains. Many APIs don't allow browser requests due to CORS policies.

**How the Proxy Works**:
1. **Direct Mode (default)**: Request sent from browser to API
   - Fast, no server involvement
   - Blocked by CORS for restricted APIs

2. **Proxy Mode (toggle enabled)**: Request sent through our server
   - Browser → Our Server → Target API → Our Server → Browser
   - Bypasses CORS restrictions
   - 30-second timeout
   - Adds slight latency

**When to Use Proxy**:
- API returns CORS error
- Testing third-party APIs
- API doesn't set CORS headers
- Development/testing environments

**Validation System** (3-layer validation):

**Layer 1: URL Validation**
```typescript
validateUrl(url: string) {
  - Must start with http:// or https://
  - Must be valid URL format
  - Returns boolean
}
```

**Layer 2: JSON Validation** (for JSON body type)
```typescript
validateJson(json: string) {
  - Try-catch JSON.parse()
  - Returns boolean
  - Shows error alert in UI
}
```

**Layer 3: Complete Request Validation**
```typescript
validateRequest(request: APIRequest) {
  Returns: { isValid: boolean, errors: string[], warnings: string[] }

  Errors (block request):
  - Invalid URL format
  - Invalid JSON body (if type is JSON)
  - Empty URL

  Warnings (show but allow):
  - GET request with body data
  - Basic Auth with empty username/password
  - No Content-Type header for JSON body
}
```

**Response Formatting** (Content-Type aware):

**JSON Responses**:
```typescript
formatResponseBody(body, "application/json")
  → Pretty-printed JSON with 2-space indentation
  → Syntax highlighted (future enhancement)
```

**XML/HTML Responses**:
```typescript
formatResponseBody(body, "text/xml")
  → Basic indentation
  → Preserves structure
```

**Plain Text**:
```typescript
formatResponseBody(body, "text/plain")
  → Raw body content
  → No formatting
```

**Status Code Color System**:

| Range | Color | Variant | Meaning | Examples |
|-------|-------|---------|---------|----------|
| 2xx | Green | Success | Request succeeded | 200 OK, 201 Created |
| 3xx | Blue | Secondary | Redirection | 301 Moved, 304 Not Modified |
| 4xx | Orange | Warning | Client error | 400 Bad Request, 404 Not Found |
| 5xx | Red | Destructive | Server error | 500 Internal Error, 503 Unavailable |

**Method Color Coding**:

| Method | Color | Typical Use |
|--------|-------|-------------|
| GET | Blue | Retrieve data |
| POST | Green | Create resource |
| PUT | Orange | Update resource |
| PATCH | Yellow | Partial update |
| DELETE | Red | Remove resource |
| HEAD | Gray | Headers only |
| OPTIONS | Purple | Allowed methods |

**Request Execution Pipeline**:

```
User clicks "Send Request"
  ↓
1. validateRequest() → Check URL, JSON, headers
  ↓
2. If invalid → Show error alerts, stop
  ↓
3. If valid → setIsLoading(true)
  ↓
4. Build request headers (custom + auth)
  ↓
5. Build request body (based on type)
  ↓
6. Execute request (direct or proxy mode)
  ↓
7. Measure response time (performance.now())
  ↓
8. Parse response (status, headers, body)
  ↓
9. Format response body (JSON/XML/text)
  ↓
10. setResponse(data) + setIsLoading(false)
  ↓
11. Save to history (request + response + timestamp)
  ↓
12. Update localStorage (persist history)
  ↓
13. Display formatted response in UI
```

**Error Handling**:

| Error Type | Detection | User Message | Suggestion |
|------------|-----------|--------------|------------|
| **CORS Error** | `TypeError: Failed to fetch` | "This might be a CORS issue" | "Try enabling the proxy option" |
| **Timeout** | 30-second timeout | "Request timeout" | Server not responding |
| **Network Failure** | Fetch rejection | "Network request failed" | Check internet connection |
| **Invalid URL** | URL validation | "Invalid URL format" | Must use HTTP or HTTPS |
| **Invalid JSON** | JSON.parse error | "Invalid JSON format" | Shows specific error message |
| **Server Error** | 5xx status | Status text from server | Check server logs |

**Keyboard Shortcuts**:

| Key | Action | Context |
|-----|--------|---------|
| Enter | Send request | When URL input is focused |
| Escape | Close history panel | When history is open |

**Performance Metrics**:

**Request Timing**:
```typescript
const startTime = performance.now();
await fetch(url, options);
const endTime = performance.now();
const duration = endTime - startTime;  // milliseconds
```

**Response Size**:
```typescript
const blob = await response.blob();
const size = blob.size;  // bytes
formatBytes(size);  // "1.2 KB", "3.5 MB"
```

**LocalStorage Structure**:

**Key**: `"api-tester-history"`

**Value** (JSON array):
```typescript
[
  {
    id: "uuid-1",
    request: {
      id: "uuid-1",
      method: "POST",
      url: "https://api.example.com/users",
      headers: [
        { id: "h1", key: "Content-Type", value: "application/json", enabled: true }
      ],
      body: { type: "json", json: '{"name":"John"}' },
      auth: { type: "bearer", bearer: { token: "abc123" } }
    },
    response: {
      status: 201,
      statusText: "Created",
      headers: { "content-type": "application/json" },
      body: '{"id":123,"name":"John"}',
      size: 45,
      time: 234  // milliseconds
    },
    timestamp: 1707426789123,
    success: true
  },
  // ... up to 19 more requests
]
```

**Data Flow Examples**:

**Example 1: Simple GET Request**
```
User enters: https://api.github.com/users/octocat
Method: GET (default)
Headers: none
Auth: none
  ↓
Click "Send Request"
  ↓
Validation passes (valid URL)
  ↓
fetch("https://api.github.com/users/octocat", { method: "GET" })
  ↓
Response: 200 OK (156ms, 1.2 KB)
  ↓
Body formatted as JSON (pretty-print)
  ↓
Display: Status badge (green "200 OK"), Time (156ms), Size (1.2 KB)
  ↓
Save to history with timestamp
```

**Example 2: POST with JSON + Bearer Auth**
```
User builds request:
  URL: https://api.example.com/posts
  Method: POST
  Headers: none
  Body Type: JSON
  Body: {"title":"Hello","content":"World"}
  Auth: Bearer token → "secret123"
  ↓
Click "Send Request"
  ↓
Validation passes
  ↓
Build headers:
  - Content-Type: application/json (auto-added)
  - Authorization: Bearer secret123 (from auth)
  ↓
fetch(url, {
  method: "POST",
  headers: { ... },
  body: '{"title":"Hello","content":"World"}'
})
  ↓
Response: 201 Created (423ms, 234 bytes)
  ↓
Display + Save to history
```

**Example 3: CORS Error → Proxy Mode**
```
User: https://restricted-api.com/data
Method: GET
Proxy: OFF (direct mode)
  ↓
fetch() → TypeError: Failed to fetch
  ↓
Error detected as CORS
  ↓
Display: "This might be a CORS issue. Try enabling the proxy option."
  ↓
User enables proxy toggle
  ↓
Click "Send Request" again
  ↓
Request sent to: POST /api/proxy-request
Body: { method: "GET", url: "https://restricted-api.com/data", ... }
  ↓
Server fetches the API (no CORS restrictions)
  ↓
Server returns: { status, statusText, headers, body }
  ↓
Success! Data displayed
```

**Advanced Features**:

1. **Dynamic Header Management**
   - Add unlimited headers
   - Toggle headers on/off without deleting
   - Automatic header count badge
   - Empty state guidance

2. **Smart Content-Type**
   - Auto-adds for JSON body
   - Respects custom Content-Type header
   - URL-encodes form data

3. **Request Cloning**
   - Load from history = instant clone
   - Modify and re-send easily
   - Great for iterative testing

4. **Response Inspection**
   - Full header visibility
   - Formatted body (JSON/XML)
   - Copy response body
   - Export as cURL

5. **Error Recovery**
   - Graceful error handling
   - CORS detection & suggestion
   - Timeout handling (30s)
   - Network failure guidance

**Use Cases & Examples**:

**Use Case 1: Testing a Public API**
```
Scenario: Test GitHub API to get user info
Steps:
1. Enter URL: https://api.github.com/users/octocat
2. Method: GET (default)
3. Click "Send Request"
Result: See user data in formatted JSON
```

**Use Case 2: Creating a Resource with Auth**
```
Scenario: Create a new blog post
Steps:
1. URL: https://my-api.com/posts
2. Method: POST
3. Auth Tab: Bearer Token → paste your token
4. Body Tab: Select JSON, paste:
   {"title": "My Post", "content": "Hello World"}
5. Click "Send Request"
Result: 201 Created with new post ID
```

**Use Case 3: Testing Form Submission**
```
Scenario: Submit a contact form
Steps:
1. URL: https://example.com/contact
2. Method: POST
3. Body Tab: Select "Form Data"
4. Add fields:
   - name: John Doe
   - email: john@example.com
   - message: Hello!
5. Click "Send Request"
Result: Form data sent as URL-encoded
```

**Use Case 4: Import & Modify cURL**
```
Scenario: Got a cURL from API docs, need to test
Steps:
1. Copy cURL from documentation
2. Paste in cURL Importer
3. Click "Import"
Result: All fields auto-populated
4. Modify URL or body as needed
5. Click "Send Request"
Result: Test with your changes
```

**Use Case 5: Testing CORS-Restricted API**
```
Scenario: API blocks browser requests
Steps:
1. Enter API URL
2. Try sending → CORS error appears
3. Enable "Use Proxy" toggle
4. Click "Send Request" again
Result: Success via server proxy
```

**Best Practices**:

1. **Testing APIs**
   - Start with GET requests to understand data structure
   - Use Bearer auth for modern APIs
   - Check response status codes carefully
   - Save successful requests to history

2. **Debugging**
   - Check Headers tab for debugging info
   - Look for error messages in response body
   - Verify Content-Type matches body type
   - Use proxy for CORS issues

3. **Security**
   - Never share API keys publicly
   - Clear history before screenshots
   - Use environment variables for sensitive data (future feature)
   - Be aware localStorage is not encrypted

4. **Performance**
   - Use direct mode when possible (faster)
   - Monitor response times
   - Check response sizes
   - Test with small payloads first

**Limitations & Known Issues**:

1. **File Uploads**: Not supported yet (binary data)
2. **WebSocket**: Only HTTP/HTTPS supported
3. **Streaming**: Doesn't support streaming responses
4. **Large Responses**: May slow down for very large responses (>10MB)
5. **History Limit**: Only 20 requests saved
6. **localStorage**: Limited to ~5-10MB depending on browser

**Future Enhancements** (Planned):

1. Environment variables for API keys
2. Request collections/folders
3. Pre-request scripts
4. Response assertions
5. File upload support
6. Export history as Postman collection
7. Syntax highlighting for response body
8. GraphQL support
9. WebSocket testing
10. Bulk request testing

---

## State Management

### Zustand Store (Branding Feature)

**File**: `stores/branding-store.ts`

**Usage Pattern**:
```typescript
// In component
const { typography, colors, setFontFamily, setColor } = useBrandingStore();

// Update state
setFontFamily("Roboto, system-ui, sans-serif");
setColor("primary", "#3b82f6");
```

**Store Actions** (25+ total):

| Action | Parameters | Purpose | Status |
|--------|------------|---------|--------|
| **Typography** ||||
| `setFontFamily` | fontFamily: string | Update font family | ✅ |
| `setHeadingSize` | heading: h1-h6, size: string | Update H1-H6 sizes | ✅ |
| `setBodySize` | size: string | Update body text size | ✅ |
| `setLineHeight` | lineHeight: string | Update line height | ✅ |
| `setLetterSpacing` | key: tight\|normal\|wide, value: string | Update letter spacing | 🆕 |
| `setFontWeight` | weight: light-bold, value: number | Update font weights | ✅ |
| **Colors** ||||
| `setColor` | colorKey: ColorPalette, color: string | Update light mode color (11 colors) | ✅ |
| `setDarkModeColor` | colorKey: DarkModeColors, color: string | Update dark mode color | 🆕 |
| `toggleDarkMode` | - | Toggle dark mode preview | 🆕 |
| **Spacing & Layout** ||||
| `setSpacing` | key: xs-4xl, value: string | Update spacing scale (8 levels) | ✅ |
| `setBorderRadius` | key: none-full, value: string | Update border radius (6 options) | ✅ |
| `setShadow` | key: sm-inner, value: string | Update shadow values | 🆕 |
| **Animation** ||||
| `setAnimationDuration` | key: fast\|normal\|slow, value: string | Update animation duration | 🆕 |
| `setAnimationEasing` | key: linear\|easeIn\|easeOut\|easeInOut, value: string | Update easing function | 🆕 |
| **Grid** ||||
| `setGridColumns` | columns: number | Update grid column count | 🆕 |
| `setGridGap` | gap: string | Update grid gap | 🆕 |
| `setContainerMaxWidth` | maxWidth: string | Update container width | 🆕 |
| **Breakpoints** ||||
| `setBreakpoint` | key: sm-2xl, value: string | Update responsive breakpoint | 🆕 |
| **Z-Index** ||||
| `setZIndex` | key: dropdown-tooltip, value: number | Update z-index layer | 🆕 |
| **Presets & State** ||||
| `loadPreset` | preset: BrandingPreset | Load design preset (4 available) | ✅ |
| `reset` | - | Reset to default state | ✅ |
| `exportState` | - | Export current state for versioning | 🆕 |
| `loadState` | state: BrandingState | Load saved state | 🆕 |

**Component Subscribers**:
- TypographyControls - Uses typography actions
- ColorControls - Uses light mode color actions
- DarkModeControls 🆕 - Uses dark mode color actions
- SpacingControls - Uses spacing and borderRadius actions
- ShadowControls 🆕 - Uses shadow actions
- AnimationControls 🆕 - Uses animation actions
- EnhancedLivePreview 🆕 - Reads all state + dark mode toggle
- AdvancedCodeOutput 🆕 - Exports state in 5 formats
- BrandingPage - Uses exportState/loadState for version control

### Local Component State

**Image Converter** uses `useState` for:
- Current image file
- Selected format
- Quality setting
- Conversion result
- Loading state

**SEO Validator** uses `useState` for:
- Input URL
- Fetched meta tags
- Loading state
- Error messages

**API Tester** uses `useState` for:
- Current API request (method, URL, headers, body, auth)
- Response data (status, headers, body, timing)
- Loading state
- Error messages
- Request history (last 20 requests)
- UI state (history panel visibility, proxy toggle)

**Why localStorage?**
The API Tester persists request history to localStorage for:
- Automatic history saving across sessions
- No server/database required
- Privacy (data stays in browser)
- Fast access
- Simple implementation

**localStorage Key**: `"api-tester-history"`
**Max Entries**: 20 requests (FIFO - oldest removed)

---

## API Routes

### POST /api/convert-image

**Purpose**: Server-side image conversion using Sharp library

**Request**:
```typescript
Content-Type: multipart/form-data
{
  file: File,           // Image file
  format: string,       // "png" | "jpeg" | "webp"
  quality: string       // "1-100"
}
```

**Response**:
```typescript
Content-Type: image/{format}
// Binary image blob
```

**Implementation** (`app/api/convert-image/route.ts`):
```typescript
export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const file = formData.get("file") as File;
  const format = formData.get("format") as string;
  const quality = parseInt(formData.get("quality") as string);

  // Validate
  if (!file || !format) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  // Convert to Buffer
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  // Process with Sharp
  let sharpInstance = sharp(buffer);

  if (format === "jpeg") {
    sharpInstance = sharpInstance.jpeg({ quality });
  } else if (format === "png") {
    sharpInstance = sharpInstance.png({ quality });
  } else if (format === "webp") {
    sharpInstance = sharpInstance.webp({ quality });
  }

  const outputBuffer = await sharpInstance.toBuffer();

  return new NextResponse(outputBuffer, {
    headers: {
      "Content-Type": `image/${format}`,
      "Content-Disposition": `attachment; filename="converted.${format}"`,
    },
  });
}
```

---

### POST /api/fetch-meta

**Purpose**: Fetch and parse meta tags from any URL

**Request**:
```typescript
Content-Type: application/json
{
  "url": "https://example.com"
}
```

**Response**:
```typescript
{
  "metaTags": {
    "title": "Page Title",
    "description": "Page description",
    "image": "https://example.com/image.jpg",
    "ogTitle": "OG Title",
    "ogDescription": "OG Description",
    "ogImage": "https://example.com/og-image.jpg",
    "twitterCard": "summary_large_image",
    "twitterTitle": "Twitter Title",
    "twitterDescription": "Twitter Description",
    "twitterImage": "https://example.com/twitter-image.jpg"
  }
}
```

**Implementation** (`app/api/fetch-meta/route.ts`):
```typescript
export async function POST(request: NextRequest) {
  const { url } = await request.json();

  // Validate URL
  try {
    new URL(url);
  } catch {
    return NextResponse.json({ error: "Invalid URL" }, { status: 400 });
  }

  // Fetch with timeout
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 10000);

  const response = await fetch(url, {
    signal: controller.signal,
    headers: { "User-Agent": "Mozilla/5.0..." },
  });

  clearTimeout(timeout);
  const html = await response.text();

  // Parse with Metascraper
  const $ = cheerio.load(html);
  const metadata = await metascraper({ html, url });

  // Extract additional meta tags
  const ogTitle = $('meta[property="og:title"]').attr("content");
  const twitterCard = $('meta[name="twitter:card"]').attr("content");
  // ... more extractions

  return NextResponse.json({
    metaTags: {
      title: metadata.title,
      description: metadata.description,
      image: metadata.image,
      ogTitle,
      twitterCard,
      // ... all meta tags
    },
  });
}
```

**Features**:
- 10-second timeout
- User-Agent header for better compatibility
- Combines Metascraper + manual extraction
- Handles missing/optional fields

---

### POST /api/proxy-request

**Purpose**: CORS proxy for API testing - bypasses browser CORS restrictions

**What is this for?**
When testing APIs from a browser, you often encounter CORS (Cross-Origin Resource Sharing) errors. This happens when an API doesn't allow requests from web browsers. This proxy endpoint solves that problem by making the request from our server instead of directly from the browser.

**Request**:
```typescript
Content-Type: application/json
{
  "method": "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD" | "OPTIONS",
  "url": "https://example.com/api/endpoint",
  "headers": {
    "Content-Type": "application/json",
    "Authorization": "Bearer token123",
    // ... any custom headers
  },
  "body": "optional request body as string"
}
```

**Response**:
```typescript
{
  "status": 200,
  "statusText": "OK",
  "headers": {
    "content-type": "application/json",
    "content-length": "1234",
    // ... all response headers
  },
  "body": "response body as string"
}
```

**Implementation** (`app/api/proxy-request/route.ts`):
```typescript
export async function POST(request: NextRequest) {
  try {
    // Parse incoming request
    const { method, url, headers = {}, body } = await request.json();

    // Validate HTTP method
    const validMethods = ["GET", "POST", "PUT", "PATCH", "DELETE", "HEAD", "OPTIONS"];
    if (!validMethods.includes(method)) {
      return NextResponse.json(
        { error: `Invalid HTTP method: ${method}` },
        { status: 400 }
      );
    }

    // Validate URL
    try {
      new URL(url);
    } catch {
      return NextResponse.json(
        { error: "Invalid URL format" },
        { status: 400 }
      );
    }

    // Set up timeout (30 seconds)
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000);

    try {
      // Execute the proxied request
      const response = await fetch(url, {
        method,
        headers: headers as HeadersInit,
        body: method !== "GET" && method !== "HEAD" ? body : undefined,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      // Extract response headers
      const responseHeaders: Record<string, string> = {};
      response.headers.forEach((value, key) => {
        responseHeaders[key] = value;
      });

      // Get response body
      const responseBody = await response.text();

      // Return proxied response
      return NextResponse.json({
        status: response.status,
        statusText: response.statusText,
        headers: responseHeaders,
        body: responseBody,
      });

    } catch (fetchError: any) {
      clearTimeout(timeoutId);

      // Handle timeout
      if (fetchError.name === "AbortError") {
        return NextResponse.json(
          { error: "Request timeout (30 seconds)" },
          { status: 408 }
        );
      }

      // Handle other fetch errors
      return NextResponse.json(
        { error: fetchError.message || "Network request failed" },
        { status: 500 }
      );
    }

  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}
```

**Features**:
- **CORS Bypass**: Makes requests from server, avoiding browser CORS restrictions
- **30-second Timeout**: Prevents hanging requests
- **All HTTP Methods**: Supports GET, POST, PUT, PATCH, DELETE, HEAD, OPTIONS
- **Header Forwarding**: Passes all custom headers to target API
- **Body Support**: Forwards request body for POST/PUT/PATCH
- **Error Handling**: Graceful timeout and network error handling
- **Validation**: Validates HTTP method and URL format

**When to Use**:
- Testing third-party APIs that don't allow browser requests
- APIs without CORS headers
- Development/testing environments
- When you see "CORS policy" errors in browser console

**Security Considerations**:
- Only use for development/testing
- Don't expose sensitive API keys
- Consider rate limiting in production
- Validate URLs to prevent abuse

**Error Responses**:

| Status | Error | Cause |
|--------|-------|-------|
| 400 | Invalid HTTP method | Method not in allowed list |
| 400 | Invalid URL format | URL validation failed |
| 408 | Request timeout | Target API took >30 seconds |
| 500 | Network request failed | Fetch error (DNS, network) |
| 500 | Internal server error | Unexpected server error |

---

## Styling System

### Tailwind CSS Configuration

**File**: `tailwind.config.ts`

**Key Features**:
- Dark mode support: `darkMode: ["class"]`
- Custom color palette using CSS variables
- HSL color system for better manipulation
- Extended breakpoints
- Animation plugin

**Custom Colors** (from `app/globals.css`):
```css
:root {
  --background: 0 0% 100%;           /* white */
  --foreground: 222.2 84% 4.9%;      /* dark blue */
  --primary: 222.2 47.4% 11.2%;      /* primary color */
  --secondary: 210 40% 96.1%;        /* light grey */
  --accent: 210 40% 96.1%;           /* accent color */
  --destructive: 0 84.2% 60.2%;      /* red */
  --border: 214.3 31.8% 91.4%;       /* light grey border */
  --input: 214.3 31.8% 91.4%;        /* input border */
  --ring: 222.2 84% 4.9%;            /* focus ring */
  /* ... more colors */
}
```

### Component Styling with CVA

**Button Variants** (example from `components/ui/button.tsx`):
```typescript
const buttonVariants = cva(
  // Base styles
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);
```

**Usage**:
```typescript
<Button variant="outline" size="lg">
  Click me
</Button>
```

### Design System Output (Branding Tool)

**Generated CSS Structure** (182 lines):
1. **CSS Custom Properties** in `:root`
2. **Base Styles** for body, headings, paragraphs
3. **Utility Classes** for colors, spacing, font weights
4. **Component Styles** for buttons, cards, inputs

**Example Generated CSS**:
```css
:root {
  /* Typography */
  --font-family: Inter, system-ui, sans-serif;
  --font-size-h1: 3rem;
  --font-size-h2: 2.5rem;
  --font-size-body: 1rem;
  --line-height: 1.6;

  /* Colors */
  --color-primary: #3b82f6;
  --color-secondary: #64748b;
  --color-accent: #10b981;

  /* Spacing */
  --spacing-md: 1rem;
  --spacing-lg: 1.5rem;

  /* Border Radius */
  --border-radius-lg: 0.75rem;
}

body {
  font-family: var(--font-family);
  font-size: var(--font-size-body);
  line-height: var(--line-height);
  color: var(--color-text);
  background-color: var(--color-background);
}

.text-primary { color: var(--color-primary); }
.bg-primary { background-color: var(--color-primary); }
.p-md { padding: var(--spacing-md); }
.m-lg { margin: var(--spacing-lg); }

.btn {
  padding: var(--spacing-md) var(--spacing-lg);
  background-color: var(--color-primary);
  color: white;
  border-radius: var(--border-radius-lg);
  /* ... more styles */
}
```

---

## Type Definitions

### Image Types (`types/image.ts`)

```typescript
export type ImageFormat = "png" | "jpeg" | "webp" | "gif" | "bmp" | "tiff" | "avif" | "ico";

export interface ImageFile {
  file: File;
  preview: string;           // Data URL for preview
  size: number;              // File size in bytes
  width?: number;            // Image width in pixels
  height?: number;           // Image height in pixels
}

export interface ResizeOptions {
  width?: number;            // Target width in pixels
  height?: number;           // Target height in pixels
  maintainAspectRatio: boolean; // Lock aspect ratio
}

export interface TransformOptions {
  rotate?: number;           // Rotation angle in degrees
  flipHorizontal?: boolean;  // Flip horizontally
  flipVertical?: boolean;    // Flip vertically
}

export interface FilterOptions {
  grayscale?: boolean;       // Convert to grayscale
  sepia?: boolean;           // Apply sepia tone
  blur?: number;             // Blur intensity (0-10)
  sharpen?: boolean;         // Apply sharpening
  brightness?: number;       // Brightness adjustment (-100 to 100)
  contrast?: number;         // Contrast adjustment (-100 to 100)
}

export interface ConversionOptions {
  format: ImageFormat;
  quality: number;           // 1-100
  resize?: ResizeOptions;    // Optional resize options
  transform?: TransformOptions; // Optional transform options
  filter?: FilterOptions;    // Optional filter options
  preserveMetadata?: boolean; // Keep EXIF, ICC profile, etc.
}

export interface ConversionResult {
  blob: Blob;
  url: string;               // Object URL
  size: number;
}
```

---

### Branding Types (`types/branding.ts`)

```typescript
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
  background: string;
  text: string;
  border: string;
}

export interface SpacingScale {
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  "2xl": string;
}

export interface BorderRadiusScale {
  sm: string;
  md: string;
  lg: string;
  full: string;
}

export interface BrandingState {
  typography: TypographySettings;
  colors: ColorPalette;
  spacing: SpacingScale;
  borderRadius: BorderRadiusScale;
}

export type PresetName = "default" | "material" | "tailwind" | "bootstrap";
```

---

### SEO Types (`types/seo.ts`)

```typescript
export interface MetaTags {
  title?: string;
  description?: string;
  image?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogType?: string;
  twitterCard?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
}

export interface MetaValidation {
  isValid: boolean;
  warnings: string[];
  suggestions: string[];
}

export type Platform = "facebook" | "twitter" | "discord" | "reddit";
```

---

### API Tester Types (`types/api-tester.ts`)

```typescript
// ============================================
// HTTP METHODS
// ============================================
export type HTTPMethod =
  | "GET"      // Retrieve data
  | "POST"     // Create new resource
  | "PUT"      // Update/replace resource
  | "PATCH"    // Partial update
  | "DELETE"   // Remove resource
  | "HEAD"     // Get headers only
  | "OPTIONS"; // Get allowed methods (CORS preflight)

// ============================================
// BODY TYPES
// ============================================
export type BodyType =
  | "none"       // No request body
  | "json"       // JSON data (application/json)
  | "form-data"  // Form data (application/x-www-form-urlencoded)
  | "raw";       // Plain text (text/plain)

// ============================================
// AUTHENTICATION TYPES
// ============================================
export type AuthType =
  | "none"   // No authentication
  | "basic"  // Basic Auth (username:password, Base64 encoded)
  | "bearer"; // Bearer token (JWT, OAuth)

// ============================================
// DATA STRUCTURES
// ============================================

// Header key-value pair
export interface HeaderPair {
  id: string;          // Unique identifier (UUID)
  key: string;         // Header name (e.g., "Content-Type")
  value: string;       // Header value (e.g., "application/json")
  enabled: boolean;    // Whether to include in request
}

// Form data key-value pair
export interface FormDataPair {
  id: string;          // Unique identifier (UUID)
  key: string;         // Field name (e.g., "username")
  value: string;       // Field value (e.g., "john")
  enabled: boolean;    // Whether to include in request
}

// Basic authentication credentials
export interface BasicAuth {
  username: string;    // Username for Basic Auth
  password: string;    // Password for Basic Auth
  // Note: Automatically Base64 encoded when sent
}

// Bearer token authentication
export interface BearerAuth {
  token: string;       // Bearer token (JWT, OAuth, etc.)
}

// Authentication configuration
export interface AuthConfig {
  type: AuthType;      // Authentication method
  basic?: BasicAuth;   // Basic auth credentials (if type === "basic")
  bearer?: BearerAuth; // Bearer token (if type === "bearer")
}

// Request body configuration
export interface RequestBody {
  type: BodyType;              // Body format
  json?: string;               // JSON string (if type === "json")
  formData?: FormDataPair[];   // Form fields (if type === "form-data")
  raw?: string;                // Plain text (if type === "raw")
}

// Complete API request
export interface APIRequest {
  id: string;           // Unique identifier (UUID)
  method: HTTPMethod;   // HTTP method
  url: string;          // Target URL
  headers: HeaderPair[]; // Custom headers
  body: RequestBody;    // Request body
  auth: AuthConfig;     // Authentication
}

// API response
export interface APIResponse {
  status: number;                    // HTTP status code (200, 404, etc.)
  statusText: string;                // Status text ("OK", "Not Found", etc.)
  headers: Record<string, string>;   // Response headers
  body: string;                      // Response body (as string)
  size: number;                      // Response size in bytes
  time: number;                      // Request duration in milliseconds
}

// Request history entry
export interface RequestHistory {
  id: string;              // Unique identifier (UUID)
  request: APIRequest;     // The request that was sent
  response?: APIResponse;  // The response received (undefined if failed)
  timestamp: number;       // Unix timestamp (milliseconds)
  success: boolean;        // Whether request succeeded
}

// cURL parsing result
export interface CurlParseResult {
  method?: HTTPMethod;     // Extracted HTTP method
  url?: string;            // Extracted URL
  headers?: HeaderPair[];  // Extracted headers
  body?: RequestBody;      // Extracted body
  auth?: AuthConfig;       // Extracted authentication
}

// Validation result
export interface ValidationResult {
  isValid: boolean;        // Overall validity
  errors: string[];        // Blocking errors (prevent request)
  warnings: string[];      // Non-blocking warnings (show but allow)
}
```

**Type Usage Examples**:

**Creating a GET Request**:
```typescript
const getRequest: APIRequest = {
  id: "uuid-123",
  method: "GET",
  url: "https://api.example.com/users",
  headers: [
    { id: "h1", key: "Accept", value: "application/json", enabled: true }
  ],
  body: { type: "none" },
  auth: { type: "none" }
};
```

**Creating a POST Request with JSON**:
```typescript
const postRequest: APIRequest = {
  id: "uuid-456",
  method: "POST",
  url: "https://api.example.com/users",
  headers: [
    { id: "h1", key: "Content-Type", value: "application/json", enabled: true }
  ],
  body: {
    type: "json",
    json: '{"name":"John","email":"john@example.com"}'
  },
  auth: {
    type: "bearer",
    bearer: { token: "eyJhbGciOiJIUzI1NiIsInR5..." }
  }
};
```

**Creating a Form Data Request**:
```typescript
const formRequest: APIRequest = {
  id: "uuid-789",
  method: "POST",
  url: "https://example.com/contact",
  headers: [],
  body: {
    type: "form-data",
    formData: [
      { id: "f1", key: "name", value: "John Doe", enabled: true },
      { id: "f2", key: "email", value: "john@example.com", enabled: true },
      { id: "f3", key: "message", value: "Hello!", enabled: true }
    ]
  },
  auth: { type: "none" }
};
```

**Handling Response**:
```typescript
const response: APIResponse = {
  status: 200,
  statusText: "OK",
  headers: {
    "content-type": "application/json",
    "content-length": "1234"
  },
  body: '{"id":123,"name":"John"}',
  size: 1234,
  time: 456
};

// Check success
if (response.status >= 200 && response.status < 300) {
  console.log("Success!");
}
```

**Saving to History**:
```typescript
const historyEntry: RequestHistory = {
  id: "history-1",
  request: myRequest,
  response: myResponse,
  timestamp: Date.now(),
  success: true
};

// Add to history array
const history: RequestHistory[] = [historyEntry, ...previousHistory].slice(0, 20);
```

---

## Utilities & Helpers

### Core Utilities (`lib/utils.ts`)

#### cn() - Class Name Merger
```typescript
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```
**Purpose**: Combines clsx + tailwind-merge to intelligently merge Tailwind classes
**Usage**: Used in all components for conditional class names

#### formatBytes() - File Size Formatter
```typescript
export function formatBytes(bytes: number, decimals: number = 2): string {
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB"];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
}
```
**Purpose**: Convert bytes to human-readable format
**Usage**: Used in image preview for displaying file sizes

#### debounce() - Function Debouncer
```typescript
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;

  return function (...args: Parameters<T>) {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}
```
**Purpose**: Delay function execution until after a wait period
**Usage**: Optimize frequent updates (e.g., color picker changes)

---

### Image Converter Utilities (`lib/image-converter/client-converter.ts`)

#### convertImageClient() - Canvas-based Conversion
```typescript
export async function convertImageClient(
  file: File,
  options: ConversionOptions
): Promise<ConversionResult> {
  // Create image element
  const img = new Image();
  const reader = new FileReader();

  // Read file as Data URL
  const dataUrl = await new Promise<string>((resolve) => {
    reader.onload = (e) => resolve(e.target!.result as string);
    reader.readAsDataURL(file);
  });

  // Load image
  await new Promise((resolve) => {
    img.onload = resolve;
    img.src = dataUrl;
  });

  // Create canvas and draw image
  const canvas = document.createElement("canvas");
  canvas.width = img.width;
  canvas.height = img.height;
  const ctx = canvas.getContext("2d")!;
  ctx.drawImage(img, 0, 0);

  // Convert to blob
  const mimeType = `image/${options.format}`;
  const blob = await new Promise<Blob>((resolve) => {
    canvas.toBlob((b) => resolve(b!), mimeType, options.quality / 100);
  });

  // Apply compression if quality < 100
  const finalBlob = options.quality < 100
    ? await imageCompression(new File([blob], "image"), {
        maxSizeMB: 10,
        useWebWorker: true,
      })
    : blob;

  return {
    blob: finalBlob,
    url: URL.createObjectURL(finalBlob),
    size: finalBlob.size,
    format: options.format,
  };
}
```

#### validateImageFile() - File Validator
```typescript
const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB

export function validateImageFile(file: File): { valid: boolean; error?: string } {
  // Check file type
  const validTypes = ["image/png", "image/jpeg", "image/webp"];
  if (!validTypes.includes(file.type)) {
    return {
      valid: false,
      error: "Invalid file type. Please upload PNG, JPEG, or WEBP images.",
    };
  }

  // Check file size
  if (file.size > MAX_FILE_SIZE) {
    return {
      valid: false,
      error: `File size exceeds ${formatBytes(MAX_FILE_SIZE)}`,
    };
  }

  return { valid: true };
}
```

---

### SEO Validator Utilities (`lib/seo-validator/meta-validator.ts`)

#### validateMetaTags() - Meta Tag Validator
```typescript
export function validateMetaTags(meta: MetaTags): MetaValidation {
  const warnings: string[] = [];
  const suggestions: string[] = [];

  // Validate title
  if (!meta.title) {
    warnings.push("Missing title tag");
  } else if (meta.title.length < 30 || meta.title.length > 60) {
    suggestions.push("Title should be between 30-60 characters for optimal SEO");
  }

  // Validate description
  if (!meta.description) {
    warnings.push("Missing description meta tag");
  } else if (meta.description.length < 50 || meta.description.length > 160) {
    suggestions.push("Description should be between 50-160 characters");
  }

  // Validate image
  if (!meta.image && !meta.ogImage) {
    suggestions.push("Consider adding an image for better social media previews");
  }

  // Validate Open Graph
  if (!meta.ogTitle) {
    suggestions.push("Add og:title for better Facebook/LinkedIn sharing");
  }

  // Validate Twitter Card
  if (!meta.twitterCard) {
    suggestions.push("Add twitter:card for better Twitter previews");
  }

  return {
    isValid: warnings.length === 0,
    warnings,
    suggestions,
  };
}
```

#### getPlatformTitle() - Platform-specific Title Fallback
```typescript
export function getPlatformTitle(meta: MetaTags, platform: Platform): string {
  switch (platform) {
    case "twitter":
      return meta.twitterTitle || meta.ogTitle || meta.title || "No title";
    case "facebook":
    case "discord":
    case "reddit":
      return meta.ogTitle || meta.title || "No title";
    default:
      return meta.title || "No title";
  }
}
```

#### getPlatformDescription() - Platform-specific Description Fallback
```typescript
export function getPlatformDescription(meta: MetaTags, platform: Platform): string {
  switch (platform) {
    case "twitter":
      return meta.twitterDescription || meta.ogDescription || meta.description || "";
    case "facebook":
    case "discord":
    case "reddit":
      return meta.ogDescription || meta.description || "";
    default:
      return meta.description || "";
  }
}
```

#### getPlatformImage() - Platform-specific Image Fallback
```typescript
export function getPlatformImage(meta: MetaTags, platform: Platform): string | undefined {
  switch (platform) {
    case "twitter":
      return meta.twitterImage || meta.ogImage || meta.image;
    case "facebook":
    case "discord":
    case "reddit":
      return meta.ogImage || meta.image;
    default:
      return meta.image;
  }
}
```

---

### Branding Utilities

#### generateCSS() - CSS Generator (`lib/branding/css-generator.ts`)
```typescript
export function generateCSS(state: BrandingState): string {
  return `
/* Generated Design System CSS */

:root {
  /* Typography */
  --font-family: ${state.typography.fontFamily};
  --font-size-h1: ${state.typography.headingSizes.h1};
  --font-size-h2: ${state.typography.headingSizes.h2};
  --font-size-h3: ${state.typography.headingSizes.h3};
  --font-size-h4: ${state.typography.headingSizes.h4};
  --font-size-body: ${state.typography.bodySize};
  --line-height: ${state.typography.lineHeight};

  /* Font Weights */
  --font-weight-light: ${state.typography.fontWeights.light};
  --font-weight-normal: ${state.typography.fontWeights.normal};
  --font-weight-medium: ${state.typography.fontWeights.medium};
  --font-weight-semibold: ${state.typography.fontWeights.semibold};
  --font-weight-bold: ${state.typography.fontWeights.bold};

  /* Colors */
  --color-primary: ${state.colors.primary};
  --color-secondary: ${state.colors.secondary};
  --color-accent: ${state.colors.accent};
  --color-background: ${state.colors.background};
  --color-text: ${state.colors.text};
  --color-border: ${state.colors.border};

  /* Spacing */
  --spacing-xs: ${state.spacing.xs};
  --spacing-sm: ${state.spacing.sm};
  --spacing-md: ${state.spacing.md};
  --spacing-lg: ${state.spacing.lg};
  --spacing-xl: ${state.spacing.xl};
  --spacing-2xl: ${state.spacing["2xl"]};

  /* Border Radius */
  --border-radius-sm: ${state.borderRadius.sm};
  --border-radius-md: ${state.borderRadius.md};
  --border-radius-lg: ${state.borderRadius.lg};
  --border-radius-full: ${state.borderRadius.full};
}

/* Base Styles */
body {
  font-family: var(--font-family);
  font-size: var(--font-size-body);
  line-height: var(--line-height);
  color: var(--color-text);
  background-color: var(--color-background);
}

h1 { font-size: var(--font-size-h1); font-weight: var(--font-weight-bold); }
h2 { font-size: var(--font-size-h2); font-weight: var(--font-weight-bold); }
h3 { font-size: var(--font-size-h3); font-weight: var(--font-weight-semibold); }
h4 { font-size: var(--font-size-h4); font-weight: var(--font-weight-semibold); }

/* Utility Classes */
.text-primary { color: var(--color-primary); }
.text-secondary { color: var(--color-secondary); }
.text-accent { color: var(--color-accent); }

.bg-primary { background-color: var(--color-primary); }
.bg-secondary { background-color: var(--color-secondary); }
.bg-accent { background-color: var(--color-accent); }

/* Spacing Utilities */
.p-xs { padding: var(--spacing-xs); }
.p-sm { padding: var(--spacing-sm); }
.p-md { padding: var(--spacing-md); }
/* ... more spacing utilities ... */

/* Component Styles */
.btn {
  padding: var(--spacing-md) var(--spacing-lg);
  background-color: var(--color-primary);
  color: white;
  border: none;
  border-radius: var(--border-radius-lg);
  font-weight: var(--font-weight-medium);
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn:hover {
  opacity: 0.9;
  transform: translateY(-1px);
}

/* ... more component styles ... */
`.trim();
}
```

#### Design System Presets (`lib/branding/presets.ts`)
```typescript
export const presets: Record<PresetName, BrandingState> = {
  default: { /* Default design system */ },
  material: { /* Material Design 3 */ },
  tailwind: { /* Tailwind CSS defaults */ },
  bootstrap: { /* Bootstrap 5 */ },
};
```

---

### API Tester Utilities

#### Validation Utilities (`lib/api-tester/validation.ts`)

**validateRequest() - Complete Request Validation**
```typescript
export function validateRequest(request: APIRequest): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Validate URL
  if (!request.url.trim()) {
    errors.push("URL is required");
  } else if (!validateUrl(request.url)) {
    errors.push("Invalid URL format. Must use HTTP or HTTPS protocol");
  }

  // Validate JSON body
  if (request.body.type === "json" && request.body.json) {
    if (!validateJson(request.body.json)) {
      errors.push("Invalid JSON format in request body");
    }
  }

  // Warnings for common issues
  if (request.method === "GET" && request.body.type !== "none") {
    warnings.push("GET requests typically don't have a body");
  }

  if (request.auth.type === "basic") {
    if (!request.auth.basic?.username || !request.auth.basic?.password) {
      warnings.push("Basic auth credentials are incomplete");
    }
  }

  if (request.body.type === "json" && !request.headers.some(h =>
    h.enabled && h.key.toLowerCase() === "content-type"
  )) {
    warnings.push("Consider adding Content-Type: application/json header");
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
  };
}
```
**Purpose**: Validates entire request before sending
**Returns**: { isValid, errors[], warnings[] }
**Usage**: Called before executing request to prevent invalid API calls

**validateUrl() - URL Format Validation**
```typescript
export function validateUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    return parsed.protocol === "http:" || parsed.protocol === "https:";
  } catch {
    return false;
  }
}
```
**Purpose**: Ensures URL is valid HTTP/HTTPS format
**Usage**: Used in request validation

**validateJson() - JSON Format Validation**
```typescript
export function validateJson(json: string): boolean {
  try {
    JSON.parse(json);
    return true;
  } catch {
    return false;
  }
}
```
**Purpose**: Checks if string is valid JSON
**Usage**: Validates JSON body before sending request

---

#### cURL Parser (`lib/api-tester/curl-parser.ts`)

**parseCurlCommand() - Parse cURL Commands**
```typescript
export function parseCurlCommand(curlCommand: string): CurlParseResult {
  // Initialize result
  const result: CurlParseResult = {
    method: undefined,
    url: undefined,
    headers: [],
    body: undefined,
    auth: undefined,
  };

  // Clean up command (remove line breaks, extra spaces)
  const cleaned = curlCommand
    .replace(/\\\n/g, " ")     // Remove backslash line breaks
    .replace(/\s+/g, " ")       // Normalize whitespace
    .trim();

  // Extract URL (quoted or unquoted)
  const urlMatch = cleaned.match(/curl\s+['"]?([^'"}\s]+)['"]?/) ||
                   cleaned.match(/curl\s+([^\s]+)/);
  if (urlMatch) {
    result.url = urlMatch[1].replace(/['"]/g, "");
  }

  // Extract method (-X or --request)
  const methodMatch = cleaned.match(/(?:-X|--request)\s+['"]?(\w+)['"]?/);
  if (methodMatch) {
    result.method = methodMatch[1].toUpperCase() as HTTPMethod;
  }

  // Extract headers (-H or --header)
  const headerRegex = /(?:-H|--header)\s+['"]([^'"]+)['"]/g;
  let headerMatch;
  const headers: HeaderPair[] = [];

  while ((headerMatch = headerRegex.exec(cleaned)) !== null) {
    const headerValue = headerMatch[1];
    const colonIndex = headerValue.indexOf(":");

    if (colonIndex > -1) {
      const key = headerValue.substring(0, colonIndex).trim();
      const value = headerValue.substring(colonIndex + 1).trim();

      // Check if this is an Authorization header
      if (key.toLowerCase() === "authorization") {
        // Extract auth type
        if (value.startsWith("Bearer ")) {
          result.auth = {
            type: "bearer",
            bearer: { token: value.substring(7) }
          };
        } else if (value.startsWith("Basic ")) {
          // Decode Basic auth
          const decoded = atob(value.substring(6));
          const [username, password] = decoded.split(":");
          result.auth = {
            type: "basic",
            basic: { username, password }
          };
        }
      } else {
        headers.push({
          id: crypto.randomUUID(),
          key,
          value,
          enabled: true
        });
      }
    }
  }

  result.headers = headers;

  // Extract body (-d, --data, --data-raw, --data-binary)
  const bodyMatch = cleaned.match(/(?:-d|--data|--data-raw|--data-binary)\s+['"]([^'"]+)['"]/);
  if (bodyMatch) {
    const bodyContent = bodyMatch[1];

    // Try to parse as JSON
    try {
      JSON.parse(bodyContent);
      result.body = {
        type: "json",
        json: bodyContent
      };
    } catch {
      // If not JSON, treat as raw
      result.body = {
        type: "raw",
        raw: bodyContent
      };
    }
  }

  // Extract Basic auth from -u flag
  const userMatch = cleaned.match(/(?:-u|--user)\s+['"]?([^'"}\s]+)['"]?/);
  if (userMatch && !result.auth) {
    const [username, password] = userMatch[1].split(":");
    result.auth = {
      type: "basic",
      basic: { username, password: password || "" }
    };
  }

  return result;
}
```
**Purpose**: Parses complex cURL commands into request structure
**Supports**:
- Multiple header syntaxes (-H, --header)
- Method flags (-X, --request)
- Data flags (-d, --data, --data-raw, --data-binary)
- Auth flags (-u, --user)
- Quoted and unquoted values
- Line breaks with backslash
- Base64 encoded Basic auth

**Usage Example**:
```typescript
const curl = `curl -X POST 'https://api.example.com/users' \\
  -H 'Authorization: Bearer token123' \\
  -H 'Content-Type: application/json' \\
  -d '{"name":"John"}'`;

const parsed = parseCurlCommand(curl);
// Result:
// {
//   method: "POST",
//   url: "https://api.example.com/users",
//   headers: [{ key: "Content-Type", value: "application/json", ... }],
//   body: { type: "json", json: '{"name":"John"}' },
//   auth: { type: "bearer", bearer: { token: "token123" } }
// }
```

---

#### cURL Generator (`lib/api-tester/curl-generator.ts`)

**generateCurlCommand() - Generate cURL from Request**
```typescript
export function generateCurlCommand(request: APIRequest): string {
  const parts: string[] = ["curl"];

  // Add method (skip if GET)
  if (request.method !== "GET") {
    parts.push(`-X ${request.method}`);
  }

  // Add URL (with quotes)
  parts.push(`'${request.url}'`);

  // Build headers (custom + auth)
  const headers = buildHeadersForCurl(request);

  Object.entries(headers).forEach(([key, value]) => {
    // Escape single quotes in header values
    const escapedValue = value.replace(/'/g, "\\'");
    parts.push(`-H '${key}: ${escapedValue}'`);
  });

  // Add body (if applicable and present)
  if (request.method !== "GET" && request.method !== "HEAD") {
    if (request.body.type === "json" && request.body.json) {
      const escapedJson = request.body.json.replace(/'/g, "\\'");
      parts.push(`-d '${escapedJson}'`);
    } else if (request.body.type === "form-data" && request.body.formData) {
      const formData = request.body.formData
        .filter(pair => pair.enabled)
        .map(pair => `${encodeURIComponent(pair.key)}=${encodeURIComponent(pair.value)}`)
        .join("&");
      if (formData) {
        parts.push(`-d '${formData}'`);
      }
    } else if (request.body.type === "raw" && request.body.raw) {
      const escapedRaw = request.body.raw.replace(/'/g, "\\'");
      parts.push(`-d '${escapedRaw}'`);
    }
  }

  // Join with backslash line breaks for readability
  return parts.join(" \\\n  ");
}
```
**Purpose**: Converts APIRequest to valid cURL command
**Features**:
- Escapes single quotes in values
- Multi-line format with backslash continuation
- Includes method, URL, headers, body
- Handles all body types (JSON, form, raw)

**buildHeadersForCurl() - Build Headers including Auth**
```typescript
export function buildHeadersForCurl(request: APIRequest): Record<string, string> {
  const headers: Record<string, string> = {};

  // Add custom headers
  request.headers
    .filter(h => h.enabled)
    .forEach(h => {
      headers[h.key] = h.value;
    });

  // Add auth header
  if (request.auth.type === "bearer" && request.auth.bearer?.token) {
    headers["Authorization"] = `Bearer ${request.auth.bearer.token}`;
  } else if (request.auth.type === "basic" && request.auth.basic) {
    const { username, password } = request.auth.basic;
    const encoded = btoa(`${username}:${password}`);
    headers["Authorization"] = `Basic ${encoded}`;
  }

  // Auto-add Content-Type for JSON
  if (request.body.type === "json" && !headers["Content-Type"]) {
    headers["Content-Type"] = "application/json";
  }

  return headers;
}
```
**Purpose**: Merges custom headers with auto-generated headers (auth, content-type)

**Usage Example**:
```typescript
const request: APIRequest = {
  method: "POST",
  url: "https://api.example.com/users",
  headers: [{ key: "Accept", value: "application/json", enabled: true }],
  body: { type: "json", json: '{"name":"John"}' },
  auth: { type: "bearer", bearer: { token: "abc123" } }
};

const curl = generateCurlCommand(request);
// Result:
// curl -X POST \
//   'https://api.example.com/users' \
//   -H 'Accept: application/json' \
//   -H 'Authorization: Bearer abc123' \
//   -H 'Content-Type: application/json' \
//   -d '{"name":"John"}'
```

---

#### Request Executor (`lib/api-tester/request-executor.ts`)

**executeRequest() - Execute API Request**
```typescript
export async function executeRequest(
  request: APIRequest,
  useProxy: boolean = false
): Promise<APIResponse> {
  const startTime = performance.now();

  try {
    let response: Response;

    if (useProxy) {
      // Use server proxy
      response = await fetch("/api/proxy-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          method: request.method,
          url: request.url,
          headers: buildHeaders(request),
          body: buildBody(request),
        }),
      });

      // Parse proxy response
      const proxyData = await response.json();

      if (response.ok) {
        const endTime = performance.now();
        return {
          status: proxyData.status,
          statusText: proxyData.statusText,
          headers: proxyData.headers,
          body: proxyData.body,
          size: new Blob([proxyData.body]).size,
          time: Math.round(endTime - startTime),
        };
      } else {
        throw new Error(proxyData.error || "Proxy request failed");
      }
    } else {
      // Direct fetch
      response = await fetch(request.url, {
        method: request.method,
        headers: buildHeaders(request),
        body: buildBody(request),
      });

      // Parse response
      const responseHeaders: Record<string, string> = {};
      response.headers.forEach((value, key) => {
        responseHeaders[key] = value;
      });

      const responseBody = await response.text();
      const endTime = performance.now();

      return {
        status: response.status,
        statusText: response.statusText,
        headers: responseHeaders,
        body: responseBody,
        size: new Blob([responseBody]).size,
        time: Math.round(endTime - startTime),
      };
    }
  } catch (error: any) {
    const endTime = performance.now();

    // Detect CORS error
    if (error.message.includes("Failed to fetch")) {
      throw new Error(
        "Request failed. This might be a CORS issue. Try enabling the proxy option."
      );
    }

    throw new Error(error.message || "Network request failed");
  }
}
```
**Purpose**: Executes API request with optional proxy
**Features**:
- Two modes: direct fetch or server proxy
- Measures request time (performance.now())
- Captures full response (status, headers, body, size)
- CORS error detection & suggestion
- Error handling

**buildHeaders() - Build Request Headers**
```typescript
export function buildHeaders(request: APIRequest): Record<string, string> {
  const headers: Record<string, string> = {};

  // Add enabled custom headers
  request.headers
    .filter(h => h.enabled && h.key && h.value)
    .forEach(h => {
      headers[h.key] = h.value;
    });

  // Add Authorization header
  if (request.auth.type === "bearer" && request.auth.bearer?.token) {
    headers["Authorization"] = `Bearer ${request.auth.bearer.token}`;
  } else if (request.auth.type === "basic" && request.auth.basic) {
    const { username, password } = request.auth.basic;
    const encoded = btoa(`${username}:${password}`);
    headers["Authorization"] = `Basic ${encoded}`;
  }

  // Auto-add Content-Type for JSON
  if (request.body.type === "json" && !headers["Content-Type"]) {
    headers["Content-Type"] = "application/json";
  } else if (request.body.type === "form-data" && !headers["Content-Type"]) {
    headers["Content-Type"] = "application/x-www-form-urlencoded";
  }

  return headers;
}
```
**Purpose**: Builds complete headers including auth and content-type

**buildBody() - Build Request Body**
```typescript
export function buildBody(request: APIRequest): string | undefined {
  // No body for GET/HEAD
  if (request.method === "GET" || request.method === "HEAD") {
    return undefined;
  }

  if (request.body.type === "json") {
    return request.body.json || undefined;
  } else if (request.body.type === "form-data" && request.body.formData) {
    const params = new URLSearchParams();
    request.body.formData
      .filter(pair => pair.enabled && pair.key)
      .forEach(pair => {
        params.append(pair.key, pair.value);
      });
    return params.toString();
  } else if (request.body.type === "raw") {
    return request.body.raw || undefined;
  }

  return undefined;
}
```
**Purpose**: Formats body based on type (JSON, form, raw)
**Features**:
- Skips body for GET/HEAD requests
- URL-encodes form data
- Returns raw JSON/text as-is

---

#### Response Formatter (`lib/api-tester/response-formatter.ts`)

**formatResponseBody() - Format Response for Display**
```typescript
export function formatResponseBody(body: string, contentType?: string): string {
  if (!contentType) return body;

  // JSON formatting
  if (contentType.includes("application/json")) {
    try {
      const parsed = JSON.parse(body);
      return JSON.stringify(parsed, null, 2);  // Pretty-print with 2-space indent
    } catch {
      return body;  // Return raw if invalid JSON
    }
  }

  // XML/HTML formatting
  if (contentType.includes("xml") || contentType.includes("html")) {
    return formatXML(body);
  }

  // Default: return as-is
  return body;
}
```
**Purpose**: Formats response body based on content-type
**Supports**: JSON (pretty-print), XML/HTML (indent), plain text

**formatXML() - Basic XML Indentation**
```typescript
export function formatXML(xml: string): string {
  const PADDING = "  ";
  let formatted = "";
  let indent = 0;

  xml.split(/>\s*</).forEach((node) => {
    if (node.match(/^\/\w/)) indent--; // Closing tag
    formatted += PADDING.repeat(indent) + "<" + node + ">\n";
    if (node.match(/^<?\w[^>]*[^\/]$/)) indent++; // Opening tag
  });

  return formatted.trim();
}
```

**Color & Styling Utilities**:

```typescript
// Status badge color based on HTTP status code
export function getStatusBadgeColor(status: number): string {
  if (status >= 200 && status < 300) return "bg-green-100 text-green-800";
  if (status >= 300 && status < 400) return "bg-blue-100 text-blue-800";
  if (status >= 400 && status < 500) return "bg-orange-100 text-orange-800";
  if (status >= 500) return "bg-red-100 text-red-800";
  return "bg-gray-100 text-gray-800";
}

// Status text color
export function getStatusColor(status: number): string {
  if (status >= 200 && status < 300) return "text-green-600";
  if (status >= 300 && status < 400) return "text-blue-600";
  if (status >= 400 && status < 500) return "text-orange-600";
  if (status >= 500) return "text-red-600";
  return "text-gray-600";
}

// Button variant for status
export function getStatusVariant(status: number): "default" | "destructive" | "secondary" {
  if (status >= 200 && status < 300) return "default";
  if (status >= 400) return "destructive";
  return "secondary";
}

// HTTP method color coding
export function getMethodColor(method: HTTPMethod): string {
  const colors: Record<HTTPMethod, string> = {
    GET: "bg-blue-100 text-blue-800",
    POST: "bg-green-100 text-green-800",
    PUT: "bg-orange-100 text-orange-800",
    PATCH: "bg-yellow-100 text-yellow-800",
    DELETE: "bg-red-100 text-red-800",
    HEAD: "bg-gray-100 text-gray-800",
    OPTIONS: "bg-purple-100 text-purple-800",
  };
  return colors[method] || "bg-gray-100 text-gray-800";
}

// Status emoji
export function getStatusEmoji(status: number): string {
  if (status >= 200 && status < 300) return "✓";  // Success
  if (status >= 300 && status < 400) return "↗";  // Redirect
  if (status >= 400 && status < 500) return "⚠";  // Client error
  if (status >= 500) return "✗";                  // Server error
  return "•";
}
```

**Purpose**: Provides consistent color coding and styling for status codes and HTTP methods
**Usage**: Used throughout ResponseViewer and HistoryPanel components

---

## Naming Conventions

### File Naming
| Type | Convention | Example |
|------|------------|---------|
| Page files | `page.tsx` | `app/image-converter/page.tsx` |
| API routes | `route.ts` | `app/api/convert-image/route.ts` |
| Components | PascalCase | `ImageUploader.tsx` |
| Utilities | camelCase with hyphens | `client-converter.ts` |
| Types | camelCase | `image.ts`, `branding.ts` |
| Stores | camelCase with `-store` suffix | `branding-store.ts` |

### Component & Variable Naming
| Type | Convention | Example |
|------|------------|---------|
| React components | PascalCase | `ImageUploader`, `FormatSelector` |
| Props interfaces | `ComponentNameProps` | `ImageUploaderProps` |
| Functions | camelCase | `convertImageClient`, `validateMetaTags` |
| Boolean variables | `is*`, `has*` prefix | `isConverting`, `hasError` |
| Event handlers | `handle*` prefix | `handleConvert`, `handleCopy` |
| Constants | UPPER_SNAKE_CASE | `MAX_FILE_SIZE`, `DEFAULT_QUALITY` |
| Type aliases | PascalCase | `ImageFormat`, `Platform` |

### CSS Class Naming
- Tailwind utility classes primarily
- Custom classes use kebab-case (e.g., `btn-primary`)
- BEM methodology for complex components (if needed)

---

## Development Guidelines

### When Adding New Features

1. **Create Type Definitions First**
   - Define interfaces in `/types` directory
   - Export types for reuse

2. **Create Utility Functions**
   - Add business logic to `/lib` directory
   - Keep functions pure and testable
   - Add validation functions

3. **Build Components**
   - Create feature-specific components in `/components/[feature]`
   - Use shadcn/ui components where possible
   - Follow existing component patterns

4. **Add Page Routes**
   - Create page in `/app/[route]/page.tsx`
   - Use Server Components by default
   - Add 'use client' only when needed

5. **Add API Routes (if needed)**
   - Create route handler in `/app/api/[route]/route.ts`
   - Validate input data
   - Handle errors gracefully

6. **Update Navigation**
   - Add link to `components/layout/navigation.tsx`
   - Add route highlighting logic

### Code Patterns to Follow

#### Component Structure
```typescript
'use client'; // Only if needed

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { formatBytes } from '@/lib/utils';

interface ComponentProps {
  onAction: (value: string) => void;
  isLoading: boolean;
}

export function ComponentName({ onAction, isLoading }: ComponentProps) {
  const [state, setState] = useState('');

  const handleClick = async () => {
    try {
      // Logic
      onAction(state);
    } catch (error) {
      alert('Error message');
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <Button onClick={handleClick} disabled={isLoading}>
        Click me
      </Button>
    </div>
  );
}
```

#### API Route Pattern
```typescript
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    // Parse input
    const { data } = await request.json();

    // Validate
    if (!data) {
      return NextResponse.json(
        { error: 'Missing required field' },
        { status: 400 }
      );
    }

    // Process
    const result = await processData(data);

    // Return success
    return NextResponse.json({ result });

  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
```

#### Zustand Store Pattern
```typescript
import { create } from 'zustand';

interface StoreState {
  value: string;
  setValue: (value: string) => void;
}

export const useStore = create<StoreState>((set) => ({
  value: '',
  setValue: (value) => set({ value }),
}));
```

### Error Handling

1. **Client-side**: Use try-catch with user-friendly alerts
2. **Server-side**: Return appropriate HTTP status codes
3. **Validation**: Validate early and return clear error messages
4. **File operations**: Validate file type and size before processing

### Performance Considerations

1. **Image processing**: Prefer client-side for speed, server-side for quality
2. **State updates**: Use Zustand for global state, useState for local
3. **Debounce**: Use debounce for frequent updates (e.g., color picker)
4. **Code splitting**: Use dynamic imports for heavy components

### Security Best Practices

1. **URL validation**: Always validate URLs before fetching
2. **File validation**: Check file types and sizes
3. **Timeout**: Set timeouts for external requests (10s)
4. **Sanitization**: Use Cheerio for safe HTML parsing
5. **Error messages**: Don't expose internal details in errors

---

## Common Tasks

### Adding a New Page

1. Create `app/[route]/page.tsx`
2. Add link to Navigation component
3. Add route highlighting in Navigation

### Adding a New Component

1. Create component in appropriate directory
2. Define Props interface
3. Export component as named export
4. Import and use in page

### Adding a New API Route

1. Create `app/api/[route]/route.ts`
2. Export POST/GET function
3. Validate input
4. Return appropriate responses

### Modifying Branding Store

1. Update state interface in `stores/branding-store.ts`
2. Add action function
3. Update controls component
4. Update live preview component

### Adding a New shadcn/ui Component

1. Run `npx shadcn-ui@latest add [component-name]`
2. Component will be added to `components/ui/`
3. Customize styling if needed

---

## Troubleshooting

### Common Issues

**Issue**: TypeScript errors in shadcn components
**Solution**: Ensure all Radix UI dependencies are installed

**Issue**: Tailwind classes not working
**Solution**: Check that file is included in `tailwind.config.ts` content array

**Issue**: Image conversion fails
**Solution**: Check file size (max 50MB) and type (PNG/JPEG/WEBP only)

**Issue**: Meta tag fetching timeout
**Solution**: URL may be slow to respond, increase timeout in API route

**Issue**: Zustand store not updating
**Solution**: Ensure you're calling the action function, not setting state directly

---

## Additional Resources

### Documentation Files
- `docs/ARCHITECTURE.md` - System architecture details
- `docs/FEATURES.md` - Detailed feature documentation
- `docs/API.md` - API route documentation
- `docs/DEPLOYMENT.md` - Deployment guide

### External Resources
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [shadcn/ui Documentation](https://ui.shadcn.com)
- [Radix UI Documentation](https://www.radix-ui.com)
- [Zustand Documentation](https://zustand-demo.pmnd.rs)

---

## Project Statistics

- **Total TypeScript Files**: 70+ components, utilities, and pages
- **UI Components**: 11 shadcn/ui components
- **Feature Pages**: 4 main features (Image Converter, SEO Validator, Branding Design System, API Tester)
- **API Routes**: 3 active endpoints (image conversion, meta fetching, CORS proxy)
- **State Stores**: 1 Zustand store (Branding)
- **Type Definitions**: 4 feature-specific type files
- **Feature Components**:
  - Image Converter: 3 components
  - SEO Validator: 2 components
  - Branding: 5 components
  - API Tester: 8 components
- **Utility Modules**:
  - Core: 1 module (utils.ts)
  - Image Converter: 1 module
  - SEO Validator: 1 module
  - Branding: 2 modules
  - API Tester: 5 modules
- **Dependencies**: 35 total packages (26 production + 9 dev)

**Lines of Code (Approximate)**:
- Components: ~3,500 lines
- Utilities: ~1,800 lines
- Types: ~500 lines
- API Routes: ~400 lines
- **Total**: ~6,200 lines of TypeScript

---

**End of Documentation**

This file should be updated whenever significant changes are made to the project structure, patterns, or conventions.
