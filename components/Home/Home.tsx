import { useState } from "react";
import type { NextPage } from "next";
import Image from "next/image";
import { useWeb3React } from "@web3-react/core";
import WalletDetailsContext from "../WalletDetailsContext";
import Converter from "../Converter/Converter";
import WalletDetails from "../WalletDetails/WalletDetails";
import styles from "./Home.module.scss";

const Home: NextPage = () => {
  const [checkWallet, setCheckWallet] = useState<boolean>(false);
  const [balance, setBalance] = useState<string>("0");

  return (
    <WalletDetailsContext.Provider
      value={{ checkWallet, setCheckWallet, balance, setBalance }}
    >
      <div className={styles.container}>
        <Image
          src="https://neptunemutual.com/neptune-mutual.svg"
          width={330}
          height={64}
          alt="Neptune Mutual"
        />
        <div className={styles.converterContainer}>
          <Converter />
        </div>
        <div className={styles.checkWalletDetails}>
          <button onClick={() => setCheckWallet(true)}>
            Check wallet details
          </button>
        </div>
        {checkWallet && <WalletDetails />}
      </div>
    </WalletDetailsContext.Provider>
  );
};

export default Home;
