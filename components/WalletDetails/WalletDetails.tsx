import { useContext, useEffect } from "react";
import { useWeb3React } from "@web3-react/core";
import WalletDetailsContext from "../WalletDetailsContext";
import Popup from "../Popup/Popup";
import styles from "./WalletDetails.module.scss";

import { injected, getBalance } from "./connectors";

const WalletDetails = () => {
  const { active, account, activate, deactivate, chainId } = useWeb3React();
  const { setCheckWallet, balance, setBalance } =
    useContext(WalletDetailsContext);

  const onClose = () => setCheckWallet(false);

  async function connect() {
    try {
      await activate(injected);
    } catch (ex) {
      console.log(ex);
    }
  }

  async function disconnect() {
    try {
      deactivate();
      setCheckWallet(false);
    } catch (ex) {
      console.log(ex);
    }
  }

  const getAddress = () => {
    return `${account?.slice(0, 4)}...${account?.slice(-4)}`;
  };

  useEffect(() => {
    if (active)
      (async () => {
        const tempBalance: string = await getBalance(account!);
        setBalance(tempBalance);
      })();
  }, [active, account, setBalance]);

  return (
    <Popup title="Wallet details" onClose={onClose}>
      {!active ? (
        <>
          <p className={styles.error}>
            Wallet is not connected. Please click &quot;Connect&quot; button
            below.
          </p>
          <br />
          <div className={styles.actions}>
            <button
              className={[styles.button, styles.primaryButton].join(" ")}
              onClick={connect}
            >
              Connect
            </button>
            <button
              className={[styles.button, styles.secondaryButton].join(" ")}
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </>
      ) : (
        <div className={styles.table}>
          <div className={styles.item}>
            <div className={styles.key}>Address</div>
            <div className={styles.value}>{getAddress()}</div>
          </div>
          <div className={styles.item}>
            <div className={styles.key}>Chain ID</div>
            <div className={styles.value}>{chainId}</div>
          </div>
          <div className={styles.item}>
            <div className={styles.key}>Balance</div>
            <div className={styles.value}>{balance}</div>
          </div>
          <br />
          <button
            className={[styles.button, styles.warning].join(" ")}
            onClick={disconnect}
          >
            Disconnect
          </button>
        </div>
      )}
    </Popup>
  );
};

export default WalletDetails;
