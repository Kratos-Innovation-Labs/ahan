import * as ConcordiumLiquidStaking from "../generated/concordium_staking";
import * as EUROe from "../generated/module_euroe_stablecoin";
import { WalletConnection, typeSchemaFromBase64 } from "@concordium/react-components";
import {
  AccountAddress,
  AccountTransactionType,
  CcdAmount,
  ConcordiumGRPCWebClient,
  Energy,
  EntrypointName,
  Parameter,
  ReceiveName,
  TransactionHash,
  serializeTypeValue,
  toBuffer,
} from "@concordium/web-sdk";
import { /* contractUpdatePayload, */ submitSponsoredTx, throwCallError } from ".";
import { Buffer } from "buffer";
import {
  CONTRACT_ADDRESS,
  EPSILON_ENERGY,
  NODE,
  PORT,
  CONTRACT_NAME,
  EUROE_CONTRACT_ADDRESS,
  TRANSFER_SCHEMA,
  DAY_IN_SECONDS,
  SERIALIZATION_HELPER_SCHEMA_PERMIT_MESSAGE,
  BASE64_UNSTAKE_PARAMETER_SCHEMA,
} from "../config";

const grpc = new ConcordiumGRPCWebClient(NODE, PORT);
const contract = ConcordiumLiquidStaking.createUnchecked(grpc, CONTRACT_ADDRESS);

export const CONCODIUM_LIQUID_STAKING = contract;

export const stake = async (
  connection: WalletConnection,
  accountAddress: AccountAddress.Type,
  amount: bigint
): Promise<TransactionHash.Type> => {
  // construct
  const transferParameter = [
    {
      from: {
        type: "Account",
        content: accountAddress,
      },
      to: {
        type: "Contract",
        content: [CONTRACT_ADDRESS, "stake"],
      },
      amount,
      data: "0000",
      token_id: "",
    },
  ] as EUROe.TransferParameter;

  /* const dryRunResult = await EuroE.dryRunTransfer(euroe, transferParameter);
  

  if (!dryRunResult || dryRunResult.tag === "failure" || !dryRunResult.returnValue) {
    const parsedErrorCode = EuroE.parseErrorMessageTransfer(dryRunResult)?.type;
    throwCallError(
      parsedErrorCode,
      EuroE.contractName.value,
      "transfer",
      EUROE_CONTRACT_ADDRESS.index
    );
  } */

  const maxContractExecutionEnergy = 30000n + EPSILON_ENERGY;
  const payload = {
    address: EUROE_CONTRACT_ADDRESS,
    receiveName: ReceiveName.create(EUROe.contractName, EntrypointName.fromString("transfer")),
    amount: CcdAmount.zero(),
    maxContractExecutionEnergy: Energy.create(maxContractExecutionEnergy),
  };

  return connection
    .signAndSendTransaction(
      AccountAddress.toBase58(accountAddress),
      AccountTransactionType.Update,
      payload,
      EUROe.createTransferParameterWebWallet(transferParameter)
    )
    .then(TransactionHash.fromHexString);

  // construct parameter for transfer
  /* const transferParameter = [
    {
      from: {
        Account: [accountAddress.address],
      },
      to: {
        Contract: [{ index: Number(CONTRACT_ADDRESS.index), subindex: 0 }, "stake"],
      },
      amount: amount.toString(),
      data: [0, 0, 0, 0],
      token_id: "",
    },
  ]; */

  /* 
  const dryRunResult = await EuroE.dryRunTransfer(euroe, transferParameter);
  
  if (!dryRunResult || dryRunResult.tag === "failure" || !dryRunResult.returnValue) {
    const parsedErrorCode = EuroE.parseErrorMessageTransfer(dryRunResult)?.type;
    throwCallError(
      parsedErrorCode,
      EuroE.contractName.value,
      "transfer",
      EUROE_CONTRACT_ADDRESS.index
    );
  } */

  /* const nonce = await getUserNonce(accountAddress.address);
  const expiryTimestamp = getExpiryTimeSignature();
  const serializedMessage = generateStakeMessage(transferParameter, nonce, expiryTimestamp);

  // request for signature
  const permitSignature = await connection.signMessage(accountAddress.address, {
    type: "BinaryMessage",
    // @ts-ignore
    value: Buffer.from(serializedMessage.buffer),
    schema: typeSchemaFromBase64(SERIALIZATION_HELPER_SCHEMA_PERMIT_MESSAGE),
  });

  // submit tx
  return submitSponsoredTx("stake", {
      signer: accountAddress,
      nonce,
      signature: permitSignature[0][0],
      expiry_timestamp: expiryTimestamp,
      token_id: "",
      token_amount: amount.toString(),
  })
    .then((txHash) => txHash)
    .catch((err) => {
      throw Error(err.response?.data);
    }); */
};

