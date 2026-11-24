export function Theming() {
  return (
    <article>
      <h1 className="text-3xl font-semibold tracking-tight">Theming</h1>
      <p className="mt-4 text-muted-foreground">
        Tokens follow shadcn naming so utilities such as{" "}
        <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-[13px]">bg-primary</code> and{" "}
        <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-[13px]">text-muted-foreground</code> work as you
        expect. The values come from ASCII Studio: lime primary, neutral surfaces, 8px radius, Inter.
      </p>
      <p className="mt-4 text-muted-foreground">
        Light values live on <code className="font-mono text-[13px]">:root</code>. Dark values live on{" "}
        <code className="font-mono text-[13px]">.dark</code> and{" "}
        <code className="font-mono text-[13px]">[data-theme="dark"]</code>. The theme toggle sets both.
      </p>
      <h2 className="mt-10 text-xl font-semibold">Studio extras</h2>
      <p className="mt-3 text-muted-foreground">
        A few tokens go beyond the shadcn set, because the Studio UI needs them:{" "}
        <code className="font-mono text-[13px]">brand-hover</code>,{" "}
        <code className="font-mono text-[13px]">brand-text</code>,{" "}
        <code className="font-mono text-[13px]">brand-fill</code>,{" "}
        <code className="font-mono text-[13px]">shadow-skeuo</code>, and{" "}
        <code className="font-mono text-[13px]">shadow-canvas</code>.
      </p>
      <p className="mt-4 text-muted-foreground">
        <code className="font-mono text-[13px]">destructive</code> is included so form errors have a colour. It is not
        used in ASCII Studio itself.
      </p>
    </article>
  );
}
