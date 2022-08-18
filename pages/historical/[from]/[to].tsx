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

import Footer from "../../../components/Footer";
import Layout from "../../../components/Layout/layout";
import Navbar from "../../../components/Navbar";
// import DatePicker from "../../../components/DatePicker";

import { Stack, TextField } from "@mui/material";
import { useRouter } from "next/router";
import { API_URL } from "../../../utils/urls";
import { NextPageWithLayout } from "../../_app";

import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import { format, compareAsc } from "date-fns";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const HistoricalPage: NextPageWithLayout = () => {
  const ACTUAL_DATE = format(new Date(), "yyyy-MM-dd");

  const [historicData, setHistoricData] = useState([]);

  //Date State for the filters
  const [startDate, setStartDate] = useState<string>(
    format(new Date(2022, 1, 1), "yyyy-MM-dd")
  );
  const [endDate, setEndDate] = useState<string>(
    format(new Date(2022, 7, 1), "yyyy-MM-dd")
  );

  const router = useRouter();
  const { from, to } = router.query;
  /* eslint-disable-next-line */
  const TO_CURRENCY: string | undefined = to?.toString();

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
          //todo: handle error message
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

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Currency Data",
      },
    },
  };

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
  const handleFilterStartDate = (newValue: any) => {
    setStartDate((prev) => format(new Date(newValue), "yyyy-MM-dd"));
    console.log(`%cNew value start date: ${newValue}`, "color: red;");
  };
  const handleFilterEndDate = (newValue: any) => {
    setEndDate((prev) => format(new Date(newValue), "yyyy-MM-dd"));
    console.log(`%cNew value start date: ${newValue}`, "color: green;");
  };

  return (
    <>
      <Stack
        direction="row"
        spacing={2}
        justifyContent="center"
        alignItems="center"
      >
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DesktopDatePicker
            label="Start Date"
            inputFormat="yyyy/MM/dd"
            value={startDate}
            maxDate={ACTUAL_DATE}
            onChange={handleFilterStartDate}
            renderInput={(params: JSX.IntrinsicAttributes) => (
              <TextField {...params} />
            )}
          />
          <DesktopDatePicker
            label="End Date"
            inputFormat="yyyy/MM/dd"
            value={endDate}
            maxDate={ACTUAL_DATE}
            onChange={handleFilterEndDate}
            renderInput={(params: JSX.IntrinsicAttributes) => (
              <TextField {...params} />
            )}
          />
        </LocalizationProvider>
      </Stack>
      <Line options={options} data={data} />
    </>
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
