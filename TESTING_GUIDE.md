# Image Converter Testing Guide

## Quick Start

```bash
npm run dev
```

Then navigate to: `http://localhost:3000/image-converter`

---

## Testing Checklist

### ✅ Basic Format Conversion

1. **Test PNG Conversion**
   - Upload any image
   - Select PNG format
   - Set quality to 90%
   - Click Convert
   - Download and verify

2. **Test JPEG Conversion**
   - Upload PNG image with transparency
   - Select JPEG format
   - Set quality to 80%
   - Verify transparency is removed (white background)

3. **Test WEBP Conversion**
   - Upload large image
   - Select WEBP format
   - Set quality to 85%
   - Compare file sizes (should be smaller)

4. **Test New Formats**
   - Test AVIF (best compression)
   - Test GIF (check color reduction)
   - Test BMP (check file size increase)
   - Test TIFF (check quality)
   - Test ICO (best with small images)

---

### ✅ Resize Operations

1. **Test Width Only**
   - Upload image
   - Go to Resize tab
   - Set width: 800
   - Keep "maintain aspect ratio" checked
   - Height should auto-calculate
   - Convert and verify dimensions

2. **Test Height Only**
   - Set height: 600
   - Leave width empty
   - Width should auto-calculate

3. **Test Both Dimensions**
   - Set width: 1920
   - Set height: 1080
   - Uncheck "maintain aspect ratio"
   - Image should stretch to exact dimensions

4. **Test Aspect Ratio Lock**
   - Check "maintain aspect ratio"
   - Change width
   - Height should update automatically
   - Change height
   - Width should update automatically

---

### ✅ Transform Operations

1. **Test Quick Rotate**
   - Go to Transform tab
   - Click 90° button
   - Convert and verify image is rotated
   - Test 180° and 270°

2. **Test Custom Rotation**
   - Enter custom angle: 45°
   - Convert and verify diagonal rotation
   - Try negative angle: -30°

3. **Test Flip Horizontal**
   - Upload image with text
   - Check "Flip horizontal"
   - Text should be mirrored

4. **Test Flip Vertical**
   - Check "Flip vertical"
   - Image should be upside down

5. **Test Combined Transforms**
   - Rotate 90°
   - Flip horizontal
   - Flip vertical
   - All should apply correctly

---

### ✅ Filter Effects

1. **Test Grayscale**
   - Upload colorful image
   - Go to Filters tab
   - Check "Grayscale"
   - Image should be black and white

2. **Test Sepia**
   - Check "Sepia tone"
   - Image should have vintage brown tone

3. **Test Blur**
   - Set blur slider to 5
   - Image should be noticeably blurred
   - Try 0 (no blur) and 10 (max blur)

4. **Test Sharpen**
   - Upload slightly blurry image
   - Check "Sharpen"
   - Image should appear crisper

5. **Test Brightness**
   - Set brightness to +50
   - Image should be brighter
   - Set to -50
   - Image should be darker

6. **Test Contrast**
   - Set contrast to +50
   - Colors should be more vivid
   - Set to -50
   - Colors should be more muted

7. **Test Combined Filters**
   - Enable grayscale
   - Add brightness: +20
   - Add contrast: +30
   - All should apply together

---

### ✅ Advanced Features

1. **Test Metadata Preservation**
   - Upload image with EXIF data (from camera)
   - Check "Preserve metadata"
   - Use server-side conversion
   - Download and check EXIF is preserved

2. **Test Client vs Server Mode**
   - Convert same image in client mode
   - Note file size and quality
   - Enable "Use server-side conversion"
   - Convert again
   - Compare file size and quality

3. **Test Reset Settings**
   - Apply multiple settings (resize, rotate, filters)
   - Click "Reset Settings" button
   - All settings should return to defaults

4. **Test Clear Image**
   - Upload image
   - Apply settings
   - Click X button on image
   - Everything should clear

---

### ✅ Quality Control

1. **Test Quality 100%**
   - Set quality to 100%
   - Convert to JPEG
   - File size should be larger, quality highest

2. **Test Quality 1%**
   - Set quality to 1%
   - File size should be very small
   - Quality should be noticeably degraded

3. **Test Quality for Each Format**
   - Test quality slider for PNG
   - Test quality slider for JPEG
   - Test quality slider for WEBP
   - Test quality slider for AVIF

---

### ✅ File Upload

1. **Test Drag and Drop**
   - Drag image file onto upload area
   - Should accept and preview

2. **Test Click to Upload**
   - Click upload area
   - Select file from dialog
   - Should accept and preview

3. **Test Invalid File Type**
   - Try uploading .txt or .pdf
   - Should show error message

4. **Test File Size Limit**
   - Try uploading file over 50MB
   - Should show error message

5. **Test Supported Formats**
   - Upload PNG - should work
   - Upload JPEG - should work
   - Upload WEBP - should work
   - Upload GIF - should work
   - Upload BMP - should work
   - Upload TIFF - should work
   - Upload AVIF - should work
   - Upload ICO - should work

