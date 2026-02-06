# Architecture Documentation

## System Overview

This application is built using Next.js 16 with the App Router architecture, featuring three independent tools that share a common UI framework and design system.

## Architecture Principles

1. **Modularity**: Each feature is self-contained with its own components, logic, and types
2. **Type Safety**: Full TypeScript coverage with strict mode enabled
3. **Performance**: Client-side processing where possible, server-side for quality
4. **Privacy**: Image conversion happens in-browser by default
5. **Scalability**: Component-based architecture allows easy feature additions

## Directory Structure

### `/app` - Next.js App Router
Uses the Next.js 16 App Router for file-system based routing and React Server Components.

- **layout.tsx**: Root layout with navigation and footer
- **page.tsx**: Landing page
- **[feature]/page.tsx**: Individual feature pages
- **api/**: API routes for server-side operations

### `/components` - React Components
Organized by feature and shared UI components.

- **ui/**: shadcn/ui components (Button, Card, Input, etc.)
- **layout/**: Navigation, Footer
- **[feature]/**: Feature-specific components

### `/lib` - Business Logic
Pure functions and utilities separated from UI components.

- **utils.ts**: Common utilities (cn, formatBytes, debounce)
- **[feature]/**: Feature-specific logic

### `/stores` - State Management
Zustand stores for client-side state management.

- **branding-store.ts**: Design system state with actions

### `/types` - TypeScript Definitions
Centralized type definitions for type safety.

## Data Flow

### Image Converter
```
User uploads file
  → Validation (client)
  → User selects format/quality
  → Conversion (client or server)
  → Preview & download
```

**Client-side flow**:
- File → Canvas API → toBlob → browser-image-compression → Download

**Server-side flow**:
- File → FormData → API route → Sharp → Response blob → Download

### SEO Validator
```
User enters URL
  → API route fetch & parse
  → Validation
  → Display previews for 4 platforms
```

**Flow**:
- URL → API POST → fetch HTML → Cheerio parse → Metascraper extract → Response JSON → UI display

### Branding Tool
```
User adjusts controls
  → Zustand store update
  → Live preview re-render
  → CSS generation
  → Export
```

**Flow**:
- Control change → Store action → Subscribers update → CSS generator → Download

## Component Hierarchy

### Image Converter
```
ImageConverterPage
├── ImageUploader (react-dropzone)
├── FormatSelector
├── ConversionPreview
│   ├── Original preview
│   └── Converted preview
└── Download button
```

### SEO Validator
```
SEOValidatorPage
├── URL Input Form
├── MetaDataDisplay
│   ├── Validation status
│   └── Meta tags list
└── PlatformPreviews (Tabs)
    ├── FacebookPreview
    ├── TwitterPreview
    ├── DiscordPreview
    └── RedditPreview
```

### Branding Tool
```
BrandingPage
├── Preset Selector
├── Controls Column
│   ├── TypographyControls
│   ├── ColorControls
│   └── SpacingControls
└── Preview Column
    ├── LivePreview
    └── CodeOutput
```

## State Management

### Client State (Zustand)
- **Branding Store**: Design system configuration
  - Actions: setFontFamily, setColor, setSpacing, loadPreset, reset
  - Subscribers: All branding components

### Server State
- No dedicated server state library (React Server Components handle data fetching)
- API routes are stateless

## API Routes

### POST /api/convert-image
- Input: FormData (file, format, quality)
- Process: Sharp conversion
- Output: Image blob

### POST /api/fetch-meta
- Input: JSON { url }
- Process: Fetch HTML, parse with Cheerio/Metascraper
- Output: JSON { metaTags }

## Performance Optimizations

1. **Client-side image conversion**: No server round-trip needed
2. **Debounced preview updates**: Prevent excessive re-renders (branding tool)
3. **Code splitting**: Automatic per-route splitting via App Router
4. **Server Components**: Reduced client-side JavaScript
5. **Lazy loading**: Color picker only renders when active

## Security Considerations

1. **File validation**: Type and size limits on images
2. **URL validation**: Zod schema for URL inputs
3. **CORS protection**: Server-side fetching prevents CORS issues
4. **Input sanitization**: All user inputs validated
5. **Rate limiting**: Recommended for production API routes

## Error Handling

1. **File validation errors**: Displayed to user before upload
2. **Conversion errors**: Caught and displayed with user-friendly messages
3. **Network errors**: Timeout (10s) and error messages
4. **Invalid URLs**: Validation before API call

## Testing Strategy

### Unit Tests (Recommended: Vitest)
- Image validation logic
- Meta tag parsing
- CSS generation
- Utility functions

### E2E Tests (Recommended: Playwright)
- Complete user flows for each feature
- Cross-browser testing
- Accessibility testing

## Deployment Architecture

### Recommended: Vercel
- Automatic deployments from git
- Edge Functions for API routes
- Image optimization built-in
- Global CDN

### Alternative: Self-hosted
- Node.js 18+ required
- Sharp requires native dependencies
- Reverse proxy (nginx) recommended
