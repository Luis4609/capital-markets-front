import "../styles/globals.css";
import type { AppProps } from "next/app";
import type { NextPage } from "next";
import {
  createContext,
  ReactElement,
  ReactNode,
  useMemo,
  useState,
} from "react";

import { log } from "next-axiom";
import { AuthProvider } from "../context/AuthUserContext";
export { reportWebVitals } from "next-axiom";

log.info("Hello from frontend", { foo: "bar" });

export type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export const UserContext = createContext({});

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);

  // const [user, setUser] = useState();

  // const value = useMemo(() => ({ user, setUser }), [user]);

  return getLayout(
    // <UserContext.Provider value={{user, setUser}}>
    //   <Component {...pageProps} />
    // </UserContext.Provider>
    // <AuthProvider>
      <Component {...pageProps} />
    // </AuthProvider>
  );
}
