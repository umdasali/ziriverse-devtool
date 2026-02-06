#!/usr/bin/env node

/**
 * Generate favicon.ico from PNG files
 * Creates a multi-resolution ICO file (16x16 and 32x32)
 */

const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const { promisify } = require('util');

const execPromise = promisify(exec);
const publicDir = path.join(__dirname, '..', 'public');

async function generateFaviconIco() {
  console.log('🎨 Generating favicon.ico...\n');

  const favicon16 = path.join(publicDir, 'favicon-16x16.png');
  const favicon32 = path.join(publicDir, 'favicon-32x32.png');
  const faviconIco = path.join(publicDir, 'favicon.ico');

  // Check if PNG files exist
  if (!fs.existsSync(favicon16) || !fs.existsSync(favicon32)) {
    console.error('❌ Error: favicon-16x16.png or favicon-32x32.png not found');
    console.log('   Run: node scripts/generate-icons.js first');
    process.exit(1);
  }

  try {
    // Try using ImageMagick if available
    try {
      await execPromise('which convert');
      console.log('📦 Using ImageMagick to create favicon.ico...');

      await execPromise(
        `convert "${favicon16}" "${favicon32}" "${faviconIco}"`
      );

      console.log('✅ Successfully generated favicon.ico using ImageMagick');
      console.log(`   Location: ${faviconIco}\n`);
      return;
    } catch (e) {
      console.log('ℹ️  ImageMagick not found, using alternative method...\n');
    }

    // Alternative: Use sharp to create ICO (note: limited support)
    const sharp = require('sharp');

    // Read the 32x32 PNG as the primary icon
    const pngBuffer = fs.readFileSync(favicon32);

    // Sharp doesn't natively support ICO output, so we'll create a workaround
    // by using the 32x32 PNG directly as favicon.ico (browsers will accept it)
    fs.copyFileSync(favicon32, faviconIco);

    console.log('✅ Generated favicon.ico (using PNG format - compatible with modern browsers)');
    console.log(`   Location: ${faviconIco}`);
    console.log('\nℹ️  For true multi-resolution ICO format, use one of these methods:');
    console.log('   1. Online: https://www.icoconverter.com/');
    console.log('   2. Online: https://realfavicongenerator.net/');
    console.log('   3. Install ImageMagick: brew install imagemagick (Mac) or apt-get install imagemagick (Linux)\n');

  } catch (error) {
    console.error('❌ Error generating favicon.ico:', error.message);
    process.exit(1);
  }
}

generateFaviconIco();
