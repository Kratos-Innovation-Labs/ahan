import React from "react";
import { useWallet } from "../../contexts/WalletState";
import WalletOption from "./WalletOption";
import { BROWSER_WALLET, WALLET_CONNECT } from "../../config";
import concordiumIcon from "../../assets/concordium-browser-wallet.png";
import walletconnectIcon from "../../assets/walletconnect-logo.png";

import "./Web3Wallet.scss";

const Web3Wallet: React.FC = () => {
  const wallet = useWallet();
  const { walletConnectionProps, genesisHash } = wallet || {};
  const { network } = walletConnectionProps || {};

  return (
    <div className="web3-wallet">
      <div className="container">
        <h2 className="heading">Connect Your Wallet</h2>

        <WalletOption
          connectorType={BROWSER_WALLET}
          connection={wallet?.connection}
          connectorName="Concordium Browser Wallet"
          connectorLogo={concordiumIcon}
          connectorDescription="The Concordium Wallet for Web is supported by all Chromium browsers such as Brave, Opera, Edge, and Chrome."
          {...wallet?.walletConnectionProps}
        />

        <WalletOption
          connectorType={WALLET_CONNECT}
          connection={wallet?.connection}
          connectorName="WalletConnect"
          connectorLogo={walletconnectIcon}
          connectorDescription="WalletConnect gives developers the tools to build user experiences that make digital
        ownership effortless, intuitive, and secure."
          {...wallet?.walletConnectionProps}
        />

        <button className="connect-button" onClick={wallet?.connect}>
          Connect Wallet
        </button>
        <div className="consent-message">
          By clicking Connect Button you agree to the terms and conditions of the Ahan Staking
          Protocol.
        </div>

        {genesisHash && genesisHash !== network.genesisHash && (
          <div className="error-wrapper">
            Error: Unexpected genesis hash: Please ensure that your wallet is connected to the
            network <code>{network.name}</code>.
          </div>
        )}

        {wallet?.connectError && <div className="error-wrapper">{wallet?.connectError}</div>}
      </div>
    </div>
  );
};

export default Web3Wallet;
