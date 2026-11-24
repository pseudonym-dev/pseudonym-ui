import { ExternalLink } from "lucide-react";
import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router";

import { Tabs, TabsList, TabsPanel, TabsTab } from "@/components/ui/tabs";

import { CodeBlock } from "../components/CodeBlock";
import { InstallCommand } from "../components/InstallCommand";
import { getBlock } from "../lib/blocks";
import { installCommand } from "../lib/site";

const widths = { desktop: "100%", tablet: "768px", mobile: "390px" };

export function BlockPage() {
  const block = getBlock(useParams().slug);
  const [width, setWidth] = useState<keyof typeof widths>("desktop");
  const [source, setSource] = useState<{ slug: string; code: string }>();

  useEffect(() => {
    let live = true;
    block?.loadSource().then((code) => live && setSource({ slug: block.slug, code }));
    return () => {
      live = false;
    };
  }, [block]);

  if (!block) return <Navigate to="/docs/blocks" replace />;
  const viewUrl = `${import.meta.env.BASE_URL}view/${block.slug}`;

  return (
    <article>
      <h1 className="text-3xl font-semibold tracking-tight">{block.title}</h1>
      <p className="mt-3 text-muted-foreground">{block.description}</p>
      <div className="mt-6">
        <InstallCommand command={installCommand(block.slug)} />
      </div>

      <Tabs defaultValue="preview" className="mt-8 overflow-hidden rounded-xl border border-border">
        <div className="flex items-center gap-2 border-b border-border bg-muted/60 pr-2">
          <TabsList className="rounded-none bg-transparent inset-ring-0">
            <TabsTab value="preview" className="h-8 flex-none">
              Preview
            </TabsTab>
            <TabsTab value="code" className="h-8 flex-none">
              Code
            </TabsTab>
          </TabsList>
          <span className="flex-1" />
          <Tabs value={width} onValueChange={(value) => setWidth(value as keyof typeof widths)} className="hidden md:flex">
            <TabsList aria-label="Preview width" className="rounded-lg bg-transparent p-0.5 inset-ring-0">
              {Object.keys(widths).map((key) => (
                <TabsTab key={key} value={key} className="h-7 flex-none px-2.5 text-xs capitalize">
                  {key}
                </TabsTab>
              ))}
            </TabsList>
          </Tabs>
          <a
            href={viewUrl}
            target="_blank"
            rel="noreferrer"
            aria-label="Open in a new tab"
            className="grid size-8 place-items-center rounded-md text-muted-foreground hover:bg-accent hover:text-foreground"
          >
            <ExternalLink className="size-4" />
          </a>
        </div>
        <TabsPanel value="preview" className="docs-grid flex justify-center">
          <iframe
            key={block.slug}
            src={viewUrl}
            title={`${block.title} preview`}
            className="block max-w-full bg-background transition-[width] duration-200"
            style={{ width: widths[width], height: block.height }}
          />
        </TabsPanel>
        <TabsPanel value="code">
          {source?.slug === block.slug ? (
            <CodeBlock code={source.code} lang="tsx" className="[&_pre]:max-h-[640px]" />
          ) : null}
        </TabsPanel>
      </Tabs>
    </article>
  );
}
