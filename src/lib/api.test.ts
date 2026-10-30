import { test, before, after } from "node:test";
import assert from "node:assert/strict";
import type { AddressInfo } from "node:net";
import { createServer } from "../../mock-server/server.ts";
import { getProduct, getProducts } from "./api.ts";

const server = createServer();

before(async () => {
  await new Promise<void>((resolve) => server.listen(0, resolve));
  process.env.API_URL = `http://localhost:${(server.address() as AddressInfo).port}`;
});

after(() => server.close());

test("getProducts returns the list", async () => {
  const products = await getProducts();
  assert.equal(products.length, 6);
  assert.match(products[0].image, /^http:\/\/localhost:\d+\/images\//);
});

test("getProduct returns one product", async () => {
  const product = await getProduct("2");
  assert.equal(product?.id, "2");
});

test("getProduct returns null for an unknown id", async () => {
  assert.equal(await getProduct("nope"), null);
});
