import "../styles/globals.css";
import type { AppProps } from "next/app";
import { createContext, ReactElement, ReactNode, useMemo, useState } from "react";
import type { NextPage } from "next";

export type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export const UserContext = createContext({});

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? ((page) => page);

  
  const [user, setUser] = useState({
    email: "",
    password: ''
  });

  const value = useMemo(
    () => ({ user, setUser }), 
    [user]
  );

  return getLayout(
    <UserContext.Provider value={value}>
      <Component {...pageProps} />
    </UserContext.Provider>
  );
}
