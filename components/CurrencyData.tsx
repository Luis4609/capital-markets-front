import { Dispatch, SetStateAction } from "react";
import styles from "../styles/CurrencyData.module.css";

interface CurrencyProps {
  currencyTypeChange: string;
  disable: boolean;
  amount: number;
  setAmount: Dispatch<SetStateAction<number>>;
  selected: string;
  setSelected: Dispatch<SetStateAction<string>>;
}
const options = [
  { value: "", text: "--Choose a currency--" },
  { value: "USD", text: "US Dolar" },
  { value: "EUR", text: "Euro" },
  { value: "GBP", text: "British pound" },
  { value: "JPY", text: "Yen" },
];

const CurrencyData = ({
  currencyTypeChange,
  amount,
  setAmount,
  disable,
  selected,
  setSelected,
}: CurrencyProps) => {
  //manejador para recoger la selección de divisa de origen
  const handleChange = (e: { target: { value: any } }) => {
    setSelected(e.target.value);
  };

  return (
    <>
      <h4>{currencyTypeChange}</h4>

      <div className={styles.converter}>
        <input
          aria-label="amount"
          type="number"
          value={amount}
          onChange={(e) => setAmount(parseFloat(e.target.value))}
          disabled={disable}
          className={styles.currencyinput}
          required
        />

        <select
          title="currencies-select"
          name="currencies"
          id="currencies"
          onChange={handleChange}
          value={selected}
          className={styles.currencyselect}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.text}
            </option>
          ))}
        </select>

        {/* <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Age</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={age}
          label="Age"
          onChange={handleChange}
        >
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl> */}
      </div>
    </>
  );
};

export async function getStaticProps() {
  const res = await fetch("http://localhost:8080/currencies/list-currencies");
  const currencies = await res.json();

  return {
    props: {
      currencies,
    },
  };
}

export default CurrencyData;
