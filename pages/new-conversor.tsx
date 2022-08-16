import { ReactElement, useEffect, useState } from "react";
import { NextPageWithLayout } from "./_app";

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
import Select, { SelectChangeEvent } from "@mui/material/Select";

import Footer from "../components/Footer";
import Layout from "../components/Layout/layout";
import Navbar from "../components/Navbar";

import styles from "../styles/Home.module.css";
import { API_URL } from "../utils/urls";

const currencies = [
  {
    value: "USD",
    label: "$ United State Dolar",
  },
  {
    value: "EUR",
    label: "€ Euro",
  },
  {
    value: "JPY",
    label: "¥ Japan Yen",
  },
  { value: "GBP", label: "£ British pound" },
];

const Conversor: NextPageWithLayout = () => {
  const [amount, setAmount] = useState<number>(0); //innitial state = 1
  const [amountOutPut, setAmountOutPut] = useState<number>(0); //innitial state = 1

  const [currencyFrom, setCurrencyFrom] = useState<string>("USD");
  const [currencyTo, setCurrencyTo] = useState<string>("EUR");

  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleChange = (event: SelectChangeEvent) => {
    setCurrencyFrom(event.target.value as string);
  };

  const handleChangeCurrencyTo = (event: SelectChangeEvent) => {
    setCurrencyTo(event.target.value as string);
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
  }, [currencyFrom, currencyTo]);

  const handleCurrencyChanges = () => {
    setAmount(prev => amountOutPut)
    setCurrencyFrom((prev) => currencyTo);
    setCurrencyTo((prev) => currencyFrom);
  };

  const handleSubmit = (event: { preventDefault: () => void } | undefined) => {
    event?.preventDefault();
    console.log("Form");
    fetch(
      `https://${API_URL}/latest?amount=${amount}&from=${currencyFrom}&to=${currencyTo}`
    )
      .then((resp) => resp.json())
      .then((data) => setAmountOutPut(data.rates[currencyTo]))
      .catch((error) =>
        console.error(`Error to fetch exchange conversion: ${error.message}`)
      );
  };

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>Capital Markets Converter</h1>

        <div className={styles.converter}>
          <Box sx={{ width: "100%" }}>
            <form noValidate autoComplete="off" onSubmit={handleSubmit}>
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
                    id="demo-simple-select-standard"
                    value={currencyFrom}
                    onChange={handleChange}
                    label="from"
                  >
                    {currencies.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <Avatar
                  sx={{ bgcolor: blue[500] }}
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
                    id="demo-simple-select-standard"
                    value={currencyTo}
                    onChange={handleChangeCurrencyTo}
                    label="to"
                  >
                    {currencies.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
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
                {(amountOutPut !== 0 && currencyFrom !== currencyTo) ? (
                  <Typography variant="h5" color="primary">
                    Exchange: {`${currencyFrom} ${amount} to ${currencyTo} = `}
                    {amountOutPut}
                  </Typography>
                ) : (
                  <Typography variant="body1" color="secondary">You selected the same currency</Typography>
                )}
                <Button type="submit" variant="contained">
                  Convert
                </Button>
              </Stack>
              
            </form>
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
function handleCurrencyChanges(): void {
  throw new Error("Function not implemented.");
}
