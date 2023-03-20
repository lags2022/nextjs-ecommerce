import { NextUIProvider } from "@nextui-org/react";
import "../styles/globals.css";
import Head from "next/head";

//los provider siempre se colocan en el _app.js
export default function App({ Component, pageProps }) {
  return (
    <NextUIProvider>
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Component {...pageProps} />
    </NextUIProvider>
  );
}
