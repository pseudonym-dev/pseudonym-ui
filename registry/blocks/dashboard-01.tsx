"use client";

import { ArrowUpRight, Bell, CircleCheck, Film, FolderOpen, LayoutDashboard, Search, Settings, Users } from "lucide-react";
import { useEffect, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { AreaChart, BarChart, ChartLegend } from "@/components/ui/chart";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsList, TabsTab } from "@/components/ui/tabs";
import { TopBarBrandMark } from "@/components/ui/top-bar";
import { cn } from "@/lib/utils";

const nav = [
  { label: "Overview", icon: LayoutDashboard, active: true },
  { label: "Projects", icon: FolderOpen },
  { label: "Renders", icon: Film },
  { label: "Team", icon: Users },
  { label: "Settings", icon: Settings },
];

const stats = [
  { label: "Exports", value: "12,480", delta: "+18%", trend: [4, 6, 5, 8, 7, 9, 12] },
  { label: "Render minutes", value: "3,912", delta: "+6%", trend: [7, 6, 8, 7, 9, 8, 10] },
  { label: "Active creators", value: "842", delta: "+12%", trend: [3, 4, 4, 6, 5, 7, 8] },
  { label: "Avg. export time", value: "1.8 s", delta: "−0.4 s", trend: [9, 8, 8, 6, 6, 5, 4] },
];

/** Short dates for the last `count` days, ending on Nov 24. */
const lastDays = (count: number) =>
  Array.from({ length: count }, (_, i) =>
    new Date(Date.UTC(2026, 10, 24 - (count - 1 - i))).toLocaleDateString("en-US", { month: "short", day: "numeric", timeZone: "UTC" }),
  );

const series = {
  "7d": { labels: lastDays(7), current: [32, 41, 38, 52, 49, 63, 71], previous: [28, 30, 35, 33, 41, 44, 47] },
  "30d": {
    labels: lastDays(30),
    current: [18, 22, 20, 27, 31, 29, 35, 33, 40, 38, 45, 43, 49, 52, 48, 55, 60, 58, 63, 61, 66, 70, 68, 74, 72, 79, 83, 80, 86, 91],
    previous: [15, 17, 19, 18, 22, 25, 24, 27, 26, 30, 31, 29, 33, 36, 35, 37, 40, 39, 43, 45, 44, 47, 49, 48, 52, 55, 54, 57, 59, 62],
  },
};

const hours = Array.from({ length: 12 }, (_, i) => `${String(8 + i).padStart(2, "0")}:00`);

const exports = [
  { name: "toucan-profile.mp4", format: "MP4", progress: 100 },
  { name: "macaw-closeup.gif", format: "GIF", progress: 72 },
  { name: "chameleon.png", format: "PNG", progress: 100 },
  { name: "launch-trailer.mp4", format: "MP4", progress: 34 },
];

const filters = {
  all: () => true,
  running: (item: (typeof exports)[number]) => item.progress < 100,
  failed: () => false,
};

