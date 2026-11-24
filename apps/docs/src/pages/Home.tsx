import { ArrowRight } from "lucide-react";
import { Link } from "react-router";

import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { TopBar, TopBarSpacer } from "@/components/ui/top-bar";

import { Brand } from "../components/Brand";
import { InstallCommand } from "../components/InstallCommand";
import { Preview } from "../components/Preview";
import { componentDocs } from "../examples";
import { installCommand, SITE } from "../lib/site";

export function Home() {
  const button = componentDocs.find((item) => item.slug === "button")!;

  return (
    <div className="bg-background text-foreground">
      <TopBar className="px-4 sm:px-6">
        <Brand />
        <TopBarSpacer />
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
        <Link to="/docs" className={buttonVariants({ variant: "primary" })}>
          Get started
          <ArrowRight />
        </Link>
      </TopBar>

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
          <Link to="/docs/installation" className={buttonVariants({ variant: "primary" })}>
            Installation
          </Link>
          <Link to="/docs/components/button" className={buttonVariants({ variant: "secondary" })}>
            Browse components
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
              title: "One theme, every app",
              body: "Add the theme item and every project picks up the same light and dark CSS variables.",
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
