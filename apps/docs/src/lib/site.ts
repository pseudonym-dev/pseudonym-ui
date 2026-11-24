export const SITE = {
  name: "Pseudonym UI",
  github: "https://github.com/pseudonym-dev/pseudonym-ui",
  pages: "https://pseudonym-dev.github.io/pseudonym-ui",
  registry: "https://pseudonym-dev.github.io/pseudonym-ui/r",
  studio: "https://pseudonym-dev.github.io/ASCII-Studio/",
};

export function installCommand(name: string) {
  return `npx shadcn@latest add ${SITE.registry}/${name}.json`;
}

export const namespaceSnippet = `{
  "registries": {
    "@pseudonym": "${SITE.registry}/{name}.json"
  }
}`;
