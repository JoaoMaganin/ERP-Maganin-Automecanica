import { Button } from "primereact/button";
import styles from "./page.module.css";
import { PrimeReactProvider } from "primereact/api";

export default function Home() {
  return (
    <PrimeReactProvider>
      <div className={styles.page}>
        <main className={styles.main}>
          {/* <Image
          className={styles.logo}
          src="/vercel.sgv"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        /> */}

          <h1 className={styles.ctas}>Gerenciador de recursos</h1>
          <h1 style={{ color: 'yellow' }}>Maganin Automecanica</h1>

          <div className={styles.ctas}>
            <a
              className={styles.primary}
              href="/pages/estoque"
              rel="noopener noreferrer"
            >
              Estoque
            </a>
            <a
              href="#"
              rel="noopener noreferrer"
              className={styles.secondary}
            >
              Em construção...
            </a>

            <Button label="Submit" />
          </div>
        </main>
      </div>
    </PrimeReactProvider>
  );
}
