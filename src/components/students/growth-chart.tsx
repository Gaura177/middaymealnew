"use client";

import * as React from "react";
import { format } from "date-fns";
import {
  CartesianGrid,
  Line,
  LineChart,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartConfig, // Import ChartConfig
} from "@/components/ui/chart";
import { GrowthChartDataPoint } from "./types";

interface StudentGrowthChartProps {
  data: GrowthChartDataPoint[];
  className?: string;
}

// Define chart configuration with colors for each metric
const chartConfig = {
  weightKg: {
    label: "Weight (kg)",
    color: "hsl(var(--chart-1))",
  },
  heightCm: {
    label: "Height (cm)",
    color: "hsl(var(--chart-2))",
  },
  bmi: {
    label: "BMI",
    color: "hsl(var(--chart-3))",
  },
} satisfies ChartConfig; // Use satisfies for type checking

// Formatter for X-axis labels (MMM YYYY) - Accepts numeric timestamp (ms)
const formatTimestamp = (tick: number) => {
  try {
    // Check if tick is a valid number before creating Date
    if (typeof tick !== 'number' || isNaN(tick)) {
      return "Invalid Tick";
    }
    const date = new Date(tick);
    // Check if date object is valid
    if (isNaN(date.getTime())) {
      return "Invalid Date";
    }
    // Format as "1 April 2025"
    return format(date, "d MMMM yyyy");
  } catch (e) {
    console.error("Error formatting X-axis tick:", e);
    // Return the original tick value as fallback, converted to string if needed
    return String(tick);
  }
};

export function StudentGrowthChart({ data, className }: StudentGrowthChartProps) {
  if (!data || data.length === 0) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle>Growth Chart</CardTitle>
          <CardDescription>No growth data available.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] flex items-center justify-center text-muted-foreground">
            No data points to display.
          </div>
        </CardContent>
      </Card>
    );
  }

  // Prepare data with formatted timestamp for tooltip if needed,
  // or rely on tooltip formatter. Recharts usually handles Date objects well.
  const chartData = data.map(point => {
    const ts = point.timestamp;
    let ms: number;
    let dateLabel = "";
    if (typeof ts === "string") {
      ms = new Date(ts).getTime();
      dateLabel = format(new Date(ts), "d MMMM yyyy");
    } else if (typeof ts === "number") {
      ms = ts;
      dateLabel = format(new Date(ts), "d MMMM yyyy");
    } else {
      ms = NaN;
      dateLabel = "Invalid Date";
    }
    return {
      ...point,
      timestamp: ms,
      dateLabel,
    };
  });


  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Student Growth Chart</CardTitle>
        <CardDescription>Weight, Height, and BMI trends over time.</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px] w-full">
          {/* Use ResponsiveContainer for proper sizing */}
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={chartData}
              margin={{
                top: 5,
                right: 10,
                left: 10,
                bottom: 5,
              }}
            >
              <CartesianGrid vertical={false} strokeDasharray="3 3" />
              <XAxis
                dataKey="timestamp"
                tickFormatter={formatTimestamp}
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                // Consider adding interval or tickCount if labels overlap
              />
              {/* Define Y-Axis. May need multiple or adjustments based on value ranges */}
              <YAxis
                // Example: Y-axis primarily for weight/BMI range
                // Add more YAxis components if needed for height with different orientation/domain
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                // domain={['auto', 'auto']} // Adjust domain if needed
              />
              <ChartTooltip
                cursor={false}
                content={
                  <ChartTooltipContent
                    // Assuming 'label' passed by Recharts is the correct numeric timestamp (ms)
                    labelFormatter={(label: number) => {
                      try {
                        // Check if label is a valid number
                        if (typeof label !== 'number' || isNaN(label)) {
                          return "Invalid Date";
                        }
                        const date = new Date(label);
                        // Check if date object is valid
                        if (isNaN(date.getTime())) {
                          return "Invalid Date";
                        }
                        // Format as "1 April 2025"
                        return format(date, "d MMMM yyyy");
                      } catch (e) {
                        console.error("Error formatting tooltip label:", e);
                        return "Error"; // Fallback
                      }
                    }}
                    indicator="line"
                  />
                }
              />
              <Line
                dataKey="weightKg"
                type="natural"
                stroke="#3b82f6"
                strokeWidth={3}
                dot={false}
                activeDot={{ r: 6 }}
                name="Weight (kg)"
              />
              <Line
                dataKey="heightCm"
                type="natural"
                stroke="#22c55e"
                strokeWidth={3}
                dot={false}
                activeDot={{ r: 6 }}
                name="Height (cm)"
              />
              <Line
                dataKey="bmi"
                type="natural"
                stroke="#f59e42"
                strokeWidth={3}
                dot={false}
                activeDot={{ r: 6 }}
                name="BMI"
              />
              {/* Example of a second Y-axis if needed for height */}
              {/* <YAxis yAxisId="height" orientation="right" domain={['auto', 'auto']} /> */}
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}