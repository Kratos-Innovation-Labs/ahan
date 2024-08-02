/* eslint-disable no-case-declarations */
// @ts-nocheck
import * as SDK from "@concordium/web-sdk";
/** The reference of the smart contract module supported by the provided client. */
export const moduleReference: SDK.ModuleReference.Type =
  /*#__PURE__*/ SDK.ModuleReference.fromHexString(
    "618c414da7c14ee9cd8eb3f694ee4e9c3e5a98e4e6e4df7f1e61ac396ef179c3"
  );
/** Name of the smart contract supported by this client. */
export const contractName: SDK.ContractName.Type =
  /*#__PURE__*/ SDK.ContractName.fromStringUnchecked("concordium_staking");

/** Smart contract client for a contract instance on chain. */
class ConcordiumStakingContract {
  /** Having a private field prevents similar structured objects to be considered the same type (similar to nominal typing). */
  private __nominal = true;
  /** The gRPC connection used by this client. */
  public readonly grpcClient: SDK.ConcordiumGRPCClient;
  /** The contract address used by this client. */
  public readonly contractAddress: SDK.ContractAddress.Type;
  /** Generic contract client used internally. */
  public readonly genericContract: SDK.Contract;

  constructor(
    grpcClient: SDK.ConcordiumGRPCClient,
    contractAddress: SDK.ContractAddress.Type,
    genericContract: SDK.Contract
  ) {
    this.grpcClient = grpcClient;
    this.contractAddress = contractAddress;
    this.genericContract = genericContract;
  }
}

/** Smart contract client for a contract instance on chain. */
export type Type = ConcordiumStakingContract;

/**
 * Construct an instance of `ConcordiumStakingContract` for interacting with a 'concordium_staking' contract on chain.
 * Checking the information instance on chain.
 * @param {SDK.ConcordiumGRPCClient} grpcClient - The client used for contract invocations and updates.
 * @param {SDK.ContractAddress.Type} contractAddress - Address of the contract instance.
 * @param {SDK.BlockHash.Type} [blockHash] - Hash of the block to check the information at. When not provided the last finalized block is used.
 * @throws If failing to communicate with the concordium node or if any of the checks fails.
 * @returns {ConcordiumStakingContract}
 */
export async function create(
  grpcClient: SDK.ConcordiumGRPCClient,
  contractAddress: SDK.ContractAddress.Type,
  blockHash?: SDK.BlockHash.Type
): Promise<ConcordiumStakingContract> {
  const genericContract = new SDK.Contract(grpcClient, contractAddress, contractName);
  await genericContract.checkOnChain({ moduleReference: moduleReference, blockHash: blockHash });
  return new ConcordiumStakingContract(grpcClient, contractAddress, genericContract);
}

/**
 * Construct the `ConcordiumStakingContract` for interacting with a 'concordium_staking' contract on chain.
 * Without checking the instance information on chain.
 * @param {SDK.ConcordiumGRPCClient} grpcClient - The client used for contract invocations and updates.
 * @param {SDK.ContractAddress.Type} contractAddress - Address of the contract instance.
 * @returns {ConcordiumStakingContract}
 */
export function createUnchecked(
  grpcClient: SDK.ConcordiumGRPCClient,
  contractAddress: SDK.ContractAddress.Type
): ConcordiumStakingContract {
  const genericContract = new SDK.Contract(grpcClient, contractAddress, contractName);
  return new ConcordiumStakingContract(grpcClient, contractAddress, genericContract);
}

/**
 * Check if the smart contract instance exists on the blockchain and whether it uses a matching contract name and module reference.
 * @param {ConcordiumStakingContract} contractClient The client for a 'concordium_staking' smart contract instance on chain.
 * @param {SDK.BlockHash.Type} [blockHash] A optional block hash to use for checking information on chain, if not provided the last finalized will be used.
 * @throws {SDK.RpcError} If failing to communicate with the concordium node or if any of the checks fails.
 */
export function checkOnChain(
  contractClient: ConcordiumStakingContract,
  blockHash?: SDK.BlockHash.Type
): Promise<void> {
  return contractClient.genericContract.checkOnChain({
    moduleReference: moduleReference,
    blockHash: blockHash,
  });
}
/** Parameter type  used in update transaction for 'onReceivingCIS2' entrypoint of the 'concordium_staking' contract. */
export type OnReceivingCIS2Parameter = SDK.Parameter.Type;

/**
 * Send an update-contract transaction to the 'onReceivingCIS2' entrypoint of the 'concordium_staking' contract.
 * @param {ConcordiumStakingContract} contractClient The client for a 'concordium_staking' smart contract instance on chain.
 * @param {SDK.ContractTransactionMetadata} transactionMetadata - Metadata related to constructing a transaction for a smart contract.
 * @param {OnReceivingCIS2Parameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.AccountSigner} signer - The signer of the update contract transaction.
 * @throws If the entrypoint is not successfully invoked.
 * @returns {SDK.TransactionHash.Type} Hash of the transaction.
 */
export function sendOnReceivingCIS2(
  contractClient: ConcordiumStakingContract,
  transactionMetadata: SDK.ContractTransactionMetadata,
  parameter: OnReceivingCIS2Parameter,
  signer: SDK.AccountSigner
): Promise<SDK.TransactionHash.Type> {
  return contractClient.genericContract.createAndSendUpdateTransaction(
    SDK.EntrypointName.fromStringUnchecked("onReceivingCIS2"),
    SDK.Parameter.toBuffer,
    transactionMetadata,
    parameter,
    signer
  );
}

/**
 * Dry-run an update-contract transaction to the 'onReceivingCIS2' entrypoint of the 'concordium_staking' contract.
 * @param {ConcordiumStakingContract} contractClient The client for a 'concordium_staking' smart contract instance on chain.
 * @param {SDK.ContractAddress.Type | SDK.AccountAddress.Type} invokeMetadata - The address of the account or contract which is invoking this transaction.
 * @param {OnReceivingCIS2Parameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.BlockHash.Type} [blockHash] - Optional block hash allowing for dry-running the transaction at the end of a specific block.
 * @throws {SDK.RpcError} If failing to communicate with the concordium node or if any of the checks fails.
 * @returns {SDK.InvokeContractResult} The result of invoking the smart contract instance.
 */
export function dryRunOnReceivingCIS2(
  contractClient: ConcordiumStakingContract,
  parameter: OnReceivingCIS2Parameter,
  invokeMetadata: SDK.ContractInvokeMetadata = {},
  blockHash?: SDK.BlockHash.Type
): Promise<SDK.InvokeContractResult> {
  return contractClient.genericContract.dryRun.invokeMethod(
    SDK.EntrypointName.fromStringUnchecked("onReceivingCIS2"),
    invokeMetadata,
    SDK.Parameter.toBuffer,
    parameter,
    blockHash
  );
}

/** Error message for dry-running update transaction for 'onReceivingCIS2' entrypoint of the 'concordium_staking' contract. */
export type ErrorMessageOnReceivingCIS2 =
  | { type: "ParseParams" }
  | { type: "UnAuthorized" }
  | { type: "InvalidStakeAmount" }
  | { type: "NoStakeFound" }
  | { type: "OnlyAccount" }
  | { type: "OnlyAdmin" }
  | { type: "InvokeContractError" }
  | { type: "ParseResult" }
  | { type: "InvalidResponse" }
  | { type: "LogFull" }
  | { type: "LogMalformed" }
  | { type: "FailedUpgradeMissingModule" }
  | { type: "FailedUpgradeMissingContract" }
  | { type: "FailedUpgradeUnsupportedModuleVersion" }
  | { type: "ContractPaused" }
  | { type: "InsufficientFunds" }
  | { type: "NotTokenContract" }
  | { type: "MissingAccount" }
  | { type: "MalformedData" }
  | { type: "WrongSignature" }
  | { type: "NonceMismatch" }
  | { type: "WrongContract" }
  | { type: "WrongEntryPoint" }
  | { type: "Expired" }
  | { type: "InvalidUnstakeAmount" };

/**
 * Get and parse the error message from dry-running update transaction for 'onReceivingCIS2' entrypoint of the 'concordium_staking' contract.
 * Returns undefined if the result is not a failure.
 * @param {SDK.InvokeContractResult} invokeResult The result from dry-running the transaction.
 * @returns {ErrorMessageOnReceivingCIS2 | undefined} The structured error message or undefined if result was not a failure or failed for other reason than contract rejectedReceive.
 */
export function parseErrorMessageOnReceivingCIS2(
  invokeResult: SDK.InvokeContractResult
): ErrorMessageOnReceivingCIS2 | undefined {
  if (invokeResult.tag !== "failure" || invokeResult.reason.tag !== "RejectedReceive") {
    return undefined;
  }

  if (invokeResult.returnValue === undefined) {
    throw new Error(
      "Unexpected missing 'returnValue' in result of invocation. Client expected a V1 smart contract."
    );
  }

  const schemaJson = <
    | { ParseParams: [] }
    | { UnAuthorized: [] }
    | { InvalidStakeAmount: [] }
    | { NoStakeFound: [] }
    | { OnlyAccount: [] }
    | { OnlyAdmin: [] }
    | { InvokeContractError: [] }
    | { ParseResult: [] }
    | { InvalidResponse: [] }
    | { LogFull: [] }
    | { LogMalformed: [] }
    | { FailedUpgradeMissingModule: [] }
    | { FailedUpgradeMissingContract: [] }
    | { FailedUpgradeUnsupportedModuleVersion: [] }
    | { ContractPaused: [] }
    | { InsufficientFunds: [] }
    | { NotTokenContract: [] }
    | { MissingAccount: [] }
    | { MalformedData: [] }
    | { WrongSignature: [] }
    | { NonceMismatch: [] }
    | { WrongContract: [] }
    | { WrongEntryPoint: [] }
    | { Expired: [] }
    | { InvalidUnstakeAmount: [] }
  >SDK.ReturnValue.parseWithSchemaTypeBase64(
    invokeResult.returnValue,
    "FRkAAAALAAAAUGFyc2VQYXJhbXMCDAAAAFVuQXV0aG9yaXplZAISAAAASW52YWxpZFN0YWtlQW1vdW50AgwAAABOb1N0YWtlRm91bmQCCwAAAE9ubHlBY2NvdW50AgkAAABPbmx5QWRtaW4CEwAAAEludm9rZUNvbnRyYWN0RXJyb3ICCwAAAFBhcnNlUmVzdWx0Ag8AAABJbnZhbGlkUmVzcG9uc2UCBwAAAExvZ0Z1bGwCDAAAAExvZ01hbGZvcm1lZAIaAAAARmFpbGVkVXBncmFkZU1pc3NpbmdNb2R1bGUCHAAAAEZhaWxlZFVwZ3JhZGVNaXNzaW5nQ29udHJhY3QCJQAAAEZhaWxlZFVwZ3JhZGVVbnN1cHBvcnRlZE1vZHVsZVZlcnNpb24CDgAAAENvbnRyYWN0UGF1c2VkAhEAAABJbnN1ZmZpY2llbnRGdW5kcwIQAAAATm90VG9rZW5Db250cmFjdAIOAAAATWlzc2luZ0FjY291bnQCDQAAAE1hbGZvcm1lZERhdGECDgAAAFdyb25nU2lnbmF0dXJlAg0AAABOb25jZU1pc21hdGNoAg0AAABXcm9uZ0NvbnRyYWN0Ag8AAABXcm9uZ0VudHJ5UG9pbnQCBwAAAEV4cGlyZWQCFAAAAEludmFsaWRVbnN0YWtlQW1vdW50Ag=="
  );
  let match7:
    | { type: "ParseParams" }
    | { type: "UnAuthorized" }
    | { type: "InvalidStakeAmount" }
    | { type: "NoStakeFound" }
    | { type: "OnlyAccount" }
    | { type: "OnlyAdmin" }
    | { type: "InvokeContractError" }
    | { type: "ParseResult" }
    | { type: "InvalidResponse" }
    | { type: "LogFull" }
    | { type: "LogMalformed" }
    | { type: "FailedUpgradeMissingModule" }
    | { type: "FailedUpgradeMissingContract" }
    | { type: "FailedUpgradeUnsupportedModuleVersion" }
    | { type: "ContractPaused" }
    | { type: "InsufficientFunds" }
    | { type: "NotTokenContract" }
    | { type: "MissingAccount" }
    | { type: "MalformedData" }
    | { type: "WrongSignature" }
    | { type: "NonceMismatch" }
    | { type: "WrongContract" }
    | { type: "WrongEntryPoint" }
    | { type: "Expired" }
    | { type: "InvalidUnstakeAmount" };
  if ("ParseParams" in schemaJson) {
    match7 = {
      type: "ParseParams",
    };
  } else if ("UnAuthorized" in schemaJson) {
    match7 = {
      type: "UnAuthorized",
    };
  } else if ("InvalidStakeAmount" in schemaJson) {
    match7 = {
      type: "InvalidStakeAmount",
    };
  } else if ("NoStakeFound" in schemaJson) {
    match7 = {
      type: "NoStakeFound",
    };
  } else if ("OnlyAccount" in schemaJson) {
    match7 = {
      type: "OnlyAccount",
    };
  } else if ("OnlyAdmin" in schemaJson) {
    match7 = {
      type: "OnlyAdmin",
    };
  } else if ("InvokeContractError" in schemaJson) {
    match7 = {
      type: "InvokeContractError",
    };
  } else if ("ParseResult" in schemaJson) {
    match7 = {
      type: "ParseResult",
    };
  } else if ("InvalidResponse" in schemaJson) {
    match7 = {
      type: "InvalidResponse",
    };
  } else if ("LogFull" in schemaJson) {
    match7 = {
      type: "LogFull",
    };
  } else if ("LogMalformed" in schemaJson) {
    match7 = {
      type: "LogMalformed",
    };
  } else if ("FailedUpgradeMissingModule" in schemaJson) {
    match7 = {
      type: "FailedUpgradeMissingModule",
    };
  } else if ("FailedUpgradeMissingContract" in schemaJson) {
    match7 = {
      type: "FailedUpgradeMissingContract",
    };
  } else if ("FailedUpgradeUnsupportedModuleVersion" in schemaJson) {
    match7 = {
      type: "FailedUpgradeUnsupportedModuleVersion",
    };
  } else if ("ContractPaused" in schemaJson) {
    match7 = {
      type: "ContractPaused",
    };
  } else if ("InsufficientFunds" in schemaJson) {
    match7 = {
      type: "InsufficientFunds",
    };
  } else if ("NotTokenContract" in schemaJson) {
    match7 = {
      type: "NotTokenContract",
    };
  } else if ("MissingAccount" in schemaJson) {
    match7 = {
      type: "MissingAccount",
    };
  } else if ("MalformedData" in schemaJson) {
    match7 = {
      type: "MalformedData",
    };
  } else if ("WrongSignature" in schemaJson) {
    match7 = {
      type: "WrongSignature",
    };
  } else if ("NonceMismatch" in schemaJson) {
    match7 = {
      type: "NonceMismatch",
    };
  } else if ("WrongContract" in schemaJson) {
    match7 = {
      type: "WrongContract",
    };
  } else if ("WrongEntryPoint" in schemaJson) {
    match7 = {
      type: "WrongEntryPoint",
    };
  } else if ("Expired" in schemaJson) {
    match7 = {
      type: "Expired",
    };
  } else if ("InvalidUnstakeAmount" in schemaJson) {
    match7 = {
      type: "InvalidUnstakeAmount",
    };
  } else {
    throw new Error("Unexpected enum variant");
  }

  return match7;
}
/** Base64 encoding of the parameter schema type for update transactions to 'permit' entrypoint of the 'concordium_staking' contract. */
const base64PermitParameterSchema =
  "FAADAAAACQAAAHNpZ25hdHVyZRIAAhIAAhUBAAAABwAAAEVkMjU1MTkBAQAAAB5AAAAABgAAAHNpZ25lcgsHAAAAbWVzc2FnZRQABQAAABAAAABjb250cmFjdF9hZGRyZXNzDAUAAABub25jZQUJAAAAdGltZXN0YW1wDQsAAABlbnRyeV9wb2ludBYBBwAAAHBheWxvYWQQAQI=";
/** Parameter JSON type needed by the schema for update transaction for 'permit' entrypoint of the 'concordium_staking' contract. */
type PermitParameterSchemaJson = {
  signature: [number, [number, { Ed25519: [string] }][]][];
  signer: SDK.AccountAddress.SchemaValue;
  message: {
    contract_address: SDK.ContractAddress.SchemaValue;
    nonce: bigint;
    timestamp: SDK.Timestamp.SchemaValue;
    entry_point: string;
    payload: Array<number>;
  };
};
/** Parameter type for update transaction for 'permit' entrypoint of the 'concordium_staking' contract. */
export type PermitParameter = {
  signature: Map<number, Map<number, { type: "Ed25519"; content: SDK.HexString }>>;
  signer: SDK.AccountAddress.Type;
  message: {
    contract_address: SDK.ContractAddress.Type;
    nonce: number | bigint;
    timestamp: SDK.Timestamp.Type;
    entry_point: string;
    payload: Array<number>;
  };
};

/**
 * Construct schema JSON representation used in update transaction for 'permit' entrypoint of the 'concordium_staking' contract.
 * @param {PermitParameter} parameter The structured parameter to construct from.
 * @returns {PermitParameterSchemaJson} The smart contract parameter JSON.
 */
function createPermitParameterSchemaJson(parameter: PermitParameter): PermitParameterSchemaJson {
  const field34 = parameter.signature;
  const map35: [number, [number, { Ed25519: [string] }][]][] = [...field34.entries()].map(
    ([key36, value37]) => {
      const map38: [number, { Ed25519: [string] }][] = [...value37.entries()].map(
        ([key39, value40]) => {
          let match41: { Ed25519: [string] };
          switch (value40.type) {
            case "Ed25519":
              match41 = { Ed25519: [value40.content] };
              break;
          }

          return [key39, match41];
        }
      );
      return [key36, map38];
    }
  );
  const field42 = parameter.signer;
  const accountAddress43 = SDK.AccountAddress.toSchemaValue(field42);
  const field44 = parameter.message;
  const field46 = field44.contract_address;
  const contractAddress47 = SDK.ContractAddress.toSchemaValue(field46);
  const field48 = field44.nonce;
  const number49 = BigInt(field48);
  const field50 = field44.timestamp;
  const timestamp51 = SDK.Timestamp.toSchemaValue(field50);
  const field52 = field44.entry_point;
  const field53 = field44.payload;
  const named45 = {
    contract_address: contractAddress47,
    nonce: number49,
    timestamp: timestamp51,
    entry_point: field52,
    payload: field53,
  };
  const named33 = {
    signature: map35,
    signer: accountAddress43,
    message: named45,
  };
  return named33;
}

/**
 * Construct Parameter type used in update transaction for 'permit' entrypoint of the 'concordium_staking' contract.
 * @param {PermitParameter} parameter The structured parameter to construct from.
 * @returns {SDK.Parameter.Type} The smart contract parameter.
 */
export function createPermitParameter(parameter: PermitParameter): SDK.Parameter.Type {
  return SDK.Parameter.fromBase64SchemaType(
    base64PermitParameterSchema,
    createPermitParameterSchemaJson(parameter)
  );
}

/**
 * Construct WebWallet parameter type used in update transaction for 'permit' entrypoint of the 'concordium_staking' contract.
 * @param {PermitParameter} parameter The structured parameter to construct from.
 * @returns The smart contract parameter support by the WebWallet.
 */
export function createPermitParameterWebWallet(parameter: PermitParameter) {
  return {
    parameters: createPermitParameterSchemaJson(parameter),
    schema: {
      type: "TypeSchema" as const,
      value: SDK.toBuffer(base64PermitParameterSchema, "base64"),
    },
  };
}

/**
 * Send an update-contract transaction to the 'permit' entrypoint of the 'concordium_staking' contract.
 * @param {ConcordiumStakingContract} contractClient The client for a 'concordium_staking' smart contract instance on chain.
 * @param {SDK.ContractTransactionMetadata} transactionMetadata - Metadata related to constructing a transaction for a smart contract.
 * @param {PermitParameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.AccountSigner} signer - The signer of the update contract transaction.
 * @throws If the entrypoint is not successfully invoked.
 * @returns {SDK.TransactionHash.Type} Hash of the transaction.
 */
export function sendPermit(
  contractClient: ConcordiumStakingContract,
  transactionMetadata: SDK.ContractTransactionMetadata,
  parameter: PermitParameter,
  signer: SDK.AccountSigner
): Promise<SDK.TransactionHash.Type> {
  return contractClient.genericContract.createAndSendUpdateTransaction(
    SDK.EntrypointName.fromStringUnchecked("permit"),
    SDK.Parameter.toBuffer,
    transactionMetadata,
    createPermitParameter(parameter),
    signer
  );
}

/**
 * Dry-run an update-contract transaction to the 'permit' entrypoint of the 'concordium_staking' contract.
 * @param {ConcordiumStakingContract} contractClient The client for a 'concordium_staking' smart contract instance on chain.
 * @param {SDK.ContractAddress.Type | SDK.AccountAddress.Type} invokeMetadata - The address of the account or contract which is invoking this transaction.
 * @param {PermitParameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.BlockHash.Type} [blockHash] - Optional block hash allowing for dry-running the transaction at the end of a specific block.
 * @throws {SDK.RpcError} If failing to communicate with the concordium node or if any of the checks fails.
 * @returns {SDK.InvokeContractResult} The result of invoking the smart contract instance.
 */
export function dryRunPermit(
  contractClient: ConcordiumStakingContract,
  parameter: PermitParameter,
  invokeMetadata: SDK.ContractInvokeMetadata = {},
  blockHash?: SDK.BlockHash.Type
): Promise<SDK.InvokeContractResult> {
  return contractClient.genericContract.dryRun.invokeMethod(
    SDK.EntrypointName.fromStringUnchecked("permit"),
    invokeMetadata,
    SDK.Parameter.toBuffer,
    createPermitParameter(parameter),
    blockHash
  );
}

/** Error message for dry-running update transaction for 'permit' entrypoint of the 'concordium_staking' contract. */
export type ErrorMessagePermit =
  | { type: "ParseParams" }
  | { type: "UnAuthorized" }
  | { type: "InvalidStakeAmount" }
  | { type: "NoStakeFound" }
  | { type: "OnlyAccount" }
  | { type: "OnlyAdmin" }
  | { type: "InvokeContractError" }
  | { type: "ParseResult" }
  | { type: "InvalidResponse" }
  | { type: "LogFull" }
  | { type: "LogMalformed" }
  | { type: "FailedUpgradeMissingModule" }
  | { type: "FailedUpgradeMissingContract" }
  | { type: "FailedUpgradeUnsupportedModuleVersion" }
  | { type: "ContractPaused" }
  | { type: "InsufficientFunds" }
  | { type: "NotTokenContract" }
  | { type: "MissingAccount" }
  | { type: "MalformedData" }
  | { type: "WrongSignature" }
  | { type: "NonceMismatch" }
  | { type: "WrongContract" }
  | { type: "WrongEntryPoint" }
  | { type: "Expired" }
  | { type: "InvalidUnstakeAmount" };

/**
 * Get and parse the error message from dry-running update transaction for 'permit' entrypoint of the 'concordium_staking' contract.
 * Returns undefined if the result is not a failure.
 * @param {SDK.InvokeContractResult} invokeResult The result from dry-running the transaction.
 * @returns {ErrorMessagePermit | undefined} The structured error message or undefined if result was not a failure or failed for other reason than contract rejectedReceive.
 */
