"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { ToolCategory } from "@/lib/tool-registry";

interface CategoryPageProps {
  category: ToolCategory;
}

export function CategoryPage({ category }: CategoryPageProps) {
  return (
    <div className="container mx-auto px-4 py-6 sm:py-8 max-w-7xl">
      {/* Header */}
      <div className="flex items-start gap-4 mb-8">
        <div className={`p-3 rounded-lg bg-gradient-to-br ${category.gradient} flex-shrink-0`}>
          <category.icon className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
        </div>
        <div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold">{category.name}</h1>
          <p className="text-sm sm:text-base text-muted-foreground mt-1">
            {category.description}
          </p>
          <div className="flex items-center gap-2 mt-2">
            <Badge variant="secondary">{category.tools.length} Tools</Badge>
            {category.tools.some((t) => t.isNew) && (
              <Badge className="bg-green-500/10 text-green-600 border-green-500/20">
                {category.tools.filter((t) => t.isNew).length} New
              </Badge>
            )}
          </div>
        </div>
      </div>

      {/* Tools Grid */}
      <div className="grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {category.tools.map((tool) => (
          <Card
            key={tool.id}
            className="group relative overflow-hidden hover:shadow-lg transition-all duration-300"
          >
            <div
              className={`absolute inset-0 bg-gradient-to-br ${tool.gradient} opacity-0 group-hover:opacity-5 transition-opacity pointer-events-none`}
            />
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="p-2 rounded-lg bg-primary/10">
                  <tool.icon className="w-5 h-5 text-primary" />
                </div>
                <div className="flex gap-1.5">
                  {tool.badge && (
                    <Badge variant="secondary" className="text-xs">
                      {tool.badge}
                    </Badge>
                  )}
                  {tool.isNew && (
                    <Badge className="bg-green-500/10 text-green-600 border-green-500/20 text-xs">
                      New
                    </Badge>
                  )}
                </div>
              </div>
              <CardTitle className="text-lg mt-3">{tool.name}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">{tool.description}</p>
              <Button asChild className="w-full group/btn">
                <Link href={tool.href}>
                  Try it Now
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
