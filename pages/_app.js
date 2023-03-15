import "@/styles/globals.css";
import Head from "next/head";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>NewsApp por defecto</title>
        <meta
          name="description"
          content="newsapp - the best app to read news"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header>este _app aparece por default en todas las paginas. este _app envuelve a toda la aplicacion </header>
      <Component {...pageProps} />
    </>
  );
}