export default function Dashboard01() {
  const [range, setRange] = useState<keyof typeof series>("30d");
  const [filter, setFilter] = useState<keyof typeof filters>("all");
  const [loading, setLoading] = useState(false);
  const visible = exports.filter(filters[filter]);

  // Stands in for a request: show skeleton rows briefly whenever the filter changes.
  useEffect(() => {
    if (!loading) return;
    const id = window.setTimeout(() => setLoading(false), 700);
    return () => window.clearTimeout(id);
  }, [loading]);

  return (
    <div className="flex min-h-svh bg-muted/40 text-foreground">
      <aside className="hidden w-60 shrink-0 flex-col border-r border-border bg-background md:flex">
        <div className="flex h-15 items-center gap-2.5 px-5 font-semibold">
          <TopBarBrandMark>P_</TopBarBrandMark>
          Pseudonym
        </div>
        <nav className="flex flex-col gap-0.5 px-3 py-2">
          {nav.map(({ label, icon: Icon, active }) => (
            <a
              key={label}
              href="#"
              aria-current={active ? "page" : undefined}
              className={cn(
                "flex h-9 items-center gap-2.5 rounded-lg px-2.5 text-sm font-medium text-muted-foreground transition-colors duration-150 hover:bg-accent hover:text-foreground active:bg-accent/70",
                active && "bg-accent text-foreground",
              )}
            >
              <Icon className="size-4.5" strokeWidth={1.75} />
              {label}
            </a>
          ))}
        </nav>
        <Card className="mx-3 mt-auto mb-3 gap-3 bg-muted p-4 shadow-none">
          <p className="text-sm font-semibold">Storage</p>
          <Progress value={68} />
          <p className="text-xs text-muted-foreground">6.8 of 10 GB used</p>
        </Card>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex h-15 items-center gap-3 border-b border-border bg-background px-4 sm:px-6">
          <TopBarBrandMark className="md:hidden">P_</TopBarBrandMark>
          <h1 className="text-base font-semibold">Overview</h1>
          <div className="relative ml-auto hidden w-full max-w-64 sm:block">
            <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input aria-label="Search" placeholder="Search projects" className="h-9 pl-9" />
          </div>
          <Button variant="secondary" size="icon" aria-label="Notifications" className="ml-auto sm:ml-0">
            <Bell />
          </Button>
        </header>

        <main className="flex flex-col gap-5 p-6">
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {stats.map((stat) => (
              <Card
                key={stat.label}
                className="gap-1 p-5 transition-[translate,box-shadow] duration-200 ease-(--ease) hover:-translate-y-0.5 hover:shadow-md motion-reduce:transition-none motion-reduce:hover:translate-y-0"
              >
                <p className="text-sm text-muted-foreground">{stat.label}</p>
                <div className="flex items-end justify-between gap-3">
                  <p className="text-2xl font-semibold tracking-tight tabular-nums">{stat.value}</p>
                  <AreaChart data={stat.trend} aria-label={`${stat.label} trend`} className="h-8 w-20" />
                </div>
                <p className="text-xs font-medium text-brand-text">{stat.delta} vs last month</p>
              </Card>
            ))}
          </div>

          <div className="grid gap-4 lg:grid-cols-[2fr_1fr]">
            <Card className="gap-4 p-5">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-sm font-semibold">Exports over time</h2>
                  <p className="text-xs text-muted-foreground">All formats</p>
                </div>
                <Tabs value={range} onValueChange={(value) => setRange(value as keyof typeof series)}>
                  <TabsList>
                    <TabsTab value="7d" className="h-7 px-2.5 text-xs whitespace-nowrap">
                      7 days
                    </TabsTab>
                    <TabsTab value="30d" className="h-7 px-2.5 text-xs whitespace-nowrap">
                      30 days
                    </TabsTab>
                  </TabsList>
                </Tabs>
              </div>
              <AreaChart
                aria-label="Exports over time"
                data={series[range].current}
                compare={series[range].previous}
                labels={series[range].labels}
                name="Exports"
                compareName="Previous period"
                className="h-56"
              />
              <ChartLegend
                items={[
                  { label: "Exports", color: "var(--chart-2)" },
                  { label: "Previous period", color: "var(--chart-4)", dashed: true },
                ]}
              />
            </Card>

            <Card className="gap-4 p-5">
              <div>
                <h2 className="text-sm font-semibold">Renders by hour</h2>
                <p className="text-xs text-muted-foreground">Today, peak at 19:00</p>
              </div>
              <BarChart
                aria-label="Renders by hour"
                data={[3, 5, 4, 7, 9, 6, 8, 11, 10, 13, 12, 16]}
                labels={hours}
                name="Renders"
                className="h-56"
              />
            </Card>
          </div>

          <Card className="gap-0 p-0">
            <div className="flex flex-wrap items-center gap-3 px-5 py-4">
              <h2 className="text-sm font-semibold">Recent exports</h2>
              <Tabs
                value={filter}
                onValueChange={(value) => {
                  setFilter(value as keyof typeof filters);
                  setLoading(true);
                }}
                className="ml-auto"
              >
                <TabsList>
                  {(["all", "running", "failed"] as const).map((value) => (
                    <TabsTab key={value} value={value} className="h-7 px-2.5 text-xs capitalize">
                      {value}
                    </TabsTab>
                  ))}
                </TabsList>
              </Tabs>
              <Button variant="ghost" className="h-8">
                View all
                <ArrowUpRight />
              </Button>
            </div>
            {loading ? (
              <ul aria-label="Loading exports" aria-busy className="divide-y divide-border border-t border-border">
                {[0, 1, 2].map((row) => (
                  <li key={row} className="grid grid-cols-[1fr_auto] items-center gap-x-4 gap-y-2 px-5 py-3.5 sm:grid-cols-[1fr_120px_160px]">
                    <Skeleton className="h-4 w-40" />
                    <Skeleton className="h-5 w-11 rounded-full" />
                    <Skeleton className="col-span-2 h-2 sm:col-span-1" />
                  </li>
                ))}
              </ul>
            ) : visible.length === 0 ? (
              <div className="flex flex-col items-center border-t border-border px-5 py-10 text-center">
                <span className="grid size-10 place-items-center rounded-full bg-muted inset-ring inset-ring-border">
                  <CircleCheck className="size-5 text-brand-text" strokeWidth={1.75} />
                </span>
                <p className="mt-3 text-sm font-semibold">No failed exports</p>
                <p className="mt-1 text-sm text-muted-foreground">Everything rendered cleanly this week.</p>
              </div>
            ) : (
              <ul className="divide-y divide-border border-t border-border">
                {visible.map((item) => (
                  <li
                    key={item.name}
                    className="grid grid-cols-[1fr_auto] items-center gap-x-4 gap-y-2 px-5 py-3 transition-colors duration-150 hover:bg-muted/60 sm:grid-cols-[1fr_120px_160px]"
                  >
                    <span className="truncate font-mono text-sm">{item.name}</span>
                    <Badge tone="plain" className="justify-self-end sm:justify-self-start">
                      {item.format}
                    </Badge>
                    <div className="col-span-2 flex items-center gap-3 sm:col-span-1">
                      <Progress value={item.progress} className="flex-1" />
                      <span className="w-9 text-right text-xs tabular-nums text-muted-foreground">{item.progress}%</span>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </Card>
        </main>
      </div>
    </div>
  );
}
