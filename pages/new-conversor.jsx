import { useEffect, useState } from "react";

import CompareArrowsIcon from "@mui/icons-material/CompareArrows";
import {
  Box,
  Button,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import { blue } from "@mui/material/colors";
import Select from "@mui/material/Select";

import Footer from "../components/Footer";
import Layout from "../components/Layout/layout";
import Navbar from "../components/Navbar";

import styles from "../styles/Home.module.css";

import { API_BACK_ALLCURRENCIES, API_URL } from "../utils/urls";

// export const getStaticProps = async () => {
//   const res = await fetch(API_BACK_ALLCURRENCIES);
//   const currencies = await res.json();

//   return {
//     props: { currencies }, // will be passed to the page component as props
//   };
// };

const options = [
  { code: "USD", name: "US Dolar" },
  { code: "EUR", name: "Euro" },
  { code: "GBP", name: "British pound" },
  { code: "JPY", name: "Yen" },
];

const Conversor = () => {
  const [amount, setAmount] = useState(1);
  const [amountOutPut, setAmountOutPut] = useState(0);

  const [currencyFrom, setCurrencyFrom] = useState("USD");
  const [currencyTo, setCurrencyTo] = useState("EUR");

  const handleChangeCurrencyFrom = (event) => {
    setCurrencyFrom(event.target.value);
  };

  const handleChangeCurrencyTo = (event) => {
    setCurrencyTo(event.target.value);
  };

  const handleCurrencyChanges = () => {
    if (amount !== 0) {
      setAmount((prev) => prev);
    }
    setCurrencyFrom((prev) => currencyTo);
    setCurrencyTo((prev) => currencyFrom);
  };

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
      .catch((error) =>
        console.error(`Error to fetch exchange conversion: ${error.message}`)
      );

    return () => {
      isCancelled = true;
    };
  }, [currencyFrom, currencyTo, amount]);

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>Capital Markets Converter</h1>

        <div className={styles.converter}>
          <Box sx={{ width: "100%" }}>
            <form noValidate autoComplete="off">
              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={{ xs: 1, sm: 2, md: 4 }}
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
                <FormControl
                  variant="outlined"
                  sx={{ m: 1, width: 200 }}
                  size="medium"
                >
                  <InputLabel id="demo-simple-select-standard-label">
                    From
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-standard-label"
                    id="currency-from"
                    value={currencyFrom}
                    onChange={handleChangeCurrencyFrom}
                    label="from"
                  >
                    {/* {currencies
                      ? currencies.map((option) => (
                          <MenuItem key={option.code} value={option.code}>
                            {option.name}
                          </MenuItem>
                        ))
                      : options.map((option) => (
                          <MenuItem key={option.code} value={option.code}>
                            {option.name}
                          </MenuItem>
                        ))} */}
                    {options.map((option) => (
                      <MenuItem key={option.code} value={option.code}>
                        {option.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <Avatar
                  sx={{ bgcolor: blue[500], alignSelf: "center" }}
                  onClick={() => handleCurrencyChanges()}
                >
                  <CompareArrowsIcon></CompareArrowsIcon>
                </Avatar>
                <FormControl
                  variant="outlined"
                  sx={{ m: 1, width: 200 }}
                  size="medium"
                >
                  <InputLabel id="demo-simple-select-standard-label">
                    To
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-standard-label"
                    id="currency-to"
                    value={currencyTo}
                    onChange={handleChangeCurrencyTo}
                    label="to"
                  >
                    {/* {currencies
                      ? currencies.map((option) => (
                          <MenuItem key={option.code} value={option.code}>
                            {option.name}
                          </MenuItem>
                        ))
                      : options.map((option) => (
                          <MenuItem key={option.code} value={option.code}>
                            {option.name}
                          </MenuItem>
                        ))} */}
                    {options.map((option) => (
                      <MenuItem key={option.code} value={option.code}>
                        {option.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
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
                    Exchange: {`${currencyFrom} ${Intl.NumberFormat('de-DE', { style: 'currency', currency: currencyFrom }).format(amount)} to ${currencyTo} = `}
                    {Intl.NumberFormat('de-DE', { style: 'currency', currency: currencyTo }).format(amountOutPut)}
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
    </div>
  );
};

Conversor.getLayout = function getLayout(page) {
  return (
    <Layout>
      <Navbar></Navbar>
      {page}
      <Footer></Footer>
    </Layout>
  );
};

export default Conversor;
