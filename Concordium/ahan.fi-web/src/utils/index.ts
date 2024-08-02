import { CcdAmount, Energy, EntrypointName, ReceiveName } from "@concordium/web-sdk";
import { API_ENDPOINT, CONTRACT_ADDRESS, CONTRACT_NAME } from "../config";
import JSONbig from "json-bigint";
import { ContractPayload } from "./types";
import { Icons, toast } from "react-toastify";
import axios from "axios";

export const extractNumbersFromString = (str: string): string => {
  let dotIncluded = false;
  let result = "";

  for (const char of str) {
    if (char === "." && !dotIncluded) {
      result += char;
      dotIncluded = true;
    } else if (!isNaN(parseInt(char))) {
      result += char;
    }
  }

  return result;
};

export const stringTrimmer = (str: string, separator: string, length = 12) => {
  let firstBytes = str.slice(0, length);
  let lastBytes = str.slice(-length);
  return firstBytes + separator + lastBytes;
};

export const contractUpdatePayload = (
  method: string,
  maxContractExecutionEnergy: bigint
): ContractPayload => {
  return {
    address: CONTRACT_ADDRESS,
    receiveName: ReceiveName.create(CONTRACT_NAME, EntrypointName.fromString(method)),
    amount: CcdAmount.zero(),
    maxContractExecutionEnergy: Energy.create(maxContractExecutionEnergy),
  };
};

export const throwCallError = <T>(
  parsedErrorCode: T,
  contractName: string,
  entrypointName: string,
  index: bigint
) => {
  throw new Error(
    `RPC call 'invokeContract' on method '${contractName}.${entrypointName}' of contract '${index}' failed. Decoded error code: ${JSONbig.stringify(
      parsedErrorCode
    )}`

    // Original response: ${JSONbig.stringify(dryRunResult)}
  );
};

export const handlePromise = async <T>(callable: () => Promise<T>, action: string) => {
  const response = await toast.promise(callable, {
    pending: {
      render: () => {
        return `Processing ${action}`;
      },
      icon: Icons.spinner,
    },
    success: {
      render: ({ data }) => {
        return `${action} completed 👌 at ${stringTrimmer(data as string, "...")}`;
      },
      icon: Icons.success,
    },
    error: {
      render: ({ data }) => {
        return `${action} failed 🤯 with ${data}`;
      },
      icon: Icons.error,
    },
  });
  return response;
};

export const submitSponsoredTx = async <T>(entrypoint: string, body: T): Promise<string> => {
  let response = await axios.post<string>(`${API_ENDPOINT}/${entrypoint}`, JSON.stringify(body), {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

export const round = (value: number, decimal = 6): number => {
  const factor = Math.pow(10, decimal);
  return Math.round(value * factor) / factor;
};