export function parseErrorMessagePermit(
  invokeResult: SDK.InvokeContractResult
): ErrorMessagePermit | undefined {
  if (invokeResult.tag !== "failure" || invokeResult.reason.tag !== "RejectedReceive") {
    return undefined;
  }

  if (invokeResult.returnValue === undefined) {
    throw new Error(
      "Unexpected missing 'returnValue' in result of invocation. Client expected a V1 smart contract."
    );
  }

  const schemaJson = <
    | { ParseParams: [] }
    | { UnAuthorized: [] }
    | { InvalidStakeAmount: [] }
    | { NoStakeFound: [] }
    | { OnlyAccount: [] }
    | { OnlyAdmin: [] }
    | { InvokeContractError: [] }
    | { ParseResult: [] }
    | { InvalidResponse: [] }
    | { LogFull: [] }
    | { LogMalformed: [] }
    | { FailedUpgradeMissingModule: [] }
    | { FailedUpgradeMissingContract: [] }
    | { FailedUpgradeUnsupportedModuleVersion: [] }
    | { ContractPaused: [] }
    | { InsufficientFunds: [] }
    | { NotTokenContract: [] }
    | { MissingAccount: [] }
    | { MalformedData: [] }
    | { WrongSignature: [] }
    | { NonceMismatch: [] }
    | { WrongContract: [] }
    | { WrongEntryPoint: [] }
    | { Expired: [] }
    | { InvalidUnstakeAmount: [] }
  >SDK.ReturnValue.parseWithSchemaTypeBase64(
    invokeResult.returnValue,
    "FRkAAAALAAAAUGFyc2VQYXJhbXMCDAAAAFVuQXV0aG9yaXplZAISAAAASW52YWxpZFN0YWtlQW1vdW50AgwAAABOb1N0YWtlRm91bmQCCwAAAE9ubHlBY2NvdW50AgkAAABPbmx5QWRtaW4CEwAAAEludm9rZUNvbnRyYWN0RXJyb3ICCwAAAFBhcnNlUmVzdWx0Ag8AAABJbnZhbGlkUmVzcG9uc2UCBwAAAExvZ0Z1bGwCDAAAAExvZ01hbGZvcm1lZAIaAAAARmFpbGVkVXBncmFkZU1pc3NpbmdNb2R1bGUCHAAAAEZhaWxlZFVwZ3JhZGVNaXNzaW5nQ29udHJhY3QCJQAAAEZhaWxlZFVwZ3JhZGVVbnN1cHBvcnRlZE1vZHVsZVZlcnNpb24CDgAAAENvbnRyYWN0UGF1c2VkAhEAAABJbnN1ZmZpY2llbnRGdW5kcwIQAAAATm90VG9rZW5Db250cmFjdAIOAAAATWlzc2luZ0FjY291bnQCDQAAAE1hbGZvcm1lZERhdGECDgAAAFdyb25nU2lnbmF0dXJlAg0AAABOb25jZU1pc21hdGNoAg0AAABXcm9uZ0NvbnRyYWN0Ag8AAABXcm9uZ0VudHJ5UG9pbnQCBwAAAEV4cGlyZWQCFAAAAEludmFsaWRVbnN0YWtlQW1vdW50Ag=="
  );
  let match56:
    | { type: "ParseParams" }
    | { type: "UnAuthorized" }
    | { type: "InvalidStakeAmount" }
    | { type: "NoStakeFound" }
    | { type: "OnlyAccount" }
    | { type: "OnlyAdmin" }
    | { type: "InvokeContractError" }
    | { type: "ParseResult" }
    | { type: "InvalidResponse" }
    | { type: "LogFull" }
    | { type: "LogMalformed" }
    | { type: "FailedUpgradeMissingModule" }
    | { type: "FailedUpgradeMissingContract" }
    | { type: "FailedUpgradeUnsupportedModuleVersion" }
    | { type: "ContractPaused" }
    | { type: "InsufficientFunds" }
    | { type: "NotTokenContract" }
    | { type: "MissingAccount" }
    | { type: "MalformedData" }
    | { type: "WrongSignature" }
    | { type: "NonceMismatch" }
    | { type: "WrongContract" }
    | { type: "WrongEntryPoint" }
    | { type: "Expired" }
    | { type: "InvalidUnstakeAmount" };
  if ("ParseParams" in schemaJson) {
    match56 = {
      type: "ParseParams",
    };
  } else if ("UnAuthorized" in schemaJson) {
    match56 = {
      type: "UnAuthorized",
    };
  } else if ("InvalidStakeAmount" in schemaJson) {
    match56 = {
      type: "InvalidStakeAmount",
    };
  } else if ("NoStakeFound" in schemaJson) {
    match56 = {
      type: "NoStakeFound",
    };
  } else if ("OnlyAccount" in schemaJson) {
    match56 = {
      type: "OnlyAccount",
    };
  } else if ("OnlyAdmin" in schemaJson) {
    match56 = {
      type: "OnlyAdmin",
    };
  } else if ("InvokeContractError" in schemaJson) {
    match56 = {
      type: "InvokeContractError",
    };
  } else if ("ParseResult" in schemaJson) {
    match56 = {
      type: "ParseResult",
    };
  } else if ("InvalidResponse" in schemaJson) {
    match56 = {
      type: "InvalidResponse",
    };
  } else if ("LogFull" in schemaJson) {
    match56 = {
      type: "LogFull",
    };
  } else if ("LogMalformed" in schemaJson) {
    match56 = {
      type: "LogMalformed",
    };
  } else if ("FailedUpgradeMissingModule" in schemaJson) {
    match56 = {
      type: "FailedUpgradeMissingModule",
    };
  } else if ("FailedUpgradeMissingContract" in schemaJson) {
    match56 = {
      type: "FailedUpgradeMissingContract",
    };
  } else if ("FailedUpgradeUnsupportedModuleVersion" in schemaJson) {
    match56 = {
      type: "FailedUpgradeUnsupportedModuleVersion",
    };
  } else if ("ContractPaused" in schemaJson) {
    match56 = {
      type: "ContractPaused",
    };
  } else if ("InsufficientFunds" in schemaJson) {
    match56 = {
      type: "InsufficientFunds",
    };
  } else if ("NotTokenContract" in schemaJson) {
    match56 = {
      type: "NotTokenContract",
    };
  } else if ("MissingAccount" in schemaJson) {
    match56 = {
      type: "MissingAccount",
    };
  } else if ("MalformedData" in schemaJson) {
    match56 = {
      type: "MalformedData",
    };
  } else if ("WrongSignature" in schemaJson) {
    match56 = {
      type: "WrongSignature",
    };
  } else if ("NonceMismatch" in schemaJson) {
    match56 = {
      type: "NonceMismatch",
    };
  } else if ("WrongContract" in schemaJson) {
    match56 = {
      type: "WrongContract",
    };
  } else if ("WrongEntryPoint" in schemaJson) {
    match56 = {
      type: "WrongEntryPoint",
    };
  } else if ("Expired" in schemaJson) {
    match56 = {
      type: "Expired",
    };
  } else if ("InvalidUnstakeAmount" in schemaJson) {
    match56 = {
      type: "InvalidUnstakeAmount",
    };
  } else {
    throw new Error("Unexpected enum variant");
  }

  return match56;
}
/** Base64 encoding of the parameter schema type for update transactions to 'stake' entrypoint of the 'concordium_staking' contract. */
const base64StakeParameterSchema =
  "FAAEAAAACAAAAHRva2VuX2lkHQAGAAAAYW1vdW50GyUAAAAEAAAAZnJvbRUCAAAABwAAAEFjY291bnQBAQAAAAsIAAAAQ29udHJhY3QBAQAAAAwEAAAAZGF0YR0B";
/** Parameter JSON type needed by the schema for update transaction for 'stake' entrypoint of the 'concordium_staking' contract. */
type StakeParameterSchemaJson = {
  token_id: string;
  amount: string;
  from:
    | { Account: [SDK.AccountAddress.SchemaValue] }
    | { Contract: [SDK.ContractAddress.SchemaValue] };
  data: string;
};
/** Parameter type for update transaction for 'stake' entrypoint of the 'concordium_staking' contract. */
export type StakeParameter = {
  token_id: SDK.HexString;
  amount: number | bigint;
  from:
    | { type: "Account"; content: SDK.AccountAddress.Type }
    | { type: "Contract"; content: SDK.ContractAddress.Type };
  data: SDK.HexString;
};

/**
 * Construct schema JSON representation used in update transaction for 'stake' entrypoint of the 'concordium_staking' contract.
 * @param {StakeParameter} parameter The structured parameter to construct from.
 * @returns {StakeParameterSchemaJson} The smart contract parameter JSON.
 */
function createStakeParameterSchemaJson(parameter: StakeParameter): StakeParameterSchemaJson {
  const field84 = parameter.token_id;
  const field85 = parameter.amount;
  const leb82 = BigInt(field85).toString();
  const field86 = parameter.from;
  let match87:
    | { Account: [SDK.AccountAddress.SchemaValue] }
    | { Contract: [SDK.ContractAddress.SchemaValue] };
  switch (field86.type) {
    case "Account":
      const accountAddress88 = SDK.AccountAddress.toSchemaValue(field86.content);
      match87 = { Account: [accountAddress88] };
      break;
    case "Contract":
      const contractAddress89 = SDK.ContractAddress.toSchemaValue(field86.content);
      match87 = { Contract: [contractAddress89] };
      break;
  }

  const field90 = parameter.data;
  const named83 = {
    token_id: field84,
    amount: leb82,
    from: match87,
    data: field90,
  };
  return named83;
}

/**
 * Construct Parameter type used in update transaction for 'stake' entrypoint of the 'concordium_staking' contract.
 * @param {StakeParameter} parameter The structured parameter to construct from.
 * @returns {SDK.Parameter.Type} The smart contract parameter.
 */
export function createStakeParameter(parameter: StakeParameter): SDK.Parameter.Type {
  return SDK.Parameter.fromBase64SchemaType(
    base64StakeParameterSchema,
    createStakeParameterSchemaJson(parameter)
  );
}

/**
 * Construct WebWallet parameter type used in update transaction for 'stake' entrypoint of the 'concordium_staking' contract.
 * @param {StakeParameter} parameter The structured parameter to construct from.
 * @returns The smart contract parameter support by the WebWallet.
 */
export function createStakeParameterWebWallet(parameter: StakeParameter) {
  return {
    parameters: createStakeParameterSchemaJson(parameter),
    schema: {
      type: "TypeSchema" as const,
      value: SDK.toBuffer(base64StakeParameterSchema, "base64"),
    },
  };
}

/**
 * Send an update-contract transaction to the 'stake' entrypoint of the 'concordium_staking' contract.
 * @param {ConcordiumStakingContract} contractClient The client for a 'concordium_staking' smart contract instance on chain.
 * @param {SDK.ContractTransactionMetadata} transactionMetadata - Metadata related to constructing a transaction for a smart contract.
 * @param {StakeParameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.AccountSigner} signer - The signer of the update contract transaction.
 * @throws If the entrypoint is not successfully invoked.
 * @returns {SDK.TransactionHash.Type} Hash of the transaction.
 */
export function sendStake(
  contractClient: ConcordiumStakingContract,
  transactionMetadata: SDK.ContractTransactionMetadata,
  parameter: StakeParameter,
  signer: SDK.AccountSigner
): Promise<SDK.TransactionHash.Type> {
  return contractClient.genericContract.createAndSendUpdateTransaction(
    SDK.EntrypointName.fromStringUnchecked("stake"),
    SDK.Parameter.toBuffer,
    transactionMetadata,
    createStakeParameter(parameter),
    signer
  );
}

/**
 * Dry-run an update-contract transaction to the 'stake' entrypoint of the 'concordium_staking' contract.
 * @param {ConcordiumStakingContract} contractClient The client for a 'concordium_staking' smart contract instance on chain.
 * @param {SDK.ContractAddress.Type | SDK.AccountAddress.Type} invokeMetadata - The address of the account or contract which is invoking this transaction.
 * @param {StakeParameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.BlockHash.Type} [blockHash] - Optional block hash allowing for dry-running the transaction at the end of a specific block.
 * @throws {SDK.RpcError} If failing to communicate with the concordium node or if any of the checks fails.
 * @returns {SDK.InvokeContractResult} The result of invoking the smart contract instance.
 */
export function dryRunStake(
  contractClient: ConcordiumStakingContract,
  parameter: StakeParameter,
  invokeMetadata: SDK.ContractInvokeMetadata = {},
  blockHash?: SDK.BlockHash.Type
): Promise<SDK.InvokeContractResult> {
  return contractClient.genericContract.dryRun.invokeMethod(
    SDK.EntrypointName.fromStringUnchecked("stake"),
    invokeMetadata,
    SDK.Parameter.toBuffer,
    createStakeParameter(parameter),
    blockHash
  );
}

/** Error message for dry-running update transaction for 'stake' entrypoint of the 'concordium_staking' contract. */
export type ErrorMessageStake =
  | { type: "ParseParams" }
  | { type: "UnAuthorized" }
  | { type: "InvalidStakeAmount" }
  | { type: "NoStakeFound" }
  | { type: "OnlyAccount" }
  | { type: "OnlyAdmin" }
  | { type: "InvokeContractError" }
  | { type: "ParseResult" }
  | { type: "InvalidResponse" }
  | { type: "LogFull" }
  | { type: "LogMalformed" }
  | { type: "FailedUpgradeMissingModule" }
  | { type: "FailedUpgradeMissingContract" }
  | { type: "FailedUpgradeUnsupportedModuleVersion" }
  | { type: "ContractPaused" }
  | { type: "InsufficientFunds" }
  | { type: "NotTokenContract" }
  | { type: "MissingAccount" }
  | { type: "MalformedData" }
  | { type: "WrongSignature" }
  | { type: "NonceMismatch" }
  | { type: "WrongContract" }
  | { type: "WrongEntryPoint" }
  | { type: "Expired" }
  | { type: "InvalidUnstakeAmount" };

/**
 * Get and parse the error message from dry-running update transaction for 'stake' entrypoint of the 'concordium_staking' contract.
 * Returns undefined if the result is not a failure.
 * @param {SDK.InvokeContractResult} invokeResult The result from dry-running the transaction.
 * @returns {ErrorMessageStake | undefined} The structured error message or undefined if result was not a failure or failed for other reason than contract rejectedReceive.
 */
export function parseErrorMessageStake(
  invokeResult: SDK.InvokeContractResult
): ErrorMessageStake | undefined {
  if (invokeResult.tag !== "failure" || invokeResult.reason.tag !== "RejectedReceive") {
    return undefined;
  }

  if (invokeResult.returnValue === undefined) {
    throw new Error(
      "Unexpected missing 'returnValue' in result of invocation. Client expected a V1 smart contract."
    );
  }

  const schemaJson = <
    | { ParseParams: [] }
    | { UnAuthorized: [] }
    | { InvalidStakeAmount: [] }
    | { NoStakeFound: [] }
    | { OnlyAccount: [] }
    | { OnlyAdmin: [] }
    | { InvokeContractError: [] }
    | { ParseResult: [] }
    | { InvalidResponse: [] }
    | { LogFull: [] }
    | { LogMalformed: [] }
    | { FailedUpgradeMissingModule: [] }
    | { FailedUpgradeMissingContract: [] }
    | { FailedUpgradeUnsupportedModuleVersion: [] }
    | { ContractPaused: [] }
    | { InsufficientFunds: [] }
    | { NotTokenContract: [] }
    | { MissingAccount: [] }
    | { MalformedData: [] }
    | { WrongSignature: [] }
    | { NonceMismatch: [] }
    | { WrongContract: [] }
    | { WrongEntryPoint: [] }
    | { Expired: [] }
    | { InvalidUnstakeAmount: [] }
  >SDK.ReturnValue.parseWithSchemaTypeBase64(
    invokeResult.returnValue,
    "FRkAAAALAAAAUGFyc2VQYXJhbXMCDAAAAFVuQXV0aG9yaXplZAISAAAASW52YWxpZFN0YWtlQW1vdW50AgwAAABOb1N0YWtlRm91bmQCCwAAAE9ubHlBY2NvdW50AgkAAABPbmx5QWRtaW4CEwAAAEludm9rZUNvbnRyYWN0RXJyb3ICCwAAAFBhcnNlUmVzdWx0Ag8AAABJbnZhbGlkUmVzcG9uc2UCBwAAAExvZ0Z1bGwCDAAAAExvZ01hbGZvcm1lZAIaAAAARmFpbGVkVXBncmFkZU1pc3NpbmdNb2R1bGUCHAAAAEZhaWxlZFVwZ3JhZGVNaXNzaW5nQ29udHJhY3QCJQAAAEZhaWxlZFVwZ3JhZGVVbnN1cHBvcnRlZE1vZHVsZVZlcnNpb24CDgAAAENvbnRyYWN0UGF1c2VkAhEAAABJbnN1ZmZpY2llbnRGdW5kcwIQAAAATm90VG9rZW5Db250cmFjdAIOAAAATWlzc2luZ0FjY291bnQCDQAAAE1hbGZvcm1lZERhdGECDgAAAFdyb25nU2lnbmF0dXJlAg0AAABOb25jZU1pc21hdGNoAg0AAABXcm9uZ0NvbnRyYWN0Ag8AAABXcm9uZ0VudHJ5UG9pbnQCBwAAAEV4cGlyZWQCFAAAAEludmFsaWRVbnN0YWtlQW1vdW50Ag=="
  );
  let match91:
    | { type: "ParseParams" }
    | { type: "UnAuthorized" }
    | { type: "InvalidStakeAmount" }
    | { type: "NoStakeFound" }
    | { type: "OnlyAccount" }
    | { type: "OnlyAdmin" }
    | { type: "InvokeContractError" }
    | { type: "ParseResult" }
    | { type: "InvalidResponse" }
    | { type: "LogFull" }
    | { type: "LogMalformed" }
    | { type: "FailedUpgradeMissingModule" }
    | { type: "FailedUpgradeMissingContract" }
    | { type: "FailedUpgradeUnsupportedModuleVersion" }
    | { type: "ContractPaused" }
    | { type: "InsufficientFunds" }
    | { type: "NotTokenContract" }
    | { type: "MissingAccount" }
    | { type: "MalformedData" }
    | { type: "WrongSignature" }
    | { type: "NonceMismatch" }
    | { type: "WrongContract" }
    | { type: "WrongEntryPoint" }
    | { type: "Expired" }
    | { type: "InvalidUnstakeAmount" };
  if ("ParseParams" in schemaJson) {
    match91 = {
      type: "ParseParams",
    };
  } else if ("UnAuthorized" in schemaJson) {
    match91 = {
      type: "UnAuthorized",
    };
  } else if ("InvalidStakeAmount" in schemaJson) {
    match91 = {
      type: "InvalidStakeAmount",
    };
  } else if ("NoStakeFound" in schemaJson) {
    match91 = {
      type: "NoStakeFound",
    };
  } else if ("OnlyAccount" in schemaJson) {
    match91 = {
      type: "OnlyAccount",
    };
  } else if ("OnlyAdmin" in schemaJson) {
    match91 = {
      type: "OnlyAdmin",
    };
  } else if ("InvokeContractError" in schemaJson) {
    match91 = {
      type: "InvokeContractError",
    };
  } else if ("ParseResult" in schemaJson) {
    match91 = {
      type: "ParseResult",
    };
  } else if ("InvalidResponse" in schemaJson) {
    match91 = {
      type: "InvalidResponse",
    };
  } else if ("LogFull" in schemaJson) {
    match91 = {
      type: "LogFull",
    };
  } else if ("LogMalformed" in schemaJson) {
    match91 = {
      type: "LogMalformed",
    };
  } else if ("FailedUpgradeMissingModule" in schemaJson) {
    match91 = {
      type: "FailedUpgradeMissingModule",
    };
  } else if ("FailedUpgradeMissingContract" in schemaJson) {
    match91 = {
      type: "FailedUpgradeMissingContract",
    };
  } else if ("FailedUpgradeUnsupportedModuleVersion" in schemaJson) {
    match91 = {
      type: "FailedUpgradeUnsupportedModuleVersion",
    };
  } else if ("ContractPaused" in schemaJson) {
    match91 = {
      type: "ContractPaused",
    };
  } else if ("InsufficientFunds" in schemaJson) {
    match91 = {
      type: "InsufficientFunds",
    };
  } else if ("NotTokenContract" in schemaJson) {
    match91 = {
      type: "NotTokenContract",
    };
  } else if ("MissingAccount" in schemaJson) {
    match91 = {
      type: "MissingAccount",
    };
  } else if ("MalformedData" in schemaJson) {
    match91 = {
      type: "MalformedData",
    };
  } else if ("WrongSignature" in schemaJson) {
    match91 = {
      type: "WrongSignature",
    };
  } else if ("NonceMismatch" in schemaJson) {
    match91 = {
      type: "NonceMismatch",
    };
  } else if ("WrongContract" in schemaJson) {
    match91 = {
      type: "WrongContract",
    };
  } else if ("WrongEntryPoint" in schemaJson) {
    match91 = {
      type: "WrongEntryPoint",
    };
  } else if ("Expired" in schemaJson) {
    match91 = {
      type: "Expired",
    };
  } else if ("InvalidUnstakeAmount" in schemaJson) {
    match91 = {
      type: "InvalidUnstakeAmount",
    };
  } else {
    throw new Error("Unexpected enum variant");
  }

  return match91;
}
/** Base64 encoding of the parameter schema type for update transactions to 'unstake' entrypoint of the 'concordium_staking' contract. */
const base64UnstakeParameterSchema = "FAABAAAABgAAAGFtb3VudBslAAAA";
/** Parameter JSON type needed by the schema for update transaction for 'unstake' entrypoint of the 'concordium_staking' contract. */
type UnstakeParameterSchemaJson = {
  amount: string;
};
/** Parameter type for update transaction for 'unstake' entrypoint of the 'concordium_staking' contract. */
export type UnstakeParameter = {
  amount: number | bigint;
};

/**
 * Construct schema JSON representation used in update transaction for 'unstake' entrypoint of the 'concordium_staking' contract.
 * @param {UnstakeParameter} parameter The structured parameter to construct from.
 * @returns {UnstakeParameterSchemaJson} The smart contract parameter JSON.
 */
function createUnstakeParameterSchemaJson(parameter: UnstakeParameter): UnstakeParameterSchemaJson {
  const field119 = parameter.amount;
  const leb117 = BigInt(field119).toString();
  const named118 = {
    amount: leb117,
  };
  return named118;
}

/**
 * Construct Parameter type used in update transaction for 'unstake' entrypoint of the 'concordium_staking' contract.
 * @param {UnstakeParameter} parameter The structured parameter to construct from.
 * @returns {SDK.Parameter.Type} The smart contract parameter.
 */
export function createUnstakeParameter(parameter: UnstakeParameter): SDK.Parameter.Type {
  return SDK.Parameter.fromBase64SchemaType(
    base64UnstakeParameterSchema,
    createUnstakeParameterSchemaJson(parameter)
  );
}

/**
 * Construct WebWallet parameter type used in update transaction for 'unstake' entrypoint of the 'concordium_staking' contract.
 * @param {UnstakeParameter} parameter The structured parameter to construct from.
 * @returns The smart contract parameter support by the WebWallet.
 */
export function createUnstakeParameterWebWallet(parameter: UnstakeParameter) {
  return {
    parameters: createUnstakeParameterSchemaJson(parameter),
    schema: {
      type: "TypeSchema" as const,
      value: SDK.toBuffer(base64UnstakeParameterSchema, "base64"),
    },
  };
}

/**
 * Send an update-contract transaction to the 'unstake' entrypoint of the 'concordium_staking' contract.
 * @param {ConcordiumStakingContract} contractClient The client for a 'concordium_staking' smart contract instance on chain.
 * @param {SDK.ContractTransactionMetadata} transactionMetadata - Metadata related to constructing a transaction for a smart contract.
 * @param {UnstakeParameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.AccountSigner} signer - The signer of the update contract transaction.
 * @throws If the entrypoint is not successfully invoked.
 * @returns {SDK.TransactionHash.Type} Hash of the transaction.
 */
export function sendUnstake(
  contractClient: ConcordiumStakingContract,
  transactionMetadata: SDK.ContractTransactionMetadata,
  parameter: UnstakeParameter,
  signer: SDK.AccountSigner
): Promise<SDK.TransactionHash.Type> {
  return contractClient.genericContract.createAndSendUpdateTransaction(
    SDK.EntrypointName.fromStringUnchecked("unstake"),
    SDK.Parameter.toBuffer,
    transactionMetadata,
    createUnstakeParameter(parameter),
    signer
  );
}

/**
 * Dry-run an update-contract transaction to the 'unstake' entrypoint of the 'concordium_staking' contract.
 * @param {ConcordiumStakingContract} contractClient The client for a 'concordium_staking' smart contract instance on chain.
 * @param {SDK.ContractAddress.Type | SDK.AccountAddress.Type} invokeMetadata - The address of the account or contract which is invoking this transaction.
 * @param {UnstakeParameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.BlockHash.Type} [blockHash] - Optional block hash allowing for dry-running the transaction at the end of a specific block.
 * @throws {SDK.RpcError} If failing to communicate with the concordium node or if any of the checks fails.
 * @returns {SDK.InvokeContractResult} The result of invoking the smart contract instance.
 */
export function dryRunUnstake(
  contractClient: ConcordiumStakingContract,
  parameter: UnstakeParameter,
  invokeMetadata: SDK.ContractInvokeMetadata = {},
  blockHash?: SDK.BlockHash.Type
): Promise<SDK.InvokeContractResult> {
  return contractClient.genericContract.dryRun.invokeMethod(
    SDK.EntrypointName.fromStringUnchecked("unstake"),
    invokeMetadata,
    SDK.Parameter.toBuffer,
    createUnstakeParameter(parameter),
    blockHash
  );
}

/** Error message for dry-running update transaction for 'unstake' entrypoint of the 'concordium_staking' contract. */
export type ErrorMessageUnstake =
  | { type: "ParseParams" }
  | { type: "UnAuthorized" }
  | { type: "InvalidStakeAmount" }
  | { type: "NoStakeFound" }
  | { type: "OnlyAccount" }
  | { type: "OnlyAdmin" }
  | { type: "InvokeContractError" }
  | { type: "ParseResult" }
  | { type: "InvalidResponse" }
  | { type: "LogFull" }
  | { type: "LogMalformed" }
  | { type: "FailedUpgradeMissingModule" }
  | { type: "FailedUpgradeMissingContract" }
  | { type: "FailedUpgradeUnsupportedModuleVersion" }
  | { type: "ContractPaused" }
  | { type: "InsufficientFunds" }
  | { type: "NotTokenContract" }
  | { type: "MissingAccount" }
  | { type: "MalformedData" }
  | { type: "WrongSignature" }
  | { type: "NonceMismatch" }
  | { type: "WrongContract" }
  | { type: "WrongEntryPoint" }
  | { type: "Expired" }
  | { type: "InvalidUnstakeAmount" };

