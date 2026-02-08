"use client";

import Link from "next/link";
import { ChevronRight, type LucideIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface Breadcrumb {
  label: string;
  href?: string;
}

interface ToolPageLayoutProps {
  icon: LucideIcon;
  iconColor?: string;
  title: string;
  description: string;
  badge?: string;
  isNew?: boolean;
  breadcrumbs: Breadcrumb[];
  actions?: React.ReactNode;
  children: React.ReactNode;
}

export function ToolPageLayout({
  icon: Icon,
  iconColor = "text-primary",
  title,
  description,
  badge,
  isNew,
  breadcrumbs,
  actions,
  children,
}: ToolPageLayoutProps) {
  return (
    <div className="container mx-auto px-4 py-6 sm:py-8 max-w-7xl">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-1.5 text-sm text-muted-foreground mb-6">
        {breadcrumbs.map((crumb, i) => (
          <span key={i} className="flex items-center gap-1.5">
            {i > 0 && <ChevronRight className="h-3.5 w-3.5" />}
            {crumb.href ? (
              <Link href={crumb.href} className="hover:text-foreground transition-colors">
                {crumb.label}
              </Link>
            ) : (
              <span className="text-foreground">{crumb.label}</span>
            )}
          </span>
        ))}
      </nav>

      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between mb-8">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-primary/10 rounded-lg flex-shrink-0">
            <Icon className={`w-7 h-7 sm:w-8 sm:h-8 ${iconColor}`} />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold">{title}</h1>
              {badge && <Badge variant="secondary">{badge}</Badge>}
              {isNew && (
                <Badge className="bg-green-500/10 text-green-600 border-green-500/20">
                  New
                </Badge>
              )}
            </div>
            <p className="text-sm sm:text-base text-muted-foreground mt-1">{description}</p>
          </div>
        </div>
        {actions && <div className="flex gap-2 flex-shrink-0">{actions}</div>}
      </div>

      {children}
    </div>
  );
}
