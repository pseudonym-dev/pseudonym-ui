"use client";

import { ChevronsLeft, ChevronsRight, Film, Inbox, LayoutDashboard, LifeBuoy, Settings, Sparkles, Star } from "lucide-react";
import { useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Select, SelectItem, SelectPopup, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";

const workspaces = [
  { label: "Pseudonym Studio", value: "studio" },
  { label: "Client work", value: "clients" },
];

const groups = [
  {
    title: "Workspace",
    items: [
      { label: "Dashboard", icon: LayoutDashboard, active: true },
      { label: "Inbox", icon: Inbox, count: 3 },
      { label: "Renders", icon: Film, count: 12 },
      { label: "Favourites", icon: Star },
    ],
  },
  {
    title: "Account",
    items: [
      { label: "Settings", icon: Settings },
      { label: "Help", icon: LifeBuoy },
    ],
  },
];

export default function Sidebar02() {
  // Start as an icon rail on phones, where a 256px panel would squeeze the page.
  const [collapsed, setCollapsed] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(max-width: 767px)").matches,
  );

  return (
    <div className="flex h-svh min-h-[560px] gap-3 bg-muted p-3 text-foreground">
      <aside
        data-collapsed={collapsed || undefined}
        className={cn(
          "flex shrink-0 flex-col rounded-2xl border border-border bg-card p-3 shadow-sm transition-[width] duration-200 ease-(--ease) motion-reduce:transition-none",
          collapsed ? "w-[68px]" : "w-64",
        )}
      >
        {collapsed ? (
          <span className="mx-auto grid size-10 place-items-center rounded-lg bg-primary font-mono text-[13px] font-bold text-primary-foreground shadow-skeuo">
            P_
          </span>
        ) : (
          <Select defaultValue="studio" items={workspaces}>
            <SelectTrigger aria-label="Workspace" className="h-11 font-semibold">
              <SelectValue />
            </SelectTrigger>
            <SelectPopup>
              {workspaces.map((workspace) => (
                <SelectItem key={workspace.value} value={workspace.value}>
                  {workspace.label}
                </SelectItem>
              ))}
            </SelectPopup>
          </Select>
        )}

        <nav className="mt-5 flex flex-col gap-5">
          {groups.map((group) => (
            <div key={group.title}>
              <p className={cn("px-2.5 pb-1.5 text-xs font-medium text-muted-foreground", collapsed && "sr-only")}>
                {group.title}
              </p>
              <ul className="flex flex-col gap-0.5">
                {group.items.map(({ label, icon: Icon, active, count }) => (
                  <li key={label}>
                    <a
                      href="#"
                      title={collapsed ? label : undefined}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "relative flex h-10 items-center gap-3 rounded-xl px-2.5 text-sm font-medium text-muted-foreground transition-colors duration-150 hover:bg-accent hover:text-foreground active:bg-accent/70",
                        active && "bg-primary/15 text-foreground before:absolute before:inset-y-2.5 before:-left-3 before:w-1 before:rounded-r-full before:bg-primary",
                        collapsed && "justify-center px-0",
                      )}
                    >
                      <Icon className={cn("size-5 shrink-0", active && "text-brand-text")} strokeWidth={1.75} />
                      <span className={cn("flex-1", collapsed && "sr-only")}>{label}</span>
                      {count && !collapsed ? <Badge tone="plain">{count}</Badge> : null}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>

        <div className="mt-auto flex flex-col gap-3">
          {collapsed ? null : (
            <div className="rounded-xl bg-muted p-3.5 inset-ring inset-ring-border">
              <p className="flex items-center gap-1.5 text-sm font-semibold">
                <Sparkles className="size-4 text-brand-text" />
                Studio trial
              </p>
              <p className="mt-1 text-xs text-muted-foreground">9 of 14 days left</p>
              <Progress value={36} className="mt-3" />
            </div>
          )}
          <Button
            variant="ghost"
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            aria-expanded={!collapsed}
            onClick={() => setCollapsed(!collapsed)}
            className={cn("justify-start", collapsed && "justify-center px-0")}
          >
            {collapsed ? <ChevronsRight /> : <ChevronsLeft />}
            {collapsed ? null : "Collapse"}
          </Button>
        </div>
      </aside>

      <main className="min-w-0 flex-1 overflow-auto rounded-2xl border border-border bg-background p-4 sm:p-6">
        <h1 className="text-xl font-semibold tracking-tight">Dashboard</h1>
        <p className="mt-1 text-sm text-muted-foreground">A floating sidebar that collapses to an icon rail.</p>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {["Renders today", "Queued", "Shared"].map((label, i) => (
            <div key={label} className="rounded-xl p-4 inset-ring inset-ring-border">
              <p className="text-sm text-muted-foreground">{label}</p>
              <p className="mt-1 text-2xl font-semibold tabular-nums">{[128, 4, 37][i]}</p>
            </div>
          ))}
        </div>
        <div className="mt-4 h-64 rounded-xl bg-muted/60 bg-[radial-gradient(var(--dots)_1px,transparent_1px)] bg-size-[20px_20px] inset-ring inset-ring-border" />
      </main>
    </div>
  );
}
