import { useIntl, useTranslations } from "next-intl";
import { useRouter } from "next/router";
import Footer from "../components/Footer";
import Layout from "../components/Layout/layout";
import Navbar from "../components/Navbar";

function Code({ children }) {
  return (
    <code style={{ background: "#eee", padding: 4, borderRadius: 4 }}>
      {children}
    </code>
  );
}

function TranslatePage() {
  const t = useTranslations("Navigation");
  const { locale } = useRouter();
  const intl = useIntl();
  const lastUpdated = new Date(2021, 0, 26, 17, 4, 45);

  return (
    <>
      <p>
        {t("description", {
          locale,
          code: (children) => <Code>{children}</Code>,
        })}
      </p>
      <p>
        {t("lastUpdated", {
          lastUpdated,
          lastUpdatedRelative: intl.formatRelativeTime(lastUpdated),
        })}
      </p>
    </>
  );
}

export function getStaticProps({ locale }) {
  return {
    props: {
      messages: {
        ...require(`../messages/converter/${locale}.json`),
      },
      now: new Date().getTime(),
    },
  };
}

TranslatePage.getLayout = function getLayout(page) {
  return (
    <Layout>
      <Navbar></Navbar>
      {page}
      <Footer></Footer>
    </Layout>
  );
};

export default TranslatePage;
