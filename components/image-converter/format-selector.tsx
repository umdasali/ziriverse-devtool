"use client";

import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import type { ImageFormat, ResizeOptions, TransformOptions, FilterOptions } from "@/types/image";
import { Badge } from "@/components/ui/badge";

interface FormatSelectorProps {
  format: ImageFormat;
  quality: number;
  onFormatChange: (format: ImageFormat) => void;
  onQualityChange: (quality: number) => void;
  resize: ResizeOptions;
  onResizeChange: (resize: ResizeOptions) => void;
  transform: TransformOptions;
  onTransformChange: (transform: TransformOptions) => void;
  filter: FilterOptions;
  onFilterChange: (filter: FilterOptions) => void;
  preserveMetadata: boolean;
  onPreserveMetadataChange: (preserve: boolean) => void;
  originalWidth?: number;
  originalHeight?: number;
}

export function FormatSelector({
  format,
  quality,
  onFormatChange,
  onQualityChange,
  resize,
  onResizeChange,
  transform,
  onTransformChange,
  filter,
  onFilterChange,
  preserveMetadata,
  onPreserveMetadataChange,
  originalWidth,
  originalHeight,
}: FormatSelectorProps) {
  const handleResizeChange = (field: keyof ResizeOptions, value: any) => {
    const newResize = { ...resize, [field]: value };

    // Maintain aspect ratio if enabled
    if (resize.maintainAspectRatio && originalWidth && originalHeight) {
      if (field === 'width' && value) {
        newResize.height = Math.round((value / originalWidth) * originalHeight);
      } else if (field === 'height' && value) {
        newResize.width = Math.round((value / originalHeight) * originalWidth);
      }
    }

    onResizeChange(newResize);
  };

  return (
    <Tabs defaultValue="basic" className="w-full">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="basic">Basic</TabsTrigger>
        <TabsTrigger value="resize">Resize</TabsTrigger>
        <TabsTrigger value="transform">Transform</TabsTrigger>
        <TabsTrigger value="filters">Filters</TabsTrigger>
      </TabsList>

      {/* Basic Settings */}
      <TabsContent value="basic" className="space-y-6">
        <div className="space-y-2">
          <Label>Output Format</Label>
          <Select value={format} onValueChange={(v) => onFormatChange(v as ImageFormat)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="png">
                <div className="flex items-center gap-2">
                  PNG <Badge variant="secondary" className="text-xs">Lossless</Badge>
                </div>
              </SelectItem>
              <SelectItem value="jpeg">
                <div className="flex items-center gap-2">
                  JPEG <Badge variant="secondary" className="text-xs">Small</Badge>
                </div>
              </SelectItem>
              <SelectItem value="webp">
                <div className="flex items-center gap-2">
                  WEBP <Badge variant="secondary" className="text-xs">Modern</Badge>
                </div>
              </SelectItem>
              <SelectItem value="avif">
                <div className="flex items-center gap-2">
                  AVIF <Badge variant="secondary" className="text-xs">Best</Badge>
                </div>
              </SelectItem>
              <SelectItem value="gif">GIF</SelectItem>
              <SelectItem value="bmp">BMP</SelectItem>
              <SelectItem value="tiff">TIFF</SelectItem>
              <SelectItem value="ico">ICO</SelectItem>
            </SelectContent>
          </Select>
          <p className="text-xs text-muted-foreground">
            {format === 'png' && 'Lossless compression, supports transparency'}
            {format === 'jpeg' && 'Smallest file size, no transparency'}
            {format === 'webp' && 'Modern format with great compression'}
            {format === 'avif' && 'Best compression, latest format'}
            {format === 'gif' && 'Supports animation, limited colors'}
            {format === 'bmp' && 'Uncompressed, large file size'}
            {format === 'tiff' && 'High quality, large file size'}
            {format === 'ico' && 'Icon format for websites'}
          </p>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label>Quality</Label>
            <span className="text-sm text-muted-foreground">{quality}%</span>
          </div>
          <Slider
            value={[quality]}
            onValueChange={(values) => onQualityChange(values[0])}
            min={1}
            max={100}
            step={1}
            className="w-full"
          />
          <p className="text-xs text-muted-foreground">
            Higher quality means larger file size
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="preserveMetadata"
            checked={preserveMetadata}
            onChange={(e) => onPreserveMetadataChange(e.target.checked)}
            className="rounded"
          />
          <label
            htmlFor="preserveMetadata"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Preserve metadata (EXIF, ICC profile)
          </label>
        </div>
      </TabsContent>

      {/* Resize Tab */}
      <TabsContent value="resize" className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="width">Width (px)</Label>
            <Input
              id="width"
              type="number"
              placeholder={originalWidth?.toString() || "Auto"}
              value={resize.width || ''}
              onChange={(e) => handleResizeChange('width', e.target.value ? parseInt(e.target.value) : undefined)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="height">Height (px)</Label>
            <Input
              id="height"
              type="number"
              placeholder={originalHeight?.toString() || "Auto"}
              value={resize.height || ''}
              onChange={(e) => handleResizeChange('height', e.target.value ? parseInt(e.target.value) : undefined)}
            />
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="maintainAspectRatio"
            checked={resize.maintainAspectRatio}
            onChange={(e) => handleResizeChange('maintainAspectRatio', e.target.checked)}
            className="rounded"
          />
          <label
            htmlFor="maintainAspectRatio"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Maintain aspect ratio
          </label>
        </div>

        {originalWidth && originalHeight && (
          <p className="text-xs text-muted-foreground">
            Original size: {originalWidth} × {originalHeight}px
          </p>
        )}
      </TabsContent>

      {/* Transform Tab */}
      <TabsContent value="transform" className="space-y-4">
        <div className="space-y-2">
          <Label>Rotate</Label>
          <div className="grid grid-cols-4 gap-2">
            <button
              onClick={() => onTransformChange({ ...transform, rotate: 0 })}
              className={`p-2 border rounded text-sm ${transform.rotate === 0 ? 'bg-primary text-primary-foreground' : ''}`}
            >
              0°
            </button>
            <button
              onClick={() => onTransformChange({ ...transform, rotate: 90 })}
              className={`p-2 border rounded text-sm ${transform.rotate === 90 ? 'bg-primary text-primary-foreground' : ''}`}
            >
              90°
            </button>
            <button
              onClick={() => onTransformChange({ ...transform, rotate: 180 })}
              className={`p-2 border rounded text-sm ${transform.rotate === 180 ? 'bg-primary text-primary-foreground' : ''}`}
            >
              180°
            </button>
            <button
              onClick={() => onTransformChange({ ...transform, rotate: 270 })}
              className={`p-2 border rounded text-sm ${transform.rotate === 270 ? 'bg-primary text-primary-foreground' : ''}`}
            >
              270°
            </button>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="customRotate">Custom Rotation (degrees)</Label>
          <Input
            id="customRotate"
            type="number"
            min="-360"
            max="360"
            placeholder="0"
            value={transform.rotate || 0}
            onChange={(e) => onTransformChange({ ...transform, rotate: parseInt(e.target.value) || 0 })}
          />
        </div>

        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="flipHorizontal"
              checked={transform.flipHorizontal || false}
              onChange={(e) => onTransformChange({ ...transform, flipHorizontal: e.target.checked })}
              className="rounded"
            />
            <label
              htmlFor="flipHorizontal"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Flip horizontal
            </label>
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="flipVertical"
              checked={transform.flipVertical || false}
              onChange={(e) => onTransformChange({ ...transform, flipVertical: e.target.checked })}
              className="rounded"
            />
            <label
              htmlFor="flipVertical"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Flip vertical
            </label>
          </div>
        </div>
      </TabsContent>

      {/* Filters Tab */}
      <TabsContent value="filters" className="space-y-4">
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="grayscale"
              checked={filter.grayscale || false}
              onChange={(e) => onFilterChange({ ...filter, grayscale: e.target.checked })}
              className="rounded"
            />
            <label htmlFor="grayscale" className="text-sm font-medium">
              Grayscale
            </label>
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="sepia"
              checked={filter.sepia || false}
              onChange={(e) => onFilterChange({ ...filter, sepia: e.target.checked })}
              className="rounded"
            />
            <label htmlFor="sepia" className="text-sm font-medium">
              Sepia tone
            </label>
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="sharpen"
              checked={filter.sharpen || false}
              onChange={(e) => onFilterChange({ ...filter, sharpen: e.target.checked })}
              className="rounded"
            />
            <label htmlFor="sharpen" className="text-sm font-medium">
              Sharpen
            </label>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label>Blur</Label>
            <span className="text-sm text-muted-foreground">{filter.blur || 0}</span>
          </div>
          <Slider
            value={[filter.blur || 0]}
            onValueChange={(values) => onFilterChange({ ...filter, blur: values[0] })}
            min={0}
            max={10}
            step={0.5}
            className="w-full"
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label>Brightness</Label>
            <span className="text-sm text-muted-foreground">{filter.brightness || 0}</span>
          </div>
          <Slider
            value={[filter.brightness || 0]}
            onValueChange={(values) => onFilterChange({ ...filter, brightness: values[0] })}
            min={-100}
            max={100}
            step={1}
            className="w-full"
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label>Contrast</Label>
            <span className="text-sm text-muted-foreground">{filter.contrast || 0}</span>
          </div>
          <Slider
            value={[filter.contrast || 0]}
            onValueChange={(values) => onFilterChange({ ...filter, contrast: values[0] })}
            min={-100}
            max={100}
            step={1}
            className="w-full"
          />
        </div>
      </TabsContent>
    </Tabs>
  );
}
