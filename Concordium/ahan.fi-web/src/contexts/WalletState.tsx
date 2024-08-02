import React, { useContext } from "react";
import { WalletConnection, WalletConnectionProps } from "@concordium/react-components";

export interface WalletContextType {
  walletConnectionProps: WalletConnectionProps;
  connection: WalletConnection | undefined;
  connect: (() => void) | undefined;
  setConnection: (connection: WalletConnection | undefined) => void;
  connectError: string;
  isConnecting: boolean;
  account: string | undefined;
  children: React.ReactNode;
  genesisHash: string | undefined;
}

const WalletContext = React.createContext<WalletContextType | null>(null);

export const useWallet = () => {
  return (useContext(WalletContext) ?? {}) as WalletContextType;
};

const WalletState: React.FC<WalletContextType> = (props) => {
  return <WalletContext.Provider value={props}>{props.children}</WalletContext.Provider>;
};

export default WalletState;
