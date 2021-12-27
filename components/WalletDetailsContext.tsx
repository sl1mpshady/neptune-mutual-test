import { createContext } from "react";

export default createContext({
  balance: "0",
  setBalance: (balance: string) => {},
  checkWallet: false,
  setCheckWallet: (value: boolean) => {},
});
