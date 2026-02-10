import { FontPairing } from "@/components/branding/font-pairing";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Font Pairing Suggestions - Beautiful Typography Combinations | Branding Tools",
  description: "Discover perfect font pairings for your designs. Browse curated combinations of Google Fonts with live preview and CSS code.",
};

export default function FontPairingPage() {
  return (
    <div className="container mx-auto py-8 px-4 max-w-7xl">
      <FontPairing />
    </div>
  );
}
