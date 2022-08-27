import { API_BACK_HISTORIC_PDF } from "utils/urls";

interface IPdf {
  amount: number;
  base: string | undefined;
  conversion: string | undefined;
  startDate: string;
  endDate: string;
}
export const useDownloadPdf = ({
  amount,
  base,
  conversion,
  startDate,
  endDate,
}: IPdf) => {
  let succesDownload = false;

  fetch(API_BACK_HISTORIC_PDF, {
    method: "POST",
    body: JSON.stringify({ amount, base, conversion, startDate, endDate }),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((resp) => resp.json())
    .then((data) => {
      console.log(data);
      return (succesDownload = true);
    })
    .catch((err) => {
      {
        console.log("Bad fetch: ", err.message);
        return succesDownload;
      }
    });

  return succesDownload;
};
