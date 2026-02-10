"use client";

import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Download, Link as LinkIcon, FileText, Wifi, QrCode as QrCodeIcon } from "lucide-react";
import QRCode from "qrcode";

type QRType = "url" | "text" | "wifi";

export function QRGenerator() {
  const [qrType, setQRType] = useState<QRType>("url");
  const [urlInput, setUrlInput] = useState<string>("");
  const [textInput, setTextInput] = useState<string>("");
  const [wifiSSID, setWifiSSID] = useState<string>("");
  const [wifiPassword, setWifiPassword] = useState<string>("");
  const [wifiSecurity, setWifiSecurity] = useState<string>("WPA");
  const [qrSize, setQRSize] = useState<number>(300);
  const [qrColor, setQRColor] = useState<string>("#000000");
  const [bgColor, setBgColor] = useState<string>("#ffffff");
  const [errorCorrection, setErrorCorrection] = useState<"L" | "M" | "Q" | "H">("M");
  const [qrDataURL, setQRDataURL] = useState<string>("");
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Generate QR code
  const generateQR = async () => {
    let data = "";

    switch (qrType) {
      case "url":
        data = urlInput;
        break;
      case "text":
        data = textInput;
        break;
      case "wifi":
        // WiFi QR code format: WIFI:T:WPA;S:mynetwork;P:mypassword;;
        data = `WIFI:T:${wifiSecurity};S:${wifiSSID};P:${wifiPassword};;`;
        break;
    }

    if (!data.trim()) return;

    try {
      const canvas = canvasRef.current;
      if (!canvas) return;

      await QRCode.toCanvas(canvas, data, {
        width: qrSize,
        color: {
          dark: qrColor,
          light: bgColor,
        },
        errorCorrectionLevel: errorCorrection,
        margin: 2,
      });

      // Convert canvas to data URL for download
      setQRDataURL(canvas.toDataURL("image/png"));
    } catch (error) {
      console.error("Error generating QR code:", error);
    }
  };

  // Auto-generate on input change
  useEffect(() => {
    const timeout = setTimeout(() => {
      generateQR();
    }, 500);

    return () => clearTimeout(timeout);
  }, [qrType, urlInput, textInput, wifiSSID, wifiPassword, wifiSecurity, qrSize, qrColor, bgColor, errorCorrection]);

  // Download QR code
  const downloadQR = () => {
    if (!qrDataURL) return;

    const link = document.createElement("a");
    link.href = qrDataURL;
    link.download = `qr-code-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const isQRValid = () => {
    switch (qrType) {
      case "url":
        return urlInput.trim().length > 0;
      case "text":
        return textInput.trim().length > 0;
      case "wifi":
        return wifiSSID.trim().length > 0 && wifiPassword.trim().length > 0;
      default:
        return false;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold mb-2">QR Code Generator</h1>
        <p className="text-muted-foreground">
          Generate custom QR codes for URLs, text, WiFi, and more
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column: Controls */}
        <div className="space-y-6">
          {/* Type Selection */}
          <Card>
            <CardHeader>
              <CardTitle>QR Code Type</CardTitle>
              <CardDescription>Select what you want to encode</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs value={qrType} onValueChange={(v) => setQRType(v as QRType)}>
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="url">
                    <LinkIcon className="w-4 h-4 mr-2" />
                    URL
                  </TabsTrigger>
                  <TabsTrigger value="text">
                    <FileText className="w-4 h-4 mr-2" />
                    Text
                  </TabsTrigger>
                  <TabsTrigger value="wifi">
                    <Wifi className="w-4 h-4 mr-2" />
                    WiFi
                  </TabsTrigger>
                </TabsList>

                {/* URL Input */}
                <TabsContent value="url" className="space-y-4">
                  <div className="space-y-2">
                    <Label>Website URL</Label>
                    <Input
                      type="url"
                      placeholder="https://example.com"
                      value={urlInput}
                      onChange={(e) => setUrlInput(e.target.value)}
                    />
                    <p className="text-xs text-muted-foreground">
                      Scanning will open this URL
                    </p>
                  </div>
                </TabsContent>

                {/* Text Input */}
                <TabsContent value="text" className="space-y-4">
                  <div className="space-y-2">
                    <Label>Text Content</Label>
                    <Textarea
                      placeholder="Enter any text..."
                      value={textInput}
                      onChange={(e) => setTextInput(e.target.value)}
                      rows={4}
                    />
                    <p className="text-xs text-muted-foreground">
                      {textInput.length} characters
                    </p>
                  </div>
                </TabsContent>

                {/* WiFi Input */}
                <TabsContent value="wifi" className="space-y-4">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Network Name (SSID)</Label>
                      <Input
                        placeholder="MyNetwork"
                        value={wifiSSID}
                        onChange={(e) => setWifiSSID(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Password</Label>
                      <Input
                        type="password"
                        placeholder="Enter WiFi password"
                        value={wifiPassword}
                        onChange={(e) => setWifiPassword(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Security Type</Label>
                      <Select value={wifiSecurity} onValueChange={setWifiSecurity}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="WPA">WPA/WPA2</SelectItem>
                          <SelectItem value="WEP">WEP</SelectItem>
                          <SelectItem value="nopass">None (Open)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Scanning will connect to this WiFi network
                    </p>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* Customization */}
          <Card>
            <CardHeader>
              <CardTitle>Customization</CardTitle>
              <CardDescription>Adjust size, colors, and error correction</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Size */}
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label>Size: {qrSize}px</Label>
                </div>
                <Slider
                  value={[qrSize]}
                  onValueChange={([value]) => setQRSize(value)}
                  min={150}
                  max={500}
                  step={10}
                />
              </div>

              {/* Colors */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>QR Color</Label>
                  <div className="flex gap-2">
                    <Input
                      type="color"
                      value={qrColor}
                      onChange={(e) => setQRColor(e.target.value)}
                      className="h-10 w-20"
                    />
                    <Input
                      type="text"
                      value={qrColor}
                      onChange={(e) => setQRColor(e.target.value)}
                      placeholder="#000000"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Background</Label>
                  <div className="flex gap-2">
                    <Input
                      type="color"
                      value={bgColor}
                      onChange={(e) => setBgColor(e.target.value)}
                      className="h-10 w-20"
                    />
                    <Input
                      type="text"
                      value={bgColor}
                      onChange={(e) => setBgColor(e.target.value)}
                      placeholder="#ffffff"
                    />
                  </div>
                </div>
              </div>

              {/* Error Correction */}
              <div className="space-y-2">
                <Label>Error Correction Level</Label>
                <Select value={errorCorrection} onValueChange={(v: any) => setErrorCorrection(v)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="L">Low (~7% recovery)</SelectItem>
                    <SelectItem value="M">Medium (~15% recovery)</SelectItem>
                    <SelectItem value="Q">Quartile (~25% recovery)</SelectItem>
                    <SelectItem value="H">High (~30% recovery)</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">
                  Higher levels allow QR code to work even if partially damaged
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Preview */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <QrCodeIcon className="w-5 h-5" />
                QR Code Preview
              </CardTitle>
            </CardHeader>
            <CardContent>
              {isQRValid() ? (
                <div className="flex flex-col items-center gap-4">
                  <div
                    className="border-2 border-dashed rounded-lg p-4"
                    style={{ backgroundColor: bgColor }}
                  >
                    <canvas ref={canvasRef} />
                  </div>
                  <Button onClick={downloadQR} className="w-full" disabled={!qrDataURL}>
                    <Download className="w-4 h-4 mr-2" />
                    Download PNG
                  </Button>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-16 text-center text-muted-foreground">
                  <QrCodeIcon className="w-16 h-16 mb-4 opacity-20" />
                  <p>Enter content to generate QR code</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Tips Card */}
          <Card>
            <CardHeader>
              <CardTitle>Tips</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Larger QR codes are easier to scan from a distance</li>
                <li>• High contrast (dark on light) works best</li>
                <li>• Higher error correction allows damaged codes to work</li>
                <li>• Test QR codes before printing or sharing</li>
                <li>• Keep URLs short for simpler, more scannable codes</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
