import { CcdAmount, ContractAddress, Energy, ReceiveName } from "@concordium/web-sdk";

export type ContractPayload = {
  address: ContractAddress.Type;
  receiveName: ReceiveName.Type;
  amount: CcdAmount.Type;
  maxContractExecutionEnergy: Energy.Type;
};

export interface TxHashResponse {
  tx_hash: string;
}
