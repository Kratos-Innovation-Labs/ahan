import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { TESTNET, WithWalletConnector } from "@concordium/react-components";
import "./index.css";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <WithWalletConnector network={TESTNET}>{(props) => <App {...props} />}</WithWalletConnector>
    </BrowserRouter>
  </React.StrictMode>
);
