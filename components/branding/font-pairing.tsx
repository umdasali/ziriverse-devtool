"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Copy, Check, Search, Type, Code, Download } from "lucide-react";
import { fontPairings, fontCategories, type FontPair } from "@/lib/font-pairing/pairings";

export function FontPairing() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedPair, setSelectedPair] = useState<FontPair | null>(null);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [customText, setCustomText] = useState<string>("The quick brown fox jumps over the lazy dog");

  // Load Google Fonts dynamically
  useEffect(() => {
    const loadFonts = () => {
      const fonts = new Set<string>();
      fontPairings.forEach((pair) => {
        fonts.add(pair.heading.name);
        fonts.add(pair.body.name);
      });

      const link = document.createElement("link");
      link.href = `https://fonts.googleapis.com/css2?${Array.from(fonts)
        .map((font) => `family=${font.replace(/ /g, "+")}:wght@400;600;700`)
        .join("&")}&display=swap`;
      link.rel = "stylesheet";
      document.head.appendChild(link);
    };

    loadFonts();
  }, []);

  // Filter pairings
  const filteredPairings = fontPairings.filter((pair) => {
    const matchesCategory = selectedCategory === "all" || pair.category === selectedCategory;
    const matchesSearch =
      searchQuery === "" ||
      pair.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pair.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pair.useCase.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Generate CSS code
  const generateCSS = (pair: FontPair) => {
    return `/* Google Fonts Import */
@import url('https://fonts.googleapis.com/css2?family=${pair.heading.name.replace(/ /g, "+")}:wght@600;700&family=${pair.body.name.replace(/ /g, "+")}:wght@400&display=swap');

/* Heading Styles */
h1, h2, h3, h4, h5, h6 {
  font-family: ${pair.heading.family};
  font-weight: ${pair.heading.weight};
}

/* Body Styles */
body, p {
  font-family: ${pair.body.family};
  font-weight: ${pair.body.weight};
}`;
  };

  // Generate HTML code
  const generateHTML = (pair: FontPair) => {
    return `<!-- Add to <head> -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=${pair.heading.name.replace(/ /g, "+")}:wght@600;700&family=${pair.body.name.replace(/ /g, "+")}:wght@400&display=swap" rel="stylesheet">`;
  };

  // Copy code
  const copyCode = (code: string, type: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(type);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold mb-2">Font Pairing Suggestions</h1>
        <p className="text-muted-foreground">
          Discover perfect font combinations for your designs
        </p>
      </div>

      {/* Search & Filter */}
      <Card>
        <CardContent className="pt-6 space-y-4">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search by name, description, or use case..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <div className="flex gap-2 flex-wrap">
            {fontCategories.map((cat) => (
              <Button
                key={cat.id}
                variant={selectedCategory === cat.id ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(cat.id)}
              >
                {cat.label}
                <Badge variant="secondary" className="ml-2">
                  {cat.count}
                </Badge>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Results Count */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Showing {filteredPairings.length} of {fontPairings.length} pairings
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Pairing Cards */}
        <div className="space-y-4 lg:max-h-[800px] lg:overflow-y-auto lg:pr-2">
          {filteredPairings.map((pair) => (
            <Card
              key={pair.id}
              className={`cursor-pointer transition-all ${
                selectedPair?.id === pair.id
                  ? "border-primary shadow-lg"
                  : "hover:shadow-md"
              }`}
              onClick={() => setSelectedPair(pair)}
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg mb-2">{pair.name}</CardTitle>
                    <CardDescription>{pair.description}</CardDescription>
                  </div>
                  <Badge>{pair.category}</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Heading Preview */}
                <div>
                  <p className="text-xs text-muted-foreground mb-2">
                    Heading: {pair.heading.name}
                  </p>
                  <h2
                    className="text-2xl"
                    style={{
                      fontFamily: pair.heading.family,
                      fontWeight: pair.heading.weight,
                    }}
                  >
                    Beautiful Typography
                  </h2>
                </div>

                {/* Body Preview */}
                <div>
                  <p className="text-xs text-muted-foreground mb-2">
                    Body: {pair.body.name}
                  </p>
                  <p
                    className="text-sm"
                    style={{
                      fontFamily: pair.body.family,
                      fontWeight: pair.body.weight,
                    }}
                  >
                    {customText}
                  </p>
                </div>

                {/* Use Case */}
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Type className="w-3 h-3" />
                  <span>Best for: {pair.useCase}</span>
                </div>
              </CardContent>
            </Card>
          ))}

          {filteredPairings.length === 0 && (
            <Card>
              <CardContent className="py-16 text-center text-muted-foreground">
                <Type className="w-16 h-16 mx-auto mb-4 opacity-20" />
                <p>No font pairings found</p>
                <p className="text-sm mt-2">Try adjusting your filters or search query</p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Right: Preview & Code */}
        <div className="space-y-6 lg:sticky lg:top-6 lg:self-start">
          {selectedPair ? (
            <>
              {/* Custom Text Input */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Custom Preview Text</CardTitle>
                </CardHeader>
                <CardContent>
                  <Input
                    value={customText}
                    onChange={(e) => setCustomText(e.target.value)}
                    placeholder="Enter custom text..."
                  />
                </CardContent>
              </Card>

              {/* Large Preview */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Type className="w-5 h-5" />
                    {selectedPair.name}
                  </CardTitle>
                  <CardDescription>{selectedPair.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h1
                      className="text-4xl mb-2"
                      style={{
                        fontFamily: selectedPair.heading.family,
                        fontWeight: selectedPair.heading.weight,
                      }}
                    >
                      Heading Example
                    </h1>
                    <h2
                      className="text-3xl mb-2"
                      style={{
                        fontFamily: selectedPair.heading.family,
                        fontWeight: selectedPair.heading.weight,
                      }}
                    >
                      Subheading Style
                    </h2>
                    <h3
                      className="text-2xl mb-4"
                      style={{
                        fontFamily: selectedPair.heading.family,
                        fontWeight: "600",
                      }}
                    >
                      Smaller Heading
                    </h3>
                  </div>

                  <div
                    className="space-y-2"
                    style={{
                      fontFamily: selectedPair.body.family,
                      fontWeight: selectedPair.body.weight,
                    }}
                  >
                    <p className="text-base">{customText}</p>
                    <p className="text-sm text-muted-foreground">
                      This is how body text will appear in your design. The font
                      pairing creates a harmonious balance between headings and
                      content.
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="font-medium mb-1">Heading Font</p>
                      <p className="text-muted-foreground">{selectedPair.heading.name}</p>
                    </div>
                    <div>
                      <p className="font-medium mb-1">Body Font</p>
                      <p className="text-muted-foreground">{selectedPair.body.name}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Code Export */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Code className="w-5 h-5" />
                    Implementation Code
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="css">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="css">CSS</TabsTrigger>
                      <TabsTrigger value="html">HTML</TabsTrigger>
                    </TabsList>

                    <TabsContent value="css" className="space-y-2">
                      <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-xs">
                        {generateCSS(selectedPair)}
                      </pre>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => copyCode(generateCSS(selectedPair), "css")}
                        className="w-full"
                      >
                        {copiedCode === "css" ? (
                          <>
                            <Check className="w-4 h-4 mr-2" />
                            Copied!
                          </>
                        ) : (
                          <>
                            <Copy className="w-4 h-4 mr-2" />
                            Copy CSS
                          </>
                        )}
                      </Button>
                    </TabsContent>

                    <TabsContent value="html" className="space-y-2">
                      <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-xs">
                        {generateHTML(selectedPair)}
                      </pre>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => copyCode(generateHTML(selectedPair), "html")}
                        className="w-full"
                      >
                        {copiedCode === "html" ? (
                          <>
                            <Check className="w-4 h-4 mr-2" />
                            Copied!
                          </>
                        ) : (
                          <>
                            <Copy className="w-4 h-4 mr-2" />
                            Copy HTML
                          </>
                        )}
                      </Button>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>

              {/* Tips */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Typography Tips</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Use heading font for H1-H6 elements</li>
                    <li>• Use body font for paragraphs and text content</li>
                    <li>• Maintain consistent line heights (1.5-1.7 for body)</li>
                    <li>• Ensure sufficient contrast for readability</li>
                    <li>• Test pairing at different sizes before finalizing</li>
                  </ul>
                </CardContent>
              </Card>
            </>
          ) : (
            <Card>
              <CardContent className="py-32 text-center text-muted-foreground">
                <Type className="w-16 h-16 mx-auto mb-4 opacity-20" />
                <p>Select a font pairing to see preview and code</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
