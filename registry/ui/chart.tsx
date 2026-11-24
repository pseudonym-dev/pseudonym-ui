"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

const formatNumber = (value: number) => value.toLocaleString("en-US", { maximumFractionDigits: 2 });
const compact = new Intl.NumberFormat("en-US", { notation: "compact", maximumFractionDigits: 2 });

/** Axis ticks from 0 with a step of 1, 2, 2.5 or 5 times a power of ten, so the labels read well. */
function niceTicks(max: number, count = 5) {
  const raw = Math.max(max, Number.EPSILON) / count;
  const power = 10 ** Math.floor(Math.log10(raw));
  const step = ([1, 2, 2.5, 5, 10].find((n) => n * power >= raw) ?? 10) * power;
  const steps = Math.max(1, Math.ceil(max / step - 1e-9));
  return Array.from({ length: steps + 1 }, (_, i) => i * step);
}

type Series = { name: string; data: number[]; color: string; dashed?: boolean };

type ChartFrameProps = Omit<React.ComponentProps<"div">, "children"> & {
  "aria-label": string;
  series: Series[];
  /** One label per value. Turns on the axes and the hover tooltip. */
  labels?: string[];
  max?: number;
  format?: (value: number) => string;
  /** Where value `i` sits across the plot, from 0 to 1. */
  position: (i: number, count: number) => number;
  /** Which value a pointer at `ratio` (0 to 1) across the plot points at. */
  pick: (ratio: number, count: number) => number;
  children: (plot: { top: number; active: number | null }) => React.ReactNode;
};

/** Axes, grid lines, the tooltip and keyboard support shared by every chart. Children draw the data. */
function ChartFrame({
  "aria-label": label,
  series,
  labels,
  max,
  format = formatNumber,
  position,
  pick,
  children,
  className,
  ...props
}: ChartFrameProps) {
  const [active, setActive] = React.useState<number | null>(null);
  const count = series[0].data.length;
  const peak = max ?? Math.max(...series.flatMap((item) => item.data), 0);

  if (!labels || count === 0) {
    // Sparkline: no axes, no interaction, a little headroom above the peak.
    return (
      <div data-slot="chart" role="img" aria-label={label} className={cn("relative h-40 w-full", className)} {...props}>
        {children({ top: peak / 0.9 || 1, active: null })}
      </div>
    );
  }

  const ticks = niceTicks(peak || 1);
  const top = ticks.at(-1)!;
  const every = Math.ceil(count / 6);
  const move = (next: number) => setActive(Math.min(Math.max(next, 0), count - 1));
  const left = active === null ? 0 : position(active, count) * 100;
  const summary =
    active === null ? "" : `${labels[active]}: ${series.map((item) => `${item.name} ${format(item.data[active])}`).join(", ")}`;

  return (
    <div
      data-slot="chart"
      role="figure"
      aria-label={label}
      className={cn("grid h-40 w-full grid-cols-[auto_1fr] grid-rows-[minmax(0,1fr)_auto] gap-x-3 gap-y-2", className)}
      {...props}
    >
      <div aria-hidden className="relative text-right text-[11px] leading-none tabular-nums text-muted-foreground">
        <span className="invisible">{compact.format(top)}</span>
        {ticks.map((tick) => (
          <span key={tick} className="absolute right-0 -translate-y-1/2" style={{ top: `${100 - (tick / top) * 100}%` }}>
            {compact.format(tick)}
          </span>
        ))}
      </div>

      <div
        tabIndex={0}
        aria-label={`${label}. Use the arrow keys to read each value.`}
        className="relative rounded-sm outline-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
        onPointerMove={(event) => {
          const rect = event.currentTarget.getBoundingClientRect();
          move(pick(Math.min(Math.max((event.clientX - rect.left) / rect.width, 0), 0.9999), count));
        }}
        onPointerLeave={() => setActive(null)}
        onBlur={() => setActive(null)}
        onKeyDown={(event) => {
          const keys: Record<string, number> = { ArrowLeft: (active ?? count) - 1, ArrowRight: (active ?? -1) + 1, Home: 0, End: count - 1 };
          const next = keys[event.key];
          if (next === undefined) return;
          event.preventDefault();
          move(next);
        }}
      >
        {ticks.map((tick) => (
          <div
            key={tick}
            aria-hidden
            className={cn("absolute inset-x-0 border-t border-border", tick > 0 && "border-dashed")}
            style={{ top: `${100 - (tick / top) * 100}%` }}
          />
        ))}
        {children({ top, active })}
        {active === null ? null : (
          <div
            aria-hidden
            className={cn(
              "pointer-events-none absolute top-0 z-10 min-w-32 rounded-lg border border-border bg-popover px-2.5 py-2 text-xs text-popover-foreground shadow-md",
              left > 60 ? "-ml-3 -translate-x-full" : "ml-3",
            )}
            style={{ left: `${left}%` }}
          >
            <p className="mb-1.5 font-medium">{labels[active]}</p>
            {series.map((item) => (
              <p key={item.name} className="flex items-center gap-2 text-muted-foreground">
                <span className="size-2 rounded-[3px]" style={{ background: item.color }} />
                {item.name}
                <span className="ml-auto pl-3 font-semibold tabular-nums text-popover-foreground">{format(item.data[active])}</span>
              </p>
            ))}
          </div>
        )}
        <p aria-live="polite" className="sr-only">
          {summary}
        </p>
      </div>

      <div aria-hidden className="relative col-start-2 h-4 text-[11px] leading-4 whitespace-nowrap text-muted-foreground">
        {labels.map((text, i) => {
          if ((count - 1 - i) % every !== 0) return null;
          const x = position(i, count) * 100;
          return (
            <span
              key={i}
              className={cn("absolute", x === 0 ? "" : x === 100 ? "-translate-x-full" : "-translate-x-1/2")}
              style={{ left: `${x}%` }}
            >
              {text}
            </span>
          );
        })}
      </div>
    </div>
  );
}