---

### ✅ UI/UX Testing

1. **Test Tab Navigation**
   - Click each tab (Basic, Resize, Transform, Filters)
   - All should switch correctly
   - Content should update

2. **Test Responsive Design**
   - Resize browser window
   - Test on mobile size (375px)
   - Test on tablet size (768px)
   - Test on desktop size (1920px)

3. **Test Button States**
   - Convert button should disable while converting
   - Download button should only show after conversion
   - Reset button should only show when image is loaded

4. **Test Preview**
   - Original image should show on left
   - Converted image should show on right
   - File sizes should display
   - Dimensions should display

---

### ✅ Error Handling

1. **Test Conversion Failure**
   - Upload corrupted image
   - Try to convert
   - Should show error message

2. **Test Network Error** (server mode)
   - Enable server-side conversion
   - Disconnect internet
   - Try to convert
   - Should show error message

3. **Test Invalid Settings**
   - Set width to 0
   - Try to convert
   - Should handle gracefully

---

## Real-World Use Cases

### Use Case 1: Social Media Image
```
Goal: Create Instagram post (1080x1080)

Steps:
1. Upload photo (any size)
2. Resize tab: 1080 x 1080, uncheck aspect ratio
3. Filters: brightness +10, contrast +15
4. Basic: JPEG, quality 90%
5. Convert and download
```

### Use Case 2: Website Hero Image
```
Goal: Optimized web image (1920x1080)

Steps:
1. Upload high-res photo
2. Resize: 1920 x 1080, maintain aspect ratio
3. Basic: WEBP format, quality 85%
4. Convert and download
```

### Use Case 3: Favicon
```
Goal: Create website favicon

Steps:
1. Upload square logo
2. Resize: 32 x 32, maintain aspect ratio
3. Basic: ICO format
4. Convert and download
```

### Use Case 4: Print Photo
```
Goal: High-quality print image

Steps:
1. Upload photo
2. Filters: sharpen, brightness +5, contrast +10
3. Basic: TIFF format, quality 100%
4. Enable server-side conversion
5. Preserve metadata
6. Convert and download
```

### Use Case 5: Black & White Portrait
```
Goal: Artistic B&W photo

Steps:
1. Upload portrait photo
2. Filters: grayscale, brightness +15, contrast +25
3. Basic: PNG format, quality 95%
4. Convert and download
```

---

## Performance Benchmarks

### Expected Processing Times

**Client-Side Mode:**
- Small image (< 1MB): < 1 second
- Medium image (1-5MB): 1-3 seconds
- Large image (5-50MB): 3-10 seconds

**Server-Side Mode:**
- Small image: 1-2 seconds
- Medium image: 2-5 seconds
- Large image: 5-15 seconds

**Note:** Server mode depends on network speed and server load.

---

## Common Issues & Solutions

### Issue: Image appears rotated incorrectly
**Solution**: Some images have EXIF orientation data. Try:
1. Enable "Preserve metadata"
2. Use server-side conversion
3. Or manually rotate using Transform tab

### Issue: File size is larger after conversion
**Solution**:
- PNG is lossless (larger)
- Try WEBP or JPEG for smaller size
- Reduce quality setting
- Use server-side conversion for better compression

### Issue: Filters don't seem to apply
**Solution**:
- Make sure you click Convert after changing settings
- Try adjusting slider values (some effects are subtle)
- Use server-side mode for more consistent results

### Issue: Image quality is poor
**Solution**:
- Increase quality slider
- Use server-side conversion
- Try lossless format (PNG, TIFF)
- Don't resize larger than original

### Issue: Conversion is slow
**Solution**:
- Use client-side mode for faster processing
- Reduce image dimensions before converting
- Close unnecessary filters
- Check internet connection (server mode)

---

## Browser Compatibility

### Tested Browsers:
- ✅ Chrome 120+ (Recommended)
- ✅ Firefox 120+
- ✅ Safari 17+
- ✅ Edge 120+

### Format Support by Browser:
| Format | Chrome | Firefox | Safari | Edge |
|--------|--------|---------|--------|------|
| PNG    | ✅     | ✅      | ✅     | ✅   |
| JPEG   | ✅     | ✅      | ✅     | ✅   |
| WEBP   | ✅     | ✅      | ✅     | ✅   |
| AVIF   | ✅     | ✅      | ⚠️ 16+ | ✅   |
| GIF    | ✅     | ✅      | ✅     | ✅   |
| BMP    | ✅     | ✅      | ✅     | ✅   |
| TIFF   | ⚠️     | ⚠️      | ⚠️     | ⚠️   |
| ICO    | ✅     | ✅      | ✅     | ✅   |

**Note:** ⚠️ = Limited support or may not preview in browser

---

## Reporting Issues

If you find any bugs or issues:

1. Note the browser and version
2. Describe the steps to reproduce
3. Note the image format and size
4. Include any error messages
5. Specify client or server mode

---

**Happy Testing! 🎉**
