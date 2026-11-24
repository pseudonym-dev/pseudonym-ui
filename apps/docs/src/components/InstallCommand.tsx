import { Check, Copy } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";

export function InstallCommand({ command }: { command: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(command);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    } catch {
      /* clipboard may be blocked */
    }
  }

  return (
    <div className="flex items-center gap-2 overflow-hidden rounded-lg bg-muted py-2 pr-2 pl-3 inset-ring inset-ring-border">
      <code className="min-w-0 flex-1 truncate font-mono text-[13px] text-foreground">{command}</code>
      <Button variant="ghost" size="icon" aria-label="Copy install command" onClick={copy}>
        {copied ? <Check /> : <Copy />}
      </Button>
    </div>
  );
}
