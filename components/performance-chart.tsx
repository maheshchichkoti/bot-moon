"use client";

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Card } from "@/components/ui/card";
<<<<<<< HEAD
=======
import { TooltipProvider } from "@/components/ui/tooltip";
>>>>>>> 38cbfb7 (Your commit message)

const data = [
  { month: "Jan", profit: 15 },
  { month: "Feb", profit: 28 },
  { month: "Mar", profit: 42 },
  { month: "Apr", profit: 38 },
  { month: "May", profit: 55 },
  { month: "Jun", profit: 67 },
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

export function PerformanceChart() {
  return (
<<<<<<< HEAD
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
            dataKey="month"
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
=======
    <TooltipProvider>
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
              dataKey="month"
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
    </TooltipProvider>
>>>>>>> 38cbfb7 (Your commit message)
  );
}