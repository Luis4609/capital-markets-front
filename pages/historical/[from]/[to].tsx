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

import { useRouter } from "next/router";
import { NextPageWithLayout } from "../../_app";
import { API_URL } from "../../../utils/urls";

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
  const [historicData, setHistoricData] = useState([]);

  const router = useRouter();
  const { from, to } = router.query;

  useEffect(() => {
    fetch(`https://${API_URL}/2020-04-01..?amount=1&from=${from}&to=${to}`)
      .then((resp) => resp.json())
      .then((data) => setHistoricData(data.rates))
      .catch((error) =>
        console.error(`Error to fetch exchange conversion: ${error.message}`)
      );
  }, [from]);

  //Labels
  const labels: string[] = [];
  //Array con los datos de Exchange
  const exchangeData: number[] = [];

  for (const [key, value] of Object.entries(historicData)) {
    labels.push(key);
    exchangeData.push(value[to]);
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

  return (
    <>
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
