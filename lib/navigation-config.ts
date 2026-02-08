import { toolCategories } from "@/lib/tool-registry";
import { BookOpen, Info } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface NavLink {
  type: "link";
  href: string;
  label: string;
  icon?: LucideIcon;
}

export interface NavDropdown {
  type: "dropdown";
  label: string;
  icon: LucideIcon;
  href: string;
  items: {
    href: string;
    label: string;
    icon: LucideIcon;
    description: string;
  }[];
}

export type NavEntry = NavLink | NavDropdown;

export const navigationConfig: NavEntry[] = [
  { type: "link", href: "/", label: "Home" },
  ...toolCategories.map(
    (category): NavDropdown => ({
      type: "dropdown",
      label: category.name,
      icon: category.icon,
      href: category.href,
      items: category.tools.map((tool) => ({
        href: tool.href,
        label: tool.name,
        icon: tool.icon,
        description: tool.shortDescription,
      })),
    })
  ),
  { type: "link", href: "/docs", label: "Docs", icon: BookOpen },
  { type: "link", href: "/about", label: "About", icon: Info },
];
