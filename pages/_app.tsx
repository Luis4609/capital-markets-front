import type { NextPage } from "next";
import type { AppProps } from "next/app";
import { ReactElement, ReactNode } from "react";
import "../styles/globals.css";
export { reportWebVitals } from "next-axiom";
import { log } from "next-axiom";

import { AppContextProvider } from "context/AppContext";
import { UserProvider } from "context/AuthUserContext";

log.info("Hello from frontend", { foo: "bar" });

export type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

// export const UserContext = createContext({});

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);

  return getLayout(
    <AppContextProvider>
      {/* <UserProvider> */}
      <Component {...pageProps} />
      {/* </UserProvider> */}
    </AppContextProvider>
  );
}
