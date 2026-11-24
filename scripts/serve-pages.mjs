/**
 * Serve a static site the way GitHub Pages does: existing files as 200,
 * missing paths as 404.html with status 404, so the SPA can route them.
 * Usage: node scripts/serve-pages.mjs [dir] [port]
 */
import { readFile, stat } from "node:fs/promises";
import { createServer } from "node:http";
import { extname, join, resolve, sep } from "node:path";

const root = resolve(process.argv[2] ?? "apps/docs/dist");
const port = Number(process.argv[3] ?? 4173);
const types = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".ico": "image/x-icon",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json",
  ".map": "application/json",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".txt": "text/plain; charset=utf-8",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
};

function safePath(pathname) {
  const resolved = resolve(root, `.${decodeURIComponent(pathname)}`);
  if (resolved !== root && !resolved.startsWith(root + sep)) throw new Error("path");
  return resolved;
}

async function existingFile(path) {
  const info = await stat(path);
  return info.isDirectory() ? existingFile(join(path, "index.html")) : path;
}

const server = createServer(async (req, res) => {
  try {
    const file = await existingFile(safePath(new URL(req.url ?? "/", "http://127.0.0.1").pathname));
    const body = await readFile(file);
    res.writeHead(200, { "content-type": types[extname(file)] ?? "application/octet-stream" });
    res.end(body);
  } catch {
    try {
      const body = await readFile(join(root, "404.html"));
      res.writeHead(404, { "content-type": "text/html; charset=utf-8" });
      res.end(body);
    } catch {
      res.writeHead(404).end("Not found");
    }
  }
});

server.listen(port, "127.0.0.1", () => {
  console.log(`Serving ${root} at http://127.0.0.1:${port}/`);
});
