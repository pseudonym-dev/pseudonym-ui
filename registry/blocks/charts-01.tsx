"use client";

import { TrendingUp } from "lucide-react";
import { useState } from "react";

import { Card } from "@/components/ui/card";
import { AreaChart, BarChart, ChartLegend } from "@/components/ui/chart";
import { Select, SelectItem, SelectPopup, SelectTrigger, SelectValue } from "@/components/ui/select";

const ranges = [
  { label: "Last 12 weeks", value: "12w" },
  { label: "Last 12 months", value: "12m" },
];

const visitors = {
  "12w": [420, 510, 480, 620, 590, 710, 680, 790, 860, 820, 940, 1020],
  "12m": [2100, 2400, 2250, 2900, 3100, 2950, 3400, 3800, 3650, 4100, 4500, 4820],
};

const formats = [
  { label: "PNG", value: 46 },
  { label: "GIF", value: 27 },
  { label: "MP4", value: 18 },
  { label: "Text", value: 9 },
];

const days = ["M", "T", "W", "T", "F", "S", "S"];

function Ring({ value, label }: { value: number; label: string }) {
  const circumference = 2 * Math.PI * 15.9;
  return (
    <div className="relative grid size-36 place-items-center">
      <svg viewBox="0 0 36 36" className="absolute inset-0 -rotate-90" role="img" aria-label={`${label}: ${value}%`}>
        <circle cx="18" cy="18" r="15.9" fill="none" stroke="var(--border)" strokeWidth="3.2" />
        <circle
          cx="18"
          cy="18"
          r="15.9"
          fill="none"
          stroke="var(--chart-2)"
          strokeWidth="3.2"
          strokeLinecap="round"
          strokeDasharray={`${(value / 100) * circumference} ${circumference}`}
        />
      </svg>
      <div className="text-center">
        <p className="text-2xl font-semibold tabular-nums">{value}%</p>
        <p className="text-xs text-muted-foreground">{label}</p>
      </div>
    </div>
  );
}

export default function Charts01() {
  const [range, setRange] = useState<keyof typeof visitors>("12w");
  const data = visitors[range];
  const growth = Math.round((data.at(-1)! / data[0] - 1) * 100);

  return (
    <section className="bg-muted/40 p-6 text-foreground">
      <div className="mx-auto grid max-w-6xl gap-4 lg:grid-cols-3">
        <Card className="gap-4 p-5 lg:col-span-2">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="text-sm text-muted-foreground">Studio visitors</p>
              <p className="mt-1 flex items-center gap-2 text-3xl font-semibold tracking-tight tabular-nums">
                {data.at(-1)!.toLocaleString("en-US")}
                <span className="inline-flex items-center gap-1 rounded-full bg-primary/20 px-2 py-0.5 text-xs font-semibold text-brand-text">
                  <TrendingUp className="size-3.5" />+{growth}%
                </span>
              </p>
            </div>
            <Select value={range} onValueChange={(value) => setRange(value as keyof typeof visitors)} items={ranges}>
              <SelectTrigger aria-label="Range" className="h-9 w-44 text-sm">
                <SelectValue />
              </SelectTrigger>
              <SelectPopup>
                {ranges.map((item) => (
                  <SelectItem key={item.value} value={item.value}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectPopup>
            </Select>
          </div>
          <AreaChart data={data} aria-label="Studio visitors" className="h-56" />
          <ChartLegend>
            <span>{range === "12w" ? "Sep 1" : "Dec 2025"}</span>
            <span>{range === "12w" ? "Nov 24" : "Nov 2026"}</span>
          </ChartLegend>
        </Card>

        <Card className="items-center justify-center gap-4 p-5">
          <p className="self-start text-sm text-muted-foreground">Render quota</p>
          <Ring value={72} label="of 500 min" />
          <p className="text-center text-xs text-muted-foreground">Resets in 6 days</p>
        </Card>

        <Card className="gap-4 p-5">
          <p className="text-sm text-muted-foreground">Exports this week</p>
          <BarChart data={[38, 52, 47, 61, 74, 33, 29]} aria-label="Exports per day" className="h-36" />
          <ChartLegend>
            {days.map((day, i) => (
              <span key={i} className="w-full text-center">
                {day}
              </span>
            ))}
          </ChartLegend>
        </Card>

        <Card className="gap-4 p-5">
          <p className="text-sm text-muted-foreground">Formats</p>
          <ul className="flex flex-col gap-3">
            {formats.map((format) => (
              <li key={format.label} className="grid grid-cols-[48px_1fr_40px] items-center gap-3 text-sm">
                <span className="font-medium">{format.label}</span>
                <span className="h-2 overflow-hidden rounded-full bg-border">
                  <span className="block h-full rounded-full bg-(--chart-2)" style={{ width: `${format.value}%` }} />
                </span>
                <span className="text-right tabular-nums text-muted-foreground">{format.value}%</span>
              </li>
            ))}
          </ul>
        </Card>

        <Card className="gap-3 p-5">
          <p className="text-sm text-muted-foreground">Average export time</p>
          <p className="text-3xl font-semibold tracking-tight tabular-nums">
            1.8<span className="text-lg text-muted-foreground"> s</span>
          </p>
          <AreaChart data={[3.1, 2.9, 2.6, 2.7, 2.3, 2.1, 2, 1.9, 1.8]} aria-label="Average export time" className="mt-auto h-16 text-muted-foreground" />
          <p className="text-xs text-muted-foreground">Down 42% since the WebCodecs encoder.</p>
        </Card>
      </div>
    </section>
  );
}
