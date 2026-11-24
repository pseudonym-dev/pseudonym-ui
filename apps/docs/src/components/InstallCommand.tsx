import { CopyButton } from "./CopyButton";
import { useHighlight } from "./CodeBlock";

export function InstallCommand({ command }: { command: string }) {
  const html = useHighlight(command, "bash");

  return (
    <div className="code-block flex items-center gap-2 overflow-hidden rounded-lg bg-card py-2 pr-2 pl-3 inset-ring inset-ring-border dark:bg-muted">
      {html ? (
        <div className="min-w-0 flex-1 truncate font-mono text-[13px]" dangerouslySetInnerHTML={{ __html: html }} />
      ) : (
        <code className="min-w-0 flex-1 truncate font-mono text-[13px] text-foreground">{command}</code>
      )}
      <CopyButton value={command} label="Copy install command" />
    </div>
  );
}