/**
 * Get and parse the error message from dry-running update transaction for 'unstake' entrypoint of the 'concordium_staking' contract.
 * Returns undefined if the result is not a failure.
 * @param {SDK.InvokeContractResult} invokeResult The result from dry-running the transaction.
 * @returns {ErrorMessageUnstake | undefined} The structured error message or undefined if result was not a failure or failed for other reason than contract rejectedReceive.
 */
export function parseErrorMessageUnstake(
  invokeResult: SDK.InvokeContractResult
): ErrorMessageUnstake | undefined {
  if (invokeResult.tag !== "failure" || invokeResult.reason.tag !== "RejectedReceive") {
    return undefined;
  }

  if (invokeResult.returnValue === undefined) {
    throw new Error(
      "Unexpected missing 'returnValue' in result of invocation. Client expected a V1 smart contract."
    );
  }

  const schemaJson = <
    | { ParseParams: [] }
    | { UnAuthorized: [] }
    | { InvalidStakeAmount: [] }
    | { NoStakeFound: [] }
    | { OnlyAccount: [] }
    | { OnlyAdmin: [] }
    | { InvokeContractError: [] }
    | { ParseResult: [] }
    | { InvalidResponse: [] }
    | { LogFull: [] }
    | { LogMalformed: [] }
    | { FailedUpgradeMissingModule: [] }
    | { FailedUpgradeMissingContract: [] }
    | { FailedUpgradeUnsupportedModuleVersion: [] }
    | { ContractPaused: [] }
    | { InsufficientFunds: [] }
    | { NotTokenContract: [] }
    | { MissingAccount: [] }
    | { MalformedData: [] }
    | { WrongSignature: [] }
    | { NonceMismatch: [] }
    | { WrongContract: [] }
    | { WrongEntryPoint: [] }
    | { Expired: [] }
    | { InvalidUnstakeAmount: [] }
  >SDK.ReturnValue.parseWithSchemaTypeBase64(
    invokeResult.returnValue,
    "FRkAAAALAAAAUGFyc2VQYXJhbXMCDAAAAFVuQXV0aG9yaXplZAISAAAASW52YWxpZFN0YWtlQW1vdW50AgwAAABOb1N0YWtlRm91bmQCCwAAAE9ubHlBY2NvdW50AgkAAABPbmx5QWRtaW4CEwAAAEludm9rZUNvbnRyYWN0RXJyb3ICCwAAAFBhcnNlUmVzdWx0Ag8AAABJbnZhbGlkUmVzcG9uc2UCBwAAAExvZ0Z1bGwCDAAAAExvZ01hbGZvcm1lZAIaAAAARmFpbGVkVXBncmFkZU1pc3NpbmdNb2R1bGUCHAAAAEZhaWxlZFVwZ3JhZGVNaXNzaW5nQ29udHJhY3QCJQAAAEZhaWxlZFVwZ3JhZGVVbnN1cHBvcnRlZE1vZHVsZVZlcnNpb24CDgAAAENvbnRyYWN0UGF1c2VkAhEAAABJbnN1ZmZpY2llbnRGdW5kcwIQAAAATm90VG9rZW5Db250cmFjdAIOAAAATWlzc2luZ0FjY291bnQCDQAAAE1hbGZvcm1lZERhdGECDgAAAFdyb25nU2lnbmF0dXJlAg0AAABOb25jZU1pc21hdGNoAg0AAABXcm9uZ0NvbnRyYWN0Ag8AAABXcm9uZ0VudHJ5UG9pbnQCBwAAAEV4cGlyZWQCFAAAAEludmFsaWRVbnN0YWtlQW1vdW50Ag=="
  );
  let match120:
    | { type: "ParseParams" }
    | { type: "UnAuthorized" }
    | { type: "InvalidStakeAmount" }
    | { type: "NoStakeFound" }
    | { type: "OnlyAccount" }
    | { type: "OnlyAdmin" }
    | { type: "InvokeContractError" }
    | { type: "ParseResult" }
    | { type: "InvalidResponse" }
    | { type: "LogFull" }
    | { type: "LogMalformed" }
    | { type: "FailedUpgradeMissingModule" }
    | { type: "FailedUpgradeMissingContract" }
    | { type: "FailedUpgradeUnsupportedModuleVersion" }
    | { type: "ContractPaused" }
    | { type: "InsufficientFunds" }
    | { type: "NotTokenContract" }
    | { type: "MissingAccount" }
    | { type: "MalformedData" }
    | { type: "WrongSignature" }
    | { type: "NonceMismatch" }
    | { type: "WrongContract" }
    | { type: "WrongEntryPoint" }
    | { type: "Expired" }
    | { type: "InvalidUnstakeAmount" };
  if ("ParseParams" in schemaJson) {
    match120 = {
      type: "ParseParams",
    };
  } else if ("UnAuthorized" in schemaJson) {
    match120 = {
      type: "UnAuthorized",
    };
  } else if ("InvalidStakeAmount" in schemaJson) {
    match120 = {
      type: "InvalidStakeAmount",
    };
  } else if ("NoStakeFound" in schemaJson) {
    match120 = {
      type: "NoStakeFound",
    };
  } else if ("OnlyAccount" in schemaJson) {
    match120 = {
      type: "OnlyAccount",
    };
  } else if ("OnlyAdmin" in schemaJson) {
    match120 = {
      type: "OnlyAdmin",
    };
  } else if ("InvokeContractError" in schemaJson) {
    match120 = {
      type: "InvokeContractError",
    };
  } else if ("ParseResult" in schemaJson) {
    match120 = {
      type: "ParseResult",
    };
  } else if ("InvalidResponse" in schemaJson) {
    match120 = {
      type: "InvalidResponse",
    };
  } else if ("LogFull" in schemaJson) {
    match120 = {
      type: "LogFull",
    };
  } else if ("LogMalformed" in schemaJson) {
    match120 = {
      type: "LogMalformed",
    };
  } else if ("FailedUpgradeMissingModule" in schemaJson) {
    match120 = {
      type: "FailedUpgradeMissingModule",
    };
  } else if ("FailedUpgradeMissingContract" in schemaJson) {
    match120 = {
      type: "FailedUpgradeMissingContract",
    };
  } else if ("FailedUpgradeUnsupportedModuleVersion" in schemaJson) {
    match120 = {
      type: "FailedUpgradeUnsupportedModuleVersion",
    };
  } else if ("ContractPaused" in schemaJson) {
    match120 = {
      type: "ContractPaused",
    };
  } else if ("InsufficientFunds" in schemaJson) {
    match120 = {
      type: "InsufficientFunds",
    };
  } else if ("NotTokenContract" in schemaJson) {
    match120 = {
      type: "NotTokenContract",
    };
  } else if ("MissingAccount" in schemaJson) {
    match120 = {
      type: "MissingAccount",
    };
  } else if ("MalformedData" in schemaJson) {
    match120 = {
      type: "MalformedData",
    };
  } else if ("WrongSignature" in schemaJson) {
    match120 = {
      type: "WrongSignature",
    };
  } else if ("NonceMismatch" in schemaJson) {
    match120 = {
      type: "NonceMismatch",
    };
  } else if ("WrongContract" in schemaJson) {
    match120 = {
      type: "WrongContract",
    };
  } else if ("WrongEntryPoint" in schemaJson) {
    match120 = {
      type: "WrongEntryPoint",
    };
  } else if ("Expired" in schemaJson) {
    match120 = {
      type: "Expired",
    };
  } else if ("InvalidUnstakeAmount" in schemaJson) {
    match120 = {
      type: "InvalidUnstakeAmount",
    };
  } else {
    throw new Error("Unexpected enum variant");
  }

  return match120;
}
/** Parameter type  used in update transaction for 'claimRewards' entrypoint of the 'concordium_staking' contract. */
export type ClaimRewardsParameter = SDK.Parameter.Type;

/**
 * Send an update-contract transaction to the 'claimRewards' entrypoint of the 'concordium_staking' contract.
 * @param {ConcordiumStakingContract} contractClient The client for a 'concordium_staking' smart contract instance on chain.
 * @param {SDK.ContractTransactionMetadata} transactionMetadata - Metadata related to constructing a transaction for a smart contract.
 * @param {ClaimRewardsParameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.AccountSigner} signer - The signer of the update contract transaction.
 * @throws If the entrypoint is not successfully invoked.
 * @returns {SDK.TransactionHash.Type} Hash of the transaction.
 */
export function sendClaimRewards(
  contractClient: ConcordiumStakingContract,
  transactionMetadata: SDK.ContractTransactionMetadata,
  parameter: ClaimRewardsParameter,
  signer: SDK.AccountSigner
): Promise<SDK.TransactionHash.Type> {
  return contractClient.genericContract.createAndSendUpdateTransaction(
    SDK.EntrypointName.fromStringUnchecked("claimRewards"),
    SDK.Parameter.toBuffer,
    transactionMetadata,
    parameter,
    signer
  );
}

/**
 * Dry-run an update-contract transaction to the 'claimRewards' entrypoint of the 'concordium_staking' contract.
 * @param {ConcordiumStakingContract} contractClient The client for a 'concordium_staking' smart contract instance on chain.
 * @param {SDK.ContractAddress.Type | SDK.AccountAddress.Type} invokeMetadata - The address of the account or contract which is invoking this transaction.
 * @param {ClaimRewardsParameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.BlockHash.Type} [blockHash] - Optional block hash allowing for dry-running the transaction at the end of a specific block.
 * @throws {SDK.RpcError} If failing to communicate with the concordium node or if any of the checks fails.
 * @returns {SDK.InvokeContractResult} The result of invoking the smart contract instance.
 */
export function dryRunClaimRewards(
  contractClient: ConcordiumStakingContract,
  parameter: ClaimRewardsParameter,
  invokeMetadata: SDK.ContractInvokeMetadata = {},
  blockHash?: SDK.BlockHash.Type
): Promise<SDK.InvokeContractResult> {
  return contractClient.genericContract.dryRun.invokeMethod(
    SDK.EntrypointName.fromStringUnchecked("claimRewards"),
    invokeMetadata,
    SDK.Parameter.toBuffer,
    parameter,
    blockHash
  );
}

/** Error message for dry-running update transaction for 'claimRewards' entrypoint of the 'concordium_staking' contract. */
export type ErrorMessageClaimRewards =
  | { type: "ParseParams" }
  | { type: "UnAuthorized" }
  | { type: "InvalidStakeAmount" }
  | { type: "NoStakeFound" }
  | { type: "OnlyAccount" }
  | { type: "OnlyAdmin" }
  | { type: "InvokeContractError" }
  | { type: "ParseResult" }
  | { type: "InvalidResponse" }
  | { type: "LogFull" }
  | { type: "LogMalformed" }
  | { type: "FailedUpgradeMissingModule" }
  | { type: "FailedUpgradeMissingContract" }
  | { type: "FailedUpgradeUnsupportedModuleVersion" }
  | { type: "ContractPaused" }
  | { type: "InsufficientFunds" }
  | { type: "NotTokenContract" }
  | { type: "MissingAccount" }
  | { type: "MalformedData" }
  | { type: "WrongSignature" }
  | { type: "NonceMismatch" }
  | { type: "WrongContract" }
  | { type: "WrongEntryPoint" }
  | { type: "Expired" }
  | { type: "InvalidUnstakeAmount" };

/**
 * Get and parse the error message from dry-running update transaction for 'claimRewards' entrypoint of the 'concordium_staking' contract.
 * Returns undefined if the result is not a failure.
 * @param {SDK.InvokeContractResult} invokeResult The result from dry-running the transaction.
 * @returns {ErrorMessageClaimRewards | undefined} The structured error message or undefined if result was not a failure or failed for other reason than contract rejectedReceive.
 */
export function parseErrorMessageClaimRewards(
  invokeResult: SDK.InvokeContractResult
): ErrorMessageClaimRewards | undefined {
  if (invokeResult.tag !== "failure" || invokeResult.reason.tag !== "RejectedReceive") {
    return undefined;
  }

  if (invokeResult.returnValue === undefined) {
    throw new Error(
      "Unexpected missing 'returnValue' in result of invocation. Client expected a V1 smart contract."
    );
  }

  const schemaJson = <
    | { ParseParams: [] }
    | { UnAuthorized: [] }
    | { InvalidStakeAmount: [] }
    | { NoStakeFound: [] }
    | { OnlyAccount: [] }
    | { OnlyAdmin: [] }
    | { InvokeContractError: [] }
    | { ParseResult: [] }
    | { InvalidResponse: [] }
    | { LogFull: [] }
    | { LogMalformed: [] }
    | { FailedUpgradeMissingModule: [] }
    | { FailedUpgradeMissingContract: [] }
    | { FailedUpgradeUnsupportedModuleVersion: [] }
    | { ContractPaused: [] }
    | { InsufficientFunds: [] }
    | { NotTokenContract: [] }
    | { MissingAccount: [] }
    | { MalformedData: [] }
    | { WrongSignature: [] }
    | { NonceMismatch: [] }
    | { WrongContract: [] }
    | { WrongEntryPoint: [] }
    | { Expired: [] }
    | { InvalidUnstakeAmount: [] }
  >SDK.ReturnValue.parseWithSchemaTypeBase64(
    invokeResult.returnValue,
    "FRkAAAALAAAAUGFyc2VQYXJhbXMCDAAAAFVuQXV0aG9yaXplZAISAAAASW52YWxpZFN0YWtlQW1vdW50AgwAAABOb1N0YWtlRm91bmQCCwAAAE9ubHlBY2NvdW50AgkAAABPbmx5QWRtaW4CEwAAAEludm9rZUNvbnRyYWN0RXJyb3ICCwAAAFBhcnNlUmVzdWx0Ag8AAABJbnZhbGlkUmVzcG9uc2UCBwAAAExvZ0Z1bGwCDAAAAExvZ01hbGZvcm1lZAIaAAAARmFpbGVkVXBncmFkZU1pc3NpbmdNb2R1bGUCHAAAAEZhaWxlZFVwZ3JhZGVNaXNzaW5nQ29udHJhY3QCJQAAAEZhaWxlZFVwZ3JhZGVVbnN1cHBvcnRlZE1vZHVsZVZlcnNpb24CDgAAAENvbnRyYWN0UGF1c2VkAhEAAABJbnN1ZmZpY2llbnRGdW5kcwIQAAAATm90VG9rZW5Db250cmFjdAIOAAAATWlzc2luZ0FjY291bnQCDQAAAE1hbGZvcm1lZERhdGECDgAAAFdyb25nU2lnbmF0dXJlAg0AAABOb25jZU1pc21hdGNoAg0AAABXcm9uZ0NvbnRyYWN0Ag8AAABXcm9uZ0VudHJ5UG9pbnQCBwAAAEV4cGlyZWQCFAAAAEludmFsaWRVbnN0YWtlQW1vdW50Ag=="
  );
  let match146:
    | { type: "ParseParams" }
    | { type: "UnAuthorized" }
    | { type: "InvalidStakeAmount" }
    | { type: "NoStakeFound" }
    | { type: "OnlyAccount" }
    | { type: "OnlyAdmin" }
    | { type: "InvokeContractError" }
    | { type: "ParseResult" }
    | { type: "InvalidResponse" }
    | { type: "LogFull" }
    | { type: "LogMalformed" }
    | { type: "FailedUpgradeMissingModule" }
    | { type: "FailedUpgradeMissingContract" }
    | { type: "FailedUpgradeUnsupportedModuleVersion" }
    | { type: "ContractPaused" }
    | { type: "InsufficientFunds" }
    | { type: "NotTokenContract" }
    | { type: "MissingAccount" }
    | { type: "MalformedData" }
    | { type: "WrongSignature" }
    | { type: "NonceMismatch" }
    | { type: "WrongContract" }
    | { type: "WrongEntryPoint" }
    | { type: "Expired" }
    | { type: "InvalidUnstakeAmount" };
  if ("ParseParams" in schemaJson) {
    match146 = {
      type: "ParseParams",
    };
  } else if ("UnAuthorized" in schemaJson) {
    match146 = {
      type: "UnAuthorized",
    };
  } else if ("InvalidStakeAmount" in schemaJson) {
    match146 = {
      type: "InvalidStakeAmount",
    };
  } else if ("NoStakeFound" in schemaJson) {
    match146 = {
      type: "NoStakeFound",
    };
  } else if ("OnlyAccount" in schemaJson) {
    match146 = {
      type: "OnlyAccount",
    };
  } else if ("OnlyAdmin" in schemaJson) {
    match146 = {
      type: "OnlyAdmin",
    };
  } else if ("InvokeContractError" in schemaJson) {
    match146 = {
      type: "InvokeContractError",
    };
  } else if ("ParseResult" in schemaJson) {
    match146 = {
      type: "ParseResult",
    };
  } else if ("InvalidResponse" in schemaJson) {
    match146 = {
      type: "InvalidResponse",
    };
  } else if ("LogFull" in schemaJson) {
    match146 = {
      type: "LogFull",
    };
  } else if ("LogMalformed" in schemaJson) {
    match146 = {
      type: "LogMalformed",
    };
  } else if ("FailedUpgradeMissingModule" in schemaJson) {
    match146 = {
      type: "FailedUpgradeMissingModule",
    };
  } else if ("FailedUpgradeMissingContract" in schemaJson) {
    match146 = {
      type: "FailedUpgradeMissingContract",
    };
  } else if ("FailedUpgradeUnsupportedModuleVersion" in schemaJson) {
    match146 = {
      type: "FailedUpgradeUnsupportedModuleVersion",
    };
  } else if ("ContractPaused" in schemaJson) {
    match146 = {
      type: "ContractPaused",
    };
  } else if ("InsufficientFunds" in schemaJson) {
    match146 = {
      type: "InsufficientFunds",
    };
  } else if ("NotTokenContract" in schemaJson) {
    match146 = {
      type: "NotTokenContract",
    };
  } else if ("MissingAccount" in schemaJson) {
    match146 = {
      type: "MissingAccount",
    };
  } else if ("MalformedData" in schemaJson) {
    match146 = {
      type: "MalformedData",
    };
  } else if ("WrongSignature" in schemaJson) {
    match146 = {
      type: "WrongSignature",
    };
  } else if ("NonceMismatch" in schemaJson) {
    match146 = {
      type: "NonceMismatch",
    };
  } else if ("WrongContract" in schemaJson) {
    match146 = {
      type: "WrongContract",
    };
  } else if ("WrongEntryPoint" in schemaJson) {
    match146 = {
      type: "WrongEntryPoint",
    };
  } else if ("Expired" in schemaJson) {
    match146 = {
      type: "Expired",
    };
  } else if ("InvalidUnstakeAmount" in schemaJson) {
    match146 = {
      type: "InvalidUnstakeAmount",
    };
  } else {
    throw new Error("Unexpected enum variant");
  }

  return match146;
}
/** Base64 encoding of the parameter schema type for update transactions to 'withdrawEuroe' entrypoint of the 'concordium_staking' contract. */
const base64WithdrawEuroeParameterSchema =
  "FAACAAAAEAAAAHdpdGhkcmF3X2FkZHJlc3MLBgAAAGFtb3VudBslAAAA";
/** Parameter JSON type needed by the schema for update transaction for 'withdrawEuroe' entrypoint of the 'concordium_staking' contract. */
type WithdrawEuroeParameterSchemaJson = {
  withdraw_address: SDK.AccountAddress.SchemaValue;
  amount: string;
};
/** Parameter type for update transaction for 'withdrawEuroe' entrypoint of the 'concordium_staking' contract. */
export type WithdrawEuroeParameter = {
  withdraw_address: SDK.AccountAddress.Type;
  amount: number | bigint;
};

/**
 * Construct schema JSON representation used in update transaction for 'withdrawEuroe' entrypoint of the 'concordium_staking' contract.
 * @param {WithdrawEuroeParameter} parameter The structured parameter to construct from.
 * @returns {WithdrawEuroeParameterSchemaJson} The smart contract parameter JSON.
 */
function createWithdrawEuroeParameterSchemaJson(
  parameter: WithdrawEuroeParameter
): WithdrawEuroeParameterSchemaJson {
  const field174 = parameter.withdraw_address;
  const accountAddress175 = SDK.AccountAddress.toSchemaValue(field174);
  const field176 = parameter.amount;
  const leb172 = BigInt(field176).toString();
  const named173 = {
    withdraw_address: accountAddress175,
    amount: leb172,
  };
  return named173;
}

/**
 * Construct Parameter type used in update transaction for 'withdrawEuroe' entrypoint of the 'concordium_staking' contract.
 * @param {WithdrawEuroeParameter} parameter The structured parameter to construct from.
 * @returns {SDK.Parameter.Type} The smart contract parameter.
 */
export function createWithdrawEuroeParameter(
  parameter: WithdrawEuroeParameter
): SDK.Parameter.Type {
  return SDK.Parameter.fromBase64SchemaType(
    base64WithdrawEuroeParameterSchema,
    createWithdrawEuroeParameterSchemaJson(parameter)
  );
}

/**
 * Construct WebWallet parameter type used in update transaction for 'withdrawEuroe' entrypoint of the 'concordium_staking' contract.
 * @param {WithdrawEuroeParameter} parameter The structured parameter to construct from.
 * @returns The smart contract parameter support by the WebWallet.
 */
export function createWithdrawEuroeParameterWebWallet(parameter: WithdrawEuroeParameter) {
  return {
    parameters: createWithdrawEuroeParameterSchemaJson(parameter),
    schema: {
      type: "TypeSchema" as const,
      value: SDK.toBuffer(base64WithdrawEuroeParameterSchema, "base64"),
    },
  };
}

/**
 * Send an update-contract transaction to the 'withdrawEuroe' entrypoint of the 'concordium_staking' contract.
 * @param {ConcordiumStakingContract} contractClient The client for a 'concordium_staking' smart contract instance on chain.
 * @param {SDK.ContractTransactionMetadata} transactionMetadata - Metadata related to constructing a transaction for a smart contract.
 * @param {WithdrawEuroeParameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.AccountSigner} signer - The signer of the update contract transaction.
 * @throws If the entrypoint is not successfully invoked.
 * @returns {SDK.TransactionHash.Type} Hash of the transaction.
 */
export function sendWithdrawEuroe(
  contractClient: ConcordiumStakingContract,
  transactionMetadata: SDK.ContractTransactionMetadata,
  parameter: WithdrawEuroeParameter,
  signer: SDK.AccountSigner
): Promise<SDK.TransactionHash.Type> {
  return contractClient.genericContract.createAndSendUpdateTransaction(
    SDK.EntrypointName.fromStringUnchecked("withdrawEuroe"),
    SDK.Parameter.toBuffer,
    transactionMetadata,
    createWithdrawEuroeParameter(parameter),
    signer
  );
}

/**
 * Dry-run an update-contract transaction to the 'withdrawEuroe' entrypoint of the 'concordium_staking' contract.
 * @param {ConcordiumStakingContract} contractClient The client for a 'concordium_staking' smart contract instance on chain.
 * @param {SDK.ContractAddress.Type | SDK.AccountAddress.Type} invokeMetadata - The address of the account or contract which is invoking this transaction.
 * @param {WithdrawEuroeParameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.BlockHash.Type} [blockHash] - Optional block hash allowing for dry-running the transaction at the end of a specific block.
 * @throws {SDK.RpcError} If failing to communicate with the concordium node or if any of the checks fails.
 * @returns {SDK.InvokeContractResult} The result of invoking the smart contract instance.
 */
export function dryRunWithdrawEuroe(
  contractClient: ConcordiumStakingContract,
  parameter: WithdrawEuroeParameter,
  invokeMetadata: SDK.ContractInvokeMetadata = {},
  blockHash?: SDK.BlockHash.Type
): Promise<SDK.InvokeContractResult> {
  return contractClient.genericContract.dryRun.invokeMethod(
    SDK.EntrypointName.fromStringUnchecked("withdrawEuroe"),
    invokeMetadata,
    SDK.Parameter.toBuffer,
    createWithdrawEuroeParameter(parameter),
    blockHash
  );
}

/** Error message for dry-running update transaction for 'withdrawEuroe' entrypoint of the 'concordium_staking' contract. */
export type ErrorMessageWithdrawEuroe =
  | { type: "ParseParams" }
  | { type: "UnAuthorized" }
  | { type: "InvalidStakeAmount" }
  | { type: "NoStakeFound" }
  | { type: "OnlyAccount" }
  | { type: "OnlyAdmin" }
  | { type: "InvokeContractError" }
  | { type: "ParseResult" }
  | { type: "InvalidResponse" }
  | { type: "LogFull" }
  | { type: "LogMalformed" }
  | { type: "FailedUpgradeMissingModule" }
  | { type: "FailedUpgradeMissingContract" }
  | { type: "FailedUpgradeUnsupportedModuleVersion" }
  | { type: "ContractPaused" }
  | { type: "InsufficientFunds" }
  | { type: "NotTokenContract" }
  | { type: "MissingAccount" }
  | { type: "MalformedData" }
  | { type: "WrongSignature" }
  | { type: "NonceMismatch" }
  | { type: "WrongContract" }
  | { type: "WrongEntryPoint" }
  | { type: "Expired" }
  | { type: "InvalidUnstakeAmount" };

/**
 * Get and parse the error message from dry-running update transaction for 'withdrawEuroe' entrypoint of the 'concordium_staking' contract.
 * Returns undefined if the result is not a failure.
 * @param {SDK.InvokeContractResult} invokeResult The result from dry-running the transaction.
 * @returns {ErrorMessageWithdrawEuroe | undefined} The structured error message or undefined if result was not a failure or failed for other reason than contract rejectedReceive.
 */
