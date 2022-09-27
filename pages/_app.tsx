import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Provider, createClient } from "urql";
import Nav from "../components/Nav";
import { StateContext } from "../lib/context";
import Head from "next/head";

function MyApp({ Component, pageProps }: AppProps) {
  const client = createClient({ url: process.env.NEXT_PUBLIC_BACKEND_API! });

  return (
    <Provider value={client}>
      <Head>
        <title>Styled.</title>
      </Head>
      <StateContext>
        <Nav />
        <Component {...pageProps} />
      </StateContext>
    </Provider>
  );
}

export default MyApp;
