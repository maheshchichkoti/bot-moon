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
    <nav className={cn("py-2 px-4", className)}>
      <div className="flex justify-between items-center">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <Button
              key={item.id}
              variant={activeSection === item.id ? "default" : "ghost"}
              className="flex-col gap-1 h-auto py-2"
              onClick={() => onSectionChange(item.id)}
            >
              <Icon className="w-5 h-5" />
              <span className="text-xs">{item.label}</span>
            </Button>
          );
        })}
      </div>
    </nav>
  );
}