import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import { ReactElement, useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { format } from "date-fns";

//Import components
import Footer from "../../../components/Footer";
import Layout from "../../../components/Layout/layout";
import Navbar from "../../../components/Navbar";
import CurrencyInput from "../../../components/CurrencyInput";
import DatePicker from "../../../components/DatePicker";

//Components from MUI
import { Container, Stack, Typography } from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import { useRouter } from "next/router";

import { API_URL } from "../../../utils/urls";
import { NextPageWithLayout } from "../../_app";
import { UrlObject } from "url";
import { options } from "../../../utils/chart";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface useFetchHistoricProps {
  from: string | string[] | undefined;
  to: string | string[] | undefined;
}

const HistoricalPage: NextPageWithLayout = () => {
  const router = useRouter();
  const { from, to } = router.query;

  /* eslint-disable-next-line */
  const FROM_CURRENCY: string | undefined = from?.toString();
  const TO_CURRENCY: string | undefined = to?.toString();

  const [historicData, setHistoricData] = useState([]);

  //Date State for the filters
  const [startDate, setStartDate] = useState<string>(
    format(new Date(2022, 1, 1), "yyyy-MM-dd")
  );
  const [endDate, setEndDate] = useState<string>(
    format(new Date(2022, 7, 15), "yyyy-MM-dd")
  );

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    fetch(
      `https://${API_URL}/${startDate}..${endDate}?amount=1&from=${from}&to=${to}`,
      {
        signal,
      }
    )
      .then((resp) => resp.json())
      .then((data) => setHistoricData(data.rates))
      .catch((err) => {
        if (err.name === "AbortError") {
          console.log("Cancelled");
        } else {
          console.log("Bad fetch: ", err.message)
        }
      });

    return () => {
      controller.abort();
    };
  }, [from, to, startDate, endDate]);

  //Labels
  const labels: string[] = [];
  //Array con los datos de Exchange
  const exchangeData: number[] = [];

  for (const [key, value] of Object.entries(historicData)) {
    labels.push(key);
    exchangeData.push(value[TO_CURRENCY || ""]);
  }

  console.log("Change to: ", to)
  const data = {
    labels,
    datasets: [
      {
        label: `Currency exchange between ${from} and ${to}`,
        data: exchangeData.map((pepe) => pepe),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  //Pick dates for the filters
  //! Fix newValue types
  const handleFilterStartDate = (newValue: any) => {
    setStartDate((prev) => format(new Date(newValue), "yyyy-MM-dd"));
  };
  const handleFilterEndDate = (newValue: any) => {
    setEndDate((prev) => format(new Date(newValue), "yyyy-MM-dd"));
  };

  const handleChangeCurrencyFrom = (event: {
    target: { value: string | UrlObject };
  }) => {
    router.push(`/historical/${event.target.value}/${to}`);
  };

  const handleChangeCurrencyTo = (event: {
    target: { value: string | UrlObject };
  }) => {
    router.push(`/historical/${from}/${event.target.value}`);
  };

  return (
    <Container sx={{ marginTop: "2rem" }} disableGutters={true} maxWidth="xl">
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={2}
        justifyContent="center"
        alignItems="center"
      >
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            label="Start Date"
            date={startDate}
            handleDateChange={handleFilterStartDate}
          ></DatePicker>
          <DatePicker
            label="End Date"
            date={endDate}
            handleDateChange={handleFilterEndDate}
          ></DatePicker>
        </LocalizationProvider>
        <CurrencyInput
          label="From"
          currency={FROM_CURRENCY || ""}
          handleCurrencyChange={handleChangeCurrencyFrom}
        ></CurrencyInput>
        <CurrencyInput
          label="TO"
          currency={TO_CURRENCY || ""}
          handleCurrencyChange={handleChangeCurrencyTo}
        ></CurrencyInput>

        <Typography variant="h5" color="primary">
          {from !== to ? (
            <Typography variant="h5" color="primary">
              {" "}
              Currenct exchange: {exchangeData.at(-1)?.toFixed(3)}
            </Typography>
          ) : (
            <Typography variant="body1" color="secondary">
              You selected the same currency or the input is incorrect
            </Typography>
          )}
        </Typography>
      </Stack>
      <Line options={options} data={data} />
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={2}
        justifyContent="flex-end"
        alignItems="center"
        mt={4}
      >
        {/* <Button variant="contained" color="error" onClick={handleDownloadPdf}>
          Download pdf
        </Button>
        <Button
          variant="contained"
          color="success"
          onClick={handleDownloadExcel}
        >
          Download excel
        </Button> */}
      </Stack>
    </Container>
  );
};

HistoricalPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      <Navbar></Navbar>
      {page}
      <Footer></Footer>
    </Layout>
  );
};

export default HistoricalPage;
