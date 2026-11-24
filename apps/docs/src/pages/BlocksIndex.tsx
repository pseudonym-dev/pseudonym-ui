import { ArrowRight } from "lucide-react";
import { Suspense, useEffect, useRef, useState } from "react";
import { Link } from "react-router";

import { cn } from "@/lib/utils";

import { blocks } from "../lib/blocks";

const FRAME_WIDTH = 1280;
const categories = ["all", ...new Set(blocks.map((block) => block.category))];

/** Renders a block at desktop width and scales it down to the card, so thumbnails are always current. */
function Thumbnail({ block }: { block: (typeof blocks)[number] }) {
  const ref = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.25);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const observer = new ResizeObserver(([entry]) => setScale(entry.contentRect.width / FRAME_WIDTH));
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="bg-muted bg-[radial-gradient(var(--dots)_1px,transparent_1px)] bg-size-[16px_16px] px-6 pt-6">
      <div
        ref={ref}
        className="relative aspect-[16/10] overflow-hidden rounded-t-lg bg-background shadow-(--canvas-shadow) transition-transform duration-300 ease-(--ease) group-hover:scale-[1.015] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
      >
        <div
          inert
          aria-hidden
          className="pointer-events-none absolute top-0 left-0 origin-top-left"
          style={{ width: FRAME_WIDTH, height: FRAME_WIDTH / 1.6, transform: `scale(${scale})` }}
        >
          <Suspense fallback={null}>
            <block.Component />
          </Suspense>
        </div>
      </div>
    </div>
  );
}

export function BlocksIndex() {
  const [category, setCategory] = useState("all");
  const shown = blocks.filter((block) => category === "all" || block.category === category);

  return (
    <article>
      <p className="font-mono text-xs tracking-wide text-brand-text uppercase">{blocks.length} blocks</p>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight">Blocks</h1>
      <p className="mt-3 max-w-2xl text-muted-foreground">
        Whole sections and screens built only from Pseudonym UI components and tokens. Install one with the shadcn CLI
        and it lands in your project as a single file, with the components it uses.
      </p>

      <div role="group" aria-label="Filter by category" className="mt-8 flex flex-wrap gap-2">
        {categories.map((item) => (
          <button
            key={item}
            type="button"
            aria-pressed={item === category}
            onClick={() => setCategory(item)}
            className={cn(
              "h-8 rounded-full px-3.5 text-sm font-medium capitalize text-muted-foreground inset-ring inset-ring-border transition-colors duration-150 outline-none hover:text-foreground hover:inset-ring-input focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
              item === category && "bg-foreground text-background inset-ring-foreground hover:text-background",
            )}
          >
            {item}
          </button>
        ))}
      </div>

      <div className="mt-8 grid gap-8 md:grid-cols-2">
        {shown.map((block) => (
          <Link
            key={block.slug}
            to={`/docs/blocks/${block.slug}`}
            className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-[translate,box-shadow,border-color] duration-200 ease-(--ease) outline-none hover:-translate-y-1 hover:border-input hover:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring motion-reduce:transition-none motion-reduce:hover:translate-y-0"
          >
            <Thumbnail block={block} />
            <div className="flex items-start gap-3 border-t border-border px-5 py-4">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <h2 className="text-[15px] font-semibold">{block.title}</h2>
                  <span className="rounded-full bg-muted px-2 py-0.5 text-[11px] font-medium capitalize text-muted-foreground inset-ring inset-ring-border">
                    {block.category}
                  </span>
                </div>
                <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{block.description}</p>
              </div>
              <ArrowRight className="mt-0.5 size-4 shrink-0 text-muted-foreground transition-[translate,color] duration-200 group-hover:translate-x-0.5 group-hover:text-foreground motion-reduce:transition-none" />
            </div>
          </Link>
        ))}
      </div>
    </article>
  );
}
