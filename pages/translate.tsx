import React from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/router";
import { NextPageWithLayout } from "./_app";

import Layout from "../components/Layout/layout";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const TranslatePage: NextPageWithLayout = () => {
  const t = useTranslations("Index");
  const { locale } = useRouter();
  return (
    <>
      <div>TranslatePage</div>
      {t("description", {
        locale,
        code: (children) => <Code>{children}</Code>,
      })}
    </>
  );
};

export function getStaticProps({ locale }) {
  return {
    props: {
      messages: {
        ...require(`../messages/shared/${locale}.json`),
        ...require(`../messages/index/${locale}.json`),
      },
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
