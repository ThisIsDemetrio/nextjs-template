import Image from "next/image";
import Link from "next/link";
import { getProducts } from "../lib/api.ts";
import styles from "./page.module.css";

// Roughly the first row of the grid; everything below stays lazy.
const EAGER_COUNT = 3;

export default async function HomePage() {
  const products = await getProducts();

  return (
    <main className={styles.main}>
      <h1>Products</h1>
      <ul className={styles.grid}>
        {products.map((product, i) => (
          <li key={product.id}>
            <Link href={`/products/${product.id}`} className={styles.card}>
              <div className={styles.media}>
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  sizes="(max-width: 600px) 100vw, (max-width: 960px) 50vw, 33vw"
                  loading={i < EAGER_COUNT ? "eager" : "lazy"}
                  fetchPriority={i === 0 ? "high" : undefined}
                />
              </div>
              <h2 className={styles.name}>{product.name}</h2>
              <p className={styles.description}>{product.shortDescription}</p>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