export function parseErrorMessageWithdrawEuroe(
  invokeResult: SDK.InvokeContractResult
): ErrorMessageWithdrawEuroe | undefined {
  if (invokeResult.tag !== "failure" || invokeResult.reason.tag !== "RejectedReceive") {
    return undefined;
  }

  if (invokeResult.returnValue === undefined) {
    throw new Error(
      "Unexpected missing 'returnValue' in result of invocation. Client expected a V1 smart contract."
    );
  }

  const schemaJson = <
    | { ParseParams: [] }
    | { UnAuthorized: [] }
    | { InvalidStakeAmount: [] }
    | { NoStakeFound: [] }
    | { OnlyAccount: [] }
    | { OnlyAdmin: [] }
    | { InvokeContractError: [] }
    | { ParseResult: [] }
    | { InvalidResponse: [] }
    | { LogFull: [] }
    | { LogMalformed: [] }
    | { FailedUpgradeMissingModule: [] }
    | { FailedUpgradeMissingContract: [] }
    | { FailedUpgradeUnsupportedModuleVersion: [] }
    | { ContractPaused: [] }
    | { InsufficientFunds: [] }
    | { NotTokenContract: [] }
    | { MissingAccount: [] }
    | { MalformedData: [] }
    | { WrongSignature: [] }
    | { NonceMismatch: [] }
    | { WrongContract: [] }
    | { WrongEntryPoint: [] }
    | { Expired: [] }
    | { InvalidUnstakeAmount: [] }
  >SDK.ReturnValue.parseWithSchemaTypeBase64(
    invokeResult.returnValue,
    "FRkAAAALAAAAUGFyc2VQYXJhbXMCDAAAAFVuQXV0aG9yaXplZAISAAAASW52YWxpZFN0YWtlQW1vdW50AgwAAABOb1N0YWtlRm91bmQCCwAAAE9ubHlBY2NvdW50AgkAAABPbmx5QWRtaW4CEwAAAEludm9rZUNvbnRyYWN0RXJyb3ICCwAAAFBhcnNlUmVzdWx0Ag8AAABJbnZhbGlkUmVzcG9uc2UCBwAAAExvZ0Z1bGwCDAAAAExvZ01hbGZvcm1lZAIaAAAARmFpbGVkVXBncmFkZU1pc3NpbmdNb2R1bGUCHAAAAEZhaWxlZFVwZ3JhZGVNaXNzaW5nQ29udHJhY3QCJQAAAEZhaWxlZFVwZ3JhZGVVbnN1cHBvcnRlZE1vZHVsZVZlcnNpb24CDgAAAENvbnRyYWN0UGF1c2VkAhEAAABJbnN1ZmZpY2llbnRGdW5kcwIQAAAATm90VG9rZW5Db250cmFjdAIOAAAATWlzc2luZ0FjY291bnQCDQAAAE1hbGZvcm1lZERhdGECDgAAAFdyb25nU2lnbmF0dXJlAg0AAABOb25jZU1pc21hdGNoAg0AAABXcm9uZ0NvbnRyYWN0Ag8AAABXcm9uZ0VudHJ5UG9pbnQCBwAAAEV4cGlyZWQCFAAAAEludmFsaWRVbnN0YWtlQW1vdW50Ag=="
  );
  let match177:
    | { type: "ParseParams" }
    | { type: "UnAuthorized" }
    | { type: "InvalidStakeAmount" }
    | { type: "NoStakeFound" }
    | { type: "OnlyAccount" }
    | { type: "OnlyAdmin" }
    | { type: "InvokeContractError" }
    | { type: "ParseResult" }
    | { type: "InvalidResponse" }
    | { type: "LogFull" }
    | { type: "LogMalformed" }
    | { type: "FailedUpgradeMissingModule" }
    | { type: "FailedUpgradeMissingContract" }
    | { type: "FailedUpgradeUnsupportedModuleVersion" }
    | { type: "ContractPaused" }
    | { type: "InsufficientFunds" }
    | { type: "NotTokenContract" }
    | { type: "MissingAccount" }
    | { type: "MalformedData" }
    | { type: "WrongSignature" }
    | { type: "NonceMismatch" }
    | { type: "WrongContract" }
    | { type: "WrongEntryPoint" }
    | { type: "Expired" }
    | { type: "InvalidUnstakeAmount" };
  if ("ParseParams" in schemaJson) {
    match177 = {
      type: "ParseParams",
    };
  } else if ("UnAuthorized" in schemaJson) {
    match177 = {
      type: "UnAuthorized",
    };
  } else if ("InvalidStakeAmount" in schemaJson) {
    match177 = {
      type: "InvalidStakeAmount",
    };
  } else if ("NoStakeFound" in schemaJson) {
    match177 = {
      type: "NoStakeFound",
    };
  } else if ("OnlyAccount" in schemaJson) {
    match177 = {
      type: "OnlyAccount",
    };
  } else if ("OnlyAdmin" in schemaJson) {
    match177 = {
      type: "OnlyAdmin",
    };
  } else if ("InvokeContractError" in schemaJson) {
    match177 = {
      type: "InvokeContractError",
    };
  } else if ("ParseResult" in schemaJson) {
    match177 = {
      type: "ParseResult",
    };
  } else if ("InvalidResponse" in schemaJson) {
    match177 = {
      type: "InvalidResponse",
    };
  } else if ("LogFull" in schemaJson) {
    match177 = {
      type: "LogFull",
    };
  } else if ("LogMalformed" in schemaJson) {
    match177 = {
      type: "LogMalformed",
    };
  } else if ("FailedUpgradeMissingModule" in schemaJson) {
    match177 = {
      type: "FailedUpgradeMissingModule",
    };
  } else if ("FailedUpgradeMissingContract" in schemaJson) {
    match177 = {
      type: "FailedUpgradeMissingContract",
    };
  } else if ("FailedUpgradeUnsupportedModuleVersion" in schemaJson) {
    match177 = {
      type: "FailedUpgradeUnsupportedModuleVersion",
    };
  } else if ("ContractPaused" in schemaJson) {
    match177 = {
      type: "ContractPaused",
    };
  } else if ("InsufficientFunds" in schemaJson) {
    match177 = {
      type: "InsufficientFunds",
    };
  } else if ("NotTokenContract" in schemaJson) {
    match177 = {
      type: "NotTokenContract",
    };
  } else if ("MissingAccount" in schemaJson) {
    match177 = {
      type: "MissingAccount",
    };
  } else if ("MalformedData" in schemaJson) {
    match177 = {
      type: "MalformedData",
    };
  } else if ("WrongSignature" in schemaJson) {
    match177 = {
      type: "WrongSignature",
    };
  } else if ("NonceMismatch" in schemaJson) {
    match177 = {
      type: "NonceMismatch",
    };
  } else if ("WrongContract" in schemaJson) {
    match177 = {
      type: "WrongContract",
    };
  } else if ("WrongEntryPoint" in schemaJson) {
    match177 = {
      type: "WrongEntryPoint",
    };
  } else if ("Expired" in schemaJson) {
    match177 = {
      type: "Expired",
    };
  } else if ("InvalidUnstakeAmount" in schemaJson) {
    match177 = {
      type: "InvalidUnstakeAmount",
    };
  } else {
    throw new Error("Unexpected enum variant");
  }

  return match177;
}
/** Base64 encoding of the parameter schema type for update transactions to 'setPaused' entrypoint of the 'concordium_staking' contract. */
const base64SetPausedParameterSchema = "FAABAAAABgAAAHBhdXNlZAE=";
/** Parameter JSON type needed by the schema for update transaction for 'setPaused' entrypoint of the 'concordium_staking' contract. */
type SetPausedParameterSchemaJson = {
  paused: boolean;
};
/** Parameter type for update transaction for 'setPaused' entrypoint of the 'concordium_staking' contract. */
export type SetPausedParameter = {
  paused: boolean;
};

/**
 * Construct schema JSON representation used in update transaction for 'setPaused' entrypoint of the 'concordium_staking' contract.
 * @param {SetPausedParameter} parameter The structured parameter to construct from.
 * @returns {SetPausedParameterSchemaJson} The smart contract parameter JSON.
 */
function createSetPausedParameterSchemaJson(
  parameter: SetPausedParameter
): SetPausedParameterSchemaJson {
  const field204 = parameter.paused;
  const named203 = {
    paused: field204,
  };
  return named203;
}

/**
 * Construct Parameter type used in update transaction for 'setPaused' entrypoint of the 'concordium_staking' contract.
 * @param {SetPausedParameter} parameter The structured parameter to construct from.
 * @returns {SDK.Parameter.Type} The smart contract parameter.
 */
export function createSetPausedParameter(parameter: SetPausedParameter): SDK.Parameter.Type {
  return SDK.Parameter.fromBase64SchemaType(
    base64SetPausedParameterSchema,
    createSetPausedParameterSchemaJson(parameter)
  );
}

/**
 * Construct WebWallet parameter type used in update transaction for 'setPaused' entrypoint of the 'concordium_staking' contract.
 * @param {SetPausedParameter} parameter The structured parameter to construct from.
 * @returns The smart contract parameter support by the WebWallet.
 */
export function createSetPausedParameterWebWallet(parameter: SetPausedParameter) {
  return {
    parameters: createSetPausedParameterSchemaJson(parameter),
    schema: {
      type: "TypeSchema" as const,
      value: SDK.toBuffer(base64SetPausedParameterSchema, "base64"),
    },
  };
}

/**
 * Send an update-contract transaction to the 'setPaused' entrypoint of the 'concordium_staking' contract.
 * @param {ConcordiumStakingContract} contractClient The client for a 'concordium_staking' smart contract instance on chain.
 * @param {SDK.ContractTransactionMetadata} transactionMetadata - Metadata related to constructing a transaction for a smart contract.
 * @param {SetPausedParameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.AccountSigner} signer - The signer of the update contract transaction.
 * @throws If the entrypoint is not successfully invoked.
 * @returns {SDK.TransactionHash.Type} Hash of the transaction.
 */
export function sendSetPaused(
  contractClient: ConcordiumStakingContract,
  transactionMetadata: SDK.ContractTransactionMetadata,
  parameter: SetPausedParameter,
  signer: SDK.AccountSigner
): Promise<SDK.TransactionHash.Type> {
  return contractClient.genericContract.createAndSendUpdateTransaction(
    SDK.EntrypointName.fromStringUnchecked("setPaused"),
    SDK.Parameter.toBuffer,
    transactionMetadata,
    createSetPausedParameter(parameter),
    signer
  );
}

/**
 * Dry-run an update-contract transaction to the 'setPaused' entrypoint of the 'concordium_staking' contract.
 * @param {ConcordiumStakingContract} contractClient The client for a 'concordium_staking' smart contract instance on chain.
 * @param {SDK.ContractAddress.Type | SDK.AccountAddress.Type} invokeMetadata - The address of the account or contract which is invoking this transaction.
 * @param {SetPausedParameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.BlockHash.Type} [blockHash] - Optional block hash allowing for dry-running the transaction at the end of a specific block.
 * @throws {SDK.RpcError} If failing to communicate with the concordium node or if any of the checks fails.
 * @returns {SDK.InvokeContractResult} The result of invoking the smart contract instance.
 */
export function dryRunSetPaused(
  contractClient: ConcordiumStakingContract,
  parameter: SetPausedParameter,
  invokeMetadata: SDK.ContractInvokeMetadata = {},
  blockHash?: SDK.BlockHash.Type
): Promise<SDK.InvokeContractResult> {
  return contractClient.genericContract.dryRun.invokeMethod(
    SDK.EntrypointName.fromStringUnchecked("setPaused"),
    invokeMetadata,
    SDK.Parameter.toBuffer,
    createSetPausedParameter(parameter),
    blockHash
  );
}

/** Error message for dry-running update transaction for 'setPaused' entrypoint of the 'concordium_staking' contract. */
export type ErrorMessageSetPaused =
  | { type: "ParseParams" }
  | { type: "UnAuthorized" }
  | { type: "InvalidStakeAmount" }
  | { type: "NoStakeFound" }
  | { type: "OnlyAccount" }
  | { type: "OnlyAdmin" }
  | { type: "InvokeContractError" }
  | { type: "ParseResult" }
  | { type: "InvalidResponse" }
  | { type: "LogFull" }
  | { type: "LogMalformed" }
  | { type: "FailedUpgradeMissingModule" }
  | { type: "FailedUpgradeMissingContract" }
  | { type: "FailedUpgradeUnsupportedModuleVersion" }
  | { type: "ContractPaused" }
  | { type: "InsufficientFunds" }
  | { type: "NotTokenContract" }
  | { type: "MissingAccount" }
  | { type: "MalformedData" }
  | { type: "WrongSignature" }
  | { type: "NonceMismatch" }
  | { type: "WrongContract" }
  | { type: "WrongEntryPoint" }
  | { type: "Expired" }
  | { type: "InvalidUnstakeAmount" };

/**
 * Get and parse the error message from dry-running update transaction for 'setPaused' entrypoint of the 'concordium_staking' contract.
 * Returns undefined if the result is not a failure.
 * @param {SDK.InvokeContractResult} invokeResult The result from dry-running the transaction.
 * @returns {ErrorMessageSetPaused | undefined} The structured error message or undefined if result was not a failure or failed for other reason than contract rejectedReceive.
 */
export function parseErrorMessageSetPaused(
  invokeResult: SDK.InvokeContractResult
): ErrorMessageSetPaused | undefined {
  if (invokeResult.tag !== "failure" || invokeResult.reason.tag !== "RejectedReceive") {
    return undefined;
  }

  if (invokeResult.returnValue === undefined) {
    throw new Error(
      "Unexpected missing 'returnValue' in result of invocation. Client expected a V1 smart contract."
    );
  }

  const schemaJson = <
    | { ParseParams: [] }
    | { UnAuthorized: [] }
    | { InvalidStakeAmount: [] }
    | { NoStakeFound: [] }
    | { OnlyAccount: [] }
    | { OnlyAdmin: [] }
    | { InvokeContractError: [] }
    | { ParseResult: [] }
    | { InvalidResponse: [] }
    | { LogFull: [] }
    | { LogMalformed: [] }
    | { FailedUpgradeMissingModule: [] }
    | { FailedUpgradeMissingContract: [] }
    | { FailedUpgradeUnsupportedModuleVersion: [] }
    | { ContractPaused: [] }
    | { InsufficientFunds: [] }
    | { NotTokenContract: [] }
    | { MissingAccount: [] }
    | { MalformedData: [] }
    | { WrongSignature: [] }
    | { NonceMismatch: [] }
    | { WrongContract: [] }
    | { WrongEntryPoint: [] }
    | { Expired: [] }
    | { InvalidUnstakeAmount: [] }
  >SDK.ReturnValue.parseWithSchemaTypeBase64(
    invokeResult.returnValue,
    "FRkAAAALAAAAUGFyc2VQYXJhbXMCDAAAAFVuQXV0aG9yaXplZAISAAAASW52YWxpZFN0YWtlQW1vdW50AgwAAABOb1N0YWtlRm91bmQCCwAAAE9ubHlBY2NvdW50AgkAAABPbmx5QWRtaW4CEwAAAEludm9rZUNvbnRyYWN0RXJyb3ICCwAAAFBhcnNlUmVzdWx0Ag8AAABJbnZhbGlkUmVzcG9uc2UCBwAAAExvZ0Z1bGwCDAAAAExvZ01hbGZvcm1lZAIaAAAARmFpbGVkVXBncmFkZU1pc3NpbmdNb2R1bGUCHAAAAEZhaWxlZFVwZ3JhZGVNaXNzaW5nQ29udHJhY3QCJQAAAEZhaWxlZFVwZ3JhZGVVbnN1cHBvcnRlZE1vZHVsZVZlcnNpb24CDgAAAENvbnRyYWN0UGF1c2VkAhEAAABJbnN1ZmZpY2llbnRGdW5kcwIQAAAATm90VG9rZW5Db250cmFjdAIOAAAATWlzc2luZ0FjY291bnQCDQAAAE1hbGZvcm1lZERhdGECDgAAAFdyb25nU2lnbmF0dXJlAg0AAABOb25jZU1pc21hdGNoAg0AAABXcm9uZ0NvbnRyYWN0Ag8AAABXcm9uZ0VudHJ5UG9pbnQCBwAAAEV4cGlyZWQCFAAAAEludmFsaWRVbnN0YWtlQW1vdW50Ag=="
  );
  let match205:
    | { type: "ParseParams" }
    | { type: "UnAuthorized" }
    | { type: "InvalidStakeAmount" }
    | { type: "NoStakeFound" }
    | { type: "OnlyAccount" }
    | { type: "OnlyAdmin" }
    | { type: "InvokeContractError" }
    | { type: "ParseResult" }
    | { type: "InvalidResponse" }
    | { type: "LogFull" }
    | { type: "LogMalformed" }
    | { type: "FailedUpgradeMissingModule" }
    | { type: "FailedUpgradeMissingContract" }
    | { type: "FailedUpgradeUnsupportedModuleVersion" }
    | { type: "ContractPaused" }
    | { type: "InsufficientFunds" }
    | { type: "NotTokenContract" }
    | { type: "MissingAccount" }
    | { type: "MalformedData" }
    | { type: "WrongSignature" }
    | { type: "NonceMismatch" }
    | { type: "WrongContract" }
    | { type: "WrongEntryPoint" }
    | { type: "Expired" }
    | { type: "InvalidUnstakeAmount" };
  if ("ParseParams" in schemaJson) {
    match205 = {
      type: "ParseParams",
    };
  } else if ("UnAuthorized" in schemaJson) {
    match205 = {
      type: "UnAuthorized",
    };
  } else if ("InvalidStakeAmount" in schemaJson) {
    match205 = {
      type: "InvalidStakeAmount",
    };
  } else if ("NoStakeFound" in schemaJson) {
    match205 = {
      type: "NoStakeFound",
    };
  } else if ("OnlyAccount" in schemaJson) {
    match205 = {
      type: "OnlyAccount",
    };
  } else if ("OnlyAdmin" in schemaJson) {
    match205 = {
      type: "OnlyAdmin",
    };
  } else if ("InvokeContractError" in schemaJson) {
    match205 = {
      type: "InvokeContractError",
    };
  } else if ("ParseResult" in schemaJson) {
    match205 = {
      type: "ParseResult",
    };
  } else if ("InvalidResponse" in schemaJson) {
    match205 = {
      type: "InvalidResponse",
    };
  } else if ("LogFull" in schemaJson) {
    match205 = {
      type: "LogFull",
    };
  } else if ("LogMalformed" in schemaJson) {
    match205 = {
      type: "LogMalformed",
    };
  } else if ("FailedUpgradeMissingModule" in schemaJson) {
    match205 = {
      type: "FailedUpgradeMissingModule",
    };
  } else if ("FailedUpgradeMissingContract" in schemaJson) {
    match205 = {
      type: "FailedUpgradeMissingContract",
    };
  } else if ("FailedUpgradeUnsupportedModuleVersion" in schemaJson) {
    match205 = {
      type: "FailedUpgradeUnsupportedModuleVersion",
    };
  } else if ("ContractPaused" in schemaJson) {
    match205 = {
      type: "ContractPaused",
    };
  } else if ("InsufficientFunds" in schemaJson) {
    match205 = {
      type: "InsufficientFunds",
    };
  } else if ("NotTokenContract" in schemaJson) {
    match205 = {
      type: "NotTokenContract",
    };
  } else if ("MissingAccount" in schemaJson) {
    match205 = {
      type: "MissingAccount",
    };
  } else if ("MalformedData" in schemaJson) {
    match205 = {
      type: "MalformedData",
    };
  } else if ("WrongSignature" in schemaJson) {
    match205 = {
      type: "WrongSignature",
    };
  } else if ("NonceMismatch" in schemaJson) {
    match205 = {
      type: "NonceMismatch",
    };
  } else if ("WrongContract" in schemaJson) {
    match205 = {
      type: "WrongContract",
    };
  } else if ("WrongEntryPoint" in schemaJson) {
    match205 = {
      type: "WrongEntryPoint",
    };
  } else if ("Expired" in schemaJson) {
    match205 = {
      type: "Expired",
    };
  } else if ("InvalidUnstakeAmount" in schemaJson) {
    match205 = {
      type: "InvalidUnstakeAmount",
    };
  } else {
    throw new Error("Unexpected enum variant");
  }

  return match205;
}
/** Base64 encoding of the parameter schema type for update transactions to 'updateApr' entrypoint of the 'concordium_staking' contract. */
const base64UpdateAprParameterSchema = "FAABAAAABwAAAG5ld19hcHIF";
/** Parameter JSON type needed by the schema for update transaction for 'updateApr' entrypoint of the 'concordium_staking' contract. */
type UpdateAprParameterSchemaJson = {
  new_apr: bigint;
};
/** Parameter type for update transaction for 'updateApr' entrypoint of the 'concordium_staking' contract. */
export type UpdateAprParameter = {
  new_apr: number | bigint;
};

/**
 * Construct schema JSON representation used in update transaction for 'updateApr' entrypoint of the 'concordium_staking' contract.
 * @param {UpdateAprParameter} parameter The structured parameter to construct from.
 * @returns {UpdateAprParameterSchemaJson} The smart contract parameter JSON.
 */
function createUpdateAprParameterSchemaJson(
  parameter: UpdateAprParameter
): UpdateAprParameterSchemaJson {
  const field232 = parameter.new_apr;
  const number233 = BigInt(field232);
  const named231 = {
    new_apr: number233,
  };
  return named231;
}

/**
 * Construct Parameter type used in update transaction for 'updateApr' entrypoint of the 'concordium_staking' contract.
 * @param {UpdateAprParameter} parameter The structured parameter to construct from.
 * @returns {SDK.Parameter.Type} The smart contract parameter.
 */
export function createUpdateAprParameter(parameter: UpdateAprParameter): SDK.Parameter.Type {
  return SDK.Parameter.fromBase64SchemaType(
    base64UpdateAprParameterSchema,
    createUpdateAprParameterSchemaJson(parameter)
  );
}

/**
 * Construct WebWallet parameter type used in update transaction for 'updateApr' entrypoint of the 'concordium_staking' contract.
 * @param {UpdateAprParameter} parameter The structured parameter to construct from.
 * @returns The smart contract parameter support by the WebWallet.
 */
export function createUpdateAprParameterWebWallet(parameter: UpdateAprParameter) {
  return {
    parameters: createUpdateAprParameterSchemaJson(parameter),
    schema: {
      type: "TypeSchema" as const,
      value: SDK.toBuffer(base64UpdateAprParameterSchema, "base64"),
    },
  };
}

/**
 * Send an update-contract transaction to the 'updateApr' entrypoint of the 'concordium_staking' contract.
 * @param {ConcordiumStakingContract} contractClient The client for a 'concordium_staking' smart contract instance on chain.
 * @param {SDK.ContractTransactionMetadata} transactionMetadata - Metadata related to constructing a transaction for a smart contract.
 * @param {UpdateAprParameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.AccountSigner} signer - The signer of the update contract transaction.
 * @throws If the entrypoint is not successfully invoked.
 * @returns {SDK.TransactionHash.Type} Hash of the transaction.
 */
export function sendUpdateApr(
  contractClient: ConcordiumStakingContract,
  transactionMetadata: SDK.ContractTransactionMetadata,
  parameter: UpdateAprParameter,
  signer: SDK.AccountSigner
): Promise<SDK.TransactionHash.Type> {
  return contractClient.genericContract.createAndSendUpdateTransaction(
    SDK.EntrypointName.fromStringUnchecked("updateApr"),
    SDK.Parameter.toBuffer,
    transactionMetadata,
    createUpdateAprParameter(parameter),
    signer
  );
}

/**
 * Dry-run an update-contract transaction to the 'updateApr' entrypoint of the 'concordium_staking' contract.
 * @param {ConcordiumStakingContract} contractClient The client for a 'concordium_staking' smart contract instance on chain.
 * @param {SDK.ContractAddress.Type | SDK.AccountAddress.Type} invokeMetadata - The address of the account or contract which is invoking this transaction.
 * @param {UpdateAprParameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.BlockHash.Type} [blockHash] - Optional block hash allowing for dry-running the transaction at the end of a specific block.
 * @throws {SDK.RpcError} If failing to communicate with the concordium node or if any of the checks fails.
 * @returns {SDK.InvokeContractResult} The result of invoking the smart contract instance.
 */
export function dryRunUpdateApr(
  contractClient: ConcordiumStakingContract,
  parameter: UpdateAprParameter,
  invokeMetadata: SDK.ContractInvokeMetadata = {},
  blockHash?: SDK.BlockHash.Type
): Promise<SDK.InvokeContractResult> {
  return contractClient.genericContract.dryRun.invokeMethod(
    SDK.EntrypointName.fromStringUnchecked("updateApr"),
    invokeMetadata,
    SDK.Parameter.toBuffer,
    createUpdateAprParameter(parameter),
    blockHash
  );
}

