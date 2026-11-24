import { useState, type ReactNode } from "react";

import { cn } from "@/lib/utils";

export function Preview({
  preview,
  code,
  className,
}: {
  preview: ReactNode;
  code: string;
  className?: string;
}) {
  const [tab, setTab] = useState<"preview" | "code">("preview");

  return (
    <div className="overflow-hidden rounded-xl inset-ring inset-ring-border">
      <div className="flex gap-1 border-b border-border bg-muted/60 p-1">
        {(["preview", "code"] as const).map((value) => (
          <button
            key={value}
            type="button"
            onClick={() => setTab(value)}
            className={cn(
              "h-8 rounded-md px-3 text-sm font-semibold capitalize outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
              tab === value ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground",
            )}
          >
            {value}
          </button>
        ))}
      </div>
      {tab === "preview" ? (
        <div className={cn("docs-grid flex min-h-56 items-center justify-center p-8", className)}>{preview}</div>
      ) : (
        <pre className="overflow-auto bg-foreground p-5 text-[13px] leading-5 text-background">
          <code>{code}</code>
        </pre>
      )}
    </div>
  );
}