export const unstake = async (
  connection: WalletConnection,
  accountAddress: AccountAddress.Type,
  unstakeAmount: bigint
): Promise<string> => {
  /* const dryRunResult = await ConcordiumLiquidStaking.dryRunUnstake(contract, Parameter.empty());

  if (!dryRunResult || dryRunResult.tag === "failure" || !dryRunResult.returnValue) {
    const parsedErrorCode = ConcordiumLiquidStaking.parseErrorMessageUnstake(dryRunResult)?.type;
    throwCallError(parsedErrorCode, CONTRACT_NAME.value, "unstake", CONTRACT_ADDRESS.index);
  } */

  const unstake = {
    amount: unstakeAmount.toString(),
  };

  const payload = serializeTypeValue(unstake, toBuffer(BASE64_UNSTAKE_PARAMETER_SCHEMA, "base64"));
  const nonce = await getUserNonce(accountAddress.address);
  const expiryTimestamp = getExpiryTimeSignature();
  const serializedMessage = generateMessage(
    nonce,
    "unstake",
    expiryTimestamp,
    Array.from(payload.buffer)
  );

  // request for signature
  const permitSignature = await connection.signMessage(accountAddress.address, {
    type: "BinaryMessage",
    // @ts-ignore
    value: Buffer.from(serializedMessage.buffer),
    schema: typeSchemaFromBase64(SERIALIZATION_HELPER_SCHEMA_PERMIT_MESSAGE),
  });

  // submit tx
  return submitSponsoredTx("unstake", {
    signer: accountAddress,
    nonce,
    signature: permitSignature[0][0],
    expiry_timestamp: expiryTimestamp,
    token_amount: unstakeAmount.toString(),
  })
    .then((txHash) => {
      return txHash;
    })
    .catch((err) => {
      throw Error(`Unable to submit unstake: ${err.response?.data?.slice(0, 80)}....`);
    });
};

export const claimRewards = async (
  connection: WalletConnection,
  accountAddress: AccountAddress.Type
) => {
  /* const dryRunResult = await ConcordiumLiquidStaking.dryRunClaimRewards(
    contract,
    Parameter.empty()
  );

  if (!dryRunResult || dryRunResult.tag === "failure" || !dryRunResult.returnValue) {
    const parsedErrorCode =
      ConcordiumLiquidStaking.parseErrorMessageClaimRewards(dryRunResult)?.type;
    throwCallError(parsedErrorCode, CONTRACT_NAME.value, "claimRewards", CONTRACT_ADDRESS.index);
  } */

  const nonce = await getUserNonce(accountAddress.address);
  const expiryTimestamp = getExpiryTimeSignature();
  const serializedMessage = generateMessage(nonce, "claimRewards", expiryTimestamp, [0, 0, 0, 0]);

  // request for signature
  const permitSignature = await connection.signMessage(accountAddress.address, {
    type: "BinaryMessage",
    // @ts-ignore
    value: Buffer.from(serializedMessage.buffer),
    schema: typeSchemaFromBase64(SERIALIZATION_HELPER_SCHEMA_PERMIT_MESSAGE),
  });

  // submit tx
  return submitSponsoredTx("claim_rewards", {
    signer: accountAddress.address,
    nonce,
    signature: permitSignature[0][0],
    expiry_timestamp: expiryTimestamp,
  })
    .then((txHash) => {
      return txHash;
    })
    .catch((err) => {
      throw Error(`Unable to submit claim_rewards: ${err.response?.data?.slice(0, 80)}....`);
    });
};

export const view = async () => {
  const dryRunResult = await ConcordiumLiquidStaking.dryRunView(contract, Parameter.empty());
  if (!dryRunResult || dryRunResult.tag === "failure")
    throwCallError("ViewResultsFailed", CONTRACT_NAME.value, "view", CONTRACT_ADDRESS.index);
  let parsedReturnValue = ConcordiumLiquidStaking.parseReturnValueView(dryRunResult);

  if (parsedReturnValue === undefined) {
    throw new Error(
      `Deserializing the returnValue from the '${CONTRACT_NAME.value}.view' method of contract '${CONTRACT_ADDRESS.index}' failed`
    );
  }
  return parsedReturnValue;
};

