import { CustomCursor } from "@/components/cursor.component";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Janmey Solanki</title>
      </Head>
      <div className="hidden lg:block">
        <CustomCursor />
      </div>
      <Component {...pageProps} />
    </>
  );
}
