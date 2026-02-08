"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Sparkles, Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/site-config";
import { navigationConfig, type NavDropdown, type NavLink } from "@/lib/navigation-config";

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(href + "/");
}

function isCategoryActive(pathname: string, dropdown: NavDropdown) {
  return (
    isActive(pathname, dropdown.href) ||
    dropdown.items.some((item) => isActive(pathname, item.href))
  );
}

function DesktopDropdown({ entry, pathname }: { entry: NavDropdown; pathname: string }) {
  const [open, setOpen] = useState(false);
  const active = isCategoryActive(pathname, entry);

  return (
    <div className="relative" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      <button
        className={cn(
          "flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-lg transition-colors",
          active
            ? "bg-primary/10 text-primary"
            : "text-muted-foreground hover:text-foreground hover:bg-muted"
        )}
        onClick={() => setOpen(!open)}
      >
        {entry.label}
        <ChevronDown className={cn("h-3.5 w-3.5 transition-transform", open && "rotate-180")} />
      </button>

      {open && (
        <div className="absolute top-full left-0 pt-1 z-50">
          <div className="bg-background border rounded-xl shadow-lg p-2 min-w-[280px] max-h-[70vh] overflow-y-auto">
            {/* Category header */}
            <Link
              href={entry.href}
              onClick={() => setOpen(false)}
              className="flex items-center gap-2 px-3 py-2 text-sm font-semibold text-foreground hover:bg-muted rounded-lg transition-colors mb-1"
            >
              <entry.icon className="h-4 w-4" />
              All {entry.label}
            </Link>
            <div className="h-px bg-border mx-2 mb-1" />
            {entry.items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "flex items-start gap-3 px-3 py-2.5 rounded-lg transition-colors",
                  isActive(pathname, item.href)
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                )}
              >
                <item.icon className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <div className="min-w-0">
                  <div className="text-sm font-medium text-foreground">{item.label}</div>
                  <div className="text-xs text-muted-foreground truncate">{item.description}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function MobileDropdown({
  entry,
  pathname,
  onNavigate,
}: {
  entry: NavDropdown;
  pathname: string;
  onNavigate: () => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const active = isCategoryActive(pathname, entry);

  return (
    <div>
      <button
        onClick={() => setExpanded(!expanded)}
        className={cn(
          "flex items-center justify-between w-full px-4 py-3 text-sm font-medium rounded-lg transition-colors",
          active
            ? "bg-primary/10 text-primary"
            : "text-muted-foreground hover:text-foreground hover:bg-muted"
        )}
      >
        <span className="flex items-center gap-2">
          <entry.icon className="h-4 w-4" />
          {entry.label}
        </span>
        <ChevronDown className={cn("h-4 w-4 transition-transform", expanded && "rotate-180")} />
      </button>
      {expanded && (
        <div className="ml-4 mt-1 space-y-0.5 border-l-2 border-muted pl-3">
          <Link
            href={entry.href}
            onClick={onNavigate}
            className="block px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground rounded-lg hover:bg-muted transition-colors"
          >
            View All
          </Link>
          {entry.items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNavigate}
              className={cn(
                "flex items-center gap-2 px-3 py-2 text-sm rounded-lg transition-colors",
                isActive(pathname, item.href)
                  ? "bg-primary/10 text-primary font-medium"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              )}
            >
              <item.icon className="h-3.5 w-3.5" />
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export function Navigation() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const closeMobile = () => setMobileMenuOpen(false);

  return (
    <nav className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="p-1.5 rounded-lg bg-gradient-to-br from-primary to-purple-500 group-hover:scale-110 transition-transform">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <span className="font-bold text-xl bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">
              {siteConfig.name}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navigationConfig.map((entry, i) =>
              entry.type === "link" ? (
                <Link
                  key={entry.href}
                  href={entry.href}
                  className={cn(
                    "px-3 py-2 text-sm font-medium rounded-lg transition-colors",
                    isActive(pathname, entry.href)
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  )}
                >
                  {entry.label}
                </Link>
              ) : (
                <DesktopDropdown key={i} entry={entry} pathname={pathname} />
              )
            )}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t py-4 space-y-1 max-h-[calc(100vh-4rem)] overflow-y-auto">
            {navigationConfig.map((entry, i) =>
              entry.type === "link" ? (
                <Link
                  key={entry.href}
                  href={entry.href}
                  onClick={closeMobile}
                  className={cn(
                    "block px-4 py-3 text-sm font-medium rounded-lg transition-colors",
                    isActive(pathname, entry.href)
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  )}
                >
                  {entry.label}
                </Link>
              ) : (
                <MobileDropdown key={i} entry={entry} pathname={pathname} onNavigate={closeMobile} />
              )
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
