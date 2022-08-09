import Head from "next/head";
import styles from '../../styles/Layout.module.css';

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <title>Capital Markets</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>{children}</main>
    </>
  );
}
