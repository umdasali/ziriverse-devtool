import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import {
  ImageIcon,
  Upload,
  Settings,
  Download,
  ArrowLeft,
  ArrowRight,
  Monitor,
  Server,
  Maximize2,
  RotateCw,
  Paintbrush,
  CheckCircle2,
  AlertTriangle,
  Info,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Image Converter Documentation",
  description:
    "Learn how to convert, resize, transform, and apply filters to images using the Image Converter tool. Supports 8+ formats including PNG, JPEG, WEBP, and AVIF.",
  keywords: [
    "image converter tutorial",
    "how to convert images",
    "image format guide",
    "resize images online",
    "image filter guide",
  ],
  alternates: {
    canonical: `${siteConfig.url}/docs/image-converter`,
  },
  openGraph: {
    title: `Image Converter Documentation | ${siteConfig.name}`,
    description:
      "Step-by-step guide to converting images between 8+ formats with advanced controls.",
    url: `${siteConfig.url}/docs/image-converter`,
    images: [
      {
        url: "/og-image-image-converter.png",
        width: 1200,
        height: 630,
        alt: "Image Converter Documentation",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `Image Converter Docs | ${siteConfig.name}`,
    description:
      "Step-by-step guide to converting images between 8+ formats with resize, transform, and filter controls.",
    images: ["/og-image-image-converter.png"],
    creator: siteConfig.twitterCreator,
  },
};

export default function ImageConverterDocsPage() {
  return (
    <div className="container mx-auto px-4 py-12 sm:py-16">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
        <Link href="/docs" className="hover:text-primary transition-colors">
          Documentation
        </Link>
        <span>/</span>
        <span className="text-foreground font-medium">Image Converter</span>
      </div>

      {/* Hero */}
      <div className="mb-12">
        <div className="flex items-center gap-4 mb-4">
          <div className="p-3 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 text-white">
            <ImageIcon className="h-8 w-8" />
          </div>
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold">
              Image Converter
            </h1>
            <p className="text-muted-foreground mt-1">
              Convert, resize, transform, and apply filters to your images
            </p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 mt-4">
          <Badge>8+ Formats</Badge>
          <Badge variant="secondary">Resize & Transform</Badge>
          <Badge variant="secondary">Filters</Badge>
          <Badge variant="secondary">Client & Server Mode</Badge>
          <Badge variant="secondary">Privacy First</Badge>
        </div>
      </div>

      {/* Table of Contents */}
      <Card className="border-2 mb-12">
        <CardHeader>
          <CardTitle className="text-lg">On This Page</CardTitle>
        </CardHeader>
        <CardContent>
          <nav className="space-y-2">
            {[
              { label: "Getting Started", href: "#getting-started" },
              { label: "Step 1: Upload an Image", href: "#step-1" },
              { label: "Step 2: Choose Format & Quality", href: "#step-2" },
              { label: "Step 3: Resize (Optional)", href: "#step-3" },
              { label: "Step 4: Transform (Optional)", href: "#step-4" },
              { label: "Step 5: Apply Filters (Optional)", href: "#step-5" },
              { label: "Step 6: Convert & Download", href: "#step-6" },
              {
                label: "Client vs Server Processing",
                href: "#client-vs-server",
              },
              { label: "Supported Formats", href: "#formats" },
              { label: "Tips & Best Practices", href: "#tips" },
            ].map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="block text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </CardContent>
      </Card>

      <div className="max-w-4xl space-y-16">
        {/* Getting Started */}
        <section id="getting-started">
          <h2 className="text-2xl font-bold mb-4">Getting Started</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            The Image Converter is a powerful tool that lets you convert images
            between multiple formats, resize them, apply transformations, and add
            visual filters. All processing can happen directly in your browser
            for maximum privacy, or you can use server-side processing for
            higher quality results.
          </p>
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="p-4 flex items-start gap-3">
              <Info className="h-5 w-5 text-primary shrink-0 mt-0.5" />
              <p className="text-sm">
                Navigate to{" "}
                <Link
                  href="/image-converter"
                  className="text-primary font-medium hover:underline"
                >
                  Image Converter
                </Link>{" "}
                from the top navigation bar to get started.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Step 1 */}
        <section id="step-1">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary text-primary-foreground font-bold text-lg">
              1
            </div>
            <h2 className="text-2xl font-bold">Upload an Image</h2>
          </div>
          <div className="space-y-4">
            <p className="text-muted-foreground leading-relaxed">
              Start by uploading your image using one of these methods:
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              <Card className="border-2">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Upload className="h-5 w-5 text-primary" />
                    <h3 className="font-semibold">Drag & Drop</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Drag your image file directly onto the upload area. The
                    dotted border zone will highlight when you hover over it.
                  </p>
                </CardContent>
              </Card>
              <Card className="border-2">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Upload className="h-5 w-5 text-primary" />
                    <h3 className="font-semibold">Click to Browse</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Click the upload area to open your system&apos;s file picker
                    and select an image from your device.
                  </p>
                </CardContent>
              </Card>
            </div>
            <Card className="bg-yellow-500/5 border-yellow-500/20">
              <CardContent className="p-4 flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-yellow-500 shrink-0 mt-0.5" />
                <div className="text-sm">
                  <strong>File requirements:</strong>
                  <ul className="list-disc list-inside mt-1 text-muted-foreground space-y-1">
                    <li>
                      Supported types: PNG, JPEG, WEBP, AVIF, GIF, BMP, TIFF,
                      ICO
                    </li>
                    <li>Maximum file size: 50MB</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
            <p className="text-muted-foreground text-sm">
              Once uploaded, you&apos;ll see a preview of your image along with
              its file size and dimensions in the preview panel on the right.
            </p>
          </div>
        </section>

        {/* Step 2 */}
        <section id="step-2">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary text-primary-foreground font-bold text-lg">
              2
            </div>
            <h2 className="text-2xl font-bold">Choose Format & Quality</h2>
          </div>
          <div className="space-y-4">
            <p className="text-muted-foreground leading-relaxed">
              After uploading, the Conversion Settings panel appears. Under the{" "}
              <strong>Basic</strong> tab:
            </p>
            <div className="space-y-3">
              <Card className="border-2">
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-2 flex items-center gap-2">
                    <Settings className="h-4 w-4 text-primary" />
                    Output Format
                  </h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    Select the target format from the dropdown. Each format has
                    different strengths:
                  </p>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>
                      <strong>WEBP</strong> (default) - Great compression with
                      transparency support
                    </li>
                    <li>
                      <strong>PNG</strong> - Lossless quality, ideal for logos
                      and graphics
                    </li>
                    <li>
                      <strong>JPEG</strong> - Smallest file size for photos
                    </li>
                    <li>
                      <strong>AVIF</strong> - Best compression ratio (newest
                      format)
                    </li>
                    <li>
                      <strong>GIF</strong> - Animation support, limited colors
                    </li>
                    <li>
                      <strong>BMP/TIFF</strong> - Uncompressed, high quality
                    </li>
                    <li>
                      <strong>ICO</strong> - Icon format for favicons
                    </li>
                  </ul>
                </CardContent>
              </Card>
              <Card className="border-2">
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-2 flex items-center gap-2">
                    <Settings className="h-4 w-4 text-primary" />
                    Quality Slider
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Adjust the quality slider from 1 to 100. Higher values
                    produce better quality but larger files. The default value
                    of 80 provides a good balance between quality and file size
                    for most use cases.
                  </p>
                </CardContent>
              </Card>
              <Card className="border-2">
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-2 flex items-center gap-2">
                    <Settings className="h-4 w-4 text-primary" />
                    Preserve Metadata
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Check this option to keep EXIF data, ICC color profiles, and
                    other metadata from the original image. Useful for
                    photography workflows where metadata matters.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Step 3 */}
        <section id="step-3">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary text-primary-foreground font-bold text-lg">
              3
            </div>
            <h2 className="text-2xl font-bold">Resize (Optional)</h2>
          </div>
          <div className="space-y-4">
            <p className="text-muted-foreground leading-relaxed">
              Switch to the <strong>Resize</strong> tab to change image
              dimensions:
            </p>
            <Card className="border-2">
              <CardContent className="p-4 space-y-3">
                <div className="flex items-center gap-2">
                  <Maximize2 className="h-5 w-5 text-primary" />
                  <h3 className="font-semibold">Resize Options</h3>
                </div>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li>
                    <strong>Width & Height:</strong> Enter custom pixel values.
                    The original dimensions are displayed for reference.
                  </li>
                  <li>
                    <strong>Maintain Aspect Ratio:</strong> When enabled
                    (default), changing one dimension automatically calculates
                    the other to prevent stretching.
                  </li>
                  <li>
                    <strong>Tip:</strong> Enter only a width or only a height
                    with aspect ratio locked to scale proportionally.
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Step 4 */}
        <section id="step-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary text-primary-foreground font-bold text-lg">
              4
            </div>
            <h2 className="text-2xl font-bold">Transform (Optional)</h2>
          </div>
          <div className="space-y-4">
            <p className="text-muted-foreground leading-relaxed">
              Switch to the <strong>Transform</strong> tab to rotate or flip
              your image:
            </p>
            <Card className="border-2">
              <CardContent className="p-4 space-y-3">
                <div className="flex items-center gap-2">
                  <RotateCw className="h-5 w-5 text-primary" />
                  <h3 className="font-semibold">Transform Options</h3>
                </div>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li>
                    <strong>Rotate:</strong> Choose from preset angles (0&deg;,
                    90&deg;, 180&deg;, 270&deg;) or enter a custom angle for
                    precise rotation.
                  </li>
                  <li>
                    <strong>Flip Horizontal:</strong> Mirror the image left to
                    right.
                  </li>
                  <li>
                    <strong>Flip Vertical:</strong> Mirror the image top to
                    bottom.
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Step 5 */}
        <section id="step-5">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary text-primary-foreground font-bold text-lg">
              5
            </div>
            <h2 className="text-2xl font-bold">Apply Filters (Optional)</h2>
          </div>
          <div className="space-y-4">
            <p className="text-muted-foreground leading-relaxed">
              Switch to the <strong>Filters</strong> tab to add visual effects:
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              <Card className="border-2">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Paintbrush className="h-4 w-4 text-primary" />
                    <h3 className="font-semibold text-sm">Toggle Filters</h3>
                  </div>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>
                      <strong>Grayscale</strong> - Convert to black and white
                    </li>
                    <li>
                      <strong>Sepia</strong> - Warm vintage tone
                    </li>
                    <li>
                      <strong>Sharpen</strong> - Enhance edge detail
                    </li>
                  </ul>
                </CardContent>
              </Card>
              <Card className="border-2">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Paintbrush className="h-4 w-4 text-primary" />
                    <h3 className="font-semibold text-sm">Slider Filters</h3>
                  </div>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>
                      <strong>Blur</strong> (0-10) - Soften the image
                    </li>
                    <li>
                      <strong>Brightness</strong> (-100 to +100) - Lighten or
                      darken
                    </li>
                    <li>
                      <strong>Contrast</strong> (-100 to +100) - Adjust
                      contrast
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
            <p className="text-sm text-muted-foreground">
              You can combine multiple filters together. Use the{" "}
              <strong>Reset Settings</strong> button at the top to restore all
              defaults.
            </p>
          </div>
        </section>

        {/* Step 6 */}
        <section id="step-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary text-primary-foreground font-bold text-lg">
              6
            </div>
            <h2 className="text-2xl font-bold">Convert & Download</h2>
          </div>
          <div className="space-y-4">
            <p className="text-muted-foreground leading-relaxed">
              Once you&apos;ve configured your settings:
            </p>
            <ol className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-muted text-xs font-bold shrink-0 mt-0.5">
                  1
                </span>
                <p className="text-sm text-muted-foreground">
                  Click the <strong>&quot;Convert Image&quot;</strong> button. A
                  loading state will appear while processing.
                </p>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-muted text-xs font-bold shrink-0 mt-0.5">
                  2
                </span>
                <p className="text-sm text-muted-foreground">
                  Once conversion is complete, the converted image preview
                  appears in the right panel alongside the original for
                  comparison. File sizes are shown for both images.
                </p>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-muted text-xs font-bold shrink-0 mt-0.5">
                  3
                </span>
                <p className="text-sm text-muted-foreground">
                  Click <strong>&quot;Download Converted Image&quot;</strong> to
                  save the result to your device.
                </p>
              </li>
            </ol>
          </div>
        </section>

        {/* Client vs Server */}
        <section id="client-vs-server">
          <h2 className="text-2xl font-bold mb-4">
            Client vs Server Processing
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            You can toggle between two processing modes using the checkbox below
            the settings:
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            <Card className="border-2 border-green-500/30">
              <CardContent className="p-5">
                <div className="flex items-center gap-2 mb-3">
                  <Monitor className="h-5 w-5 text-green-500" />
                  <h3 className="font-semibold">Client-side (Default)</h3>
                </div>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500 shrink-0 mt-0.5" />
                    Images never leave your device
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500 shrink-0 mt-0.5" />
                    Faster processing for most images
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500 shrink-0 mt-0.5" />
                    Full filter support
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500 shrink-0 mt-0.5" />
                    Works offline after page loads
                  </li>
                </ul>
              </CardContent>
            </Card>
            <Card className="border-2 border-blue-500/30">
              <CardContent className="p-5">
                <div className="flex items-center gap-2 mb-3">
                  <Server className="h-5 w-5 text-blue-500" />
                  <h3 className="font-semibold">Server-side</h3>
                </div>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-blue-500 shrink-0 mt-0.5" />
                    Higher quality output (Sharp library)
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-blue-500 shrink-0 mt-0.5" />
                    Professional-grade processing
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-blue-500 shrink-0 mt-0.5" />
                    Better for large images
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-blue-500 shrink-0 mt-0.5" />
                    Requires internet connection
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Supported Formats */}
        <section id="formats">
          <h2 className="text-2xl font-bold mb-4">Supported Formats</h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                name: "PNG",
                desc: "Lossless, transparency",
                best: "Logos, screenshots",
              },
              {
                name: "JPEG",
                desc: "Small file size",
                best: "Photos, complex images",
              },
              {
                name: "WEBP",
                desc: "Great compression",
                best: "Web images",
              },
              {
                name: "AVIF",
                desc: "Best compression",
                best: "Next-gen web",
              },
              {
                name: "GIF",
                desc: "Animation support",
                best: "Animated images",
              },
              {
                name: "BMP",
                desc: "Uncompressed",
                best: "Maximum quality",
              },
              {
                name: "TIFF",
                desc: "High quality",
                best: "Print, archiving",
              },
              {
                name: "ICO",
                desc: "Icon format",
                best: "Favicons, app icons",
              },
            ].map((format) => (
              <Card key={format.name} className="border-2">
                <CardContent className="p-4">
                  <div className="font-bold text-lg mb-1">{format.name}</div>
                  <p className="text-xs text-muted-foreground">{format.desc}</p>
                  <p className="text-xs text-primary mt-1">
                    Best for: {format.best}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Tips */}
        <section id="tips">
          <h2 className="text-2xl font-bold mb-4">Tips & Best Practices</h2>
          <div className="space-y-3">
            {[
              "Use WEBP for web images - it offers the best balance of quality and compression.",
              "For photos, JPEG at 80% quality is often indistinguishable from the original at a fraction of the size.",
              "Use PNG for images that need transparency (logos, icons, overlays).",
              "AVIF produces the smallest files but takes longer to encode and has limited browser support for older browsers.",
              "Use server-side processing when you need the highest possible quality output.",
              "The Reset Settings button at the top right restores all options to defaults without removing your uploaded image.",
              "ICO and BMP formats always use client-side processing regardless of the server toggle.",
            ].map((tip, i) => (
              <Card key={i} className="border-2">
                <CardContent className="p-4 flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <p className="text-sm text-muted-foreground">{tip}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Navigation */}
        <div className="flex items-center justify-between pt-8 border-t">
          <Link
            href="/docs"
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Documentation
          </Link>
          <Link
            href="/docs/seo-validator"
            className="flex items-center gap-2 text-sm text-primary font-medium hover:underline"
          >
            SEO Validator Guide
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
