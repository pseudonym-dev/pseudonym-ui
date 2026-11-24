"use client";

import { ArrowUpRight, Bell, Film, FolderOpen, LayoutDashboard, Search, Settings, Users } from "lucide-react";
import { useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { AreaChart, BarChart, ChartLegend } from "@/components/ui/chart";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
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

const series = {
  "7d": [32, 41, 38, 52, 49, 63, 71],
  "30d": [18, 22, 20, 27, 31, 29, 35, 33, 40, 38, 45, 43, 49, 52, 48, 55, 60, 58, 63, 61, 66, 70, 68, 74, 72, 79, 83, 80, 86, 91],
};

const exports = [
  { name: "toucan-profile.mp4", format: "MP4", progress: 100 },
  { name: "macaw-closeup.gif", format: "GIF", progress: 72 },
  { name: "chameleon.png", format: "PNG", progress: 100 },
  { name: "launch-trailer.mp4", format: "MP4", progress: 34 },
];

export default function Dashboard01() {
  const [range, setRange] = useState<keyof typeof series>("30d");

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
                "flex h-9 items-center gap-2.5 rounded-lg px-2.5 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-foreground",
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
              <Card key={stat.label} className="gap-1 p-5">
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
              <AreaChart data={series[range]} aria-label="Exports over time" className="h-52" />
              <ChartLegend>
                <span>{range === "7d" ? "Mon" : "Oct 26"}</span>
                <span>{range === "7d" ? "Sun" : "Nov 24"}</span>
              </ChartLegend>
            </Card>

            <Card className="gap-4 p-5">
              <div>
                <h2 className="text-sm font-semibold">Renders by hour</h2>
                <p className="text-xs text-muted-foreground">Today, peak at 18:00</p>
              </div>
              <BarChart data={[3, 5, 4, 7, 9, 6, 8, 11, 10, 13, 12, 16]} aria-label="Renders by hour" className="h-52" />
              <ChartLegend>
                <span>08:00</span>
                <span>19:00</span>
              </ChartLegend>
            </Card>
          </div>

          <Card className="gap-0 p-0">
            <div className="flex items-center justify-between px-5 py-4">
              <h2 className="text-sm font-semibold">Recent exports</h2>
              <Button variant="ghost" className="h-8">
                View all
                <ArrowUpRight />
              </Button>
            </div>
            <ul className="divide-y divide-border border-t border-border">
              {exports.map((item) => (
                <li key={item.name} className="grid grid-cols-[1fr_auto] items-center gap-x-4 gap-y-2 px-5 py-3 sm:grid-cols-[1fr_120px_160px]">
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
          </Card>
        </main>
      </div>
    </div>
  );
}
