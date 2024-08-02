import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/Header";
import { WalletConnectionProps, useConnect, useConnection } from "@concordium/react-components";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import { SWRConfig } from "swr";
import WalletState from "./contexts/WalletState";

const App: React.FC<WalletConnectionProps> = (props) => {
  const { activeConnector, connectedAccounts, genesisHashes } = props;

  const { connection, setConnection, account, genesisHash } = useConnection(
    connectedAccounts,
    genesisHashes
  );
  const { connect, connectError, isConnecting } = useConnect(activeConnector, setConnection);

  return (
    <>
      <SWRConfig>
        <WalletState
          walletConnectionProps={props}
          connection={connection}
          setConnection={setConnection}
          account={account}
          connectError={connectError}
          connect={connect}
          isConnecting={isConnecting}
          genesisHash={genesisHash}
        >
          <ToastContainer
            position="bottom-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
          <Header accountAddress={account} connection={connection} />

          {/** Routes */}
          <Routes>
            <Route path="*" element={<Home />} />
          </Routes>
        </WalletState>
      </SWRConfig>
    </>
  );
};

export default App;
