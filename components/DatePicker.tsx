import * as React from "react";
import { Dispatch, SetStateAction } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { TextField } from "@mui/material";

interface IDateFilter {
  title: string;
  date: string;
  setDate: any;
}

const DatePicker = ({ title, date, setDate }: IDateFilter) => {
  const [value, setValue] = React.useState<Date | null>();

  const handleChange = (newValue: Date | null) => {
    setValue(newValue);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DesktopDatePicker
        label={title}
        inputFormat="yyyy/MM/dd"
        value={date}
        onChange={handleChange}
        renderInput={(params: JSX.IntrinsicAttributes) => (
          <TextField {...params} />
        )}
      />
    </LocalizationProvider>
  );
};

export default DatePicker;
