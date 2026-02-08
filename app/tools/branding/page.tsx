"use client";

import { toolCategories } from "@/lib/tool-registry";
import { CategoryPage } from "@/components/shared/category-page";

export default function BrandingToolsPage() {
  const category = toolCategories.find((c) => c.id === "branding")!;
  return <CategoryPage category={category} />;
}
