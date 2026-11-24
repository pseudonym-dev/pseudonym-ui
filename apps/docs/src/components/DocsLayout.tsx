import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router";

import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { cn } from "@/lib/utils";

import { docsNav } from "../lib/nav";
import { SITE } from "../lib/site";

function Brand({ className }: { className?: string }) {
  return (
    <Link to="/" className={cn("inline-flex items-center gap-2.5 text-base font-semibold text-foreground", className)}>
      <span className="inline-grid size-8 place-items-center rounded-lg bg-primary font-mono text-[13px] font-bold tracking-tighter text-primary-foreground shadow-skeuo">
        P_
      </span>
      {SITE.name}
    </Link>
  );
}

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
      <header className="sticky top-0 z-20 flex h-[60px] items-center gap-3 border-b border-border bg-background px-4">
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
        <span className="flex-1" />
        <a className="hidden text-sm font-semibold text-muted-foreground hover:text-foreground sm:inline" href={SITE.studio}>
          ASCII Studio
        </a>
        <ThemeToggle />
      </header>

      <div className="mx-auto grid max-w-7xl grid-cols-1 md:grid-cols-[240px_minmax(0,1fr)]">
        <aside className="sticky top-[60px] hidden h-[calc(100vh-60px)] overflow-auto border-r border-border md:block">
          <NavList />
        </aside>
        <main className="min-w-0 px-4 py-10 sm:px-8">
          <Outlet />
        </main>
      </div>

      {open ? (
        <div className="fixed inset-0 z-30 md:hidden">
          <button type="button" className="absolute inset-0 bg-black/60" aria-label="Close navigation" onClick={() => setOpen(false)} />
          <aside className="absolute inset-y-0 left-0 flex w-72 flex-col bg-background shadow-float">
            <div className="flex h-[60px] items-center justify-between border-b border-border px-3">
              <Brand />
              <Button variant="ghost" size="icon" aria-label="Close navigation" onClick={() => setOpen(false)}>
                <X />
              </Button>
            </div>
            <div className="overflow-auto">
              <NavList onNavigate={() => setOpen(false)} />
            </div>
          </aside>
        </div>
      ) : null}
    </div>
  );
}
