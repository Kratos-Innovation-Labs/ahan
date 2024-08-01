import * as EuroeStableCoin from "../generated/module_euroe_stablecoin";
import { ConcordiumGRPCWebClient } from "@concordium/web-sdk";
import { EUROE_CONTRACT_ADDRESS, NODE, PORT } from "../config";
import { throwCallError } from ".";

const grpc = new ConcordiumGRPCWebClient(NODE, PORT);
const euroe = EuroeStableCoin.createUnchecked(grpc, EUROE_CONTRACT_ADDRESS);

export const getBalanceOf = async (balanceOfParameter: EuroeStableCoin.BalanceOfParameter) => {
  let dryRunResult = await EuroeStableCoin.dryRunBalanceOf(euroe, balanceOfParameter);
  if (!dryRunResult || dryRunResult.tag === "failure" || !dryRunResult.returnValue) {
    const parsedErrorCode = EuroeStableCoin.parseErrorMessageBalanceOf(dryRunResult)?.type;
    throwCallError(
      parsedErrorCode,
      EuroeStableCoin.contractName.value,
      "balanceOf",
      EUROE_CONTRACT_ADDRESS.index
    );
  }
  return EuroeStableCoin.parseReturnValueBalanceOf(dryRunResult);
};
