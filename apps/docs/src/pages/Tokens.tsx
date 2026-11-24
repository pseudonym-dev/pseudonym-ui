import tokens from "@pseudonym-ui/tokens/tokens.json";

const groups: { title: string; keys: string[] }[] = [
  { title: "Surfaces", keys: ["background", "card", "popover", "muted", "accent", "secondary", "sidebar"] },
  { title: "Text", keys: ["foreground", "card-foreground", "muted-foreground", "secondary-foreground", "accent-foreground"] },
  { title: "Brand", keys: ["primary", "primary-foreground", "brand-hover", "brand-text", "brand-fill", "ring"] },
  { title: "Lines", keys: ["border", "input"] },
  { title: "Status", keys: ["destructive"] },
];

function Swatch({ name, value }: { name: string; value: string }) {
  const isColor = typeof value === "string" && (value.startsWith("#") || value.startsWith("rgb"));
  return (
    <div className="flex items-center gap-3">
      {isColor ? (
        <span className="size-10 shrink-0 rounded-lg inset-ring inset-ring-border" style={{ background: value }} />
      ) : (
        <span className="size-10 shrink-0 rounded-lg bg-muted inset-ring inset-ring-border" />
      )}
      <div className="min-w-0">
        <p className="truncate text-sm font-medium">{name}</p>
        <p className="truncate font-mono text-xs text-muted-foreground">{value}</p>
      </div>
    </div>
  );
}

export function Tokens() {
  return (
    <article className="mx-auto max-w-3xl">
      <h1 className="text-3xl font-semibold tracking-tight">Tokens</h1>
      <p className="mt-4 text-muted-foreground">
        Values generated from the DTCG sources in{" "}
        <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-[13px]">packages/tokens/src</code>. Switch the
        theme in the header to compare light and dark.
      </p>
      <div className="mt-10 space-y-10">
        {groups.map((group) => (
          <section key={group.title}>
            <h2 className="mb-4 text-lg font-semibold">{group.title}</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {group.keys.map((key) => (
                <div key={key} className="rounded-xl p-3 inset-ring inset-ring-border">
                  <p className="mb-3 text-xs font-semibold text-muted-foreground uppercase">--{key}</p>
                  <div className="grid gap-3">
                    <Swatch name="Light" value={tokens.light[key as keyof typeof tokens.light]} />
                    <Swatch name="Dark" value={tokens.dark[key as keyof typeof tokens.dark]} />
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </article>
  );
}
