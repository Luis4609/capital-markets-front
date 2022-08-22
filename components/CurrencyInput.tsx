import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

import { currencies } from "../utils/currencies";

interface CurrencyInputProps {
  label: string;
  currency: string;
  handleCurrencyChange?: any;
}

function CurrencyInput({
  label,
  currency,
  handleCurrencyChange,
}: CurrencyInputProps) {
  return (
    <FormControl variant="outlined" sx={{ m: 1, width: 200 }} size="medium">
      <InputLabel id="demo-simple-select-standard-label">{label}</InputLabel>
      <Select
        labelId="demo-simple-select-standard-label"
        id={`currency-${label}`}
        value={currency}
        onChange={handleCurrencyChange}
        label="from"
      >
        {currencies.map((option) => (
          <MenuItem key={option.code} value={option.code}>
            {option.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default CurrencyInput;
