import { createServer as createHttpServer } from "node:http";
import { readFile } from "node:fs/promises";
import type { Product } from "../src/lib/api.ts";

const template = JSON.parse(await readFile(new URL("product.json", import.meta.url), "utf8"));
const placeholder = await readFile(new URL("images/placeholder.jpg", import.meta.url));

// The same placeholder item, repeated so the list has more than one entry.
const products = (origin: string): Product[] =>
  Array.from({ length: 6 }, (_, i) => ({
    ...template,
    id: String(i + 1),
    slug: `${template.slug}-${i + 1}`,
    name: `${template.name} ${i + 1}`,
    bestSeller: i === 0,
    image: new URL(template.image, origin).href,
  }));

export const createServer = () =>
  createHttpServer((req, res) => {
    const origin = `http://${req.headers.host}`;
    const { pathname } = new URL(req.url ?? "/", origin);
    const json = (status: number, body: unknown) =>
      res.writeHead(status, { "content-type": "application/json" }).end(JSON.stringify(body));

    if (req.method !== "GET") return json(405, { error: "Method not allowed" });
    if (pathname === "/images/placeholder.jpg") {
      return res.writeHead(200, { "content-type": "image/jpeg" }).end(placeholder);
    }
    if (pathname === "/products") return json(200, products(origin));

    const match = pathname.match(/^\/products\/([^/]+)$/);
    const product = match && products(origin).find((p) => p.id === decodeURIComponent(match[1]));
    if (product) return json(200, product);
    return json(404, { error: "Not found" });
  });

if (import.meta.main) {
  const port = Number(process.env.PORT ?? 4000);
  createServer().listen(port, () => console.log(`Mock server on http://localhost:${port}`));
}
