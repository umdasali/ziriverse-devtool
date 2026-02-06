"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { MetaTags } from "@/types/seo";
import {
  getPlatformTitle,
  getPlatformDescription,
  getPlatformImage,
} from "@/lib/seo-validator/meta-validator";

interface PlatformPreviewsProps {
  metaTags: MetaTags;
}

export function PlatformPreviews({ metaTags }: PlatformPreviewsProps) {
  return (
    <Tabs defaultValue="facebook" className="w-full">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="facebook">Facebook</TabsTrigger>
        <TabsTrigger value="twitter">Twitter</TabsTrigger>
        <TabsTrigger value="discord">Discord</TabsTrigger>
        <TabsTrigger value="reddit">Reddit</TabsTrigger>
      </TabsList>

      <TabsContent value="facebook">
        <FacebookPreview metaTags={metaTags} />
      </TabsContent>

      <TabsContent value="twitter">
        <TwitterPreview metaTags={metaTags} />
      </TabsContent>

      <TabsContent value="discord">
        <DiscordPreview metaTags={metaTags} />
      </TabsContent>

      <TabsContent value="reddit">
        <RedditPreview metaTags={metaTags} />
      </TabsContent>
    </Tabs>
  );
}

function FacebookPreview({ metaTags }: { metaTags: MetaTags }) {
  const title = getPlatformTitle(metaTags, "facebook");
  const description = getPlatformDescription(metaTags, "facebook");
  const image = getPlatformImage(metaTags, "facebook");
  const url = metaTags.ogUrl || metaTags.url || "";

  return (
    <Card>
      <CardContent className="p-0">
        <div className="border rounded-lg overflow-hidden">
          {image && (
            <div className="aspect-[1.91/1] bg-muted relative">
              <img
                src={image}
                alt="Preview"
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = "none";
                }}
              />
            </div>
          )}
          <div className="p-3 bg-gray-50 border-t">
            <p className="text-xs text-gray-500 uppercase mb-1">
              {new URL(url || "https://example.com").hostname}
            </p>
            <h3 className="font-semibold text-sm line-clamp-2 mb-1">
              {title}
            </h3>
            <p className="text-xs text-gray-600 line-clamp-1">{description}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function TwitterPreview({ metaTags }: { metaTags: MetaTags }) {
  const title = getPlatformTitle(metaTags, "twitter");
  const description = getPlatformDescription(metaTags, "twitter");
  const image = getPlatformImage(metaTags, "twitter");
  const url = metaTags.url || "";
  const cardType = metaTags.twitterCard || "summary_large_image";

  return (
    <Card>
      <CardContent className="p-0">
        <div className="border rounded-2xl overflow-hidden">
          {image && cardType === "summary_large_image" && (
            <div className="aspect-[2/1] bg-muted relative">
              <img
                src={image}
                alt="Preview"
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = "none";
                }}
              />
            </div>
          )}
          <div className="p-3 border-t">
            {image && cardType === "summary" && (
              <div className="float-right ml-3 mb-2">
                <div className="w-24 h-24 bg-muted rounded overflow-hidden">
                  <img
                    src={image}
                    alt="Preview"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = "none";
                    }}
                  />
                </div>
              </div>
            )}
            <p className="text-xs text-gray-500 mb-1">
              {new URL(url || "https://example.com").hostname}
            </p>
            <h3 className="font-semibold text-sm line-clamp-2 mb-1">
              {title}
            </h3>
            <p className="text-xs text-gray-600 line-clamp-2">{description}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function DiscordPreview({ metaTags }: { metaTags: MetaTags }) {
  const title = getPlatformTitle(metaTags, "discord");
  const description = getPlatformDescription(metaTags, "discord");
  const image = getPlatformImage(metaTags, "discord");
  const siteName = metaTags.ogSiteName || "";

  return (
    <Card>
      <CardContent className="p-4">
        <div className="border-l-4 border-blue-500 pl-3">
          {siteName && (
            <p className="text-xs font-semibold text-gray-700 mb-1">
              {siteName}
            </p>
          )}
          <h3 className="text-sm font-semibold text-blue-600 mb-1 hover:underline cursor-pointer">
            {title}
          </h3>
          <p className="text-xs text-gray-600 mb-2">{description}</p>
          {image && (
            <div className="max-w-md">
              <div className="aspect-video bg-muted rounded overflow-hidden">
                <img
                  src={image}
                  alt="Preview"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = "none";
                  }}
                />
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

function RedditPreview({ metaTags }: { metaTags: MetaTags }) {
  const title = getPlatformTitle(metaTags, "reddit");
  const image = getPlatformImage(metaTags, "reddit");
  const url = metaTags.url || "";

  return (
    <Card>
      <CardContent className="p-0">
        <div className="border rounded overflow-hidden bg-white">
          <div className="flex items-start p-2">
            {image && (
              <div className="w-24 h-24 bg-muted rounded overflow-hidden flex-shrink-0 mr-3">
                <img
                  src={image}
                  alt="Preview"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = "none";
                  }}
                />
              </div>
            )}
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-medium line-clamp-2 mb-1 text-gray-900">
                {title}
              </h3>
              <p className="text-xs text-gray-500">
                {new URL(url || "https://example.com").hostname}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
