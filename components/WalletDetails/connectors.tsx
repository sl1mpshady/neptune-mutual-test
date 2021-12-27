import { InjectedConnector } from "@web3-react/injected-connector";
import Web3 from "web3";

export const injected: InjectedConnector = new InjectedConnector({
  supportedChainIds: [97],
});

export const getBalance: (address: string) => Promise<string> = async (
  address: string
) => {
  const testnet = "https://data-seed-prebsc-1-s1.binance.org:8545/";

  const web3 = new Web3(new Web3.providers.HttpProvider(testnet));
  const balance = await web3.eth.getBalance(address);
  return web3.utils.fromWei(balance);
};
