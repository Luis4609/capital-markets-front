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

const CurrencyData = ({currencyTypeChange, amount, setAmount, disable, selected, setSelected}: CurrencyProps) => {
  //manejador para recoger la selección de divisa de origen
  const handleChange = (e: { target: { value: any } }) => {
    setSelected(e.target.value);
  };

  return (
    <div>
      <h5>Currency {currencyTypeChange}</h5>

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
    </div>
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
