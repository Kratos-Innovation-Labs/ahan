import React from "react";
import {
  ConnectorType,
  WalletConnection,
  WalletConnectionProps,
  useWalletConnectorSelector,
} from "@concordium/react-components";

interface WalletOptionProps extends WalletConnectionProps {
  connection: WalletConnection | undefined;
  connectorType: ConnectorType;
  connectorName: string;
  connectorLogo: string;
  connectorDescription: string;
}

const WalletOption: React.FC<WalletOptionProps> = (props) => {
  let { connection, connectorType, connectorName, connectorLogo, connectorDescription } = props;
  const { isSelected, isDisabled, select } = useWalletConnectorSelector(
    connectorType,
    connection,
    props
  );
  return (
    <button
      className={isSelected ? "wallet-option-selected" : "wallet-option"}
      onClick={select}
      disabled={isDisabled}
    >
      <img className="wallet-option-image" src={connectorLogo} alt={connectorName} />
      <div>
        <div className="connector-name">{connectorName}</div>
        <div className="wallet-description">{connectorDescription}</div>
      </div>
    </button>
  );
};

export default WalletOption;
