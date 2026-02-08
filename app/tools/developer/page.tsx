"use client";

import { toolCategories } from "@/lib/tool-registry";
import { CategoryPage } from "@/components/shared/category-page";

export default function DeveloperToolsPage() {
  const category = toolCategories.find((c) => c.id === "developer")!;
  return <CategoryPage category={category} />;
}
