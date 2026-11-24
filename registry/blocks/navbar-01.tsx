"use client";

import { Bell, ChevronRight, Menu, Plus, Search } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Drawer, DrawerClose, DrawerPopup, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { TopBarBrandMark } from "@/components/ui/top-bar";
import { cn } from "@/lib/utils";

const tabs = ["Overview", "Renders", "Presets", "Analytics", "Settings"];

export default function Navbar01() {
  const [active, setActive] = useState("Renders");

  return (
    <div className="min-h-[420px] bg-muted/40 text-foreground">
      <header className="border-b border-border bg-background">
        <div className="flex h-15 items-center gap-3 px-4 sm:px-6">
          <Drawer>
            <DrawerTrigger render={<Button variant="ghost" size="icon" aria-label="Open menu" className="md:hidden" />}>
              <Menu />
            </DrawerTrigger>
            <DrawerPopup className="right-auto left-0 w-72 bg-background p-4 data-ending-style:-translate-x-full data-starting-style:-translate-x-full">
              <div className="flex items-center justify-between">
                <DrawerTitle>Menu</DrawerTitle>
                <DrawerClose render={<Button variant="ghost" />}>Close</DrawerClose>
              </div>
              <nav className="mt-4 flex flex-col gap-0.5">
                {tabs.map((tab) => (
                  <DrawerClose
                    key={tab}
                    render={
                      <button
                        type="button"
                        onClick={() => setActive(tab)}
                        className={cn(
                          "h-10 rounded-lg px-3 text-left text-sm font-medium text-muted-foreground transition-colors duration-150 hover:bg-accent hover:text-foreground active:bg-accent/70",
                          active === tab && "bg-accent text-foreground",
                        )}
                      />
                    }
                  >
                    {tab}
                  </DrawerClose>
                ))}
              </nav>
            </DrawerPopup>
          </Drawer>

          <TopBarBrandMark>P_</TopBarBrandMark>
          <nav aria-label="Breadcrumb" className="hidden items-center gap-1.5 text-sm sm:flex">
            <a href="#" className="font-medium text-muted-foreground transition-colors duration-150 hover:text-foreground">
              Pseudonym Studio
            </a>
            <ChevronRight className="size-4 text-fg-quaternary" />
            <a href="#" aria-current="page" className="font-semibold">
              Bird series
            </a>
          </nav>

          <div className="relative ml-auto hidden w-72 lg:block">
            <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input aria-label="Search" placeholder="Search renders" className="h-9 pr-12 pl-9" />
            <kbd className="pointer-events-none absolute top-1/2 right-2 -translate-y-1/2 rounded-md bg-muted px-1.5 font-mono text-[11px] text-muted-foreground inset-ring inset-ring-border">
              ⌘K
            </kbd>
          </div>
          <Button variant="secondary" size="icon" aria-label="Notifications" className="relative ml-auto lg:ml-0">
            <Bell />
            <span className="absolute top-2 right-2 size-2 rounded-full bg-primary ring-2 ring-background" />
          </Button>
          <Button variant="primary" className="hidden sm:inline-flex">
            <Plus />
            New render
          </Button>
          <span
            aria-label="Signed in as Ana Lima"
            role="img"
            className="grid size-9 shrink-0 place-items-center rounded-full bg-neutral-900 text-xs font-semibold text-primary dark:bg-neutral-800"
          >
            AL
          </span>
        </div>

        <nav aria-label="Project" className="-mb-px hidden gap-1 overflow-x-auto px-4 sm:px-6 md:flex">
          {tabs.map((tab) => (
            <button
              key={tab}
              type="button"
              aria-current={active === tab ? "page" : undefined}
              onClick={() => setActive(tab)}
              className={cn(
                "relative h-11 shrink-0 px-3 text-sm font-medium text-muted-foreground outline-none transition-colors duration-150 hover:text-foreground focus-visible:text-foreground",
                "after:absolute after:inset-x-3 after:bottom-0 after:h-0.5 after:rounded-full",
                active === tab && "text-foreground after:bg-primary",
              )}
            >
              {tab}
            </button>
          ))}
        </nav>
      </header>

      <main className="p-6">
        <h1 className="text-xl font-semibold tracking-tight">{active}</h1>
        <p className="mt-1 text-sm text-muted-foreground">Breadcrumbs, search with a shortcut hint and underline tabs.</p>
        <div className="mt-6 h-48 rounded-xl bg-background inset-ring inset-ring-border" />
      </main>
    </div>
  );
}
