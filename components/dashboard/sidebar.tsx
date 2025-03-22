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
        "fixed top-16 bottom-0 left-0 z-40 border-r bg-card/50 backdrop-blur-lg transition-all duration-300",
        isOpen ? "w-64" : "w-16",
        className
      )}
      role="complementary"
      aria-label="Dashboard sidebar"
    >
      <div className="flex h-full flex-col justify-between p-3">
        {/* Navigation */}
        <nav className="space-y-2" aria-label="Main navigation">
          {navItems.map(({ id, label, icon: Icon }) => (
            <Tooltip key={id}>
              <TooltipTrigger asChild>
                <Button
                  variant={activeSection === id ? "default" : "ghost"}
                  className={cn(
                    "w-full flex items-center text-sm",
                    isOpen ? "justify-start px-4" : "justify-center px-2"
                  )}
                  onClick={() => onSectionChange(id)}
                  aria-label={`Go to ${label}`}
                  aria-current={activeSection === id ? "page" : undefined}
                >
                  <Icon className="w-5 h-5" />
                  {isOpen && <span className="ml-3">{label}</span>}
                </Button>
              </TooltipTrigger>
              {!isOpen && (
                <TooltipContent side="right">
                  <p>{label}</p>
                </TooltipContent>
              )}
            </Tooltip>
          ))}
        </nav>

        {/* Footer: Danger Action + Toggle */}
        <div className="space-y-2">
          {/* Stop Bot Button */}
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="destructive"
                className={cn(
                  "w-full flex items-center",
                  isOpen ? "justify-start px-4" : "justify-center px-2"
                )}
                aria-label="Stop trading bot"
              >
                <AlertOctagon className="w-5 h-5" />
                {isOpen && <span className="ml-3">Stop Bot</span>}
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Stop Trading Bot?</AlertDialogTitle>
                <AlertDialogDescription>
                  This will immediately stop all trading activities and close
                  open positions based on your risk settings.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction>Stop Bot</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          {/* Toggle Collapse/Expand */}
          <Button
            variant="outline"
            size="icon"
            className="w-full"
            onClick={onToggle}
            aria-label={isOpen ? "Collapse sidebar" : "Expand sidebar"}
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
