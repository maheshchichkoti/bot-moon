"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, TrendingUp, Wallet, RefreshCw } from "lucide-react";
import { formatCurrency, formatPercent } from "@/lib/utils";

export function DashboardOverview() {
  const [feeBalance, setFeeBalance] = useState(8.5);
  const [isLoading, setIsLoading] = useState(false);

  const metrics = {
    totalProfit: 2845.32,
    todayProfit: 142.18,
    winRate: 76.4,
    tradesCount: 324,
    activePositions: 3,
  };

  const handleRecharge = async () => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsLoading(false);
  };

  return (
    <div className="space-y-6">
      {/* Low Fee Balance Alert */}
      {feeBalance < 10 && (
        <Alert
          variant="destructive"
          className="bg-warning/10 border-warning/50"
        >
          <AlertCircle className="h-4 w-4 text-warning" />
          <AlertTitle>Low Fee Balance</AlertTitle>
          <AlertDescription className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mt-1">
            <span>
              Your fee balance is running low. Recharge to avoid interruptions.
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={handleRecharge}
              disabled={isLoading}
              aria-label="Recharge fee balance"
            >
              {isLoading ? (
                <>
                  <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                  Recharging...
                </>
              ) : (
                "Recharge Now"
              )}
            </Button>
          </AlertDescription>
        </Alert>
      )}

      {/* Overview Metrics Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* Total Profit */}
        <Card className="p-5 space-y-3">
          <div className="flex flex-col">
            <span className="text-sm text-muted-foreground">Total Profit</span>
            <span className="text-2xl font-bold text-accent">
              {formatCurrency(metrics.totalProfit, "USDT")}
            </span>
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <TrendingUp className="mr-1 h-4 w-4 text-accent" />
            <span>+{formatPercent(0.234)} this month</span>
          </div>
        </Card>

        {/* Today's Profit */}
        <Card className="p-5 space-y-3">
          <div className="flex flex-col">
            <span className="text-sm text-muted-foreground">
              Today's Profit
            </span>
            <span className="text-2xl font-bold text-accent">
              {formatCurrency(metrics.todayProfit, "USDT")}
            </span>
          </div>
          <div className="text-xs text-muted-foreground mt-2">
            76% of daily target
          </div>
        </Card>

        {/* Win Rate */}
        <Card className="p-5 space-y-3">
          <div className="flex flex-col">
            <span className="text-sm text-muted-foreground">Win Rate</span>
            <span className="text-2xl font-bold">
              {formatPercent(metrics.winRate / 100)}
            </span>
          </div>
          <div className="text-sm text-muted-foreground mt-2">
            {metrics.tradesCount} total trades
          </div>
        </Card>

        {/* Fee Balance */}
        <Card className="p-5 space-y-3">
          <div className="flex flex-col">
            <span className="text-sm text-muted-foreground">Fee Balance</span>
            <span className="text-2xl font-bold">
              {formatCurrency(feeBalance, "USDT")}
            </span>
          </div>
          <div className="flex items-center text-sm text-muted-foreground mt-2">
            <Wallet className="mr-1 h-4 w-4" />
            <span>~{Math.floor(feeBalance / 0.5)} trades remaining</span>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default DashboardOverview;