export const getEarnedRewards = async (accountAddress: string) => {
  const dryRunResult = await ConcordiumLiquidStaking.dryRunGetEarnedRewards(
    contract,
    AccountAddress.fromBase58(accountAddress)
  );

  const parseErrorCode =
    ConcordiumLiquidStaking.parseErrorMessageGetEarnedRewards(dryRunResult)?.type;

  if (!dryRunResult || dryRunResult.tag === "failure" || !dryRunResult.returnValue) {
    throwCallError(parseErrorCode, CONTRACT_NAME.value, "getEarnedRewards", CONTRACT_ADDRESS.index);
  }

  let parsedReturnValue = ConcordiumLiquidStaking.parseReturnValueGetEarnedRewards(dryRunResult);
  if (parsedReturnValue === undefined) {
    throw new Error(
      `Deserializing the returnValue from the '${CONTRACT_NAME.value}.getEarnedRewards' method of contract '${CONTRACT_ADDRESS.index}' failed`
    );
  }

  return parsedReturnValue;
};

export const getStakeInfo = async (accountAddress: string) => {
  const dryRunResult = await ConcordiumLiquidStaking.dryRunGetStakeInfo(
    contract,
    AccountAddress.fromBase58(accountAddress)
  );

  const parsedErrorCode = ConcordiumLiquidStaking.parseErrorMessageGetStakeInfo(dryRunResult)?.type;

  if (!dryRunResult || dryRunResult.tag === "failure" || !dryRunResult.returnValue) {
    throwCallError(parsedErrorCode, CONTRACT_NAME.value, "getStakeInfo", CONTRACT_ADDRESS.index);
  }

  let parsedReturnValue = ConcordiumLiquidStaking.parseReturnValueGetStakeInfo(dryRunResult);
  if (parsedReturnValue === undefined) {
    throw new Error(
      `Deserializing the returnValue from the '${CONTRACT_NAME.value}.getStakeInfo' method of contract '${CONTRACT_ADDRESS.index}' failed`
    );
  }
  return parsedReturnValue;
};

export const getUserNonce = async (accountAddress: string) => {
  const dryRunResult = await ConcordiumLiquidStaking.dryRunGetUserNonce(
    contract,
    AccountAddress.fromBase58(accountAddress)
  );
  const parseErrorCode = ConcordiumLiquidStaking.parseErrorMessageGetUserNonce(dryRunResult)?.type;

  if (!dryRunResult || dryRunResult.tag === "failure" || !dryRunResult.returnValue) {
    throwCallError(parseErrorCode, CONTRACT_NAME.value, "getUserNonce", CONTRACT_ADDRESS.index);
  }

  let parsedReturnValue = ConcordiumLiquidStaking.parseReturnValueGetUserNonce(dryRunResult);
  if (parsedReturnValue === undefined) {
    throw new Error(
      `Deserializing the returnValue from the '${CONTRACT_NAME.value}.getUserNonce' method of contract '${CONTRACT_ADDRESS.index}' failed`
    );
  } else {
    return Number(parsedReturnValue);
  }
};

export const getExpiryTimeSignature = () => {
  // Signatures should expire in one day. Add 1 day to the current time.
  const date = new Date();
  date.setTime(date.getTime() + DAY_IN_SECONDS * 1000);

  // RFC 3339 format (e.g. 2030-08-08T05:15:00Z)
  return date.toISOString();
};

export const generateStakeMessage = <T>(transfer: T, nonce: number, expiryTimestamp: string) => {
  const payload = serializeTypeValue(transfer, toBuffer(TRANSFER_SCHEMA, "base64"));

  const message = {
    contract_address: {
      index: Number(EUROE_CONTRACT_ADDRESS.index),
      subindex: 0,
    },
    nonce: Number(nonce),
    timestamp: expiryTimestamp,
    entry_point: "transfer",
    payload: Array.from(payload.buffer),
  };

  return serializeTypeValue(
    message,
    toBuffer(SERIALIZATION_HELPER_SCHEMA_PERMIT_MESSAGE, "base64")
  );
};

export const generateMessage = (
  nonce: number,
  entry_point: string,
  expiryTimestamp: string,
  payload: number[]
) => {
  const message = {
    contract_address: {
      index: Number(CONTRACT_ADDRESS.index),
      subindex: 0,
    },
    nonce: Number(nonce),
    timestamp: expiryTimestamp,
    entry_point,
    payload,
  };

  return serializeTypeValue(
    message,
    toBuffer(SERIALIZATION_HELPER_SCHEMA_PERMIT_MESSAGE, "base64")
  );
};
