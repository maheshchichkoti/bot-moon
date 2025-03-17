"use client";

import { Button } from "@/components/ui/button";
import { Menu, Bell, Settings } from "lucide-react";
import { UserNav } from "@/components/dashboard/user-nav";
import { NotificationsPopover } from "@/components/dashboard/notifications";

interface DashboardHeaderProps {
  onMenuClick: () => void;
}

export function DashboardHeader({ onMenuClick }: DashboardHeaderProps) {
  return (
    <header className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden"
          onClick={onMenuClick}
        >
          <Menu className="w-5 h-5" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold font-heading">Trading Dashboard</h1>
          <p className="text-sm text-muted-foreground">
            Welcome back, let's check your trading performance
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <NotificationsPopover />
        <UserNav />
      </div>
    </header>
  );
}