import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Provider, createClient } from "urql";
import Head from "next/head";

import Nav from "../components/Nav";
import { StateContext } from "../lib/context";
import { UserProvider } from "@auth0/nextjs-auth0";

function MyApp({ Component, pageProps }: AppProps) {
  const client = createClient({ url: process.env.NEXT_PUBLIC_BACKEND_API! });

  return (
    <UserProvider>
      <Provider value={client}>
        <Head>
          <title>Styled.</title>
        </Head>
        <StateContext>
          <Nav />
          <Component {...pageProps} />
        </StateContext>
      </Provider>
    </UserProvider>
  );
}

export default MyApp;
