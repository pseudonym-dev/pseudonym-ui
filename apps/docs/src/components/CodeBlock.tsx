import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

import { type CodeLang, highlight } from "../lib/highlight";
import { CopyButton } from "./CopyButton";

export function useHighlight(code: string, lang: CodeLang) {
  const [html, setHtml] = useState<{ code: string; lang: CodeLang; html: string }>();

  useEffect(() => {
    let live = true;
    highlight(code, lang).then(
      (result) => live && setHtml({ code, lang, html: result }),
      () => {},
    );
    return () => {
      live = false;
    };
  }, [code, lang]);

  return html?.code === code && html.lang === lang ? html.html : undefined;
}

export function CodeBlock({ code, lang, className }: { code: string; lang: CodeLang; className?: string }) {
  const html = useHighlight(code, lang);

  return (
    <div className={cn("code-block relative overflow-hidden bg-card text-[13px] leading-5 dark:bg-muted", className)}>
      {html ? (
        <div dangerouslySetInnerHTML={{ __html: html }} />
      ) : (
        <pre>
          <code>{code}</code>
        </pre>
      )}
      <CopyButton
        value={code}
        label="Copy code"
        className="absolute top-2 right-2 bg-card dark:bg-muted"
      />
    </div>
  );
}
