import { ReactElement, useEffect, useState } from "react";
import { NextPageWithLayout } from "./_app";

import { Button, Stack, Box, TextField } from "@mui/material";

import CurrencyData from "../components/CurrencyData";
import Footer from "../components/Footer";
import Layout from "../components/Layout/layout";
import Navbar from "../components/Navbar";

import styles from "../styles/Home.module.css";
import { API_URL } from "../utils/urls";
import { styled } from "@mui/material/styles";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const Conversor: NextPageWithLayout = () => {
  const [amount, setAmount] = useState<number>(1); //innitial state = 1
  const [amountOutPut, setAmountOutPut] = useState<number>(0);

  const [selected, setSelected] = useState<string>("USD");
  const [selectedOutPut, setSelectedOutPut] = useState<string>("EUR");

  useEffect(() => {
    let isCancelled = false;

    fetch(
      `https://${API_URL}/latest?amount=${amount}&from=${selected}&to=${selectedOutPut}`
    )
      .then((resp) => resp.json())
      .then((data) => {
        if (!isCancelled) {
          setAmountOutPut(data.rates[selectedOutPut]);
        }
      })
      .catch((error) =>
        console.error(`Error to fetch exchange conversion: ${error.message}`)
      );

    return () => {
      isCancelled = true;
    };
  }, [amount, selected, selectedOutPut]);

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>Capital Markets Converter</h1>

        <div className={styles.converter}>
          {/* <CurrencyData
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
          )} */}

          <Box sx={{ width: "100%" }}>
            <Stack spacing={2}>
              <Item>Item 1</Item>
              <Item>Item 2</Item>
              <Item>Item 3</Item>

              <TextField
                id="outlined-select-currency"
                select
                label="Select"
                value={currency}
                onChange={handleChange}
                helperText="Please select your currency"
              >
                {currencies.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Stack>
          </Box>
        </div>
      </main>
    </div>
  );
};

Conversor.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      <Navbar></Navbar>
      {page}
      <Footer></Footer>
    </Layout>
  );
};

export default Conversor;
