import { TextField } from "@mui/material";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";

interface IDateFilter {
  label: string;
  date: string;
  handleDateChange: any;
}

const DatePicker = ({ label, date, handleDateChange }: IDateFilter) => {
  const ACTUAL_DATE = (new Date().toLocaleDateString, "yyyy-MM-dd");

  return (
    <DesktopDatePicker
      views={["day", "month", "year"]}
      label={label}
      inputFormat="dd/MM/yyyy"
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
