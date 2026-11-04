import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { extname, join, normalize } from "node:path";
import { handleApi } from "./api.mjs";

const root = join(process.cwd(), "dist");
const port = Number(process.env.PORT || 4173);
const types = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
  ".ico": "image/x-icon",
  ".json": "application/json; charset=utf-8",
  ".woff2": "font/woff2",
};

const server = createServer(async (req, res) => {
  const url = new URL(req.url || "/", "http://127.0.0.1");
  if (url.pathname.startsWith("/api/")) {
    try {
      await handleApi(req, res);
    } catch (error) {
      console.error(error);
      if (!res.headersSent) {
        res.statusCode = 500;
        res.setHeader("content-type", "application/json; charset=utf-8");
        res.end(JSON.stringify({ error: "server" }));
      }
    }
    return;
  }

  const requested = normalize(join(root, decodeURIComponent(url.pathname)));
  const path = requested.startsWith(root) ? requested : root;
  try {
    const data = await readFile(path);
    res.setHeader("content-type", types[extname(path)] || "application/octet-stream");
    res.end(data);
  } catch {
    if (extname(url.pathname)) {
      res.statusCode = 404;
      res.end("Not found");
      return;
    }
    const html = await readFile(join(root, "index.html"));
    res.setHeader("content-type", "text/html; charset=utf-8");
    res.end(html);
  }
});

server.listen(port, () => {
  console.log(`Aanandi Constructions http://localhost:${port}`);
});
