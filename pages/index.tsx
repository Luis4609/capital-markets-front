import { SetStateAction, useEffect, useState } from "react";

import CompareArrowsIcon from "@mui/icons-material/CompareArrows";
import {
  Box,
  Button,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import { blue } from "@mui/material/colors";

import Footer from "../components/Footer";
import Layout from "../components/Layout/layout";
import Navbar from "../components/Navbar";

import styles from "../styles/Home.module.css";

import { API_BACK_ALLCURRENCIES, API_URL } from "../utils/urls";

import { NextPageWithLayout } from "./_app";

import toast, { Toaster } from "react-hot-toast";
import CurrencyInput from "../components/CurrencyInput";
import { Currency } from "../types/currency";
import { useAuth } from "context/AuthUserContext";

interface HomeProps {
  currencies: Currency[];
}

const Home: NextPageWithLayout = () => {
  const [amount, setAmount] = useState(1);
  const [amountOutPut, setAmountOutPut] = useState(0);

  const [currencyFrom, setCurrencyFrom] = useState("USD");
  const [currencyTo, setCurrencyTo] = useState("EUR");

  const handleChangeCurrencyFrom = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setCurrencyFrom(event.target.value);
  };

  const handleChangeCurrencyTo = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setCurrencyTo(event.target.value);
  };

  const handleCurrencyChanges = () => {
    if (currencyFrom === currencyTo) {
      toast.error("Same currencies!!!. Please check");
    } else {
      setCurrencyFrom((prev) => currencyTo);
      setCurrencyTo((prev) => currencyFrom);
      toast.success("Change currencies");
    }
  };

  //* Extract this useEffect in a custom hook?
  useEffect(() => {
    let isCancelled = false;

    fetch(
      `https://${API_URL}/latest?amount=${amount}&from=${currencyFrom}&to=${currencyTo}`
    )
      .then((resp) => resp.json())
      .then((data) => {
        if (!isCancelled) {
          setAmountOutPut(data.rates[currencyTo]);
        }
      })
      .catch((error) => {
        console.log(`Error to fetch exchange conversion: ${error.message}`);
        toast.error("Bad conversion inputs!");
      });

    return () => {
      isCancelled = true;
    };
  }, [currencyFrom, currencyTo, amount]);

  const { user, logout } = useAuth();
  
  console.log(`User: ${user}`);

  return (
    <main className={styles.main}>

      {user ? (<p>HAYYY USER</p>) : <p>Error</p>}
      <h1 className={styles.title}>Capital Markets Converter</h1>

      <div className={styles.converter}>
        <Box sx={{ width: "100%" }}>
          <form noValidate autoComplete="off">
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={{ xs: 2, sm: 3, md: 4 }}
            >
              <TextField
                id="amount"
                type="number"
                value={amount}
                onChange={(e) => setAmount(parseFloat(e.target.value))}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">Amount</InputAdornment>
                  ),
                }}
              />
              <CurrencyInput
                label="From"
                currency={currencyFrom}
                handleCurrencyChange={handleChangeCurrencyFrom}
              ></CurrencyInput>

              <Avatar
                sx={{ bgcolor: blue[500], alignSelf: "center" }}
                onClick={() => handleCurrencyChanges()}
              >
                <CompareArrowsIcon></CompareArrowsIcon>
              </Avatar>
              <Toaster></Toaster>
              <CurrencyInput
                label="To"
                currency={currencyTo}
                handleCurrencyChange={handleChangeCurrencyTo}
              ></CurrencyInput>
            </Stack>
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={{ xs: 1, sm: 2, md: 4 }}
              justifyContent="space-between"
              alignItems="center"
              sx={{ marginTop: "20px" }}
            >
              {currencyFrom !== currencyTo && !Number.isNaN(amount) ? (
                <Typography variant="h5" color="primary">
                  Exchange:{" "}
                  {`${currencyFrom} ${Intl.NumberFormat("de-DE", {
                    style: "currency",
                    currency: currencyFrom,
                  }).format(amount)} to ${currencyTo} = `}
                  {Intl.NumberFormat("de-DE", {
                    style: "currency",
                    currency: currencyTo,
                  }).format(amountOutPut)}
                </Typography>
              ) : (
                <Typography variant="body1" color="secondary">
                  You selected the same currency or the amount input is
                  incorrect
                </Typography>
              )}
              <Button
                variant="outlined"
                sx={{ marginTop: "15px", marginLeft: "10px" }}
                href={`/historical/${encodeURIComponent(
                  currencyFrom
                )}/${encodeURIComponent(currencyTo)}`}
              >
                Historical chart
              </Button>
            </Stack>
          </form>
        </Box>
      </div>
    </main>
  );
};

Home.getLayout = function getLayout(page) {
  return (
    <Layout>
      <Navbar></Navbar>
      {page}
      <Footer></Footer>
    </Layout>
  );
};

//* Get currency list from the back
// export async function getStaticProps() {
//   const res = await fetch(API_BACK_ALLCURRENCIES);
//   const currencies = await res.json();

//   return {
//     props: {
//       currencies,
//     },
//   };
// }

export default Home;
