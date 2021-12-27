import { useState, useEffect, ChangeEvent } from "react";
import type { NextPage } from "next";
import Image from "next/image";
import styles from "./Converter.module.scss";

const Converter: NextPage = () => {
  const [values, setValues] = useState<number[]>([1, 3]);
  const [coins, setCoins] = useState<Coin[]>([
    {
      symbol: "NEP",
      name: "Neptune Mutual",
      logo: "https://s2.coinmarketcap.com/static/img/coins/64x64/1.png",
      conversion: 1,
    },
    {
      symbol: "BUSD",
      name: "Binance USD",
      logo: "https://s2.coinmarketcap.com/static/img/coins/64x64/4687.png",
      conversion: 3,
    },
  ]);

  const reverseTokens = () => {
    setCoins([...coins.reverse()]);
    setValues([...values.reverse()]);
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    values[index] = parseFloat(e.target.value);
    values[index === 1 ? 0 : 1] = parseFloat(
      (
        (coins[index === 1 ? 0 : 1].conversion / coins[index].conversion) *
        values[index]
      ).toFixed(2)
    );
    setValues([...values]);
  };

  const onBlur = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    if (e.target.value.trim().length === 0) {
      values[index] = 1;
      setValues([...values]);
    }
  };

  return (
    <div className={styles.container}>
      {coins.map(({ symbol, name, logo }, index) => (
        <div key={symbol} className={styles.token}>
          <Image
            src={logo}
            alt={`${name} logo`}
            width={32}
            height={32}
            className={styles.logo}
          />
          <div className={styles.coinDetails}>
            <p className={styles.symbol}>{symbol}</p>
            <p className={styles.name}>{name}</p>
          </div>
          <div className={styles.input}>
            <input
              type="number"
              value={values[index]}
              pattern="/^-?d+.?d*$/"
              onChange={(e) => onChange(e, index)}
              onBlur={(e) => onBlur(e, index)}
            />
          </div>
        </div>
      ))}
      <div className={styles.swap}>
        <Image
          src="https://s2.coinmarketcap.com/static/cloud/img/converter.png?_=15bcb56"
          alt="swap icon"
          width={32}
          height={32}
          onClick={reverseTokens}
        />
      </div>
    </div>
  );
};

export default Converter;