/** Error message for dry-running update transaction for 'updateApr' entrypoint of the 'concordium_staking' contract. */
export type ErrorMessageUpdateApr =
  | { type: "ParseParams" }
  | { type: "UnAuthorized" }
  | { type: "InvalidStakeAmount" }
  | { type: "NoStakeFound" }
  | { type: "OnlyAccount" }
  | { type: "OnlyAdmin" }
  | { type: "InvokeContractError" }
  | { type: "ParseResult" }
  | { type: "InvalidResponse" }
  | { type: "LogFull" }
  | { type: "LogMalformed" }
  | { type: "FailedUpgradeMissingModule" }
  | { type: "FailedUpgradeMissingContract" }
  | { type: "FailedUpgradeUnsupportedModuleVersion" }
  | { type: "ContractPaused" }
  | { type: "InsufficientFunds" }
  | { type: "NotTokenContract" }
  | { type: "MissingAccount" }
  | { type: "MalformedData" }
  | { type: "WrongSignature" }
  | { type: "NonceMismatch" }
  | { type: "WrongContract" }
  | { type: "WrongEntryPoint" }
  | { type: "Expired" }
  | { type: "InvalidUnstakeAmount" };

/**
 * Get and parse the error message from dry-running update transaction for 'updateApr' entrypoint of the 'concordium_staking' contract.
 * Returns undefined if the result is not a failure.
 * @param {SDK.InvokeContractResult} invokeResult The result from dry-running the transaction.
 * @returns {ErrorMessageUpdateApr | undefined} The structured error message or undefined if result was not a failure or failed for other reason than contract rejectedReceive.
 */
export function parseErrorMessageUpdateApr(
  invokeResult: SDK.InvokeContractResult
): ErrorMessageUpdateApr | undefined {
  if (invokeResult.tag !== "failure" || invokeResult.reason.tag !== "RejectedReceive") {
    return undefined;
  }

  if (invokeResult.returnValue === undefined) {
    throw new Error(
      "Unexpected missing 'returnValue' in result of invocation. Client expected a V1 smart contract."
    );
  }

  const schemaJson = <
    | { ParseParams: [] }
    | { UnAuthorized: [] }
    | { InvalidStakeAmount: [] }
    | { NoStakeFound: [] }
    | { OnlyAccount: [] }
    | { OnlyAdmin: [] }
    | { InvokeContractError: [] }
    | { ParseResult: [] }
    | { InvalidResponse: [] }
    | { LogFull: [] }
    | { LogMalformed: [] }
    | { FailedUpgradeMissingModule: [] }
    | { FailedUpgradeMissingContract: [] }
    | { FailedUpgradeUnsupportedModuleVersion: [] }
    | { ContractPaused: [] }
    | { InsufficientFunds: [] }
    | { NotTokenContract: [] }
    | { MissingAccount: [] }
    | { MalformedData: [] }
    | { WrongSignature: [] }
    | { NonceMismatch: [] }
    | { WrongContract: [] }
    | { WrongEntryPoint: [] }
    | { Expired: [] }
    | { InvalidUnstakeAmount: [] }
  >SDK.ReturnValue.parseWithSchemaTypeBase64(
    invokeResult.returnValue,
    "FRkAAAALAAAAUGFyc2VQYXJhbXMCDAAAAFVuQXV0aG9yaXplZAISAAAASW52YWxpZFN0YWtlQW1vdW50AgwAAABOb1N0YWtlRm91bmQCCwAAAE9ubHlBY2NvdW50AgkAAABPbmx5QWRtaW4CEwAAAEludm9rZUNvbnRyYWN0RXJyb3ICCwAAAFBhcnNlUmVzdWx0Ag8AAABJbnZhbGlkUmVzcG9uc2UCBwAAAExvZ0Z1bGwCDAAAAExvZ01hbGZvcm1lZAIaAAAARmFpbGVkVXBncmFkZU1pc3NpbmdNb2R1bGUCHAAAAEZhaWxlZFVwZ3JhZGVNaXNzaW5nQ29udHJhY3QCJQAAAEZhaWxlZFVwZ3JhZGVVbnN1cHBvcnRlZE1vZHVsZVZlcnNpb24CDgAAAENvbnRyYWN0UGF1c2VkAhEAAABJbnN1ZmZpY2llbnRGdW5kcwIQAAAATm90VG9rZW5Db250cmFjdAIOAAAATWlzc2luZ0FjY291bnQCDQAAAE1hbGZvcm1lZERhdGECDgAAAFdyb25nU2lnbmF0dXJlAg0AAABOb25jZU1pc21hdGNoAg0AAABXcm9uZ0NvbnRyYWN0Ag8AAABXcm9uZ0VudHJ5UG9pbnQCBwAAAEV4cGlyZWQCFAAAAEludmFsaWRVbnN0YWtlQW1vdW50Ag=="
  );
  let match234:
    | { type: "ParseParams" }
    | { type: "UnAuthorized" }
    | { type: "InvalidStakeAmount" }
    | { type: "NoStakeFound" }
    | { type: "OnlyAccount" }
    | { type: "OnlyAdmin" }
    | { type: "InvokeContractError" }
    | { type: "ParseResult" }
    | { type: "InvalidResponse" }
    | { type: "LogFull" }
    | { type: "LogMalformed" }
    | { type: "FailedUpgradeMissingModule" }
    | { type: "FailedUpgradeMissingContract" }
    | { type: "FailedUpgradeUnsupportedModuleVersion" }
    | { type: "ContractPaused" }
    | { type: "InsufficientFunds" }
    | { type: "NotTokenContract" }
    | { type: "MissingAccount" }
    | { type: "MalformedData" }
    | { type: "WrongSignature" }
    | { type: "NonceMismatch" }
    | { type: "WrongContract" }
    | { type: "WrongEntryPoint" }
    | { type: "Expired" }
    | { type: "InvalidUnstakeAmount" };
  if ("ParseParams" in schemaJson) {
    match234 = {
      type: "ParseParams",
    };
  } else if ("UnAuthorized" in schemaJson) {
    match234 = {
      type: "UnAuthorized",
    };
  } else if ("InvalidStakeAmount" in schemaJson) {
    match234 = {
      type: "InvalidStakeAmount",
    };
  } else if ("NoStakeFound" in schemaJson) {
    match234 = {
      type: "NoStakeFound",
    };
  } else if ("OnlyAccount" in schemaJson) {
    match234 = {
      type: "OnlyAccount",
    };
  } else if ("OnlyAdmin" in schemaJson) {
    match234 = {
      type: "OnlyAdmin",
    };
  } else if ("InvokeContractError" in schemaJson) {
    match234 = {
      type: "InvokeContractError",
    };
  } else if ("ParseResult" in schemaJson) {
    match234 = {
      type: "ParseResult",
    };
  } else if ("InvalidResponse" in schemaJson) {
    match234 = {
      type: "InvalidResponse",
    };
  } else if ("LogFull" in schemaJson) {
    match234 = {
      type: "LogFull",
    };
  } else if ("LogMalformed" in schemaJson) {
    match234 = {
      type: "LogMalformed",
    };
  } else if ("FailedUpgradeMissingModule" in schemaJson) {
    match234 = {
      type: "FailedUpgradeMissingModule",
    };
  } else if ("FailedUpgradeMissingContract" in schemaJson) {
    match234 = {
      type: "FailedUpgradeMissingContract",
    };
  } else if ("FailedUpgradeUnsupportedModuleVersion" in schemaJson) {
    match234 = {
      type: "FailedUpgradeUnsupportedModuleVersion",
    };
  } else if ("ContractPaused" in schemaJson) {
    match234 = {
      type: "ContractPaused",
    };
  } else if ("InsufficientFunds" in schemaJson) {
    match234 = {
      type: "InsufficientFunds",
    };
  } else if ("NotTokenContract" in schemaJson) {
    match234 = {
      type: "NotTokenContract",
    };
  } else if ("MissingAccount" in schemaJson) {
    match234 = {
      type: "MissingAccount",
    };
  } else if ("MalformedData" in schemaJson) {
    match234 = {
      type: "MalformedData",
    };
  } else if ("WrongSignature" in schemaJson) {
    match234 = {
      type: "WrongSignature",
    };
  } else if ("NonceMismatch" in schemaJson) {
    match234 = {
      type: "NonceMismatch",
    };
  } else if ("WrongContract" in schemaJson) {
    match234 = {
      type: "WrongContract",
    };
  } else if ("WrongEntryPoint" in schemaJson) {
    match234 = {
      type: "WrongEntryPoint",
    };
  } else if ("Expired" in schemaJson) {
    match234 = {
      type: "Expired",
    };
  } else if ("InvalidUnstakeAmount" in schemaJson) {
    match234 = {
      type: "InvalidUnstakeAmount",
    };
  } else {
    throw new Error("Unexpected enum variant");
  }

  return match234;
}
/** Base64 encoding of the parameter schema type for update transactions to 'upgrade' entrypoint of the 'concordium_staking' contract. */
const base64UpgradeParameterSchema =
  "FAACAAAABgAAAG1vZHVsZR4gAAAABwAAAG1pZ3JhdGUVAgAAAAQAAABOb25lAgQAAABTb21lAQEAAAAPFgEdAQ==";
/** Parameter JSON type needed by the schema for update transaction for 'upgrade' entrypoint of the 'concordium_staking' contract. */
type UpgradeParameterSchemaJson = {
  module: string;
  migrate: { None: [] } | { Some: [[string, string]] };
};
/** Parameter type for update transaction for 'upgrade' entrypoint of the 'concordium_staking' contract. */
export type UpgradeParameter = {
  module: SDK.HexString;
  migrate: { type: "None" } | { type: "Some"; content: [string, SDK.HexString] };
};

/**
 * Construct schema JSON representation used in update transaction for 'upgrade' entrypoint of the 'concordium_staking' contract.
 * @param {UpgradeParameter} parameter The structured parameter to construct from.
 * @returns {UpgradeParameterSchemaJson} The smart contract parameter JSON.
 */
function createUpgradeParameterSchemaJson(parameter: UpgradeParameter): UpgradeParameterSchemaJson {
  const field261 = parameter.module;
  const field262 = parameter.migrate;
  let match263: { None: [] } | { Some: [[string, string]] };
  switch (field262.type) {
    case "None":
      match263 = { None: [] };
      break;
    case "Some":
      const pair264: [string, string] = [field262.content[0], field262.content[1]];
      match263 = { Some: [pair264] };
      break;
  }

  const named260 = {
    module: field261,
    migrate: match263,
  };
  return named260;
}

/**
 * Construct Parameter type used in update transaction for 'upgrade' entrypoint of the 'concordium_staking' contract.
 * @param {UpgradeParameter} parameter The structured parameter to construct from.
 * @returns {SDK.Parameter.Type} The smart contract parameter.
 */
export function createUpgradeParameter(parameter: UpgradeParameter): SDK.Parameter.Type {
  return SDK.Parameter.fromBase64SchemaType(
    base64UpgradeParameterSchema,
    createUpgradeParameterSchemaJson(parameter)
  );
}

/**
 * Construct WebWallet parameter type used in update transaction for 'upgrade' entrypoint of the 'concordium_staking' contract.
 * @param {UpgradeParameter} parameter The structured parameter to construct from.
 * @returns The smart contract parameter support by the WebWallet.
 */
export function createUpgradeParameterWebWallet(parameter: UpgradeParameter) {
  return {
    parameters: createUpgradeParameterSchemaJson(parameter),
    schema: {
      type: "TypeSchema" as const,
      value: SDK.toBuffer(base64UpgradeParameterSchema, "base64"),
    },
  };
}

/**
 * Send an update-contract transaction to the 'upgrade' entrypoint of the 'concordium_staking' contract.
 * @param {ConcordiumStakingContract} contractClient The client for a 'concordium_staking' smart contract instance on chain.
 * @param {SDK.ContractTransactionMetadata} transactionMetadata - Metadata related to constructing a transaction for a smart contract.
 * @param {UpgradeParameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.AccountSigner} signer - The signer of the update contract transaction.
 * @throws If the entrypoint is not successfully invoked.
 * @returns {SDK.TransactionHash.Type} Hash of the transaction.
 */
export function sendUpgrade(
  contractClient: ConcordiumStakingContract,
  transactionMetadata: SDK.ContractTransactionMetadata,
  parameter: UpgradeParameter,
  signer: SDK.AccountSigner
): Promise<SDK.TransactionHash.Type> {
  return contractClient.genericContract.createAndSendUpdateTransaction(
    SDK.EntrypointName.fromStringUnchecked("upgrade"),
    SDK.Parameter.toBuffer,
    transactionMetadata,
    createUpgradeParameter(parameter),
    signer
  );
}

/**
 * Dry-run an update-contract transaction to the 'upgrade' entrypoint of the 'concordium_staking' contract.
 * @param {ConcordiumStakingContract} contractClient The client for a 'concordium_staking' smart contract instance on chain.
 * @param {SDK.ContractAddress.Type | SDK.AccountAddress.Type} invokeMetadata - The address of the account or contract which is invoking this transaction.
 * @param {UpgradeParameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.BlockHash.Type} [blockHash] - Optional block hash allowing for dry-running the transaction at the end of a specific block.
 * @throws {SDK.RpcError} If failing to communicate with the concordium node or if any of the checks fails.
 * @returns {SDK.InvokeContractResult} The result of invoking the smart contract instance.
 */
export function dryRunUpgrade(
  contractClient: ConcordiumStakingContract,
  parameter: UpgradeParameter,
  invokeMetadata: SDK.ContractInvokeMetadata = {},
  blockHash?: SDK.BlockHash.Type
): Promise<SDK.InvokeContractResult> {
  return contractClient.genericContract.dryRun.invokeMethod(
    SDK.EntrypointName.fromStringUnchecked("upgrade"),
    invokeMetadata,
    SDK.Parameter.toBuffer,
    createUpgradeParameter(parameter),
    blockHash
  );
}

/** Error message for dry-running update transaction for 'upgrade' entrypoint of the 'concordium_staking' contract. */
export type ErrorMessageUpgrade =
  | { type: "ParseParams" }
  | { type: "UnAuthorized" }
  | { type: "InvalidStakeAmount" }
  | { type: "NoStakeFound" }
  | { type: "OnlyAccount" }
  | { type: "OnlyAdmin" }
  | { type: "InvokeContractError" }
  | { type: "ParseResult" }
  | { type: "InvalidResponse" }
  | { type: "LogFull" }
  | { type: "LogMalformed" }
  | { type: "FailedUpgradeMissingModule" }
  | { type: "FailedUpgradeMissingContract" }
  | { type: "FailedUpgradeUnsupportedModuleVersion" }
  | { type: "ContractPaused" }
  | { type: "InsufficientFunds" }
  | { type: "NotTokenContract" }
  | { type: "MissingAccount" }
  | { type: "MalformedData" }
  | { type: "WrongSignature" }
  | { type: "NonceMismatch" }
  | { type: "WrongContract" }
  | { type: "WrongEntryPoint" }
  | { type: "Expired" }
  | { type: "InvalidUnstakeAmount" };

/**
 * Get and parse the error message from dry-running update transaction for 'upgrade' entrypoint of the 'concordium_staking' contract.
 * Returns undefined if the result is not a failure.
 * @param {SDK.InvokeContractResult} invokeResult The result from dry-running the transaction.
 * @returns {ErrorMessageUpgrade | undefined} The structured error message or undefined if result was not a failure or failed for other reason than contract rejectedReceive.
 */
export function parseErrorMessageUpgrade(
  invokeResult: SDK.InvokeContractResult
): ErrorMessageUpgrade | undefined {
  if (invokeResult.tag !== "failure" || invokeResult.reason.tag !== "RejectedReceive") {
    return undefined;
  }

  if (invokeResult.returnValue === undefined) {
    throw new Error(
      "Unexpected missing 'returnValue' in result of invocation. Client expected a V1 smart contract."
    );
  }

  const schemaJson = <
    | { ParseParams: [] }
    | { UnAuthorized: [] }
    | { InvalidStakeAmount: [] }
    | { NoStakeFound: [] }
    | { OnlyAccount: [] }
    | { OnlyAdmin: [] }
    | { InvokeContractError: [] }
    | { ParseResult: [] }
    | { InvalidResponse: [] }
    | { LogFull: [] }
    | { LogMalformed: [] }
    | { FailedUpgradeMissingModule: [] }
    | { FailedUpgradeMissingContract: [] }
    | { FailedUpgradeUnsupportedModuleVersion: [] }
    | { ContractPaused: [] }
    | { InsufficientFunds: [] }
    | { NotTokenContract: [] }
    | { MissingAccount: [] }
    | { MalformedData: [] }
    | { WrongSignature: [] }
    | { NonceMismatch: [] }
    | { WrongContract: [] }
    | { WrongEntryPoint: [] }
    | { Expired: [] }
    | { InvalidUnstakeAmount: [] }
  >SDK.ReturnValue.parseWithSchemaTypeBase64(
    invokeResult.returnValue,
    "FRkAAAALAAAAUGFyc2VQYXJhbXMCDAAAAFVuQXV0aG9yaXplZAISAAAASW52YWxpZFN0YWtlQW1vdW50AgwAAABOb1N0YWtlRm91bmQCCwAAAE9ubHlBY2NvdW50AgkAAABPbmx5QWRtaW4CEwAAAEludm9rZUNvbnRyYWN0RXJyb3ICCwAAAFBhcnNlUmVzdWx0Ag8AAABJbnZhbGlkUmVzcG9uc2UCBwAAAExvZ0Z1bGwCDAAAAExvZ01hbGZvcm1lZAIaAAAARmFpbGVkVXBncmFkZU1pc3NpbmdNb2R1bGUCHAAAAEZhaWxlZFVwZ3JhZGVNaXNzaW5nQ29udHJhY3QCJQAAAEZhaWxlZFVwZ3JhZGVVbnN1cHBvcnRlZE1vZHVsZVZlcnNpb24CDgAAAENvbnRyYWN0UGF1c2VkAhEAAABJbnN1ZmZpY2llbnRGdW5kcwIQAAAATm90VG9rZW5Db250cmFjdAIOAAAATWlzc2luZ0FjY291bnQCDQAAAE1hbGZvcm1lZERhdGECDgAAAFdyb25nU2lnbmF0dXJlAg0AAABOb25jZU1pc21hdGNoAg0AAABXcm9uZ0NvbnRyYWN0Ag8AAABXcm9uZ0VudHJ5UG9pbnQCBwAAAEV4cGlyZWQCFAAAAEludmFsaWRVbnN0YWtlQW1vdW50Ag=="
  );
  let match265:
    | { type: "ParseParams" }
    | { type: "UnAuthorized" }
    | { type: "InvalidStakeAmount" }
    | { type: "NoStakeFound" }
    | { type: "OnlyAccount" }
    | { type: "OnlyAdmin" }
    | { type: "InvokeContractError" }
    | { type: "ParseResult" }
    | { type: "InvalidResponse" }
    | { type: "LogFull" }
    | { type: "LogMalformed" }
    | { type: "FailedUpgradeMissingModule" }
    | { type: "FailedUpgradeMissingContract" }
    | { type: "FailedUpgradeUnsupportedModuleVersion" }
    | { type: "ContractPaused" }
    | { type: "InsufficientFunds" }
    | { type: "NotTokenContract" }
    | { type: "MissingAccount" }
    | { type: "MalformedData" }
    | { type: "WrongSignature" }
    | { type: "NonceMismatch" }
    | { type: "WrongContract" }
    | { type: "WrongEntryPoint" }
    | { type: "Expired" }
    | { type: "InvalidUnstakeAmount" };
  if ("ParseParams" in schemaJson) {
    match265 = {
      type: "ParseParams",
    };
  } else if ("UnAuthorized" in schemaJson) {
    match265 = {
      type: "UnAuthorized",
    };
  } else if ("InvalidStakeAmount" in schemaJson) {
    match265 = {
      type: "InvalidStakeAmount",
    };
  } else if ("NoStakeFound" in schemaJson) {
    match265 = {
      type: "NoStakeFound",
    };
  } else if ("OnlyAccount" in schemaJson) {
    match265 = {
      type: "OnlyAccount",
    };
  } else if ("OnlyAdmin" in schemaJson) {
    match265 = {
      type: "OnlyAdmin",
    };
  } else if ("InvokeContractError" in schemaJson) {
    match265 = {
      type: "InvokeContractError",
    };
  } else if ("ParseResult" in schemaJson) {
    match265 = {
      type: "ParseResult",
    };
  } else if ("InvalidResponse" in schemaJson) {
    match265 = {
      type: "InvalidResponse",
    };
  } else if ("LogFull" in schemaJson) {
    match265 = {
      type: "LogFull",
    };
  } else if ("LogMalformed" in schemaJson) {
    match265 = {
      type: "LogMalformed",
    };
  } else if ("FailedUpgradeMissingModule" in schemaJson) {
    match265 = {
      type: "FailedUpgradeMissingModule",
    };
  } else if ("FailedUpgradeMissingContract" in schemaJson) {
    match265 = {
      type: "FailedUpgradeMissingContract",
    };
  } else if ("FailedUpgradeUnsupportedModuleVersion" in schemaJson) {
    match265 = {
      type: "FailedUpgradeUnsupportedModuleVersion",
    };
  } else if ("ContractPaused" in schemaJson) {
    match265 = {
      type: "ContractPaused",
    };
  } else if ("InsufficientFunds" in schemaJson) {
    match265 = {
      type: "InsufficientFunds",
    };
  } else if ("NotTokenContract" in schemaJson) {
    match265 = {
      type: "NotTokenContract",
    };
  } else if ("MissingAccount" in schemaJson) {
    match265 = {
      type: "MissingAccount",
    };
  } else if ("MalformedData" in schemaJson) {
    match265 = {
      type: "MalformedData",
    };
  } else if ("WrongSignature" in schemaJson) {
    match265 = {
      type: "WrongSignature",
    };
  } else if ("NonceMismatch" in schemaJson) {
    match265 = {
      type: "NonceMismatch",
    };
  } else if ("WrongContract" in schemaJson) {
    match265 = {
      type: "WrongContract",
    };
  } else if ("WrongEntryPoint" in schemaJson) {
    match265 = {
      type: "WrongEntryPoint",
    };
  } else if ("Expired" in schemaJson) {
    match265 = {
      type: "Expired",
    };
  } else if ("InvalidUnstakeAmount" in schemaJson) {
    match265 = {
      type: "InvalidUnstakeAmount",
    };
  } else {
    throw new Error("Unexpected enum variant");
  }

  return match265;
}
/** Base64 encoding of the parameter schema type for update transactions to 'getUserNonce' entrypoint of the 'concordium_staking' contract. */
const base64GetUserNonceParameterSchema = "Cw==";
/** Parameter JSON type needed by the schema for update transaction for 'getUserNonce' entrypoint of the 'concordium_staking' contract. */
type GetUserNonceParameterSchemaJson = SDK.AccountAddress.SchemaValue;
/** Parameter type for update transaction for 'getUserNonce' entrypoint of the 'concordium_staking' contract. */
export type GetUserNonceParameter = SDK.AccountAddress.Type;

/**
 * Construct schema JSON representation used in update transaction for 'getUserNonce' entrypoint of the 'concordium_staking' contract.
 * @param {GetUserNonceParameter} parameter The structured parameter to construct from.
 * @returns {GetUserNonceParameterSchemaJson} The smart contract parameter JSON.
 */
function createGetUserNonceParameterSchemaJson(
  parameter: GetUserNonceParameter
): GetUserNonceParameterSchemaJson {
  const accountAddress291 = SDK.AccountAddress.toSchemaValue(parameter);
  return accountAddress291;
}

/**
 * Construct Parameter type used in update transaction for 'getUserNonce' entrypoint of the 'concordium_staking' contract.
 * @param {GetUserNonceParameter} parameter The structured parameter to construct from.
 * @returns {SDK.Parameter.Type} The smart contract parameter.
 */
export function createGetUserNonceParameter(parameter: GetUserNonceParameter): SDK.Parameter.Type {
  return SDK.Parameter.fromBase64SchemaType(
    base64GetUserNonceParameterSchema,
    createGetUserNonceParameterSchemaJson(parameter)
  );
}

/**
 * Construct WebWallet parameter type used in update transaction for 'getUserNonce' entrypoint of the 'concordium_staking' contract.
 * @param {GetUserNonceParameter} parameter The structured parameter to construct from.
 * @returns The smart contract parameter support by the WebWallet.
 */
export function createGetUserNonceParameterWebWallet(parameter: GetUserNonceParameter) {
  return {
    parameters: createGetUserNonceParameterSchemaJson(parameter),
    schema: {
      type: "TypeSchema" as const,
      value: SDK.toBuffer(base64GetUserNonceParameterSchema, "base64"),
    },
  };
}

/**
 * Send an update-contract transaction to the 'getUserNonce' entrypoint of the 'concordium_staking' contract.
 * @param {ConcordiumStakingContract} contractClient The client for a 'concordium_staking' smart contract instance on chain.
 * @param {SDK.ContractTransactionMetadata} transactionMetadata - Metadata related to constructing a transaction for a smart contract.
 * @param {GetUserNonceParameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.AccountSigner} signer - The signer of the update contract transaction.
 * @throws If the entrypoint is not successfully invoked.
 * @returns {SDK.TransactionHash.Type} Hash of the transaction.
 */
