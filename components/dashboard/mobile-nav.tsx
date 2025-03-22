"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  History,
  Users,
  Settings,
  HelpCircle,
} from "lucide-react";

interface DashboardMobileNavProps {
  className?: string;
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const navItems = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "history", label: "History", icon: History },
  { id: "referral", label: "Referral", icon: Users },
  { id: "settings", label: "Settings", icon: Settings },
  { id: "help", label: "Help", icon: HelpCircle },
];

export function DashboardMobileNav({
  className,
  activeSection,
  onSectionChange,
}: DashboardMobileNavProps) {
  return (
    <nav
      className={cn(
        "w-full px-4 py-2 bg-background border-t flex justify-between items-center",
        className
      )}
      role="navigation"
      aria-label="Mobile dashboard navigation"
    >
      {navItems.map(({ id, label, icon: Icon }) => (
        <Button
          key={id}
          variant={activeSection === id ? "default" : "ghost"}
          className={cn(
            "flex flex-col items-center gap-1 h-auto px-2 py-2 flex-1",
            activeSection === id && "bg-muted"
          )}
          onClick={() => onSectionChange(id)}
          aria-current={activeSection === id ? "page" : undefined}
          aria-label={`Go to ${label}`}
        >
          <Icon className="w-5 h-5" />
          <span className="text-[10px] font-medium leading-none">{label}</span>
        </Button>
      ))}
    </nav>
  );
}
