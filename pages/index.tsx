import { ReactElement, useEffect, useState } from "react";
import { NextPageWithLayout } from "./_app";

import Footer from "../components/Footer";
import CurrencyData from "../components/CurrencyData";
import Layout from "../components/Layout/layout";

import styles from "../styles/Home.module.css";

const Home: NextPageWithLayout = () => {
  console.count("Rerender")
  const [amount, setAmount] = useState<number>(0);
  const [amountOutPut, setAmountOutPut] = useState<number>(0);

  const [selected, setSelected] = useState<string>("");
  const [selectedOutPut, setSelectedOutPut] = useState<string>(" ");

  useEffect(() => {
    const host = "api.frankfurter.app";
    console.time("Exchange with API")

    fetch(
      `https://${host}/latest?amount=${amount}&from=${selected}&to=${selectedOutPut}`
    )
      .then((resp) => resp.json())
      .then((data) => setAmountOutPut(data.rates[selectedOutPut]))
      .catch((error) =>
        console.error(`Error to fetch exchange conversion: ${error.message}`)
      );

      console.timeEnd("Exchange with API")
  }, [amount, selected, selectedOutPut]); //Add dependencies for useEffect: [amount, selected]

  // if (selected === selectedOutPut) {
  //   setAmountOutPut(amount);
  // }

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>Capital Markets Converter</h1>

        <CurrencyData
          currencyTypeChange="From"
          disable={false}
          amount={amount}
          setAmount={setAmount}
          selected={selected}
          setSelected={setSelected}
        />

        <CurrencyData
          currencyTypeChange="To"
          disable
          amount={amountOutPut}
          setAmount={setAmountOutPut}
          selected={selectedOutPut}
          setSelected={setSelectedOutPut}
        />
        {selected === selectedOutPut ? (
          <p className={styles.errormessage}>
           You selected the same currency
          </p>
        ) : null}
      </main>
    </div>
  );
};

Home.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      {page}
      <Footer></Footer>
    </Layout>
  );
};

export default Home;