export function sendGetUserNonce(
  contractClient: ConcordiumStakingContract,
  transactionMetadata: SDK.ContractTransactionMetadata,
  parameter: GetUserNonceParameter,
  signer: SDK.AccountSigner
): Promise<SDK.TransactionHash.Type> {
  return contractClient.genericContract.createAndSendUpdateTransaction(
    SDK.EntrypointName.fromStringUnchecked("getUserNonce"),
    SDK.Parameter.toBuffer,
    transactionMetadata,
    createGetUserNonceParameter(parameter),
    signer
  );
}

/**
 * Dry-run an update-contract transaction to the 'getUserNonce' entrypoint of the 'concordium_staking' contract.
 * @param {ConcordiumStakingContract} contractClient The client for a 'concordium_staking' smart contract instance on chain.
 * @param {SDK.ContractAddress.Type | SDK.AccountAddress.Type} invokeMetadata - The address of the account or contract which is invoking this transaction.
 * @param {GetUserNonceParameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.BlockHash.Type} [blockHash] - Optional block hash allowing for dry-running the transaction at the end of a specific block.
 * @throws {SDK.RpcError} If failing to communicate with the concordium node or if any of the checks fails.
 * @returns {SDK.InvokeContractResult} The result of invoking the smart contract instance.
 */
export function dryRunGetUserNonce(
  contractClient: ConcordiumStakingContract,
  parameter: GetUserNonceParameter,
  invokeMetadata: SDK.ContractInvokeMetadata = {},
  blockHash?: SDK.BlockHash.Type
): Promise<SDK.InvokeContractResult> {
  return contractClient.genericContract.dryRun.invokeMethod(
    SDK.EntrypointName.fromStringUnchecked("getUserNonce"),
    invokeMetadata,
    SDK.Parameter.toBuffer,
    createGetUserNonceParameter(parameter),
    blockHash
  );
}

/** Return value for dry-running update transaction for 'getUserNonce' entrypoint of the 'concordium_staking' contract. */
export type ReturnValueGetUserNonce = number | bigint;

/**
 * Get and parse the return value from dry-running update transaction for 'getUserNonce' entrypoint of the 'concordium_staking' contract.
 * Returns undefined if the result is not successful.
 * @param {SDK.InvokeContractResult} invokeResult The result from dry-running the transaction.
 * @returns {ReturnValueGetUserNonce | undefined} The structured return value or undefined if result was not a success.
 */
export function parseReturnValueGetUserNonce(
  invokeResult: SDK.InvokeContractResult
): ReturnValueGetUserNonce | undefined {
  if (invokeResult.tag !== "success") {
    return undefined;
  }

  if (invokeResult.returnValue === undefined) {
    throw new Error(
      "Unexpected missing 'returnValue' in result of invocation. Client expected a V1 smart contract."
    );
  }

  const schemaJson = <bigint>(
    SDK.ReturnValue.parseWithSchemaTypeBase64(invokeResult.returnValue, "BQ==")
  );
  return schemaJson;
}

/** Error message for dry-running update transaction for 'getUserNonce' entrypoint of the 'concordium_staking' contract. */
export type ErrorMessageGetUserNonce =
  | { type: "ParseParams" }
  | { type: "UnAuthorized" }
  | { type: "InvalidStakeAmount" }
  | { type: "NoStakeFound" }
  | { type: "OnlyAccount" }
  | { type: "OnlyAdmin" }
  | { type: "InvokeContractError" }
  | { type: "ParseResult" }
  | { type: "InvalidResponse" }
  | { type: "LogFull" }
  | { type: "LogMalformed" }
  | { type: "FailedUpgradeMissingModule" }
  | { type: "FailedUpgradeMissingContract" }
  | { type: "FailedUpgradeUnsupportedModuleVersion" }
  | { type: "ContractPaused" }
  | { type: "InsufficientFunds" }
  | { type: "NotTokenContract" }
  | { type: "MissingAccount" }
  | { type: "MalformedData" }
  | { type: "WrongSignature" }
  | { type: "NonceMismatch" }
  | { type: "WrongContract" }
  | { type: "WrongEntryPoint" }
  | { type: "Expired" }
  | { type: "InvalidUnstakeAmount" };

/**
 * Get and parse the error message from dry-running update transaction for 'getUserNonce' entrypoint of the 'concordium_staking' contract.
 * Returns undefined if the result is not a failure.
 * @param {SDK.InvokeContractResult} invokeResult The result from dry-running the transaction.
 * @returns {ErrorMessageGetUserNonce | undefined} The structured error message or undefined if result was not a failure or failed for other reason than contract rejectedReceive.
 */
export function parseErrorMessageGetUserNonce(
  invokeResult: SDK.InvokeContractResult
): ErrorMessageGetUserNonce | undefined {
  if (invokeResult.tag !== "failure" || invokeResult.reason.tag !== "RejectedReceive") {
    return undefined;
  }

  if (invokeResult.returnValue === undefined) {
    throw new Error(
      "Unexpected missing 'returnValue' in result of invocation. Client expected a V1 smart contract."
    );
  }

  const schemaJson = <
    | { ParseParams: [] }
    | { UnAuthorized: [] }
    | { InvalidStakeAmount: [] }
    | { NoStakeFound: [] }
    | { OnlyAccount: [] }
    | { OnlyAdmin: [] }
    | { InvokeContractError: [] }
    | { ParseResult: [] }
    | { InvalidResponse: [] }
    | { LogFull: [] }
    | { LogMalformed: [] }
    | { FailedUpgradeMissingModule: [] }
    | { FailedUpgradeMissingContract: [] }
    | { FailedUpgradeUnsupportedModuleVersion: [] }
    | { ContractPaused: [] }
    | { InsufficientFunds: [] }
    | { NotTokenContract: [] }
    | { MissingAccount: [] }
    | { MalformedData: [] }
    | { WrongSignature: [] }
    | { NonceMismatch: [] }
    | { WrongContract: [] }
    | { WrongEntryPoint: [] }
    | { Expired: [] }
    | { InvalidUnstakeAmount: [] }
  >SDK.ReturnValue.parseWithSchemaTypeBase64(
    invokeResult.returnValue,
    "FRkAAAALAAAAUGFyc2VQYXJhbXMCDAAAAFVuQXV0aG9yaXplZAISAAAASW52YWxpZFN0YWtlQW1vdW50AgwAAABOb1N0YWtlRm91bmQCCwAAAE9ubHlBY2NvdW50AgkAAABPbmx5QWRtaW4CEwAAAEludm9rZUNvbnRyYWN0RXJyb3ICCwAAAFBhcnNlUmVzdWx0Ag8AAABJbnZhbGlkUmVzcG9uc2UCBwAAAExvZ0Z1bGwCDAAAAExvZ01hbGZvcm1lZAIaAAAARmFpbGVkVXBncmFkZU1pc3NpbmdNb2R1bGUCHAAAAEZhaWxlZFVwZ3JhZGVNaXNzaW5nQ29udHJhY3QCJQAAAEZhaWxlZFVwZ3JhZGVVbnN1cHBvcnRlZE1vZHVsZVZlcnNpb24CDgAAAENvbnRyYWN0UGF1c2VkAhEAAABJbnN1ZmZpY2llbnRGdW5kcwIQAAAATm90VG9rZW5Db250cmFjdAIOAAAATWlzc2luZ0FjY291bnQCDQAAAE1hbGZvcm1lZERhdGECDgAAAFdyb25nU2lnbmF0dXJlAg0AAABOb25jZU1pc21hdGNoAg0AAABXcm9uZ0NvbnRyYWN0Ag8AAABXcm9uZ0VudHJ5UG9pbnQCBwAAAEV4cGlyZWQCFAAAAEludmFsaWRVbnN0YWtlQW1vdW50Ag=="
  );
  let match292:
    | { type: "ParseParams" }
    | { type: "UnAuthorized" }
    | { type: "InvalidStakeAmount" }
    | { type: "NoStakeFound" }
    | { type: "OnlyAccount" }
    | { type: "OnlyAdmin" }
    | { type: "InvokeContractError" }
    | { type: "ParseResult" }
    | { type: "InvalidResponse" }
    | { type: "LogFull" }
    | { type: "LogMalformed" }
    | { type: "FailedUpgradeMissingModule" }
    | { type: "FailedUpgradeMissingContract" }
    | { type: "FailedUpgradeUnsupportedModuleVersion" }
    | { type: "ContractPaused" }
    | { type: "InsufficientFunds" }
    | { type: "NotTokenContract" }
    | { type: "MissingAccount" }
    | { type: "MalformedData" }
    | { type: "WrongSignature" }
    | { type: "NonceMismatch" }
    | { type: "WrongContract" }
    | { type: "WrongEntryPoint" }
    | { type: "Expired" }
    | { type: "InvalidUnstakeAmount" };
  if ("ParseParams" in schemaJson) {
    match292 = {
      type: "ParseParams",
    };
  } else if ("UnAuthorized" in schemaJson) {
    match292 = {
      type: "UnAuthorized",
    };
  } else if ("InvalidStakeAmount" in schemaJson) {
    match292 = {
      type: "InvalidStakeAmount",
    };
  } else if ("NoStakeFound" in schemaJson) {
    match292 = {
      type: "NoStakeFound",
    };
  } else if ("OnlyAccount" in schemaJson) {
    match292 = {
      type: "OnlyAccount",
    };
  } else if ("OnlyAdmin" in schemaJson) {
    match292 = {
      type: "OnlyAdmin",
    };
  } else if ("InvokeContractError" in schemaJson) {
    match292 = {
      type: "InvokeContractError",
    };
  } else if ("ParseResult" in schemaJson) {
    match292 = {
      type: "ParseResult",
    };
  } else if ("InvalidResponse" in schemaJson) {
    match292 = {
      type: "InvalidResponse",
    };
  } else if ("LogFull" in schemaJson) {
    match292 = {
      type: "LogFull",
    };
  } else if ("LogMalformed" in schemaJson) {
    match292 = {
      type: "LogMalformed",
    };
  } else if ("FailedUpgradeMissingModule" in schemaJson) {
    match292 = {
      type: "FailedUpgradeMissingModule",
    };
  } else if ("FailedUpgradeMissingContract" in schemaJson) {
    match292 = {
      type: "FailedUpgradeMissingContract",
    };
  } else if ("FailedUpgradeUnsupportedModuleVersion" in schemaJson) {
    match292 = {
      type: "FailedUpgradeUnsupportedModuleVersion",
    };
  } else if ("ContractPaused" in schemaJson) {
    match292 = {
      type: "ContractPaused",
    };
  } else if ("InsufficientFunds" in schemaJson) {
    match292 = {
      type: "InsufficientFunds",
    };
  } else if ("NotTokenContract" in schemaJson) {
    match292 = {
      type: "NotTokenContract",
    };
  } else if ("MissingAccount" in schemaJson) {
    match292 = {
      type: "MissingAccount",
    };
  } else if ("MalformedData" in schemaJson) {
    match292 = {
      type: "MalformedData",
    };
  } else if ("WrongSignature" in schemaJson) {
    match292 = {
      type: "WrongSignature",
    };
  } else if ("NonceMismatch" in schemaJson) {
    match292 = {
      type: "NonceMismatch",
    };
  } else if ("WrongContract" in schemaJson) {
    match292 = {
      type: "WrongContract",
    };
  } else if ("WrongEntryPoint" in schemaJson) {
    match292 = {
      type: "WrongEntryPoint",
    };
  } else if ("Expired" in schemaJson) {
    match292 = {
      type: "Expired",
    };
  } else if ("InvalidUnstakeAmount" in schemaJson) {
    match292 = {
      type: "InvalidUnstakeAmount",
    };
  } else {
    throw new Error("Unexpected enum variant");
  }

  return match292;
}
/** Base64 encoding of the parameter schema type for update transactions to 'viewMessageHash' entrypoint of the 'concordium_staking' contract. */
const base64ViewMessageHashParameterSchema =
  "FAADAAAACQAAAHNpZ25hdHVyZRIAAhIAAhUBAAAABwAAAEVkMjU1MTkBAQAAAB5AAAAABgAAAHNpZ25lcgsHAAAAbWVzc2FnZRQABQAAABAAAABjb250cmFjdF9hZGRyZXNzDAUAAABub25jZQUJAAAAdGltZXN0YW1wDQsAAABlbnRyeV9wb2ludBYBBwAAAHBheWxvYWQQAQI=";
/** Parameter JSON type needed by the schema for update transaction for 'viewMessageHash' entrypoint of the 'concordium_staking' contract. */
type ViewMessageHashParameterSchemaJson = {
  signature: [number, [number, { Ed25519: [string] }][]][];
  signer: SDK.AccountAddress.SchemaValue;
  message: {
    contract_address: SDK.ContractAddress.SchemaValue;
    nonce: bigint;
    timestamp: SDK.Timestamp.SchemaValue;
    entry_point: string;
    payload: Array<number>;
  };
};
/** Parameter type for update transaction for 'viewMessageHash' entrypoint of the 'concordium_staking' contract. */
export type ViewMessageHashParameter = {
  signature: Map<number, Map<number, { type: "Ed25519"; content: SDK.HexString }>>;
  signer: SDK.AccountAddress.Type;
  message: {
    contract_address: SDK.ContractAddress.Type;
    nonce: number | bigint;
    timestamp: SDK.Timestamp.Type;
    entry_point: string;
    payload: Array<number>;
  };
};

/**
 * Construct schema JSON representation used in update transaction for 'viewMessageHash' entrypoint of the 'concordium_staking' contract.
 * @param {ViewMessageHashParameter} parameter The structured parameter to construct from.
 * @returns {ViewMessageHashParameterSchemaJson} The smart contract parameter JSON.
 */
function createViewMessageHashParameterSchemaJson(
  parameter: ViewMessageHashParameter
): ViewMessageHashParameterSchemaJson {
  const field319 = parameter.signature;
  const map320: [number, [number, { Ed25519: [string] }][]][] = [...field319.entries()].map(
    ([key321, value322]) => {
      const map323: [number, { Ed25519: [string] }][] = [...value322.entries()].map(
        ([key324, value325]) => {
          let match326: { Ed25519: [string] };
          switch (value325.type) {
            case "Ed25519":
              match326 = { Ed25519: [value325.content] };
              break;
          }

          return [key324, match326];
        }
      );
      return [key321, map323];
    }
  );
  const field327 = parameter.signer;
  const accountAddress328 = SDK.AccountAddress.toSchemaValue(field327);
  const field329 = parameter.message;
  const field331 = field329.contract_address;
  const contractAddress332 = SDK.ContractAddress.toSchemaValue(field331);
  const field333 = field329.nonce;
  const number334 = BigInt(field333);
  const field335 = field329.timestamp;
  const timestamp336 = SDK.Timestamp.toSchemaValue(field335);
  const field337 = field329.entry_point;
  const field338 = field329.payload;
  const named330 = {
    contract_address: contractAddress332,
    nonce: number334,
    timestamp: timestamp336,
    entry_point: field337,
    payload: field338,
  };
  const named318 = {
    signature: map320,
    signer: accountAddress328,
    message: named330,
  };
  return named318;
}

/**
 * Construct Parameter type used in update transaction for 'viewMessageHash' entrypoint of the 'concordium_staking' contract.
 * @param {ViewMessageHashParameter} parameter The structured parameter to construct from.
 * @returns {SDK.Parameter.Type} The smart contract parameter.
 */
export function createViewMessageHashParameter(
  parameter: ViewMessageHashParameter
): SDK.Parameter.Type {
  return SDK.Parameter.fromBase64SchemaType(
    base64ViewMessageHashParameterSchema,
    createViewMessageHashParameterSchemaJson(parameter)
  );
}

/**
 * Construct WebWallet parameter type used in update transaction for 'viewMessageHash' entrypoint of the 'concordium_staking' contract.
 * @param {ViewMessageHashParameter} parameter The structured parameter to construct from.
 * @returns The smart contract parameter support by the WebWallet.
 */
export function createViewMessageHashParameterWebWallet(parameter: ViewMessageHashParameter) {
  return {
    parameters: createViewMessageHashParameterSchemaJson(parameter),
    schema: {
      type: "TypeSchema" as const,
      value: SDK.toBuffer(base64ViewMessageHashParameterSchema, "base64"),
    },
  };
}

/**
 * Send an update-contract transaction to the 'viewMessageHash' entrypoint of the 'concordium_staking' contract.
 * @param {ConcordiumStakingContract} contractClient The client for a 'concordium_staking' smart contract instance on chain.
 * @param {SDK.ContractTransactionMetadata} transactionMetadata - Metadata related to constructing a transaction for a smart contract.
 * @param {ViewMessageHashParameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.AccountSigner} signer - The signer of the update contract transaction.
 * @throws If the entrypoint is not successfully invoked.
 * @returns {SDK.TransactionHash.Type} Hash of the transaction.
 */
export function sendViewMessageHash(
  contractClient: ConcordiumStakingContract,
  transactionMetadata: SDK.ContractTransactionMetadata,
  parameter: ViewMessageHashParameter,
  signer: SDK.AccountSigner
): Promise<SDK.TransactionHash.Type> {
  return contractClient.genericContract.createAndSendUpdateTransaction(
    SDK.EntrypointName.fromStringUnchecked("viewMessageHash"),
    SDK.Parameter.toBuffer,
    transactionMetadata,
    createViewMessageHashParameter(parameter),
    signer
  );
}

/**
 * Dry-run an update-contract transaction to the 'viewMessageHash' entrypoint of the 'concordium_staking' contract.
 * @param {ConcordiumStakingContract} contractClient The client for a 'concordium_staking' smart contract instance on chain.
 * @param {SDK.ContractAddress.Type | SDK.AccountAddress.Type} invokeMetadata - The address of the account or contract which is invoking this transaction.
 * @param {ViewMessageHashParameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.BlockHash.Type} [blockHash] - Optional block hash allowing for dry-running the transaction at the end of a specific block.
 * @throws {SDK.RpcError} If failing to communicate with the concordium node or if any of the checks fails.
 * @returns {SDK.InvokeContractResult} The result of invoking the smart contract instance.
 */
export function dryRunViewMessageHash(
  contractClient: ConcordiumStakingContract,
  parameter: ViewMessageHashParameter,
  invokeMetadata: SDK.ContractInvokeMetadata = {},
  blockHash?: SDK.BlockHash.Type
): Promise<SDK.InvokeContractResult> {
  return contractClient.genericContract.dryRun.invokeMethod(
    SDK.EntrypointName.fromStringUnchecked("viewMessageHash"),
    invokeMetadata,
    SDK.Parameter.toBuffer,
    createViewMessageHashParameter(parameter),
    blockHash
  );
}

/** Return value for dry-running update transaction for 'viewMessageHash' entrypoint of the 'concordium_staking' contract. */
export type ReturnValueViewMessageHash = [
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number
];

/**
 * Get and parse the return value from dry-running update transaction for 'viewMessageHash' entrypoint of the 'concordium_staking' contract.
 * Returns undefined if the result is not successful.
 * @param {SDK.InvokeContractResult} invokeResult The result from dry-running the transaction.
 * @returns {ReturnValueViewMessageHash | undefined} The structured return value or undefined if result was not a success.
 */
export function parseReturnValueViewMessageHash(
  invokeResult: SDK.InvokeContractResult
): ReturnValueViewMessageHash | undefined {
  if (invokeResult.tag !== "success") {
    return undefined;
  }

  if (invokeResult.returnValue === undefined) {
    throw new Error(
      "Unexpected missing 'returnValue' in result of invocation. Client expected a V1 smart contract."
    );
  }

  const schemaJson = <
    [
      number,
      number,
      number,
      number,
      number,
      number,
      number,
      number,
      number,
      number,
      number,
      number,
      number,
      number,
      number,
      number,
      number,
      number,
      number,
      number,
      number,
      number,
      number,
      number,
      number,
      number,
      number,
      number,
      number,
      number,
      number,
      number
    ]
  >SDK.ReturnValue.parseWithSchemaTypeBase64(invokeResult.returnValue, "EyAAAAAC");
  return schemaJson;
}
/** Base64 encoding of the parameter schema type for update transactions to 'supportsPermit' entrypoint of the 'concordium_staking' contract. */
const base64SupportsPermitParameterSchema = "FAABAAAABwAAAHF1ZXJpZXMQARYB";
/** Parameter JSON type needed by the schema for update transaction for 'supportsPermit' entrypoint of the 'concordium_staking' contract. */
type SupportsPermitParameterSchemaJson = {
  queries: Array<string>;
};
/** Parameter type for update transaction for 'supportsPermit' entrypoint of the 'concordium_staking' contract. */
export type SupportsPermitParameter = {
  queries: Array<string>;
};

/**
 * Construct schema JSON representation used in update transaction for 'supportsPermit' entrypoint of the 'concordium_staking' contract.
 * @param {SupportsPermitParameter} parameter The structured parameter to construct from.
 * @returns {SupportsPermitParameterSchemaJson} The smart contract parameter JSON.
 */
function createSupportsPermitParameterSchemaJson(
  parameter: SupportsPermitParameter
): SupportsPermitParameterSchemaJson {
  const field344 = parameter.queries;
  const named343 = {
    queries: field344,
  };
  return named343;
}

/**
 * Construct Parameter type used in update transaction for 'supportsPermit' entrypoint of the 'concordium_staking' contract.
 * @param {SupportsPermitParameter} parameter The structured parameter to construct from.
 * @returns {SDK.Parameter.Type} The smart contract parameter.
 */
export function createSupportsPermitParameter(
  parameter: SupportsPermitParameter
): SDK.Parameter.Type {
  return SDK.Parameter.fromBase64SchemaType(
    base64SupportsPermitParameterSchema,
    createSupportsPermitParameterSchemaJson(parameter)
  );
}

/**
 * Construct WebWallet parameter type used in update transaction for 'supportsPermit' entrypoint of the 'concordium_staking' contract.
 * @param {SupportsPermitParameter} parameter The structured parameter to construct from.
 * @returns The smart contract parameter support by the WebWallet.
 */
export function createSupportsPermitParameterWebWallet(parameter: SupportsPermitParameter) {
  return {
    parameters: createSupportsPermitParameterSchemaJson(parameter),
    schema: {
      type: "TypeSchema" as const,
      value: SDK.toBuffer(base64SupportsPermitParameterSchema, "base64"),
    },
  };
}

/**
 * Send an update-contract transaction to the 'supportsPermit' entrypoint of the 'concordium_staking' contract.
 * @param {ConcordiumStakingContract} contractClient The client for a 'concordium_staking' smart contract instance on chain.
 * @param {SDK.ContractTransactionMetadata} transactionMetadata - Metadata related to constructing a transaction for a smart contract.
 * @param {SupportsPermitParameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.AccountSigner} signer - The signer of the update contract transaction.
 * @throws If the entrypoint is not successfully invoked.
 * @returns {SDK.TransactionHash.Type} Hash of the transaction.
 */
export function sendSupportsPermit(
  contractClient: ConcordiumStakingContract,
  transactionMetadata: SDK.ContractTransactionMetadata,
  parameter: SupportsPermitParameter,
  signer: SDK.AccountSigner
): Promise<SDK.TransactionHash.Type> {
  return contractClient.genericContract.createAndSendUpdateTransaction(
    SDK.EntrypointName.fromStringUnchecked("supportsPermit"),
    SDK.Parameter.toBuffer,
    transactionMetadata,
    createSupportsPermitParameter(parameter),
    signer
  );
}

/**
 * Dry-run an update-contract transaction to the 'supportsPermit' entrypoint of the 'concordium_staking' contract.
 * @param {ConcordiumStakingContract} contractClient The client for a 'concordium_staking' smart contract instance on chain.
 * @param {SDK.ContractAddress.Type | SDK.AccountAddress.Type} invokeMetadata - The address of the account or contract which is invoking this transaction.
 * @param {SupportsPermitParameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.BlockHash.Type} [blockHash] - Optional block hash allowing for dry-running the transaction at the end of a specific block.
 * @throws {SDK.RpcError} If failing to communicate with the concordium node or if any of the checks fails.
 * @returns {SDK.InvokeContractResult} The result of invoking the smart contract instance.
 */
export function dryRunSupportsPermit(
  contractClient: ConcordiumStakingContract,
  parameter: SupportsPermitParameter,
  invokeMetadata: SDK.ContractInvokeMetadata = {},
  blockHash?: SDK.BlockHash.Type
): Promise<SDK.InvokeContractResult> {
  return contractClient.genericContract.dryRun.invokeMethod(
    SDK.EntrypointName.fromStringUnchecked("supportsPermit"),
    invokeMetadata,
    SDK.Parameter.toBuffer,
    createSupportsPermitParameter(parameter),
    blockHash
  );
}

/** Return value for dry-running update transaction for 'supportsPermit' entrypoint of the 'concordium_staking' contract. */
export type ReturnValueSupportsPermit = Array<
  | { type: "NoSupport" }
  | { type: "Support" }
  | { type: "SupportBy"; content: Array<SDK.ContractAddress.Type> }
>;

/**
 * Get and parse the return value from dry-running update transaction for 'supportsPermit' entrypoint of the 'concordium_staking' contract.
 * Returns undefined if the result is not successful.
 * @param {SDK.InvokeContractResult} invokeResult The result from dry-running the transaction.
 * @returns {ReturnValueSupportsPermit | undefined} The structured return value or undefined if result was not a success.
 */
