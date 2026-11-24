import { Menu, X } from "lucide-react";
import { useState } from "react";
import { NavLink, Outlet, useLocation } from "react-router";

import { Button } from "@/components/ui/button";
import { Drawer, DrawerClose, DrawerPopup, DrawerTitle } from "@/components/ui/drawer";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { TopBar, TopBarSpacer } from "@/components/ui/top-bar";
import { cn } from "@/lib/utils";

import { docsNav } from "../lib/nav";
import { SITE } from "../lib/site";
import { Brand } from "./Brand";

function NavList({ onNavigate }: { onNavigate?: () => void }) {
  const location = useLocation();
  return (
    <nav className="flex flex-col gap-6 px-3 py-4">
      {docsNav.map((group) => (
        <div key={group.title}>
          <p className="px-2 text-xs font-semibold tracking-wide text-muted-foreground uppercase">{group.title}</p>
          <ul className="mt-2 flex flex-col">
            {group.items.map((item) => {
              const active = location.pathname === item.to;
              return (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    onClick={onNavigate}
                    className={cn(
                      "block rounded-md px-2 py-1.5 text-sm font-medium",
                      active ? "bg-accent text-foreground" : "text-muted-foreground hover:bg-accent hover:text-foreground",
                    )}
                  >
                    {item.label}
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </nav>
  );
}

export function DocsLayout() {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <TopBar className="px-4">
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          aria-label="Open navigation"
          onClick={() => setOpen(true)}
        >
          <Menu />
        </Button>
        <Brand />
        <TopBarSpacer />
        <a className="hidden text-sm font-semibold text-muted-foreground hover:text-foreground sm:inline" href={SITE.studio}>
          ASCII Studio
        </a>
        <ThemeToggle />
      </TopBar>

      <div className="mx-auto grid max-w-7xl grid-cols-1 md:grid-cols-[240px_minmax(0,1fr)]">
        <aside className="sticky top-[60px] hidden h-[calc(100vh-60px)] overflow-auto border-r border-border md:block">
          <NavList />
        </aside>
        <main className="min-w-0 px-4 py-10 sm:px-8">
          <div className="mx-auto max-w-3xl">
            <Outlet />
          </div>
        </main>
      </div>

      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerPopup className="right-auto left-0 w-72 bg-background text-foreground data-ending-style:-translate-x-full data-starting-style:-translate-x-full md:hidden">
          <DrawerTitle className="sr-only">Navigation</DrawerTitle>
          <div className="flex h-[60px] shrink-0 items-center justify-between border-b border-border px-3">
            <Brand />
            <DrawerClose render={<Button variant="ghost" size="icon" aria-label="Close navigation" />}>
              <X />
            </DrawerClose>
          </div>
          <div className="overflow-auto">
            <NavList onNavigate={() => setOpen(false)} />
          </div>
        </DrawerPopup>
      </Drawer>
    </div>
  );
}
