"use client";

import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { UserNav } from "@/components/dashboard/user-nav";
import { NotificationsPopover } from "@/components/dashboard/notifications";

interface DashboardHeaderProps {
  onMenuClick: () => void;
}

export function DashboardHeader({ onMenuClick }: DashboardHeaderProps) {
  return (
    <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between px-1 py-2">
      {/* Left: Title + Menu */}
      <div className="flex items-center gap-4">
        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden"
          onClick={onMenuClick}
          aria-label="Toggle sidebar menu"
        >
          <Menu className="w-5 h-5" />
        </Button>

        {/* Title */}
        <div className="flex flex-col">
          <h1 className="text-2xl font-bold leading-tight font-heading">
            Trading Dashboard
          </h1>
          <p className="text-sm text-muted-foreground">
            Welcome back, let's check your trading performance
          </p>
        </div>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-3">
        <NotificationsPopover />
        <UserNav />
      </div>
    </header>
  );
}
