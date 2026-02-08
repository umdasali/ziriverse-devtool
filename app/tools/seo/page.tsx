"use client";

import { toolCategories } from "@/lib/tool-registry";
import { CategoryPage } from "@/components/shared/category-page";

export default function SEOToolsPage() {
  const category = toolCategories.find((c) => c.id === "seo")!;
  return <CategoryPage category={category} />;
}
