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
import { NextIntlProvider } from "next-intl";
import { log } from "next-axiom";
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
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? ((page) => page);

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const value = useMemo(() => ({ user, setUser }), [user]);

  return getLayout(
    <NextIntlProvider
      formats={{
        dateTime: {
          short: {
            day: "numeric",
            month: "short",
            year: "numeric",
          },
        },
      }}
      messages={pageProps.messages}
      now={new Date(pageProps.now)}
      timeZone="Austria/Vienna"
    >
      <UserContext.Provider value={value}>
        <Component {...pageProps} />
      </UserContext.Provider>
    </NextIntlProvider>
  );
}
