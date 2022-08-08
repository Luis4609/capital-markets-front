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

const CurrencyData = (props: CurrencyProps) => {
  const options = [
    { value: "", text: "--Elige una divisa--" },
    { value: "USD", text: "USD" },
    { value: "EUR", text: "Euro" },
    { value: "GBP", text: "British pound" },
    { value: "JPY", text: "Yen" }
  ];

  //manejador para recoger la selección de divisa de origen
  const handleChange = (e: { target: { value: any } }) => {
    props.setSelected(e.target.value);
  };

  return (
    <div>
      <h5>Divisa de {props.currencyTypeChange}</h5>

      <input
        aria-label="amount"
        type="number"
        value={props.amount}
        onChange={(e) => props.setAmount(parseFloat(e.target.value))}
        disabled={props.disable}
        className={styles.currencyinput}
        required
      />

      <select
        title="currencies-select"
        name="currencies"
        id="currencies"
        onChange={handleChange}
        value={props.selected}
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

export default CurrencyData;
