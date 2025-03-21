"use client";

import { useState } from "react";
import { Navigation } from "@/components/navigation";
import { DashboardHeader } from "@/components/dashboard/header";
import { DashboardSidebar } from "@/components/dashboard/sidebar";
import { DashboardMobileNav } from "@/components/dashboard/mobile-nav";
import { DashboardOverview } from "@/components/dashboard/overview";
import { DashboardCharts } from "@/components/dashboard/charts";
import { RecentTrades } from "@/components/dashboard/recent-trades";
import { ReferralStats } from "@/components/dashboard/referral-stats";
import { DashboardSettings } from "@/components/dashboard/settings";
import { TooltipProvider } from "@/components/ui/tooltip"; // Import TooltipProvider
import { cn } from "@/lib/utils";

export default function DashboardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("overview");

  const renderSection = () => {
    switch (activeSection) {
      case "overview":
        return (
          <>
            <DashboardOverview />
            <DashboardCharts />
            <RecentTrades />
          </>
        );
      case "referral":
        return <ReferralStats />;
      case "settings":
        return <DashboardSettings />;
      default:
        return <DashboardOverview />;
    }
  };

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-background">
        <Navigation />

        <div className="flex">
          {/* Sidebar - Mobile & Desktop */}
          <DashboardSidebar
            className={cn(
              "fixed inset-y-0 left-0 z-50 w-64 bg-background transition-transform duration-300 lg:block",
              sidebarOpen ? "translate-x-0" : "-translate-x-full"
            )}
            isOpen={sidebarOpen}
            onToggle={() => setSidebarOpen(!sidebarOpen)}
            activeSection={activeSection}
            onSectionChange={setActiveSection}
          />

          {/* Main Content */}
          <main
            className={cn(
              "flex-1 min-h-[calc(100vh-4rem)] p-6 transition-all duration-300",
              sidebarOpen ? "lg:ml-64" : "lg:ml-20"
            )}
          >
            <DashboardHeader onMenuClick={() => setSidebarOpen(!sidebarOpen)} />

            <div className="mt-6 space-y-6">{renderSection()}</div>
          </main>
        </div>

        {/* Mobile Navigation */}
        <DashboardMobileNav
          className="lg:hidden fixed bottom-0 left-0 right-0 border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
          activeSection={activeSection}
          onSectionChange={setActiveSection}
        />
      </div>
    </TooltipProvider>
  );
}
