import { useCallback, useEffect, useState } from "react";
import { handlePromise, round } from "../utils";
import { WalletConnection } from "@concordium/wallet-connectors";
import { MULTIPLIER } from "../config";
import {
  claimRewards,
  getEarnedRewards,
  getStakeInfo,
  stake,
  unstake,
  view,
} from "../utils/concordium-staking";
import { AccountAddress, TransactionHash } from "@concordium/web-sdk";
import useSWR from "swr";
import { getBalanceOf } from "../utils/euroe-stablecoin";

export const useConcordiumStaking = (
  connection: WalletConnection | undefined,
  accountAddress: string | undefined
) => {
  const [amount, setAmount] = useState<string>("");

  useEffect(() => {
    setAmount("");
  }, [connection, accountAddress]);

  /// Max button handler
  const maxButtonHandler = useCallback(async () => {
    try {
      if (!accountAddress) return null;
      let balances = await getBalanceOf([
        {
          token_id: "",
          address: {
            type: "Account",
            content: AccountAddress.fromBase58(accountAddress),
          },
        },
      ]);

      let sAmount = Number(balances?.[0]) > 0 ? Number(balances?.[0]) / MULTIPLIER - 1 : 0;
      setAmount(round(sAmount).toString() ?? "");
    } catch (err) {
      if (err instanceof Error) {
        console.log(err.message);
      }
    }
  }, [accountAddress]);

  /// stake handler
  const stakeHandler = useCallback(async () => {
    return await handlePromise(async () => {
      if (!(connection && accountAddress)) throw Error("Not Connected");
      if (!(Number(amount) > 0)) throw Error("Invalid StakeAmount");
      let balances = await getBalanceOf([
        {
          token_id: "",
          address: {
            type: "Account",
            content: AccountAddress.fromBase58(accountAddress),
          },
        },
      ]);

      let userBalance = Number(balances?.[0]) / MULTIPLIER;
      if (userBalance > Number(amount)) {
        let txHash = await stake(
          connection,
          AccountAddress.fromBase58(accountAddress),
          BigInt(round(Number(amount)) * MULTIPLIER)
        );
        setAmount("");
        return TransactionHash.toHexString(txHash);
      } else {
        throw Error("Insufficient EUROe Token Balance");
      }
    }, "Stake");
  }, [connection, amount, accountAddress]);

  /// Unstake handler
  const unstakeHandler = useCallback(
    async (previouslyStakedAmount: number) => {
      return await handlePromise(async () => {
        if (!(connection && accountAddress)) throw Error("Not Connected");
        if (!(Number(amount) > 0)) throw Error("Invalid Unstake Amount");
        if (Number(amount) > previouslyStakedAmount) throw Error("Insufficient Stake");

        let tx = await unstake(
          connection,
          AccountAddress.fromBase58(accountAddress),
          BigInt(round(Number(amount)) * MULTIPLIER)
        );

        setAmount("");
        return tx;
      }, "Unstake");
    },
    [connection, accountAddress, amount]
  );

  /// Claim rewards handler
  const claimRewardsHandler = useCallback(async () => {
    return await handlePromise(async () => {
      if (!(connection && accountAddress)) throw Error("Not Connected");
      return await claimRewards(connection, AccountAddress.fromBase58(accountAddress));
    }, "Claim Rewards");
  }, [connection, accountAddress]);

  return {
    maxButtonHandler,
    stakeHandler,
    unstakeHandler,
    claimRewardsHandler,
    setAmount,
    amount,
  };
};

export const useRetrieveUserStakeInfo = (accountAddress: string | undefined) => {
  const { data: userStakeInfo } = useSWR(
    `/user/getStakeInfo/${accountAddress}`,
    async () => {
      if (!accountAddress) return null;
      return await getStakeInfo(accountAddress);
    },
    {
      refreshInterval: 5000,
    }
  );
  return userStakeInfo;
};

export const useGetEarnedRewards = (accountAddress: string | undefined) => {
  const { data: earnedRewards } = useSWR(
    `/user/getEarnedRewards/${accountAddress}`,
    async () => {
      if (!accountAddress) return null;
      return await getEarnedRewards(accountAddress);
    },
    {
      refreshInterval: 5000,
    }
  );

  return earnedRewards;
};

export const useViewState = () => {
  const { data: state } = useSWR(
    `/view_state`,
    async () => {
      return await view();
    },
    {
      refreshInterval: 5000,
    }
  );
  return state;
};
