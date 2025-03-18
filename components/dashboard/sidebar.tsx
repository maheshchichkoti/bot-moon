"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  LayoutDashboard,
  History,
  Users,
  Settings,
  HelpCircle,
  ChevronLeft,
  ChevronRight,
  AlertOctagon,
} from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface DashboardSidebarProps {
  className?: string;
  isOpen: boolean;
  onToggle: () => void;
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const navItems = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "history", label: "Trade History", icon: History },
  { id: "referral", label: "Referral Program", icon: Users },
  { id: "settings", label: "Settings", icon: Settings },
  { id: "help", label: "Help & Support", icon: HelpCircle },
];

export function DashboardSidebar({
  className,
  isOpen,
  onToggle,
  activeSection,
  onSectionChange,
}: DashboardSidebarProps) {
  return (
    <aside
      className={cn(
        "fixed left-0 top-16 bottom-0 z-30 border-r bg-card/50 backdrop-blur transition-all duration-300",
        isOpen ? "w-64" : "w-16", // ✅ Ensure proper width toggling
        className
      )}
    >
      <div className="flex h-full flex-col justify-between p-3">
        <div className="space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Tooltip key={item.id}>
                <TooltipTrigger asChild>
                  <Button
                    variant={activeSection === item.id ? "default" : "ghost"}
                    className={cn(
                      "w-full flex items-center", // ✅ Ensure consistent alignment
                      isOpen ? "justify-start px-4" : "justify-center px-2" // ✅ Proper padding on collapse
                    )}
                    onClick={() => onSectionChange(item.id)}
                  >
                    <Icon className="w-5 h-5" />
                    {isOpen && <span className="ml-3">{item.label}</span>}
                  </Button>
                </TooltipTrigger>
                {!isOpen && (
                  <TooltipContent side="right">
                    <p>{item.label}</p>
                  </TooltipContent>
                )}
              </Tooltip>
            );
          })}
        </div>

        <div className="space-y-2">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="destructive"
                className={cn(
                  "w-full justify-start",
                  !isOpen && "justify-center"
                )}
              >
                <AlertOctagon className="w-5 h-5" />
                {isOpen && <span className="ml-3">Stop Bot</span>}
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Stop Trading Bot?</AlertDialogTitle>
                <AlertDialogDescription>
                  This will immediately stop all trading activities. Any open
                  positions will be closed according to your risk management
                  settings.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction>Stop Bot</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          <Button
            variant="outline"
            size="icon"
            className="w-full"
            onClick={onToggle}
          >
            {isOpen ? (
              <ChevronLeft className="w-4 h-4" />
            ) : (
              <ChevronRight className="w-4 h-4" />
            )}
          </Button>
        </div>
      </div>
    </aside>
  );
}
