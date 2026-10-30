import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProduct } from "../../../lib/api.ts";
import styles from "./page.module.css";

export default async function ProductPage({ params }: PageProps<"/products/[id]">) {
  const { id } = await params;
  const product = await getProduct(id);
  if (!product) notFound();

  return (
    <main className={styles.main}>
      <Link href="/">← All products</Link>
      <div className={styles.media}>
        <Image src={product.image} alt={product.name} fill sizes="(max-width: 720px) 100vw, 720px" preload />
      </div>
      <h1>{product.name}</h1>
      <p className={styles.description}>{product.shortDescription}</p>

      {product.colours && <p>Colours: {product.colours.join(", ")}</p>}

      {product.specs?.map((spec) => (
        <section key={spec.title}>
          <h2 className={styles.specTitle}>{spec.title}</h2>
          <ul>
            {spec.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
      ))}
    </main>
  );
}
