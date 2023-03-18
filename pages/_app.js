import { NextUIProvider } from "@nextui-org/react";
import "../styles/globals.css";
//los provider siempre se colocan en el _app.js
export default function App({ Component, pageProps }) {
  return (
    <NextUIProvider>
      <Component {...pageProps} />
    </NextUIProvider>
  );
}
