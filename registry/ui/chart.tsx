import * as React from "react";

import { cn } from "@/lib/utils";

/** Maps values to points in a 100 x 40 box, the viewBox every chart below draws in. */
function toPoints(data: number[], max = Math.max(...data, 1)) {
  const step = data.length > 1 ? 100 / (data.length - 1) : 0;
  return data.map((value, i) => [i * step, 40 - (value / max) * 36] as const);
}

type ChartProps = React.ComponentProps<"svg"> & { data: number[]; max?: number };

function AreaChart({ data, max, className, ...props }: ChartProps) {
  const id = React.useId();
  const points = toPoints(data, max);
  const line = points.map(([x, y], i) => `${i ? "L" : "M"}${x},${y}`).join(" ");

  return (
    <svg
      data-slot="area-chart"
      viewBox="0 0 100 40"
      preserveAspectRatio="none"
      role="img"
      className={cn("h-40 w-full overflow-visible text-(--chart-2)", className)}
      {...props}
    >
      <defs>
        <linearGradient id={id} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="currentColor" stopOpacity="0.28" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
        </linearGradient>
      </defs>
      {[10, 20, 30].map((y) => (
        <line key={y} x1="0" x2="100" y1={y} y2={y} stroke="var(--border)" strokeDasharray="1 1.5" vectorEffect="non-scaling-stroke" />
      ))}
      <path d={`${line} L100,40 L0,40 Z`} fill={`url(#${id})`} />
      <path d={line} fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
    </svg>
  );
}

function BarChart({ data, max, className, ...props }: ChartProps) {
  const top = max ?? Math.max(...data, 1);
  const width = 100 / data.length;

  return (
    <svg
      data-slot="bar-chart"
      viewBox="0 0 100 40"
      preserveAspectRatio="none"
      role="img"
      className={cn("h-40 w-full text-(--chart-1)", className)}
      {...props}
    >
      {data.map((value, i) => {
        const height = (value / top) * 40;
        return (
          <rect
            key={i}
            x={i * width + width * 0.18}
            y={40 - height}
            width={width * 0.64}
            height={height}
            rx="0.8"
            fill="currentColor"
            opacity={i === data.length - 1 ? 1 : 0.55}
          />
        );
      })}
    </svg>
  );
}

function ChartLegend({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="chart-legend"
      className={cn("flex justify-between text-xs tabular-nums text-muted-foreground", className)}
      {...props}
    />
  );
}

export { AreaChart, BarChart, ChartLegend };
