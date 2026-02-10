import { RegexMakerTool } from "@/components/developer-tools/regex-maker";

export default function RegexMakerPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        <RegexMakerTool />
      </div>
    </main>
  );
}
