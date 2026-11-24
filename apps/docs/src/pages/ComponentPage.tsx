import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router";

import { CodeBlock } from "../components/CodeBlock";
import { InstallCommand } from "../components/InstallCommand";
import { Preview } from "../components/Preview";
import { getComponent } from "../examples";
import { installCommand } from "../lib/site";

const sources = import.meta.glob<string>(["../../../../registry/ui/*.tsx", "!**/*.test.tsx"], {
  query: "?raw",
  import: "default",
});

function useSource(item: string) {
  const [source, setSource] = useState<{ item: string; code: string }>();
  useEffect(() => {
    let live = true;
    sources[`../../../../registry/ui/${item}.tsx`]?.().then((code) => live && setSource({ item, code }));
    return () => {
      live = false;
    };
  }, [item]);
  return source?.item === item ? source.code : undefined;
}

export function ComponentPage() {
  const { slug } = useParams();
  const doc = slug ? getComponent(slug) : undefined;
  const source = useSource(doc?.item ?? "");
  if (!doc) return <Navigate to="/docs/components/button" replace />;

  return (
    <article>
      <h1 className="text-3xl font-semibold tracking-tight">{doc.title}</h1>
      <p className="mt-3 text-muted-foreground">{doc.description}</p>
      <div className="mt-6">
        <InstallCommand command={installCommand(doc.item)} />
      </div>
      <div className="mt-8">
        <Preview preview={doc.preview} code={doc.code} />
      </div>
      <h2 className="mt-12 text-xl font-semibold">Manual installation</h2>
      <p className="mt-3 text-muted-foreground">
        Copy this file to <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-[13px]">components/ui/{doc.item}.tsx</code>.
      </p>
      {source ? (
        <CodeBlock
          className="mt-4 rounded-xl inset-ring inset-ring-border [&_pre]:max-h-[480px]"
          lang="tsx"
          code={source}
        />
      ) : null}
    </article>
  );
}
