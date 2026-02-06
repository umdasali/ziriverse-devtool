export type ImageFormat = "png" | "jpeg" | "webp" | "gif" | "bmp" | "tiff" | "avif" | "ico";

export interface ResizeOptions {
  width?: number;
  height?: number;
  maintainAspectRatio: boolean;
}

export interface TransformOptions {
  rotate?: number; // degrees
  flipHorizontal?: boolean;
  flipVertical?: boolean;
}

export interface FilterOptions {
  grayscale?: boolean;
  sepia?: boolean;
  blur?: number; // 0-10
  sharpen?: boolean;
  brightness?: number; // -100 to 100
  contrast?: number; // -100 to 100
}

export interface ConversionOptions {
  format: ImageFormat;
  quality: number; // 0-100
  resize?: ResizeOptions;
  transform?: TransformOptions;
  filter?: FilterOptions;
  preserveMetadata?: boolean;
}

export interface ConversionResult {
  blob: Blob;
  size: number;
  url: string;
}

export interface ImageFile {
  file: File;
  preview: string;
  size: number;
  width?: number;
  height?: number;
}
