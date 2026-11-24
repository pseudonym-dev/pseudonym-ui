import { ArrowRight, Sparkles, Star } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TopBar, TopBarBrand, TopBarBrandMark, TopBarSpacer } from "@/components/ui/top-bar";
import { asciiField } from "@/lib/ascii";

const links = ["Product", "Docs", "Pricing", "Changelog"];
const art = asciiField(76, 22, 0.6);

export default function Hero01() {
  return (
    <div className="min-h-svh bg-background text-foreground">
      <TopBar className="static">
        <TopBarBrand>
          <TopBarBrandMark>P_</TopBarBrandMark>
          Pseudonym
        </TopBarBrand>
        <nav className="ml-6 hidden gap-1 md:flex">
          {links.map((link) => (
            <Button key={link} variant="ghost">
              {link}
            </Button>
          ))}
        </nav>
        <TopBarSpacer />
        <Button variant="ghost" className="hidden sm:inline-flex">
          Sign in
        </Button>
        <Button variant="primary">Get started</Button>
      </TopBar>

      <section className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-16 lg:grid-cols-[1fr_1.1fr] lg:py-24">
        <div>
          <Badge>
            <Sparkles className="size-3.5" />
            New: video export in the browser
          </Badge>
          <h1 className="mt-5 text-4xl font-semibold tracking-tight text-balance sm:text-5xl sm:leading-[1.05]">
            Turn any clip into living ASCII.
          </h1>
          <p className="mt-5 max-w-lg text-lg text-muted-foreground">
            Drop an image or a video, tune density and glow, and export a PNG, a GIF or plain text. Nothing leaves your
            machine.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button variant="primary">
              Open the studio
              <ArrowRight />
            </Button>
            <Button variant="secondary">
              <Star />
              Star on GitHub
            </Button>
          </div>
          <dl className="mt-10 flex gap-8 text-sm">
            {[
              ["158", "columns by default"],
              ["0 ms", "server time"],
              ["MIT", "and yours to fork"],
            ].map(([value, label]) => (
              <div key={label}>
                <dt className="font-mono text-xl font-semibold text-foreground">{value}</dt>
                <dd className="text-muted-foreground">{label}</dd>
              </div>
            ))}
          </dl>
        </div>

        <figure className="overflow-hidden rounded-2xl bg-neutral-950 p-5 shadow-(--canvas-shadow)">
          <div className="mb-4 flex gap-1.5">
            {["bg-neutral-700", "bg-neutral-700", "bg-primary"].map((color, i) => (
              <span key={i} className={`size-2.5 rounded-full ${color}`} />
            ))}
          </div>
          <pre aria-label="ASCII preview" className="overflow-hidden font-mono text-[9px] leading-[11px] text-primary sm:text-[10px] sm:leading-3">
            {art}
          </pre>
        </figure>
      </section>
    </div>
  );
}
