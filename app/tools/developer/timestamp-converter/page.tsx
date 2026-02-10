import { TimestampConverter } from "@/components/developer-tools/timestamp-converter";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Timestamp Converter - Unix Time to Human Readable | Branding Tools",
  description: "Convert Unix timestamps to human-readable dates and vice versa. Support for multiple timezones and relative time formatting.",
};

export default function TimestampConverterPage() {
  return (
    <div className="container mx-auto py-8 px-4 max-w-5xl">
      <TimestampConverter />
    </div>
  );
}
