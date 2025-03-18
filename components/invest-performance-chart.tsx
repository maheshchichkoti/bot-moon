"use client";

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Card } from "@/components/ui/card";
<<<<<<< HEAD
import { useState } from "react";
import { Button } from "@/components/ui/button";
=======
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { TooltipProvider } from "@/components/ui/tooltip";
>>>>>>> 38cbfb7 (Your commit message)

const monthlyData = [
  { month: "Jan", profit: 15 },
  { month: "Feb", profit: 28 },
  { month: "Mar", profit: 42 },
  { month: "Apr", profit: 38 },
  { month: "May", profit: 55 },
  { month: "Jun", profit: 67 },
];

const weeklyData = [
  { week: "W1", profit: 12 },
  { week: "W2", profit: 18 },
  { week: "W3", profit: 25 },
  { week: "W4", profit: 22 },
];

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    value: number;
  }>;
}

function CustomTooltip({ active, payload }: CustomTooltipProps) {
  if (!active || !payload?.length) {
    return null;
  }

  return (
    <Card className="p-2">
      <p className="text-sm">{`Profit: ${payload[0].value}%`}</p>
    </Card>
  );
}

export function InvestPerformanceChart() {
  const [timeframe, setTimeframe] = useState<"monthly" | "weekly">("monthly");
  const data = timeframe === "monthly" ? monthlyData : weeklyData;

  return (
<<<<<<< HEAD
    <div>
      <div className="flex gap-2 mb-4">
        <Button
          variant={timeframe === "weekly" ? "default" : "outline"}
          onClick={() => setTimeframe("weekly")}
          size="sm"
        >
          Weekly
        </Button>
        <Button
          variant={timeframe === "monthly" ? "default" : "outline"}
          onClick={() => setTimeframe("monthly")}
          size="sm"
        >
          Monthly
        </Button>
      </div>
      <div className="h-[400px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <defs>
              <linearGradient id="profitGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0.2}/>
              </linearGradient>
            </defs>
            <XAxis
              dataKey={timeframe === "monthly" ? "month" : "week"}
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              padding={{ left: 10, right: 10 }}
              tick={{ fill: "hsl(var(--muted-foreground))" }}
              height={60}
              tickMargin={12}
              scale="auto"
            />
            <YAxis
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `${value}%`}
              tick={{ fill: "hsl(var(--muted-foreground))" }}
              width={60}
              scale="auto"
            />
            <Tooltip content={<CustomTooltip />} />
            <Line
              type="monotone"
              dataKey="profit"
              stroke="hsl(var(--primary))"
              strokeWidth={2}
              dot={false}
              fill="url(#profitGradient)"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
=======
    <TooltipProvider>
      <div>
        <div className="flex gap-2 mb-4">
          <Button
            variant={timeframe === "weekly" ? "default" : "outline"}
            onClick={() => setTimeframe("weekly")}
            size="sm"
          >
            Weekly
          </Button>
          <Button
            variant={timeframe === "monthly" ? "default" : "outline"}
            onClick={() => setTimeframe("monthly")}
            size="sm"
          >
            Monthly
          </Button>
        </div>
        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <defs>
                <linearGradient id="profitGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0.2}/>
                </linearGradient>
              </defs>
              <XAxis
                dataKey={timeframe === "monthly" ? "month" : "week"}
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                padding={{ left: 10, right: 10 }}
                tick={{ fill: "hsl(var(--muted-foreground))" }}
                height={60}
                tickMargin={12}
                scale="auto"
              />
              <YAxis
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `${value}%`}
                tick={{ fill: "hsl(var(--muted-foreground))" }}
                width={60}
                scale="auto"
              />
              <Tooltip content={<CustomTooltip />} />
              <Line
                type="monotone"
                dataKey="profit"
                stroke="hsl(var(--primary))"
                strokeWidth={2}
                dot={false}
                fill="url(#profitGradient)"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </TooltipProvider>
>>>>>>> 38cbfb7 (Your commit message)
  );
}