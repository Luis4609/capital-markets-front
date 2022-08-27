import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip
} from "chart.js";
import { format } from "date-fns";
import { ReactElement, useEffect, useState } from "react";
import { Line } from "react-chartjs-2";

//Import components
import CurrencyInput from "../../../components/CurrencyInput";
import Footer from "../../../components/Footer";
import Layout from "../../../components/Layout/layout";
import Navbar from "../../../components/Navbar";

//Components from MUI
import { Container, Stack, Typography } from "@mui/material";

import { useRouter } from "next/router";

import LocalizedDatePicker from "components/LocaleDatePicker";
import useStorage from "hooks/useStorage";
import toast, { Toaster } from "react-hot-toast";
import { UrlObject } from "url";
import { options } from "../../../utils/chart";
import { API_BACK_HISTORIC_PDF, API_URL } from "../../../utils/urls";
import { NextPageWithLayout } from "../../_app";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// interface useFetchHistoricProps {
//   from: string | string[] | undefined;
//   to: string | string[] | undefined;
// }

const HistoricalPage: NextPageWithLayout = () => {
  const router = useRouter();
  const { from, to } = router.query;

  //HANDLE USER AUTH
  const { getItem } = useStorage();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    setUser(getItem("userAuth"));
  }, [user]);

  /* eslint-disable-next-line */
  const FROM_CURRENCY: string | undefined = from?.toString();
  const TO_CURRENCY: string | undefined = to?.toString();

  const [historicData, setHistoricData] = useState([]);

  //Date State for the filters
  const [startDate, setStartDate] = useState<string>(
    format(new Date(2022, 0, 1), "yyyy-MM-dd")
  );
  const [endDate, setEndDate] = useState<string>(
    format(new Date(2022, 8, 24), "yyyy-MM-dd")
  );

  useEffect(() => {

    if (startDate > endDate) {
      toast.error("Start Date is greater than the End Date");
    } else if (from == undefined || to == undefined) {
    } else if (from === to) {
      toast.error("You can't select the same currency");
    } else {
      const controller = new AbortController();
      const signal = controller.signal;

      fetch(
        `https://${API_URL}/${startDate}..${endDate}?amount=1&from=${from}&to=${to}`,
        {
          signal,
        }
      )
        .then((resp) => resp.json())
        .then((data) => {
          setHistoricData(data.rates);
        })
        .catch((err) => {
          if (err.name === "AbortError") {
            console.log("Cancelled");
          } else {
            console.info("Bad fetch: ", err.message);
          }
        });

      return () => {
        controller.abort();
      };
    }
  }, [from, to, startDate, endDate]);

  //Labels con las fechas
  const labels: string[] = [];

  //Array con los datos de Exchange
  const exchangeData: number[] = [];

  for (const [key, value] of Object.entries(historicData)) {
    labels.push(key);
    exchangeData.push(value[TO_CURRENCY || ""]);
  }

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

  const handleFilterStartDate = (newValue: any) => {
    if (new Date(newValue).toString() == "Invalid Date") {
      // toast.error("Invalid date input yyyy-MM-dd");
    } else {
      setStartDate((prev) => format(new Date(newValue), "yyyy-MM-dd"));
    }
  };
  const handleFilterEndDate = (newValue: any) => {
    if (new Date(newValue).toString() == "Invalid Date") {
      // toast.error("Invalid date input");
    } else {
      setEndDate((prev) => format(new Date(newValue), "yyyy-MM-dd"));
    }
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

  const handleDownloadPdf = () => {
    fetch(API_BACK_HISTORIC_PDF, {
      method: "POST",
      body: JSON.stringify({
        amount: "1",
        base: FROM_CURRENCY,
        conversion: TO_CURRENCY,
        startDate: startDate,
        endDate: endDate,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => resp.json())
      .then((data) => console.log(data))
      .catch((err) => {
        console.log("Bad fetch: ", err.message);
      });
  };

  return (
    <Container
      sx={{ marginBottom: "3rem", marginTop: "3rem" }}
      disableGutters={true}
      maxWidth="lg"
    >
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={2}
        justifyContent="center"
        alignItems="center"
      >
        <LocalizedDatePicker
          label="Start Date"
          date={startDate}
          handleDateChange={handleFilterStartDate}
        ></LocalizedDatePicker>
        <LocalizedDatePicker
          label="End Date"
          date={endDate}
          handleDateChange={handleFilterEndDate}
        ></LocalizedDatePicker>
        <Toaster></Toaster>
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
        {from !== to ? (
          <Typography variant="h5" color="primary">
            Current exchange: {exchangeData.at(-1)?.toLocaleString()}
          </Typography>
        ) : (
          <Typography variant="body1" color="secondary">
            You selected the same currency or the input is incorrect
          </Typography>
        )}
      </Stack>
      <Line options={options} data={data}/>
      {/* <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={2}
        justifyContent="flex-end"
        alignItems="center"
        mt={4}
      >
        <a href="/historical.pdf" download>
          <Button variant="contained" color="error">
            Download pdf
          </Button>
        </a>
      </Stack> */}
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
