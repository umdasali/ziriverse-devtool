#!/usr/bin/env node

/**
 * Generate PNG OG images from SVG files
 * Social media platforms require PNG/JPEG for Open Graph images
 */

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, '..', 'public');

// OG image files to convert
const ogImages = [
  'og-image.svg',
  'og-image-image-converter.svg',
  'og-image-seo-validator.svg',
  'og-image-branding.svg',
  'og-image-dev-tools.svg',
];

console.log('🎨 Converting OG images from SVG to PNG (1200x630)...\n');

async function convertOGImages() {
  for (const svgFile of ogImages) {
    const svgPath = path.join(publicDir, svgFile);
    const pngFile = svgFile.replace('.svg', '.png');
    const pngPath = path.join(publicDir, pngFile);

    if (!fs.existsSync(svgPath)) {
      console.log(`⚠️  Skipping ${svgFile} - file not found`);
      continue;
    }

    try {
      const svgBuffer = fs.readFileSync(svgPath);

      await sharp(svgBuffer)
        .resize(1200, 630, {
          fit: 'contain',
          background: { r: 15, g: 23, b: 42, alpha: 1 } // Dark blue background
        })
        .png({
          quality: 90,
          compressionLevel: 9,
        })
        .toFile(pngPath);

      const stats = fs.statSync(pngPath);
      const sizeMB = (stats.size / 1024).toFixed(1);

      console.log(`✅ ${pngFile} (${sizeMB} KB) - Created from ${svgFile}`);
    } catch (error) {
      console.error(`❌ Error converting ${svgFile}:`, error.message);
    }
  }

  console.log('\n🎉 All OG images converted to PNG format!');
  console.log('\n📝 Note: Social media platforms require PNG/JPEG for Open Graph images.');
  console.log('   SVG format is not widely supported for og:image tags.\n');
}

convertOGImages();
