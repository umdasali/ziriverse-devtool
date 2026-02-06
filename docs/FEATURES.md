# Features Documentation

## 1. Image Converter

### Overview
Convert images between PNG, JPEG, and WEBP formats with quality control and preview.

### Features
- **Supported Formats**: PNG, JPEG, WEBP
- **Max File Size**: 50MB
- **Quality Control**: 1-100% adjustable
- **Conversion Modes**:
  - Client-side (fast, private)
  - Server-side (high quality, uses Sharp)

### How to Use

1. **Upload Image**
   - Drag and drop onto the upload area
   - Or click to select file from computer
   - Supported: PNG, JPG, WEBP (max 50MB)

2. **Select Output Format**
   - Choose from PNG, JPEG, or WEBP dropdown

3. **Adjust Quality**
   - Use slider to set quality (1-100%)
   - Higher quality = larger file size
   - Lower quality = smaller file size

4. **Choose Conversion Method**
   - Unchecked: Client-side (fast, runs in browser)
   - Checked: Server-side (best quality, uses Sharp library)

5. **Convert & Download**
   - Click "Convert Image" button
   - Preview shows before/after comparison
   - Click "Download" to save converted image

### Technical Details

**Client-side Conversion**:
- Uses HTML5 Canvas API
- Processed in browser (privacy-friendly)
- No file upload to server
- Compression via browser-image-compression library

**Server-side Conversion**:
- Uses Sharp library (industry standard)
- Higher quality output
- Better color management
- Slightly slower due to network upload

### Limitations
- Maximum file size: 50MB
- Client-side conversion may vary by browser
- Very large images may take longer to process

---

## 2. SEO Card Validator

### Overview
Preview how your links appear when shared on social media platforms and validate meta tags.

### Features
- **Platform Previews**: Facebook, Twitter, Discord, Reddit
- **Meta Tag Extraction**: Open Graph, Twitter Cards, basic meta tags
- **Validation**: Warnings for missing/incorrect tags
- **Suggestions**: Recommendations for improvement

### How to Use

1. **Enter URL**
   - Type or paste full URL (e.g., https://example.com)
   - Click "Validate" button

2. **Review Meta Tags**
   - Left panel shows all extracted meta tags
   - Validation status indicates issues
   - Warnings highlight missing tags
   - Suggestions provide recommendations

3. **View Platform Previews**
   - Click tabs to switch between platforms
   - See exactly how link appears on each platform
   - Preview updates based on extracted meta tags

### Supported Meta Tags

**Basic Tags**:
- `<title>`
- `<meta name="description">`
- `<link rel="canonical">`

**Open Graph (Facebook, Discord, Reddit)**:
- `og:title`
- `og:description`
- `og:image`
- `og:url`
- `og:type`
- `og:site_name`

**Twitter Cards**:
- `twitter:card`
- `twitter:title`
- `twitter:description`
- `twitter:image`
- `twitter:site`
- `twitter:creator`

### Platform-Specific Requirements

**Facebook**:
- Recommended image: 1200x630px
- Title: 60 characters max (recommended)
- Description: 160 characters max (recommended)

**Twitter**:
- Card types: summary, summary_large_image
- Image: 1200x600px (large), 120x120px (summary)
- Title: 70 characters max
- Description: 200 characters max

**Discord**:
- Uses Open Graph tags
- Supports rich embeds with images
- Site name displayed prominently

**Reddit**:
- Thumbnail preview from og:image
- Title from og:title or title tag
- No description shown in preview

### Validation Rules

**Warnings** (critical issues):
- Missing title tag
- Missing description
- Missing image (affects social sharing)
- Title/description too long (will be truncated)

**Suggestions** (improvements):
- Missing Twitter Card type
- Title/description too short
- Missing OG tags when image is present

### Technical Details

- Fetches HTML server-side to avoid CORS issues
- 10-second timeout for slow servers
- Respects robots.txt and meta robots tags
- Parses with Cheerio (fast HTML parser)
- Uses Metascraper for intelligent fallbacks

### Limitations
- Cannot access pages requiring authentication
- May not work with heavy JavaScript sites
- Some sites block automated requests
- Redirects are followed (max 5)

---

## 3. Branding Design System

### Overview
Create custom design systems with live preview and export production-ready CSS.

### Features
- **Typography**: Fonts, sizes, weights, line heights
- **Colors**: Full palette with visual picker
- **Spacing**: Padding, margin scales
- **Border Radius**: Corner roundness
- **Live Preview**: Real-time component preview
- **CSS Export**: Download formatted CSS file
- **Presets**: Material, Tailwind, Bootstrap, Default

### How to Use

1. **Choose Starting Point**
   - Load a preset design system OR
   - Start with default settings

2. **Customize Typography**
   - Select font family
   - Adjust heading sizes (H1-H4)
   - Set body text size
   - Configure line height

3. **Design Color Palette**
   - Click color square to open picker
   - Or enter hex code directly
   - Configure: Primary, Secondary, Accent, Background, Text, Border

4. **Configure Spacing**
   - Set spacing scale (XS, SM, MD, LG, XL, 2XL)
   - Adjust border radius (SM, MD, LG, Full)

5. **Preview Changes**
   - Live preview updates immediately
   - See headings, paragraphs, buttons, cards, forms
   - Color swatches show palette

6. **Export CSS**
   - Click "Copy" to copy CSS to clipboard
   - Click "Download" to save as .css file
   - Use in any project

### Available Presets

**Default**:
- Clean, minimal design
- Inter font family
- Blue primary color
- Standard spacing scale

**Material**:
- Google Material Design inspired
- Roboto font
- Purple primary (#6200ee)
- 8px spacing grid

**Tailwind**:
- Tailwind CSS defaults
- System UI font
- Blue primary (#3b82f6)
- Tailwind spacing scale

**Bootstrap**:
- Bootstrap framework style
- System font stack
- Bootstrap blue (#0d6efd)
- Bootstrap spacing

### Generated CSS Structure

The exported CSS includes:

1. **CSS Custom Properties** (:root variables)
   - All colors, sizes, spacing defined as variables
   - Easy to override or theme

2. **Base Styles**
   - Body typography
   - Heading styles (H1-H6)
   - Paragraph spacing

3. **Utility Classes**
   - Color utilities (.text-primary, .bg-primary)
   - Spacing utilities (.p-md, .m-lg)
   - Border radius utilities (.rounded-md)
   - Font weight utilities (.font-bold)

4. **Component Styles**
   - Button styles (.btn, .btn-primary)
   - Card component (.card)
   - Input component (.input)

### Use Cases

- **Rapid Prototyping**: Quickly generate design system
- **Design Exploration**: Test different color/typography combinations
- **Client Presentations**: Show design options with live preview
- **Theming**: Create theme variations
- **Learning**: Understand design system structure

### Technical Details

- State managed with Zustand
- Debounced updates for performance (300ms)
- Color picker: react-colorful (lightweight, accessible)
- CSS generation: Pure JavaScript template
- Export: file-saver for downloads

### Limitations
- Font families must be loaded separately (Google Fonts, etc.)
- Generated CSS is baseline (customize further as needed)
- Preview is simplified (real components may differ)
- No dark mode generation (can be added manually)

---

## Common Features Across All Tools

### Responsive Design
- Mobile-friendly layouts
- Tablet optimization
- Desktop-first approach

### Accessibility
- Semantic HTML
- ARIA labels where needed
- Keyboard navigation
- Focus indicators
- Color contrast compliance

### Performance
- Code splitting per route
- Optimized images
- Minimal JavaScript
- Fast initial load

### Browser Support
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- No IE11 support
