"use client";

import { Bell, Film, FolderOpen, Hash, Image, LayoutGrid, Plus, Search, Settings, Upload } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { TopBarBrandMark } from "@/components/ui/top-bar";
import { asciiField } from "@/lib/ascii";
import { cn } from "@/lib/utils";

const rail = [
  { label: "Library", icon: LayoutGrid, active: true },
  { label: "Videos", icon: Film },
  { label: "Images", icon: Image },
  { label: "Notifications", icon: Bell },
];

const folders = [
  { name: "Birds", files: ["toucan-profile.mp4", "macaw-closeup.mp4", "heron-takeoff.mp4", "owl-blink.gif", "parrot-loop.gif", "kingfisher.png"] },
  { name: "Launch trailer", files: ["intro.mp4", "logo-reveal.gif", "outro.mp4"] },
  { name: "Posters", files: ["poster-a.png", "poster-b.png", "poster-c.png", "poster-wide.png"] },
  { name: "Drafts", files: [] },
].map((folder, f) => ({ ...folder, renders: folder.files.map((name, i) => ({ name, art: asciiField(44, 16, f * 2.3 + i * 0.9) })) }));

const tags = ["toucan", "macaw", "glow", "mono", "high-density"];

function RailButton({ label, icon: Icon, active }: { label: string; icon: typeof Bell; active?: boolean }) {
  return (
    <Tooltip>
      <TooltipTrigger
        render={
          <button
            type="button"
            aria-label={label}
            aria-current={active ? "page" : undefined}
            className={cn(
              "grid size-10 place-items-center rounded-xl text-neutral-400 outline-none transition-colors duration-150 hover:bg-white/10 active:bg-white/15 hover:text-white focus-visible:outline-2 focus-visible:outline-primary",
              active && "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground",
            )}
          />
        }
      >
        <Icon className="size-5" strokeWidth={1.75} />
      </TooltipTrigger>
      <TooltipContent side="right">{label}</TooltipContent>
    </Tooltip>
  );
}

export default function Sidebar01() {
  const [active, setActive] = useState(folders[0].name);
  const [loading, setLoading] = useState(false);
  const folder = folders.find((item) => item.name === active)!;

  // Stands in for a request: show skeleton tiles briefly after switching folders.
  useEffect(() => {
    if (!loading) return;
    const id = window.setTimeout(() => setLoading(false), 700);
    return () => window.clearTimeout(id);
  }, [loading]);

  return (
    <div className="flex h-svh min-h-[560px] bg-background text-foreground">
      <nav aria-label="Sections" className="flex w-16 shrink-0 flex-col items-center gap-2 bg-neutral-950 py-3">
        <TopBarBrandMark className="mb-3">P_</TopBarBrandMark>
        {rail.map((item) => (
          <RailButton key={item.label} {...item} />
        ))}
        <div className="mt-auto">
          <RailButton label="Settings" icon={Settings} />
        </div>
      </nav>

      <aside className="hidden w-64 shrink-0 flex-col gap-5 border-r border-border bg-sidebar px-3 py-4 sm:flex">
        <div className="flex items-center justify-between px-2">
          <h2 className="text-sm font-semibold">Library</h2>
          <Button variant="ghost" size="icon" aria-label="New folder" className="size-8">
            <Plus />
          </Button>
        </div>
        <div className="relative">
          <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input aria-label="Filter library" placeholder="Filter" className="h-9 pl-9" />
        </div>
        <div>
          <p className="px-2 pb-1.5 text-xs font-medium text-muted-foreground">Folders</p>
          <ul className="flex flex-col gap-0.5">
            {folders.map((item) => (
              <li key={item.name}>
                <button
                  type="button"
                  aria-current={item.name === active || undefined}
                  onClick={() => {
                    if (item.name === active) return;
                    setActive(item.name);
                    setLoading(true);
                  }}
                  className={cn(
                    "flex h-8 w-full items-center gap-2.5 rounded-lg px-2 text-left text-sm text-secondary-foreground outline-none transition-colors duration-150 hover:bg-sidebar-accent focus-visible:outline-2 focus-visible:outline-ring active:bg-sidebar-accent/70",
                    item.name === active && "bg-sidebar-accent font-medium text-foreground",
                  )}
                >
                  <FolderOpen className="size-4 text-muted-foreground" strokeWidth={1.75} />
                  <span className="flex-1 truncate">{item.name}</span>
                  <span className="text-xs tabular-nums text-muted-foreground">{item.renders.length}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="px-2 pb-1.5 text-xs font-medium text-muted-foreground">Tags</p>
          <ul className="flex flex-col gap-0.5">
            {tags.map((tag) => (
              <li key={tag}>
                <a href="#" className="flex h-8 items-center gap-2 rounded-lg px-2 text-sm text-secondary-foreground transition-colors duration-150 hover:bg-sidebar-accent">
                  <Hash className="size-3.5 text-muted-foreground" />
                  {tag}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </aside>

      <main className="min-w-0 flex-1 overflow-auto p-6">
        <h1 className="text-xl font-semibold tracking-tight">{folder.name}</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {folder.renders.length ? `${folder.renders.length} renders · updated 2 hours ago` : "Empty folder"}
        </p>
        {loading ? (
          <ul aria-label="Loading renders" aria-busy className="mt-6 grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4">
            {[0, 1, 2, 3].map((tile) => (
              <li key={tile}>
                <Skeleton className="aspect-[4/3] rounded-xl" />
                <Skeleton className="mt-2.5 h-3 w-28" />
              </li>
            ))}
          </ul>
        ) : folder.renders.length === 0 ? (
          <div className="mt-6 flex flex-col items-center rounded-xl border border-dashed border-input px-6 py-14 text-center">
            <span className="grid size-11 place-items-center rounded-full bg-muted inset-ring inset-ring-border">
              <Upload className="size-5 text-muted-foreground" strokeWidth={1.75} />
            </span>
            <p className="mt-3 text-sm font-semibold">No drafts yet</p>
            <p className="mt-1 max-w-xs text-sm text-muted-foreground">Drop an image or a clip here, or start from a render you like.</p>
            <Button variant="secondary" className="mt-4">
              <Plus />
              Upload a clip
            </Button>
          </div>
        ) : (
          <ul className="mt-6 grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4">
            {folder.renders.map((render) => (
              <li key={render.name}>
                <a href="#" className="group block rounded-xl outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring">
                  <pre
                    aria-hidden
                    className="grid aspect-[4/3] place-items-center overflow-hidden rounded-xl bg-black font-mono text-[6px] leading-[7px] text-primary transition-[translate,box-shadow] duration-200 ease-(--ease) group-hover:-translate-y-0.5 group-hover:shadow-lg group-hover:ring-2 group-hover:ring-primary/60 motion-reduce:transition-none motion-reduce:group-hover:translate-y-0"
                  >
                    {render.art}
                  </pre>
                  <p className="mt-2 truncate font-mono text-xs text-secondary-foreground group-hover:text-foreground">{render.name}</p>
                </a>
              </li>
            ))}
          </ul>
        )}
      </main>
    </div>
  );
}
