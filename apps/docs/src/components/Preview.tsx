import type { ReactNode } from "react";

import { Tabs, TabsList, TabsPanel, TabsTab } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

import { CodeBlock } from "./CodeBlock";

export function Preview({
  preview,
  code,
  className,
}: {
  preview: ReactNode;
  code: string;
  className?: string;
}) {
  return (
    <Tabs defaultValue="preview" className="overflow-hidden rounded-xl bg-card inset-ring inset-ring-border">
      <TabsList className="rounded-none border-b border-border bg-card inset-ring-0 dark:bg-muted/60">
        <TabsTab value="preview" className="h-8 flex-none">
          Preview
        </TabsTab>
        <TabsTab value="code" className="h-8 flex-none">
          Code
        </TabsTab>
      </TabsList>
      <TabsPanel value="preview" className={cn("docs-grid flex min-h-56 items-center justify-center p-8", className)}>
        {preview}
      </TabsPanel>
      <TabsPanel value="code">
        <CodeBlock code={code} lang="tsx" />
      </TabsPanel>
    </Tabs>
  );
}
