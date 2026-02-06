"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { AdvancedSEOData } from "@/types/seo";
import {
  Heading1,
  Link,
  Image as ImageIcon,
  FileText,
  Code2,
  Zap,
  Shield,
  CheckCircle2,
  XCircle,
  AlertCircle,
} from "lucide-react";

interface AdvancedAnalysisProps {
  data: AdvancedSEOData;
}

export function AdvancedAnalysis({ data }: AdvancedAnalysisProps) {
  return (
    <div className="space-y-6">
      <Tabs defaultValue="headings" className="w-full">
        <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6">
          <TabsTrigger value="headings">Headings</TabsTrigger>
          <TabsTrigger value="links">Links</TabsTrigger>
          <TabsTrigger value="images">Images</TabsTrigger>
          <TabsTrigger value="content">Content</TabsTrigger>
          <TabsTrigger value="technical">Technical</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>

        {/* Headings Tab */}
        <TabsContent value="headings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heading1 className="h-5 w-5" />
                Heading Structure
              </CardTitle>
              <CardDescription>
                Hierarchical structure of your page headings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* H1 */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-semibold">H1 Headings</span>
                  <Badge variant={data.headings.h1.length === 1 ? "default" : "destructive"}>
                    {data.headings.h1.length}
                  </Badge>
                </div>
                {data.headings.h1.length === 0 && (
                  <p className="text-sm text-destructive">No H1 heading found. Add exactly one H1 per page.</p>
                )}
                {data.headings.h1.length > 1 && (
                  <p className="text-sm text-destructive">Multiple H1 headings found. Use only one H1.</p>
                )}
                {data.headings.h1.map((text, i) => (
                  <div key={i} className="text-sm bg-muted p-2 rounded">{text}</div>
                ))}
              </div>

              {/* H2-H6 Accordion */}
              <Accordion type="single" collapsible>
                {['h2', 'h3', 'h4', 'h5', 'h6'].map((level) => {
                  const headings = data.headings[level as keyof typeof data.headings];
                  return (
                    <AccordionItem key={level} value={level}>
                      <AccordionTrigger>
                        <div className="flex items-center gap-2">
                          <span>{level.toUpperCase()} Headings</span>
                          <Badge variant="secondary">{headings.length}</Badge>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        {headings.length === 0 ? (
                          <p className="text-sm text-muted-foreground">No {level.toUpperCase()} headings found</p>
                        ) : (
                          <div className="space-y-2">
                            {headings.map((text, i) => (
                              <div key={i} className="text-sm bg-muted p-2 rounded">{text}</div>
                            ))}
                          </div>
                        )}
                      </AccordionContent>
                    </AccordionItem>
                  );
                })}
              </Accordion>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Links Tab */}
        <TabsContent value="links" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Link className="h-5 w-5" />
                Link Analysis
              </CardTitle>
              <CardDescription>
                Internal and external link distribution
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-muted rounded-lg">
                  <div className="text-3xl font-bold">{data.links.totalLinks}</div>
                  <div className="text-sm text-muted-foreground">Total Links</div>
                </div>
                <div className="text-center p-4 bg-muted rounded-lg">
                  <div className="text-3xl font-bold text-blue-600">{data.links.internalLinks}</div>
                  <div className="text-sm text-muted-foreground">Internal Links</div>
                </div>
                <div className="text-center p-4 bg-muted rounded-lg">
                  <div className="text-3xl font-bold text-green-600">{data.links.externalLinks}</div>
                  <div className="text-sm text-muted-foreground">External Links</div>
                </div>
                <div className="text-center p-4 bg-muted rounded-lg">
                  <div className="text-3xl font-bold text-orange-600">{data.links.noFollowLinks}</div>
                  <div className="text-sm text-muted-foreground">NoFollow Links</div>
                </div>
              </div>

              {data.links.totalLinks === 0 && (
                <div className="flex items-start gap-2 text-sm text-destructive">
                  <AlertCircle className="h-4 w-4 mt-0.5" />
                  <span>No links found. Add internal and external links to improve SEO.</span>
                </div>
              )}

              {data.links.internalLinks === 0 && data.links.totalLinks > 0 && (
                <div className="flex items-start gap-2 text-sm text-yellow-600">
                  <AlertCircle className="h-4 w-4 mt-0.5" />
                  <span>No internal links found. Link to other pages on your site.</span>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Images Tab */}
        <TabsContent value="images" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ImageIcon className="h-5 w-5" />
                Image Analysis
              </CardTitle>
              <CardDescription>
                Image optimization and alt text coverage
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-muted rounded-lg">
                  <div className="text-3xl font-bold">{data.images.totalImages}</div>
                  <div className="text-sm text-muted-foreground">Total Images</div>
                </div>
                <div className="text-center p-4 bg-muted rounded-lg">
                  <div className="text-3xl font-bold text-green-600">{data.images.imagesWithAlt}</div>
                  <div className="text-sm text-muted-foreground">With Alt Text</div>
                </div>
              </div>

              {data.images.imagesWithoutAlt > 0 && (
                <div className="flex items-start gap-2 text-sm text-destructive">
                  <XCircle className="h-4 w-4 mt-0.5" />
                  <span>
                    {data.images.imagesWithoutAlt} images missing alt text (
                    {Math.round((data.images.imagesWithoutAlt / data.images.totalImages) * 100)}%)
                  </span>
                </div>
              )}

              {Object.keys(data.images.imageFormats).length > 0 && (
                <div className="space-y-2">
                  <span className="text-sm font-semibold">Image Formats</span>
                  <div className="flex flex-wrap gap-2">
                    {Object.entries(data.images.imageFormats).map(([format, count]) => (
                      <Badge key={format} variant="secondary">
                        {format.toUpperCase()}: {count}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Content Tab */}
        <TabsContent value="content" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Content Analysis
              </CardTitle>
              <CardDescription>
                Content quality and keyword analysis
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-4 bg-muted rounded-lg">
                  <div className="text-3xl font-bold">{data.content.wordCount}</div>
                  <div className="text-sm text-muted-foreground">Words</div>
                </div>
                <div className="text-center p-4 bg-muted rounded-lg">
                  <div className="text-3xl font-bold">{data.content.paragraphCount}</div>
                  <div className="text-sm text-muted-foreground">Paragraphs</div>
                </div>
                <div className="text-center p-4 bg-muted rounded-lg">
                  <div className="text-3xl font-bold">{data.content.readabilityScore}</div>
                  <div className="text-sm text-muted-foreground">Readability</div>
                </div>
              </div>

              <div className="space-y-2">
                <span className="text-sm font-semibold">Content Length</span>
                <Badge variant={data.content.contentLength === 'long' ? 'default' : 'secondary'}>
                  {data.content.contentLength.toUpperCase()}
                </Badge>
              </div>

              {Object.keys(data.content.keywordDensity).length > 0 && (
                <div className="space-y-2">
                  <span className="text-sm font-semibold">Top Keywords</span>
                  <div className="space-y-1">
                    {Object.entries(data.content.keywordDensity)
                      .slice(0, 10)
                      .map(([word, density]) => (
                        <div key={word} className="flex items-center justify-between text-sm">
                          <span>{word}</span>
                          <span className="text-muted-foreground">{density.toFixed(2)}%</span>
                        </div>
                      ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Technical Tab */}
        <TabsContent value="technical" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Code2 className="h-5 w-5" />
                Technical SEO
              </CardTitle>
              <CardDescription>
                Schema markup and performance metrics
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Schema Markup */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-semibold">Schema Markup</span>
                  {data.schema.detected ? (
                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                  ) : (
                    <XCircle className="h-5 w-5 text-red-600" />
                  )}
                </div>
                {data.schema.detected ? (
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">
                      Found {data.schema.count} structured data {data.schema.count === 1 ? 'block' : 'blocks'}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {data.schema.types.map((type, i) => (
                        <Badge key={i} variant="default">{type}</Badge>
                      ))}
                    </div>
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">
                    No structured data found. Add JSON-LD for better search results.
                  </p>
                )}
              </div>

              {/* Performance */}
              <div className="space-y-2">
                <span className="font-semibold">Performance</span>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>HTML Size</span>
                    <span className="font-mono">{Math.round(data.performance.htmlSize / 1024)} KB</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span>Estimated Load Time</span>
                    <span className="font-mono">{data.performance.estimatedLoadTime}s</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span>Minified Resources</span>
                    {data.performance.hasMinifiedResources ? (
                      <CheckCircle2 className="h-4 w-4 text-green-600" />
                    ) : (
                      <XCircle className="h-4 w-4 text-red-600" />
                    )}
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span>Compression Enabled</span>
                    {data.performance.compressionEnabled ? (
                      <CheckCircle2 className="h-4 w-4 text-green-600" />
                    ) : (
                      <XCircle className="h-4 w-4 text-red-600" />
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Tab */}
        <TabsContent value="security" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Security & Trust
              </CardTitle>
              <CardDescription>
                Security headers and HTTPS configuration
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">HTTPS Enabled</span>
                  {data.security.isHttps ? (
                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                  ) : (
                    <XCircle className="h-5 w-5 text-red-600" />
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm">HSTS Header</span>
                  {data.security.hasHsts ? (
                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                  ) : (
                    <AlertCircle className="h-5 w-5 text-yellow-600" />
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm">Mixed Content</span>
                  {!data.security.mixedContent ? (
                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                  ) : (
                    <XCircle className="h-5 w-5 text-red-600" />
                  )}
                </div>
              </div>

              {data.security.secureHeaders.length > 0 && (
                <div className="space-y-2">
                  <span className="text-sm font-semibold">Security Headers</span>
                  <div className="flex flex-wrap gap-2">
                    {data.security.secureHeaders.map((header, i) => (
                      <Badge key={i} variant="secondary">{header}</Badge>
                    ))}
                  </div>
                </div>
              )}

              {!data.security.isHttps && (
                <div className="flex items-start gap-2 text-sm text-destructive">
                  <XCircle className="h-4 w-4 mt-0.5" />
                  <span>Critical: Enable HTTPS immediately. This affects security and SEO rankings.</span>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
