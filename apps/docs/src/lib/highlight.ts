import type { HighlighterCore } from "shiki/core";

export type CodeLang = "tsx" | "bash" | "json" | "css";

let highlighter: Promise<HighlighterCore> | undefined;

function load() {
  highlighter ??= Promise.all([import("shiki/core"), import("shiki/engine/javascript")]).then(
    ([{ createHighlighterCore }, { createJavaScriptRegexEngine }]) =>
      createHighlighterCore({
        themes: [import("shiki/themes/github-light.mjs"), import("shiki/themes/github-dark.mjs")],
        langs: [
          import("shiki/langs/tsx.mjs"),
          import("shiki/langs/bash.mjs"),
          import("shiki/langs/json.mjs"),
          import("shiki/langs/css.mjs"),
        ],
        engine: createJavaScriptRegexEngine(),
      }),
  );
  return highlighter;
}

/**
 * Returns a `<pre class="shiki">` string. Both themes are emitted as CSS variables
 * (`defaultColor: false`), and globals.css picks one from the `.dark` class, so the
 * theme toggle recolours code without highlighting again.
 */
export async function highlight(code: string, lang: CodeLang) {
  const shiki = await load();
  return shiki.codeToHtml(code, {
    lang,
    themes: { light: "github-light", dark: "github-dark" },
    defaultColor: false,
  });
}
