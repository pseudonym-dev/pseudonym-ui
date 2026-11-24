import { ArrowRight } from "lucide-react";
import { Link } from "react-router";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";

import { InstallCommand } from "../components/InstallCommand";
import { Preview } from "../components/Preview";
import { componentDocs } from "../examples";
import { installCommand, SITE } from "../lib/site";

export function Home() {
  const button = componentDocs.find((item) => item.slug === "button")!;

  return (
    <div className="bg-background text-foreground">
      <header className="sticky top-0 z-20 flex h-[60px] items-center gap-3 border-b border-border px-4 sm:px-6">
        <Link to="/" className="inline-flex items-center gap-2.5 text-base font-semibold">
          <span className="inline-grid size-8 place-items-center rounded-lg bg-primary font-mono text-[13px] font-bold tracking-tighter text-primary-foreground shadow-skeuo">
            P_
          </span>
          {SITE.name}
        </Link>
        <span className="flex-1" />
        <Link className="hidden text-sm font-semibold text-muted-foreground hover:text-foreground sm:inline" to="/docs">
          Docs
        </Link>
        <Link
          className="hidden text-sm font-semibold text-muted-foreground hover:text-foreground sm:inline"
          to="/docs/components/button"
        >
          Components
        </Link>
        <a className="hidden text-sm font-semibold text-muted-foreground hover:text-foreground sm:inline" href={SITE.studio}>
          ASCII Studio
        </a>
        <ThemeToggle />
        <Link to="/docs">
          <Button variant="primary">
            Get started
            <ArrowRight />
          </Button>
        </Link>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-20 sm:px-8">
        <Badge>v0.1 · shadcn registry</Badge>
        <h1 className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight sm:text-[44px] sm:leading-[52px]">
          The ASCII Studio look, as a design system you can reuse.
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
          Copy components into your app with the shadcn CLI. Keep colours, type and radius in a small CSS package so the
          visual identity stays in one place.
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <Link to="/docs/installation">
            <Button variant="primary">Installation</Button>
          </Link>
          <Link to="/docs/components/button">
            <Button variant="secondary">Browse components</Button>
          </Link>
        </div>
        <div className="mt-6 max-w-2xl">
          <InstallCommand command={installCommand("button")} />
        </div>

        <div className="mt-16">
          <Preview preview={button.preview} code={button.code} />
        </div>

        <section className="mt-20 grid gap-6 sm:grid-cols-3">
          {[
            {
              title: "Copy, then edit",
              body: "Components land in your repo as source. Change a button without waiting on a release.",
            },
            {
              title: "Theme as a package",
              body: "Install @pseudonym-ui/tokens and every project picks up the same light and dark CSS variables.",
            },
            {
              title: "Accessible primitives",
              body: "Interactive controls are built on Base UI, the default used by shadcn/ui in 2026.",
            },
          ].map((item) => (
            <div key={item.title} className="rounded-xl p-5 inset-ring inset-ring-border">
              <h2 className="text-base font-semibold">{item.title}</h2>
              <p className="mt-2 text-sm text-muted-foreground">{item.body}</p>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
}
