import { NextRequest, NextResponse } from "next/server";
import sharp from "sharp";

const SUPPORTED_FORMATS = ["png", "jpeg", "webp", "gif", "tiff", "avif"];

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;
    const format = formData.get("format") as string;
    const quality = parseInt(formData.get("quality") as string) || 80;

    // Parse optional parameters
    const resize = formData.get("resize") ? JSON.parse(formData.get("resize") as string) : null;
    const transform = formData.get("transform") ? JSON.parse(formData.get("transform") as string) : null;
    const filter = formData.get("filter") ? JSON.parse(formData.get("filter") as string) : null;
    const preserveMetadata = formData.get("preserveMetadata") === "true";

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    if (!SUPPORTED_FORMATS.includes(format)) {
      return NextResponse.json({ error: "Invalid or unsupported format" }, { status: 400 });
    }

    // Convert File to Buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Create Sharp instance
    let sharpInstance = sharp(buffer);

    // Preserve or strip metadata
    if (preserveMetadata) {
      sharpInstance = sharpInstance.withMetadata();
    }

    // Apply resize
    if (resize && (resize.width || resize.height)) {
      sharpInstance = sharpInstance.resize(resize.width, resize.height, {
        fit: resize.maintainAspectRatio ? 'inside' : 'fill',
        withoutEnlargement: false,
      });
    }

    // Apply rotation
    if (transform?.rotate) {
      sharpInstance = sharpInstance.rotate(transform.rotate);
    }

    // Apply flipping
    if (transform?.flipHorizontal) {
      sharpInstance = sharpInstance.flop();
    }
    if (transform?.flipVertical) {
      sharpInstance = sharpInstance.flip();
    }

    // Apply filters
    if (filter) {
      // Grayscale
      if (filter.grayscale) {
        sharpInstance = sharpInstance.grayscale();
      }

      // Blur
      if (filter.blur && filter.blur > 0) {
        sharpInstance = sharpInstance.blur(filter.blur);
      }

      // Sharpen
      if (filter.sharpen) {
        sharpInstance = sharpInstance.sharpen();
      }

      // Modulate for brightness and other adjustments
      const modulateOptions: any = {};

      if (filter.brightness) {
        // Convert -100 to 100 range to Sharp's brightness multiplier
        modulateOptions.brightness = 1 + (filter.brightness / 100);
      }

      if (Object.keys(modulateOptions).length > 0) {
        sharpInstance = sharpInstance.modulate(modulateOptions);
      }

      // Apply linear adjustment for contrast
      if (filter.contrast) {
        const contrastMultiplier = (filter.contrast + 100) / 100;
        const a = contrastMultiplier;
        const b = 128 * (1 - contrastMultiplier);
        sharpInstance = sharpInstance.linear(a, b);
      }

      // Tint for sepia effect
      if (filter.sepia) {
        sharpInstance = sharpInstance.tint({ r: 112, g: 66, b: 20 });
      }
    }

    // Apply format-specific options
    if (format === "jpeg") {
      sharpInstance = sharpInstance.jpeg({ quality, mozjpeg: true });
    } else if (format === "webp") {
      sharpInstance = sharpInstance.webp({ quality });
    } else if (format === "png") {
      sharpInstance = sharpInstance.png({
        quality,
        compressionLevel: Math.floor((100 - quality) / 10),
      });
    } else if (format === "avif") {
      sharpInstance = sharpInstance.avif({ quality });
    } else if (format === "tiff") {
      sharpInstance = sharpInstance.tiff({ quality });
    } else if (format === "gif") {
      sharpInstance = sharpInstance.gif();
    }

    const convertedBuffer = await sharpInstance.toBuffer();

    // Return the converted image
    return new NextResponse(new Uint8Array(convertedBuffer), {
      headers: {
        "Content-Type": `image/${format}`,
        "Content-Length": convertedBuffer.length.toString(),
        "Content-Disposition": `attachment; filename="converted.${format}"`,
      },
    });
  } catch (error) {
    console.error("Image conversion error:", error);
    return NextResponse.json(
      { error: "Failed to convert image" },
      { status: 500 }
    );
  }
}
