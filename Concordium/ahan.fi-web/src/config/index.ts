import {
  CONCORDIUM_WALLET_CONNECT_PROJECT_ID,
  WalletConnectConnector,
  ephemeralConnectorType,
  BrowserWalletConnector,
} from "@concordium/react-components";
import { ContractAddress, ContractName } from "@concordium/web-sdk";
import { SignClientTypes } from "@walletconnect/types";

const WALLET_CONNECT_OPTS: SignClientTypes.Options = {
  projectId: CONCORDIUM_WALLET_CONNECT_PROJECT_ID,
  metadata: {
    name: "Concordium liquid staking",
    description: "Concordium liquid staking",
    url: "#",
    icons: ["https://walletconnect.com/walletconnect-logo.png"],
  },
};

export const BROWSER_WALLET = ephemeralConnectorType(BrowserWalletConnector.create);

export const WALLET_CONNECT = ephemeralConnectorType(
  WalletConnectConnector.create.bind(undefined, WALLET_CONNECT_OPTS)
);

export const CONTRACT_NAME = ContractName.fromString("concordium_staking");

export const CONTRACT_ADDRESS = ContractAddress.create(9319);

export const EUROE_CONTRACT_ADDRESS = ContractAddress.create(7260);

export const NODE = "https://grpc.testnet.concordium.com";

/// The grpc port
export const PORT = 20000;

// Before submitting a transaction we simulate/dry-run the transaction to get an
// estimate of the energy needed for executing the transaction. In addition, we
// allow an additional small amount of energy `EPSILON_ENERGY` to be consumed by
// the transaction to cover small variations (e.g. changes to the smart contract
// state) caused by transactions that have been executed meanwhile.
export const EPSILON_ENERGY = 200n;

export const MULTIPLIER = 1000_000;

export const APR_DENOMINATOR = 1_000_000;

export const DAY_IN_SECONDS = 86400;

export const API_ENDPOINT = "https://concordium-liquid-staking-api.hashlabs.cloud";

export const TRANSFER_SCHEMA =
  "EAEUAAUAAAAIAAAAdG9rZW5faWQdAAYAAABhbW91bnQbJQAAAAQAAABmcm9tFQIAAAAHAAAAQWNjb3VudAEBAAAACwgAAABDb250cmFjdAEBAAAADAIAAAB0bxUCAAAABwAAAEFjY291bnQBAQAAAAsIAAAAQ29udHJhY3QBAgAAAAwWAQQAAABkYXRhEAEC";

export const SERIALIZATION_HELPER_SCHEMA_PERMIT_MESSAGE =
  "FAAFAAAAEAAAAGNvbnRyYWN0X2FkZHJlc3MMBQAAAG5vbmNlBQkAAAB0aW1lc3RhbXANCwAAAGVudHJ5X3BvaW50FgEHAAAAcGF5bG9hZBABAg==";

export const BASE64_UNSTAKE_PARAMETER_SCHEMA = "FAABAAAABgAAAGFtb3VudBslAAAA";