export function parseReturnValueSupportsPermit(
  invokeResult: SDK.InvokeContractResult
): ReturnValueSupportsPermit | undefined {
  if (invokeResult.tag !== "success") {
    return undefined;
  }

  if (invokeResult.returnValue === undefined) {
    throw new Error(
      "Unexpected missing 'returnValue' in result of invocation. Client expected a V1 smart contract."
    );
  }

  const schemaJson = <
    Array<
      { NoSupport: [] } | { Support: [] } | { SupportBy: [Array<SDK.ContractAddress.SchemaValue>] }
    >
  >SDK.ReturnValue.parseWithSchemaTypeBase64(
    invokeResult.returnValue,
    "EAEVAwAAAAkAAABOb1N1cHBvcnQCBwAAAFN1cHBvcnQCCQAAAFN1cHBvcnRCeQEBAAAAEAAM"
  );
  const list347 = schemaJson.map((item348) => {
    let match349:
      | { type: "NoSupport" }
      | { type: "Support" }
      | { type: "SupportBy"; content: Array<SDK.ContractAddress.Type> };
    if ("NoSupport" in item348) {
      match349 = {
        type: "NoSupport",
      };
    } else if ("Support" in item348) {
      match349 = {
        type: "Support",
      };
    } else if ("SupportBy" in item348) {
      const variant352 = item348.SupportBy;
      const list353 = variant352[0].map((item354) => {
        const contractAddress355 = SDK.ContractAddress.fromSchemaValue(item354);
        return contractAddress355;
      });
      match349 = {
        type: "SupportBy",
        content: list353,
      };
    } else {
      throw new Error("Unexpected enum variant");
    }

    return match349;
  });
  return list347;
}

/** Error message for dry-running update transaction for 'supportsPermit' entrypoint of the 'concordium_staking' contract. */
export type ErrorMessageSupportsPermit =
  | { type: "ParseParams" }
  | { type: "UnAuthorized" }
  | { type: "InvalidStakeAmount" }
  | { type: "NoStakeFound" }
  | { type: "OnlyAccount" }
  | { type: "OnlyAdmin" }
  | { type: "InvokeContractError" }
  | { type: "ParseResult" }
  | { type: "InvalidResponse" }
  | { type: "LogFull" }
  | { type: "LogMalformed" }
  | { type: "FailedUpgradeMissingModule" }
  | { type: "FailedUpgradeMissingContract" }
  | { type: "FailedUpgradeUnsupportedModuleVersion" }
  | { type: "ContractPaused" }
  | { type: "InsufficientFunds" }
  | { type: "NotTokenContract" }
  | { type: "MissingAccount" }
  | { type: "MalformedData" }
  | { type: "WrongSignature" }
  | { type: "NonceMismatch" }
  | { type: "WrongContract" }
  | { type: "WrongEntryPoint" }
  | { type: "Expired" }
  | { type: "InvalidUnstakeAmount" };

/**
 * Get and parse the error message from dry-running update transaction for 'supportsPermit' entrypoint of the 'concordium_staking' contract.
 * Returns undefined if the result is not a failure.
 * @param {SDK.InvokeContractResult} invokeResult The result from dry-running the transaction.
 * @returns {ErrorMessageSupportsPermit | undefined} The structured error message or undefined if result was not a failure or failed for other reason than contract rejectedReceive.
 */
export function parseErrorMessageSupportsPermit(
  invokeResult: SDK.InvokeContractResult
): ErrorMessageSupportsPermit | undefined {
  if (invokeResult.tag !== "failure" || invokeResult.reason.tag !== "RejectedReceive") {
    return undefined;
  }

  if (invokeResult.returnValue === undefined) {
    throw new Error(
      "Unexpected missing 'returnValue' in result of invocation. Client expected a V1 smart contract."
    );
  }

  const schemaJson = <
    | { ParseParams: [] }
    | { UnAuthorized: [] }
    | { InvalidStakeAmount: [] }
    | { NoStakeFound: [] }
    | { OnlyAccount: [] }
    | { OnlyAdmin: [] }
    | { InvokeContractError: [] }
    | { ParseResult: [] }
    | { InvalidResponse: [] }
    | { LogFull: [] }
    | { LogMalformed: [] }
    | { FailedUpgradeMissingModule: [] }
    | { FailedUpgradeMissingContract: [] }
    | { FailedUpgradeUnsupportedModuleVersion: [] }
    | { ContractPaused: [] }
    | { InsufficientFunds: [] }
    | { NotTokenContract: [] }
    | { MissingAccount: [] }
    | { MalformedData: [] }
    | { WrongSignature: [] }
    | { NonceMismatch: [] }
    | { WrongContract: [] }
    | { WrongEntryPoint: [] }
    | { Expired: [] }
    | { InvalidUnstakeAmount: [] }
  >SDK.ReturnValue.parseWithSchemaTypeBase64(
    invokeResult.returnValue,
    "FRkAAAALAAAAUGFyc2VQYXJhbXMCDAAAAFVuQXV0aG9yaXplZAISAAAASW52YWxpZFN0YWtlQW1vdW50AgwAAABOb1N0YWtlRm91bmQCCwAAAE9ubHlBY2NvdW50AgkAAABPbmx5QWRtaW4CEwAAAEludm9rZUNvbnRyYWN0RXJyb3ICCwAAAFBhcnNlUmVzdWx0Ag8AAABJbnZhbGlkUmVzcG9uc2UCBwAAAExvZ0Z1bGwCDAAAAExvZ01hbGZvcm1lZAIaAAAARmFpbGVkVXBncmFkZU1pc3NpbmdNb2R1bGUCHAAAAEZhaWxlZFVwZ3JhZGVNaXNzaW5nQ29udHJhY3QCJQAAAEZhaWxlZFVwZ3JhZGVVbnN1cHBvcnRlZE1vZHVsZVZlcnNpb24CDgAAAENvbnRyYWN0UGF1c2VkAhEAAABJbnN1ZmZpY2llbnRGdW5kcwIQAAAATm90VG9rZW5Db250cmFjdAIOAAAATWlzc2luZ0FjY291bnQCDQAAAE1hbGZvcm1lZERhdGECDgAAAFdyb25nU2lnbmF0dXJlAg0AAABOb25jZU1pc21hdGNoAg0AAABXcm9uZ0NvbnRyYWN0Ag8AAABXcm9uZ0VudHJ5UG9pbnQCBwAAAEV4cGlyZWQCFAAAAEludmFsaWRVbnN0YWtlQW1vdW50Ag=="
  );
  let match356:
    | { type: "ParseParams" }
    | { type: "UnAuthorized" }
    | { type: "InvalidStakeAmount" }
    | { type: "NoStakeFound" }
    | { type: "OnlyAccount" }
    | { type: "OnlyAdmin" }
    | { type: "InvokeContractError" }
    | { type: "ParseResult" }
    | { type: "InvalidResponse" }
    | { type: "LogFull" }
    | { type: "LogMalformed" }
    | { type: "FailedUpgradeMissingModule" }
    | { type: "FailedUpgradeMissingContract" }
    | { type: "FailedUpgradeUnsupportedModuleVersion" }
    | { type: "ContractPaused" }
    | { type: "InsufficientFunds" }
    | { type: "NotTokenContract" }
    | { type: "MissingAccount" }
    | { type: "MalformedData" }
    | { type: "WrongSignature" }
    | { type: "NonceMismatch" }
    | { type: "WrongContract" }
    | { type: "WrongEntryPoint" }
    | { type: "Expired" }
    | { type: "InvalidUnstakeAmount" };
  if ("ParseParams" in schemaJson) {
    match356 = {
      type: "ParseParams",
    };
  } else if ("UnAuthorized" in schemaJson) {
    match356 = {
      type: "UnAuthorized",
    };
  } else if ("InvalidStakeAmount" in schemaJson) {
    match356 = {
      type: "InvalidStakeAmount",
    };
  } else if ("NoStakeFound" in schemaJson) {
    match356 = {
      type: "NoStakeFound",
    };
  } else if ("OnlyAccount" in schemaJson) {
    match356 = {
      type: "OnlyAccount",
    };
  } else if ("OnlyAdmin" in schemaJson) {
    match356 = {
      type: "OnlyAdmin",
    };
  } else if ("InvokeContractError" in schemaJson) {
    match356 = {
      type: "InvokeContractError",
    };
  } else if ("ParseResult" in schemaJson) {
    match356 = {
      type: "ParseResult",
    };
  } else if ("InvalidResponse" in schemaJson) {
    match356 = {
      type: "InvalidResponse",
    };
  } else if ("LogFull" in schemaJson) {
    match356 = {
      type: "LogFull",
    };
  } else if ("LogMalformed" in schemaJson) {
    match356 = {
      type: "LogMalformed",
    };
  } else if ("FailedUpgradeMissingModule" in schemaJson) {
    match356 = {
      type: "FailedUpgradeMissingModule",
    };
  } else if ("FailedUpgradeMissingContract" in schemaJson) {
    match356 = {
      type: "FailedUpgradeMissingContract",
    };
  } else if ("FailedUpgradeUnsupportedModuleVersion" in schemaJson) {
    match356 = {
      type: "FailedUpgradeUnsupportedModuleVersion",
    };
  } else if ("ContractPaused" in schemaJson) {
    match356 = {
      type: "ContractPaused",
    };
  } else if ("InsufficientFunds" in schemaJson) {
    match356 = {
      type: "InsufficientFunds",
    };
  } else if ("NotTokenContract" in schemaJson) {
    match356 = {
      type: "NotTokenContract",
    };
  } else if ("MissingAccount" in schemaJson) {
    match356 = {
      type: "MissingAccount",
    };
  } else if ("MalformedData" in schemaJson) {
    match356 = {
      type: "MalformedData",
    };
  } else if ("WrongSignature" in schemaJson) {
    match356 = {
      type: "WrongSignature",
    };
  } else if ("NonceMismatch" in schemaJson) {
    match356 = {
      type: "NonceMismatch",
    };
  } else if ("WrongContract" in schemaJson) {
    match356 = {
      type: "WrongContract",
    };
  } else if ("WrongEntryPoint" in schemaJson) {
    match356 = {
      type: "WrongEntryPoint",
    };
  } else if ("Expired" in schemaJson) {
    match356 = {
      type: "Expired",
    };
  } else if ("InvalidUnstakeAmount" in schemaJson) {
    match356 = {
      type: "InvalidUnstakeAmount",
    };
  } else {
    throw new Error("Unexpected enum variant");
  }

  return match356;
}
/** Parameter type  used in update transaction for 'view' entrypoint of the 'concordium_staking' contract. */
export type ViewParameter = SDK.Parameter.Type;

/**
 * Send an update-contract transaction to the 'view' entrypoint of the 'concordium_staking' contract.
 * @param {ConcordiumStakingContract} contractClient The client for a 'concordium_staking' smart contract instance on chain.
 * @param {SDK.ContractTransactionMetadata} transactionMetadata - Metadata related to constructing a transaction for a smart contract.
 * @param {ViewParameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.AccountSigner} signer - The signer of the update contract transaction.
 * @throws If the entrypoint is not successfully invoked.
 * @returns {SDK.TransactionHash.Type} Hash of the transaction.
 */
export function sendView(
  contractClient: ConcordiumStakingContract,
  transactionMetadata: SDK.ContractTransactionMetadata,
  parameter: ViewParameter,
  signer: SDK.AccountSigner
): Promise<SDK.TransactionHash.Type> {
  return contractClient.genericContract.createAndSendUpdateTransaction(
    SDK.EntrypointName.fromStringUnchecked("view"),
    SDK.Parameter.toBuffer,
    transactionMetadata,
    parameter,
    signer
  );
}

/**
 * Dry-run an update-contract transaction to the 'view' entrypoint of the 'concordium_staking' contract.
 * @param {ConcordiumStakingContract} contractClient The client for a 'concordium_staking' smart contract instance on chain.
 * @param {SDK.ContractAddress.Type | SDK.AccountAddress.Type} invokeMetadata - The address of the account or contract which is invoking this transaction.
 * @param {ViewParameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.BlockHash.Type} [blockHash] - Optional block hash allowing for dry-running the transaction at the end of a specific block.
 * @throws {SDK.RpcError} If failing to communicate with the concordium node or if any of the checks fails.
 * @returns {SDK.InvokeContractResult} The result of invoking the smart contract instance.
 */
export function dryRunView(
  contractClient: ConcordiumStakingContract,
  parameter: ViewParameter,
  invokeMetadata: SDK.ContractInvokeMetadata = {},
  blockHash?: SDK.BlockHash.Type
): Promise<SDK.InvokeContractResult> {
  return contractClient.genericContract.dryRun.invokeMethod(
    SDK.EntrypointName.fromStringUnchecked("view"),
    invokeMetadata,
    SDK.Parameter.toBuffer,
    parameter,
    blockHash
  );
}

/** Return value for dry-running update transaction for 'view' entrypoint of the 'concordium_staking' contract. */
export type ReturnValueView = {
  paused: boolean;
  admin: SDK.AccountAddress.Type;
  total_staked: number | bigint;
  apr: number | bigint;
  liquid_euroe: SDK.ContractAddress.Type;
  token_address: SDK.ContractAddress.Type;
  total_participants: number | bigint;
};

/**
 * Get and parse the return value from dry-running update transaction for 'view' entrypoint of the 'concordium_staking' contract.
 * Returns undefined if the result is not successful.
 * @param {SDK.InvokeContractResult} invokeResult The result from dry-running the transaction.
 * @returns {ReturnValueView | undefined} The structured return value or undefined if result was not a success.
 */
export function parseReturnValueView(
  invokeResult: SDK.InvokeContractResult
): ReturnValueView | undefined {
  if (invokeResult.tag !== "success") {
    return undefined;
  }

  if (invokeResult.returnValue === undefined) {
    throw new Error(
      "Unexpected missing 'returnValue' in result of invocation. Client expected a V1 smart contract."
    );
  }

  const schemaJson = <
    {
      paused: boolean;
      admin: SDK.AccountAddress.SchemaValue;
      total_staked: string;
      apr: bigint;
      liquid_euroe: SDK.ContractAddress.SchemaValue;
      token_address: SDK.ContractAddress.SchemaValue;
      total_participants: bigint;
    }
  >SDK.ReturnValue.parseWithSchemaTypeBase64(invokeResult.returnValue, "FAAHAAAABgAAAHBhdXNlZAEFAAAAYWRtaW4LDAAAAHRvdGFsX3N0YWtlZBslAAAAAwAAAGFwcgUMAAAAbGlxdWlkX2V1cm9lDA0AAAB0b2tlbl9hZGRyZXNzDBIAAAB0b3RhbF9wYXJ0aWNpcGFudHMF");
  const field383 = schemaJson.paused;
  const field384 = schemaJson.admin;
  const accountAddress385 = SDK.AccountAddress.fromSchemaValue(field384);
  const field386 = schemaJson.total_staked;
  const leb382 = BigInt(field386);
  const field387 = schemaJson.apr;
  const field388 = schemaJson.liquid_euroe;
  const contractAddress389 = SDK.ContractAddress.fromSchemaValue(field388);
  const field390 = schemaJson.token_address;
  const contractAddress391 = SDK.ContractAddress.fromSchemaValue(field390);
  const field392 = schemaJson.total_participants;
  const named393 = {
    paused: field383,
    admin: accountAddress385,
    total_staked: leb382,
    apr: field387,
    liquid_euroe: contractAddress389,
    token_address: contractAddress391,
    total_participants: field392,
  };
  return named393;
}
/** Base64 encoding of the parameter schema type for update transactions to 'getStakeInfo' entrypoint of the 'concordium_staking' contract. */
const base64GetStakeInfoParameterSchema = "Cw==";
/** Parameter JSON type needed by the schema for update transaction for 'getStakeInfo' entrypoint of the 'concordium_staking' contract. */
type GetStakeInfoParameterSchemaJson = SDK.AccountAddress.SchemaValue;
/** Parameter type for update transaction for 'getStakeInfo' entrypoint of the 'concordium_staking' contract. */
export type GetStakeInfoParameter = SDK.AccountAddress.Type;

/**
 * Construct schema JSON representation used in update transaction for 'getStakeInfo' entrypoint of the 'concordium_staking' contract.
 * @param {GetStakeInfoParameter} parameter The structured parameter to construct from.
 * @returns {GetStakeInfoParameterSchemaJson} The smart contract parameter JSON.
 */
function createGetStakeInfoParameterSchemaJson(
  parameter: GetStakeInfoParameter
): GetStakeInfoParameterSchemaJson {
  const accountAddress394 = SDK.AccountAddress.toSchemaValue(parameter);
  return accountAddress394;
}

/**
 * Construct Parameter type used in update transaction for 'getStakeInfo' entrypoint of the 'concordium_staking' contract.
 * @param {GetStakeInfoParameter} parameter The structured parameter to construct from.
 * @returns {SDK.Parameter.Type} The smart contract parameter.
 */
export function createGetStakeInfoParameter(parameter: GetStakeInfoParameter): SDK.Parameter.Type {
  return SDK.Parameter.fromBase64SchemaType(
    base64GetStakeInfoParameterSchema,
    createGetStakeInfoParameterSchemaJson(parameter)
  );
}

/**
 * Construct WebWallet parameter type used in update transaction for 'getStakeInfo' entrypoint of the 'concordium_staking' contract.
 * @param {GetStakeInfoParameter} parameter The structured parameter to construct from.
 * @returns The smart contract parameter support by the WebWallet.
 */
export function createGetStakeInfoParameterWebWallet(parameter: GetStakeInfoParameter) {
  return {
    parameters: createGetStakeInfoParameterSchemaJson(parameter),
    schema: {
      type: "TypeSchema" as const,
      value: SDK.toBuffer(base64GetStakeInfoParameterSchema, "base64"),
    },
  };
}

/**
 * Send an update-contract transaction to the 'getStakeInfo' entrypoint of the 'concordium_staking' contract.
 * @param {ConcordiumStakingContract} contractClient The client for a 'concordium_staking' smart contract instance on chain.
 * @param {SDK.ContractTransactionMetadata} transactionMetadata - Metadata related to constructing a transaction for a smart contract.
 * @param {GetStakeInfoParameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.AccountSigner} signer - The signer of the update contract transaction.
 * @throws If the entrypoint is not successfully invoked.
 * @returns {SDK.TransactionHash.Type} Hash of the transaction.
 */
export function sendGetStakeInfo(
  contractClient: ConcordiumStakingContract,
  transactionMetadata: SDK.ContractTransactionMetadata,
  parameter: GetStakeInfoParameter,
  signer: SDK.AccountSigner
): Promise<SDK.TransactionHash.Type> {
  return contractClient.genericContract.createAndSendUpdateTransaction(
    SDK.EntrypointName.fromStringUnchecked("getStakeInfo"),
    SDK.Parameter.toBuffer,
    transactionMetadata,
    createGetStakeInfoParameter(parameter),
    signer
  );
}

/**
 * Dry-run an update-contract transaction to the 'getStakeInfo' entrypoint of the 'concordium_staking' contract.
 * @param {ConcordiumStakingContract} contractClient The client for a 'concordium_staking' smart contract instance on chain.
 * @param {SDK.ContractAddress.Type | SDK.AccountAddress.Type} invokeMetadata - The address of the account or contract which is invoking this transaction.
 * @param {GetStakeInfoParameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.BlockHash.Type} [blockHash] - Optional block hash allowing for dry-running the transaction at the end of a specific block.
 * @throws {SDK.RpcError} If failing to communicate with the concordium node or if any of the checks fails.
 * @returns {SDK.InvokeContractResult} The result of invoking the smart contract instance.
 */
export function dryRunGetStakeInfo(
  contractClient: ConcordiumStakingContract,
  parameter: GetStakeInfoParameter,
  invokeMetadata: SDK.ContractInvokeMetadata = {},
  blockHash?: SDK.BlockHash.Type
): Promise<SDK.InvokeContractResult> {
  return contractClient.genericContract.dryRun.invokeMethod(
    SDK.EntrypointName.fromStringUnchecked("getStakeInfo"),
    invokeMetadata,
    SDK.Parameter.toBuffer,
    createGetStakeInfoParameter(parameter),
    blockHash
  );
}

/** Return value for dry-running update transaction for 'getStakeInfo' entrypoint of the 'concordium_staking' contract. */
export type ReturnValueGetStakeInfo = {
  amount: number | bigint;
  timestamp: number | bigint;
};

/**
 * Get and parse the return value from dry-running update transaction for 'getStakeInfo' entrypoint of the 'concordium_staking' contract.
 * Returns undefined if the result is not successful.
 * @param {SDK.InvokeContractResult} invokeResult The result from dry-running the transaction.
 * @returns {ReturnValueGetStakeInfo | undefined} The structured return value or undefined if result was not a success.
 */
export function parseReturnValueGetStakeInfo(
  invokeResult: SDK.InvokeContractResult
): ReturnValueGetStakeInfo | undefined {
  if (invokeResult.tag !== "success") {
    return undefined;
  }

  if (invokeResult.returnValue === undefined) {
    throw new Error(
      "Unexpected missing 'returnValue' in result of invocation. Client expected a V1 smart contract."
    );
  }

  const schemaJson = <
    {
      amount: string;
      timestamp: bigint;
    }
  >SDK.ReturnValue.parseWithSchemaTypeBase64(invokeResult.returnValue, "FAACAAAABgAAAGFtb3VudBslAAAACQAAAHRpbWVzdGFtcAU=");
  const field396 = schemaJson.amount;
  const leb395 = BigInt(field396);
  const field397 = schemaJson.timestamp;
  const named398 = {
    amount: leb395,
    timestamp: field397,
  };
  return named398;
}

/** Error message for dry-running update transaction for 'getStakeInfo' entrypoint of the 'concordium_staking' contract. */
export type ErrorMessageGetStakeInfo =
  | { type: "ParseParams" }
  | { type: "UnAuthorized" }
  | { type: "InvalidStakeAmount" }
  | { type: "NoStakeFound" }
  | { type: "OnlyAccount" }
  | { type: "OnlyAdmin" }
  | { type: "InvokeContractError" }
  | { type: "ParseResult" }
  | { type: "InvalidResponse" }
  | { type: "LogFull" }
  | { type: "LogMalformed" }
  | { type: "FailedUpgradeMissingModule" }
  | { type: "FailedUpgradeMissingContract" }
  | { type: "FailedUpgradeUnsupportedModuleVersion" }
  | { type: "ContractPaused" }
  | { type: "InsufficientFunds" }
  | { type: "NotTokenContract" }
  | { type: "MissingAccount" }
  | { type: "MalformedData" }
  | { type: "WrongSignature" }
  | { type: "NonceMismatch" }
  | { type: "WrongContract" }
  | { type: "WrongEntryPoint" }
  | { type: "Expired" }
  | { type: "InvalidUnstakeAmount" };

/**
 * Get and parse the error message from dry-running update transaction for 'getStakeInfo' entrypoint of the 'concordium_staking' contract.
 * Returns undefined if the result is not a failure.
 * @param {SDK.InvokeContractResult} invokeResult The result from dry-running the transaction.
 * @returns {ErrorMessageGetStakeInfo | undefined} The structured error message or undefined if result was not a failure or failed for other reason than contract rejectedReceive.
 */
