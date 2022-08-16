import { ReactElement, useEffect, useState } from "react";
import { NextPageWithLayout } from "./_app";

import { Button } from "@mui/material";
import CurrencyData from "../components/CurrencyData";
import Footer from "../components/Footer";
import Layout from "../components/Layout/layout";
import Navbar from "../components/Navbar";

import styles from "../styles/Home.module.css";
import { API_URL } from "../utils/urls";

const Home: NextPageWithLayout = () => {
  const [amount, setAmount] = useState<number>(0);
  const [amountOutPut, setAmountOutPut] = useState<number>(0);

  const [selected, setSelected] = useState<string>("USD");
  const [selectedOutPut, setSelectedOutPut] = useState<string>("EUR");

  useEffect(() => {
    fetch(
      `https://${API_URL}/latest?amount=${amount}&from=${selected}&to=${selectedOutPut}`
    )
      .then((resp) => resp.json())
      .then((data) => setAmountOutPut(data.rates[selectedOutPut]))
      .catch((error) =>
        console.error(`Error to fetch exchange conversion: ${error.message}`)
      );
  }, [amount, selected, selectedOutPut]);

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>Capital Markets Converter</h1>

        <div className={styles.converter}>
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
            <>
              <p className={styles.errormessage}>
                You selected the same currency
              </p>
            </>
          ) : (
            <Button
              variant="outlined"
              sx={{ marginTop: "15px", marginLeft: "10px" }}
              href={`/historical/${encodeURIComponent(
                selected
              )}/${encodeURIComponent(selectedOutPut)}`}
            >
              Historical chart
            </Button>
          )}
        </div>
      </main>
    </div>
  );
};

Home.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      <Navbar></Navbar>
      {page}
      <Footer></Footer>
    </Layout>
  );
};

export default Home;
