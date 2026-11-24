import { Bell, Film, FolderOpen, Hash, Image, LayoutGrid, Plus, Search, Settings } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
  { name: "Birds", count: 24, active: true },
  { name: "Launch trailer", count: 8 },
  { name: "Posters", count: 13 },
  { name: "Experiments", count: 41 },
];

const tags = ["toucan", "macaw", "glow", "mono", "high-density"];
const renders = ["toucan-profile", "macaw-closeup", "heron-takeoff", "owl-blink", "parrot-loop", "kingfisher"].map(
  (name, i) => ({ name, art: asciiField(44, 16, i * 0.9) }),
);

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
              "grid size-10 place-items-center rounded-xl text-neutral-400 outline-none hover:bg-white/10 hover:text-white focus-visible:outline-2 focus-visible:outline-primary",
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
            {folders.map((folder) => (
              <li key={folder.name}>
                <a
                  href="#"
                  className={cn(
                    "flex h-8 items-center gap-2.5 rounded-lg px-2 text-sm text-secondary-foreground hover:bg-sidebar-accent",
                    folder.active && "bg-sidebar-accent font-medium text-foreground",
                  )}
                >
                  <FolderOpen className="size-4 text-muted-foreground" strokeWidth={1.75} />
                  <span className="flex-1 truncate">{folder.name}</span>
                  <span className="text-xs tabular-nums text-muted-foreground">{folder.count}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="px-2 pb-1.5 text-xs font-medium text-muted-foreground">Tags</p>
          <ul className="flex flex-col gap-0.5">
            {tags.map((tag) => (
              <li key={tag}>
                <a href="#" className="flex h-8 items-center gap-2 rounded-lg px-2 text-sm text-secondary-foreground hover:bg-sidebar-accent">
                  <Hash className="size-3.5 text-muted-foreground" />
                  {tag}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </aside>

      <main className="min-w-0 flex-1 overflow-auto p-6">
        <h1 className="text-xl font-semibold tracking-tight">Birds</h1>
        <p className="mt-1 text-sm text-muted-foreground">24 renders · updated 2 hours ago</p>
        <ul className="mt-6 grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4">
          {renders.map((render) => (
            <li key={render.name}>
              <pre aria-hidden className="grid aspect-[4/3] place-items-center overflow-hidden rounded-xl bg-black font-mono text-[6px] leading-[7px] text-primary">
                {render.art}
              </pre>
              <p className="mt-2 truncate font-mono text-xs text-secondary-foreground">{render.name}.mp4</p>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
