import { QRGenerator } from "@/components/developer-tools/qr-generator";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "QR Code Generator - Create Custom QR Codes | Branding Tools",
  description: "Generate QR codes for URLs, text, WiFi, and more. Customize size, color, and download as PNG or SVG.",
};

export default function QRGeneratorPage() {
  return (
    <div className="container mx-auto py-8 px-4 max-w-5xl">
      <QRGenerator />
    </div>
  );
}
