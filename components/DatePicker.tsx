import * as React from "react";
import { TextField } from "@mui/material";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";

interface IDateFilter {
  title: string;
  date: string;
  setDate: any;
}

const DatePicker = ({ title, date, setDate }: IDateFilter) => {
  const handleFilterDate = (newValue: Date | null) => {
    setDate(newValue);
  };

  return (
    <DesktopDatePicker
      views={["day", "month", "year"]}
      label={title}
      inputFormat="yyyy/MM/dd"
      value={date}
      onChange={handleFilterDate}
      renderInput={(params: JSX.IntrinsicAttributes) => (
        <TextField {...params} helperText={null} />
      )}
    />
  );
};

export default DatePicker;