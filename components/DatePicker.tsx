import { TextField } from "@mui/material";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { format } from "date-fns";

interface IDateFilter {
  label: string;
  date: string;
  handleDateChange: any;
}

const DatePicker = ({ label, date, handleDateChange }: IDateFilter) => {
  const ACTUAL_DATE = format(new Date(), "yyyy-MM-dd");

  return (
    <DesktopDatePicker
      views={["day", "month", "year"]}
      label={label}
      inputFormat="yyyy/MM/dd"
      value={date}
      maxDate={ACTUAL_DATE}
      onChange={handleDateChange}
      renderInput={(params: JSX.IntrinsicAttributes) => (
        <TextField {...params} helperText={null} />
      )}
    />
  );
};

export default DatePicker;
