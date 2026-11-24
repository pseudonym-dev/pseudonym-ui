import { Link } from "react-router";

import { SITE } from "../lib/site";

export function Introduction() {
  return (
    <article className="mx-auto max-w-2xl">
      <h1 className="text-3xl font-semibold tracking-tight">Introduction</h1>
      <p className="mt-4 text-muted-foreground">
        Pseudonym UI is the interface language of{" "}
        <a className="text-brand-text underline-offset-2 hover:underline" href={SITE.studio}>
          ASCII Studio
        </a>
        , packaged so you can reuse it in other projects.
      </p>
      <p className="mt-4 text-muted-foreground">
        It follows the shadcn model. Components are source files you add with the CLI. The theme lives in{" "}
        <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-[13px]">@pseudonym-ui/tokens</code>, a small CSS
        package of design tokens and a Tailwind v4 theme. Update the tokens once, and every app that imports them picks
        up the new look.
      </p>
      <h2 className="mt-10 text-xl font-semibold">What you get in v0.1</h2>
      <ul className="mt-3 list-disc space-y-1 pl-5 text-muted-foreground">
        <li>The ASCII Studio colour system, including the lime brand, in light and dark.</li>
        <li>The controls already used in the editor: buttons, switches, sliders, tabs, select, timeline, and more.</li>
        <li>A public registry you can install from GitHub Pages.</li>
      </ul>
      <p className="mt-8">
        <Link className="font-semibold text-brand-text hover:underline" to="/docs/installation">
          Install the first component →
        </Link>
      </p>
    </article>
  );
}
