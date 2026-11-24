import { CodeBlock } from "../components/CodeBlock";
import { InstallCommand } from "../components/InstallCommand";
import { installCommand, namespaceSnippet, SITE } from "../lib/site";

export function Installation() {
  return (
    <article>
      <h1 className="text-3xl font-semibold tracking-tight">Installation</h1>
      <p className="mt-4 text-muted-foreground">
        You need a React project with Tailwind CSS v4 and a{" "}
        <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-[13px]">components.json</code> from{" "}
        <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-[13px]">npx shadcn@latest init</code>.
      </p>

      <h2 className="mt-10 text-xl font-semibold">1. Add the theme</h2>
      <p className="mt-3 text-muted-foreground">
        Add the theme item. The CLI writes the light and dark CSS variables and the Tailwind theme into your global CSS:
      </p>
      <div className="mt-3">
        <InstallCommand command={installCommand("theme")} />
      </div>
      <p className="mt-3 text-sm text-muted-foreground">
        Once <code className="font-mono">@pseudonym-ui/tokens</code> is published to npm, you can import the theme as a
        package instead, so theme updates arrive with a version bump:
      </p>
      <CodeBlock className="mt-3 rounded-lg inset-ring inset-ring-border" lang="bash" code="pnpm add @pseudonym-ui/tokens" />
      <CodeBlock
        className="mt-3 rounded-lg inset-ring inset-ring-border"
        lang="css"
        code={`@import "tailwindcss";\n@import "@pseudonym-ui/tokens/theme.css";`}
      />

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
      <CodeBlock className="mt-4 rounded-lg inset-ring inset-ring-border" lang="json" code={namespaceSnippet} />
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
