import type { NextPage } from "next";
import { log } from "next-axiom";
import { NextIntlProvider } from "next-intl";
import type { AppProps } from "next/app";
import { ReactElement, ReactNode } from "react";
import "../styles/globals.css";
export { reportWebVitals } from "next-axiom";

log.info("Hello from frontend", { foo: "bar" });

export type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);

  return getLayout(
    <NextIntlProvider
      // To achieve consistent date, time and number formatting
      // across the app, you can define a set of global formats.
      formats={{
        dateTime: {
          short: {
            day: "numeric",
            month: "numeric",
            year: "numeric",
          },
        },
      }}
      messages={pageProps.messages}
      now={new Date(pageProps.now)}
      timeZone="Austria/Vienna"
    >
      <Component {...pageProps} />
    </NextIntlProvider>
  );
}
