"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TooltipProvider } from "@/components/ui/tooltip";
import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip as RechartsTooltip,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import { useState, useEffect, useCallback, useMemo } from "react";
import { formatCurrency } from "@/lib/utils";

const timeframes = ["1H", "24H", "7D", "30D", "ALL"] as const;
type Timeframe = (typeof timeframes)[number];

interface ChartData {
  timestamp: number;
  value: number;
}

export function DashboardCharts() {
  const [timeframe, setTimeframe] = useState<Timeframe>("24H");
  const [chartData, setChartData] = useState<ChartData[]>([]);
  const [isZoomed, setIsZoomed] = useState(false);

  const generateChartData = useCallback((timeframe: Timeframe) => {
    const now = Date.now();
    const points =
      timeframe === "1H"
        ? 60
        : timeframe === "24H"
        ? 24
        : timeframe === "7D"
        ? 7
        : 30;
    const interval =
      timeframe === "1H"
        ? 60 * 1000
        : timeframe === "24H"
        ? 3600 * 1000
        : 24 * 3600 * 1000;

    return Array.from({ length: points }, (_, i) => ({
      timestamp: now - (points - 1 - i) * interval,
      value: 10000 + Math.random() * 5000,
    }));
  }, []);

  useEffect(() => {
    setChartData(generateChartData(timeframe));
  }, [timeframe, generateChartData]);

  const formatXAxis = (timestamp: number) => {
    const date = new Date(timestamp);
    switch (timeframe) {
      case "1H":
      case "24H":
        return date.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });
      case "7D":
      case "30D":
        return date.toLocaleDateString([], { month: "short", day: "numeric" });
      default:
        return date.toLocaleDateString();
    }
  };

  const CustomTooltip = ({ active, payload }: any) => {
    if (!active || !payload?.length) return null;

    return (
      <TooltipProvider>
        <Card className="p-3 bg-background/95 backdrop-blur-sm shadow-md rounded-md">
          <p className="text-sm font-medium">
            {new Date(payload[0].payload.timestamp).toLocaleString()}
          </p>
          <p className="text-sm text-accent">
            {formatCurrency(payload[0].value, "USDT")}
          </p>
        </Card>
      </TooltipProvider>
    );
  };

  const chartHeight = useMemo(() => (isZoomed ? 600 : 400), [isZoomed]);

  return (
    <TooltipProvider>
      <Card className="p-6">
        <div className="flex flex-col space-y-4">
          {/* Header Section */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <h3 className="text-lg font-semibold">Performance Chart</h3>
            <div className="flex flex-wrap items-center gap-2">
              {timeframes.map((tf) => (
                <Button
                  key={tf}
                  variant={timeframe === tf ? "default" : "outline"}
                  size="sm"
                  onClick={() => setTimeframe(tf)}
                  className="flex-1 sm:flex-none"
                >
                  {tf}
                </Button>
              ))}
            </div>
          </div>

          {/* Chart Section */}
          <div
            className="transition-all duration-300 ease-in-out"
            style={{ height: `${chartHeight}px` }}
            onDoubleClick={() => setIsZoomed(!isZoomed)}
          >
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={chartData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                {/* Gradient for the line */}
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="5%"
                      stopColor="hsl(var(--primary))"
                      stopOpacity={0.8}
                    />
                    <stop
                      offset="95%"
                      stopColor="hsl(var(--primary))"
                      stopOpacity={0}
                    />
                  </linearGradient>
                </defs>

                {/* Grid & Axes */}
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="hsl(var(--muted))"
                  vertical={false}
                />
                <XAxis
                  dataKey="timestamp"
                  tickFormatter={formatXAxis}
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  padding={{ left: 10, right: 10 }}
                  minTickGap={30}
                />
                <YAxis
                  tickFormatter={(value) => `$${value.toLocaleString()}`}
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  width={80}
                />

                {/* Tooltip (Fixed Usage) */}
                <RechartsTooltip
                  content={<CustomTooltip />}
                  cursor={{ stroke: "hsl(var(--muted))" }}
                />

                {/* Line */}
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="hsl(var(--primary))"
                  strokeWidth={2}
                  dot={false}
                  activeDot={{
                    r: 4,
                    stroke: "hsl(var(--primary))",
                    strokeWidth: 2,
                  }}
                  fill="url(#colorValue)"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </Card>
    </TooltipProvider>
  );
}
