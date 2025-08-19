import styles from "./page.module.css";

export default function Home() {
  return (
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
            href="/estoque"
            target="_blank"
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
        </div>
      </main>
    </div>
  );
}
