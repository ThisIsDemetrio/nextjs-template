export type Product = {
  id: string;
  slug: string;
  name: string;
  category: "kitchen" | "home-security" | "hair-care" | "accessories";
  shortDescription: string;
  image: string;
  bestSeller: boolean;
  colours?: string[];
  specs?: { title: string; items: string[] }[];
};

// Read at call time so tests can point it at an ephemeral mock server.
const apiUrl = () => {
  const url = process.env.API_URL;
  if (!url) throw new Error("API_URL is not set");
  return url;
};

async function get<T>(path: string): Promise<T | null> {
  // no-store keeps pages dynamic, so `next build` doesn't need the API running.
  const res = await fetch(new URL(path, apiUrl()), { cache: "no-store" });
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`GET ${path} failed: ${res.status}`);
  return res.json() as Promise<T>;
}

export const getProducts = async () => (await get<Product[]>("/products")) ?? [];

export const getProduct = (id: string) => get<Product>(`/products/${encodeURIComponent(id)}`);