export function parseErrorMessageGetStakeInfo(
  invokeResult: SDK.InvokeContractResult
): ErrorMessageGetStakeInfo | undefined {
  if (invokeResult.tag !== "failure" || invokeResult.reason.tag !== "RejectedReceive") {
    return undefined;
  }

  if (invokeResult.returnValue === undefined) {
    throw new Error(
      "Unexpected missing 'returnValue' in result of invocation. Client expected a V1 smart contract."
    );
  }

  const schemaJson = <
    | { ParseParams: [] }
    | { UnAuthorized: [] }
    | { InvalidStakeAmount: [] }
    | { NoStakeFound: [] }
    | { OnlyAccount: [] }
    | { OnlyAdmin: [] }
    | { InvokeContractError: [] }
    | { ParseResult: [] }
    | { InvalidResponse: [] }
    | { LogFull: [] }
    | { LogMalformed: [] }
    | { FailedUpgradeMissingModule: [] }
    | { FailedUpgradeMissingContract: [] }
    | { FailedUpgradeUnsupportedModuleVersion: [] }
    | { ContractPaused: [] }
    | { InsufficientFunds: [] }
    | { NotTokenContract: [] }
    | { MissingAccount: [] }
    | { MalformedData: [] }
    | { WrongSignature: [] }
    | { NonceMismatch: [] }
    | { WrongContract: [] }
    | { WrongEntryPoint: [] }
    | { Expired: [] }
    | { InvalidUnstakeAmount: [] }
  >SDK.ReturnValue.parseWithSchemaTypeBase64(
    invokeResult.returnValue,
    "FRkAAAALAAAAUGFyc2VQYXJhbXMCDAAAAFVuQXV0aG9yaXplZAISAAAASW52YWxpZFN0YWtlQW1vdW50AgwAAABOb1N0YWtlRm91bmQCCwAAAE9ubHlBY2NvdW50AgkAAABPbmx5QWRtaW4CEwAAAEludm9rZUNvbnRyYWN0RXJyb3ICCwAAAFBhcnNlUmVzdWx0Ag8AAABJbnZhbGlkUmVzcG9uc2UCBwAAAExvZ0Z1bGwCDAAAAExvZ01hbGZvcm1lZAIaAAAARmFpbGVkVXBncmFkZU1pc3NpbmdNb2R1bGUCHAAAAEZhaWxlZFVwZ3JhZGVNaXNzaW5nQ29udHJhY3QCJQAAAEZhaWxlZFVwZ3JhZGVVbnN1cHBvcnRlZE1vZHVsZVZlcnNpb24CDgAAAENvbnRyYWN0UGF1c2VkAhEAAABJbnN1ZmZpY2llbnRGdW5kcwIQAAAATm90VG9rZW5Db250cmFjdAIOAAAATWlzc2luZ0FjY291bnQCDQAAAE1hbGZvcm1lZERhdGECDgAAAFdyb25nU2lnbmF0dXJlAg0AAABOb25jZU1pc21hdGNoAg0AAABXcm9uZ0NvbnRyYWN0Ag8AAABXcm9uZ0VudHJ5UG9pbnQCBwAAAEV4cGlyZWQCFAAAAEludmFsaWRVbnN0YWtlQW1vdW50Ag=="
  );
  let match399:
    | { type: "ParseParams" }
    | { type: "UnAuthorized" }
    | { type: "InvalidStakeAmount" }
    | { type: "NoStakeFound" }
    | { type: "OnlyAccount" }
    | { type: "OnlyAdmin" }
    | { type: "InvokeContractError" }
    | { type: "ParseResult" }
    | { type: "InvalidResponse" }
    | { type: "LogFull" }
    | { type: "LogMalformed" }
    | { type: "FailedUpgradeMissingModule" }
    | { type: "FailedUpgradeMissingContract" }
    | { type: "FailedUpgradeUnsupportedModuleVersion" }
    | { type: "ContractPaused" }
    | { type: "InsufficientFunds" }
    | { type: "NotTokenContract" }
    | { type: "MissingAccount" }
    | { type: "MalformedData" }
    | { type: "WrongSignature" }
    | { type: "NonceMismatch" }
    | { type: "WrongContract" }
    | { type: "WrongEntryPoint" }
    | { type: "Expired" }
    | { type: "InvalidUnstakeAmount" };
  if ("ParseParams" in schemaJson) {
    match399 = {
      type: "ParseParams",
    };
  } else if ("UnAuthorized" in schemaJson) {
    match399 = {
      type: "UnAuthorized",
    };
  } else if ("InvalidStakeAmount" in schemaJson) {
    match399 = {
      type: "InvalidStakeAmount",
    };
  } else if ("NoStakeFound" in schemaJson) {
    match399 = {
      type: "NoStakeFound",
    };
  } else if ("OnlyAccount" in schemaJson) {
    match399 = {
      type: "OnlyAccount",
    };
  } else if ("OnlyAdmin" in schemaJson) {
    match399 = {
      type: "OnlyAdmin",
    };
  } else if ("InvokeContractError" in schemaJson) {
    match399 = {
      type: "InvokeContractError",
    };
  } else if ("ParseResult" in schemaJson) {
    match399 = {
      type: "ParseResult",
    };
  } else if ("InvalidResponse" in schemaJson) {
    match399 = {
      type: "InvalidResponse",
    };
  } else if ("LogFull" in schemaJson) {
    match399 = {
      type: "LogFull",
    };
  } else if ("LogMalformed" in schemaJson) {
    match399 = {
      type: "LogMalformed",
    };
  } else if ("FailedUpgradeMissingModule" in schemaJson) {
    match399 = {
      type: "FailedUpgradeMissingModule",
    };
  } else if ("FailedUpgradeMissingContract" in schemaJson) {
    match399 = {
      type: "FailedUpgradeMissingContract",
    };
  } else if ("FailedUpgradeUnsupportedModuleVersion" in schemaJson) {
    match399 = {
      type: "FailedUpgradeUnsupportedModuleVersion",
    };
  } else if ("ContractPaused" in schemaJson) {
    match399 = {
      type: "ContractPaused",
    };
  } else if ("InsufficientFunds" in schemaJson) {
    match399 = {
      type: "InsufficientFunds",
    };
  } else if ("NotTokenContract" in schemaJson) {
    match399 = {
      type: "NotTokenContract",
    };
  } else if ("MissingAccount" in schemaJson) {
    match399 = {
      type: "MissingAccount",
    };
  } else if ("MalformedData" in schemaJson) {
    match399 = {
      type: "MalformedData",
    };
  } else if ("WrongSignature" in schemaJson) {
    match399 = {
      type: "WrongSignature",
    };
  } else if ("NonceMismatch" in schemaJson) {
    match399 = {
      type: "NonceMismatch",
    };
  } else if ("WrongContract" in schemaJson) {
    match399 = {
      type: "WrongContract",
    };
  } else if ("WrongEntryPoint" in schemaJson) {
    match399 = {
      type: "WrongEntryPoint",
    };
  } else if ("Expired" in schemaJson) {
    match399 = {
      type: "Expired",
    };
  } else if ("InvalidUnstakeAmount" in schemaJson) {
    match399 = {
      type: "InvalidUnstakeAmount",
    };
  } else {
    throw new Error("Unexpected enum variant");
  }

  return match399;
}
/** Base64 encoding of the parameter schema type for update transactions to 'getEarnedRewards' entrypoint of the 'concordium_staking' contract. */
const base64GetEarnedRewardsParameterSchema = "Cw==";
/** Parameter JSON type needed by the schema for update transaction for 'getEarnedRewards' entrypoint of the 'concordium_staking' contract. */
type GetEarnedRewardsParameterSchemaJson = SDK.AccountAddress.SchemaValue;
/** Parameter type for update transaction for 'getEarnedRewards' entrypoint of the 'concordium_staking' contract. */
export type GetEarnedRewardsParameter = SDK.AccountAddress.Type;

/**
 * Construct schema JSON representation used in update transaction for 'getEarnedRewards' entrypoint of the 'concordium_staking' contract.
 * @param {GetEarnedRewardsParameter} parameter The structured parameter to construct from.
 * @returns {GetEarnedRewardsParameterSchemaJson} The smart contract parameter JSON.
 */
function createGetEarnedRewardsParameterSchemaJson(
  parameter: GetEarnedRewardsParameter
): GetEarnedRewardsParameterSchemaJson {
  const accountAddress425 = SDK.AccountAddress.toSchemaValue(parameter);
  return accountAddress425;
}

/**
 * Construct Parameter type used in update transaction for 'getEarnedRewards' entrypoint of the 'concordium_staking' contract.
 * @param {GetEarnedRewardsParameter} parameter The structured parameter to construct from.
 * @returns {SDK.Parameter.Type} The smart contract parameter.
 */
export function createGetEarnedRewardsParameter(
  parameter: GetEarnedRewardsParameter
): SDK.Parameter.Type {
  return SDK.Parameter.fromBase64SchemaType(
    base64GetEarnedRewardsParameterSchema,
    createGetEarnedRewardsParameterSchemaJson(parameter)
  );
}

/**
 * Construct WebWallet parameter type used in update transaction for 'getEarnedRewards' entrypoint of the 'concordium_staking' contract.
 * @param {GetEarnedRewardsParameter} parameter The structured parameter to construct from.
 * @returns The smart contract parameter support by the WebWallet.
 */
export function createGetEarnedRewardsParameterWebWallet(parameter: GetEarnedRewardsParameter) {
  return {
    parameters: createGetEarnedRewardsParameterSchemaJson(parameter),
    schema: {
      type: "TypeSchema" as const,
      value: SDK.toBuffer(base64GetEarnedRewardsParameterSchema, "base64"),
    },
  };
}

/**
 * Send an update-contract transaction to the 'getEarnedRewards' entrypoint of the 'concordium_staking' contract.
 * @param {ConcordiumStakingContract} contractClient The client for a 'concordium_staking' smart contract instance on chain.
 * @param {SDK.ContractTransactionMetadata} transactionMetadata - Metadata related to constructing a transaction for a smart contract.
 * @param {GetEarnedRewardsParameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.AccountSigner} signer - The signer of the update contract transaction.
 * @throws If the entrypoint is not successfully invoked.
 * @returns {SDK.TransactionHash.Type} Hash of the transaction.
 */
export function sendGetEarnedRewards(
  contractClient: ConcordiumStakingContract,
  transactionMetadata: SDK.ContractTransactionMetadata,
  parameter: GetEarnedRewardsParameter,
  signer: SDK.AccountSigner
): Promise<SDK.TransactionHash.Type> {
  return contractClient.genericContract.createAndSendUpdateTransaction(
    SDK.EntrypointName.fromStringUnchecked("getEarnedRewards"),
    SDK.Parameter.toBuffer,
    transactionMetadata,
    createGetEarnedRewardsParameter(parameter),
    signer
  );
}

/**
 * Dry-run an update-contract transaction to the 'getEarnedRewards' entrypoint of the 'concordium_staking' contract.
 * @param {ConcordiumStakingContract} contractClient The client for a 'concordium_staking' smart contract instance on chain.
 * @param {SDK.ContractAddress.Type | SDK.AccountAddress.Type} invokeMetadata - The address of the account or contract which is invoking this transaction.
 * @param {GetEarnedRewardsParameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.BlockHash.Type} [blockHash] - Optional block hash allowing for dry-running the transaction at the end of a specific block.
 * @throws {SDK.RpcError} If failing to communicate with the concordium node or if any of the checks fails.
 * @returns {SDK.InvokeContractResult} The result of invoking the smart contract instance.
 */
export function dryRunGetEarnedRewards(
  contractClient: ConcordiumStakingContract,
  parameter: GetEarnedRewardsParameter,
  invokeMetadata: SDK.ContractInvokeMetadata = {},
  blockHash?: SDK.BlockHash.Type
): Promise<SDK.InvokeContractResult> {
  return contractClient.genericContract.dryRun.invokeMethod(
    SDK.EntrypointName.fromStringUnchecked("getEarnedRewards"),
    invokeMetadata,
    SDK.Parameter.toBuffer,
    createGetEarnedRewardsParameter(parameter),
    blockHash
  );
}

/** Return value for dry-running update transaction for 'getEarnedRewards' entrypoint of the 'concordium_staking' contract. */
export type ReturnValueGetEarnedRewards = number | bigint;

/**
 * Get and parse the return value from dry-running update transaction for 'getEarnedRewards' entrypoint of the 'concordium_staking' contract.
 * Returns undefined if the result is not successful.
 * @param {SDK.InvokeContractResult} invokeResult The result from dry-running the transaction.
 * @returns {ReturnValueGetEarnedRewards | undefined} The structured return value or undefined if result was not a success.
 */
export function parseReturnValueGetEarnedRewards(
  invokeResult: SDK.InvokeContractResult
): ReturnValueGetEarnedRewards | undefined {
  if (invokeResult.tag !== "success") {
    return undefined;
  }

  if (invokeResult.returnValue === undefined) {
    throw new Error(
      "Unexpected missing 'returnValue' in result of invocation. Client expected a V1 smart contract."
    );
  }

  const schemaJson = <bigint>(
    SDK.ReturnValue.parseWithSchemaTypeBase64(invokeResult.returnValue, "BQ==")
  );
  return schemaJson;
}

/** Error message for dry-running update transaction for 'getEarnedRewards' entrypoint of the 'concordium_staking' contract. */
export type ErrorMessageGetEarnedRewards =
  | { type: "ParseParams" }
  | { type: "UnAuthorized" }
  | { type: "InvalidStakeAmount" }
  | { type: "NoStakeFound" }
  | { type: "OnlyAccount" }
  | { type: "OnlyAdmin" }
  | { type: "InvokeContractError" }
  | { type: "ParseResult" }
  | { type: "InvalidResponse" }
  | { type: "LogFull" }
  | { type: "LogMalformed" }
  | { type: "FailedUpgradeMissingModule" }
  | { type: "FailedUpgradeMissingContract" }
  | { type: "FailedUpgradeUnsupportedModuleVersion" }
  | { type: "ContractPaused" }
  | { type: "InsufficientFunds" }
  | { type: "NotTokenContract" }
  | { type: "MissingAccount" }
  | { type: "MalformedData" }
  | { type: "WrongSignature" }
  | { type: "NonceMismatch" }
  | { type: "WrongContract" }
  | { type: "WrongEntryPoint" }
  | { type: "Expired" }
  | { type: "InvalidUnstakeAmount" };

/**
 * Get and parse the error message from dry-running update transaction for 'getEarnedRewards' entrypoint of the 'concordium_staking' contract.
 * Returns undefined if the result is not a failure.
 * @param {SDK.InvokeContractResult} invokeResult The result from dry-running the transaction.
 * @returns {ErrorMessageGetEarnedRewards | undefined} The structured error message or undefined if result was not a failure or failed for other reason than contract rejectedReceive.
 */
export function parseErrorMessageGetEarnedRewards(
  invokeResult: SDK.InvokeContractResult
): ErrorMessageGetEarnedRewards | undefined {
  if (invokeResult.tag !== "failure" || invokeResult.reason.tag !== "RejectedReceive") {
    return undefined;
  }

  if (invokeResult.returnValue === undefined) {
    throw new Error(
      "Unexpected missing 'returnValue' in result of invocation. Client expected a V1 smart contract."
    );
  }

  const schemaJson = <
    | { ParseParams: [] }
    | { UnAuthorized: [] }
    | { InvalidStakeAmount: [] }
    | { NoStakeFound: [] }
    | { OnlyAccount: [] }
    | { OnlyAdmin: [] }
    | { InvokeContractError: [] }
    | { ParseResult: [] }
    | { InvalidResponse: [] }
    | { LogFull: [] }
    | { LogMalformed: [] }
    | { FailedUpgradeMissingModule: [] }
    | { FailedUpgradeMissingContract: [] }
    | { FailedUpgradeUnsupportedModuleVersion: [] }
    | { ContractPaused: [] }
    | { InsufficientFunds: [] }
    | { NotTokenContract: [] }
    | { MissingAccount: [] }
    | { MalformedData: [] }
    | { WrongSignature: [] }
    | { NonceMismatch: [] }
    | { WrongContract: [] }
    | { WrongEntryPoint: [] }
    | { Expired: [] }
    | { InvalidUnstakeAmount: [] }
  >SDK.ReturnValue.parseWithSchemaTypeBase64(
    invokeResult.returnValue,
    "FRkAAAALAAAAUGFyc2VQYXJhbXMCDAAAAFVuQXV0aG9yaXplZAISAAAASW52YWxpZFN0YWtlQW1vdW50AgwAAABOb1N0YWtlRm91bmQCCwAAAE9ubHlBY2NvdW50AgkAAABPbmx5QWRtaW4CEwAAAEludm9rZUNvbnRyYWN0RXJyb3ICCwAAAFBhcnNlUmVzdWx0Ag8AAABJbnZhbGlkUmVzcG9uc2UCBwAAAExvZ0Z1bGwCDAAAAExvZ01hbGZvcm1lZAIaAAAARmFpbGVkVXBncmFkZU1pc3NpbmdNb2R1bGUCHAAAAEZhaWxlZFVwZ3JhZGVNaXNzaW5nQ29udHJhY3QCJQAAAEZhaWxlZFVwZ3JhZGVVbnN1cHBvcnRlZE1vZHVsZVZlcnNpb24CDgAAAENvbnRyYWN0UGF1c2VkAhEAAABJbnN1ZmZpY2llbnRGdW5kcwIQAAAATm90VG9rZW5Db250cmFjdAIOAAAATWlzc2luZ0FjY291bnQCDQAAAE1hbGZvcm1lZERhdGECDgAAAFdyb25nU2lnbmF0dXJlAg0AAABOb25jZU1pc21hdGNoAg0AAABXcm9uZ0NvbnRyYWN0Ag8AAABXcm9uZ0VudHJ5UG9pbnQCBwAAAEV4cGlyZWQCFAAAAEludmFsaWRVbnN0YWtlQW1vdW50Ag=="
  );
  let match426:
    | { type: "ParseParams" }
    | { type: "UnAuthorized" }
    | { type: "InvalidStakeAmount" }
    | { type: "NoStakeFound" }
    | { type: "OnlyAccount" }
    | { type: "OnlyAdmin" }
    | { type: "InvokeContractError" }
    | { type: "ParseResult" }
    | { type: "InvalidResponse" }
    | { type: "LogFull" }
    | { type: "LogMalformed" }
    | { type: "FailedUpgradeMissingModule" }
    | { type: "FailedUpgradeMissingContract" }
    | { type: "FailedUpgradeUnsupportedModuleVersion" }
    | { type: "ContractPaused" }
    | { type: "InsufficientFunds" }
    | { type: "NotTokenContract" }
    | { type: "MissingAccount" }
    | { type: "MalformedData" }
    | { type: "WrongSignature" }
    | { type: "NonceMismatch" }
    | { type: "WrongContract" }
    | { type: "WrongEntryPoint" }
    | { type: "Expired" }
    | { type: "InvalidUnstakeAmount" };
  if ("ParseParams" in schemaJson) {
    match426 = {
      type: "ParseParams",
    };
  } else if ("UnAuthorized" in schemaJson) {
    match426 = {
      type: "UnAuthorized",
    };
  } else if ("InvalidStakeAmount" in schemaJson) {
    match426 = {
      type: "InvalidStakeAmount",
    };
  } else if ("NoStakeFound" in schemaJson) {
    match426 = {
      type: "NoStakeFound",
    };
  } else if ("OnlyAccount" in schemaJson) {
    match426 = {
      type: "OnlyAccount",
    };
  } else if ("OnlyAdmin" in schemaJson) {
    match426 = {
      type: "OnlyAdmin",
    };
  } else if ("InvokeContractError" in schemaJson) {
    match426 = {
      type: "InvokeContractError",
    };
  } else if ("ParseResult" in schemaJson) {
    match426 = {
      type: "ParseResult",
    };
  } else if ("InvalidResponse" in schemaJson) {
    match426 = {
      type: "InvalidResponse",
    };
  } else if ("LogFull" in schemaJson) {
    match426 = {
      type: "LogFull",
    };
  } else if ("LogMalformed" in schemaJson) {
    match426 = {
      type: "LogMalformed",
    };
  } else if ("FailedUpgradeMissingModule" in schemaJson) {
    match426 = {
      type: "FailedUpgradeMissingModule",
    };
  } else if ("FailedUpgradeMissingContract" in schemaJson) {
    match426 = {
      type: "FailedUpgradeMissingContract",
    };
  } else if ("FailedUpgradeUnsupportedModuleVersion" in schemaJson) {
    match426 = {
      type: "FailedUpgradeUnsupportedModuleVersion",
    };
  } else if ("ContractPaused" in schemaJson) {
    match426 = {
      type: "ContractPaused",
    };
  } else if ("InsufficientFunds" in schemaJson) {
    match426 = {
      type: "InsufficientFunds",
    };
  } else if ("NotTokenContract" in schemaJson) {
    match426 = {
      type: "NotTokenContract",
    };
  } else if ("MissingAccount" in schemaJson) {
    match426 = {
      type: "MissingAccount",
    };
  } else if ("MalformedData" in schemaJson) {
    match426 = {
      type: "MalformedData",
    };
  } else if ("WrongSignature" in schemaJson) {
    match426 = {
      type: "WrongSignature",
    };
  } else if ("NonceMismatch" in schemaJson) {
    match426 = {
      type: "NonceMismatch",
    };
  } else if ("WrongContract" in schemaJson) {
    match426 = {
      type: "WrongContract",
    };
  } else if ("WrongEntryPoint" in schemaJson) {
    match426 = {
      type: "WrongEntryPoint",
    };
  } else if ("Expired" in schemaJson) {
    match426 = {
      type: "Expired",
    };
  } else if ("InvalidUnstakeAmount" in schemaJson) {
    match426 = {
      type: "InvalidUnstakeAmount",
    };
  } else {
    throw new Error("Unexpected enum variant");
  }

  return match426;
}
/** Base64 encoding of the parameter schema type for update transactions to 'serializationHelper' entrypoint of the 'concordium_staking' contract. */
const base64SerializationHelperParameterSchema =
  "FAAFAAAAEAAAAGNvbnRyYWN0X2FkZHJlc3MMBQAAAG5vbmNlBQkAAAB0aW1lc3RhbXANCwAAAGVudHJ5X3BvaW50FgEHAAAAcGF5bG9hZBABAg==";
/** Parameter JSON type needed by the schema for update transaction for 'serializationHelper' entrypoint of the 'concordium_staking' contract. */
type SerializationHelperParameterSchemaJson = {
  contract_address: SDK.ContractAddress.SchemaValue;
  nonce: bigint;
  timestamp: SDK.Timestamp.SchemaValue;
  entry_point: string;
  payload: Array<number>;
};
/** Parameter type for update transaction for 'serializationHelper' entrypoint of the 'concordium_staking' contract. */
export type SerializationHelperParameter = {
  contract_address: SDK.ContractAddress.Type;
  nonce: number | bigint;
  timestamp: SDK.Timestamp.Type;
  entry_point: string;
  payload: Array<number>;
};

/**
 * Construct schema JSON representation used in update transaction for 'serializationHelper' entrypoint of the 'concordium_staking' contract.
 * @param {SerializationHelperParameter} parameter The structured parameter to construct from.
 * @returns {SerializationHelperParameterSchemaJson} The smart contract parameter JSON.
 */
function createSerializationHelperParameterSchemaJson(
  parameter: SerializationHelperParameter
): SerializationHelperParameterSchemaJson {
  const field453 = parameter.contract_address;
  const contractAddress454 = SDK.ContractAddress.toSchemaValue(field453);
  const field455 = parameter.nonce;
  const number456 = BigInt(field455);
  const field457 = parameter.timestamp;
  const timestamp458 = SDK.Timestamp.toSchemaValue(field457);
  const field459 = parameter.entry_point;
  const field460 = parameter.payload;
  const named452 = {
    contract_address: contractAddress454,
    nonce: number456,
    timestamp: timestamp458,
    entry_point: field459,
    payload: field460,
  };
  return named452;
}

/**
 * Construct Parameter type used in update transaction for 'serializationHelper' entrypoint of the 'concordium_staking' contract.
 * @param {SerializationHelperParameter} parameter The structured parameter to construct from.
 * @returns {SDK.Parameter.Type} The smart contract parameter.
 */
export function createSerializationHelperParameter(
  parameter: SerializationHelperParameter
): SDK.Parameter.Type {
  return SDK.Parameter.fromBase64SchemaType(
    base64SerializationHelperParameterSchema,
    createSerializationHelperParameterSchemaJson(parameter)
  );
}

/**
 * Construct WebWallet parameter type used in update transaction for 'serializationHelper' entrypoint of the 'concordium_staking' contract.
 * @param {SerializationHelperParameter} parameter The structured parameter to construct from.
 * @returns The smart contract parameter support by the WebWallet.
 */
export function createSerializationHelperParameterWebWallet(
  parameter: SerializationHelperParameter
) {
  return {
    parameters: createSerializationHelperParameterSchemaJson(parameter),
    schema: {
      type: "TypeSchema" as const,
      value: SDK.toBuffer(base64SerializationHelperParameterSchema, "base64"),
    },
  };
}

/**
 * Send an update-contract transaction to the 'serializationHelper' entrypoint of the 'concordium_staking' contract.
 * @param {ConcordiumStakingContract} contractClient The client for a 'concordium_staking' smart contract instance on chain.
 * @param {SDK.ContractTransactionMetadata} transactionMetadata - Metadata related to constructing a transaction for a smart contract.
 * @param {SerializationHelperParameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.AccountSigner} signer - The signer of the update contract transaction.
 * @throws If the entrypoint is not successfully invoked.
 * @returns {SDK.TransactionHash.Type} Hash of the transaction.
 */
export function sendSerializationHelper(
  contractClient: ConcordiumStakingContract,
  transactionMetadata: SDK.ContractTransactionMetadata,
  parameter: SerializationHelperParameter,
  signer: SDK.AccountSigner
): Promise<SDK.TransactionHash.Type> {
  return contractClient.genericContract.createAndSendUpdateTransaction(
    SDK.EntrypointName.fromStringUnchecked("serializationHelper"),
    SDK.Parameter.toBuffer,
    transactionMetadata,
    createSerializationHelperParameter(parameter),
    signer
  );
}

/**
 * Dry-run an update-contract transaction to the 'serializationHelper' entrypoint of the 'concordium_staking' contract.
 * @param {ConcordiumStakingContract} contractClient The client for a 'concordium_staking' smart contract instance on chain.
 * @param {SDK.ContractAddress.Type | SDK.AccountAddress.Type} invokeMetadata - The address of the account or contract which is invoking this transaction.
 * @param {SerializationHelperParameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.BlockHash.Type} [blockHash] - Optional block hash allowing for dry-running the transaction at the end of a specific block.
 * @throws {SDK.RpcError} If failing to communicate with the concordium node or if any of the checks fails.
 * @returns {SDK.InvokeContractResult} The result of invoking the smart contract instance.
 */
export function dryRunSerializationHelper(
  contractClient: ConcordiumStakingContract,
  parameter: SerializationHelperParameter,
  invokeMetadata: SDK.ContractInvokeMetadata = {},
  blockHash?: SDK.BlockHash.Type
): Promise<SDK.InvokeContractResult> {
  return contractClient.genericContract.dryRun.invokeMethod(
    SDK.EntrypointName.fromStringUnchecked("serializationHelper"),
    invokeMetadata,
    SDK.Parameter.toBuffer,
    createSerializationHelperParameter(parameter),
    blockHash
  );
}
