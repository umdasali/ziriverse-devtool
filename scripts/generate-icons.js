#!/usr/bin/env node

/**
 * Generate icon files from SVG favicon
 * This script creates all required icon formats for web, PWA, and mobile devices
 */

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, '..', 'public');
const svgPath = path.join(publicDir, 'favicon.svg');

// Check if SVG exists
if (!fs.existsSync(svgPath)) {
  console.error('❌ Error: favicon.svg not found in public directory');
  process.exit(1);
}

console.log('🎨 Generating icon files from favicon.svg...\n');

// Icon configurations
const icons = [
  { name: 'apple-touch-icon.png', size: 180, description: 'iOS home screen icon' },
  { name: 'icon-192.png', size: 192, description: 'PWA icon (192x192)' },
  { name: 'icon-512.png', size: 512, description: 'PWA icon (512x512)' },
  { name: 'mstile-150x150.png', size: 150, description: 'Windows tile icon' },
  { name: 'favicon-32x32.png', size: 32, description: 'Standard favicon' },
  { name: 'favicon-16x16.png', size: 16, description: 'Small favicon' },
];

// Generate PNG icons
async function generateIcons() {
  try {
    // Read SVG content
    const svgBuffer = fs.readFileSync(svgPath);

    for (const icon of icons) {
      const outputPath = path.join(publicDir, icon.name);

      await sharp(svgBuffer)
        .resize(icon.size, icon.size, {
          fit: 'contain',
          background: { r: 255, g: 255, b: 255, alpha: 0 }
        })
        .png()
        .toFile(outputPath);

      console.log(`✅ Generated ${icon.name} (${icon.size}x${icon.size}) - ${icon.description}`);
    }

    console.log('\n🎉 All icon files generated successfully!');
    console.log('\n📝 Next step: Generate favicon.ico from favicon-32x32.png and favicon-16x16.png');
    console.log('   Use: https://www.icoconverter.com/ or https://realfavicongenerator.net/\n');

  } catch (error) {
    console.error('❌ Error generating icons:', error.message);
    process.exit(1);
  }
}

generateIcons();
