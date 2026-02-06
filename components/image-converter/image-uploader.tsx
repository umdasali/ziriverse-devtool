"use client";

import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { validateImageFile } from "@/lib/image-converter/client-converter";
import type { ImageFile } from "@/types/image";

interface ImageUploaderProps {
  onImageSelect: (image: ImageFile) => void;
  currentImage: ImageFile | null;
  onClear: () => void;
}

export function ImageUploader({
  onImageSelect,
  currentImage,
  onClear,
}: ImageUploaderProps) {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (!file) return;

      const validation = validateImageFile(file);
      if (!validation.valid) {
        alert(validation.error);
        return;
      }

      const preview = URL.createObjectURL(file);
      onImageSelect({
        file,
        preview,
        size: file.size,
      });
    },
    [onImageSelect]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/png": [".png"],
      "image/jpeg": [".jpg", ".jpeg"],
      "image/webp": [".webp"],
      "image/gif": [".gif"],
      "image/bmp": [".bmp"],
      "image/tiff": [".tiff", ".tif"],
      "image/avif": [".avif"],
      "image/x-icon": [".ico"],
    },
    maxFiles: 1,
    multiple: false,
  });

  if (currentImage) {
    return (
      <Card className="relative overflow-hidden">
        <div className="relative aspect-video w-full">
          <img
            src={currentImage.preview}
            alt="Uploaded image"
            className="h-full w-full object-contain"
          />
          <Button
            size="icon"
            variant="destructive"
            className="absolute top-2 right-2"
            onClick={onClear}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <Card
      {...getRootProps()}
      className={`cursor-pointer border-2 border-dashed transition-colors ${
        isDragActive ? "border-primary bg-primary/5" : "border-muted-foreground/25"
      }`}
    >
      <input {...getInputProps()} />
      <div className="flex flex-col items-center justify-center p-12 text-center">
        <Upload className="h-12 w-12 mb-4 text-muted-foreground" />
        <h3 className="text-lg font-semibold mb-2">
          {isDragActive ? "Drop image here" : "Upload an image"}
        </h3>
        <p className="text-sm text-muted-foreground mb-4">
          Drag and drop or click to select
        </p>
        <p className="text-xs text-muted-foreground">
          Supports PNG, JPEG, WEBP, AVIF, GIF, BMP, TIFF, ICO (max 50MB)
        </p>
      </div>
    </Card>
  );
}
