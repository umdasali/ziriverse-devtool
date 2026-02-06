"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatBytes } from "@/lib/utils";
import type { ConversionResult, ImageFile } from "@/types/image";

interface ConversionPreviewProps {
  original: ImageFile;
  converted: ConversionResult | null;
  isConverting: boolean;
}

export function ConversionPreview({
  original,
  converted,
  isConverting,
}: ConversionPreviewProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Original</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="aspect-video w-full bg-muted rounded-lg overflow-hidden mb-2">
            <img
              src={original.preview}
              alt="Original"
              className="h-full w-full object-contain"
            />
          </div>
          <p className="text-sm text-muted-foreground">
            Size: {formatBytes(original.size)}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Converted</CardTitle>
        </CardHeader>
        <CardContent>
          {isConverting ? (
            <div className="aspect-video w-full bg-muted rounded-lg flex items-center justify-center">
              <p className="text-sm text-muted-foreground">Converting...</p>
            </div>
          ) : converted ? (
            <>
              <div className="aspect-video w-full bg-muted rounded-lg overflow-hidden mb-2">
                <img
                  src={converted.url}
                  alt="Converted"
                  className="h-full w-full object-contain"
                />
              </div>
              <p className="text-sm text-muted-foreground">
                Size: {formatBytes(converted.size)}
                {original.size && (
                  <span className="ml-2">
                    (
                    {((converted.size / original.size - 1) * 100).toFixed(1)}%)
                  </span>
                )}
              </p>
            </>
          ) : (
            <div className="aspect-video w-full bg-muted rounded-lg flex items-center justify-center">
              <p className="text-sm text-muted-foreground">
                Select format and click convert
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
