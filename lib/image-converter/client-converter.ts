import imageCompression from "browser-image-compression";
import type { ImageFormat, ConversionOptions, ConversionResult } from "@/types/image";

export async function convertImageClient(
  file: File,
  options: ConversionOptions
): Promise<ConversionResult> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = async (e) => {
      try {
        const img = new Image();
        img.src = e.target?.result as string;

        await new Promise((resolve) => {
          img.onload = resolve;
        });

        // Calculate dimensions
        let targetWidth = options.resize?.width || img.width;
        let targetHeight = options.resize?.height || img.height;

        // Handle rotation for canvas size
        const needsRotation = options.transform?.rotate &&
          (options.transform.rotate === 90 || options.transform.rotate === 270);

        const canvas = document.createElement("canvas");
        if (needsRotation) {
          canvas.width = targetHeight;
          canvas.height = targetWidth;
        } else {
          canvas.width = targetWidth;
          canvas.height = targetHeight;
        }

        const ctx = canvas.getContext("2d", { willReadFrequently: true });
        if (!ctx) {
          throw new Error("Failed to get canvas context");
        }

        // Apply transformations
        ctx.save();

        // Handle rotation
        if (options.transform?.rotate) {
          const centerX = canvas.width / 2;
          const centerY = canvas.height / 2;
          ctx.translate(centerX, centerY);
          ctx.rotate((options.transform.rotate * Math.PI) / 180);
          ctx.translate(-targetWidth / 2, -targetHeight / 2);
        }

        // Handle flipping
        if (options.transform?.flipHorizontal || options.transform?.flipVertical) {
          const scaleX = options.transform.flipHorizontal ? -1 : 1;
          const scaleY = options.transform.flipVertical ? -1 : 1;
          const translateX = options.transform.flipHorizontal ? -targetWidth : 0;
          const translateY = options.transform.flipVertical ? -targetHeight : 0;
          ctx.scale(scaleX, scaleY);
          ctx.translate(translateX, translateY);
        }

        // Draw image
        ctx.drawImage(img, 0, 0, targetWidth, targetHeight);
        ctx.restore();

        // Apply filters
        if (options.filter) {
          applyFilters(ctx, canvas, options.filter);
        }

        // Convert to blob
        const mimeType = getMimeType(options.format);
        canvas.toBlob(
          async (blob) => {
            if (!blob) {
              reject(new Error("Failed to convert image"));
              return;
            }

            // Apply compression if needed
            let finalBlob = blob;
            if (options.quality < 100 && (options.format === 'jpeg' || options.format === 'webp')) {
              const compressionOptions = {
                maxSizeMB: 10,
                maxWidthOrHeight: Math.max(canvas.width, canvas.height),
                useWebWorker: true,
                initialQuality: options.quality / 100,
              };

              try {
                const compressedFile = await imageCompression(
                  new File([blob], "image", { type: blob.type }),
                  compressionOptions
                );
                finalBlob = compressedFile;
              } catch (error) {
                console.warn("Compression failed, using original:", error);
              }
            }

            resolve({
              blob: finalBlob,
              size: finalBlob.size,
              url: URL.createObjectURL(finalBlob),
            });
          },
          mimeType,
          options.quality / 100
        );
      } catch (error) {
        reject(error);
      }
    };

    reader.onerror = () => reject(new Error("Failed to read file"));
    reader.readAsDataURL(file);
  });
}

function applyFilters(
  ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
  filter: NonNullable<ConversionOptions['filter']>
) {
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;

  for (let i = 0; i < data.length; i += 4) {
    let r = data[i];
    let g = data[i + 1];
    let b = data[i + 2];

    // Grayscale
    if (filter.grayscale) {
      const gray = 0.299 * r + 0.587 * g + 0.114 * b;
      r = g = b = gray;
    }

    // Sepia
    if (filter.sepia) {
      const tr = 0.393 * r + 0.769 * g + 0.189 * b;
      const tg = 0.349 * r + 0.686 * g + 0.168 * b;
      const tb = 0.272 * r + 0.534 * g + 0.131 * b;
      r = Math.min(255, tr);
      g = Math.min(255, tg);
      b = Math.min(255, tb);
    }

    // Brightness
    if (filter.brightness) {
      const brightness = filter.brightness * 2.55;
      r = Math.max(0, Math.min(255, r + brightness));
      g = Math.max(0, Math.min(255, g + brightness));
      b = Math.max(0, Math.min(255, b + brightness));
    }

    // Contrast
    if (filter.contrast) {
      const contrast = (filter.contrast + 100) / 100;
      const factor = (259 * (contrast * 255 + 255)) / (255 * (259 - contrast * 255));
      r = Math.max(0, Math.min(255, factor * (r - 128) + 128));
      g = Math.max(0, Math.min(255, factor * (g - 128) + 128));
      b = Math.max(0, Math.min(255, factor * (b - 128) + 128));
    }

    data[i] = r;
    data[i + 1] = g;
    data[i + 2] = b;
  }

  ctx.putImageData(imageData, 0, 0);

  // Apply blur using canvas filter (CSS-based)
  if (filter.blur && filter.blur > 0) {
    ctx.filter = `blur(${filter.blur}px)`;
    ctx.drawImage(canvas, 0, 0);
    ctx.filter = 'none';
  }

  // Apply sharpen (simple unsharp mask)
  if (filter.sharpen) {
    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = canvas.width;
    tempCanvas.height = canvas.height;
    const tempCtx = tempCanvas.getContext('2d');
    if (tempCtx) {
      tempCtx.filter = 'contrast(1.2) brightness(1.1)';
      tempCtx.drawImage(canvas, 0, 0);
      ctx.drawImage(tempCanvas, 0, 0);
    }
  }
}

function getMimeType(format: ImageFormat): string {
  const mimeTypes: Record<ImageFormat, string> = {
    png: 'image/png',
    jpeg: 'image/jpeg',
    webp: 'image/webp',
    gif: 'image/gif',
    bmp: 'image/bmp',
    tiff: 'image/tiff',
    avif: 'image/avif',
    ico: 'image/x-icon',
  };
  return mimeTypes[format] || 'image/png';
}

export function validateImageFile(file: File): {
  valid: boolean;
  error?: string;
} {
  const maxSize = 50 * 1024 * 1024; // 50MB
  const allowedTypes = [
    "image/png",
    "image/jpeg",
    "image/jpg",
    "image/webp",
    "image/gif",
    "image/bmp",
    "image/tiff",
    "image/avif",
    "image/x-icon",
    "image/vnd.microsoft.icon"
  ];

  if (!allowedTypes.includes(file.type)) {
    return {
      valid: false,
      error: "Invalid file type. Please upload a supported image format.",
    };
  }

  if (file.size > maxSize) {
    return {
      valid: false,
      error: "File too large. Maximum size is 50MB.",
    };
  }

  return { valid: true };
}
