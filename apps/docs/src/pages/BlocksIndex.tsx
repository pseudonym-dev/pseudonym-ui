import { Suspense, useEffect, useRef, useState } from "react";
import { Link } from "react-router";

import { blocks } from "../lib/blocks";

const FRAME_WIDTH = 1280;

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
    <div ref={ref} className="relative aspect-[16/10] overflow-hidden bg-background">
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
  );
}

export function BlocksIndex() {
  return (
    <article>
      <h1 className="text-3xl font-semibold tracking-tight">Blocks</h1>
      <p className="mt-3 max-w-2xl text-muted-foreground">
        Whole sections and screens built only from Pseudonym UI components and tokens. Install one with the shadcn CLI
        and it lands in your project as a single file, with the components it uses.
      </p>
      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        {blocks.map((block) => (
          <Link
            key={block.slug}
            to={`/docs/blocks/${block.slug}`}
            className="group overflow-hidden rounded-xl border border-border outline-none hover:border-input focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          >
            <Thumbnail block={block} />
            <div className="border-t border-border bg-card px-4 py-3">
              <h2 className="text-sm font-semibold group-hover:text-brand-text">{block.title}</h2>
              <p className="mt-0.5 line-clamp-1 text-sm text-muted-foreground">{block.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </article>
  );
}