type ChartProps = Omit<React.ComponentProps<"div">, "children"> & {
  "aria-label": string;
  data: number[];
  /** One label per value. Turns on the axes and the hover tooltip. */
  labels?: string[];
  /** Series name in the tooltip and legend. */
  name?: string;
  /** Any CSS color. */
  color?: string;
  max?: number;
  format?: (value: number) => string;
};

type AreaChartProps = ChartProps & {
  /** A second series drawn as a dashed line, such as the previous period. */
  compare?: number[];
  compareName?: string;
};

function AreaChart({
  data,
  compare,
  name = "Value",
  compareName = "Previous",
  color = "var(--chart-2)",
  ...props
}: AreaChartProps) {
  const id = React.useId();
  const series: Series[] = [{ name, data, color }];
  if (compare) series.push({ name: compareName, data: compare, color: "var(--chart-4)", dashed: true });

  return (
    <ChartFrame
      series={series}
      position={(i, count) => (count > 1 ? i / (count - 1) : 0)}
      pick={(ratio, count) => Math.round(ratio * (count - 1))}
      {...props}
    >
      {({ top, active }) => {
        const toPoints = (values: number[]) =>
          values.map((value, i) => [values.length > 1 ? (i / (values.length - 1)) * 100 : 0, 40 - (value / top) * 40] as const);
        const toLine = (values: number[]) => toPoints(values).map(([x, y], i) => `${i ? "L" : "M"}${x},${y}`).join(" ");
        const line = toLine(data);
        const point = active === null ? null : toPoints(data)[active];

        return (
          <>
            <svg viewBox="0 0 100 40" preserveAspectRatio="none" aria-hidden className="absolute inset-0 size-full overflow-visible">
              <defs>
                <linearGradient id={id} x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor={color} stopOpacity="0.24" />
                  <stop offset="100%" stopColor={color} stopOpacity="0" />
                </linearGradient>
              </defs>
              {compare ? (
                <path
                  d={toLine(compare)}
                  fill="none"
                  stroke="var(--chart-4)"
                  strokeWidth="1.5"
                  strokeDasharray="4 4"
                  strokeOpacity="0.6"
                  vectorEffect="non-scaling-stroke"
                />
              ) : null}
              <path d={`${line} L100,40 L0,40 Z`} fill={`url(#${id})`} />
              <path d={line} fill="none" stroke={color} strokeWidth="2" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
            </svg>
            {point ? (
              <>
                <div aria-hidden className="absolute inset-y-0 border-l border-foreground/25" style={{ left: `${point[0]}%` }} />
                <div
                  aria-hidden
                  className="absolute size-2.5 -translate-1/2 rounded-full border-2 border-background shadow-sm"
                  style={{ left: `${point[0]}%`, top: `${point[1] * 2.5}%`, background: color }}
                />
              </>
            ) : null}
          </>
        );
      }}
    </ChartFrame>
  );
}

function BarChart({ data, name = "Value", color = "var(--chart-1)", ...props }: ChartProps) {
  return (
    <ChartFrame
      series={[{ name, data, color }]}
      position={(i, count) => (i + 0.5) / count}
      pick={(ratio, count) => Math.floor(ratio * count)}
      {...props}
    >
      {({ top, active }) => (
        <div aria-hidden className="absolute inset-0 flex items-end">
          {data.map((value, i) => (
            <div key={i} className="flex h-full min-w-0 flex-1 items-end justify-center">
              <div
                className={cn(
                  "w-[64%] rounded-t-[5px] transition-[height,opacity] duration-300 ease-(--ease) motion-reduce:transition-none",
                  i !== (active ?? data.length - 1) && "opacity-45",
                )}
                style={{ height: `${(value / top) * 100}%`, background: color }}
              />
            </div>
          ))}
        </div>
      )}
    </ChartFrame>
  );
}

type LegendItem = { label: string; color: string; dashed?: boolean };

function ChartLegend({ items, className, ...props }: React.ComponentProps<"ul"> & { items: LegendItem[] }) {
  return (
    <ul data-slot="chart-legend" className={cn("flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground", className)} {...props}>
      {items.map((item) => (
        <li key={item.label} className="flex items-center gap-1.5">
          <span
            aria-hidden
            className="w-4 border-t-2"
            style={{ borderColor: item.color, borderTopStyle: item.dashed ? "dashed" : "solid" }}
          />
          {item.label}
        </li>
      ))}
    </ul>
  );
}

export { AreaChart, BarChart, ChartLegend };
