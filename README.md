# Branding Tools - Multi-Feature Next.js Application

A comprehensive Next.js 16 application featuring three powerful tools for web developers:

1. **Image Converter** - Convert images between PNG, WEBP, and JPG formats
2. **SEO Validator** - Preview and validate social media meta tags
3. **Branding Design System** - Create and export custom design systems

## Features

### Image Converter
- Convert between PNG, JPEG, and WEBP formats
- Client-side conversion for privacy and speed
- Server-side conversion option using Sharp for high quality
- Quality control with preview
- Drag-and-drop file upload
- Before/after comparison

### SEO Card Validator
- Preview how links appear on Facebook, Twitter, Discord, and Reddit
- Extract and validate Open Graph and Twitter Card meta tags
- Detailed warnings and suggestions for missing tags
- Real-time preview updates

### Branding Design System
- Live preview of design changes
- Typography customization (fonts, sizes, weights)
- Color palette management with visual picker
- Spacing and border radius controls
- Export production-ready CSS
- Pre-built design system presets (Material, Tailwind, Bootstrap)

## Tech Stack

- **Framework**: Next.js 16 with App Router
- **Language**: TypeScript 5.3+
- **Styling**: Tailwind CSS 4.x
- **UI Components**: shadcn/ui (Radix UI primitives)
- **State Management**: Zustand
- **Image Processing**: Sharp (server), browser-image-compression (client)
- **Meta Scraping**: Cheerio, Metascraper
- **Validation**: Zod

## Getting Started

### Prerequisites

- Node.js 18.17.0 or higher
- npm 9.0.0 or higher

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd "Branding Project"
```

2. Install dependencies
```bash
npm install
```

3. Run the development server
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
npm run build
npm run start
```

## Project Structure

```
Branding Project/
├── app/                          # Next.js App Router
│   ├── layout.tsx                # Root layout
│   ├── page.tsx                  # Landing page
│   ├── image-converter/          # Image converter feature
│   ├── seo-validator/            # SEO validator feature
│   ├── branding/                 # Branding tool feature
│   └── api/                      # API routes
├── components/                   # React components
│   ├── ui/                       # shadcn/ui components
│   ├── layout/                   # Navigation, footer
│   ├── image-converter/          # Image converter components
│   ├── seo-validator/            # SEO validator components
│   └── branding/                 # Branding tool components
├── lib/                          # Utility functions and logic
├── stores/                       # Zustand stores
├── types/                        # TypeScript type definitions
└── docs/                         # Documentation

```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier

## Environment Variables

No environment variables required for basic functionality.

Optional:
- `NEXT_PUBLIC_APP_URL` - Your production URL

## Documentation

- [Architecture Documentation](./docs/ARCHITECTURE.md)
- [Features Documentation](./docs/FEATURES.md)
- [API Documentation](./docs/API.md)
- [Deployment Guide](./docs/DEPLOYMENT.md)

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)

## License

ISC

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
