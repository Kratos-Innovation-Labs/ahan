import React, { useMemo } from "react";
import Button from "../../components/Button";
import Web3Wallet from "../../components/Web3Wallet";

import "./Home.scss";
import { useWallet } from "../../contexts/WalletState";
import {
  useConcordiumStaking,
  useGetEarnedRewards,
  useRetrieveUserStakeInfo,
  useViewState,
} from "../../hooks/useConcordiumStaking";
import { APR_DENOMINATOR, DAY_IN_SECONDS, MULTIPLIER } from "../../config";
import { extractNumbersFromString } from "../../utils";
import EUROE_TOKEN_LOGO from "../../assets/euroe_stablecoin.png";

const Home: React.FC<{}> = () => {
  const wallet = useWallet();
  const { connection, account } = wallet ?? {};

  const { stakeHandler, setAmount, maxButtonHandler, amount, claimRewardsHandler, unstakeHandler } =
    useConcordiumStaking(connection, account);

  const earnedRewards = useGetEarnedRewards(account);
  const stakeInfo = useRetrieveUserStakeInfo(account);
  const viewResults = useViewState();

  // Memorized statistics data
  const memorizedStatisticsData = useMemo(() => {
    return [
      {
        title: "Annual percentage rate (Daily)",
        value: viewResults?.apr
          ? `${(Number(viewResults?.apr) * DAY_IN_SECONDS) / APR_DENOMINATOR}%`
          : "--",
        isStyled: true,
      },
      {
        title: "Total staked with EUROe",
        value: viewResults?.total_staked
          ? `${Number(viewResults?.total_staked) / MULTIPLIER} EUROe`
          : "--",
      },
      {
        title: "Stakers",
        value: viewResults?.total_participants ? Number(viewResults?.total_participants) : "--",
      },
    ];
  }, [viewResults]);

  // User stake data
  const stakeData = useMemo(() => {
    return [
      {
        title: "Staked Amount",
        value: stakeInfo?.amount ? `${Number(stakeInfo?.amount) / MULTIPLIER} EUROe` : "--",
      },
      {
        title: "Earned Rewards",
        value: earnedRewards ? `${Number(earnedRewards) / MULTIPLIER} EUROe` : "--",
      },
    ];
  }, [stakeInfo, earnedRewards]);

  const isAlreadyStaked = useMemo(() => {
    return stakeInfo?.amount ? stakeInfo?.amount > 0 : false;
  }, [stakeInfo?.amount]);

  return !(account && connection) ? (
    <Web3Wallet />
  ) : (
    <div className="home-page">
      <div className="mx pad">
        <div className="wrapper">
          <div className="stake-container">
            <h2>Stake EUROe Stablecoin</h2>
            <p className="description">Stake EUROe and receive liquid EUROe while staking.</p>
            <div className="card">
              <div className="input-wrapper">
                <img src={EUROE_TOKEN_LOGO} alt="EUROE_TOKEN_LOGO" width={24} />
                {/* <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path opacity="0.6" d="M11.999 3.75v6.098l5.248 2.303-5.248-8.401z"></path>
                  <path d="M11.999 3.75L6.75 12.151l5.249-2.303V3.75z"></path>
                  <path opacity="0.6" d="M11.999 16.103v4.143l5.251-7.135L12 16.103z"></path>
                  <path d="M11.999 20.246v-4.144L6.75 13.111l5.249 7.135z"></path>
                  <path opacity="0.2" d="M11.999 15.144l5.248-2.993-5.248-2.301v5.294z"></path>
                  <path opacity="0.6" d="M6.75 12.151l5.249 2.993V9.85l-5.249 2.3z"></path>
                </svg> */}
                <input
                  type="text"
                  placeholder="0.00"
                  inputMode="decimal"
                  onChange={(e) => setAmount(extractNumbersFromString(e.target.value))}
                  value={amount}
                />
                <button
                  style={{ cursor: "pointer" }}
                  onClick={async () => await maxButtonHandler()}
                >
                  max
                </button>
              </div>
              <div className="controls">
                <Button
                  variant="secondary"
                  onClick={async () => {
                    if (isAlreadyStaked) {
                      let stakeAmount = stakeInfo?.amount ?? 0;
                      await unstakeHandler(Number(stakeAmount) / MULTIPLIER);
                    }
                  }}
                  disabled={!isAlreadyStaked}
                >
                  Unstake
                </Button>
                <Button
                  onClick={async () => {
                    if (isAlreadyStaked) await claimRewardsHandler();
                  }}
                  disabled={!isAlreadyStaked}
                >
                  Claim
                </Button>
                <Button variant="secondary" onClick={async () => stakeHandler()}>
                  Stake
                </Button>
              </div>
              <div className="stats">
                <div>
                  <p>You will receive</p>
                  <span>{amount === "" ? 0 : amount} Liquid EUROe</span>
                </div>
                <div>
                  <p>Exchange rate</p>
                  <span>1 EUROe = 1 Liquid EUROe</span>
                </div>
                {/* <div>
                  <p>Max transaction cost</p>
                  <span>$3.41</span>
                </div>
                <div>
                  <p>Reward fee</p>
                  <span>9.99% H</span>
                </div> */}
              </div>
            </div>

            {/** STATS */}
            <div className="section-2">
              <h4>Ahan Protocol Statistics</h4>
              <div className="card">
                <div className="stats">
                  {memorizedStatisticsData.map((m, i) => (
                    <div key={i}>
                      <p>{m.title}</p>
                      <span style={m?.isStyled ? { color: "var(--lido-color-success)" } : {}}>
                        {m.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/** STAKING INFO */}
            <div className="section-2">
              <h4>Staking Info</h4>
              <div className="card">
                <div className="stats">
                  {stakeData.map((s, k) => (
                    <div key={k}>
                      <p>{s.title}</p>
                      <span>{s.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/** END */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
