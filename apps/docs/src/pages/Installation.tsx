import { InstallCommand } from "../components/InstallCommand";
import { installCommand, namespaceSnippet, SITE } from "../lib/site";

export function Installation() {
  return (
    <article className="mx-auto max-w-2xl">
      <h1 className="text-3xl font-semibold tracking-tight">Installation</h1>
      <p className="mt-4 text-muted-foreground">
        You need a React project with Tailwind CSS v4 and a{" "}
        <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-[13px]">components.json</code> from{" "}
        <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-[13px]">npx shadcn@latest init</code>.
      </p>

      <h2 className="mt-10 text-xl font-semibold">1. Add the theme</h2>
      <p className="mt-3 text-muted-foreground">
        Install the token package and import it in your global CSS, after Tailwind:
      </p>
      <pre className="mt-4 overflow-auto rounded-lg bg-foreground p-4 text-[13px] leading-5 text-background">
        <code>{`pnpm add @pseudonym-ui/tokens

@import "tailwindcss";
@import "@pseudonym-ui/tokens/theme.css";`}</code>
      </pre>
      <p className="mt-3 text-sm text-muted-foreground">
        Until the package is published to npm, use the CSS from this repository (
        <code className="font-mono">packages/tokens/dist/theme.css</code>
        ) or add the theme item from the registry.
      </p>
      <div className="mt-3">
        <InstallCommand command={installCommand("theme")} />
      </div>

      <h2 className="mt-10 text-xl font-semibold">2. Add a component</h2>
      <p className="mt-3 text-muted-foreground">Point the shadcn CLI at a registry item:</p>
      <div className="mt-3">
        <InstallCommand command={installCommand("button")} />
      </div>

      <h2 className="mt-10 text-xl font-semibold">3. Optional namespace</h2>
      <p className="mt-3 text-muted-foreground">
        Register the namespace in <code className="font-mono text-[13px]">components.json</code> and then install with a
        short name:
      </p>
      <pre className="mt-4 overflow-auto rounded-lg bg-foreground p-4 text-[13px] leading-5 text-background">
        <code>{namespaceSnippet}</code>
      </pre>
      <div className="mt-3">
        <InstallCommand command="npx shadcn@latest add @pseudonym/button" />
      </div>
      <p className="mt-6 text-sm text-muted-foreground">
        The registry is served from {SITE.pages}. The CLI also works against a public GitHub repo once this project is
        on <code className="font-mono">main</code>.
      </p>
    </article>
  );
}
