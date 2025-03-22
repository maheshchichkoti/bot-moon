"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip as RechartsTooltip,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import { formatCurrency } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TooltipProvider } from "@/components/ui/tooltip";

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

  const generateChartData = useCallback((tf: Timeframe): ChartData[] => {
    const now = Date.now();
    const points = tf === "1H" ? 60 : tf === "24H" ? 24 : tf === "7D" ? 7 : 30;
    const interval =
      tf === "1H" ? 60 * 1000 : tf === "24H" ? 3600 * 1000 : 24 * 3600 * 1000;

    return Array.from({ length: points }, (_, i) => ({
      timestamp: now - (points - 1 - i) * interval,
      value: 10000 + Math.random() * 5000,
    }));
  }, []);

  useEffect(() => {
    setChartData(generateChartData(timeframe));
  }, [timeframe, generateChartData]);

  const formatXAxis = useCallback(
    (timestamp: number) => {
      const date = new Date(timestamp);
      if (timeframe === "1H" || timeframe === "24H") {
        return date.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });
      }
      return date.toLocaleDateString([], {
        month: "short",
        day: "numeric",
      });
    },
    [timeframe]
  );

  const CustomTooltip = useCallback(({ active, payload }: any) => {
    if (!active || !payload?.length) return null;

    const data = payload[0]?.payload;

    return (
      <Card className="p-3 bg-background/95 backdrop-blur-sm shadow-md rounded-md">
        <p className="text-sm font-medium">
          {new Date(data.timestamp).toLocaleString()}
        </p>
        <p className="text-sm text-accent">
          {formatCurrency(data.value, "USDT")}
        </p>
      </Card>
    );
  }, []);

  const chartHeight = useMemo(() => (isZoomed ? 600 : 400), [isZoomed]);

  return (
    <TooltipProvider>
      <Card className="p-6 space-y-6 w-full overflow-hidden">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h3 className="text-lg font-semibold">Performance Chart</h3>
          <div className="flex flex-wrap gap-2">
            {timeframes.map((tf) => (
              <Button
                key={tf}
                variant={tf === timeframe ? "default" : "outline"}
                size="sm"
                onClick={() => setTimeframe(tf)}
                aria-label={`Switch to ${tf} view`}
                className="sm:min-w-[60px]"
              >
                {tf}
              </Button>
            ))}
          </div>
        </div>

        {/* Chart */}
        <div
          className="transition-all duration-300 ease-in-out rounded-md"
          style={{ height: `${chartHeight}px` }}
          onDoubleClick={() => setIsZoomed((prev) => !prev)}
          role="img"
          aria-label="Trading performance line chart"
        >
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={chartData}
              margin={{ top: 10, right: 30, left: 10, bottom: 5 }}
            >
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
              <RechartsTooltip
                content={<CustomTooltip />}
                cursor={{ stroke: "hsl(var(--muted))" }}
              />
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
      </Card>
    </TooltipProvider>
  );
}
