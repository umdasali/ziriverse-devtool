"use client";

import { useState, useEffect } from "react";
import { Download, Zap, RotateCcw } from "lucide-react";
import { saveAs } from "file-saver";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ImageUploader } from "@/components/image-converter/image-uploader";
import { FormatSelector } from "@/components/image-converter/format-selector";
import { ConversionPreview } from "@/components/image-converter/conversion-preview";
import { convertImageClient } from "@/lib/image-converter/client-converter";
import type {
  ImageFile,
  ImageFormat,
  ConversionResult,
  ResizeOptions,
  TransformOptions,
  FilterOptions
} from "@/types/image";

export default function ImageConverterPage() {
  const [image, setImage] = useState<ImageFile | null>(null);
  const [format, setFormat] = useState<ImageFormat>("webp");
  const [quality, setQuality] = useState(80);
  const [converted, setConverted] = useState<ConversionResult | null>(null);
  const [isConverting, setIsConverting] = useState(false);
  const [useServer, setUseServer] = useState(false);

  // Advanced options state
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

  // Extract image dimensions when image is loaded
  useEffect(() => {
    if (image && image.preview && !image.width && !image.height) {
      const img = new Image();
      img.onload = () => {
        setImage(prev => {
          if (prev && !prev.width && !prev.height) {
            return { ...prev, width: img.width, height: img.height };
          }
          return prev;
        });
      };
      img.src = image.preview;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [image?.preview]);

  const handleConvert = async () => {
    if (!image) return;

    setIsConverting(true);
    try {
      // Force client-side for ICO and BMP formats (Sharp doesn't support these outputs reliably)
      const forceClientSide = format === "ico" || format === "bmp";

      if (useServer && !forceClientSide) {
        // Server-side conversion
        const formData = new FormData();
        formData.append("file", image.file);
        formData.append("format", format);
        formData.append("quality", quality.toString());
        formData.append("preserveMetadata", preserveMetadata.toString());

        // Add optional parameters if they have values
        if (resize.width || resize.height) {
          formData.append("resize", JSON.stringify(resize));
        }

        if (transform.rotate || transform.flipHorizontal || transform.flipVertical) {
          formData.append("transform", JSON.stringify(transform));
        }

        if (filter.grayscale || filter.sepia || filter.blur || filter.sharpen ||
            filter.brightness || filter.contrast) {
          formData.append("filter", JSON.stringify(filter));
        }

        const response = await fetch("/api/convert-image", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) throw new Error("Conversion failed");

        const blob = await response.blob();
        const result: ConversionResult = {
          blob,
          size: blob.size,
          url: URL.createObjectURL(blob),
        };
        setConverted(result);
      } else {
        // Client-side conversion
        const result = await convertImageClient(image.file, {
          format,
          quality,
          resize: resize.width || resize.height ? resize : undefined,
          transform: (transform.rotate || transform.flipHorizontal || transform.flipVertical)
            ? transform
            : undefined,
          filter: (filter.grayscale || filter.sepia || filter.blur || filter.sharpen ||
                  filter.brightness || filter.contrast)
            ? filter
            : undefined,
          preserveMetadata,
        });
        setConverted(result);
      }
    } catch (error) {
      console.error("Conversion error:", error);
      alert("Failed to convert image. Please try again.");
    } finally {
      setIsConverting(false);
    }
  };

  const handleDownload = () => {
    if (!converted) return;

    const extension = format === "jpeg" ? "jpg" : format;
    const filename = `converted-image.${extension}`;
    saveAs(converted.blob, filename);
  };

  const handleReset = () => {
    setResize({
      width: undefined,
      height: undefined,
      maintainAspectRatio: true,
    });
    setTransform({
      rotate: 0,
      flipHorizontal: false,
      flipVertical: false,
    });
    setFilter({
      grayscale: false,
      sepia: false,
      blur: 0,
      sharpen: false,
      brightness: 0,
      contrast: 0,
    });
    setFormat("webp");
    setQuality(80);
    setPreserveMetadata(false);
  };

  const handleClear = () => {
    if (image?.preview) {
      URL.revokeObjectURL(image.preview);
    }
    if (converted?.url) {
      URL.revokeObjectURL(converted.url);
    }
    setImage(null);
    setConverted(null);
    handleReset();
  };

  return (
    <div className="container py-8 space-y-8">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold">Advanced Image Converter</h1>
          <p className="text-muted-foreground mt-2">
            Convert, resize, transform, and apply filters to images with support for 8+ formats
          </p>
        </div>
        {image && (
          <Button onClick={handleReset} variant="outline" size="sm">
            <RotateCcw className="mr-2 h-4 w-4" />
            Reset Settings
          </Button>
        )}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left Column - Upload & Settings */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Upload Image</CardTitle>
              <CardDescription>
                Select an image to convert
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ImageUploader
                onImageSelect={setImage}
                currentImage={image}
                onClear={handleClear}
              />
            </CardContent>
          </Card>

          {image && (
            <Card>
              <CardHeader>
                <CardTitle>Conversion Settings</CardTitle>
                <CardDescription>
                  Customize format, size, and effects
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormatSelector
                  format={format}
                  quality={quality}
                  onFormatChange={setFormat}
                  onQualityChange={setQuality}
                  resize={resize}
                  onResizeChange={setResize}
                  transform={transform}
                  onTransformChange={setTransform}
                  filter={filter}
                  onFilterChange={setFilter}
                  preserveMetadata={preserveMetadata}
                  onPreserveMetadataChange={setPreserveMetadata}
                  originalWidth={image.width}
                  originalHeight={image.height}
                />

                <div className="pt-4 space-y-3 border-t">
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="useServer"
                      checked={useServer}
                      onChange={(e) => setUseServer(e.target.checked)}
                      className="rounded"
                    />
                    <label
                      htmlFor="useServer"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Use server-side conversion (higher quality)
                    </label>
                  </div>

                  <Button
                    onClick={handleConvert}
                    disabled={isConverting}
                    className="w-full"
                    size="lg"
                  >
                    {isConverting ? (
                      "Converting..."
                    ) : (
                      <>
                        <Zap className="mr-2 h-4 w-4" />
                        Convert Image
                      </>
                    )}
                  </Button>

                  {converted && (
                    <Button
                      onClick={handleDownload}
                      variant="outline"
                      className="w-full"
                      size="lg"
                    >
                      <Download className="mr-2 h-4 w-4" />
                      Download Converted Image
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Right Column - Preview */}
        <div className="lg:col-span-2">
          {image ? (
            <ConversionPreview
              original={image}
              converted={converted}
              isConverting={isConverting}
            />
          ) : (
            <Card className="h-full flex items-center justify-center min-h-[400px]">
              <CardContent className="text-center">
                <p className="text-muted-foreground">
                  Upload an image to get started
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Features */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mt-8">
        <Card>
          <CardHeader>
            <Badge variant="secondary" className="w-fit">8+ Formats</Badge>
            <CardTitle className="text-lg mt-2">Multiple Formats</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              PNG, JPEG, WEBP, AVIF, GIF, BMP, TIFF, and ICO format support
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <Badge variant="secondary" className="w-fit">Transform</Badge>
            <CardTitle className="text-lg mt-2">Resize & Rotate</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Resize images, rotate any angle, and flip horizontally or vertically
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <Badge variant="secondary" className="w-fit">Filters</Badge>
            <CardTitle className="text-lg mt-2">Advanced Filters</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Apply grayscale, sepia, blur, sharpen, brightness, and contrast adjustments
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <Badge variant="secondary" className="w-fit">Privacy</Badge>
            <CardTitle className="text-lg mt-2">Client or Server</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Process in-browser for privacy or use server-side Sharp for best quality
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Format Comparison Guide */}
      <Card>
        <CardHeader>
          <CardTitle>Format Comparison Guide</CardTitle>
          <CardDescription>Choose the right format for your needs</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div className="space-y-2">
              <div className="font-semibold text-sm">PNG</div>
              <p className="text-xs text-muted-foreground">
                Best for: Graphics, logos, screenshots
                <br />Pros: Lossless, transparency
                <br />Cons: Large file size
              </p>
            </div>
            <div className="space-y-2">
              <div className="font-semibold text-sm">JPEG</div>
              <p className="text-xs text-muted-foreground">
                Best for: Photos, complex images
                <br />Pros: Small file size
                <br />Cons: Lossy, no transparency
              </p>
            </div>
            <div className="space-y-2">
              <div className="font-semibold text-sm">WEBP</div>
              <p className="text-xs text-muted-foreground">
                Best for: Web images, modern sites
                <br />Pros: Great compression, transparency
                <br />Cons: Limited old browser support
              </p>
            </div>
            <div className="space-y-2">
              <div className="font-semibold text-sm">AVIF</div>
              <p className="text-xs text-muted-foreground">
                Best for: Next-gen web images
                <br />Pros: Best compression ratio
                <br />Cons: Newer format, slower encoding
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
