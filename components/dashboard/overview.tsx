"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, TrendingUp, Wallet, RefreshCw } from "lucide-react";
import { useState, useEffect } from "react";
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
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsLoading(false);
  };

  return (
    <div className="space-y-6">
      {/* Fee Balance Warning */}
      {feeBalance < 10 && (
        <Alert
          variant="destructive"
          className="bg-warning/10 border-warning/50"
        >
          <AlertCircle className="h-4 w-4 text-warning" />
          <AlertTitle>Low Fee Balance</AlertTitle>
          <AlertDescription className="flex items-center justify-between">
            <span>
              Your fee balance is running low. Recharge to ensure uninterrupted
              trading.
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={handleRecharge}
              disabled={isLoading}
              className="ml-4"
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

      {/* Metrics Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="p-6">
          <div className="flex flex-col space-y-2">
            <span className="text-sm text-muted-foreground">Total Profit</span>
            <span className="text-2xl font-bold text-accent">
              {formatCurrency(metrics.totalProfit, "USDT")}
            </span>
          </div>
          <div className="mt-4 flex items-center text-sm text-muted-foreground">
            <TrendingUp className="mr-1 h-4 w-4 text-accent" />
            <span>+{formatPercent(0.234)} this month</span>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex flex-col space-y-2">
            <span className="text-sm text-muted-foreground">
              Today's Profit
            </span>
            <span className="text-2xl font-bold text-accent">
              {formatCurrency(metrics.todayProfit, "USDT")}
            </span>
          </div>
          {/* <Progress value={76} max={100} className="mt-4" /> */}
          <span className="mt-2 text-xs text-muted-foreground">
            76% of daily target
          </span>
        </Card>

        <Card className="p-6">
          <div className="flex flex-col space-y-2">
            <span className="text-sm text-muted-foreground">Win Rate</span>
            <span className="text-2xl font-bold">
              {formatPercent(metrics.winRate / 100)}
            </span>
          </div>
          <div className="mt-4 flex items-center text-sm text-muted-foreground">
            <span>{metrics.tradesCount} total trades</span>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex flex-col space-y-2">
            <span className="text-sm text-muted-foreground">Fee Balance</span>
            <span className="text-2xl font-bold">
              {formatCurrency(feeBalance, "USDT")}
            </span>
          </div>
          <div className="mt-4 flex items-center text-sm text-muted-foreground">
            <Wallet className="mr-1 h-4 w-4" />
            <span>Covers ~{Math.floor(feeBalance / 0.5)} trades</span>
          </div>
        </Card>
      </div>
    </div>
  );
}
